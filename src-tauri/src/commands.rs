use serde::{Deserialize, Serialize};
use std::process::{Command, Stdio};
use std::time::Duration;
use tokio::time::timeout;
use tauri::{State};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct CommandRequest {
    pub command: String,
    pub args: Vec<String>,
    pub timeout_seconds: Option<u64>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CommandResponse {
    pub success: bool,
    pub output: String,
    pub error: Option<String>,
    pub exit_code: Option<i32>,
    pub execution_time_ms: u64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ProcessInfo {
    pub pid: u32,
    pub name: String,
    pub command: String,
    pub start_time: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SystemInfo {
    pub os: String,
    pub arch: String,
    pub total_memory_mb: u64,
    pub available_memory_mb: u64,
    pub cpu_count: usize,
}

pub struct AppState {
    pub processes: std::sync::Arc<tokio::sync::RwLock<std::collections::HashMap<String, ProcessInfo>>>,
}

impl Default for AppState {
    fn default() -> Self {
        Self {
            processes: std::sync::Arc::new(tokio::sync::RwLock::new(std::collections::HashMap::new())),
        }
    }
}

#[tauri::command]
pub async fn execute_command(
    request: CommandRequest,
    state: State<'_, AppState>,
) -> Result<CommandResponse, String> {
    let start_time = std::time::Instant::now();
    let timeout_duration = Duration::from_secs(request.timeout_seconds.unwrap_or(30));
    
    let process_id = Uuid::new_v4().to_string();
    
    // Record process info
    {
        let mut processes = state.processes.write().await;
        processes.insert(process_id.clone(), ProcessInfo {
            pid: 0, // Will be set when process starts
            name: request.command.clone(),
            command: format!("{} {}", request.command, request.args.join(" ")),
            start_time: chrono::Utc::now().to_rfc3339(),
        });
    }
    
    // Execute command with timeout
    let result = timeout(timeout_duration, async {
        let mut cmd = Command::new(&request.command);
        cmd.args(&request.args);
        cmd.stdout(Stdio::piped());
        cmd.stderr(Stdio::piped());
        
        match cmd.output() {
            Ok(output) => {
                let stdout = String::from_utf8_lossy(&output.stdout).to_string();
                let stderr = String::from_utf8_lossy(&output.stderr).to_string();
                
                Ok(CommandResponse {
                    success: output.status.success(),
                    output: stdout,
                    error: if stderr.is_empty() { None } else { Some(stderr) },
                    exit_code: output.status.code(),
                    execution_time_ms: start_time.elapsed().as_millis() as u64,
                })
            }
            Err(e) => Ok(CommandResponse {
                success: false,
                output: String::new(),
                error: Some(format!("Failed to execute command: {}", e)),
                exit_code: None,
                execution_time_ms: start_time.elapsed().as_millis() as u64,
            })
        }
    }).await;
    
    // Remove process from tracking
    {
        let mut processes = state.processes.write().await;
        processes.remove(&process_id);
    }
    
    match result {
        Ok(Ok(response)) => Ok(response),
        Ok(Err(e)) => Ok(CommandResponse {
            success: false,
            output: String::new(),
            error: Some(format!("Command execution failed: {}", e)),
            exit_code: None,
            execution_time_ms: start_time.elapsed().as_millis() as u64,
        }),
        Err(_) => Ok(CommandResponse {
            success: false,
            output: String::new(),
            error: Some(format!("Command timed out after {} seconds", timeout_duration.as_secs())),
            exit_code: None,
            execution_time_ms: start_time.elapsed().as_millis() as u64,
        }),
    }
}

#[tauri::command]
pub async fn list_processes(state: State<'_, AppState>) -> Result<Vec<ProcessInfo>, String> {
    let processes = state.processes.read().await;
    Ok(processes.values().cloned().collect())
}

#[tauri::command]
pub async fn kill_process(process_id: String, state: State<'_, AppState>) -> Result<bool, String> {
    let mut processes = state.processes.write().await;
    match processes.remove(&process_id) {
        Some(_) => Ok(true),
        None => Ok(false),
    }
}

#[tauri::command]
pub async fn get_system_info() -> Result<SystemInfo, String> {
    use sysinfo::System;
    
    let mut sys = System::new_all();
    sys.refresh_all();
    
    Ok(SystemInfo {
        os: System::long_os_version().unwrap_or_else(|| "Unknown".to_string()),
        arch: std::env::consts::ARCH.to_string(),
        total_memory_mb: sys.total_memory() / 1024,
        available_memory_mb: sys.available_memory() / 1024,
        cpu_count: sys.cpus().len(),
    })
}
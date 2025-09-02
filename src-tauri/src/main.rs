mod commands;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            commands::execute_command,
            commands::list_processes,
            commands::kill_process,
            commands::get_system_info
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
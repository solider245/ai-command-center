import React, { useState } from 'react'
import { Send, Paperclip, Image, FileText, Command, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'

const messages = [
  {
    id: '1',
    type: 'user',
    content: '请帮我分析这个Python项目的代码结构，找出可能的性能问题。',
    timestamp: '今天 14:30:15',
    attachments: [
      {
        name: 'project.zip',
        size: '2.3MB',
        type: 'zip'
      }
    ]
  },
  {
    id: '2',
    type: 'ai',
    content: `项目分析完成：

📁 项目结构:
  ├── src/
  │   ├── main.py           (主入口文件)
  │   ├── utils/            (工具函数)
  │   └── models/           (数据模型)
  ├── tests/                 (测试文件)
  └── requirements.txt      (依赖文件)

⚠️ 发现的性能问题:
  1. utils/database.py 中的查询未使用索引
  2. main.py 存在重复的数据库连接
  3. 缺少适当的错误处理机制

📋 建议的优化方案:
  1. 添加数据库索引
  2. 实现连接池
  3. 添加异常处理`,
    timestamp: '今天 14:30:22',
    actions: ['执行优化', '复制建议', '保存分析']
  },
  {
    id: '3',
    type: 'user',
    content: '请执行第一个优化建议，添加数据库索引',
    timestamp: '今天 14:31:05'
  },
  {
    id: '4',
    type: 'ai',
    content: `✅ 索引创建成功

执行结果:
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_order_status ON orders(status);

性能提升预期: 查询速度提升 40-60%`,
    timestamp: '今天 14:31:12'
  }
]

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (inputValue.trim()) {
      // Handle send logic
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <Card
              className={`max-w-3xl ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50'
              }`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    {message.type === 'user' ? '👤 用户' : '🤖 Claude Code'}
                  </span>
                  <span className="text-xs opacity-70">{message.timestamp}</span>
                </div>
                
                <div className="whitespace-pre-wrap text-sm mb-3">
                  {message.content}
                </div>
                
                {message.attachments && (
                  <div className="flex items-center space-x-2 mb-3">
                    <Paperclip className="w-4 h-4 opacity-70" />
                    <span className="text-sm opacity-70">
                      {message.attachments[0].name} ({message.attachments[0].size})
                    </span>
                  </div>
                )}
                
                {message.actions && (
                  <div className="flex space-x-2">
                    {message.actions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="max-w-3xl mx-auto">
          {/* Quick Actions */}
          <div className="flex items-center space-x-2 mb-3">
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              系统状态
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              清理系统
            </Button>
            <Button variant="outline" size="sm">
              <FolderOpen className="w-4 h-4 mr-2" />
              文件整理
            </Button>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              搜索文件
            </Button>
            <Button variant="outline" size="sm">
              <Zap className="w-4 h-4 mr-2" />
              性能优化
            </Button>
          </div>
          
          {/* Message Input */}
          <div className="relative">
            <div className="flex items-end space-x-2">
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Image className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <FileText className="w-4 h-4" />
                </Button>
              </div>
              
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入您的消息..."
                className="min-h-[60px] resize-none border-border focus:ring-2 focus:ring-ring"
                rows={1}
              />
              
              <div className="flex space-x-1">
                <Button onClick={handleSend} disabled={!inputValue.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
                <Button variant="outline">
                  <Command className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Required icons for the component
import { BarChart3, Trash2, FolderOpen, Search } from 'lucide-react'
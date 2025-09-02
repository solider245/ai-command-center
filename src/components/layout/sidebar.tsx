import { MessageSquare, Trash2, Archive } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const sessions = [
  {
    id: '1',
    name: '代码审查会话',
    lastMessage: '正在审查Python代码...',
    messageCount: 23,
    timestamp: '今天 14:30',
    isActive: true
  },
  {
    id: '2',
    name: '系统优化会话',
    lastMessage: '清理临时文件和优化启动项',
    messageCount: 15,
    timestamp: '昨天 16:45',
    isActive: false
  },
  {
    id: '3',
    name: '文件整理会话',
    lastMessage: '整理下载文件夹并分类',
    messageCount: 8,
    timestamp: '2天前 10:20',
    isActive: false
  },
  {
    id: '4',
    name: '项目构建会话',
    lastMessage: '配置React项目构建流程',
    messageCount: 12,
    timestamp: '3天前 09:15',
    isActive: false
  },
  {
    id: '5',
    name: '网络诊断会话',
    lastMessage: '诊断网络连接问题',
    messageCount: 6,
    timestamp: '4天前 15:30',
    isActive: false
  }
]

export default function Sidebar() {
  return (
    <aside className="w-80 bg-background border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground">会话列表</h2>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm">
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Archive className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="搜索会话..."
            className="w-full px-3 py-2 text-sm bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {sessions.map((session) => (
            <Card
              key={session.id}
              className={`p-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                session.isActive ? 'bg-muted border-primary/20' : 'hover:bg-muted/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-sm font-medium truncate">{session.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mb-1">
                    {session.lastMessage}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{session.timestamp}</span>
                    <span>{session.messageCount}条消息</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </aside>
  )
}
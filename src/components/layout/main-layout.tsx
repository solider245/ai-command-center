import Header from './header'
import Sidebar from './sidebar'
import ChatInterface from '../chat/chat-interface'

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex flex-1 pt-14">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Chat Area */}
        <main className="flex-1 flex flex-col">
          <ChatInterface />
        </main>
      </div>
    </div>
  )
}
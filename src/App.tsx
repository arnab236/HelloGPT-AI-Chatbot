import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { useChats } from './hooks/useChats';
import { getChatResponse } from './services/gemini';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { ChatSidebar } from './components/ChatSidebar';
import { ThemeToggle } from './components/ThemeToggle';
import { Menu } from 'lucide-react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { 
    chats, 
    activeChat, 
    createNewChat, 
    addMessage, 
    deleteChat, 
    setActiveChat 
  } = useChats();
  
  const { isListening, transcript, startListening } = useSpeechRecognition();
  const { speak, cancelSpeech } = useSpeechSynthesis();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!activeChat) {
      createNewChat();
    }
  }, []);

  useEffect(() => {
    if (transcript && activeChat) {
      handleNewMessage(transcript);
    }
  }, [transcript]);

  const handleNewMessage = async (text: string) => {
    if (!activeChat) return;
    
    cancelSpeech();
    if (isProcessing) return;
    setIsProcessing(true);
    
    addMessage(activeChat.id, text, false);
    setIsSidebarOpen(false);

    try {
      const response = await getChatResponse(text);
      addMessage(activeChat.id, response, true);
      speak(response);
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-[100dvh] bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar Container */}
      <aside className={`
        fixed lg:relative lg:translate-x-0
        w-[280px] h-full
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        z-40
      `}>
        <ChatSidebar
          chats={chats}
          activeChat={activeChat}
          onNewChat={createNewChat}
          onSelectChat={(id) => {
            setActiveChat(id);
            setIsSidebarOpen(false);
          }}
          onDeleteChat={deleteChat}
          onToggleSidebar={() => setIsSidebarOpen(false)}
        />
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 relative">
        {/* Top Bar */}
        <div className="flex justify-between items-center px-4 pt-4 z-30">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 bg-gray-800 dark:bg-gray-700 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <ThemeToggle />
        </div>

        {/* Content Layout */}
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0 p-4">
            <ChatHeader />
          </div>
          
          <div className="flex-1 min-h-0 px-4 mb-4">
            <ChatMessages messages={activeChat?.messages || []} />
          </div>
          
          <div className="flex-shrink-0 p-4 bg-gray-100 dark:bg-gray-900">
            <ChatInput
              isListening={isListening}
              onStartListening={startListening}
              onSendMessage={handleNewMessage}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
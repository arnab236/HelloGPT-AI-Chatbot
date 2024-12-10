import React from 'react';
import { MessageSquare, Plus, Trash2 } from 'lucide-react';
import { Chat } from '../types/chat';

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: Chat | undefined;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onToggleSidebar: () => void;
}

export function ChatSidebar({ 
  chats, 
  activeChat, 
  onNewChat, 
  onSelectChat, 
  onDeleteChat,
  onToggleSidebar
}: ChatSidebarProps) {
  return (
    <div className="w-full h-full bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={() => {
            onNewChat();
            onToggleSidebar();
          }}
          className="w-full flex items-center justify-center gap-2 p-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors text-sm sm:text-base"
        >
          <Plus size={18} />
          <span>New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={`chat-${chat.id}`}
            className={`
              group flex items-center gap-2 p-3 cursor-pointer
              hover:bg-gray-700 transition-colors
              ${chat.id === activeChat?.id ? 'bg-gray-700' : ''}
            `}
          >
            <button
              className="flex-1 flex items-center gap-2 text-left text-sm sm:text-base"
              onClick={() => onSelectChat(chat.id)}
            >
              <MessageSquare size={16} />
              <span className="truncate">{chat.title}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat.id);
              }}
              className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity p-1"
              aria-label="Delete chat"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
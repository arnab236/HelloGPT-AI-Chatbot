import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

export function ChatMessage({ message, isBot }: ChatMessageProps) {
  return (
    <div className={`flex items-start gap-4 ${isBot ? 'bg-gray-50 dark:bg-gray-800' : ''} p-4 rounded-lg`}>
      <div className={`p-2 rounded-full ${isBot ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'}`}>
        {isBot ? (
          <Bot size={20} className="text-blue-600 dark:text-blue-300" />
        ) : (
          <User size={20} className="text-green-600 dark:text-green-300" />
        )}
      </div>
      <p className="text-gray-700 dark:text-gray-300">{message}</p>
    </div>
  );
}
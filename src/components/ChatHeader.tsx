import React from 'react';
import { Bot } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="flex items-center gap-3 mb-4 lg:mb-8">
      <div className="p-2 sm:p-3 bg-blue-500 rounded-full">
        <Bot className="text-white w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">HelloGPT- AI Voice Assistant Chatbot</h1>
    </div>
  );
}
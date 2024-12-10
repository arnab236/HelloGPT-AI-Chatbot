import React from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from '../types/chat';

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-full">
      <div className="h-full overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8 px-4">
            <p className="text-sm sm:text-base">Start speaking or typing to interact with the AI assistant</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={`message-${message.timestamp}-${index}`}
              message={message.text}
              isBot={message.isBot}
            />
          ))
        )}
      </div>
    </div>
  );
}
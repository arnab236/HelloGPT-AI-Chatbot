import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { VoiceControls } from './VoiceControls';

interface ChatInputProps {
  isListening: boolean;
  onStartListening: () => void;
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

export function ChatInput({ isListening, onStartListening, onSendMessage, isProcessing }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isProcessing) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isProcessing ? "Processing..." : "Type your message..."}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          disabled={isProcessing}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim() || isProcessing}
        >
          <Send size={20} className="sm:w-6 sm:h-6" />
        </button>
        <VoiceControls 
          isListening={isListening} 
          onStartListening={onStartListening}
          disabled={isProcessing}
        />
      </div>
    </form>
  );
}
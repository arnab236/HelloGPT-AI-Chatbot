import { useState, useEffect } from 'react';
import { Chat, ChatState } from '../types/chat';

const STORAGE_KEY = 'ai-assistant-chats';

const initialState: ChatState = {
  chats: [],
  activeChat: null,
};

export function useChats() {
  const [state, setState] = useState<ChatState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setState(prev => ({
      chats: [newChat, ...prev.chats],
      activeChat: newChat.id,
    }));

    return newChat.id;
  };

  const updateChatTitle = (chatId: string, title: string) => {
    setState(prev => ({
      ...prev,
      chats: prev.chats.map(chat => 
        chat.id === chatId 
          ? { ...chat, title, updatedAt: Date.now() }
          : chat
      ),
    }));
  };

  const addMessage = (chatId: string, text: string, isBot: boolean) => {
    setState(prev => ({
      ...prev,
      chats: prev.chats.map(chat => 
        chat.id === chatId 
          ? {
              ...chat,
              messages: [...chat.messages, { 
                text, 
                isBot, 
                timestamp: Date.now(),
                id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
              }],
              updatedAt: Date.now(),
              title: chat.messages.length === 0 && !isBot ? text.slice(0, 30) + '...' : chat.title,
            }
          : chat
      ),
    }));
  };

  const deleteChat = (chatId: string) => {
    setState(prev => ({
      chats: prev.chats.filter(chat => chat.id !== chatId),
      activeChat: prev.activeChat === chatId 
        ? (prev.chats[1]?.id || null) 
        : prev.activeChat,
    }));
  };

  const setActiveChat = (chatId: string) => {
    setState(prev => ({
      ...prev,
      activeChat: chatId,
    }));
  };

  return {
    chats: state.chats,
    activeChat: state.chats.find(chat => chat.id === state.activeChat),
    createNewChat,
    updateChatTitle,
    addMessage,
    deleteChat,
    setActiveChat,
  };
}
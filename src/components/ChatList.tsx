import React from 'react';
import { ChatCard } from './ChatCard';
import { mockChats } from '@/lib/mock-data';

export const ChatList = () => {
  return (
    <div className="space-y-4">
      {mockChats.map((chat) => (
        <ChatCard key={chat.id} chat={chat} />
      ))}
    </div>
  );
};
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { MessageCircle, Users } from 'lucide-react';

interface Chat {
  id: string;
  name: string;
  memberCount: number;
  messageCount: number;
  lastActive: string;
}

interface ChatCardProps {
  chat: Chat;
}

export const ChatCard = ({ chat }: ChatCardProps) => {
  const [progress, setProgress] = useState(0);
  const [isExtracting, setIsExtracting] = useState(false);
  const { toast } = useToast();

  const startExtraction = async () => {
    setIsExtracting(true);
    setProgress(0);

    // Simulate extraction progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExtracting(false);
          toast({
            title: "Extraction Complete",
            description: `Successfully extracted data from ${chat.name}`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-medium text-lg text-gray-900">{chat.name}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {chat.memberCount.toLocaleString()} members
            </span>
            <span className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              {chat.messageCount.toLocaleString()} messages
            </span>
          </div>
        </div>
        <Button
          onClick={startExtraction}
          disabled={isExtracting}
          className="bg-primary hover:bg-primary/90"
        >
          {isExtracting ? 'Extracting...' : 'Start Extraction'}
        </Button>
      </div>

      {isExtracting && (
        <div className="mt-4 space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-500 text-right">{progress}% complete</p>
        </div>
      )}
    </div>
  );
};
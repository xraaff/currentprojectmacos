import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Rss, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Chat {
  id: string;
  name: string;
  type: "group" | "channel" | "private";
  participants?: number;
  icon?: string;
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Tech Discussion Group",
    type: "group",
    participants: 1250,
  },
  {
    id: "2",
    name: "News Channel",
    type: "channel",
    participants: 5000,
  },
  {
    id: "3",
    name: "John Doe",
    type: "private",
  },
];

const ChatList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const getIcon = (type: Chat["type"]) => {
    switch (type) {
      case "group":
        return <Users className="h-6 w-6" />;
      case "channel":
        return <Rss className="h-6 w-6" />;
      case "private":
        return <User className="h-6 w-6" />;
      default:
        return <MessageSquare className="h-6 w-6" />;
    }
  };

  const handleStartExtraction = (chatId: string) => {
    toast({
      title: "Starting extraction",
      description: "Please confirm your selection",
    });
    navigate(`/confirm/${chatId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Chats</h1>
        <div className="space-y-4">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="text-gray-600">{getIcon(chat.type)}</div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {chat.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {chat.type.charAt(0).toUpperCase() + chat.type.slice(1)}
                    {chat.participants && ` • ${chat.participants} participants`}
                  </p>
                </div>
              </div>
              <Button onClick={() => handleStartExtraction(chat.id)}>
                Start Extraction
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
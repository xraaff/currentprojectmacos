import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Clock, MessageSquare, Users } from "lucide-react";

const ConfirmExtraction = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const mockChatDetails = {
    name: "Tech Discussion Group",
    type: "group",
    messageCount: 20000,
    estimatedTime: "45 minutes",
  };

  const handleConfirm = () => {
    toast({
      title: "Extraction started",
      description: "The process has begun. Please wait...",
    });
    navigate(`/progress/${chatId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-lg w-full mx-4 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Confirm Extraction
        </h2>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-600">
              <MessageSquare className="h-5 w-5" />
              <span>Chat Name: {mockChatDetails.name}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Users className="h-5 w-5" />
              <span>Type: {mockChatDetails.type}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <MessageSquare className="h-5 w-5" />
              <span>Messages to extract: {mockChatDetails.messageCount}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>Estimated time: {mockChatDetails.estimatedTime}</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/chats")}
            >
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmExtraction;
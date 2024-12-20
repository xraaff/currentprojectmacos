import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Clock } from "lucide-react";

const ExtractionProgress = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState({
    messages: { current: 0, total: 20000 },
    media: { current: 0, total: 100 },
    voice: { current: 0, total: 50 },
  });

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          toast({
            title: "Extraction Complete",
            description: "Your data has been successfully extracted.",
          });
          navigate(`/report/${chatId}`);
          return 100;
        }
        setStatus((prev) => ({
          messages: {
            current: Math.min(
              prev.messages.current + 500,
              prev.messages.total
            ),
            total: prev.messages.total,
          },
          media: {
            current: Math.min(prev.media.current + 5, prev.media.total),
            total: prev.media.total,
          },
          voice: {
            current: Math.min(prev.voice.current + 2, prev.voice.total),
            total: prev.voice.total,
          },
        }));
        return prev + 2;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [chatId, navigate, toast]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-lg w-full mx-4 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Extracting Data...
        </h2>

        <div className="space-y-8">
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-500 text-right">{progress}% complete</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">
                Extracting messages
              </p>
              <p className="text-sm text-gray-500">
                {status.messages.current.toLocaleString()} /{" "}
                {status.messages.total.toLocaleString()}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">
                Downloading media files
              </p>
              <p className="text-sm text-gray-500">
                {status.media.current} / {status.media.total}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">
                Extracting voice messages
              </p>
              <p className="text-sm text-gray-500">
                {status.voice.current} / {status.voice.total}
              </p>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>
                Estimated time remaining:{" "}
                {Math.ceil((100 - progress) / 2)} minutes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractionProgress;
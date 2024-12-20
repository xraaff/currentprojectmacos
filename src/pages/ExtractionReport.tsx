import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Image,
  Video,
  FileAudio,
  Brain,
  Cloud,
  Database,
} from "lucide-react";

const ExtractionReport = () => {
  const { toast } = useToast();

  const handleProcessWithAI = () => {
    toast({
      title: "Processing with AI",
      description: "Your data is being processed with AI...",
    });
  };

  const handleSaveToBackblaze = () => {
    toast({
      title: "Uploading to Backblaze",
      description: "Your data is being uploaded to cloud storage...",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Extraction Complete
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Database className="h-5 w-5" />
                  <span>20,000 messages extracted</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Image className="h-5 w-5" />
                  <span>150 images</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Video className="h-5 w-5" />
                  <span>25 videos</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FileText className="h-5 w-5" />
                  <span>10 PDFs</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FileAudio className="h-5 w-5" />
                  <span>50 voice messages</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-gray-600">
                  Total data size: <span className="font-medium">1.2 GB</span>
                </p>
                <p className="text-gray-600">
                  Estimated cost:{" "}
                  <span className="font-medium">$2.50</span>
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <Button
                className="w-full flex items-center justify-center space-x-2"
                onClick={handleProcessWithAI}
              >
                <Brain className="h-5 w-5" />
                <span>Process with AI</span>
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
                onClick={handleSaveToBackblaze}
              >
                <Cloud className="h-5 w-5" />
                <span>Save to Backblaze</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractionReport;
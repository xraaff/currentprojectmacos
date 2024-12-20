import { ChatList } from '@/components/ChatList';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Telegram Data Extraction</h1>
            <p className="text-gray-600">Select a chat to begin extracting data</p>
          </div>
          <ChatList />
        </div>
      </div>
    </div>
  );
};

export default Index;
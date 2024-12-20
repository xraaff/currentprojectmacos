import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import ChatList from "./pages/ChatList";
import ConfirmExtraction from "./pages/ConfirmExtraction";
import ExtractionProgress from "./pages/ExtractionProgress";
import ExtractionReport from "./pages/ExtractionReport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/chats" element={<ChatList />} />
          <Route path="/confirm/:chatId" element={<ConfirmExtraction />} />
          <Route path="/progress/:chatId" element={<ExtractionProgress />} />
          <Route path="/report/:chatId" element={<ExtractionReport />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
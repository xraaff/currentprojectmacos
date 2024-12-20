import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Phone } from "lucide-react";

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to send the SMS
    setStep("code");
    toast({
      title: "Verification code sent",
      description: "Please check your phone for the code",
    });
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === "123456") { // Mock validation
      navigate("/chats");
      toast({
        title: "Successfully connected",
        description: "Welcome to Telegram Data Extractor",
      });
    } else {
      toast({
        title: "Invalid code",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Connect to Telegram
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === "phone"
              ? "Enter your phone number to receive a verification code"
              : "Enter the verification code sent to your phone"}
          </p>
        </div>

        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="mt-8 space-y-6">
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="tel"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Code
            </Button>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit} className="mt-8 space-y-6">
            <Input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="text-center text-2xl tracking-widest"
              required
            />
            <Button type="submit" className="w-full">
              Connect
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setStep("phone")}
            >
              Back to phone number
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
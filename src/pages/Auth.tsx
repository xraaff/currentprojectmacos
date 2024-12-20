import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Phone } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// Dummy data for testing
const VALID_TEST_CODE = "123456";
const TEST_PHONE_HINT = "+1234567890";

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter any test phone number",
        variant: "destructive",
      });
      return;
    }
    
    // Simple validation for demo purposes
    if (!phoneNumber.match(/^\+?[\d\s-]{10,}$/)) {
      toast({
        title: "Error",
        description: `Please enter a valid phone number format (e.g., ${TEST_PHONE_HINT})`,
        variant: "destructive",
      });
      return;
    }

    setStep("code");
    toast({
      title: "Test mode",
      description: `Use this test code: ${VALID_TEST_CODE}`,
    });
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a 6-digit code",
        variant: "destructive",
      });
      return;
    }
    
    if (code === VALID_TEST_CODE) {
      navigate("/chats");
      toast({
        title: "Test login successful",
        description: "Welcome to the Telegram Data Extractor demo",
      });
    } else {
      toast({
        title: "Invalid test code",
        description: `⚠️ Please use the test code: ${VALID_TEST_CODE}`,
        variant: "destructive",
      });
      setCode("");
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
              ? `Demo mode: Enter any valid phone number (e.g., ${TEST_PHONE_HINT})`
              : `Enter the test code: ${VALID_TEST_CODE}`}
          </p>
        </div>

        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="mt-8 space-y-6">
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="tel"
                placeholder={TEST_PHONE_HINT}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Test Code
            </Button>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit} className="mt-8 space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(value) => setCode(value)}
                render={({ slots }) => (
                  <InputOTPGroup className="gap-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
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
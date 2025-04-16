
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-isitu-purple-light p-6 text-center">
      {loading ? (
        <div className="animate-pulse flex flex-col items-center">
          <Heart size={80} className="text-isitu-purple animate-pulse-heart" />
          <h1 className="text-4xl font-bold mt-6 text-isitu-purple">IsItU</h1>
        </div>
      ) : (
        <>
          <Heart size={80} className="text-isitu-purple mb-6" />
          <h1 className="text-4xl font-bold mb-2 text-isitu-purple">IsItU</h1>
          <p className="text-xl mb-8 text-gray-700">Find your perfect match with meaningful connections</p>
          
          <div className="w-full max-w-xs space-y-4">
            <Button 
              className="w-full bg-isitu-purple hover:bg-isitu-purple-dark text-white rounded-full py-6"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </Button>
            
            <Button 
              variant="outline"
              className="w-full border-isitu-purple text-isitu-purple hover:bg-isitu-purple-light rounded-full py-6"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            
            <p className="text-sm text-gray-500 mt-8">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;

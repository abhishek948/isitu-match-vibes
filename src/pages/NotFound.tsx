
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-center">
      <Heart size={80} className="text-isitu-purple mb-6 opacity-50" />
      
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-6">
        We couldn't find the page "{location.pathname}"
      </p>
      
      <Button
        onClick={() => navigate("/")}
        className="bg-isitu-purple hover:bg-isitu-purple-dark text-white rounded-full"
      >
        <Home size={18} className="mr-2" />
        Return Home
      </Button>
    </div>
  );
};

export default NotFound;

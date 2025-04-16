
import React, { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 py-3 px-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-isitu-purple focus:border-transparent"
      />
      <button
        type="submit"
        className={`p-3 rounded-full ${
          message.trim() ? "bg-isitu-purple text-white" : "bg-gray-200 text-gray-400"
        }`}
        disabled={!message.trim()}
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;

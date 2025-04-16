
import React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  timestamp: string;
  isSelf: boolean;
  status?: "sent" | "delivered" | "read";
}

const ChatMessage = ({ message, timestamp, isSelf, status = "sent" }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "max-w-[80%] mb-2",
        isSelf ? "self-end" : "self-start"
      )}
    >
      <div
        className={cn(
          "px-4 py-2 rounded-2xl",
          isSelf
            ? "bg-isitu-purple text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        )}
      >
        <p>{message}</p>
      </div>
      <div
        className={cn(
          "flex items-center text-xs mt-1",
          isSelf ? "justify-end" : "justify-start"
        )}
      >
        <span className="text-gray-500">{timestamp}</span>
        {isSelf && status === "read" && (
          <span className="ml-1 text-isitu-purple">Read</span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;

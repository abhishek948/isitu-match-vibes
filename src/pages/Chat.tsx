
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMessages, sendMessage } from "@/services/profileService";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

interface MatchInfo {
  id: string;
  name: string;
  image: string;
}

const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchInfo, setMatchInfo] = useState<MatchInfo | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data for this example
  const mockMatches = {
    "1": {
      id: "1", 
      name: "Emma",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
    },
    "3": {
      id: "3",
      name: "Sophia",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchMessages = async () => {
      try {
        setMatchInfo(mockMatches[id as keyof typeof mockMatches] || null);
        const data = await getMessages(id) as Message[];
        setMessages(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (text: string) => {
    if (!id) return;
    
    try {
      // Optimistically update the UI
      const tempId = `temp-${Date.now()}`;
      const tempMessage = {
        id: tempId,
        senderId: "currentUser",
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "sent" as const
      };
      
      setMessages([...messages, tempMessage]);
      
      // Send the message to the API
      const newMessage = await sendMessage(id, text) as Message;
      
      // Update with the actual message from the API
      setMessages(prev => 
        prev.map(msg => msg.id === tempId ? newMessage : msg)
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button 
          onClick={() => navigate("/matches")}
          className="p-1"
        >
          <ArrowLeft size={24} />
        </button>
        
        {matchInfo && (
          <div className="flex items-center ml-3">
            <img 
              src={matchInfo.image} 
              alt={matchInfo.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <h2 className="font-semibold">{matchInfo.name}</h2>
            </div>
          </div>
        )}
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-pulse space-y-4 w-full max-w-md">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    i % 2 === 0 ? "bg-gray-100 self-start" : "bg-gray-200 self-end ml-auto"
                  }`}
                  style={{ width: `${Math.random() * 40 + 40}%` }}
                >
                  <div className="h-4 bg-gray-300 rounded mb-1"></div>
                  {i % 2 !== 0 && <div className="h-4 bg-gray-300 rounded w-3/4"></div>}
                </div>
              ))}
            </div>
          </div>
        ) : messages.length > 0 ? (
          <>
            {messages.map(message => (
              <ChatMessage
                key={message.id}
                message={message.text}
                timestamp={message.timestamp}
                isSelf={message.senderId === "currentUser"}
                status={message.status}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="mb-4">
              <img 
                src={matchInfo?.image} 
                alt="Match" 
                className="w-20 h-20 rounded-full object-cover mx-auto"
              />
            </div>
            <h3 className="text-lg font-semibold">You matched with {matchInfo?.name}!</h3>
            <p className="text-gray-500 mt-2">
              Send a message to start the conversation
            </p>
          </div>
        )}
      </div>
      
      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;

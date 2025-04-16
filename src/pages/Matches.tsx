
import React, { useState, useEffect } from "react";
import { getMatches } from "@/services/profileService";
import MatchItem from "@/components/matches/MatchItem";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Match {
  id: string;
  name: string;
  image: string;
  lastMessage?: string;
  timestamp?: string;
  isNew?: boolean;
  hasUnread?: boolean;
}

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [conversations, setConversations] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getMatches() as Match[];
        
        // Split into matches with and without messages
        const newMatches = data.filter(match => !match.lastMessage);
        const activeConversations = data.filter(match => match.lastMessage);
        
        setMatches(newMatches);
        setConversations(activeConversations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching matches:", error);
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-center">Connections</h1>
      </div>
      
      <Tabs defaultValue="conversations">
        <div className="px-4 py-2">
          <TabsList className="w-full">
            <TabsTrigger value="conversations" className="w-1/2">Messages</TabsTrigger>
            <TabsTrigger value="matches" className="w-1/2">Matches</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="conversations" className="pt-2 pb-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse w-full max-w-md space-y-4 px-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : conversations.length > 0 ? (
            <div className="space-y-1">
              {conversations.map(conversation => (
                <MatchItem 
                  key={conversation.id}
                  id={conversation.id}
                  name={conversation.name}
                  image={conversation.image}
                  lastMessage={conversation.lastMessage}
                  hasUnread={conversation.hasUnread}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 px-4">
              <p className="text-gray-500">No messages yet. Start a conversation with your matches!</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="matches" className="pt-2 pb-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse w-full max-w-md space-y-4 px-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : matches.length > 0 ? (
            <div className="space-y-1">
              {matches.map(match => (
                <MatchItem 
                  key={match.id}
                  id={match.id}
                  name={match.name}
                  image={match.image}
                  isNew={match.isNew}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 px-4">
              <p className="text-gray-500">No new matches. Keep swiping to find your next match!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <BottomNavigation />
    </div>
  );
};

export default Matches;

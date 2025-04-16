
import React, { useState, useEffect } from "react";
import { getProfiles } from "@/services/profileService";
import ProfileCard, { Profile } from "@/components/cards/ProfileCard";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { Heart, X } from "lucide-react";
import { toast } from "sonner";

const Browse = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [dislikeAnimation, setDislikeAnimation] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getProfiles();
        setProfiles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleLike = (id: string) => {
    setLikeAnimation(true);
    setTimeout(() => {
      setLikeAnimation(false);
      goToNextProfile();
      
      // 20% chance of a match
      const isMatch = Math.random() < 0.2;
      if (isMatch) {
        const matchedProfile = profiles.find(p => p.id === id);
        if (matchedProfile) {
          toast.success(`You matched with ${matchedProfile.name}!`);
        }
      }
    }, 700);
  };

  const handleDislike = (id: string) => {
    setDislikeAnimation(true);
    setTimeout(() => {
      setDislikeAnimation(false);
      goToNextProfile();
    }, 700);
  };

  const goToNextProfile = () => {
    setCurrentIndex(prevIndex => {
      // If we've gone through all profiles, show a message
      if (prevIndex >= profiles.length - 1) {
        toast("You've seen all profiles for now. Check back later!");
        return prevIndex;
      }
      return prevIndex + 1;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center text-isitu-purple mb-4">IsItU</h1>
      </div>
      
      <div className="px-4 py-2">
        {loading ? (
          <div className="flex justify-center items-center h-[70vh]">
            <Heart size={48} className="text-isitu-purple animate-pulse" />
          </div>
        ) : profiles.length > currentIndex ? (
          <div className="relative">
            <ProfileCard 
              profile={profiles[currentIndex]} 
              onLike={handleLike} 
              onDislike={handleDislike}
              className={`transition-opacity duration-300 ${likeAnimation && "opacity-0"} ${dislikeAnimation && "opacity-0"}`}
            />
            
            {/* Like Animation */}
            {likeAnimation && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Heart size={120} className="text-isitu-purple animate-pulse-heart" />
              </div>
            )}
            
            {/* Dislike Animation */}
            {dislikeAnimation && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <X size={120} className="text-gray-400 rotate-12" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
            <h2 className="text-xl font-semibold mb-2">No more profiles</h2>
            <p className="text-gray-500 mb-6">
              Check back soon to see more people in your area!
            </p>
            
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Browse;

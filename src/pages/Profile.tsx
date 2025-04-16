
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "@/services/profileService";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { Settings, LogOut, Camera, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  lookingFor: string[];
  images: string[];
  bio: string;
  interests: string[];
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCurrentUser() as UserProfile;
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => navigate("/settings")}
            className="p-2 rounded-full bg-gray-100"
          >
            <Settings size={20} />
          </button>
          <button 
            onClick={handleLogout}
            className="p-2 rounded-full bg-gray-100 text-red-500"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="animate-pulse p-4 space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-gray-200 h-32 w-32"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      ) : profile ? (
        <div className="p-4">
          <div className="relative mb-6">
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src={profile.images[0]} 
                  alt={profile.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                />
                <button 
                  className="absolute bottom-0 right-0 p-2 bg-isitu-purple rounded-full text-white"
                >
                  <Camera size={18} />
                </button>
              </div>
            </div>
            
            <div className="text-center mt-3">
              <h2 className="text-xl font-semibold">{profile.name}, {profile.age}</h2>
              <p className="text-gray-500">{profile.gender}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">About Me</h3>
                <button className="text-isitu-purple">
                  <Edit size={16} />
                </button>
              </div>
              <p className="text-gray-700">{profile.bio}</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Interests</h3>
                <button className="text-isitu-purple">
                  <Edit size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span 
                    key={index}
                    className="bg-isitu-purple-light text-isitu-purple-dark px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Looking For</h3>
                <button className="text-isitu-purple">
                  <Edit size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.lookingFor.map((preference, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {preference}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Photos</h3>
                <button className="text-isitu-purple">
                  <Edit size={16} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {profile.images.map((image, index) => (
                  <div 
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <img 
                      src={image} 
                      alt={`Photo ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                
                {profile.images.length < 5 && (
                  <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <Camera size={24} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center">
          <p>Failed to load profile</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      )}
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;

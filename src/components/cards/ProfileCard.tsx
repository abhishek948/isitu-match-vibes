
import React from "react";
import { Heart, X, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  distance: string;
  bio: string;
  images: string[];
  interests?: string[];
}

interface ProfileCardProps {
  profile: Profile;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  className?: string;
}

const ProfileCard = ({ profile, onLike, onDislike, className }: ProfileCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = () => {
    if (currentImageIndex < profile.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div 
      className={cn(
        "profile-card w-full max-w-sm mx-auto h-[70vh] relative",
        className
      )}
    >
      <div className="relative h-4/5 overflow-hidden">
        <img 
          src={profile.images[currentImageIndex]} 
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        
        {/* Image navigation dots */}
        <div className="absolute top-4 left-0 right-0 flex justify-center gap-1.5">
          {profile.images.map((_, index) => (
            <div 
              key={index}
              className={cn(
                "h-1 rounded-full transition-all",
                currentImageIndex === index ? "bg-white w-6" : "bg-white/50 w-1.5"
              )}
            />
          ))}
        </div>
        
        {/* Image navigation */}
        <div 
          className="absolute left-0 top-0 h-full w-1/2"
          onClick={prevImage}
        />
        <div 
          className="absolute right-0 top-0 h-full w-1/2"
          onClick={nextImage}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{profile.name}, {profile.age}</h2>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin size={14} className="mr-1" />
              <span>{profile.distance} away • {profile.location}</span>
            </div>
          </div>
        </div>
        
        {profile.interests && profile.interests.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {profile.interests.map((interest, index) => (
              <span 
                key={index}
                className="bg-isitu-purple-light text-isitu-purple-dark px-2 py-0.5 rounded-full text-xs"
              >
                {interest}
              </span>
            ))}
          </div>
        )}
        
        <p className="text-gray-600 mt-2 line-clamp-2">{profile.bio}</p>
      </div>
      
      {/* Action buttons */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6">
        <button 
          onClick={() => onDislike(profile.id)}
          className="bg-white p-3 rounded-full shadow-md"
        >
          <X size={28} className="text-red-500" />
        </button>
        
        <button 
          onClick={() => onLike(profile.id)}
          className="bg-white p-3 rounded-full shadow-md"
        >
          <Heart size={28} className="text-isitu-purple" />
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;

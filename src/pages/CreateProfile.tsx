
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Plus } from "lucide-react";
import { toast } from "sonner";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    lookingFor: [] as string[],
    bio: "",
    images: [] as string[],
    interests: [] as string[]
  });
  const [newInterest, setNewInterest] = useState("");
  const [loading, setLoading] = useState(false);

  const genderOptions = ["Woman", "Man", "Non-binary", "Other"];
  const lookingForOptions = ["Women", "Men", "Non-binary people", "Everyone"];

  const handlePhotoUpload = () => {
    // In a real app, this would trigger a file upload
    // For demo purposes, we'll add a placeholder image
    const demoImages = [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
    ];
    
    if (formData.images.length < 5) {
      setFormData({
        ...formData,
        images: [...formData.images, demoImages[formData.images.length % 2]]
      });
      toast.success("Photo added!");
    } else {
      toast.error("Maximum 5 photos allowed");
    }
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      if (formData.interests.length < 5) {
        setFormData({
          ...formData,
          interests: [...formData.interests, newInterest.trim()]
        });
        setNewInterest("");
      } else {
        toast.error("Maximum 5 interests allowed");
      }
    }
  };

  const toggleLookingFor = (option: string) => {
    if (formData.lookingFor.includes(option)) {
      setFormData({
        ...formData,
        lookingFor: formData.lookingFor.filter(item => item !== option)
      });
    } else {
      setFormData({
        ...formData,
        lookingFor: [...formData.lookingFor, option]
      });
    }
  };

  const handleNext = () => {
    if (step === 1 && (!formData.age || !formData.gender || formData.lookingFor.length === 0)) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (step === 2 && formData.images.length === 0) {
      toast.error("Please add at least one photo");
      return;
    }
    
    if (step === 3) {
      if (!formData.bio) {
        toast.error("Please add a bio");
        return;
      }
      
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        toast.success("Profile created successfully!");
        navigate("/browse");
      }, 1500);
      
      return;
    }
    
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="mb-6 flex justify-between items-center">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : navigate("/")}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex space-x-1">
          {[1, 2, 3].map((s) => (
            <div 
              key={s}
              className={`h-1 rounded-full transition-all ${
                s === step ? "bg-isitu-purple w-8" : "bg-gray-200 w-8"
              }`}
            />
          ))}
        </div>
        <div className="w-10"></div> {/* Placeholder for alignment */}
      </div>
      
      <div className="flex-1 max-w-sm mx-auto w-full">
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold mb-8">Basic Information</h1>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="rounded-xl"
                  min="18"
                  max="120"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {genderOptions.map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({...formData, gender: option})}
                      className={`py-3 px-4 border rounded-xl ${
                        formData.gender === option
                          ? "border-isitu-purple bg-isitu-purple-light text-isitu-purple-dark"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I'm interested in
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {lookingForOptions.map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleLookingFor(option)}
                      className={`py-3 px-4 border rounded-xl ${
                        formData.lookingFor.includes(option)
                          ? "border-isitu-purple bg-isitu-purple-light text-isitu-purple-dark"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        
        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold mb-8">Add Photos</h1>
            
            <div className="mb-4">
              <p className="text-gray-600 mb-6">
                Add at least 1 photo to continue. You can add up to 5 photos.
              </p>
              
              <div className="grid grid-cols-3 gap-2">
                {[...Array(5)].map((_, index) => (
                  <div 
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden ${
                      index < formData.images.length ? "" : "border-2 border-dashed border-gray-300"
                    }`}
                  >
                    {index < formData.images.length ? (
                      <img 
                        src={formData.images[index]} 
                        alt={`Photo ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <button
                        onClick={handlePhotoUpload}
                        className="w-full h-full flex items-center justify-center bg-gray-50"
                      >
                        <Camera size={24} className="text-gray-400" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {step === 3 && (
          <>
            <h1 className="text-2xl font-bold mb-8">About You</h1>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="rounded-xl resize-none"
                  rows={4}
                  maxLength={500}
                />
                <p className="text-xs text-right text-gray-500 mt-1">
                  {formData.bio.length}/500
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interests
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="bg-isitu-purple-light text-isitu-purple-dark px-3 py-1.5 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <Input
                    placeholder="Add an interest"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    className="rounded-l-xl rounded-r-none"
                    maxLength={20}
                    onKeyDown={(e) => e.key === "Enter" && addInterest()}
                  />
                  <Button
                    type="button"
                    onClick={addInterest}
                    className="rounded-l-none rounded-r-xl bg-isitu-purple"
                  >
                    <Plus size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
        
        <Button 
          onClick={handleNext}
          className="w-full bg-isitu-purple hover:bg-isitu-purple-dark text-white rounded-full py-6 mt-8"
          disabled={loading}
        >
          {step === 3 ? (loading ? "Creating profile..." : "Complete Profile") : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default CreateProfile;

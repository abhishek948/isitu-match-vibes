
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center px-2 z-50">
      <NavLink
        to="/browse"
        className={({ isActive }) => cn("bottom-nav-item", isActive && "active")}
      >
        <Home size={24} />
        <span className="text-xs mt-1">Browse</span>
      </NavLink>
      
      <NavLink
        to="/matches"
        className={({ isActive }) => cn("bottom-nav-item", isActive && "active")}
      >
        <Users size={24} />
        <span className="text-xs mt-1">Matches</span>
      </NavLink>
      
      <NavLink
        to="/chats"
        className={({ isActive }) => cn("bottom-nav-item", isActive && "active")}
      >
        <MessageSquare size={24} />
        <span className="text-xs mt-1">Chats</span>
      </NavLink>
      
      <NavLink
        to="/profile"
        className={({ isActive }) => cn("bottom-nav-item", isActive && "active")}
      >
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </NavLink>
    </div>
  );
};

export default BottomNavigation;

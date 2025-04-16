
import React from "react";
import { Link } from "react-router-dom";

interface MatchItemProps {
  id: string;
  name: string;
  image: string;
  lastMessage?: string;
  isNew?: boolean;
  hasUnread?: boolean;
}

const MatchItem = ({ id, name, image, lastMessage, isNew, hasUnread }: MatchItemProps) => {
  return (
    <Link to={`/chats/${id}`} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover"
        />
        {isNew && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-isitu-purple rounded-full flex items-center justify-center text-white text-xs font-bold">
            New
          </div>
        )}
      </div>
      <div className="ml-3 flex-1">
        <div className="flex justify-between items-baseline">
          <h3 className="font-medium">{name}</h3>
        </div>
        {lastMessage && (
          <p className={`text-sm ${hasUnread ? "font-medium text-gray-800" : "text-gray-500"} truncate`}>
            {lastMessage}
          </p>
        )}
        {!lastMessage && (
          <p className="text-sm text-isitu-purple">
            Send the first message!
          </p>
        )}
      </div>
      {hasUnread && (
        <div className="w-2.5 h-2.5 bg-isitu-purple rounded-full mr-1"></div>
      )}
    </Link>
  );
};

export default MatchItem;

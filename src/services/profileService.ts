
import { Profile } from "@/components/cards/ProfileCard";

// Mock user data
const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Emma",
    age: 28,
    location: "New York",
    distance: "3 miles",
    bio: "Coffee enthusiast, dog lover, and adventure seeker. Let's explore the city together!",
    images: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
    ],
    interests: ["Coffee", "Hiking", "Photography", "Dogs"]
  },
  {
    id: "2",
    name: "Alex",
    age: 30,
    location: "Brooklyn",
    distance: "5 miles",
    bio: "Musician by night, software engineer by day. Looking for someone to share concerts with.",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1448&q=80"
    ],
    interests: ["Music", "Coding", "Concerts"]
  },
  {
    id: "3",
    name: "Sophia",
    age: 26,
    location: "Manhattan",
    distance: "2 miles",
    bio: "Art history major who loves museums, good books, and better wine. Let's get cultured together.",
    images: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1541823709867-1b206113eafd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
    ],
    interests: ["Art", "Literature", "Wine Tasting"]
  },
  {
    id: "4",
    name: "Michael",
    age: 32,
    location: "Queens",
    distance: "8 miles",
    bio: "Chef who loves creating culinary experiences. Foodie adventures are my specialty.",
    images: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
    ],
    interests: ["Cooking", "Food", "Travel"]
  },
  {
    id: "5",
    name: "Olivia",
    age: 27,
    location: "Manhattan",
    distance: "1 mile",
    bio: "Yoga instructor who believes in mindfulness and authenticity. Looking for genuine connections.",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
      "https://images.unsplash.com/photo-1504276048855-f3d60e69632f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1832&q=80"
    ],
    interests: ["Yoga", "Meditation", "Hiking", "Vegan Cooking"]
  }
];

// User matches (these would come from a backend in a real app)
const mockMatches = [
  {
    id: "1",
    name: "Emma",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    lastMessage: "Hey, how's your day going?",
    timestamp: "10:30 AM",
    isNew: false,
    hasUnread: true
  },
  {
    id: "3",
    name: "Sophia",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    lastMessage: "",
    timestamp: "Yesterday",
    isNew: true,
    hasUnread: false
  }
];

// Mock chat messages
interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      senderId: "1",
      text: "Hey there! How are you doing?",
      timestamp: "10:30 AM",
      status: "read"
    },
    {
      id: "m2",
      senderId: "currentUser",
      text: "Hi Emma! I'm doing well, thanks for asking. How about you?",
      timestamp: "10:32 AM",
      status: "read"
    },
    {
      id: "m3",
      senderId: "1",
      text: "I'm great! Just finished my morning coffee and about to take my dog for a walk.",
      timestamp: "10:33 AM",
      status: "read"
    },
    {
      id: "m4",
      senderId: "currentUser",
      text: "That sounds nice! What kind of dog do you have?",
      timestamp: "10:35 AM",
      status: "read"
    },
    {
      id: "m5",
      senderId: "1",
      text: "I have a golden retriever named Max. He's the best! Do you have any pets?",
      timestamp: "10:30 AM",
      status: "delivered"
    }
  ]
};

// Mock user data
const mockCurrentUser = {
  id: "currentUser",
  name: "Jamie",
  age: 29,
  gender: "Non-binary",
  lookingFor: ["Women", "Men", "Non-binary people"],
  images: [
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  ],
  bio: "Tech enthusiast and part-time baker. Looking for someone to share cupcakes and code with.",
  interests: ["Baking", "Technology", "Hiking", "Movies"]
};

// Get all available profiles (in a real app, this would fetch from an API)
export const getProfiles = (): Promise<Profile[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProfiles);
    }, 300);
  });
};

// Get all matches
export const getMatches = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMatches);
    }, 300);
  });
};

// Get chat messages
export const getMessages = (matchId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMessages[matchId] || []);
    }, 300);
  });
};

// Send a message
export const sendMessage = (matchId: string, text: string) => {
  return new Promise((resolve) => {
    const newMessage = {
      id: `m${Date.now()}`,
      senderId: "currentUser",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent" as const
    };
    
    if (!mockMessages[matchId]) {
      mockMessages[matchId] = [];
    }
    
    mockMessages[matchId] = [...mockMessages[matchId], newMessage];
    
    setTimeout(() => {
      resolve(newMessage);
    }, 300);
  });
};

// Get current user
export const getCurrentUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCurrentUser);
    }, 300);
  });
};

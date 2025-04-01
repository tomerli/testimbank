
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Define user type
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
};

// Define context type
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Sample users data
const USERS: User[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
  },
];

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email in sample data
      let foundUser = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      // If user not found in sample data, create a dynamic user (demo mode)
      if (!foundUser) {
        // Extract name parts from email or use defaults
        const nameParts = email.split('@')[0].split('.');
        const firstName = nameParts[0] ? 
          nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1) : 
          "Demo";
        const lastName = nameParts[1] ? 
          nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : 
          "User";
        
        foundUser = {
          id: Math.random().toString(36).substr(2, 9),
          firstName,
          lastName,
          email,
        };
      }
      
      // Set user in state and localStorage
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      
      toast.success(`Welcome to TestimBank, ${foundUser.firstName}!`);
    } catch (error) {
      toast.error("Login failed: " + (error instanceof Error ? error.message : "Unknown error"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists in demo users
      if (USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error("Email already in use");
      }
      
      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        firstName,
        lastName,
        email,
      };
      
      // Set user in state and localStorage
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast.success(`Welcome to TestimBank, ${firstName}!`);
    } catch (error) {
      toast.error("Registration failed: " + (error instanceof Error ? error.message : "Unknown error"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);

// src/context/auth/AuthContext.tsx

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/services/auth.service"; // Sẽ tạo ở bước 3

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkLoginStatus = async () => {
    try {
      const data = await authService.getMe();
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, checkLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

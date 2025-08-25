"use client";
import { createContext, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useCurrentUser } from "@/queries/auth";
import type { AuthContextValue, AuthProviderProps } from "@/lib/type";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: user, isLoading: loading, error } = useCurrentUser();

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch user:", error);
      Cookies.remove("session_token");
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{ user: user?.data || null, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

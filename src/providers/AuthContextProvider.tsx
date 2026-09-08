"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { IAuthUser } from "../types/auth.user.type";
import { IProps } from "../types/props.type";
import { showToast } from "../components/Toast";
import Cookies from "js-cookie";
import authservice from "../services/authservices";
import "../client/axios/interceptor";

interface AuthContextValue {
  user: IAuthUser | null;
  isLoading: boolean;
  refetchUser: (data: IAuthUser) => void;
  setUser: (data: null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthContextProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const response = await authservice.getCurrentUser();
      console.log("i am here");
      setUser({
        id: response.user.id,
        role: response.user.role,
        email: response.user.email,
        adminId: response.user.adminId,
      });
    } catch {
      showToast.error("User is not logged in !");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetUser = (data: IAuthUser) => setUser(data);

  const value = {
    user,
    isLoading,
    setUser: setUser,
    refetchUser: handleSetUser,
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      setIsLoading(false);
      return;
    }
    getCurrentUser();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export default AuthContextProvider;

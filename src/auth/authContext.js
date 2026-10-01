import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../core/data/remote/appwrite/appwrite";

import { AuthService } from "./authService";

const AuthContext = createContext();
export function AuthContextProvider({ children }) {
  const authService = new AuthService(account);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    setLoading(true);
    try {
      const user = await authService.getUser();
      setUser(user);
    } catch (error) {
      console.error("❌ Error getting account:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    try {
      const user = await authService.createAccount({ email, password });
      await login(email, password);
    } catch (error) {
      console.error("❌ Error creating account:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const session = await authService.login({ email, password });
      await loadUser();
    } catch (error) {
      console.error("❌ Error logging in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("❌ Error logging out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

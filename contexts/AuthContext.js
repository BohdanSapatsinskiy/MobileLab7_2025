import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [idToken, setIdToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("idToken");
      const uid = await AsyncStorage.getItem("userId");
      if (token && uid) {
        setIdToken(token);
        setUserId(uid);
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  const signIn = async (token, uid) => {
    setIdToken(token);
    setUserId(uid);
    await AsyncStorage.setItem("idToken", token);
    await AsyncStorage.setItem("userId", uid);
  };

  const signOut = async () => {
    setIdToken(null);
    setUserId(null);
    await AsyncStorage.removeItem("idToken");
    await AsyncStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ idToken, userId, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

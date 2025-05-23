import axios from "axios";
import { firebaseConfig, FIREBASE_AUTH_BASE_URL } from "./firebaseConfig";

const API_KEY = firebaseConfig.apiKey;

export const registerUser = async (email, password) => {
  const url = `${FIREBASE_AUTH_BASE_URL}:signUp?key=${API_KEY}`;
  const response = await axios.post(url, { email, password, returnSecureToken: true });
  return response.data;
};

export const loginUser = async (email, password) => {
  const url = `${FIREBASE_AUTH_BASE_URL}:signInWithPassword?key=${API_KEY}`;
  const response = await axios.post(url, { email, password, returnSecureToken: true });
  return response.data;
};

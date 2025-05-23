import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "https://lab7mobapp-default-rtdb.firebaseio.com",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("idToken");
    if (token) {
      config.params = config.params || {};
      config.params.auth = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  async (error) => {
     if (error.response?.status === 401 || error.response?.status === 0) {
      await AsyncStorage.removeItem("idToken");
    }
    return Promise.reject(error);
  }
);

export default instance;

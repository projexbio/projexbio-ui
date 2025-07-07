import axios from "axios";
import { getJWT } from "@/lib/query/useJWT";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Extend AxiosRequestConfig to include our custom options
declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

// Create a custom axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  async (config) => {
    // Skip adding JWT if skipAuth is true
    if (config.skipAuth) {
      return config;
    }

    const jwt = await getJWT();
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// --- Context and API Setup ---
// The correct way to handle environment variables for Vercel
const VITE_BASE_URL = typeof process.env.VITE_BASE_URL !== "undefined"
  ? process.env.VITE_BASE_URL
  : "https://crypto-project-backend-gamma.vercel.app/";

const axiosInstance = axios.create({
  baseURL: VITE_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Configure axios interceptors
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      config => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          handleLogout();
          toast.error("Session expired. Please login again.");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);

  // Persist auth state
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [token, user]);

  const register = async (name, email, password) => {
    try {
      const { data } = await axiosInstance.post("/api/user/register", {
        name,
        email,
        password,
      });
      
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        toast.success("Registration successful!");
        navigate("/home");
        return true;
      }
      toast.error(data.message || "Registration failed");
      return false;
    } catch (error) {
      console.error("Register Error:", error);
      const errorMsg = error.response?.data?.message ||
                       error.message ||
                       "Registration failed";
      toast.error(errorMsg);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await axiosInstance.post("/api/user/login", {
        email,
        password
      });
      
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        toast.success("Login successful!");
        navigate("/home");
        return true;
      }
      toast.error(data.message || "Invalid credentials");
      return false;
    } catch (error) {
      console.error("Login Error:", error);
      const errorMsg = error.response?.data?.message ||
                       error.message ||
                       "Login failed";
      toast.error(errorMsg);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    navigate("/");
  };

  const value = {
    token,
    user,
    axiosInstance,
    login,
    register,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  // Attach token to axios
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Save user in localStorage when updated
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ✅ Register
  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(`/api/user/register`, {
        name,
        email,
        password,
      });
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        toast.success("Registration successful!");
        navigate("/home");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Register Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  // ✅ Login
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`/api/user/login`, { email, password });
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        toast.success("Login successful!");
        navigate("/home");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  // ✅ Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  return (
    <AppContext.Provider value={{ token, user, setUser, login, register, logout }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => useContext(AppContext);

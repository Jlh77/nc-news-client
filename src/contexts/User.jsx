import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.credentials = "include";

const authApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://nc-news77.herokuapp.com/api/auth"
      : "http://localhost:9099/api/auth",
});

export const UserContext = createContext();
export const useAuth = () => {
  return useContext(UserContext);
};

export const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [change, setChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      await getCurrentUser();
    };
    loadUser();
  }, [change]);

  const getCurrentUser = async () => {
    const { data } = await authApi.get(`current-user`);
    setCurrentUser(data);
    return data;
  };

  const login = async (email, password) => {
    if (currentUser) return;
    const res = await authApi.post(`login`, { email, password });
    setChange((change) => !change);
    navigate("/");
    return res;
  };

  const register = async (email, username, password) => {
    if (currentUser) return;
    const res = await authApi.post(`join`, { email, username, password });
    setChange((change) => !change);
    navigate("/");
    return res;
  };

  const logout = async () => {
    const res = await authApi.post(`logout`);
    setCurrentUser(null);
    navigate("login");
    return res;
  };

  const forgotPassword = async (email) => {
    const res = await authApi.post(`forgot-password`, { email });
    return res;
  };

  const resetPassword = async (id, password, token) => {
    const res = await authApi.post(`reset-password`, { id, password, token });
    return res;
  };

  const unlinkGoogle = async () => {
    return await authApi.get(`/google/unlink`);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
        getCurrentUser,
        forgotPassword,
        resetPassword,
        unlinkGoogle,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

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
  const [isLoading, setIsLoading] = useState(true);
  const [change, setChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const loadUser = async () => {
      await getCurrentUser();
    };
    loadUser();
    setIsLoading(false);
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

  // export const getCSRFToken = async () => {
  //   const res = await newsApi.get(`getCSRFToken`);
  //   newsApi.defaults.headers.post["X-CSRF-Token"] = res.data.CSRFToken;
  //   return res.data;
  // };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
        getCurrentUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

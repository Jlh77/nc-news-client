import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../utils/api";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const getUser = await getCurrentUser();
      console.log("New User>>>", getUser);
      setCurrentUser(getUser);
    };
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

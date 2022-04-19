import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  // There is no authentication layer so a user is hardcoded for now
  const [user, setUser] = useState({ username: "p-copley" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

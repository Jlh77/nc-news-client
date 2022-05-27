import { useContext, useState } from "react";
import { UserContext } from "../../contexts/User";
import "./Account.css";

const Account = ({ navigation }) => {
  const { user, setCurrentUser } = useContext(UserContext);

  return <div className="account-page"></div>;
};
export default Account;

import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";
import "./Header.css";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="header-wrapper">
      <header>
        <h1>NC News</h1>
        <p>Hello there, {user.username}</p>
      </header>
      <nav className="navbar">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/">
            <li>Category 1</li>
          </Link>
          <Link to="/">
            <li>Category 2</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/User";
import "./Header.css";

const Header = () => {
  const { currentUser, logout } = useAuth();
  return (
    <div className="header-wrapper">
      <header>
        <h1>NC News</h1>

        {currentUser ? (
          <>
            <p>Hello there, {currentUser.username}</p>{" "}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <p>
            <Link to="/login">Login </Link>|
            <Link to="/register"> Register</Link>
          </p>
        )}
      </header>
      <nav className="navbar">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/topics/coding">
            <li>Coding</li>
          </Link>
          <Link to="/topics/cooking">
            <li>Cooking</li>
          </Link>
          <Link to="/topics/football">
            <li>Football</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

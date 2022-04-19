import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-wrapper">
      <header>NC News</header>
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

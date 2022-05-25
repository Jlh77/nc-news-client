import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/User";
import "./Login.css";
import googleLogo from "../../assets/googleLogo.png";
import facebookLogo from "../../assets/facebookLogo.png";

const Login = () => {
  const [loginErr, setLoginErr] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const isProduction = process.env.NODE_ENV === "production";

  const handleEmailChange = async (e) => setEmail(e.target.value);

  const handlePasswordChange = async (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginErr(null);

    try {
      await login(email, password);
    } catch (err) {
      // if login fail
      setLoginErr(
        `Login Failed: ${err?.response?.data?.msg || "Something went wrong."}`
      );
    }
  };

  const googleLogin = () => {
    window.open(
      isProduction
        ? "https://nc-news77.herokuapp.com/api/"
        : "http://localhost:9099/api/" + "/auth/google",
      "_self"
    );
  };

  const facebookLogin = () => {
    window.open(
      isProduction
        ? "https://nc-news77.herokuapp.com/api/"
        : "http://localhost:9099/api/" + "/auth/facebook",
      "_self"
    );
  };

  return (
    <div className="login-page">
      <h1 style={{ textAlign: "center" }}>Login</h1>

      <p id="error">{loginErr}</p>

      <form className="login-form" action="" onSubmit={handleLogin}>
        <label htmlFor="email">Email: </label>
        <br></br>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <br></br>
        <label htmlFor="password">Password: </label>
        <br></br>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <br></br>
        <label htmlFor="remember-me">Remember me </label>
        <input
          id="remember-me"
          type="checkbox"
          name="remember-me"
          defaultChecked
        />
        <br></br>
        <button className="login-button">Login</button>
      </form>

      <p>
        New here? <Link to="/register"> Click here to join</Link>
      </p>

      <br></br>

      <div className="socialAuths">
        <div className="googleContainer" onClick={googleLogin}>
          <img src={googleLogo} alt="Google Icon" />
          <p>Sign in with Google</p>
        </div>

        <div
          className={"googleContainer facebookContainer"}
          style={{ display: "none" }}
          onClick={facebookLogin}
        >
          <img src={facebookLogo} alt="Facebook Icon" />
          <p>Sign in with Facebook</p>
        </div>
      </div>
    </div>
  );
};
export default Login;

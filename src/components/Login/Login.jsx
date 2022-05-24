import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/User";
import "./Login.css";

const Login = () => {
  const [loginErr, setLoginErr] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

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
        `Login Failed: ${
          err?.response?.data?.message || "Something went wrong."
        }`
      );
    }
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
    </div>
  );
};
export default Login;

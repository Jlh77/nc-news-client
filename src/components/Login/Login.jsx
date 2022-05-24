import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/api";
import { UserContext } from "../../contexts/User";
import "./Login.css";

const Login = () => {
  const [err, setErr] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleEmailChange = async (e) => setEmail(e.target.value);

  const handlePasswordChange = async (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr(null);

    try {
      if (currentUser) return;
      const res = await login(email, password);
      if (res.data.user) {
        setCurrentUser(res.data.user);
        navigate("account");
      } else throw err;
    } catch (err) {
      console.log("its all gone horrribly wrong");
      console.log(err);
      // if login fail
      setErr(
        `Login Failed: ${
          err.response?.data?.message || "Something went wrong."
        }`
      );
      console.log("LOGIN ERROR MESSAGE >", err.response?.data?.message);
    }
  };

  return (
    <div className="login-page">
      <h1 style={{ textAlign: "center" }}>Login</h1>

      <p id="error">{err}</p>

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

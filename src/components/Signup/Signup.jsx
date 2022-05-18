import { useEffect, useState } from "react";
import "./Login.css";
import {} from "../../utils/api";

const Login = () => {
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);

  useEffect(() => {}, []);

  return (
    <div className="login-page">
      <h1 style={{ textAlign: "center" }}>Login</h1>

      <form
        className="login-form"
        method="POST"
        action="https://nc-news77.herokuapp.com/api/auth/login"
      >
        <label htmlFor="email">Email: </label>
        <br></br>
        <input id="email" type="email" name="email" required />
        <p id="email">{emailErr}</p>

        <label htmlFor="password">Password: </label>
        <br></br>
        <input id="password" type="password" name="password" required />
        <p id="password">{passwordErr}</p>

        <button className="login-button">Login</button>
      </form>
    </div>
  );
};
export default Login;

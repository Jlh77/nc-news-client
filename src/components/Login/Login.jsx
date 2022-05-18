import { useEffect, useState } from "react";
import { login } from "../../utils/api";
import "./Login.css";

const Login = () => {
  const [err, setErr] = useState(null);

  useEffect(() => {}, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login();
  };

  return (
    <div className="login-page">
      <h1 style={{ textAlign: "center" }}>Login</h1>

      <p id="email">{err}</p>

      <form className="login-form" action="" onSubmit={handleLogin}>
        <label htmlFor="email">Email: </label>
        <br></br>
        <input id="email" type="email" name="email" required />
        <br></br>
        <label htmlFor="password">Password: </label>
        <br></br>
        <input id="password" type="password" name="password" required />
        <br></br>
        <button className="login-button">Login</button>
      </form>
    </div>
  );
};
export default Login;

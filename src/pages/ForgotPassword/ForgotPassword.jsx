import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/User";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const [email, setEmail] = useState("");

  const { forgotPassword, currentUser } = useAuth();

  const handleEmailChange = async (e) => setEmail(e.target.value);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    try {
      const res = await forgotPassword(email);
      setMsg(res.data?.msg);
    } catch (err) {
      setErr(
        `Could not send: ${err?.response?.data?.msg || "Something went wrong."}`
      );
    }
  };

  return (
    <div className="forgot-password">
      <h1 style={{ textAlign: "center" }}>Forgot Password</h1>

      {err && <p className="err">{err}</p>}
      {msg && <p className="msg">{msg}</p>}

      <form action="" onSubmit={handleForgotPassword}>
        <label htmlFor="email">Your Email Address: </label>
        <br></br>
        <input
          id="email"
          type="email"
          name="email"
          value={currentUser?.email || email}
          onChange={handleEmailChange}
          required
        />
        <br></br>
        <button className="send-password-link-button">Send Reset Link</button>
      </form>

      {currentUser ? (
        <p>
          <Link to="/account"> Back to Account</Link>
        </p>
      ) : (
        <p>
          <Link to="/login"> Back to login</Link>
        </p>
      )}
    </div>
  );
};
export default ForgotPassword;

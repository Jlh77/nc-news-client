import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/User";

const ResetPassword = () => {
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [token] = useState(searchParams.get("token"));
  const [id] = useState(searchParams.get("id"));

  const { resetPassword, currentUser } = useAuth();

  const handlePassword = async (e) => setPassword(e.target.value);

  const handleConfirmPassword = async (e) => setConfirmPassword(e.target.value);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    try {
      const res = await resetPassword(id, password, token);
      setMsg(res.data?.msg);
    } catch (err) {
      setErr(
        `Could not send: ${err?.response?.data?.msg || "Something went wrong."}`
      );
    }
  };

  if (!token || !id) return <p>Invalid Reset Token</p>;
  return (
    <div className="forgot-password-page">
      <h1 style={{ textAlign: "center" }}>Forgot Password</h1>

      <p id="error">{err}</p>
      <p id="info">{msg}</p>

      <form
        className="forgot-password-form"
        action=""
        onSubmit={handleResetPassword}
      >
        <label htmlFor="password">Enter a new password</label>
        <br></br>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          required
        />
        <br></br>
        <label htmlFor="confirm-password">Confirm password</label>
        <br></br>
        <input
          id="confirm-password"
          type="password"
          name="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
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
export default ResetPassword;

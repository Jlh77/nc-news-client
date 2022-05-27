import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/User";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [err, setErr] = useState(null);
  const [confirmErr, setConfirmErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [msg, setMsg] = useState(null);

  const [submitDisabled, setSubmitDisabled] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [token] = useState(searchParams.get("token"));
  const [id] = useState(searchParams.get("id"));

  const { resetPassword, currentUser } = useAuth();

  const handlePassword = async (e) => {
    setConfirmErr(null);
    setPasswordErr(null);
    setSubmitDisabled(false);
    setPassword(e.target.value);
  };

  const handleConfirmPassword = async (e) => {
    setConfirmErr(null);
    setSubmitDisabled(false);
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    try {
      const res = await resetPassword(id, password, token);
      setMsg(res.data?.msg);
    } catch (err) {
      setSubmitDisabled(true);
      setErr(
        `Reset Failed: ${err?.response?.data?.msg || "Something went wrong."}`
      );
    }
  };

  if (!token || !id) return <p>Invalid Reset Token</p>;
  return (
    <div className="reset-password">
      <h1 style={{ textAlign: "center" }}>Reset Your Password</h1>

      {err && <p className="err">{err}</p>}
      {passwordErr && <p className="err">{passwordErr}</p>}
      {msg && <p className="msg">{msg}</p>}

      <form action="" onSubmit={handleResetPassword}>
        <label htmlFor="password">Enter a new password</label>
        <br></br>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          onBlur={(e) => {
            if (confirmPassword !== password) {
              setConfirmErr("Password and Confirm Password do not match.");
              setSubmitDisabled(true);
            }
            if (password.length < 6) {
              setPasswordErr(
                "Your password should be at least 6 characters long."
              );
              setSubmitDisabled(true);
            }
          }}
          required
        />
        <br></br>

        {confirmErr && <p className="err">{confirmErr}</p>}

        <label htmlFor="confirm-password">Confirm password</label>
        <br></br>
        <input
          id="confirm-password"
          type="password"
          name="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          onBlur={(e) => {
            if (confirmPassword !== password) {
              setConfirmErr("Password and Confirm Password do not mattch");
              setSubmitDisabled(true);
            }
          }}
          required
        />
        <br></br>
        <button className="send-password-link-button" disabled={submitDisabled}>
          Send Reset Link
        </button>
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

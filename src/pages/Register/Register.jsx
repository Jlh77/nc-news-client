import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/User";
import "./Register.css";
import googleLogo from "../../assets/googleLogo.png";
import facebookLogo from "../../assets/facebookLogo.png";

const Register = ({ navigation }) => {
  const [submitErr, setSubmitErr] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(null);

  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(null);

  const isProduction = process.env.NODE_ENV === "production";

  const { register } = useAuth();

  const handleEmailChange = async (e) => {
    setEmail(e.target.value);
    setSubmitDisabled(false);
    setEmailErr(null);
  };

  const handleUsernameChange = async (e) => {
    setUsername(e.target.value);
    setSubmitDisabled(false);
    setUsernameErr(null);
  };

  const handlePasswordChange = async (e) => {
    setPassword(e.target.value);
    setSubmitDisabled(false);
    setPasswordErr(null);
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
        : "http://localhost:9099/api/" + "/auth/google",
      "_self"
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitErr(null);

    try {
      await register(email, username, password);
    } catch (err) {
      // if register fails
      setSubmitErr(
        `Failed to create account: ${
          err?.response?.data?.msg || "Something went wrong."
        }`
      );
    }
  };

  return (
    <div className="register-page">
      <h1 style={{ textAlign: "center" }}>Register</h1>

      {submitErr && <p className="err">{submitErr}</p>}

      <form className="register-form" action="" onSubmit={handleRegister}>
        {emailErr && <p className="err">{emailErr}</p>}

        <label htmlFor="email">Email: </label>
        <br></br>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={(e) => {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!emailRegex.test(e.target.value)) {
              setEmailErr("Please enter a valid email.");
              setSubmitDisabled(true);
            }
          }}
          required
        />
        <br></br>

        {usernameErr && <p className="err">{usernameErr}</p>}

        <label htmlFor="username">Choose a username: </label>
        <br></br>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          onBlur={(e) => {
            if (username.length < 3) {
              setUsernameErr("Username should be at least 3 characters long.");
              setSubmitDisabled(true);
            }
          }}
          required
        />
        <br></br>

        {passwordErr && <p className="err">{passwordErr}</p>}

        <label htmlFor="password">Password: </label>
        <br></br>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={(e) => {
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
        <button className="register-button" disabled={submitDisabled}>
          Create Account
        </button>
      </form>

      <p>
        Already a member? <Link to="/login"> Go to login page</Link>
      </p>

      <br></br>

      <div className="socialAuths">
        <div className="googleContainer" onClick={googleLogin}>
          <img src={googleLogo} alt="Google Icon" />
          <p>Sign in with Google</p>
        </div>

        <p>
          <span style={{ fontWeight: "bold" }}>*NOTE*</span>: Google has not yet
          approved this portfolio site for production, so this may not work with
          an external google account, but does work in a development environment
          under your own Google developer OAuth credentials.
        </p>

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
export default Register;

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../utils/api";
import { UserContext } from "../../contexts/User";
import "./Register.css";

const Register = ({ navigation }) => {
  const [err, setErr] = useState(null);

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(null);

  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(null);

  const { user, setCurrentUser } = useContext(UserContext);

  const handleEmailChange = async (e) => setEmail(e.target.value);

  const handleUsernameChange = async (e) => setUsername(e.target.value);

  const handlePasswordChange = async (e) => setPassword(e.target.value);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr(null);

    try {
      const res = await register(email, username, password);
      if (res.data.user) {
        setCurrentUser(user);
        navigation.navigate("account");
      } else throw err;
    } catch (err) {
      // if register fails
      setErr(
        `Failed to create account: ${
          err.response.data.message || "Something went wrong."
        }`
      );
      console.log("REGISTER ERROR MESSAGE >", err.response.data.message);
    }
  };

  return (
    <div className="register-page">
      <h1 style={{ textAlign: "center" }}>Register</h1>

      <p id="error">{err}</p>

      <form className="register-form" action="" onSubmit={handleRegister}>
        <p id="email-error" className="form-error">
          {emailErr}
        </p>

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

        <p id="username-error" className="form-error">
          {usernameErr}
        </p>

        <label htmlFor="username">Choose a username: </label>
        <br></br>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <br></br>

        <p id="password-error" className="form-error">
          {passwordErr}
        </p>

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
        <button className="register-button">Register</button>
      </form>

      <p>
        Already a member? <Link to="/login"> Go to login page</Link>
      </p>
    </div>
  );
};
export default Register;

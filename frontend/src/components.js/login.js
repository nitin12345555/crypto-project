import { useState } from "react";
import { useAppContext } from "../context/AppContext.js";
import "../all css/login.css";

const Login = () => {
  const { login } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) return alert("Enter email & password");
    login(email, password);
  };

  return (
    <div className="login-upcontainer">
      <h1>Login Here</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="inputBox"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="inputBox"
      />
      <button onClick={handleLogin} className="login">
        Login
      </button>
      <p className="switch-auth">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;

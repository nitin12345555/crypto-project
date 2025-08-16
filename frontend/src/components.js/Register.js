import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import "../all css/Register.css";  // <-- import CSS

const Register = () => {
  const { register } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) return alert("Fill all fields");
    register(name, email, password);
  };

  return (
    <div className="sign-upcontainer">
      <h1 style={{ color: "white", marginBottom: "20px" }}>Register Here</h1>

      <input
        type="text"
        className="inputBox"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        className="inputBox"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="inputBox"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="signup" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;

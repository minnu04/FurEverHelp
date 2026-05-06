import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await API.post("/auth/login", {
      email,
      password,
    });

    login(data);
    alert("Login successful");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <p>Students and faculty must use their college email address ending in @klu.ac.in.</p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
      <p>
        First time here? <Link to="/register">Create your account</Link>
      </p>
    </form>
  );
};

export default Login;
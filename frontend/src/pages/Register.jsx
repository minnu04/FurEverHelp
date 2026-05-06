import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Student",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setMessage("Password and confirm password do not match.");
      return;
    }

    try {
      await API.post("/auth/register", form);
      setMessage("Account created successfully. You can now log in.");
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to create account.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      <p>Students and faculty must register with a college email ending in @klu.ac.in.</p>

      <input
        name="name"
        placeholder="Full name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="College email"
        value={form.email}
        onChange={handleChange}
      />

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="Student">Student</option>
        <option value="Faculty">Faculty</option>
        <option value="Donor">Donor</option>
      </select>

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={form.confirmPassword}
        onChange={handleChange}
      />

      <button type="submit">Create account</button>

      {message ? <p>{message}</p> : null}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Register;
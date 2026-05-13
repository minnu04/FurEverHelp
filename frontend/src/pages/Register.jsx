import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Donor",
    password: "",
    confirmPassword: "",
    adminKey: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [errors, setErrors] = useState({}); // Field-specific errors
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    if (!form.name || form.name.trim().length < 2) {
      newErrors.name = "Full name must be at least 2 characters";
    }

    if (!form.email) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email address must be valid";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setMessageType("");
    setErrors({});
    setLoading(true);

    // Client-side validation
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage("Please fix the errors below");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: form.name,
        email: form.email,
        role: form.role,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };
      if (form.role === "Admin") {
        payload.adminKey = form.adminKey;
      }
      await API.post("/auth/register", payload);
      setMessage("✅ Account created! Redirecting to login...");
      setMessageType("success");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      const errorData = error.response?.data;
      
      // Handle field-specific errors from backend
      if (errorData?.errors && Array.isArray(errorData.errors)) {
        const fieldErrors = {};
        errorData.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
        setErrors(fieldErrors);
        setMessage(errorData.message || "Validation failed. Please check the errors below.");
      } else {
        setMessage(errorData?.message || "Unable to create account. Please try again.");
      }
      
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: "Owner", label: "🐾 Pet Owner/Rescuer" },
    { value: "Shelter", label: "🏥 Animal Shelter" },
    { value: "Donor", label: "💝 Donor" },
    { value: "Admin", label: "👮 Platform Admin" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg flex items-center justify-center px-4 pt-20 pb-20">
      <div className="w-full max-w-md animate-fade-in">
        {/* Card */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-card-hover">
          {/* Header */}
          <div className="text-center mb-8 space-y-2">
            <div className="text-5xl mb-4">🚀</div>
            <h1 className="text-3xl font-bold text-dark-text">Join FurEverHelp</h1>
            <p className="text-dark-muted text-sm">Create your account and start making a difference</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-bold text-dark-text">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-xl text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-opacity-20 transition ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-dark-border focus:border-primary focus:ring-primary"
                }`}
              />
              {errors.name && <p className="text-red-400 text-xs font-medium">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-dark-text">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-xl text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-opacity-20 transition ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-dark-border focus:border-primary focus:ring-primary"
                }`}
              />
              {errors.email && <p className="text-red-400 text-xs font-medium">{errors.email}</p>}
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-bold text-dark-text">
                I am a
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border-2 border-dark-border rounded-xl text-[#0a0e0f] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition cursor-pointer"
              >
                {roles.map((r) => (
                  <option key={r.value} value={r.value} className="bg-white text-[#0a0e0f]">
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Admin Key (only show for Admin role) */}
            {form.role === "Admin" && (
              <div className="space-y-2 rounded-xl border-2 border-amber-500/30 bg-amber-500/10 p-4">
                <label htmlFor="adminKey" className="block text-sm font-bold text-dark-text">
                  Admin Secret Key
                </label>
                <input
                  id="adminKey"
                  name="adminKey"
                  type="password"
                  placeholder="Enter admin key"
                  value={form.adminKey}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-xl text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-opacity-20 transition ${
                    errors.adminKey
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-dark-border focus:border-primary focus:ring-primary"
                  }`}
                />
                <p className="text-xs text-amber-300">Contact your platform administrator for the admin key.</p>
                {errors.adminKey && <p className="text-red-400 text-xs font-medium">{errors.adminKey}</p>}
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold text-dark-text">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-xl text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-opacity-20 transition ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-dark-border focus:border-primary focus:ring-primary"
                }`}
              />
              {errors.password && <p className="text-red-400 text-xs font-medium">{errors.password}</p>}
              <p className="text-xs text-dark-muted">Minimum 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-dark-text">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-xl text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-opacity-20 transition ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-dark-border focus:border-primary focus:ring-primary"
                }`}
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs font-medium">{errors.confirmPassword}</p>}
            </div>

            {/* Message */}
            {message && (
              <div
                className={`p-4 rounded-xl text-sm font-medium ${
                  messageType === "error"
                    ? "bg-accent bg-opacity-10 border border-accent border-opacity-50 text-accent"
                    : "bg-green-500 bg-opacity-10 border border-green-500 border-opacity-50 text-green-400"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-campagne font-bold rounded-xl hover:shadow-glow-lg transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? "🔄 Creating account..." : "✨ Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-dark-border"></div>
            <div className="px-3 text-xs text-dark-muted">OR</div>
            <div className="flex-1 border-t border-dark-border"></div>
          </div>

          {/* Login Link */}
          <div className="text-center space-y-4">
            <p className="text-sm text-dark-muted">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-primary hover:text-accent transition">
                Sign in
              </Link>
            </p>
            <Link
              to="/"
              className="block text-sm text-dark-muted hover:text-primary transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Side Info */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-dark-muted">
            Join our community helping rescued pets 🐾💚
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from?.pathname || location.state?.from || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      login(data);
      navigate(fromPath, { replace: true });
    } catch (loginError) {
      setError(loginError.response?.data?.message || "Unable to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg flex items-center justify-center px-4 pt-20 pb-20">
      <div className="w-full max-w-md animate-fade-in">
        {/* Card */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-card-hover">
          {/* Header */}
          <div className="text-center mb-8 space-y-2">
            <div className="text-5xl mb-4">🐾</div>
            <h1 className="text-3xl font-bold text-dark-text">Welcome Back</h1>
            <p className="text-dark-muted text-sm">Sign in to your FurEverHelp account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-dark-text">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-bg border-2 border-dark-border rounded-xl text-dark-text placeholder-dark-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold text-dark-text">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-bg border-2 border-dark-border rounded-xl text-dark-text placeholder-dark-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-accent bg-opacity-10 border border-accent border-opacity-50 text-accent rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-campagne font-bold rounded-xl hover:shadow-glow-lg transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "🔄 Signing in..." : "🔓 Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-dark-border"></div>
            <div className="px-3 text-xs text-dark-muted">OR</div>
            <div className="flex-1 border-t border-dark-border"></div>
          </div>

          {/* Register Link */}
          <div className="text-center space-y-4">
            <p className="text-sm text-dark-muted">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-primary hover:text-accent transition"
              >
                Create one now
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
            🐾 Help rescued pets get the care they deserve
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
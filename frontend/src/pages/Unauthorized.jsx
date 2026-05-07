import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg flex items-center justify-center px-4 pt-20 pb-20">
      <div className="text-center space-y-8 max-w-md animate-fade-in">
        {/* Icon */}
        <div className="text-7xl">🔐</div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-dark-text">Access Denied</h1>
          <p className="text-xl text-dark-muted leading-relaxed">
            You don't have permission to view this page. Your account role doesn't allow access to this resource.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Link
            to="/"
            className="block px-8 py-4 bg-primary text-campagne rounded-2xl font-semibold hover:shadow-glow-lg transition-all transform hover:-translate-y-1"
          >
            🏠 Go to Home
          </Link>
          <Link
            to="/dashboard"
            className="block px-8 py-4 border-2 border-primary text-primary rounded-2xl font-semibold hover:bg-primary hover:bg-opacity-10 transition-all"
          >
            📊 Go to Dashboard
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-sm text-dark-muted pt-4">
          Need help? <a href="mailto:support@fureverhelp.com" className="text-primary font-bold hover:underline">Contact support</a>
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
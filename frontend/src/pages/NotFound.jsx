import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg flex items-center justify-center px-4 pt-20 pb-20">
      <div className="text-center space-y-8 max-w-md animate-fade-in">
        {/* Icon */}
        <div className="space-y-4">
          <div className="text-9xl font-bold text-primary">404</div>
          <div className="text-5xl">🤔</div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-dark-text">Page Not Found</h1>
          <p className="text-lg text-dark-muted leading-relaxed">
            It looks like this page doesn't exist. The route you're looking for might have been removed or the URL might be incorrect.
          </p>
        </div>

        {/* Suggestions */}
        <div className="p-6 bg-dark-card border border-dark-border rounded-2xl space-y-3">
          <p className="text-sm font-bold text-dark-text">Try going to:</p>
          <div className="space-y-2 text-sm">
            <Link to="/" className="block text-primary hover:text-accent transition font-semibold">
              🏠 Home
            </Link>
            <Link to="/campaigns" className="block text-primary hover:text-accent transition font-semibold">
              🔍 Browse Campaigns
            </Link>
            <Link to="/dashboard" className="block text-primary hover:text-accent transition font-semibold">
              📊 Dashboard
            </Link>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to="/"
          className="inline-block px-8 py-4 bg-primary text-campagne rounded-2xl font-semibold hover:shadow-glow-lg transition-all transform hover:-translate-y-1"
        >
          ← Go Back to Home
        </Link>

        {/* Help Text */}
        <p className="text-sm text-dark-muted pt-4">
          Still lost? <a href="mailto:support@fureverhelp.com" className="text-primary font-bold hover:underline">Contact us</a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="page-section">
      <div className="section-heading">
        <h1>User Dashboard</h1>
        <p>Welcome back, {user?.name || "user"}. Your role is {user?.role || "unknown"}.</p>
      </div>

      <div className="dashboard-grid">
        <article className="info-card">
          <h3>Account</h3>
          <p>{user?.email}</p>
          <p>Role: {user?.role}</p>
        </article>

        <article className="info-card">
          <h3>Next step</h3>
          <p>Use the campaign pages or your role-specific actions from the navigation bar.</p>
        </article>
      </div>
    </section>
  );
};

export default Dashboard;
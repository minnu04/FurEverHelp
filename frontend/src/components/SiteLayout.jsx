import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SiteLayout = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
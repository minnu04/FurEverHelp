import { useContext } from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Menu, PawPrint } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const MotionDiv = motion.div;
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${isActive ? "text-[#f9e4da]" : "text-white/70 hover:text-white"}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#071117]/70 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <MotionDiv whileHover={{ rotate: 8, scale: 1.05 }} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1d503a]/20 text-[#f9e4da] ring-1 ring-white/10">
            <PawPrint className="h-5 w-5" />
          </MotionDiv>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-white transition group-hover:text-[#f9e4da]">FurEverHelp</span>
            <span className="text-xs text-white/55">Pet rescue with care</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/campaigns" className={navLinkClass}>Campaigns</NavLink>
          <a href="#about" className="text-sm font-medium text-white/70 transition-colors hover:text-white">About</a>
          <a href="#donate" className="text-sm font-medium text-white/70 transition-colors hover:text-white">Donate</a>
          <a href="#contact" className="text-sm font-medium text-white/70 transition-colors hover:text-white">Contact</a>
          {user?.role === "Admin" && <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-white/60 sm:inline">{user.name}</span>
              <Link
                to="/dashboard"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-[#f9e4da]/30 hover:bg-white/10"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-2xl bg-[#1d503a] px-4 py-2 text-sm font-semibold text-[#f9e4da] transition hover:bg-[#163a2a]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden rounded-2xl px-4 py-2 text-sm font-medium text-white/70 transition hover:text-white sm:inline-flex">
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#1d503a] px-4 py-2 text-sm font-semibold text-[#f9e4da] transition hover:bg-[#163a2a]"
              >
                <HeartHandshake className="h-4 w-4" />
                Register
              </Link>
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 md:hidden">
                <Menu className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
import { Globe, Mail, MapPin, Phone, Send, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-white/10 bg-[#071117] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <span className="text-2xl">🐾</span>
              <div>
                <div className="text-lg font-semibold">FurEverHelp</div>
                <div className="text-xs text-white/55">Pet rescue with care</div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/65">
              A premium crowdfunding platform for injured and abandoned pets, built for trust, urgency, and emotional connection.
            </p>

            <div className="space-y-3 text-sm text-white/65">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#f9e4da]" /> Remote rescue network</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#f9e4da]" /> +91 98765 43210</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#f9e4da]" /> support@fureverhelp.org</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f9e4da]/70">Quick Links</h3>
            <nav className="space-y-3 text-sm text-white/65">
              <Link to="/" className="block transition hover:text-[#f9e4da]">Home</Link>
              <Link to="/campaigns" className="block transition hover:text-[#f9e4da]">Campaigns</Link>
              <Link to="/register" className="block transition hover:text-[#f9e4da]">Start a Campaign</Link>
              <a href="#about" className="block transition hover:text-[#f9e4da]">About</a>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f9e4da]/70">Support</h3>
            <nav className="space-y-3 text-sm text-white/65">
              <Link to="/request-emergency" className="block transition hover:text-[#f9e4da]">Emergency Support</Link>
              <Link to="/dashboard" className="block transition hover:text-[#f9e4da]">Dashboard</Link>
              <a href="#donate" className="block transition hover:text-[#f9e4da]">Donate</a>
              <a href="#contact" className="block transition hover:text-[#f9e4da]">Contact</a>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f9e4da]/70">Follow</h3>
            <div className="flex gap-3">
              {[
                { icon: Globe, label: "Website" },
                { icon: Send, label: "Updates" },
                { icon: Heart, label: "Community" },
              ].map(({ icon: Icon, label }) => (
                (() => {
                  const SocialIcon = Icon;

                  return (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/75 transition hover:-translate-y-1 hover:border-[#f9e4da]/30 hover:text-[#f9e4da]"
                >
                  <SocialIcon className="h-4 w-4" />
                </a>
                  );
                })()
              ))}
            </div>

            <div className="rounded-3xl border border-[#f9e4da]/15 bg-[#f9e4da]/8 p-4 text-sm leading-7 text-white/72 backdrop-blur-xl">
              Every donation funds treatment, shelter, and recovery stories that deserve a second chance.
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} FurEverHelp. All rights reserved.</p>
          <p>Built with compassion for pets in need.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
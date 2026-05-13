import { Link } from "react-router-dom";
import { useContext } from "react";
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const displayName = user?.name || "there";
  const role = user?.role || "Guest";

  const quickActions = [
    {
      title: "Explore campaigns",
      description: "Browse verified rescue stories and support active fundraisers.",
      to: "/campaigns",
      tone: "from-[#1d503a] to-[#163a2a]",
    },
    {
      title: "Check emergency support",
      description: "Fast-track urgent rescue requests if your role allows it.",
      to: "/request-emergency",
      tone: "from-[#3c4b55] to-[#121b22]",
    },
    {
      title: "Manage your account",
      description: "Review your profile details and stay ready to contribute.",
      to: "/register",
      tone: "from-[#674a2b] to-[#2a1d10]",
    },
  ];

  const stats = [
    { label: "Profile status", value: user ? "Active" : "Guest" },
    { label: "Access level", value: role },
    { label: "Available actions", value: role === "Owner" || role === "Shelter" ? "Emergency + campaigns" : "Campaigns + donate" },
  ];

  return (
    <section className="px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#1d503a] via-[#101515] to-[#f9e4da] shadow-[0_30px_80px_rgba(0,0,0,0.32)]">
          <div className="grid gap-8 p-8 md:p-12 lg:grid-cols-[1.35fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-[#f9e4da]" />
                User dashboard
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                  Welcome back, {displayName}.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-white/75 md:text-lg">
                  Your role is {role}. Use this space to jump into campaigns, review your account, and take the next rescue action quickly.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/campaigns"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#f9e4da] px-5 py-3 font-semibold text-[#0a0e0f] transition hover:translate-y-[-1px]"
                >
                  Browse campaigns
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/request-emergency"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
                >
                  Emergency support
                  <HeartHandshake className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-white/55">Account summary</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{displayName}</h2>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-xl font-semibold text-[#f9e4da]">
                  {(displayName[0] || "U").toUpperCase()}
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm text-white/72">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Email</span>
                  <span className="max-w-[15rem] truncate text-right text-white">{user?.email || "Not set"}</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Role</span>
                  <span className="font-semibold text-[#f9e4da]">{role}</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Status</span>
                  <span className="inline-flex items-center gap-2 font-semibold text-emerald-300">
                    <ShieldCheck className="h-4 w-4" />
                    Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
              <p className="text-sm text-white/55">{stat.label}</p>
              <p className="mt-3 text-2xl font-semibold text-[#f9e4da]">{stat.value}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          <article className="rounded-[2rem] border border-white/10 bg-[#101515] p-8 shadow-[0_16px_40px_rgba(0,0,0,0.22)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f9e4da]/70">Next steps</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Everything you need to keep moving.</h2>
            <div className="mt-6 space-y-4">
              {quickActions.map((action, index) => (
                <Link
                  key={action.title}
                  to={action.to}
                  className={`group block rounded-3xl border border-white/10 bg-gradient-to-r ${action.tone} p-5 transition hover:-translate-y-0.5 hover:border-white/20`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-white">{action.title}</p>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">{action.description}</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white transition group-hover:bg-white/15">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                  {index === 1 && (
                    <p className="mt-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                      Role-aware access
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/6 p-8 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f9e4da]/70">Account details</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Current profile snapshot</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/55">Signed in as</p>
                <p className="mt-1 text-base font-semibold text-white">{displayName}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/55">Contact</p>
                <p className="mt-1 text-base font-semibold text-white">{user?.email || "No email available"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/55">Recommended next move</p>
                <p className="mt-1 text-base font-semibold text-white">
                  {role === "Owner" || role === "Shelter" ? "Submit or review emergency requests" : "Support an active campaign"}
                </p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </section>
  );
};

export default Dashboard;
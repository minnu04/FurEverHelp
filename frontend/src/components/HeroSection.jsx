import { motion } from "framer-motion";
import { ArrowRight, HeartHandshake, PawPrint, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const heroStats = [
  { label: "Pets rescued", value: "500+" },
  { label: "Funds raised", value: "₹25L+" },
  { label: "Active shelters", value: "85" },
];

const HeroSection = () => {
  const MotionDiv = motion.div;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1d503a] via-black to-[#f9e4da] px-4 pt-28 pb-20 text-white">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-[#f9e4da] blur-3xl" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-[#1d503a] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
            <PawPrint className="h-4 w-4 text-[#f9e4da]" />
            Pet rescue with care
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
              Help injured and abandoned pets get the care they deserve.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              FurEverHelp brings rescuers, donors, and verified shelters together in one transparent crowdfunding platform for urgent treatment and recovery.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/campaigns"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1d503a] px-7 py-4 font-semibold text-[#f9e4da] shadow-lg shadow-black/20 transition-transform duration-300 hover:-translate-y-1 hover:bg-[#163a2a]"
            >
              Browse Campaigns <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:bg-white/15"
            >
              Start a Campaign <HeartHandshake className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid max-w-2xl grid-cols-3 gap-4 pt-4">
            {heroStats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <div className="text-2xl font-semibold text-[#f9e4da]">{item.value}</div>
                <div className="mt-1 text-sm text-white/70">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 text-[#f9e4da]" />
              Verified shelters
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[#f9e4da]" />
              Transparent donations
            </span>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[#f9e4da]/15 blur-2xl" />
          <div className="grid gap-5 rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-6">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20">
              <img
                src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80"
                alt="Rescued pet"
                className="h-[22rem] w-full object-cover opacity-95"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Urgent surgery", value: "88% funded" },
                { title: "Recovery updates", value: "Daily photos" },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl border border-white/12 bg-[#0f1714]/80 p-4">
                  <div className="text-sm text-white/60">{card.title}</div>
                  <div className="mt-2 text-lg font-semibold text-white">{card.value}</div>
                </div>
              ))}
            </div>

            <div className="rounded-[1.5rem] border border-[#f9e4da]/20 bg-[#f9e4da]/10 p-4 text-sm text-white/80">
              A hopeful rescue story, a caring donor, and a safe future begin here.
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default HeroSection;
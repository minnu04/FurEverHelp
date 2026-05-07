import { motion } from "framer-motion";
import { BellRing, BadgeCheck, Radar, ShieldAlert } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Transparent Donations",
    description: "Track every contribution and see exactly how funds support rescue and treatment.",
  },
  {
    icon: ShieldAlert,
    title: "Emergency Rescue",
    description: "Fast-track urgent medical cases so injured animals can receive care without delay.",
  },
  {
    icon: BellRing,
    title: "Verified Shelters",
    description: "Work only with trusted shelters, rescuers, and partners approved by the platform.",
  },
  {
    icon: Radar,
    title: "Real-time Updates",
    description: "Follow treatment progress with updates, recovery notes, and milestone photos.",
  },
];

const FeatureCards = () => {
  const MotionArticle = motion.article;

  return (
    <section className="bg-[#0a0e0f] px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f9e4da]/70">How it works</p>
          <h2 className="text-3xl font-semibold text-white md:text-5xl">
            Built for rescue work that needs trust, speed, and care.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <MotionArticle
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="group rounded-3xl border border-white/10 bg-white/6 p-7 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1d503a]/15 text-[#f9e4da] ring-1 ring-[#f9e4da]/15 transition-transform group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 leading-7 text-white/68">{feature.description}</p>
              </MotionArticle>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
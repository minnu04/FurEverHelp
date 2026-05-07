import { Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import CampaignGrid from "../components/CampaignGrid";
import FeatureCards from "../components/FeatureCards";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const stats = [
    { label: "Pets rescued", value: "500+" },
    { label: "Funds raised", value: "₹25L+" },
    { label: "Active shelters", value: "85" },
    { label: "Successful treatments", value: "480+" },
  ];

  const campaigns = [
    {
      _id: "c1",
      title: "Milo needs urgent surgery",
      description: "A rescued indie pup recovering from a road accident needs immediate orthopedic care and follow-up medicine.",
      pet: { name: "Milo", species: "Dog" },
      raisedAmount: 124000,
      goalAmount: 150000,
      daysLeft: 12,
      images: ["https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80"],
    },
    {
      _id: "c2",
      title: "Luna’s recovery fund",
      description: "This rescued kitten is healing after emergency treatment and needs shelter, nutrition, and vaccines.",
      pet: { name: "Luna", species: "Cat" },
      raisedAmount: 86000,
      goalAmount: 120000,
      daysLeft: 8,
      images: ["https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=1200&q=80"],
    },
    {
      _id: "c3",
      title: "Shelter medicine drive",
      description: "Verified shelter partners are raising funds for vaccines, anti-infection care, and rehabilitation support.",
      pet: { name: "Community Rescue", species: "Mixed" },
      raisedAmount: 54000,
      goalAmount: 100000,
      daysLeft: 5,
      images: ["https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80"],
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Dog Rescuer",
      text: "FurEverHelp helped me raise funds for 12 street dogs in just 3 weeks. The transparency is amazing.",
      avatar: "👩‍🔬",
    },
    {
      name: "Mumbai Cat Shelter",
      role: "Animal Shelter",
      text: "The platform made fundraising so easy. Our donors love seeing the real impact.",
      avatar: "🏥",
    },
    {
      name: "Rajesh Kumar",
      role: "Donor",
      text: "Finally, a way to donate to pets with full confidence. Love the updates!",
      avatar: "👨‍💼",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e0f]">
      <HeroSection />
      <FeatureCards />

      <section id="donate" className="px-4 py-20 bg-gradient-to-b from-[#0a0e0f] via-[#101515] to-[#0a0e0f]">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f9e4da]/70">Featured campaigns</p>
              <h2 className="text-3xl font-semibold text-white md:text-5xl">Real rescue stories that need help right now.</h2>
              <p className="text-white/65 leading-7">
                Browse emotionally compelling campaigns and support verified fundraisers helping pets recover with dignity.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-[#f9e4da]" />
              Fresh rescue updates
            </div>
          </div>

          <CampaignGrid campaigns={campaigns} />
        </div>
      </section>

      <section id="about" className="bg-[#f9e4da] px-4 py-20 text-[#0a0e0f]">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div key={item.label} className="rounded-3xl bg-white/50 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1d503a] text-[#f9e4da]">
                <Heart className="h-5 w-5" />
              </div>
              <div className="text-4xl font-semibold text-[#1d503a]">{item.value}</div>
              <p className="mt-2 text-sm text-black/65">{item.label}</p>
              {index === 0 && <p className="mt-4 text-sm leading-7 text-black/60">A growing rescue network saving pets every week.</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 bg-[#0a0e0f]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f9e4da]/70">Testimonials</p>
            <h2 className="text-3xl font-semibold text-white md:text-5xl">People trust FurEverHelp because care is visible.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-3xl border border-white/10 bg-white/6 p-8 text-white backdrop-blur-xl">
                <div className="text-3xl">{testimonial.avatar}</div>
                <p className="mt-5 leading-7 text-white/72">{testimonial.text}</p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-white/50">{testimonial.role}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 bg-[#0a0e0f]">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#1d503a] via-black to-[#f9e4da] p-10 text-white shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:p-16">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Donate / Start</p>
            <h2 className="text-3xl font-semibold md:text-5xl">Every share, donation, and campaign can save a life.</h2>
            <p className="text-white/72 leading-7">
              Join a platform that feels trustworthy, modern, and emotionally human from the first click to the final rescue update.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/campaigns" className="rounded-2xl bg-[#1d503a] px-7 py-4 text-center font-semibold text-[#f9e4da] transition hover:bg-[#163a2a]">Browse Campaigns</Link>
            <Link to="/register" className="rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-center font-semibold text-white backdrop-blur-md transition hover:bg-white/15">Start a Campaign</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
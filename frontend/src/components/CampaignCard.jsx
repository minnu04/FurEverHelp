import { motion } from "framer-motion";
import { CalendarDays, Heart, IndianRupee, MoveRight, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";

const CampaignCard = ({ campaign, index = 0 }) => {
  const MotionArticle = motion.article;
  const raisedAmount = Number(campaign.raisedAmount || 0);
  const goalAmount = Number(campaign.goalAmount || 0);
  const progress = goalAmount > 0 ? Math.min(100, Math.round((raisedAmount / goalAmount) * 100)) : 0;

  return (
    <MotionArticle
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -10 }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-[#101515] shadow-[0_16px_40px_rgba(0,0,0,0.24)] transition-all"
    >
      <div className="relative h-56 overflow-hidden">
        {campaign.images?.[0] ? (
          <img
            src={campaign.images[0]}
            alt={campaign.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#1d503a] via-black to-[#f9e4da] text-7xl">
            🐾
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
          <PawPrint className="h-3.5 w-3.5 text-[#f9e4da]" />
          {campaign.pet?.species || campaign.category || "Pet care"}
        </div>

        <div className="absolute right-4 top-4 rounded-full bg-[#1d503a] px-3 py-1.5 text-xs font-semibold text-[#f9e4da]">
          {campaign.daysLeft ? `${campaign.daysLeft} days left` : "Active"}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="mb-2 flex items-center justify-between text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <IndianRupee className="h-4 w-4" />
              {raisedAmount.toLocaleString()} raised
            </span>
            <span>{progress}% funded</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#1d503a] via-[#f9e4da] to-white transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-semibold leading-snug text-white">{campaign.title}</h3>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              {campaign.pet?.name || "Rescue case"}
            </div>
          </div>
          <p className="line-clamp-3 text-sm leading-7 text-white/65">
            {campaign.description || campaign.story || "A rescued pet needs help with treatment, rehabilitation, and a safe future."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm text-white/72">
          <div className="rounded-2xl bg-white/5 p-3">
            <div className="text-white/45">Goal</div>
            <div className="mt-1 font-semibold text-white">₹{goalAmount.toLocaleString()}</div>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <div className="text-white/45">Donors</div>
            <div className="mt-1 font-semibold text-white">{campaign.donorCount || "1.2K"}</div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <CalendarDays className="h-4 w-4 text-[#f9e4da]" />
            {campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : "Ongoing now"}
          </div>

          <Link
            to={`/campaign/${campaign._id}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#1d503a] px-4 py-2.5 text-sm font-semibold text-[#f9e4da] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#163a2a]"
          >
            Donate <Heart className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/48">
          <span>Verified fundraiser</span>
          <span className="inline-flex items-center gap-1">
            View story <MoveRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </MotionArticle>
  );
};

export default CampaignCard;
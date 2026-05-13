import CampaignCard from "./CampaignCard";

const skeletonItems = Array.from({ length: 6 });

const CampaignGrid = ({ campaigns = [], loading = false, emptyMessage = "No campaigns found yet." }) => {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/6 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
          >
            <div className="h-56 animate-pulse bg-gradient-to-r from-white/5 via-white/15 to-white/5" />
            <div className="space-y-4 p-6">
              <div className="h-5 w-20 animate-pulse rounded-full bg-white/10" />
              <div className="h-6 w-4/5 animate-pulse rounded-lg bg-white/10" />
              <div className="h-4 w-full animate-pulse rounded-lg bg-white/10" />
              <div className="h-4 w-5/6 animate-pulse rounded-lg bg-white/10" />
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="h-20 animate-pulse rounded-2xl bg-white/10" />
                <div className="h-20 animate-pulse rounded-2xl bg-white/10" />
              </div>
              <div className="h-11 animate-pulse rounded-full bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!campaigns.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/6 p-12 text-center text-white/70 backdrop-blur-xl">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {campaigns.map((campaign, index) => (
        <CampaignCard key={campaign._id || index} campaign={campaign} index={index} />
      ))}
    </div>
  );
};

export default CampaignGrid;
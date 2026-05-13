import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axiosInstance";
import CampaignGrid from "../components/CampaignGrid";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/campaigns");
        setCampaigns(data);
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || "Unable to load campaigns.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0e0f] px-4 pt-28 text-center text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/6 p-10 backdrop-blur-xl">
          <p className="text-2xl font-semibold">❌ {error}</p>
          <p className="mt-4 text-white/65">Try again in a moment or go back to the home page.</p>
          <Link to="/" className="mt-8 inline-flex rounded-2xl bg-[#1d503a] px-6 py-3 font-semibold text-[#f9e4da]">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e0f] px-4 pt-28 pb-20">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f9e4da]/70">Campaigns</p>
          <h1 className="text-4xl font-semibold text-white md:text-6xl">Every rescue has a story worth funding.</h1>
          <p className="text-lg leading-8 text-white/65">
            Explore verified pet crowdfunding campaigns and help deliver urgent treatment, shelter, and recovery.
          </p>
        </div>

        <CampaignGrid campaigns={campaigns} loading={loading} emptyMessage="No campaigns are active right now." />
      </div>
    </div>
  );
};

export default CampaignList;
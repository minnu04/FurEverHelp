import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import API from "../api/axiosInstance";

const AdminDashboard = () => {
    const [pendingCampaigns, setPendingCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [actionInProgress, setActionInProgress] = useState(null);

    useEffect(() => {
        const loadPendingCampaigns = async () => {
            try {
                setLoading(true);
                const { data } = await API.get("/admin/campaigns/pending");
                setPendingCampaigns(data);
            } catch (error) {
                setMessage("Unable to load pending campaigns. " + (error.response?.data?.message || ""));
            } finally {
                setLoading(false);
            }
        };

        loadPendingCampaigns();
    }, []);

    const handleApproveCampaign = async (campaignId) => {
        try {
            setActionInProgress(campaignId);
            setMessage("");
            await API.put(`/admin/campaigns/${campaignId}/approve`);
            setPendingCampaigns((current) => current.filter((c) => c._id !== campaignId));
            setMessage("✅ Campaign approved successfully!");
        } catch (error) {
            setMessage("❌ Failed to approve: " + (error.response?.data?.message || ""));
        } finally {
            setActionInProgress(null);
        }
    };

    const handleRejectCampaign = async (campaignId) => {
        try {
            setActionInProgress(campaignId);
            setMessage("");
            await API.put(`/admin/campaigns/${campaignId}/reject`);
            setPendingCampaigns((current) => current.filter((c) => c._id !== campaignId));
            setMessage("✅ Campaign rejected.");
        } catch (error) {
            setMessage("❌ Failed to reject: " + (error.response?.data?.message || ""));
        } finally {
            setActionInProgress(null);
        }
    };

    const adminStats = [
        { label: "Pending campaigns", value: pendingCampaigns.length },
        { label: "Ready for review", value: pendingCampaigns.filter((c) => c.isEmergencyRequest).length },
    ];

    return (
        <div className="min-h-screen bg-[#0a0e0f] px-4 py-16 text-white">
            <div className="mx-auto max-w-7xl space-y-10">
                <section className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#1d503a] via-black to-[#f9e4da] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.32)] md:p-12">
                    <div className="max-w-3xl space-y-4">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Admin dashboard</p>
                        <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                            Review pending campaigns and keep FurEverHelp trustworthy.
                        </h1>
                        <p className="max-w-2xl text-lg leading-8 text-white/75">
                            Monitor approvals, respond to reports, and keep rescue campaigns safe, transparent, and humane.
                        </p>
                    </div>
                </section>

                <section className="grid gap-6 md:grid-cols-2">
                    {adminStats.map((stat) => (
                        <article key={stat.label} className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
                            <p className="text-sm text-white/55">{stat.label}</p>
                            <h2 className="mt-3 text-4xl font-semibold text-[#f9e4da]">{stat.value}</h2>
                        </article>
                    ))}
                </section>

                {message && (
                    <div className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                        message.includes("❌")
                            ? "border-red-500/20 bg-red-500/10 text-red-300"
                            : "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                    }`}>
                        {message}
                    </div>
                )}

                <section className="rounded-3xl border border-white/10 bg-white/6 p-8 backdrop-blur-xl">
                    <div className="mb-6 flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-white">Pending campaigns for review</h2>
                            <p className="mt-2 text-white/65">Approve or reject new rescue requests to keep the platform trustworthy.</p>
                        </div>
                        {loading && <Clock className="h-6 w-6 animate-spin text-[#f9e4da]" />}
                    </div>

                    {!loading && pendingCampaigns.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-12 text-center">
                            <CheckCircle className="mx-auto h-12 w-12 text-emerald-400 opacity-50 mb-4" />
                            <p className="text-white/65">All campaigns have been reviewed! No pending campaigns.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pendingCampaigns.map((campaign) => (
                                <article key={campaign._id} className="rounded-2xl border border-white/10 bg-[#101515] p-6">
                                    <div className="grid gap-6 md:grid-cols-[1fr_auto]">
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex items-center gap-3 gap-2 mb-2">
                                                    <h3 className="text-xl font-semibold text-white">{campaign.title}</h3>
                                                    {campaign.isEmergencyRequest && (
                                                        <span className="inline-flex items-center gap-1 rounded-full border border-[#f9e4da]/20 bg-[#f9e4da]/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#f9e4da]">
                                                            <AlertCircle className="h-3 w-3" />
                                                            Emergency
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-white/65">{campaign.description}</p>
                                            </div>

                                            <div className="grid gap-3 md:grid-cols-3">
                                                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                                                    <p className="text-xs text-white/55">Category</p>
                                                    <p className="mt-1 font-semibold text-white">{campaign.category}</p>
                                                </div>
                                                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                                                    <p className="text-xs text-white/55">Pet</p>
                                                    <p className="mt-1 font-semibold text-white">{campaign.pet?.name || "N/A"} ({campaign.pet?.species})</p>
                                                </div>
                                                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                                                    <p className="text-xs text-white/55">Goal amount</p>
                                                    <p className="mt-1 font-semibold text-white">₹{campaign.goalAmount}</p>
                                                </div>
                                            </div>

                                            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                                                <p className="text-xs text-white/55">Created by</p>
                                                <p className="mt-1 font-semibold text-white">{campaign.createdBy?.name} ({campaign.createdBy?.role})</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 md:w-40">
                                            <button
                                                onClick={() => handleApproveCampaign(campaign._id)}
                                                disabled={actionInProgress === campaign._id}
                                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500/20 px-4 py-3 font-semibold text-emerald-300 transition enabled:hover:bg-emerald-500/30 disabled:opacity-50"
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleRejectCampaign(campaign._id)}
                                                disabled={actionInProgress === campaign._id}
                                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-500/20 px-4 py-3 font-semibold text-red-300 transition enabled:hover:bg-red-500/30 disabled:opacity-50"
                                            >
                                                <XCircle className="h-4 w-4" />
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
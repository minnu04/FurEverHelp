const adminStats = [
    { label: "Pending campaigns", value: "12" },
    { label: "Reports reviewed", value: "48" },
    { label: "Resolved cases", value: "31" },
    { label: "Active moderators", value: "5" },
];

const adminActions = [
    {
        title: "Approval queue",
        description: "Review new rescue campaigns, check supporting details, and approve verified requests.",
    },
    {
        title: "Moderation review",
        description: "Handle flagged content, campaign edits, and urgent community reports with care.",
    },
    {
        title: "Audit logs",
        description: "Track moderation decisions, status changes, and admin activity across the platform.",
    },
];

const AdminDashboard = () => {
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

                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {adminStats.map((stat) => (
                        <article key={stat.label} className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
                            <p className="text-sm text-white/55">{stat.label}</p>
                            <h2 className="mt-3 text-4xl font-semibold text-[#f9e4da]">{stat.value}</h2>
                        </article>
                    ))}
                </section>

                <section className="grid gap-6 lg:grid-cols-3">
                    {adminActions.map((action) => (
                        <article key={action.title} className="rounded-3xl border border-white/10 bg-[#101515] p-7 shadow-[0_16px_40px_rgba(0,0,0,0.22)]">
                            <h3 className="text-xl font-semibold text-white">{action.title}</h3>
                            <p className="mt-3 leading-7 text-white/65">{action.description}</p>
                            <div className="mt-6 inline-flex rounded-full border border-[#f9e4da]/20 bg-[#f9e4da]/10 px-4 py-2 text-sm font-semibold text-[#f9e4da]">
                                Open workspace
                            </div>
                        </article>
                    ))}
                </section>

                <section className="rounded-3xl border border-white/10 bg-white/6 p-8 backdrop-blur-xl">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-white">Next moderation steps</h2>
                            <p className="mt-2 max-w-2xl leading-7 text-white/65">
                                Use this space for the approval queue, rejection actions, and campaign log review once the admin API data is connected.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="rounded-2xl bg-[#1d503a] px-5 py-3 font-semibold text-[#f9e4da] transition hover:bg-[#163a2a]">
                                Review queue
                            </button>
                            <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
                                View logs
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";

const timeSlots = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
];

const emptyForm = {
  title: "",
  description: "",
  category: "Medical Care",
  petName: "",
  species: "Dog",
  breed: "",
  age: "",
  medicalCondition: "",
  location: "",
  goalAmount: "",
  deadline: "",
  preferredTimeSlot: timeSlots[0],
};

const EmergencyRequest = () => {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const requestCards = [
    {
      label: "Urgency",
      value: "Emergency request",
      detail: "Marked for fast review and follow-up.",
    },
    {
      label: "Preferred slot",
      value: form.preferredTimeSlot,
      detail: "Choose the time window that works best for outreach.",
    },
    {
      label: "Goal amount",
      value: form.goalAmount ? `₹${form.goalAmount}` : "Not set",
      detail: "Set a realistic target for treatment or rescue costs.",
    },
  ];

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const { data } = await API.get("/campaigns/my");
        setRequests(data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Please log in to view your requests.");
      }
    };

    loadRequests();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const payload = {
        title: form.title,
        description: form.description,
        category: form.category,
        pet: {
          name: form.petName,
          species: form.species,
          breed: form.breed,
          age: form.age ? Number(form.age) : undefined,
          medicalCondition: form.medicalCondition,
          location: form.location,
        },
        goalAmount: Number(form.goalAmount),
        deadline: form.deadline,
        isEmergencyRequest: true,
        preferredTimeSlot: form.preferredTimeSlot,
      };

      const { data } = await API.post("/campaigns", payload);
      setRequests((current) => [data, ...current]);
      setForm(emptyForm);
      setMessage("✅ Emergency request submitted successfully! Redirecting to campaigns...");
      setTimeout(() => navigate("/campaigns"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to submit the emergency request.");
    }
  };

  return (
    <section className="px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#1d503a] via-[#101515] to-[#f9e4da] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.32)] md:p-12">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Emergency request</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">Request urgent help for a pet in need.</h1>
            <p className="max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              Select a time slot, describe the case clearly, and submit the request so your rescue can be reviewed quickly.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-[#101515] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.22)] md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-white/70">Title</span>
                <input
                  name="title"
                  placeholder="Medical emergency for rescued dog"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#f9e4da]/40 focus:bg-white/8"
                />
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-white/70">Description</span>
                <textarea
                  name="description"
                  placeholder="Tell donors and moderators what happened, what is needed, and why this is urgent."
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#f9e4da]/40 focus:bg-white/8"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-white/70">Pet name</span>
                <input
                  name="petName"
                  placeholder="Milo"
                  value={form.petName}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#f9e4da]/40 focus:bg-white/8"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-white/70">Breed</span>
                <input
                  name="breed"
                  placeholder="Indie / Labrador / Mixed"
                  value={form.breed}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#f9e4da]/40 focus:bg-white/8"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-white/70">Age</span>
                <input
                  name="age"
                  type="number"
                  placeholder="2"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#f9e4da]/40 focus:bg-white/8"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-white/70">Medical condition</span>
                <input
                  name="medicalCondition"
                  placeholder="Fracture, infection, dehydration..."
                  value={form.medicalCondition}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#f9e4da]/40 focus:bg-white/8"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-white/70">Location</span>
                <input
                  name="location"
                  placeholder="City, area, landmark"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#f9e4da]/40 focus:bg-white/8"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-white/70">Goal amount</span>
                <input
                  name="goalAmount"
                  type="number"
                  placeholder="50000"
                  value={form.goalAmount}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#f9e4da]/40 focus:bg-white/8"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-white/70">Deadline</span>
                <input
                  name="deadline"
                  type="date"
                  value={form.deadline}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#f9e4da]/40 focus:bg-white/8"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-white/70">Category</span>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#f9e4da]/40 focus:bg-white/8"
                >
                  <option className="bg-[#101515] text-white">Medical Care</option>
                  <option className="bg-[#101515] text-white">Rescue & Shelter</option>
                  <option className="bg-[#101515] text-white">Adoption Support</option>
                  <option className="bg-[#101515] text-white">Stray Feeding</option>
                  <option className="bg-[#101515] text-white">Vaccination</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-white/70">Species</span>
                <select
                  name="species"
                  value={form.species}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#f9e4da]/40 focus:bg-white/8"
                >
                  <option className="bg-[#101515] text-white">Dog</option>
                  <option className="bg-[#101515] text-white">Cat</option>
                  <option className="bg-[#101515] text-white">Other</option>
                </select>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-white/70">Preferred time slot</span>
                <select
                  name="preferredTimeSlot"
                  value={form.preferredTimeSlot}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#f9e4da]/40 focus:bg-white/8"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot} className="bg-[#101515] text-white">
                      {slot}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-[#f9e4da] px-6 py-3 font-semibold text-[#0a0e0f] transition hover:-translate-y-0.5"
              >
                Send emergency request
              </button>
              <p className="text-sm text-white/55">Urgent requests are highlighted for quicker review.</p>
            </div>

            {message ? (
              <div className="mt-6 rounded-2xl border border-[#f9e4da]/20 bg-[#f9e4da]/10 px-4 py-3 text-sm text-[#f9e4da]">
                {message}
              </div>
            ) : null}
          </form>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f9e4da]/70">Request summary</p>
              <div className="mt-6 space-y-4">
                {requestCards.map((card) => (
                  <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-white/55">{card.label}</p>
                    <p className="mt-1 text-lg font-semibold text-white">{card.value}</p>
                    <p className="mt-2 text-sm leading-6 text-white/65">{card.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-[#101515] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.22)] md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f9e4da]/70">Your requests</p>
              <div className="mt-6 space-y-4">
                {requests.length === 0 ? (
                  <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/65">No emergency requests yet.</p>
                ) : (
                  requests.map((request) => (
                    <article key={request._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-base font-semibold text-white">{request.title}</h3>
                          <p className="mt-1 text-sm text-white/60">Status: {request.campaignStatus}</p>
                        </div>
                        {request.isEmergencyRequest ? (
                          <span className="rounded-full border border-[#f9e4da]/20 bg-[#f9e4da]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#f9e4da]">
                            Emergency
                          </span>
                        ) : null}
                      </div>
                      {request.preferredTimeSlot ? <p className="mt-3 text-sm text-white/65">Time slot: {request.preferredTimeSlot}</p> : null}
                    </article>
                  ))
                )}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </section>
  );
};

export default EmergencyRequest;
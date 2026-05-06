import { useEffect, useState } from "react";
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
      setMessage("Emergency request submitted successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to submit the emergency request.");
    }
  };

  return (
    <div>
      <h2>Emergency Request</h2>
      <p>Select a time slot and submit the urgent request.</p>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="petName" placeholder="Pet name" value={form.petName} onChange={handleChange} />
        <input name="breed" placeholder="Breed" value={form.breed} onChange={handleChange} />
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} />
        <input name="medicalCondition" placeholder="Medical condition" value={form.medicalCondition} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="goalAmount" type="number" placeholder="Goal amount" value={form.goalAmount} onChange={handleChange} />
        <input name="deadline" type="date" value={form.deadline} onChange={handleChange} />

        <select name="category" value={form.category} onChange={handleChange}>
          <option>Medical Care</option>
          <option>Rescue & Shelter</option>
          <option>Adoption Support</option>
          <option>Stray Feeding</option>
          <option>Vaccination</option>
        </select>

        <select name="species" value={form.species} onChange={handleChange}>
          <option>Dog</option>
          <option>Cat</option>
          <option>Other</option>
        </select>

        <select name="preferredTimeSlot" value={form.preferredTimeSlot} onChange={handleChange}>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <button type="submit">Send emergency request</button>
      </form>

      {message ? <p>{message}</p> : null}

      <h3>Your requests</h3>
      {requests.length === 0 ? <p>No emergency requests yet.</p> : null}
      {requests.map((request) => (
        <div key={request._id} style={{ border: "1px solid gray", margin: "10px 0", padding: "8px" }}>
          <h4>{request.title}</h4>
          <p>Status: {request.campaignStatus}</p>
          {request.preferredTimeSlot ? <p>Time slot: {request.preferredTimeSlot}</p> : null}
          {request.isEmergencyRequest ? <p>Emergency request</p> : null}
        </div>
      ))}
    </div>
  );
};

export default EmergencyRequest;
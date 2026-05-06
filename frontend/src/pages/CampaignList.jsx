import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axiosInstance";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const { data } = await API.get("/campaigns");
      setCampaigns(data);
    };

    fetchCampaigns();
  }, []);

  return (
    <div>
      <h2>All Campaigns</h2>
      <p>
        Need urgent help? <Link to="/request-emergency">Send an emergency request</Link>
      </p>

      {campaigns.map((c) => (
        <div key={c._id} style={{ border: "1px solid gray", margin: "10px" }}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <p>Goal: ₹{c.goalAmount}</p>
          <p>Raised: ₹{c.raisedAmount}</p>
          {c.isEmergencyRequest ? <p>Emergency request</p> : null}
          {c.preferredTimeSlot ? <p>Time slot: {c.preferredTimeSlot}</p> : null}
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
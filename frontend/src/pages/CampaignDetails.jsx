import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axiosInstance";

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      const { data } = await API.get(`/campaigns/${id}`);
      setCampaign(data);
    };

    fetchCampaign();
  }, [id]);

  if (!campaign) return <p>Loading...</p>;

  return (
    <div>
      <h2>{campaign.title}</h2>
      <p>{campaign.description}</p>
      <p>Pet: {campaign.pet.name}</p>
      <p>Raised: ₹{campaign.raisedAmount}</p>
      {campaign.isEmergencyRequest ? <p>Emergency request</p> : null}
      {campaign.preferredTimeSlot ? <p>Time slot: {campaign.preferredTimeSlot}</p> : null}
    </div>
  );
};

export default CampaignDetails;
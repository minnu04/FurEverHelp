import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axiosInstance";
import DonationModal from "../components/DonationModal";

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  // Load Razorpay SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/campaigns/${id}`);
        setCampaign(data);
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || "Unable to load campaign details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleDonateClick = () => {
    if (!campaign || campaign.campaignStatus !== "Approved") {
      setError("This campaign is not available for donations.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleDonate = async (amount) => {
    setIsProcessing(true);
    setPaymentStatus("");

    try {
      const { data: order } = await API.post("/donations/create-order", {
        amount,
        campaignId: id,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "",
        amount: order.amount,
        currency: "INR",
        name: "FurEverHelp",
        description: `Donation for ${campaign.title}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyResponse = await API.post("/donations/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.status === 200) {
              setPaymentStatus("success");
              setIsModalOpen(false);

              const { data: updatedCampaign } = await API.get(`/campaigns/${id}`);
              setCampaign(updatedCampaign);

              setTimeout(() => {
                setPaymentStatus("");
              }, 5000);
            }
          } catch {
            setPaymentStatus("failure");
            setError("Payment verification failed. Please contact support.");
            setTimeout(() => {
              setPaymentStatus("");
            }, 5000);
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: "Donor",
          email: "donor@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#1d503a",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to initiate payment");
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-5xl animate-float">🐾</div>
          <p className="text-dark-muted">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4 p-8 bg-dark-card rounded-3xl border border-dark-border max-w-md">
          <p className="text-xl text-dark-text">❌ {error}</p>
          <Link to="/campaigns" className="inline-block px-6 py-3 bg-primary text-campagne rounded-xl font-semibold">
            Back to Campaigns
          </Link>
        </div>
      </div>
    );
  }

  if (!campaign) return null;

  const progress = campaign.goalAmount
    ? Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100))
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <Link to="/campaigns" className="text-sm text-dark-muted hover:text-primary transition mb-8 inline-flex items-center gap-2">
          ← Back to Campaigns
        </Link>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Image */}
          <div className="md:col-span-2">
            <div className="aspect-video bg-gradient-to-br from-primary to-accent rounded-3xl overflow-hidden mb-8">
              {campaign.images?.[0] ? (
                <img
                  src={campaign.images[0]}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl">
                  🐾
                </div>
              )}
            </div>

            {/* Campaign Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-primary text-campagne rounded-full text-sm font-bold">
                    {campaign.category}
                  </span>
                  <span className="px-4 py-2 bg-dark-border text-dark-muted rounded-full text-sm">
                    {campaign.campaignStatus}
                  </span>
                  {campaign.isEmergencyRequest && (
                    <span className="px-4 py-2 bg-accent bg-opacity-20 text-accent rounded-full text-sm font-bold">
                      🚨 Emergency
                    </span>
                  )}
                </div>

                <h1 className="text-5xl font-bold text-dark-text">{campaign.title}</h1>
                <p className="text-lg text-dark-muted leading-relaxed">{campaign.description}</p>
              </div>

              {/* Pet Info */}
              <div className="p-6 bg-dark-card border border-dark-border rounded-3xl space-y-4">
                <h3 className="font-bold text-xl text-dark-text">Pet Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-dark-muted">Name</div>
                    <div className="font-semibold text-dark-text">{campaign.pet?.name || 'Not provided'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-dark-muted">Species</div>
                    <div className="font-semibold text-dark-text">{campaign.pet?.species || 'Not provided'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-dark-muted">Breed</div>
                    <div className="font-semibold text-dark-text">{campaign.pet?.breed || 'Not provided'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-dark-muted">Location</div>
                    <div className="font-semibold text-dark-text">{campaign.pet?.location || 'Not provided'}</div>
                  </div>
                </div>
              </div>

              {/* Campaign Details */}
              <div className="p-6 bg-dark-card border border-dark-border rounded-3xl space-y-4">
                <h3 className="font-bold text-xl text-dark-text">Campaign Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-dark-muted">Treatment Status</span>
                    <span className="font-semibold text-dark-text">{campaign.treatmentStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-muted">Deadline</span>
                    <span className="font-semibold text-dark-text">
                      {new Date(campaign.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  {campaign.preferredTimeSlot && (
                    <div className="flex justify-between">
                      <span className="text-dark-muted">Preferred Time</span>
                      <span className="font-semibold text-dark-text">{campaign.preferredTimeSlot}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Donation Card */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-gradient-to-b from-dark-card to-dark-card border border-dark-border rounded-3xl p-8 space-y-6 backdrop-blur-md">
              {/* Progress */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">₹{campaign.raisedAmount}</div>
                  <div className="text-sm text-dark-muted">raised of ₹{campaign.goalAmount} goal</div>
                </div>

                <div className="w-full h-3 bg-dark-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="text-xl font-bold text-primary">{progress}% funded</div>
              </div>

              {/* Divider */}
              <div className="border-t border-dark-border"></div>

              {/* Donation Button */}
              {campaign.campaignStatus === "Approved" ? (
                <button
                  onClick={handleDonateClick}
                  className="w-full py-4 bg-primary text-campagne rounded-2xl font-bold text-lg hover:shadow-glow-lg transition-all transform hover:-translate-y-1"
                >
                  💝 Donate Now
                </button>
              ) : (
                <div className="p-4 bg-dark-border rounded-2xl text-center text-sm text-dark-muted">
                  ⏳ This campaign is not yet available for donations
                </div>
              )}

              {/* Share */}
              <button className="w-full py-3 border-2 border-dark-border text-dark-text rounded-xl font-semibold hover:border-primary hover:text-primary transition">
                📤 Share This Campaign
              </button>

              {/* Stats */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-dark-muted">
                  <span>📊 Donors</span>
                  <span className="font-bold text-dark-text">1,234</span>
                </div>
                <div className="flex justify-between text-dark-muted">
                  <span>📅 Days Left</span>
                  <span className="font-bold text-dark-text">15</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {paymentStatus === "success" && (
          <div className="fixed top-20 right-4 p-4 bg-green-500 bg-opacity-10 border border-green-500 border-opacity-50 text-green-400 rounded-2xl backdrop-blur-md">
            ✨ Thank you! Your donation was successful!
          </div>
        )}

        {paymentStatus === "failure" && (
          <div className="fixed top-20 right-4 p-4 bg-accent bg-opacity-10 border border-accent border-opacity-50 text-accent rounded-2xl backdrop-blur-md">
            ❌ Payment verification failed. Please try again.
          </div>
        )}
      </div>

      {/* Donation Modal */}
      <DonationModal
        isOpen={isModalOpen}
        onClose={() => !isProcessing && setIsModalOpen(false)}
        campaignTitle={campaign.title}
        onDonate={handleDonate}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default CampaignDetails;
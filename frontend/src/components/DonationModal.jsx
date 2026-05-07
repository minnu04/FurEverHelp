import { useState } from "react";

const DonationModal = ({ isOpen, onClose, campaignTitle, onDonate, isProcessing }) => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");

  const presetAmounts = [100, 500, 1000, 2500, 5000];

  const handlePresetClick = (value) => {
    setAmount(value);
    setCustomAmount("");
    setError("");
  };

  const handleCustomChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setAmount("");
    }
    setError("");
  };

  const handleDonate = () => {
    const finalAmount = customAmount ? parseInt(customAmount) : amount;
    
    if (!finalAmount || finalAmount <= 0) {
      setError("Please select or enter a valid amount");
      return;
    }

    if (finalAmount > 1000000) {
      setError("Amount cannot exceed ₹10,00,000");
      return;
    }

    onDonate(finalAmount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card border border-dark-border rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto backdrop-blur-md shadow-card-hover">
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-8 border-b border-dark-border bg-dark-card bg-opacity-80">
          <h2 className="text-2xl font-bold text-dark-text">💝 Make a Donation</h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-8 h-8 flex items-center justify-center text-dark-muted hover:text-primary hover:bg-dark-border rounded-lg transition disabled:opacity-50"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <p className="text-dark-muted">
            Donate to: <span className="text-dark-text font-bold">{campaignTitle}</span>
          </p>

          <div className="space-y-4">
            <label className="font-bold text-dark-text block">Choose an amount or enter custom:</label>
            
            <div className="grid grid-cols-3 gap-2">
              {presetAmounts.map((value) => (
                <button
                  key={value}
                  onClick={() => handlePresetClick(value)}
                  disabled={isProcessing}
                  className={`py-3 px-2 rounded-xl font-bold transition transform ${
                    amount === value
                      ? "bg-primary text-campagne shadow-glow scale-105"
                      : "border-2 border-dark-border text-dark-text hover:border-primary hover:text-primary"
                  } disabled:opacity-50`}
                >
                  ₹{value}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label htmlFor="customAmount" className="text-sm font-bold text-dark-text block">
                Custom Amount (₹)
              </label>
              <input
                id="customAmount"
                type="number"
                min="1"
                max="1000000"
                value={customAmount}
                onChange={handleCustomChange}
                placeholder="Enter amount in rupees"
                disabled={isProcessing}
                className="w-full px-4 py-3 border-2 border-dark-border bg-dark-bg rounded-xl text-dark-text placeholder-dark-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition disabled:opacity-50"
              />
            </div>

            {error && (
              <div className="p-3 bg-accent bg-opacity-10 border border-accent border-opacity-50 text-accent rounded-xl text-sm">
                {error}
              </div>
            )}
          </div>

          {(amount || customAmount) && (
            <div className="p-4 bg-gradient-to-r from-primary from-opacity-10 to-accent to-opacity-10 border-2 border-primary rounded-2xl">
              <p className="text-dark-text font-bold">
                Amount to donate: <span className="text-primary text-lg">₹{customAmount || amount}</span>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex gap-3 p-8 border-t border-dark-border bg-dark-card bg-opacity-80">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 py-3 border-2 border-dark-border text-dark-text rounded-xl font-bold hover:border-primary hover:text-primary transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDonate}
            disabled={isProcessing || (!amount && !customAmount)}
            className="flex-1 py-3 bg-primary text-campagne rounded-xl font-bold hover:shadow-glow transition disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;

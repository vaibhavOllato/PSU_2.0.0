import React from "react";

const PaymentButton = ({ amount, packageInfo, packageId }) => {
  const userDetails = JSON.parse(localStorage.getItem("user")) || {};
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const initiatePayment = async () => {
    const paymentData = {
      amount: amount.toString(), // Ensure it's a string
      productInfo: packageInfo,
      fullName: userDetails
        ? `${userDetails.first_name} ${userDetails.last_name}`
        : "Guest User",
      email: userDetails?.email || "guest@example.com",
      phone: userDetails?.phone || "0000000000",
    };

    try {
      const response = await fetch(`${apiUrl}/api/payment/initiate-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Payment Initiated. Proceed to Payment Gateway.");
        if (result.paymentUrl) {
          window.location.href = result.paymentUrl;
        }
      } else {
        alert("Payment failed: " + result.message);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("An error occurred while processing the payment.");
    }
  };

  return (
    <button
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
      onClick={initiatePayment}
    >
      Get Started Now
    </button>
  );
};

export default PaymentButton;

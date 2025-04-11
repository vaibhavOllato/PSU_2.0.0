import { useState } from "react";
import { Link } from "react-router-dom";
import companyLogo from "../assets/companyLogo2.png";
import { useNotification } from "../context/NotificationProvider";

export default function LoginWithOTPForm() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const { triggerNotification } = useNotification(); // Use the notification hook

  const handleSendOTP = () => {
    if (!phone || phone.length < 10) {
      triggerNotification("Please enter a valid mobile number", "error");
      return;
    }

    // Simulate OTP sent success
    setOtpSent(true);
    triggerNotification("OTP sent successfully!", "success");
  };

  const handleVerifyOTP = () => {
    if (!otp || otp.length !== 6) {
      triggerNotification("Please enter a valid 6-digit OTP", "error");
      return;
    }

    triggerNotification("OTP verified successfully!", "success");
    // Redirect or proceed with login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden min-h-[500px]">
        {/* Left Side - Company Logo */}
        <div className="w-full md:w-1/2 bg-primary flex flex-col items-center justify-center py-6 text-white">
          <img src={companyLogo} alt="Company Logo" className="w-32 md:w-60" />
          <h1 className="text-lg md:text-2xl font-bold mt-2 text-center">
            Public Undertaking Service
          </h1>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <form className="w-full max-w-md">
            <h2 className="text-2xl text-primary font-semibold mb-6 text-center">
              Login with OTP
            </h2>

            {/* Phone Number Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mobile No
              </label>
              <div className="flex border border-gray-300 rounded ">
                <input
                  type="tel"
                  className="w-full p-2 focus:outline-none rounded-l focus:ring-2 focus:ring-rose-300 transition"
                  placeholder="Enter your mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={otpSent} // Disable input after OTP is sent
                />
                <button
                  type="button"
                  className={`px-3 rounded-r ${
                    otpSent
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                  onClick={handleSendOTP}
                  disabled={otpSent} // Disable button after OTP is sent
                >
                  {otpSent ? "Sent OTP " : "Send OTP"}
                </button>
              </div>
            </div>

            {/* OTP Input Field (Shown after OTP is sent) */}
            {otpSent && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}

            {/* Verify OTP Button (Shown after OTP is sent) */}
            {otpSent && (
              <button
                type="button"
                className="w-full bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 mt-6"
                onClick={handleVerifyOTP}
              >
                Verify OTP
              </button>
            )}

            {/* Back to Login */}
            <p className="text-center text-gray-600 mt-4">
              Want to login with password?{" "}
              <Link to="/" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

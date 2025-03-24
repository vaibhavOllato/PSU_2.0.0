import { useState } from "react";
import { Link } from "react-router-dom";
import companyLogo from "../assets/companyLogo2.png";

export default function LoginWithOTPForm() {
  const [phone, setPhone] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden min-h-[500px]">
        
        {/* Left Side - Company Logo */}
        <div className="w-full md:w-1/2 bg-gray-900 flex flex-col items-center justify-center py-6 text-white">
          <img src={companyLogo} alt="Company Logo" className="w-32 md:w-60" />
          <h1 className="text-lg md:text-2xl font-bold mt-2 text-center">Public Undertaking Service</h1>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <form className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Login with OTP</h2>

            {/* Phone Number Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Mobile No</label>
              <div className="flex border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type="tel"
                  className="w-full p-2 focus:outline-none rounded-l"
                  placeholder="Enter your mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {/* <button type="button" className="bg-green-600 text-white px-3 rounded-r hover:bg-green-700">
                  Send OTP
                </button> */}
              </div>
            </div>

            {/* Verify OTP Button */}
            <button type="submit" className="w-full bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 mt-6">
              Verify OTP
            </button>

            {/* Back to Login */}
            <p className="text-center text-gray-600 mt-4">
              Want to login with password?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

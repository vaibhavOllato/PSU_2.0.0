import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import companyLogo from "../assets/companyLogo2.png";
import { useAuth } from "../context/AuthContext"; // Adjust path if needed
import { useNotification } from "../context/NotificationProvider";


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation
  const { login } = useAuth(); // Get login function from AuthContext
  const { triggerNotification } = useNotification(); // Use the notification hook
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ panel_name: "psu", email, password }),
      });

      const data = await response.json();
      // console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Corrected key names based on API response
      const userData = {
        first_name: data.user.first_name || "",
        last_name: data.user.last_name || "",
        userId: data.user.user_id || "", // Fix userId key
        email: data.user.email || "",
        phone: data.user.phone_number || "", // Fix phone key
        dateOfBirth: data.user.DOB || "", // Fix dateOfBirth key
        role: data.user.role || "",
        isVerified: data.user.email_is_verified === 1, // Convert 0/1 to boolean
        payment_status: data.user.payment_status || 0,
        gender: data.user.gender || "",
      };

      // console.log("Final User Data to be Stored:", userData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      // Trigger success toast
      triggerNotification("Login successful!");

      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message);
      triggerNotification("An error occurred during login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden min-h-[500px]">
        {/* Left Side (Company Logo) */}
        <div className="w-full md:w-1/2 bg-primary flex flex-col items-center justify-center py-6 text-white">
          <img src={companyLogo} alt="Company Logo" className="w-32 md:w-60" />
          <h1 className="text-lg md:text-2xl font-bold mt-2 text-center">
            Public Undertaking Service
          </h1>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <form className="w-full max-w-md" onSubmit={handleLogin}>
            <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
              Login
            </h2>

            {/* Error Message */}
            {error && (
              <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              {/* <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus-within:ring-2 focus-within:ring-rose-400"
                placeholder="Enter your email"
                required
              /> */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-rose-300"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password with Visibility Toggle */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="flex border border-gray-300 rounded focus-within:ring-2 focus-within:ring-rose-300">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 focus:outline-none rounded-l"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="px-3 flex items-center bg-gray-200 rounded-r"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white p-2 rounded hover:bg-[#4D2B46] mt-6"
            >
              Login
            </button>

            {/* Links Below the Login Button */}
            <div className="flex justify-between text-sm text-center mt-4">
              <Link to="/login-otp" className="text-blue-600 hover:underline">
                Login with OTP
              </Link>
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Register Link */}
            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

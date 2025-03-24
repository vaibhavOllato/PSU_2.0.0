// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { Link } from "react-router-dom"; // Import Link for navigation
// import companyLogo from "../assets/companyLogo2.png";

// export default function RegisterForm() {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 overflow-y-auto">
//       {/* Parent Wrapper with Scroll */}
//       <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden min-h-[500px]">

//         {/* Left Side (Company Logo) */}
//         <div className="w-full md:w-1/2 bg-gray-900 flex flex-col items-center justify-center py-6 text-white min-h-[250px] sm:min-h-[300px]">
//           <img src={companyLogo} alt="Company Logo" className="w-32 md:w-60" />
//           <h1 className="text-lg md:text-2xl font-bold mt-2 text-center">Public Undertaking Service</h1>
//         </div>

//         {/* Right Side - Form */}
//         <div className="w-full md:w-1/2 flex items-center justify-center p-6 overflow-y-auto">
//           <form className="w-full max-w-md">
//             <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

//             {/* First Name & Last Name */}
//             <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//               <div className="w-full md:w-1/2">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
//                 <input type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="Enter first name"/>
//               </div>
//               <div className="w-full md:w-1/2">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
//                 <input type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="Enter last name"/>
//               </div>
//             </div>

//             {/* Date of Birth & Gender */}
//             <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
//               <div className="w-full md:w-1/2">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
//                 <input type="date" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"/>
//               </div>
//               <div className="w-full md:w-1/2">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
//                 <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>

//             {/* Mobile Number & Role */}
//             <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
//               {/* Mobile Number with OTP Button */}
//               <div className="w-full md:w-1/2">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Mobile No</label>
//                 <div className="flex border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500">
//                   <input type="tel" className="w-full p-2 focus:outline-none rounded-l" placeholder="Enter mobile no"/>
//                   <button type="button" className="bg-green-600 text-white px-3 rounded-r hover:bg-green-700">OTP</button>
//                 </div>
//               </div>

//               {/* Role Selection */}
//               <div className="w-full md:w-1/2">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
//                 <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
//                   <option value="">Select Role</option>
//                   <option value="upper">Upper</option>
//                   <option value="middle">Middle</option>
//                   <option value="lower">Lower</option>
//                 </select>
//               </div>
//             </div>

//             {/* Email & Password */}
//             <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
//               <div className="w-full md:w-1/2">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//                 <input type="email" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="Enter your email"/>
//               </div>
//               <div className="w-full md:w-1/2 relative">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
//                 <div className="flex border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500">
//                   <input type={showPassword ? "text" : "password"} className="w-full p-2 focus:outline-none rounded-l" placeholder="Enter your password"/>
//                   <button type="button" className="px-3 flex items-center bg-gray-200 rounded-r" onClick={() => setShowPassword(!showPassword)}>
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Register Button */}
//             <button type="submit" className="w-full bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 mt-6">Register</button>

//             {/* Already Registered? Login */}
//             <p className="text-center text-gray-600 mt-4">
//               Already registered?{" "}
//               <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
//             </p>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import companyLogo from "../assets/companyLogo2.png";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    panel_name: "psu",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    role: "",
    gender: "",
    DOB: "",
    registredFrom: "self",
    registrator_id: "self",
    otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetOtp = async () => {
    if (!formData.phone_number) {
      setMessage({
        type: "error",
        text: "Please enter a valid mobile number!",
      });
      return;
    }

    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("http://localhost:3000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: formData.phone_number }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setMessage({ type: "success", text: "OTP sent successfully!" });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to send OTP!",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Try again later!",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Registration successful! Please login.",
        });
        setFormData({
          panel_name: "psu",
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          password: "",
          role: "",
          gender: "",
          DOB: "",
          registredFrom: "self",
          registrator_id: "self",
          otp: "",
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Registration failed!",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Try again later!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 overflow-y-auto">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden min-h-[500px]">
        {/* Left Side - Company Logo */}
        <div className="w-full md:w-1/2 bg-gray-900 flex flex-col items-center justify-center py-6 text-white min-h-[250px] sm:min-h-[300px]">
          <img src={companyLogo} alt="Company Logo" className="w-32 md:w-60" />
          <h1 className="text-lg md:text-2xl font-bold mt-2 text-center">
            Public Undertaking Service
          </h1>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 overflow-y-auto">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Register
            </h2>

            {/* Display Message */}
            {message.text && (
              <p
                className={`text-center p-2 rounded-md mb-4 ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.text}
              </p>
            )}

            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            {/* Email & Password (Inline) */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded pr-10"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Role & Gender */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Role</option>
                  <option value="upper">Upper</option>
                  <option value="middle">Middle</option>
                  <option value="junior">Junior</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Mobile Number & Date of Birth (Inline) */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Mobile Number with OTP */}
              <div>
                <label className="block text-gray-700 text-sm font-bold">
                  Mobile No
                </label>
                <div className="flex border border-gray-300 rounded">
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    className="w-full p-2 focus:outline-none rounded-l"
                    placeholder="Enter mobile no"
                  />
                  <button
                    type="button"
                    onClick={handleGetOtp}
                    className="bg-green-600 text-white px-3 rounded-r hover:bg-green-700"
                  >
                    {otpSent ? "Resend OTP" : "Get OTP"}
                  </button>
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-gray-700 text-sm font-bold">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="DOB"
                  value={formData.DOB}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 mt-6"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {/* Already Registered? Login (Placed Separately at Bottom) */}
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Already registered?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
          {/* Already Registered? Login */}
        </div>
      </div>
    </div>
  );
}

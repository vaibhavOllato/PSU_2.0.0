// export default function LoginForm() {
//     return (
//       <div className="flex h-screen">
//         {/* Left Side - Logo */}
//         <div className="w-1/2 bg-gray-900 flex items-center justify-center">
//           <h1 className="text-white text-3xl font-bold">Your Logo</h1>
//         </div>
  
//         {/* Right Side - Form */}
//         <div className="w-1/2 flex items-center justify-center">
//           <form className="bg-white p-8 shadow-lg rounded-md w-96">
//             <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your password"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }
  
// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { Link } from "react-router-dom"; // Import Link for navigation
// import companyLogo from "../assets/companyLogo2.png";

// export default function LoginForm() {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//       {/* Parent Wrapper */}
//       <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden min-h-[500px]">
        
//         {/* Left Side (Company Logo) */}
//         <div className="w-full md:w-1/2 bg-gray-900 flex flex-col items-center justify-center py-6 text-white">
//           <img src={companyLogo} alt="Company Logo" className="w-32 md:w-60" />
//           <h1 className="text-lg md:text-2xl font-bold mt-2 text-center">Public Undertaking Service</h1>
//         </div>

//         {/* Right Side - Form */}
//         <div className="w-full md:w-1/2 flex items-center justify-center p-6">
//           <form className="w-full max-w-md">
//             <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

//             {/* Email */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//               <input
//                 type="email"
//                 className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your email"
//               />
//             </div>

//             {/* Password with Visibility Toggle */}
//             <div className="mb-4 relative">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
//               <div className="flex border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="w-full p-2 focus:outline-none rounded-l"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   className="px-3 flex items-center bg-gray-200 rounded-r"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Login Button */}
//             <button type="submit" className="w-full bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 mt-6">
//               Login
//             </button>

//             {/* Links Below the Login Button */}
//             <div className="flex justify-between text-sm text-center mt-4">
//               {/* <button className="text-green-600 hover:underline">Login with OTP</button> */}
//               <Link to="/login-otp" className="text-blue-600 hover:underline">Login with OTP</Link>
//               <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
//             </div>

//             {/* Register Link - Full Width Below */}
//             <p className="text-center text-gray-600 mt-4">
//               Don't have an account?{" "}
//               <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
//             </p>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import companyLogo from "../assets/companyLogo2.png";
import { useAuth } from "../context/AuthContext"; // Adjust path if needed

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation
  const { login } = useAuth(); // Get login function from AuthContext
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError(null); // Reset error

  //   try {
  //     const response = await fetch("http://localhost:3000/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         panel_name: "psu",
  //         email,
  //         password,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || "Login failed");
  //     }

  //     // Save token in local storage (or use context for state management)
  //     localStorage.setItem("token", data.token);

  //     // Redirect to dashboard after successful login
  //     navigate("/dashboard");
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError(null); // Reset error
  
  //   try {
  //     const response = await fetch("http://localhost:3000/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         panel_name: "psu",
  //         email,
  //         password,
  //       }),
  //     });
  
  //     const data = await response.json();
  //     console.log("API Response:", data); // Debugging
  //     if (!response.ok) {
  //       throw new Error(data.message || "Login failed");
  //     }
  
  //     // Save both token and user data
  //     login({
  //       first_name: data.user.first_name,
  //       last_name: data.user.last_name,
  //       id: data.user.id,
  //       token: data.token,
  //       phone: data.user.phone,
  //       userId: data.user.userId,
  //       dateOfBirth: data.user.dateOfBirth,
  //       role: data.user.role,
  //       email: data.user.email,
  //       profile_picture: data.user.profile_picture,
  //       isVerified: data.user.isVerified,
  //       payment_status: data.user.payment_status,
  //       gender: data.user.gender,
  //     });
  
  //     console.log("Final User Data to be Stored:", userData); // Debugging

  //   localStorage.setItem("token", data.token);
  //   localStorage.setItem("user", JSON.stringify(userData));
  //     // Redirect to dashboard after successful login
  //     navigate("/dashboard");
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ panel_name: "psu", email, password }),
      });
  
      const data = await response.json();
      console.log("API Response:", data); // Debugging
  
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
  
      console.log("Final User Data to be Stored:", userData); // Debugging
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));
  
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden min-h-[500px]">
        
        {/* Left Side (Company Logo) */}
        <div className="w-full md:w-1/2 bg-gray-900 flex flex-col items-center justify-center py-6 text-white">
          <img src={companyLogo} alt="Company Logo" className="w-32 md:w-60" />
          <h1 className="text-lg md:text-2xl font-bold mt-2 text-center">
            Public Undertaking Service
          </h1>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <form className="w-full max-w-md" onSubmit={handleLogin}>
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

            {/* Error Message */}
            {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password with Visibility Toggle */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="flex border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500">
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
              className="w-full bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 mt-6"
            >
              Login
            </button>

            {/* Links Below the Login Button */}
            <div className="flex justify-between text-sm text-center mt-4">
              <Link to="/login-otp" className="text-blue-600 hover:underline">
                Login with OTP
              </Link>
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
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

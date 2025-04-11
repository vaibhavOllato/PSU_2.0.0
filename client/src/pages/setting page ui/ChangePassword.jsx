import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useNotification } from "../../context/NotificationProvider";

const ChangePassword = () => {
  const { user } = useAuth();
  const { triggerNotification } = useNotification(); // Use the notification hook
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword:"",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword:false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordData.newPassword) {
      // toast.error("New password cannot be empty.", { position: "top-center" });
      triggerNotification(
        "New password cannot be empty."
      );
      return;
    }

    if (!user || !user.userId) {
      // toast.error("User ID is missing. Please log in again.", {
      //   position: "top-center",
      // });
      triggerNotification(
        "User ID is missing. Please log in again."
      );
      return;
    }

    const requestBody = {
      currentPassword: passwordData.currentPassword,
      password: passwordData.newPassword,
      userId: user.userId,
    };

    try {
      const response = await axios.put(
        `${apiUrl}/api/profile/${user.userId}`,
        requestBody
      );
      if (response.status === 200) {
        // toast.success("Password updated successfully!", {
        //   position: "top-center",
        // });
        triggerNotification(
          "Password updated successfully!"
        );
      } else {
        // toast.error("Password update failed. Please try again.", {
        //   position: "top-center",
        // });
        triggerNotification(
          "Password update failed. Please try again."
        );
      }
    } catch (error) {
      // toast.error(
      //   `Error updating password: ${
      //     error.response?.data?.error || error.message
      //   }`,
      //   {
      //     position: "top-center",
      //   }
      // );
      triggerNotification(
        `Error updating password: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-secondary mb-6 text-center">
          🔒 Change Password
        </h2>

        {/* Current Password */}
        <div className="mb-5">
          <label className="block text-gray-600 font-medium mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPassword.currentPassword ? "text" : "password"}
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleChange}
              placeholder="Enter your current password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary transition"
            />
            <button
              type="button"
              className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 transition"
              onClick={() => togglePasswordVisibility("currentPassword")}
            >
              {showPassword.currentPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-5">
          <label className="block text-gray-600 font-medium mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword.newPassword ? "text" : "password"}
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary transition"
            />
            <button
              type="button"
              className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 transition"
              onClick={() => togglePasswordVisibility("newPassword")}
            >
              {showPassword.newPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="mb-5">
          <label className="block text-gray-600 font-medium mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showPassword.confirmNewPassword ? "text" : "password"}
              name="confirmPassword"
              value={passwordData.confirmNewPassword}
              onChange={handleChange}
              placeholder="Enter your confirm new password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary transition"
            />
            <button
              type="button"
              className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 transition"
              onClick={() => togglePasswordVisibility("newPassword")}
            >
              {showPassword.newPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-secondary text-white py-3 rounded-lg font-medium hover:from-yellow-600 hover:bg-secondary-hover transition"
        >
          Update Password
        </button>

        {/* <ToastContainer /> */}
      </form>
    </div>
  );
};

export default ChangePassword;

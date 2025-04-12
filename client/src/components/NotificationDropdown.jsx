import React from "react";
import { useEffect } from "react";

const NotificationDropdown = ({ onClose }) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".notification-dropdown")) {
        onClose(); // ✅ This will call the function passed from Header
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="absolute right-1 top-5 w-72 sm:top-12 bg-white text-gray-800 sm:w-72 md:w-80 shadow-lg rounded-lg z-50 notification-dropdown"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 border-b font-semibold text-gray-700">
        Notifications
      </div>
      <div className="p-4 text-sm text-gray-500">No new notifications.</div>
    </div>
  );
};

export default NotificationDropdown;

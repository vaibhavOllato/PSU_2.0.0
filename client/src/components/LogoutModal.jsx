import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    handleClose(); // Close the modal
    navigate("/login"); // Redirect to login page
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
        <p className="text-gray-600 mt-2">Are you sure you want to log out?</p>

        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

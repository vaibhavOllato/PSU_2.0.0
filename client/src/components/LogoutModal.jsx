import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";

const LogoutModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    handleClose();
    navigate("/");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl transform transition-all duration-300 scale-100">
        {/* Close Icon */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={18} />
        </button>

        {/* Icon */}
        <div className="flex justify-center items-center bg-red-100 text-textSecondary w-12 h-12 rounded-full mx-auto mb-4">
          <FaSignOutAlt size={24} />
        </div>

        <h2 className="text-xl font-semibold text-center text-textSecondary">Log Out?</h2>
        <p className="text-center text-gray-600 mt-2">
          Are you sure you want to end your session?
        </p>

        <div className="mt-6 flex justify-between gap-3">
          <button
            onClick={handleClose}
            className="w-1/2 py-2 text-black rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="w-1/2 py-2 rounded-xl bg-textSecondary text-white hover:bg-textSecondary-hover transition font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;


import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { useAuth } from "../../context/AuthContext";
import { FaUserEdit, FaTimes } from "react-icons/fa";
import { useNotification } from "../../context/NotificationProvider";


const InfoComponent = () => {
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { user, updateUserProfile } = useAuth();
  const { triggerNotification } = useNotification(); // Use the notification hook


  useEffect(() => {
    if (user) {
      setProfileData(user);
    }
  }, [user]);

  const handleEditProfileImg = () => fileInputRef.current.click();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      // toast.error("Please upload a valid image file (JPG or PNG).");
      triggerNotification(
        "Please upload a valid image file (JPG or PNG)."
      );
      return;
    }
    try {
      const options = {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile =
        file.size > 50 * 1024 ? await imageCompression(file, options) : file;
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(compressedFile);
      const formData = new FormData();
      formData.append("profile_picture", compressedFile);
      formData.append("userId", user.userId);
      const response = await axios.post(
        `${apiUrl}/profile/uploadProfilePicture`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.filePath) {
        const updatedProfileData = {
          ...profileData,
          profile_picture: response.data.filePath,
        };
        setProfileData(updatedProfileData);
        localStorage.setItem("user", JSON.stringify(updatedProfileData));
        updateUserProfile({ profile_picture: response.data.filePath });
        // toast.success("Profile picture updated successfully!");
        triggerNotification(
          "Profile picture updated successfully!"
        );
      }
    } catch (error) {
      // toast.error("An error occurred while uploading the profile picture.");
      triggerNotification(
        "An error occurred while uploading the profile picture."
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-2xl p-6 max-w-xl mx-auto mt-10 w-full">
      <div className="flex flex-col items-center">
        <div className="relative w-36 h-36">
          {user?.profile_picture || selectedImage ? (
            <img
              src={selectedImage || `${apiUrl}/${user?.profile_picture}`}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-purple-500 shadow-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300 rounded-full text-gray-700 text-4xl">
              <FaUserEdit />
            </div>
          )}
          <button
            className="absolute bottom-1 right-1 bg-yellow-600 text-white p-2 rounded-full shadow-md hover:bg-yellow-700"
            onClick={handleEditProfileImg}
          >
            <FaUserEdit />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <h2 className="mt-4 text-3xl font-bold text-yellow-800 text-center">
          {profileData?.first_name} {profileData?.last_name}
        </h2>
        <p className="text-gray-500 text-sm mb-4 mt-2">
          <strong>User ID:</strong> {profileData?.userId}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-gray-700 text-sm">
          <p>
            <strong>Email:</strong> {profileData?.email}
          </p>
          <p>
            <strong>Phone:</strong> {profileData?.phone}
          </p>
          <p>
            <strong>Gender:</strong> {profileData?.gender}
          </p>
          <p>
            <strong>Role:</strong> {profileData?.role}
          </p>
          
          <p className="col-span-full">
            <strong>Date of Birth:</strong>{" "}
            {profileData?.dateOfBirth &&
              new Date(profileData.dateOfBirth).toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>
      <button
        className="mt-6 w-full bg-yellow-600 text-white py-2 rounded-xl hover:bg-yellow-700 text-lg font-semibold shadow-md"
        onClick={() => setIsModalOpen(true)}
      >
        Edit Profile
      </button>
      {isModalOpen && (
        <EditProfileModal
          profileData={profileData}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    
    </div>
  );
};

const EditProfileModal = ({ profileData, onClose }) => {
  const [formData, setFormData] = useState(profileData);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    // toast.success("Profile updated successfully!");
    triggerNotification(
      "Profile updated successfully!"
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-lg w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-700">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className="p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-yellow-500"
            value={formData.first_name || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-yellow-500"
            value={formData.last_name || ""}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-yellow-500"
            value={formData.email || ""}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-yellow-500"
            value={formData.phone || ""}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            className="p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-yellow-500"
            value={formData.dateOfBirth || ""}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-yellow-600 text-white py-3 rounded-xl font-semibold hover:bg-yellow-700 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default InfoComponent;
// import { CheckCircle, Loader, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import AssessmentGraph from "./AssessmentGraph";
import axios from "axios";
import {
  CheckCircle,
  FileText,
  CalendarCheck,
  Package,
  Award,
} from "lucide-react";
import { UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import theme from "../context/Theme";
import ProgressStep from "../components/ProgressStep";

export default function Dashboard() {
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assessmentStatus, setAssessmentStatus] = useState("Pending");
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);

      if (userData.first_name && userData.last_name) {
        setUserName(`${userData.first_name} ${userData.last_name}`);
      } else if (userData.first_name) {
        setUserName(userData.first_name);
      }

      axios
        .post(`${apiUrl}/api/auth/get-status`, {
          panel_name: "pps",
          user_id: userData.userId,
        })
        .then((res) => {
          // console.log("Assessment status response:", res.data);

          const status = res.data?.result?.assessment_status;
          if (status === 1) {
            setAssessmentStatus("Done");
          } else {
            setAssessmentStatus("Pending");
          }
        })
        .catch((err) => {
          console.error("Error fetching status:", err);
        });
    }
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.first_name && userData?.last_name) {
      setUserName(`${userData.first_name} ${userData.last_name}`);
    } else if (userData?.first_name) {
      setUserName(userData.first_name);
    }
  }, []);

  return (
    <div className="p-1">
      <h1 className="text-2xl text-gray-400 font-bold mb-4">Dashboard</h1>

      {user && !user.isVerified && (
        <div className="rounded-lg shadow-lg mb-4 border border-gray-200 bg-white">
          <div className="flex items-center justify-between px-6 py-3 bg-blue-600 rounded-t-lg">
            <h5 className="text-white text-lg font-semibold">
              Email Verification Needed
            </h5>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-yellow-100 border border-yellow-400 rounded-md p-4">
              <div className="text-yellow-900">
                <h6 className="font-semibold mb-1">Email Not Verified</h6>
                <p className="mb-0">
                  We noticed that your email is not verified. Verifying your
                  email ensures better security and access to all features.
                </p>
              </div>
              <button
                className="mt-4 sm:mt-0 sm:ml-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition duration-200"
                onClick={() => navigate("/profile-setting")}
              >
                Verify Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 mb-6">
        {/* <h1 className="text-xl text-#f1b963 font-bold mb-4">Profile</h1> */}
        <h1 className="text-xl text-[#f1b963] font-bold mb-4">
          Welcome to PSU
        </h1>

        <hr className="my-4 border-gray-300" />

        <div className="flex flex-col md:flex-row items-stretch justify-between border-b pb-4 gap-4">
          {/* Left Section: User Greeting & Instructions */}
          <div className="md:w-1/2 p-4 bg-white shadow-lg rounded-lg border flex flex-col h-full">
            <div className="mb-4"></div>
            <div className="flex-1">
              <p className=" text-gray-700">
                Please carefully review the following instructions. Completing
                this test will require a minimum of one hour of your time. At
                Ollato, we prioritize your well-being as a fundamental
                component. Field experts have meticulously crafted our
                assessment test to offer you a precise evaluation of your
                strengths and weaknesses status. Upon finishing the test, you
                will receive a comprehensive 17-page report. Following this, you
                can schedule a session for expert guidance.
              </p>
            </div>
          </div>

          {/* Right Section: Expert Profile Card */}
          <div className="md:w-1/2 bg-white shadow-lg rounded-xl p-5 flex flex-col items-start space-y-5 border h-full">
            {/* Profile Image */}
            <UserCircle size={60} className="text-yellow-600" />

            {/* Expert Details */}
            <div className="flex-1">
              <h2 className="text-xl text-[#83580b] font-semibold">
                Dear {userName || "Student"},
              </h2>

              <p className="text-gray-600 text-sm mt-1">
                Completed Assessments
              </p>

              {/* Short Bio */}
              <p className="text-xs text-gray-600 mt-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed,
                laboriosam.
              </p>

              {/* Profile Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-3 px-4 py-1.5 text-sm bg-yellow-700 text-white rounded-md hover:bg-yellow-800 transition"
              >
                View Profile
              </button>
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-[999] p-4"
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md transition-all transform scale-100 opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center space-x-3 border-b pb-4">
                  <UserCircle size={50} className="text-yellow-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    {/* {user?.name || "Student"} */}
                    {userName || "Client name"},
                  </h2>
                </div>

                {/* User Details */}
                <div className="mt-4 text-sm text-gray-700 space-y-2">
                  <p>
                    <span className="font-semibold">User id:</span>{" "}
                    {user.userId || "Client"}
                  </p>
                  <p>
                    <span className="font-semibold">Role:</span>{" "}
                    {user?.role || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Gender:</span>{" "}
                    {user?.gender || "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold">Assessment Status:</span>
                    <span
                      className={`px-2 py-1 rounded-md text-white ${
                        assessmentStatus === "Done"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {assessmentStatus}
                    </span>
                  </p>
                </div>

                {/* Modal Buttons */}
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-100 transition"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => (window.location.href = "/profile-setting")}
                    className="px-4 py-2 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800 transition"
                  >
                    Go to Profile Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Process UI */}
      <div className="bg-white bg-opacity-60 backdrop-blur-xl border border-gray-300 shadow-xl rounded-lg p-6 space-y-6">
        <h1 className="text-xl text-[#f1b963] font-semibold ">Progress</h1>
        <hr className="my-4 border-gray-300" />

        <ProgressStep />
      </div>

      <div className="bg-white border border-gray-300 shadow-md rounded-lg mt-7 p-6 mb-9">
        {/* <div className="flex items-center justify-between border-b pb-3"> */}
        <h1 className="text-xl text-[#f1b963] font-semibold mb-4">Bar Graph</h1>
        <hr className="my-4 border-gray-300" />
        {/* </div> */}
        {/* <div className="mt-4"> */}
        <AssessmentGraph />
        {/* </div> */}
      </div>
    </div>
  );
}

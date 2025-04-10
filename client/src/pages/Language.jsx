// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Language = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState("");
//   const navigate = useNavigate();

//   const handleLanguageSelect = (language) => {
//     setSelectedLanguage(language);
//   };

//   const handleProceed = () => {
//     if (selectedLanguage === "english") {
//       navigate("/instructions");
//     }
//   };

//   return (
//     <div className="p-1">
//       {/* Package Section */}
//       <h1 className="text-2xl text-gray-400 font-bold mb-4">Language</h1>
//       <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6">
//         <h1 className="text-xl font-bold text-gray-800 mb-6">
//         Select Your Language
//         </h1>
//         <hr className="my-4 border-gray-300" />
//         <div className="flex flex-col items-center justify-center text-white p-4 overflow-hidden">
//           <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-8 text-center max-w-md w-full">
//             <h5 className="text-xl font-bold text-gray-800 mb-4">
//                Language Preference
//             </h5>

//             {/* Dropdown Menu */}
//             <div className="relative mb-4">
//               <select
//                 value={selectedLanguage}
//                 onChange={(e) => handleLanguageSelect(e.target.value)}
//                 className="w-3/4 p-2 text-lg border border-gray-300 rounded-lg bg-gray-100 text-gray-700 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
//               >
//                 <option value="">Choose Language</option>
//                 <option value="english">English</option>
//                 <option value="marathi">Marathi</option>
//               </select>
//             </div>

//             {/* Proceed Button */}
//             <button
//               onClick={handleProceed}
//               className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-all"
//               disabled={!selectedLanguage}
//             >
//               Proceed
//             </button>
//           </div>
//         </div>
//         {/* Information Box */}
//         <div className="bg-blue-100 border border-blue-300 text-center text-blue-700 p-4 rounded-lg mt-5 mb-6">
//           <p className="text-gray-700">
//             You can select only one language, and you'll receive the report in
//             the chosen language.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Language;





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightCircle, Globe, CheckCircle } from "lucide-react";
import axios from "axios";

const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [hasGivenAssessment, setHasGivenAssessment] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.userId : null;

  useEffect(() => {
    if (!userId) return;

    axios
      .post(`${apiUrl}/api/auth/get-status`, {
        panel_name: "pps",
        user_id: userId,
      })
      .then((response) => {
        setHasGivenAssessment(response.data.result.assessment_status === 1);
      })
      .catch((error) => {
        console.error("Error checking assessment status:", error);
      });
  }, [userId]);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleProceed = () => {
    if (hasGivenAssessment) {
      setIsPopupOpen(true);
    } else if (selectedLanguage) {
      navigate("/instructions", { state: { language: selectedLanguage } });
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="p-1">
      <h1 className="text-2xl text-gray-400 font-bold mb-4">Language</h1>

      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6">
        <h1 className="text-xl font-bold text-[#f1b963] mb-6">
          Select Your Language
        </h1>
        <hr className="my-4 border-gray-300" />

        <div className="p-4 flex flex-col items-center">
          <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-[#f1b963] mb-6 flex items-center gap-2">
              <Globe size={24} className="text-[#f1b963]" /> Select Your Language
            </h2>

            <div className="relative mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Choose Language
              </label>
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageSelect(e.target.value)}
                  className="w-full p-3 text-lg border border-gray-300 rounded-lg bg-gray-100 text-gray-700 shadow-sm hover:shadow-md focus:ring-2 focus:ring-yellow-500 transition-all"
                >
                  <option value="">Select Language</option>
                  <option value="english">English</option>
                  <option value="marathi">Marathi</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  {/* <Globe size={20} className="text-gray-500" /> */}
                </div>
              </div>
            </div>

            <button
              onClick={handleProceed}
              className={`mt-4 px-6 py-3 text-white font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 transition-all ${
                selectedLanguage
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!selectedLanguage}
            >
              Proceed <ArrowRightCircle size={20} />
            </button>
          </div>

          <div className="bg-blue-100 border border-blue-300 text-center text-blue-700 p-4 rounded-lg mt-5 max-w-md w-full">
            <p className="text-gray-700">
              You can select only one language, and you'll receive the report in
              the chosen language.
            </p>
          </div>
        </div>
      </div>

      {/* Popup if already given assessment */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Assessment Already Given</h2>
            <p className="mb-4">You have already completed the assessment.</p>
            <button
              onClick={closePopup}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Language;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Report = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const apiUrl3 = import.meta.env.VITE_APP_API_BASE_URL;
  const userId = userData?.userId || "";
  const role = "students";
  // const role = userData?.role || "";
  const apiUrl = `${apiUrl3}/api/scoring/get-user-score`;
  const [language, setLanguage] = useState("");
  const [tab, setTab] = useState("en");
  const [reportHistory, setReportHistory] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const navigate = useNavigate();

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);

    if (selectedLanguage === "en") {
      navigate("/english-report");
    } else if (selectedLanguage === "mr") {
      navigate("/marathi-report");
    } else {
      navigate(`/${selectedLanguage}Report`);
    }
  };

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.post(apiUrl, {
          user_id: userId,
          panel_name: "pps",
          role: role,
          lang: "en",
        });

        if (response.data && response.data.results) {
          const transformedData = response.data.results.map(
            (report, index) => ({
              id: index + 1,
              exam_date: report.exam_date,
            })
          );

          setReportHistory(transformedData);
          setFilteredReports(transformedData);
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
        setReportHistory([]);
      }
    };

    fetchReportData();
  }, [userId, role]);

  const renderTable = () => {
    if (!Array.isArray(filteredReports) || filteredReports.length === 0) {
      return (
        <p className="text-gray-500">No reports available for this language.</p>
      );
    }
    return (
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="w-full border-collapse overflow-hidden rounded-xl">
          <thead className="bg-gray-400 text-gray-700 text-sm uppercase">
            <tr>
              <th className="py-3 px-5">Sr. No.</th>
              <th className="py-3 px-5 ">Report</th>
              <th className="py-3 px-5 ">Exam Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {filteredReports.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="py-3 px-5 text-center">{index + 1}</td>
                <td className="py-3 px-5 text-center">
                  <a
                    href="/english-report"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    <i className="fas fa-file-alt mr-2"></i>
                    Report
                  </a>
                </td>
                <td className="py-3 px-5 text-center">
                  {item.exam_date
                    ? new Date(item.exam_date).toLocaleDateString("en-GB")
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-1">
      <h1 className="text-2xl text-gray-400 font-bold mb-4">Report</h1>
      {/* Profile Card */}
      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 mb-6">
        {/* <h1 className="text-xl text-#f1b963 font-bold mb-4">Profile</h1> */}
        <h1 className="text-xl text-[#f1b963] font-bold mb-4">
          Detailed Report
        </h1>

        <hr className="my-4 border-gray-300" />
        {/* <div className="container mx-auto p-6"> */}
        {/* <h2 className="text-2xl font-semibold mb-4">Report</h2> */}
        {/* <div className="bg-blue-100 text-yellow-800 p-3 rounded-md mb-4">
          <strong>Note:</strong> Please select a language to view your report
          and download it. 
        </div> */}
        <div className="bg-blue-100 text-yellow-800 p-3 rounded-md mb-4">
          <strong>Note:</strong> Please select a language to view and download
          your report. <br />
          If the report doesn't appear, please refresh the page and wait a
          moment for it to load.
        </div>

        <div className="bg-white border border-gray-200 p-4 shadow-md rounded-lg mb-4">
          <div className="flex justify-between items-center">
            {/* Title with Icon */}
            <h6 className="text-lg font-semibold text-gray-600 flex items-center space-x-2">
              <span>Select Language</span>
            </h6>

            {/* Styled Select Dropdown */}
            <div className="relative">
              <select
                className="border border-gray-300 bg-gray-50 rounded-md p-2 text-gray-700 hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="" disabled>
                  Choose Language
                </option>
                <option value="en">English</option>
                {/* <option value="mr">Marathi</option> */}
              </select>
            </div>
          </div>
        </div>

        {/* <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-300">
          <h6 className="text-xl  text-gray-800 mb-4">Report History</h6>

          <div className="border-b flex space-x-6 mb-4">
            <button
              className={`px-6 py-2 rounded-t-lg  transition ${
                tab === "en"
                  ? "bg-yellow-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setTab("en");
                setFilteredReports(reportHistory);
              }}
            >
              English
            </button>
            <button
              className={`px-6 py-2 rounded-t-lg  transition ${
                tab === "mr"
                  ? "bg-yellow-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setTab("mr");
                setFilteredReports([]);
              }}
            >
              मराठी
            </button>
          </div>

          <div>{renderTable()}</div>
        </div> */}
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-300">
          <h6 className="text-xl text-gray-800 mb-4">Report History</h6>

          {/* Language Tabs */}
          <div className="border-b flex flex-wrap gap-2 mb-4">
            <button
              className={`px-6 py-2 rounded-t-lg transition ${
                tab === "en"
                  ? "bg-yellow-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setTab("en");
                setFilteredReports(reportHistory);
              }}
            >
              English
            </button>
            <button
              className={`px-6 py-2 rounded-t-lg transition ${
                tab === "mr"
                  ? "bg-yellow-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setTab("mr");
                setFilteredReports([]);
              }}
            >
              मराठी
            </button>
          </div>

          {/* Responsive Table Container */}
          <div className="w-full overflow-x-auto">{renderTable()}</div>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
};

export default Report;

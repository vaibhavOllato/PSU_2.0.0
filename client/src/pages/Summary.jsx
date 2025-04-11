import React, { useState, useEffect } from "react";
// import "../styles/SummeryReport.css";
import { IoMdCheckmark } from "react-icons/io";
// import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAuth } from "../context/AuthContext";
import CompanyLogo from "../assets/companyLogo.png";

const Summary = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  //   const [downloadCount, setDownloadCount] = useState(0);
  const [domainDataB, setDomainDataB] = useState([]);
  const [packageInfo, setPackageInfo] = useState(null);
  const [userFetchData, setUserFetchData] = useState(null);

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = userData.userId;
  const userEmail = userData.email;
  const userRole = userData.role;

  const translations = {
    english: {
      header: "Domains",
      domains: [
        "Time Management",
        "Work-Life Balance",
        "Stress",
        "Anxiety",
        "Depression",
        "Coping Mechanisms",
        "Health Issues",
        "Financial Stress",
        "Gender Equality",
        // "Community Relations & Public Engagement",
        "Upskilling",
      ],
      statuses: {
        Excellent: "Excellent",
        Good: "Good",
        Concern: "Concern",
        Moderate: "Moderate",
        Serious: "Serious",
      },
    },
  };

  useEffect(() => {
    if (!userId || !userEmail) return; // Ensure user data exists

    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/payment/payment-info`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail, panel_name: "psu" }),
        });

        const data = await response.json();

        if (data.transactions && Array.isArray(data.transactions)) {
          // Filter successful transactions
          const successfulTransactions = data.transactions.filter(
            (txn) => txn.status === "Success"
          );

          if (successfulTransactions.length > 0) {
            // Get the most recent transaction
            const latestTransaction = successfulTransactions.reduce(
              (latest, txn) => {
                return new Date(txn.date) > new Date(latest.date)
                  ? txn
                  : latest;
              }
            );

            setPackageInfo(latestTransaction);
          }
        }
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    fetchPackageDetails();
  }, [userId, userEmail]); // Removed fetchData()

  const domainKeys = [
    "time_management",
    "work_life_balance",
    "stress",
    "anxiety",
    "depression",
    "coping_mechanisms",
    "health_issues",
    "financial_stress",
    "gender_equality",
    // "Community_Relations_Public_Engagement",
    "upskilling",
  ];

  const determineStatus = (score) => {
    if (score > 0 && score <= 20) return "Serious";
    if (score > 20 && score <= 40) return "Concern";
    if (score > 40 && score <= 60) return "Moderate";
    if (score > 60 && score <= 80) return "Good";
    if (score > 80 && score <= 100) return "Excellent";
    return "Unknown";
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`${apiUrl}/api/scoring/get-user-score`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            panel_name: "psu",
            // role: "middle",
            role: userRole,
            lang: "en",
          }),
        });

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          // Sort results by exam_date in descending order (latest first)
          const sortedResults = data.results.sort(
            (a, b) => new Date(b.exam_date) - new Date(a.exam_date)
          );

          const latestResult = sortedResults[0]; // Pick the latest result

          setUserFetchData(latestResult);

          const scores = {
            time_management: parseInt(latestResult.time_management),
            work_life_balance: parseInt(latestResult.work_life_balance),
            stress: parseInt(latestResult.stress),
            anxiety: parseInt(latestResult.anxiety),
            depression: parseInt(latestResult.depression),
            coping_mechanisms: parseInt(latestResult.coping_mechanisms),
            health_issues: parseInt(latestResult.health_issues),
            financial_stress: parseInt(latestResult.financial_stress),
            gender_equality: parseInt(latestResult.gender_equality),
            upskilling: latestResult.upskilling
              ? parseInt(latestResult.upskilling)
              : null,
          };

          const selectedTranslations = translations.english;

          const domainStatusData = domainKeys.map((domainKey) => {
            const score = scores[domainKey] || 0; // Default to 0 if null
            const status = determineStatus(score);
            return {
              domain:
                selectedTranslations.domains[domainKeys.indexOf(domainKey)],
              score,
              status: selectedTranslations.statuses[status] || "Unknown",
            };
          });

          setDomainDataB(domainStatusData);
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchData();
  }, [userId, userEmail]);

  useEffect(() => {
    // console.log("Updated Domain Data:", domainDataB);
  }, [domainDataB]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Excellent":
        return { backgroundColor: "#1B5E20", color: "white" }; // Deep Green (Darker than before)
      case "Good":
        return { backgroundColor: "#43A047", color: "white" }; // Medium Green (More contrast)
      case "Moderate":
        return { backgroundColor: "#FBC02D", color: "black" }; // Golden Yellow
      case "Concern":
        return { backgroundColor: "#FB8C00", color: "black" }; // Deep Orange
      case "Serious":
        return { backgroundColor: "#C62828", color: "white" }; // Darker Red for severity
      case "Unknown":
        return { backgroundColor: "#757575", color: "white" }; // Neutral Grey
      default:
        return { backgroundColor: "#BDBDBD", color: "black" }; // Light Grey as fallback
    }
  };

  //   const downloadReport = () => {
  //     if (downloadCount >= 3) {
  //       alert("You have reached the maximum download limit (3 times).");
  //       return;
  //     }
  //     const reportElement = document.getElementById("reportTable");
  //     if (!reportElement) {
  //       console.error("reportTable not found in DOM");
  //       return;
  //     }

  //     html2canvas(reportElement, { scale: 2 }).then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF("l", "mm", "a4");
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //       pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight - 20);
  //       pdf.save("Summary_Report.pdf");

  //       setDownloadCount(downloadCount + 1);
  //     });
  //   };

  return (
    <div className="px-4">
      <div className="w-full mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-400">
          Summary Report
        </h2>

        {/* Client Details Accordion */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div
            className="flex items-center justify-between px-4 py-3 border-b cursor-pointer"
            onClick={toggleAccordion}
          >
            <h6 className="text-blue-600 font-semibold">Client Details</h6>
            <span>
              {isOpen ? (
                <i className="fas fa-chevron-up" />
              ) : (
                <i className="fas fa-chevron-down" />
              )}
            </span>
          </div>
          {isOpen && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <div className="bg-blue-100 border-l-4 border-blue-500 rounded-lg shadow p-4">
                <h5 className="text-blue-700 font-bold mb-2">Client Details</h5>
                <ul className="space-y-2">
                  <li>
                    <strong>Client ID:</strong> {user?.userId || "0000"}
                  </li>
                  <li>
                    <strong>Client Name:</strong>{" "}
                    <span className="capitalize">
                      {user ? `${user.first_name} ${user.last_name}` : "XYZ"}
                    </span>
                  </li>
                  <li>
                    <strong>Client Role:</strong> {user?.role || "XYZ"}
                  </li>
                </ul>
              </div>

              <div className="bg-blue-100 border-l-4 border-blue-500 rounded-lg shadow p-4">
                <h5 className="text-blue-700 font-bold mb-2">
                  Package Details
                </h5>
                {packageInfo ? (
                  <ul className="space-y-2">
                    <li>
                      <strong>Package ID:</strong> {packageInfo.txnid || "N/A"}
                    </li>
                    <li>
                      <strong>Package Name:</strong>{" "}
                      {packageInfo.productInfo || "N/A"}
                    </li>
                    <li>
                      <strong>Package Price:</strong>{" "}
                      {packageInfo.amount ? `₹${packageInfo.amount}` : "N/A"}
                    </li>
                  </ul>
                ) : (
                  <p>You don’t have a package...</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Summary Detail */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="flex items-center px-4 py-3 border-b gap-2">
            <h6 className="text-blue-600 font-semibold">Summary Detail</h6>
            {/* Uncomment this if needed
          <button
            onClick={downloadReport}
            className="ml-auto bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50"
            disabled={downloadCount >= 3}
          >
            {downloadCount >= 3
              ? "Download Limit Reached"
              : "Download Summary Report"}
          </button>
          */}
          </div>

          <div className="p-4" id="reportTable">
            {/* Company Logo + Report Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
              <div className="md:col-span-2 flex justify-center">
                <img
                  src={CompanyLogo}
                  alt="logo"
                  width="150"
                  height="100"
                  className="object-contain"
                />
              </div>

              <div className="md:col-span-10 text-center">
                <h5 className="text-blue-700 font-bold uppercase">
                  Ollato Mind Mapping Summary Report
                </h5>
                <hr className="my-4 border-black border-t-2" />
                {/* <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <th className="text-left text-blue-700 pr-2">
                          Client Name:
                        </th>
                        <td className="capitalize pr-4">
                          {user
                            ? `${user.first_name} ${user.last_name}`
                            : "XYZ"}
                        </td>
                        <th className="text-left text-blue-700 pr-2">
                          Client Role:
                        </th>
                        <td className="pr-4">{user?.role || "N/A"}</td>
                        <th className="text-left text-blue-700 pr-2">
                          Exam Date:
                        </th>
                        <td>
                          {userFetchData?.exam_date
                            ? new Date(
                                userFetchData.exam_date
                              ).toLocaleDateString("en-GB")
                            : "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}

                <div className="w-full">
                  {/* Mobile View: Vertical format */}
                  <div className="block sm:hidden space-y-4 border rounded-md p-4 bg-white text-sm">
                    <div className="flex justify-between">
                      <span className="font-semibold text-blue-700">
                        Client Name:
                      </span>
                      <span className="capitalize">
                        {user ? `${user.first_name} ${user.last_name}` : "XYZ"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-blue-700">
                        Client Role:
                      </span>
                      <span>{user?.role || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-blue-700">
                        Exam Date:
                      </span>
                      <span>
                        {userFetchData?.exam_date
                          ? new Date(
                              userFetchData.exam_date
                            ).toLocaleDateString("en-GB")
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Desktop View: Table format */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="min-w-full text-sm border border-gray-300 rounded-md">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <th className="text-left text-blue-700 px-4 py-2 border-r w-32">
                            Client Name:
                          </th>
                          <td className="capitalize px-4 py-2 border-r">
                            {user
                              ? `${user.first_name} ${user.last_name}`
                              : "XYZ"}
                          </td>
                          <th className="text-left text-blue-700 px-4 py-2 border-r w-32">
                            Client Role:
                          </th>
                          <td className="px-4 py-2 border-r">
                            {user?.role || "N/A"}
                          </td>
                          <th className="text-left text-blue-700 px-4 py-2 border-r w-32">
                            Exam Date:
                          </th>
                          <td className="px-4 py-2">
                            {userFetchData?.exam_date
                              ? new Date(
                                  userFetchData.exam_date
                                ).toLocaleDateString("en-GB")
                              : "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Score Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-blue-200 text-blue-700 text-sm">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border px-4 py-2">Domain</th>
                    <th className="border px-4 py-2">Score</th>
                    <th className="border px-4 py-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {domainDataB.map((data, index) => (
                    <tr key={index} className="border">
                      <td className="border px-4 py-2 text-center">
                        {data.domain}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {data.score}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {data.status !== "Unknown" ? (
                          // <span
                          //   className={`inline-flex items-center gap-1 px-2 py-1 rounded text-white text-xs font-semibold ${
                          //     data.status === "Excellent"
                          //       ? "bg-green-500"
                          //       : data.status === "Average"
                          //       ? "bg-yellow-500"
                          //       : "bg-red-500"
                          //   }`}
                          // >
                          //   <IoMdCheckmark size={16} />
                          //   {data.status}
                          // </span>
                          <span
                            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold"
                            style={getStatusStyles(data.status)}
                          >
                            <IoMdCheckmark size={16} />
                            {data.status}
                          </span>
                        ) : (
                          "Unknown"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="mt-6 border-t pt-4 text-sm text-center text-gray-600">
              <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                <span>www.ollato.com</span>
                <span>info@ollato.com</span>
                <span>Ollato Eduversity Pvt. Ltd.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;

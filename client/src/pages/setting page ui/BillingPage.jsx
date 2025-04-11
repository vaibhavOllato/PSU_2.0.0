import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import companyLogo from "../../assets/companyLogo.png";

const BillingPage = () => {
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const [billingInfo, setBillingInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const { name, email, phone, gender } = user || {};

  useEffect(() => {
    const fetchBillingDetails = async () => {
      if (!email) {
        setError("No email found. Please log in.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.post(`${apiUrl}/api/payment/payment-info`, {
          email,
          panel_name: "psu",
        });
        setBillingInfo(response.data.transactions || []);
        setError(null);
      } catch {
        setError("Failed to load transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBillingDetails();
  }, [email]);

  const generatePDF = (bill) => {
    const doc = new jsPDF({ unit: "mm", format: "a5" });
    doc.addImage(companyLogo, "PNG", 10, 10, 20, 20);
    doc.setFontSize(18);
    doc.text("Invoice", 80, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text("Ollato Eduversity Pvt. Ltd.", 14, 40);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 120, 40, { align: "right" });
    doc.setFillColor(230, 230, 250);
    doc.rect(10, 45, 130, 30, "F");
    doc.text(`Name: ${name || "N/A"}`, 14, 55);
    doc.text(`Email: ${email || "N/A"}`, 14, 60);
    doc.text(`Phone: ${phone || "N/A"}`, 14, 65);
    doc.text(`Gender: ${gender || "N/A"}`, 14, 70);
    autoTable(doc, {
      startY: 90,
      body: [
        ["Package", bill.productInfo],
        ["Transaction ID", bill.txnid],
        ["Date", new Date(bill.date).toLocaleString()],
        ["Price", `$${bill.amount}`],
        ["Status", bill.status],
      ],
      theme: "grid",
    });
    doc.save(`Invoice_${bill.txnid}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-4 pb-4 border-b">
        <img src={companyLogo} className="w-12 h-18 border border-danger rounded-full shadow" alt="Company Logo" />
        <div>
          <h2 className="text-xl font-bold text-secondary">Billing & Transactions</h2>
          <p className="text-gray-500 text-sm">Your payment history at a glance.</p>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center mt-4 text-red-500">{error}</div>
      ) : billingInfo.length > 0 ? (
        <div className="mt-4 space-y-4">
          {billingInfo.map((bill, index) => (
            <div key={bill.id || index} className="p-4 bg-gray-50 shadow rounded-lg">
              <h5 className="text-lg font-semibold text-blue-600">{bill.productInfo}</h5>
              <hr className="my-2" />
              <p><strong>Transaction ID:</strong> {bill.txnid}</p>
              <p><strong>Date & Time:</strong> {new Date(bill.date).toLocaleString()}</p>
              <p><strong>Price:</strong> <span className="font-bold">${bill.amount}</span></p>
              <p>
                <strong>Status:</strong>
                <span className={`ml-2 px-2 py-1 rounded text-white ${bill.status.toLowerCase() === "success" ? "bg-green-500" : "bg-yellow-500"}`}>
                  {bill.status}
                </span>
              </p>
              <button
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => generatePDF(bill)}
              >
                📄 Download Invoice
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-4">
          <p className="text-gray-600">No transactions found.</p>
          <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => window.location.href = "/pricing"}>
            🛒 Buy a Plan
          </button>
        </div>
      )}
    </div>
  );
};

export default BillingPage;
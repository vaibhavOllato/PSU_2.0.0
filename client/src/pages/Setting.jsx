import React, { useState } from "react";
import InfoComponent from "./setting page ui/InfoComponent";
import ChangePassword from "./setting page ui/ChangePassword";
import VerifyEmail from "./setting page ui/VerifyEmail";
import BillingPage from "./setting page ui/BillingPage";
import SupportPage from "./setting page ui/SupportPage";

const TABS = [
  { id: "info", label: "User Info", component: <InfoComponent /> },
  { id: "change-password", label: "Change Password", component: <ChangePassword /> },
  { id: "verify-email", label: "Verify Email", component: <VerifyEmail /> },
  { id: "billing", label: "Billing", component: <BillingPage /> },
  { id: "support", label: "Support", component: <SupportPage /> },
];

const Setting = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="p-2">
      <h1 className="text-2xl text-gray-400 font-bold mb-4">Settings</h1>

      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-xl text-secondary font-bold mb-4">Profile Setting</h1>
        <hr className="my-4 border-gray-300" />

        {/* Mobile View: Dropdown */}
        <div className="md:hidden">
          <button
            className="w-full bg-gray-100 text-gray-600 px-4 py-2 rounded-md text-left flex justify-between items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {TABS.find((tab) => tab.id === activeTab)?.label}
            <span>{dropdownOpen ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen && (
            <ul className="bg-white border rounded-md mt-2 shadow-lg">
              {TABS.map((tab) => (
                <li
                  key={tab.id}
                  className={`px-4 py-2 cursor-pointer ${
                    activeTab === tab.id ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setDropdownOpen(false);
                  }}
                >
                  {tab.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tablet & Desktop View: Tab Buttons */}
        <div className="hidden md:flex border-b">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 border p-4 rounded-md bg-gray-50">
          {TABS.find((tab) => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
};

export default Setting;

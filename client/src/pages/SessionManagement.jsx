import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const TABS = ["Booked", "Ongoing", "Rescheduled", "Completed", "Cancelled"];

const sessionMessages = {
  Booked: "Upcoming confirmed sessions. You can cancel or reschedule them.",
  Ongoing: "Sessions currently in progress.",
  Rescheduled: "Sessions with updated schedules.",
  Completed: "Finished sessions. View details but no changes allowed.",
  Cancelled: "Sessions that have been cancelled.",
};

const SessionManagement = () => {
  const [sessions, setSessions] = useState([]);
  const [activeTab, setActiveTab] = useState("Booked");
  const [notifications, setNotifications] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const mockSessions = [
      { id: 1, title: "Session A", status: "Booked", date: "2024-12-28", time: "11:00 AM" },
      { id: 2, title: "Session B", status: "Ongoing", date: "2024-12-28", time: "11:05 PM" },
      { id: 3, title: "Session C", status: "Rescheduled", date: "2024-12-02", time: "11:00 AM" },
      { id: 4, title: "Session D", status: "Completed", date: "2024-12-04", time: "02:00 PM" },
      { id: 5, title: "Session E", status: "Cancelled", date: "2024-12-05", time: "03:00 PM" },
    ];

    setSessions(mockSessions);
    const counts = mockSessions.reduce((acc, session) => {
      acc[session.status] = (acc[session.status] || 0) + 1;
      return acc;
    }, {});
    setNotifications(counts);
  }, []);

  return (
    <div className="p-1">
      <h1 className="text-2xl text-gray-400 font-bold mb-4">Session Management</h1>

      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 mb-6">
        {/* Tabs for Desktop */}
        <div className="hidden md:flex justify-center gap-3 my-4 border-b pb-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === tab
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab} ({notifications[tab] || 0})
            </button>
          ))}
        </div>

        {/* Dropdown for Mobile & Tablet */}
        <div className="relative md:hidden">
          <button
            className="w-full flex justify-between items-center px-4 py-2 bg-yellow-600 text-white rounded-md"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {activeTab} ({notifications[activeTab] || 0})
            <ChevronDown className="w-5 h-5" />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 w-full bg-white shadow-md rounded-md mt-1 z-10">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    setActiveTab(tab);
                    setDropdownOpen(false);
                  }}
                >
                  {tab} ({notifications[tab] || 0})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Session Message */}
        <p className="text-center text-gray-600 mb-4 mt-5 bg-blue-100 p-2 rounded-md">
          {sessionMessages[activeTab]}
        </p>

        {/* Desktop: Table Format */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">ID</th>
                <th className="border p-2 text-left">Session Title</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Date</th>
                <th className="border p-2 text-left">Time</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions
                .filter((s) => s.status === activeTab)
                .map((session) => (
                  <tr key={session.id} className="border">
                    <td className="border p-2">{session.id}</td>
                    <td className="border p-2">{session.title}</td>
                    <td className="border p-2 text-yellow-600 font-semibold">
                      {session.status}
                    </td>
                    <td className="border p-2">{session.date}</td>
                    <td className="border p-2">{session.time}</td>
                    <td className="border p-2 flex gap-2">
                      <button className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm">
                        View
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm">
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet: Cards Format */}
        <div className="md:hidden">
          {sessions
            .filter((s) => s.status === activeTab)
            .map((session) => (
              <div key={session.id} className="bg-gray-100 shadow-md rounded-lg p-4 mb-3">
                <h2 className="text-lg font-semibold">{session.title}</h2>
                <p className="text-sm text-gray-600">ID: {session.id}</p>
                <p className="text-sm text-yellow-600 font-semibold">{session.status}</p>
                <p className="text-sm text-gray-600">
                  Date: <span className="font-medium">{session.date}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Time: <span className="font-medium">{session.time}</span>
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm w-full">
                    View
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm w-full">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SessionManagement;

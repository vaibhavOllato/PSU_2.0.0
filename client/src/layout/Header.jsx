// import { Bell, User } from "lucide-react";

// export default function Header({ isOpen }) {
//   return (
//     <header
//       className={`bg-gray-900 text-white p-4 fixed top-0 right-0 h-16 flex justify-between items-center transition-all duration-300 shadow-md ${
//         isOpen ? "w-[calc(100%-16rem)]" : "w-[calc(100%-4rem)]"
//       }`}
//     >
//       {/* Left Side: Title */}
//       <h1 className="text-lg font-semibold">Ollato Mind Mapping Program</h1>

//       {/* Right Side: User Info & Notification */}
//       <div className="flex items-center space-x-6">
//         {/* Notification Icon */}
//         <button className="relative">
//           <Bell size={24} className="text-gray-300 hover:text-white transition" />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">3</span>
//         </button>

//         {/* User Profile - Hide username when sidebar is collapsed */}
//         <div className="flex items-center space-x-2">
//           <User size={24} className="text-gray-300" />
//           {isOpen && <span className="text-sm font-medium">John Doe</span>}
//         </div>
//       </div>
//     </header>
//   );
// }

// import { useState, useEffect } from "react";
// import {
//   Bell,
//   User,
//   ChevronDown,
//   FileText,
//   BarChart,
//   Settings,
//   LogOut,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import LogoutModal from "../components/LogoutModal";

// export default function Header({ isOpen }) {
//   const [userName, setUserName] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [logoutOpen, setLogoutOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("user"));
//     if (userData?.first_name && userData?.last_name) {
//       setUserName(`${userData.first_name} ${userData.last_name}`);
//     } else if (userData?.first_name) {
//       setUserName(userData.first_name);
//     }
//   }, []);

//   return (
//     <header
//       className={`bg-gray-900 text-white p-4 fixed top-0 right-0 h-16 flex justify-between items-center transition-all duration-300 shadow-md ${
//         isOpen ? "w-[calc(100%-16rem)]" : "w-[calc(100%-4rem)]"
//       }`}
//     >
//       <h1 className="text-lg font-semibold">Ollato Mind Mapping Program</h1>

//       <div className="flex items-center space-x-6">
//         <button className="relative">
//           <Bell
//             size={24}
//             className="text-gray-300 hover:text-white transition"
//           />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
//             3
//           </span>
//         </button>

//         {/* User Profile & Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="flex items-center space-x-2"
//           >
//             <User size={24} className="text-gray-300" />
//             {isOpen && (
//               <span className="text-sm font-medium">{userName || "User"}</span>
//             )}
//             <ChevronDown size={18} className="text-gray-400" />
//           </button>

//           {/* Dropdown Menu */}
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md">
//               <ul className="py-2">
//                 <li>
//                   <button
//                     onClick={() => navigate("/profile-setting")}
//                     className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
//                   >
//                     <Settings size={18} className="mr-2" /> Profile
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => navigate("/summary")}
//                     className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
//                   >
//                     <BarChart size={18} className="mr-2" /> Summary
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => navigate("/report")}
//                     className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
//                   >
//                     <FileText size={18} className="mr-2" /> Report
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => setLogoutOpen(true)} // Open Logout Modal
//                     className="flex items-center px-4 py-2 w-full text-red-600 hover:bg-gray-100"
//                   >
//                     <LogOut size={18} className="mr-2" /> Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Logout Modal */}
//       <LogoutModal open={logoutOpen} handleClose={() => setLogoutOpen(false)} />
//     </header>
//   );
// }

import { useState, useEffect } from "react";
import {
  Bell,
  User,
  ChevronDown,
  Settings,
  LogOut,
  Menu,
  FileText,
  CalendarCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../components/LogoutModal";
import companyLogo from "../assets/companyLogo2.png";
import NotificationDropdown from "../components/NotificationDropdown";

export default function Header({ toggleMobileSidebar }) {
  const [userName, setUserName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.first_name && userData?.last_name) {
      setUserName(`${userData.first_name} ${userData.last_name}`);
    }
  }, []);

  return (
    <header className="bg-primary text-white p-4 fixed top-0 left-0 right-0 h-16 flex items-center justify-between shadow-md z-50">
      <div className="flex items-center space-x-3">
        {/* <button
          className="block md:hidden p-2 text-white"
          onClick={toggleMobileSidebar}
        >
          <Menu size={24} />
        </button> */}

        <button
          className="block md:hidden p-2 text-white hover:bg-gray-700 rounded transition duration-300"
          onClick={toggleMobileSidebar}
        >
          <Menu size={24} />
        </button>

        {/* Logo (Hidden on Mobile & Tablet) */}
        <div className="hidden md:flex items-center">
          <img src={companyLogo} alt="Company Logo" className="h-11 ml-10" />
          <h1 className="text-lg font-semibold ml-36 whitespace-nowrap">
            Ollato's Mind Mapping Programme
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <button
            className="relative z-50"
            onClick={() => setShowNotifications((prev) => !prev)}
          >
            <Bell
              size={24}
              className="text-gray-300 hover:text-white transition"
            />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              0
            </span>
          </button>

          {showNotifications && (
            <NotificationDropdown onClose={() => setShowNotifications(false)} />
          )}
        </div>

        {/* User Profile & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2"
          >
            <span className="text-sm font-medium hidden md:inline">
              {userName || "Student"}
            </span>
            <User size={24} className="text-gray-300" />
            <ChevronDown size={18} className="text-gray-400" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md">
              <ul className="py-2">
                <li>
                  <button
                    onClick={() => navigate("/profile-setting")}
                    className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
                  >
                    <Settings size={18} className="mr-2" /> Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/report")}
                    className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
                  >
                    <FileText size={18} className="mr-2" /> Report
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/book-session")}
                    className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
                  >
                    <CalendarCheck size={18} className="mr-2" /> Session
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setLogoutOpen(true)}
                    className="flex items-center px-4 py-2 w-full text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={18} className="mr-2" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal open={logoutOpen} handleClose={() => setLogoutOpen(false)} />
    </header>
  );
}

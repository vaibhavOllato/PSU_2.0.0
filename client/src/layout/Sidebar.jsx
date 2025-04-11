// import { Link, useLocation } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Home,
//   Package,
//   FileText,
//   BarChart,
//   ClipboardList,
//   CalendarCheck,
//   Settings,
// } from "lucide-react";
// import { useState } from "react";

// export default function Sidebar({ isOpen, toggleSidebar }) {
//   const location = useLocation();

//   // Sidebar items
//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard", icon: <Home size={24} /> },
//     { name: "Package", path: "/package", icon: <Package size={24} /> },
//     { name: "Assessment", path: "/assessment", icon: <FileText size={24} /> },
//     { name: "Summary", path: "/summary", icon: <BarChart size={24} /> },
//     { name: "Report", path: "/report", icon: <ClipboardList size={24} /> },
//     { name: "Book Session", path: "/book-session", icon: <CalendarCheck size={24} /> },
//     { name: "Session Management", path: "/session-management", icon: <CalendarCheck size={24} /> },
//     { name: "Profile Setting", path: "/profile-setting", icon: <Settings size={24} /> },
//   ];

//   return (
//     <div
//       className={`bg-gray-800 text-white h-screen fixed left-0 top-0 transition-all duration-300 shadow-lg ${
//         isOpen ? "w-64" : "w-16"
//       } flex flex-col`}
//     >
//       {/* Sidebar Toggle Button */}
//       <button
//         onClick={toggleSidebar}
//         className="text-white p-4 rounded-md hover:bg-gray-700 flex items-center justify-center transition duration-300"
//       >
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* Sidebar Menu */}
//       <ul className="flex-1 mt-4 space-y-2">
//         {menuItems.map((item) => (
//           <li key={item.name} className="relative group">
//             <Link
//               to={item.path}
//               className={`flex items-center p-3 rounded-md transition-all duration-200 w-full mx-2
//                 ${
//                   location.pathname === item.path
//                     ? "bg-gray-700 text-yellow-400 border-l-4 border-yellow-400"
//                     : "hover:bg-gray-700 hover:ml-2"
//                 }`}
//             >
//               {item.icon}
//               {isOpen && <span className="ml-3">{item.name}</span>}
//             </Link>

//             {/* Tooltip on hover when collapsed */}
//             {!isOpen && (
//               <div className="absolute left-full top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
//                 {item.name}
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// import { Link, useLocation } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Home,
//   Package,
//   FileText,
//   BarChart,
//   ClipboardList,
//   CalendarCheck,
//   Settings,
//   LogOut,
// } from "lucide-react";
// import { useState } from "react";
// import LogoutModal from "../components/LogoutModal";

// export default function Sidebar({ isOpen, toggleSidebar, handleLogout }) {
//   const location = useLocation();
//   // const [isLogoutOpen, setIsLogoutOpen] = useState(false);

//   // Sidebar items
//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard", icon: <Home size={24} /> },
//     { name: "Package", path: "/package", icon: <Package size={24} /> },
//     { name: "Assessment", path: "/assessment", icon: <FileText size={24} /> },
//     { name: "Summary", path: "/summary", icon: <BarChart size={24} /> },
//     { name: "Report", path: "/report", icon: <ClipboardList size={24} /> },
//     { name: "Book Session", path: "/book-session", icon: <CalendarCheck size={24} /> },
//     { name: "Session Management", path: "/session-management", icon: <CalendarCheck size={24} /> },
//     { name: "Profile Setting", path: "/profile-setting", icon: <Settings size={24} /> },
//   ];

//   return (
//     <div
//       className={`bg-gray-800 text-white h-screen fixed left-0 top-0 transition-all duration-300 shadow-lg flex flex-col ${
//         isOpen ? "w-64" : "w-16"
//       }`}
//     >
//       {/* Sidebar Toggle Button */}
//       <button
//         onClick={toggleSidebar}
//         className="text-white p-4 rounded-md hover:bg-gray-700 flex items-center justify-center transition duration-300"
//       >
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* Sidebar Menu */}
//       <ul className="flex-1 mt-4 space-y-2">
//         {menuItems.map((item) => (
//           <li key={item.name} className="relative group">
//             <Link
//               to={item.path}
//               className={`flex items-center p-3 rounded-md transition-all duration-200 w-full mx-2
//                 ${
//                   location.pathname === item.path
//                     ? "bg-gray-700 text-yellow-400 border-l-4 border-yellow-400"
//                     : "hover:bg-gray-700 hover:ml-2"
//                 }`}
//             >
//               {item.icon}
//               {isOpen && <span className="ml-3">{item.name}</span>}
//             </Link>

//             {/* Tooltip on hover when collapsed */}
//             {!isOpen && (
//               <div className="absolute left-full top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
//                 {item.name}
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>

//       {/* Logout Button */}
//       <button
//         onClick={handleLogout}
//         className="bg-red-600 hover:bg-red-700 text-white mx-2 my-4 p-3 rounded-md flex items-center justify-center transition-all duration-300"
//       >
//         <LogoutModal size={24} />
//         {isOpen && <span className="ml-3">Logout</span>}
//       </button>
//     </div>
//   );
// }

// import { Link, useLocation } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Home,
//   Package,
//   FileText,
//   BarChart,
//   ClipboardList,
//   CalendarCheck,
//   Settings,
//   LogOut,
// } from "lucide-react";
// import { useState } from "react";
// import LogoutModal from "../components/LogoutModal";

// export default function Sidebar({ isOpen, toggleSidebar }) {
//   const location = useLocation();
//   const [isLogoutOpen, setIsLogoutOpen] = useState(false);

//   // Sidebar items
//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard", icon: <Home size={24} /> },
//     { name: "Package", path: "/package", icon: <Package size={24} /> },
//     { name: "Assessment", path: "/language", icon: <FileText size={24} /> },
//     { name: "Summary", path: "/summary", icon: <BarChart size={24} /> },
//     { name: "Report", path: "/report", icon: <ClipboardList size={24} /> },
//     { name: "Book Session", path: "/book-session", icon: <CalendarCheck size={24} /> },
//     { name: "Session Management", path: "/session-management", icon: <CalendarCheck size={24} /> },
//     { name: "Profile Setting", path: "/profile-setting", icon: <Settings size={24} /> },
//   ];

//   return (
//     <>
//       <div
//         className={`bg-gray-800 text-white h-screen fixed left-0 top-0 transition-all duration-300 shadow-lg flex flex-col ${
//           isOpen ? "w-64" : "w-16"
//         }`}
//       >
//         {/* Sidebar Toggle Button */}
//         <button
//           onClick={toggleSidebar}
//           className="text-white p-4 rounded-md hover:bg-gray-700 flex items-center justify-center transition duration-300"
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>

//         {/* Sidebar Menu */}
//         <ul className="flex-1 mt-4 space-y-2">
//           {menuItems.map((item) => (
//             <li key={item.name} className="relative group">
//               <Link
//                 to={item.path}
//                 className={`flex items-center p-3 rounded-md transition-all duration-200 w-full mx-2
//                   ${
//                     location.pathname === item.path
//                       ? "bg-gray-700 text-yellow-400 border-l-4 border-yellow-400"
//                       : "hover:bg-gray-700 hover:ml-2"
//                   }`}
//               >
//                 {item.icon}
//                 {isOpen && <span className="ml-3">{item.name}</span>}
//               </Link>

//               {/* Tooltip on hover when collapsed */}
//               {!isOpen && (
//                 <div className="absolute left-full top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
//                   {item.name}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>

//         {/* Logout Button with Modal */}
//         <button
//           onClick={() => setIsLogoutOpen(true)}
//           className="flex items-center justify-center mx-2 my-4 p-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-all duration-300 w-full"
//         >
//           <LogOut size={24} />
//           {isOpen && <span className="ml-3">Logout</span>}
//         </button>
//       </div>

//       {/* Logout Modal */}
//       <LogoutModal open={isLogoutOpen} handleClose={() => setIsLogoutOpen(false)} />
//     </>
//   );
// }

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  FileText,
  BarChart,
  ClipboardList,
  CalendarCheck,
  Settings,
  LogOut,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import LogoutModal from "../components/LogoutModal";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function Sidebar({ isOpen, toggleSidebar, isMobile }) {
  const location = useLocation();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Package", path: "/package", icon: Package },
    { name: "Assessment", path: "/language", icon: FileText },
    { name: "Summary", path: "/summary", icon: BarChart },
    { name: "Report", path: "/report", icon: ClipboardList },
    { name: "Book Session", path: "/book-session", icon: Clock },
    {
      name: "Session Management",
      path: "/session-management",
      icon: CalendarCheck,
    },
    { name: "Profile Setting", path: "/profile-setting", icon: Settings },
  ];

  const handleMenuItemClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <>
      <div
        className={`bg-primary text-white fixed top-0 left-0 h-full transition-all duration-300 shadow-lg z-50
        ${isMobile ? "w-64" : isOpen ? "w-64" : "w-16"}
        ${isMobile && !isOpen ? "hidden" : ""}
      `}
      >
        {/* Top Header with Chevron Icon */}
        <div className="p-4 mt-14 flex justify-between items-center">
          {isOpen && (
            <span className="text-lg font-semibold hidden md:block">
              Welcome to PSU-2
            </span>
          )}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-white p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-300 shadow-lg border border-textSecondary"
            >
              {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          )}
        </div>
        <hr />
        {/* Menu Items */}
        <ul className="mt-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.name} className="mb-1 relative group">
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-md transition-all duration-300 
                  ${
                    isActive
                      ? "bg-gray-700 text-white border-l-4 border-blue-400"
                      : "hover:bg-gray-700 hover:ml-2"
                  }`}
                  data-tooltip-id={!isOpen ? `tooltip-${item.name}` : undefined}
                  onClick={handleMenuItemClick}
                >
                  <Icon size={24} />
                  {isOpen && <span className="ml-3">{item.name}</span>}
                </Link>
                {!isOpen && (
                  <Tooltip
                    id={`tooltip-${item.name}`}
                    place="right"
                    effect="solid"
                  >
                    {item.name}
                  </Tooltip>
                )}
              </li>
            );
          })}
        </ul>

        <hr className="my-4 border-gray-600" />

        {/* Logout Button */}
        <button
          onClick={() => setIsLogoutOpen(true)}
          className="flex items-center justify-center my-4 p-2 bg-textSecondary hover:bg-yellow-900 text-white rounded-md transition-all duration-300 mx-auto"
        >
          <LogOut size={24} />
          {isOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        open={isLogoutOpen}
        handleClose={() => setIsLogoutOpen(false)}
      />
    </>
  );
}

// import { useState } from "react";
// import Sidebar from "../pages/Sidebar";
// import Header from "./Header";
// import MainContent from "../components/MianContent";

// export default function Layout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <div className="flex h-screen">
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <MainContent />
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import Sidebar from "../pages/Sidebar";
// import Header from "./Header";
// import MainContent from "../components/MianContent";

// export default function Layout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <div className="flex h-screen">
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <MainContent />
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../pages/Sidebar";
// import Header from "../components/Header";

// export default function Layout() {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

//       {/* Main Content Area */}
//       <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"}`}>
//         {/* Fixed Header */}
//         <Header />

//         {/* Page Content */}
//         <main className="p-4 mt-16 overflow-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true); // Sidebar state

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"}`}>
        {/* Header */}
        <Header isOpen={isOpen} />

        {/* Main Content (pages will be rendered here) */}
        <main className="p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

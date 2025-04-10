// import React, { useState, useEffect } from "react";
// import packageData from "../data/packages.json";

// const Package = () => {
//   const [packages, setPackages] = useState([]);

//   useEffect(() => {
//     setPackages(packageData);
//   }, []);

//   return (
//     <div className="p-1">
//       <h1 className="text-2xl text-gray-400 font-bold mb-4">Package</h1>
//     <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 container mx-auto my-10">
//       <h1 className="text-xl font-bold  text-gray-800 mb-6">
//         Choose Your Package
//       </h1>
//       <hr className="my-4 border-gray-300" />

//       {/* Responsive Grid Layout */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {packages.map((pkg, index) => (
//           <div
//             key={pkg.id}
//             className={`p-5 rounded-lg shadow-md flex flex-col items-center text-center space-y-4 border transition-all 
//               ${index === 1 ? "bg-blue-100 border-blue-500 hover:shadow-xl" : "bg-gray-100 border-gray-200 hover:shadow-lg"}
//             `}
//           >
//             {/* Package Icon */}
//             <div className={`w-14 h-14 flex items-center justify-center rounded-full shadow-md text-2xl 
//               ${index === 1 ? "bg-blue-500 text-white" : "bg-white"}
//             `}>
//               🎁
//             </div>

//             {/* Package Title */}
//             <h2 className={`text-lg font-semibold ${index === 1 ? "text-blue-600" : "text-gray-800"}`}>
//               {pkg.title}
//             </h2>

//             {/* Pricing */}
//             <div className="flex flex-col items-center">
//               <p className="text-base font-bold text-red-500 line-through">
//                 ₹{pkg.originalPrice}
//               </p>
//               <p className={`text-2xl font-bold ${index === 1 ? "text-blue-700" : "text-blue-600"}`}>
//                 ₹{pkg.finalPrice}
//               </p>
//             </div>

//             {/* Discount & GST */}
//             <p className="text-sm text-gray-600">
//               Save {pkg.discountPercentage}% | GST: {pkg.gst}%
//             </p>

//             {/* Features List - Left Aligned */}
//             <ul className="text-sm text-gray-700 space-y-1 w-full text-left pl-4">
//               {pkg.features.map((feature, idx) => (
//                 <li key={idx} className="flex items-center gap-2">
//                   ✅ {feature}
//                 </li>
//               ))}
//             </ul>

//             {/* Buy Now Button */}
//             <button className={`mt-4 w-full font-bold py-2 px-4 rounded-lg transition-all 
//               ${index === 1 ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}
//             `}>
//               Buy Now
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Package;



// import React, { useState, useEffect } from "react";
// import packageData from "../data/packages.json";
// import sessionData from "../data/sessions.json"; // Importing session data

// const Package = () => {
//   const [packages, setPackages] = useState([]);
//   const [sessions, setSessions] = useState([]);

//   useEffect(() => {
//     setPackages(packageData);
//     setSessions(sessionData);
//   }, []);

//   return (
//     <div className="p-1">
//       {/* Package Section */}
//       <h1 className="text-2xl text-gray-400 font-bold mb-4">Packages</h1>
//       <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 ">
//         <h1 className="text-xl font-bold text-gray-800 mb-6">Choose Your Package</h1>
//         <hr className="my-4 border-gray-300" />

//         {/* Packages Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {packages.map((pkg, index) => (
//             <div
//               key={pkg.id}
//               className={`p-5 rounded-lg shadow-md flex flex-col items-center text-center space-y-4 border transition-all 
//                 ${index === 1 ? "bg-blue-100 border-blue-500 hover:shadow-xl" : "bg-gray-100 border-gray-200 hover:shadow-lg"}
//               `}
//             >
//               {/* Package Icon */}
//               <div
//                 className={`w-14 h-14 flex items-center justify-center rounded-full shadow-md text-2xl 
//                   ${index === 1 ? "bg-blue-500 text-white" : "bg-white"}
//                 `}
//               >
//                 🎁
//               </div>

//               {/* Package Title */}
//               <h2 className={`text-lg font-semibold ${index === 1 ? "text-blue-600" : "text-gray-800"}`}>
//                 {pkg.title}
//               </h2>

//               {/* Pricing */}
//               <div className="flex flex-col items-center">
//                 <p className="text-base font-bold text-red-500 line-through">₹{pkg.originalPrice}</p>
//                 <p className={`text-2xl font-bold ${index === 1 ? "text-blue-700" : "text-blue-600"}`}>
//                   ₹{pkg.finalPrice}
//                 </p>
//               </div>

//               {/* Discount & GST */}
//               <p className="text-sm text-gray-600">
//                 Save {pkg.discountPercentage}% | GST: {pkg.gst}%
//               </p>

//               {/* Features List - Left Aligned */}
//               <ul className="text-sm text-gray-700 space-y-1 w-full text-left pl-4">
//                 {pkg.features.map((feature, idx) => (
//                   <li key={idx} className="flex items-center gap-2">
//                     ✅ {feature}
//                   </li>
//                 ))}
//               </ul>

//               {/* Buy Now Button */}
//               <button
//                 className={`mt-4 w-full font-bold py-2 px-4 rounded-lg transition-all 
//                   ${index === 1 ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}
//                 `}
//               >
//                 Buy Now
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Counseling Sessions Section */}
//       {/* <h1 className="text-2xl text-gray-600 font-bold mt-10 mb-4">Counseling Sessions</h1> */}
//       <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 container mx-auto my-10">
//         <h1 className="text-xl font-bold text-gray-800 mb-6">Ad ons.</h1>
//         <hr className="my-4 border-gray-300" />

//         {/* Sessions Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {sessions.map((session, index) => (
//             <div
//               key={session.id}
//               className="p-5 rounded-lg shadow-md flex flex-col items-center text-center space-y-4 border border-gray-200 bg-gray-50 hover:shadow-lg transition-all"
//             >
//               {/* Session Icon */}
//               <div className="w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-600 text-2xl font-bold rounded-full shadow-md">
//                 🧑‍⚕️
//               </div>

//               {/* Session Type */}
//               <h2 className="text-lg font-semibold text-gray-800">{session.type}</h2>

//               {/* Duration */}
//               <p className="text-sm text-gray-600">{session.duration}</p>

//               {/* Pricing */}
//               <p className="text-2xl font-bold text-blue-600">{session.description}</p>

//               {/* Book Session Button */}
//               <a
//                 href={session.buttonLink}
//                 className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all text-center"
//               >
//                 {session.buttonText}
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Package;



import React, { useState, useEffect } from "react";
import packageData from "../data/packages.json";
import sessionData from "../data/sessions.json"; // Importing session data
// import PaymentButton from "../constant/PaymentButton";
import { Package } from "lucide-react";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    setPackages(packageData);
    setSessions(sessionData);
  }, []);

  return (
    <div className="p-1">
      {/* Package Section */}
      <h1 className="text-2xl text-gray-400 font-bold mb-4">Packages</h1>
      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 ">
        <h1 className="text-xl text-[#f1b963] font-bold  mb-6">
          Choose Your Package
        </h1>
        <hr className="my-4 border-gray-300" />

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`p-5 rounded-lg shadow-md flex flex-col items-center text-center space-y-4 border transition-all 
                ${
                  index === 1
                    ? "bg-blue-100 border-yellow-500 hover:shadow-xl"
                    : "bg-gray-100 border-gray-200 hover:shadow-lg"
                }
              `}
            >
              {/* Package Icon */}
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-full shadow-md text-2xl 
                  ${index === 1 ? "bg-yellow-500 text-white" : "bg-white"}
                `}
              >
                <Package size={24} className="text-gray-600" />
              </div>

              {/* Package Title */}
              <h2
                className={`text-lg font-semibold ${
                  index === 1 ? "text-yellow-600" : "text-gray-800"
                }`}
              >
                {pkg.title}
              </h2>

              {/* Pricing */}
              <div className="flex flex-col items-center">
                <p className="text-base font-bold text-red-500 line-through">
                  ₹{pkg.originalPrice}
                </p>
                <p
                  className={`text-2xl font-bold ${
                    index === 1 ? "text-yellow-700" : "text-yellow-600"
                  }`}
                >
                  ₹{pkg.finalPrice}
                </p>
              </div>

              {/* Discount & GST */}
              <p className="text-sm text-gray-600">
                Save {pkg.discountPercentage}% | GST: {pkg.gst}%
              </p>

              {/* Features List - Left Aligned */}
              <ul className="text-sm text-gray-700 space-y-1 w-full text-left pl-4">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    ✅ {feature}
                  </li>
                ))}
              </ul>

              {/* Buy Now Button */}
              <button
                className={`mt-4 w-full font-bold py-2 px-4 rounded-lg transition-all 
                  ${
                    index === 1
                      ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                      : "bg-yellow-500 hover:bg-yellow-600 text-white"
                  }
                `}
              >
                Buy Now
              </button>

              {/* <div className="text-center w-100">
                <PaymentButton
                  amount={pkg.finalPrice}
                  packageInfo={pkg.title}
                  packageId={pkg.id}
                  customerDetails={{
                    name: userDetails
                      ? `${userDetails.first_name} ${userDetails.last_name}`
                      : "Guest",
                    email: userDetails?.email || "guest@example.com",
                    phone: userDetails?.phone || "0000000000",
                  }}
                />
              </div> */}
            </div>
          ))}
        </div>
      </div>

      {/* Counseling Sessions Section */}
      {/* <h1 className="text-2xl text-gray-600 font-bold mt-10 mb-4">Counseling Sessions</h1> */}
      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 container mx-auto my-10">
        <h1 className="text-xl text-[#f1b963] font-bold mb-6">Ad ons.</h1>
        <hr className="my-4 border-gray-300" />

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sessions.map((session, index) => (
            <div
              key={session.id}
              className="p-5 rounded-lg shadow-md flex flex-col items-center text-center space-y-4 border border-gray-200 bg-gray-50 hover:shadow-lg transition-all"
            >
              {/* Session Icon */}
              <div className="w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-600 text-2xl font-bold rounded-full shadow-md">
                🧑‍⚕️
              </div>

              {/* Session Type */}
              <h2 className="text-lg font-semibold text-gray-800">
                {session.type}
              </h2>

              {/* Duration */}
              <p className="text-sm text-gray-600">{session.duration}</p>

              {/* Pricing */}
              <p className="text-2xl font-bold text-yellow-600">
                {session.description}
              </p>

              {/* Book Session Button */}
              <a
                href={session.buttonLink}
                className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-all text-center"
              >
                {session.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;

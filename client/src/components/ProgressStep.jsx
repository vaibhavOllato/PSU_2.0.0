import React, { useState } from "react";
import { CheckCircle, FileText, CalendarCheck, Package } from "lucide-react";

const Progress = () => {
  const [currentStep, setCurrentStep] = useState(0); // Default to Step 1

  const processSteps = [
    {
      step: "Select Package",
      icon: <CheckCircle size={24} className="text-white" />,
    },
    {
      step: "Make Payment",
      icon: <Package size={24} className="text-white" />,
    },
    {
      step: "Give Assessment",
      icon: <FileText size={24} className="text-white" />,
    },
    {
      step: "Detailed Report",
      icon: <FileText size={24} className="text-white" />,
    },
    {
      step: "Book Counselling",
      icon: <CalendarCheck size={24} className="text-white" />,
    },
  ];

  return (
    <>
      {/* Horizontal Progress Line */}
      <div className="relative mb-6">
        {/* Background Line */}
        <hr className="absolute top-1/2 left-0 w-full h-1 transform -translate-y-1/2 bg-gray-300" />

        {/* Progress Connector */}
        <div
          className="absolute top-1/2 left-0 h-1 transform -translate-y-1/2 bg-primary"
          style={{
            width: `${(currentStep / processSteps.length) * 100}%`, // Dynamically adjust the width based on currentStep
          }}
        />
      </div>

      {/* Step Circles without Highlighting Current Step */}
      <div className="flex justify-between mb-4 ">
        {processSteps.map((_, index) => (
          <div key={index} className="relative flex-1 text-center">
            {/* Step Circle */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-lg transition-all duration-300
                ${
                  index + 1 <= currentStep
                    ? "bg-gradient-to-r from-green-500 to-green-700 text-white" // For completed steps
                    : "bg-opacity-30 bg-white text-gray-600" // For upcoming steps
                }`}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Process Step Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
        {processSteps.map((item, index) => (
          <div
            key={index}
            className="relative bg-opacity-30 bg-white backdrop-blur-xl p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center border border-gray-400"
          >
            {/* Step Icon */}
            <div className="w-14 h-14 flex items-center justify-center bg-primary text-white rounded-full shadow-md mb-4">
              {item.icon}
            </div>
            {/* Step Text */}
            <span className="text-base font-medium text-gray-700 text-center">
              {item.step}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Progress;

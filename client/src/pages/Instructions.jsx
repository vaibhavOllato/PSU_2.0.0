import React from "react";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";

const Instructions = () => {
  const navigate = useNavigate();

  return (
    <div className="p-1">
      {/* Package Section */}
      <h1 className="text-2xl text-gray-400 font-bold mb-4">Instructions</h1>
      <div className="p-1 flex items-center justify-center  bg-gray-100">
        <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-8 max-w-3xl w-full text-center animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center mb-4">
            <Info className="w-8 h-8 text-secondary mr-2" /> Instructions
          </h1>
          <p className="text-gray-600 mb-6">
            Please carefully read the instructions before proceeding with the
            assessment.
          </p>

          {/* Instruction Box */}
          <div className="bg-blue-50 border border-blue-300 text-primary p-6 rounded-lg shadow-md mb-6 text-left w-full">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                You'll encounter a series of statements reflecting everyday
                experiences.
              </li>
              <li>
                There are 100 statements in total, covering a wide range of
                topics.
              </li>
              <li>
                Each statement has five options; choose the one that aligns with
                you most.
              </li>
              <li>There are no right or wrong answers—answer honestly.</li>
              <li>
                Your responses are completely confidential and used only for
                academic purposes.
              </li>
            </ul>
          </div>

          {/* Confirmation Message */}
          <p className="text-lg font-semibold text-gray-800 mb-4">
            Are you ready to begin?
          </p>

          {/* Buttons */}
          <div className="flex space-x-4 justify-center">
            <button
              onClick={() => navigate("/language")}
              className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-all"
            >
              Back
            </button>
            <button
              onClick={() => navigate("/assessment")}
              className="px-6 py-2 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-secondary-hover"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AssessmentSubmitted = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = () => {
    navigate("/summary");
  };

  return (
    <div className="  flex flex-col">
      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        <div className="flex-1 w-full flex items-center justify-center p-4">
          <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 w-full max-w-xl text-center">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
              Assessment Submitted Successfully,{" "}
              <span className="text-textSecondary">{user.first_name}</span> ! 🎊
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for completing the assessment. Click below to view your
              report.
            </p>
            <button
              onClick={handleSubmit}
              className="bg-secondary hover:bg-secondary-hover text-white text-lg font-medium py-2 px-6 rounded-md transition duration-300"
            >
              View Summary Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentSubmitted;

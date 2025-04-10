import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Assessment = () => {
  const pageRef = useRef(null);
  const { user } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasGivenAssessment, setHasGivenAssessment] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const role = user ? user.role : "Testing";
  const user_id = user ? user.userId : null;
  const user_name = user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : "Testing";

  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const selectedLanguage = "en";
  const completed_test = 1;
  const today = new Date();
  const formattedDate = `${today.getFullYear().toString().slice(-2)}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}`;
  const panel_name = "psu";
  const lowerCase_role = role.toLowerCase();

  let assessment_id = role === "upper" && selectedLanguage === "en" ? 3 : role === "middle" && selectedLanguage === "en" ? 4 : role === "junior" && selectedLanguage === "mr" ? 5 : null;
  const fetchUrl = lowerCase_role === "middle" && selectedLanguage === "en"
    ? `${apiUrl}/api/assessment/psu/middle/en`
    : lowerCase_role === "upper" && selectedLanguage === "en"
    ? `${apiUrl}/api/assessment/psu/upper/en`
    : lowerCase_role === "junior" && selectedLanguage === "en"
    ? `${apiUrl}/api/assessment/psu/junior/en`
    : ``;

  const submitUrl = `${apiUrl}/api/scoring/submit`;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(fetchUrl);
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch questions. Please try again.");
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [fetchUrl]);

  useEffect(() => {
    if (user_id) {
      const checkAssessmentStatus = async () => {
        try {
          const response = await axios.post(`${apiUrl}/api/auth/get-status`, {
            panel_name: "psu",
            user_id: user_id,
          });
          if (response.data.success && response.data.result.assessment_status === 1) {
            setHasGivenAssessment(true);
          }
        } catch (error) {
          console.error("Error checking assessment status:", error);
        }
      };
      checkAssessmentStatus();
    }
  }, [user_id]);

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
    setAnswers(savedAnswers);
  }, []);

  const questionsPerPage = 10;
  const totalQuestions = questions?.data?.length || 0;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questions?.data?.slice(startIndex, endIndex) || [];

  const handleOptionChange = (questionIndex, optionLabel) => {
    const updatedAnswers = { ...answers, [questionIndex]: optionLabel };
    setAnswers(updatedAnswers);
    localStorage.setItem("answers", JSON.stringify(updatedAnswers));
  };

  const handleSubmit = async () => {
    if (hasGivenAssessment) {
      setIsPopupOpen(true);
      return;
    }
    if (!user_id) {
      toast.error("User not found. Please log in again.");
      return;
    }
    const formattedAnswers = Object.keys(answers).map((key) => ({
      selected_option: answers[key],
    }));
    try {
      await axios.post(submitUrl, {
        user_id,
        user_name,
        answers: formattedAnswers,
        panel_name,
        assessment_id,
        selectedLanguage,
        role: lowerCase_role,
        completed_test,
        exam_date: formattedDate,
      });
      localStorage.removeItem("answers");
      toast.success("Assessment submitted successfully!");
      navigate("/assessment-submitted");
    } catch (error) {
      toast.error("Error submitting assessment. Please try again.");
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      const allAnswered = currentQuestions.every((_, i) => answers[startIndex + i] !== undefined);
      if (allAnswered) {
        setCurrentPage((prev) => prev + 1);
        setTimeout(() => {
          pageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      } else {
        toast.error("Please answer all questions before proceeding.");
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div ref={pageRef} className="w-full px-4 py-4">
      <div className="">
        <h2 className="text-3xl font-semibold text-gray-400 mb-6">Assessment</h2>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="flex items-center justify-between bg-blue-100 px-6 py-3">
            <h6 className="text-blue-800 font-semibold">Assessment Code: {selectedLanguage}</h6>
            <h6 className="text-blue-800 font-semibold">Client Role: {role}</h6>
          </div>

          <div className="bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] p-6">
            {currentQuestions.map((question, index) => (
              <div key={index} className="mb-6 bg-white p-4 rounded-lg shadow">
                {/* <h4 className="text-lg font-medium mb-4">
                  {`Q${startIndex + index + 1}: ${question.questions}`}
                </h4> */}
                <h4 className="text-lg font-semibold text-gray-800 mb-4 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md shadow-sm">
  {`Q${startIndex + index + 1}: ${question.questions}`}
</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["A", "B", "C", "D"].map((option, idx) => (
                    <label
                      key={option}
                      className={`flex items-center gap-2 border p-3 rounded cursor-pointer transition ${
                        answers[startIndex + index] === option
                          ? "border-blue-500 bg-blue-100"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question_${startIndex + index}`}
                        value={option}
                        checked={answers[startIndex + index] === option}
                        onChange={() =>
                          handleOptionChange(startIndex + index, option)
                        }
                        className="form-radio text-blue-600"
                      />
                      {question[`opt_${idx + 1}`]}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 0}
                className="bg-gray-400 text-white px-6 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={
                  currentPage === Math.floor(totalQuestions / questionsPerPage) - 1
                    ? handleSubmit
                    : handleNext
                }
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                {currentPage === Math.floor(totalQuestions / questionsPerPage) - 1
                  ? "Submit"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Assessment;

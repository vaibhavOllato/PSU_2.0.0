import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const AssessmentGraph = () => {
  const { user } = useAuth();
  const [data, setData] = useState(Array(10).fill(0));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    const fetchAssessmentData = async () => {
      if (user && user.userId && user.role) {
        try {
          const response = await axios.post(`${apiUrl}/api/scoring/get-user-score`, {
            user_id: user.userId,
            panel_name: "psu",
            role: user.role,
            lang: "en",
          });

          if (response.data.results && response.data.results.length > 0) {
            const sortedResults = response.data.results.sort(
              (a, b) => new Date(b.exam_date) - new Date(a.exam_date)
            );
            const latestResult = sortedResults[0];

            const scores = [
              parseInt(latestResult.time_management) || 0,
              parseInt(latestResult.work_life_balance) || 0,
              parseInt(latestResult.stress) || 0,
              parseInt(latestResult.anxiety) || 0,
              parseInt(latestResult.depression) || 0,
              parseInt(latestResult.coping_mechanisms) || 0,
              parseInt(latestResult.health_issues) || 0,
              parseInt(latestResult.financial_stress) || 0,
              parseInt(latestResult.gender_equality) || 0,
              parseInt(latestResult.upskilling) || 0,
            ];

            setData(scores);
          } else {
            setError("No assessment data found. Please complete an assessment.");
          }
        } catch (err) {
          console.error("Error fetching assessment data:", err);
          setError("Error fetching assessment data. Please try again later.");
        }
      } else {
        setError(
          <div>
            <p>No assessment data found. Please take the assessment to view your scores.</p>
            <a
              href="/assessment-page"
              className="inline-block mt-3 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
            >
              Take Assessment
            </a>
          </div>
        );
      }
      setLoading(false);
    };

    fetchAssessmentData();
  }, [user]);

  const options = {
    chart: { type: "bar", height: 350 },
    title: { text: "PSU Assessment", align: "center" },
    xaxis: {
      categories: [
        "Time Management",
        "Work-life balance",
        "Stress Management",
        "Anxiety",
        "Depression",
        "Coping Mechanism",
        "Physical health issue",
        "Financial stress",
        "Gender Equality",
        "Up-skilling & career growth",
      ],
    },
    yaxis: {
      title: { text: "Score (0 to 100)" },
      min: 0,
      max: 100,
      tickAmount: 5,
    },
  };

  const series = [{ name: "Assessment Score", data }];

  if (loading)
    return (
      <div className="flex justify-center items-center py-10 text-lg text-gray-700">
        Loading...
      </div>
    );

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 bg-red-100 border border-red-400 text-red-700 p-6 rounded-lg shadow">
        <h4 className="text-xl font-semibold mb-2">Please Note</h4>
        <div>{error}</div>
        <p className="mt-4 text-sm text-gray-600">
          Ensure you have access to all assessments for accurate results.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-6 p-4 bg-white rounded-lg shadow">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default AssessmentGraph;

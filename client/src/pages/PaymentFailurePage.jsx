import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";

const PaymentFailurePage = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/package");
    }
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center"
      >
        {/* Failure Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "backOut" }}
        >
          <AiOutlineCloseCircle className="text-red-600 text-7xl mb-4" />
        </motion.div>

        {/* Title & Message */}
        <h1 className="text-2xl font-bold text-center text-red-600">
          Payment Failed!
        </h1>
        <p className="text-gray-600 text-center mt-2 mb-4">
          Unfortunately, your payment was unsuccessful. Please try again.
        </p>

        {/* Countdown Timer */}
        <motion.div
          key={countdown}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-medium text-gray-700 mb-6"
        >
          Redirecting in <span className="text-red-600">{countdown}</span>{" "}
          seconds...
        </motion.div>

        {/* Retry Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          onClick={() => navigate("/packages")}
        >
          Retry Payment
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentFailurePage;

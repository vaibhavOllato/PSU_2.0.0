import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { motion } from "framer-motion";

const PaymentSuccessPage = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/language");
    }
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-4"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="relative"
        >
          <AiOutlineCheckCircle className="text-green-600 text-8xl drop-shadow-lg" />
          <div className="absolute -top-1 -left-1 w-20 h-20 bg-green-400 rounded-full opacity-30 blur-lg"></div>
        </motion.div>

        {/* Title & Message */}
        <h1 className="text-3xl font-bold text-center text-green-600">
          Payment Successful!
        </h1>
        <p className="text-gray-600 text-center px-4">
          Thank you for your payment. You can now access your assessment page.
        </p>

        {/* Countdown Timer */}
        <motion.div
          key={countdown}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-medium text-gray-700"
        >
          Redirecting in <span className="text-blue-600">{countdown}</span>{" "}
          seconds...
        </motion.div>

        {/* CTA Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          onClick={() => navigate("/language")}
        >
          Go to Assessment Page
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#0E3746",
        primary: "#371D31",
        secondary: "#FFB100", // Golden amber – contrasts beautifully with indigo

        textPrimary: "#1e293b", // Slate-800 – strong for dark text
        textSecondary: "#475569", // Slate-600 – softer, for subtext

        background: "#F8FAFC", // Slate-50 – very light background (off-white)
        cardBackground: "#FFFFFF", // Pure white – clean card base

        border: "#E2E8F0", // Slate-200 – subtle for borders
      },
    },
  },
  plugins: [],
};

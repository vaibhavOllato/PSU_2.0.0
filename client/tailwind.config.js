/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001427",
        "primary-hover": "#022c44",
        // primary: "#371D31",
        secondary: "#708d81",
        "secondary-hover": "#5f786f",
        textPrimary: "#708d81",
        textSecondary: "#dd6e42",
        "textSecondary-hover": "#c85d3b",
        background: "#F8FAFC",
        cardBackground: "#FFFFFF",

        border: "#E2E8F0",
      },
    },
  },
  plugins: [],
};

// bg-[#022c44]

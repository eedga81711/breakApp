/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        cyan: "cyan",
        amber: "#f7b900",
        secondary: "gray",
        dimWhite: "#242424",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        yellow: "yellow",
      },
      backgroundColor: {
        yellow: "yellow",
        cyan: "cyan",
        amber: "#f7b900",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    animation: {
      "spin-slow": "spin-slow 2s linear infinite",
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },

  plugins: [],
};

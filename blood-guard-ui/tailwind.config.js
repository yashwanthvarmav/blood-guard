/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#E63946",
        primary: "#B71C1C",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Add Poppins font
        outfit: ["Outfit", "sans-serif"],
      },
      animation: {
        glow: "glow 1.5s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": {
            boxShadow:
              "0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.5)",
          },
          "50%": {
            boxShadow:
              "0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.7)",
          },
          "100%": {
            boxShadow:
              "0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.5)",
          },
        },
      },
    },
  },
  plugins: [],
};

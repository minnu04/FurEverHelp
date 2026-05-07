/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campagne: "#f9e4da",
        "forest-green": "#1d503a",
        primary: {
          DEFAULT: "#1d503a",
          light: "#2a6b47",
          dark: "#0f2818",
        },
        accent: "#f9e4da",
        dark: {
          bg: "#0a0e0f",
          card: "#1a1f22",
          border: "#2a3338",
          muted: "#8b95a5",
          text: "#f1f5f9",
        },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #1d503a 0%, #0a0e0f 50%, #f9e4da 100%)",
        "gradient-soft": "linear-gradient(180deg, rgba(249,228,218,0.1) 0%, transparent 100%)",
      },
      backdropBlur: {
        sm: "4px",
        md: "12px",
        lg: "20px",
      },
      boxShadow: {
        glow: "0 0 30px rgba(29, 80, 58, 0.15)",
        "glow-lg": "0 0 60px rgba(29, 80, 58, 0.2)",
        card: "0 8px 32px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 20px 40px rgba(0, 0, 0, 0.15)",
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
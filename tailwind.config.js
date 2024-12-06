/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        secondary: {
          50: "#fdf2f8",
          100: "#fce7f3",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
        },
      },
      fontFamily: {
        sans: ["Inter var", "sans-serif"],
      },
      backgroundSize: {
        "300%": "300%",
      },
      animation: {
        gradient: "gradient 8s linear infinite",
        fadeIn: "fadeIn 0.5s ease-in forwards",
        fadeInUp: "fadeInUp 0.5s ease-out forwards",
        bounceSubtle: "bounce-subtle 2s infinite",
        shine: "shine 2s linear infinite",
        blink: "blink 1s step-end infinite",
        "shine-text": "shine-text 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "spin-reverse": "spin 6s linear infinite reverse",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "bounce-subtle": {
          "0%, 100%": {
            transform: "translateY(-5%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        shine: {
          "0%": { "background-position": "200% center" },
          "100%": {
            "background-position": "-200% center",
            transform: "translateX(400%)",
          },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        "shine-text": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-20px) scale(1.1)" },
        },
        dnaMove: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.5)" },
        },
      },
    },
  },
  plugins: [],
};

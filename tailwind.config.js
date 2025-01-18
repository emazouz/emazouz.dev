import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-back":
          "linear-gradient(90.01deg, #e59cff 0.01%, #ba9cff 50.01%, #9cb2ff 100%)",
        "gradient-card": "linear-gradient(45deg, #04051dea 0%, #2b566e 100%)",
      },
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--light-transparent)",
        "text-color-primary": "var(--text-color-primary)",
        "text-color-secondary": "var(--text-color-secondary)",
        "main-back": "var(--main-back)",
      },
      screens: {
        mobile: "460px", // للأجهزة المحمولة
        tablet: "750px", // للأجهزة اللوحية
        smallDesktop: "900px", // لأجهزة سطح المكتب الصغيرة
        largeDesktop: "1270px", // لأجهزة سطح المكتب الكبيرة
      },
      animation: {
        "border-spin": "border-spin 5s linear infinite",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "fade-in-text-left": "fade-in-text-left 2s ease-in-out",
        "text-expand-scroll": "text-expand-scroll 0.5s ease-in-out forwards",
      },
      keyframes: {
        "border-spin": {
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        "fade-in-text-left": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
                floating: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "85%": { opacity: "0" },
          "100%": { transform: "translateY(-55px)", opacity: "0" },
        },
        "text-expand-scroll": {
          "0%": {
            width: "0",
          },
          "100%": {
            width: "100%",
            right: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;

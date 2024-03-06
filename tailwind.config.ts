import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      orange: {
        "1": "#FEFCFB",
        "2": "#FFF7ED",
        "3": "#FFEFD6",
        "4": "#FFDFB5",
        "5": "#FFD19A",
        "6": "#FFC182",
        "7": "#F5AE73",
        "8": "#EC9455",
        "9": "#F76B15",
        "10": "#EF5F00",
        "11": "#CC4E00",
        "12": "#582D1D",
      },
      yellow: {
        "1": "#FEFDFB",
        "2": "#FEFBE9",
        "3": "#FFF7C2",
        "4": "#FFEE9C",
        "5": "#FBE577",
        "6": "#F3D673",
        "7": "#E9C162",
        "8": "#E2A336",
        "9": "#FFC53D",
        "10": "#FFBA18",
        "11": "#AB6400",
        "12": "#4F3422",
      },
      gray: {
        "1": "#FDFDFC",
        "2": "#F9F9F8",
        "3": "#F1F0EF",
        "4": "#E9E8E6",
        "5": "#E2E1DE",
        "6": "#DAD9D6",
        "7": "#CFCECA",
        "8": "#BCBBB5",
        "9": "#8D8D86",
        "10": "#82827C",
        "11": "#63635E",
        "12": "#21201C",
      },
      tertiary: "#4e5166",
      white: "#ffffff",
      black: "#000000",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

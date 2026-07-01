/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#7C3AED",
        },
        dark: {
          btn: "#1F1B2E",
        },
        star: {
          gold: "#F5B301",
          empty: "#D8DCE3",
        },
        text: {
          heading: "#16181D",
          body: "#4B5563",
          muted: "#9AA0A6",
        },
        border: {
          base: "#E5E7EB",
        },
        page: "#FCFCFD",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #D102F3 0%, #1C26CB 100%)",
        "logo-gradient": "linear-gradient(135deg, #D102F3 0%, #1C26CB 100%)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        modal: "16px",
        field: "8px",
        search: "10px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(17,17,26,0.06)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      grisclaro: "#D3D3D3",
      grisoscuro: "#808080",
      azulclaro: "#ADD8E6",
      blanco: "#FDFFFC",
      purpuraoscuro: "#800080",
      purpuraclaro: "#A020F0",
      rosaclaro: "#FFB6C1",
      lavanda: "#E6E6FA",
      plateado: "#C0C0C0",
      crema: "#FFFDD0",
      negroclaro: "#333745",
      negropurpura: "#1C0B19",
      rojo: "#BA1200",
    },
    extend: {
      fontFamily: {
        overview: ["Roboto", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      boxShadow: {
        login: "1px 1px 35px 10px rgba(128,0,128,0.75)",
      },
    },
  },
  plugins: [],
};

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
      purpuraclaro: "#802392",
      rosaclaro: "#FFB6C1",
      lavanda: "#E6E6FA",
      plateado: "#C0C0C0",
      crema: "#FFFDD0",
      negroclaro: "#333745",
      negropurpura: "#23001E",
      rojo: "#BA1200",
      negro: "#04080F",
      amarillo: "#FDE12D",
      verde: "#0CCA4A",
      blancoblanco: "#FFFFFF",
      rosa: "#FF1493",
      rosa2: "#D90480",
      verde2: "#04D95B",
      amarillo2: "#D9A604",
      purpuraclaro2: "#FF00FF",
      purpura: "#BBADFF",
    },
    extend: {
      fontFamily: {
        overview: ["Roboto", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      boxShadow: {
        login: "1px 1px 35px 10px rgba(128,0,128,0.75)",
        input: "0px 0px 25px 4px",
      },
    },
  },
  plugins: [],
};

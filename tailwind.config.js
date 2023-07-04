/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      twitch:"#935ee6",
      azultwitter:"#1A8CD8",
      grisclaro: "#D3D3D3",
      grisoscuro: "#808080",
      azulclaro: "#ADD8E6",
      blanco: "#FDFFFC",
      // #800080
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
      amarillo3: "#B0A613",
      morado:"#5C1B6C",
      gris5:"#303134",
      gris6:"#202123",
      gris7:"#4d4f54",
      gris7hover:"#383a3d",
      purpura5:"#6B5C7D",
      textogris:"#D1D5DB",
      gristwitter:"#32343E"
      // #393d45
      // #444654
    },
    extend: {
      fontFamily: {
        overview: ["Roboto", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        noto: ["Noto Sans", "sans-serif"],
      },
      boxShadow: {
        login: "1px 1px 35px 10px rgba(128, 0, 128, 0.75)",
        input: "0px 0px 25px 4px",
        seriefav: "0px 2px 10px -7px rgba(0, 0, 0, 0.1)",
        home: "0px 0px 13px 4px rgba(90,90,90,0.75)",
      },
    },
  },
  plugins: [],
};

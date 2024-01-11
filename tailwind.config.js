/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}", "./node_modules/flowbite/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // primary: "#AF7F42",
        // secondary: "black",
        // tertiary: "#AF7F42",
        // sectionBg: "#FFF8F0",
        primary: "#e7e7e7",
        secondary: "#af7f42",
        tertiary: "black",
        sectionBg: "#FFF8F0",
        hover: "#9c8765",

        navBarBg: 'rgba(255, 255, 255, 0.2)',
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
    backgroundImage: {
      "hero-pattern": "url('/src/assets/hero-bg.png')",
      "maps": "url('/src/assets/maps.png')"
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
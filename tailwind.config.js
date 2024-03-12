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
        primary: "#e7e7e7", //white
        secondary: "#af7f42", //gold
        tertiary: "#20272b",
        fadeGold: "#fbfaf8",
        sectionBg: "#f2f3f8",
        hover: "#9c8765",

        // navBarBg: 'rgba(255, 255, 255, 0.2)',
        navBarBg: "rgba(0, 0, 0, 0.5)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        contactOverlay: 'rgba(255,255,255,0.95)'
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
      "hero-pattern": "url('/src/assets/hero-bg.webp')",
      "title-separator-big": "url('/src/assets/title-separator-big.png')",
      "contact-bg": "url('/src/assets/contact-bg.png')",
      "services-bg": "url('/src/assets/services-bg.png')",
      "maps": "url('/src/assets/maps.png')"
    },
    fontFamily: {
      'dance': ['Dancing Script', 'cursive'],
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
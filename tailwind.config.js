const { defaultTheme } = require('tailwindcss/defaultTheme')

const { colors } = require("./tailwind/colors.js")
const { sizes } = require("./tailwind/sizes.js")
const { zIndex } = require("./tailwind/z-index.js")

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'Hiragino Kaku Gothic ProN', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      spacing: sizes,
      width: sizes,
      height: sizes,
      lineHeight: sizes,
      fontSize: sizes,
      colors: Object.assign(colors),
      zIndex: zIndex,
      screens: {
        small: "750px",
        medium: "960px",
        large: "1200px",
        xLarge: "1600px",
      },
    },
  },
  plugins: [],
}


module.exports = {
  mode: "all",
  content: [
      // include all rust, html and css files in the src directory
      "./src/**/*.{rs,html,css}",
      "../index.html",
      "../src/**/*.html",
      "../src/**/*.css",
  ],
  theme: {
      extend: {},
  },
  plugins: [require("daisyui")],
}

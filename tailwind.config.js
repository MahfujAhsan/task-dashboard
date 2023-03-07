/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [
      {
        doctorsPortalTheme: {
          primary: "#2A9198",
          secondary: "#f9e45b",
          accent: "#BD9C74",
          neutral: "#BAD8E0",
          info: "#D668E3",
          success: "#6db784",
          warning: "#FFAB00",
          error: "#C53678",
          "base-100": "#fff"
        }
      }
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

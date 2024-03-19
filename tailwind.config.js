/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        small: "0.875rem",
        medium: "1rem",
        large: "1.25rem",
        xLarge: "1.5rem",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        PurpleDark: "#482057",
        PurpleMedium: "#8B5E9C",
        PurpleLight: "#D1B7DB",
        PurplePale: "#EAD6F1",
        YellowDark: "#FDD037",
        YellowPale: "#FFF2C8",
        Background: "#F9EFE7",
      },
    },
  },
  plugins: [],
};

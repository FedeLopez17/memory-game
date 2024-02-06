/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        loading: "url(/src/assets/images/letter-background.webp)",
        "menu-animated":
          "url(/src/assets/images/hogwarts-express-animated.webp)",
        "menu-firt-frame":
          "url(/src/assets/images/hogwarts-express-first-frame.webp)",
        game: "url(/src/assets/images/hogwarts-background.webp)",
        victory: "url(/src/assets/images/hogwarts-victory-background.webp)",
        defeat: "url(/src/assets/images/hogwarts-defeat-background.webp)",
      },
      fontFamily: {
        oswald: "Oswald, sans-serif",
        roboto: "Roboto, sans-serif",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fade-in 1.5s ease-in forwards",
      },
    },
  },
  plugins: [require("tailwindcss-3d")({ legacy: true })],
};

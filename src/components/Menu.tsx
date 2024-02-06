import { useState } from "react";
import harryPotterLogo from "../assets/images/harry-potter-logo.webp";

export default function Menu({ startGame, playMenuButtonSound }: MenuProps) {
  const [animatedBackground, setAnimatedBackground] = useState(false);

  const handleButtonClick = () => {
    setAnimatedBackground(true);
    playMenuButtonSound();
    setTimeout(() => {
      startGame();
    }, 1130);
  };

  const BUTTON_STYLING_CLASSES = {
    unclicked: "bg-red-600 border-[1px] border-transparent",
    clicked: "bg-red-900  border-[1px] border-amber-500",
    hover: "hover:bg-red-900  hover:border-[1px] hover:border-amber-500 ",
  };

  return (
    <section
      className={`h-screen flex justify-center items-start ${
        animatedBackground ? "bg-menu-animated" : "bg-menu-firt-frame"
      } bg-cover text-white font-oswald`}
    >
      <section className="flex flex-col gap-2 justify-center items-center mt-32">
        <img
          src={harryPotterLogo}
          alt="Harry Potter Logo"
          className="sm:w-4/5 lg:w-1/2"
        />
        <h2 className=" text-md sm:text-2xl lg:text-4xl [text-shadow:0.2rem_0.1rem_0.2rem_rgb(0,0,0)]">
          AND THE MEMORY GAME
        </h2>
        <button
          className={`${
            animatedBackground
              ? BUTTON_STYLING_CLASSES.clicked
              : BUTTON_STYLING_CLASSES.unclicked
          } ${
            BUTTON_STYLING_CLASSES.hover
          } py-3 px-6 rounded-lg mt-6 text-xl transition-all duration-500`}
          type="button"
          onClick={handleButtonClick}
        >
          START GAME
        </button>
      </section>
    </section>
  );
}

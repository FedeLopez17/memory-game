import { useEffect } from "react";
import victoryImage from "../assets/images/golden-trio.webp";
import defeatImage from "../assets/images/voldemort-grinning.webp";
import { MdReplay } from "react-icons/md";

export default function OutcomeModal({
  gameWon,
  restartGame,
  playOutcomeSound,
}: OutcomeModalProps) {
  useEffect(playOutcomeSound, []);

  return (
    <section
      className={`${
        gameWon ? "bg-victory" : "bg-defeat"
      } bg-center min-h-screen flex justify-center items-center font-roboto`}
    >
      <section className="w-[min(800px,_70%)] aspect-video flex flex-col justify-center items-center border-[1px] border-[rgba(255,255,255,80%)] my-20 animate-fade-in">
        <img
          src={gameWon ? victoryImage : defeatImage}
          alt={gameWon ? "Golden Trio smiling" : "Voldemort grinning"}
        />

        <section className="flex w-full justify-between items-center text-white box-border px-4 py-2 backdrop-blur-3xl bg-black bg-opacity-60 text-3xl">
          <h1 className="font-bold [text-shadow:_2px_1px_rgb(0_0_0)]">
            {gameWon ? "You win!" : "You lose"}
          </h1>
          <MdReplay
            onClick={restartGame}
            title={`${gameWon ? "Play" : "Try"} again!`}
            className="cursor-pointer hover:scale-110"
          />
        </section>
      </section>
    </section>
  );
}

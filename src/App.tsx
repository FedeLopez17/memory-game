import { MouseEventHandler, useEffect, useState } from "react";
import { randomArrayItem, shuffleArray } from "./Helpers";

type ColorObj = { id: number; value: string };
type GameState = "ongoing" | "won" | "lost";

const HEX_COLORS: ColorObj[] = [
  { id: 1, value: "#FFC0CB" }, // Pink
  { id: 2, value: "#0000FF" }, // Blue
  { id: 3, value: "#00FF00" }, // Green
  { id: 4, value: "#87CEEB" }, // Sky Blue
  { id: 5, value: "#FFA500" }, // Orange
  { id: 6, value: "#FF0000" }, // Red
  { id: 7, value: "#8B4513" }, // Brown
  { id: 8, value: "#FFFF00" }, // Yellow
  { id: 9, value: "#800080" }, // Purple
  { id: 10, value: "#808080" }, // Grey
];

function App() {
  const [unclickedImages, setUnclickedImages] = useState(HEX_COLORS);
  const [currentImageSet, setCurrentImageSet] = useState<ColorObj[]>([]);
  const [gameState, setGameState] = useState<GameState>("ongoing");

  const chooseRandomImages = (amount: number) => {
    let remainingImages = [...HEX_COLORS];
    const imageSet: ColorObj[] = [];

    for (let i = 0; i < amount; i++) {
      const randomImage = randomArrayItem(remainingImages);
      remainingImages = remainingImages.filter(
        (image) => image.id !== randomImage.id
      );
      imageSet.push(randomImage);
    }

    return imageSet;
  };

  const updateImageSet = () => {
    const randomSet = chooseRandomImages(4);
    const unclickedImagesIds = unclickedImages.map((image) => image.id);
    const noUnclickedImage = randomSet.every(
      ({ id }) => !unclickedImagesIds.includes(id)
    );

    if (noUnclickedImage) {
      randomSet.pop();
      randomSet.push(randomArrayItem(unclickedImages));
      shuffleArray(randomSet);
    }

    setCurrentImageSet(randomSet);
  };

  const nextTurn: MouseEventHandler<HTMLElement> = ({
    currentTarget: { id },
  }) => {
    const selectedImageId = parseInt(id);

    const unclickedImagesIds = unclickedImages.map((image) => image.id);

    if (!unclickedImagesIds.includes(selectedImageId)) {
      setGameState("lost");
    } else if (unclickedImagesIds.length == 1) {
      setGameState("won");
    } else {
      setUnclickedImages((prevUnclickedImages) =>
        prevUnclickedImages.filter((image) => image.id !== selectedImageId)
      );
    }
  };

  useEffect(updateImageSet, [unclickedImages]);

  return (
    <>
      <section className="h-screen bg-gradient-to-br from-white to-teal-800 flex flex-wrap justify-evenly items-center">
        {currentImageSet.map((colorObj) => (
          <section
            key={colorObj.id}
            className="w-60 aspect-[9/16] cursor-pointer border-2 border-white "
            style={{ backgroundColor: colorObj.value }}
            id={colorObj.id.toString()}
            onClick={(event) => nextTurn(event)}
          ></section>
        ))}
      </section>
      {gameState !== "ongoing" && (
        <section className="absolute h-screen w-screen flex justify-center items-center top-0 backdrop-blur-md bg-black bg-opacity-60">
          <section className="absolute w-3/4 aspect-video flex justify-center items-center m-auto">
            <h1 className="text-4xl font-bold text-white [text-shadow:_2px_1px_rgb(0_0_0)]">
              {gameState === "won"
                ? "Congratulations, you won! :D"
                : "Unfortunately you lost :("}
            </h1>
          </section>
        </section>
      )}{" "}
    </>
  );
}

export default App;

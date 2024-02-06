import { useEffect } from "react";
import loadingGifWhite from "../assets/images/loading-gif-white.gif";

export default function LoadingScreen({ doneLoading }: LoadingScreenProps) {
  useEffect(() => {
    const fetchCharactersAndLoadImages = async () => {
      const res = await fetch(
        "https://potterapi-fedeperin.vercel.app/en/characters"
      );
      const characters: Character[] = await res.json();

      const assetImages = import.meta.glob("../assets/images/*", {
        eager: true,
        as: "url",
      });

      const allImagePaths = [
        ...characters.map((character) => character.image),
        ...Object.values(assetImages),
      ];

      let imagesLoadedCounter = 0;

      // Loads images so that they are stored in the browser's cache
      allImagePaths.forEach((imagePath) => {
        const image = new Image();
        image.src = imagePath;
        image.onload = () => {
          // Added the timeout below to ensure loading screen remains visible for at least one loading gif loop for better UX.
          imagesLoadedCounter === allImagePaths.length - 1
            ? setTimeout(() => doneLoading(characters), 2000)
            : imagesLoadedCounter++;
        };
      });
    };

    fetchCharactersAndLoadImages();
  }, []);

  return (
    <div className="bg-loading h-screen bg-cover bg-right-bottom flex">
      <section className="h-36 bg-[rgba(0,0,0,85%)] text-white grow self-end flex justify-between items-end box-border px-4 pb-4">
        <p className="lg:text-lg">Loading...</p>
        <img
          src={loadingGifWhite}
          alt="Deathly hollows symbol gif"
          className="w-28"
        />
      </section>
    </div>
  );
}

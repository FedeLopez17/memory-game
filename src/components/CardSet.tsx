import { useEffect, useState } from "react";
import Card from "./Card";

export default function CardSet({
  currentCharacterSet,
  nextTurn,
  playCardSoundEffect,
}: CardsProps) {
  const [cardsAreHidden, setCardsAreHidden] = useState(true);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setCardsAreHidden(true);

    const timeOut = setTimeout(() => {
      playCardSoundEffect();
      setCardsAreHidden(false);
    }, 1400);

    firstRender ? setFirstRender(false) : playCardSoundEffect();

    return () => clearTimeout(timeOut);
  }, [currentCharacterSet]);

  return (
    <section className="grow flex justify-center items-center">
      <section className="flex flex-wrap justify-center items-center gap-4 lg:gap-20 my-12">
        {currentCharacterSet.map((character, index) => (
          <Card
            key={index}
            character={character}
            nextTurn={nextTurn}
            cardsAreHidden={cardsAreHidden}
          />
        ))}
      </section>
    </section>
  );
}

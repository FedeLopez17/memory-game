import { useEffect, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import cardBackImage from "../assets/images/card-back.webp";

// Tilt effect library: https://www.npmjs.com/package/react-parallax-tilt

const CardFront = ({ character, nextTurn }: CardFrontProps) => {
  const [currentCardCharacter, setCurrentCardCharacter] = useState(character);
  const prevCharacter = useRef<Character | null>(null);

  useEffect(() => {
    prevCharacter.current = character;

    const timeOut = setTimeout(() => {
      setCurrentCardCharacter(character);
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [character.image]);

  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.65}
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      glareBorderRadius="6px"
      glarePosition="all"
      perspective={1500}
      className="absolute backface-hidden flex flex-col justify-center items-center h-full w-full bg-white rounded-md cursor-pointer"
    >
      <section
        className=" grow box-border flex justify-center items-center mx-2 mt-2 overflow-hidden"
        onClick={() => nextTurn(character.fullName)}
      >
        <img
          src={currentCardCharacter.image}
          alt={`Picture of ${character.nickname} from Harry Potter`}
          key={character.fullName}
          className={"aspect-[7/10]"}
        />
      </section>
      <p className="">{currentCardCharacter.nickname}</p>
    </Tilt>
  );
};

const CardBack = () => (
  <section className="absolute backface-hidden h-full w-full flex rotate-y-180">
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.6}
      glareBorderRadius="6px"
      glarePosition="all"
      perspective={1500}
      className="h-full w-full"
    >
      <img src={cardBackImage} alt="Card back" />
    </Tilt>
  </section>
);

export default function Card({
  character,
  nextTurn,
  cardsAreHidden,
}: CardProps) {
  return (
    <section className="w-[min(35vw,_240px)] aspect-[7/10] flex flex-col justify-center items-center cursor-pointe relative">
      <section
        className={`absolute w-full h-full transform-style-3d transition-all duration-1000 ease-out ${
          cardsAreHidden && "rotate-y-180"
        }`}
      >
        <CardFront character={character} nextTurn={nextTurn} />
        <CardBack />
      </section>
    </section>
  );
}

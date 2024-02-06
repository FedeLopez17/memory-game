import Header from "./Header";
import CardSet from "./CardSet";

export default function GameScreen({
  charactersCount,
  unclickedCharactersCount,
  currentCharacterSet,
  nextTurn,
  playCardSoundEffect,
}: GameScreenProps) {
  return (
    <section className="h-screen flex flex-col bg-game bg-cover bg-center overflow-auto font-roboto">
      <Header
        charactersCount={charactersCount}
        unclickedCharactersCount={unclickedCharactersCount}
      />

      {currentCharacterSet.length && (
        <CardSet
          currentCharacterSet={currentCharacterSet}
          nextTurn={nextTurn}
          playCardSoundEffect={playCardSoundEffect}
        />
      )}
    </section>
  );
}

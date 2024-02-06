import { useEffect, useRef, useState } from "react";
import { randomArrayItem, shuffleArray } from "./Helpers";
import OutcomeModal from "./components/OutcomeModal";
import GameScreen from "./components/GameScreen";
import Menu from "./components/Menu";
import LoadingScreen from "./components/LoadingScreen";
import SoundManager from "./components/SoundManager";
import cardFlipSoundEffect from "./assets/sounds/card-flip-sound-effect.mp3";
import backgroundMusic from "./assets/sounds/copyright-free-harry-potter-inspired.mp3";
import steamTrainSoundEffect from "./assets/sounds/steam-train.mp3";
import avadaKedavraSoundEffect from "./assets/sounds/avada-kedavra.mp3";
import wingardiumLeviosaSoundEffect from "./assets/sounds/wingardium-leviosa.mp3";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [unclickedCharacters, setUnclickedCharacters] = useState<Character[]>(
    []
  );
  const [currentCharacterSet, setCurrentCharacterSet] = useState<Character[]>(
    []
  );
  const [gameState, setGameState] = useState<GameState>("loading");
  const [soundConfig, setSoundConfig] = useState<SoundConfig>({
    musicOn: false,
    soundEffectsOn: false,
  });

  const setMusicOn = (musicOn: boolean) => {
    setSoundConfig((prevState) => ({ ...prevState, musicOn }));
  };

  const setSoundEffectsOn = (soundEffectsOn: boolean) => {
    setSoundConfig((prevState) => ({ ...prevState, soundEffectsOn }));
  };

  const startGame = () => {
    setGameState("ongoing");
    updateCharacterSet(unclickedCharacters);
  };

  const restartGame = () => {
    setUnclickedCharacters(characters);
    startGame();
  };

  const doneLoading = (characters: Character[]) => {
    setCharacters(characters);
    setUnclickedCharacters(characters);
    setGameState("unstarted");
  };

  const cardAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const steamTrainRef = useRef<HTMLAudioElement | null>(null);
  const avadaKedavraAudioRef = useRef<HTMLAudioElement | null>(null);
  const wingardiumLeviosaAudioRef = useRef<HTMLAudioElement | null>(null);

  const playSoundEffect = (soundEffectName: SoundEffectNames) => {
    if (!soundConfig.soundEffectsOn) return;

    const audioRefMap = {
      "card-flip": cardAudioRef,
      "steam-train": steamTrainRef,
      "avada-kedavra": avadaKedavraAudioRef,
      "wingardium-leviosa": wingardiumLeviosaAudioRef,
    };

    const currentAudioRef = audioRefMap[soundEffectName].current;
    if (currentAudioRef) currentAudioRef.play();
  };

  const chooseRandomCharacters = (amount: number) => {
    let remainingCharacters = [...characters];
    const characterSet: Character[] = [];

    for (let i = 0; i < amount; i++) {
      const randomCharacter = randomArrayItem(remainingCharacters);
      remainingCharacters = remainingCharacters.filter(
        (character) => character.fullName !== randomCharacter.fullName
      );
      characterSet.push(randomCharacter);
    }

    return characterSet;
  };

  const updateCharacterSet = (unclickedCharacters: Character[]) => {
    if (!unclickedCharacters.length) return;

    const randomSet = chooseRandomCharacters(4);
    const unclickedCharacterNames = unclickedCharacters.map(
      (character) => character.fullName
    );
    const noUnclickedImage = randomSet.every(
      ({ fullName }) => !unclickedCharacterNames.includes(fullName)
    );

    if (noUnclickedImage) {
      randomSet.pop();
      randomSet.push(randomArrayItem(unclickedCharacters));
      shuffleArray(randomSet);
    }

    setCurrentCharacterSet(randomSet);
  };

  const nextTurn = (selectedCharacterName: string) => {
    if (gameState !== "ongoing") return;

    const unclickedCharacterNames = unclickedCharacters.map(
      (character) => character.fullName
    );

    if (!unclickedCharacterNames.includes(selectedCharacterName)) {
      setGameState("lost");
    } else if (unclickedCharacterNames.length == 1) {
      setGameState("won");
    } else {
      const updatedUnclickedCharacters = unclickedCharacters.filter(
        (character) => character.fullName !== selectedCharacterName
      );

      setUnclickedCharacters(updatedUnclickedCharacters);
      updateCharacterSet(updatedUnclickedCharacters);
    }
  };

  useEffect(() => {
    musicRef.current &&
      (soundConfig.musicOn
        ? musicRef.current.play()
        : musicRef.current.pause());
  }, [soundConfig.musicOn]);

  return (
    <>
      {gameState === "loading" && <LoadingScreen doneLoading={doneLoading} />}

      {gameState === "unstarted" && (
        <Menu
          startGame={startGame}
          playMenuButtonSound={() => playSoundEffect("steam-train")}
        />
      )}

      {gameState === "ongoing" && (
        <GameScreen
          charactersCount={characters.length}
          unclickedCharactersCount={unclickedCharacters.length}
          currentCharacterSet={currentCharacterSet}
          nextTurn={nextTurn}
          playCardSoundEffect={() => playSoundEffect("card-flip")}
        />
      )}

      {["won", "lost"].includes(gameState) && (
        <OutcomeModal
          gameWon={gameState === "won"}
          restartGame={restartGame}
          playOutcomeSound={() =>
            playSoundEffect(
              gameState === "won" ? "wingardium-leviosa" : "avada-kedavra"
            )
          }
        />
      )}

      {gameState !== "loading" && (
        <SoundManager
          soundConfig={soundConfig}
          setMusicOn={setMusicOn}
          setSoundEffectsOn={setSoundEffectsOn}
        />
      )}

      <audio src={cardFlipSoundEffect} ref={cardAudioRef} />
      <audio src={backgroundMusic} ref={musicRef} autoPlay loop />
      <audio src={steamTrainSoundEffect} ref={steamTrainRef} />
      <audio src={avadaKedavraSoundEffect} ref={avadaKedavraAudioRef} />
      <audio
        src={wingardiumLeviosaSoundEffect}
        ref={wingardiumLeviosaAudioRef}
      />
    </>
  );
}

export default App;

type Character = {
  birthdate: string;
  chilren: string[];
  fullName: string;
  hogwartsHouse: "Gryffindor" | "Ravenclaw" | "Hufflepluff" | "Slytherin";
  image: string;
  index: number;
  interpretedBy: string;
  nickname: string;
};

type GameState = "loading" | "unstarted" | "ongoing" | "won" | "lost";

type HeaderProps = {
  charactersCount: number;
  unclickedCharactersCount: number;
};

interface NextTurn {
  nextTurn: (selectedCharacterName: string) => void;
}

interface CardFrontProps extends NextTurn {
  character: Character;
}

type CardProps = CardFrontProps & {
  cardsAreHidden: boolean;
};

interface CardsProps extends NextTurn {
  currentCharacterSet: Character[];
  nextTurn: (selectedCharacterName: string) => void;
  playCardSoundEffect: () => void;
}

type GameScreenProps = CardsProps & {
  charactersCount: number;
  unclickedCharactersCount: number;
};

type MenuProps = {
  startGame: () => void;
  playMenuButtonSound: () => void;
};

type OutcomeModalProps = {
  gameWon: boolean;
  restartGame: () => void;
  playOutcomeSound: () => void;
};

type LoadingScreenProps = {
  doneLoading: (characters: Character[]) => void;
};

type SoundConfig = {
  musicOn: boolean;
  soundEffectsOn: boolean;
};

type SoundManagerProps = {
  soundConfig: SoundConfig;
  setMusicOn: (musicOn: boolean) => void;
  setSoundEffectsOn: (soundEffectsOn: boolean) => void;
};

type SoundEffectNames =
  | "card-flip"
  | "steam-train"
  | "avada-kedavra"
  | "wingardium-leviosa";

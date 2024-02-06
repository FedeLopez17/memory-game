import {
  MdMusicNote,
  MdMusicOff,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";

export default function SoundManager({
  soundConfig,
  setMusicOn,
  setSoundEffectsOn,
}: SoundManagerProps) {
  return (
    <section className="flex gap-6 box py-3 px-6 rounded-lg fixed bottom-2 left-2 text-3xl text-white bg-[rgba(0,_0,_0,_25%)] backdrop-blur-sm">
      {soundConfig.musicOn ? (
        <MdMusicNote
          onClick={() => setMusicOn(false)}
          className="cursor-pointer hover:scale-110"
        />
      ) : (
        <MdMusicOff
          onClick={() => setMusicOn(true)}
          className="cursor-pointer hover:scale-110"
        />
      )}
      {soundConfig.soundEffectsOn ? (
        <MdVolumeUp
          onClick={() => setSoundEffectsOn(false)}
          className="cursor-pointer hover:scale-110"
        />
      ) : (
        <MdVolumeOff
          onClick={() => setSoundEffectsOn(true)}
          className="cursor-pointer hover:scale-110"
        />
      )}
    </section>
  );
}

export default function Header({
  charactersCount,
  unclickedCharactersCount,
}: HeaderProps) {
  return (
    <header className="h-12 flex justify-between items-center text-white bg-[rgba(0,_0,_0,_25%)] box-border px-4 text-xs sm:text-sm md:text-base">
      <p>Don't click on the same card twice!</p>
      <p>
        Score: {charactersCount - unclickedCharactersCount}/{charactersCount}
      </p>
    </header>
  );
}

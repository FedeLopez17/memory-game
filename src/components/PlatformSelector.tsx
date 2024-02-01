import platformsData from "../data/platformsData.json";

const bannerImages = import.meta.glob("../assets/platform-banners/*.jpg", {
  eager: true,
  as: "url",
});

export default function PlatformSelector({
  fetchGames,
}: {
  fetchGames: (id: number) => void;
}) {
  return (
    <section className="w-screen h-screen absolute top-0 bg-slate-300 flex flex-wrap">
      {platformsData.map(({ name, slug, id }) => (
        <img
          src={bannerImages[`../assets/platform-banners/${slug}.jpg`]}
          alt={`${name} banner`}
          key={id}
          className="hover:border-2 hover:border-white cursor-pointer"
          onClick={() => fetchGames(id)}
        />
      ))}
    </section>
  );
}

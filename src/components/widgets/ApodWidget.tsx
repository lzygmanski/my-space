import { useEffect, useState } from "react";

type ApodLike = {
  title: string;
  image_url: string;
  summary: string;
};

export default function ApodWidget() {
  const [apod, setApod] = useState<ApodLike | null>(null);

  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v4/articles?limit=1")
      .then((res) => res.json())
      .then((data) => {
        const article = data.results[0];
        setApod({
          title: article.title,
          image_url: article.image_url,
          summary: article.summary,
        });
      });
  }, []);

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl p-5 transition-all hover:scale-[1.02] hover:shadow-xl">
      <h2 className="text-xl font-semibold text-blue-300 mb-2">
        📸 Picture of the Day
      </h2>
      {apod ? (
        <>
          <img
            src={apod.image_url}
            alt={apod.title}
            className="rounded mb-2 max-h-64 object-cover w-full"
          />
          <h3 className="text-lg font-semibold mb-1">{apod.title}</h3>
          <p className="text-sm text-gray-300">{apod.summary}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

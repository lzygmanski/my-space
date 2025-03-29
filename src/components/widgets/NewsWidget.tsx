import { useEffect, useState } from "react";

type Article = {
  id: number;
  title: string;
  url: string;
  image_url: string;
  published_at: string;
};

export default function NewsWidget() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v4/articles?limit=5")
      .then((res) => res.json())
      .then((data) => setArticles(data.results));
  }, []);

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl p-5 transition-all hover:scale-[1.02] hover:shadow-xl">
      <h2 className="text-xl font-semibold text-pink-300 mb-2">
        🗞 Latest Space News
      </h2>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.id} className="flex flex-col sm:flex-row gap-4">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full sm:w-32 h-24 object-cover rounded"
            />
            <div>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 font-medium hover:underline"
              >
                {article.title}
              </a>
              <p className="text-xs text-gray-500">
                {new Date(article.published_at).toLocaleDateString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

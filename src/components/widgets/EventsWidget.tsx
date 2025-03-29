import { useEffect, useState } from "react";

type AstronomyData = {
  sunrise: string;
  sunset: string;
  date: string;
};

export default function EventsWidget() {
  const [astroData, setAstroData] = useState<AstronomyData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset&timezone=auto`,
        )
          .then((res) => res.json())
          .then((data) => {
            const d = data.daily;
            setAstroData({
              sunrise: d.sunrise[0],
              sunset: d.sunset[0],
              date: d.time[0],
            });
          })
          .catch(() => setError("Failed to fetch astronomy data."));
      },
      () => {
        setError("Unable to retrieve your location.");
      },
    );
  }, []);

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl p-5 transition-all hover:scale-[1.02] hover:shadow-xl">
      <h2 className="text-xl font-semibold text-green-300 mb-2">
        🌅 Sunrise & Sunset
      </h2>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {!error && !astroData && (
        <p className="text-gray-400 text-sm">Loading...</p>
      )}
      {astroData && (
        <ul className="text-sm space-y-1 text-gray-300">
          <li>📅 Date: {astroData.date}</li>
          <li>🌞 Sunrise: {astroData.sunrise.slice(11)}</li>
          <li>🌇 Sunset: {astroData.sunset.slice(11)}</li>
        </ul>
      )}
    </div>
  );
}

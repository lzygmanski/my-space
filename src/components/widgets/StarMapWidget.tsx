import { useEffect, useState } from "react";

export default function StarMapWidget() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        // Default to equator if denied
        setCoords({ lat: 0, lon: 0 });
      },
    );
  }, []);

  const iframeSrc = coords
    ? `https://virtualsky.lco.global/embed/index.html?longitude=${coords.lon}&latitude=${coords.lat}&constellations=true&gridlines_az=true&showstarlabels=true&projection=stereo&showdate=false&showposition=false`
    : "";

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl p-5 transition-all hover:scale-[1.02] hover:shadow-xl">
      <h2 className="text-xl font-semibold text-purple-300 mb-2">
        🌌 Star Map
      </h2>
      {coords ? (
        <iframe
          src={iframeSrc}
          width="100%"
          height="300"
          allowFullScreen
          className="rounded-md border border-gray-700"
        />
      ) : (
        <p className="text-sm text-gray-400">Loading star map...</p>
      )}
    </div>
  );
}

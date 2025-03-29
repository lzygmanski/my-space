import ApodWidget from "./widgets/ApodWidget";
import NewsWidget from "./widgets/NewsWidget";
import EventsWidget from "./widgets/EventsWidget";
import StarMapWidget from "./widgets/StarMapWidget";

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
              🚀 <span className="text-cyan-400">CosmoDashboard</span>
            </h1>
            <p className="text-sm text-gray-400">
              Explore the universe, right from your browser
            </p>
          </div>

          {/* Google Search */}
          <form
            action="https://www.google.com/search"
            method="GET"
            target="_blank"
            className="w-full md:w-auto"
          >
            <input
              type="text"
              name="q"
              placeholder="Search the stars..."
              className="w-full md:w-64 px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ApodWidget />
          <NewsWidget />
          <EventsWidget />
          <StarMapWidget />
        </div>
      </div>
    </>
  );
}

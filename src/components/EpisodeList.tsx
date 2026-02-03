'use client';

import Image from 'next/image';

const episodeData = [
  { id: 1, title: "Kissing the Wrong Brother", duration: "1h 7m" },
  { id: 2, title: "Kissing the Wrong Brother", duration: "1h 2m" },
  { id: 3, title: "Kissing the Wrong Brother", duration: "1h 3m" },
  { id: 4, title: "Kissing the Wrong Brother", duration: "1h 5m" },
  { id: 5, title: "Kissing the Wrong Brother", duration: "1h 4m" },
  { id: 6, title: "Kissing the Wrong Brother", duration: "1h 6m" },
  { id: 7, title: "Kissing the Wrong Brother", duration: "1h 1m" },
  { id: 8, title: "Kissing the Wrong Brother", duration: "1h 2m" },
];

export default function EpisodeList({ episodes }: { episodes: number }) {
  return (
    <section className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">
            Episode List <span className="text-gray-400 text-sm">(All Episodes)</span>
          </h2>
          <button className="text-gray-400 hover:text-white transition text-sm">View More ➜</button>
        </div>

        {/* Episodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {episodeData.map((ep) => (
            <div key={ep.id} className="group cursor-pointer">
              <div className="relative h-32 rounded-lg overflow-hidden mb-2 bg-gray-800">
                <Image
                  src="https://m.media-amazon.com/images/M/MV5BZGRmMGRhOWMtOTk3Ni00OTRjLTkyYTAtYzA1M2IzMGE3NGRkXkEyXkFqcGc@._V1_.jpg"
                  alt={ep.title}
                  fill
                  className="object-cover group-hover:scale-110 transition"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <svg className="w-8 h-8 text-white fill-white" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <p className="text-white text-xs font-semibold truncate">{ep.title}</p>
              <p className="text-gray-400 text-xs">{ep.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

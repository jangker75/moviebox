'use client';

import Image from 'next/image';

const recommendedDramas = [
  {
    id: 1,
    title: "Boss Returned to Me: The Sirens to My Husband",
    category: "Romantic",
    image: "https://m.media-amazon.com/images/M/MV5BZGRmMGRhOWMtOTk3Ni00OTRjLTkyYTAtYzA1M2IzMGE3NGRkXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 2,
    title: "Amidst Call: Rich and Tall For You",
    category: "Romantic",
    image: "https://m.media-amazon.com/images/M/MV5BZGRmMGRhOWMtOTk3Ni00OTRjLTkyYTAtYzA1M2IzMGE3NGRkXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 3,
    title: "General's Lustful Confusion",
    category: "Romantic",
    image: "https://m.media-amazon.com/images/M/MV5BZGRmMGRhOWMtOTk3Ni00OTRjLTkyYTAtYzA1M2IzMGE3NGRkXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 4,
    title: "Too Many In Mine",
    category: "Romantic",
    image: "https://m.media-amazon.com/images/M/MV5BZGRmMGRhOWMtOTk3Ni00OTRjLTkyYTAtYzA1M2IzMGE3NGRkXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 5,
    title: "Best Hits the CEO's Secret Playground",
    category: "Romantic",
    image: "https://m.media-amazon.com/images/M/MV5BZGRmMGRhOWMtOTk3Ni00OTRjLTkyYTAtYzA1M2IzMGE3NGRkXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 6,
    title: "Arrows to My Heart",
    category: "Romantic",
    image: "https://m.media-amazon.com/images/M/MV5BZGRmMGRhOWMtOTk3Ni00OTRjLTkyYTAtYzA1M2IzMGE3NGRkXkEyXkFqcGc@._V1_.jpg",
  },
];

export default function RecommendedSection() {
  return (
    <section className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">Recommended for you</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {recommendedDramas.map((drama) => (
            <div key={drama.id} className="group cursor-pointer">
              <div className="relative h-80 rounded-lg overflow-hidden mb-4 bg-gray-800 shadow-lg">
                <Image
                  src={drama.image}
                  alt={drama.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <svg className="w-12 h-12 text-white fill-white" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-red-400 transition">
                {drama.title}
              </h3>
              <p className="text-gray-400 text-xs">{drama.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

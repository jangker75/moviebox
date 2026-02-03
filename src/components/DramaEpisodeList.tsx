'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DramaEpisodeListProps } from '@/types';

export default function DramaEpisodeList({ episodes, bookId }: DramaEpisodeListProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedEpisodes = showAll ? episodes : episodes.slice(0, 12);

  return (
    <section className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Episode List
            </h2>
            <p className="text-gray-400 text-sm">
              {episodes.length} Episodes
            </p>
          </div>
          {episodes.length > 12 && (
            <button 
              onClick={() => setShowAll(!showAll)}
              className="text-gray-400 hover:text-white transition text-sm"
            >
              {showAll ? 'View Less ←' : 'View More ➜'}
            </button>
          )}
        </div>

        {/* Episodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedEpisodes.map((episode) => (
            <Link
              key={episode.chapterId}
              href={`/drama/${bookId}/play?chapter=${episode.chapterId}`}
              className="group"
            >
              <div className="p-4 rounded-lg border border-gray-700 bg-gray-800 bg-opacity-50 hover:bg-opacity-80 hover:border-red-600 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold">
                      Episode {episode.chapterIndex + 1}
                    </h3>
                  </div>
                  <svg className="w-5 h-5 text-white opacity-50 group-hover:opacity-100 transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {episodes.length > 12 && !showAll && (
          <div className="mt-8 text-center">
            <button 
              onClick={() => setShowAll(true)}
              className="text-red-600 hover:text-red-500 font-semibold transition"
            >
              Load More Episodes →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

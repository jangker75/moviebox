'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SearchDrama } from '@/types';

interface SearchGridProps {
  dramas: SearchDrama[];
}

export default function SearchGrid({ dramas }: SearchGridProps) {
  if (dramas.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No dramas found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {dramas.map((drama) => (
        <Link key={drama.bookId} href={`/drama/${drama.bookId}`}>
          <div className="group cursor-pointer">
            <div className="relative h-80 rounded-lg overflow-hidden mb-4 bg-gray-800 shadow-lg">
              <Image
                src={drama.cover}
                alt={drama.bookName}
                fill
                className="object-cover group-hover:scale-110 transition duration-300"
              />
              {drama.corner && (
                <div className="absolute top-2 left-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded">
                  {drama.corner.name}
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 pointer-events-none flex items-center justify-center transition duration-300">
                <svg className="w-12 h-12 text-white fill-white" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-red-400 transition">
              {drama.bookName}
            </h3>
            <div className="flex flex-wrap gap-1 mb-1">
              {drama.tagNames.slice(0, 2).map((tag, index) => (
                <span key={index} className="text-gray-400 text-xs bg-gray-800 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
            {drama.protagonist && (
              <p className="text-gray-500 text-xs line-clamp-1">{drama.protagonist}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

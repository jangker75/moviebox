'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DramaGridProps } from '@/types';

export default function DramaGrid({ title, dramas }: DramaGridProps) {
  const displayDramas = dramas.slice(0, 6);
  const showViewAll = title === 'Featured' || title === 'Latest';

  return (
    <section className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {showViewAll && (
            <Link 
              href="/latest?page=1" 
              className="text-gray-400 hover:text-white transition text-sm"
            >
              View all ➜
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {displayDramas.map((drama) => {
            const category = drama.tagV3s?.[0]?.tagName || 'Drama';
            return (
              <Link key={drama.bookId} href={`/drama/${drama.bookId}`}>
                <div className="group cursor-pointer">
                  <div className="relative h-80 rounded-lg overflow-hidden mb-4 bg-gray-800 shadow-lg">
                    <Image
                      src={drama.coverWap}
                      alt={drama.bookName}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 pointer-events-none flex items-center justify-center transition duration-300">
                      <svg className="w-12 h-12 text-white fill-white" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-red-400 transition">
                    {drama.bookName}
                  </h3>
                  <p className="text-gray-400 text-xs">{category}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

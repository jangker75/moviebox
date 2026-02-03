'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HomeHeroProps } from '@/types';

export default function HomeHero({ data }: HomeHeroProps) {
  return (
    <section className="relative h-[600px] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src={data.coverWap}
          alt={data.bookName}
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>

      {/* Dark Overlay - tidak reaktif terhadap mouse events */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center z-10 pointer-events-auto">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {data.bookName}
          </h1>
          <p className="text-gray-300 text-lg mb-8 line-clamp-3">
            {data.introduction}
          </p>
          <div className="flex gap-4">
            <Link
              href={`/drama/${data.bookId}`}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Now
            </Link>
            <button className="border border-gray-600 hover:border-white text-white px-8 py-3 rounded-lg font-semibold transition">
              + Add to List
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

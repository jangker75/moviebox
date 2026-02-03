'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DramaDetailHeroProps } from '@/types';

export default function DramaDetailHero({
  bookId,
  rating,
  ratingCount,
  episodeCount,
  coverWap,
  bookName,
  introduction
}: DramaDetailHeroProps) {
  return (
    <section className="relative bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <a href="#" className="hover:text-white transition">Romance</a>
          <span>/</span>
          <span className="text-white">Drama Detail</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="md:col-span-1">
            <div style={{ position: 'relative', width: '100%', height: '500px' }}>
              <Link href={`/drama/${bookId}/play`} className="block group" style={{ width: '100%', height: '100%' }}>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl" style={{ width: '100%', height: '100%' }}>
                  <img
                    src={coverWap}
                    alt={bookName || 'Drama Cover'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
                <div 
                  className="group-hover:opacity-100 transition"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0
                  }}
                >
                  <div className="bg-red-600 rounded-full p-4">
                    <svg className="w-8 h-8 text-white fill-white" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-white mb-4">{bookName || 'Drama Title'}</h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 mb-6 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⭐</span>
                <span className="text-white">{rating}</span>
                <span className="text-gray-400 text-sm">({ratingCount})</span>
              </div>
              <div className="text-gray-400">|</div>
              <span className="text-gray-400">2024</span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-6 mb-6 max-w-2xl">
              {introduction || 'Drama description will be displayed here. Watch this exciting drama with multiple episodes.'}
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-8 text-gray-400 text-sm">
              <div>
                <span className="text-white font-semibold">{episodeCount}</span>
                <p>Episodes</p>
              </div>
              <div>
                <span className="text-white font-semibold">1.2M</span>
                <p>Total Views</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link href={`/drama/${bookId}/play`} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play Now
              </Link>
              <button className="border border-gray-600 hover:border-white text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

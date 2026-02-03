'use client';

import Image from 'next/image';
import Link from 'next/link';

interface HeroData {
  title: string;
  image: string;
  rating: string;
  year: string;
  duration: string;
  description: string;
  episodes: number;
  views: string;
}

export default function HeroSection({ data }: { data: HeroData }) {
  return (
    <section className="relative bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <a href="#" className="hover:text-white transition">Romance</a>
          <span>/</span>
          <span className="text-white">{data.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="md:col-span-1">
            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
                priority
              />
              <Link href={`/drama/kissing-wrong-brother/play`} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition group">
                <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition">
                  <svg className="w-8 h-8 text-white fill-white" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-white mb-4">{data.title}</h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 mb-6 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⭐</span>
                <span className="text-white">{data.rating}</span>
              </div>
              <div className="text-gray-400">|</div>
              <span className="text-gray-400">{data.year}</span>
              <div className="text-gray-400">|</div>
              <span className="text-gray-400">{data.duration}</span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-6 mb-6 max-w-2xl">
              {data.description}
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-8 text-gray-400 text-sm">
              <div>
                <span className="text-white font-semibold">{data.episodes}</span>
                <p>Episodes</p>
              </div>
              <div>
                <span className="text-white font-semibold">{data.views}</span>
                <p>Total Views</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link href={`/drama/kissing-wrong-brother/play`} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition">
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

            {/* Notification Banner */}
            <div className="mt-8 bg-red-600 bg-opacity-20 border-l-4 border-red-600 px-4 py-3 rounded">
              <p className="text-red-300 text-sm">
                📢 Turn on push notification for trending dramas and never miss a new release
              </p>
              <a href="#" className="text-red-400 hover:text-red-300 text-sm font-semibold mt-2 inline-block">Follow</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

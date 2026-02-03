'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">▶</span>
          </div>
          <span className="text-white font-bold text-xl">DramaBox</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
          <Link href="/browse" className="text-gray-300 hover:text-white transition">Browse</Link>
        </nav>

        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 w-48"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-white transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* User Avatar */}
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer">
            <span className="text-white text-sm">👤</span>
          </div>
        </div>
      </div>
    </header>
  );
}

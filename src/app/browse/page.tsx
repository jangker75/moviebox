'use client';

import { useState, useEffect, FormEvent, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '@/components/Footer';
import SearchGrid from '@/components/SearchGrid';
import { SearchDrama } from '@/types';
import { fetchSearchResults } from '@/lib/api';

function BrowseContent() {
  const searchParams = useSearchParams();
  const urlKeyword = searchParams.get('keyword');
  
  const [searchKeyword, setSearchKeyword] = useState(urlKeyword || 'love');
  const [dramas, setDramas] = useState<SearchDrama[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (urlKeyword) {
      setSearchKeyword(urlKeyword);
      setInputValue(urlKeyword);
    }
  }, [urlKeyword]);

  useEffect(() => {
    loadDramas(searchKeyword);
  }, [searchKeyword]);

  const loadDramas = async (keyword: string) => {
    setLoading(true);
    const results = await fetchSearchResults(keyword);
    setDramas(results);
    setLoading(false);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchKeyword(inputValue.trim());
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">{/* Search Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">Browse Dramas</h1>
          
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search dramas by keyword..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-6 py-4 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/50"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Search
              </button>
            </div>
          </form>

          {/* Popular Keywords */}
          <div className="mt-4">
            <p className="text-gray-400 text-sm mb-2">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {['love', 'romance', 'CEO', 'revenge', 'mafia', 'modern'].map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => {
                    setInputValue(keyword);
                    setSearchKeyword(keyword);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    searchKeyword === keyword
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {loading ? 'Searching...' : `Results for "${searchKeyword}"`}
            </h2>
            <span className="text-gray-400 text-sm">
              {!loading && `${dramas.length} dramas found`}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <SearchGrid dramas={dramas} />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="bg-black text-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        </div>
      </div>
    }>
      <BrowseContent />
    </Suspense>
  );
}

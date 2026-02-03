'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LatestResponse } from '@/types/api';

export default function LatestPage() {
  const [dramas, setDramas] = useState<LatestResponse['data']>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchLatestDramas = useCallback(async (pageNumber: number) => {
    // Prevent fetching if already loading or no more data
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/latest?page=${pageNumber}`);
      const data: LatestResponse = await response.json();
      
      if (data.success) {
        setDramas((prevDramas) => [...prevDramas, ...data.data]);
        setHasMore(data.meta.hasMore);
        setPage(pageNumber);
      }
    } catch (error) {
      console.error('Error fetching latest dramas:', error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [loading, hasMore]);

  // Initial load
  useEffect(() => {
    fetchLatestDramas(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore && !initialLoading) {
          fetchLatestDramas(page + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [page, loading, hasMore, initialLoading, fetchLatestDramas]);

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Latest Dramas</h1>
          <p className="text-gray-400">Discover the newest dramas</p>
        </div>

        {/* Initial Loading State */}
        {initialLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <>
            {/* Drama Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
              {dramas.map((drama, index) => (
                <Link
                  key={`${drama.bookId}-${index}`}
                  href={`/drama/${drama.bookId}`}
                  className="group relative aspect-[2/3] overflow-hidden rounded-lg bg-gray-900"
                >
                  {/* Corner Badge */}
                  {drama.corner && (
                    <div
                      className="absolute top-2 left-2 z-10 px-2 py-1 text-xs font-semibold rounded"
                      style={{ backgroundColor: drama.corner.color }}
                    >
                      {drama.corner.name}
                    </div>
                  )}

                  {/* Rank Badge */}
                  {drama.rankVo && (
                    <div className="absolute top-2 right-2 z-10 bg-black/70 px-2 py-1 text-xs font-semibold rounded">
                      {drama.rankVo.recCopy}
                    </div>
                  )}

                  {/* Cover Image */}
                  <Image
                    src={drama.coverWap}
                    alt={drama.bookName}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    {/* Play Button */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>

                    {/* Info */}
                    <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                      {drama.bookName}
                    </h3>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {drama.tags?.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-800 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{drama.chapterCount} Episodes</span>
                      <span>{drama.playCount} Views</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Loading More Indicator */}
            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
                <span className="ml-3 text-gray-400">Loading more...</span>
              </div>
            )}

            {/* Intersection Observer Target */}
            {hasMore && !loading && (
              <div ref={observerTarget} className="h-20 flex items-center justify-center">
                <div className="text-gray-500 text-sm">Scroll for more</div>
              </div>
            )}

            {/* End of List */}
            {!hasMore && dramas.length > 0 && (
              <div className="text-center py-8 text-gray-400">
                No more dramas to load
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

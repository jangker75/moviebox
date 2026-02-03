'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Chapter, ChaptersResponse, PageProps } from '@/types';
import { getVideoUrl } from '@/lib/utils';
import Header from '@/components/Header';

export default function PlayPage({ params }: PageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [episodes, setEpisodes] = useState<Chapter[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [bookId, setBookId] = useState('');
  const [bookName, setBookName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [showNextEpisode, setShowNextEpisode] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const videoRef = useRef<HTMLVideoElement>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await params;
      setBookId(resolvedParams.id);
      
      try {
        // Fetch drama detail for book name
        const detailRes = await fetch(
          `/api/detail?bookId=${resolvedParams.id}`
        );
        const detailData = await detailRes.json();
        if (detailData.success && detailData.data) {
          setBookName(detailData.data.bookName || 'Drama');
        }

        // Fetch chapters
        const res = await fetch(
          `/api/chapters?bookId=${resolvedParams.id}`
        );
        
        const data: ChaptersResponse = await res.json();
        
        if (data && data.length > 0) {
          setEpisodes(data);
          
          // Check if there's a specific chapter in search params
          const chapterParam = searchParams.get('chapter');
          let initialIndex = 0;
          if (chapterParam) {
            const index = data.findIndex(ep => ep.chapterId === chapterParam);
            if (index !== -1) {
              initialIndex = index;
            }
          }
          
          setCurrentEpisodeIndex(initialIndex);
          // Set the video URL for the initial episode
          if (data[initialIndex]) {
            setVideoUrl(getVideoUrl(data[initialIndex]));
          }
        }
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params, searchParams]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEpisodeChange = (index: number) => {
    // Clear any existing countdown
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setShowNextEpisode(false);
    setCountdown(5);
    
    setCurrentEpisodeIndex(index);
    if (episodes[index]) {
      const newVideoUrl = getVideoUrl(episodes[index]);
      setVideoUrl(newVideoUrl);
      
      // Update URL parameter with new chapter
      const chapterId = episodes[index].chapterId;
      router.replace(`/drama/${bookId}/play?chapter=${chapterId}`, { scroll: false });
      
      // Scroll to top when changing episodes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleVideoEnded = () => {
    // Auto play next episode if available
    if (currentEpisodeIndex < episodes.length - 1) {
      setShowNextEpisode(true);
      setCountdown(5);
      
      // Start countdown
      countdownTimerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Countdown finished, play next episode
            if (countdownTimerRef.current) {
              clearInterval(countdownTimerRef.current);
              countdownTimerRef.current = null;
            }
            setShowNextEpisode(false);
            handleEpisodeChange(currentEpisodeIndex + 1);
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleCancelAutoplay = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setShowNextEpisode(false);
    setCountdown(5);
  };

  const handlePlayNow = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setShowNextEpisode(false);
    setCountdown(5);
    handleEpisodeChange(currentEpisodeIndex + 1);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, []);

  // Reload video when videoUrl changes
  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.load();
      videoRef.current.play().catch(err => {
        console.log('Auto-play prevented:', err);
      });
    }
  }, [videoUrl]);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const currentEpisode = episodes[currentEpisodeIndex];

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href={`/drama/${bookId}`} className="hover:text-white transition">{bookName || 'Drama'}</Link>
            <span>/</span>
            <span className="text-white">EP {currentEpisodeIndex + 1}</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {bookName}
          </h1>
          <p className="text-gray-400 text-lg">
            Episode {currentEpisodeIndex + 1}{currentEpisode?.chapterName && `: ${currentEpisode.chapterName}`}
          </p>
        </div>

        {/* Video Player */}
        <div className="mb-8">
          <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
            <video
              ref={videoRef}
              className="w-full h-full"
              controls
              autoPlay
              onEnded={handleVideoEnded}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Next Episode Overlay */}
            {showNextEpisode && currentEpisodeIndex < episodes.length - 1 && (
              <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-10">
                <div className="text-center max-w-md px-6">
                  <div className="mb-6">
                    <div className="text-6xl font-bold text-white mb-4">{countdown}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Next Episode</h3>
                    <p className="text-gray-300">
                      Episode {currentEpisodeIndex + 2}
                      {episodes[currentEpisodeIndex + 1]?.chapterName && (
                        <span>: {episodes[currentEpisodeIndex + 1].chapterName}</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handlePlayNow}
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Play Now
                    </button>
                    <button
                      onClick={handleCancelAutoplay}
                      className="border border-gray-600 hover:border-white text-white px-8 py-3 rounded-lg font-semibold transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="mt-6">
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
              <span>Season 1</span>
              <span>•</span>
              <span>EP {currentEpisodeIndex + 1}</span>
              <span>•</span>
              <span>2024</span>
            </div>
            <p className="text-gray-300 mt-4">
              Watch this exciting episode and discover what happens next. Enjoy the drama!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6h-6v-2h6V5h2v6h6v2z" />
              </svg>
              Add to List
            </button>
            <button className="border border-gray-600 hover:border-white text-white px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C9.589 12.938 10 12.018 10 11c0-1.657-.895-3-2-3s-2 1.343-2 3 .895 3 2 3c.464 0 .9-.098 1.281-.284l-.96 2.384" />
              </svg>
              Share
            </button>
          </div>
        </div>

        {/* Episodes List */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {episodes.map((ep, index) => (
              <button
                key={ep.chapterId}
                onClick={() => handleEpisodeChange(index)}
                className={`p-4 rounded-lg transition text-left ${
                  currentEpisodeIndex === index
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">EP {ep.chapterIndex + 1}</h3>
                    {ep.chapterName && (
                      <p className="text-sm mt-1 opacity-75 line-clamp-1">
                        {ep.chapterName}
                      </p>
                    )}
                  </div>
                  <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex gap-4 justify-between">
          <Link
            href={`/drama/${bookId}`}
            className="text-gray-400 hover:text-white transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DramaDetailLoading() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Loading Overlay */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
          <p className="text-white text-lg font-semibold">Loading Drama Details...</p>
        </div>
      </div>

      {/* Skeleton Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 w-12 bg-gray-800 rounded animate-pulse"></div>
          <span className="text-gray-600">/</span>
          <div className="h-4 w-20 bg-gray-800 rounded animate-pulse"></div>
          <span className="text-gray-600">/</span>
          <div className="h-4 w-24 bg-gray-800 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster Skeleton */}
          <div className="md:col-span-1">
            <div className="relative w-full h-96 bg-gray-800 rounded-lg animate-pulse"></div>
          </div>

          {/* Info Skeleton */}
          <div className="md:col-span-2 space-y-4">
            {/* Title */}
            <div className="h-10 w-3/4 bg-gray-800 rounded animate-pulse"></div>
            
            {/* Meta Info */}
            <div className="flex gap-4">
              <div className="h-6 w-20 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-6 w-16 bg-gray-800 rounded animate-pulse"></div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-800 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-800 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse"></div>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="h-16 w-24 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-16 w-24 bg-gray-800 rounded animate-pulse"></div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <div className="h-12 w-32 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-12 w-32 bg-gray-800 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Episode List Skeleton */}
        <div className="mt-12">
          <div className="h-8 w-40 bg-gray-800 rounded animate-pulse mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-14 bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

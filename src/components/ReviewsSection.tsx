'use client';

const reviews = [
  {
    id: 1,
    title: "Kissing the Wrong Brother: A Second-Chance Romance at its Strongest",
    link: "#",
    isDramaBox: true,
  },
  {
    id: 2,
    title: "Kissing the Wrong Brother | Still Going Strong Comedy Series",
    link: "#",
    isDramaBox: false,
  },
  {
    id: 3,
    title: "Review the Wrong Brother Full Movie Watch Online At One Box",
    link: "#",
    isDramaBox: false,
  },
  {
    id: 4,
    title: "For a Comedy Romance Short-term Sport Movie",
    link: "#",
    isDramaBox: false,
  },
];

export default function ReviewsSection() {
  return (
    <section className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">Related Reviews</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <a
              key={review.id}
              href={review.link}
              className="group"
            >
              <div className={`p-4 rounded-lg border transition ${
                review.isDramaBox
                  ? 'border-red-600 bg-red-600 bg-opacity-10 hover:bg-opacity-20'
                  : 'border-gray-700 hover:border-gray-600'
              }`}>
                {review.isDramaBox && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs">📱</span>
                    </div>
                    <span className="text-red-400 text-xs font-semibold">DramaBox Exclusive</span>
                  </div>
                )}
                <h3 className="text-white font-semibold group-hover:text-red-400 transition line-clamp-3">
                  {review.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

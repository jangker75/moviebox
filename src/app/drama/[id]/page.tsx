import DramaDetailHero from "@/components/DramaDetailHero";
import DramaEpisodeList from "@/components/DramaEpisodeList";
import Footer from "@/components/Footer";
import { PageProps } from "@/types";
import { fetchDramaDetail } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function DramaDetailPage({ params }: PageProps) {
  const { id } = await params;
  const detailData = await fetchDramaDetail(id);
  
  if (!detailData) {
    return (
      <div className="bg-black text-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-gray-400">Drama not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <DramaDetailHero 
        bookId={id} 
        rating={detailData.ratingConf?.rate || '0'}
        ratingCount={detailData.ratingConf?.ratingCount || '0'}
        episodeCount={detailData.list?.length || 0}
        coverWap={detailData.coverWap || ''}
        bookName={detailData.bookName || 'Unknown'}
        introduction={detailData.introduction || ''}
      />
      <DramaEpisodeList episodes={detailData.list} bookId={id} />
      <Footer />
    </div>
  );
}

import HomeHero from "@/components/HomeHero";
import DramaGrid from "@/components/DramaGrid";
import Footer from "@/components/Footer";
import { fetchTrendingDramas, fetchVIPDramas } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [dramas, vipDramas] = await Promise.all([
    fetchTrendingDramas(),
    fetchVIPDramas()
  ]);
  
  const featuredDrama = dramas[0];

  return (
    <div className="bg-black text-white min-h-screen">
      {featuredDrama && <HomeHero data={featuredDrama} />}
      <DramaGrid title="Featured" dramas={dramas} />
      <DramaGrid title="VIP" dramas={vipDramas} />
      <Footer />
    </div>
  );
}

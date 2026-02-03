import { Drama, Chapter } from './drama';

export interface DramaGridProps {
  title: string;
  dramas: Drama[];
}

export interface HomeHeroProps {
  data: Drama;
}

export interface DramaDetailHeroProps {
  bookId: string;
  rating: string;
  ratingCount: string;
  episodeCount: number;
  coverWap?: string;
  bookName?: string;
  introduction?: string;
}

export interface DramaEpisodeListProps {
  episodes: Chapter[];
  bookId: string;
}

export interface PageProps {
  params: Promise<{ id: string }>;
}

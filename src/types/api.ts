import { Drama, DetailData, Chapter, SearchDrama, SearchMeta, LatestDrama, LatestMeta } from './drama';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface SearchResponse {
  success: boolean;
  data: SearchDrama[];
  meta: SearchMeta;
}

export interface LatestResponse {
  success: boolean;
  data: LatestDrama[];
  meta: LatestMeta;
}

export type DramaListResponse = ApiResponse<Drama[]>;
export type DramaDetailResponse = ApiResponse<DetailData>;
export type ChaptersResponse = Chapter[]

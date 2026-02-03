import { Drama, DramaListResponse, DetailData, DramaDetailResponse, SearchDrama, SearchResponse, Chapter } from '@/types';
import { API_BASE_URL, API_BASE_URL_CHAPTERS_2, API_BASE_URL_DETAIL, API_ENDPOINTS, CACHE_OPTIONS } from './constants';

export async function fetchTrendingDramas(): Promise<Drama[]> {
    try {
        // Server-side: call external API directly
        const res = await fetch(
            `${API_BASE_URL}${API_ENDPOINTS.POPULAR}?type=trending`,
            CACHE_OPTIONS.NO_STORE
        );
        const data: DramaListResponse = await res.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching trending dramas:', error);
        return [];
    }
}

export async function fetchDramaDetail(bookId: string): Promise<DetailData | null> {
    try {
        // Use absolute URL for server-side fetching
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        
        // Call internal API route that handles local file check on server-side
        const response = await fetch(
            `${baseUrl}/api/drama-detail?bookId=${bookId}`,
            {
                cache: 'no-store',
            }
        );

        const result = await response.json();

        if (result.success && result.data) {
            // Fetch chapters from internal API route
            const chaptersResponse = await fetch(
                `${baseUrl}/api/chapters?bookId=${bookId}`,
                {
                    cache: 'no-store',
                }
            );
            const chaptersData = await chaptersResponse.json();

            return {
                bookName: result.data.bookName || '',
                coverWap: result.data.coverWap || '',
                introduction: result.data.introduction || '',
                list: chaptersData.list || chaptersData || [],
                ratingConf: result.data.ratingConf || {
                    showRate: false,
                    rate: '0',
                    ratingCount: '0'
                }
            };
        }

        return null;
    } catch (error) {
        console.error('Error fetching drama detail:', error);
        return null;
    }
}

export async function fetchSearchResults(keyword: string): Promise<SearchDrama[]> {
    try {
        // Client-side: call internal API route
        const res = await fetch(
            `/api/search?keyword=${encodeURIComponent(keyword)}`,
            CACHE_OPTIONS.NO_STORE
        );
        const data: SearchResponse = await res.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
}

export async function fetchVIPDramas(): Promise<Drama[]> {
    try {
        // Server-side: call external API directly
        const res = await fetch(
            `${API_BASE_URL}${API_ENDPOINTS.POPULAR}?type=vip`,
            CACHE_OPTIONS.NO_STORE
        );
        const data: DramaListResponse = await res.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching VIP dramas:', error);
        return [];
    }
}

export const API_BASE_URL = 'https://dramabox.bagahproject.dev/api';
export const API_BASE_URL_CHAPTERS = 'https://api.megawe.net/api/dramabox';
export const API_BASE_URL_DETAIL = 'https://api.megawe.net/api/dramabox';
export const API_BASE_URL_CHAPTERS_2 = 'https://dramabox.sansekai.my.id/api/dramabox';

export const API_ENDPOINTS = {
  POPULAR: '/popular',
  DETAIL: '/detail',
  CHAPTERS: '/allepisode',
  SEARCH: '/search',
} as const;

export const CACHE_OPTIONS = {
  NO_STORE: { cache: 'no-store' as const },
} as const;

import { Chapter } from '@/types';

export function getVideoUrl(chapter: Chapter): string {
  if (!chapter.cdnList || chapter.cdnList.length === 0) return '';
  
  // Get the default CDN
  const defaultCdn = chapter.cdnList.find(cdn => cdn.isDefault === 1) || chapter.cdnList[0];
  if (!defaultCdn) return '';

  // Get the default video quality (usually 720p)
  const defaultVideo = defaultCdn.videoPathList.find(v => v.isDefault === 1) 
    || defaultCdn.videoPathList[0];
  
  return defaultVideo?.videoPath || '';
}

export function separateEpisodesByType(episodes: Chapter[]) {
  const freeEpisodes = episodes.filter(ep => ep.isCharge === 0).length;
  const paidEpisodes = episodes.filter(ep => ep.isCharge === 1).length;
  
  return { freeEpisodes, paidEpisodes };
}

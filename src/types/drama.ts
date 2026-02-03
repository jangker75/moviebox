export interface TagV3 {
  tagName: string;
}

export interface Drama {
  bookId: string;
  bookName: string;
  coverWap: string;
  introduction: string;
  chapterCount: number;
  tagV3s?: TagV3[];
}

export interface Chapter {
  chapterId: string;
  chapterIndex: number;
  isCharge: number;
  isPay?: number;
  chapterName?: string;
  cdnList?: CdnList[];
  chapterImg?: string;
  chapterType?: number;
  needInterstitialAd?: number;
  useMultiSubtitle?: number;
  viewingDuration?: number;
  spriteSnapshotUrl?: string;
  chargeChapter?: boolean;
  senseRightsLoadInfo?: {
    desc: string;
  };
}

export interface VideoPath {
  quality: number;
  videoPath: string;
  isDefault: number;
  isEntry: number;
  isVipEquity: number;
}

export interface CdnList {
  cdnDomain: string;
  isDefault: number;
  videoPathList: VideoPath[];
}

export interface RatingConf {
  showRate: boolean;
  rate: string;
  ratingCount: string;
}

export interface DetailData {
  list: Chapter[];
  ratingConf: RatingConf;
  bookName?: string;
  coverWap?: string;
  introduction?: string;
}

export interface SearchDrama {
  bookId: string;
  bookName: string;
  introduction: string;
  author: string;
  cover: string;
  inLibraryCount: number;
  sort: number;
  protagonist: string;
  tagNames: string[];
  markNamesConnectKey: string;
  inLibrary: boolean;
  corner?: {
    cornerType: number;
    name: string;
    color: string;
  };
}

export interface SearchMeta {
  keyword: string;
  timestamp: string;
}

export interface SearchData {
  data: SearchDrama[];
  meta: SearchMeta;
}

export interface LatestDrama {
  bookId: string;
  bookName: string;
  coverWap: string;
  chapterCount: number;
  introduction: string;
  tags: string[];
  tagV3s?: TagV3[];
  isEntry: number;
  index: number;
  corner?: {
    cornerType: number;
    name: string;
    color: string;
  };
  rankVo?: {
    rankType: number;
    hotCode: string;
    recCopy: string;
    sort: number;
  };
  playCount: string;
  bookShelfTime: number;
  shelfTime: string;
  inLibrary: boolean;
}

export interface LatestMeta {
  pageNo: number;
  pageSize: number;
  hasMore: boolean;
  timestamp: string;
}

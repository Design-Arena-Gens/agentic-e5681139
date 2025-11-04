export type ContentType = 'tv' | 'movie';
export type WatchStatus = 'watching' | 'watched' | 'watchlist';

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  status: WatchStatus;
  posterUrl: string;
  releaseDate: string;
  rating: number;
  genres: string[];
  overview: string;
  nextEpisode?: string;
}

export interface Notification {
  id: string;
  itemId: string;
  title: string;
  message: string;
  date: string;
  type: ContentType;
  read: boolean;
}

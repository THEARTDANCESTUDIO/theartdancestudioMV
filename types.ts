
export type Language = 'EN' | 'KO' | 'JA' | 'ZH';

export interface Video {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  thumbnail: string;
  category: string;
}

export interface NavLink {
  labelKey: keyof typeof import('./constants.ts').TRANSLATIONS['EN']['nav'];
  href: string;
}

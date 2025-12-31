
import { Video, NavLink } from './types.ts';

export const NAV_LINKS: NavLink[] = [
  { label: 'DANCERS', href: '#' },
  { label: 'CLASSES', href: '#' },
  { label: 'TICKETS', href: '#' },
  { label: 'STORE', href: '#' },
  { label: 'ABOUT', href: '#' },
  { label: 'MY ACCOUNT', href: '#' },
];

export const KPOP_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'How You Like That',
    artist: 'BLACKPINK',
    youtubeId: 'ioNng23DkIM',
    thumbnail: 'https://img.youtube.com/vi/ioNng23DkIM/maxresdefault.jpg',
    category: 'CHOREOGRAPHY'
  },
  {
    id: '2',
    title: 'Super Shy',
    artist: 'NewJeans',
    youtubeId: 'ArmDp-zijuc',
    thumbnail: 'https://img.youtube.com/vi/ArmDp-zijuc/maxresdefault.jpg',
    category: 'TRENDING'
  },
  {
    id: '3',
    title: 'Drama',
    artist: 'aespa',
    youtubeId: 'D8VEcvp7nVY',
    thumbnail: 'https://img.youtube.com/vi/D8VEcvp7nVY/maxresdefault.jpg',
    category: 'POWER'
  },
  {
    id: '4',
    title: 'Perfect Night',
    artist: 'LE SSERAFIM',
    youtubeId: 'hLvWy2b857I',
    thumbnail: 'https://img.youtube.com/vi/hLvWy2b857I/maxresdefault.jpg',
    category: 'POP'
  },
  {
    id: '5',
    title: 'Magnetic',
    artist: 'ILLIT',
    youtubeId: 'Vk5-c_v4gMU',
    thumbnail: 'https://img.youtube.com/vi/Vk5-c_v4gMU/maxresdefault.jpg',
    category: 'DEBUT'
  },
  {
    id: '6',
    title: 'Baddie',
    artist: 'IVE',
    youtubeId: 'Da4P2uT4mVc',
    thumbnail: 'https://img.youtube.com/vi/Da4P2uT4mVc/maxresdefault.jpg',
    category: 'STYLE'
  }
];

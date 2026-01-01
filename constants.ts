
import { Video } from './types.ts';

export const TRANSLATIONS = {
  EN: {
    nav: {
      dancers: 'DANCERS',
      classes: 'CLASSES',
      tickets: 'TICKETS',
      store: 'STORE',
      about: 'ABOUT',
      account: 'MY ACCOUNT'
    },
    gallery: {
      title: 'K-POP MUSIC VIDEO',
      play: 'PLAY VIDEO'
    },
    footer: {
      faq: 'FAQ',
      anyQuestions: 'ANY QUESTIONS?',
      faqDesc: 'Check our frequently asked questions for quick answers about our programs.',
      contact: 'CONTACT US',
      getInTouch: 'GET IN TOUCH',
      contactDesc: 'Our team is here to help you start your journey with THEART.',
      office: 'DANCE STUDIO HEAD OFFICE',
      terms: 'TERMS',
      privacy: 'PRIVACY'
    },
    admin: {
      title: 'ADMIN MODE : CONTENT MANAGER',
      addNew: 'Add New Video',
      manage: 'Manage Playlist',
      fieldTitle: 'Title',
      fieldArtist: 'Artist',
      fieldYoutube: 'YouTube Video ID',
      addBtn: 'ADD TO LIST'
    }
  },
  KO: {
    nav: {
      dancers: '댄서',
      classes: '클래스',
      tickets: '티켓',
      store: '스토어',
      about: '정보',
      account: '내 계정'
    },
    gallery: {
      title: 'K-POP 뮤직 비디오',
      play: '영상 재생'
    },
    footer: {
      faq: '자주 묻는 질문',
      anyQuestions: '궁금한 점이 있으신가요?',
      faqDesc: '프로그램에 대한 빠른 답변은 자주 묻는 질문을 확인하세요.',
      contact: '문의하기',
      getInTouch: '연락처',
      contactDesc: '저희 팀이 THEART와 함께하는 여정을 도와드립니다.',
      office: '댄스 스튜디오 본사',
      terms: '이용약관',
      privacy: '개인정보처리방침'
    },
    admin: {
      title: '관리자 모드 : 컨텐츠 관리',
      addNew: '새 영상 추가',
      manage: '플레이리스트 관리',
      fieldTitle: '제목',
      fieldArtist: '아티스트',
      fieldYoutube: '유튜브 영상 ID',
      addBtn: '목록에 추가'
    }
  },
  JA: {
    nav: {
      dancers: 'ダンサー',
      classes: 'クラス',
      tickets: 'チケット',
      store: 'ストア',
      about: '概要',
      account: 'マイアカウント'
    },
    gallery: {
      title: 'K-POP ミュージックビデオ',
      play: 'ビデオを再生'
    },
    footer: {
      faq: 'よくある質問',
      anyQuestions: 'ご質問がありますか？',
      faqDesc: 'プログラムに関する迅速な回答については、よくある質問を確認してください。',
      contact: 'お問い合わせ',
      getInTouch: '連絡を取る',
      contactDesc: '私たちのチームは、あなたがTHEARTでの旅を始めるのを手伝うためにここにいます。',
      office: 'ダンススタジオ本社',
      terms: '利用規約',
      privacy: 'プライバシーポリシー'
    },
    admin: {
      title: '管理者モード：コンテンツマネージャー',
      addNew: '新しいビデオを追加',
      manage: 'プレイリストの管理',
      fieldTitle: 'タイトル',
      fieldArtist: 'アーティスト',
      fieldYoutube: 'YouTubeビデオID',
      addBtn: 'リストに追加'
    }
  },
  ZH: {
    nav: {
      dancers: '舞者',
      classes: '课程',
      tickets: '门票',
      store: '商店',
      about: '关于',
      account: '我的账户'
    },
    gallery: {
      title: 'K-POP 音乐视频',
      play: '播放视频'
    },
    footer: {
      faq: '常见问题',
      anyQuestions: '有什么问题吗？',
      faqDesc: '查看我们的常见问题，快速了解我们的项目。',
      contact: '联系我们',
      getInTouch: '取得联系',
      contactDesc: '我们的团队在这里帮助您开启THEART之旅。',
      office: '舞蹈工作室总部',
      terms: '条款',
      privacy: '隐私'
    },
    admin: {
      title: '管理员模式：内容管理器',
      addNew: '添加新视频',
      manage: '管理播放列表',
      fieldTitle: '标题',
      fieldArtist: '艺术家',
      fieldYoutube: 'YouTube 视频 ID',
      addBtn: '添加到列表'
    }
  }
} as const;

export const NAV_LINKS: { labelKey: keyof typeof TRANSLATIONS.EN.nav; href: string }[] = [
  { labelKey: 'dancers', href: '#' },
  { labelKey: 'classes', href: '#' },
  { labelKey: 'tickets', href: '#' },
  { labelKey: 'store', href: '#' },
  { labelKey: 'about', href: '#' },
  { labelKey: 'account', href: '#' },
];

export const KPOP_VIDEOS: Video[] = [
  {
    id: "v-wicked",
    title: "WICKED",
    artist: "ALLDAY PROJECT",
    youtubeId: "HHl2E6o60zo",
    thumbnail: "https://img.youtube.com/vi/HHl2E6o60zo/maxresdefault.jpg",
    category: "THEART M/V"
  },
  {
    id: "v-aespa",
    title: "Whiplash",
    artist: "aespa",
    youtubeId: "fEBETzsJenI",
    thumbnail: "https://img.youtube.com/vi/fEBETzsJenI/maxresdefault.jpg",
    category: "THEART M/V"
  },
  {
    id: "v-kiikii",
    title: "I DO ME",
    artist: "KiiiKiii",
    youtubeId: "ttn39TB4zaM",
    thumbnail: "https://img.youtube.com/vi/ttn39TB4zaM/maxresdefault.jpg",
    category: "THEART M/V"
  },
  {
    id: "v-magnetic",
    title: "Magnetic",
    artist: "ILLIT",
    youtubeId: "NwK2IzHWi6k",
    thumbnail: "https://img.youtube.com/vi/NwK2IzHWi6k/maxresdefault.jpg",
    category: "THEART M/V"
  },
  {
    id: "v-cherish",
    title: "Cherish",
    artist: "ILLIT",
    youtubeId: "1D1kbBwE1_E",
    thumbnail: "https://img.youtube.com/vi/1D1kbBwE1_E/maxresdefault.jpg",
    category: "THEART M/V"
  },
  {
    id: "v-antifragile",
    title: "ANTIFRAGILE",
    artist: "LE SSERAFIM",
    youtubeId: "Sy5EznfmXS8",
    thumbnail: "https://img.youtube.com/vi/Sy5EznfmXS8/maxresdefault.jpg",
    category: "THEART M/V"
  }
];

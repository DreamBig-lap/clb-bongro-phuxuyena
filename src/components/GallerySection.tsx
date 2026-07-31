import { useEffect, useState, useCallback } from 'react';
import { Images, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

// Tự định nghĩa Type độc lập để không phụ thuộc vào Supabase
export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  category: 'match' | 'training' | 'event';
  image_url: string;
  event_date?: string;
  sort_order?: number;
  created_at?: string;
}

const CATEGORIES = [
  { key: 'all', label: 'Tất cả' },
  { key: 'match', label: 'Thi đấu' },
  { key: 'training', label: 'Tập luyện' },
  { key: 'event', label: 'Sự kiện' },
] as const;

// Dữ liệu ảnh mẫu chuẩn TypeScript
const MOCK_GALLERY: GalleryItem[] = [
  {
    id: '1',
    title: 'Giải đấu giao hữu mở rộng 2026',
    description: 'Trận thi đấu kịch tính giữa CLB Bóng rổ Phú Xuyên A và các đội bạn.',
    category: 'match',
    image_url: 'https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/494950011_1161112282696722_8420268140078712639_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1366&ctp=s2048x1366&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGal8ymh4B16hmxK5gc1nDIVcOC1w3jteNVw4LXDeO147TfT7H9QZNBVjYO_9FgrJLPfMt2BHAlthlN-4tdIs6f&_nc_ohc=lqkowqn79hQQ7kNvwHU7Cqq&_nc_oc=AdpKfqjxiCIGNGXhKuNcRshqIuWfGAFn1_5qYk4m66AQ0af677aGZ0L6iPP4aaBSX6g&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=BHZITEveq03zHdDASwW5dQ&_nc_ss=7b2a8&oh=00_AQE6Gs_5cBzVH4X1XLm_75-siJKCGxz6oZCe1SCbGFK2EQ&oe=6A715584',
    event_date: '2026-05-15',
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Buổi tập luyện thể lực & kỹ thuật ném bóng',
    description: 'Rèn luyện phản xạ và chiến thuật thi đấu 3x3 ngoài trời.',
    category: 'training',
    image_url: 'https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/485975788_1124813812993236_8001600613985389647_n.jpg?stp=dst-jpg_tt6&cstp=mx1276x956&ctp=s1276x956&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEoJGfLCuFIaLlEAudWEo0hyDUbhcsn_FHINRuFyyf8UW8Kjz4bw_xaTc2kbVsjm1VLFhqIVcmyGvOLfOk-h1RI&_nc_ohc=FNcqEXeXA7EQ7kNvwHH_eFO&_nc_oc=AdpFrsdFl54tfu1LFVDpD7HTiYwi8pjwZ7oSCDgTXmCM7fyhfHxqUBXuLxyrgq-nbes&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=nl_Bmfc5UiuDWOOhMzjezg&_nc_ss=7b2a8&oh=00_AQEi6oHap5TFaJbVdpI-751hHH1fdmX12PuyJ6GkSTOYmw&oe=6A713986',
    event_date: '2026-05-10',
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Sự kiện giao lưu và tuyển thành viên mới',
    description: 'Chào đón các bạn học sinh có niềm đam mê trái bóng cam gia nhập CLB.',
    category: 'event',
    image_url: 'https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/484569691_1121764739964810_8474559517898334924_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1536&ctp=s2048x1536&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFa5w94wGWS--M7-FG6GCFNYhl1huC0UsliGXWG4LRSyXO52CJBtw0i9kTVp1D942CuBa8nR0yP_mJ0dQiLyam3&_nc_ohc=VN1NSVUktUIQ7kNvwHQ9j01&_nc_oc=AdrkTo9PdFDn9hybu8r1KddC9Otsk3QQKQHm2yPcJeruPNP9c6MDh8f9eUP2zGWTsCs&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=SlGhwIzQWYdHLkDggu_sIw&_nc_ss=7b2a8&oh=00_AQHSymW4gC0zI3nMP82Ry-5eDdsKVKQ90R7LETLS2B4YqA&oe=6A713ECF',
    event_date: '2026-04-20',
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Chung kết giải bóng rổ học sinh',
    description: 'Những giây phút bùng nổ cảm xúc trên sân đấu.',
    category: 'match',
    image_url: 'https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/483955972_1117245307083420_1355520276498518355_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx1152x2048&ctp=s1152x2048&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF42UUQuGlC-lf6qSMDn5Url5CzgU854nSXkLOBTznidEgfrOJM5Ar_kdpvc-aBZIpOIBJBSLXEpSk4lvlFFD1Y&_nc_ohc=FzIfLQVzlKIQ7kNvwH1Xi5Y&_nc_oc=Adq943F1IUMa-FSSqf4aAoeaAFam9l0Ot_DRF_lf-gK7ybiu0mlf3rel_znkbgrE7XU&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=qJOoUMjp4rH3mEsegAQPsA&_nc_ss=7b2a8&oh=00_AQGEFFcInOxPWolSvfHPNT-demv4K9_b7ii6Wi9Nqu5QtA&oe=6A713E00',
    event_date: '2026-04-05',
    sort_order: 4,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Rèn luyện kỹ năng phòng thủ & nhồi bóng',
    description: 'Tập trung nâng cao thể lực và sự ăn ý giữa các đồng đội.',
    category: 'training',
    image_url: 'https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/472413150_1063611369113481_1079536177626398776_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1537&ctp=s2048x1537&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHgw1owk-ERgCli0OKPGSiWAcQNS8VipUwBxA1LxWKlTLTCO4VStYPQ93GZ85HmVH-pyAvzz4rEKdUOQ4yG_XVA&_nc_ohc=kMANEGN-tr0Q7kNvwGSKl8_&_nc_oc=AdqiEx3J7SIuTS09sIkVa5tETSlgL3TKdLKWCpWAgtpH-bIoaM5Fxjl9HPk9tt7YouY&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=JbwmSkEWQjyh-51tJLpLIg&_nc_ss=7b2a8&oh=00_AQGWsMfNDvuwX36EP809d05Wuewi4jcGZ-hn8YzS0swqwQ&oe=6A7144AA',
    event_date: '2026-03-28',
    sort_order: 5,
    created_at: new Date().toISOString()
  }
];

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<(typeof CATEGORIES)[number]['key']>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    setItems(MOCK_GALLERY);
    setLoading(false);
  }, []);

  const filtered = items.filter((i) => tab === 'all' || i.category === tab);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, closeLightbox, prev, next]);

  return (
    <section id="gallery" className="relative bg-ink-950 py-24">
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-brand-600/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-500">
            <Images className="h-4 w-4" />
            Ảnh sự kiện
          </div>
          <h2 className="font-display text-4xl text-white sm:text-5xl text-balance">
            Khoảnh khắc CLB
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-300 sm:text-lg">
            Những hình ảnh từ các buổi tập luyện, trận đấu và sự kiện của
            CLB Bóng rổ Phú Xuyên A.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center rounded-xl border border-ink-700 bg-ink-900 p-1">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setTab(c.key)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all sm:px-5 ${
                  tab === c.key
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-600/30'
                    : 'text-ink-300 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="mt-12 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-ink-700 border-t-brand-500" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="mt-12 text-center text-ink-400">Chưa có ảnh nào.</p>
        ) : (
          <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((item, idx) => {
              const span = idx % 5 === 0 ? 'sm:col-span-2 sm:row-span-2' : '';
              return (
                <button
                  key={item.id}
                  onClick={() => setLightbox(idx)}
                  className={`group relative overflow-hidden rounded-2xl border border-ink-700/60 ${span}`}
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                    <span
                      className={`mb-1.5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        item.category === 'match'
                          ? 'bg-brand-500/90 text-white'
                          : item.category === 'training'
                          ? 'bg-ink-900/90 text-brand-400'
                          : 'bg-white/90 text-ink-900'
                      }`}
                    >
                      {item.category === 'match'
                        ? 'Thi đấu'
                        : item.category === 'training'
                        ? 'Tập luyện'
                        : 'Sự kiện'}
                    </span>
                    <h3 className="text-sm font-bold text-white line-clamp-2 sm:text-base">
                      {item.title}
                    </h3>
                    {item.event_date && (
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-300">
                        <Calendar className="h-3 w-3" />
                        {formatDate(item.event_date)}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/95 p-4 animate-fade-in backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-ink-900/80 p-2.5 text-white transition-colors hover:bg-brand-500"
            onClick={closeLightbox}
            aria-label="Đóng"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-ink-900/80 p-3 text-white transition-colors hover:bg-brand-500 sm:left-6"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-ink-900/80 p-3 text-white transition-colors hover:bg-brand-500 sm:right-6"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Ảnh sau"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <figure
            className="max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightbox].image_url}
              alt={filtered[lightbox].title}
              className="max-h-[78vh] w-full object-contain"
            />
            <figcaption className="bg-ink-900/90 px-6 py-4">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                    filtered[lightbox].category === 'match'
                      ? 'bg-brand-500 text-white'
                      : filtered[lightbox].category === 'training'
                      ? 'bg-ink-800 text-brand-400'
                      : 'bg-white text-ink-900'
                  }`}
                >
                  {filtered[lightbox].category === 'match'
                    ? 'Thi đấu'
                    : filtered[lightbox].category === 'training'
                    ? 'Tập luyện'
                    : 'Sự kiện'}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {filtered[lightbox].title}
                </h3>
              </div>
              {filtered[lightbox].description && (
                <p className="mt-2 text-sm text-ink-300">
                  {filtered[lightbox].description}
                </p>
              )}
              {filtered[lightbox].event_date && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-400">
                  <Calendar className="h-3 w-3" />
                  {formatDate(filtered[lightbox].event_date)}
                </p>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
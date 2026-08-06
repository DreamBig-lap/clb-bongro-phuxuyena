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
    image_url: '/anha.jpg',
    event_date: '2026-05-15',
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Buổi tập luyện thể lực & kỹ thuật ném bóng',
    description: 'Rèn luyện phản xạ và chiến thuật thi đấu 3x3 ngoài trời.',
    category: 'training',
    image_url: '/anhb.jpg',
    event_date: '2026-05-10',
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Sự kiện giao lưu và tuyển thành viên mới',
    description: 'Chào đón các bạn học sinh có niềm đam mê trái bóng cam gia nhập CLB.',
    category: 'event',
    image_url: '/anhc.jpg',
    event_date: '2026-04-20',
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Chung kết giải bóng rổ học sinh',
    description: 'Những giây phút bùng nổ cảm xúc trên sân đấu.',
    category: 'match',
    image_url: '/anhd.jpg',
    event_date: '2026-04-05',
    sort_order: 4,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Rèn luyện kỹ năng phòng thủ & nhồi bóng',
    description: 'Tập trung nâng cao thể lực và sự ăn ý giữa các đồng đội.',
    category: 'training',
    image_url: '/anhe.jpg',
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
    <section id="gallery" className="relative bg-ink-950 py-24 border-t border-ink-800/50">
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

        {/* Tabs với hiệu ứng kính mờ */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center rounded-xl border border-white/10 bg-white/5 p-1.5 backdrop-blur-md">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setTab(c.key)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all sm:px-5 ${
                  tab === c.key
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
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
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-brand-500" />
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
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-brand-500/60 hover:shadow-xl ${span}`}
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent opacity-85 transition-opacity group-hover:opacity-95" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                    <span
                      className={`mb-1.5 inline-block rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        item.category === 'match'
                          ? 'bg-brand-500 text-white'
                          : item.category === 'training'
                          ? 'bg-white/10 text-brand-400 border border-white/10'
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
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-300">
                        <Calendar className="h-3 w-3 text-brand-500" />
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/95 p-4 animate-fade-in backdrop-blur-md"
          onClick={closeLightbox}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-brand-500 border border-white/10 backdrop-blur-md"
            onClick={closeLightbox}
            aria-label="Đóng"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-brand-500 border border-white/10 backdrop-blur-md sm:left-6"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-brand-500 border border-white/10 backdrop-blur-md sm:right-6"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Ảnh sau"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <figure
            className="max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightbox].image_url}
              alt={filtered[lightbox].title}
              className="max-h-[78vh] w-full object-contain bg-black/40"
            />
            <figcaption className="bg-ink-900/90 px-6 py-4 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                    filtered[lightbox].category === 'match'
                      ? 'bg-brand-500 text-white'
                      : filtered[lightbox].category === 'training'
                      ? 'bg-white/10 text-brand-400 border border-white/10'
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
                <p className="mt-2 flex items-center gap-1.5 text-xs text-brand-400">
                  <Calendar className="h-3.5 w-3.5" />
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
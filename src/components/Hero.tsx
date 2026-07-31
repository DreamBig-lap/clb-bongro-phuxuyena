import { Dribbble, ChevronDown, Activity, Flame, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

const heroImages = ['/hero-1.jpg', '/hero-2.jpg', '/hero-3.jpg'];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      
      {/* Background Slider */}
      <div className="absolute inset-0">
        {heroImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        {/* Gradients (giữ nguyên để ảnh trông chuyên nghiệp) */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/50" />
      </div>

      {/* Decorative orange glow */}
      <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 h-72 w-72 rounded-full bg-brand-600/10 blur-3xl" />

      {/* Floating basketball */}
      <div className="pointer-events-none absolute right-[8%] top-[18%] hidden lg:block">
        <div className="animate-float">
          <Dribbble className="h-28 w-28 text-brand-500/30" strokeWidth={1} />
        </div>
      </div>

      {/* Content (giữ nguyên không đổi) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-brand-400">
            <Flame className="h-4 w-4" />
            Câu lạc bộ bóng rổ Trường THPT Phú Xuyên A, Hà Nội
          </div>
          <h1 className="font-display text-6xl leading-[0.95] text-white sm:text-7xl lg:text-8xl text-balance animate-fade-up">
            CLB BÓNG RỔ
            <span className="block text-brand-500">PHÚ XUYÊN A</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200 sm:text-xl animate-fade-up">
            Bền bỉ, tốc độ, tinh thần đồng đội — chúng tôi xây dựng thế hệ bóng rổ mới của Phú Xuyên. Tham gia hành trình chinh phục mọi cú ném
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up">
            <a href="#join" className="group inline-flex items-center gap-2 rounded-xl bg-brand-500 px-7 py-3.5 text-base font-bold uppercase tracking-wide text-white shadow-xl shadow-brand-600/30 transition-all hover:bg-brand-400 hover:shadow-brand-500/50">
              Đăng ký gia nhập
              <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a href="#schedule" className="inline-flex items-center gap-2 rounded-xl border border-ink-600 bg-ink-900/50 px-7 py-3.5 text-base font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-all hover:border-brand-500 hover:bg-ink-800">
              Xem lịch thi đấu
            </a>
          </div>
          <div className="mt-14 grid max-w-lg grid-cols-3 gap-4 animate-fade-up">
            <Stat icon={<Trophy className="h-5 w-5" />} value="8+" label="Mùa giải" />
            <Stat icon={<Activity className="h-5 w-5" />} value="20+" label="Thành viên" />
            <Stat icon={<Flame className="h-5 w-5" />} value="2x/tuần" label="Lịch tập" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-ink-700/60 bg-ink-900/40 p-4 backdrop-blur-sm">
      <div className="mb-1.5 flex items-center gap-1.5 text-brand-400">{icon}</div>
      <div className="font-display text-3xl text-white">{value}</div>
      <div className="text-xs font-medium uppercase tracking-wider text-ink-400">{label}</div>
    </div>
  );
}
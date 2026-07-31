import { useEffect, useState } from 'react';
import { Menu, X, Dribbble } from 'lucide-react';
import LogoFlames from '../assets/logo-flames.png'; 
const NAV_LINKS = [
  { href: '#home', label: 'Trang chủ' },
  { href: '#schedule', label: 'Lịch tập & Thi đấu' },
  { href: '#roster', label: 'Đội hình' },
  { href: '#gallery', label: 'Ảnh sự kiện' },
  { href: '#join', label: 'Đăng ký gia nhập' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink-950/90 backdrop-blur-md border-b border-ink-800 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3">
          <img 
  src={LogoFlames} 
  alt="Logo FLAMES" 
  className="h-14 w-14 object-contain" 
/>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-wide text-white">
              PHÚ XUYÊN A
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400">
              Basketball Club
            </span>
          </div>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative rounded-lg px-4 py-2 text-sm font-medium text-ink-200 transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-brand-500 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#join"
          className="hidden rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-600/30 transition-all hover:bg-brand-400 hover:shadow-brand-500/40 lg:inline-block"
        >
          Gia nhập CLB
        </a>

        <button
          className="rounded-lg p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Mở menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-800 bg-ink-950/95 backdrop-blur-md lg:hidden">
          <ul className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-ink-200 transition-colors hover:bg-ink-800 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#join"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-lg bg-brand-500 px-4 py-3 text-center text-base font-bold uppercase tracking-wide text-white"
              >
                Gia nhập CLB
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

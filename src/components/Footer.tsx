import { Dribbble, MapPin, Phone, Mail, Facebook, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700">
                <Dribbble className="h-6 w-6 text-white" strokeWidth={2.2} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl tracking-wide text-white">
                  PHÚ XUYÊN A
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400">
                  Basketball Club
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              Câu lạc bộ bóng rổ của huyện Phú Xuyên, Hà Nội. Rèn luyện thể
              thao, xây dựng tinh thần đồng đội và cống hiến cho cộng đồng.
            </p>
            <a
  href="https://www.facebook.com/PFClubpxa"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-5 inline-flex items-center gap-2 rounded-lg border border-ink-700 px-4 py-2 tex..."
>
  <Facebook className="h-4 w-4 text-brand-400" />
  <span>Facebook CLB</span>
</a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Liên kết nhanh
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '#home', label: 'Trang chủ' },
                { href: '#schedule', label: 'Lịch tập & Thi đấu' },
                { href: '#roster', label: 'Đội hình thành viên' },
                { href: '#gallery', label: 'Ảnh sự kiện' },
                { href: '#join', label: 'Đăng ký gia nhập' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-ink-400 transition-colors hover:text-brand-400"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Liên hệ
            </h4>
            <ul className="space-y-3 text-sm text-ink-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                <span>Trường THPT Phú Xuyên A</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-brand-500" />
                <span>0962253085</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-brand-500" />
                <span>pf.b.pxa@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                <span>Tập luyện: 17:00 – 19:00, Thứ 2 & Thứ 6 hàng tuần</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-800 pt-6 text-sm text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} CLB Bóng rổ Phú Xuyên A. Đã đăng ký.</p>
          <p className="text-ink-600">
            Thiết kế bởi ManhCuong.
          </p>
        </div>
      </div>
    </footer>
  );
}

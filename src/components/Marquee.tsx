import { Dribbble } from 'lucide-react';

const ITEMS = [
  'BỀN BỈ',
  'TỐC ĐỘ',
  'ĐỒNG ĐỘI',
  'KHÔNG NGẠI KHÓ',
  'KIỆN TƯỚNG',
  'CẦU TIẾN',
  'CHIẾN ĐẤU',
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-brand-600/30 bg-brand-500 py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex items-center" aria-hidden={rep === 1}>
            {ITEMS.map((item) => (
              <span key={item} className="flex items-center">
                <span className="font-display text-2xl uppercase tracking-wider text-white sm:text-3xl">
                  {item}
                </span>
                <Dribbble
                  className="mx-6 h-6 w-6 text-white/70"
                  strokeWidth={1.5}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

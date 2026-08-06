import { useState } from 'react';
import { Calendar, MapPin, Clock, Info, Users, Dumbbell, Trophy } from 'lucide-react';

export interface ScheduleItem {
  id: string;
  type: 'practice' | 'match';
  title: string;
  opponent?: string;
  location: string;
  date: string; // YYYY-MM-DD
  time_start: string;
  time_end: string;
  description?: string;
  day_label: string; // T2, T4, CN...
  day_number: string; // 3, 5, 9...
  month_label: string; // Th8, Th9...
}

const MOCK_SCHEDULES: ScheduleItem[] = [
  {
    id: '1',
    type: 'practice',
    title: 'Tập tổng hợp - Chiến thuật & Thể lực',
    location: 'Sân bóng rổ trường THPT Phú Xuyên A',
    date: '2026-08-03',
    time_start: '17:00',
    time_end: '18:00',
    description: 'Tập trung vào chiến thuật phòng ngự khu vực.',
    day_label: 'T2',
    day_number: '3',
    month_label: 'Th8',
  },
  {
    id: '2',
    type: 'practice',
    title: 'Tập kỹ thuật cá nhân - Ném & Chuyền',
    location: 'Sân bóng rổ trường THPT Phú Xuyên A',
    date: '2026-08-05',
    time_start: '17:30',
    time_end: '18:30',
    description: 'Mang theo giày tập và khăn.',
    day_label: 'T4',
    day_number: '5',
    month_label: 'Th8',
  },
  {
    id: '3',
    type: 'practice',
    title: 'Tập chiến thuật - Phản công',
    location: 'Sân bóng rổ trường THPT Phú Xuyên A',
    date: '2026-08-10',
    time_start: '17:00',
    time_end: '18:00',
    description: 'Rèn luyện tốc độ đẩy bóng và chạy chỗ phản công nhanh.',
    day_label: 'T2',
    day_number: '10',
    month_label: 'Th8',
  },
  {
    id: '4',
    type: 'practice',
    title: 'Tập phục hồi & Đánh giá thể lực',
    location: 'Sân bóng rổ trường THPT Phú Xuyên A',
    date: '2026-08-17',
    time_start: '17:00',
    time_end: '18:00',
    description: 'Đo đạc chỉ số bật nhảy và thi đấu nội bộ nhẹ nhàng.',
    day_label: 'T2',
    day_number: '17',
    month_label: 'Th8',
  },
  {
    id: '5',
    type: 'match',
    title: 'Chưa có lịch đấu cụ thể',
    opponent: '',
    location: '',
    date: '',
    time_start: '',
    time_end: '',
    description: '',
    day_label: '',
    day_number: '',
    month_label: '',
  },
  {
    id: '6',
    type: 'match',
    title: 'Chưa có lịch đấu cụ thể',
    opponent: '',
    location: '',
    date: '',
    time_start: '',
    time_end: '',
    description: '',
    day_label: '',
    day_number: '',
    month_label: '',
  },
];

export default function ScheduleSection() {
  const [filter, setFilter] = useState<'all' | 'practice' | 'match'>('all');

  const filteredSchedules = MOCK_SCHEDULES.filter((item) => {
    if (filter === 'practice') return item.type === 'practice';
    if (filter === 'match') return item.type === 'match';
    return true;
  });

  const practices = filteredSchedules.filter((i) => i.type === 'practice');
  const matches = filteredSchedules.filter((i) => i.type === 'match');

  return (
    <section id="schedule" className="relative bg-ink-950 py-24 border-t border-ink-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-500">
            <Calendar className="h-4 w-4" />
            Lịch trình
          </div>
          <h2 className="font-display text-4xl text-white sm:text-5xl">
            LỊCH TẬP & LỊCH THI ĐẤU
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-300 sm:text-lg">
            Theo dõi lịch trình hoạt động của CLB để không bỏ lỡ bất kỳ buổi tập hay trận đấu nào.
          </p>

          {/* Bộ lọc tab */}
          <div className="mt-8 inline-flex rounded-xl bg-white/5 p-1.5 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-lg px-6 py-2 text-sm font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                  : 'text-ink-400 hover:text-white'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilter('practice')}
              className={`rounded-lg px-6 py-2 text-sm font-semibold transition-all ${
                filter === 'practice'
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                  : 'text-ink-400 hover:text-white'
              }`}
            >
              Lịch tập
            </button>
            <button
              onClick={() => setFilter('match')}
              className={`rounded-lg px-6 py-2 text-sm font-semibold transition-all ${
                filter === 'match'
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                  : 'text-ink-400 hover:text-white'
              }`}
            >
              Lịch thi đấu
            </button>
          </div>
        </div>

        {/* Khung hiển thị danh sách */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Cột Lịch tập */}
          {(filter === 'all' || filter === 'practice') && (
            <div className={filter === 'practice' ? 'lg:col-span-2' : ''}>
              <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-500">
                <Dumbbell className="h-4 w-4" /> Lịch tập
              </h3>
              <div className="space-y-4">
                {practices.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:border-brand-500/60 hover:bg-white/10 hover:shadow-xl"
                  >
                    {/* Ô ngày tháng */}
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-white/10 border border-white/10 text-center backdrop-blur-sm">
                      <span className="text-xs font-bold text-ink-300 uppercase">{item.day_label}</span>
                      <span className="font-display text-xl font-bold text-white leading-none">{item.day_number}</span>
                      <span className="text-[10px] text-brand-400 font-semibold">{item.month_label}</span>
                    </div>

                    <div className="flex-1">
                      <span className="inline-block rounded-md bg-brand-500/20 px-2.5 py-0.5 text-[11px] font-bold text-brand-400 uppercase tracking-wider">
                        Tập luyện
                      </span>
                      <h4 className="mt-1.5 text-base font-bold text-white">{item.title}</h4>
                      
                      <div className="mt-3 flex flex-wrap gap-y-1 gap-x-4 text-xs text-ink-300">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-brand-500" /> {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-brand-500" /> {item.time_start} - {item.time_end}
                        </span>
                      </div>

                      {item.description && (
                        <p className="mt-2.5 flex items-start gap-1.5 text-xs text-ink-300 border-t border-white/10 pt-2">
                          <Info className="h-3.5 w-3.5 text-brand-500 shrink-0 mt-0.5" />
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cột Lịch thi đấu */}
          {(filter === 'all' || filter === 'match') && (
            <div className={filter === 'match' ? 'lg:col-span-2' : ''}>
              <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-500">
                <Trophy className="h-4 w-4" /> Lịch thi đấu
              </h3>
              <div className="space-y-4">
                {matches.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:border-brand-500/60 hover:bg-white/10 hover:shadow-xl"
                  >
                    {/* Ô ngày tháng thi đấu */}
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-500/80 text-center text-white shadow-lg shadow-brand-500/20 backdrop-blur-sm">
                      <span className="text-xs font-bold uppercase opacity-90">{item.day_label}</span>
                      <span className="font-display text-xl font-bold leading-none">{item.day_number}</span>
                      <span className="text-[10px] font-semibold opacity-90">{item.month_label}</span>
                    </div>

                    <div className="flex-1">
                      <span className="inline-block rounded-md bg-brand-500/20 px-2.5 py-0.5 text-[11px] font-bold text-brand-400 uppercase tracking-wider">
                        Thi đấu
                      </span>
                      <h4 className="mt-1.5 text-base font-bold text-white">{item.title}</h4>

                      {item.opponent && (
                        <p className="mt-1 text-xs font-semibold text-brand-400 flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" /> vs {item.opponent}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap gap-y-1 gap-x-4 text-xs text-ink-300">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-brand-500" /> {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-brand-500" /> {item.time_start} - {item.time_end}
                        </span>
                      </div>

                      {item.description && (
                        <p className="mt-2.5 flex items-start gap-1.5 text-xs text-ink-300 border-t border-white/10 pt-2">
                          <Info className="h-3.5 w-3.5 text-brand-500 shrink-0 mt-0.5" />
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
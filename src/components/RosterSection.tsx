import { useEffect, useState } from 'react';
import { UserCheck, Shield } from 'lucide-react';

export interface RosterMember {
  id: string;
  name: string;
  role: string;
  description?: string;
  image_url: string;
  category: 'coaching' | 'player';
  sort_order?: number;
}

// Danh sách 8 thành viên Ban Huấn Luyện & Điều Hành CLB Phú Xuyên A
const MOCK_ROSTER: RosterMember[] = [
  {
    id: '1',
    name: 'Nguyen Gia Hao',
    role: 'Chủ Nhiệm CLB',
    category: 'coaching',
    description: 'Phụ trách định hướng chiến lược, kết nối và quản lý chung các hoạt động của CLB.',
    image_url: '/anh1.jpg',
    sort_order: 1,
  },
  {
    id: '2',
    name: 'Nguyen Vuu',
    role: 'Phó Chủ Nhiệm CLB',
    category: 'coaching',
    description: 'Hỗ trợ điều hành CLB, đôn đốc các ban và giữ kỷ luật nội bộ.',
    image_url: '/anh5.jpg',
    sort_order: 2,
  },
  {
    id: '3',
    name: 'Huong Lan',
    role: 'Quản lý',
    category: 'coaching',
    description: 'Sắp xếp lịch trình, điểm danh thành viên và thu chi tài chính',
    image_url: '/anh3.jpg',
    sort_order: 3,
  },
  {
    id: '4',
    name: 'Mạnh Cường',
    role: 'Trưởng Ban Chuyên Môn',
    category: 'coaching',
    description: 'Xây dựng giáo án bài tập, trực tiếp chỉ đạo chiến thuật trong các trận đấu.',
    image_url: '/anh4.jpg',
    sort_order: 4,
  },
  {
    id: '5',
    name: 'Long Hoàng',
    role: 'Phó Ban Chuyên Môn',
    category: 'coaching',
    description: 'Hỗ trợ lên giáo án tập luyện, theo dõi chỉ số thể lực và phong độ thành viên..',
    image_url: '/anh5.jpg',
    sort_order: 5,
  },
  {
    id: '6',
    name: 'Hương Giang',
    role: 'Trưởng Ban Truyền Thông',
    category: 'coaching',
    description: 'Quản lý hình ảnh CLB, lên kế hoạch nội dung và vận hành Fanpage.',
    image_url: '/anh6.jpg',
    sort_order: 6,
  },
  {
    id: '7',
    name: 'Hải Yến ',
    role: ' Trưởng Ban design',
    category: 'coaching',
    description: 'Phụ trách thiết kế ấn phẩm, banner, poster và định hình phong cách hình ảnh cho CLB.',
    image_url: '/anh7.jpg',
    sort_order: 7,
  },
  {
    id: '8',
    name: 'Nhiên ',
    role: 'Phó Ban Design',
    category: 'coaching',
    description: 'Hỗ trợ thiết kế poster, banner và hoàn thiện các ấn phẩm hình ảnh cho CLB.',
    image_url: '/anh8.jpg',
    sort_order: 8,
  }
];

export default function RosterSection() {
  const [members, setMembers] = useState<RosterMember[]>([]);

  useEffect(() => {
    setMembers(MOCK_ROSTER);
  }, []);

  return (
    <section id="roster" className="relative bg-ink-950 py-24 border-t border-ink-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-500">
            <UserCheck className="h-4 w-4" />
            Đội hình
          </div>
          <h2 className="font-display text-4xl text-white sm:text-5xl">
            BAN HUẤN LƯYỆN & ĐIỀU HÀNH
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-300 sm:text-lg">
            Gặp gỡ 8 thành viên nòng cốt dẫn dắt và định hướng cho Bóng rổ Phú Xuyên A.
          </p>
        </div>

        {/* Khối hiển thị 8 thành viên BHL */}
        <div className="mt-16">
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-500 mb-6 flex items-center gap-2">
            <Shield className="h-4 w-4" /> Ban Điều Hành ({members.length} người)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((m) => (
              <div 
                key={m.id} 
                className="group relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/60 p-4 transition-all hover:border-brand-500/50 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/5] overflow-hidden rounded-xl bg-ink-800">
                    <img 
                      src={m.image_url} 
                      alt={m.name} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>
                  <div className="mt-4">
                    <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider block">
                      {m.role}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1">{m.name}</h4>
                    {m.description && (
                      <p className="text-xs text-ink-400 mt-2 leading-relaxed">
                        {m.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
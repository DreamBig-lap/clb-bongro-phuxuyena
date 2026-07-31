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
    image_url: 'https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/557115059_785287371023489_3518324047048411041_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1536&ctp=s960x960&_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeG0qQzs-slylEbPuYWFPrsOl39306JSoi6Xf3fTolKiLtR1Reiaua7JcWHzrXo2rJaXh00iTD-sP-_euiVYhsct&_nc_ohc=l2Q9ie8O-bQQ7kNvwEqcQus&_nc_oc=AdoIFbXen83r0xu1TJ0Eeckvhk5LnoFa96LdK7dkuBSTohiZIlhexTSDWytKDlLRMNE&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=T5gp63RDxh2KDnTJlfJrRA&_nc_ss=7b2a8&oh=00_AQHdawY-h2oi9JvyD5nos-yBbnZV2U6W2th7gYoJ4m59FA&oe=6A715462',
    sort_order: 1,
  },
  {
    id: '2',
    name: 'Nguyen Vuu',
    role: 'Phó Chủ Nhiệm CLB',
    category: 'coaching',
    description: 'Hỗ trợ điều hành CLB, đôn đốc các ban và giữ kỷ luật nội bộ.',
    image_url: 'https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/757851436_1722034476618849_6435126361791956456_n.jpg?stp=dst-jpg_tt6&cstp=mx736x736&ctp=s200x200&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEFW9URIxlg5D52fPRr3LfQeJuCLb7U4jx4m4ItvtTiPHy3CZv0rgCZa-XjYE_m7lKJH3sSplmPr2otCB7aoZvN&_nc_ohc=KDY2EiebKxcQ7kNvwHwBbta&_nc_oc=AdqA9myLvvQQ4WhcvEaNUCqzYMrpIgW9mi03VPnmonG2WpM_vt_oBTOiZtu-W0sZKek&_nc_zt=24&_nc_ht=scontent.fhan18-1.fna&_nc_gid=RIQQIVk8hq2rjjTj2OZQIQ&_nc_ss=7b2a8&oh=00_AQESExtEgrPR3tImkaufFwAgIWfYmEHfEHTQxw66e618tQ&oe=6A714DF7',
    sort_order: 2,
  },
  {
    id: '3',
    name: 'Huong Lan',
    role: 'Quản lý',
    category: 'coaching',
    description: 'Sắp xếp lịch trình, điểm danh thành viên và thu chi tài chính',
    image_url: 'https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/705410333_1350699123628299_7399874522825002230_n.jpg?stp=dst-jpg_tt6&cstp=mx668x677&ctp=s668x677&_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHZqc65Wx9aGcnkpyc71pPldIi_LuxtDrZ0iL8u7G0OtuBnXCZ2njm1urOuhj56hyIk6yvYhf3sa8HvquasPwYq&_nc_ohc=esPN89r8WaQQ7kNvwHUxt8I&_nc_oc=AdoihUu7FBKKHtmMSb8rorwQsoja1SzSPth-FWoVg9tQOE3nyHaCPhy7UeZNyhzy4Og&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=y8S_KdIfYq4eckUHh3YzEA&_nc_ss=7b2a8&oh=00_AQH_dGccwsutBVsi5zImlOeV0Wn-aGKUlp8AssIOWw2vtg&oe=6A714570',
    sort_order: 3,
  },
  {
    id: '4',
    name: 'Mạnh Cường',
    role: 'Trưởng Ban Chuyên Môn',
    category: 'coaching',
    description: 'Xây dựng giáo án bài tập, trực tiếp chỉ đạo chiến thuật trong các trận đấu.',
    image_url: 'https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/719782453_980223851549384_7932050941228941610_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x1546&ctp=s200x200&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFQ2_KEKOsPwZgzbPvyBI0g86HouWSVEsnzoei5ZJUSyXXelPe43VDxnw3kwgRtF-7FJATCyh2KkUfYaLxIuH5i&_nc_ohc=1MbKuVHL7U4Q7kNvwHfo6dR&_nc_oc=AdprpgrRx4EUaZnz9R9BjhxldiGMR4KTcnPrUdvLdcXL1vAoyCQ3hV-K9sHFZjPJgRc&_nc_zt=24&_nc_ht=scontent.fhan18-1.fna&_nc_gid=XgPyuc6YcPlDCHmKZlSphg&_nc_ss=7b2a8&oh=00_AQF_ZW5bC4Jyib53WZGSWcdP6fKzvMwhLNL4HlXO3Sjx5w&oe=6A71458F',
    sort_order: 4,
  },
  {
    id: '5',
    name: 'Long Hoàng',
    role: 'Phó Ban Chuyên Môn',
    category: 'coaching',
    description: 'Hỗ trợ lên giáo án tập luyện, theo dõi chỉ số thể lực và phong độ thành viên..',
    image_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAACUCAMAAADf7/luAAAAXVBMVEXj5Ohvc3bh5ejn6OxmZ2tscHO8vcHq6+9xcnZpbXDk6Otmam1sdHZiZmnt7vKBhIfX296IjI95e3/T1NimqayQk5bKztGanaBsbHG1ubzHyMxcYGOtsbSio6e1tbqUieU2AAAEmElEQVR4nO2c2ZajKhRAgRNksJ0Vo4n5/89sTCqrJistOBzrXvZD3pK1F3AGEUJIIBAIBAKBQCAQCAQC/yEYGz9AayCA7fISrZkGlhvTG1MRAAGH9AXQeV83MrlcLon9OMmm7vMDugro20zFStIHUsrz6Vy2/bFcGYg+44rTr3Als/5Ai4BpUyRW848dyu+yl8IcxlRcSzVKTZpSepbXFFvxjeFt3n8wtSt2OELWAtbEE3qfOTXYmhYxQ5TSuMFeAACDmiFqVQfk+YfoPEvU5oAIVRVI+T2J/mBa5piqaXuaKWqTVZviqUJ1nkpL08i4wjMV7bxwepv/VmCJgikdRCkt0cqqvs5Jpe/ENdr0Z3MD/wHPkDyhmh/4DxKkmBKOkz9OP05MpZlL5I/wDKf66/m59InUGKJg5pb8d84GQ1VEbpE/wiPNEExrd1NVY5hC42HaIpgC8TDlDUMYU1K4JilrWmCY5oXHmOKYOlb9u2mW75+mdDD9H5uy3xNRpHDvUHhBfkuNalDq/uDeS6lBYJjePEw7lA7Foz9VBsOUgEdEaZTYT53TFC9SFFPoXJ9Nkw5nTIE4j+n4GhDBlBCnDbSx42cMZUwJOD7zjc97OKaEOcWULfooliMicpn+OELbPyVMz97mHzf6kaLpYWrmJ6oYpz69ATA7/O+Bj2maz5x/XuaYpgAgzKxB5bxCy1BPxG3OzrTqMBrTL0D9b9W4Rh7Ph+m/d9HjK05n8o30yl+FFee1wF6jT3REf1blONu7kzCmbQcw7cpttT/I1JPRlGkdZcnEKaQkizR6enpn7DqZJh1NPg0sV0nZMWBYTenPiLRqs5LHsVIqVrzM2kocIItOAoJU0bUe2qG+RoaI4yzQCfQIe3web9o/wr6A7RMI/CrABTRJASSvTB/NozdVfv/O3pqpNre2yeT5NJezzJrhZki64+DCeHy7tHV94mT0K+wXFC0Hs9d5fyBVTS+Okh9QF1rbSru9px1OeZIvOucZYxvLtt94xQJUhTxL6b5v/hn7G0W1pStUw8X9pf40/DJsdyA1jUo1HjBfibiMtjmRCqSVnP5Zz9Q+Y7Vkg5QFVRlLK7qiKZWnslo9CYi+VIsD6Tuq7FdWhcg+zG1gSrlc90y66JLxqsYGpnYFdCumKxGdVw2lz9xfqawjen+bs5moXaxrbQcJc7KeW8z8k9M6RyghL7e0HFnr/kSjtjalao1bSeM+7uamVF0XDyrkavom2cqcFs+/KPYxVcXCWiUi/+beUbVbGP8eh0z94EW+xBNurgc4/ImXNQAO75qXwssFvarok91EKU0WvP8XHgc3/eGZtyn0O6SnD8jed/pFvVfgP/C/l+BzFnYJNlH5mYJ5+Tp0C1XP7g+6eGfTxLNO6WbfZXo/8utnumibzAdOvUwh3zPtP0i8hhQMgqnX3VmxY3fyJO58ypSY+R8Ca6IGH9PU47z+UrjXnzyInSvU3bT4NaZeV2f3bfmepl4RFUyDaTANpsF0FVP3S0UrmHpV09Tx/ssaqNbHFLr9O+n45jP7KE8nfjvTeveQ4pnns2m09+PJyy3UvzeeTB7RZocAAAAAAElFTkSuQmCC',
    sort_order: 5,
  },
  {
    id: '6',
    name: 'Hương Giang',
    role: 'Trưởng Ban Truyền Thông',
    category: 'coaching',
    description: 'Quản lý hình ảnh CLB, lên kế hoạch nội dung và vận hành Fanpage.',
    image_url: 'https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/601854211_1243470811171804_5935443199338059216_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=p526x296&_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGO4tc7FSRYI4Ye6nSb35_WaE-QSZfDoWxoT5BJl8OhbJX7Exa0EGGjqe76Z2ZOsjD2U0HI8z32COjfyyJ_lZmi&_nc_ohc=iRwtlTxZVDgQ7kNvwFjBAMv&_nc_oc=AdpZ5EPY7Wl3v6FMQAS8CLPyUuFaRKaeZkD6D8HCYPSBhTNJOA7bWJwZyDVA_eCBomE&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=A3T57QLSNIFEZ5GoKuf5qQ&_nc_ss=7b2a8&oh=00_AQGpi7femk2-Nk0hW0qTpLTfuSu1b4CyRWQcSC3TPUTvIA&oe=6A7140E2',
    sort_order: 6,
  },
  {
    id: '7',
    name: 'Hải Yến ',
    role: ' Trưởng Ban design',
    category: 'coaching',
    description: 'Phụ trách thiết kế ấn phẩm, banner, poster và định hình phong cách hình ảnh cho CLB.',
    image_url: 'https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/732421107_122304945452078275_5015552782531554984_n.jpg?stp=c0.0.735.735a_dst-jpg_tt6&cstp=mx735x735&ctp=s100x100&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEs-IfF1XagDSBpSpHIARcEuoWkYhk84NC6haRiGTzg0OSft0cMIbCCdmVHPk-JrWTsH1Gcq8f8V4P7IKZE8VTq&_nc_ohc=44-WMY1JMd0Q7kNvwHNhZS8&_nc_oc=AdodIkrT4R2gOEjp_jegOQx5HEuMcpvBUPZ-u2hJt2ZfdhY-SMCmommZyhAtjiNFvRQ&_nc_zt=24&_nc_ht=scontent.fhan18-1.fna&_nc_gid=Y5tARmXG634rTzYnUWc1fQ&_nc_ss=7b2a8&oh=00_AQGBLo5IMnpbU2zbpNhubnVIglshGT3u9jnUXwrQmt5nDQ&oe=6A7140FD',
    sort_order: 7,
  },
  {
    id: '8',
    name: 'Nhiên ',
    role: 'Phó Ban Design',
    category: 'coaching',
    description: 'Hỗ trợ thiết kế poster, banner và hoàn thiện các ấn phẩm hình ảnh cho CLB.',
    image_url: 'https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/753707677_1004684452470277_7040919375053459327_n.jpg?stp=dst-jpg_tt6&cstp=mx750x750&ctp=s200x200&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGWb7clKoPy1LlxbWdU91LJuKL-ipS5O3a4ov6KlLk7du0aIYPAy_o6F-7ka5rv-xpfuPCVPTW9gS43g3asT83S&_nc_ohc=i7hkSNTyB-0Q7kNvwEG0QH4&_nc_oc=Adrg_N9es7YDXo5nH1XTIaeZ-6Z4aLjX3lLr1pRoJJr-vqmjDabQO3yiD0KKp6Qf2q8&_nc_zt=24&_nc_ht=scontent.fhan18-1.fna&_nc_gid=h2mXv4nZHe5o2JJTBv2BvA&_nc_ss=7b2a8&oh=00_AQF9GDh-Khb9tXZ7u2jMWKuR-CR0xkjN-xWed3KG5NOV3A&oe=6A71297D',
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
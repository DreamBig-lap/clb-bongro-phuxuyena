/*
# Create tables for CLB Bóng rổ Phú Xuyên A website

This is a single-tenant, public-facing website with NO sign-in screen.
All data is intentionally public/shared, so policies use `TO anon, authenticated`
with `USING (true)` — documented as intentional public sharing.

## 1. New Tables

### members — team roster (coaches + players)
- id (uuid, primary key)
- name (text, not null) — full name
- role (text, not null) — vị trí: 'Huấn luyện viên trưởng', 'Trợ lý HLV', 'Đội trưởng', 'Tiền đạo', 'Tiền vệ', 'Hậu vệ', 'Trung phong'
- number (int, nullable) — áo đấu số
- height (int, nullable) — chiều cao (cm)
- weight (int, nullable) — cân nặng (kg)
- age (int, nullable) — tuổi
- bio (text, nullable) — giới thiệu ngắn
- avatar_url (text, nullable) — ảnh đại diện
- join_year (int, nullable) — năm gia nhập CLB
- sort_order (int, default 0) — thứ tự hiển thị

### schedules — lịch tập & lịch thi đấu
- id (uuid, primary key)
- type (text, not null) — 'training' (lịch tập) hoặc 'match' (lịch thi đấu)
- title (text, not null) — tên buổi tập / trận đấu
- opponent (text, nullable) — đối thủ (cho trận đấu)
- location (text, not null) — địa điểm
- event_date (date, not null) — ngày diễn ra
- start_time (time, not null) — giờ bắt đầu
- end_time (time, nullable) — giờ kết thúc
- status (text, not null default 'upcoming') — 'upcoming' (sắp tới), 'completed' (đã diễn ra)
- notes (text, nullable) — ghi chú

### registrations — đơn đăng ký gia nhập CLB
- id (uuid, primary key)
- full_name (text, not null)
- birth_year (int, nullable)
- phone (text, not null)
- email (text, nullable)
- address (text, nullable)
- height (int, nullable)
- weight (int, nullable)
- position (text, nullable) — vị trí sở trường
- experience (text, nullable) — kinh nghiệm bóng rổ
- motivation (text, nullable) — lý do muốn gia nhập
- status (text, not null default 'pending') — 'pending' (chờ duyệt), 'approved', 'rejected'
- created_at (timestamptz, default now())

## 2. Security (RLS)
- Enable RLS on all three tables.
- members & schedules: public read, no public write (managed via dashboard/migration). anon+authenticated SELECT only.
- registrations: public read + insert (anyone can submit a registration). No update/delete for anon.
*/

-- ===== members =====
CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  number int,
  height int,
  weight int,
  age int,
  bio text,
  avatar_url text,
  join_year int,
  sort_order int NOT NULL DEFAULT 0
);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_members" ON members;
CREATE POLICY "public_select_members" ON members FOR SELECT
  TO anon, authenticated USING (true);

-- ===== schedules =====
CREATE TABLE IF NOT EXISTS schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('training', 'match')),
  title text NOT NULL,
  opponent text,
  location text NOT NULL,
  event_date date NOT NULL,
  start_time time NOT NULL,
  end_time time,
  status text NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed')),
  notes text
);

ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_schedules" ON schedules;
CREATE POLICY "public_select_schedules" ON schedules FOR SELECT
  TO anon, authenticated USING (true);

-- ===== registrations =====
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  birth_year int,
  phone text NOT NULL,
  email text,
  address text,
  height int,
  weight int,
  position text,
  experience text,
  motivation text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_registrations" ON registrations;
CREATE POLICY "public_select_registrations" ON registrations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_registrations" ON registrations;
CREATE POLICY "public_insert_registrations" ON registrations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- ===== Seed: members =====
INSERT INTO members (name, role, number, height, weight, age, bio, avatar_url, join_year, sort_order) VALUES
('Nguyễn Văn Thành', 'Huấn luyện viên trưởng', NULL, 182, 80, 45, '20 năm kinh nghiệm dẫn dắt, từng vào chung kết giải quốc gia 2019.', 'https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=400', 2015, 0),
('Trần Minh Đức', 'Trợ lý HLV', NULL, 178, 75, 38, 'Chuyên chiến thuật phòng ngự và phát triển thể lực cho đội trẻ.', 'https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=400', 2018, 1),
('Lê Hoàng Long', 'Đội trưởng', 7, 188, 82, 28, 'Đội trưởng tâm huyết, dẫn dắt bằng tinh thần chiến đấu không ngại khó.', 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400', 2016, 2),
('Phạm Quốc Bảo', 'Tiền đạo', 10, 185, 78, 25, 'Chuyên gia ghi bàn, phong độ nổ súng ổn định suốt 4 mùa giải.', 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400', 2020, 3),
('Vũ Đức Anh', 'Hậu vệ', 4, 180, 74, 24, 'Hậu vệ nhạy bén, đọc tình huống tốt và chuyền bóng chính xác.', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', 2021, 4),
('Đặng Gia Huy', 'Trung phong', 21, 195, 90, 27, 'Trung phong vượt trội về thể hình, kiểm soát vùng penalty chặt chẽ.', 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400', 2019, 5),
('Bùi Tấn Phát', 'Tiền đạo', 9, 183, 76, 23, 'Tốc độ vượt trội, chuyên gia phản công nhanh.', 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400', 2022, 6),
('Ngô Minh Quân', 'Hậu vệ', 5, 179, 73, 22, 'Tân binh triển năng lực phòng ngự ấn tượng mùa giải vừa qua.', 'https://images.pexels.com/photos/2698935/pexels-photo-2698935.jpeg?auto=compress&cs=tinysrgb&w=400', 2023, 7)
ON CONFLICT DO NOTHING;

-- ===== Seed: schedules =====
INSERT INTO schedules (type, title, opponent, location, event_date, start_time, end_time, status, notes) VALUES
('training', 'Tập tổng hợp - Chiến thuật & Thể lực', NULL, 'Nhà thi đấu Phú Xuyên', '2026-08-03', '18:00', '20:00', 'upcoming', 'Tập trung vào chiến thuật phòng ngự khu vực.'),
('training', 'Tập kỹ thuật cá nhân - Ném & Chuyền', NULL, 'Sân bóng rổ trường THPT Phú Xuyên', '2026-08-05', '18:30', '20:30', 'upcoming', 'Mang theo giày tập và khăn.'),
('match', 'Giao hữu vs CLB Bóng rổ Thường Tín', 'CLB Bóng rổ Thường Tín', 'Nhà thi đấu Thường Tín', '2026-08-09', '15:00', '17:00', 'upcoming', 'Trận giao hữu chuẩn bị cho giải Huyện 2026.'),
('training', 'Tập chiến thuật - Phản công', NULL, 'Nhà thi đấu Phú Xuyên', '2026-08-10', '18:00', '20:00', 'upcoming', NULL),
('match', 'Vòng bảng - Giải Huyện 2026', 'CLB Bóng rổ Mỹ Đức', 'Nhà thi đấu Phú Xuyên', '2026-08-16', '16:00', '18:00', 'upcoming', 'Trận mở màn giải Huyện.'),
('training', 'Tập phục hồi & Đánh giá thể lực', NULL, 'Phòng tập thể lực CLB', '2026-08-17', '17:30', '19:00', 'upcoming', NULL)
ON CONFLICT DO NOTHING;

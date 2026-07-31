/*
# Create gallery table for club event photos

Single-tenant, public-facing website — data is intentionally public.
Uses `TO anon, authenticated` so the anon-key frontend can read.

## 1. New Table

### gallery — ảnh sự kiện CLB
- id (uuid, primary key)
- title (text, not null) — tiêu đề ảnh / sự kiện
- description (text, nullable) — mô tả ngắn
- image_url (text, not null) — đường dẫn ảnh
- event_date (date, nullable) — ngày sự kiện
- category (text, not null default 'event') — nhóm: 'event' (sự kiện), 'training' (tập luyện), 'match' (thi đấu)
- sort_order (int, default 0) — thứ tự hiển thị

## 2. Security
- Enable RLS on gallery.
- Public read only (anon + authenticated SELECT). No public write.
*/

CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  event_date date,
  category text NOT NULL DEFAULT 'event' CHECK (category IN ('event', 'training', 'match')),
  sort_order int NOT NULL DEFAULT 0
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_gallery" ON gallery;
CREATE POLICY "public_select_gallery" ON gallery FOR SELECT
  TO anon, authenticated USING (true);

-- ===== Seed =====
INSERT INTO gallery (title, description, image_url, event_date, category, sort_order) VALUES
('Giao hữu mùa hè 2026', 'Trận giao hữu với CLB Thường Tín trên sân nhà.', 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1260', '2026-07-15', 'match', 0),
('Buổi tập chiến thuật', 'Đội hình luyện tập bài phản công nhanh.', 'https://images.pexels.com/photos/974502/pexels-photo-974502.jpeg?auto=compress&cs=tinysrgb&w=1260', '2026-07-10', 'training', 1),
('Sân chơi thanh niên', 'Các thành viên tranh cúp tại giải trẻ huyện.', 'https://images.pexels.com/photos/2820900/pexels-photo-2820900.jpeg?auto=compress&cs=tinysrgb&w=1260', '2026-06-28', 'match', 2),
('Phát triển kỹ năng ném', 'Buổi rèn kỹ thuật ném 3 điểm cá nhân.', 'https://images.pexels.com/photos/8693984/pexels-photo-8693984.jpeg?auto=compress&cs=tinysrgb&w=1260', '2026-06-20', 'training', 3),
('Truyền lửa cho thế hệ mới', 'Hoạt động hướng nghiệp bóng rổ cho học sinh.', 'https://images.pexels.com/photos/8979937/pexels-photo-8979937.jpeg?auto=compress&cs=tinysrgb&w=1260', '2026-06-15', 'event', 4),
('Chiến đấu đến cùng', 'Phút căng thẳng trong trận đấu vòng bảng.', 'https://images.pexels.com/photos/30049751/pexels-photo-30049751.jpeg?auto=compress&cs=tinysrgb&w=1260', '2026-05-30', 'match', 5),
('Luyện tập chiều cao', 'Trung phong rèn kỹ thuật dưới rổ.', 'https://images.pexels.com/photos/38745606/pexels-photo-38745606.jpeg?auto=compress&cs=tinysrgb&w=1260', '2026-05-18', 'training', 6),
('Ngày hội thể thao Phú Xuyên', 'CLB tham gia biểu diễn tại ngày hội.', 'https://images.pexels.com/photos/33696837/pexels-photo-33696837.jpeg?auto=compress&cs=tinysrgb&w=1260', '2026-05-05', 'event', 7)
ON CONFLICT DO NOTHING;

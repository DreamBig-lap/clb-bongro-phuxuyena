import { useForm, ValidationError } from '@formspree/react';
import { UserPlus, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

const POSITIONS = [
  'Tiền đạo',
  'Tiền vệ',
  'Hậu vệ',
  'Trung phong',
  'Chưa xác định',
];

export default function RegistrationForm() {
  // Dùng hook chính chủ từ Formspree (thay xzdnqang bằng Form ID của bạn)
  const [state, handleSubmit] = useForm("xzdnqang");

  return (
    <section id="join" className="relative overflow-hidden bg-ink-950 py-24">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-600/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-brand-700/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* Left info */}
          <div className="flex flex-col justify-center">
            <div className="mb-3 inline-flex w-fit items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-500">
              <UserPlus className="h-4 w-4" />
              Gia nhập CLB
            </div>
            <h2 className="font-display text-4xl text-white sm:text-5xl text-balance">
              TRỞ THÀNH MỘT PHẦN CỦA ĐỘI
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-300 sm:text-lg">
              Bạn đam mê bóng rổ, muốn rèn luyện thể thao và cống hiến cho
              CLB Phú Xuyên A? Hãy gửi đơn đăng ký — ban huấn luyện sẽ liên
              hệ với bạn trong thời gian sớm nhất.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                'Độ tuổi từ 16 trở lên, yêu thích bóng rổ',
                'Cam kết tham gia tối thiểu 2 buổi tập/tuần',
                'Tinh thần kỷ luật, đồng đội và cầu tiến',
                'Không yêu cầu kinh nghiệm thi đấu chuyên nghiệp',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                  <span className="text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right form */}
          <div className="rounded-3xl border border-ink-700/60 bg-ink-900/60 p-6 backdrop-blur-sm sm:p-8">
            {state.succeeded ? (
              <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-brand-500/15">
                  <CheckCircle2 className="h-10 w-10 text-brand-500" />
                </div>
                <h3 className="font-display text-3xl text-white">
                  Đăng ký thành công!
                </h3>
                <p className="mt-3 max-w-sm text-ink-300">
                  Cảm ơn bạn đã đăng ký. Ban huấn luyện sẽ liên hệ qua số
                  điện thoại bạn cung cấp trong thời gian sớm nhất.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-8 rounded-lg border border-ink-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-brand-500 hover:bg-ink-800"
                >
                  Gửi đơn khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Họ và tên" required>
                    <input type="text" id="full_name" name="Họ và tên" required placeholder="Nguyễn Văn A" className={inputCls} />
                  </Field>
                  <Field label="Năm sinh">
                    <input type="number" id="birth_year" name="Năm sinh" min={1990} max={2015} placeholder="2005" className={inputCls} />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Số điện thoại" required>
                    <input type="tel" id="phone" name="Số điện thoại" required placeholder="09xx xxx xxx" className={inputCls} />
                  </Field>
                  <Field label="Email">
                    <input type="email" id="email" name="Email" placeholder="email@example.com" className={inputCls} />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-red-400 mt-1" />
                  </Field>
                </div>

                <Field label="Địa chỉ">
                  <input type="text" id="address" name="Địa chỉ" placeholder="Xã/Thị trấn, Huyện Phú Xuyên, Hà Nội" className={inputCls} />
                </Field>

                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="Chiều cao (cm)">
                    <input type="number" id="height" name="Chiều cao (cm)" min={150} max={220} placeholder="180" className={inputCls} />
                  </Field>
                  <Field label="Cân nặng (kg)">
                    <input type="number" id="weight" name="Cân nặng (kg)" min={40} max={120} placeholder="72" className={inputCls} />
                  </Field>
                  <Field label="Vị trí sở trường">
                    <select id="position" name="Vị trí" className={inputCls}>
                      <option value="">Chọn vị trí</option>
                      {POSITIONS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Kinh nghiệm bóng rổ">
                  <textarea id="experience" rows={2} name="Kinh nghiệm" placeholder="VD: Đã chơi bóng rổ 3 năm cấp 3..." className={`${inputCls} resize-none`} />
                </Field>

                <Field label="Lý do muốn gia nhập CLB">
                  <textarea id="motivation" rows={3} name="Lý do gia nhập" placeholder="Chia sẻ lý do bạn muốn gia nhập..." className={`${inputCls} resize-none`} />
                </Field>

                {state.errors && state.errors.length > 0 && (
                  <div className="flex items-center gap-2.5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    Có lỗi xảy ra hoặc vui lòng kiểm tra lại thông tin.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-4 text-base font-bold uppercase tracking-wide text-white shadow-xl shadow-brand-600/30 transition-all hover:bg-brand-400 hover:shadow-brand-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {state.submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Gửi đơn đăng ký
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  'w-full rounded-lg border border-ink-700 bg-ink-950/60 px-4 py-3 text-sm text-white placeholder-ink-500 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20';

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-200">
        {label}
        {required && <span className="ml-1 text-brand-500">*</span>}
      </span>
      {children}
    </label>
  );
}
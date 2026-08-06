import { useForm } from '@formspree/react';
import { useState, useEffect } from 'react';
import { UserPlus, CheckCircle2 } from 'lucide-react';

const heroImages = ['/hero-1.jpg', '/hero-2.jpg', '/hero-3.jpg'];
const POSITIONS = ['Tiền đạo', 'Tiền vệ', 'Hậu vệ', 'Trung phong', 'Chưa xác định'];

export default function RegistrationForm() {
  const [current, setCurrent] = useState(0);
  const [state, handleSubmit] = useForm("xzdnqang");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="join" className="relative overflow-hidden py-24">
      {/* Background Slider - Vẫn giữ nguyên hiệu ứng mượt mà */}
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
      <div className="absolute inset-0 bg-ink-950/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <div className="mb-3 inline-flex w-fit items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-500">
              <UserPlus className="h-4 w-4" /> Gia nhập CLB
            </div>
            <h2 className="font-display text-4xl text-white sm:text-5xl text-balance">
              TRỞ THÀNH MỘT PHẦN CỦA ĐỘI
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-300 sm:text-lg">
              Bạn đam mê bóng rổ, muốn rèn luyện thể thao và cống hiến cho CLB Phú Xuyên A? 
              Hãy gửi đơn đăng ký chi tiết bên cạnh — ban huấn luyện sẽ liên hệ với bạn.
            </p>
          </div>

          {/* Form đầy đủ */}
          <div className="rounded-3xl border border-ink-700/60 bg-ink-900/60 p-6 backdrop-blur-sm sm:p-8">
            {state.succeeded ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-16 w-16 text-brand-500 mb-4" />
                <h3 className="text-3xl text-white">Đăng ký thành công!</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Họ và tên" required><input type="text" name="Họ và tên" required className={inputCls} /></Field>
                  <Field label="Năm sinh" required><input type="number" name="Năm sinh" required className={inputCls} /></Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Số điện thoại" required><input type="tel" name="Số điện thoại" required className={inputCls} /></Field>
                  <Field label="Email" required><input type="email" name="Email" required className={inputCls} /></Field>
                </div>
                <Field label="Địa chỉ" required><input type="text" name="Địa chỉ" required className={inputCls} /></Field>
                
                <div className="grid grid-cols-3 gap-4">
                  <Field label="Chiều cao (cm)"><input type="number" name="Chiều cao" className={inputCls} /></Field>
                  <Field label="Cân nặng (kg)"><input type="number" name="Cân nặng" className={inputCls} /></Field>
                  <Field label="Vị trí">
                    <select name="Vị trí" className={inputCls}>
                      {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Kinh nghiệm bóng rổ"><textarea name="Kinh nghiệm" className={`${inputCls} h-20`} /></Field>
                <Field label="Lý do gia nhập"><textarea name="Lý do" className={`${inputCls} h-20`} /></Field>

                <button 
                   type="submit" 
                    disabled={state.submitting} 
                    className="w-full py-4 text-white font-bold rounded-xl shadow-xl transition-all duration-300 hover:bg-white/30"
                    style={{
                         backgroundColor: 'rgba(255, 255, 255, 0.15)',
                         backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                       }}
>
                  {state.submitting ? "Đang gửi..." : "GỬI ĐƠN ĐĂNG KÝ"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const inputCls = 'w-full rounded-lg border border-ink-700 bg-ink-950/60 px-4 py-3 text-white outline-none focus:border-brand-500';

function Field({ label, required, children }: { label: string, required?: boolean, children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-200">{label}{required && <span className="text-brand-500">*</span>}</span>
      {children}
    </label>
  );
}
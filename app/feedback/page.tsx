"use client";

import React, { useMemo, useState } from "react";
import Container from "@/components/Container";
import { Card, CardContent } from "@/components/Card";
import { Tajawal } from "next/font/google";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
});

type NoteType =
  | "content"
  | "bug"
  | "request"
  | "improve"
  | "course"
  | "chatbot"
  | "other";

const NOTE_TYPES: Array<{
  id: NoteType;
  label: string;
  desc: string;
  icon: string;
}> = [
  { id: "content", label: "محتوى ناقص", desc: "سلايدات/ملخصات/روابط غير موجودة", icon: "📚" },
  { id: "bug", label: "مشكلة تقنية", desc: "شيء لا يعمل / خطأ في الصفحة", icon: "🛠️" },
  { id: "request", label: "طلب إضافة", desc: "أضف مادة/ملفات/ميزة جديدة", icon: "➕" },
  { id: "improve", label: "تحسين واجهة", desc: "اقتراح شكل/ترتيب/سهولة استخدام", icon: "✨" },
  { id: "course", label: "ملاحظة عن مادة", desc: "تعديل اسم/رمز/تصنيف أو محتوى مادة", icon: "🧾" },
  { id: "chatbot", label: "تحسين الجزري", desc: "كيف نخلي إجابات الجزري أدق", icon: "🤖" },
  { id: "other", label: "أخرى", desc: "أي شيء خارج التصنيفات", icon: "📝" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SuggestionsPage() {
  const [name, setName] = useState("");
  const [uniEmail, setUniEmail] = useState("");
  const [major, setMajor] = useState<"" | "ISE" | "RE">("");
  const [year, setYear] = useState("");
  const [courseOrDoctor, setCourseOrDoctor] = useState("");
  const [noteType, setNoteType] = useState<NoteType>("chatbot");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const majorLabel = useMemo(() => {
    if (major === "ISE") return "هندسة الأنظمة الذكية";
    if (major === "RE") return "هندسة الطاقة المتجددة";
    return "";
  }, [major]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!major || !message.trim()) return;

    setSending(true);

    // ✅ اربطها لاحقاً بـ API / n8n / DB
    // مثال:
    // await fetch("/api/suggestions", { method:"POST", body: JSON.stringify({...}) })

    setTimeout(() => {
      setSending(false);
      // reset بسيط
      setMessage("");
      setCourseOrDoctor("");
    }, 650);
  }

  const selectedType = NOTE_TYPES.find((t) => t.id === noteType);

  return (
    <div dir="rtl" className={cn(tajawal.className, "min-h-screen bg-[#fafafa]")}>
      {/* خلفية هادئة */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-meu-red/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-meu-red/10 blur-3xl" />
      </div>

      <section className="py-10">
        <Container>
          {/* Title */}
          <div className="mb-6 text-right">
            <h1 className="text-2xl md:text-3xl font-extrabold text-meu-dark">
              صندوق اقتراحات الطلاب
            </h1>
            <p className="mt-2 text-sm text-meu-gray">
              اكتب ملاحظتك بسرعة — كل اقتراح يساعدنا نحسن المنصة والجزري.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
            {/* FORM */}
            <Card className="border border-meu-gray/15 shadow-sm">
              <CardContent>
                <form onSubmit={submit} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <div className="text-lg font-extrabold text-meu-dark">
                        نموذج الإرسال
                      </div>
                      <div className="text-xs text-meu-gray mt-1">
                        الحقول الاختيارية موضحة 
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full border border-meu-gray/15 bg-white px-3 py-1 text-xs text-meu-dark">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      جاهز للاستقبال
                    </span>
                  </div>

                  {/* row 1 */}
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="text-right">
                      <label className="text-xs font-bold text-meu-gray">
                        الاسم <span className="font-normal">(اختياري)</span>
                      </label>
                      <div className="mt-2 relative">
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-meu-gray">👤</span>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="مثال: محمد"
                          className="w-full rounded-xl border border-meu-gray/20 bg-white pr-10 pl-4 py-3 text-sm outline-none focus:ring-2 focus:ring-meu-red/25"
                        />
                      </div>
                    </div>

                    <div className="text-right">
                      <label className="text-xs font-bold text-meu-gray">
                        الإيميل الجامعي <span className="font-normal">(اختياري)</span>
                      </label>
                      <div className="mt-2 relative">
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-meu-gray">📩</span>
                        <input
                          value={uniEmail}
                          onChange={(e) => setUniEmail(e.target.value)}
                          placeholder="University ID@stu.meu.edu.jo"
                          className="w-full rounded-xl border border-meu-gray/20 bg-white pr-10 pl-4 py-3 text-sm outline-none focus:ring-2 focus:ring-meu-red/25"
                        />
                      </div>
                    </div>
                  </div>

                  {/* row 2 */}
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="text-right">
                      <label className="text-xs font-bold text-meu-gray">التخصص</label>
                      <div className="mt-2 relative">
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-meu-gray">🎓</span>
                        <select
                          value={major}
                          onChange={(e) => setMajor(e.target.value as any)}
                          className="w-full appearance-none rounded-xl border border-meu-gray/20 bg-white pr-10 pl-10 py-3 text-sm outline-none focus:ring-2 focus:ring-meu-red/25"
                        >
                          <option value="">اختر التخصص…</option>
                          <option value="ISE">هندسة الأنظمة الذكية</option>
                          <option value="RE">هندسة الطاقة المتجددة</option>
                        </select>
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-meu-gray">▾</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <label className="text-xs font-bold text-meu-gray">السنة الدراسية</label>
                      <div className="mt-2 relative">
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-meu-gray">📆</span>
                        <input
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          placeholder="مثال: أولى / ثانية / ثالثة / رابعة"
                          className="w-full rounded-xl border border-meu-gray/20 bg-white pr-10 pl-4 py-3 text-sm outline-none focus:ring-2 focus:ring-meu-red/25"
                        />
                      </div>
                    </div>
                  </div>

                  {/* row 3 */}
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="text-right">
                      <label className="text-xs font-bold text-meu-gray">
                        المادة أو الدكتور
                      </label>
                      <div className="mt-2 relative">
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-meu-gray">🧑‍🏫</span>
                        <input
                          value={courseOrDoctor}
                          onChange={(e) => setCourseOrDoctor(e.target.value)}
                          placeholder="مثال: دوائر كهربائية 1 / د. أحمد…"
                          className="w-full rounded-xl border border-meu-gray/20 bg-white pr-10 pl-4 py-3 text-sm outline-none focus:ring-2 focus:ring-meu-red/25"
                        />
                      </div>
                    </div>

                    <div className="text-right">
                      <label className="text-xs font-bold text-meu-gray">نوع الملاحظة</label>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {NOTE_TYPES.slice(0, 6).map((t) => {
                          const active = t.id === noteType;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setNoteType(t.id)}
                              className={cn(
                                "group relative rounded-xl border px-3 py-3 text-right transition",
                                "hover:-translate-y-[1px] hover:shadow-sm",
                                active
                                  ? "border-meu-red/30 bg-meu-red/10"
                                  : "border-meu-gray/15 bg-white"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-extrabold text-meu-dark">
                                  {t.label}
                                </div>
                                <div className={cn("text-xl transition", active && "animate-[pop_220ms_ease-out]")}>
                                  {t.icon}
                                </div>
                              </div>
                              <div className="mt-1 text-[11px] text-meu-gray">
                                {t.desc}
                              </div>

                              <div
                                className={cn(
                                  "absolute inset-0 rounded-xl opacity-0 transition",
                                  "group-hover:opacity-100"
                                )}
                                style={{
                                  boxShadow: active
                                    ? "0 0 0 1px rgba(147, 23, 25, 0.15) inset"
                                    : "0 0 0 1px rgba(0,0,0,0.04) inset",
                                }}
                              />
                            </button>
                          );
                        })}
                      </div>

                      {/* زر (أخرى) */}
                      <div className="mt-2">
                        <button
                          type="button"
                          onClick={() => setNoteType("other")}
                          className={cn(
                            "w-full rounded-xl border px-3 py-3 text-right transition",
                            "hover:-translate-y-[1px] hover:shadow-sm",
                            noteType === "other"
                              ? "border-meu-red/30 bg-meu-red/10"
                              : "border-meu-gray/15 bg-white"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-extrabold text-meu-dark">
                              أخرى
                            </div>
                            <div className={cn("text-xl", noteType === "other" && "animate-[pop_220ms_ease-out]")}>
                              📝
                            </div>
                          </div>
                          <div className="mt-1 text-[11px] text-meu-gray">
                            أي شيء خارج التصنيفات
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* textarea */}
                  <div className="text-right">
                    <label className="text-xs font-bold text-meu-gray">
                      نص الاقتراح <span className="text-meu-red">*</span>
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="اكتب اقتراحك/ملاحظتك هنا…"
                      className="mt-2 w-full min-h-[170px] rounded-2xl border border-meu-gray/20 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-meu-red/25"
                    />
                  </div>

                  {/* helper text */}
                  <div className="rounded-2xl border border-meu-gray/15 bg-white px-4 py-3 text-right">
                    <div className="text-sm font-extrabold text-meu-dark flex items-center justify-between">
                      <span>💡 ملاحظة مهمة</span>
                      <span className="text-xs text-meu-gray">
                        {selectedType?.icon} {selectedType?.label}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-meu-gray leading-relaxed">
                      هذه الاقتراحات تساعد <span className="font-extrabold text-meu-dark">الجزري</span> على فهم احتياج الطلاب بشكل أفضل،
                      وبالتالي تقديم إجابات أدق وأسرع داخل الموقع.
                    </div>
                  </div>

                  {/* submit */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs text-meu-gray">
                      <span className="text-meu-red">*</span> الحقول المطلوبة: التخصص + نص الاقتراح
                    </div>

                    <button
                      type="submit"
                      disabled={!major || !message.trim() || sending}
                      className={cn(
                        "rounded-xl px-6 py-3 text-sm font-extrabold text-white transition active:scale-[0.98]",
                        !major || !message.trim() || sending
                          ? "bg-meu-gray/40 cursor-not-allowed"
                          : "bg-meu-red hover:opacity-95 animate-[btnPulse_2.8s_ease-in-out_infinite]"
                      )}
                    >
                      {sending ? "جارٍ الإرسال…" : "إرسال"}
                    </button>
                  </div>
                </form>

                <style jsx global>{`
                  @keyframes pop {
                    from {
                      transform: scale(0.9);
                      opacity: 0.6;
                    }
                    to {
                      transform: scale(1);
                      opacity: 1;
                    }
                  }
                  @keyframes btnPulse {
                    0%,
                    100% {
                      transform: translateY(0);
                    }
                    50% {
                      transform: translateY(-2px);
                    }
                  }
                `}</style>
              </CardContent>
            </Card>

            {/* SIDEBAR / Analytics (اختياري بسيط مرتب) */}
            <Card className="border border-meu-gray/15 shadow-sm h-fit">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <div className="text-lg font-extrabold text-meu-dark">
                      Analytics
                    </div>
                    <div className="text-xs text-meu-gray mt-1">
                      (اختياري) لاحقًا اربطها بالداتا
                    </div>
                  </div>
                  <span className="rounded-full bg-meu-red/10 px-3 py-1 text-xs font-extrabold text-meu-red">
                    قريبًا
                  </span>
                </div>

                <div className="mt-4 grid gap-3">
                  <div className="rounded-2xl border border-meu-gray/15 bg-white p-4">
                    <div className="text-xs text-meu-gray">التخصص المختار</div>
                    <div className="mt-1 text-sm font-extrabold text-meu-dark">
                      {majorLabel || "—"}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-meu-gray/15 bg-white p-4">
                    <div className="text-xs text-meu-gray">نوع الملاحظة</div>
                    <div className="mt-1 text-sm font-extrabold text-meu-dark">
                      {selectedType?.icon} {selectedType?.label}
                    </div>
                    <div className="mt-1 text-xs text-meu-gray">
                      {selectedType?.desc}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-meu-gray/15 bg-white p-4">
                    <div className="text-xs text-meu-gray">جاهزية النموذج</div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className={cn("h-2 flex-1 rounded-full bg-meu-gray/15 overflow-hidden")}>
                        <div
                          className="h-full bg-meu-red/40"
                          style={{
                            width:
                              (major ? 50 : 0) +
                              (message.trim() ? 50 : 0) +
                              "%",
                          }}
                        />
                      </div>
                      <div className="text-xs font-bold text-meu-gray">
                        {(major ? 50 : 0) + (message.trim() ? 50 : 0)}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
}


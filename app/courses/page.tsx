"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/Card";
import Link from "next/link";
import { Tajawal } from "next/font/google";
import { supabase } from "@/lib/supabase";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
});

function normalizeArabic(text: string) {
  return text
    .toLowerCase()
    .replace(/[\/\-_\(\)\[\]\{\}\s]/g, "") // يشيل رموز ومسافات
    .replace(/أ|إ|آ/g, "ا") // توحيد الألف
    .replace(/ة/g, "ه") // ة → ه
    .replace(/ى/g, "ي") // ى → ي
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ال/g, ""); // يشيل "ال" من أي مكان
}

type Course = {
  code: string;
  name: string;
  href: string; // صفحة المادة (لو عندك صفحة لكل مادة)
  slidesCount?: number;
  summariesCount?: number;
  examsCount?: number;
};

const COURSES: Course[] = [
  { code: "0181101", name: "تفاضل وتكامل (1)", href: "/courses/0181101" },
  { code: "0181102", name: "تفاضل وتكامل (2)", href: "/courses/0181102" },
  { code: "0182101", name: "تفاضل وتكامل (3)", href: "/courses/0182101" },

  { code: "0181201", name: "فيزياء عامة (1)", href: "/courses/0181201" },
  { code: "0181203", name: "فيزياء عامة (2)", href: "/courses/0181203" },

  { code: "0181301", name: "كيمياء عامة", href: "/courses/0181301" },
  { code: "0181302", name: "كيمياء عامة عملي", href: "/courses/0181302" },

  { code: "1912501", name: "دوائر كهربائية (1)", href: "/courses/1912501" },
  { code: "1912502", name: "دوائر كهربائية (2)", href: "/courses/1912502" },

  { code: "1921801", name: "المنطق الرقمي", href: "/courses/1921801" },
  { code: "1922201", name: "برمجة هندسية", href: "/courses/1922201" },

  { code: "1922601", name: "مبادئ الذكاء الاصطناعي", href: "/courses/1922601" },
  { code: "1922602", name: "علم البيانات", href: "/courses/1922602" },

  { code: "1922701", name: "البرمجة الكينونية", href: "/courses/1922701" },
  { code: "1922702", name: "الخوارزميات", href: "/courses/1922702" },

  { code: "1923301", name: "الإشارات والنظم", href: "/courses/1923301" },
  { code: "1923302", name: "معالجة الإشارات الرقمية", href: "/courses/1923302" },

  { code: "1923603", name: "تعلم الآلة", href: "/courses/1923603" },
  { code: "1923604", name: "الشبكات العصبونية والضبابية", href: "/courses/1923604" },

  { code: "1923703", name: "إدارة قواعد البيانات", href: "/courses/1923703" },
  { code: "1923802", name: "المعالجات الدقيقة", href: "/courses/1923802" },
  { code: "1923803", name: "الأنظمة المضمنة", href: "/courses/1923803" },

  { code: "1924303", name: "شبكات الحاسوب", href: "/courses/1924303" },

  { code: "1924605", name: "معالجة الصور", href: "/courses/1924605" },
  { code: "1924606", name: "التعلم العميق والرؤية بالحاسوب", href: "/courses/1924606" },

  { code: "1924704", name: "برمجة الروبوت", href: "/courses/1924704" },
  { code: "1924705", name: "نظم التشغيل", href: "/courses/1924705" },

  { code: "1924805", name: "إنترنت الأشياء", href: "/courses/1924805" },
  { code: "1924806", name: "أجهزة الاستشعار والمحركات", href: "/courses/1924806" },

  { code: "1913501", name: "آلات كهربائية", href: "/courses/1913501" },
  { code: "1913502", name: "مختبر الآلات الكهربائية", href: "/courses/1913502" },

  { code: "1913701", name: "إلكترونيات", href: "/courses/1913701" },

  { code: "1914701", name: "إلكترونيات القوى الكهربائية", href: "/courses/1914701" },
  { code: "1914702", name: "مختبر إلكترونيات القوى الكهربائية", href: "/courses/1914702" },
  { code: "1914703", name: "تحويل وتخزين الطاقة", href: "/courses/1914703" },

  { code: "1913601", name: "الطاقة الشمسية", href: "/courses/1913601" },
  { code: "1913602", name: "مختبر الطاقة الشمسية", href: "/courses/1913602" },

  { code: "1914603", name: "طاقة الرياح", href: "/courses/1914603" },
  { code: "1914604", name: "مختبر طاقة الرياح", href: "/courses/1914604" },

  { code: "1915201", name: "اقتصاد هندسي", href: "/courses/1915201" },
  { code: "1915801", name: "اقتصاد وكفاءة الطاقة", href: "/courses/1915801" },
  { code: "1915802", name: "إدارة وتشريعات الطاقة", href: "/courses/1915802" },

  { code: "1914303", name: "تصميم ومحاكاة (2)", href: "/courses/1914303" },
  { code: "1914304", name: "تصميم ومحاكاة (1)", href: "/courses/1914304" },

  { code: "1931201", name: "الرسم الهندسي", href: "/courses/1931201" },
  { code: "0199999", name: "اسم المادة", href: "/courses/0199999" },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
      {children}
    </span>
  );
}

function Stat({ label, value }: { label: string; value?: number }) {
  return (
    <div className="rounded-xl border border-meu-gray/15 bg-white px-3 py-2 text-right">
      <div className="text-[11px] text-meu-gray">{label}</div>
      <div className="text-sm font-extrabold text-meu-dark">{value ?? 0}</div>
    </div>
  );
}

function CourseCard({ c }: { c: Course }) {
  return (
    <Card className="transition duration-200 hover:shadow-md hover:-translate-y-0.5">
      <CardContent>
        <div className="flex items-start justify-between gap-3">
          <div className="text-right">
            <div className="inline-flex items-center gap-2">
              <span className="rounded-full bg-meu-red/10 px-3 py-1 text-xs font-extrabold text-meu-red">
                {c.code}
              </span>
            </div>

            <div className="mt-2 text-base font-extrabold text-meu-dark">
              {c.name}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <Stat label="سلايدات" value={c.slidesCount} />
              <Stat label="ملخصات" value={c.summariesCount} />
              <Stat label="بنك أسئلة" value={c.examsCount} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2 justify-end">
              <Link
                href={`${c.href}?tab=slides`}
                className="rounded-xl bg-meu-red px-3 py-2 text-sm font-bold text-white hover:opacity-95"
              >
                سلايدات
              </Link>
              <Link
                href={`${c.href}?tab=summaries`}
                className="rounded-xl border border-meu-gray/20 px-3 py-2 text-sm font-bold text-meu-dark hover:bg-meu-gray/10"
              >
                ملخصات
              </Link>
              <Link
                href={`${c.href}?tab=exams`}
                className="rounded-xl border border-meu-gray/20 px-3 py-2 text-sm font-bold text-meu-dark hover:bg-meu-gray/10"
              >
                امتحانات
              </Link>
            </div>
          </div>

          <div className="text-meu-gray">➜</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CoursesPage() {
  const [q, setQ] = useState("");

  // ✅ خريطة العدادات لكل course_code
  const [countsMap, setCountsMap] = useState<
    Record<string, { slides: number; summaries: number; exams: number }>
  >({});

  // ✅ جلب العدادات مرة واحدة بدون أي تأثير على الواجهة
  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data, error } = await supabase
        .from("materials")
        .select("course_code, type");

      if (error) {
        console.error("Counts fetch error:", error.message);
        return;
      }

      const map: Record<string, { slides: number; summaries: number; exams: number }> = {};

      for (const row of data ?? []) {
        const code = String((row as any).course_code ?? "");
        const type = String((row as any).type ?? "");

        if (!map[code]) map[code] = { slides: 0, summaries: 0, exams: 0 };

        // ✅ طابق القيم حسب جدولك (افتراض شائع: slides / summary / exam)
        if (type === "slides") map[code].slides++;
        else if (type === "summary" || type === "summaries") map[code].summaries++;
        else if (type === "exam" || type === "exams") map[code].exams++;
      }

      if (mounted) setCountsMap(map);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim();

    // ✅ دمج العدادات مع الكورسات بدون تغيير على شكل البيانات عند العرض
    const coursesWithCounts: Course[] = COURSES.map((c) => {
      const counts = countsMap[c.code] ?? { slides: 0, summaries: 0, exams: 0 };
      return {
        ...c,
        slidesCount: counts.slides,
        summariesCount: counts.summaries,
        examsCount: counts.exams,
      };
    });

    if (!s) return coursesWithCounts;

    const nq = normalizeArabic(s);

    return coursesWithCounts.filter((c) => {
      const code = c.code.toLowerCase();
      const nameN = normalizeArabic(c.name);

      // ✅ يطابق بأي جزء من الاسم + أو بالكود
      return code.includes(s.toLowerCase()) || nameN.includes(nq);
    });
  }, [q, countsMap]);

  return (
    <div className={tajawal.className}>
      {/* HERO صغير مثل الرئيسية */}
      <section className="relative overflow-hidden rounded-b-3xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/library-hero.png"
            alt="Library Hero"
            className="h-full w-full object-cover"
          />
          {/* Overlay خفيف للقراءة */}
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <Container>
          <div className="relative py-10 md:py-14">
            <div className="flex flex-wrap items-center justify-between gap-6">
              {/* النص */}
              <div className="text-right max-w-2xl">
                <h1 className="text-2xl md:text-4xl font-extrabold text-white">
                  مكتبة المواد الهندسية
                </h1>

                <p className="mt-3 text-sm md:text-base text-white/85">
                  ابحث عن المادة وادخل مباشرة للسلايدات، الملخصات، وامتحانات السنوات.
                </p>
              </div>

              {/* البحث */}
              <div className="w-full md:w-[420px]">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="ابحث باسم أو رمز المادة…"
                    className="w-full rounded-xl bg-white px-4 py-3 text-right text-sm text-meu-dark outline-none"
                  />
                  <div className="mt-2 text-right text-xs text-white/70">
                    مثال: MATH101 — PHYS101 — CS101
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CONTENT */}
      <section className="py-10">
        <Container>
          <SectionTitle
            title="المواد المتاحة"
            subtitle={`عدد المواد: ${filtered.length}`}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CourseCard key={c.code} c={c} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-8 text-center text-sm text-meu-gray">
              ما في نتائج… جرّب رمز مادة مختلف.
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

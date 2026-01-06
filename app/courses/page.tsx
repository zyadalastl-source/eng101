"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/Card";
import Link from "next/link";
import { Tajawal } from "next/font/google";
import { supabase } from "@/lib/supabase";
import { COURSES as BASE_COURSES } from "@/lib/courses";

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
  href: string; // صفحة المادة
  slidesCount?: number;
  summariesCount?: number;
  examsCount?: number;
};

/**
 * ✅ نفس الشكل 100% (نفس الكود بالواجهة)
 * فقط بدل ما تكون COURSES مكررة هون، صارت تجي من lib/courses.ts
 */
const COURSES: Course[] = BASE_COURSES.map((c) => ({
  code: c.code,
  name: c.name,
  href: c.href,
}));

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

      const map: Record<
        string,
        { slides: number; summaries: number; exams: number }
      > = {};

      for (const row of data ?? []) {
        const code = String((row as any).course_code ?? "");
        const type = String((row as any).type ?? "");

        if (!map[code]) map[code] = { slides: 0, summaries: 0, exams: 0 };

        // ✅ طابق القيم حسب جدولك (slides / summary / exam)
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
          <Image
          src="/library-hero.webp"
          alt="Engineering Courses Library"
          fill
          priority
          sizes="100vw"
          className="object-cover"
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

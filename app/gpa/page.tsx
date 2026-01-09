"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/Card";
import { Tajawal } from "next/font/google";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
});

const GRADE_POINTS: Record<string, number> = {
  A: 4,
  "A-": 3.75,
  "B+": 3.5,
  B: 3,
  "B-": 2.75,
  "C+": 2.5,
  C: 2,
  "C-": 1.75,
  "D+": 1.5,
  D: 1,
  "D-": 0.75,
  F: 0,
};

function roundTo(n: number, decimals = 2) {
  const p = Math.pow(10, decimals);
  return Math.round((n + Number.EPSILON) * p) / p;
}

const LETTERS = Object.keys(GRADE_POINTS);

type Course = {
  letter: string;
  credits: number;
};

export default function GPA_Page() {
  const [courses, setCourses] = useState<Course[]>([{ letter: "A", credits: 3 }]);

  const result = useMemo(() => {
    let totalCredits = 0;
    let totalPoints = 0;

    courses.forEach((c) => {
      const pts = GRADE_POINTS[c.letter] ?? 0;
      totalCredits += c.credits;
      totalPoints += pts * c.credits;
    });

    const gpa = totalCredits ? totalPoints / totalCredits : 0;
    return { totalCredits, totalPoints, gpa };
  }, [courses]);

  // ✅ نفس قيمة العرض (2 decimals) عشان الرسالة تطلع منطقية مثل اللي بتشوفه
  const gpaShown = roundTo(result.gpa);

  function updateCourse(i: number, patch: Partial<Course>) {
    setCourses((prev) => prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  }

  function addCourse() {
    setCourses((prev) => [...prev, { letter: "A", credits: 3 }]);
  }

  function removeCourse(i: number) {
    setCourses((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className={tajawal.className}>
      <section className="py-10">
        <Container>
          <SectionTitle title="حساب المعدل " subtitle="إدخال بالحروف فقط" />

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {/* المواد */}
            <Card className="lg:col-span-2">
              <CardContent>
                <div className="space-y-3">
                  {courses.map((c, i) => (
                    <div key={i} className="rounded-2xl border border-meu-gray/15 bg-white p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="text-right">
                          <div className="text-sm font-extrabold text-meu-dark">مادة #{i + 1}</div>
                          <div className="mt-1 text-xs text-meu-gray">
                            النقاط:{" "}
                            <span className="font-bold text-meu-dark">{GRADE_POINTS[c.letter]}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {/* Letter */}
                          <select
                            value={c.letter}
                            onChange={(e) => updateCourse(i, { letter: e.target.value })}
                            className="rounded-xl border border-meu-gray/20 px-3 py-2 text-sm font-bold"
                          >
                            {LETTERS.map((l) => (
                              <option key={l} value={l}>
                                {l}
                              </option>
                            ))}
                          </select>

                          {/* Credits */}
                          <input
                            type="number"
                            min={1}
                            max={3}
                            value={c.credits}
                            onChange={(e) => updateCourse(i, { credits: Number(e.target.value) })}
                            className="w-20 rounded-xl border border-meu-gray/20 px-3 py-2 text-right text-sm font-bold"
                          />

                          {courses.length > 1 && (
                            <button
                              onClick={() => removeCourse(i)}
                              className="rounded-xl border border-meu-gray/20 px-3 py-2 text-sm hover:bg-meu-gray/10"
                            >
                              حذف
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={addCourse}
                    className="rounded-2xl bg-meu-red px-4 py-2 text-sm font-extrabold text-white hover:opacity-95"
                  >
                    + إضافة مادة
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* النتيجة */}
            <Card>
              <CardContent>
                <div className="text-right">
                  <div className="text-base font-extrabold text-meu-dark">نتيجة المعدل الفصلي</div>
                  <div className="mt-1 text-xs text-meu-gray">Semester GPA (4.0)</div>
                </div>

                <div className="mt-5 rounded-2xl border border-meu-gray/15 bg-white p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-meu-gray">مجموع الساعات</span>
                    <span className="font-extrabold">{result.totalCredits}</span>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <span className="text-sm text-meu-gray">مجموع النقاط</span>
                    <span className="font-extrabold">{result.totalPoints.toFixed(2)}</span>
                  </div>

                  <div className="mt-4 h-px bg-meu-gray/10" />

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm font-bold text-meu-dark">المعدل الفصلي</span>
                    <span className="text-3xl font-extrabold text-meu-red">
                      {gpaShown.toFixed(2)}
                    </span>
                  </div>

                  {/* ✅ البوكس الجديد تحت الـ GPA (بدون ما نغيّر أي شيء فوق) */}
                  <div className="mt-4 rounded-xl border border-meu-gray/15 bg-white px-4 py-3 text-center">
                    {gpaShown > 2.5 ? (
                      <span className="text-sm font-extrabold text-emerald-600">
                        وحش يا قرابة 💪🔥
                      </span>
                    ) : gpaShown >= 2 ? (
                      <span className="text-sm font-extrabold text-amber-600">
                        شد حيلك يا غالي بلاش يروح الخصم 😅
                      </span>
                    ) : (
                      <span className="text-sm font-extrabold text-red-600">
                        رااااااح الغالي يامو 💀😭
                      </span>
                    )}
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

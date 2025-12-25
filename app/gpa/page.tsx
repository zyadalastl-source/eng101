"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent, CardHeader } from "@/components/Card";

const LETTER_TO_GPA: Record<string, number> = {
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "D-": 0.7,
  "F": 0.0
};

type Row = { name: string; credits: number; letter: keyof typeof LETTER_TO_GPA };

function round2(x: number) {
  return Math.round(x * 100) / 100;
}

export default function GpaPage() {
  // Semester GPA
  const [rows, setRows] = useState<Row[]>([
    { name: "", credits: 3, letter: "A" }
  ]);

  const semesterGpa = useMemo(() => {
    const totalCredits = rows.reduce((s, r) => s + (Number(r.credits) || 0), 0);
    if (!totalCredits) return null;
    const pts = rows.reduce((s, r) => s + (LETTER_TO_GPA[r.letter] * (Number(r.credits) || 0)), 0);
    return round2(pts / totalCredits);
  }, [rows]);

  // Cumulative GPA
  const [currentGpa, setCurrentGpa] = useState<number>(0);
  const [finishedCredits, setFinishedCredits] = useState<number>(0);
  const [newCourses, setNewCourses] = useState<Row[]>([{ name: "", credits: 3, letter: "A" }]);

  const newCumulative = useMemo(() => {
    const basePts = (Number(currentGpa) || 0) * (Number(finishedCredits) || 0);
    const newCredits = newCourses.reduce((s, r) => s + (Number(r.credits) || 0), 0);
    const newPts = newCourses.reduce((s, r) => s + (LETTER_TO_GPA[r.letter] * (Number(r.credits) || 0)), 0);
    const totalCredits = (Number(finishedCredits) || 0) + newCredits;
    if (!totalCredits) return null;
    return round2((basePts + newPts) / totalCredits);
  }, [currentGpa, finishedCredits, newCourses]);

  // Final needed (simple numeric model)
  const [mid, setMid] = useState<number>(0);
  const [finalWeight, setFinalWeight] = useState<number>(50);
  const [desiredLetter, setDesiredLetter] = useState<keyof typeof LETTER_TO_GPA>("A");
  const desiredPercent = useMemo(() => {
    // Placeholder mapping: convert letter GPA to a percent anchor (simple)
    // You can replace this with MEU grading policy later.
    const g = LETTER_TO_GPA[desiredLetter];
    return Math.min(100, Math.max(0, Math.round((g / 4) * 100)));
  }, [desiredLetter]);

  const neededOnFinal = useMemo(() => {
    const w = Math.min(100, Math.max(0, Number(finalWeight) || 0)) / 100;
    const midPct = Math.min(100, Math.max(0, Number(mid) || 0));
    const target = desiredPercent;
    if (w <= 0) return null;
    // Assume midterm is (1-w) of total, final is w
    const need = (target - (1 - w) * midPct) / w;
    return round2(need);
  }, [mid, finalWeight, desiredPercent]);

  return (
    <Container>
      <div className="py-8">
        <SectionTitle title="حساب المعدل" subtitle="—" />

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader title="حاسبة المعدل الفصلي" subtitle="Letter Grades → 4.0 Scale" />
            <CardContent>
              <div className="space-y-3">
                {rows.map((r, i) => (
                  <div key={i} className="grid gap-2 md:grid-cols-12">
                    <input
                      value={r.name}
                      onChange={(e) => setRows((p) => p.map((x, idx) => (idx === i ? { ...x, name: e.target.value } : x)))}
                      placeholder="اسم المادة"
                      className="md:col-span-6 w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                    />
                    <input
                      type="number"
                      min={0}
                      value={r.credits}
                      onChange={(e) => setRows((p) => p.map((x, idx) => (idx === i ? { ...x, credits: Number(e.target.value) } : x)))}
                      placeholder="الساعات"
                      className="md:col-span-3 w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                    />
                    <select
                      value={r.letter}
                      onChange={(e) => setRows((p) => p.map((x, idx) => (idx === i ? { ...x, letter: e.target.value as any } : x)))}
                      className="md:col-span-3 w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                    >
                      {Object.keys(LETTER_TO_GPA).map((k) => (
                        <option key={k} value={k}>{k}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => setRows((p) => p.filter((_, idx) => idx !== i))}
                      className="md:col-span-12 w-fit rounded-lg border border-meu-dark/10 px-3 py-2 text-xs text-meu-gray hover:border-meu-red"
                      disabled={rows.length <= 1}
                    >
                      حذف
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => setRows((p) => [...p, { name: "", credits: 3, letter: "A" }])}
                  className="w-fit rounded-lg border border-meu-dark/10 px-3 py-2 text-xs text-meu-dark hover:border-meu-red"
                >
                  + إضافة مادة
                </button>

                <div className="mt-4 rounded-2xl border border-meu-dark/10 p-4">
                  <div className="text-xs text-meu-gray">المعدل الفصلي</div>
                  <div className="mt-2 text-3xl font-bold text-meu-dark">{semesterGpa ?? "—"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="حاسبة المعدل التراكمي" subtitle="—" />
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <div className="mb-1 text-xs text-meu-gray">المعدل الحالي (0–4)</div>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    max={4}
                    value={currentGpa}
                    onChange={(e) => setCurrentGpa(Number(e.target.value))}
                    className="w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                  />
                </div>
                <div>
                  <div className="mb-1 text-xs text-meu-gray">الساعات المقطوعة</div>
                  <input
                    type="number"
                    min={0}
                    value={finishedCredits}
                    onChange={(e) => setFinishedCredits(Number(e.target.value))}
                    className="w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="mb-2 text-sm font-semibold text-meu-dark">مواد جديدة</div>
                  <div className="space-y-3">
                    {newCourses.map((r, i) => (
                      <div key={i} className="grid gap-2 md:grid-cols-12">
                        <input
                          value={r.name}
                          onChange={(e) => setNewCourses((p) => p.map((x, idx) => (idx === i ? { ...x, name: e.target.value } : x)))}
                          placeholder="اسم المادة"
                          className="md:col-span-6 w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                        />
                        <input
                          type="number"
                          min={0}
                          value={r.credits}
                          onChange={(e) => setNewCourses((p) => p.map((x, idx) => (idx === i ? { ...x, credits: Number(e.target.value) } : x)))}
                          placeholder="الساعات"
                          className="md:col-span-3 w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                        />
                        <select
                          value={r.letter}
                          onChange={(e) => setNewCourses((p) => p.map((x, idx) => (idx === i ? { ...x, letter: e.target.value as any } : x)))}
                          className="md:col-span-3 w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                        >
                          {Object.keys(LETTER_TO_GPA).map((k) => (
                            <option key={k} value={k}>{k}</option>
                          ))}
                        </select>

                        <button
                          onClick={() => setNewCourses((p) => p.filter((_, idx) => idx !== i))}
                          className="md:col-span-12 w-fit rounded-lg border border-meu-dark/10 px-3 py-2 text-xs text-meu-gray hover:border-meu-red"
                          disabled={newCourses.length <= 1}
                        >
                          حذف
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={() => setNewCourses((p) => [...p, { name: "", credits: 3, letter: "A" }])}
                      className="w-fit rounded-lg border border-meu-dark/10 px-3 py-2 text-xs text-meu-dark hover:border-meu-red"
                    >
                      + إضافة مادة
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 rounded-2xl border border-meu-dark/10 p-4">
                  <div className="text-xs text-meu-gray">المعدل التراكمي الجديد</div>
                  <div className="mt-2 text-3xl font-bold text-meu-dark">{newCumulative ?? "—"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader title="كم أحتاج في الفاينل؟" subtitle="—" />
            <CardContent>
              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <div className="mb-1 text-xs text-meu-gray">علامة الميد (0–100)</div>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={mid}
                    onChange={(e) => setMid(Number(e.target.value))}
                    className="w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                  />
                </div>
                <div>
                  <div className="mb-1 text-xs text-meu-gray">وزن الفاينل (%)</div>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={finalWeight}
                    onChange={(e) => setFinalWeight(Number(e.target.value))}
                    className="w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                  />
                </div>
                <div>
                  <div className="mb-1 text-xs text-meu-gray">الهدف (Letter)</div>
                  <select
                    value={desiredLetter}
                    onChange={(e) => setDesiredLetter(e.target.value as any)}
                    className="w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                  >
                    {Object.keys(LETTER_TO_GPA).map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-meu-dark/10 p-4">
                <div className="text-xs text-meu-gray">النتيجة</div>
                <div className="mt-2 text-sm text-meu-dark">
                  {neededOnFinal === null ? "—" : `تحتاج تقريبًا ${neededOnFinal}% في الفاينل.`}
                </div>
                <div className="mt-2 text-xs text-meu-gray">—</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}

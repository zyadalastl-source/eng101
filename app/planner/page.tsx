"use client";

import { useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent, CardHeader } from "@/components/Card";

export default function PlannerPage() {
  const [specialization, setSpecialization] = useState("");
  const [year, setYear] = useState("");
  const [goal, setGoal] = useState("رفع المعدل");
  const [submitted, setSubmitted] = useState(false);

  function onSuggest() {
    setSubmitted(true);
  }

  return (
    <Container>
      <div className="py-8">
        <SectionTitle title="المخطط الدراسي الذكي" subtitle="—" />

        <Card>
          <CardHeader title="مدخلات الخطة" subtitle="—" />
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <div className="mb-1 text-xs text-meu-gray">التخصص</div>
                <input
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="—"
                  className="w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                />
              </div>
              <div>
                <div className="mb-1 text-xs text-meu-gray">السنة الدراسية</div>
                <input
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="—"
                  className="w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                />
              </div>

              <div className="md:col-span-2">
                <div className="mb-1 text-xs text-meu-gray">الهدف من الفصل</div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {["رفع المعدل", "توازن (خفّف مواد)", "التخرج بسرعة"].map((g) => (
                    <label key={g} className="flex cursor-pointer items-center gap-2 rounded-xl border border-meu-dark/10 px-3 py-3 text-sm">
                      <input type="radio" checked={goal === g} onChange={() => setGoal(g)} />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={onSuggest}
              className="mt-5 w-full rounded-xl bg-meu-red px-4 py-3 text-sm font-semibold text-meu-white"
            >
              اقترح لي خطة
            </button>

            <div className="mt-6 rounded-2xl border border-meu-dark/10 p-4">
              <div className="text-sm font-semibold text-meu-dark">المخرجات</div>
              <div className="mt-2 text-sm text-meu-gray">—</div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-meu-gray">
                    <tr className="border-b border-meu-dark/10">
                      <th className="py-3 text-right font-semibold">الفصل</th>
                      <th className="py-3 text-right font-semibold">المواد</th>
                      <th className="py-3 text-right font-semibold">الساعات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submitted ? (
                      <tr className="border-b border-meu-dark/5">
                        <td className="py-3">—</td>
                        <td className="py-3">—</td>
                        <td className="py-3">—</td>
                      </tr>
                    ) : (
                      <tr>
                        <td className="py-6 text-center text-sm text-meu-gray" colSpan={3}>
                          —
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

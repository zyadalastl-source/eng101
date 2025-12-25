"use client";

import { useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent, CardHeader } from "@/components/Card";

export default function QuizzesPage() {
  const [course, setCourse] = useState("");
  const [term, setTerm] = useState("");
  const [started, setStarted] = useState(false);

  return (
    <Container>
      <div className="py-8">
        <SectionTitle title="كويزات المذاكرة" subtitle="—" />

        <Card>
          <CardHeader title="إعداد الكويز" subtitle="—" />
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <div className="mb-1 text-xs text-meu-gray">المادة</div>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                >
                  <option value="">—</option>
                  <option value="—">—</option>
                </select>
              </div>
              <div>
                <div className="mb-1 text-xs text-meu-gray">الفصل</div>
                <select
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                >
                  <option value="">—</option>
                  <option value="—">—</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setStarted(true)}
              className="mt-5 rounded-xl bg-meu-red px-5 py-3 text-sm font-semibold text-meu-white"
            >
              ابدأ
            </button>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-meu-dark/10 p-4">
                <div className="text-sm font-semibold text-meu-dark">سؤال</div>
                <div className="mt-2 text-sm text-meu-gray">—</div>
                <div className="mt-4 grid gap-2">
                  {["—", "—", "—", "—"].map((a, i) => (
                    <button key={i} className="rounded-xl border border-meu-dark/10 px-4 py-3 text-right text-sm hover:border-meu-red">
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-meu-dark/10 p-4">
                <div className="text-sm font-semibold text-meu-dark">النتائج والمراجعة</div>
                <div className="mt-2 text-sm text-meu-gray">{started ? "—" : "—"}</div>
                <div className="mt-4 h-32 rounded-xl bg-meu-dark/5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

"use client";

import { useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent, CardHeader } from "@/components/Card";
import { addDocPlaceholder } from "@/lib/firebase";

type FeedbackForm = {
  name: string;
  major: string;
  year: string;
  target: string;
  type: string;
  text: string;
};

const initial: FeedbackForm = {
  name: "",
  major: "",
  year: "",
  target: "",
  type: "",
  text: ""
};

export default function FeedbackPage() {
  const [form, setForm] = useState<FeedbackForm>(initial);
  const [done, setDone] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit() {
    setDone(null);
    setBusy(true);
    try {
      const res = await addDocPlaceholder("feedback", { ...form, createdAt: Date.now() });
      setDone(res.id);
      setForm(initial);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Container>
      <div className="py-8">
        <SectionTitle title="صندوق اقتراحات الطلاب" subtitle="—" />

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader title="نموذج الإرسال" subtitle="—" />
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { k: "name", label: "الاسم" },
                  { k: "major", label: "التخصص" },
                  { k: "year", label: "السنة" },
                  { k: "target", label: "المادة / الدكتور" }
                ].map((f) => (
                  <div key={f.k}>
                    <div className="mb-1 text-xs text-meu-gray">{f.label}</div>
                    <input
                      value={(form as any)[f.k]}
                      onChange={(e) => setForm((p) => ({ ...p, [f.k]: e.target.value }))}
                      placeholder="—"
                      className="w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                    />
                  </div>
                ))}

                <div>
                  <div className="mb-1 text-xs text-meu-gray">نوع الملاحظة</div>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                    className="w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                  >
                    <option value="">—</option>
                    <option value="اقتراح">—</option>
                    <option value="شكوى">—</option>
                    <option value="تحسين">—</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <div className="mb-1 text-xs text-meu-gray">نص الاقتراح</div>
                  <textarea
                    value={form.text}
                    onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
                    placeholder="—"
                    rows={6}
                    className="w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={onSubmit}
                  disabled={busy}
                  className="rounded-xl bg-meu-red px-5 py-3 text-sm font-semibold text-meu-white disabled:opacity-50"
                >
                  إرسال
                </button>
                {done ? <div className="text-xs text-meu-gray">— {done}</div> : <div className="text-xs text-meu-gray">—</div>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Analytics" subtitle="—" />
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-xl border border-meu-dark/10 p-4">
                  <div className="text-xs text-meu-gray">—</div>
                  <div className="mt-2 h-20 rounded-lg bg-meu-dark/5" />
                </div>
                <div className="rounded-xl border border-meu-dark/10 p-4">
                  <div className="text-xs text-meu-gray">—</div>
                  <div className="mt-2 h-20 rounded-lg bg-meu-dark/5" />
                </div>
                <div className="rounded-xl border border-meu-dark/10 p-4">
                  <div className="text-xs text-meu-gray">—</div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="h-10 rounded-lg bg-meu-red/10" />
                    <div className="h-10 rounded-lg bg-meu-dark/5" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}

"use client";

import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/Card";
import Link from "next/link";
import { useMemo, useState } from "react";
import { COURSES } from "@/data/courses";

export default function CoursesPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return COURSES;
    return COURSES.filter((c) => (c.code + " " + c.name).toLowerCase().includes(s));
  }, [q]);

  return (
    <Container>
      <div className="py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <SectionTitle title="مكتبة المواد الهندسية" subtitle="—" />
          <div className="w-full md:max-w-md">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث عن اسم أو رمز المادة…"
              className="w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Card key={c.code}>
              <CardContent>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="inline-flex items-center rounded-md bg-meu-dark/5 px-2 py-1 text-[11px] text-meu-dark">
                      {c.code}
                    </div>
                    <div className="mt-2 truncate text-sm font-semibold text-meu-dark">{c.name}</div>
                    <div className="mt-1 text-xs text-meu-gray">—</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link href={`/courses/${c.code}`} className="rounded-lg border border-meu-dark/10 px-3 py-2 text-center text-xs text-meu-dark hover:border-meu-red">
                    سلايدات
                  </Link>
                  <Link href={`/courses/${c.code}`} className="rounded-lg border border-meu-dark/10 px-3 py-2 text-center text-xs text-meu-dark hover:border-meu-red">
                    امتحانات سنوات
                  </Link>
                  <Link href={`/courses/${c.code}`} className="rounded-lg border border-meu-dark/10 px-3 py-2 text-center text-xs text-meu-dark hover:border-meu-red">
                    ملخصات
                  </Link>
                  <Link href={`/courses/${c.code}`} className="rounded-lg border border-meu-dark/10 px-3 py-2 text-center text-xs text-meu-dark hover:border-meu-red">
                    — 
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}

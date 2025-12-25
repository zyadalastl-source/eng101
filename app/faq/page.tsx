"use client";

import { useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent, CardHeader } from "@/components/Card";
import { FAQ_ITEMS } from "@/data/faq";

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Container>
      <div className="py-8">
        <SectionTitle title="الأسئلة الشائعة" subtitle="—" />
        <Card>
          <CardHeader title="FAQ" subtitle="—" />
          <CardContent>
            <div className="space-y-2">
              {FAQ_ITEMS.map((it, idx) => {
                const isOpen = open === idx;
                return (
                  <div key={idx} className="rounded-xl border border-meu-dark/10">
                    <button
                      onClick={() => setOpen(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 px-4 py-3 text-right text-sm font-semibold text-meu-dark"
                    >
                      <span>{it.q}</span>
                      <span className="text-meu-gray">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen ? (
                      <div className="border-t border-meu-dark/10 px-4 py-3 text-sm text-meu-gray">
                        {it.a}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

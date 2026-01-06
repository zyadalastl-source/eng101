"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Tab = "slides" | "summaries" | "exams";

const TAB_TO_ID: Record<Tab, string> = {
  slides: "tab-slides",
  summaries: "tab-summaries",
  exams: "tab-exams",
};

export default function ScrollToTab() {
  const sp = useSearchParams();
  const tab = (sp.get("tab") || "") as Tab;

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!tab || !(tab in TAB_TO_ID)) return;

    const id = TAB_TO_ID[tab];
    const el = document.getElementById(id);
    if (!el) return;

    // Scroll smoothly
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // Highlight
    setActiveId(id);
    const t = window.setTimeout(() => setActiveId(null), 1600);

    return () => window.clearTimeout(t);
  }, [tab]);

  useEffect(() => {
    // Apply highlight class without changing layout
    const ids = Object.values(TAB_TO_ID);

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;

      if (activeId === id) {
        el.classList.add(
          "ring-2",
          "ring-meu-red/40",
          "shadow-md",
          "transition",
          "duration-300"
        );
      } else {
        el.classList.remove(
          "ring-2",
          "ring-meu-red/40",
          "shadow-md",
          "transition",
          "duration-300"
        );
      }
    }
  }, [activeId]);

  return null;
}

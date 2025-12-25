"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import { NAV_LINKS } from "@/data/nav";
import { SITE } from "@/lib/theme";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-meu-dark/10 bg-meu-red text-meu-white">
      <Container>
        <div className="flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-meu-white/10 ring-1 ring-meu-white/20">
              <Image src="/meu-logo.svg" alt="MEU Logo" fill className="object-cover" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">{SITE.domain}</div>
              <div className="text-xs opacity-90">{SITE.botName} — {SITE.university}</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.slice(0, 7).map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    "rounded-lg px-3 py-2 text-sm transition",
                    active ? "bg-meu-white/12 ring-1 ring-meu-white/25" : "hover:bg-meu-white/10"
                  ].join(" ")}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/courses"
              className="rounded-lg bg-meu-white px-3 py-2 text-sm font-semibold text-meu-red hover:opacity-95"
            >
              تصفّح المواد
            </Link>
            <Link
              href="/chatbot"
              className="rounded-lg border border-meu-white/30 px-3 py-2 text-sm hover:bg-meu-white/10"
            >
              اسأل الجزري
            </Link>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 lg:hidden">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  "whitespace-nowrap rounded-full px-3 py-1.5 text-xs",
                  active ? "bg-meu-white/14 ring-1 ring-meu-white/25" : "bg-meu-white/8 hover:bg-meu-white/12"
                ].join(" ")}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </Container>
    </header>
  );
}

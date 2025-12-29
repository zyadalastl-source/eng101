"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import { NAV_LINKS } from "@/data/nav";
import { SITE } from "@/lib/theme";

export default function Header() {
  const pathname = usePathname();
  const MOBILE_NAV = NAV_LINKS.filter((l) =>
  ["/", "/chatbot", "/courses", "/bus", "/planner", "/gpa"].includes(l.href)
);

  return (
    <header
      className="
        sticky top-0 z-50
        bg-gradient-to-b from-meu-red/95 to-meu-red/80
        text-meu-white
        backdrop-blur supports-[backdrop-filter]:bg-meu-red/70
        border-b border-white/10
      "
    >
      <Container>
        {/* Top row */}
        <div className="py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Brand badge */}
            <Link
              href="/"
              className="
                group flex items-center gap-3
                rounded-2xl border border-white/15 bg-white/10
                px-3 py-2
                shadow-sm
                transition hover:bg-white/12
              "
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/20">
                <Image src="/meu-logo.svg" alt="MEU Logo" fill className="object-cover" />
              </div>

              <div className="leading-tight text-right">
                <div className="text-sm font-extrabold tracking-wide">
                  {SITE.domain}
                </div>
                <div className="text-[11px] opacity-85">
                  {SITE.botName} — {SITE.university}
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex flex-1 justify-center">
              <div
                className="
                  relative flex items-center gap-1
                  rounded-2xl border border-white/15 bg-white/10
                  p-1
                  shadow-sm
                "
              >
                {NAV_LINKS.slice(0, 7).map((l) => {
                  const active = pathname === l.href;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={[
                        "relative rounded-xl px-4 py-2 text-sm font-semibold transition",
                        "hover:bg-white/10 hover:translate-y-[-1px]",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                        active ? "text-white" : "text-white/85",
                      ].join(" ")}
                    >
                      {l.label}

                      {/* Active indicator */}
                      <span
                        className={[
                          "absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-[2px] rounded-full transition-all duration-300",
                          active ? "w-8 bg-white/85" : "w-0 bg-transparent",
                        ].join(" ")}
                      />
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Right side (keeps center truly centered) */}
            <div className="hidden lg:block w-[180px]" />
          </div>

          {/* Mobile nav pills (beautiful) */}
          <div className="relative mt-3 lg:hidden">
            {/* side fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-meu-red/95 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-meu-red/95 to-transparent" />

            <div
              className="
                flex gap-2 overflow-x-auto px-1
                [scrollbar-width:none] [-ms-overflow-style:none]
              "
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

               {MOBILE_NAV.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={[
                      "whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition",
                      "active:scale-[0.98]",
                      active
                        ? "bg-white/18 ring-1 ring-white/25"
                        : "bg-white/10 hover:bg-white/14",
                    ].join(" ")}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

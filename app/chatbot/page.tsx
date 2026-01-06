"use client";

import Container from "@/components/Container";
import { Card, CardContent } from "@/components/Card";
import Image from "next/image";
import { Tajawal } from "next/font/google";
import React, { useEffect, useMemo, useRef, useState } from "react";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
});

type Msg = {
  id: string;
  role: "bot" | "user";
  text: string;
  ts: number;
};

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function formatTime(ts: number) {
  try {
    return new Intl.DateTimeFormat("ar-JO", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(ts));
  } catch {
    return "";
  }
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** زخرفة زاوية بسيطة (SVG) */
function CornerOrnament({
  className,
  flipX,
  flipY,
}: {
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  const sx = flipX ? -1 : 1;
  const sy = flipY ? -1 : 1;

  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      aria-hidden="true"
      style={{
        transform: `scale(${sx}, ${sy})`,
      }}
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {/* إطار */}
      <path
        d="M10 10h55c25 0 45 20 45 45v55H80c-28 0-50-22-50-50V10z"
        fill="none"
        stroke="url(#g)"
        strokeWidth="2.4"
      />

      {/* نجمة أندلسية */}
      <path
        d="M60 22l10 14 17 5-11 13 1 18-17-7-17 7 1-18-11-13 17-5z"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.65"
        strokeWidth="2"
      />

      <circle
        cx="60"
        cy="60"
        r="18"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="2"
      />

      {/* نقط */}
      <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.35" />
      <circle cx="88" cy="34" r="2" fill="currentColor" opacity="0.35" />
      <circle cx="36" cy="86" r="2" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: uid(),
      role: "bot",
      text: "مرحباً 👋 أنا الجزري. اكتب سؤالك وسأساعدك بشكل واضح وسريع.",
      ts: Date.now(),
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs.length, isTyping]);

  function send() {
    const v = input.trim();
    if (!v || isTyping) return;

    setMsgs((p) => [...p, { id: uid(), role: "user", text: v, ts: Date.now() }]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      setMsgs((p) => [
        ...p,
        {
          id: uid(),
          role: "bot",
          text: "تمام ✅ وصلتني رسالتك. (حالياً هذا رد تجريبي) — اربطني بالـ API وبصير يجاوبك فعلياً.",
          ts: Date.now(),
        },
      ]);
      setIsTyping(false);
    }, 650);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") send();
  }

  const today = useMemo(() => {
    try {
      return new Intl.DateTimeFormat("ar-JO", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date());
    } catch {
      return "";
    }
  }, []);

  return (
    <div
      dir="rtl"
      className={cn(
        tajawal.className,
        "min-h-screen w-full max-w-full overflow-x-hidden bg-[#fafafa]"
      )}
    >
      {/* خلفية خفيفة للصفحة */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-meu-red/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-meu-red/10 blur-3xl" />
      </div>

      <section className="py-10">
        <Container>
          {/* Header */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="text-right">
              <h1 className="text-2xl md:text-3xl font-extrabold text-meu-dark">
                شات بوت الجزري
              </h1>
              <p className="mt-1 text-sm text-meu-gray">
                مساعدك الذكي في كلية الهندسة — اسأل بأي وقت.
              </p>
              <div className="mt-2 text-xs text-meu-gray">{today}</div>
            </div>

            {/* Avatar + status */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-meu-gray/15 bg-white/70 px-3 py-2 backdrop-blur">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-meu-dark">متصل</span>
              </div>

              <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-meu-red/25">
                <Image
                src="/library-hero.webp"
                alt="Engineering Courses Library"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              </div>
             </div>
            </div>  


          {/* Chat Card */}
          <Card className="w-full max-w-full overflow-hidden border border-meu-gray/15 shadow-sm">
            <CardContent>
              {/* Top bar */}
              <div className="mb-4 flex items-center justify-between rounded-2xl border border-meu-gray/10 bg-white/70 px-4 py-3 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-meu-red/20">
                    <Image src="/aljazari.png" alt="AlJazari" fill className="object-cover" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-extrabold text-meu-dark">الجزري</div>
                    <div className="text-xs text-meu-gray">مساعد ENG101 • MEU</div>
                  </div>
                </div>

                <div className="text-xs text-meu-gray">MEU • ENG101</div>
              </div>

              {/* Messages box */}
              <div className="relative">
                {/* خلفية زخرفة واضحة + صور (Corner ornaments) */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
                  {/* Pattern واضح */}
                  <div className="absolute inset-0 text-meu-red/50">
                    <svg className="h-full w-full opacity-[0.34]" viewBox="0 0 800 420" preserveAspectRatio="none">
                      <defs>
                        <pattern id="andalus2" x="0" y="0" width="92" height="92" patternUnits="userSpaceOnUse">
                          <path
                            d="M46 8 L60 22 L84 24 L64 42 L68 66 L46 54 L24 66 L28 42 L8 24 L32 22 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.3"
                            opacity="0.95"
                          />
                          <circle cx="46" cy="46" r="16" fill="none" stroke="currentColor" strokeWidth="2.1" opacity="0.9" />
                          <path
                            d="M46 30 L62 46 L46 62 L30 46 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            opacity="0.8"
                          />
                        </pattern>
                      </defs>
                      <rect width="800" height="420" fill="url(#andalus2)" />
                    </svg>
                  </div>

                  {/* تلطيف بسيط جداً (بدون ما يخفي) */}
                  <div className="absolute inset-0 bg-white/12" />

                  {/* Corner ornaments (كأنها صور زخرفة) */}
                  <CornerOrnament className="absolute top-3 right-3 h-24 w-24 text-meu-red/55" />
                  <CornerOrnament className="absolute bottom-3 left-3 h-24 w-24 text-meu-red/55" flipX flipY />

                  {/* Glow */}
                  <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-meu-red/12 blur-3xl" />
                  <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-meu-red/12 blur-3xl" />
                </div>

                <div
                    ref={listRef}
                    className="relative h-[54vh] min-h-[380px] w-full overflow-y-auto overflow-x-hidden rounded-2xl border border-meu-gray/15 p-4"
                    style={{
                      backgroundImage: `
                        linear-gradient(
                          rgba(255,255,255,0.92),
                          rgba(255,255,255,0.92)
                        ),
                        url('/andalus-pattern.png')
                      `,
                      backgroundRepeat: "repeat",
                      backgroundSize: "420px",
                    }}
                  >

                  <div className="space-y-3">
                    {msgs.map((m) => {
                      const isUser = m.role === "user";
                      return (
                        <div key={m.id} className={cn("flex", isUser ? "justify-start" : "justify-end")}>
                          <div className="max-w-[85%] max-w-full">
                            <div
                              className={cn(
                                "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                                "break-words whitespace-pre-wrap",
                                "animate-[msgIn_260ms_ease-out]",
                                isUser
                                  ? "bg-white/90 text-meu-dark border border-meu-gray/15"
                                  : "bg-meu-red text-white"
                              )}
                            >
                              {m.text}
                            </div>
                            <div className={cn("mt-1 text-[11px] text-meu-gray", isUser ? "text-left" : "text-right")}>
                              {formatTime(m.ts)}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {isTyping && (
                      <div className="flex justify-end">
                        <div className="max-w-[85%]">
                          <div className="rounded-2xl bg-meu-red text-white px-4 py-3 shadow-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold">يكتب…</span>
                              <span className="typing-dots" aria-hidden="true">
                                <i />
                                <i />
                                <i />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={send}
                  className={cn(
                    "rounded-xl bg-meu-red px-5 py-3 text-sm font-extrabold text-white",
                    "hover:opacity-95 transition active:scale-[0.98]",
                    "animate-[btnPulse_2.6s_ease-in-out_infinite]"
                  )}
                >
                  إرسال
                </button>

                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="اسألني؟"
                  className="w-full rounded-xl border border-meu-gray/20 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-meu-red/25"
                />
              </div>

              <div className="mt-3 text-center text-xs text-meu-gray">
               اسال يا غلام 
              </div>

              <style jsx global>{`
                @keyframes msgIn {
                  from {
                    opacity: 0;
                    transform: translateY(10px) scale(0.99);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                  }
                }

                @keyframes btnPulse {
                  0%,
                  100% {
                    transform: translateY(0);
                  }
                  50% {
                    transform: translateY(-2px);
                  }
                }

                .typing-dots {
                  display: inline-flex;
                  align-items: center;
                  gap: 4px;
                }
                .typing-dots i {
                  width: 6px;
                  height: 6px;
                  border-radius: 999px;
                  background: rgba(255, 255, 255, 0.9);
                  display: inline-block;
                  animation: dot 1.05s infinite ease-in-out;
                }
                .typing-dots i:nth-child(2) {
                  animation-delay: 0.15s;
                }
                .typing-dots i:nth-child(3) {
                  animation-delay: 0.3s;
                }
                @keyframes dot {
                  0%,
                  100% {
                    transform: translateY(0);
                    opacity: 0.6;
                  }
                  50% {
                    transform: translateY(-4px);
                    opacity: 1;
                  }
                }
              `}</style>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}

"use client";

import Container from "@/components/Container";
import { Card, CardContent } from "@/components/Card";
import Image from "next/image";
import { Tajawal } from "next/font/google";
import { useEffect, useRef, useState } from "react";


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

export default function ChatbotPage() {
  const [input, setInput] = useState("");
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
    // auto scroll
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs.length]);

  function send() {
    const v = input.trim();
    if (!v) return;

    const userMsg: Msg = { id: uid(), role: "user", text: v, ts: Date.now() };
    setMsgs((p) => [...p, userMsg]);
    setInput("");

    // رد تجريبي (بدّلها لاحقًا بربط API)
    setTimeout(() => {
      const botMsg: Msg = {
        id: uid(),
        role: "bot",
        text: "تمام ✅ وصلتني رسالتك. (حالياً هذا رد تجريبي) — اربطني بالـ API وبصير يجاوبك فعلياً.",
        ts: Date.now(),
      };
      setMsgs((p) => [...p, botMsg]);
    }, 450);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") send();
  }

  return (
    <div className={tajawal.className}>
      {/* خلفية خفيفة (اختياري) */}
      <div className="relative">
        {/* زخرفة حواف خفيفة — احذف هالسطرين إذا مش بدك */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-meu-red/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-meu-red/10 blur-3xl" />
        </div>

        <section className="py-10">
          <Container>
            {/* Header */}
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="text-right">
                <h1 className="text-2xl font-extrabold text-meu-dark">
                  شات بوت الجزري
                </h1>
                <p className="mt-1 text-sm text-meu-gray">
                  مساعدك الذكي في كلية الهندسة — اسأل بأي وقت.
                </p>
              </div>

              {/* Avatar + status */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 rounded-full border border-meu-gray/15 bg-white/70 px-3 py-2 backdrop-blur">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-meu-dark">متصل</span>
                </div>

                <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-meu-red/25">
                  <Image
                    src="/aljazari.png"
                    alt="AlJazari Avatar"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Chat Card */}
            <Card className="overflow-hidden border border-meu-gray/15 shadow-sm">
              <CardContent>
                {/* Top bar inside chat */}
                <div className="mb-4 flex items-center justify-between rounded-2xl border border-meu-gray/10 bg-meu-gray/5 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-meu-red/20">
                      <Image
                        src="/aljazari.png"
                        alt="AlJazari Avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="leading-tight">
                      <div className="text-sm font-extrabold text-meu-dark">
                        الجزري
                      </div>
                      <div className="text-xs text-meu-gray">
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-meu-gray">
                    MEU • ENG101
                  </div>
                </div>

                {/* Messages */}
                <div
                  ref={listRef}
                  className="h-[52vh] min-h-[360px] overflow-y-auto rounded-2xl border border-meu-gray/10 bg-white p-4"
                >
                  <div className="space-y-3">
                    {msgs.map((m) => (
                      <div
                        key={m.id}
                        className={[
                          "flex",
                          m.role === "user" ? "justify-start" : "justify-end",
                        ].join(" ")}
                      >
                        {/* bubble */}
                        <div
                          className={[
                            "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                            "animate-[msgIn_260ms_ease-out]",
                            m.role === "user"
                              ? "bg-meu-gray/10 text-meu-dark"
                              : "bg-meu-red text-white",
                          ].join(" ")}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={send}
                    className="rounded-xl bg-meu-red px-5 py-3 text-sm font-extrabold text-white hover:opacity-95 transition
                    active:scale-[0.98] animate-[btnPulse_2.4s_ease-in-out_infinite]"
                  >
                    إرسال
                  </button>

                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="اسألني ؟"
                    className="w-full rounded-xl border border-meu-gray/20 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-meu-red/25"
                  />
                </div>

                {/* Footer small */}
                <div className="mt-3 text-center text-xs text-meu-gray">
                </div>
              </CardContent>
            </Card>

            {/* Keyframes */}
            <style jsx global>{`
              @keyframes msgIn {
                from {
                  opacity: 0;
                  transform: translateY(8px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
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
            `}</style>
          </Container>
          
        </section>
      </div>
    </div>
    
  );
}

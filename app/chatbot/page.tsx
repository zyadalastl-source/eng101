"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import { Card, CardContent, CardHeader } from "@/components/Card";
import { handleChat } from "@/lib/chatbot";

type Msg = {
  role: "user" | "bot";
  text: string;
  at: number;
};

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "مرحبًا 👋 كيف أقدر أساعدك؟", at: Date.now() },
  ]);

  const canSend = input.trim().length > 0 && !busy;

  async function onSend() {
    if (!canSend) return;

    const text = input.trim();
    setInput("");

    const userMsg: Msg = { role: "user", text, at: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setBusy(true);

    try {
      const reply = await handleChat(text);
      const botMsg: Msg = { role: "bot", text: reply, at: Date.now() };
      setMessages((m) => [...m, botMsg]);
    } catch (err) {
      const botMsg: Msg = {
        role: "bot",
        text: "❌ صار خطأ بالاتصال مع السيرفر",
        at: Date.now(),
      };
      setMessages((m) => [...m, botMsg]);
    } finally {
      setBusy(false);
    }
  }

  const headerSubtitle = useMemo(() => "مساعدك الذكي في كلية الهندسة", []);

  return (
    <Container>
      <div className="py-8">
        <Card>
          <CardHeader title="شات بوت الجزري" subtitle={headerSubtitle} />
          <CardContent>
            <div className="flex h-[60vh] flex-col gap-3">
              {/* الرسائل */}
              <div className="flex-1 overflow-y-auto rounded-xl border border-meu-dark/10 bg-meu-white p-3">
                <div className="space-y-3">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={[
                        "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                        m.role === "user"
                          ? "ms-auto bg-meu-red text-meu-white"
                          : "me-auto bg-meu-dark/5 text-meu-dark",
                      ].join(" ")}
                    >
                      {m.text}
                    </div>
                  ))}
                  {busy && (
                    <div className="me-auto text-xs text-meu-gray">
                      يكتب الآن...
                    </div>
                  )}
                </div>
              </div>

              {/* الإدخال */}
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onSend();
                  }}
                  placeholder="اكتب سؤالك هنا (مثال: متى موعد الباص؟)"
                  className="w-full rounded-xl border border-meu-dark/15 bg-meu-white px-4 py-3 text-sm outline-none focus:border-meu-red"
                />
                <button
                  onClick={onSend}
                  disabled={!canSend}
                  className="rounded-xl bg-meu-dark px-4 py-3 text-sm font-semibold text-meu-white disabled:opacity-40"
                >
                  إرسال
                </button>
              </div>

              <div className="text-center text-xs text-meu-gray">
                #الجزري #MEU #ENG101
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

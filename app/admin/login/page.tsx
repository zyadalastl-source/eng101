"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);

  async function onLogin() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data?.message || "فشل تسجيل الدخول");
        return;
      }

      window.location.href = "/admin/library";
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold mb-2">تسجيل دخول الأدمن</h1>
        <p className="text-sm text-gray-500 mb-4">أدخل مفتاح الأدمن للدخول للوحة التحكم.</p>

        <input
          className="w-full rounded-xl border px-4 py-3 outline-none"
          placeholder="Admin Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />

        <button
          onClick={onLogin}
          disabled={loading || !key}
          className="mt-4 w-full rounded-xl bg-meu-red px-4 py-3 text-white disabled:opacity-60"
        >
          {loading ? "جاري..." : "دخول"}
        </button>
      </div>
    </div>
  );
}

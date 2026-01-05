"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
        credentials: "include",
      });

      const j = await r.json();
      if (!r.ok || !j.ok) {
        alert("فشل تسجيل الدخول");
        return;
      }

      router.replace("/admin/library");
    } catch {
      alert("مشكلة شبكة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm space-y-4">
        <h1 className="text-xl font-bold text-center">تسجيل دخول الأدمن</h1>

        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="أدخل مفتاح الأدمن"
          className="w-full rounded-lg border px-3 py-2"
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full rounded-lg bg-red-700 text-white py-2 disabled:opacity-60"
        >
          {loading ? "جارٍ الدخول..." : "دخول"}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
        credentials: "include",
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json?.ok) {
        alert(json?.message || "فشل تسجيل الدخول");
        return;
      }

      router.push("/admin/library");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold mb-2 text-center">تسجيل دخول الأدمن</h1>
        <p className="text-sm text-gray-600 mb-4 text-center">
          أدخل مفتاح الأدمن للدخول للوحة التحكم
        </p>

        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="enter admin pass"
          className="w-full rounded-lg border px-3 py-2"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="mt-4 w-full rounded-lg bg-meu-red px-4 py-2 text-white hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "جارٍ الدخول..." : "دخول"}
        </button>
      </div>
    </div>
  );
}

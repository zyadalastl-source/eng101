export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

function safeName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.\-_]/g, "");
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const course_code = String(form.get("course_code") || "").trim();
    const type = String(form.get("type") || "").trim(); // slides | summary | exam
    const title = String(form.get("title") || "").trim();
    const yearRaw = String(form.get("year") || "").trim();
    const file = form.get("file");

    if (!course_code || !type || !title) {
      return NextResponse.json(
        { ok: false, message: "حقول ناقصة (course_code/type/title)" },
        { status: 400 }
      );
    }

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { ok: false, message: "لم يتم إرسال ملف صحيح" },
        { status: 400 }
      );
    }

    // ✅ لو بدك تحدد أنواع ملفات مسموحة
    // if (!file.name.toLowerCase().endsWith(".pdf")) {
    //   return NextResponse.json({ ok: false, message: "مسموح PDF فقط" }, { status: 400 });
    // }

    // ✅ لو بدك حد أقصى للحجم (مثلاً 20MB)
    const maxMB = 20;
    if (file.size > maxMB * 1024 * 1024) {
      return NextResponse.json(
        { ok: false, message: `الملف كبير (أكثر من ${maxMB}MB)` },
        { status: 400 }
      );
    }

    const year = yearRaw ? Number(yearRaw) : null;

    const ts = Date.now();
    const path = `${course_code}/${type}/${ts}-${safeName(file.name)}`;

    // ✅ رفع مباشر للملف بدون تحويلات (أسرع وأكثر استقرار)
    const up = await supabaseAdmin.storage.from("library").upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

    if (up.error) {
      return NextResponse.json(
        { ok: false, message: "فشل رفع الملف", error: up.error.message },
        { status: 500 }
      );
    }

    // ✅ رابط عام (bucket public)
    const { data: pub } = supabaseAdmin.storage.from("library").getPublicUrl(path);
    const url = pub.publicUrl;

    // ✅ إدخال في materials
    const ins = await supabaseAdmin.from("materials").insert({
      course_code,
      type,
      title,
      year,
      url,
    });

    if (ins.error) {
      // إذا فشل الإدخال، احذف الملف اللي انرفع
      await supabaseAdmin.storage.from("library").remove([path]);

      return NextResponse.json(
        { ok: false, message: "فشل حفظ البيانات في materials", error: ins.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, url, path });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, message: "Unexpected error", error: String(e?.message || e) },
      { status: 500 }
    );
  }
}

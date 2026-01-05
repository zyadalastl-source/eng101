import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const adminSecret = process.env.ADMIN_SECRET || process.env.ADMIN_KEY || "";
    const cookieKey = cookies().get("admin_key")?.value || "";

    if (!adminSecret || cookieKey !== adminSecret) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const course_code = String(formData.get("course_code") || "").trim();
    const type = String(formData.get("type") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const year = String(formData.get("year") || "").trim();
    const file = formData.get("file");

    if (!course_code || !type || !title || !(file instanceof File)) {
      return NextResponse.json(
        { ok: false, message: "بيانات ناقصة أو ملف غير صحيح" },
        { status: 400 }
      );
    }

    const BUCKET = "library";

    const ext = file.name.includes(".") ? file.name.split(".").pop() : "pdf";
    const safeName = `${crypto.randomUUID()}.${ext}`;
    const filePath = `${course_code}/${type}/${safeName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadRes = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(filePath, buffer, {
        contentType: file.type || "application/pdf",
        upsert: false,
      });

    if (uploadRes.error) {
      console.error("UPLOAD ERROR:", uploadRes.error);
      return NextResponse.json(
        { ok: false, message: "فشل رفع الملف إلى التخزين", debug: uploadRes.error },
        { status: 500 }
      );
    }

    // ✅ هذا الرابط يفتح فقط إذا Bucket Public
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(BUCKET)
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    const insertRes = await supabaseAdmin.from("materials").insert({
      course_code,
      type,
      title,
      year: year ? Number(year) : null,
      url: publicUrl,
    });

    if (insertRes.error) {
      console.error("DB ERROR:", insertRes.error);
      return NextResponse.json(
        { ok: false, message: "فشل حفظ البيانات في الجدول", debug: insertRes.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, url: publicUrl, path: filePath });
  } catch (err: any) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { ok: false, message: "خطأ غير متوقع", debug: String(err?.message || err) },
      { status: 500 }
    );
  }
}

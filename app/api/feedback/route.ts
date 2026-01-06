import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ تحكم بالحقول المسموحة
    const payload = {
      secret: process.env.GS_WEBHOOK_SECRET || "",
      name: body.name || "",
      university_email: body.university_email || "",
      major: body.major || "",
      academic_year: body.academic_year || "",
      course: body.course || "",
      feedback_type: body.feedback_type || "",
      message: body.message || "",
      page_url: body.page_url || "",
      user_agent: req.headers.get("user-agent") || "",
    };

    const r = await fetch(process.env.GS_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await r.text().catch(() => "");
    if (!r.ok) {
      return NextResponse.json({ ok: false, error: "google_script_failed", details: text }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "unknown" }, { status: 500 });
  }
}

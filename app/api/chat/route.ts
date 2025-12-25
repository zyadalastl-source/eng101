import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = (body?.message ?? "").toString();

    const reply =
      message.length === 0
        ? "اكتب رسالة أولاً 🙂"
        : `هذا رد تجريبي من API ✅\nرسالتك: ${message}`;

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      { reply: "صار خطأ بالسيرفر" },
      { status: 500 }
    );
  }
}


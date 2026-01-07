import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  const res = await fetch(process.env.N8N_WEBHOOK_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();

  return NextResponse.json({
    reply: data.reply ?? "ما وصلني رد من النظام.",
  });
}

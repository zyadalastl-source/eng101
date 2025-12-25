export async function handleChat(message: string): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await res.json().catch(() => ({}));
  return data.reply ?? "—";
}


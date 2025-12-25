export function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "منطلق"
      ? "bg-meu-red/10 text-meu-red"
      : status === "مزدحم"
      ? "bg-meu-dark/10 text-meu-dark"
      : "bg-meu-gray/10 text-meu-gray";

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}

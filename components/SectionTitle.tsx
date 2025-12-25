export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-meu-dark">{title}</div>
      {subtitle ? <div className="mt-1 text-sm text-meu-gray">{subtitle}</div> : null}
    </div>
  );
}

import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <Container>
      <div className="py-16 text-center">
        <div className="text-2xl font-bold text-meu-dark">—</div>
        <div className="mt-3 text-sm text-meu-gray">—</div>
        <Link href="/" className="mt-6 inline-flex rounded-xl bg-meu-red px-4 py-2 text-sm font-semibold text-meu-white">
          العودة للرئيسية
        </Link>
      </div>
    </Container>
  );
}

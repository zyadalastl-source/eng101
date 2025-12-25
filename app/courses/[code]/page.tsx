import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/Card";
import { COURSES } from "@/data/courses";
import Link from "next/link";

export default function CourseDetailsPage({ params }: { params: { code: string } }) {
  const course = COURSES.find((c) => c.code.toLowerCase() === params.code.toLowerCase());

  return (
    <Container>
      <div className="py-8">
        <SectionTitle title="صفحة مادة" subtitle="—" />
        <Card>
          <CardContent>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-meu-dark">{course?.code ?? params.code}</div>
                <div className="mt-1 text-xs text-meu-gray">{course?.name ?? "—"}</div>
              </div>
              <Link href="/courses" className="rounded-lg border border-meu-dark/10 px-3 py-2 text-xs text-meu-dark hover:border-meu-red">
                العودة للمكتبة
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-meu-dark/10 p-4">
                <div className="text-xs text-meu-gray">المتطلب السابق</div>
                <div className="mt-2 text-sm font-semibold text-meu-dark">—</div>
              </div>
              <div className="rounded-xl border border-meu-dark/10 p-4">
                <div className="text-xs text-meu-gray">الساعات</div>
                <div className="mt-2 text-sm font-semibold text-meu-dark">—</div>
              </div>
              <div className="rounded-xl border border-meu-dark/10 p-4">
                <div className="text-xs text-meu-gray">التصنيف</div>
                <div className="mt-2 text-sm font-semibold text-meu-dark">—</div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {["سلايدات", "امتحانات سنوات", "ملخصات"].map((t) => (
                <div key={t} className="rounded-xl border border-meu-dark/10 p-4">
                  <div className="text-sm font-semibold text-meu-dark">{t}</div>
                  <div className="mt-2 text-sm text-meu-gray">—</div>
                  <div className="mt-3 inline-flex rounded-lg bg-meu-red px-3 py-2 text-xs font-semibold text-meu-white">
                    — 
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

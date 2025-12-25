import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/Card";
import Link from "next/link";

const FEATURES = [
  { title: "شات بوت الجزري", href: "/chatbot" },
  { title: "مكتبة المواد", href: "/courses" },
  { title: "MEU BUS النقل", href: "/bus" },
  { title: "مخطّط المواد الذكي", href: "/planner" },
  { title: "أدوات حساب المعدل", href: "/gpa" },
  { title: "كويزات المذاكرة", href: "/quizzes" }
] as const;

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-meu-red to-meu-red/90 text-meu-white">
        <Container>
          <div className="py-12 md:py-16">
            <div className="max-w-2xl">
              <div className="text-xs opacity-90">ENG101.com</div>
              <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">
                — 
              </h1>
              <p className="mt-3 text-sm text-meu-white/85 md:text-base">
                — 
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/courses"
                  className="rounded-xl bg-meu-white px-4 py-2 text-sm font-semibold text-meu-red"
                >
                  تصفّح المواد
                </Link>
                <Link
                  href="/chatbot"
                  className="rounded-xl border border-meu-white/30 px-4 py-2 text-sm font-semibold text-meu-white hover:bg-meu-white/10"
                >
                  اسأل الجزري
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <SectionTitle title="خدمات المنصة" subtitle="—" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Link key={f.title} href={f.href} className="group">
                <Card className="transition group-hover:shadow-md">
                  <CardContent>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-meu-dark">{f.title}</div>
                        <div className="mt-1 text-xs text-meu-gray">—</div>
                      </div>
                      <div className="text-meu-gray">←</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Card>
              <CardContent>
                <SectionTitle title="لماذا ENG101.com؟" subtitle="—" />
                <div className="space-y-2 text-sm text-meu-gray">
                  <div>—</div>
                  <div>—</div>
                  <div>—</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-meu-dark text-meu-white">
              <CardContent>
                <SectionTitle title="لمن هذا النظام؟" subtitle="—" />
                <div className="space-y-2 text-sm text-meu-gray">
                  <div className="text-meu-gray">—</div>
                  <div className="text-meu-gray">—</div>
                  <div className="text-meu-gray">—</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
}

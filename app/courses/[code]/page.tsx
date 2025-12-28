"use client";

import Container from "@/components/Container";
import { Card, CardContent } from "@/components/Card";
import Link from "next/link";
import { Tajawal } from "next/font/google";

type PageProps = {
  params: { code: string };
};

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
});

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-12 w-12 place-items-center rounded-full bg-meu-red/10 ring-1 ring-meu-red/20">
      {children}
    </div>
  );
}

function MiniIcon({ path }: { path: string }) {
  // أيقونة SVG صغيرة بنفس ثيم الصورة
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-meu-red">
      <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CoursePage({ params }: PageProps) {
  const code = params.code;

  return (
    <div className={tajawal.className}>
      <section className="py-10">
        <Container>
          {/* Top header row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-right">
              <h1 className="text-2xl font-extrabold text-meu-dark">صفحة المادة</h1>
              <p className="mt-1 text-sm text-meu-gray">
                كل شيء متعلق بالمادة: سلايدات، ملخصات، وامتحانات سنوات.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-meu-red/20 bg-meu-red/5 px-4 py-2 text-sm font-extrabold text-meu-red">
                رمز المادة: {code}
              </span>

              <Link
                href="/courses"
                className="rounded-xl border border-meu-gray/20 bg-white px-4 py-2 text-sm font-semibold text-meu-dark hover:bg-meu-gray/5 transition"
              >
                العودة للمكتبة
              </Link>
            </div>
          </div>

          {/* Info cards */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {/* التصنيف */}
            <Card className="transition hover:shadow-md">
              <CardContent>
                <div className="flex items-start justify-between gap-3">
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-meu-dark">التصنيف</div>
                    <div className="mt-2 text-sm text-meu-gray">—</div>
                  </div>

                  <IconBadge>
                    <MiniIcon path="M4 7h16M7 4h10M7 20h10M4 17h16" />
                  </IconBadge>
                </div>
              </CardContent>
            </Card>

            {/* الساعات */}
            <Card className="transition hover:shadow-md">
              <CardContent>
                <div className="flex items-start justify-between gap-3">
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-meu-dark">الساعات</div>
                    <div className="mt-2 text-sm text-meu-gray">—</div>
                  </div>

                  <IconBadge>
                    <MiniIcon path="M12 8v5l3 2M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" />
                  </IconBadge>
                </div>
              </CardContent>
            </Card>

            {/* رمز المادة */}
            <Card className="transition hover:shadow-md">
              <CardContent>
                <div className="flex items-start justify-between gap-3">
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-meu-dark">رمز المادة</div>
                    <div className="mt-2 text-lg font-extrabold text-meu-red">{code}</div>
                  </div>

                  <IconBadge>
                    <MiniIcon path="M7 7h10v10H7zM4 4h4M16 4h4M4 16h4M16 16h4" />
                  </IconBadge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sections */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {/* سلايدات */}
            <Card className="transition hover:shadow-md">
              <CardContent>
                <div className="flex items-start justify-between gap-3">
                  <div className="text-right">
                    <div className="text-base font-extrabold text-meu-dark">سلايدات</div>
                    <div className="mt-1 text-sm text-meu-gray">—</div>
                  </div>

                  <IconBadge>
                    {/* book icon (زي الصورة) */}
                    <MiniIcon path="M7 4h10a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2V6a2 2 0 0 1 2-2Z" />
                  </IconBadge>
                </div>

                <button className="mt-4 w-full rounded-xl bg-meu-red px-4 py-3 text-sm font-extrabold text-white hover:opacity-95 transition">
                  قريباً
                </button>
              </CardContent>
            </Card>

            {/* امتحانات سنوات */}
            <Card className="transition hover:shadow-md">
              <CardContent>
                <div className="flex items-start justify-between gap-3">
                  <div className="text-right">
                    <div className="text-base font-extrabold text-meu-dark">امتحانات سنوات</div>
                    <div className="mt-1 text-sm text-meu-gray">—</div>
                  </div>

                  <IconBadge>
                    <MiniIcon path="M8 7h8M8 11h8M8 15h5M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                  </IconBadge>
                </div>

                <button className="mt-4 w-full rounded-xl bg-meu-red px-4 py-3 text-sm font-extrabold text-white hover:opacity-95 transition">
                  قريباً
                </button>
              </CardContent>
            </Card>

            {/* ملخصات */}
            <Card className="transition hover:shadow-md">
              <CardContent>
                <div className="flex items-start justify-between gap-3">
                  <div className="text-right">
                    <div className="text-base font-extrabold text-meu-dark">ملخصات</div>
                    <div className="mt-1 text-sm text-meu-gray">—</div>
                  </div>

                  <IconBadge>
                    <MiniIcon path="M8 4h8M8 8h8M6 12h12M6 16h12M6 20h10" />
                  </IconBadge>
                </div>

                <button className="mt-4 w-full rounded-xl bg-meu-red px-4 py-3 text-sm font-extrabold text-white hover:opacity-95 transition">
                  قريباً
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Optional: small note */}
          <div className="mt-6 rounded-2xl border border-meu-gray/15 bg-meu-gray/5 p-4 text-right">
            <div className="text-sm font-bold text-meu-dark">ملاحظة</div>
            <div className="mt-1 text-sm text-meu-gray">
              سيتم إضافة الملفات تدريجياً (سلايدات/ملخصات/امتحانات) — وستظهر هنا مباشرة.
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

import { supabaseServer } from "@/lib/supabase-server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Container from "@/components/Container";
import { Tajawal } from "next/font/google";
import {
  FileText,
  Layers,
  BookOpen,
  Clock,
  Tag,
} from "lucide-react";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
});

type PageProps = {
  params: {
    code: string;
  };
};

type Material = {
  id: string;
  title: string;
  url: string;
  year?: number | null;
  type: "slides" | "summary" | "exam";
};

export default async function CoursePage({ params }: PageProps) {
  /* =========================
     جلب البيانات من Supabase
  ========================= */
  const { data: materials } = await supabaseServer
    .from("materials")
    .select("*")
    .eq("course_code", params.code)
    .order("created_at", { ascending: false });

  const slides = (materials || []).filter(
    (m: Material) => m.type === "slides"
  );
  const summaries = (materials || []).filter(
    (m: Material) => m.type === "summary"
  );
  const exams = (materials || [])
    .filter((m: Material) => m.type === "exam")
    .sort((a: Material, b: Material) => (b.year || 0) - (a.year || 0));

  /* =========================
     Component الكرت
  ========================= */
  const LibraryCard = ({
    title,
    icon,
    items,
  }: {
    title: string;
    icon: React.ReactNode;
    items: Material[];
  }) => (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-full bg-meu-red/10 p-2 text-meu-red">
          {icon}
        </div>
        <h3 className="font-bold text-lg">{title}</h3>
        {items.length > 0 && (
          <span className="mr-auto text-sm text-gray-500">
            ({items.length})
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg bg-meu-red py-2 text-center text-white">
          قريبًا
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-meu-red transition hover:bg-meu-red/5"
              >
                <FileText size={18} />
                <span className="flex-1">
                  {item.title}
                  {item.year && (
                    <span className="mr-2 text-sm text-gray-500">
                      ({item.year})
                    </span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  /* =========================
     UI
  ========================= */
  return (
    <div className={tajawal.className}>
      <Container>
        <div className="py-10 space-y-10">

          {/* ===== العنوان ===== */}
          <div>
            <h1 className="text-2xl font-extrabold">صفحة المادة</h1>
            <p className="mt-1 text-gray-500">
              كل ما يتعلق بالمادة من سلايدات، ملخصات، وامتحانات سنوات.
            </p>
          </div>

          {/* ===== معلومات المادة ===== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border p-4 text-center">
              <div className="flex justify-center mb-2 text-meu-red">
                <Tag />
              </div>
              <div className="font-bold">رمز المادة</div>
              <div className="text-meu-red mt-1">{params.code}</div>
            </div>

            <div className="rounded-xl border p-4 text-center">
              <div className="flex justify-center mb-2 text-meu-red">
                <Clock />
              </div>
              <div className="font-bold">الساعات</div>
              <div className="text-gray-400 mt-1">—</div>
            </div>

            <div className="rounded-xl border p-4 text-center">
              <div className="flex justify-center mb-2 text-meu-red">
                <Layers />
              </div>
              <div className="font-bold">التصنيف</div>
              <div className="text-gray-400 mt-1">—</div>
            </div>
          </div>

          {/* ===== المكتبة ===== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <LibraryCard
              title="سلايدات"
              icon={<BookOpen size={20} />}
              items={slides}
            />

            <LibraryCard
              title="ملخصات"
              icon={<FileText size={20} />}
              items={summaries}
            />

            <LibraryCard
              title="امتحانات سنوات"
              icon={<Layers size={20} />}
              items={exams}
            />
          </div>

          {/* ===== ملاحظة ===== */}
          <div className="rounded-xl border bg-gray-50 p-4 text-center text-sm text-gray-600">
            سيتم إضافة الملفات تدريجيًا، وستظهر هنا مباشرة عند توفرها.
          </div>

        </div>
      </Container>
    </div>
  );
}

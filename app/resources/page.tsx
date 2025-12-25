import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/Card";

const ITEMS = [
  { title: "LMS", desc: "—" },
  { title: "مكتبة الجامعة", desc: "—" },
  { title: "MEUBUS", desc: "—" },
  { title: "الإيميل الجامعي", desc: "—" }
];

export default function ResourcesPage() {
  return (
    <Container>
      <div className="py-8">
        <SectionTitle title="مركز الموارد" subtitle="—" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((x) => (
            <Card key={x.title}>
              <CardContent>
                <div className="text-sm font-semibold text-meu-dark">{x.title}</div>
                <div className="mt-2 text-sm text-meu-gray">{x.desc}</div>
                <button className="mt-4 rounded-xl bg-meu-dark px-4 py-2 text-sm font-semibold text-meu-white">
                  —
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}

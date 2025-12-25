import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/Card";

export default function InternshipsPage() {
  return (
    <Container>
      <div className="py-8">
        <SectionTitle title="فرص التدريب و مشاريع التخرج" subtitle="—" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent>
                <div className="text-sm font-semibold text-meu-dark">—</div>
                <div className="mt-2 text-sm text-meu-gray">—</div>
                <div className="mt-3 rounded-xl border border-meu-dark/10 p-3 text-xs text-meu-gray">
                  <div>Required skills: —</div>
                  <div className="mt-1">Link: —</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}

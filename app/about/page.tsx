import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/Card";

export default function AboutPage() {
  return (
    <Container>
      <div className="py-8">
        <SectionTitle title="من نحن" subtitle="—" />

        <div className="grid gap-4 lg:grid-cols-2">
          {[
            { t: "About ENG101.com", d: "—" },
            { t: "لماذا “الجزري”؟", d: "—" },
            { t: "Team", d: "—" },
            { t: "Project mission", d: "—" }
          ].map((x) => (
            <Card key={x.t}>
              <CardContent>
                <div className="text-sm font-semibold text-meu-dark">{x.t}</div>
                <div className="mt-2 text-sm text-meu-gray">{x.d}</div>
                <div className="mt-4 h-24 rounded-xl bg-meu-dark/5" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}

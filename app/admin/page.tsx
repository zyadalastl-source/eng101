import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent, CardHeader } from "@/components/Card";

export default function AdminPage() {
  return (
    <Container>
      <div className="py-8">
        <SectionTitle title="Admin Dashboard (Mock Only)" subtitle="—" />

        <div className="grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent>
                <div className="text-xs text-meu-gray">—</div>
                <div className="mt-2 text-3xl font-bold text-meu-dark">—</div>
                <div className="mt-3 h-10 rounded-lg bg-meu-red/10" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader title="Charts" subtitle="—" />
            <CardContent>
              <div className="h-64 rounded-2xl border border-meu-dark/10 bg-meu-dark/5" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Tables" subtitle="—" />
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-meu-gray">
                    <tr className="border-b border-meu-dark/10">
                      <th className="py-3 text-right font-semibold">—</th>
                      <th className="py-3 text-right font-semibold">—</th>
                      <th className="py-3 text-right font-semibold">—</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="border-b border-meu-dark/5">
                        <td className="py-3">—</td>
                        <td className="py-3">—</td>
                        <td className="py-3">—</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}

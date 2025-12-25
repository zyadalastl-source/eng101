import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent, CardHeader } from "@/components/Card";
import Link from "next/link";
import { BUS_ROWS } from "@/data/bus";
import { StatusBadge } from "@/components/Badge";

export default function BusPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <SectionTitle title="MEU BUS — حركة النقل" subtitle="—" />
          <Link
            href="https://meubus.com"
            target="_blank"
            className="w-fit rounded-xl bg-meu-red px-4 py-2 text-sm font-semibold text-meu-white"
          >
            زيارة MEUBUS.com
          </Link>
        </div>

        <Card className="mt-6">
          <CardHeader title="الجدول" subtitle="—" />
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-meu-gray">
                  <tr className="border-b border-meu-dark/10">
                    <th className="py-3 text-right font-semibold">خط السير</th>
                    <th className="py-3 text-right font-semibold">وقت الانطلاق</th>
                    <th className="py-3 text-right font-semibold">الحالة</th>
                    <th className="py-3 text-right font-semibold">تتبع</th>
                  </tr>
                </thead>
                <tbody>
                  {BUS_ROWS.map((r, idx) => (
                    <tr key={idx} className="border-b border-meu-dark/5">
                      <td className="py-3">{r.route}</td>
                      <td className="py-3">{r.depart}</td>
                      <td className="py-3"><StatusBadge status={r.status} /></td>
                      <td className="py-3 text-meu-gray">—</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {["أوقات الانطلاق", "رسوم الاشتراك", "—"].map((t) => (
                <div key={t} className="rounded-xl border border-meu-dark/10 p-4">
                  <div className="text-sm font-semibold text-meu-dark">{t}</div>
                  <div className="mt-2 text-sm text-meu-gray">—</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <SectionTitle title="FAQ" subtitle="—" />
              <div className="space-y-2 text-sm text-meu-gray">
                <div>—</div>
                <div>—</div>
                <div>—</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

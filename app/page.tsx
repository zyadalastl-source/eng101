"use client";

import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { Card, CardContent } from "@/components/Card";
import Link from "next/link";
import Image from "next/image";
import { Tajawal } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import {
  Bot,
  BookOpenText,
  BusFront,
  Sigma,
  LayoutGrid,
  HelpCircle,
} from "lucide-react";


const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
});

// خدمات المنصة 
const FEATURES = [
  {
    title: "شات بوت الجزري",
    href: "/chatbot",
    desc: "اسأل أي سؤال بالمادة وخذ شرح سريع + مصادر منسّقة.",
    icon: Bot,
  },
  {
    title: "مكتبة المواد",
    href: "/courses",
    desc: "سلايدات، ملفات، تلخيصات وروابط مفيدة لكل مادة.",
    icon: BookOpenText,
  },
  
  {
    title: "أدوات حساب المعدل",
    href: "/gpa",
    desc: "احسب المعدل بسرعة ودقة.",
    icon: Sigma,
  },
  {
    title: "MEU BUS النقل",
    href: "/bus",
    desc: "مواعيد وخطوط الحافلات بطريقة واضحة وسهلة.",
    icon: BusFront,
  },
] as const;


export default function HomePage() {
  const highlights = useMemo(
    () => [
      "مواد مرتبة + ملفات جاهزة للتحميل",
      "حساب معدل سريع ودقيق",
      "اسأل الجزري… جواب مباشر وبأسلوب مفهوم",
    ],
    []
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((p) => (p + 1) % highlights.length);
    }, 2600);
    return () => clearInterval(t);
  }, [highlights.length]);

  return (
    <div className={tajawal.className}>
      {/* HERO */}
      <section className="relative overflow-hidden rounded-b-3xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.png"
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
          {/* Dark / Red overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-[#7f1d1d]/55 to-black/35" />
        </div>

        <Container>
          <div className="relative py-12 md:py-16">
            {/* HERO CONTENT */}
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-12 text-right">
                <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  ENG-101.online
                </h1>

                <p className="mt-3 text-sm md:text-base text-white/85 leading-relaxed">
                  بوابتك الذكية لكل ما تحتاجه في كلية الهندسة بجامعة الشرق الأوسط:
                  مواد، جداول، حساب معدل، وخطة ذكية… وكلها بمكان واحد.
                </p>

                {/* Sliding highlight */}
                <div className="mt-5 h-9 overflow-hidden">
                  <div
                    key={active}
                    className="text-white/90 text-sm md:text-base font-semibold animate-[slideIn_420ms_ease-out]"
                  >
                    • {highlights[active]}
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-5 justify-end">
                  <Link
                    href="/chatbot"
                    className="rounded-2xl bg-white px-5 py-3 text-sm md:text-base font-extrabold text-[#7f1d1d]
                    shadow-sm hover:bg-white/90 transition
                    animate-[bounceSoft_2.2s_ease-in-out_infinite]"
                  >
                    اسأل الجزري
                  </Link>

                  <Link
                    href="/courses"
                    className="rounded-2xl border border-white/35 px-5 py-3 text-sm md:text-base font-bold text-white
                    hover:bg-white/10 transition"
                  >
                    مكتبة المواد
                  </Link>
                </div>
              </div>
            </div>

            {/* custom keyframes */}
            <style jsx global>{`
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translateY(10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes bounceSoft {
                0%,
                100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-3px);
                }
              }
            `}</style>
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <section className="py-10">
        <Container>
          <SectionTitle title="خدمات المنصة" subtitle="كل شيء تحتاجه… مرتب وبسيط" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {FEATURES.map((f) => {
    const Icon = f.icon;

    return (
      <Link key={f.title} href={f.href} className="group">
        <Card className="relative overflow-hidden transition duration-200 group-hover:shadow-md group-hover:-translate-y-0.5">
          <CardContent>
            {/* Icon badge*/}
                      <div className="absolute right-4 top-4">
                        <div className="h-12 w-12 rounded-full bg-[#7f1d1d]/10 flex items-center justify-center">
                          <div className="h-10 w-10 rounded-full bg-white/80 shadow-sm ring-1 ring-black/5 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-[#7f1d1d]" />
                          </div>
                        </div>
                      </div>

                      <div className="pt-14 text-right">
                        <div className="text-sm font-extrabold text-meu-dark">
                          {f.title}
                        </div>
                        <div className="mt-1 text-xs text-meu-gray leading-relaxed">
                          {f.desc}
                        </div>

                        <div className="mt-3 text-xs text-meu-gray inline-flex items-center gap-1">
                          <span className="transition-transform duration-200 group-hover:-translate-x-1">➜</span>
                          <span>افتح الخدمة</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* WHY + WHO */}
          
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Card>
              <CardContent>
                <SectionTitle title="عن ENG101" />
                <div className="space-y-2 text-sm text-meu-gray text-right">
                  <div>• ENG101 هو مشروع طلابي أطلقه فريق من كلية الهندسة والتصميم، مكوّن من أربعة طلاب يُعرفون باسم “أبطال التايتنز”.
جاء إنشاء هذا الموقع ليكون منصة علمية تعليمية تخدم طلبة كلية الهندسة، وتساعدهم في الوصول إلى السلايدات، الملخصات، وامتحانات السنوات السابقة بسهولة ووضوح.

يحمل الموقع رسالة علمية مستوحاة من إرث العالم المسلم الاندلسي بديع الزمان أبو العز إسماعيل بن الرزاز الجزري، أحد أعظم رواد الهندسة والابتكار في التاريخ الإسلامي، ليكون رمزًا للإبداع العلمي والتكامل بين المعرفة النظرية والتطبيق العملي.

يهدف ENG101 إلى أن يكون دليلًا أكاديميًا موثوقًا، وعَونًا حقيقيًا للطلاب في مسيرتهم الجامعية، من خلال تنظيم المحتوى وتقديمه بأسلوب بسيط وحديث يخدم الطالب أولًا.</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-meu-dark text-meu-white">
              <CardContent>
                <SectionTitle title="لمن هذا النظام؟" subtitle="إذا أنت طالب… فهو إلك" />
                <div className="space-y-2 text-sm text-meu-gray text-right">
                  <div className="text-meu-gray">• طلاب كلية الهندسة بجامعة الشرق الأوسط.</div>
                  <div className="text-meu-gray">• اللي بدهم تنظيم موادهم وخطتهم بسرعة.</div>
                  <div className="text-meu-gray">• اللي بدهم حساب معدل ومصادر بدون وجعة راس.</div>
                </div>
              </CardContent>
            </Card>
            
          </div>
        </Container>
      </section>
    </div>
  );
}

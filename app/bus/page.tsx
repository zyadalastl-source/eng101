"use client";

import { useEffect, useMemo, useState } from "react";

type BusArea = {
  id: string;
  name: string;
};

const STORAGE_KEY = "meu_bus_favorites_v1";

function normalizeArabic(text: string) {
  return text
    .toLowerCase()
    .replace(/[\/\-_\s]/g, "")   // يشيل / - _ والمسافات
    .replace(/^ال/, "")          // يشيل "ال" من البداية
    .replace(/ال/g, "")          // يشيل "ال" من أي مكان
    .replace(/ة/g, "ه")          // ة → ه
    .replace(/أ|إ|آ/g, "ا");     // توحيد الألف
}



const BUS_AREAS: BusArea[] = [
  { id: "1", name: "ضاحية الرشيد" },
  { id: "2", name: "البشتي/خلدا" },
  { id: "3", name: "دوار خلدا" },
  { id: "4", name: "مادبا" },
  { id: "5", name: "الجبيهة" },
  { id: "6", name: "مجمع جبر" },
  { id: "7", name: "الجاردنز" },
  { id: "8", name: "البيادر" },
  { id: "9", name: "جبل عمان عبدون" },

  { id: "10", name: "البنيات" },
  { id: "11", name: "دوار الواحة" },
  { id: "12", name: "مختار مول" },
  { id: "13", name: "مادبا غربي" },
  { id: "14", name: "الوحدات" },
  { id: "15", name: "ام نوارة" },
  { id: "16", name: "دوار الشرق الاوسط" },
  { id: "17", name: "السلط" },
  { id: "18", name: "البقعة" },
  { id: "19", name: "ابو نصير" },

  { id: "20", name: "ماركا/الرصيفة" },
  { id: "21", name: "الجامعة الاردنية" },
  { id: "22", name: "صويلح" },
  { id: "23", name: "المؤقر/اللبن" },
  { id: "24", name: "سحاب-المستندة" },
  { id: "25", name: "ابو علندا" },
  { id: "26", name: "القويسمة-جبل الحديد" },
  { id: "27", name: "الزهور" },
  { id: "28", name: "ضاحية الحسن" },
  { id: "29", name: "المقابلين" },

  { id: "30", name: "رغدان" },
  { id: "31", name: "حي نزال" },
  { id: "32", name: "الياسمين" },
  { id: "33", name: "اسكان السلطه/مرج" },
  { id: "34", name: "مرج الحمام" },
  { id: "35", name: "ناعور" },
  { id: "36", name: "طبربور" },
  { id: "37", name: "الاستقلال/الدخلية" },
  { id: "38", name: "الهاشمي الشمالي" },
  { id: "39", name: "الزرقاء" },
  { id: "40", name: "جاوا" },

];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function BusPage() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [onlyFav, setOnlyFav] = useState(false);

  // Load favorites
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {}
  }, []);

  // Save favorites
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const toggleFav = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const favCount = useMemo(
    () => Object.values(favorites).filter(Boolean).length,
    [favorites]
  );

  const filtered = useMemo(() => {
    const q = search.trim();

    let list = BUS_AREAS.filter((b) => {
      const matchSearch =!q || normalizeArabic(b.name).includes(normalizeArabic(q));

      const matchFav = !onlyFav || !!favorites[b.id];
      return matchSearch && matchFav;
    });

    // ✅ favorites first
    list.sort((a, b) => {
      const fa = favorites[a.id] ? 1 : 0;
      const fb = favorites[b.id] ? 1 : 0;
      if (fa !== fb) return fb - fa;
      return a.name.localeCompare(b.name, "ar");
    });

    return list;
  }, [search, favorites, onlyFav]);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fafafa]"
      style={{ fontFamily: "Tajawal, system-ui" }}
    >
      {/* HERO (Full width + يلمس الهيدر) */}
      <div className="relative w-full overflow-hidden rounded-b-[40px] md:rounded-b-[56px] lg:rounded-b-[72px] -translate-y-[1px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/meu-bus-hero.jpg')" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Content */}
        <div className="relative z-10">
          <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-white backdrop-blur text-sm mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              MEU BUS — حركة النقل
            </span>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              مناطق الباصات
            </h1>

            <p className="text-white/85 max-w-2xl mb-6">
              يمكنكم الاطلاع على الموقع الرسمي لشعبة الحركة:
              <span className="font-bold"> meubus.meu.edu.jo</span>
            </p>

            <div className="flex flex-col md:flex-row gap-3">
              {/* ✅ Search (شغال) */}
              <div className="flex-1 rounded-2xl bg-white/15 backdrop-blur border border-white/20 p-2">
                <div className="flex items-center gap-2">
                  <span className="text-white/70 px-2">🔍</span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="ابحث باسم المنطقة..."
                    className="w-full bg-transparent text-white placeholder:text-white/60 outline-none px-1 py-2"
                  />
                  {search.trim().length > 0 && (
                    <button
                      onClick={() => setSearch("")}
                      className="text-white/70 hover:text-white px-2"
                      title="مسح"
                      aria-label="clear"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* ✅ Favorites toggle */}
              <button
                onClick={() => setOnlyFav((v) => !v)}
                className={cn(
                  "rounded-2xl px-5 py-3 font-bold transition border",
                  onlyFav
                    ? "bg-white text-neutral-900 border-white"
                    : "bg-white/20 text-white border-white/25 hover:bg-white/30"
                )}
              >
                المثبتة فقط ({favCount})
              </button>
            </div>
          </div>

          {/* فراغ بسيط تحت زي المكتبة */}
          <div className="h-10 md:h-12" />
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-4 text-sm text-neutral-600">
          عدد النتائج: <span className="font-bold text-neutral-900">{filtered.length}</span>
          {onlyFav && (
            <span className="mr-2 inline-flex items-center gap-2">
              • <span className="font-bold">عرض المثبتة فقط</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((bus) => {
            const isFav = !!favorites[bus.id];
            return (
              <div
                key={bus.id}
                className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start gap-3">
                  <h3 className="font-extrabold text-lg">🚌 {bus.name}</h3>

                  <button
                    onClick={() => toggleFav(bus.id)}
                    className="text-xl"
                    title="تثبيت"
                    aria-label="favorite"
                  >
                    {isFav ? "❤️" : "🤍"}
                  </button>
                </div>

                <div className="mt-3 text-sm text-gray-500">رقم الباص: —</div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            لا توجد نتائج
          </div>
        )}
      </div>
    </div>
  );
}

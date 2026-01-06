export type CourseMeta = {
  code: string;
  name: string;
  href: string;
  /** Credit hours (optional) */
  hours?: number | null;
  /** Category / classification (optional) */
  category?: string | null;
};

/**
 * Single source of truth for courses.
 * IMPORTANT: keep `code`, `name`, and `href` stable because multiple pages depend on them.
 */
export const COURSES: CourseMeta[] = [
  { code: "0181101", name: "تفاضل وتكامل (1)", href: "/courses/0181101", hours: 3, category: "كلية اجبارية" },
  { code: "0181102", name: "تفاضل وتكامل (2)", href: "/courses/0181102", hours: 3, category: "كلية اجبارية" },
  { code: "0182101", name: "تفاضل وتكامل (3)", href: "/courses/0182101", hours: 3, category: "كلية اجبارية" },

  { code: "0181201", name: "فيزياء عامة (1)", href: "/courses/0181201" , hours: 3, category: "كلية اجبارية" },
  { code: "0181203", name: "فيزياء عامة (2)", href: "/courses/0181203" , hours: 3, category: "كلية اجبارية" },

  { code: "0181301", name: "كيمياء عامة", href: "/courses/0181301" , hours: 3, category: "كلية اجبارية" },
  { code: "0181302", name: "كيمياء عامة عملي", href: "/courses/0181302" , hours: 1, category: "كلية اجبارية" },

  { code: "1912501", name: "دوائر كهربائية (1)", href: "/courses/1912501" , hours: 3, category: "كلية اجبارية" },
  { code: "1912502", name: "دوائر كهربائية (2)", href: "/courses/1912502" , hours: 3, category: "كلية اجبارية" },

  { code: "1921801", name: "المنطق الرقمي", href: "/courses/1921801" , hours: 3, category: "تخصص اجبارية" },
  { code: "1922201", name: "برمجة هندسية", href: "/courses/1922201" , hours: 3, category: "كلية مساندة" },

  { code: "1922601", name: "مبادئ الذكاء الاصطناعي", href: "/courses/1922601" , hours: 3, category: "تخصص اجبارية" },
  { code: "1922602", name: "علم البيانات", href: "/courses/1922602" , hours: 3, category: "تخصص اجبارية" },

  { code: "1922701", name: "البرمجة الكينونية", href: "/courses/1922701" , hours: 3, category: "تخصص اجبارية" },
  { code: "1922702", name: "الخوارزميات", href: "/courses/1922702" , hours: 3, category: "تخصص اجبارية" },

  { code: "1923301", name: "الإشارات والنظم", href: "/courses/1923301" , hours: 3, category: "تخصص اجبارية" },
  { code: "1923302", name: "معالجة الإشارات الرقمية", href: "/courses/1923302" , hours: 3, category: "تخصص اجبارية" },

  { code: "1923603", name: "تعلم الآلة", href: "/courses/1923603" , hours: 3, category: "تخصص اجبارية" },
  { code: "1923604", name: "الشبكات العصبونية والضبابية", href: "/courses/1923604" , hours: 3, category: "تخصص اجبارية" },

  { code: "1923703", name: "إدارة قواعد البيانات", href: "/courses/1923703" , hours: 3, category: "تخصص اجبارية" },
  { code: "1923802", name: "المعالجات الدقيقة", href: "/courses/1923802" , hours: 3, category: "تخصص اجبارية" },
  { code: "1923803", name: "الأنظمة المضمنة", href: "/courses/1923803" , hours: 3, category: "تخصص اجبارية" },

  { code: "1924303", name: "شبكات الحاسوب", href: "/courses/1924303" , hours: 3, category: "تخصص اجبارية" },

  { code: "1924605", name: "معالجة الصور", href: "/courses/1924605" , hours: 3, category: "تخصص اختيارية" },
  { code: "1924606", name: "التعلم العميق والرؤية بالحاسوب", href: "/courses/1924606" , hours: 3, category: "تخصص اجبارية" },

  { code: "1924704", name: "برمجة الروبوت", href: "/courses/1924704" , hours: 3, category: "تخصص اجبارية" },
  { code: "1924705", name: "نظم التشغيل", href: "/courses/1924705" , hours: 3, category: "تخصص اجبارية" },

  { code: "1924805", name: "إنترنت الأشياء", href: "/courses/1924805" , hours: 3, category: "تخصص اجبارية" },
  { code: "1924806", name: "أجهزة الاستشعار والمحركات", href: "/courses/1924806" , hours: 3, category: "تخصص اجبارية" },

  { code: "1913501", name: "آلات كهربائية", href: "/courses/1913501" , hours: 3, category: "تخصص اجبارية" },
  { code: "1913502", name: "مختبر الآلات الكهربائية", href: "/courses/1913502" , hours: 1, category: "تخصص اجبارية" },

  { code: "1913701", name: "إلكترونيات", href: "/courses/1913701" , hours: 3, category: "تخصص اجبارية" },

  { code: "1914701", name: "إلكترونيات القوى الكهربائية", href: "/courses/1914701" , hours: 3, category: "تخصص اجبارية" },
  { code: "1914702", name: "مختبر إلكترونيات القوى الكهربائية", href: "/courses/1914702" , hours: 1, category: "تخصص اجبارية" },
  { code: "1914703", name: "تحويل وتخزين الطاقة", href: "/courses/1914703" , hours: 3, category: "تخصص اجبارية" },

  { code: "1913601", name: "الطاقة الشمسية", href: "/courses/1913601" , hours: 3, category: "تخصص اجبارية" },
  { code: "1913602", name: "مختبر الطاقة الشمسية", href: "/courses/1913602" , hours: 1, category: "تخصص اجبارية" },

  { code: "1914603", name: "طاقة الرياح", href: "/courses/1914603" , hours: 3, category: "تخصص اجبارية" },
  { code: "1914604", name: "مختبر طاقة الرياح", href: "/courses/1914604" , hours: 1, category: "تخصص اجبارية" },

  { code: "1915201", name: "اقتصاد هندسي", href: "/courses/1915201" , hours: 2, category: "تخصص اجبارية" },
  { code: "1915801", name: "اقتصاد وكفاءة الطاقة", href: "/courses/1915801" , hours: 3, category: "تخصص اجبارية" },
  { code: "1915802", name: "إدارة وتشريعات الطاقة", href: "/courses/1915802" , hours: 3, category: "تخصص اجبارية" },

  { code: "1914303", name: "تصميم ومحاكاة (2)", href: "/courses/1914303" , hours: 2, category: "تخصص اجبارية" },
  { code: "1914304", name: "تصميم ومحاكاة (1)", href: "/courses/1914304" , hours: 2, category: "تخصص اجبارية" },

  { code: "1931201", name: "الرسم الهندسي", href: "/courses/1931201" , hours: 3, category: "كلية اجبارية" },
  { code: "0199999", name: "اسم المادة", href: "/courses/0199999" },
];

export function getCourseByCode(code: string): CourseMeta | undefined {
  return COURSES.find(x => x.code === code);
}

export function formatCreditHours(hours?: number | null): string {
  if (!hours || Number.isNaN(hours)) return "N/A";
  const h = Number(hours);
  return `${h} Credit Hour${h === 1 ? "" : "s"}`;
}
"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { COURSES } from "@/lib/courses";
import { FileText, Trash2, PlusCircle, Upload, Link as LinkIcon } from "lucide-react";

type MaterialRow = {
  id: string;
  course_code: string;
  type: "slides" | "summary" | "exam";
  title: string;
  year: number | null;
  url: string;
  created_at: string;
};

const TYPES = [
  { value: "slides", label: "سلايدات" },
  { value: "summary", label: "ملخصات" },
  { value: "exam", label: "امتحانات سنوات" },
] as const;

function typeLabel(v: MaterialRow["type"]) {
  return TYPES.find(t => t.value === v)?.label ?? v;
}

export default function AdminLibraryPage() {
  // form
  const [courseCode, setCourseCode] = useState(COURSES[0]?.code || "");
  const [type, setType] = useState<MaterialRow["type"]>("slides");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [url, setUrl] = useState("");

  // file upload
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMsg, setUploadMsg] = useState("");

  // table
  const [rows, setRows] = useState<MaterialRow[]>([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [filterCourse, setFilterCourse] = useState("ALL");
  const [filterType, setFilterType] = useState("ALL");

  const filteredRows = useMemo(() => {
    return rows.filter(r => {
      const okCourse = filterCourse === "ALL" ? true : r.course_code === filterCourse;
      const okType = filterType === "ALL" ? true : r.type === filterType;
      return okCourse && okType;
    });
  }, [rows, filterCourse, filterType]);

  const resetForm = () => {
    setTitle("");
    setYear("");
    setUrl("");
    setFile(null);
    setUploadProgress(0);
    setUploadMsg("");
  };

  const loadRows = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("materials")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);

    if (error) {
      alert("خطأ في جلب البيانات: " + error.message);
      return;
    }
    setRows((data || []) as MaterialRow[]);
  };

  useEffect(() => {
    loadRows();
  }, []);

  // add link
  const addLink = async () => {
    if (!courseCode) return alert("اختر المادة");
    if (!title.trim()) return alert("اكتب العنوان");
    if (!url.trim()) return alert("حط رابط");

    const yearNum = type === "exam" && year.trim() ? Number(year.trim()) : null;

    setLoading(true);
    const { error } = await supabase.from("materials").insert({
      course_code: courseCode,
      type,
      title: title.trim(),
      year: yearNum,
      url: url.trim(),
    });
    setLoading(false);

    if (error) {
      alert("خطأ بالحفظ: " + error.message);
      return;
    }

    resetForm();
    await loadRows();
    alert("تمت الإضافة ✅");
  };

  // upload file (XHR progress + timeout)
  const uploadFile = async () => {
    if (!courseCode) return alert("اختر المادة");
    if (!title.trim()) return alert("اكتب العنوان");
    if (!file) return alert("اختر ملف");

    const yearNum = type === "exam" && year.trim() ? Number(year.trim()) : null;

    // ✅ حد حجم (مهم عشان ما يعلق)
    const maxMB = 20;
    if (file.size > maxMB * 1024 * 1024) {
      alert(`الملف كبير (أكثر من ${maxMB}MB)`);
      return;
    }

    const fd = new FormData();
    fd.append("course_code", courseCode);
    fd.append("type", type);
    fd.append("title", title.trim());
    fd.append("year", yearNum ? String(yearNum) : "");
    fd.append("file", file);

    setLoading(true);
    setUploadProgress(0);
    setUploadMsg("بدء الرفع...");

        await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/api/admin/upload", true);

    // ⭐⭐ هذا السطر هو الحل
    xhr.withCredentials = true;

    // ⏱️ مهلة الرفع
    xhr.timeout = 60000;

    xhr.upload.onprogress = (e) => {
        if (!e.lengthComputable) return;
        const pct = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(pct);
        setUploadMsg(`جارٍ رفع الملف... ${pct}%`);
    };

    xhr.onload = () => {
        try {
        const json = JSON.parse(xhr.responseText || "{}");
        if (xhr.status >= 200 && xhr.status < 300 && json.ok) {
            setUploadProgress(100);
            setUploadMsg("تم رفع الملف ✅");
            resolve();
        } else {
            reject(new Error(json?.message || "فشل الرفع"));
        }
        } catch {
        reject(new Error("رد غير صالح من السيرفر"));
        }
    };

    xhr.onerror = () => reject(new Error("مشكلة شبكة"));
    xhr.ontimeout = () => reject(new Error("انتهى الوقت"));

    xhr.send(fd);
    });


    setLoading(false);
    resetForm();
    await loadRows();
    alert("تم رفع الملف وإضافته ✅");
  };
  

  const deleteRow = async (id: string) => {
    if (!confirm("متأكد بدك تحذف؟")) return;
    setLoading(true);
    const { error } = await supabase.from("materials").delete().eq("id", id);
    setLoading(false);

    if (error) {
      alert("خطأ بالحذف: " + error.message);
      return;
    }
    await loadRows();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <PlusCircle className="text-meu-red" />
        <h1 className="text-2xl font-bold">لوحة الأدمن – مكتبة المواد</h1>
      </div>

      {/* Form */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">إضافة ملف</h2>
          <button
            onClick={loadRows}
            className="rounded-lg border px-3 py-1 hover:bg-gray-50"
          >
            تحديث
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Course */}
          <div className="space-y-1">
            <label className="text-sm text-gray-600">المادة</label>
            <select
              value={courseCode}
              onChange={e => setCourseCode(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            >
              {COURSES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.code} – {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div className="space-y-1">
            <label className="text-sm text-gray-600">النوع</label>
            <select
              value={type}
              onChange={e => setType(e.target.value as MaterialRow["type"])}
              className="w-full rounded-lg border px-3 py-2"
            >
              {TYPES.map(t => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="text-sm text-gray-600">العنوان</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="مثال: شابتر الاول 2025"
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          {/* Year */}
          <div className="space-y-1">
            <label className="text-sm text-gray-600">السنة (للإمتحانات)</label>
            <input
              value={year}
              onChange={e => setYear(e.target.value)}
              disabled={type !== "exam"}
              placeholder="مثال: 2023"
              className="w-full rounded-lg border px-3 py-2 disabled:bg-gray-100"
            />
          </div>

          {/* URL */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm text-gray-600 flex items-center gap-2">
              <LinkIcon size={16} /> رابط الملف (اختياري إذا رفعت ملف)
            </label>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="ضع رابط PDF (Drive/OneDrive/...)"
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          {/* Drag & Drop */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-gray-600">رفع ملف (سحب وإفلات)</label>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files?.[0];
                if (f) setFile(f);
              }}
              className={`rounded-xl border p-4 text-center cursor-pointer ${
                dragOver ? "bg-meu-red/5 border-meu-red" : "bg-gray-50"
              }`}
              onClick={() => {
                const el = document.getElementById("fileInput") as HTMLInputElement | null;
                el?.click();
              }}
            >
              {file ? (
                <div className="space-y-1">
                  <div className="font-semibold">{file.name}</div>
                  <div className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(0)} KB
                  </div>
                  <button
                    type="button"
                    className="mt-2 rounded-lg border px-3 py-1 hover:bg-white"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      setFile(null);
                    }}
                  >
                    إزالة الملف
                  </button>
                </div>
              ) : (
                <div className="text-gray-600 flex justify-center gap-2 items-center">
                  <Upload /> اسحب الملف هنا أو اضغط للاختيار
                </div>
              )}
            </div>

            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            {/* Progress */}
            {loading && file && (
              <div className="space-y-2">
                <div className="text-sm text-gray-600">{uploadMsg}</div>
                <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-meu-red transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => (file ? uploadFile() : addLink())}
            disabled={loading}
            className="rounded-lg bg-meu-red px-4 py-2 text-white hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "جارٍ الحفظ..." : file ? "رفع الملف" : "حفظ الرابط"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            disabled={loading}
            className="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-60"
          >
            تفريغ
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center gap-2">
          <FileText className="text-meu-red" />
          <div className="font-bold">الملفات</div>
          <div className="mr-auto text-sm text-gray-500">({filteredRows.length})</div>

          <select
            value={filterCourse}
            onChange={e => setFilterCourse(e.target.value)}
            className="rounded-lg border px-2 py-1 text-sm"
          >
            <option value="ALL">كل المواد</option>
            {COURSES.map(c => (
              <option key={c.code} value={c.code}>{c.code}</option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="rounded-lg border px-2 py-1 text-sm"
          >
            <option value="ALL">كل الأنواع</option>
            {TYPES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-right">المادة</th>
                <th className="p-3 text-right">النوع</th>
                <th className="p-3 text-right">العنوان</th>
                <th className="p-3 text-right">السنة</th>
                <th className="p-3 text-right">فتح</th>
                <th className="p-3 text-right">حذف</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{r.course_code}</td>
                  <td className="p-3">{typeLabel(r.type)}</td>
                  <td className="p-3">{r.title}</td>
                  <td className="p-3">{r.year ?? "—"}</td>
                  <td className="p-3">
                    <a href={r.url} target="_blank" className="text-meu-red underline">
                      فتح
                    </a>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteRow(r.id)}
                      className="inline-flex items-center gap-2 rounded-lg border px-3 py-1 hover:bg-red-50 text-red-600"
                    >
                      <Trash2 size={16} />
                      حذف
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRows.length === 0 && (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan={6}>
                    لا يوجد ملفات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

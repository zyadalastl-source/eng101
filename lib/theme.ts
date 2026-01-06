import { Tajawal } from "next/font/google";
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
});

export const MEU_COLORS = {
  red: "#8A1F1F",
  dark: "#2B2B2B",
  gray: "#777777",
  white: "#FFFFFF"
} as const;

export const SITE = {
  domain: "ENG-101.online",
  botName: "الجزري",
  university: "بديع الزمان أبو العز إسماعيل بن الرزاز"
} as const;

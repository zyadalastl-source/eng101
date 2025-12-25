export type Course = {
  code: string;
  name: string;
  prereq?: string;
  credits?: number;
  category?: string;
};

export const COURSES: Course[] = [
  { code: "ENG101", name: "—", category: "—", credits: 3, prereq: "—" },
  { code: "MATH101", name: "—", category: "—", credits: 3, prereq: "—" },
  { code: "PHYS101", name: "—", category: "—", credits: 3, prereq: "—" },
  { code: "CS101", name: "—", category: "—", credits: 3, prereq: "—" }
];

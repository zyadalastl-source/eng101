export type BusRow = {
  route: string;
  depart: string;
  status: "منطلق" | "انتظار" | "مزدحم";
};

export const BUS_ROWS: BusRow[] = [
  { route: "—", depart: "—", status: "انتظار" },
  { route: "—", depart: "—", status: "منطلق" },
  { route: "—", depart: "—", status: "مزدحم" }
];

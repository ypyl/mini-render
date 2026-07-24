// detail-modal/handlers.ts — async loadDetail + closeModal.
import type { Handlers } from "thin-render";
import { getByPath } from "thin-render";

const DETAILS: Record<string, { revenue: string; employees: number; founded: number; headquarters: string }> = {
  a1: { revenue: "$1.2M", employees: 42, founded: 2019, headquarters: "San Francisco" },
  a2: { revenue: "$850K", employees: 28, founded: 2021, headquarters: "Austin" },
  a3: { revenue: "$3.4M", employees: 115, founded: 2015, headquarters: "New York" },
  a4: { revenue: "$500K", employees: 15, founded: 2022, headquarters: "Denver" },
  a5: { revenue: "$2.1M", employees: 67, founded: 2018, headquarters: "Seattle" },
  a6: { revenue: "$7.8M", employees: 230, founded: 2012, headquarters: "Chicago" },
  a7: { revenue: "$1.5M", employees: 51, founded: 2020, headquarters: "Boston" },
  a8: { revenue: "$620K", employees: 19, founded: 2023, headquarters: "Portland" },
  a9: { revenue: "$4.2M", employees: 140, founded: 2016, headquarters: "Los Angeles" },
  b0: { revenue: "$950K", employees: 33, founded: 2017, headquarters: "Miami" },
};

export const handlers: Handlers = {
  loadDetail: async (params, { getState, setState }) => {
    const idPath = params.id as string;
    const id = getByPath(getState(), idPath) as string;
    setState("/loadingDetail", "true");
    setState("/itemDetail", {}); // open modal immediately
    await new Promise((r) => setTimeout(r, 600));
    const detail = DETAILS[id] ?? { revenue: "N/A", employees: 0, founded: 0, headquarters: "Unknown" };
    setState("/itemDetail", detail);
    setState("/loadingDetail", "false");
  },
  closeModal: (_params, { setState }) => {
    setState("/itemDetail", undefined);
  },
};

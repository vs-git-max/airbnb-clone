import { create } from "zustand";

interface FilterModalStore {
  isOPen: boolean;
  open: () => void;
  close: () => void;
}

export const useFilterModal = create<FilterModalStore>((set) => ({
  isOPen: false,
  open: () => set({ isOPen: true }),
  close: () => set({ isOPen: false }),
}));

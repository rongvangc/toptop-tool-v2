import { create } from "zustand";

interface ToptopState {
  printData: CommentTopTopData | null;
  setPrintData: (data: CommentTopTopData | null) => void;
}

const useToptopStore = create<ToptopState>((set, get) => ({
  printData: null,
  setPrintData: (data) => {
    set((state) => ({
      ...state,
      printData: data,
    }));
  },
}));

export default useToptopStore;

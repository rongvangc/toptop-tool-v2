import { create } from "zustand";

interface ToptopState {
  printData: CommentTopTopData | null;
  currentOrderNumber: number;
  setPrintData: (data: CommentTopTopData | null) => void;
  setCurrentOrderNumber: (number: number) => void;
}

const useToptopStore = create<ToptopState>((set, get) => ({
  printData: null,
  currentOrderNumber: 0,
  setPrintData: (data) => {
    set((state) => ({
      ...state,
      printData: data,
    }));
  },
  setCurrentOrderNumber: (orderNumber) => {
    set((state) => ({
      ...state,
      currentOrderNumber: orderNumber,
    }));
  },
}));

export default useToptopStore;

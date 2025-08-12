import { create } from "zustand";

export const useDataStore = create((set) => ({
  data: [],
  loading: false,
  error: null,
  fetchData: async () => {
    set({ loading: true });
    const res = await fetch("http://localhost:3000/fruits");
    const newData = await res.json();
    set({ data: newData, loading: false });
  },
}));

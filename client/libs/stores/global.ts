import { create } from 'zustand';
import { Filter } from '../types/types';

type GlobalStore = {
  filters: Filter[];
  selectFilter: (filter: Filter) => void;
  removeFilter: (filter: Filter) => void;
  clearFilters: () => void;
};

const useGlobalStore = create<GlobalStore>()((set) => ({
  filters: [],
  selectFilter: (filter) => set((state) => ({ filters: state.filters.concat([filter]) })),

  removeFilter: (filter) =>
    set((state) => ({ filters: state.filters.filter((name) => name === filter) })),

  clearFilters: () => set((state) => ({ filters: [] })),
}));

export default useGlobalStore;

import { create } from "zustand";
import type { PGListing, ListingFilters } from "@/types";

interface ListingsState {
  listings: PGListing[];
  selectedListing: PGListing | null;
  filters: ListingFilters;
  wishlist: string[];
  totalCount: number;
  isLoading: boolean;
  setListings: (listings: PGListing[], total: number) => void;
  setSelectedListing: (listing: PGListing | null) => void;
  setFilters: (filters: Partial<ListingFilters>) => void;
  resetFilters: () => void;
  toggleWishlist: (listingId: string) => void;
  setLoading: (loading: boolean) => void;
}

const defaultFilters: ListingFilters = {
  page: 1,
  limit: 12,
  sortBy: "rating",
};

export const useListingsStore = create<ListingsState>((set, get) => ({
  listings: [],
  selectedListing: null,
  filters: defaultFilters,
  wishlist: [],
  totalCount: 0,
  isLoading: false,
  setListings: (listings, totalCount) => set({ listings, totalCount }),
  setSelectedListing: (selectedListing) => set({ selectedListing }),
  setFilters: (filters) =>
    set({ filters: { ...get().filters, ...filters, page: 1 } }),
  resetFilters: () => set({ filters: defaultFilters }),
  toggleWishlist: (listingId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(listingId)
        ? state.wishlist.filter((id) => id !== listingId)
        : [...state.wishlist, listingId],
    })),
  setLoading: (isLoading) => set({ isLoading }),
}));

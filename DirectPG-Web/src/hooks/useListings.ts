import { useQuery } from "@tanstack/react-query";
import { listingsService } from "@/services/listings.service";
import type { ListingFilters } from "@/types";

export function useListings(filters?: ListingFilters) {
  return useQuery({
    queryKey: ["listings", filters],
    queryFn: () => listingsService.getAll(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useListing(id: string) {
  return useQuery({
    queryKey: ["listing", id],
    queryFn: () => listingsService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedListings() {
  return useQuery({
    queryKey: ["listings", "featured"],
    queryFn: listingsService.getFeatured,
    staleTime: 10 * 60 * 1000,
  });
}

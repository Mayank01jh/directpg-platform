import { api } from "./api";
import type { PGListing, ApiResponse, PaginatedResponse, ListingFilters } from "@/types";

export const listingsService = {
  getAll: (filters?: ListingFilters) =>
    api.get<PaginatedResponse<PGListing>>("/listings", { params: filters }),

  getById: (id: string) =>
    api.get<ApiResponse<PGListing>>(`/listings/${id}`),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<PGListing>>(`/listings/slug/${slug}`),

  search: (query: string, filters?: ListingFilters) =>
    api.get<PaginatedResponse<PGListing>>("/listings/search", {
      params: { q: query, ...filters },
    }),

  getFeatured: () =>
    api.get<ApiResponse<PGListing[]>>("/listings/featured"),

  getByCity: (city: string, filters?: ListingFilters) =>
    api.get<PaginatedResponse<PGListing>>(`/listings/city/${city}`, {
      params: filters,
    }),

  create: (data: FormData) =>
    api.post<ApiResponse<PGListing>>("/listings", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id: string, data: Partial<PGListing>) =>
    api.put<ApiResponse<PGListing>>(`/listings/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse<void>>(`/listings/${id}`),

  toggleWishlist: (id: string) =>
    api.post<ApiResponse<{ wishlisted: boolean }>>(`/listings/${id}/wishlist`),

  getOwnerListings: () =>
    api.get<ApiResponse<PGListing[]>>("/owner/listings"),
};

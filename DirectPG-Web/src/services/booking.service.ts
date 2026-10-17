import { api } from "./api";
import type { Booking, ApiResponse, PaginatedResponse } from "@/types";

export interface CreateBookingDto {
  listingId: string;
  roomTypeId: string;
  checkIn: string;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  tenantIdProof: string;
  tenantIdProofType: "aadhar" | "pan" | "passport" | "dl";
}

export const bookingService = {
  create: (data: CreateBookingDto) =>
    api.post<ApiResponse<Booking>>("/bookings", data),

  getById: (id: string) =>
    api.get<ApiResponse<Booking>>(`/bookings/${id}`),

  getMyBookings: (status?: string) =>
    api.get<PaginatedResponse<Booking>>("/bookings/my", { params: { status } }),

  getOwnerBookings: (status?: string) =>
    api.get<PaginatedResponse<Booking>>("/owner/bookings", { params: { status } }),

  confirm: (id: string) =>
    api.patch<ApiResponse<Booking>>(`/bookings/${id}/confirm`),

  cancel: (id: string, reason?: string) =>
    api.patch<ApiResponse<Booking>>(`/bookings/${id}/cancel`, { reason }),
};

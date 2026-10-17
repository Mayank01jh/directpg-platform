"use client";
import { PGProperty, MOCK_PROPERTIES } from "./mockData";

export interface BookingRecord {
  bookingId: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  propertyImage: string;
  roomName: string;
  roomType: string;
  monthlyRent: number;
  depositAmount: number;
  moveInDate: string;
  stayDuration: string;
  tenantName: string;
  tenantPhone: string;
  tenantAadhaar: string;
  paymentMethod: string;
  status: "Confirmed" | "Active" | "Completed";
  bookedAt: string;
  ownerName: string;
  ownerPhone: string;
}

export interface VisitRecord {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  visitType: "In-Person Walkthrough" | "Live Video Tour";
  date: string;
  timeSlot: string;
  tenantName: string;
  tenantPhone: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  bookedAt: string;
}

const STORAGE_KEY_WISHLIST = "dpg_user_wishlist";
const STORAGE_KEY_BOOKINGS = "dpg_user_bookings";
const STORAGE_KEY_VISITS = "dpg_user_visits";
const STORAGE_KEY_CUSTOM_PROPERTIES = "dpg_custom_properties";
const STORAGE_KEY_USER = "dpg_current_user";

export function getStoredWishlist(): string[] {
  if (typeof window === "undefined") return ["1", "4"];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WISHLIST);
    return raw ? JSON.parse(raw) : ["1", "4"];
  } catch {
    return ["1", "4"];
  }
}

export function toggleStoredWishlist(propertyId: string): string[] {
  if (typeof window === "undefined") return [];
  const current = getStoredWishlist();
  const next = current.includes(propertyId)
    ? current.filter((id) => id !== propertyId)
    : [...current, propertyId];
  localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(next));
  window.dispatchEvent(new Event("wishlist-updated"));
  return next;
}

export function isPropertyWishlisted(propertyId: string): boolean {
  return getStoredWishlist().includes(propertyId);
}

export function getStoredBookings(): BookingRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOOKINGS);
    if (!raw) {
      // Seed default active booking
      const initial: BookingRecord[] = [
        {
          bookingId: "DPG-BLR-84920",
          propertyId: "1",
          propertyTitle: "Sunrise Heights Luxury Stay",
          propertyAddress: "84, 80 Feet Road, 4th Block, Koramangala, Bangalore",
          propertyImage: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop",
          roomName: "Executive Private Suite",
          roomType: "Single Occupancy AC",
          monthlyRent: 14500,
          depositAmount: 14500,
          moveInDate: "2026-11-01",
          stayDuration: "6 Months",
          tenantName: "Mayank Sharma",
          tenantPhone: "+91 98765 43210",
          tenantAadhaar: "XXXX-XXXX-4921",
          paymentMethod: "UPI Instant Direct",
          status: "Confirmed",
          bookedAt: "2026-10-17",
          ownerName: "Lakshmi Narayanan",
          ownerPhone: "+91 98450 12847",
        },
      ];
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addStoredBooking(booking: BookingRecord): void {
  if (typeof window === "undefined") return;
  const current = getStoredBookings();
  const next = [booking, ...current];
  localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(next));
  window.dispatchEvent(new Event("bookings-updated"));
}

export function getStoredVisits(): VisitRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VISITS);
    if (!raw) {
      const initial: VisitRecord[] = [
        {
          id: "vst-101",
          propertyId: "2",
          propertyTitle: "Urban Nest Co-Living Hub",
          propertyAddress: "24, Hill Road, Bandra West, Mumbai",
          visitType: "Live Video Tour",
          date: "Tomorrow",
          timeSlot: "4:00 PM - 4:30 PM",
          tenantName: "Mayank Sharma",
          tenantPhone: "+91 98765 43210",
          status: "Scheduled",
          bookedAt: "2026-10-18",
        },
      ];
      localStorage.setItem(STORAGE_KEY_VISITS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addStoredVisit(visit: VisitRecord): void {
  if (typeof window === "undefined") return;
  const current = getStoredVisits();
  const next = [visit, ...current];
  localStorage.setItem(STORAGE_KEY_VISITS, JSON.stringify(next));
  window.dispatchEvent(new Event("visits-updated"));
}

export function getCustomProperties(): PGProperty[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_PROPERTIES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addCustomProperty(property: PGProperty): void {
  if (typeof window === "undefined") return;
  const current = getCustomProperties();
  const next = [property, ...current];
  localStorage.setItem(STORAGE_KEY_CUSTOM_PROPERTIES, JSON.stringify(next));
  window.dispatchEvent(new Event("properties-updated"));
}

export function getAllCombinedProperties(): PGProperty[] {
  const custom = getCustomProperties();
  return [...custom, ...MOCK_PROPERTIES];
}

export function getCurrentUser() {
  if (typeof window === "undefined") {
    return { name: "Mayank Sharma", email: "mayank@directpg.in", role: "tenant", isVerified: true, phone: "+91 98765 43210" };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    return raw ? JSON.parse(raw) : { name: "Mayank Sharma", email: "mayank@directpg.in", role: "tenant", isVerified: true, phone: "+91 98765 43210" };
  } catch {
    return { name: "Mayank Sharma", email: "mayank@directpg.in", role: "tenant", isVerified: true, phone: "+91 98765 43210" };
  }
}

export function setCurrentUser(user: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  window.dispatchEvent(new Event("user-updated"));
}

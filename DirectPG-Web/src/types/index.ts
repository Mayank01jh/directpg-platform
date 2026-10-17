// ===================== Core Entities =====================

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: "tenant" | "owner" | "admin";
  isVerified: boolean;
  createdAt: string;
}

export interface PGListing {
  id: string;
  title: string;
  description: string;
  slug: string;
  owner: User;
  address: Address;
  roomTypes: RoomType[];
  amenities: Amenity[];
  rules: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isActive: boolean;
  nearbyPlaces: NearbyPlace[];
  genderAllowed: "male" | "female" | "any";
  createdAt: string;
  updatedAt: string;
}

export interface RoomType {
  id: string;
  type: "single" | "double" | "triple" | "dormitory";
  price: number;
  deposit: number;
  availability: number;
  features: string[];
}

export interface Address {
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: "basic" | "food" | "safety" | "recreation";
}

export interface NearbyPlace {
  name: string;
  type: "metro" | "bus" | "hospital" | "college" | "mall";
  distance: string;
}

export interface Booking {
  id: string;
  listing: PGListing;
  tenant: User;
  roomType: RoomType;
  checkIn: string;
  checkOut?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "refunded";
  totalAmount: number;
  depositAmount: number;
  createdAt: string;
}

export interface Payment {
  id: string;
  booking: Booking;
  amount: number;
  currency: string;
  method: "upi" | "card" | "netbanking" | "wallet";
  status: "pending" | "success" | "failed" | "refunded";
  transactionId: string;
  createdAt: string;
}

export interface Review {
  id: string;
  listing: PGListing;
  author: User;
  rating: number;
  comment: string;
  categories: {
    cleanliness: number;
    food: number;
    location: number;
    safety: number;
    value: number;
  };
  images?: string[];
  ownerReply?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "booking" | "payment" | "review" | "system" | "chat";
  isRead: boolean;
  metadata?: Record<string, string>;
  createdAt: string;
}

// ===================== API Response Types =====================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ===================== Filter / Search Types =====================

export interface ListingFilters {
  city?: string;
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  gender?: "male" | "female" | "any";
  roomType?: string;
  amenities?: string[];
  rating?: number;
  sortBy?: "price_asc" | "price_desc" | "rating" | "newest";
  page?: number;
  limit?: number;
}

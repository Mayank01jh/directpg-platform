export const APP_NAME = "DirectPG";
export const APP_TAGLINE = "Find Your Perfect PG";

export const INDIAN_CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
  "Pune", "Kolkata", "Ahmedabad", "Surat", "Jaipur",
  "Lucknow", "Kanpur", "Nagpur", "Indore", "Bhopal",
];

export const AMENITIES = [
  { id: "wifi", name: "WiFi", icon: "FiWifi", category: "basic" },
  { id: "ac", name: "Air Conditioning", icon: "FiWind", category: "basic" },
  { id: "laundry", name: "Laundry", icon: "FiRefreshCw", category: "basic" },
  { id: "parking", name: "Parking", icon: "FiMapPin", category: "basic" },
  { id: "meals", name: "Meals Included", icon: "FiCoffee", category: "food" },
  { id: "cctv", name: "CCTV", icon: "FiCamera", category: "safety" },
  { id: "security", name: "Security Guard", icon: "FiShield", category: "safety" },
  { id: "gym", name: "Gym", icon: "FiActivity", category: "recreation" },
  { id: "tv", name: "TV Room", icon: "FiTv", category: "recreation" },
  { id: "terrace", name: "Terrace", icon: "FiSun", category: "recreation" },
];

export const ROOM_TYPES = [
  { id: "single", label: "Single Occupancy" },
  { id: "double", label: "Double Sharing" },
  { id: "triple", label: "Triple Sharing" },
  { id: "dormitory", label: "Dormitory" },
];

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "any", label: "Any" },
];

export const PRICE_RANGES = [
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 – ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 – ₹20,000", min: 10000, max: 20000 },
  { label: "₹20,000+", min: 20000, max: Infinity },
];

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  completed: "Completed",
};

export const ROUTES = {
  HOME: "/",
  LISTINGS: "/listings",
  LISTING_DETAIL: (id: string) => `/listings/${id}`,
  SEARCH: "/search",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  PROFILE: "/profile",
  PROFILE_BOOKINGS: "/profile/bookings",
  PROFILE_WISHLIST: "/profile/wishlist",
  PROFILE_PAYMENTS: "/profile/payments",
  PROFILE_REVIEWS: "/profile/reviews",
  PROFILE_SETTINGS: "/profile/settings",
  BOOKING: (id: string) => `/booking/${id}`,
  BOOKING_CONFIRMATION: "/booking/confirmation",
  OWNER_DASHBOARD: "/dashboard",
  OWNER_PROPERTIES: "/my-properties",
  OWNER_ADD_PROPERTY: "/my-properties/add",
  OWNER_BOOKINGS: "/bookings",
  OWNER_EARNINGS: "/earnings",
  ABOUT: "/about",
};

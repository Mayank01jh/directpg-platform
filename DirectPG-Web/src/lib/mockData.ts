export interface RoomPlan {
  id?: string;
  name: string;
  type: "single" | "double" | "triple" | "four";
  price: number;
  deposit: number;
  availableBeds: number;
  features: string[];
  monthlyRent?: number;
}

export interface AmenityItem {
  id: string;
  name: string;
  category: "essentials" | "food" | "security" | "recreation";
}

export interface PGProperty {
  id: string;
  title: string;
  tagline: string;
  description: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  gender: "female" | "male" | "any";
  rating: number;
  reviewCount: number;
  minPrice: number;
  startingPrice?: number;
  depositType: string;
  isVerified: boolean;
  zeroBrokerage: boolean;
  images: string[];
  amenities: string[];
  roomPlans: RoomPlan[];
  rules: string[];
  mealsIncluded: boolean;
  mealDetails: string;
  metroDistance: string;
  techParkDistance: string;
  owner: {
    name: string;
    phone: string;
    whatsapp: string;
    experience: string;
    verified: boolean;
    responseTime: string;
  };
  reviewsList: {
    id: string;
    author: string;
    date: string;
    rating: number;
    text: string;
    role: string;
  }[];
}

export const MOCK_PROPERTIES: PGProperty[] = [
  {
    id: "1",
    title: "Sunrise Heights Luxury Stay",
    tagline: "Ultra-modern co-living with rooftop cafe & biometric access",
    description: "Located in the beating heart of Koramangala 4th Block, Sunrise Heights offers hotel-grade comfort for tech professionals and students. Features high-speed fiber internet, daily chef-curated 3-course meals, air-conditioned rooms, and 24/7 digital security.",
    area: "Koramangala 4th Block",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560034",
    address: "84, 80 Feet Road, 4th Block, Koramangala, Bangalore",
    gender: "female",
    rating: 4.95,
    reviewCount: 142,
    minPrice: 8500,
    depositType: "1 Month Deposit (100% Refundable)",
    isVerified: true,
    zeroBrokerage: true,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
    ],
    amenities: ["High-Speed Wi-Fi", "Air Conditioning", "3 Meals Daily", "Biometric Lock", "Power Backup", "Washing Machine", "Housekeeping", "Rooftop Lounge"],
    roomPlans: [
      { id: "r1-single", name: "Executive Private Suite", type: "single", price: 14500, deposit: 14500, availableBeds: 2, features: ["King Bed", "Private Balcony", "Attached Bath", "Workstation Desk", "AC"] },
      { id: "r1-double", name: "Premium Double Sharing", type: "double", price: 9500, deposit: 9500, availableBeds: 4, features: ["Twin Beds", "Attached Bath", "Individual Wardrobes", "AC", "Study Desks"] },
      { id: "r1-triple", name: "Economy Triple Sharing", type: "triple", price: 7500, deposit: 7500, availableBeds: 3, features: ["Single Bed", "Attached Bath", "Locker Storage", "WiFi"] },
    ],
    rules: ["30 Days Notice Period", "Keyless Biometric Entry 24/7", "Non-Smoking Inside Premises", "Lounge Open for Visitors till 9 PM"],
    mealsIncluded: true,
    mealDetails: "Breakfast, Lunch & Dinner included (North & South Indian hygienic kitchen)",
    metroDistance: "600m from Sony World Junction Metro",
    techParkDistance: "10 mins to Embassy GolfLinks (EGL)",
    owner: {
      name: "Lakshmi Narayanan",
      phone: "+91 98450 12847",
      whatsapp: "919845012847",
      experience: "8 years hosting",
      verified: true,
      responseTime: "< 10 mins",
    },
    reviewsList: [
      { id: "rv-1", author: "Pooja Hegde", role: "Software Engineer @ Swiggy", date: "October 14, 2026", rating: 5, text: "The cleanest PG in Koramangala. The food actually tastes like home food and the biometric entry makes it super safe for late night shifts." },
      { id: "rv-2", author: "Deepika Rao", role: "Product Designer", date: "September 29, 2026", rating: 5, text: "Zero brokerage is 100% genuine. Signed the digital agreement in 5 minutes and moved in the same day." },
    ],
  },
  {
    id: "2",
    title: "Urban Nest Co-Living Hub",
    tagline: "Boutique co-living with creative workstation & gym",
    description: "Nestled in prime Bandra West, Urban Nest caters to young creative professionals and founders. Walking distance from cafes, fitness centers, and Carter Road. All rooms come equipped with ergonomic work desks and blackout curtains.",
    area: "Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    address: "24, Hill Road, Near Mehboob Studio, Bandra West, Mumbai",
    gender: "any",
    rating: 4.88,
    reviewCount: 98,
    minPrice: 13500,
    depositType: "Zero Security Deposit Pass Available",
    isVerified: true,
    zeroBrokerage: true,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&h=800&fit=crop",
    ],
    amenities: ["High-Speed Wi-Fi", "Air Conditioning", "In-House Gym", "Coworking Space", "Laundry Service", "CCTV Security", "Microwave & Refrigerator", "Weekly Linen Change"],
    roomPlans: [
      { id: "r2-single", name: "Studio Single AC", type: "single", price: 21000, deposit: 21000, availableBeds: 1, features: ["Private Studio", "Kitchenette", "Attached Washroom", "High-Speed WiFi"] },
      { id: "r2-double", name: "Executive Twin Sharing", type: "double", price: 13500, deposit: 13500, availableBeds: 3, features: ["Twin Bed", "Attached Bath", "AC", "Ergonomic Chairs"] },
    ],
    rules: ["Zero Brokerage Guarantee", "24/7 Security & Keypad Access", "Clean Kitchen Shared Access", "Pet Friendly on 1st Floor"],
    mealsIncluded: false,
    mealDetails: "Self-cooking kitchen equipped with microwave, induction & fridge. Meal subscriptions available @ ₹3,000/mo.",
    metroDistance: "8 mins from Bandra Railway Station",
    techParkDistance: "15 mins to BKC Financial Hub",
    owner: {
      name: "Vikram Singhania",
      phone: "+91 98200 44912",
      whatsapp: "919820044912",
      experience: "5 years hosting",
      verified: true,
      responseTime: "< 15 mins",
    },
    reviewsList: [
      { id: "rv-3", author: "Kunal Merchant", role: "Media Strategist", date: "October 8, 2026", rating: 5, text: "Hard to find a PG in Bandra that doesn't demand 6 months broker commission. Urban Nest is a gamechanger." },
    ],
  },
  {
    id: "3",
    title: "Scholar's Haven Campus Residence",
    tagline: "Dedicated study lounges, fast transit & student meal plans",
    description: "Designed specifically for students attending coaching hubs and colleges in HSR Layout and BTM. Equipped with quiet 24-hour study libraries, 300 Mbps fiber internet, and wholesome nutritious meals.",
    area: "HSR Layout Sector 2",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560102",
    address: "12th Main, Sector 2, HSR Layout, Bangalore",
    gender: "male",
    rating: 4.82,
    reviewCount: 215,
    minPrice: 6800,
    depositType: "Flat ₹5,000 Deposit",
    isVerified: true,
    zeroBrokerage: true,
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop",
    ],
    amenities: ["High-Speed Wi-Fi", "3 Meals Daily", "Study Library", "Laundry", "Daily Housekeeping", "CCTV", "RO Water Purifier", "Bike Parking"],
    roomPlans: [
      { id: "r3-double", name: "Comfort Double Room", type: "double", price: 8800, deposit: 5000, availableBeds: 5, features: ["Attached Bath", "AC Option", "Individual Study Desk", "High-Speed WiFi"] },
      { id: "r3-triple", name: "Budget Triple Sharing", type: "triple", price: 6800, deposit: 5000, availableBeds: 6, features: ["Single Bed", "Lockers", "Shared Bath", "Daily Cleaning"] },
    ],
    rules: ["Curfew: 10:30 PM", "Quiet Study Hours: 10 PM - 7 AM", "Parent Visits Allowed in Lounge", "30 Days Notice"],
    mealsIncluded: true,
    mealDetails: "Unlimited Breakfast, Lunch & Dinner with snacks on weekends",
    metroDistance: "1 km from HSR BDA Complex Metro",
    techParkDistance: "10 mins to Silk Board Junction",
    owner: {
      name: "Ramesh Sharma",
      phone: "+91 97420 88319",
      whatsapp: "919742088319",
      experience: "12 years hosting",
      verified: true,
      responseTime: "< 5 mins",
    },
    reviewsList: [
      { id: "rv-4", author: "Aditya Verma", role: "GATE Aspirant", date: "October 11, 2026", rating: 5, text: "The study room is quiet and WiFi never disconnects. Best PG for serious exam preparation." },
    ],
  },
  {
    id: "4",
    title: "Horizon Elite Lakeview Suites",
    tagline: "Panoramic lake vistas, infinity pool & executive amenities",
    description: "Experience resort-style co-living overlooking Powai Lake. Step into fully furnished luxury rooms with smart TVs, personal workstations, club gym access, and gourmet dining options.",
    area: "Powai",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400076",
    address: "Central Avenue, Hiranandani Gardens, Powai, Mumbai",
    gender: "any",
    rating: 4.92,
    reviewCount: 73,
    minPrice: 15500,
    depositType: "1 Month Security Deposit",
    isVerified: true,
    zeroBrokerage: true,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop",
    ],
    amenities: ["Lake View Balcony", "Swimming Pool", "High-Speed Wi-Fi", "Air Conditioning", "Chef Dining", "Gym", "Concierge Desk", "Valet Parking"],
    roomPlans: [
      { id: "r4-single", name: "Presidential Lakeview Single", type: "single", price: 24000, deposit: 24000, availableBeds: 2, features: ["Lake View", "Balcony", "En-suite Jacuzzi", "King Bed"] },
      { id: "r4-double", name: "Executive Twin Sharing", type: "double", price: 15500, deposit: 15500, availableBeds: 4, features: ["Lake Facing", "AC", "Twin Beds", "Housekeeping"] },
    ],
    rules: ["24/7 Access with Smart Keycard", "Visitor Allowed with Prior Gate Pass", "Strictly Non-Smoking"],
    mealsIncluded: true,
    mealDetails: "Continental & Indian Breakfast + Multi-Cuisine Dinner Buffet",
    metroDistance: "5 mins to Jagruti Nagar Metro",
    techParkDistance: "Walk to Kensington SEZ & L&T Infotech",
    owner: {
      name: "Karan Johar Oberoi",
      phone: "+91 98210 99401",
      whatsapp: "919821099401",
      experience: "7 years hosting",
      verified: true,
      responseTime: "< 20 mins",
    },
    reviewsList: [
      { id: "rv-5", author: "Simran Gill", role: "Management Consultant", date: "October 15, 2026", rating: 5, text: "Living here feels like staying in a 5-star hotel. Sunset over Powai lake from the balcony is unmatched." },
    ],
  },
  {
    id: "5",
    title: "GreenLeaf Oasis For Women",
    tagline: "Ultra-secure female sanctuary with biometric security & organic meals",
    description: "Exclusively crafted for working women and female university students in Hyderabad's HITEC City. Features triple-layer biometric verification, full-time female wardens, on-call doctor, and CCTV coverage across common areas.",
    area: "Madhapur",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    address: "Plot 42, Kavuri Hills, Madhapur, Hyderabad",
    gender: "female",
    rating: 4.89,
    reviewCount: 189,
    minPrice: 7200,
    depositType: "1 Month Refundable Deposit",
    isVerified: true,
    zeroBrokerage: true,
    images: [
      "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=800&fit=crop",
    ],
    amenities: ["Biometric Verification", "Full Female Staff", "3 Organic Meals", "High-Speed Wi-Fi", "AC", "Power Backup 24/7", "Doctor on Call", "Terrace Garden"],
    roomPlans: [
      { id: "r5-single", name: "Private Single AC", type: "single", price: 12000, deposit: 12000, availableBeds: 2, features: ["Attached Bath", "AC", "Double Wardrobe", "Dressing Table"] },
      { id: "r5-double", name: "Twin Sharing AC", type: "double", price: 8500, deposit: 8500, availableBeds: 6, features: ["Attached Bath", "AC", "Study Table", "Geyser"] },
      { id: "r5-triple", name: "Economy Triple", type: "triple", price: 7200, deposit: 7200, availableBeds: 3, features: ["Spacious Room", "Individual Lockers", "High-Speed WiFi"] },
    ],
    rules: ["Gate closes at 10:30 PM (Extensions on app)", "No male visitors past reception", "Cleanliness standards strictly monitored"],
    mealsIncluded: true,
    mealDetails: "Hygienic Home Cooked Meals (Breakfast, Lunch, Dinner & Evening High Tea)",
    metroDistance: "400m from Durgam Cheruvu Metro Station",
    techParkDistance: "5 mins to Raheja Mindspace & Cyber Towers",
    owner: {
      name: "Sujatha Reddy",
      phone: "+91 99490 33812",
      whatsapp: "919949033812",
      experience: "9 years hosting",
      verified: true,
      responseTime: "< 5 mins",
    },
    reviewsList: [
      { id: "rv-6", author: "Aishwarya Natarajan", role: "Analyst @ Deloitte", date: "October 16, 2026", rating: 5, text: "My parents visited and were completely reassured by the biometric security and female warden on-site." },
    ],
  },
  {
    id: "6",
    title: "Metro Square Executive Residency",
    tagline: "Steps from Blue Line Metro with dedicated power backup & Wi-Fi",
    description: "Ideal for professionals working in Noida Sector 62 tech parks and Delhi. 2-minute walk from metro, spacious air-conditioned rooms, and delicious food included in rent.",
    area: "Sector 62",
    city: "Delhi NCR",
    state: "Uttar Pradesh",
    pincode: "201309",
    address: "Block B, Industrial Area, Sector 62, Noida, Delhi NCR",
    gender: "male",
    rating: 4.75,
    reviewCount: 114,
    minPrice: 5800,
    depositType: "Zero Move-in Fee (Pay Rent Only)",
    isVerified: true,
    zeroBrokerage: true,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&h=800&fit=crop",
    ],
    amenities: ["Walk to Metro (2-Min)", "Air Conditioning", "3 Meals Daily", "High-Speed Wi-Fi", "Gym", "Power Backup", "Covered Bike Parking", "Water Purifier"],
    roomPlans: [
      { id: "r6-single", name: "Executive AC Single", type: "single", price: 9500, deposit: 5000, availableBeds: 3, features: ["AC", "Attached Bath", "Smart TV", "Work Desk"] },
      { id: "r6-double", name: "Double Sharing", type: "double", price: 6800, deposit: 5000, availableBeds: 5, features: ["AC", "Attached Bath", "Individual Almirah", "WiFi"] },
      { id: "r6-triple", name: "Budget Triple", type: "triple", price: 5800, deposit: 3000, availableBeds: 4, features: ["Comfortable Beds", "Fans", "Shared Bath", "Daily Cleaning"] },
    ],
    rules: ["24/7 Gate Open for Night Shifts", "30 Days Move-Out Notice", "No Alcohol in Common Areas"],
    mealsIncluded: true,
    mealDetails: "North Indian Homestyle Meals 3 Times a Day",
    metroDistance: "150m from Noida Electronic City Metro Station",
    techParkDistance: "Walk to Stellar IT Park & Logix Cyber Park",
    owner: {
      name: "Deepak Choudhary",
      phone: "+91 98110 55720",
      whatsapp: "919811055720",
      experience: "6 years hosting",
      verified: true,
      responseTime: "< 15 mins",
    },
    reviewsList: [
      { id: "rv-7", author: "Nikhil Joshi", role: "Software Engineer", date: "October 12, 2026", rating: 5, text: "Commuting to Delhi takes less than 30 mins because metro station is literally across the street." },
    ],
  },
  {
    id: "7",
    title: "Viman Nagar Student Sanctuary",
    tagline: "Vibrant co-living near Symbiosis with cafe, gym & chill zones",
    description: "Pune's top student-friendly accommodation right behind Symbiosis International University. High-energy student community, regular game nights, hygienic mess food, and rapid laundry services.",
    area: "Viman Nagar",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411014",
    address: "Datta Mandir Road, Viman Nagar, Pune",
    gender: "any",
    rating: 4.86,
    reviewCount: 167,
    minPrice: 5500,
    depositType: "Flat ₹5,000 Deposit",
    isVerified: true,
    zeroBrokerage: true,
    images: [
      "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=800&fit=crop",
    ],
    amenities: ["Walk to Symbiosis", "High-Speed Wi-Fi", "3 Meals Included", "Common Gaming Room", "Laundry", "Biometric Lock", "RO Drinking Water", "Terrace Cafe"],
    roomPlans: [
      { id: "r7-single", name: "Private Single AC", type: "single", price: 11000, deposit: 5000, availableBeds: 2, features: ["Study Setup", "Attached Bath", "AC", "Balcony"] },
      { id: "r7-double", name: "Double Sharing", type: "double", price: 7500, deposit: 5000, availableBeds: 4, features: ["Twin Beds", "Study Tables", "Attached Washroom", "WiFi"] },
      { id: "r7-triple", name: "Budget Triple", type: "triple", price: 5500, deposit: 5000, availableBeds: 6, features: ["Single Beds", "Cupboard", "WiFi", "Mess Food"] },
    ],
    rules: ["Quiet Hours from 11 PM", "Biometric Access 24/7", "Non-Smoking Building"],
    mealsIncluded: true,
    mealDetails: "Nutritious breakfast, lunch, high tea & dinner prepared by trained chef",
    metroDistance: "8 mins to Pune Airport & Ramwadi Metro",
    techParkDistance: "10 mins to EON IT Park Kharadi",
    owner: {
      name: "Anand Kulkarni",
      phone: "+91 98220 77314",
      whatsapp: "919822077314",
      experience: "10 years hosting",
      verified: true,
      responseTime: "< 10 mins",
    },
    reviewsList: [
      { id: "rv-8", author: "Varun Nair", role: "Symbiosis Student", date: "October 10, 2026", rating: 5, text: "Walking distance to college and great mess food. Made friends for life in the lounge." },
    ],
  },
  {
    id: "8",
    title: "OMR IT Corridor Coastal PG",
    tagline: "Serene beach breeze, fast transit & tech-ready co-living",
    description: "Located on Old Mahabalipuram Road (OMR), moments from major IT parks (TCS, Infosys, Cognizant). Fresh coastal breeze, spacious AC rooms, and authentic South & North Indian meals.",
    area: "OMR Thoraipakkam",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600097",
    address: "OMR Main Road, Thoraipakkam, Chennai",
    gender: "male",
    rating: 4.79,
    reviewCount: 88,
    minPrice: 5800,
    depositType: "1 Month Deposit",
    isVerified: true,
    zeroBrokerage: true,
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&h=800&fit=crop",
    ],
    amenities: ["Walk to Tech Park", "Air Conditioning", "3 Meals Daily", "High-Speed Wi-Fi", "Power Backup", "Two-Wheeler Parking", "CCTV", "Daily Housekeeping"],
    roomPlans: [
      { id: "r8-single", name: "Deluxe Single Room", type: "single", price: 10500, deposit: 10500, availableBeds: 3, features: ["AC", "Attached Bath", "Work Desk", "Balcony"] },
      { id: "r8-double", name: "Executive Double", type: "double", price: 7200, deposit: 7200, availableBeds: 5, features: ["AC", "Attached Bath", "Lockers", "WiFi"] },
      { id: "r8-triple", name: "Economy Triple", type: "triple", price: 5800, deposit: 5800, availableBeds: 4, features: ["Beds", "Fan", "Shared Bath", "Meals"] },
    ],
    rules: ["24/7 Gate Access for Shift Workers", "No Smoking Indoors", "30 Days Notice"],
    mealsIncluded: true,
    mealDetails: "South Indian Breakfast & Dinner with North Indian options",
    metroDistance: "Upcoming OMR Metro Phase 2 across the road",
    techParkDistance: "5 mins to TIDEL Park & Ascendas",
    owner: {
      name: "Murugan Swaminathan",
      phone: "+91 98400 66291",
      whatsapp: "919840066291",
      experience: "8 years hosting",
      verified: true,
      responseTime: "< 15 mins",
    },
    reviewsList: [
      { id: "rv-9", author: "Karthik Subramanian", role: "Frontend Dev @ TCS", date: "October 14, 2026", rating: 5, text: "Can literally walk to my TCS office in 7 minutes. Power backup works flawlessly during rains." },
    ],
  },
];

export function getPropertyById(id: string): PGProperty | undefined {
  return MOCK_PROPERTIES.find((p) => p.id === id);
}

export function filterProperties(params: {
  query?: string;
  city?: string;
  gender?: string;
  maxPrice?: number;
  minPrice?: number;
  filter?: string;
  sharing?: string;
  amenities?: string[];
}): PGProperty[] {
  return MOCK_PROPERTIES.filter((p) => {
    // City filter
    if (params.city && params.city !== "all") {
      const matchCity = p.city.toLowerCase().includes(params.city.toLowerCase()) ||
        p.area.toLowerCase().includes(params.city.toLowerCase());
      if (!matchCity) return false;
    }

    // Gender filter
    if (params.gender && params.gender !== "all") {
      if (params.gender === "female" && p.gender !== "female" && p.gender !== "any") return false;
      if (params.gender === "male" && p.gender !== "male" && p.gender !== "any") return false;
      if (params.gender === "any" && p.gender !== "any") return false;
    }

    // Max Price filter
    if (params.maxPrice && params.maxPrice > 0) {
      if (p.minPrice > params.maxPrice) return false;
    }

    // Min Price filter
    if (params.minPrice && params.minPrice > 0) {
      if (p.minPrice < params.minPrice) return false;
    }

    // Lifestyle special filters
    if (params.filter) {
      if (params.filter === "zero_deposit" && !p.depositType.toLowerCase().includes("zero") && !p.depositType.toLowerCase().includes("pass")) return false;
      if (params.filter === "ac_single" && !p.roomPlans.some((r) => r.type === "single" && r.features.some((f) => f.includes("AC")))) return false;
      if (params.filter === "meals" && !p.mealsIncluded) return false;
      if (params.filter === "metro" && !p.metroDistance.toLowerCase().includes("m") && !p.metroDistance.toLowerCase().includes("walk")) return false;
      if (params.filter === "balcony" && !p.amenities.some((a) => a.toLowerCase().includes("balcony")) && !p.amenities.some((a) => a.toLowerCase().includes("terrace"))) return false;
      if (params.filter === "biometric" && !p.amenities.some((a) => a.toLowerCase().includes("biometric"))) return false;
      if (params.filter === "gym" && !p.amenities.some((a) => a.toLowerCase().includes("gym"))) return false;
    }

    // Query text search
    if (params.query && params.query.trim()) {
      const q = params.query.toLowerCase().trim();
      const matchText = p.title.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.amenities.some((a) => a.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q);
      if (!matchText) return false;
    }

    // Sharing type
    if (params.sharing && params.sharing !== "all") {
      if (!p.roomPlans.some((r) => r.type === params.sharing)) return false;
    }

    return true;
  });
}

export function getAllCombinedProperties(): PGProperty[] {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("dpg_custom_properties");
      const custom: PGProperty[] = raw ? JSON.parse(raw) : [];
      return [...custom, ...MOCK_PROPERTIES];
    } catch {
      return MOCK_PROPERTIES;
    }
  }
  return MOCK_PROPERTIES;
}

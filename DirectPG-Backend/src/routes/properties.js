const express = require("express");
const { supabase, isSupabaseConfigured } = require("../config/supabase");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// Fallback seed properties in case Supabase is not yet populated
const fallbackProperties = [
  {
    id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    title: "Stanza Living - Boston House",
    slug: "stanza-living-boston-house-koramangala",
    description: "Premium unisex coliving space in Koramangala 4th Block with high-speed WiFi, daily chef-curated meals, gym, and 24x7 security.",
    propertyType: "pg_hostel",
    gender: "co-ed",
    gender_allowed: "co-ed",
    address: "80 Feet Road, 4th Block, Koramangala",
    locality: "Koramangala",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560034",
    price: 12500,
    starting_price: 12500,
    securityDeposit: 15000,
    security_deposit: 15000,
    amenities: ["WiFi", "Meals Included", "AC", "Power Backup", "Gym", "Housekeeping", "Biometric Entry", "Lounge"],
    rules: ["No smoking", "Quiet hours after 11 PM", "Visitors allowed until 9 PM"],
    foodIncluded: true,
    food_included: true,
    images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"],
    rating: 4.9,
    totalReviews: 128,
    total_reviews: 128,
    isVerified: true,
    is_verified: true,
    isFeatured: true,
    is_featured: true,
    ownerName: "Rajesh Sharma",
    ownerPhone: "+91 98765 43210",
  },
  {
    id: "b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22",
    title: "Zolo Serenity Luxury Living",
    slug: "zolo-serenity-luxury-living-hitech-city",
    description: "Ultra-modern tech-park adjacent PG with automated laundry, ergonomically furnished workstations, and gym.",
    propertyType: "pg_hostel",
    gender: "boys",
    gender_allowed: "boys",
    address: "Cyber Hills Colony, Lane 2, Madhapur",
    locality: "Hitec City",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    price: 9800,
    starting_price: 9800,
    securityDeposit: 10000,
    security_deposit: 10000,
    amenities: ["1 Gbps WiFi", "Daily Housekeeping", "AC", "Power Backup", "RO Water"],
    rules: ["ID verification mandatory", "No non-resident overnight guests"],
    foodIncluded: true,
    food_included: true,
    images: ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"],
    rating: 4.8,
    totalReviews: 94,
    total_reviews: 94,
    isVerified: true,
    is_verified: true,
    isFeatured: true,
    is_featured: true,
    ownerName: "Suresh Reddy",
    ownerPhone: "+91 98480 12345",
  },
  {
    id: "c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33",
    title: "LivQuik Executive Girls Residence",
    slug: "livquik-executive-girls-residence-wakad",
    description: "Secure, premium girls PG with 3-tier smart biometric security, nutritious home-style meals, and dedicated study pods.",
    propertyType: "pg_hostel",
    gender: "girls",
    gender_allowed: "girls",
    address: "Datta Mandir Road, Shankar Kalat Nagar, Wakad",
    locality: "Wakad",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411057",
    price: 8500,
    starting_price: 8500,
    securityDeposit: 9000,
    security_deposit: 9000,
    amenities: ["CCTV Security", "3 Meals Included", "Study Pods", "Washing Machines", "Doctor on Call"],
    rules: ["Girls only residence", "Entry restricted past 10:30 PM", "No smoking"],
    foodIncluded: true,
    food_included: true,
    images: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"],
    rating: 4.9,
    totalReviews: 142,
    total_reviews: 142,
    isVerified: true,
    is_verified: true,
    isFeatured: true,
    is_featured: true,
    ownerName: "Anjali Kulkarni",
    ownerPhone: "+91 97654 32109",
  },
];

// -------------------------------------------------------------
// GET /listings - Get all listings (Supabase with Fallback)
// -------------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const { city, gender, minPrice, maxPrice, q, page = 1, limit = 20 } = req.query;

    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from("properties").select("*, room_plans(*)", { count: "exact" });

      if (city) query = query.ilike("city", `%${city}%`);
      if (gender && gender !== "all") query = query.eq("gender_allowed", gender);
      if (minPrice) query = query.gte("starting_price", Number(minPrice));
      if (maxPrice) query = query.lte("starting_price", Number(maxPrice));
      if (q) query = query.or(`title.ilike.%${q}%,locality.ilike.%${q}%,city.ilike.%${q}%`);

      const from = (page - 1) * limit;
      const to = from + limit - 1;
      const { data, count, error } = await query.range(from, to).order("rating", { ascending: false });

      if (error) throw error;

      return res.status(200).json({
        success: true,
        source: "supabase",
        data: data || [],
        meta: {
          total: count || 0,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil((count || 0) / limit),
        },
      });
    }

    // Fallback filter
    let results = [...fallbackProperties];
    if (city) {
      results = results.filter((p) => p.city.toLowerCase().includes(String(city).toLowerCase()));
    }
    if (gender && gender !== "all") {
      results = results.filter((p) => p.gender === gender || p.gender_allowed === gender);
    }
    if (minPrice) results = results.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) results = results.filter((p) => p.price <= Number(maxPrice));
    if (q) {
      const queryStr = String(q).toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(queryStr) ||
          p.city.toLowerCase().includes(queryStr) ||
          p.locality.toLowerCase().includes(queryStr)
      );
    }

    return res.status(200).json({
      success: true,
      source: "local_cache",
      data: results,
      meta: {
        total: results.length,
        page: Number(page),
        limit: Number(limit),
        totalPages: 1,
      },
    });
  } catch (err) {
    console.error("Listings Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// GET /listings/featured
// -------------------------------------------------------------
router.get("/featured", async (req, res) => {
  try {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from("properties")
        .select("*, room_plans(*)")
        .eq("is_featured", true)
        .limit(6);

      if (error) throw error;
      return res.status(200).json({ success: true, source: "supabase", data });
    }

    const featured = fallbackProperties.filter((p) => p.isFeatured || p.is_featured);
    return res.status(200).json({ success: true, source: "local_cache", data: featured });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// GET /listings/slug/:slug
// -------------------------------------------------------------
router.get("/slug/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from("properties")
        .select("*, room_plans(*), reviews(*)")
        .eq("slug", slug)
        .single();

      if (error) return res.status(404).json({ success: false, error: "Listing not found." });
      return res.status(200).json({ success: true, source: "supabase", data });
    }

    const property = fallbackProperties.find((p) => p.slug === slug);
    if (!property) return res.status(404).json({ success: false, error: "Listing not found." });
    return res.status(200).json({ success: true, source: "local_cache", data: property });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// GET /listings/:id
// -------------------------------------------------------------
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from("properties")
        .select("*, room_plans(*), reviews(*)")
        .eq("id", id)
        .single();

      if (error) return res.status(404).json({ success: false, error: "Listing not found." });
      return res.status(200).json({ success: true, source: "supabase", data });
    }

    const property = fallbackProperties.find((p) => p.id === id || p.slug === id);
    if (!property) return res.status(404).json({ success: false, error: "Listing not found." });
    return res.status(200).json({ success: true, source: "local_cache", data: property });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// POST /listings - Create new Property in Supabase
// -------------------------------------------------------------
router.post("/", authenticate, async (req, res) => {
  try {
    const propertyData = req.body;
    const ownerId = req.user.id || req.user._id;

    if (isSupabaseConfigured() && supabase) {
      const slug = (propertyData.title || "pg")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") + "-" + Date.now();

      const { data, error } = await supabase
        .from("properties")
        .insert({
          ...propertyData,
          slug,
          owner_id: String(ownerId),
          owner_name: req.user.name,
        })
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json({ success: true, message: "Property listed in Supabase.", data });
    }

    // Mock response
    return res.status(201).json({
      success: true,
      message: "Property created in temporary store.",
      data: { ...propertyData, id: "prop_" + Date.now(), owner_id: ownerId },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// POST /listings/:id/wishlist
// -------------------------------------------------------------
router.post("/:id/wishlist", authenticate, (req, res) => {
  return res.status(200).json({
    success: true,
    data: { wishlisted: true },
  });
});

module.exports = router;

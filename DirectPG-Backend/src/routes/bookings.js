const express = require("express");
const { supabase, isSupabaseConfigured } = require("../config/supabase");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

const inMemoryBookings = [];

// -------------------------------------------------------------
// POST /bookings - Create new Booking in Supabase
// -------------------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const {
      listingId,
      roomTypeId,
      checkIn,
      tenantName,
      tenantPhone,
      tenantEmail,
      tenantIdProof,
      tenantIdProofType,
      monthlyRent = 12000,
      tokenAmount = 2000,
      securityDeposit = 15000,
    } = req.body;

    const bookingCode = "DPG-" + Math.floor(100000 + Math.random() * 900000);

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          booking_code: bookingCode,
          property_id: listingId,
          room_plan_id: roomTypeId,
          tenant_id: req.user ? String(req.user.id || req.user._id) : "guest_tenant",
          tenant_name: tenantName,
          tenant_email: tenantEmail,
          tenant_phone: tenantPhone,
          check_in_date: checkIn || new Date().toISOString().split("T")[0],
          monthly_rent: Number(monthlyRent),
          token_amount: Number(tokenAmount),
          security_deposit: Number(securityDeposit),
          total_paid: Number(tokenAmount),
          status: "confirmed",
          payment_status: "token_paid",
        })
        .select()
        .single();

      if (error) {
        console.warn("Supabase booking insert warning:", error.message);
      } else {
        return res.status(201).json({
          success: true,
          message: "Booking confirmed and logged in Supabase.",
          data,
        });
      }
    }

    // In-memory fallback
    const newBooking = {
      id: "bk_" + Date.now(),
      bookingCode,
      listingId,
      roomTypeId,
      checkIn: checkIn || new Date().toISOString().split("T")[0],
      tenantName,
      tenantPhone,
      tenantEmail,
      status: "confirmed",
      tokenAmount,
      monthlyRent,
      securityDeposit,
      createdAt: new Date().toISOString(),
    };

    inMemoryBookings.push(newBooking);

    return res.status(201).json({
      success: true,
      message: "Booking confirmed successfully.",
      data: newBooking,
    });
  } catch (err) {
    console.error("Booking Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// GET /bookings/my - Fetch Tenant's Bookings
// -------------------------------------------------------------
router.get("/my", authenticate, async (req, res) => {
  try {
    const tenantId = String(req.user.id || req.user._id);

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, properties(*)")
        .eq("tenant_id", tenantId)
        .order("created_at", { ascending: false });

      if (!error && data) {
        return res.status(200).json({ success: true, data });
      }
    }

    return res.status(200).json({
      success: true,
      data: inMemoryBookings.filter((b) => b.tenantEmail === req.user.email || !b.tenantEmail),
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// GET /bookings/:id
// -------------------------------------------------------------
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase.from("bookings").select("*, properties(*)").eq("id", id).single();
    if (!error && data) return res.status(200).json({ success: true, data });
  }

  const booking = inMemoryBookings.find((b) => b.id === id || b.bookingCode === id);
  if (!booking) return res.status(404).json({ success: false, error: "Booking not found." });
  return res.status(200).json({ success: true, data: booking });
});

module.exports = router;

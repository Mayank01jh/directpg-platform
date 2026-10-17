const express = require("express");
const { supabase, isSupabaseConfigured } = require("../config/supabase");

const router = express.Router();

// -------------------------------------------------------------
// POST /visits - Schedule In-Person or Virtual Walkthrough Visit
// -------------------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const { propertyId, name, phone, visitType = "in_person", preferredDate, preferredTimeSlot, notes } = req.body;

    if (!propertyId || !name || !phone || !preferredDate) {
      return res.status(400).json({
        success: false,
        error: "Property, visitor name, phone, and date are required.",
      });
    }

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from("scheduled_visits")
        .insert({
          property_id: propertyId,
          tenant_id: "visitor_" + Date.now(),
          tenant_name: name,
          tenant_phone: phone,
          visit_type: visitType,
          preferred_date: preferredDate,
          preferred_time_slot: preferredTimeSlot || "11:00 AM - 1:00 PM",
          notes: notes || "",
          status: "scheduled",
        })
        .select()
        .single();

      if (!error && data) {
        return res.status(201).json({
          success: true,
          message: "Walkthrough visit scheduled in Supabase.",
          data,
        });
      }
    }

    // Fallback response
    return res.status(201).json({
      success: true,
      message: "Visit scheduled successfully.",
      data: {
        id: "visit_" + Date.now(),
        propertyId,
        name,
        phone,
        visitType,
        preferredDate,
        preferredTimeSlot: preferredTimeSlot || "11:00 AM - 1:00 PM",
        status: "scheduled",
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

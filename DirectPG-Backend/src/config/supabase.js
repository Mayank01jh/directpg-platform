const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;
let isConfigured = false;

if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project-id")) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    isConfigured = true;
    console.log("✅ [Supabase] Client initialized successfully");
  } catch (err) {
    console.error("❌ [Supabase] Initialization error:", err.message);
  }
} else {
  console.warn("⚠️ [Supabase] SUPABASE_URL or SUPABASE_KEY not configured. Running with embedded fallback store.");
}

const getSupabaseStatus = () => ({
  configured: isConfigured,
  url: supabaseUrl ? supabaseUrl.replace(/^(https?:\/\/[^/]+).*/, "$1") : "not set",
});

module.exports = { supabase, isSupabaseConfigured: () => isConfigured, getSupabaseStatus };

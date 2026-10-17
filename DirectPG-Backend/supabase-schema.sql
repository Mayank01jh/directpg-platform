-- ==============================================================================
-- DIRECTPG SUPABASE DATABASE SCHEMA
-- Purpose: Relational storage for PG listings, room inventories, bookings,
--          visits, and verified reviews.
-- Note: User authentication & sensitive KYC credentials are stored in MongoDB.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROPERTIES TABLE
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    property_type VARCHAR(50) DEFAULT 'pg_hostel',
    gender_allowed VARCHAR(20) CHECK (gender_allowed IN ('boys', 'girls', 'co-ed', 'all')),
    address TEXT NOT NULL,
    landmark VARCHAR(255),
    locality VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    starting_price NUMERIC(10, 2) NOT NULL,
    security_deposit NUMERIC(10, 2) NOT NULL,
    notice_period_days INT DEFAULT 30,
    lock_in_period_months INT DEFAULT 3,
    amenities TEXT[] DEFAULT '{}',
    rules TEXT[] DEFAULT '{}',
    food_included BOOLEAN DEFAULT true,
    food_types TEXT[] DEFAULT '{"breakfast", "dinner"}',
    images TEXT[] DEFAULT '{}',
    rating NUMERIC(3, 2) DEFAULT 4.8,
    total_reviews INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    owner_id VARCHAR(100) NOT NULL, -- references MongoDB User ID
    owner_name VARCHAR(100) NOT NULL,
    owner_phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ROOM PLANS TABLE
CREATE TABLE IF NOT EXISTS room_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    room_type VARCHAR(50) CHECK (room_type IN ('single', 'double', 'triple', 'four_plus')),
    name VARCHAR(100) NOT NULL,
    rent_monthly NUMERIC(10, 2) NOT NULL,
    deposit NUMERIC(10, 2) NOT NULL,
    total_beds INT NOT NULL DEFAULT 1,
    available_beds INT NOT NULL DEFAULT 1,
    has_attached_washroom BOOLEAN DEFAULT true,
    has_ac BOOLEAN DEFAULT true,
    has_balcony BOOLEAN DEFAULT false,
    amenities TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_code VARCHAR(20) UNIQUE NOT NULL,
    property_id UUID REFERENCES properties(id) ON DELETE RESTRICT,
    room_plan_id UUID REFERENCES room_plans(id) ON DELETE RESTRICT,
    tenant_id VARCHAR(100) NOT NULL, -- references MongoDB User ID
    tenant_name VARCHAR(100) NOT NULL,
    tenant_email VARCHAR(150) NOT NULL,
    tenant_phone VARCHAR(50) NOT NULL,
    check_in_date DATE NOT NULL,
    duration_months INT DEFAULT 6,
    monthly_rent NUMERIC(10, 2) NOT NULL,
    token_amount NUMERIC(10, 2) NOT NULL,
    security_deposit NUMERIC(10, 2) NOT NULL,
    total_paid NUMERIC(10, 2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'active', 'completed')),
    payment_status VARCHAR(50) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'token_paid', 'fully_paid', 'refunded')),
    payment_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. SCHEDULED VISITS TABLE
CREATE TABLE IF NOT EXISTS scheduled_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    tenant_id VARCHAR(100) NOT NULL, -- references MongoDB User ID
    tenant_name VARCHAR(100) NOT NULL,
    tenant_phone VARCHAR(50) NOT NULL,
    visit_type VARCHAR(20) CHECK (visit_type IN ('in_person', 'virtual_tour')),
    preferred_date DATE NOT NULL,
    preferred_time_slot VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'rescheduled', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    tenant_id VARCHAR(100) NOT NULL, -- references MongoDB User ID
    tenant_name VARCHAR(100) NOT NULL,
    overall_rating NUMERIC(2, 1) NOT NULL CHECK (overall_rating >= 1.0 AND overall_rating <= 5.0),
    cleanliness_rating NUMERIC(2, 1) DEFAULT 5.0,
    food_rating NUMERIC(2, 1) DEFAULT 5.0,
    safety_rating NUMERIC(2, 1) DEFAULT 5.0,
    title VARCHAR(200),
    comment TEXT NOT NULL,
    verified_stay BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_gender ON properties(gender_allowed);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(starting_price);
CREATE INDEX IF NOT EXISTS idx_bookings_tenant ON bookings(tenant_id);
CREATE INDEX IF NOT EXISTS idx_bookings_property ON bookings(property_id);
CREATE INDEX IF NOT EXISTS idx_reviews_property ON reviews(property_id);

-- 8. ROW LEVEL SECURITY (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active properties and room plans
CREATE POLICY "Public can view properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Public can view room plans" ON room_plans FOR SELECT USING (true);
CREATE POLICY "Public can view reviews" ON reviews FOR SELECT USING (true);

-- Allow authenticated backend service role full access
CREATE POLICY "Full access to service role" ON properties USING (auth.role() = 'service_role');
CREATE POLICY "Full access to bookings service" ON bookings USING (auth.role() = 'service_role');
CREATE POLICY "Full access to visits service" ON scheduled_visits USING (auth.role() = 'service_role');

-- 9. INITIAL SEED DATA
INSERT INTO properties (
    id, title, slug, description, property_type, gender_allowed, address,
    landmark, locality, city, state, pincode, starting_price, security_deposit,
    amenities, rules, food_included, images, rating, total_reviews, is_verified, is_featured,
    owner_id, owner_name, owner_phone
) VALUES
(
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Stanza Living - Boston House',
    'stanza-living-boston-house-koramangala',
    'Premium unisex coliving space in the heart of Koramangala 4th Block with high-speed WiFi, daily chef-curated meals, gym, and 24x7 security.',
    'pg_hostel',
    'co-ed',
    '80 Feet Road, 4th Block, Koramangala',
    'Near Sony World Signal',
    'Koramangala',
    'Bangalore',
    'Karnataka',
    '560034',
    12500,
    15000,
    '{"High-Speed WiFi", "3 Meals Daily", "Air Conditioning", "Power Backup", "Gym Access", "Daily Housekeeping", "Biometric Entry", "Lounge"}',
    '{"No smoking inside rooms", "Quiet hours after 11 PM", "Visitors allowed in common lounge until 9 PM"}',
    true,
    '{"https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"}',
    4.9,
    128,
    true,
    true,
    'owner_mongodb_id_101',
    'Rajesh Sharma',
    '+91 98765 43210'
),
(
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Zolo Serenity Luxury Living',
    'zolo-serenity-luxury-living-hitech-city',
    'Ultra-modern tech-park adjacent PG with automated laundry, ergonomically furnished workstations, rooftop cafeteria, and gym.',
    'pg_hostel',
    'boys',
    'Cyber Hills Colony, Lane 2, Madhapur',
    'Behind Cyber Towers',
    'Hitec City',
    'Hyderabad',
    'Telangana',
    '500081',
    9800,
    10000,
    '{"1 Gbps WiFi", "Daily Housekeeping", "AC & Geyser", "Covered Parking", "24x7 Power Backup", "RO Purified Water"}',
    '{"ID verification mandatory", "No non-resident overnight guests without notice"}',
    true,
    '{"https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"}',
    4.8,
    94,
    true,
    true,
    'owner_mongodb_id_102',
    'Suresh Reddy',
    '+91 98480 12345'
),
(
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    'LivQuik Executive Girls Residence',
    'livquik-executive-girls-residence-wakad',
    'Secure, premium girls PG with 3-tier smart biometric security, nutritious home-style meals, dedicated study pods, and housekeeping.',
    'pg_hostel',
    'girls',
    'Datta Mandir Road, Shankar Kalat Nagar, Wakad',
    'Opposite Hinjewadi Flyover',
    'Wakad',
    'Pune',
    'Maharashtra',
    '411057',
    8500,
    9000,
    '{"High Security CCTV", "3 Meals Included", "Study Pods", "Washing Machines", "High-Speed WiFi", "Doctor on Call"}',
    '{"Girls only residence", "Entry restricted past 10:30 PM", "No alcohol or smoking allowed"}',
    true,
    '{"https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"}',
    4.9,
    142,
    true,
    true,
    'owner_mongodb_id_103',
    'Anjali Kulkarni',
    '+91 97654 32109'
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Room Plans
INSERT INTO room_plans (id, property_id, room_type, name, rent_monthly, deposit, total_beds, available_beds, has_attached_washroom, has_ac)
VALUES
('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'single', 'Private Executive Studio', 18000, 20000, 1, 1, true, true),
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'double', 'Double Sharing Premium', 12500, 15000, 2, 1, true, true),
('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'double', 'Twin Sharing Deluxe', 9800, 10000, 2, 2, true, true),
('a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'triple', 'Triple Sharing Comfort', 8500, 9000, 3, 2, true, false)
ON CONFLICT (id) DO NOTHING;

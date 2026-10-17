import Navbar from "@/components/layout/Navbar";
import AlignedGridSection from "@/components/layout/AlignedGridSection";
import FeaturedListings from "@/components/listings/FeaturedListings";
import HowItWorks from "@/components/layout/HowItWorks";
import Testimonials from "@/components/layout/Testimonials";
import CTABanner from "@/components/layout/CTABanner";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "DirectPG - Direct-to-Owner Student Housing & Co-Living | 0% Brokerage",
  description: "Browse verified PG accommodations and co-living spaces across Bangalore, Mumbai, Delhi, Hyderabad, and Pune. Zero brokerage, keyless biometric access, instant digital leases.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#FFFFFF" }}>
        {/* Core Layout Grid:
            Row 1: 3 Value Pillars [ 0% Brokerage | 42-Pt Audit | Escrow Pass ]
            Row 2: Full-Width Editorial Hero & Smart Search
            Row 3: Quick Finder + Curated Top Verified Stays
            Row 4: 6 Key Metropolitan City Hubs */}
        <AlignedGridSection />

        {/* Curated Stays We Love (Horizontal Scroll & Instant Booking) */}
        <FeaturedListings />

        {/* 3-Step Verification Guide: How DirectPG Works */}
        <HowItWorks />

        {/* Tenant Ratings & Verified Reviews */}
        <Testimonials />

        {/* For Property Owners Partner Banner */}
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}

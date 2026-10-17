import Link from "next/link";
import {
  IconBuilding,
  IconShieldCheck,
  IconRupee,
  IconLock,
  IconCheck,
  IconArrowRight,
} from "@/components/ui/Icons";

export const metadata = {
  title: "About Us - DirectPG Store",
  description: "Learn how DirectPG is transforming Indian student housing and co-living with 100% verified properties and 0% brokerage.",
};

export default function AboutPage() {
  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="app-container" style={{ maxWidth: "860px" }}>
        {/* Hero Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "var(--radius-pill)",
            background: "var(--apple-blue-light)",
            color: "#007AFF",
            fontSize: "0.8rem",
            fontWeight: 700,
            marginBottom: "1rem",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}>
            <IconShieldCheck size={14} color="#007AFF" /> Direct-to-Owner Mission
          </span>

          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1rem" }}>
            Eliminating Middlemen from Indian Student Housing
          </h1>

          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "680px", margin: "0 auto" }}>
            For decades, college students and working professionals in Bangalore, Mumbai, and Delhi were forced to pay extortionate 1-month brokerage fees for substandard hostels. DirectPG connects you directly with verified owners with 0% brokerage.
          </p>
        </div>

        {/* 3 Pillars Grid (60:30:10) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3.5rem",
        }}>
          {/* Pillar 1 */}
          <div className="ios-card" style={{
            background: "var(--bg-card)",
            padding: "2rem",
            borderRadius: "22px",
            border: "1px solid var(--border-color)",
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: "14px",
              background: "var(--apple-blue-light)",
              color: "#007AFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.25rem",
            }}>
              <IconShieldCheck size={24} color="#007AFF" />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              100% Verified Stays
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Every single listing is physically audited by our on-ground inspection officers. We verify room dimensions, WiFi speeds, hygiene standards, and food freshness.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="ios-card" style={{
            background: "var(--bg-card)",
            padding: "2rem",
            borderRadius: "22px",
            border: "1px solid var(--border-color)",
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: "14px",
              background: "var(--apple-blue-light)",
              color: "#007AFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.25rem",
            }}>
              <IconRupee size={24} color="#007AFF" />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              0% Brokerage Forever
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              No commissions, no hidden broker cuts, and no processing markups. Your rent and deposit go directly to the verified property owner via instant UPI escrow.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="ios-card" style={{
            background: "var(--bg-card)",
            padding: "2rem",
            borderRadius: "22px",
            border: "1px solid var(--border-color)",
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: "14px",
              background: "var(--apple-blue-light)",
              color: "#007AFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.25rem",
            }}>
              <IconLock size={24} color="#007AFF" />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Biometric Smart Access
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Receive an Apple Wallet-style digital move-in pass with biometric keyless lock codes (#4892*), legal 11-month e-lease agreement, and host emergency contacts.
            </p>
          </div>
        </div>

        {/* Milestone Stats */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "24px",
          padding: "2.5rem",
          border: "1px solid var(--border-color)",
          marginBottom: "3.5rem",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "2rem",
            textAlign: "center",
          }}>
            <div>
              <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "#007AFF" }}>50,000+</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>Verified Beds Across India</div>
            </div>
            <div>
              <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "#007AFF" }}>₹0</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>Brokerage Paid by Tenants</div>
            </div>
            <div>
              <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "#007AFF" }}>6 Major</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>Metropolitan Hubs Active</div>
            </div>
            <div>
              <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "#007AFF" }}>4.9 ★</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>Average Tenant Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{
          textAlign: "center",
          padding: "2.5rem",
          borderRadius: "24px",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            Find Your New Home in 5 Minutes
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Explore verified single, double, and triple sharing rooms in your favorite city.
          </p>
          <Link
            href="/listings"
            className="ios-pill-btn ios-pill-btn-solid"
            style={{
              padding: "0.75rem 2rem",
              fontSize: "0.92rem",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>Browse All Listings</span>
            <IconArrowRight size={16} color="#FFFFFF" />
          </Link>
        </div>
      </div>
    </div>
  );
}

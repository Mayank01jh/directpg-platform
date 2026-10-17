import Link from "next/link";
import {
  IconCheck,
  IconShieldCheck,
  IconRupee,
  IconBuilding,
  IconArrowRight,
} from "@/components/ui/Icons";

export const metadata = {
  title: "Pricing & Plans - DirectPG Store",
  description: "DirectPG pricing is 100% free for students and tenants. Transparent, affordable plans for PG owners and co-living operators.",
};

export default function PricingPage() {
  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="app-container" style={{ maxWidth: "860px" }}>
        {/* Header */}
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
            Simple & Transparent
          </span>

          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1rem" }}>
            Free for Tenants. Built for Owners.
          </h1>

          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto" }}>
            Zero brokerage, zero platform markup for students. Transparent partner plans for property managers.
          </p>
        </div>

        {/* 2 Plans Comparison */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          marginBottom: "3.5rem",
        }}>
          {/* Tenant Plan */}
          <div className="ios-card" style={{
            background: "var(--bg-card)",
            borderRadius: "24px",
            padding: "2.25rem",
            border: "1px solid var(--border-color)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
            <div>
              <div style={{
                display: "inline-block",
                padding: "0.25rem 0.65rem",
                borderRadius: "var(--radius-pill)",
                background: "var(--bg-secondary)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--text-secondary)",
                marginBottom: "1rem",
              }}>
                FOR STUDENTS & TENANTS
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>
                Direct Tenant Pass
              </h2>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", margin: "1rem 0 1.5rem" }}>
                <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "#007AFF" }}>₹0</span>
                <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>forever / 0% brokerage</span>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.85rem", color: "var(--text-primary)" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <IconCheck size={16} color="#34C759" strokeWidth={3} />
                  <span>0% Brokerage on all bookings</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <IconCheck size={16} color="#34C759" strokeWidth={3} />
                  <span>Unlimited in-person & video walkthroughs</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <IconCheck size={16} color="#34C759" strokeWidth={3} />
                  <span>Digital Apple Wallet move-in pass</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <IconCheck size={16} color="#34C759" strokeWidth={3} />
                  <span>Biometric smart lock pin generation</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <IconCheck size={16} color="#34C759" strokeWidth={3} />
                  <span>UIDAI Aadhaar verified co-tenants</span>
                </li>
              </ul>
            </div>

            <Link
              href="/listings"
              className="ios-pill-btn ios-pill-btn-solid"
              style={{
                width: "100%",
                padding: "0.8rem",
                textAlign: "center",
                fontWeight: 700,
                marginTop: "2rem",
                display: "block",
              }}
            >
              Start Searching Free
            </Link>
          </div>

          {/* Owner Plan */}
          <div className="ios-card" style={{
            background: "var(--bg-card)",
            borderRadius: "24px",
            padding: "2.25rem",
            border: "2px solid #007AFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}>
            <div style={{
              position: "absolute",
              top: "-12px",
              right: "24px",
              background: "#007AFF",
              color: "#FFFFFF",
              fontSize: "0.72rem",
              fontWeight: 800,
              padding: "0.25rem 0.75rem",
              borderRadius: "var(--radius-pill)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}>
              Most Popular for PG Owners
            </div>

            <div>
              <div style={{
                display: "inline-block",
                padding: "0.25rem 0.65rem",
                borderRadius: "var(--radius-pill)",
                background: "var(--apple-blue-light)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#007AFF",
                marginBottom: "1rem",
              }}>
                FOR PG OPERATORS & LANDLORDS
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>
                Verified Partner Hub
              </h2>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", margin: "1rem 0 1.5rem" }}>
                <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)" }}>₹0</span>
                <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>setup fee / 100% free listing</span>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.85rem", color: "var(--text-primary)" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <IconCheck size={16} color="#34C759" strokeWidth={3} />
                  <span>Unlimited PG listings in all cities</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <IconCheck size={16} color="#34C759" strokeWidth={3} />
                  <span>Direct tenant call & WhatsApp inquiries</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <IconCheck size={16} color="#34C759" strokeWidth={3} />
                  <span>Instant UPI rent settlement directly to bank</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <IconCheck size={16} color="#34C759" strokeWidth={3} />
                  <span>Physical verification badge audit</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <IconCheck size={16} color="#34C759" strokeWidth={3} />
                  <span>Automated rent receipt & e-lease contracts</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register?role=owner"
              className="ios-pill-btn ios-pill-btn-solid"
              style={{
                width: "100%",
                padding: "0.8rem",
                textAlign: "center",
                fontWeight: 700,
                marginTop: "2rem",
                display: "block",
              }}
            >
              List Your PG Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { IconCheck } from "@/components/ui/Icons";
import { getCurrentUser } from "@/lib/userDataStore";

export default function CTABanner() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    const handleUserUpdate = () => setCurrentUser(getCurrentUser());
    window.addEventListener("user-updated", handleUserUpdate);
    return () => window.removeEventListener("user-updated", handleUserUpdate);
  }, []);

  // Never show PG owner onboarding banner to tenants
  if (currentUser?.role === "tenant") {
    return null;
  }

  return (
    <section style={{ padding: "1.5rem 0 2.5rem" }}>
      <div className="app-container">
        <div
          className="ios-card"
          style={{
            padding: "clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)",
            borderRadius: "var(--radius-xl)",
            background: "#FFFFFF",
            border: "1px solid var(--border-color)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Subtle Decorative Rings */}
          <div style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            background: "radial-gradient(circle, var(--apple-blue-light) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Left Text */}
          <div style={{ maxWidth: "600px", position: "relative", zIndex: 1 }}>
            <span className="ios-section-eyebrow" style={{ color: "var(--apple-blue)" }}>
              FOR PG & HOSTEL OWNERS
            </span>
            <h2 style={{
              fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              margin: "0.35rem 0 0.85rem",
              lineHeight: 1.2,
            }}>
              List Your Property on DirectPG Store
            </h2>
            <p style={{
              fontSize: "0.95rem",
              color: "var(--text-caption)",
              lineHeight: 1.6,
              marginBottom: "1.5rem",
            }}>
              Reach over 2 million students and working professionals. Get instant digital bookings, verified tenant KYC, and automated rent collection with zero commissions for the first 6 months.
            </p>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              flexWrap: "wrap",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <IconCheck size={14} color="#34C759" strokeWidth={2.6} />
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                  Zero Commission Trial
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <IconCheck size={14} color="#34C759" strokeWidth={2.6} />
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                  Aadhaar Verified Tenants
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <IconCheck size={14} color="#34C759" strokeWidth={2.6} />
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                  Digital Rent Agreements
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            position: "relative",
            zIndex: 1,
            flexShrink: 0,
          }}>
            <Link
              href="/register?role=owner"
              className="ios-pill-btn ios-pill-btn-solid"
              style={{
                padding: "0.75rem 2rem",
                fontSize: "0.92rem",
                fontWeight: 700,
              }}
            >
              List Property Free
            </Link>

            <Link
              href={ROUTES.OWNER_DASHBOARD}
              className="ios-pill-btn"
              style={{
                padding: "0.65rem 2rem",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              Owner Portal Login →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
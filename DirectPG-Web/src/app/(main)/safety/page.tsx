import Link from "next/link";
import {
  IconShieldCheck,
  IconLock,
  IconCheck,
  IconArrowRight,
  IconUser,
} from "@/components/ui/Icons";

export const metadata = {
  title: "Safety & Biometrics - DirectPG Store",
  description: "Learn about DirectPG's multi-tier tenant protection, keyless biometric access, and mandatory Aadhaar e-KYC verification.",
};

export default function SafetyPage() {
  const safetyFeatures = [
    {
      title: "Keyless Biometric Smart Locks",
      desc: "Forget physical keys that can be duplicated or misplaced. Every verified tenant receives a time-restricted cryptographic biometric passcode (#4892*) linked to their smartphone.",
      icon: IconLock,
    },
    {
      title: "Mandatory Aadhaar e-KYC Verification",
      desc: "Zero anonymous co-tenants. Every student and professional undergoes UIDAI Aadhaar verification before getting access to the building and room.",
      icon: IconShieldCheck,
    },
    {
      title: "CCTV Surveillance & 24/7 Security Guards",
      desc: "All shared corridors, entry gates, and dining areas are monitored with uninterrupted CCTV feeds and licensed physical security personnel.",
      icon: IconShieldCheck,
    },
    {
      title: "Verified Female Wardens for Girls Hostels",
      desc: "Our female-only properties feature dedicated resident matrons, strict visitor registration guidelines, and private biometric entry gates.",
      icon: IconUser,
    },
  ];

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
            <IconShieldCheck size={14} color="#007AFF" /> Tenant Protection Standard
          </span>

          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1rem" }}>
            Safety First, Always
          </h1>

          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "680px", margin: "0 auto" }}>
            We understand that moving to a new city can be intimidating for students and parents alike. That&apos;s why every DirectPG property adheres to strict biometric, legal, and physical security standards.
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3.5rem",
        }}>
          {safetyFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="ios-card"
                style={{
                  background: "var(--bg-card)",
                  borderRadius: "22px",
                  padding: "2rem",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div style={{
                  width: 46,
                  height: 46,
                  borderRadius: "12px",
                  background: "var(--apple-blue-light)",
                  color: "#007AFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}>
                  <Icon size={22} color="#007AFF" />
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* DirectPG Security Seal */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "24px",
          padding: "2.5rem",
          border: "1px solid var(--border-color)",
          textAlign: "center",
        }}>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            Have questions about safety in your neighborhood?
          </h2>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.75rem", maxWidth: "560px", margin: "0 auto 1.75rem" }}>
            Our tenant support team is on standby 24/7 to arrange parent video walkthroughs and neighborhood safety reports.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/support"
              className="ios-pill-btn"
              style={{ padding: "0.65rem 1.6rem", fontSize: "0.88rem" }}
            >
              Contact Safety Desk
            </Link>
            <Link
              href="/listings"
              className="ios-pill-btn ios-pill-btn-solid"
              style={{ padding: "0.65rem 1.75rem", fontSize: "0.88rem" }}
            >
              Explore Verified Stays
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

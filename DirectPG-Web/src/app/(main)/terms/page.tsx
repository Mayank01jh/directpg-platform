import Link from "next/link";
import { IconFileText, IconCheck } from "@/components/ui/Icons";

export const metadata = {
  title: "Terms of Service - DirectPG Store",
  description: "Terms of service and tenancy legal guidelines for DirectPG users and property owners.",
};

export default function TermsPage() {
  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="app-container" style={{ maxWidth: "800px" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#007AFF", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Legal Framework
          </span>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.4rem", marginBottom: "0.5rem" }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            Effective Date: October 18, 2026 • Version 2.4
          </p>
        </div>

        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "24px",
          padding: "2.5rem",
          border: "1px solid var(--border-color)",
          fontSize: "0.9rem",
          lineHeight: 1.7,
          color: "var(--text-secondary)",
          display: "flex",
          flexDirection: "column",
          gap: "1.75rem",
        }}>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              1. Direct Marketplace & Zero Brokerage
            </h2>
            <p>
              DirectPG operates as a direct-to-owner discovery and digital leasing technology marketplace. Under no circumstances does DirectPG act as an intermediary broker or collect brokerage commission from either tenants or property owners. All rental transactions occur directly between the verified tenant and property owner.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              2. Tenant Identity & Aadhaar e-KYC
            </h2>
            <p>
              To safeguard the security of all residents in shared accommodations, all tenants must complete digital identity verification via UIDAI Aadhaar or passport before physical move-in. Failure to complete KYC constitutes grounds for booking cancellation.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              3. Security Deposit Protection & 24-Hour Guarantee
            </h2>
            <p>
              Security deposits paid via DirectPG are held under transparent escrow protocols. Tenants are entitled to a 100% full refund within 24 hours of scheduled move-in if the physical property does not conform to the amenities, room plan, or hygiene standards displayed on the platform.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              4. Biometric Access & Property Security
            </h2>
            <p>
              Biometric access credentials, smart lock PINs, and building digital passes issued via DirectPG are non-transferable and strictly reserved for registered co-tenants. Sub-leasing or transferring room passes to unauthorized third parties is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              5. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of tenancy agreements shall be subject to the exclusive jurisdiction of the competent courts in Bangalore, Karnataka.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

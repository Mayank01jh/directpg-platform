import Link from "next/link";
import { IconShieldCheck } from "@/components/ui/Icons";

export const metadata = {
  title: "Privacy Policy - DirectPG Store",
  description: "DirectPG privacy guidelines and DPDP compliance regarding tenant identity protection.",
};

export default function PrivacyPage() {
  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="app-container" style={{ maxWidth: "800px" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#007AFF", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Data Protection
          </span>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.4rem", marginBottom: "0.5rem" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            Compliant with the Digital Personal Data Protection (DPDP) Act 2023 • Updated Oct 2026
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
              1. Information We Collect
            </h2>
            <p>
              When you browse, schedule visits, or book stays on DirectPG, we collect information necessary to establish your legal tenancy agreement. This includes your name, email, phone number, and masked government photo ID (Aadhaar/Passport). We never store raw biometric identifiers or full unmasked Aadhaar numbers on our public application servers.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              2. How Your Data is Used
            </h2>
            <p>
              Your contact details and digital pass credentials are used solely to facilitate check-in with your chosen property owner, disburse smart lock access PINs, and generate rent payment invoices. DirectPG enforces a strict zero-spam pledge: we never sell or rent student personal data to third-party marketing brokers or advertisers.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              3. Data Encryption & Security
            </h2>
            <p>
              All communications and financial transactions on DirectPG are secured with end-to-end TLS 1.3 cryptographic protocols. Databases are encrypted at rest using AES-256 standard encryption, with annual third-party cybersecurity audits.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              4. Tenant Data Rights
            </h2>
            <p>
              Under Indian DPDP regulations, you retain full rights to request an export of your personal data, rectify contact information, or request account erasure upon expiration of your active tenancy lease by emailing privacy@directpg.in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

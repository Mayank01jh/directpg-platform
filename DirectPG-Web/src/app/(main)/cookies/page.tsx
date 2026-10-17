import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheckIcon, CheckCircleIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Cookie Policy | DirectPG Transparent Data Practices",
  description:
    "Review DirectPG's cookie policy and breakdown of essential, analytical, and preference cookies used to deliver zero-brokerage accommodation services.",
  alternates: {
    canonical: "/cookies",
  },
};

export default function CookiePolicyPage() {
  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem", fontSize: "0.875rem", color: "#64748B" }}>
          <Link href="/" style={{ color: "#64748B", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <span style={{ color: "#0F172A", fontWeight: 600 }}>Cookie Policy</span>
        </nav>

        {/* Single H1 Tag */}
        <header style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.75rem",
              borderRadius: "9999px",
              backgroundColor: "#F1F5F9",
              color: "#0066FF",
              fontSize: "0.8125rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            <ShieldCheckIcon width={16} height={16} />
            Compliance & Transparency
          </div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", margin: "0 0 0.75rem 0" }}>
            Cookie Policy
          </h1>
          <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
            Last updated: October 2026. This policy explains how DirectPG Technologies Pvt. Ltd. uses cookies and local storage tokens to deliver a secure, fast, and zero-brokerage booking experience.
          </p>
        </header>

        {/* Section 1: What Are Cookies */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.75rem" }}>
            1. What Are Cookies and Why We Use Them
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
            Cookies are compact data files placed on your computer or mobile device when you visit our web application. They are essential for recognizing authenticated sessions, preventing Cross-Site Request Forgery (CSRF), and retaining your accommodation filters across browsing sessions.
          </p>
        </section>

        {/* Section 2: Itemized Cookie Classification Table */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: "1rem" }}>
            2. Itemized Cookie Classification
          </h2>
          <div style={{ border: "1px solid #E2E8F0", borderRadius: "12px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.875rem" }}>
              <thead style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                <tr>
                  <th style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#0F172A" }}>Cookie Name</th>
                  <th style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#0F172A" }}>Category</th>
                  <th style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#0F172A" }}>Purpose</th>
                  <th style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#0F172A" }}>Duration</th>
                </tr>
              </thead>
              <tbody style={{ color: "#475569" }}>
                <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#0F172A" }}>dpg_access_token</td>
                  <td style={{ padding: "0.75rem 1rem" }}><span style={{ backgroundColor: "#EEF2FF", color: "#0066FF", padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 600 }}>Strictly Necessary</span></td>
                  <td style={{ padding: "0.75rem 1rem" }}>Encrypted JWT session token for authenticated tenant & owner requests.</td>
                  <td style={{ padding: "0.75rem 1rem" }}>7 Days</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#0F172A" }}>dpg_cookie_consent</td>
                  <td style={{ padding: "0.75rem 1rem" }}><span style={{ backgroundColor: "#EEF2FF", color: "#0066FF", padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 600 }}>Strictly Necessary</span></td>
                  <td style={{ padding: "0.75rem 1rem" }}>Remembers your cookie banner preferences and opt-in choices.</td>
                  <td style={{ padding: "0.75rem 1rem" }}>1 Year</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#0F172A" }}>dpg_search_filters</td>
                  <td style={{ padding: "0.75rem 1rem" }}><span style={{ backgroundColor: "#F1F5F9", color: "#475569", padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 600 }}>Preferences</span></td>
                  <td style={{ padding: "0.75rem 1rem" }}>Preserves your selected city, budget slider, and gender filters.</td>
                  <td style={{ padding: "0.75rem 1rem" }}>30 Days</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#0F172A" }}>_ga / _gid</td>
                  <td style={{ padding: "0.75rem 1rem" }}><span style={{ backgroundColor: "#F1F5F9", color: "#475569", padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 600 }}>Analytical</span></td>
                  <td style={{ padding: "0.75rem 1rem" }}>Anonymized Core Web Vitals and page latency analytics.</td>
                  <td style={{ padding: "0.75rem 1rem" }}>Optional</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: How to Manage and Revoke */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.75rem" }}>
            3. How to Manage and Revoke Consent
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "#475569", lineHeight: 1.7, margin: "0 0 1rem 0" }}>
            You may change your preferences at any time by clearing your browser cache or modifying the cookie consent prompt. Strictly necessary security tokens cannot be disabled as they are required for account security and payment processing.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link
              href="/privacy"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                backgroundColor: "#0066FF",
                color: "#FFFFFF",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              View Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                backgroundColor: "#F8FAFC",
                color: "#0F172A",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              Terms & Conditions
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheckIcon, CheckCircleIcon, ArrowRightIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | DirectPG 100% Assurance",
  description:
    "DirectPG 100% money-back guarantee, refund timelines, room cancellation eligibility, and zero-hidden fee policy.",
  alternates: {
    canonical: "/refund",
  },
};

export default function RefundPolicyPage() {
  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem", fontSize: "0.875rem", color: "#64748B" }}>
          <Link href="/" style={{ color: "#64748B", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <span style={{ color: "#0F172A", fontWeight: 600 }}>Refund Policy</span>
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
            DirectPG 100% Guarantee
          </div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", margin: "0 0 0.75rem 0" }}>
            Refund & Cancellation Policy
          </h1>
          <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
            We believe booking a PG should be completely transparent. If your booked room doesn't match the verified listing or your plans change within our guarantee window, your money is protected.
          </p>
        </header>

        {/* Highlight Card: 24-Hour Free Cancellation */}
        <div
          style={{
            backgroundColor: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            padding: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#0F172A", margin: "0 0 0.5rem 0" }}>
            ⚡ 24-Hour Free Cancellation Guarantee
          </h2>
          <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
            Every token amount paid through DirectPG is eligible for a <strong>100% full refund</strong> within 24 hours of booking, no questions asked, as long as check-in has not occurred.
          </p>
        </div>

        {/* Cancellation Tiers */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: "1rem" }}>
            1. Cancellation Windows & Refund Tiers
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1rem",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
              }}
            >
              <div style={{ color: "#0066FF", flexShrink: 0, marginTop: "2px" }}>
                <CheckCircleIcon width={20} height={20} />
              </div>
              <div>
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#0F172A", margin: "0 0 0.25rem 0" }}>
                  Within 24 Hours of Booking: 100% Full Refund
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#64748B", margin: 0 }}>
                  Immediate cancellation through your tenant dashboard. 100% token fee refunded to your original payment method.
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1rem",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
              }}
            >
              <div style={{ color: "#0066FF", flexShrink: 0, marginTop: "2px" }}>
                <CheckCircleIcon width={20} height={20} />
              </div>
              <div>
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#0F172A", margin: "0 0 0.25rem 0" }}>
                  More than 7 Days Before Check-in: 80% Token Refund
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#64748B", margin: 0 }}>
                  A nominal 20% owner holding fee is deducted; the remaining 80% is refunded within 3-5 business days.
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1rem",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
              }}
            >
              <div style={{ color: "#D90429", flexShrink: 0, marginTop: "2px" }}>
                <CheckCircleIcon width={20} height={20} />
              </div>
              <div>
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#0F172A", margin: "0 0 0.25rem 0" }}>
                  Listing Discrepancy on Check-in: 100% Instant Refund + Relocation Support
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#64748B", margin: 0 }}>
                  If the room amenities, hygiene, or rules materially differ from the verified listing, our audit team initiates an immediate 100% refund and assists you in rebooking a verified alternative PG.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Non-Refundable Items */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.75rem" }}>
            2. Non-Refundable Exceptions
          </h2>
          <ul style={{ fontSize: "0.9375rem", color: "#475569", lineHeight: 1.7, paddingLeft: "1.25rem", margin: 0 }}>
            <li>No-shows past 48 hours from scheduled check-in date without prior written communication.</li>
            <li>Voluntary checkout prior to the agreed minimum lock-in period defined in the owner contract.</li>
            <li>Deductions for property damages agreed upon during mutual checkout inspection.</li>
          </ul>
        </section>

        {/* Section 3: Processing Time */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.75rem" }}>
            3. Refund Settlement Timelines
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "#475569", lineHeight: 1.7, margin: "0 0 1rem 0" }}>
            Approved refunds are credited directly to your original payment source (UPI, Debit/Credit Card, or Net Banking) within <strong>3 to 5 banking business days</strong>.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link
              href="/support"
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
              Contact Support Desk
            </Link>
            <Link
              href="/guarantee"
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
              DirectPG Guarantee
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

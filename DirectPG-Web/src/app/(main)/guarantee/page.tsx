import Link from "next/link";
import {
  IconShieldCheck,
  IconRupee,
  IconCheck,
  IconArrowRight,
  IconBuilding,
} from "@/components/ui/Icons";

export const metadata = {
  title: "Zero Brokerage Guarantee - DirectPG Store",
  description: "DirectPG guarantees 0% brokerage on all bookings, plus 100% money-back check-in protection.",
};

export default function GuaranteePage() {
  const guaranteePoints = [
    {
      title: "Zero Brokerage Pledge",
      desc: "DirectPG will never charge you a brokerage fee, finder fee, or transaction commission. You pay only the rent and refundable security deposit agreed with the owner.",
    },
    {
      title: "24-Hour Move-In Protection",
      desc: "If you arrive at the property and it does not match the photos, room type, or stated amenities on DirectPG, we will refund your deposit immediately or relocate you to an equivalent verified stay free of cost.",
    },
    {
      title: "Direct Owner Settlement",
      desc: "Your money does not sit with unregistered third parties. Payments are directly routed to the verified bank account of the property owner via transparent bank UTR rails.",
    },
    {
      title: "Legally Binding 11-Month Lease",
      desc: "Every digital booking generates an enforceable electronic lease agreement outlining exact lock-in periods, notice periods, and deposit return guarantees.",
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
            background: "#E8F8EE",
            color: "#34C759",
            fontSize: "0.8rem",
            fontWeight: 700,
            marginBottom: "1rem",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}>
            <IconCheck size={14} color="#34C759" strokeWidth={3} /> Verified Guarantee
          </span>

          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1rem" }}>
            The DirectPG Zero Brokerage Guarantee
          </h1>

          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "680px", margin: "0 auto" }}>
            Rent with complete peace of mind. We protect both tenants and landlords with transparent, zero-commission co-living contracts.
          </p>
        </div>

        {/* Guarantees List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3.5rem" }}>
          {guaranteePoints.map((g, idx) => (
            <div
              key={g.title}
              className="ios-card"
              style={{
                background: "var(--bg-card)",
                borderRadius: "20px",
                padding: "1.75rem 2rem",
                border: "1px solid var(--border-color)",
                display: "flex",
                alignItems: "flex-start",
                gap: "1.25rem",
              }}
            >
              <div style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "#E8F8EE",
                color: "#34C759",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: "0.2rem",
              }}>
                <IconCheck size={18} color="#34C759" strokeWidth={3} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                  {idx + 1}. {g.title}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {g.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          textAlign: "center",
          padding: "2.5rem",
          borderRadius: "24px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
        }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            Ready to find your verified PG?
          </h2>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Browse curated listings in Bangalore, Mumbai, Delhi NCR, Hyderabad, and Pune.
          </p>
          <Link
            href="/listings"
            className="ios-pill-btn ios-pill-btn-solid"
            style={{ padding: "0.75rem 2rem", fontSize: "0.92rem", fontWeight: 700 }}
          >
            Browse Verified PGs ›
          </Link>
        </div>
      </div>
    </div>
  );
}

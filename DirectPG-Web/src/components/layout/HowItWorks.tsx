"use client";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { IconCheck, IconSparkles } from "@/components/ui/Icons";

interface StepItem {
  num: string;
  category: string;
  title: string;
  desc: string;
  highlight: string;
  gradient: string;
  iconBg: string;
  iconSvg: React.ReactNode;
}

export default function HowItWorks() {
  const steps: StepItem[] = [
    {
      num: "01",
      category: "VERIFIED DISCOVERY",
      title: "Explore & Virtual Tour",
      desc: "Browse 50,000+ verified PGs with high-res photos, 360° room walkthroughs, verified amenities, and college proximity filters.",
      highlight: "100% Physically Audited",
      gradient: "rgba(0, 122, 255, 0.15)",
      iconBg: "var(--bg-tertiary)",
      iconSvg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      num: "02",
      category: "ZERO PRESSURE",
      title: "Schedule Direct Visit",
      desc: "Pick your preferred time slot for a live video call or an in-person walkthrough. Connect directly with the PG owner with no brokers.",
      highlight: "Zero Broker Interference",
      gradient: "rgba(0, 122, 255, 0.15)",
      iconBg: "var(--bg-tertiary)",
      iconSvg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      num: "03",
      category: "DIGITAL CONTRACT",
      title: "0% Brokerage Booking",
      desc: "Complete Aadhaar e-KYC in under 2 minutes, sign a legal digital rent agreement, and pay securely via UPI, Card, or NetBanking.",
      highlight: "Save up to ₹15,000 Fees",
      gradient: "rgba(0, 122, 255, 0.15)",
      iconBg: "var(--bg-tertiary)",
      iconSvg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      num: "04",
      category: "SECURE MOVE-IN",
      title: "Keyless Move-In Day",
      desc: "Receive your digital door code, confirmed room inventory report, active chef-prepared meal pass, and 24/7 tenant helpline.",
      highlight: "Full Deposit Protection",
      gradient: "rgba(0, 122, 255, 0.15)",
      iconBg: "var(--bg-tertiary)",
      iconSvg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" style={{ padding: "2.5rem 0 2rem" }}>
      <div className="app-container">
        {/* Apple Style Section Header */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "1.6rem",
          padding: "0 0.2rem",
        }}>
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "#007AFF",
              textTransform: "uppercase",
              marginBottom: "0.3rem",
            }}>
              <IconSparkles size={14} color="#007AFF" /> ESSENTIAL GUIDE
            </div>
            <h2 style={{
              fontSize: "clamp(1.5rem, 3.2vw, 2.1rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              lineHeight: 1.15,
            }}>
              How DirectPG Works
            </h2>
          </div>

          <Link
            href={ROUTES.ABOUT}
            style={{
              fontSize: "0.86rem",
              fontWeight: 700,
              color: "#007AFF",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              padding: "0.45rem 0.9rem",
              borderRadius: "var(--radius-pill)",
              background: "var(--apple-blue-light)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
          >
            Learn More ›
          </Link>
        </div>

        {/* 4 Connected Feature Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.25rem",
        }}>
          {steps.map((s) => (
            <div
              key={s.num}
              style={{
                borderRadius: "22px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                boxShadow: "0 6px 24px rgba(0, 0, 0, 0.06)",
                padding: "1.75rem 1.4rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 18px 36px rgba(0, 0, 0, 0.14)";
                e.currentTarget.style.borderColor = "rgba(0, 122, 255, 0.35)";
                const glow = e.currentTarget.querySelector(".step-glow") as HTMLElement;
                if (glow) glow.style.opacity = "0.2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(0, 0, 0, 0.06)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                const glow = e.currentTarget.querySelector(".step-glow") as HTMLElement;
                if (glow) glow.style.opacity = "0.08";
              }}
            >
              {/* Colored Corner Ambient Glow */}
              <div
                className="step-glow"
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-40px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: s.gradient,
                  filter: "blur(40px)",
                  opacity: 0.08,
                  pointerEvents: "none",
                  transition: "opacity 0.3s ease",
                }}
              />

              <div>
                {/* Top Row: Icon + Step Badge */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.25rem",
                }}>
                  {/* Styled Icon Squircle */}
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: "14px",
                    background: s.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--border-color)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}>
                    {s.iconSvg}
                  </div>

                  {/* Gradient Step Pill */}
                  <span style={{
                    padding: "0.28rem 0.75rem",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    color: "var(--text-secondary)",
                  }}>
                    STEP {s.num}
                  </span>
                </div>

                {/* Eyebrow Category */}
                <div style={{
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  marginBottom: "0.35rem",
                }}>
                  {s.category}
                </div>

                {/* Step Title */}
                <h3 style={{
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                  lineHeight: 1.25,
                  marginBottom: "0.65rem",
                }}>
                  {s.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: "0.84rem",
                  color: "var(--text-caption)",
                  lineHeight: 1.6,
                  marginBottom: "1.25rem",
                }}>
                  {s.desc}
                </p>
              </div>

              {/* Bottom Feature Highlight Pill */}
              <div style={{
                paddingTop: "0.85rem",
                borderTop: "1px solid var(--border-color)",
              }}>
                <span style={{
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  color: "#34C759",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}>
                  <IconCheck size={13} color="#34C759" />
                  {s.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="ios-divider" />
      </div>
    </section>
  );
}
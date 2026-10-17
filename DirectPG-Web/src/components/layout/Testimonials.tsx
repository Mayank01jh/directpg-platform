"use client";
import { useState } from "react";
import { IconStar } from "@/components/ui/Icons";

interface Review {
  id: string;
  title: string;
  author: string;
  role: string;
  city: string;
  rating: number;
  date: string;
  text: string;
  helpfulCount: number;
}

const APP_STORE_REVIEWS: Review[] = [
  {
    id: "rev-1",
    title: "Saved ₹16,000 on broker fees. Unbeatable experience!",
    author: "Priya Sharma",
    role: "Software Engineer",
    city: "Koramangala, Bangalore",
    rating: 5,
    date: "October 12, 2026",
    text: "Moving to Bangalore as a woman can be nerve-wracking. DirectPG let me video tour the room, talk directly with the lady warden, and lock in the bed with biometric security. 10/10 recommendation for working professionals!",
    helpfulCount: 38,
  },
  {
    id: "rev-2",
    title: "The App Store experience applied to real estate.",
    author: "Rahul Mehta",
    role: "IIM Bangalore Student",
    city: "HSR Layout, Bangalore",
    rating: 5,
    date: "October 5, 2026",
    text: "The interface is buttery smooth. The price shown is literally the exact rent you pay with zero hidden move-in fees or surprise maintenance charges. Food is hygienic and WiFi speed exceeds 200 Mbps.",
    helpfulCount: 24,
  },
  {
    id: "rev-3",
    title: "Instant digital agreement and zero hassle move-in.",
    author: "Ananya Deshmukh",
    role: "Product Designer",
    city: "Bandra West, Mumbai",
    rating: 5,
    date: "September 28, 2026",
    text: "Found a quiet single room with private balcony in Bandra within 48 hours. The owner verified my KYC on the app, and I got my keys via digital lock code. No paperwork, no awkward broker negotiations.",
    helpfulCount: 19,
  },
];

export default function Testimonials() {
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});

  const handleVote = (id: string, initialCount: number) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: (prev[id] || initialCount) + 1,
    }));
  };

  return (
    <section style={{ padding: "1.5rem 0 1rem" }}>
      <div className="app-container">
        {/* App Store Section Header */}
        <div className="ios-title-bar">
          <div className="ios-title-group">
            <span className="ios-section-eyebrow">CUSTOMER SATISFACTION</span>
            <h2 className="ios-section-heading">Ratings & Reviews</h2>
          </div>
          <span style={{
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            fontWeight: 600,
          }}>
            48,200+ Verified Ratings
          </span>
        </div>

        {/* Apple Style Rating Summary Header Card */}
        <div className="ios-card" style={{
          padding: "1.5rem 1.75rem",
          marginBottom: "1.5rem",
          borderRadius: "var(--radius-xl)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}>
          {/* Big Score */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
            <span style={{
              fontSize: "clamp(3rem, 6vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "var(--text-primary)",
            }}>
              4.9
            </span>
            <div>
              <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <IconStar key={i} size={16} color="#FF9500" />
                ))}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 600, marginTop: "0.25rem" }}>
                out of 5 stars
              </div>
            </div>
          </div>

          {/* 5-Star Distribution Bars (App Store signature look) */}
          <div style={{ flex: "1 1 260px", maxWidth: "340px" }}>
            {[
              { star: 5, pct: 92 },
              { star: 4, pct: 6 },
              { star: 3, pct: 1 },
              { star: 2, pct: 0.5 },
              { star: 1, pct: 0.5 },
            ].map((row) => (
              <div
                key={row.star}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  fontSize: "0.72rem",
                  color: "var(--text-secondary)",
                  margin: "0.2rem 0",
                }}
              >
                <span style={{ width: "24px", display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: "2px" }}>
                  {row.star} <IconStar size={10} color="#FF9500" />
                </span>
                <div style={{
                  flex: 1,
                  height: "5px",
                  borderRadius: "999px",
                  background: "var(--bg-tertiary)",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: `${row.pct}%`,
                    height: "100%",
                    background: "var(--text-secondary)",
                    borderRadius: "999px",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Review Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
          gap: "1.15rem",
        }}>
          {APP_STORE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="ios-card"
              style={{
                padding: "1.4rem",
                borderRadius: "var(--radius-xl)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {/* Review Header: Title & Date */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.4rem",
                }}>
                  <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <IconStar key={i} size={13} color="#FF9500" />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                    {rev.date}
                  </span>
                </div>

                <h4 style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.5rem",
                  lineHeight: 1.35,
                }}>
                  {rev.title}
                </h4>

                <p style={{
                  fontSize: "0.83rem",
                  color: "var(--text-caption)",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                }}>
                  "{rev.text}"
                </p>
              </div>

              {/* Author & Helpful Button */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--border-color)",
              }}>
                <div>
                  <div style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}>
                    {rev.author}
                  </div>
                  <div style={{
                    fontSize: "0.7rem",
                    color: "var(--text-secondary)",
                  }}>
                    Verified Tenant • {rev.city}
                  </div>
                </div>

                {/* Helpful Pill Button */}
                <button
                  type="button"
                  onClick={() => handleVote(rev.id, rev.helpfulCount)}
                  className="ios-pill-btn"
                  style={{
                    fontSize: "0.72rem",
                    padding: "0.25rem 0.65rem",
                  }}
                >
                  Helpful ({helpfulVotes[rev.id] || rev.helpfulCount})
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* iOS Divider */}
        <div className="ios-divider" />
      </div>
    </section>
  );
}
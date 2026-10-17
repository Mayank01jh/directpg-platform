"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants";

interface BannerItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  badgeColor: string;
  link: string;
  accent: string;
}

const FEATURED_BANNERS: BannerItem[] = [
  {
    id: "banner-1",
    category: "EDITORIAL PICK",
    title: "Modern Student Living in Bangalore",
    subtitle: "High-speed Wi-Fi, chef-curated meals & steps from top colleges in Koramangala & HSR Layout.",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=600&fit=crop",
    badge: "TOP RATED 4.9",
    badgeColor: "var(--apple-blue)",
    link: ROUTES.LISTINGS,
    accent: "rgba(0, 122, 255, 0.85)",
  },
  {
    id: "banner-2",
    category: "EXCLUSIVE ADVANTAGE",
    title: "Direct Owner Connect: 0% Brokerage",
    subtitle: "Save up to ₹15,000 on middlemen fees. Digital agreements, instant verified bookings.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=600&fit=crop",
    badge: "ZERO BROKERAGE",
    badgeColor: "var(--apple-blue)",
    link: ROUTES.LISTINGS,
    accent: "rgba(0, 122, 255, 0.85)",
  },
  {
    id: "banner-3",
    category: "CO-LIVING REVOLUTION",
    title: "Tech Park Hubs: Mumbai & Hyderabad",
    subtitle: "Work-from-home ready desks, rooftop lounges, community gym and weekly housekeeping.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",
    badge: "TECH HUBS",
    badgeColor: "var(--apple-blue)",
    link: ROUTES.LISTINGS,
    accent: "rgba(0, 122, 255, 0.85)",
  },
  {
    id: "banner-4",
    category: "SAFETY & COMFORT",
    title: "Curated Stays for Women Professionals",
    subtitle: "Biometric entry, 24/7 CCTV, CCTV-monitored premises & verified on-site wardens.",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200&h=600&fit=crop",
    badge: "SAFETY VERIFIED",
    badgeColor: "var(--apple-blue)",
    link: ROUTES.LISTINGS,
    accent: "rgba(0, 122, 255, 0.85)",
  },
];

export default function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollByDirection = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const total = scrollWidth - clientWidth;
    if (total > 0) {
      setScrollProgress(scrollLeft / total);
    }
  };

  return (
    <section style={{
      padding: "1.5rem 0 1rem",
      position: "relative",
    }}>
      <div className="app-container">
        {/* App Store Top Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.85rem",
          padding: "0 0.25rem",
        }}>
          <div>
            <span className="ios-section-eyebrow">
              APP STORE SPOTLIGHT
            </span>
            <h1 className="ios-section-heading" style={{ marginTop: "0.15rem" }}>
              Featured Stays & Collections
            </h1>
          </div>

          {/* iOS Scroll Assist Arrows */}
          <div style={{ display: "flex", gap: "0.4rem" }}>
            <button
              onClick={() => scrollByDirection("left")}
              aria-label="Previous Banner"
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "var(--shadow-subtle)",
                transition: "all 0.15s ease",
              }}
            >
              ‹
            </button>
            <button
              onClick={() => scrollByDirection("right")}
              aria-label="Next Banner"
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "var(--shadow-subtle)",
                transition: "all 0.15s ease",
              }}
            >
              ›
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Banners Container (George Lim top-banner port style) */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="ios-hscroll"
          style={{
            gap: "1.25rem",
            paddingBottom: "0.5rem",
          }}
        >
          {FEATURED_BANNERS.map((banner) => (
            <div
              key={banner.id}
              className="ios-scroll-item"
              style={{
                width: "clamp(320px, 75vw, 680px)",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                position: "relative",
                height: "360px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-card)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                transition: "transform 0.25s var(--ease-apple), box-shadow 0.25s var(--ease-apple)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "var(--shadow-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-card)";
              }}
            >
              {/* Background Cover Image */}
              <img
                src={banner.image}
                alt={banner.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Gradient Overlay for Text Legibility */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)",
              }} />

              {/* Top Badge */}
              <div style={{
                position: "absolute",
                top: 18,
                left: 18,
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
              }}>
                <span style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-pill)",
                  background: "rgba(255, 255, 255, 0.92)",
                  color: "#1C1C1E",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}>
                  {banner.badge}
                </span>
              </div>

              {/* Editorial Card Bottom Details */}
              <div style={{
                position: "relative",
                zIndex: 2,
                padding: "1.75rem",
                color: "#FFFFFF",
              }}>
                <span style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  color: "rgba(255, 255, 255, 0.8)",
                  display: "block",
                  marginBottom: "0.3rem",
                }}>
                  {banner.category}
                </span>

                <h2 style={{
                  fontSize: "clamp(1.3rem, 2.8vw, 1.85rem)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: "0.45rem",
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                }}>
                  {banner.title}
                </h2>

                <p style={{
                  fontSize: "0.88rem",
                  color: "rgba(255, 255, 255, 0.82)",
                  lineHeight: 1.4,
                  marginBottom: "1.1rem",
                  maxWidth: "520px",
                }}>
                  {banner.subtitle}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Link
                    href={banner.link}
                    className="ios-pill-btn ios-pill-btn-solid"
                    style={{
                      background: "#FFFFFF",
                      color: "#007AFF",
                      fontWeight: 800,
                      padding: "0.5rem 1.4rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    EXPLORE NOW
                  </Link>

                  <span style={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.75)",
                  }}>
                    Zero Deposit Options Available
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
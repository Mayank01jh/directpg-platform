"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES, INDIAN_CITIES } from "@/constants";
import {
  IconCheck,
  IconShieldCheck,
  IconSearch,
  IconMapPin,
  IconStar,
  IconSparkles,
} from "@/components/ui/Icons";

export default function AlignedGridSection() {
  const router = useRouter();
  const [searchCity, setSearchCity] = useState("");
  const [searchGender, setSearchGender] = useState("all");
  const [searchBudget, setSearchBudget] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCity) params.set("city", searchCity);
    if (searchGender !== "all") params.set("gender", searchGender);
    if (searchBudget) params.set("maxPrice", searchBudget);
    router.push(`/search?${params.toString()}`);
  };

  const topThreeSpotlights = [
    {
      id: "spot-1",
      title: "0% Brokerage Guarantee",
      subtitle: "DIRECT OWNER CONNECT",
      desc: "Connect directly with verified property owners. Save up to ₹15,000 in broker commissions with transparent monthly rents.",
      tagLeft: "ZERO BROKERAGE",
      tagRight: "SAVE ₹15,000",
      accent: "#0066FF",
      badgeColor: "#0066FF",
      type: "brokerage",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
      cta: "EXPLORE DIRECT ›",
      link: ROUTES.LISTINGS,
    },
    {
      id: "spot-2",
      title: "Physical 42-Point Audit",
      subtitle: "VERIFIED & AUDITED",
      desc: "Every listing is inspected on-ground for biometric smart locks, hygienic kitchens, water supply, and high-speed Wi-Fi.",
      tagLeft: "PHYSICAL AUDIT",
      tagRight: "100% AUDITED",
      accent: "#D90429",
      badgeColor: "#D90429",
      type: "audit",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      cta: "AUDIT REPORT ›",
      link: ROUTES.ABOUT,
    },
    {
      id: "spot-3",
      title: "Deposit Protection Pass",
      subtitle: "SAFE MOVE-IN SHIELD",
      desc: "Digital e-agreements signed in 2 minutes. Instant Aadhaar e-KYC and 100% refundable security deposit protection.",
      tagLeft: "ESCROW SHIELD",
      tagRight: "FULL PROTECTION",
      accent: "#0F172A",
      badgeColor: "#0F172A",
      type: "deposit",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
      cta: "PROTECTION PASS ›",
      link: ROUTES.LISTINGS,
    },
  ];

  const topThreeRanked = [
    {
      rank: 1,
      id: "tc-1",
      name: "Stanza Living Rome House",
      location: "Koramangala 4th Block, Bangalore",
      category: "Co-Living • Unisex",
      rating: 4.95,
      price: "₹10,500",
      tag: "Top Choice",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=200&h=200&fit=crop",
    },
    {
      rank: 2,
      id: "tc-2",
      name: "Zolo Talisman Residency",
      location: "HSR Layout Sector 2, Bangalore",
      category: "Students • Boys Only",
      rating: 4.91,
      price: "₹7,200",
      tag: "Trending",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=200&h=200&fit=crop",
    },
    {
      rank: 3,
      id: "tc-3",
      name: "Isthara Silver Crest Suites",
      location: "Gachibowli IT Hub, Hyderabad",
      category: "Working Women • Girls Only",
      rating: 4.88,
      price: "₹8,500",
      tag: "Biometric",
      image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=200&h=200&fit=crop",
    },
  ];

  const sixCities = [
    {
      name: "Bangalore",
      state: "Karnataka",
      count: "14.8k PGs",
      price: "From ₹6.5k",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&h=600&fit=crop",
    },
    {
      name: "Mumbai",
      state: "Maharashtra",
      count: "10.2k PGs",
      price: "From ₹9.0k",
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=600&fit=crop",
    },
    {
      name: "Delhi NCR",
      state: "Delhi & Noida",
      count: "12.9k PGs",
      price: "From ₹5.8k",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=600&fit=crop",
    },
    {
      name: "Hyderabad",
      state: "Telangana",
      count: "8.5k PGs",
      price: "From ₹6.0k",
      image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&h=600&fit=crop",
    },
    {
      name: "Pune",
      state: "Maharashtra",
      count: "9.1k PGs",
      price: "From ₹5.5k",
      image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=400&h=600&fit=crop",
    },
    {
      name: "Chennai",
      state: "Tamil Nadu",
      count: "6.4k PGs",
      price: "From ₹5.8k",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=600&fit=crop",
    },
  ];

  return (
    <section style={{ padding: "2rem 0" }}>
      {/* Outer Container with Unified Flush Left & Right Boundaries */}
      <div className="app-container" style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>

        {/* ═══════════════════════════════════════════════════════════════
            ROW 1: 3 EQUAL BLOCKS [ 1 ] [ 2 ] [ 3 ]
            ═══════════════════════════════════════════════════════════════ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
          gap: "1.25rem",
          width: "100%",
        }}>
          {topThreeSpotlights.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="ios-card"
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                position: "relative",
                height: "360px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1.5rem",
                textDecoration: "none",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.07)",
                transition: "all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 20px 45px rgba(0, 0, 0, 0.18)";
                e.currentTarget.style.borderColor = item.accent;
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1.08)";
                const cta = e.currentTarget.querySelector(".spotlight-cta") as HTMLElement;
                if (cta) cta.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.07)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1)";
                const cta = e.currentTarget.querySelector(".spotlight-cta") as HTMLElement;
                if (cta) cta.style.transform = "scale(1)";
              }}
            >
              {/* Photo Background */}
              <img
                src={item.image}
                alt={item.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
              />

              {/* Multi-Stop Cinematic Gradient Mask */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(10,12,16,0.96) 0%, rgba(10,12,16,0.72) 48%, rgba(10,12,16,0.28) 100%)",
              }} />

              {/* Top Row: Floating Frosted Badges (Z-Index 2) */}
              <div style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <span style={{
                  padding: "0.26rem 0.7rem",
                  borderRadius: "var(--radius-pill)",
                  background: "rgba(255, 255, 255, 0.16)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  color: "#FFFFFF",
                  fontSize: "0.66rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                }}>
                  {item.tagLeft}
                </span>

                <span style={{
                  padding: "0.26rem 0.75rem",
                  borderRadius: "var(--radius-pill)",
                  background: item.badgeColor,
                  color: "#FFFFFF",
                  fontSize: "0.66rem",
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}>
                  {item.tagRight}
                </span>
              </div>

              {/* Center Interactive Value Indicator Graphic */}
              <div style={{ position: "relative", zIndex: 2, margin: "0.75rem 0" }}>
                {item.type === "brokerage" && (
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.4rem 0.85rem",
                    borderRadius: "14px",
                    background: "rgba(0, 0, 0, 0.55)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}>
                    <span style={{ textDecoration: "line-through", color: "#EF4444", fontSize: "0.74rem", fontWeight: 700 }}>
                      Broker: ₹15k
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>→</span>
                    <span style={{ color: "#34C759", fontSize: "0.82rem", fontWeight: 800 }}>
                      DirectPG: ₹0 FREE
                    </span>
                  </div>
                )}

                {item.type === "audit" && (
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}>
                    {["Biometric Lock", "300Mbps WiFi", "Clean Kitchen"].map((tag) => (
                      <span
                        key={tag}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          padding: "0.24rem 0.6rem",
                          borderRadius: "8px",
                          background: "rgba(0, 0, 0, 0.55)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid rgba(255, 255, 255, 0.18)",
                          color: "#FFFFFF",
                          fontSize: "0.68rem",
                          fontWeight: 700,
                        }}
                      >
                        <IconCheck size={12} color="#34C759" /> {tag}
                      </span>
                    ))}
                  </div>
                )}

                {item.type === "deposit" && (
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}>
                    {["Instant e-KYC", "Legal Agreement", "Safe Refund"].map((tag) => (
                      <span
                        key={tag}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          padding: "0.24rem 0.6rem",
                          borderRadius: "8px",
                          background: "rgba(0, 0, 0, 0.55)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid rgba(255, 255, 255, 0.18)",
                          color: "#FFFFFF",
                          fontSize: "0.68rem",
                          fontWeight: 700,
                        }}
                      >
                        <IconShieldCheck size={13} color="#007AFF" /> {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Editorial Content & High-Contrast CTA */}
              <div style={{ position: "relative", zIndex: 2, color: "#FFFFFF" }}>
                <span style={{
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  color: item.accent,
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "0.25rem",
                }}>
                  {item.subtitle}
                </span>

                <h3 style={{
                  fontSize: "1.28rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                  marginBottom: "0.45rem",
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: "0.82rem",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 1.5,
                  marginBottom: "1.1rem",
                }}>
                  {item.desc}
                </p>

                <div
                  className="spotlight-cta"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.48rem 1.25rem",
                    borderRadius: "var(--radius-pill)",
                    background: item.badgeColor,
                    color: "#FFFFFF",
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    letterSpacing: "0.03em",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.cta}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            ROW 2: 1 WIDE FULL-WIDTH BLOCK [ =========================== ]
            ═══════════════════════════════════════════════════════════════ */}
        <div
          className="ios-card"
          style={{
            width: "100%",
            borderRadius: "22px",
            overflow: "hidden",
            position: "relative",
            minHeight: "260px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          {/* Background Image with Cinematic Gradient Mask */}
          <img
            src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1400&h=600&fit=crop"
            alt="DirectPG Stays"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(10,12,16,0.92) 0%, rgba(10,12,16,0.78) 55%, rgba(10,12,16,0.4) 100%)",
          }} />

          {/* Content Layer */}
          <div style={{ position: "relative", zIndex: 2, maxWidth: "680px", color: "#FFFFFF" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "var(--radius-pill)",
                background: "rgba(0, 122, 255, 0.9)",
                color: "#FFFFFF",
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                PAN-INDIA SELECTION
              </span>
              <span style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
                • 50,000+ Verified Rooms
              </span>
            </div>

            <h2 style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              marginBottom: "0.75rem",
              color: "#FFFFFF",
            }}>
              Spaces Designed for Students & Working Professionals
            </h2>

            <p style={{
              fontSize: "0.92rem",
              color: "rgba(255, 255, 255, 0.82)",
              lineHeight: 1.55,
              marginBottom: "1.5rem",
              maxWidth: "560px",
            }}>
              Curated paying guest accommodations steps from tech parks, colleges, and metro lines. Book directly with zero brokerage, chef-prepared meals, and biometric access.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
              <Link
                href={ROUTES.LISTINGS}
                className="ios-pill-btn ios-pill-btn-solid"
                style={{
                  background: "#007AFF",
                  color: "#FFFFFF",
                  padding: "0.6rem 1.6rem",
                  fontSize: "0.88rem",
                  fontWeight: 800,
                }}
              >
                Browse All PGs ›
              </Link>

              <Link
                href="#how-it-works"
                style={{
                  padding: "0.55rem 1.4rem",
                  borderRadius: "var(--radius-pill)",
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  color: "#FFFFFF",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)")}
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            ROW 3: 2 ASYMMETRICAL BLOCKS [ 1/3 ] [  2/3  ]
            ═══════════════════════════════════════════════════════════════ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.25rem",
          width: "100%",
        }}
        className="row-3-split"
        >
          {/* LEFT BLOCK (approx 1/3): Smart Search & Filter */}
          <div
            className="ios-card"
            style={{
              borderRadius: "22px",
              padding: "1.65rem 1.5rem",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              boxShadow: "0 6px 24px rgba(0, 0, 0, 0.06)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
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
                marginBottom: "0.35rem",
              }}>
                <IconSearch size={14} color="#007AFF" /> QUICK FINDER
              </div>
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: "1.15rem",
              }}>
                Find by City & Budget
              </h3>

              <form onSubmit={handleSearch} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {/* City Input */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "0.35rem",
                  }}>
                    City or Area
                  </label>
                  <input
                    list="aligned-cities"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    placeholder="e.g. Bangalore, Mumbai, HSR..."
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "12px",
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                      fontSize: "0.88rem",
                      fontFamily: "inherit",
                      outline: "none",
                    }}
                  />
                  <datalist id="aligned-cities">
                    {INDIAN_CITIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>

                {/* Gender Switcher */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "0.35rem",
                  }}>
                    Stay Preference
                  </label>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "4px",
                    background: "var(--bg-tertiary)",
                    padding: "3px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-color)",
                  }}>
                    {[
                      { key: "all", label: "All" },
                      { key: "female", label: "Girls" },
                      { key: "male", label: "Boys" },
                      { key: "any", label: "Co-Ed" },
                    ].map((g) => (
                      <button
                        key={g.key}
                        type="button"
                        onClick={() => setSearchGender(g.key)}
                        style={{
                          padding: "0.4rem 0",
                          borderRadius: "9px",
                          fontSize: "0.75rem",
                          fontWeight: searchGender === g.key ? 700 : 500,
                          color: searchGender === g.key ? "var(--text-primary)" : "var(--text-secondary)",
                          background: searchGender === g.key ? "var(--bg-card)" : "transparent",
                          boxShadow: searchGender === g.key ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                          transition: "all 0.15s ease",
                          textAlign: "center",
                        }}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Dropdown */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "0.35rem",
                  }}>
                    Monthly Budget
                  </label>
                  <select
                    value={searchBudget}
                    onChange={(e) => setSearchBudget(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "12px",
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                      fontSize: "0.88rem",
                      fontFamily: "inherit",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Any Monthly Budget</option>
                    <option value="6000">Under ₹6,000</option>
                    <option value="10000">Under ₹10,000</option>
                    <option value="15000">Under ₹15,000</option>
                    <option value="25000">Under ₹25,000</option>
                  </select>
                </div>

                {/* Submit Search Button */}
                <button
                  type="submit"
                  className="ios-pill-btn ios-pill-btn-solid"
                  style={{
                    marginTop: "0.35rem",
                    padding: "0.7rem 1.4rem",
                    fontSize: "0.9rem",
                    fontWeight: 800,
                    width: "100%",
                  }}
                >
                  Search Verified PGs
                </button>
              </form>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              fontSize: "0.74rem",
              color: "#34C759",
              fontWeight: 700,
              marginTop: "1.1rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid var(--border-color)",
            }}>
              <IconCheck size={14} color="#34C759" /> Zero Brokerage on all direct bookings
            </div>
          </div>

          {/* RIGHT BLOCK (approx 2/3): Top Ranked Stays */}
          <div
            className="ios-card"
            style={{
              borderRadius: "22px",
              padding: "1.65rem 1.5rem",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              boxShadow: "0 6px 24px rgba(0, 0, 0, 0.06)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}>
                <div>
                  <div style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: "#007AFF",
                    textTransform: "uppercase",
                    marginBottom: "0.2rem",
                  }}>
                    RANKINGS SPOTLIGHT
                  </div>
                  <h3 style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                  }}>
                    Top Rated Stays This Week
                  </h3>
                </div>

                <Link
                  href={ROUTES.LISTINGS}
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#007AFF",
                  }}
                >
                  See All ›
                </Link>
              </div>

              {/* 3 Stacked Ranked Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {topThreeRanked.map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.85rem",
                      padding: "0.75rem",
                      borderRadius: "16px",
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-color)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0, 122, 255, 0.35)";
                      e.currentTarget.style.transform = "translateX(3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-color)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {/* Rank Badge */}
                    <div style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: index === 0 ? "var(--crimson-red)" : "var(--bg-tertiary)",
                      color: index === 0 ? "#FFFFFF" : "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.82rem",
                      fontWeight: 800,
                      flexShrink: 0,
                      boxShadow: index === 0 ? "0 2px 8px rgba(217, 4, 41, 0.3)" : "none",
                      border: index === 0 ? "none" : "1px solid var(--border-color)",
                    }}>
                      {item.rank}
                    </div>

                    {/* Squircle Photo */}
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: "12px",
                      overflow: "hidden",
                      flexShrink: 0,
                      border: "1px solid var(--border-color)",
                    }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Metadata */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        marginBottom: "0.15rem",
                      }}>
                        <h4 style={{
                          fontSize: "0.94rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                          {item.name}
                        </h4>
                      </div>

                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontSize: "0.74rem",
                        color: "var(--text-secondary)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginBottom: "0.15rem",
                      }}>
                        <IconMapPin size={12} color="var(--text-secondary)" />
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{item.location}</span>
                      </div>

                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontSize: "0.72rem",
                      }}>
                        <IconStar size={12} color="#FF9500" />
                        <span style={{ color: "#FF9500", fontWeight: 700 }}>{item.rating}</span>
                        <span style={{ color: "var(--text-muted)" }}>•</span>
                        <span style={{ color: "#007AFF", fontWeight: 600 }}>{item.category}</span>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{
                        fontSize: "1.05rem",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.02em",
                      }}>
                        {item.price}
                      </div>
                      <Link
                        href={`/listings/${item.id}`}
                        className="ios-pill-btn"
                        style={{
                          fontSize: "0.72rem",
                          padding: "0.22rem 0.65rem",
                          marginTop: "0.25rem",
                        }}
                      >
                        VIEW ›
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1.1rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid var(--border-color)",
              fontSize: "0.74rem",
              color: "var(--text-secondary)",
            }}>
              <span>Updated daily based on verified tenant reviews</span>
              <Link href={ROUTES.LISTINGS} style={{ color: "#007AFF", fontWeight: 700 }}>
                View Full Chart (50+) ›
              </Link>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            ROW 4: 6 EQUAL VERTICAL BLOCKS [ 1 ][ 2 ][ 3 ][ 4 ][ 5 ][ 6 ]
            ═══════════════════════════════════════════════════════════════ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1.25rem",
          width: "100%",
        }}
        className="row-4-six-columns"
        >
          {sixCities.map((c) => (
            <Link
              key={c.name}
              href={`/search?city=${encodeURIComponent(c.name)}`}
              className="ios-card"
              style={{
                borderRadius: "18px",
                overflow: "hidden",
                position: "relative",
                height: "210px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "0.9rem",
                textDecoration: "none",
                cursor: "pointer",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                transition: "all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 14px 28px rgba(0, 0, 0, 0.18)";
                e.currentTarget.style.borderColor = "rgba(0, 122, 255, 0.4)";
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1)";
              }}
            >
              {/* Background Photo */}
              <img
                src={c.image}
                alt={c.name}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(10,12,16,0.92) 0%, rgba(10,12,16,0.4) 50%, rgba(10,12,16,0.15) 100%)",
              }} />

              {/* Top Tag */}
              <div style={{ position: "relative", zIndex: 2 }}>
                <span style={{
                  padding: "0.2rem 0.55rem",
                  borderRadius: "var(--radius-pill)",
                  background: "rgba(0, 0, 0, 0.55)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                  fontSize: "0.64rem",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                }}>
                  {c.count}
                </span>
              </div>

              {/* Bottom Info */}
              <div style={{ position: "relative", zIndex: 2, color: "#FFFFFF" }}>
                <div style={{
                  fontSize: "0.64rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.75)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>
                  {c.state}
                </div>
                <h4 style={{
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.15rem",
                  lineHeight: 1.2,
                }}>
                  {c.name}
                </h4>
                <div style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#34C759",
                }}>
                  {c.price}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* Responsive layout styles for 2/3 split and 6 columns */}
      <style jsx>{`
        @media (min-width: 900px) {
          .row-3-split {
            grid-template-columns: 1fr 1.8fr !important;
          }
          .row-4-six-columns {
            grid-template-columns: repeat(6, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

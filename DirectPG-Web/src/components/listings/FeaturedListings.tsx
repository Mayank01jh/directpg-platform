"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants";
import {
  IconSparkles,
  IconHeart,
  IconStar,
  IconCheck,
  IconMapPin,
} from "@/components/ui/Icons";

interface PGListing {
  id: string;
  title: string;
  area: string;
  city: string;
  price: number;
  rating: number;
  reviews: number;
  tag: string;
  tagColor: string;
  gender: "female" | "male" | "any";
  amenities: string[];
  deposit: string;
  image: string;
}

const MOCK_FEATURED_PGS: PGListing[] = [
  {
    id: "1",
    title: "Sunrise Heights Luxury Stay",
    area: "Koramangala 4th Block",
    city: "Bangalore",
    price: 8500,
    rating: 4.9,
    reviews: 142,
    tag: "EDITOR'S CHOICE",
    tagColor: "var(--apple-blue)",
    gender: "female",
    amenities: ["AC", "WiFi", "Chef Meals", "Biometric"],
    deposit: "1 Month Deposit",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=700&h=480&fit=crop",
  },
  {
    id: "2",
    title: "Urban Nest Co-Living Hub",
    area: "Bandra West",
    city: "Mumbai",
    price: 13500,
    rating: 4.8,
    reviews: 98,
    tag: "TRENDING STAY",
    tagColor: "rgba(0, 0, 0, 0.65)",
    gender: "any",
    amenities: ["Gym", "WiFi", "Rooftop Cafe", "CCTV"],
    deposit: "Zero Deposit Option",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700&h=480&fit=crop",
  },
  {
    id: "3",
    title: "Scholar's Haven Campus Residence",
    area: "HSR Sector 2",
    city: "Bangalore",
    price: 6800,
    rating: 4.7,
    reviews: 215,
    tag: "STUDENT FAVORITE",
    tagColor: "rgba(0, 0, 0, 0.65)",
    gender: "male",
    amenities: ["Laundry", "WiFi", "Study Room", "Meals"],
    deposit: "₹5,000 Flat Deposit",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=700&h=480&fit=crop",
  },
  {
    id: "4",
    title: "Horizon Elite Lakeview Suites",
    area: "Powai Silicon Hub",
    city: "Mumbai",
    price: 15500,
    rating: 4.9,
    reviews: 73,
    tag: "TECH PARK SPECIAL",
    tagColor: "rgba(0, 0, 0, 0.65)",
    gender: "any",
    amenities: ["Pool", "High-speed WiFi", "Housekeeping"],
    deposit: "Flexible Lock-in",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&h=480&fit=crop",
  },
  {
    id: "5",
    title: "GreenLeaf Oasis For Women",
    area: "Madhapur IT Corridor",
    city: "Hyderabad",
    price: 7200,
    rating: 4.8,
    reviews: 189,
    tag: "SAFETY VERIFIED",
    tagColor: "rgba(0, 0, 0, 0.65)",
    gender: "female",
    amenities: ["Biometric", "Full Meals", "Power Backup"],
    deposit: "1 Month Deposit",
    image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=700&h=480&fit=crop",
  },
  {
    id: "6",
    title: "Metro Square Executive Residency",
    area: "Sector 62",
    city: "Noida",
    price: 9200,
    rating: 4.7,
    reviews: 114,
    tag: "NEAR METRO",
    tagColor: "rgba(0, 0, 0, 0.65)",
    gender: "male",
    amenities: ["Metro 200m", "AC", "WiFi", "Kitchen"],
    deposit: "Zero Move-in Fee",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&h=480&fit=crop",
  },
];

const genderBadgeConfig = {
  female: { label: "Girls Only", bg: "var(--bg-tertiary)", color: "var(--text-secondary)", border: "var(--border-color)" },
  male: { label: "Boys Only", bg: "var(--bg-tertiary)", color: "var(--text-secondary)", border: "var(--border-color)" },
  any: { label: "Co-Ed Unisex", bg: "var(--bg-tertiary)", color: "var(--text-secondary)", border: "var(--border-color)" },
};

export default function FeaturedListings() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 360;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section style={{ padding: "2.5rem 0 2rem" }}>
      <div className="app-container">
        {/* Apple Style Section Header */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "1.4rem",
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
              <IconSparkles size={14} color="#007AFF" /> CURATED EDITORIAL
            </div>
            <h2 style={{
              fontSize: "clamp(1.5rem, 3.2vw, 2.1rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              lineHeight: 1.15,
            }}>
              Stays We Love
            </h2>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ display: "flex", gap: "0.35rem" }}>
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg-tertiary)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--bg-card)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                ‹
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg-tertiary)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--bg-card)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                ›
              </button>
            </div>

            <Link
              href={ROUTES.LISTINGS}
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
              See All ›
            </Link>
          </div>
        </div>

        {/* Premium Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="ios-hscroll"
          style={{
            gap: "1.35rem",
            padding: "0.5rem 0.2rem 1.5rem",
          }}
        >
          {MOCK_FEATURED_PGS.map((pg) => {
            const genderCfg = genderBadgeConfig[pg.gender];
            const isSaved = !!wishlist[pg.id];

            return (
              <div
                key={pg.id}
                className="ios-scroll-item"
                style={{
                  width: "310px",
                  borderRadius: "22px",
                  overflow: "hidden",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.16)";
                  e.currentTarget.style.borderColor = "rgba(0, 122, 255, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.borderColor = "var(--border-color)";
                }}
              >
                {/* Visual Image Header */}
                <div style={{
                  position: "relative",
                  height: "210px",
                  overflow: "hidden",
                  background: "var(--bg-tertiary)",
                }}>
                  <img
                    src={pg.image}
                    alt={pg.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />

                  {/* Gradient Mask */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)",
                  }} />

                  {/* Top Editorial Ribbon Badge */}
                  <div style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    padding: "0.3rem 0.75rem",
                    borderRadius: "var(--radius-pill)",
                    background: pg.tagColor,
                    color: "#FFFFFF",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                    backdropFilter: "blur(8px)",
                  }}>
                    {pg.tag}
                  </div>

                  {/* Heart / Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(pg.id, e)}
                    aria-label="Save to wishlist"
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: "rgba(0, 0, 0, 0.45)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.12)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <IconHeart size={16} filled={isSaved} color={isSaved ? "var(--crimson-red)" : "#FFFFFF"} />
                  </button>

                  {/* Rating & Verified Pill */}
                  <div style={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    right: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: "0.24rem 0.65rem",
                      borderRadius: "var(--radius-pill)",
                      background: "rgba(255, 255, 255, 0.95)",
                      color: "#1C1C1E",
                      fontSize: "0.74rem",
                      fontWeight: 800,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                    }}>
                      <IconStar size={12} color="#FF9500" />
                      <span>{pg.rating}</span>
                      <span style={{ color: "#8E8E93", fontWeight: 600 }}>({pg.reviews})</span>
                    </div>

                    <div style={{
                      padding: "0.22rem 0.65rem",
                      borderRadius: "var(--radius-pill)",
                      background: "rgba(0, 0, 0, 0.55)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "#FFFFFF",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}>
                      <IconCheck size={12} color="#34C759" strokeWidth={2.6} /> 0% Brokerage
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{
                  padding: "1.25rem 1.15rem 1.15rem",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  justifyContent: "space-between",
                }}>
                  <div>
                    {/* Gender & City Row */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.45rem",
                      marginBottom: "0.45rem",
                    }}>
                      <span style={{
                        padding: "0.2rem 0.55rem",
                        borderRadius: "6px",
                        background: genderCfg.bg,
                        color: genderCfg.color,
                        border: `1px solid ${genderCfg.border}`,
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}>
                        {genderCfg.label}
                      </span>
                      <span style={{
                        fontSize: "0.74rem",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                      }}>
                        • {pg.city}
                      </span>
                    </div>

                    {/* Property Title */}
                    <h3 style={{
                      fontSize: "1.08rem",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.3,
                      marginBottom: "0.35rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {pg.title}
                    </h3>

                    {/* Area Location */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontSize: "0.8rem",
                      color: "var(--text-caption)",
                      marginBottom: "0.85rem",
                    }}>
                      <IconMapPin size={13} color="#007AFF" />
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {pg.area}
                      </span>
                    </div>

                    {/* Amenity Badges */}
                    <div style={{
                      display: "flex",
                      gap: "0.35rem",
                      flexWrap: "wrap",
                      marginBottom: "1.15rem",
                    }}>
                      {pg.amenities.map((a) => (
                        <span
                          key={a}
                          style={{
                            padding: "0.22rem 0.55rem",
                            borderRadius: "8px",
                            background: "var(--bg-tertiary)",
                            color: "var(--text-secondary)",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            border: "1px solid var(--border-color)",
                          }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & High-Contrast View Button */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "0.85rem",
                    borderTop: "1px solid var(--border-color)",
                  }}>
                    <div>
                      <div style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "0.2rem",
                      }}>
                        <span style={{
                          fontSize: "1.25rem",
                          fontWeight: 800,
                          color: "var(--text-primary)",
                          letterSpacing: "-0.03em",
                        }}>
                          ₹{pg.price.toLocaleString()}
                        </span>
                        <span style={{
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          color: "var(--text-secondary)",
                        }}>
                          /mo
                        </span>
                      </div>
                      <span style={{
                        fontSize: "0.68rem",
                        color: "#34C759",
                        fontWeight: 700,
                        display: "block",
                      }}>
                        {pg.deposit}
                      </span>
                    </div>

                    {/* High-Contrast Action Pill */}
                    <Link
                      href={`/listings/${pg.id}`}
                      style={{
                        padding: "0.45rem 1.15rem",
                        borderRadius: "var(--radius-pill)",
                        background: "var(--prism-blue)",
                        color: "#FFFFFF",
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        letterSpacing: "0.03em",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        boxShadow: "0 3px 10px rgba(0, 102, 255, 0.25)",
                        transition: "all 0.2s ease",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 102, 255, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "0 3px 10px rgba(0, 102, 255, 0.25)";
                      }}
                    >
                      VIEW <span>›</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="ios-divider" />
      </div>
    </section>
  );
}
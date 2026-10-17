"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllCombinedProperties, PGProperty } from "@/lib/mockData";
import { getStoredWishlist, toggleStoredWishlist } from "@/lib/userDataStore";
import {
  IconSearch,
  IconStar,
  IconMapPin,
  IconHeart,
  IconCheck,
  IconFilter,
  IconSparkles,
} from "@/components/ui/Icons";

export default function ListingsPage() {
  const [properties, setProperties] = useState<PGProperty[]>([]);
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    setProperties(getAllCombinedProperties());
    setWishlist(getStoredWishlist());

    const handleWishlistUpdate = () => {
      setWishlist(getStoredWishlist());
    };
    window.addEventListener("wishlist-updated", handleWishlistUpdate);
    return () => window.removeEventListener("wishlist-updated", handleWishlistUpdate);
  }, []);

  const handleToggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleStoredWishlist(id);
    setWishlist(updated);
  };

  const filtered = properties.filter((p) => {
    if (selectedCity !== "all" && !p.city.toLowerCase().includes(selectedCity.toLowerCase())) {
      return false;
    }
    if (selectedGender !== "all") {
      if (selectedGender === "female" && p.gender !== "female" && p.gender !== "any") return false;
      if (selectedGender === "male" && p.gender !== "male" && p.gender !== "any") return false;
      if (selectedGender === "any" && p.gender !== "any") return false;
    }
    if (selectedBudget !== "all") {
      if (p.minPrice > selectedBudget) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match = p.title.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.amenities.some((a) => a.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div style={{ padding: "2rem 0 4rem", minHeight: "85vh" }}>
      <div className="app-container">
        {/* Header Bar */}
        <div style={{ marginBottom: "2rem" }}>
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
            <IconSparkles size={14} color="#007AFF" /> 100% DIRECT OWNER VERIFIED
          </div>
          <h1 style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            lineHeight: 1.15,
            marginBottom: "0.5rem",
          }}>
            Browse All Verified PGs & Co-Living
          </h1>
          <p style={{
            fontSize: "0.95rem",
            color: "var(--text-secondary)",
            maxWidth: "680px",
            lineHeight: 1.5,
          }}>
            Zero broker commission. Direct contact with verified property owners. Schedule visits, sign digital agreements, and move in seamlessly.
          </p>
        </div>

        {/* Filter Controls Panel (60:30:10 clean layout) */}
        <div
          className="ios-card"
          style={{
            padding: "1.25rem 1.4rem",
            borderRadius: "20px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* Search Row */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{
              flex: "1 1 280px",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "var(--bg-tertiary)",
              padding: "0.6rem 0.9rem",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
            }}>
              <IconSearch size={18} color="var(--text-secondary)" />
              <input
                type="text"
                placeholder="Search by area, college, tech park or PG name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--text-primary)",
                  fontSize: "0.88rem",
                  width: "100%",
                  fontFamily: "inherit",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* City Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                style={{
                  padding: "0.6rem 0.85rem",
                  borderRadius: "12px",
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  fontFamily: "inherit",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="all">All Cities (India)</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi NCR</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Chennai">Chennai</option>
              </select>

              {/* Gender Selector */}
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                style={{
                  padding: "0.6rem 0.85rem",
                  borderRadius: "12px",
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  fontFamily: "inherit",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="all">All Genders</option>
                <option value="female">Girls Only</option>
                <option value="male">Boys Only</option>
                <option value="any">Co-Ed Unisex</option>
              </select>

              {/* Budget Selector */}
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value === "all" ? "all" : Number(e.target.value))}
                style={{
                  padding: "0.6rem 0.85rem",
                  borderRadius: "12px",
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  fontFamily: "inherit",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="all">Any Monthly Budget</option>
                <option value="6000">Under ₹6,000</option>
                <option value="8000">Under ₹8,000</option>
                <option value="12000">Under ₹12,000</option>
                <option value="16000">Under ₹16,000</option>
              </select>
            </div>
          </div>

          {/* Result Count and Active Filters */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "0.75rem",
            borderTop: "1px solid var(--border-color)",
            fontSize: "0.78rem",
            color: "var(--text-secondary)",
          }}>
            <div style={{ fontWeight: 600 }}>
              Showing <span style={{ color: "var(--text-primary)", fontWeight: 800 }}>{filtered.length}</span> Verified Stays
            </div>
            {(selectedCity !== "all" || selectedGender !== "all" || selectedBudget !== "all" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCity("all");
                  setSelectedGender("all");
                  setSelectedBudget("all");
                  setSearchQuery("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#007AFF",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: "0.78rem",
                }}
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Listings Grid */}
        {filtered.length === 0 ? (
          <div
            className="ios-card"
            style={{
              padding: "4rem 2rem",
              textAlign: "center",
              borderRadius: "20px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            <div style={{
              width: 52,
              height: 52,
              borderRadius: "14px",
              background: "var(--bg-tertiary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
            }}>
              <IconSearch size={24} color="var(--text-secondary)" />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
              No properties matched your criteria
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Try adjusting your city, budget, or gender preferences.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCity("all");
                setSelectedGender("all");
                setSelectedBudget("all");
                setSearchQuery("");
              }}
              className="ios-pill-btn ios-pill-btn-solid"
              style={{
                background: "#007AFF",
                color: "#FFFFFF",
                padding: "0.6rem 1.5rem",
                fontWeight: 700,
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
            gap: "1.5rem",
          }}>
            {filtered.map((property) => {
              const isSaved = wishlist.includes(property.id);

              return (
                <div
                  key={property.id}
                  className="ios-card"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 16px 36px rgba(0, 0, 0, 0.12)";
                    e.currentTarget.style.borderColor = "rgba(0, 122, 255, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
                    e.currentTarget.style.borderColor = "var(--border-color)";
                  }}
                >
                  {/* Photo Header */}
                  <div style={{
                    position: "relative",
                    height: "200px",
                    overflow: "hidden",
                    background: "var(--bg-tertiary)",
                  }}>
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                    }} />

                    {/* Top Tag */}
                    <div style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      padding: "0.24rem 0.7rem",
                      borderRadius: "var(--radius-pill)",
                      background: "rgba(0, 0, 0, 0.65)",
                      backdropFilter: "blur(8px)",
                      color: "#FFFFFF",
                      fontSize: "0.64rem",
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}>
                      {property.gender === "female" ? "GIRLS ONLY" : property.gender === "male" ? "BOYS ONLY" : "CO-ED UNISEX"}
                    </div>

                    {/* Wishlist Heart */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleWishlist(property.id, e)}
                      aria-label="Save to Wishlist"
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: "rgba(0, 0, 0, 0.55)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <IconHeart size={16} filled={isSaved} color={isSaved ? "var(--crimson-red)" : "#FFFFFF"} />
                    </button>

                    {/* Rating & Zero Brokerage Pill */}
                    <div style={{
                      position: "absolute",
                      bottom: 10,
                      left: 12,
                      right: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                      <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        padding: "0.22rem 0.6rem",
                        borderRadius: "var(--radius-pill)",
                        background: "rgba(255, 255, 255, 0.95)",
                        color: "#1C1C1E",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                      }}>
                        <IconStar size={12} color="#FF9500" />
                        <span>{property.rating}</span>
                        <span style={{ color: "#8E8E93", fontWeight: 600 }}>({property.reviewCount})</span>
                      </div>

                      <div style={{
                        padding: "0.2rem 0.6rem",
                        borderRadius: "var(--radius-pill)",
                        background: "rgba(0, 0, 0, 0.65)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "#FFFFFF",
                        fontSize: "0.66rem",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}>
                        <IconCheck size={12} color="#34C759" strokeWidth={2.6} /> 0% Brokerage
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{
                    padding: "1.2rem",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                  }}>
                    <div>
                      {/* Area and City */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontSize: "0.76rem",
                        color: "var(--text-secondary)",
                        marginBottom: "0.3rem",
                      }}>
                        <IconMapPin size={12} color="var(--apple-blue)" />
                        <span style={{ fontWeight: 600 }}>{property.area}, {property.city}</span>
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontSize: "1.05rem",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.3,
                        marginBottom: "0.5rem",
                      }}>
                        {property.title}
                      </h3>

                      {/* Amenities Pills */}
                      <div style={{
                        display: "flex",
                        gap: "0.35rem",
                        flexWrap: "wrap",
                        marginBottom: "1rem",
                      }}>
                        {property.amenities.slice(0, 3).map((a) => (
                          <span
                            key={a}
                            style={{
                              padding: "0.2rem 0.5rem",
                              borderRadius: "6px",
                              background: "var(--bg-tertiary)",
                              color: "var(--text-secondary)",
                              fontSize: "0.68rem",
                              fontWeight: 600,
                              border: "1px solid var(--border-color)",
                            }}
                          >
                            {a}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span style={{
                            padding: "0.2rem 0.4rem",
                            borderRadius: "6px",
                            background: "var(--bg-tertiary)",
                            color: "var(--text-muted)",
                            fontSize: "0.68rem",
                            fontWeight: 600,
                          }}>
                            +{property.amenities.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Pricing & CTA */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid var(--border-color)",
                    }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.2rem" }}>
                          <span style={{
                            fontSize: "1.2rem",
                            fontWeight: 800,
                            color: "var(--text-primary)",
                            letterSpacing: "-0.03em",
                          }}>
                            ₹{property.minPrice.toLocaleString()}
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                            /mo
                          </span>
                        </div>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>
                          {property.depositType}
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link
                        href={`/listings/${property.id}`}
                        style={{
                          padding: "0.45rem 1.1rem",
                          borderRadius: "var(--radius-pill)",
                          background: "var(--prism-blue)",
                          color: "#FFFFFF",
                          fontSize: "0.8rem",
                          fontWeight: 800,
                          letterSpacing: "0.03em",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          boxShadow: "0 3px 10px rgba(0, 102, 255, 0.25)",
                          textDecoration: "none",
                          transition: "all 0.2s ease",
                        }}
                      >
                        VIEW ›
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
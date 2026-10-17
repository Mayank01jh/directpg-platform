"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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

function SearchContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<PGProperty[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Filter states initialized from URL params
  const [query, setQuery] = useState(searchParams.get("q") || searchParams.get("query") || "");
  const [city, setCity] = useState(searchParams.get("city") || "all");
  const [gender, setGender] = useState(searchParams.get("gender") || "all");
  const [budget, setBudget] = useState<number | "all">(
    searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : "all"
  );
  const [specialFilter, setSpecialFilter] = useState(searchParams.get("filter") || "all");
  const [sortBy, setSortBy] = useState<"rating" | "price_asc" | "price_desc">("rating");

  useEffect(() => {
    setProperties(getAllCombinedProperties());
    setWishlist(getStoredWishlist());

    const handleWishlist = () => setWishlist(getStoredWishlist());
    window.addEventListener("wishlist-updated", handleWishlist);
    return () => window.removeEventListener("wishlist-updated", handleWishlist);
  }, []);

  // Update filters if URL params change
  useEffect(() => {
    const qParam = searchParams.get("q") || searchParams.get("query");
    if (qParam !== null) setQuery(qParam);

    const cityParam = searchParams.get("city");
    if (cityParam !== null) setCity(cityParam);

    const genderParam = searchParams.get("gender");
    if (genderParam !== null) setGender(genderParam);

    const priceParam = searchParams.get("maxPrice");
    if (priceParam !== null) setBudget(Number(priceParam));

    const filterParam = searchParams.get("filter");
    if (filterParam !== null) setSpecialFilter(filterParam);
  }, [searchParams]);

  const handleToggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleStoredWishlist(id);
    setWishlist(updated);
  };

  // Filter logic
  let results = properties.filter((p) => {
    // City
    if (city !== "all" && !p.city.toLowerCase().includes(city.toLowerCase()) && !p.area.toLowerCase().includes(city.toLowerCase())) {
      return false;
    }
    // Gender
    if (gender !== "all") {
      if (gender === "female" && p.gender !== "female" && p.gender !== "any") return false;
      if (gender === "male" && p.gender !== "male" && p.gender !== "any") return false;
      if (gender === "any" && p.gender !== "any") return false;
    }
    // Budget
    if (budget !== "all" && p.minPrice > budget) {
      return false;
    }
    // Lifestyle Filter
    if (specialFilter !== "all") {
      if (specialFilter === "zero_deposit" && !p.depositType.toLowerCase().includes("zero") && !p.depositType.toLowerCase().includes("pass")) return false;
      if (specialFilter === "ac_single" && !p.roomPlans.some((r) => r.type === "single")) return false;
      if (specialFilter === "meals" && !p.mealsIncluded) return false;
      if (specialFilter === "metro" && !p.metroDistance.toLowerCase().includes("m") && !p.metroDistance.toLowerCase().includes("walk")) return false;
      if (specialFilter === "balcony" && !p.amenities.some((a) => a.toLowerCase().includes("balcony") || a.toLowerCase().includes("terrace"))) return false;
      if (specialFilter === "biometric" && !p.amenities.some((a) => a.toLowerCase().includes("biometric"))) return false;
      if (specialFilter === "pets" && !p.rules.some((r) => r.toLowerCase().includes("pet"))) return false;
      if (specialFilter === "gym" && !p.amenities.some((a) => a.toLowerCase().includes("gym"))) return false;
    }
    // Query Search
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      const match = p.title.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.amenities.some((a) => a.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Sorting
  if (sortBy === "rating") {
    results = [...results].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "price_asc") {
    results = [...results].sort((a, b) => a.minPrice - b.minPrice);
  } else if (sortBy === "price_desc") {
    results = [...results].sort((a, b) => b.minPrice - a.minPrice);
  }

  return (
    <div style={{ padding: "2rem 0 4rem", minHeight: "85vh" }}>
      <div className="app-container">
        {/* Top Header */}
        <div style={{ marginBottom: "1.75rem" }}>
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
            <IconSearch size={14} color="#007AFF" /> DIRECTPG SEARCH STORE
          </div>
          <h1 style={{
            fontSize: "clamp(1.6rem, 3.2vw, 2.3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            lineHeight: 1.15,
            marginBottom: "0.35rem",
          }}>
            {city !== "all" ? `Verified PGs in ${city}` : "Search Verified PGs Across India"}
          </h1>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
            Showing {results.length} verified listings with 0% brokerage and verified landlord identities.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div
          className="ios-card"
          style={{
            padding: "1.2rem 1.35rem",
            borderRadius: "20px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
          }}
        >
          {/* Input Row */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <div style={{
              flex: "1 1 260px",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "var(--bg-tertiary)",
              padding: "0.6rem 0.9rem",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
            }}>
              <IconSearch size={17} color="var(--text-secondary)" />
              <input
                type="text"
                placeholder="Search area, landmark or PG name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontWeight: 700 }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* City Dropdown */}
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                padding: "0.6rem 0.85rem",
                borderRadius: "12px",
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                fontSize: "0.84rem",
                fontWeight: 600,
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="all">All Cities</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi NCR</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
            </select>

            {/* Gender Dropdown */}
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{
                padding: "0.6rem 0.85rem",
                borderRadius: "12px",
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                fontSize: "0.84rem",
                fontWeight: 600,
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="all">Any Gender</option>
              <option value="female">Girls Only</option>
              <option value="male">Boys Only</option>
              <option value="any">Co-Ed</option>
            </select>

            {/* Budget Dropdown */}
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value === "all" ? "all" : Number(e.target.value))}
              style={{
                padding: "0.6rem 0.85rem",
                borderRadius: "12px",
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                fontSize: "0.84rem",
                fontWeight: 600,
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="all">Max Budget</option>
              <option value="6000">Under ₹6,000</option>
              <option value="8500">Under ₹8,500</option>
              <option value="12000">Under ₹12,000</option>
              <option value="16000">Under ₹16,000</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: "0.6rem 0.85rem",
                borderRadius: "12px",
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                fontSize: "0.84rem",
                fontWeight: 600,
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="rating">Top Rated First</option>
              <option value="price_asc">Rent: Low to High</option>
              <option value="price_desc">Rent: High to Low</option>
            </select>
          </div>

          {/* Quick Filter Capsules */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
            paddingTop: "0.5rem",
            borderTop: "1px solid var(--border-color)",
          }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
              Filter by:
            </span>
            {[
              { id: "all", label: "All Stays" },
              { id: "zero_deposit", label: "Zero Deposit" },
              { id: "ac_single", label: "Single Rooms" },
              { id: "meals", label: "Meals Included" },
              { id: "metro", label: "Near Metro" },
              { id: "biometric", label: "Biometric Security" },
              { id: "gym", label: "In-House Gym" },
            ].map((f) => {
              const active = specialFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSpecialFilter(f.id)}
                  style={{
                    padding: "0.3rem 0.75rem",
                    borderRadius: "var(--radius-pill)",
                    fontSize: "0.74rem",
                    fontWeight: active ? 700 : 500,
                    background: active ? "#007AFF" : "var(--bg-tertiary)",
                    color: active ? "#FFFFFF" : "var(--text-secondary)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Grid */}
        {results.length === 0 ? (
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
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
              No verified PGs matched your criteria
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Try broadening your city, budget, or lifestyle preferences.
            </p>
            <button
              type="button"
              onClick={() => {
                setCity("all");
                setGender("all");
                setBudget("all");
                setSpecialFilter("all");
                setQuery("");
              }}
              className="ios-pill-btn ios-pill-btn-solid"
              style={{
                background: "#007AFF",
                color: "#FFFFFF",
                padding: "0.6rem 1.5rem",
                fontWeight: 700,
              }}
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
            gap: "1.5rem",
          }}>
            {results.map((property) => {
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
                    height: "190px",
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
                      padding: "0.22rem 0.65rem",
                      borderRadius: "var(--radius-pill)",
                      background: "rgba(0, 0, 0, 0.65)",
                      backdropFilter: "blur(8px)",
                      color: "#FFFFFF",
                      fontSize: "0.64rem",
                      fontWeight: 800,
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}>
                      {property.gender === "female" ? "GIRLS ONLY" : property.gender === "male" ? "BOYS ONLY" : "CO-ED"}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleWishlist(property.id, e)}
                      aria-label="Save to Wishlist"
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "rgba(0, 0, 0, 0.55)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <IconHeart size={15} filled={isSaved} color={isSaved ? "var(--crimson-red)" : "#FFFFFF"} />
                    </button>

                    {/* Rating Pill */}
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
                        padding: "0.2rem 0.55rem",
                        borderRadius: "var(--radius-pill)",
                        background: "rgba(255, 255, 255, 0.95)",
                        color: "#1C1C1E",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                      }}>
                        <IconStar size={11} color="#FF9500" />
                        <span>{property.rating}</span>
                        <span style={{ color: "#8E8E93", fontWeight: 600 }}>({property.reviewCount})</span>
                      </div>

                      <div style={{
                        padding: "0.2rem 0.55rem",
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
                        <IconCheck size={11} color="#34C759" strokeWidth={2.6} /> 0% Brokerage
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{
                    padding: "1.15rem",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                  }}>
                    <div>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontSize: "0.74rem",
                        color: "var(--text-secondary)",
                        marginBottom: "0.3rem",
                      }}>
                        <IconMapPin size={12} color="var(--apple-blue)" />
                        <span style={{ fontWeight: 600 }}>{property.area}, {property.city}</span>
                      </div>

                      <h3 style={{
                        fontSize: "1.02rem",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.3,
                        marginBottom: "0.45rem",
                      }}>
                        {property.title}
                      </h3>

                      <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "0.85rem" }}>
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
                      </div>
                    </div>

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
                            fontSize: "1.18rem",
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

                      <Link
                        href={`/listings/${property.id}`}
                        style={{
                          padding: "0.42rem 1.05rem",
                          borderRadius: "var(--radius-pill)",
                          background: "var(--prism-blue)",
                          color: "#FFFFFF",
                          fontSize: "0.78rem",
                          fontWeight: 800,
                          letterSpacing: "0.03em",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          boxShadow: "0 3px 10px rgba(0, 102, 255, 0.25)",
                          textDecoration: "none",
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center" }}>Loading Verified Stays...</div>}>
      <SearchContent />
    </Suspense>
  );
}
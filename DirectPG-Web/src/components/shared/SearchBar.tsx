"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { INDIAN_CITIES } from "@/constants";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedTag, setSelectedTag] = useState("");
  const [budget, setBudget] = useState("");
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (selectedGender !== "all") params.set("gender", selectedGender);
    if (budget) params.set("maxPrice", budget);
    if (selectedTag) params.set("amenity", selectedTag);
    router.push(`/search?${params.toString()}`);
  };

  const trendingTags = [
    { label: "Zero Deposit", key: "zero_deposit" },
    { label: "AC Single Room", key: "ac_single" },
    { label: "Chef Meals", key: "meals" },
    { label: "High-Speed WiFi", key: "wifi" },
    { label: "Near Metro", key: "metro" },
    { label: "Gym & Fitness", key: "gym" },
    { label: "Girls Only", key: "female" },
    { label: "Boys Only", key: "male" },
  ];

  return (
    <section style={{ padding: "0.5rem 0 1.5rem" }}>
      <div className="app-container">
        <div className="ios-card" style={{
          padding: "1.25rem 1.5rem",
          background: "var(--bg-card)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-card)",
        }}>
          {/* iOS Search Bar Input Row */}
          <form onSubmit={handleSearch} style={{
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            flexWrap: "wrap",
          }}>
            {/* iOS Capsule Search Field */}
            <div style={{
              flex: "1 1 280px",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "var(--bg-tertiary)",
              padding: "0.6rem 1rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-color)",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                list="ios-cities"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search by city, college, tech park, or locality..."
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  fontFamily: "inherit",
                }}
              />
              <datalist id="ios-cities">
                {INDIAN_CITIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            {/* Budget Selector */}
            <div style={{
              flex: "0 1 180px",
              background: "var(--bg-tertiary)",
              padding: "0.6rem 0.9rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-color)",
            }}>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                <option value="">Budget: Any</option>
                <option value="6000">Under ₹6,000</option>
                <option value="10000">Under ₹10,000</option>
                <option value="15000">Under ₹15,000</option>
                <option value="25000">Under ₹25,000</option>
              </select>
            </div>

            {/* iOS Segmented Gender Switcher */}
            <div style={{
              display: "flex",
              background: "var(--bg-tertiary)",
              padding: "3px",
              borderRadius: "var(--radius-lg)",
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
                  onClick={() => setSelectedGender(g.key)}
                  style={{
                    padding: "0.45rem 0.85rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.78rem",
                    fontWeight: selectedGender === g.key ? 700 : 500,
                    color: selectedGender === g.key ? "var(--text-primary)" : "var(--text-secondary)",
                    background: selectedGender === g.key ? "var(--bg-card)" : "transparent",
                    boxShadow: selectedGender === g.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  {g.label}
                </button>
              ))}
            </div>

            {/* App Store Search Button */}
            <button
              type="submit"
              className="ios-pill-btn ios-pill-btn-solid"
              style={{
                padding: "0.65rem 1.6rem",
                fontSize: "0.9rem",
              }}
            >
              Search
            </button>
          </form>

          {/* Quick Search Tags / Trending Searches */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1rem",
            paddingTop: "0.85rem",
            borderTop: "1px solid var(--border-color)",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}>
            <span style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "var(--text-secondary)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
              TRENDING:
            </span>
            {trendingTags.map((tag) => {
              const active = selectedTag === tag.key;
              return (
                <button
                  key={tag.key}
                  type="button"
                  onClick={() => {
                    setSelectedTag(active ? "" : tag.key);
                    router.push(`/search?tag=${tag.key}`);
                  }}
                  style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "var(--radius-pill)",
                    background: active ? "var(--apple-blue)" : "var(--bg-tertiary)",
                    color: active ? "#FFFFFF" : "var(--text-secondary)",
                    fontSize: "0.76rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    border: "1px solid var(--border-color)",
                    transition: "all 0.15s ease",
                  }}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
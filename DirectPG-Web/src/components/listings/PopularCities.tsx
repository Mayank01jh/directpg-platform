"use client";
import Link from "next/link";
import { ROUTES } from "@/constants";
import {
  IconBolt,
  IconSnowflake,
  IconUtensils,
  IconTrain,
  IconLeaf,
  IconLock,
  IconPaw,
  IconDumbbell,
  IconSparkles,
} from "@/components/ui/Icons";

interface CityCategory {
  name: string;
  count: string;
  state: string;
  priceStart: string;
  popularLocalities: string;
  image: string;
}

const CITIES_CATEGORIES: CityCategory[] = [
  {
    name: "Bangalore",
    state: "Karnataka",
    count: "14,800+ PGs",
    priceStart: "From ₹6,500/mo",
    popularLocalities: "Koramangala, HSR, Whitefield, Indiranagar",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&h=420&fit=crop",
  },
  {
    name: "Mumbai",
    state: "Maharashtra",
    count: "10,200+ PGs",
    priceStart: "From ₹9,000/mo",
    popularLocalities: "Bandra, Powai, Andheri, Navi Mumbai",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=420&fit=crop",
  },
  {
    name: "Delhi NCR",
    state: "Delhi & Noida",
    count: "12,900+ PGs",
    priceStart: "From ₹5,800/mo",
    popularLocalities: "North Campus, Sector 62, Gurgaon, Saket",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=420&fit=crop",
  },
  {
    name: "Hyderabad",
    state: "Telangana",
    count: "8,500+ PGs",
    priceStart: "From ₹6,000/mo",
    popularLocalities: "Madhapur, Gachibowli, Ameerpet, HITEC City",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&h=420&fit=crop",
  },
  {
    name: "Pune",
    state: "Maharashtra",
    count: "9,100+ PGs",
    priceStart: "From ₹5,500/mo",
    popularLocalities: "Viman Nagar, Hinjewadi, Wakad, Kothrud",
    image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&h=420&fit=crop",
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    count: "6,400+ PGs",
    priceStart: "From ₹5,800/mo",
    popularLocalities: "OMR, Velachery, Guindy, Thoraipakkam",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=420&fit=crop",
  },
];

const LIFESTYLE_FILTERS = [
  {
    label: "Zero Security Deposit",
    subtitle: "Move in with ₹0 advance",
    count: "4,800+ Stays",
    renderIcon: () => <IconBolt size={20} color="#007AFF" />,
    href: "/search?filter=zero_deposit",
  },
  {
    label: "AC Single Rooms",
    subtitle: "Private space with climate control",
    count: "12,200+ Stays",
    renderIcon: () => <IconSnowflake size={20} color="#007AFF" />,
    href: "/search?filter=ac_single",
  },
  {
    label: "3 Meals Daily Included",
    subtitle: "Hygienic chef-prepared food",
    count: "18,400+ Stays",
    renderIcon: () => <IconUtensils size={20} color="#007AFF" />,
    href: "/search?filter=meals",
  },
  {
    label: "Walk to Metro (5-Min)",
    subtitle: "Effortless daily commute",
    count: "21,500+ Stays",
    renderIcon: () => <IconTrain size={20} color="#007AFF" />,
    href: "/search?filter=metro",
  },
  {
    label: "Private Balcony Suites",
    subtitle: "Fresh air & panoramic views",
    count: "6,100+ Stays",
    renderIcon: () => <IconLeaf size={20} color="#007AFF" />,
    href: "/search?filter=balcony",
  },
  {
    label: "Biometric 24/7 Security",
    subtitle: "Keyless access & warden on-site",
    count: "15,900+ Stays",
    renderIcon: () => <IconLock size={20} color="#007AFF" />,
    href: "/search?filter=biometric",
  },
  {
    label: "Pet Friendly Stays",
    subtitle: "Bring your furry companions",
    count: "3,200+ Stays",
    renderIcon: () => <IconPaw size={20} color="#007AFF" />,
    href: "/search?filter=pets",
  },
  {
    label: "Gym & Fitness Studio",
    subtitle: "In-house fitness & recreation",
    count: "7,800+ Stays",
    renderIcon: () => <IconDumbbell size={20} color="#007AFF" />,
    href: "/search?filter=gym",
  },
];

export default function PopularCities() {
  return (
    <section id="categories" style={{ padding: "2.5rem 0 2rem" }}>
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
              <IconSparkles size={14} color="#007AFF" /> EXPLORE BY REGION
            </div>
            <h2 style={{
              fontSize: "clamp(1.5rem, 3.2vw, 2.1rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              lineHeight: 1.15,
            }}>
              Browse by City Hubs
            </h2>
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
            All Cities ›
          </Link>
        </div>

        {/* 6 City Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))",
          gap: "1.25rem",
        }}>
          {CITIES_CATEGORIES.map((city) => (
            <Link
              key={city.name}
              href={`/search?city=${encodeURIComponent(city.name)}`}
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                height: "230px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1rem",
                textDecoration: "none",
                cursor: "pointer",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
                transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 18px 36px rgba(0, 0, 0, 0.2)";
                e.currentTarget.style.borderColor = "rgba(0, 122, 255, 0.4)";
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1.09)";
                const arrow = e.currentTarget.querySelector(".city-arrow") as HTMLElement;
                if (arrow) arrow.style.background = "#007AFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1)";
                const arrow = e.currentTarget.querySelector(".city-arrow") as HTMLElement;
                if (arrow) arrow.style.background = "rgba(255, 255, 255, 0.2)";
              }}
            >
              {/* Photo Background */}
              <img
                src={city.image}
                alt={city.name}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
              />

              {/* Multi-Stop Cinematic Gradient Mask */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%)",
              }} />

              {/* Top Pill Badge */}
              <div style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{
                  padding: "0.22rem 0.6rem",
                  borderRadius: "var(--radius-pill)",
                  background: "rgba(0, 0, 0, 0.55)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                  fontSize: "0.66rem",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                }}>
                  {city.count}
                </span>

                <div
                  className="city-arrow"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    transition: "all 0.25s ease",
                  }}
                >
                  ↗
                </div>
              </div>

              {/* Bottom Info */}
              <div style={{ position: "relative", zIndex: 2, color: "#FFFFFF" }}>
                <span style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.75)",
                  display: "block",
                  marginBottom: "0.15rem",
                }}>
                  {city.state}
                </span>

                <h3 style={{
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  marginBottom: "0.25rem",
                  color: "#FFFFFF",
                }}>
                  {city.name}
                </h3>

                <div style={{
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  color: "#34C759",
                  letterSpacing: "0.01em",
                }}>
                  {city.priceStart}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            REDESIGNED: Popular Filters & Lifestyle Amenities (Balanced 4x2 Grid)
            Zero empty spaces, full symmetric width, rich micro-interactions!
            ═══════════════════════════════════════════════════════════════════ */}
        <div style={{ marginTop: "2rem" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
            padding: "0 0.2rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
              <IconBolt size={18} color="#007AFF" />
              <span style={{
                fontSize: "0.76rem",
                fontWeight: 800,
                color: "var(--text-secondary)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                POPULAR FILTERS & LIFESTYLE AMENITIES
              </span>
            </div>
            <span style={{ fontSize: "0.74rem", color: "var(--text-secondary)", fontWeight: 600 }}>
              Select to filter stays instantly
            </span>
          </div>

          {/* Symmetrical 4-Column Grid: Spans 100% with Perfect Balance */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            width: "100%",
          }}>
            {LIFESTYLE_FILTERS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="ios-card"
                style={{
                  borderRadius: "18px",
                  padding: "1.1rem 1.25rem",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.85rem",
                  textDecoration: "none",
                  transition: "all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.borderColor = "var(--apple-blue)";
                  const arrow = e.currentTarget.querySelector(".filter-arrow") as HTMLElement;
                  if (arrow) {
                    arrow.style.transform = "translateX(3px)";
                    arrow.style.color = "var(--apple-blue)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0, 0, 0, 0.04)";
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  const arrow = e.currentTarget.querySelector(".filter-arrow") as HTMLElement;
                  if (arrow) {
                    arrow.style.transform = "translateX(0)";
                    arrow.style.color = "var(--text-muted)";
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", minWidth: 0 }}>
                  {/* Icon Squircle (30% secondary neutral surface, 10% unified blue icon) */}
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    background: "var(--bg-tertiary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1px solid var(--border-color)",
                  }}>
                    {item.renderIcon()}
                  </div>

                  {/* Texts */}
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.25,
                      marginBottom: "0.2rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {item.label}
                    </h4>
                    <div style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                    }}>
                      {item.count}
                    </div>
                  </div>
                </div>

                {/* Right Arrow Affordance */}
                <div
                  className="filter-arrow"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  ›
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="ios-divider" />
      </div>
    </section>
  );
}
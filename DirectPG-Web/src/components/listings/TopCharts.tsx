"use client";
import { useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants";
import {
  IconTrendingUp,
  IconFlame,
  IconTag,
  IconSparkles,
  IconCheck,
  IconMapPin,
  IconStar,
} from "@/components/ui/Icons";

interface ChartItem {
  rank: number;
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  feature: string;
  image: string;
}

const TOP_CHARTS_DATA: Record<string, ChartItem[]> = {
  rated: [
    {
      rank: 1,
      id: "tc-1",
      name: "Stanza Living Rome House",
      category: "Premium Co-Living • Unisex",
      location: "Koramangala 4th Block, Bangalore",
      rating: 4.95,
      reviews: 184,
      price: 10500,
      feature: "Chef Meals & 1Gbps WiFi",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=240&h=240&fit=crop",
    },
    {
      rank: 2,
      id: "tc-2",
      name: "Zolo Talisman Residency",
      category: "Students • Boys Only",
      location: "HSR Layout Sector 2, Bangalore",
      rating: 4.91,
      reviews: 215,
      price: 7200,
      feature: "3 Meals & Daily Housekeeping",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=240&h=240&fit=crop",
    },
    {
      rank: 3,
      id: "tc-3",
      name: "Isthara Silver Crest Suites",
      category: "Working Women • Girls Only",
      location: "Gachibowli IT Hub, Hyderabad",
      rating: 4.88,
      reviews: 142,
      price: 8500,
      feature: "Biometric & Female Wardens",
      image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=240&h=240&fit=crop",
    },
    {
      rank: 4,
      id: "tc-4",
      name: "HelloWorld Whitefield Suites",
      category: "Techies • Co-Ed",
      location: "ITPL Main Road, Bangalore",
      rating: 4.86,
      reviews: 96,
      price: 9800,
      feature: "Walk to Tech Park & Gym",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=240&h=240&fit=crop",
    },
    {
      rank: 5,
      id: "tc-5",
      name: "Livin Palms Gateway",
      category: "Luxury Co-Living",
      location: "Bandra West, Mumbai",
      rating: 4.84,
      reviews: 82,
      price: 14000,
      feature: "Rooftop Cafe & Balcony",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=240&h=240&fit=crop",
    },
    {
      rank: 6,
      id: "tc-6",
      name: "Nexus Metro Stays",
      category: "Executive • Boys Only",
      location: "Sector 62, Noida",
      rating: 4.82,
      reviews: 118,
      price: 6900,
      feature: "200m from Blue Line Metro",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=240&h=240&fit=crop",
    },
  ],
  budget: [
    {
      rank: 1,
      id: "b-1",
      name: "Sai Balaji PG for Men",
      category: "Budget Friendly • Triple Sharing",
      location: "BTM Layout 1st Stage, Bangalore",
      rating: 4.65,
      reviews: 230,
      price: 5200,
      feature: "3 Hot Meals & Laundry",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=240&h=240&fit=crop",
    },
    {
      rank: 2,
      id: "b-2",
      name: "Annapurna Women's Hostel",
      category: "Students • Girls Only",
      location: "Ameerpet Coaching Hub, Hyderabad",
      rating: 4.70,
      reviews: 198,
      price: 5800,
      feature: "CCTV & Power Backup",
      image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=240&h=240&fit=crop",
    },
    {
      rank: 3,
      id: "b-3",
      name: "Green View Executive PG",
      category: "Working Men • Double Sharing",
      location: "Wakad Hinjewadi Road, Pune",
      rating: 4.60,
      reviews: 110,
      price: 6000,
      feature: "High Speed WiFi & Parking",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=240&h=240&fit=crop",
    },
    {
      rank: 4,
      id: "b-4",
      name: "Shree Krishna Boys Residence",
      category: "University Area",
      location: "North Campus, Delhi",
      rating: 4.55,
      reviews: 145,
      price: 6500,
      feature: "Walk to Metro & Library",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=240&h=240&fit=crop",
    },
    {
      rank: 5,
      id: "b-5",
      name: "Comfort Stays Girls Hostels",
      category: "Colleges • Double Sharing",
      location: "Vashi, Navi Mumbai",
      rating: 4.68,
      reviews: 89,
      price: 6700,
      feature: "Attached Bath & Security",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=240&h=240&fit=crop",
    },
    {
      rank: 6,
      id: "b-6",
      name: "Sri Sai Residency",
      category: "Budget Friendly",
      location: "Thoraipakkam, Chennai",
      rating: 4.62,
      reviews: 77,
      price: 5900,
      feature: "OMR IT Route Transit",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=240&h=240&fit=crop",
    },
  ],
  luxury: [
    {
      rank: 1,
      id: "lux-1",
      name: "The Grand Coliving Suite",
      category: "Ultra Luxury • Single AC",
      location: "Indiranagar 100ft Road, Bangalore",
      rating: 4.98,
      reviews: 64,
      price: 18500,
      feature: "Swimming Pool, Jacuzzi & Bar",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=240&h=240&fit=crop",
    },
    {
      rank: 2,
      id: "lux-2",
      name: "Horizon Sky Villas",
      category: "Penthouse Co-Living",
      location: "Powai Lakefront, Mumbai",
      rating: 4.94,
      reviews: 58,
      price: 22000,
      feature: "Gym, Concierge & Lake View",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=240&h=240&fit=crop",
    },
    {
      rank: 3,
      id: "lux-3",
      name: "Aura Silicon Heights",
      category: "Executive AC Studio",
      location: "HITEC City Phase 2, Hyderabad",
      rating: 4.92,
      reviews: 79,
      price: 16000,
      feature: "Private Workstation & Cafe",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=240&h=240&fit=crop",
    },
    {
      rank: 4,
      id: "lux-4",
      name: "Urban Elite Residences",
      category: "Studio Apartments",
      location: "Koregaon Park, Pune",
      rating: 4.89,
      reviews: 51,
      price: 17500,
      feature: "Lounge, Valet & Housekeeping",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=240&h=240&fit=crop",
    },
    {
      rank: 5,
      id: "lux-5",
      name: "Cyber Park Manor",
      category: "Techies • Premium Co-Ed",
      location: "Cyber City DLF Phase 2, Gurgaon",
      rating: 4.87,
      reviews: 93,
      price: 19000,
      feature: "Fiber Net 1Gbps, Gaming Zone",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=240&h=240&fit=crop",
    },
    {
      rank: 6,
      id: "lux-6",
      name: "Oceanic Crest Suites",
      category: "Luxury Studio",
      location: "ECR Coastal Route, Chennai",
      rating: 4.85,
      reviews: 44,
      price: 16500,
      feature: "Sea Facing Balcony & Chef",
      image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=240&h=240&fit=crop",
    },
  ],
};

const rankBadgeStyles: Record<number, { bg: string; color: string; label: string; shadow: string }> = {
  1: {
    bg: "var(--apple-blue)",
    color: "#FFFFFF",
    label: "#1",
    shadow: "0 2px 8px rgba(0, 122, 255, 0.3)",
  },
  2: {
    bg: "var(--bg-tertiary)",
    color: "var(--text-secondary)",
    label: "#2",
    shadow: "none",
  },
  3: {
    bg: "var(--bg-tertiary)",
    color: "var(--text-secondary)",
    label: "#3",
    shadow: "none",
  },
};

export default function TopCharts() {
  const [tab, setTab] = useState<"rated" | "budget" | "luxury">("rated");
  const items = TOP_CHARTS_DATA[tab] || TOP_CHARTS_DATA.rated;

  const col1 = items.slice(0, 3);
  const col2 = items.slice(3, 6);

  return (
    <section id="top-charts" style={{ padding: "2.5rem 0 2rem" }}>
      <div className="app-container">
        {/* Apple Style Section Header */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "1.4rem",
          padding: "0 0.2rem",
          flexWrap: "wrap",
          gap: "1rem",
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
              <IconTrendingUp size={14} color="#007AFF" /> OFFICIAL RANKINGS
            </div>
            <h2 style={{
              fontSize: "clamp(1.5rem, 3.2vw, 2.1rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              lineHeight: 1.15,
            }}>
              Top Charts
            </h2>
          </div>

          {/* 3-Way Segmented Switcher */}
          <div style={{
            display: "inline-flex",
            background: "var(--bg-tertiary)",
            padding: "4px",
            borderRadius: "var(--radius-pill)",
            border: "1px solid var(--border-color)",
          }}>
            {[
              { id: "rated", label: "Top Rated Stays", icon: (color: string) => <IconFlame size={15} color={color} /> },
              { id: "budget", label: "Under ₹7,000", icon: (color: string) => <IconTag size={15} color={color} /> },
              { id: "luxury", label: "Luxury Co-Living", icon: (color: string) => <IconSparkles size={15} color={color} /> },
            ].map((t) => {
              const active = tab === t.id;
              const iconColor = active ? "#007AFF" : "var(--text-secondary)";
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id as any)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.42rem 1.05rem",
                    borderRadius: "var(--radius-pill)",
                    fontSize: "0.78rem",
                    fontWeight: active ? 700 : 500,
                    color: active ? "var(--text-primary)" : "var(--text-secondary)",
                    background: active ? "var(--bg-card)" : "transparent",
                    boxShadow: active ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {t.icon(iconColor)}
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Symmetrical Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "1.35rem",
          width: "100%",
        }}>
          {[
            { list: col1, label: "Top 1 – 3 Ranked" },
            { list: col2, label: "Top 4 – 6 Ranked" },
          ].map((column, colIndex) => (
            <div
              key={colIndex}
              className="ios-card"
              style={{
                borderRadius: "22px",
                padding: "1.35rem 1.4rem",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.06)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Column Category Title */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "0.75rem",
                marginBottom: "0.5rem",
                borderBottom: "1px solid var(--border-color)",
              }}>
                <span style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  color: "var(--text-secondary)",
                  textTransform: "uppercase",
                }}>
                  {column.label}
                </span>
                <span style={{
                  fontSize: "0.72rem",
                  color: "#34C759",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}>
                  <IconCheck size={13} color="#34C759" /> 100% Direct Verification
                </span>
              </div>

              {/* Rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {column.list.map((item) => {
                  const medal = rankBadgeStyles[item.rank];

                  return (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.95rem",
                        padding: "0.85rem",
                        borderRadius: "16px",
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-color)",
                        transition: "all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateX(4px)";
                        e.currentTarget.style.borderColor = "rgba(0, 122, 255, 0.35)";
                        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08)";
                        const btn = e.currentTarget.querySelector(".row-action-btn") as HTMLElement;
                        if (btn) btn.style.transform = "scale(1.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateX(0)";
                        e.currentTarget.style.borderColor = "var(--border-color)";
                        e.currentTarget.style.boxShadow = "none";
                        const btn = e.currentTarget.querySelector(".row-action-btn") as HTMLElement;
                        if (btn) btn.style.transform = "scale(1)";
                      }}
                    >
                      {/* Rank Indicator */}
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "10px",
                          background: medal ? medal.bg : "var(--bg-card)",
                          color: medal ? medal.color : "var(--text-secondary)",
                          boxShadow: medal ? medal.shadow : "0 1px 4px rgba(0,0,0,0.06)",
                          border: medal ? "none" : "1px solid var(--border-color)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.85rem",
                          fontWeight: 800,
                          flexShrink: 0,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {item.rank}
                      </div>

                      {/* Squircle Thumbnail */}
                      <div
                        style={{
                          width: 58,
                          height: 58,
                          borderRadius: "15px",
                          overflow: "hidden",
                          flexShrink: 0,
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          border: "1px solid var(--border-color)",
                        }}
                      >
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

                      {/* Content Details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4
                          style={{
                            fontSize: "0.96rem",
                            fontWeight: 800,
                            color: "var(--text-primary)",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.25,
                            marginBottom: "0.2rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.name}
                        </h4>

                        <div
                          style={{
                            fontSize: "0.74rem",
                            color: "var(--text-secondary)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            marginBottom: "0.25rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                          }}
                        >
                          <IconMapPin size={12} color="var(--text-secondary)" />
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{item.location}</span>
                        </div>

                        {/* Rating & Feature Tag */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.45rem",
                            fontSize: "0.72rem",
                          }}
                        >
                          <span style={{
                            color: "#FF9500",
                            fontWeight: 800,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}>
                            <IconStar size={12} color="#FF9500" />
                            {item.rating}
                          </span>
                          <span style={{ color: "var(--text-muted)" }}>•</span>
                          <span style={{
                            color: "#007AFF",
                            fontWeight: 600,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}>
                            {item.feature}
                          </span>
                        </div>
                      </div>

                      {/* Price & Action Button */}
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{
                          fontSize: "1.1rem",
                          fontWeight: 800,
                          color: "var(--text-primary)",
                          letterSpacing: "-0.03em",
                          lineHeight: 1.1,
                        }}>
                          ₹{item.price.toLocaleString()}
                        </div>
                        <div style={{
                          fontSize: "0.64rem",
                          fontWeight: 700,
                          color: "#34C759",
                          marginBottom: "0.35rem",
                        }}>
                          0% BROKERAGE
                        </div>

                        {/* High-Contrast Apple Pill Action Button */}
                        <Link
                          href={`/listings/${item.id}`}
                          className="row-action-btn"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            padding: "0.38rem 0.85rem",
                            borderRadius: "var(--radius-pill)",
                            background: "linear-gradient(135deg, #007AFF, #0062cc)",
                            color: "#FFFFFF",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            boxShadow: "0 3px 10px rgba(0, 122, 255, 0.35)",
                            transition: "all 0.2s ease",
                            textDecoration: "none",
                          }}
                        >
                          VIEW <span>›</span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
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

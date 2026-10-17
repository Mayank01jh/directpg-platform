"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPropertyById, PGProperty } from "@/lib/mockData";
import { getStoredWishlist, toggleStoredWishlist, addStoredVisit } from "@/lib/userDataStore";
import {
  IconStar,
  IconMapPin,
  IconHeart,
  IconCheck,
  IconPhone,
  IconMessageCircle,
  IconCalendar,
  IconLock,
  IconWifi,
  IconSnowflake,
  IconUtensils,
  IconTrain,
  IconBuilding,
  IconShieldCheck,
  IconSparkles,
} from "@/components/ui/Icons";

export default function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [property, setProperty] = useState<PGProperty | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [isSaved, setIsSaved] = useState(false);

  // Modals state
  const [showCallModal, setShowCallModal] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [visitType, setVisitType] = useState<"In-Person Walkthrough" | "Live Video Tour">("In-Person Walkthrough");
  const [visitDate, setVisitDate] = useState("Tomorrow");
  const [visitTime, setVisitTime] = useState("4:00 PM - 4:30 PM");
  const [visitSuccess, setVisitSuccess] = useState(false);

  useEffect(() => {
    const found = getPropertyById(id) || getPropertyById("1");
    if (found) {
      setProperty(found);
      if (found.roomPlans.length > 0) {
        setSelectedPlanId(found.roomPlans[0].id);
      }
    }
    const wishlist = getStoredWishlist();
    setIsSaved(wishlist.includes(id));
  }, [id]);

  const handleToggleWishlist = () => {
    if (!property) return;
    const updated = toggleStoredWishlist(property.id);
    setIsSaved(updated.includes(property.id));
  };

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;
    addStoredVisit({
      id: `vst-${Date.now().toString().slice(-4)}`,
      propertyId: property.id,
      propertyTitle: property.title,
      propertyAddress: property.address,
      visitType,
      date: visitDate,
      timeSlot: visitTime,
      tenantName: "Mayank Sharma",
      tenantPhone: "+91 98765 43210",
      status: "Scheduled",
      bookedAt: new Date().toISOString().split("T")[0],
    });
    setVisitSuccess(true);
    setTimeout(() => {
      setVisitSuccess(false);
      setShowVisitModal(false);
    }, 2200);
  };

  if (!property) {
    return (
      <div style={{ padding: "6rem 2rem", textAlign: "center" }}>
        <p style={{ color: "var(--text-secondary)" }}>Loading Property Details...</p>
      </div>
    );
  }

  const selectedPlan = property.roomPlans.find((r) => r.id === selectedPlanId) || property.roomPlans[0];

  return (
    <div style={{ padding: "1.5rem 0 5rem", minHeight: "85vh" }}>
      <div className="app-container">
        {/* Breadcrumb Row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.78rem",
          color: "var(--text-secondary)",
          marginBottom: "1.25rem",
        }}>
          <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link href="/listings" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Listings</Link>
          <span>›</span>
          <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>{property.title}</span>
        </div>

        {/* Title & Action Bar */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
              <span style={{
                padding: "0.22rem 0.65rem",
                borderRadius: "var(--radius-pill)",
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-color)",
                color: "var(--text-secondary)",
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.06em",
              }}>
                {property.gender === "female" ? "GIRLS ONLY" : property.gender === "male" ? "BOYS ONLY" : "CO-ED UNISEX"}
              </span>
              <span style={{
                padding: "0.22rem 0.65rem",
                borderRadius: "var(--radius-pill)",
                background: "rgba(52, 199, 89, 0.1)",
                border: "1px solid rgba(52, 199, 89, 0.25)",
                color: "#34C759",
                fontSize: "0.68rem",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}>
                <IconCheck size={12} color="#34C759" strokeWidth={2.6} /> 100% Direct Owner Verified
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(1.6rem, 3.2vw, 2.3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              lineHeight: 1.2,
              marginBottom: "0.45rem",
            }}>
              {property.title}
            </h1>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              fontSize: "0.82rem",
              color: "var(--text-secondary)",
              flexWrap: "wrap",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <IconMapPin size={13} color="#007AFF" />
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{property.address}</span>
              </div>
              <span>•</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#FF9500", fontWeight: 700 }}>
                <IconStar size={13} color="#FF9500" />
                <span>{property.rating}</span>
                <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>({property.reviewCount} verified reviews)</span>
              </div>
            </div>
          </div>

          {/* Top Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              type="button"
              onClick={handleToggleWishlist}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.55rem 1.1rem",
                borderRadius: "var(--radius-pill)",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: isSaved ? "#FF2D55" : "var(--text-primary)",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <IconHeart size={16} filled={isSaved} color={isSaved ? "#FF2D55" : "currentColor"} />
              <span>{isSaved ? "Saved" : "Save Stay"}</span>
            </button>

            <Link
              href={`/booking/${property.id}`}
              className="ios-pill-btn ios-pill-btn-solid"
              style={{
                background: "#007AFF",
                color: "#FFFFFF",
                padding: "0.6rem 1.6rem",
                fontSize: "0.88rem",
                fontWeight: 800,
              }}
            >
              Book Online ›
            </Link>
          </div>
        </div>

        {/* Gallery Section */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1rem",
          marginBottom: "2.5rem",
        }}>
          {/* Main Selected Image */}
          <div style={{
            position: "relative",
            height: "clamp(280px, 46vw, 480px)",
            borderRadius: "24px",
            overflow: "hidden",
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border-color)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          }}>
            <img
              src={property.images[activeImageIndex] || property.images[0]}
              alt={property.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.25s ease",
              }}
            />
            <div style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              padding: "0.35rem 0.85rem",
              borderRadius: "var(--radius-pill)",
              background: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(10px)",
              color: "#FFFFFF",
              fontSize: "0.72rem",
              fontWeight: 700,
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}>
              Photo {activeImageIndex + 1} of {property.images.length}
            </div>
          </div>

          {/* Thumbnail Bar */}
          <div style={{
            display: "flex",
            gap: "0.75rem",
            overflowX: "auto",
            paddingBottom: "0.5rem",
          }}>
            {property.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  width: "100px",
                  height: "70px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: activeImageIndex === idx ? "2.5px solid #007AFF" : "1px solid var(--border-color)",
                  opacity: activeImageIndex === idx ? 1 : 0.65,
                  cursor: "pointer",
                  padding: 0,
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
              >
                <img src={img} alt={`Thumb ${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Split Layout (60% Content / 40% Booking Card) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2.5rem",
          alignItems: "start",
        }}>
          {/* Left Column: Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Overview Card */}
            <div
              className="ios-card"
              style={{
                padding: "1.75rem",
                borderRadius: "22px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                Property Overview
              </h2>
              <p style={{
                fontSize: "0.92rem",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                marginBottom: "1.25rem",
              }}>
                {property.description}
              </p>

              {/* Transit & Commute Highlights */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "0.85rem",
                padding: "1rem",
                borderRadius: "16px",
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-color)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <IconTrain size={18} color="#007AFF" />
                  <div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Metro Station</div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>{property.metroDistance}</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <IconBuilding size={18} color="#007AFF" />
                  <div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Tech Park / Hub</div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>{property.techParkDistance}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Plans Selection */}
            <div
              className="ios-card"
              style={{
                padding: "1.75rem",
                borderRadius: "22px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>
                  Available Room Types
                </h2>
                <span style={{ fontSize: "0.74rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                  Select bed to reserve
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {property.roomPlans.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      style={{
                        padding: "1.1rem 1.25rem",
                        borderRadius: "16px",
                        border: isSelected ? "2px solid #007AFF" : "1px solid var(--border-color)",
                        background: isSelected ? "rgba(0, 122, 255, 0.04)" : "var(--bg-card)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                          <h4 style={{ fontSize: "0.98rem", fontWeight: 800, color: "var(--text-primary)" }}>
                            {plan.name}
                          </h4>
                          <span style={{
                            padding: "0.15rem 0.5rem",
                            borderRadius: "6px",
                            background: "var(--bg-tertiary)",
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            color: "var(--text-secondary)",
                          }}>
                            {plan.availableBeds} Beds Left
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                          {plan.features.map((f) => (
                            <span key={f} style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                              ✓ {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>
                          ₹{plan.price.toLocaleString()}
                        </div>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>
                          Deposit: ₹{plan.deposit.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Amenities Grid */}
            <div
              className="ios-card"
              style={{
                padding: "1.75rem",
                borderRadius: "22px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
                Included Amenities & Services
              </h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "0.85rem",
              }}>
                {property.amenities.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "12px",
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-color)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    <IconCheck size={14} color="#007AFF" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div
              className="ios-card"
              style={{
                padding: "1.75rem",
                borderRadius: "22px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.85rem" }}>
                House Rules & Policies
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {property.rules.map((rule) => (
                  <div key={rule} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#007AFF" }} />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tenant Reviews */}
            <div
              className="ios-card"
              style={{
                padding: "1.75rem",
                borderRadius: "22px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>
                  Verified Tenant Reviews
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#FF9500", fontWeight: 800 }}>
                  <IconStar size={14} color="#FF9500" />
                  <span>{property.rating} / 5.0</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {property.reviewsList.map((rev) => (
                  <div
                    key={rev.id}
                    style={{
                      padding: "1rem",
                      borderRadius: "14px",
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{rev.author}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{rev.role}</div>
                      </div>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{rev.date}</span>
                    </div>
                    <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking & Direct Owner Connect Card */}
          <div style={{ position: "sticky", top: "84px", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div
              className="ios-card"
              style={{
                padding: "1.75rem",
                borderRadius: "24px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: "1rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid var(--border-color)",
              }}>
                <div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
                    Selected Plan
                  </span>
                  <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                    ₹{selectedPlan.price.toLocaleString()}
                    <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)" }}> /month</span>
                  </div>
                </div>
                <div style={{
                  padding: "0.22rem 0.6rem",
                  borderRadius: "var(--radius-pill)",
                  background: "rgba(52, 199, 89, 0.1)",
                  color: "#34C759",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                }}>
                  0% BROKERAGE
                </div>
              </div>

              {/* Price Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1.25rem", fontSize: "0.82rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                  <span>Monthly Rent ({selectedPlan.name}):</span>
                  <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>₹{selectedPlan.price.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                  <span>Refundable Security Deposit:</span>
                  <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>₹{selectedPlan.deposit.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                  <span>Brokerage Commission:</span>
                  <span style={{ fontWeight: 800, color: "#34C759" }}>₹0 FREE</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                  <span>Digital Agreement Fee:</span>
                  <span style={{ fontWeight: 800, color: "#34C759" }}>₹0 FREE</span>
                </div>
              </div>

              {/* Book Now Primary Button */}
              <Link
                href={`/booking/${property.id}?plan=${selectedPlan.id}`}
                className="ios-pill-btn ios-pill-btn-solid"
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  background: "#007AFF",
                  color: "#FFFFFF",
                  textAlign: "center",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                Instant Online Booking ›
              </Link>

              {/* Schedule Visit Button */}
              <button
                type="button"
                onClick={() => setShowVisitModal(true)}
                className="ios-pill-btn"
                style={{
                  width: "100%",
                  padding: "0.7rem",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.45rem",
                  cursor: "pointer",
                }}
              >
                <IconCalendar size={16} color="#007AFF" /> Schedule Free Visit
              </button>
            </div>

            {/* Direct Owner Card */}
            <div
              className="ios-card"
              style={{
                padding: "1.4rem",
                borderRadius: "20px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "var(--apple-blue-light)",
                  color: "#007AFF",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                }}>
                  {property.owner.name.charAt(0)}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)" }}>
                      {property.owner.name}
                    </h4>
                    <IconCheck size={12} color="#007AFF" strokeWidth={3} />
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "var(--text-secondary)" }}>
                    Verified Property Owner • Replies in {property.owner.responseTime}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Call & WhatsApp */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                <button
                  type="button"
                  onClick={() => setShowCallModal(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "12px",
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <IconPhone size={15} color="#007AFF" /> Call Owner
                </button>

                <a
                  href={`https://wa.me/${property.owner.whatsapp}?text=Hi%20${encodeURIComponent(property.owner.name)},%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}%20on%20DirectPG.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "12px",
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  <IconMessageCircle size={15} color="#34C759" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call Owner Modal */}
      {showCallModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}>
          <div
            className="ios-card"
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "2rem",
              borderRadius: "24px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              textAlign: "center",
            }}
          >
            <div style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "var(--apple-blue-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
            }}>
              <IconPhone size={24} color="#007AFF" />
            </div>

            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
              Direct Owner Contact
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
              Connect directly with {property.owner.name} (Zero Broker Interference)
            </p>

            <div style={{
              padding: "1rem",
              borderRadius: "14px",
              background: "var(--bg-tertiary)",
              fontSize: "1.2rem",
              fontWeight: 800,
              color: "#007AFF",
              letterSpacing: "0.05em",
              marginBottom: "1.25rem",
            }}>
              {property.owner.phone}
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a
                href={`tel:${property.owner.phone.replace(/[^0-9+]/g, "")}`}
                className="ios-pill-btn ios-pill-btn-solid"
                style={{
                  flex: 1,
                  padding: "0.65rem",
                  background: "#007AFF",
                  color: "#FFFFFF",
                  textAlign: "center",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                }}
              >
                Dial Number
              </a>
              <button
                type="button"
                onClick={() => setShowCallModal(false)}
                className="ios-pill-btn"
                style={{ flex: 1, padding: "0.65rem", fontSize: "0.88rem", fontWeight: 700 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Visit Modal */}
      {showVisitModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}>
          <div
            className="ios-card"
            style={{
              width: "100%",
              maxWidth: "460px",
              padding: "2rem",
              borderRadius: "24px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            {visitSuccess ? (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(52, 199, 89, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}>
                  <IconCheck size={28} color="#34C759" strokeWidth={3} />
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                  Visit Confirmed!
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Your {visitType} is confirmed for {visitDate} at {visitTime}. The owner has received your confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookVisit}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>
                      Schedule Free Property Visit
                    </h3>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                      Connect directly with {property.owner.name}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowVisitModal(false)}
                    style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "var(--text-muted)" }}
                  >
                    ✕
                  </button>
                </div>

                {/* Visit Type Toggle */}
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.35rem", textTransform: "uppercase" }}>
                    Visit Type
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    {(["In-Person Walkthrough", "Live Video Tour"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setVisitType(t)}
                        style={{
                          padding: "0.6rem 0.5rem",
                          borderRadius: "12px",
                          fontSize: "0.78rem",
                          fontWeight: visitType === t ? 700 : 500,
                          background: visitType === t ? "#007AFF" : "var(--bg-tertiary)",
                          color: visitType === t ? "#FFFFFF" : "var(--text-primary)",
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Day */}
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.35rem", textTransform: "uppercase" }}>
                    Preferred Date
                  </label>
                  <select
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "12px",
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                      fontSize: "0.85rem",
                      fontFamily: "inherit",
                      outline: "none",
                    }}
                  >
                    <option value="Today">Today (Evening Slot)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Saturday">This Saturday</option>
                    <option value="This Sunday">This Sunday</option>
                  </select>
                </div>

                {/* Time Slot */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.35rem", textTransform: "uppercase" }}>
                    Time Slot
                  </label>
                  <select
                    value={visitTime}
                    onChange={(e) => setVisitTime(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "12px",
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                      fontSize: "0.85rem",
                      fontFamily: "inherit",
                      outline: "none",
                    }}
                  >
                    <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM (Morning)</option>
                    <option value="2:00 PM - 2:30 PM">2:00 PM - 2:30 PM (Afternoon)</option>
                    <option value="4:00 PM - 4:30 PM">4:00 PM - 4:30 PM (Evening)</option>
                    <option value="6:30 PM - 7:00 PM">6:30 PM - 7:00 PM (After Office)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="ios-pill-btn ios-pill-btn-solid"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    fontSize: "0.92rem",
                    fontWeight: 800,
                    background: "#007AFF",
                    color: "#FFFFFF",
                  }}
                >
                  Confirm Visit Appointment ›
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
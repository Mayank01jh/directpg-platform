"use client";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getStoredBookings,
  getStoredVisits,
  getStoredWishlist,
  toggleStoredWishlist,
  getCurrentUser,
  setCurrentUser,
  BookingRecord,
  VisitRecord,
} from "@/lib/userDataStore";
import { getPropertyById, PGProperty } from "@/lib/mockData";
import {
  IconUser,
  IconCheck,
  IconShieldCheck,
  IconCalendar,
  IconHeart,
  IconMapPin,
  IconLock,
  IconPhone,
  IconStar,
  IconRupee,
  IconFileText,
  IconSettings,
  IconLogOut,
  IconCreditCard,
} from "@/components/ui/Icons";
import toast from "react-hot-toast";

type ProfileTab = "bookings" | "saved" | "visits" | "payments" | "reviews" | "kyc" | "settings";

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = (searchParams.get("tab") as ProfileTab) || "bookings";

  const [activeTab, setActiveTab] = useState<ProfileTab>(tabParam);
  const [user, setUser] = useState(getCurrentUser());
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [visits, setVisits] = useState<VisitRecord[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    const t = searchParams.get("tab") as ProfileTab;
    if (t) setActiveTab(t);
  }, [searchParams]);

  useEffect(() => {
    setUser(getCurrentUser());
    setBookings(getStoredBookings());
    setVisits(getStoredVisits());
    setWishlistIds(getStoredWishlist());

    const handleWishlist = () => setWishlistIds(getStoredWishlist());
    const handleBookings = () => setBookings(getStoredBookings());
    const handleVisits = () => setVisits(getStoredVisits());
    const handleUser = () => setUser(getCurrentUser());

    window.addEventListener("wishlist-updated", handleWishlist);
    window.addEventListener("bookings-updated", handleBookings);
    window.addEventListener("visits-updated", handleVisits);
    window.addEventListener("user-updated", handleUser);

    return () => {
      window.removeEventListener("wishlist-updated", handleWishlist);
      window.removeEventListener("bookings-updated", handleBookings);
      window.removeEventListener("visits-updated", handleVisits);
      window.removeEventListener("user-updated", handleUser);
    };
  }, []);

  const handleRemoveWishlist = (id: string) => {
    const next = toggleStoredWishlist(id);
    setWishlistIds(next);
    toast.success("Removed from saved stays.");
  };

  const handleSignOut = () => {
    localStorage.removeItem("dpg_current_user");
    window.dispatchEvent(new Event("user-updated"));
    toast.success("Signed out successfully.");
    router.push("/login");
  };

  const savedProperties: PGProperty[] = wishlistIds
    .map((id) => getPropertyById(id))
    .filter((p): p is PGProperty => p !== undefined);

  return (
    <div style={{ padding: "2.5rem 0 5rem", minHeight: "85vh" }}>
      <div className="app-container" style={{ maxWidth: "900px" }}>
        {/* Profile Card Header */}
        <div
          className="ios-card"
          style={{
            padding: "1.75rem",
            borderRadius: "24px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "var(--apple-blue-light)",
              color: "#007AFF",
              fontSize: "1.6rem",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #007AFF",
            }}>
              {user.name.charAt(0)}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                  {user.name}
                </h1>
                <span style={{
                  padding: "0.15rem 0.5rem",
                  borderRadius: "var(--radius-pill)",
                  background: "rgba(52, 199, 89, 0.12)",
                  color: "#34C759",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}>
                  <IconCheck size={11} color="#34C759" strokeWidth={3} /> Aadhaar Verified
                </span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                {user.email} • {user.phone}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link
              href="/listings"
              className="ios-pill-btn ios-pill-btn-solid"
              style={{
                background: "#007AFF",
                color: "#FFFFFF",
                fontSize: "0.82rem",
                fontWeight: 700,
                padding: "0.5rem 1.25rem",
              }}
            >
              Browse PGs
            </Link>
          </div>
        </div>

        {/* Tab Switcher (Segmented Capsule) */}
        <div style={{
          display: "flex",
          background: "var(--bg-tertiary)",
          padding: "4px",
          borderRadius: "var(--radius-pill)",
          border: "1px solid var(--border-color)",
          marginBottom: "2rem",
          overflowX: "auto",
        }}>
          {[
            { id: "bookings", label: `Bookings (${bookings.length})` },
            { id: "saved", label: `Saved (${savedProperties.length})` },
            { id: "visits", label: `Visits (${visits.length})` },
            { id: "payments", label: "Payments" },
            { id: "reviews", label: "Reviews" },
            { id: "kyc", label: "KYC Pass" },
            { id: "settings", label: "Settings" },
          ].map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id as ProfileTab)}
                style={{
                  flex: 1,
                  minWidth: "90px",
                  padding: "0.5rem 0.85rem",
                  borderRadius: "var(--radius-pill)",
                  fontSize: "0.8rem",
                  fontWeight: active ? 800 : 600,
                  color: active ? "var(--text-primary)" : "var(--text-secondary)",
                  background: active ? "var(--bg-card)" : "transparent",
                  boxShadow: active ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: My Bookings */}
        {activeTab === "bookings" && (
          <div>
            {bookings.length === 0 ? (
              <div className="ios-card" style={{ padding: "4rem 2rem", textAlign: "center", borderRadius: "20px", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  No active bookings yet
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                  Find a verified stay near your college or office with 0% brokerage.
                </p>
                <Link href="/listings" className="ios-pill-btn ios-pill-btn-solid" style={{ background: "#007AFF", color: "#FFFFFF", padding: "0.6rem 1.6rem", fontWeight: 800 }}>
                  Explore Stays ›
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {bookings.map((booking) => (
                  <div
                    key={booking.bookingId}
                    className="ios-card"
                    style={{
                      borderRadius: "22px",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                      overflow: "hidden",
                      boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      <div style={{ flex: "1 1 240px", position: "relative", minHeight: "180px" }}>
                        <img
                          src={booking.propertyImage}
                          alt={booking.propertyTitle}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <span style={{
                          position: "absolute",
                          top: "12px",
                          left: "12px",
                          padding: "0.3rem 0.75rem",
                          borderRadius: "var(--radius-pill)",
                          background: "#34C759",
                          color: "#FFFFFF",
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}>
                          <IconCheck size={12} color="#FFFFFF" strokeWidth={3} /> {booking.status}
                        </span>
                      </div>

                      <div style={{ flex: "2 1 320px", padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem" }}>
                            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)" }}>
                              {booking.propertyTitle}
                            </h3>
                            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
                              {booking.bookingId}
                            </span>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.85rem" }}>
                            <IconMapPin size={13} color="var(--text-muted)" />
                            <span>{booking.propertyAddress}</span>
                          </div>

                          <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                            gap: "0.75rem",
                            padding: "0.85rem",
                            borderRadius: "14px",
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--border-color)",
                            fontSize: "0.8rem",
                            marginBottom: "1rem",
                          }}>
                            <div>
                              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Room Plan</span>
                              <strong>{booking.roomName}</strong>
                            </div>
                            <div>
                              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Monthly Rent</span>
                              <strong style={{ color: "#007AFF" }}>₹{booking.monthlyRent.toLocaleString("en-IN")}/mo</strong>
                            </div>
                            <div>
                              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Move-In Date</span>
                              <strong>{booking.moveInDate}</strong>
                            </div>
                            <div>
                              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Smart Lock PIN</span>
                              <strong style={{ color: "#007AFF", letterSpacing: "0.08em" }}>#4892*</strong>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                          <Link
                            href="/booking/confirmation"
                            className="ios-pill-btn ios-pill-btn-solid"
                            style={{
                              background: "#007AFF",
                              color: "#FFFFFF",
                              fontSize: "0.82rem",
                              fontWeight: 700,
                              padding: "0.45rem 1.15rem",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.35rem",
                            }}
                          >
                            <IconLock size={14} color="#FFFFFF" />
                            <span>View Digital Pass</span>
                          </Link>

                          <a
                            href={`tel:${booking.ownerPhone}`}
                            className="ios-pill-btn"
                            style={{
                              fontSize: "0.82rem",
                              padding: "0.45rem 1.1rem",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.35rem",
                            }}
                          >
                            <IconPhone size={14} color="#007AFF" />
                            <span>Call Host</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Saved Stays (Wishlist) */}
        {activeTab === "saved" && (
          <div>
            {savedProperties.length === 0 ? (
              <div className="ios-card" style={{ padding: "4rem 2rem", textAlign: "center", borderRadius: "20px", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                <IconHeart size={40} color="var(--text-muted)" style={{ margin: "0 auto 1rem" }} />
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  Your wishlist is empty
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                  Tap the heart icon on any PG card to save it here for comparison.
                </p>
                <Link href="/listings" className="ios-pill-btn ios-pill-btn-solid" style={{ background: "#007AFF", color: "#FFFFFF", padding: "0.6rem 1.6rem", fontWeight: 800 }}>
                  Browse Catalog ›
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
                {savedProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="ios-card"
                    style={{
                      borderRadius: "20px",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ position: "relative", height: "160px" }}>
                      <img src={prop.images[0]} alt={prop.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button
                        onClick={() => handleRemoveWishlist(prop.id)}
                        title="Remove from saved"
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "rgba(255, 255, 255, 0.9)",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <IconHeart size={16} color="var(--crimson-red)" filled={true} />
                      </button>
                    </div>

                    <div style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>{prop.city}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontSize: "0.8rem", fontWeight: 700 }}>
                          <IconStar size={13} color="#FF9500" />
                          <span>{prop.rating}</span>
                        </div>
                      </div>

                      <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)" }}>{prop.title}</h4>
                      <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{prop.address}</p>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "0.75rem", borderTop: "1px solid var(--border-color)" }}>
                        <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#007AFF" }}>
                          ₹{(prop.startingPrice ?? prop.minPrice ?? 0).toLocaleString("en-IN")}<span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>/mo</span>
                        </div>
                        <Link
                          href={`/listings/${prop.id}`}
                          className="ios-pill-btn ios-pill-btn-solid"
                          style={{ background: "#007AFF", color: "#FFFFFF", padding: "0.35rem 0.95rem", fontSize: "0.78rem", fontWeight: 700 }}
                        >
                          View ›
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Scheduled Visits */}
        {activeTab === "visits" && (
          <div>
            {visits.length === 0 ? (
              <div className="ios-card" style={{ padding: "4rem 2rem", textAlign: "center", borderRadius: "20px", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                <IconCalendar size={40} color="var(--text-muted)" style={{ margin: "0 auto 1rem" }} />
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  No scheduled walkthroughs
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                  Schedule a free physical walkthrough or live video tour on any listing detail page.
                </p>
                <Link href="/listings" className="ios-pill-btn ios-pill-btn-solid" style={{ background: "#007AFF", color: "#FFFFFF", padding: "0.6rem 1.6rem", fontWeight: 800 }}>
                  Explore Stays ›
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {visits.map((v) => (
                  <div
                    key={v.id}
                    className="ios-card"
                    style={{
                      padding: "1.25rem 1.5rem",
                      borderRadius: "18px",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        <span style={{ fontSize: "0.72rem", padding: "0.15rem 0.5rem", borderRadius: "var(--radius-pill)", background: "var(--apple-blue-light)", color: "#007AFF", fontWeight: 700 }}>
                          {v.visitType}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "#34C759", fontWeight: 700 }}>
                          • {v.status}
                        </span>
                      </div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)" }}>
                        {v.propertyTitle}
                      </h4>
                      <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                        {v.propertyAddress}
                      </p>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "var(--text-primary)" }}>
                        {v.date}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                        {v.timeSlot}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Payments & Receipts */}
        {activeTab === "payments" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="ios-card" style={{ padding: "1.5rem", borderRadius: "20px", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  Payment History & Escrow Deposits
                </h3>
                <span style={{ fontSize: "0.75rem", color: "#34C759", fontWeight: 700 }}>
                  0% Brokerage Guarantee
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div style={{
                  padding: "1rem",
                  borderRadius: "14px",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9rem" }}>
                      Sunrise Heights Luxury Stay — Move-In & Security Deposit
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                      UPI Auto-Verified • TXN_DPG_849201 • 17 Oct 2026
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 800, color: "#007AFF", fontSize: "1rem" }}>₹29,000</div>
                      <div style={{ fontSize: "0.72rem", color: "#34C759", fontWeight: 600 }}>Settled</div>
                    </div>
                    <button
                      onClick={() => toast.success("Tax Invoice & Rent Receipt PDF downloaded.")}
                      style={{
                        padding: "0.35rem 0.8rem",
                        borderRadius: "var(--radius-pill)",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Receipt
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Ratings & Reviews */}
        {activeTab === "reviews" && (
          <div className="ios-card" style={{ padding: "1.75rem", borderRadius: "20px", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
              My Tenant Reviews
            </h3>
            <div style={{
              padding: "1.25rem",
              borderRadius: "16px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem" }}>Sunrise Heights Luxury Stay</span>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[...Array(5)].map((_, i) => (
                    <IconStar key={i} size={14} color="#FF9500" />
                  ))}
                </div>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                &ldquo;Exceptional property! The WiFi is truly 300 Mbps, food tastes like home, and Mr. Lakshmi is extremely accommodating. Biometric keyless entry makes late college projects effortless.&rdquo;
              </p>
              <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                Verified Stay Review • 17 Oct 2026
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: KYC Pass */}
        {activeTab === "kyc" && (
          <div className="ios-card" style={{ padding: "2rem", borderRadius: "22px", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Digital Aadhaar e-KYC
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Your verified identity grants you instant 0% brokerage bookings across all 50,000+ DirectPG properties in India.
            </p>

            <div style={{
              padding: "1.25rem",
              borderRadius: "16px",
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <IconShieldCheck size={28} color="#34C759" />
                <div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--text-primary)" }}>
                    Aadhaar Status: Active & Verified
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontFamily: "monospace" }}>
                    UIDAI Pass Ref: DPG-KYC-94821
                  </div>
                </div>
              </div>
              <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#34C759" }}>100% Safe</span>
            </div>

            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              All contracts signed on DirectPG are backed by standard 11-month electronic leases recognized by Indian tenancy law. Security deposits are kept protected in verified landlord escrows.
            </div>
          </div>
        )}

        {/* TAB 7: Account Settings */}
        {activeTab === "settings" && (
          <div className="ios-card" style={{ padding: "2rem", borderRadius: "22px", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.25rem" }}>
              Account & Profile Settings
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.9rem",
                    borderRadius: "12px",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.88rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.9rem",
                    borderRadius: "12px",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-muted)",
                    fontSize: "0.88rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.9rem",
                    borderRadius: "12px",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.88rem",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid var(--border-color)" }}>
                <button
                  type="button"
                  onClick={handleSignOut}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.5rem 1.1rem",
                    borderRadius: "var(--radius-pill)",
                    background: "rgba(255, 59, 48, 0.1)",
                    color: "#FF3B30",
                    border: "1px solid rgba(255, 59, 48, 0.2)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <IconLogOut size={14} color="#FF3B30" />
                  <span>Sign Out</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentUser(user);
                    toast.success("Profile changes saved.");
                  }}
                  className="ios-pill-btn ios-pill-btn-solid"
                  style={{ padding: "0.55rem 1.5rem", fontSize: "0.85rem" }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center" }}>Loading Profile...</div>}>
      <ProfileContent />
    </Suspense>
  );
}
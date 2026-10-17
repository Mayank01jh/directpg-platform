"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getAllCombinedProperties,
  PGProperty,
} from "@/lib/mockData";
import {
  getStoredBookings,
  getStoredVisits,
  BookingRecord,
  VisitRecord,
} from "@/lib/userDataStore";
import {
  IconBuilding,
  IconCheck,
  IconTrendingUp,
  IconRupee,
  IconCalendar,
  IconUser,
  IconMapPin,
  IconPhone,
  IconArrowRight,
  IconPlus,
} from "@/components/ui/Icons";
import toast from "react-hot-toast";

export default function OwnerDashboardPage() {
  const [properties, setProperties] = useState<PGProperty[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [visits, setVisits] = useState<VisitRecord[]>([]);
  const [approvedList, setApprovedList] = useState<string[]>([]);

  useEffect(() => {
    setProperties(getAllCombinedProperties());
    setBookings(getStoredBookings());
    setVisits(getStoredVisits());
  }, []);

  const handleApproveBooking = (id: string) => {
    setApprovedList((prev) => [...prev, id]);
    toast.success("Booking approved! Biometric pass sent to tenant.");
  };

  // Metrics
  const totalListings = properties.length;
  const totalBeds = totalListings * 12;
  const occupiedBeds = Math.round(totalBeds * 0.91);
  const totalRevenue = properties.reduce((acc, curr) => acc + (curr.startingPrice || curr.minPrice || 0) * 4, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header Greeting */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
            Welcome back, Lakshmi
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Real-time occupancy, direct UPI settlement logs, and tenant inquiries for your PG properties.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={() => toast.success("Rent collection report downloaded successfully.")}
            className="ios-pill-btn"
            style={{ fontSize: "0.82rem", padding: "0.5rem 1.1rem" }}
          >
            Export Ledger
          </button>
          <Link
            href="/my-properties/add"
            className="ios-pill-btn ios-pill-btn-solid"
            style={{ fontSize: "0.82rem", padding: "0.5rem 1.15rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            <IconPlus size={15} color="#FFFFFF" />
            <span>List New PG</span>
          </Link>
        </div>
      </div>

      {/* 4 Spotlight Metric Cards (60:30:10 Design System) */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.25rem",
      }}>
        {/* Metric 1 */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "18px",
          padding: "1.4rem",
          border: "1px solid var(--border-color)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Occupancy Rate
            </span>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--apple-blue-light)", color: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconTrendingUp size={18} color="#007AFF" />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>
            91.4%
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
            {occupiedBeds} of {totalBeds} total beds occupied
          </div>
        </div>

        {/* Metric 2 */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "18px",
          padding: "1.4rem",
          border: "1px solid var(--border-color)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Monthly Gross Rent
            </span>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--apple-blue-light)", color: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconRupee size={18} color="#007AFF" />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>
            ₹{(totalRevenue).toLocaleString("en-IN")}
          </div>
          <div style={{ fontSize: "0.8rem", color: "#34C759", marginTop: "0.4rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <IconCheck size={14} color="#34C759" /> 100% Direct bank settlement
          </div>
        </div>

        {/* Metric 3 */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "18px",
          padding: "1.4rem",
          border: "1px solid var(--border-color)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Active Properties
            </span>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--apple-blue-light)", color: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconBuilding size={18} color="#007AFF" />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>
            {totalListings}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
            All verified with 0% brokerage badge
          </div>
        </div>

        {/* Metric 4 */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "18px",
          padding: "1.4rem",
          border: "1px solid var(--border-color)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Upcoming Visits
            </span>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--apple-blue-light)", color: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconCalendar size={18} color="#007AFF" />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>
            {visits.length + 2}
          </div>
          <div style={{ fontSize: "0.8rem", color: "#007AFF", marginTop: "0.4rem", fontWeight: 600 }}>
            Scheduled tours this week
          </div>
        </div>
      </div>

      {/* Main Grid: Pending Approvals & Scheduled Visits */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "1.5rem" }}>
        {/* Bookings / Inquiries List */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "20px",
          padding: "1.5rem",
          border: "1px solid var(--border-color)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Tenant Bookings & Inquiries
            </h2>
            <Link href="/bookings" style={{ fontSize: "0.8rem", color: "#007AFF", fontWeight: 600, textDecoration: "none" }}>
              View All ({bookings.length})
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {bookings.length === 0 ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                No active bookings yet.
              </div>
            ) : (
              bookings.slice(0, 3).map((b) => {
                const isApproved = approvedList.includes(b.bookingId);
                return (
                  <div
                    key={b.bookingId}
                    style={{
                      padding: "1rem",
                      borderRadius: "14px",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "0.75rem",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                          {b.tenantName}
                        </span>
                        <span style={{ fontSize: "0.72rem", padding: "0.15rem 0.5rem", borderRadius: "4px", background: "var(--apple-blue-light)", color: "#007AFF", fontWeight: 600 }}>
                          {b.roomType}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                        Move-in: {b.moveInDate} • ₹{b.monthlyRent.toLocaleString("en-IN")}/mo
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {isApproved ? (
                        <span style={{ fontSize: "0.8rem", color: "#34C759", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <IconCheck size={14} color="#34C759" /> Confirmed
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApproveBooking(b.bookingId)}
                          style={{
                            padding: "0.35rem 0.85rem",
                            borderRadius: "var(--radius-pill)",
                            background: "#007AFF",
                            color: "#FFFFFF",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          Approve Move-In
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Scheduled Visits */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "20px",
          padding: "1.5rem",
          border: "1px solid var(--border-color)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Scheduled Property Walkthroughs
            </h2>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Direct Leads
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {visits.map((v) => (
              <div
                key={v.id}
                style={{
                  padding: "1rem",
                  borderRadius: "14px",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {v.tenantName} ({v.visitType})
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                    Slot: {v.date} at {v.timeSlot}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                    {v.propertyTitle}
                  </div>
                </div>

                <a
                  href={`tel:${v.tenantPhone}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.35rem 0.85rem",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    textDecoration: "none",
                  }}
                >
                  <IconPhone size={13} color="#007AFF" />
                  <span>Call Tenant</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Properties Quick Roster */}
      <div className="ios-card" style={{
        background: "var(--bg-card)",
        borderRadius: "20px",
        padding: "1.75rem",
        border: "1px solid var(--border-color)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>
              My Managed PG Stays
            </h2>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
              Active live listings verified with instant digital lease support.
            </p>
          </div>

          <Link href="/my-properties" style={{ fontSize: "0.82rem", color: "#007AFF", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
            <span>Manage All ({properties.length})</span>
            <IconArrowRight size={14} color="#007AFF" />
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {properties.slice(0, 3).map((p) => (
            <div
              key={p.id}
              style={{
                borderRadius: "16px",
                border: "1px solid var(--border-color)",
                overflow: "hidden",
                background: "var(--bg-secondary)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ position: "relative", height: "140px", overflow: "hidden" }}>
                <img
                  src={p.images[0]}
                  alt={p.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "var(--radius-pill)",
                  background: "rgba(0,0,0,0.75)",
                  backdropFilter: "blur(8px)",
                  color: "#FFFFFF",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                }}>
                  {p.gender === "female" ? "Girls PG" : p.gender === "male" ? "Boys PG" : "Unisex"}
                </span>
                <span style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "var(--radius-pill)",
                  background: "#34C759",
                  color: "#FFFFFF",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                }}>
                  Live (94% Full)
                </span>
              </div>

              <div style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.4rem", flex: 1 }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  {p.title}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                  <IconMapPin size={13} color="var(--text-muted)" />
                  <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {p.address}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-color)" }}>
                  <div>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Starts at</span>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#007AFF" }}>
                      ₹{(p.startingPrice || p.minPrice || 0).toLocaleString("en-IN")}/mo
                    </div>
                  </div>
                  <Link
                    href={`/listings/${p.id}`}
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      background: "var(--bg-card)",
                      padding: "0.35rem 0.85rem",
                      borderRadius: "var(--radius-pill)",
                      border: "1px solid var(--border-color)",
                      textDecoration: "none",
                    }}
                  >
                    View Listing
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
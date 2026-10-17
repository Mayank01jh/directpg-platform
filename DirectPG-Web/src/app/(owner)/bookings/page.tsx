"use client";
import { useState, useEffect } from "react";
import { getStoredBookings, BookingRecord } from "@/lib/userDataStore";
import {
  IconCalendar,
  IconCheck,
  IconPhone,
  IconShieldCheck,
  IconLock,
  IconFileText,
  IconUser,
  IconBuilding,
} from "@/components/ui/Icons";
import toast from "react-hot-toast";

export default function OwnerBookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | "confirmed" | "completed">("all");

  useEffect(() => {
    setBookings(getStoredBookings());
    const handleUpdate = () => setBookings(getStoredBookings());
    window.addEventListener("bookings-updated", handleUpdate);
    return () => window.removeEventListener("bookings-updated", handleUpdate);
  }, []);

  const handleSendSmartLockCode = (b: BookingRecord) => {
    toast.success(`Biometric Access PIN #4892* sent to ${b.tenantName} (${b.tenantPhone}) via SMS.`);
  };

  const handleDownloadReceipt = (b: BookingRecord) => {
    toast.success(`Rent & Deposit Receipt for ${b.bookingId} downloaded.`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
            Tenant Bookings & Leases
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Verified Aadhaar e-KYC records, move-in passes, and direct rent tracking.
          </p>
        </div>

        <button
          onClick={() => toast.success("All lease agreements exported as ZIP archive.")}
          className="ios-pill-btn"
          style={{ fontSize: "0.82rem", padding: "0.5rem 1.15rem" }}
        >
          Export Tenant Register
        </button>
      </div>

      {/* Bookings List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {bookings.length === 0 ? (
          <div className="ios-card" style={{
            background: "var(--bg-card)",
            borderRadius: "20px",
            padding: "4rem 2rem",
            textAlign: "center",
            border: "1px solid var(--border-color)",
          }}>
            <IconCalendar size={36} color="var(--text-muted)" style={{ margin: "0 auto 1rem" }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
              No Tenant Bookings Yet
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.35rem" }}>
              When tenants book your rooms online, their verified agreements and move-in passes will appear here.
            </p>
          </div>
        ) : (
          bookings.map((b) => (
            <div
              key={b.bookingId}
              className="ios-card"
              style={{
                background: "var(--bg-card)",
                borderRadius: "20px",
                padding: "1.5rem",
                border: "1px solid var(--border-color)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Card Header */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.75rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid var(--border-color)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
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
                    {b.tenantName.charAt(0)}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        {b.tenantName}
                      </span>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "var(--radius-pill)",
                        background: "#E8F8EE",
                        color: "#34C759",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                      }}>
                        <IconShieldCheck size={12} color="#34C759" /> KYC Verified
                      </span>
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                      Aadhaar: {b.tenantAadhaar} • Phone: {b.tenantPhone}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={{
                    padding: "0.3rem 0.8rem",
                    borderRadius: "var(--radius-pill)",
                    background: "#007AFF",
                    color: "#FFFFFF",
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    display: "inline-block",
                  }}>
                    Booking #{b.bookingId}
                  </span>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                    Booked on {b.bookedAt}
                  </div>
                </div>
              </div>

              {/* Booking Data Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1rem",
                fontSize: "0.85rem",
              }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                    Assigned Property
                  </span>
                  <strong style={{ color: "var(--text-primary)" }}>{b.propertyTitle}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{b.propertyAddress}</div>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                    Room Plan & Type
                  </span>
                  <strong style={{ color: "var(--text-primary)" }}>{b.roomName}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{b.roomType}</div>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                    Move-In & Duration
                  </span>
                  <strong style={{ color: "var(--text-primary)" }}>{b.moveInDate}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Lease: {b.stayDuration}</div>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                    Monthly Rent & Deposit
                  </span>
                  <strong style={{ color: "#007AFF", fontSize: "1rem" }}>
                    ₹{b.monthlyRent.toLocaleString("en-IN")}/mo
                  </strong>
                  <div style={{ fontSize: "0.75rem", color: "#34C759", fontWeight: 600 }}>
                    ₹{b.depositAmount.toLocaleString("en-IN")} Deposit Paid
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.75rem",
                paddingTop: "1rem",
                borderTop: "1px solid var(--border-color)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  <IconLock size={15} color="#007AFF" />
                  <span>Biometric Smart Lock PIN: <strong>#4892*</strong></span>
                </div>

                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <a
                    href={`tel:${b.tenantPhone}`}
                    style={{
                      padding: "0.42rem 0.95rem",
                      borderRadius: "var(--radius-pill)",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <IconPhone size={14} color="#007AFF" />
                    <span>Call Tenant</span>
                  </a>

                  <button
                    onClick={() => handleSendSmartLockCode(b)}
                    style={{
                      padding: "0.42rem 0.95rem",
                      borderRadius: "var(--radius-pill)",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <IconLock size={14} color="#007AFF" />
                    <span>Resend PIN</span>
                  </button>

                  <button
                    onClick={() => handleDownloadReceipt(b)}
                    style={{
                      padding: "0.42rem 1.1rem",
                      borderRadius: "var(--radius-pill)",
                      background: "#007AFF",
                      color: "#FFFFFF",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <IconFileText size={14} color="#FFFFFF" />
                    <span>Rent Receipt</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
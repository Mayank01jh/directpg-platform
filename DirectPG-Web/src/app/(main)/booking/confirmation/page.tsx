"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getStoredBookings, BookingRecord } from "@/lib/userDataStore";
import {
  IconCheck,
  IconShieldCheck,
  IconCalendar,
  IconMapPin,
  IconPhone,
  IconLock,
  IconBuilding,
  IconSparkles,
} from "@/components/ui/Icons";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const [booking, setBooking] = useState<BookingRecord | null>(null);

  useEffect(() => {
    const list = getStoredBookings();
    if (bookingId) {
      const found = list.find((b) => b.bookingId === bookingId);
      if (found) setBooking(found);
      else if (list.length > 0) setBooking(list[0]);
    } else if (list.length > 0) {
      setBooking(list[0]);
    }
  }, [bookingId]);

  if (!booking) {
    return (
      <div style={{ padding: "6rem 2rem", textAlign: "center" }}>
        <p style={{ color: "var(--text-secondary)" }}>Loading Confirmed Booking...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2.5rem 0 5rem", minHeight: "85vh" }}>
      <div className="app-container" style={{ maxWidth: "680px" }}>
        {/* Success Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "rgba(52, 199, 89, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}>
            <IconCheck size={32} color="#34C759" strokeWidth={3} />
          </div>

          <span style={{
            fontSize: "0.74rem",
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: "#34C759",
            textTransform: "uppercase",
          }}>
            BOOKING CONFIRMED & PROTECTED
          </span>

          <h1 style={{
            fontSize: "clamp(1.75rem, 3.5vw, 2.4rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginTop: "0.25rem",
            marginBottom: "0.5rem",
          }}>
            You&apos;re All Set to Move In!
          </h1>
          <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)" }}>
            Booking ID: <strong style={{ color: "var(--text-primary)", fontFamily: "monospace" }}>{booking.bookingId}</strong>
          </p>
        </div>

        {/* Digital Move-In Pass (Apple Wallet boarding pass style) */}
        <div
          className="ios-card"
          style={{
            borderRadius: "24px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          {/* Top Notch Header */}
          <div style={{
            background: "linear-gradient(135deg, #007AFF, #0056b3)",
            padding: "1.5rem",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div>
              <span style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.85 }}>
                DIGITAL MOVE-IN PASS
              </span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF", marginTop: "0.15rem" }}>
                {booking.propertyTitle}
              </h3>
            </div>
            <div style={{
              padding: "0.25rem 0.75rem",
              borderRadius: "var(--radius-pill)",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              fontSize: "0.72rem",
              fontWeight: 800,
            }}>
              0% BROKERAGE
            </div>
          </div>

          {/* Details Body */}
          <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Room & Occupancy</span>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.15rem" }}>
                  {booking.roomName}
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Move-In Date</span>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.15rem" }}>
                  {booking.moveInDate}
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Tenant Name</span>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.15rem" }}>
                  {booking.tenantName}
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Monthly Rent</span>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#007AFF", marginTop: "0.15rem" }}>
                  ₹{booking.monthlyRent.toLocaleString()} /mo
                </div>
              </div>
            </div>

            {/* Smart Keyless Door Code */}
            <div style={{
              padding: "1rem 1.25rem",
              borderRadius: "16px",
              background: "var(--bg-tertiary)",
              border: "1px dashed var(--border-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <IconLock size={20} color="#007AFF" />
                <div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
                    Biometric Smart Door Access Code
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "0.15em", fontFamily: "monospace" }}>
                    #4892*
                  </div>
                </div>
              </div>
              <span style={{ fontSize: "0.72rem", color: "#34C759", fontWeight: 700 }}>Active on Move-in</span>
            </div>

            {/* Owner Contact */}
            <div style={{
              paddingTop: "1rem",
              borderTop: "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontSize: "0.74rem", color: "var(--text-secondary)" }}>Direct Property Host</div>
                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--text-primary)" }}>{booking.ownerName}</div>
              </div>

              <a
                href={`tel:${booking.ownerPhone.replace(/[^0-9+]/g, "")}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  color: "#007AFF",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <IconPhone size={14} color="#007AFF" /> Call Host
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link
            href="/profile"
            className="ios-pill-btn ios-pill-btn-solid"
            style={{
              flex: 1,
              padding: "0.8rem",
              fontSize: "0.92rem",
              fontWeight: 800,
              background: "#007AFF",
              color: "#FFFFFF",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            View in My Profile ›
          </Link>

          <Link
            href="/listings"
            className="ios-pill-btn"
            style={{
              flex: 1,
              padding: "0.8rem",
              fontSize: "0.92rem",
              fontWeight: 700,
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            Explore More PGs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center" }}>Loading Confirmation Pass...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
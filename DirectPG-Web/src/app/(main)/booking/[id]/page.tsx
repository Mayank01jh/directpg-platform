"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPropertyById, PGProperty } from "@/lib/mockData";
import { addStoredBooking, getCurrentUser } from "@/lib/userDataStore";
import {
  IconCheck,
  IconLock,
  IconShieldCheck,
  IconMapPin,
  IconCalendar,
  IconUser,
  IconRupee,
  IconSparkles,
} from "@/components/ui/Icons";

export default function BookingFlowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [property, setProperty] = useState<PGProperty | null>(null);

  // Flow State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [moveInDate, setMoveInDate] = useState("2026-11-01");
  const [duration, setDuration] = useState("6 Months");
  const [mealPlan, setMealPlan] = useState("Included Full Meals");

  // Tenant & KYC state
  const [tenantName, setTenantName] = useState("Mayank Sharma");
  const [tenantPhone, setTenantPhone] = useState("+91 98765 43210");
  const [aadhaarNumber, setAadhaarNumber] = useState("5829-4102-4921");
  const [kycVerified, setKycVerified] = useState(true);

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState("UPI Instant QR");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const found = getPropertyById(id) || getPropertyById("1");
    if (found) {
      setProperty(found);
      if (found.roomPlans.length > 0) {
        setSelectedPlanId(found.roomPlans[0].id);
      }
    }
  }, [id]);

  if (!property) {
    return (
      <div style={{ padding: "6rem 2rem", textAlign: "center" }}>
        <p style={{ color: "var(--text-secondary)" }}>Loading Property Booking...</p>
      </div>
    );
  }

  const selectedPlan = property.roomPlans.find((r) => r.id === selectedPlanId) || property.roomPlans[0];
  const rent = selectedPlan ? selectedPlan.price : property.minPrice;
  const deposit = selectedPlan ? selectedPlan.deposit : property.minPrice;
  const total = rent + deposit;

  const handleCompleteBooking = () => {
    setIsProcessing(true);

    const bookingId = `DPG-${property.city.slice(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newBooking = {
      bookingId,
      propertyId: property.id,
      propertyTitle: property.title,
      propertyAddress: property.address,
      propertyImage: property.images[0],
      roomName: selectedPlan.name,
      roomType: selectedPlan.type === "single" ? "Single Occupancy AC" : selectedPlan.type === "double" ? "Double Sharing AC" : "Triple Sharing",
      monthlyRent: rent,
      depositAmount: deposit,
      moveInDate,
      stayDuration: duration,
      tenantName,
      tenantPhone,
      tenantAadhaar: aadhaarNumber,
      paymentMethod,
      status: "Confirmed" as const,
      bookedAt: new Date().toISOString().split("T")[0],
      ownerName: property.owner.name,
      ownerPhone: property.owner.phone,
    };

    setTimeout(() => {
      addStoredBooking(newBooking);
      setIsProcessing(false);
      router.push(`/booking/confirmation?id=${bookingId}`);
    }, 1500);
  };

  return (
    <div style={{ padding: "2rem 0 5rem", minHeight: "85vh" }}>
      <div className="app-container" style={{ maxWidth: "860px" }}>
        {/* Breadcrumbs */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.78rem",
          color: "var(--text-secondary)",
          marginBottom: "1.5rem",
        }}>
          <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link href={`/listings/${property.id}`} style={{ color: "var(--text-secondary)", textDecoration: "none" }}>{property.title}</Link>
          <span>›</span>
          <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>Direct Booking</span>
        </div>

        {/* Step Indicator Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid var(--border-color)",
        }}>
          <div>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#007AFF", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              STEP {step} OF 3
            </span>
            <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", marginTop: "0.15rem" }}>
              {step === 1 ? "Choose Room & Move-in Details" : step === 2 ? "Tenant KYC & e-Agreement" : "Review & Secure Move-In Payment"}
            </h1>
          </div>

          <div style={{ display: "flex", gap: "0.35rem" }}>
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: step >= s ? "#007AFF" : "var(--bg-tertiary)",
                  color: step >= s ? "#FFFFFF" : "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  transition: "all 0.25s ease",
                }}
              >
                {step > s ? "✓" : s}
              </div>
            ))}
          </div>
        </div>

        {/* Property Mini Banner */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem 1.25rem",
          borderRadius: "16px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          marginBottom: "1.75rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        }}>
          <img
            src={property.images[0]}
            alt={property.title}
            style={{ width: 64, height: 64, borderRadius: "12px", objectFit: "cover" }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h4 style={{ fontSize: "0.96rem", fontWeight: 800, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {property.title}
            </h4>
            <div style={{ fontSize: "0.76rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <IconMapPin size={12} color="#007AFF" />
              <span>{property.address}</span>
            </div>
          </div>
          <div style={{
            padding: "0.22rem 0.65rem",
            borderRadius: "var(--radius-pill)",
            background: "rgba(52, 199, 89, 0.1)",
            color: "#34C759",
            fontSize: "0.72rem",
            fontWeight: 700,
            flexShrink: 0,
          }}>
            0% BROKERAGE
          </div>
        </div>

        {/* STEP 1: Room & Move-in Selection */}
        {step === 1 && (
          <div className="ios-card" style={{ padding: "1.75rem", borderRadius: "22px", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
              1. Select Room Type & Occupancy
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.5rem" }}>
              {property.roomPlans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    style={{
                      padding: "1rem 1.25rem",
                      borderRadius: "14px",
                      border: isSelected ? "2px solid #007AFF" : "1px solid var(--border-color)",
                      background: isSelected ? "rgba(0, 122, 255, 0.04)" : "var(--bg-card)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)" }}>{plan.name}</span>
                        <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-secondary)", background: "var(--bg-tertiary)", padding: "0.15rem 0.45rem", borderRadius: "6px" }}>
                          {plan.availableBeds} Available
                        </span>
                      </div>
                      <div style={{ fontSize: "0.74rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                        {plan.features.join(" • ")}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)" }}>
                        ₹{plan.price.toLocaleString()}/mo
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Move-in Date & Duration */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.35rem", textTransform: "uppercase" }}>
                  Expected Move-In Date
                </label>
                <input
                  type="date"
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
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
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.35rem", textTransform: "uppercase" }}>
                  Stay Commitment
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
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
                  <option value="3 Months">3 Months Minimum</option>
                  <option value="6 Months">6 Months (Recommended)</option>
                  <option value="11 Months">11 Months Standard Lease</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="ios-pill-btn ios-pill-btn-solid"
              style={{
                width: "100%",
                padding: "0.8rem",
                fontSize: "0.95rem",
                fontWeight: 800,
                background: "#007AFF",
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              Continue to Tenant KYC ›
            </button>
          </div>
        )}

        {/* STEP 2: Tenant KYC & e-Agreement */}
        {step === 2 && (
          <div className="ios-card" style={{ padding: "1.75rem", borderRadius: "22px", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
              2. Instant Tenant Aadhaar e-KYC
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
              DirectPG requires instant digital verification to safeguard all co-living residents and guarantee 0% brokerage.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.35rem", textTransform: "uppercase" }}>
                  Full Legal Name (as on Aadhaar)
                </label>
                <input
                  type="text"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "12px",
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                    fontSize: "0.85rem",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.35rem", textTransform: "uppercase" }}>
                  Primary Phone Number
                </label>
                <input
                  type="text"
                  value={tenantPhone}
                  onChange={(e) => setTenantPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "12px",
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                    fontSize: "0.85rem",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.35rem", textTransform: "uppercase" }}>
                  Aadhaar Number (UIDAI Secured)
                </label>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "12px",
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                }}>
                  <input
                    type="text"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      fontFamily: "monospace",
                      width: "80%",
                    }}
                  />
                  <span style={{ fontSize: "0.72rem", color: "#34C759", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.2rem" }}>
                    <IconCheck size={12} color="#34C759" strokeWidth={3} /> VERIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* Digital Agreement Notice */}
            <div style={{
              padding: "1rem",
              borderRadius: "14px",
              background: "rgba(0, 122, 255, 0.05)",
              border: "1px solid rgba(0, 122, 255, 0.2)",
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
              marginBottom: "1.5rem",
            }}>
              <strong style={{ color: "#007AFF" }}>DirectPG Digital Agreement:</strong> By proceeding, a standard 11-month electronic rent agreement will be auto-generated between you and {property.owner.name} with 100% refundable security deposit protection.
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="ios-pill-btn"
                style={{ padding: "0.75rem 1.5rem", fontSize: "0.88rem", fontWeight: 700 }}
              >
                ‹ Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="ios-pill-btn ios-pill-btn-solid"
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  background: "#007AFF",
                  color: "#FFFFFF",
                }}
              >
                Proceed to Review & Pay ›
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Review & Payment Simulation */}
        {step === 3 && (
          <div className="ios-card" style={{ padding: "1.75rem", borderRadius: "22px", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
              3. Final Summary & Instant Move-In Payment
            </h3>

            {/* Breakdown Table */}
            <div style={{
              borderRadius: "16px",
              background: "var(--bg-tertiary)",
              padding: "1.25rem",
              marginBottom: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              fontSize: "0.85rem",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Property:</span>
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{property.title}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Room Type:</span>
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{selectedPlan.name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Move-In Date:</span>
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{moveInDate} ({duration})</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Monthly Rent:</span>
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>₹{rent.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Refundable Security Deposit:</span>
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>₹{deposit.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Brokerage Commission:</span>
                <span style={{ fontWeight: 800, color: "#34C759" }}>₹0 FREE (Saved ₹15,000)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Move-in Pass & Agreement:</span>
                <span style={{ fontWeight: 800, color: "#34C759" }}>₹0 FREE</span>
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "0.75rem",
                marginTop: "0.25rem",
                borderTop: "1px solid var(--border-color)",
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "var(--text-primary)",
              }}>
                <span>Total Due Today:</span>
                <span style={{ color: "#007AFF" }}>₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div style={{ marginBottom: "1.75rem" }}>
              <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                Select Instant Payment Option
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.6rem" }}>
                {["UPI Instant QR", "NetBanking", "Credit / Debit Card"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    style={{
                      padding: "0.75rem",
                      borderRadius: "12px",
                      border: paymentMethod === method ? "2px solid #007AFF" : "1px solid var(--border-color)",
                      background: paymentMethod === method ? "rgba(0, 122, 255, 0.05)" : "var(--bg-tertiary)",
                      color: paymentMethod === method ? "#007AFF" : "var(--text-primary)",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="ios-pill-btn"
                style={{ padding: "0.75rem 1.5rem", fontSize: "0.88rem", fontWeight: 700 }}
              >
                ‹ Back
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleCompleteBooking}
                className="ios-pill-btn ios-pill-btn-solid"
                style={{
                  flex: 1,
                  padding: "0.85rem",
                  fontSize: "1rem",
                  fontWeight: 800,
                  background: "#007AFF",
                  color: "#FFFFFF",
                  cursor: isProcessing ? "not-allowed" : "pointer",
                  opacity: isProcessing ? 0.75 : 1,
                }}
              >
                {isProcessing ? "Processing Secure Payment..." : `Pay ₹${total.toLocaleString()} & Confirm Booking ›`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
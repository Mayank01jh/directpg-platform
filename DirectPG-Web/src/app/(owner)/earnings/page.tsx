"use client";
import { useState } from "react";
import {
  IconRupee,
  IconCheck,
  IconTrendingUp,
  IconCreditCard,
  IconShieldCheck,
  IconFileText,
} from "@/components/ui/Icons";
import toast from "react-hot-toast";

export default function OwnerEarningsPage() {
  const [bankAccount, setBankAccount] = useState({
    bank: "HDFC Bank Ltd.",
    accountNumber: "•••• •••• •••• 8492",
    ifsc: "HDFC0001842",
    accountHolder: "Lakshmi Narayanan",
    autoSettle: true,
  });

  const settlements = [
    {
      id: "SET-94821",
      date: "17 Oct 2026",
      tenant: "Mayank Sharma",
      property: "Sunrise Heights Luxury Stay",
      amount: 29000,
      type: "First Month Rent + Deposit",
      utr: "UTR84928109482",
      status: "Settled to Bank",
    },
    {
      id: "SET-94112",
      date: "05 Oct 2026",
      tenant: "Rohan Malhotra",
      property: "Sunrise Heights Luxury Stay",
      amount: 14500,
      type: "Monthly Rent",
      utr: "UTR84921094811",
      status: "Settled to Bank",
    },
    {
      id: "SET-93881",
      date: "01 Oct 2026",
      tenant: "Priya Varma",
      property: "Urban Nest Co-Living",
      amount: 16000,
      type: "Monthly Rent",
      utr: "UTR84910948210",
      status: "Settled to Bank",
    },
    {
      id: "SET-93104",
      date: "28 Sep 2026",
      tenant: "Ananya Iyer",
      property: "Sunrise Heights Luxury Stay",
      amount: 14500,
      type: "Monthly Rent",
      utr: "UTR84891048291",
      status: "Settled to Bank",
    },
  ];

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
            Earnings & Direct Bank Payouts
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            100% direct settlement to your verified bank account with zero middleman commissions.
          </p>
        </div>

        <button
          onClick={() => toast.success("Annual Tax & Payout Summary exported.")}
          className="ios-pill-btn"
          style={{ fontSize: "0.82rem", padding: "0.5rem 1.15rem" }}
        >
          Download Tax Summary
        </button>
      </div>

      {/* Spotlight Cards (60:30:10) */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.25rem",
      }}>
        {/* Total Settled */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "20px",
          padding: "1.5rem",
          border: "1px solid var(--border-color)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase" }}>
              Total Settled (FY 2026)
            </span>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--apple-blue-light)", color: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconRupee size={18} color="#007AFF" />
            </div>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>
            ₹14,80,000
          </div>
          <div style={{ fontSize: "0.8rem", color: "#34C759", marginTop: "0.4rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <IconCheck size={14} color="#34C759" /> 100% On-time UPI direct payouts
          </div>
        </div>

        {/* Brokerage Saved */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "20px",
          padding: "1.5rem",
          border: "1px solid var(--border-color)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase" }}>
              Brokerage Fee Saved
            </span>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--apple-blue-light)", color: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconShieldCheck size={18} color="#007AFF" />
            </div>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#007AFF", lineHeight: 1.1 }}>
            ₹1,48,000
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.4rem" }}>
            Compared to traditional 1-month broker commission
          </div>
        </div>

        {/* Settlement Account */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "20px",
          padding: "1.5rem",
          border: "1px solid var(--border-color)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase" }}>
              Active Settlement Bank
            </span>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--apple-blue-light)", color: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconCreditCard size={18} color="#007AFF" />
            </div>
          </div>
          <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2 }}>
            {bankAccount.bank}
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
            A/C: {bankAccount.accountNumber} • {bankAccount.ifsc}
          </div>
        </div>
      </div>

      {/* Settlements Table */}
      <div className="ios-card" style={{
        background: "var(--bg-card)",
        borderRadius: "20px",
        padding: "1.75rem",
        border: "1px solid var(--border-color)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Payout Settlement History
            </h2>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
              Instant RTGS / IMPS settlements triggered upon tenant digital booking.
            </p>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-secondary)", fontSize: "0.78rem" }}>
                <th style={{ padding: "0.75rem 0.5rem" }}>TRANSACTION</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>DATE</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>TENANT & PROPERTY</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>TYPE</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>AMOUNT</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>STATUS</th>
                <th style={{ padding: "0.75rem 0.5rem", textAlign: "right" }}>RECEIPT</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((s) => (
                <tr key={s.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "1rem 0.5rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {s.id}
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 400 }}>{s.utr}</div>
                  </td>
                  <td style={{ padding: "1rem 0.5rem", color: "var(--text-secondary)" }}>
                    {s.date}
                  </td>
                  <td style={{ padding: "1rem 0.5rem" }}>
                    <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{s.tenant}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{s.property}</div>
                  </td>
                  <td style={{ padding: "1rem 0.5rem", color: "var(--text-secondary)" }}>
                    {s.type}
                  </td>
                  <td style={{ padding: "1rem 0.5rem", fontWeight: 800, color: "#007AFF" }}>
                    ₹{s.amount.toLocaleString("en-IN")}
                  </td>
                  <td style={{ padding: "1rem 0.5rem" }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "var(--radius-pill)",
                      background: "#E8F8EE",
                      color: "#34C759",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                    }}>
                      <IconCheck size={12} color="#34C759" strokeWidth={3} /> {s.status}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 0.5rem", textAlign: "right" }}>
                    <button
                      onClick={() => toast.success(`Receipt for ${s.id} downloaded.`)}
                      style={{
                        padding: "0.3rem 0.75rem",
                        borderRadius: "var(--radius-pill)",
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-color)",
                        fontSize: "0.75rem",
                        color: "var(--text-primary)",
                        cursor: "pointer",
                      }}
                    >
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
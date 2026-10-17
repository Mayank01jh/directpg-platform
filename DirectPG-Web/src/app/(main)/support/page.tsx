"use client";
import { useState } from "react";
import Link from "next/link";
import {
  IconPhone,
  IconCheck,
  IconHelpCircle,
  IconChevronDown,
  IconArrowRight,
} from "@/components/ui/Icons";
import toast from "react-hot-toast";

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: "How does the 0% brokerage policy work?",
      a: "DirectPG connects tenants directly with verified PG owners. Because there are no middlemen, property owners do not pay commission fees, and students are never charged a broker cut. You pay only the published rent and refundable deposit.",
    },
    {
      q: "Can I cancel my booking if my plans change?",
      a: "Yes. DirectPG provides a 24-hour move-in satisfaction guarantee. If you cancel prior to check-in or find that the physical property does not match its listing specifications, your deposit is 100% refunded to your original payment method.",
    },
    {
      q: "How do I schedule an in-person or live video walkthrough?",
      a: "Simply click 'Schedule Free Visit' on any property detail page. You can choose between a physical walkthrough or a live WhatsApp video tour with the owner at your preferred time slot.",
    },
    {
      q: "What documents do I need for digital move-in?",
      a: "You only need a valid government photo ID (UIDAI Aadhaar or Passport) and your college ID / company employment letter. Our digital KYC verifies your identity in under 60 seconds.",
    },
    {
      q: "How do I receive the biometric smart lock code?",
      a: "Upon completing your booking, your digital pass generates a unique cryptographic passcode (e.g. #4892*) along with owner contact numbers and GPS navigation directions.",
    },
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    toast.success("Support ticket created! An agent will respond within 15 minutes.");
  };

  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="app-container" style={{ maxWidth: "860px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "var(--radius-pill)",
            background: "var(--apple-blue-light)",
            color: "#007AFF",
            fontSize: "0.8rem",
            fontWeight: 700,
            marginBottom: "1rem",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}>
            <IconHelpCircle size={14} color="#007AFF" /> 24/7 Tenant Care
          </span>

          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1rem" }}>
            How Can We Help You?
          </h1>

          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto" }}>
            Get instant answers to frequently asked questions, or reach out to our dedicated support team in Bangalore.
          </p>
        </div>

        {/* 3 Contact Info Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          marginBottom: "3.5rem",
        }}>
          <div className="ios-card" style={{
            background: "var(--bg-card)",
            borderRadius: "20px",
            padding: "1.5rem",
            border: "1px solid var(--border-color)",
          }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
              Phone Support
            </h3>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#007AFF", marginBottom: "0.25rem" }}>
              +91 80 4920 1800
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
              Monday to Sunday, 8:00 AM – 11:00 PM IST
            </p>
          </div>

          <div className="ios-card" style={{
            background: "var(--bg-card)",
            borderRadius: "20px",
            padding: "1.5rem",
            border: "1px solid var(--border-color)",
          }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
              Email Assistance
            </h3>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#007AFF", marginBottom: "0.25rem" }}>
              support@directpg.in
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
              Average response time under 15 minutes
            </p>
          </div>

          <div className="ios-card" style={{
            background: "var(--bg-card)",
            borderRadius: "20px",
            padding: "1.5rem",
            border: "1px solid var(--border-color)",
          }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
              Headquarters
            </h3>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
              DirectPG Tech Park
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
              80 Feet Rd, Koramangala 4th Block, Bangalore 560034
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="ios-card"
                  style={{
                    background: "var(--bg-card)",
                    borderRadius: "16px",
                    border: "1px solid var(--border-color)",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div style={{
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}>
                    <span style={{ fontSize: "0.98rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {faq.q}
                    </span>
                    <div style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      color: "var(--text-secondary)",
                    }}>
                      <IconChevronDown size={18} color="currentColor" />
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{
                      padding: "0 1.5rem 1.25rem",
                      fontSize: "0.88rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      borderTop: "1px solid var(--border-color)",
                      paddingTop: "0.85rem",
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Ticket Form */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "24px",
          padding: "2.25rem",
          border: "1px solid var(--border-color)",
        }}>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
            Send Us a Message
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Need help with an existing booking, landlord verification, or refund request?
          </p>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "#E8F8EE",
                color: "#34C759",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}>
                <IconCheck size={24} color="#34C759" strokeWidth={3} />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                Ticket #DPG-TK-84920 Created
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Thank you, {name}. A member of our support team will reach out to <strong>{email}</strong> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mayank Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid var(--border-color)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.88rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="mayank@directpg.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid var(--border-color)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.88rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                  Message / Issue Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your inquiry or question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.88rem",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              <button
                type="submit"
                className="ios-pill-btn ios-pill-btn-solid"
                style={{
                  padding: "0.75rem 1.75rem",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  alignSelf: "flex-end",
                  marginTop: "0.5rem",
                }}
              >
                Send Message ›
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

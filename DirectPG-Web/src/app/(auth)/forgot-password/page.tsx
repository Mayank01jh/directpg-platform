"use client";
import { useState } from "react";
import Link from "next/link";
import { IconCheck, IconArrowRight, IconLock } from "@/components/ui/Icons";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    toast.success("Password reset instructions sent to your email!");
  };

  return (
    <div
      className="ios-card"
      style={{
        background: "var(--bg-card)",
        borderRadius: "24px",
        padding: "2rem",
        border: "1px solid var(--border-color)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <div style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "var(--apple-blue-light)",
          color: "#007AFF",
          margin: "0 auto 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <IconLock size={22} color="#007AFF" />
        </div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
          Reset Password
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
          Enter the registered email associated with your DirectPG account.
        </p>
      </div>

      {sent ? (
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.5rem 1rem",
            borderRadius: "var(--radius-pill)",
            background: "#E8F8EE",
            color: "#34C759",
            fontWeight: 700,
            fontSize: "0.85rem",
            marginBottom: "1rem",
          }}>
            <IconCheck size={16} color="#34C759" strokeWidth={3} />
            <span>Link Dispatched</span>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            We have sent a secure password reset link to <strong>{email}</strong>. Please check your inbox or spam folder.
          </p>
          <Link
            href="/login"
            className="ios-pill-btn ios-pill-btn-solid"
            style={{ padding: "0.7rem 1.5rem", fontSize: "0.88rem" }}
          >
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
              Registered Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "12px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            className="ios-pill-btn ios-pill-btn-solid"
            style={{
              width: "100%",
              padding: "0.8rem",
              fontSize: "0.92rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <span>Send Reset Link</span>
            <IconArrowRight size={16} color="#FFFFFF" />
          </button>
        </form>
      )}

      <div style={{
        marginTop: "1.75rem",
        paddingTop: "1.25rem",
        borderTop: "1px solid var(--border-color)",
        textAlign: "center",
        fontSize: "0.82rem",
        color: "var(--text-secondary)",
      }}>
        Remember your credentials?{" "}
        <Link href="/login" style={{ color: "#007AFF", fontWeight: 700, textDecoration: "none" }}>
          Sign In
        </Link>
      </div>
    </div>
  );
}

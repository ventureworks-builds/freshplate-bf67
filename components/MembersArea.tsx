import React from "react";
import GatedContent from "./GatedContent";
import config from "../config";

interface MembersAreaProps {
  userId: string;
  onLogout: () => void;
}

export default function MembersArea({ userId, onLogout }: MembersAreaProps) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-surface)" }}>
      <nav
        style={{
          background: "#fff",
          borderBottom: "1px solid var(--color-border)",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: 800, fontSize: 20 }}>{config.logoText}</span>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href="/members/profile" style={{ fontSize: 14, color: "var(--color-text-muted)", textDecoration: "none" }}>
            Profile
          </a>
          <button
            onClick={onLogout}
            style={{
              background: "none",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius)",
              padding: "7px 16px",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Sign out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>
            Welcome to {config.membershipName}
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: 16 }}>
            Everything below is exclusive to members.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 32,
            borderBottom: "1px solid var(--color-border)",
            paddingBottom: 16,
          }}
        >
          <a
            href="/members"
            style={{
              padding: "8px 16px",
              borderRadius: "var(--radius)",
              background: "var(--color-primary)",
              color: "#fff",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Content
          </a>
          <a
            href="/members/profile"
            style={{
              padding: "8px 16px",
              borderRadius: "var(--radius)",
              background: "transparent",
              color: "var(--color-text-muted)",
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            Profile
          </a>
        </div>

        <GatedContent />
      </div>
    </div>
  );
}

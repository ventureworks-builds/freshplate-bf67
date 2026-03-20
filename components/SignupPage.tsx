import React, { useState } from "react";
import config from "../config";

type Mode = "signup" | "login";

interface SignupPageProps {
  mode?: Mode;
  onSuccess: (userId: string) => void;
}

export default function SignupPage({ mode = "signup", onSuccess }: SignupPageProps) {
  const [currentMode, setCurrentMode] = useState<Mode>(mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = currentMode === "signup" ? "/api/auth/signup" : "/api/auth/login";
    const body = currentMode === "signup" ? { email, password, name } : { email, password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      setLoading(false);
      return;
    }

    onSuccess(data.userId);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    fontSize: 15,
    outline: "none",
    fontFamily: "inherit",
    marginTop: 6,
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", padding: "0 24px" }}>
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
          {currentMode === "signup" ? `Join ${config.membershipName}` : "Welcome back"}
        </h1>
        <p style={{ color: "var(--color-text-muted)" }}>
          {currentMode === "signup"
            ? `Get access to ${config.membershipName}`
            : `Sign in to access your membership`}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
        {currentMode === "signup" && (
          <div>
            <label style={{ fontWeight: 600, fontSize: 14 }}>Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Jane Smith"
              style={inputStyle}
            />
          </div>
        )}

        <div>
          <label style={{ fontWeight: 600, fontSize: 14 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ fontWeight: 600, fontSize: 14 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={inputStyle}
          />
        </div>

        {error && <p style={{ color: "#dc2626", fontSize: 14 }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "var(--color-primary)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius)",
            padding: "14px",
            fontSize: 16,
            fontWeight: 600,
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Please wait…" : currentMode === "signup" ? "Create account" : "Sign in"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--color-text-muted)" }}>
        {currentMode === "signup" ? "Already a member?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setCurrentMode(currentMode === "signup" ? "login" : "signup")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-primary)",
            fontWeight: 600,
            fontSize: 14,
            padding: 0,
          }}
        >
          {currentMode === "signup" ? "Sign in" : "Create account"}
        </button>
      </p>
    </div>
  );
}

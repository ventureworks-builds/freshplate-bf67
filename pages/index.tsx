import React from "react";
import Head from "next/head";
import config from "../config";
import { generateCSSVariables } from "../styles/theme";

export default function MembershipHome() {
  return (
    <>
      <Head>
        <title>{config.productName} — {config.tagline}</title>
        <meta name="description" content={config.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{generateCSSVariables()}</style>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: var(--font-family); color: var(--color-text); background: var(--color-background); }
          a { text-decoration: none; }
        `}</style>
      </Head>

      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-border)",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: 800, fontSize: 20 }}>{config.logoText}</span>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="/login" style={{ padding: "8px 16px", fontSize: 14, color: "var(--color-text-muted)" }}>
            Sign in
          </a>
          <a
            href="/join"
            style={{
              background: "var(--color-primary)",
              color: "#fff",
              padding: "9px 20px",
              borderRadius: "var(--radius)",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Join now
          </a>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section
          style={{
            padding: "100px 24px",
            textAlign: "center",
            background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-background) 60%)",
          }}
        >
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, marginBottom: 16 }}>
            {config.heroHeadline}
          </h1>
          <p style={{ fontSize: 18, color: "var(--color-text-muted)", marginBottom: 40, maxWidth: 520, margin: "0 auto 40px" }}>
            {config.heroSubheadline}
          </p>
          <a
            href="/join"
            style={{
              background: "var(--color-primary)",
              color: "#fff",
              padding: "16px 40px",
              borderRadius: "var(--radius)",
              fontWeight: 700,
              fontSize: 17,
            }}
          >
            {config.ctaText}
          </a>
        </section>

        {/* What you get */}
        <section style={{ padding: "80px 24px", background: "var(--color-surface)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: "center", marginBottom: 48 }}>
              What you get as a member
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 20,
              }}
            >
              {config.membershipBenefits.map((benefit, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "24px",
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "var(--color-primary)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.5 }}>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: "center", marginBottom: 8 }}>
              Simple pricing
            </h2>
            <p style={{ textAlign: "center", color: "var(--color-text-muted)", marginBottom: 48 }}>
              No hidden fees. Cancel any time.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
              }}
            >
              {[
                { label: "Monthly", price: `$${config.monthlyPriceUsd}/mo`, href: `/join?plan=monthly`, primary: false },
                { label: "Yearly", price: `$${config.yearlyPriceUsd}/yr`, sub: `$${Math.round(config.yearlyPriceUsd / 12)}/mo — save ${Math.round(100 - (config.yearlyPriceUsd / (config.monthlyPriceUsd * 12)) * 100)}%`, href: `/join?plan=yearly`, primary: true },
              ].map((plan) => (
                <div
                  key={plan.label}
                  style={{
                    border: `2px solid ${plan.primary ? "var(--color-primary)" : "var(--color-border)"}`,
                    borderRadius: "var(--radius-lg)",
                    padding: 32,
                    textAlign: "center",
                    background: plan.primary ? "var(--color-primary-light)" : "#fff",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{plan.label}</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: "var(--color-primary)", marginBottom: 8 }}>{plan.price}</div>
                  {plan.sub && (
                    <div style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 20 }}>{plan.sub}</div>
                  )}
                  <a
                    href={plan.href}
                    style={{
                      display: "block",
                      background: plan.primary ? "var(--color-primary)" : "transparent",
                      color: plan.primary ? "#fff" : "var(--color-primary)",
                      border: `2px solid var(--color-primary)`,
                      borderRadius: "var(--radius)",
                      padding: "12px",
                      fontWeight: 700,
                      fontSize: 15,
                      marginTop: plan.sub ? 0 : 20,
                    }}
                  >
                    {config.ctaText}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

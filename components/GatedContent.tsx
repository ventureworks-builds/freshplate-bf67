import React, { useState, useEffect } from "react";
import { ContentItem, getPublishedContent } from "../lib/membership";
import config from "../config";

const TYPE_ICONS: Record<string, string> = {
  post: "📄",
  file: "📎",
  link: "🔗",
  video: "🎬",
};

export default function GatedContent() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContentItem | null>(null);

  useEffect(() => {
    getPublishedContent().then(setItems).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-muted)" }}>
        Loading content…
      </div>
    );
  }

  if (selected) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <button
          onClick={() => setSelected(null)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-text-muted)",
            fontSize: 15,
            marginBottom: 24,
            padding: 0,
          }}
        >
          ← Back to content
        </button>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>{selected.title}</h1>
        <p style={{ color: "var(--color-text-muted)", marginBottom: 24 }}>{selected.description}</p>
        {selected.type === "post" && selected.content_body && (
          <div
            style={{
              lineHeight: 1.8,
              fontSize: 16,
              color: "var(--color-text)",
              whiteSpace: "pre-wrap",
            }}
          >
            {selected.content_body}
          </div>
        )}
        {(selected.type === "file" || selected.type === "link" || selected.type === "video") && selected.content_url && (
          <a
            href={selected.content_url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--color-primary)",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "var(--radius)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            {TYPE_ICONS[selected.type]}{" "}
            {selected.type === "file" ? "Download file" : selected.type === "video" ? "Watch video" : "Open link"}
          </a>
        )}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 24px" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Content coming soon</h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          Check back soon — new content is being added regularly.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            style={{
              background: "#fff",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: 24,
              cursor: "pointer",
              transition: "box-shadow 0.2s",
              boxShadow: "var(--shadow)",
            }}
            onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow)")}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>{TYPE_ICONS[item.type]}</div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-primary)",
                marginBottom: 8,
              }}
            >
              {item.type}
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
            <p style={{ fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.5 }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

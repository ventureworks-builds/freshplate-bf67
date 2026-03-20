import React, { useState, useEffect } from "react";
import { supabase, Membership, ContentItem } from "../lib/membership";
import config from "../config";

export default function AdminMembers() {
  const [tab, setTab] = useState<"members" | "content">("members");
  const [members, setMembers] = useState<Membership[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState({ title: "", description: "", type: "post" as const, content_body: "", content_url: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (tab === "members") {
      supabase.from("memberships").select("*").order("started_at", { ascending: false }).then(({ data }) => {
        setMembers(data || []);
        setLoading(false);
      });
    } else {
      supabase.from("content_items").select("*").order("created_at", { ascending: false }).then(({ data }) => {
        setContent(data || []);
        setLoading(false);
      });
    }
  }, [tab]);

  async function addContent() {
    setSaving(true);
    await supabase.from("content_items").insert({ ...newContent, published: false });
    setNewContent({ title: "", description: "", type: "post", content_body: "", content_url: "" });
    const { data } = await supabase.from("content_items").select("*").order("created_at", { ascending: false });
    setContent(data || []);
    setSaving(false);
  }

  async function togglePublish(item: ContentItem) {
    await supabase.from("content_items").update({ published: !item.published }).eq("id", item.id);
    setContent(content.map((c) => c.id === item.id ? { ...c, published: !c.published } : c));
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    fontSize: 14,
    fontFamily: "inherit",
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {(["members", "content"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setLoading(true); }}
            style={{
              padding: "8px 20px",
              border: `2px solid ${tab === t ? "var(--color-primary)" : "var(--color-border)"}`,
              borderRadius: "var(--radius)",
              background: tab === t ? "var(--color-primary)" : "transparent",
              color: tab === t ? "#fff" : "var(--color-text)",
              cursor: "pointer",
              fontWeight: 600,
              textTransform: "capitalize",
              fontSize: 14,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "members" && (
        loading ? <p>Loading…</p> : (
          <div style={{ display: "grid", gap: 12 }}>
            {members.length === 0 ? (
              <p style={{ color: "var(--color-text-muted)" }}>No members yet.</p>
            ) : members.map((m) => (
              <div
                key={m.id}
                style={{
                  background: "#fff",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{m.user_id.slice(0, 8)}…</div>
                  <div style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
                    Plan: {m.plan} · Since {new Date(m.started_at).toLocaleDateString()}
                  </div>
                </div>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 99,
                    background: m.status === "active" ? "#d1fae5" : "#fee2e2",
                    color: m.status === "active" ? "#065f46" : "#dc2626",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        )
      )}

      {tab === "content" && (
        <div style={{ display: "grid", gap: 24 }}>
          <div
            style={{
              background: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
              padding: 24,
              border: "1px solid var(--color-border)",
              display: "grid",
              gap: 14,
            }}
          >
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Add new content</h3>
            <input type="text" placeholder="Title" value={newContent.title} onChange={(e) => setNewContent({ ...newContent, title: e.target.value })} style={inputStyle} />
            <input type="text" placeholder="Description" value={newContent.description} onChange={(e) => setNewContent({ ...newContent, description: e.target.value })} style={inputStyle} />
            <select value={newContent.type} onChange={(e) => setNewContent({ ...newContent, type: e.target.value as any })} style={inputStyle}>
              <option value="post">Post</option>
              <option value="file">File</option>
              <option value="link">Link</option>
              <option value="video">Video</option>
            </select>
            {newContent.type === "post" ? (
              <textarea placeholder="Content body" value={newContent.content_body} onChange={(e) => setNewContent({ ...newContent, content_body: e.target.value })} rows={5} style={{ ...inputStyle, resize: "vertical" }} />
            ) : (
              <input type="url" placeholder="URL" value={newContent.content_url} onChange={(e) => setNewContent({ ...newContent, content_url: e.target.value })} style={inputStyle} />
            )}
            <button
              onClick={addContent}
              disabled={saving || !newContent.title}
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius)",
                padding: "11px",
                fontWeight: 600,
                cursor: "pointer",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "Saving…" : "Add content (saved as draft)"}
            </button>
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {content.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "var(--color-text-muted)", textTransform: "capitalize" }}>{item.type}</div>
                </div>
                <button
                  onClick={() => togglePublish(item)}
                  style={{
                    padding: "6px 14px",
                    border: "none",
                    borderRadius: "var(--radius)",
                    background: item.published ? "#fee2e2" : "#d1fae5",
                    color: item.published ? "#dc2626" : "#065f46",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {item.published ? "Unpublish" : "Publish"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

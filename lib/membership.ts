import { createClient } from "@supabase/supabase-js";
import config from "../config";

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

export const SETUP_SQL = `
CREATE TABLE IF NOT EXISTS memberships (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null,
  plan text not null default 'monthly',
  stripe_subscription_id text,
  status text default 'active' check (status in ('active','cancelled','expired','trialing')),
  started_at timestamptz default now(),
  expires_at timestamptz
);

CREATE TABLE IF NOT EXISTS content_items (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  type text not null check (type in ('post','file','link','video')),
  content_url text,
  content_body text,
  published boolean default false,
  created_at timestamptz default now()
);
`;

export interface Membership {
  id: string;
  user_id: string;
  plan: string;
  stripe_subscription_id?: string;
  status: "active" | "cancelled" | "expired" | "trialing";
  started_at: string;
  expires_at?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: "post" | "file" | "link" | "video";
  content_url?: string;
  content_body?: string;
  published: boolean;
  created_at: string;
}

export async function getMembership(userId: string): Promise<Membership | null> {
  const { data } = await supabase
    .from("memberships")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();
  return data;
}

export async function getPublishedContent(): Promise<ContentItem[]> {
  const { data } = await supabase
    .from("content_items")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function isActiveMember(userId: string): Promise<boolean> {
  const membership = await getMembership(userId);
  if (!membership) return false;
  if (membership.expires_at && new Date(membership.expires_at) < new Date()) return false;
  return true;
}

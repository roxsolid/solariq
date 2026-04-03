import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://intvnxvannltfibguykw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHZueHZhbm5sdGZpYmd1eWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzAwNjgsImV4cCI6MjA5MDA0NjA2OH0.KnPP0-vxXyBYTvHxbXfrH8AKd61u1hWpEO2gpjWnzNE";
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── THEME TOKENS ────────────────────────────────────────────────────────────
const DARK = {
  dark: true,
  bg: "#05070b", bg2: "#090c12", bg3: "#0d1018",
  card: "rgba(255,255,255,.04)", card2: "rgba(255,255,255,.07)", card3: "rgba(255,255,255,.1)",
  border: "rgba(255,255,255,.08)", borderHover: "rgba(255,255,255,.16)",
  accent: "#f5a623", accent2: "#ff6b00", rgb: "245,166,35",
  text: "#f0f0f0", textMid: "#b0b0b0", sub: "#555", subLight: "#888",
  green: "#4ade80", red: "#f87171", blue: "#60a5fa", purple: "#c084fc", cyan: "#22d3ee",
  nav: "rgba(5,7,11,.97)", inputBg: "rgba(255,255,255,.05)",
  navW: 228, navWc: 58,
};
const LIGHT = {
  dark: false,
  bg: "#f0ede3", bg2: "#e8e4d8", bg3: "#ddd9cc",
  card: "rgba(0,0,0,.04)", card2: "rgba(0,0,0,.07)", card3: "rgba(0,0,0,.1)",
  border: "rgba(0,0,0,.1)", borderHover: "rgba(0,0,0,.2)",
  accent: "#c47a0a", accent2: "#a05e00", rgb: "196,122,10",
  text: "#0f0f0f", textMid: "#333", sub: "#999", subLight: "#666",
  green: "#16a34a", red: "#dc2626", blue: "#2563eb", purple: "#9333ea", cyan: "#0891b2",
  nav: "rgba(240,237,227,.97)", inputBg: "rgba(0,0,0,.05)",
  navW: 228, navWc: 58,
};
const H = "'Lexend',sans-serif";
const B = "'Plus Jakarta Sans',sans-serif";

// ─── SCREEN HOOK ─────────────────────────────────────────────────────────────
function useScreen() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const fn = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", fn);
    window.addEventListener("orientationchange", () => setTimeout(fn, 100));
    return () => { window.removeEventListener("resize", fn); };
  }, []);
  return {
    w: size.w, h: size.h,
    isMobile: size.w < 768,
    isTablet: size.w >= 768 && size.w < 1100,
    isDesktop: size.w >= 1100,
  };
}

// ─── SEEDED DATA (from frontend) ─────────────────────────────────────────────
const SEED_INSTALLERS = [
  { id: 1, name: "SunPower SA", city: "Johannesburg", province: "Gauteng", rating: 4.9, reviews: 312, sessa: true, jobs: 847, yrs: 12, badge: "Top Rated", resp: "2 hrs", spec: "Residential", brands: ["Sunsynk", "Victron"], price_min: 80000, price_max: 200000, verified: true, finance: true, type: "installer", status: "approved" },
  { id: 2, name: "Cape Solar Pro", city: "Cape Town", province: "Western Cape", rating: 4.8, reviews: 198, sessa: true, jobs: 523, yrs: 9, badge: "Most Popular", resp: "3 hrs", spec: "Commercial & Residential", brands: ["Deye", "Sunsynk"], price_min: 60000, price_max: 350000, verified: true, finance: true, type: "installer", status: "approved" },
  { id: 3, name: "KZN Solar Solutions", city: "Durban", province: "KwaZulu-Natal", rating: 4.7, reviews: 143, sessa: true, jobs: 389, yrs: 7, badge: null, resp: "4 hrs", spec: "Off-grid", brands: ["Victron", "Pylontech"], price_min: 70000, price_max: 250000, verified: true, finance: false, type: "installer", status: "approved" },
  { id: 4, name: "Pretoria Solar Works", city: "Pretoria", province: "Gauteng", rating: 4.6, reviews: 89, sessa: false, jobs: 201, yrs: 5, badge: "Fast Response", resp: "Same day", spec: "Residential", brands: ["Growatt", "Deye"], price_min: 50000, price_max: 150000, verified: true, finance: true, type: "installer", status: "approved" },
  { id: 5, name: "FixSolar SA", city: "Johannesburg", province: "Gauteng", rating: 4.9, reviews: 203, sessa: false, jobs: 0, yrs: 8, badge: null, resp: "Same day", spec: "Inverter Repair", brands: ["Victron", "Sunsynk", "Deye"], price_min: 450, price_max: 3000, verified: true, finance: false, type: "technician", status: "approved" },
  { id: 6, name: "Panel Clean Pro", city: "Cape Town", province: "Western Cape", rating: 4.8, reviews: 156, sessa: false, jobs: 0, yrs: 5, badge: null, resp: "1 day", spec: "Panel Cleaning", brands: ["All brands"], price_min: 85, price_max: 500, verified: true, finance: false, type: "technician", status: "approved" },
  { id: 7, name: "Battery Doctors", city: "Pretoria", province: "Gauteng", rating: 4.7, reviews: 98, sessa: false, jobs: 0, yrs: 6, badge: null, resp: "24/7", spec: "Battery Replacement", brands: ["Pylontech", "BSL", "Freedom Won"], price_min: 1200, price_max: 8000, verified: true, finance: false, type: "technician", status: "approved" },
];
const SEED_ARTICLES = [
  { id: 1, title: "How much does a 5kW solar system cost in SA in 2026?", tag: "Guide", hot: true, read_minutes: 7, published: true, views: 12400, slug: "5kw-solar-cost-sa-2026" },
  { id: 2, title: "Sunsynk vs Deye vs Victron — which inverter is best for SA?", tag: "Comparison", hot: true, read_minutes: 9, published: true, views: 8900, slug: "sunsynk-deye-victron-comparison" },
  { id: 3, title: "How to claim your solar tax rebate from SARS", tag: "Tax", hot: false, read_minutes: 5, published: true, views: 6200, slug: "solar-tax-rebate-sars" },
  { id: 4, title: "Is your solar system actually working? 7 signs it isn't", tag: "Maintenance", hot: false, read_minutes: 6, published: true, views: 4800, slug: "solar-system-working-signs" },
  { id: 5, title: "Sodium-ion batteries are coming to SA", tag: "News", hot: true, read_minutes: 5, published: true, views: 3100, slug: "sodium-ion-batteries-sa" },
  { id: 6, title: "Best solar panels available in SA 2026 — ranked", tag: "Comparison", hot: true, read_minutes: 10, published: true, views: 7100, slug: "best-solar-panels-sa-2026" },
];

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Ic = {
  Grid: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>,
  Install: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Clip: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="14" y2="15"/></svg>,
  Doc: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Chart: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  Mail: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Cog: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Bell: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Search: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Out: ({s=15,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Left: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Right: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Plus: ({s=14,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Chk: ({s=13,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  X: ({s=13,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Sun: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Moon: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  Users: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Cash: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Link: ({s=14,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  Shield: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Globe: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Plug: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M7 6v4"/><path d="M17 14v4"/><path d="M7 6h4"/><path d="M13 18h4"/><circle cx="10" cy="10" r="3"/><circle cx="14" cy="14" r="3"/></svg>,
  More: ({s=18,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>,
  Activity: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Trending: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Wrench: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Share: ({s=16,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
};

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
function Spinner({ s = 20, c }) {
  return (
    <div style={{
      width: s, height: s,
      border: `2px solid ${c ? c + "33" : "rgba(245,166,35,.2)"}`,
      borderTopColor: c || "#f5a623",
      borderRadius: "50%", animation: "spin .8s linear infinite",
    }} />
  );
}

function Btn({ children, onClick, variant = "primary", sm, disabled, full, style = {} }) {
  const V = {
    primary: (t) => ({ bg: `linear-gradient(135deg,${t.accent},${t.accent2})`, col: t.dark ? "#000" : "#fff", bdr: "none" }),
    ghost: (t) => ({ bg: t.card, col: t.textMid, bdr: `1px solid ${t.border}` }),
    danger: () => ({ bg: "rgba(239,68,68,.1)", col: "#f87171", bdr: "1px solid rgba(239,68,68,.25)" }),
    success: () => ({ bg: "rgba(74,222,128,.1)", col: "#4ade80", bdr: "1px solid rgba(74,222,128,.25)" }),
    accent: (t) => ({ bg: `rgba(${t.rgb},.1)`, col: t.accent, bdr: `1px solid rgba(${t.rgb},.28)` }),
  };
  return (
    <_ThemeConsumer>
      {(t) => {
        const v = (V[variant] || V.primary)(t);
        return (
          <button onClick={onClick} disabled={disabled} style={{
            background: v.bg, color: v.col, border: v.bdr,
            borderRadius: sm ? 7 : 9, padding: sm ? "6px 13px" : "9px 18px",
            fontSize: sm ? 11 : 13, fontWeight: 700,
            cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? .5 : 1,
            width: full ? "100%" : "auto", display: "inline-flex", alignItems: "center",
            gap: 6, transition: "all .18s", whiteSpace: "nowrap", fontFamily: B, ...style,
          }}>{children}</button>
        );
      }}
    </_ThemeConsumer>
  );
}

// Theme context bridge
let _globalTheme = DARK;
const _ThemeConsumer = ({ children }) => children(_globalTheme);

function Card({ children, style = {}, onClick, hover }) {
  const [hov, setHov] = useState(false);
  const t = _globalTheme;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: t.card, border: `1px solid ${hov ? t.borderHover : t.border}`,
        borderRadius: 14, transition: "border-color .2s, transform .2s",
        transform: hov ? "translateY(-2px)" : "none",
        cursor: onClick ? "pointer" : "default", ...style,
      }}
    >{children}</div>
  );
}

function Badge({ children, color }) {
  const c = color || _globalTheme.accent;
  return (
    <span style={{ fontSize: 10, fontWeight: 700, background: `${c}18`, color: c, padding: "2px 8px", borderRadius: 20, letterSpacing: .4, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function Inp({ label, value, onChange, type = "text", placeholder, rows, hint }) {
  const t = _globalTheme;
  const base = { width: "100%", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 9, padding: "10px 13px", color: t.text, fontSize: 13, fontFamily: B, boxSizing: "border-box", outline: "none", transition: "border .2s" };
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 6, fontWeight: 700 }}>{label}</label>}
      {hint && <div style={{ fontSize: 11, color: t.sub, marginBottom: 5 }}>{hint}</div>}
      {rows
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{ ...base, resize: "vertical" }} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={base} />
      }
    </div>
  );
}

function Toggle({ value, onChange, label, color }) {
  const t = _globalTheme;
  const c = color || t.accent;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
      {label && <span style={{ fontSize: 13, color: t.textMid, fontFamily: B }}>{label}</span>}
      <div
        onClick={() => onChange(!value)}
        style={{
          width: 42, height: 24, borderRadius: 12,
          background: value ? c : t.card,
          border: `1px solid ${value ? c : t.border}`,
          cursor: "pointer", position: "relative", transition: "all .25s", flexShrink: 0,
        }}
      >
        <div style={{
          position: "absolute", top: 2, left: value ? 20 : 2,
          width: 18, height: 18, borderRadius: "50%",
          background: value ? (t.dark ? "#000" : "#fff") : t.sub,
          transition: "left .25s", boxShadow: "0 1px 4px rgba(0,0,0,.3)",
        }} />
      </div>
    </div>
  );
}

// ─── MINI BAR CHART ──────────────────────────────────────────────────────────
function MiniBar({ data, color, h = 40, w = 100 }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data, 1);
  const barW = (w - (data.length - 1) * 2) / data.length;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      {data.map((v, i) => {
        const bh = Math.max(2, (v / max) * (h - 4));
        const x = i * (barW + 2);
        return (
          <rect key={i} x={x} y={h - bh} width={barW} height={bh} rx={2}
            fill={color} opacity={i === data.length - 1 ? 1 : 0.4} />
        );
      })}
    </svg>
  );
}

// ─── DONUT CHART ─────────────────────────────────────────────────────────────
function Donut({ segments, size = 80, stroke = 12 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={stroke} />
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const dash = pct * circ;
        const el = (
          <circle key={i} cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke={seg.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-offset * circ / total * r * 2 * Math.PI + circ * .25}
            strokeLinecap="round" style={{ transition: "all 1s ease" }}
          />
        );
        offset += seg.value;
        return el;
      })}
    </svg>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color, barData, trend, idx = 0, suffix = "" }) {
  const [disp, setDisp] = useState(0);
  const t = _globalTheme;
  useEffect(() => {
    const target = typeof value === "number" ? value : 0;
    let s = null; const dur = 1000;
    const fn = ts => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / dur, 1);
      setDisp(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(fn);
    };
    requestAnimationFrame(fn);
  }, [value]);
  return (
    <div style={{
      background: t.card, border: `1px solid ${t.border}`, borderRadius: 14,
      padding: "16px 18px", animation: `fadeUp .4s ease ${idx * .06}s both`,
      display: "flex", flexDirection: "column", gap: 10, position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle at top right,${color}20,transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: `${color}15`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        {trend && <div style={{ fontSize: 11, color: trend > 0 ? t.green : t.red, fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
        </div>}
      </div>
      <div>
        <div style={{ fontFamily: H, fontSize: 28, fontWeight: 900, color: t.text, lineHeight: 1 }}>
          {typeof value === "number" ? disp.toLocaleString() : value}{suffix}
        </div>
        <div style={{ fontSize: 11, color: t.sub, marginTop: 3, fontWeight: 500 }}>{label}</div>
      </div>
      {barData && <MiniBar data={barData} color={color} h={28} w={80} />}
    </div>
  );
}

// ─── ACTIVITY FEED ────────────────────────────────────────────────────────────
const ACTIVITY_ITEMS = [
  { icon: "⚡", text: "Solar Calculator used — 5kW result generated", time: "2 min ago", color: "#f5a623" },
  { icon: "🗺️", text: "Installer directory browsed — Gauteng filter", time: "7 min ago", color: "#60a5fa" },
  { icon: "⚠️", text: "Error code F32 looked up — Sunsynk", time: "12 min ago", color: "#fb923c" },
  { icon: "📋", text: "New quote request submitted to SunPower SA", time: "18 min ago", color: "#4ade80" },
  { icon: "📖", text: "Article read — '5kW solar cost 2026'", time: "24 min ago", color: "#c084fc" },
  { icon: "🩺", text: "Health check completed — score 72/100", time: "31 min ago", color: "#22d3ee" },
  { icon: "📱", text: "New subscriber via coming soon page", time: "45 min ago", color: "#4ade80" },
  { icon: "⚡", text: "Pro Calculator used — 8kW off-grid result", time: "1 hr ago", color: "#f5a623" },
];

function ActivityFeed() {
  const t = _globalTheme;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {ACTIVITY_ITEMS.map((a, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
          borderBottom: i < ACTIVITY_ITEMS.length - 1 ? `1px solid ${t.border}` : "none",
          animation: `fadeUp .3s ease ${i * .04}s both`,
        }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: `${a.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{a.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, color: t.textMid, lineHeight: 1.4 }}>{a.text}</div>
          </div>
          <div style={{ fontSize: 10, color: t.sub, whiteSpace: "nowrap", flexShrink: 0 }}>{a.time}</div>
        </div>
      ))}
    </div>
  );
}

// ─── TOOL CONTEST ─────────────────────────────────────────────────────────────
const TOOLS_DATA = [
  { name: "Solar Calculator", uses: 1847, pct: 68, icon: "⚡", color: "#f5a623" },
  { name: "Installer Directory", uses: 1223, pct: 45, icon: "🗺️", color: "#4ade80" },
  { name: "Error Code Translator", uses: 892, pct: 33, icon: "⚠️", color: "#fb923c" },
  { name: "Health Check", uses: 764, pct: 28, icon: "🩺", color: "#60a5fa" },
  { name: "Blog & Guides", uses: 598, pct: 22, icon: "📖", color: "#c084fc" },
  { name: "Pro Calculator", uses: 312, pct: 11, icon: "⚙️", color: "#22d3ee" },
];

function ToolContest() {
  const t = _globalTheme;
  const top = TOOLS_DATA[0];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {TOOLS_DATA.map((tool, i) => (
        <div key={tool.name} style={{ animation: `fadeUp .35s ease ${i * .05}s both` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 15 }}>{tool.icon}</span>
              <span style={{ fontSize: 12, color: t.textMid, fontWeight: 600 }}>{tool.name}</span>
              {i === 0 && <Badge color={t.accent}>👑 Top</Badge>}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: t.sub }}>{tool.uses.toLocaleString()}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: tool.color, width: 34, textAlign: "right" }}>{tool.pct}%</span>
            </div>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,.05)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              width: `${tool.pct}%`, height: "100%", background: tool.color, borderRadius: 3,
              transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── NOTIFICATION PANEL ───────────────────────────────────────────────────────
const NOTIFS = [
  { id: 1, icon: "🏢", title: "New installer application", body: "Solar Hub BFN has applied for listing", time: "5 min ago", unread: true, color: "#f5a623" },
  { id: 2, icon: "⚠️", title: "Unknown error code searched", body: "F99 not found — add to database", time: "23 min ago", unread: true, color: "#fb923c" },
  { id: 3, icon: "📋", title: "Quote request sent", body: "Lead sent to SunPower SA — 5kW system", time: "1 hr ago", unread: false, color: "#4ade80" },
  { id: 4, icon: "🔋", title: "SESSA certificate expiry", body: "KZN Solar Solutions cert expires in 28 days", time: "3 hrs ago", unread: false, color: "#f87171" },
];

function NotifPanel({ onClose }) {
  const t = _globalTheme;
  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: 340, background: t.bg2,
      border: `1px solid ${t.border}`, zIndex: 500, animation: "slideInRight .25s ease",
      display: "flex", flexDirection: "column", overflowY: "auto",
    }}>
      <div style={{ padding: "18px 20px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <div style={{ fontFamily: H, fontSize: 16, fontWeight: 800, color: t.text }}>Notifications</div>
        <button onClick={onClose} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 7, padding: "5px 8px", cursor: "pointer", color: t.sub }}><Ic.X s={13} c={t.sub} /></button>
      </div>
      <div style={{ flex: 1, padding: "12px 16px" }}>
        {NOTIFS.map((n, i) => (
          <div key={n.id} style={{
            background: n.unread ? `rgba(${t.rgb},.04)` : "transparent",
            border: `1px solid ${n.unread ? `rgba(${t.rgb},.12)` : "transparent"}`,
            borderRadius: 12, padding: "12px 14px", marginBottom: 8,
            display: "flex", gap: 12, alignItems: "flex-start",
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${n.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{n.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: n.unread ? 700 : 500, color: t.text, marginBottom: 3 }}>{n.title}</div>
              <div style={{ fontSize: 11, color: t.sub, lineHeight: 1.5 }}>{n.body}</div>
              <div style={{ fontSize: 10, color: t.sub, marginTop: 5 }}>{n.time}</div>
            </div>
            {n.unread && <div style={{ width: 7, height: 7, borderRadius: "50%", background: t.accent, flexShrink: 0, marginTop: 5 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ stats, loading }) {
  const sc = useScreen();
  const t = _globalTheme;
  const [filter, setFilter] = useState("today");
  const h = new Date().getHours();
  const greet = h < 5 ? "🌙 Late night" : h < 12 ? "☀️ Good morning" : h < 17 ? "🌤️ Good afternoon" : "🌙 Good evening";
  const dateStr = new Date().toLocaleDateString("en-ZA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 80, flexDirection: "column", gap: 12 }}>
      <Spinner /><div style={{ fontSize: 13, color: t.sub }}>Loading dashboard...</div>
    </div>
  );

  const statCards = [
    { icon: <Ic.Install s={15} c={t.accent} />, label: "Live Installers", value: stats.installers, color: t.accent, barData: [3, 5, 4, 7, 6, 8, stats.installers || 0], trend: 12 },
    { icon: <Ic.Clip s={15} c={t.green} />, label: "Total Leads", value: stats.leads, color: t.green, barData: [0, 1, 0, 2, 1, 3, stats.leads || 0], trend: 8 },
    { icon: <Ic.Mail s={15} c={t.blue} />, label: "Subscribers", value: stats.subscribers, color: t.blue, barData: [1, 2, 1, 3, 2, 4, stats.subscribers || 0], trend: 5 },
    { icon: <Ic.Doc s={15} c={t.purple} />, label: "Published Posts", value: stats.posts, color: t.purple, barData: [4, 4, 5, 5, 6, 6, stats.posts || 6] },
    { icon: <Ic.Bell s={15} c={stats.pending > 0 ? t.red : t.sub} />, label: "Pending Reviews", value: stats.pending, color: stats.pending > 0 ? t.red : t.sub, barData: [0, 1, 0, 0, 2, 1, stats.pending || 0] },
    { icon: <Ic.Activity s={15} c={t.cyan} />, label: "Live Sessions", value: 14, color: t.cyan, barData: [8, 12, 9, 14, 11, 16, 14], trend: 3 },
  ];

  const geographic = [
    { region: "Gauteng", pct: 41, color: t.accent },
    { region: "Western Cape", pct: 28, color: t.blue },
    { region: "KwaZulu-Natal", pct: 16, color: t.green },
    { region: "Other provinces", pct: 15, color: t.purple },
  ];

  const devices = [
    { name: "Mobile", pct: 64, color: t.accent },
    { name: "Desktop", pct: 28, color: t.blue },
    { name: "Tablet", pct: 8, color: t.purple },
  ];

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      {/* Greeting hero */}
      <div style={{
        background: `linear-gradient(135deg,rgba(${t.rgb},.1) 0%,rgba(${t.rgb},.04) 60%,rgba(255,107,0,.06) 100%)`,
        border: `1px solid rgba(${t.rgb},.18)`,
        borderRadius: 16, padding: sc.isMobile ? "18px 16px" : "22px 28px", marginBottom: 18,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, background: `radial-gradient(circle,rgba(${t.rgb},.15),transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: sc.isMobile ? "flex-start" : "center", flexDirection: sc.isMobile ? "column" : "row", gap: 14, position: "relative" }}>
          <div>
            <div style={{ fontFamily: H, fontSize: sc.isMobile ? 20 : 28, fontWeight: 900, color: t.text, marginBottom: 3 }}>{greet}, Tebello ☀️</div>
            <div style={{ fontSize: 12, color: t.sub }}>{dateStr} · SolarIQ launching in {Math.max(0, Math.ceil((new Date("2026-04-08") - new Date()) / 86400000))} days</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn sm variant="accent" onClick={() => { }}><Ic.Plus s={13} c={t.accent} /> Add Installer</Btn>
            <Btn sm variant="ghost" onClick={() => { }}><Ic.Doc s={13} /> New Post</Btn>
          </div>
        </div>
        {stats.pending > 0 && (
          <div style={{ marginTop: 12, background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 9, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
            <span>⚠️</span>
            <span style={{ fontSize: 13, color: t.red, fontWeight: 600 }}>{stats.pending} installer application{stats.pending !== 1 ? "s" : ""} awaiting review</span>
          </div>
        )}
      </div>

      {/* Date filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 2 }}>
        {["today", "yesterday", "7d", "30d", "this year", "all time"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? `rgba(${t.rgb},.12)` : t.card,
            border: `1px solid ${filter === f ? `rgba(${t.rgb},.4)` : t.border}`,
            color: filter === f ? t.accent : t.sub,
            borderRadius: 20, padding: "5px 13px", cursor: "pointer", fontSize: 11, fontWeight: 700,
            whiteSpace: "nowrap", fontFamily: B, textTransform: "capitalize", flexShrink: 0,
          }}>{f}</button>
        ))}
      </div>

      {/* Stat grid */}
      <div style={{ display: "grid", gridTemplateColumns: sc.isMobile ? "1fr 1fr" : sc.isTablet ? "repeat(3,1fr)" : "repeat(6,1fr)", gap: 10, marginBottom: 18 }}>
        {statCards.map((c, i) => <StatCard key={c.label} {...c} idx={i} />)}
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "1.4fr 1fr" : "1fr", gap: 14, marginBottom: 14 }}>
        {/* Activity feed */}
        <Card style={{ padding: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: t.text }}>Live Activity Feed</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: t.green, animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 10, color: t.green, fontWeight: 700 }}>LIVE</span>
            </div>
          </div>
          <ActivityFeed />
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Device breakdown */}
          <Card style={{ padding: "18px" }}>
            <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 14 }}>Device Breakdown</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Donut segments={devices.map(d => ({ value: d.pct, color: d.color }))} size={72} stroke={10} />
              <div style={{ flex: 1 }}>
                {devices.map(d => (
                  <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
                      <span style={{ fontSize: 12, color: t.textMid }}>{d.name}</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: d.color }}>{d.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Platform status */}
          <Card style={{ padding: "18px" }}>
            <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 12 }}>Platform Health</div>
            {[["Database", "Operational", t.green], ["Auth", "Operational", t.green], ["Storage", "Operational", t.green], ["Edge Functions", "Not set up", t.sub]].map(([name, status, color]) => (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: `1px solid ${t.border}` }}>
                <span style={{ fontSize: 12, color: t.sub }}>{name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, animation: color === t.green ? "pulse 2s infinite" : "none" }} />
                  <span style={{ fontSize: 11, color, fontWeight: 700 }}>{status}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Second row */}
      <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "1fr 1fr" : "1fr", gap: 14 }}>
        {/* Tool contest */}
        <Card style={{ padding: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: t.text }}>Tool Performance</div>
            <Badge color={t.accent}>Live contest</Badge>
          </div>
          <ToolContest />
        </Card>

        {/* Geographic breakdown */}
        <Card style={{ padding: "18px" }}>
          <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 14 }}>Traffic by Province</div>
          {geographic.map((g, i) => (
            <div key={g.region} style={{ marginBottom: i < geographic.length - 1 ? 12 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: t.textMid }}>{g.region}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: g.color }}>{g.pct}%</span>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,.05)", borderRadius: 3 }}>
                <div style={{ width: `${g.pct}%`, height: "100%", background: g.color, borderRadius: 3, transition: "width 1.2s ease" }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: "10px 12px", background: `rgba(${t.rgb},.06)`, border: `1px solid rgba(${t.rgb},.15)`, borderRadius: 9 }}>
            <div style={{ fontSize: 11, color: t.sub, marginBottom: 3 }}>Most searched error code (today)</div>
            <div style={{ fontFamily: H, fontSize: 18, fontWeight: 900, color: t.accent }}>F32 <span style={{ fontSize: 12, color: t.sub, fontWeight: 400 }}>— Sunsynk overheat</span></div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── INSTALLERS ───────────────────────────────────────────────────────────────
function InstallersPage() {
  const sc = useScreen();
  const t = _globalTheme;
  const [items, setItems] = useState(SEED_INSTALLERS);
  const [filter, setFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("list"); // list | add

  const filtered = items.filter(i => {
    if (filter !== "all" && i.status !== filter) return false;
    if (typeFilter !== "all" && i.type !== typeFilter) return false;
    if (search && !i.name.toLowerCase().includes(search.toLowerCase()) && !i.city.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const approve = (id) => setItems(items.map(i => i.id === id ? { ...i, status: "approved" } : i));
  const reject = (id) => setItems(items.map(i => i.id === id ? { ...i, status: "rejected" } : i));
  const setSessa = (id, val) => setItems(items.map(i => i.id === id ? { ...i, sessa: val } : i));
  const toggleBadge = (id, badge) => setItems(items.map(i => i.id === id ? { ...i, badge: i.badge === badge ? null : badge } : i));

  const scC = s => s === "approved" ? t.green : s === "pending" ? t.accent : t.red;

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: t.text }}>Installers & Technicians</div>
          <div style={{ fontSize: 12, color: t.sub, marginTop: 3 }}>{items.filter(i => i.status === "approved").length} live · {items.filter(i => i.status === "pending").length} pending</div>
        </div>
        <Btn variant="primary" onClick={() => setTab(tab === "add" ? "list" : "add")}>
          <Ic.Plus s={13} c={t.dark ? "#000" : "#fff"} /> Add New
        </Btn>
      </div>

      {/* Search + filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}>
            <Ic.Search s={13} c={t.sub} />
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or city..."
            style={{ width: "100%", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 9, padding: "9px 12px 9px 32px", color: t.text, fontSize: 13, fontFamily: B, outline: "none", boxSizing: "border-box" }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {["all", "approved", "pending", "rejected"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? `rgba(${t.rgb},.12)` : t.card,
            border: `1px solid ${filter === f ? `rgba(${t.rgb},.4)` : t.border}`,
            color: filter === f ? t.accent : t.sub,
            borderRadius: 20, padding: "5px 13px", cursor: "pointer", fontSize: 11, fontWeight: 700,
            fontFamily: B, textTransform: "capitalize",
          }}>{f}</button>
        ))}
        <div style={{ width: 1, background: t.border, margin: "0 4px" }} />
        {["all", "installer", "technician"].map(f => (
          <button key={f} onClick={() => setTypeFilter(f)} style={{
            background: typeFilter === f ? `rgba(96,165,250,.12)` : t.card,
            border: `1px solid ${typeFilter === f ? `rgba(96,165,250,.4)` : t.border}`,
            color: typeFilter === f ? t.blue : t.sub,
            borderRadius: 20, padding: "5px 13px", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: B,
            textTransform: "capitalize",
          }}>{f === "all" ? "All types" : f === "installer" ? "🏢 Installers" : "🔧 Technicians"}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "1fr 1fr" : "1fr", gap: 10 }}>
        {filtered.map((inst, i) => (
          <Card key={inst.id} style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }} onClick={() => setSelected(selected?.id === inst.id ? null : inst)}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: `rgba(${t.rgb},.1)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                {inst.type === "technician" ? "🔧" : "🏢"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: H, fontSize: 14, fontWeight: 700, color: t.text }}>{inst.name}</span>
                  <Badge color={scC(inst.status)}>{inst.status}</Badge>
                  <Badge color={inst.type === "installer" ? t.accent : t.blue}>{inst.type}</Badge>
                  {inst.sessa && <Badge color={t.green}>✓ SESSA</Badge>}
                  {inst.badge && <Badge color={t.purple}>{inst.badge}</Badge>}
                </div>
                <div style={{ fontSize: 11, color: t.sub }}>{inst.city}, {inst.province} · {inst.spec} · {inst.yrs} yrs</div>
                <div style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>⭐ {inst.rating} ({inst.reviews} reviews) · R{(inst.price_min || 0).toLocaleString()}–R{(inst.price_max || 0).toLocaleString()}</div>
              </div>
              <span style={{ fontSize: 14, color: t.sub, transform: selected?.id === inst.id ? "rotate(90deg)" : "none", transition: "transform .2s", flexShrink: 0, marginTop: 4 }}>›</span>
            </div>
            {selected?.id === inst.id && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${t.border}`, animation: "fadeUp .2s ease" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                  {[["Brands", (inst.brands || []).join(", ")], ["Response", inst.resp], ["Finance", inst.finance ? "✅ Yes" : "No"]].map(([l, v]) => v && (
                    <div key={l}><div style={{ fontSize: 10, color: t.sub, textTransform: "uppercase", letterSpacing: .8, marginBottom: 2 }}>{l}</div><div style={{ fontSize: 13, color: t.textMid }}>{v}</div></div>
                  ))}
                </div>
                {/* Badge assignment */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: t.sub, marginBottom: 7, textTransform: "uppercase", letterSpacing: 1 }}>Assign Badge</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {["Top Rated", "Most Popular", "Fast Response", "High PSH Zone"].map(b => (
                      <button key={b} onClick={() => toggleBadge(inst.id, b)} style={{
                        background: inst.badge === b ? `rgba(${t.rgb},.12)` : t.card,
                        border: `1px solid ${inst.badge === b ? `rgba(${t.rgb},.4)` : t.border}`,
                        color: inst.badge === b ? t.accent : t.sub,
                        borderRadius: 7, padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: B,
                      }}>{b}</button>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                  {inst.status !== "approved" && <Btn variant="success" sm onClick={() => approve(inst.id)}><Ic.Chk c={t.green} /> Approve</Btn>}
                  {inst.status !== "rejected" && <Btn variant="danger" sm onClick={() => reject(inst.id)}><Ic.X c={t.red} /> Reject</Btn>}
                  <Btn variant="ghost" sm onClick={() => setSessa(inst.id, !inst.sessa)}>{inst.sessa ? "Remove SESSA" : "✓ Mark SESSA"}</Btn>
                  {inst.type === "installer" && <Badge color={t.cyan}>🏅 Verify Cert</Badge>}
                </div>
              </div>
            )}
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card style={{ padding: "40px", textAlign: "center", gridColumn: sc.isDesktop ? "span 2" : "1" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
            <div style={{ color: t.sub, fontSize: 13 }}>No results match your filters</div>
          </Card>
        )}
      </div>
    </div>
  );
}

// ─── BLOG MANAGER ─────────────────────────────────────────────────────────────
function BlogPage() {
  const sc = useScreen();
  const t = _globalTheme;
  const [posts, setPosts] = useState(SEED_ARTICLES);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", intro: "", tag: "Guide", body: "", cover_image: "", hot: false, published: true, read_minutes: 5, slug: "" });
  const [previewMode, setPreviewMode] = useState(false);

  const slugify = title => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const save = () => {
    if (editing === "new") {
      setPosts([{ ...form, id: Date.now(), views: 0, created_at: new Date().toISOString(), slug: form.slug || slugify(form.title) }, ...posts]);
    } else {
      setPosts(posts.map(p => p.id === editing ? { ...p, ...form } : p));
    }
    setEditing(null);
  };

  const del = (id) => {
    if (confirm("Delete this post?")) setPosts(posts.filter(p => p.id !== id));
  };

  const tagColor = t => ({ Guide: "#4ade80", Comparison: "#60a5fa", Tax: "#f5a623", Maintenance: "#fb923c", News: "#f87171", Review: "#c084fc" }[t] || "#888");

  if (editing !== null) {
    return (
      <div style={{ animation: "fadeUp .4s ease" }}>
        <button onClick={() => setEditing(null)} style={{ background: "none", border: "none", color: t.sub, cursor: "pointer", fontSize: 13, marginBottom: 20, fontFamily: B, display: "flex", alignItems: "center", gap: 6 }}>
          <Ic.Left s={14} c={t.sub} /> Back to posts
        </button>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: H, fontSize: 20, fontWeight: 900, color: t.text }}>{editing === "new" ? "New Post" : "Edit Post"}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setPreviewMode(!previewMode)} style={{ background: t.card, border: `1px solid ${t.border}`, color: t.textMid, borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontFamily: B }}>
              {previewMode ? "✏️ Edit" : "👁 Preview"}
            </button>
            <Btn onClick={save}>Save Post</Btn>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "1fr 320px" : "1fr", gap: 16 }}>
          <div>
            <Card style={{ padding: "20px", marginBottom: 14 }}>
              <Inp label="Title" value={form.title} onChange={v => setForm({ ...form, title: v, slug: slugify(v) })} placeholder="Enter article title..." />
              <Inp label="Slug (URL path)" value={form.slug} onChange={v => setForm({ ...form, slug: v })} />
              <Inp label="Intro / Summary" value={form.intro} onChange={v => setForm({ ...form, intro: v })} rows={3} placeholder="Brief summary shown on article card..." />
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 6, fontWeight: 700 }}>Body Sections (JSON)</label>
                <div style={{ fontSize: 11, color: t.sub, marginBottom: 6 }}>{`Format: [{"h":"Heading","p":"Paragraph text"},...]`}</div>
                <textarea value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} rows={12}
                  style={{ width: "100%", background: "rgba(0,0,0,.3)", border: `1px solid ${t.border}`, borderRadius: 9, padding: "10px 13px", color: t.text, fontSize: 12, fontFamily: "monospace", resize: "vertical", boxSizing: "border-box", outline: "none" }} />
              </div>
            </Card>
            <Card style={{ padding: "20px" }}>
              <Inp label="Cover Image URL" value={form.cover_image || ""} onChange={v => setForm({ ...form, cover_image: v })} placeholder="https://images.unsplash.com/..." />
              {form.cover_image && <img src={form.cover_image} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 9, marginTop: 8 }} />}
              <Inp label="YouTube Video ID" value={form.youtube_id || ""} onChange={v => setForm({ ...form, youtube_id: v })} placeholder="dQw4w9WgXcQ" />
              <Inp label="Affiliate Link URL" value={form.affiliate_url || ""} onChange={v => setForm({ ...form, affiliate_url: v })} placeholder="https://..." />
            </Card>
          </div>
          <div>
            <Card style={{ padding: "18px", marginBottom: 14 }}>
              <div style={{ fontFamily: H, fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 14 }}>Post Settings</div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 6, fontWeight: 700 }}>Category</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {["Guide", "Comparison", "Tax", "Maintenance", "News", "Review"].map(tag => (
                    <button key={tag} onClick={() => setForm({ ...form, tag })} style={{
                      background: form.tag === tag ? `${tagColor(tag)}18` : t.card,
                      border: `1px solid ${form.tag === tag ? tagColor(tag) : t.border}`,
                      color: form.tag === tag ? tagColor(tag) : t.sub,
                      borderRadius: 7, padding: "6px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: B,
                    }}>{tag}</button>
                  ))}
                </div>
              </div>
              <Inp label="Read Time (minutes)" value={String(form.read_minutes)} onChange={v => setForm({ ...form, read_minutes: parseInt(v) || 5 })} type="number" />
              <Toggle value={form.published} onChange={v => setForm({ ...form, published: v })} label="Published" color={t.green} />
              <Toggle value={form.hot} onChange={v => setForm({ ...form, hot: v })} label="🔥 Trending" color={t.red} />
            </Card>
            <Card style={{ padding: "18px" }}>
              <div style={{ fontFamily: H, fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 }}>SEO Preview</div>
              <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 9, padding: "12px", fontSize: 11 }}>
                <div style={{ color: t.blue, marginBottom: 3 }}>solariq.co.za/blog/{form.slug || "your-slug"}</div>
                <div style={{ fontWeight: 700, color: t.text, marginBottom: 3, fontSize: 14 }}>{form.title || "Article Title"}</div>
                <div style={{ color: t.sub, lineHeight: 1.5 }}>{(form.intro || "Article summary...").slice(0, 120)}</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: t.text }}>Blog Posts</div>
          <div style={{ fontSize: 12, color: t.sub }}>{posts.filter(p => p.published).length} published · {posts.filter(p => !p.published).length} drafts</div>
        </div>
        <Btn onClick={() => { setForm({ title: "", intro: "", tag: "Guide", body: "[]", cover_image: "", hot: false, published: true, read_minutes: 5, slug: "" }); setEditing("new"); }}>
          <Ic.Plus s={13} c={t.dark ? "#000" : "#fff"} /> New Post
        </Btn>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {posts.map((p, i) => (
          <Card key={p.id} style={{ padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {p.cover_image && <img src={p.cover_image} style={{ width: 56, height: 40, objectFit: "cover", borderRadius: 7, flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: H, fontSize: 14, fontWeight: 700, color: t.text }}>{p.title}</span>
                  <Badge color={tagColor(p.tag)}>{p.tag}</Badge>
                  {p.hot && <Badge color={t.red}>🔥 Hot</Badge>}
                </div>
                <div style={{ fontSize: 11, color: t.sub }}>
                  {p.published ? <span style={{ color: t.green }}>● Published</span> : <span style={{ color: t.sub }}>○ Draft</span>}
                  {" · "}{p.read_minutes} min · {(p.views || 0).toLocaleString()} views
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
                <Btn sm variant="ghost" onClick={() => { setForm({ ...p, body: typeof p.body === "object" ? JSON.stringify(p.body, null, 2) : (p.body || "[]") }); setEditing(p.id); }}>Edit</Btn>
                <Btn sm variant={p.published ? "ghost" : "success"} onClick={() => setPosts(posts.map(x => x.id === p.id ? { ...x, published: !x.published } : x))}>{p.published ? "Unpublish" : "Publish"}</Btn>
                <Btn sm variant="danger" onClick={() => del(p.id)}>Delete</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── LEADS ────────────────────────────────────────────────────────────────────
function LeadsPage() {
  const sc = useScreen();
  const t = _globalTheme;
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    sb.from("leads").select("*,installers(name)").order("created_at", { ascending: false })
      .then(({ data }) => { setLeads(data || []); setLoading(false); });
  }, []);

  const update = async (id, status) => {
    await sb.from("leads").update({ status }).eq("id", id);
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
  };

  const filtered = leads.filter(l => {
    if (filter !== "all" && l.status !== filter) return false;
    if (search && !l.name?.toLowerCase().includes(search.toLowerCase()) && !l.email?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const scC = s => ({ new: t.accent, contacted: t.blue, quoted: t.purple, converted: t.green, lost: t.red }[s] || t.sub);

  const SCORE_LABELS = [
    { range: [0, 50000], label: "Budget", color: t.sub, action: "Send guide" },
    { range: [50000, 120000], label: "Standard", color: t.blue, action: "Assign installer" },
    { range: [120000, 999999], label: "Premium", color: t.accent, action: "Priority lead" },
  ];

  const scoreLabel = (cost) => SCORE_LABELS.find(s => cost >= s.range[0] && cost < s.range[1]) || SCORE_LABELS[0];

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: t.text }}>Leads</div>
          <div style={{ fontSize: 12, color: t.sub }}>{leads.length} total · {leads.filter(l => l.status === "new").length} new</div>
        </div>
        <Btn variant="ghost" sm onClick={() => { }}>Export CSV</Btn>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 180, position: "relative" }}>
          <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}><Ic.Search s={13} c={t.sub} /></div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads..."
            style={{ width: "100%", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 9, padding: "9px 12px 9px 32px", color: t.text, fontSize: 13, fontFamily: B, outline: "none", boxSizing: "border-box" }} />
        </div>
        {["all", "new", "contacted", "quoted", "converted", "lost"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? `rgba(${t.rgb},.12)` : t.card,
            border: `1px solid ${filter === f ? `rgba(${t.rgb},.4)` : t.border}`,
            color: filter === f ? t.accent : t.sub,
            borderRadius: 20, padding: "5px 13px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: B, textTransform: "capitalize",
          }}>{f}</button>
        ))}
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}><Spinner /></div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((l, i) => {
            const sl = scoreLabel(l.estimated_cost || 0);
            return (
              <Card key={l.id} style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 38, height: 38, background: `${scC(l.status)}18`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>👤</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: H, fontSize: 14, fontWeight: 700, color: t.text }}>{l.name || "Anonymous"}</span>
                      <Badge color={scC(l.status)}>{l.status}</Badge>
                      <Badge color={sl.color}>{sl.label} · {sl.action}</Badge>
                    </div>
                    <div style={{ fontSize: 11, color: t.sub }}>{l.email || "No email"} · {l.installers?.name || "No installer"}</div>
                    <div style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>{l.system_kw}kW · R{(l.estimated_cost || 0).toLocaleString()} est · {new Date(l.created_at).toLocaleDateString("en-ZA")}</div>
                  </div>
                  <select value={l.status} onChange={e => update(l.id, e.target.value)} onClick={e => e.stopPropagation()}
                    style={{ background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 8, padding: "5px 9px", color: t.text, fontSize: 12, fontFamily: B, cursor: "pointer", flexShrink: 0 }}>
                    {["new", "contacted", "quoted", "converted", "lost"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </Card>
            );
          })}
          {filtered.length === 0 && (
            <Card style={{ padding: "40px", textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📋</div>
              <div style={{ color: t.sub, fontSize: 13 }}>No leads yet — quote requests will appear here</div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

// ─── SUBSCRIBERS ──────────────────────────────────────────────────────────────
function SubscribersPage() {
  const t = _globalTheme;
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    sb.from("subscribers").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setSubs(data || []); setLoading(false); });
  }, []);

  const exportCSV = () => {
    const csv = ["Email,Source,Date", ...subs.map(s => `${s.email},${s.source},${new Date(s.created_at).toLocaleDateString("en-ZA")}`)].join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = "solariq-subscribers.csv"; a.click();
  };

  const sourceColor = s => ({ coming_soon: t.accent, calculator: t.green, blog: t.blue, footer: t.purple }[s] || t.sub);

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: t.text }}>Subscribers</div>
          <div style={{ fontSize: 12, color: t.sub }}>{subs.length} total email subscribers</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="ghost" sm onClick={exportCSV}>Export CSV</Btn>
          <Btn variant="accent" sm onClick={() => { }}>📧 Send Newsletter</Btn>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: 10, marginBottom: 16 }}>
        {[["Total", subs.length, t.accent], ["This week", 0, t.green], ["From calc", subs.filter(s => s.source === "calculator").length, t.blue], ["From launch", subs.filter(s => s.source === "coming_soon").length, t.purple]].map(([l, v, c]) => (
          <div key={l} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
            <div style={{ fontFamily: H, fontSize: 24, fontWeight: 900, color: c }}>{v}</div>
            <div style={{ fontSize: 11, color: t.sub, marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </div>
      {loading ? <div style={{ textAlign: "center", padding: 40 }}><Spinner /></div> : (
        <Card style={{ padding: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {subs.map(s => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 11px", background: "rgba(255,255,255,.03)", borderRadius: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${sourceColor(s.source)}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>📬</div>
                <span style={{ flex: 1, fontSize: 13, color: t.text }}>{s.email}</span>
                <Badge color={sourceColor(s.source)}>{s.source}</Badge>
                <span style={{ fontSize: 11, color: t.sub, flexShrink: 0 }}>{new Date(s.created_at).toLocaleDateString("en-ZA")}</span>
              </div>
            ))}
            {subs.length === 0 && <div style={{ color: t.sub, textAlign: "center", padding: 24, fontSize: 13 }}>No subscribers yet.</div>}
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── ANALYTICS ────────────────────────────────────────────────────────────────
function AnalyticsPage() {
  const sc = useScreen();
  const t = _globalTheme;
  const [filter, setFilter] = useState("7d");
  const [loading] = useState(false);

  const mockWeekData = [420, 510, 380, 720, 850, 630, 940];
  const mockErrorData = [
    { code: "F32", count: 47, brand: "Sunsynk", sev: "critical" },
    { code: "E001", count: 38, brand: "Victron", sev: "warning" },
    { code: "W003", count: 29, brand: "Deye", sev: "info" },
    { code: "G01", count: 22, brand: "Growatt", sev: "info" },
    { code: "F01", count: 18, brand: "Sunsynk", sev: "warning" },
    { code: "NOT_FOUND", count: 14, brand: "Unknown", sev: "unknown" },
  ];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxBar = Math.max(...mockWeekData);

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: t.text }}>Analytics</div>
          <div style={{ fontSize: 12, color: t.sub }}>Traffic, usage, and platform insights</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["today", "7d", "30d", "this year", "all time"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? `rgba(${t.rgb},.12)` : t.card,
              border: `1px solid ${filter === f ? `rgba(${t.rgb},.4)` : t.border}`,
              color: filter === f ? t.accent : t.sub,
              borderRadius: 20, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: B, whiteSpace: "nowrap",
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Top stats */}
      <div style={{ display: "grid", gridTemplateColumns: sc.isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
        {[
          { label: "Page Views", value: "4,847", color: t.accent, delta: "+12%" },
          { label: "Unique Visitors", value: "1,923", color: t.blue, delta: "+8%" },
          { label: "Avg Session", value: "3m 42s", color: t.green, delta: "+3%" },
          { label: "Bounce Rate", value: "34%", color: t.purple, delta: "-5%" },
        ].map((s, i) => (
          <div key={s.label} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "14px 16px", animation: `fadeUp .35s ease ${i * .06}s both` }}>
            <div style={{ fontSize: 11, color: t.sub, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: H, fontSize: 24, fontWeight: 900, color: t.text }}>{s.value}</div>
            <div style={{ fontSize: 11, color: t.green, marginTop: 4, fontWeight: 700 }}>{s.delta} vs prev period</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "1.2fr 1fr" : "1fr", gap: 14, marginBottom: 14 }}>
        {/* Traffic bar chart */}
        <Card style={{ padding: "20px" }}>
          <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 20 }}>Daily Traffic (last 7 days)</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
            {mockWeekData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <div style={{ fontSize: 10, color: t.sub }}>{v}</div>
                <div style={{
                  width: "100%", height: `${(v / maxBar) * 90}px`, borderRadius: "4px 4px 0 0",
                  background: i === mockWeekData.length - 1 ? t.accent : `rgba(${t.rgb},.35)`,
                  transition: "height 1s ease", minHeight: 4,
                }} />
                <div style={{ fontSize: 10, color: t.sub }}>{days[i]}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Error code searches */}
        <Card style={{ padding: "20px" }}>
          <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 14 }}>Error Code Searches</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {mockErrorData.map((e, i) => {
              const sevColor = e.sev === "critical" ? t.red : e.sev === "warning" ? t.accent : e.sev === "info" ? t.blue : t.sub;
              return (
                <div key={e.code} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 800, color: sevColor, width: 60, flexShrink: 0 }}>{e.code}</div>
                  <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,.05)", borderRadius: 3 }}>
                    <div style={{ width: `${(e.count / mockErrorData[0].count) * 100}%`, height: "100%", background: sevColor, borderRadius: 3 }} />
                  </div>
                  <div style={{ fontSize: 11, color: t.sub, width: 24, textAlign: "right" }}>{e.count}</div>
                  {e.code === "NOT_FOUND" && <Badge color={t.red}>Add!</Badge>}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 12, padding: "9px 12px", background: `rgba(${t.rgb},.06)`, border: `1px solid rgba(${t.rgb},.15)`, borderRadius: 8, fontSize: 11, color: t.sub }}>
            💡 Missing codes get added to your content backlog automatically
          </div>
        </Card>
      </div>

      {/* Traffic sources */}
      <Card style={{ padding: "20px" }}>
        <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 16 }}>Traffic Sources</div>
        <div style={{ display: "grid", gridTemplateColumns: sc.isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 10 }}>
          {[
            { src: "Organic Search", pct: 52, icon: "🔍", color: t.green },
            { src: "Direct", pct: 28, icon: "🔗", color: t.blue },
            { src: "Social Media", pct: 13, icon: "📱", color: t.purple },
            { src: "Referral", pct: 7, icon: "🤝", color: t.accent },
          ].map(s => (
            <div key={s.src} style={{ background: t.card2, borderRadius: 10, padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: s.color }}>{s.pct}%</div>
              <div style={{ fontSize: 11, color: t.sub, marginTop: 3 }}>{s.src}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── USERS / TEAM ─────────────────────────────────────────────────────────────
function UsersPage() {
  const t = _globalTheme;
  const sc = useScreen();
  const [users] = useState([
    { id: 1, name: "Tebello", email: "mail4tebello@gmail.com", role: "Super Admin", avatar: "T", color: t.accent, lastActive: "Now", permissions: ["all"] },
  ]);
  const roles = ["Super Admin", "Admin", "Editor", "Support", "Viewer"];
  const roleColor = r => ({ "Super Admin": t.accent, Admin: t.blue, Editor: t.green, Support: t.purple, Viewer: t.sub }[r] || t.sub);
  const permList = ["Dashboard", "Installers", "Leads", "Blog", "Subscribers", "Analytics", "Settings", "Users"];

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: t.text }}>Team & Users</div>
          <div style={{ fontSize: 12, color: t.sub }}>{users.length} admin user{users.length !== 1 ? "s" : ""}</div>
        </div>
        <Btn><Ic.Plus s={13} c={t.dark ? "#000" : "#fff"} /> Invite User</Btn>
      </div>
      {users.map(u => (
        <Card key={u.id} style={{ padding: "18px", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: `linear-gradient(135deg,${t.accent},${t.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: H, fontSize: 20, fontWeight: 900, color: t.dark ? "#000" : "#fff", flexShrink: 0 }}>
              {u.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                <span style={{ fontFamily: H, fontSize: 16, fontWeight: 800, color: t.text }}>{u.name}</span>
                <Badge color={roleColor(u.role)}>{u.role}</Badge>
                <Badge color={t.green}>● {u.lastActive}</Badge>
              </div>
              <div style={{ fontSize: 12, color: t.sub, marginBottom: 12 }}>{u.email}</div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, fontWeight: 700 }}>Page Access</div>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                  {permList.map(p => (
                    <div key={p} style={{
                      background: u.permissions.includes("all") ? `rgba(${t.rgb},.1)` : t.card,
                      border: `1px solid ${u.permissions.includes("all") ? `rgba(${t.rgb},.3)` : t.border}`,
                      color: u.permissions.includes("all") ? t.accent : t.sub,
                      borderRadius: 7, padding: "4px 10px", fontSize: 11, fontWeight: 700,
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                      {u.permissions.includes("all") && <Ic.Chk s={10} c={t.accent} />} {p}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Btn sm variant="ghost">Edit Role</Btn>
                <Btn sm variant="accent">Audit Log</Btn>
              </div>
            </div>
          </div>
        </Card>
      ))}
      <Card style={{ padding: "20px", border: `1px dashed rgba(${t.rgb},.2)`, textAlign: "center" }} hover onClick={() => { }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>👤</div>
        <div style={{ fontFamily: H, fontSize: 15, fontWeight: 700, color: t.accent, marginBottom: 4 }}>Invite a Team Member</div>
        <div style={{ fontSize: 12, color: t.sub }}>Magic link sent to their email — no password needed</div>
      </Card>
    </div>
  );
}

// ─── SETTINGS ────────────────────────────────────────────────────────────────
function SettingsPage() {
  const sc = useScreen();
  const t = _globalTheme;
  const [activeTab, setActiveTab] = useState("site");
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    coming_soon: true, launch_date: "2026-04-08", site_name: "SolarIQ",
    contact_email: "hello@solariq.co.za", eskom_stage: "0",
    ticker_enabled: true, ticker_messages: ["☀️ Solar tax rebate: claim 25% back from SARS", "🔋 Load shedding prep — is your system sized right?", "⚙️ Pro Calculator now live"],
    seo_title: "SolarIQ — SA's Complete Solar Platform", seo_description: "Calculate your solar system, find verified installers, diagnose faults. Free. Always. Built for South Africa.",
    og_image: "", analytics_ga: "", analytics_hotjar: "",
    whatsapp_enabled: false, whatsapp_number: "", email_sender: "",
    maintenance_mode: false, maintenance_message: "We're upgrading. Back shortly.",
    two_fa: false, session_timeout: "24h", allowed_ips: "",
  });

  const set = (k, v) => setSettings(s => ({ ...s, [k]: v }));
  const saveAll = async () => {
    setSaved(true); setTimeout(() => setSaved(false), 2500);
    // Save to Supabase
    try {
      for (const [key, value] of Object.entries(settings)) {
        await sb.from("settings").upsert({ key, value: typeof value === "object" ? JSON.stringify(value) : String(value), updated_at: new Date().toISOString() });
      }
    } catch (e) { console.log("Settings save error:", e); }
  };

  const TABS = [
    { id: "site", label: "Site Control", icon: "⚙️" },
    { id: "coming_soon", label: "Coming Soon Page", icon: "🚀" },
    { id: "ticker", label: "Ticker Bar", icon: "📢" },
    { id: "seo", label: "SEO", icon: "🌐" },
    { id: "integrations", label: "Integrations", icon: "🔌" },
    { id: "security", label: "Security", icon: "🛡️" },
    { id: "maintenance", label: "Maintenance", icon: "🔧" },
  ];

  const selStyle = { width: "100%", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 9, padding: "10px 13px", color: t.text, fontSize: 13, fontFamily: B, outline: "none" };

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: t.text }}>Settings</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {saved && <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: t.green }}><Ic.Chk c={t.green} /> Saved</div>}
          <Btn onClick={saveAll}>Save All Changes</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "180px 1fr" : "1fr", gap: 16 }}>
        {/* Tab sidebar */}
        <div style={{ display: "flex", flexDirection: sc.isDesktop ? "column" : "row", gap: 4, overflowX: sc.isDesktop ? "visible" : "auto" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              background: activeTab === tab.id ? `rgba(${t.rgb},.1)` : "transparent",
              border: `1px solid ${activeTab === tab.id ? `rgba(${t.rgb},.3)` : "transparent"}`,
              borderRadius: 9, padding: "10px 14px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8, textAlign: "left",
              color: activeTab === tab.id ? t.accent : t.sub, fontWeight: activeTab === tab.id ? 700 : 500,
              fontFamily: B, fontSize: 13, whiteSpace: "nowrap", flexShrink: 0,
            }}>
              <span style={{ fontSize: 15 }}>{tab.icon}</span>
              {sc.isDesktop && tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <Card style={{ padding: "22px" }}>
          {activeTab === "site" && (
            <div>
              <div style={{ fontFamily: H, fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 20 }}>Site Control</div>
              <div style={{ display: "grid", gridTemplateColumns: sc.isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 6, fontWeight: 700 }}>Mode</label>
                  <select value={settings.coming_soon ? "cs" : "live"} onChange={e => set("coming_soon", e.target.value === "cs")} style={selStyle}>
                    <option value="cs">🚧 Coming Soon Mode</option>
                    <option value="live">✅ Live Site</option>
                  </select>
                </div>
                <Inp label="Launch Date" value={settings.launch_date} onChange={v => set("launch_date", v)} type="date" />
                <Inp label="Site Name" value={settings.site_name} onChange={v => set("site_name", v)} />
                <Inp label="Contact Email" value={settings.contact_email} onChange={v => set("contact_email", v)} type="email" />
                <div>
                  <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 6, fontWeight: 700 }}>Eskom Stage</label>
                  <select value={settings.eskom_stage} onChange={e => set("eskom_stage", e.target.value)} style={selStyle}>
                    {["0", "1", "2", "3", "4", "5", "6"].map(s => <option key={s} value={s}>Stage {s}{s === "0" ? " — No Load Shedding" : ""}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(239,68,68,.06)", border: "1px solid rgba(239,68,68,.15)", borderRadius: 9 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>⚠️</span>
                  <span style={{ fontSize: 12, color: t.red }}>Switching to Live mode makes the site publicly accessible. Confirm before launching.</span>
                </div>
              </div>
            </div>
          )}
          {activeTab === "coming_soon" && (
            <div>
              <div style={{ fontFamily: H, fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 20 }}>Coming Soon Page</div>
              <Inp label="Headline" value={settings.cs_headline || "SA's Solar Platform."} onChange={v => set("cs_headline", v)} />
              <Inp label="Subheading" value={settings.cs_sub || "Launching 8 April 2026."} onChange={v => set("cs_sub", v)} />
              <Inp label="Body text" value={settings.cs_body || "Calculate your system. Find verified installers. Diagnose faults."} onChange={v => set("cs_body", v)} rows={3} />
              <Inp label="CTA Button Text" value={settings.cs_cta || "Notify Me"} onChange={v => set("cs_cta", v)} />
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, fontWeight: 700 }}>Background Icon (emoji)</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["☀️", "⚡", "🔋", "🌞", "🏠"].map(e => (
                    <button key={e} onClick={() => set("cs_icon", e)} style={{
                      width: 44, height: 44, fontSize: 22, borderRadius: 10, border: `2px solid ${settings.cs_icon === e ? t.accent : t.border}`,
                      background: settings.cs_icon === e ? `rgba(${t.rgb},.1)` : t.card, cursor: "pointer",
                    }}>{e}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === "ticker" && (
            <div>
              <div style={{ fontFamily: H, fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 20 }}>Ticker Bar</div>
              <Toggle value={settings.ticker_enabled} onChange={v => set("ticker_enabled", v)} label="Enable ticker bar" color={t.green} />
              <div style={{ borderTop: `1px solid ${t.border}`, marginTop: 12, paddingTop: 16 }}>
                <div style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12, fontWeight: 700 }}>Messages ({settings.ticker_messages.length})</div>
                {settings.ticker_messages.map((msg, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                    <input value={msg} onChange={e => { const arr = [...settings.ticker_messages]; arr[i] = e.target.value; set("ticker_messages", arr); }}
                      style={{ flex: 1, background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 8, padding: "8px 12px", color: t.text, fontSize: 13, fontFamily: B, outline: "none" }} />
                    <button onClick={() => set("ticker_messages", settings.ticker_messages.filter((_, j) => j !== i))}
                      style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 7, padding: "7px", cursor: "pointer" }}>
                      <Ic.X s={12} c={t.red} />
                    </button>
                  </div>
                ))}
                <Btn sm variant="ghost" onClick={() => set("ticker_messages", [...settings.ticker_messages, "✨ New ticker message"])}>
                  <Ic.Plus s={12} /> Add Message
                </Btn>
              </div>
            </div>
          )}
          {activeTab === "seo" && (
            <div>
              <div style={{ fontFamily: H, fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 20 }}>SEO Settings</div>
              <Inp label="Meta Title" value={settings.seo_title} onChange={v => set("seo_title", v)} />
              <Inp label="Meta Description" value={settings.seo_description} onChange={v => set("seo_description", v)} rows={3} />
              <Inp label="OG Image URL" value={settings.og_image} onChange={v => set("og_image", v)} placeholder="https://..." />
              <Inp label="Google Analytics ID" value={settings.analytics_ga} onChange={v => set("analytics_ga", v)} placeholder="G-XXXXXXXXXX" />
              <Inp label="Hotjar ID" value={settings.analytics_hotjar} onChange={v => set("analytics_hotjar", v)} placeholder="12345678" />
              <div style={{ marginTop: 8, padding: "12px 14px", background: t.card, border: `1px solid ${t.border}`, borderRadius: 9 }}>
                <div style={{ fontSize: 11, color: t.sub, marginBottom: 6 }}>🔍 Search Preview</div>
                <div style={{ fontSize: 13, color: t.blue }}>{settings.seo_title || "SolarIQ"}</div>
                <div style={{ fontSize: 11, color: t.sub, lineHeight: 1.6, marginTop: 3 }}>{(settings.seo_description || "").slice(0, 160)}</div>
              </div>
            </div>
          )}
          {activeTab === "integrations" && (
            <div>
              <div style={{ fontFamily: H, fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 20 }}>Integrations</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { name: "WhatsApp Business", icon: "📱", connected: false, field: "whatsapp_number", label: "WhatsApp Number", type: "tel" },
                  { name: "Email (SMTP / Resend)", icon: "📧", connected: false, field: "email_sender", label: "From Email", type: "email" },
                  { name: "Make.com Webhook", icon: "🔗", connected: false, field: "make_webhook", label: "Webhook URL", type: "url" },
                  { name: "Google Search Console", icon: "🔍", connected: false, field: "gsc_verify", label: "Verification Code" },
                ].map(int => (
                  <div key={int.name} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "16px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <span style={{ fontSize: 22 }}>{int.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: H, fontSize: 14, fontWeight: 700, color: t.text }}>{int.name}</div>
                        <Badge color={int.connected ? t.green : t.sub}>{int.connected ? "Connected" : "Not connected"}</Badge>
                      </div>
                    </div>
                    <Inp label={int.label} value={settings[int.field] || ""} onChange={v => set(int.field, v)} type={int.type || "text"} placeholder="Enter here..." />
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "security" && (
            <div>
              <div style={{ fontFamily: H, fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 20 }}>Security</div>
              <Toggle value={settings.two_fa} onChange={v => set("two_fa", v)} label="Two-factor authentication" color={t.green} />
              <div style={{ borderTop: `1px solid ${t.border}`, margin: "14px 0" }} />
              <div>
                <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 6, fontWeight: 700 }}>Session Timeout</label>
                <select value={settings.session_timeout} onChange={e => set("session_timeout", e.target.value)} style={selStyle}>
                  {["1h", "4h", "12h", "24h", "7d", "30d"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div style={{ marginTop: 14 }}>
                <Inp label="Allowed IP Addresses (optional)" value={settings.allowed_ips} onChange={v => set("allowed_ips", v)} placeholder="Comma separated IPs, leave blank for any" hint="Restrict admin access to specific IPs" />
              </div>
              <div style={{ marginTop: 14, padding: "14px 16px", background: "rgba(74,222,128,.05)", border: "1px solid rgba(74,222,128,.15)", borderRadius: 10 }}>
                <div style={{ fontFamily: H, fontSize: 13, fontWeight: 700, color: t.green, marginBottom: 6 }}>🛡️ Recent Admin Activity</div>
                {[["Login", "Tebello", "Just now"], ["Settings saved", "Tebello", "10 min ago"], ["Installer approved", "Tebello", "1 hr ago"]].map(([action, who, when]) => (
                  <div key={action} style={{ display: "flex", gap: 8, fontSize: 11, color: t.sub, marginBottom: 5 }}>
                    <span style={{ color: t.green }}>●</span> <span>{who}</span> · <span>{action}</span> · <span>{when}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "maintenance" && (
            <div>
              <div style={{ fontFamily: H, fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 20 }}>Maintenance & Special Pages</div>
              <Toggle value={settings.maintenance_mode} onChange={v => {
                if (v && !confirm("⚠️ This will take the live site offline for visitors. Continue?")) return;
                set("maintenance_mode", v);
              }} label="🔧 Maintenance Mode" color={t.red} />
              <Inp label="Maintenance Message" value={settings.maintenance_message} onChange={v => set("maintenance_message", v)} rows={2} />
              <div style={{ borderTop: `1px solid ${t.border}`, margin: "16px 0" }} />
              <div style={{ fontFamily: H, fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 12 }}>Special Pages</div>
              <div style={{ display: "grid", gridTemplateColumns: sc.isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
                {[
                  { name: "Coming Soon", icon: "🚀", desc: "Countdown page before launch", active: settings.coming_soon },
                  { name: "Maintenance", icon: "🔧", desc: "Offline message for updates", active: settings.maintenance_mode },
                  { name: "404 Page", icon: "🔍", desc: "Custom not found page", active: true },
                  { name: "Press / Media Page", icon: "📰", desc: "For journalists and brands", active: false },
                  { name: "Partnership Page", icon: "🤝", desc: "For business inquiries", active: false },
                  { name: "API Status Page", icon: "💻", desc: "Public system status", active: false },
                ].map(p => (
                  <div key={p.name} style={{ background: t.card, border: `1px solid ${p.active ? `rgba(${t.rgb},.25)` : t.border}`, borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.text, fontFamily: H }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: t.sub }}>{p.desc}</div>
                    </div>
                    <Badge color={p.active ? t.green : t.sub}>{p.active ? "Active" : "Off"}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ─── MORE PAGE (mobile) ────────────────────────────────────────────────────────
function MorePage({ setTab }) {
  const t = _globalTheme;
  const items = [
    { id: "analytics", label: "Analytics", Icon: Ic.Chart, color: t.blue, desc: "Traffic, events & usage" },
    { id: "subscribers", label: "Subscribers", Icon: Ic.Mail, color: t.purple, desc: "Email list & newsletter" },
    { id: "users", label: "Team & Users", Icon: Ic.Users, color: t.cyan, desc: "Roles, permissions, audit" },
    { id: "settings", label: "Settings", Icon: Ic.Cog, color: t.sub, desc: "Site control, SEO, security" },
  ];
  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: t.text, marginBottom: 20 }}>More</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => (
          <div key={item.id} onClick={() => setTab(item.id)} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", animation: `fadeUp .3s ease ${i * .07}s both` }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${item.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <item.Icon s={20} c={item.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: H, fontSize: 15, fontWeight: 700, color: t.text }}>{item.label}</div>
              <div style={{ fontSize: 12, color: t.sub, marginTop: 2 }}>{item.desc}</div>
            </div>
            <Ic.Right s={14} c={t.sub} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── NAV CONFIG ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", Icon: Ic.Grid },
  { id: "installers", label: "Installers", Icon: Ic.Install },
  { id: "leads", label: "Leads", Icon: Ic.Clip },
  { id: "blog", label: "Blog", Icon: Ic.Doc },
  { id: "analytics", label: "Analytics", Icon: Ic.Chart },
  { id: "subscribers", label: "Subscribers", Icon: Ic.Mail },
  { id: "users", label: "Team", Icon: Ic.Users },
  { id: "settings", label: "Settings", Icon: Ic.Cog },
];
const MOBILE_NAV = [
  { id: "dashboard", label: "Home", Icon: Ic.Grid },
  { id: "installers", label: "Installers", Icon: Ic.Install },
  { id: "leads", label: "Leads", Icon: Ic.Clip },
  { id: "blog", label: "Blog", Icon: Ic.Doc },
  { id: "more", label: "More", Icon: Ic.More },
];

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ tab, setTab, collapsed, setCollapsed, onSignOut, pending, isDark, setIsDark }) {
  const t = _globalTheme;
  const W = collapsed ? t.navWc : t.navW;
  return (
    <div style={{
      width: W, background: t.nav, borderRight: `1px solid ${t.border}`,
      display: "flex", flexDirection: "column", position: "fixed", top: 0, bottom: 0, left: 0,
      zIndex: 300, transition: "width .25s cubic-bezier(.4,0,.2,1)", overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{ padding: "14px 12px", borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, overflow: "hidden" }}>
          <div style={{ width: 32, height: 32, background: `linear-gradient(135deg,${t.accent},${t.accent2})`, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0, boxShadow: `0 0 20px rgba(${t.rgb},.35)` }}>☀️</div>
          {!collapsed && <div>
            <div style={{ fontFamily: H, fontSize: 16, fontWeight: 900, color: t.text, whiteSpace: "nowrap" }}>Solar<span style={{ color: t.accent }}>IQ</span></div>
            <div style={{ fontSize: 9, color: t.sub, letterSpacing: 2, textTransform: "uppercase" }}>Admin</div>
          </div>}
        </div>
      </div>

      {/* Live site link */}
      {!collapsed && (
        <div style={{ padding: "8px 10px", borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
          <a href={`${window.location.origin}?preview=solariq2026`} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 10px", borderRadius: 8, textDecoration: "none", background: `rgba(${t.rgb},.06)`, border: `1px dashed rgba(${t.rgb},.2)` }}>
            <Ic.Link s={11} c={t.accent} />
            <span style={{ fontSize: 11, color: t.accent, fontWeight: 700 }}>View Live Site ↗</span>
          </a>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: "8px 6px", overflowY: "auto", overflowX: "hidden" }}>
        {NAV_ITEMS.map(n => {
          const active = tab === n.id;
          const hasBadge = n.id === "installers" && pending > 0;
          return (
            <button key={n.id} onClick={() => setTab(n.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 9,
              padding: collapsed ? "10px 0" : "9px 11px", justifyContent: collapsed ? "center" : "flex-start",
              borderRadius: 9, border: "none", marginBottom: 2,
              background: active ? `rgba(${t.rgb},.1)` : "transparent",
              borderLeft: !collapsed && active ? `2px solid ${t.accent}` : "2px solid transparent",
              color: active ? t.accent : t.sub, cursor: "pointer",
              transition: "all .18s", fontFamily: B, position: "relative",
            }}>
              <n.Icon s={16} c={active ? t.accent : t.sub} />
              {!collapsed && <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, flex: 1, textAlign: "left", whiteSpace: "nowrap" }}>{n.label}</span>}
              {hasBadge && !collapsed && <span style={{ background: t.red, color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 10, fontWeight: 700 }}>{pending}</span>}
              {hasBadge && collapsed && <span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, background: t.red, borderRadius: "50%" }} />}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ borderTop: `1px solid ${t.border}`, padding: "10px 8px", flexShrink: 0 }}>
        {/* Theme toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 6px", justifyContent: collapsed ? "center" : "space-between" }}>
          {!collapsed && <span style={{ fontSize: 11, color: t.sub, fontWeight: 600 }}>Theme</span>}
          <button onClick={() => setIsDark(d => !d)} style={{
            background: t.card, border: `1px solid ${t.border}`, borderRadius: 8,
            padding: "6px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: t.sub,
          }}>
            {isDark ? <Ic.Sun s={13} c={t.accent} /> : <Ic.Moon s={13} c={t.accent} />}
            {!collapsed && <span style={{ fontSize: 11, color: t.textMid }}>{isDark ? "Light" : "Dark"}</span>}
          </button>
        </div>

        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 6px", borderRadius: 9, justifyContent: collapsed ? "center" : "flex-start", overflow: "hidden" }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg,${t.accent},${t.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: H, fontWeight: 900, fontSize: 13, color: t.dark ? "#000" : "#fff", flexShrink: 0 }}>T</div>
          {!collapsed && <>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Tebello</div>
              <div style={{ fontSize: 10, color: t.sub }}>Super Admin</div>
            </div>
            <button onClick={onSignOut} title="Sign out" style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", color: t.sub }}>
              <Ic.Out s={14} c={t.sub} />
            </button>
          </>}
        </div>
        <button onClick={() => setCollapsed(c => !c)} style={{
          width: "100%", background: t.card, border: `1px solid ${t.border}`,
          borderRadius: 8, padding: "7px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 6, color: t.sub,
        }}>
          {collapsed ? <Ic.Right s={14} c={t.sub} /> : <Ic.Left s={14} c={t.sub} />}
        </button>
      </div>
    </div>
  );
}

// ─── MOBILE TOP BAR ───────────────────────────────────────────────────────────
function MobileTopBar({ tab, onSignOut, pending, onNotif, notifCount, isDark, setIsDark }) {
  const t = _globalTheme;
  const label = [...NAV_ITEMS, { id: "more", label: "More" }].find(n => n.id === tab)?.label || "";
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 54, background: t.nav, borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", zIndex: 300, backdropFilter: "blur(20px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 26, height: 26, background: `linear-gradient(135deg,${t.accent},${t.accent2})`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>☀️</div>
        <span style={{ fontFamily: H, fontSize: 16, fontWeight: 900, color: t.text }}>Solar<span style={{ color: t.accent }}>IQ</span></span>
      </div>
      <span style={{ fontFamily: H, fontSize: 13, fontWeight: 700, color: t.textMid }}>{label}</span>
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={() => setIsDark(d => !d)} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 8, padding: "6px 8px", cursor: "pointer", display: "flex" }}>
          {isDark ? <Ic.Sun s={14} c={t.accent} /> : <Ic.Moon s={14} c={t.accent} />}
        </button>
        <button onClick={onNotif} style={{ position: "relative", background: t.card, border: `1px solid ${t.border}`, borderRadius: 8, padding: "6px 8px", cursor: "pointer", display: "flex" }}>
          <Ic.Bell s={14} c={t.sub} />
          {notifCount > 0 && <span style={{ position: "absolute", top: 3, right: 3, width: 7, height: 7, background: t.red, borderRadius: "50%" }} />}
        </button>
        <button onClick={onSignOut} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 8, padding: "6px 8px", cursor: "pointer", display: "flex" }}>
          <Ic.Out s={14} c={t.sub} />
        </button>
      </div>
    </div>
  );
}

// ─── MOBILE BOTTOM NAV ────────────────────────────────────────────────────────
function MobileBottomNav({ tab, setTab, pending }) {
  const t = _globalTheme;
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: t.nav, borderTop: `1px solid ${t.border}`, display: "flex", zIndex: 300, paddingBottom: "env(safe-area-inset-bottom,0px)", backdropFilter: "blur(20px)" }}>
      {MOBILE_NAV.map(n => {
        const active = tab === n.id;
        const hasBadge = n.id === "installers" && pending > 0;
        return (
          <button key={n.id} onClick={() => setTab(n.id)} style={{ flex: 1, background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px 8px", cursor: "pointer", gap: 3, position: "relative" }}>
            {hasBadge && <span style={{ position: "absolute", top: 7, right: "calc(50% - 14px)", width: 7, height: 7, background: t.red, borderRadius: "50%", zIndex: 1 }} />}
            <div style={{ opacity: active ? 1 : .4, transition: "opacity .2s" }}>
              <n.Icon s={20} c={active ? t.accent : t.sub} />
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, color: active ? t.accent : t.sub, letterSpacing: .3 }}>{n.label}</span>
            {active && <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 20, height: 2, background: t.accent, borderRadius: "0 0 3px 3px" }} />}
          </button>
        );
      })}
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const sc = useScreen();
  const t = _globalTheme;

  const login = async () => {
    if (!email || !pw) { setErr("Please enter your email and password."); return; }
    setLoading(true); setErr("");
    const { error } = await sb.auth.signInWithPassword({ email, password: pw });
    if (error) setErr(error.message);
    else onLogin();
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", overflow: "hidden", background: t.bg }}>
      {/* ambient glow */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "60vw", height: "40vh", background: `radial-gradient(ellipse,rgba(${t.rgb},.1),transparent 70%)`, pointerEvents: "none", animation: "breathe 7s ease infinite" }} />
      <div style={{ position: "absolute", bottom: 0, right: "10%", width: "30vw", height: "30vh", background: `radial-gradient(ellipse,rgba(255,107,0,.07),transparent 70%)`, pointerEvents: "none" }} />

      {/* Card */}
      <div style={{ width: "100%", maxWidth: sc.isDesktop ? 440 : 380, position: "relative", zIndex: 1, animation: "fadeUp .5s ease" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ width: 60, height: 60, background: `linear-gradient(135deg,${t.accent},${t.accent2})`, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 16px", boxShadow: `0 0 50px rgba(${t.rgb},.35)`, animation: "float 3s ease infinite" }}>☀️</div>
          <div style={{ fontFamily: H, fontSize: sc.isDesktop ? 32 : 28, fontWeight: 900, color: t.text }}>Solar<span style={{ color: t.accent }}>IQ</span></div>
          <div style={{ fontSize: 11, color: t.sub, marginTop: 4, letterSpacing: 3, textTransform: "uppercase" }}>Admin Portal</div>
        </div>

        <div style={{ background: t.dark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.04)", border: `1px solid ${t.border}`, borderRadius: 20, padding: sc.isDesktop ? 36 : 28, backdropFilter: "blur(20px)" }}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 7, fontWeight: 700 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} placeholder="mail4tebello@gmail.com"
              style={{ width: "100%", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 11, padding: "13px 15px", color: t.text, fontSize: 14, fontFamily: B, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: err ? 16 : 26 }}>
            <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 7, fontWeight: 700 }}>Password</label>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} placeholder="••••••••••"
              style={{ width: "100%", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 11, padding: "13px 15px", color: t.text, fontSize: 14, fontFamily: B, outline: "none", boxSizing: "border-box" }} />
          </div>
          {err && <div style={{ fontSize: 12, color: t.red, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}><Ic.X c={t.red} /> {err}</div>}
          <button onClick={login} disabled={loading} style={{
            width: "100%", background: `linear-gradient(135deg,${t.accent},${t.accent2})`,
            border: "none", borderRadius: 11, padding: "14px", fontSize: 14, fontWeight: 800,
            color: t.dark ? "#000" : "#fff", cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? .7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: H,
          }}>
            {loading ? <><Spinner s={18} c={t.dark ? "#000" : "#fff"} /> Signing in...</> : "Sign in to Admin →"}
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: t.sub }}>🔒 Secured by Supabase Auth · SolarIQ Admin</div>
      </div>
    </div>
  );
}

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const getCSS = (t) => `
  @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{width:100%;min-height:100vh;background:${t.bg};color:${t.text};font-family:${B};overflow-x:hidden}
  ::-webkit-scrollbar{width:3px;height:3px}
  ::-webkit-scrollbar-thumb{background:rgba(${t.rgb},.4);border-radius:4px}
  input,textarea,select{outline:none;font-family:${B}}
  input::placeholder,textarea::placeholder{color:${t.sub}}
  select option{background:${t.dark ? "#111" : "#f0ede3"};color:${t.text}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
  @keyframes breathe{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
  @keyframes slideInRight{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
  input:focus,textarea:focus,select:focus{border-color:rgba(${t.rgb},.5)!important}
`;

// ─── MAIN ADMIN APP ────────────────────────────────────────────────────────────
export default function Admin() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [showNotif, setShowNotif] = useState(false);
  const [stats, setStats] = useState({ installers: 0, leads: 0, subscribers: 0, posts: 6, pending: 0, events: 0 });
  const [statsLoading, setStatsLoading] = useState(true);
  const sc = useScreen();

  // Set global theme
  _globalTheme = isDark ? DARK : LIGHT;
  const t = _globalTheme;

  useEffect(() => {
    sb.auth.getSession().then(({ data: { session } }) => { setSession(session); setLoading(false); });
    const { data: { subscription } } = sb.auth.onAuthStateChange((_, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    const load = async () => {
      setStatsLoading(true);
      try {
        const [inst, leads, subs, posts, pending] = await Promise.all([
          sb.from("installers").select("id", { count: "exact", head: true }).eq("status", "approved"),
          sb.from("leads").select("id", { count: "exact", head: true }),
          sb.from("subscribers").select("id", { count: "exact", head: true }),
          sb.from("posts").select("id", { count: "exact", head: true }).eq("published", true),
          sb.from("installers").select("id", { count: "exact", head: true }).eq("status", "pending"),
        ]);
        setStats({
          installers: (inst.count || 0) + SEED_INSTALLERS.filter(i => i.type === "installer" && i.status === "approved").length,
          leads: leads.count || 0,
          subscribers: subs.count || 0,
          posts: (posts.count || 0) + SEED_ARTICLES.length,
          pending: pending.count || 0,
          events: 4847,
        });
      } catch (e) { console.log(e); }
      setStatsLoading(false);
    };
    load();
  }, [session]);

  const signOut = async () => { await sb.auth.signOut(); setSession(null); };

  const sidebarW = sc.isMobile ? 0 : (collapsed ? t.navWc : t.navW);

  const PAGES = {
    dashboard: <Dashboard stats={stats} loading={statsLoading} />,
    installers: <InstallersPage />,
    leads: <LeadsPage />,
    blog: <BlogPage />,
    analytics: <AnalyticsPage />,
    subscribers: <SubscribersPage />,
    users: <UsersPage />,
    settings: <SettingsPage />,
    more: <MorePage setTab={setTab} />,
  };

  if (loading) return (
    <>
      <style>{getCSS(t)}</style>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, background: t.bg }}>
        <Spinner /><div style={{ fontSize: 13, color: t.sub }}>Loading SolarIQ Admin...</div>
      </div>
    </>
  );

  if (!session) return (
    <>
      <style>{getCSS(t)}</style>
      <Login onLogin={() => sb.auth.getSession().then(({ data: { session } }) => setSession(session))} />
    </>
  );

  return (
    <>
      <style>{getCSS(t)}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: t.bg, transition: "background .3s, color .3s" }}>
        {/* Desktop sidebar */}
        {!sc.isMobile && (
          <Sidebar tab={tab} setTab={setTab} collapsed={collapsed} setCollapsed={setCollapsed}
            onSignOut={signOut} pending={stats.pending} isDark={isDark} setIsDark={setIsDark} />
        )}

        {/* Mobile top bar */}
        {sc.isMobile && (
          <MobileTopBar tab={tab} onSignOut={signOut} pending={stats.pending}
            onNotif={() => setShowNotif(n => !n)} notifCount={NOTIFS.filter(n => n.unread).length}
            isDark={isDark} setIsDark={setIsDark} />
        )}

        {/* Main content */}
        <div style={{
          flex: 1, marginLeft: sc.isMobile ? 0 : sidebarW,
          transition: "margin-left .25s cubic-bezier(.4,0,.2,1)",
          paddingTop: sc.isMobile ? 54 : 0,
          paddingBottom: sc.isMobile ? 80 : 0,
          minWidth: 0, minHeight: "100vh",
        }}>
          {/* Desktop top bar */}
          {!sc.isMobile && (
            <div style={{ position: "sticky", top: 0, zIndex: 100, background: t.nav, borderBottom: `1px solid ${t.border}`, backdropFilter: "blur(20px)", padding: "0 32px", height: 52, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
              <a href={`${window.location.origin}?preview=solariq2026`} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 8, textDecoration: "none", background: t.card, border: `1px solid ${t.border}` }}>
                <Ic.Link s={12} c={t.sub} />
                <span style={{ fontSize: 11, color: t.sub, fontWeight: 600 }}>Live Site</span>
              </a>
              <button onClick={() => setShowNotif(n => !n)} style={{ position: "relative", background: t.card, border: `1px solid ${t.border}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                <Ic.Bell s={15} c={t.sub} />
                {NOTIFS.filter(n => n.unread).length > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 7, height: 7, background: t.red, borderRadius: "50%" }} />}
              </button>
            </div>
          )}

          <div style={{ padding: sc.isMobile ? "16px 14px" : sc.isTablet ? "24px 28px" : "28px 36px", maxWidth: 1440, margin: "0 auto" }}>
            {PAGES[tab] || PAGES.dashboard}
          </div>
        </div>

        {/* Mobile bottom nav */}
        {sc.isMobile && <MobileBottomNav tab={tab} setTab={setTab} pending={stats.pending} />}

        {/* Notification panel */}
        {showNotif && (
          <>
            <div onClick={() => setShowNotif(false)} style={{ position: "fixed", inset: 0, zIndex: 490, background: "rgba(0,0,0,.4)", backdropFilter: "blur(2px)" }} />
            <NotifPanel onClose={() => setShowNotif(false)} />
          </>
        )}
      </div>
    </>
  );
}

import { useState, useEffect, useRef, createContext, useContext, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── THEME (dark only) ────────────────────────────────────────
const DARK = {
  accent:"#f5a623", accent2:"#ff6b00", rgb:"245,166,35",
  bg:"#07090d", bgCard:"rgba(255,255,255,.04)", bgCard2:"rgba(255,255,255,.07)",
  border:"rgba(255,255,255,.08)", borderHi:"rgba(255,255,255,.15)",
  text:"#f0f0f0", textMid:"#aaa", sub:"#4a5068",
  navBg:"rgba(7,9,13,.97)", inputBg:"rgba(255,255,255,.06)",
};
const T = createContext(DARK);
const useT = () => useContext(T);
const H = "'Lexend',sans-serif";
const B = "'Plus Jakarta Sans',sans-serif";

// ─── LOGO ICON (ray-style, no box) ───────────────────────────
function SolarIQLogo({ s = 26, c = "#f5a623" }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4.5" fill={c} />
      <line x1="12" y1="2" x2="12" y2="5.5" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="18.5" x2="12" y2="22" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <line x1="2" y1="12" x2="5.5" y2="12" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <line x1="18.5" y1="12" x2="22" y2="12" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <line x1="4.93" y1="4.93" x2="7.34" y2="7.34" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <line x1="16.66" y1="16.66" x2="19.07" y2="19.07" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <line x1="19.07" y1="4.93" x2="16.66" y2="7.34" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <line x1="7.34" y1="16.66" x2="4.93" y2="19.07" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// ─── SVG ICONS ────────────────────────────────────────────────
const Ico = {
  Zap:         ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Battery:     ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/></svg>,
  Home:        ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Building:    ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="1"/><line x1="8" y1="7" x2="8" y2="7.01"/><line x1="12" y1="7" x2="12" y2="7.01"/><line x1="16" y1="7" x2="16" y2="7.01"/><line x1="8" y1="11" x2="8" y2="11.01"/><line x1="12" y1="11" x2="12" y2="11.01"/><line x1="16" y1="11" x2="16" y2="11.01"/><line x1="8" y1="15" x2="8" y2="15.01"/><line x1="12" y1="15" x2="12" y2="15.01"/></svg>,
  Wrench:      ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  FileText:    ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  Book:        ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Map:         ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  Search:      ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Settings:    ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Phone:       ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Globe:       ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Check:       ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  TrendUp:     ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Shield:      ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Stethoscope: ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>,
  AlertTriangle:({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Calendar:    ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Leaf:        ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
  Lightbulb:   ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
  Tv:          ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>,
  Fridge:      ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14H5V6z"/><line x1="5" y1="10" x2="19" y2="10"/><line x1="9" y1="14" x2="9" y2="17"/><line x1="9" y1="5" x2="9" y2="8"/></svg>,
  Wifi:        ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  Laptop:      ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>,
  Monitor:     ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Printer:     ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
  WashMachine: ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="12" cy="13" r="4"/><line x1="7" y1="6" x2="7.01" y2="6"/><line x1="11" y1="6" x2="11.01" y2="6"/></svg>,
  Flame:       ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  Droplets:    ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>,
  Wind:        ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>,
  Waves:       ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2"/></svg>,
  Lock:        ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  DoorOpen:    ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 4h3a2 2 0 0 1 2 2v14"/><path d="M2 20h3"/><path d="M13 20h9"/><path d="M10 12v.01"/><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561z"/></svg>,
  Sparkles:    ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/></svg>,
  Scale:       ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M7 21h10"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>,
  DollarSign:  ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  Coins:       ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>,
  ArrowRight:  ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Chart:       ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  Download:    ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Share:       ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  Mail:        ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  User:        ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Fire:        ({s=14,c="#f87171"})=><svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  GridIcon:    ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  PowerOff:    ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>,
  AlertCircle: ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
};

// ─── HOOKS ────────────────────────────────────────────────────
function useScreen() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { w, isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024 };
}

function useCount(x, ms = 1300) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let s = null;
    const f = ts => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / ms, 1);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * x));
      if (p < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }, [x]);
  return v;
}

// ─── GRID STATUS (EskomSePush) ─────────────────────────────
function useGridStatus() {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const key = import.meta.env.VITE_ESKOMSEPUSH_KEY;
    if (!key) return;
    fetch("https://developer.sepush.co.za/business/2.0/status", {
      headers: { token: key },
    })
      .then(r => r.json())
      .then(d => setStatus(d?.status))
      .catch(() => {});
  }, []);
  return status;
}

// ─── CONSTANTS ────────────────────────────────────────────────
const RATE = 3.20;
const SA_PROVINCES = ["All","Gauteng","Western Cape","KwaZulu-Natal","Eastern Cape","Free State","Mpumalanga","Limpopo","North West","Northern Cape"];

const APPLIANCES = [
  {id:"lights",   Icon:Ico.Lightbulb,  name:"Lights",           w:10,   h:6,   cat:"essentials"},
  {id:"tv",       Icon:Ico.Tv,         name:"TV",                w:120,  h:4,   cat:"essentials"},
  {id:"fridge",   Icon:Ico.Fridge,     name:"Fridge",            w:150,  h:24,  cat:"essentials"},
  {id:"wifi",     Icon:Ico.Wifi,       name:"WiFi Router",       w:15,   h:24,  cat:"essentials"},
  {id:"phone",    Icon:Ico.Phone,      name:"Phone Charger",     w:20,   h:3,   cat:"essentials"},
  {id:"laptop",   Icon:Ico.Laptop,     name:"Laptop",            w:65,   h:6,   cat:"work"},
  {id:"desktop",  Icon:Ico.Monitor,    name:"Desktop PC",        w:300,  h:6,   cat:"work"},
  {id:"printer",  Icon:Ico.Printer,    name:"Printer",           w:50,   h:1,   cat:"work"},
  {id:"washing",  Icon:Ico.WashMachine,name:"Washing Machine",   w:500,  h:1,   cat:"home"},
  {id:"microwave",Icon:Ico.Flame,      name:"Microwave",         w:1000, h:.5,  cat:"home"},
  {id:"kettle",   Icon:Ico.Flame,      name:"Kettle",            w:2000, h:.25, cat:"home"},
  {id:"geyser",   Icon:Ico.Droplets,   name:"Geyser",            w:3000, h:2,   cat:"home"},
  {id:"aircon",   Icon:Ico.Wind,       name:"Air Con",           w:1500, h:4,   cat:"comfort"},
  {id:"pool",     Icon:Ico.Waves,      name:"Pool Pump",         w:1100, h:6,   cat:"comfort"},
  {id:"security", Icon:Ico.Shield,     name:"Security System",   w:30,   h:24,  cat:"comfort"},
  {id:"gate",     Icon:Ico.DoorOpen,   name:"Gate Motor",        w:200,  h:.5,  cat:"comfort"},
];

// Updated QUIZ — replaced "load shedding" question with roof type question
const QUIZ = [
  {id:"size", q:"What size is your home?", hint:"Helps estimate your total energy needs", opts:[
    {label:"Studio / 1 Bed",  Icon:Ico.Home,     v:"s", kwh:8},
    {label:"2–3 Bedroom",     Icon:Ico.Home,     v:"m", kwh:18},
    {label:"4+ Bedroom",      Icon:Ico.Building, v:"l", kwh:30},
    {label:"Small Business",  Icon:Ico.Building, v:"b", kwh:45},
  ]},
  {id:"bill", q:"Your average monthly electricity bill?", hint:"Roughly is fine — helps calibrate your system size", opts:[
    {label:"Under R800",    Icon:Ico.Coins,      v:"lo", mult:.6},
    {label:"R800–R2 000",   Icon:Ico.Coins,      v:"md", mult:1},
    {label:"R2 000–R5 000", Icon:Ico.DollarSign, v:"hi", mult:1.8},
    {label:"Over R5 000",   Icon:Ico.DollarSign, v:"xh", mult:3},
  ]},
  {id:"goal", q:"What matters most to you?", hint:"This shapes the whole recommendation", opts:[
    {label:"Full grid independence",Icon:Ico.Battery, v:"bk", kw:3},
    {label:"Cut my electricity bill",Icon:Ico.Coins,  v:"sv", kw:5},
    {label:"Mostly self-sufficient", Icon:Ico.Leaf,   v:"og", kw:8},
    {label:"Complete off-grid",      Icon:Ico.Zap,    v:"fo", kw:12},
  ]},
  {id:"roof", q:"What is your roof type?", hint:"Affects installation method and panel positioning", opts:[
    {label:"Tile / Double Storey", Icon:Ico.Home,     v:"tile", bf:1.5},
    {label:"IBR / Corrugated",     Icon:Ico.Home,     v:"ibr",  bf:1.4},
    {label:"Concrete Flat Roof",   Icon:Ico.Building, v:"flat", bf:1.6},
    {label:"Farm / Large Property",Icon:Ico.Leaf,     v:"farm", bf:2.0},
  ]},
];

const INSTALLERS = [
  {id:1,name:"SunPower SA",city:"Johannesburg",prov:"Gauteng",rating:4.9,rev:312,sessa:true,jobs:847,yrs:12,badge:"Top Rated",resp:"2 hrs",spec:"Residential",brands:["Sunsynk","Victron"],price:"R80k–R200k",price_min:80000,price_max:200000,verified:true,about:"12 years installing solar across Gauteng. Specialise in hybrid systems for grid-independence. All installations include 5-year workmanship warranty. Fully SESSA-accredited with in-house engineers.",website:"sunpowersa.co.za",finance:true,contact_person:"Thabo Sithole",phone:"+27 82 111 2233",email:"info@sunpowersa.co.za",address:"14 Solar Park, Midrand, 1685",photos:[]},
  {id:2,name:"Cape Solar Pro",city:"Cape Town",prov:"Western Cape",rating:4.8,rev:198,sessa:true,jobs:523,yrs:9,badge:"Most Popular",resp:"3 hrs",spec:"Commercial & Residential",brands:["Deye","Sunsynk"],price:"R60k–R350k",price_min:60000,price_max:350000,verified:true,about:"Cape Town's leading solar installer for homes and businesses. Over 500 completed installations across the Western Cape. Specialise in large commercial systems.",website:"capesolar.co.za",finance:true,contact_person:"Pieter du Toit",phone:"+27 83 444 5566",email:"info@capesolar.co.za",photos:[]},
  {id:3,name:"KZN Solar Solutions",city:"Durban",prov:"KwaZulu-Natal",rating:4.7,rev:143,sessa:true,jobs:389,yrs:7,badge:null,resp:"4 hrs",spec:"Off-grid",brands:["Victron","Pylontech"],price:"R70k–R250k",price_min:70000,price_max:250000,verified:true,about:"KZN specialists in off-grid and hybrid systems. Serving coastal and inland properties with custom energy solutions.",website:"kznsolar.co.za",finance:false,contact_person:"Sipho Mthembu",phone:"+27 73 222 3344",email:"info@kznsolar.co.za",photos:[]},
  {id:4,name:"Pretoria Solar Works",city:"Pretoria",prov:"Gauteng",rating:4.6,rev:89,sessa:false,jobs:201,yrs:5,badge:"Fast Response",resp:"Same day",spec:"Residential",brands:["Growatt","Deye"],price:"R50k–R150k",price_min:50000,price_max:150000,verified:true,about:"Fast-response residential installer based in Pretoria. Same-day site assessments available. Competitive pricing with flexible payment options.",website:"pretoriasolar.co.za",finance:true,contact_person:"Jan van der Berg",phone:"+27 61 777 8899",email:"info@pretoriasolar.co.za",photos:[]},
  {id:5,name:"Green Energy EC",city:"Gqeberha",prov:"Eastern Cape",rating:4.5,rev:67,sessa:true,jobs:156,yrs:6,badge:null,resp:"5 hrs",spec:"Agricultural",brands:["Victron","Sunsynk"],price:"R90k–R400k",price_min:90000,price_max:400000,verified:false,about:"Agricultural solar specialists serving farms across the Eastern Cape. Large system experience up to 100kW.",website:"greenenergy-ec.co.za",finance:false,contact_person:"Anele Mpendulo",phone:"+27 84 333 4455",email:"info@greenenergyec.co.za",photos:[]},
  {id:6,name:"Solar Hub BFN",city:"Bloemfontein",prov:"Free State",rating:4.4,rev:44,sessa:true,jobs:98,yrs:4,badge:null,resp:"6 hrs",spec:"Residential",brands:["Deye","Growatt"],price:"R45k–R130k",price_min:45000,price_max:130000,verified:true,about:"Free State's most affordable verified installer. Budget-conscious solutions without compromising on quality components.",website:"solarhub-bfn.co.za",finance:true,contact_person:"Frikkie Botha",phone:"+27 72 555 6677",email:"info@solarhub.co.za",photos:[]},
  {id:7,name:"Mpumalanga Solar",city:"Nelspruit",prov:"Mpumalanga",rating:4.6,rev:58,sessa:false,jobs:134,yrs:5,badge:null,resp:"4 hrs",spec:"Commercial",brands:["Sunsynk"],price:"R100k–R300k",price_min:100000,price_max:300000,verified:true,about:"Commercial solar solutions across Mpumalanga and Limpopo. Specialise in retail, hospitality and light industrial.",website:"mpusolar.co.za",finance:false,contact_person:"Dumisani Nkosi",phone:"+27 79 888 9900",email:"info@mpusolar.co.za",photos:[]},
  {id:8,name:"Northern Cape Solar",city:"Kimberley",prov:"Northern Cape",rating:4.8,rev:31,sessa:true,jobs:76,yrs:8,badge:"High PSH Zone",resp:"3 hrs",spec:"Off-grid & Agricultural",brands:["Victron","Pylontech"],price:"R80k–R500k",price_min:80000,price_max:500000,verified:true,about:"Operating in one of SA's highest solar irradiance zones. Off-grid experts for farms and remote properties across the Northern Cape.",website:"ncapesolar.co.za",finance:false,contact_person:"Marius Louw",phone:"+27 82 999 0011",email:"info@ncapesolar.co.za",photos:[]},
];

const SA_PROVINCES_FILTER = ["All","Gauteng","Western Cape","KwaZulu-Natal","Eastern Cape","Free State","Mpumalanga","Limpopo","North West","Northern Cape"];
const SPECS = ["All","Residential","Commercial","Off-grid","Agricultural","Commercial & Residential","Off-grid & Agricultural"];
const BRANDS = ["All","Sunsynk","Victron","Deye","Growatt","Pylontech"];

const TECHS = [
  {id:1,name:"FixSolar SA",prov:"Gauteng",city:"Johannesburg",spec:"Inverter Repair",rating:4.9,rev:203,price:"R450/hr",emergency:true,brands:["Victron","Sunsynk","Deye","Growatt"],yrs:8,about:"Inverter repair specialists with same-day callouts across Gauteng. All major brands serviced. Genuine parts only.",website:"fixsolar.co.za",phone:"+27 81 111 2233",email:"info@fixsolar.co.za"},
  {id:2,name:"Panel Clean Pro",prov:"Western Cape",city:"Cape Town",spec:"Panel Cleaning",rating:4.8,rev:156,price:"R85/panel",emergency:false,brands:["All brands"],yrs:5,about:"Professional panel cleaning using deionised water systems. Proven to restore 15–25% lost efficiency. Regular contracts available.",website:"panelclean.co.za",phone:"+27 83 222 3344",email:"info@panelclean.co.za"},
  {id:3,name:"Battery Doctors",prov:"Gauteng",city:"Pretoria",spec:"Battery Replacement",rating:4.7,rev:98,price:"From R1 200",emergency:true,brands:["Pylontech","BSL","Freedom Won","Hubble"],yrs:6,about:"Battery health diagnostics and replacement across Gauteng. Full BMS configuration included. Emergency callouts 24/7.",website:"batterydoctors.co.za",phone:"+27 73 333 4455",email:"info@batterydoctors.co.za"},
  {id:4,name:"Solar Doctor KZN",prov:"KwaZulu-Natal",city:"Durban",spec:"Full System Service",rating:4.8,rev:87,price:"R1 800",emergency:false,brands:["All brands"],yrs:7,about:"Comprehensive annual service packages for all system types. Includes panel inspection, inverter check, battery test and full report.",website:"solardoctor-kzn.co.za",phone:"+27 84 444 5566",email:"info@solardoctorkzn.co.za"},
  {id:5,name:"InverterFix EC",prov:"Eastern Cape",city:"Gqeberha",spec:"Inverter Repair",rating:4.6,rev:54,price:"R350/hr",emergency:true,brands:["Sunsynk","Deye","Goodwe"],yrs:4,about:"Eastern Cape's fastest inverter repair service. Most repairs completed same day. Certified for Sunsynk and Deye warranties.",website:"inverterfixec.co.za",phone:"+27 72 555 6677",email:"info@inverterfixec.co.za"},
  {id:6,name:"Limpopo Solar Care",prov:"Limpopo",city:"Polokwane",spec:"Full System Service",rating:4.5,rev:41,price:"R1 500",emergency:false,brands:["All brands"],yrs:5,about:"Full system maintenance and servicing across Limpopo and Mpumalanga. Farm and residential specialists.",website:"limpopolar.co.za",phone:"+27 79 666 7788",email:"info@limpopolar.co.za"},
];
const TECH_SPECS_LIST = [...new Set(TECHS.map(x => x.spec))];
const TECH_PROVS = ["All","Gauteng","Western Cape","KwaZulu-Natal","Eastern Cape","Limpopo","Mpumalanga","Free State","North West","Northern Cape"];

const ERRORS = {
  "F01": {brand:"Sunsynk", title:"Grid voltage too high",         sev:"warning",  diy:true,  fix:"Grid voltage above safe range — usually a municipal issue. System auto-switches to battery. If persists over 2 hours, contact your installer.", specs:["Inverter Repair"]},
  "F02": {brand:"Sunsynk", title:"Grid voltage too low",          sev:"warning",  diy:true,  fix:"Grid voltage dropping below safe threshold. Common during power restoration. System will auto-reconnect once voltage stabilises.", specs:["Inverter Repair"]},
  "F32": {brand:"Sunsynk", title:"Battery over-temperature",      sev:"critical", diy:false, fix:"Battery overheating. Ensure ventilation immediately. Do NOT continue using — contact a technician urgently. Check for direct sunlight on battery bank.", specs:["Battery Replacement","Full System Service"]},
  "E001":{brand:"Victron", title:"Low battery shutdown",          sev:"warning",  diy:true,  fix:"Battery depleted to minimum safe level. System will resume once power is restored and battery begins charging.", specs:["Battery Replacement"]},
  "E002":{brand:"Victron", title:"Overload — too much power drawn",sev:"warning",  diy:true,  fix:"Drawing more power than the inverter can handle. Switch off heavy appliances (geyser, oven, aircon) and restart the inverter.", specs:["Inverter Repair"]},
  "E003":{brand:"Victron", title:"Inverter overheating",          sev:"critical", diy:false, fix:"Switch off immediately. Ensure 20cm clearance on all sides. Do not restart until cool to touch. If it recurs, the fan may need replacement.", specs:["Inverter Repair","Full System Service"]},
  "W001":{brand:"Deye",   title:"PV input voltage high",         sev:"info",     diy:true,  fix:"Panel voltage slightly above optimal. Usually resolves as panels cool in the afternoon. Monitor for 24 hours.", specs:["Full System Service"]},
  "W003":{brand:"Deye",   title:"Grid frequency out of range",   sev:"warning",  diy:true,  fix:"Municipal grid frequency is unstable. Common during periods of high demand. No action required — system handles this automatically.", specs:["Inverter Repair"]},
  "G01": {brand:"Growatt",title:"No grid connection detected",   sev:"info",     diy:true,  fix:"Check your mains breaker first. If mains is on and it is not a power outage, check the AC input wiring or contact your installer.", specs:["Inverter Repair"]},
  "G05": {brand:"Growatt",title:"Insulation resistance fault",   sev:"critical", diy:false, fix:"Serious fault — possible wiring insulation failure. Switch off at DC isolator immediately. Do not restart. Call a qualified electrician now.", specs:["Full System Service","Inverter Repair"]},
  "P01": {brand:"Pylontech",title:"Battery communication lost",  sev:"warning",  diy:false, fix:"Inverter has lost communication with the battery BMS. Check CAN/RS485 cable connections. May require firmware update. Contact your installer.", specs:["Full System Service","Battery Replacement"]},
  "H01": {brand:"Huawei", title:"Smart Meter connection error",  sev:"info",     diy:false, fix:"Dongle or smart meter has disconnected. Check USB dongle seating and WiFi connection. May require app re-pairing.", specs:["Full System Service"]},
};

const HEALTH_QS = [
  {id:"age",  q:"How old is your solar system?",             opts:["Under 1 year","1–3 years","3–5 years","5+ years"]},
  {id:"perf", q:"Is your system generating as expected?",    opts:["Yes, performing well","Slightly less output than before","Much less output than before","Not sure"]},
  {id:"snd",  q:"Any unusual sounds from your inverter?",    opts:["No unusual sounds","Occasional clicking","Constant humming or buzzing","Loud unusual noise"]},
  {id:"err",  q:"Any error codes or warning lights?",        opts:["No errors at all","Occasional warnings","Regular error codes","System is offline"]},
  {id:"cln",  q:"When were your panels last cleaned?",       opts:["Within 3 months","3–6 months ago","Over 6 months ago","Never cleaned"]},
  {id:"svc",  q:"Has your system had a professional service?",opts:["Within the last year","1–2 years ago","Never been serviced","Not sure"]},
];

const ARTICLES = [
  {id:1,tag:"Guide",hot:true,min:"7",views:"12.4k",title:"How much does a 5kW solar system cost in SA in 2026?",intro:"Solar prices have dropped significantly. Here's exactly what a complete 5kW system costs installed — and what drives the price.",body:[{h:"What's included in the quote?",p:"When an installer quotes a '5kW system' they mean the inverter size. A complete system includes inverter, 8–10 solar panels, battery bank, mounting, cabling and labour. Never compare quotes without confirming what's included."},{h:"Prices in 2026",p:"A 5kW hybrid system with 10kWh lithium battery typically costs R85,000–R140,000 fully installed. Gauteng tends to be cheaper than Cape Town due to higher competition."},{h:"The tax rebate most people miss",p:"SARS allows 25% of solar panel cost as a tax rebate — capped at R15,000. On R50,000 in panels that's R12,500 back. Claim via your ITR12 on eFiling."},{h:"Bottom line",p:"Budget R90,000–R120,000 for a quality system. Monthly savings of R1,500–R3,500 mean payback in 4–7 years. After that it's essentially free electricity."}],related:[2,3,6]},
  {id:2,tag:"Comparison",hot:true,min:"9",views:"8.9k",title:"Sunsynk vs Deye vs Victron — which inverter is best for SA?",intro:"Three brands dominate the SA inverter market. An honest comparison — no sponsorships.",body:[{h:"Sunsynk — the SA favourite",p:"South African-designed, handles grid instability well, excellent local support. Price: R12,000–R22,000. Best for typical SA suburban home."},{h:"Deye — the value choice",p:"Chinese-manufactured, best spec-per-rand. Solid reliability with a growing local support network. Price: R8,000–R16,000. Best for budget-conscious buyers."},{h:"Victron — the premium option",p:"Dutch-engineered gold standard. Best monitoring platform, fully modular and expandable. Price: R18,000–R45,000. Best for off-grid or premium installs."},{h:"Verdict",p:"For most SA homeowners: Sunsynk. Budget: Deye. Off-grid or premium: Victron. Avoid cheap generic brands with no local warranty support."}],related:[1,3,5]},
  {id:3,tag:"Tax",hot:false,min:"5",views:"6.2k",title:"How to claim your solar tax rebate from SARS — step by step",intro:"Most SA homeowners don't claim this. Here's exactly how to get up to R15,000 back.",body:[{h:"What qualifies?",p:"Only new and unused solar PV panels qualify. Batteries, inverters, mounting, cabling and labour do not qualify for the rebate."},{h:"How much can you claim?",p:"25% of the panel cost, capped at R15,000. This is a rebate directly against your personal income tax liability — not a deduction."},{h:"Documents you need",p:"Original invoice showing panel brand, model, wattage and cost itemised separately. Certificate of compliance. Proof of payment."},{h:"How to claim on eFiling",p:"On your ITR12 return, find the Solar Energy Tax Credit section. Enter the qualifying panel cost. SARS calculates the 25% automatically."}],related:[1,4,6]},
  {id:4,tag:"Maintenance",hot:false,min:"6",views:"4.8k",title:"Is your solar system actually working properly? 7 signs it isn't",intro:"Many SA solar systems quietly underperform for months. Here are the warning signs.",body:[{h:"Backup duration has dropped",p:"If your battery used to last 4 hours and now lasts 2, capacity has degraded or charge settings have shifted. Lithium LFP should retain 80% capacity after 3,000 cycles."},{h:"Your electricity bill hasn't dropped",p:"If bills haven't reduced, the system may be undersized, panels may be shaded by new obstructions, or inverter settings may need adjustment."},{h:"Panels haven't been cleaned in 6+ months",p:"Dirty panels lose up to 25% output. At R85–R150 per panel every 3–6 months, professional cleaning is the best maintenance investment you can make."},{h:"You're ignoring error codes",p:"Some codes are informational. Others are early warnings of serious issues. Use the Error Code Translator below to check what yours means."}],related:[1,2,3]},
  {id:5,tag:"Guide",hot:false,min:"8",views:"3.9k",title:"Off-grid vs grid-tied solar in South Africa — the honest truth",intro:"The dream of no electricity bill is real — but not for everyone.",body:[{h:"Grid-tied: cheapest but limited",p:"No battery, no backup during outages. System automatically switches off when grid power fails. Only makes sense if you're in an area with a completely reliable grid."},{h:"Hybrid: the SA sweet spot",p:"Grid connection plus battery backup. Handles power outages, significantly reduces your bill. What 95% of SA residential installations should be. Cost: R80,000–R200,000."},{h:"Off-grid: freedom with a price tag",p:"Requires 3× the battery capacity of hybrid to cover multiple cloudy days. Makes financial sense for farms and remote properties — generally not for urban homes."},{h:"Our recommendation",p:"For urban SA: go hybrid. Size your battery for 2× your typical outage duration with a 20% buffer for cloudy days."}],related:[1,2,6]},
  {id:6,tag:"Comparison",hot:true,min:"10",views:"7.1k",title:"Best solar panels available in South Africa — ranked 2026",intro:"Not all solar panels are equal. The top panels available through SA installers right now.",body:[{h:"What to look for",p:"Four numbers matter: efficiency percentage, power output in Wp, annual degradation rate (aim under 0.5%/year), and product warranty length (25 years is standard from reputable brands)."},{h:"Tier 1: JA Solar & Longi",p:"Bloomberg Tier 1 bankable panels. They dominate SA installations for good reason. Efficiency 21–22.5%. R2,200–R3,200 per 550Wp panel installed."},{h:"Tier 1: Canadian Solar",p:"Strong warranty support with SA representation, 20.5–21.5% efficiency, available through most major SA distributors."},{h:"What to avoid",p:"Generic unbranded panels and obscure Chinese brands with no local warranty support. A panel fault in year 5 with no recourse is an expensive lesson."}],related:[1,2,5]},
  {id:7,tag:"News",hot:true,min:"5",views:"3.1k",title:"Sodium-ion batteries are coming to SA — and they could change everything",intro:"A new battery technology is making its way to South Africa. Cheaper than lithium, no cobalt, doesn't catch fire.",coverImg:"https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",body:[{h:"What is sodium-ion?",p:"Sodium-ion batteries use sodium instead of lithium to store energy. Sodium is the 6th most abundant element on Earth — compared to lithium which is scarce and geographically concentrated."},{h:"Why it matters for South Africa",p:"SA's solar market has seen massive battery demand. Sodium-ion could break supply constraints — manufactured anywhere, without the rare minerals that make lithium batteries expensive."},{h:"Current specs",p:"Na-ion cells hit 140–160 Wh/kg energy density — roughly 70–80% of lithium LFP. Slightly larger pack for the same storage, but safer chemistry and better performance in high-temperature environments."},{h:"Should you wait?",p:"No. If you need solar now, install lithium LFP. Na-ion is 12–18 months away from competitive SA pricing. It's a future upgrade option, not a reason to delay."}],related:[1,2,6]},
  {id:8,tag:"Review",hot:false,min:"11",views:"2.4k",title:"Pylontech US3000C review — is it still the best home battery for SA in 2026?",intro:"The Pylontech US3000C has been SA's most popular home battery for three years. We tested one in a real Johannesburg household for 60 days.",coverImg:"https://images.unsplash.com/photo-1620714223084-8fcacc2dbe6d?w=800&q=80",body:[{h:"Specs at a glance",p:"3.5kWh usable capacity. 48V nominal. LFP chemistry. 6,000 cycle life to 80% retention. Max 74A charge/discharge. CAN/RS485 comms. Stackable to 8 units (28kWh). Weight 34kg."},{h:"Installation",p:"The US3000C pairs with Sunsynk automatically via CAN — no manual parameter setting. Rack mounting is straightforward. Full setup took about 40 minutes."},{h:"60-day performance in Johannesburg",p:"Test home: 3 bedroom in Northcliff, 22kWh average daily consumption. Single US3000C handled 2-hour outage slots comfortably running lights, WiFi, TV and a small fridge."},{h:"Verdict",p:"Still one of the safest bets in SA. Consistent performance, rock-solid BMS communication, and the best local warranty support in the market. If budget allows, look at the US5000 for better kWh-per-rand."}],rating:{overall:4.4,value:4.0,build:5.0,software:3.5,support:4.5},related:[1,2,6]},
];

// ─── RESULT CALCULATOR ────────────────────────────────────────
function makeResult(d, k, bf = 1.5) {
  const invKva = Math.max(3, Math.ceil(k * 1.25));
  const mo = Math.round(d * 30 * RATE);
  const cost = Math.round(k * 18000);
  const save = Math.round(mo * 12 * .75);
  return { systemKw: k, battKwh: Math.round(k * bf * 10) / 10, invKva, cost, annSave: save, mo, payback: (cost / save).toFixed(1), dailyKwh: Math.round(d * 10) / 10, panels: Math.ceil(k / .55) };
}

// ─── PRIMITIVES ───────────────────────────────────────────────
function PBtn({ children, onClick, disabled, sm, style = {}, full }) {
  const t = useT();
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: disabled ? "rgba(128,128,128,.15)" : `linear-gradient(135deg,${t.accent},${t.accent2})`,
        color: disabled ? "#666" : "#000",
        border: "none",
        borderRadius: 30,
        padding: sm ? "10px 20px" : "13px 28px",
        fontSize: sm ? 13 : 14,
        fontWeight: 800,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: B,
        transition: "all .2s",
        transform: hov && !disabled ? "scale(1.03)" : "scale(1)",
        boxShadow: hov && !disabled ? `0 0 20px rgba(${t.rgb},.45)` : "none",
        width: full ? "100%" : "auto",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function Lbl({ children, center }) {
  const t = useT();
  return <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, marginBottom: 8, fontFamily: B, textAlign: center ? "center" : "left" }}>{children}</div>;
}

function BackBtn({ onClick }) {
  const t = useT();
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: "none", border: "none", color: hov ? t.accent : t.sub, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6, fontWeight: 600, marginBottom: 20, padding: 0, fontFamily: B, transition: "color .2s" }}
    >
      ← Back
    </button>
  );
}

function Tag({ children, color }) {
  const t = useT();
  const c = color || t.accent;
  return <span style={{ fontSize: 10, fontWeight: 700, background: `${c}18`, color: c, padding: "3px 9px", borderRadius: 20, letterSpacing: .5 }}>{children}</span>;
}

function Stars({ n }) {
  return <span style={{ color: "#f0c040", fontSize: 12 }}>{"★".repeat(Math.floor(n))}<span style={{ color: "#555" }}> {n}</span></span>;
}

// ─── HOVER CARD ───────────────────────────────────────────────
function HoverCard({ children, style = {}, onClick, glowColor }) {
  const t = useT();
  const [hov, setHov] = useState(false);
  const gc = glowColor || t.accent;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: t.bgCard,
        border: `1px solid ${hov ? `rgba(${t.rgb},.3)` : t.border}`,
        borderRadius: 14,
        transition: "all .22s cubic-bezier(.4,0,.2,1)",
        transform: hov && onClick ? "scale(1.015)" : "none",
        boxShadow: hov && onClick ? `0 0 24px rgba(${t.rgb},.12)` : "none",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── PAGE TRANSITION ─────────────────────────────────────────
function PageFade({ children, k }) {
  return (
    <div key={k} style={{ animation: "siqFadeUp .35s cubic-bezier(.4,0,.2,1) both" }}>
      {children}
    </div>
  );
}

// ─── PRO CALCULATOR ───────────────────────────────────────────
function ProCalc({ onResult }) {
  const t = useT();
  const sc = useScreen();
  const [v, setV] = useState({ kwh: 20, psh: 4.5, loss: 20, invKva: 5, batAh: 200, batV: 48, dod: 80, type: "hybrid" });
  const [open, setOpen] = useState({ load: true, battery: false, type: true });
  const up = (k, val) => setV(p => ({ ...p, [k]: val }));
  const tog = k => setOpen(p => ({ ...p, [k]: !p[k] }));
  const panels = Math.ceil((v.kwh / (v.psh * (1 - v.loss / 100))) / .55);
  const syskw = panels * .55, batKwh = (v.batAh * v.batV * (v.dod / 100)) / 1000;
  const backupH = (batKwh / (v.kwh / 24)).toFixed(1), cost = Math.round(syskw * 18000);
  const save = Math.round(v.kwh * 365 * RATE * .75), payback = (cost / save).toFixed(1);

  const NI = ({ k, label, desc, min, max, step, unit }) => (
    <HoverCard style={{ padding: "12px 14px", borderRadius: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text, fontFamily: B }}>{label}</div>
          {desc && <div style={{ fontSize: 10, color: t.sub, marginTop: 2 }}>{desc}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <button onClick={() => up(k, Math.max(min, parseFloat((v[k] - step).toFixed(2))))} style={{ width: 34, height: 34, borderRadius: 8, background: `rgba(${t.rgb},.12)`, border: `1px solid rgba(${t.rgb},.2)`, color: t.text, cursor: "pointer", fontSize: 20, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, lineHeight: 1, fontFamily: B, transition: "background .15s" }}>−</button>
          <div style={{ textAlign: "center", minWidth: 58, flexShrink: 0 }}>
            <div style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 800, color: t.accent }}>{v[k]}</div>
            <div style={{ fontSize: 9, color: t.sub }}>{unit}</div>
          </div>
          <button onClick={() => up(k, Math.min(max, parseFloat((v[k] + step).toFixed(2))))} style={{ width: 34, height: 34, borderRadius: 8, background: `rgba(${t.rgb},.12)`, border: `1px solid rgba(${t.rgb},.2)`, color: t.text, cursor: "pointer", fontSize: 20, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, lineHeight: 1, fontFamily: B, transition: "background .15s" }}>+</button>
        </div>
      </div>
    </HoverCard>
  );

  const SecHead = ({ id, SvgIcon, label }) => (
    <button onClick={() => tog(id)} style={{ width: "100%", background: "none", border: "none", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "7px 0", marginBottom: open[id] ? 10 : 0 }}>
      <SvgIcon s={14} c={t.accent} />
      <span style={{ fontSize: 10, color: t.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, fontFamily: B, flex: 1, textAlign: "left" }}>{label}</span>
      <span style={{ fontSize: 14, color: t.sub, transition: "transform .25s", display: "inline-block", transform: open[id] ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
    </button>
  );

  const results = (
    <div style={{ background: `linear-gradient(135deg,rgba(${t.rgb},.1),rgba(${t.rgb},.04))`, border: `1px solid rgba(${t.rgb},.2)`, borderRadius: 16, padding: "18px" }}>
      <div style={{ fontSize: 10, color: t.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 14, fontFamily: B, display: "flex", alignItems: "center", gap: 6 }}><Ico.Chart s={12} c={t.accent} /> Live Results</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
        {[["Panels", `${panels}×`, "550Wp"], ["Array", `${syskw.toFixed(1)}kWp`, "Total"], ["Battery", `${batKwh.toFixed(1)}kWh`, "Usable"], ["Backup", `${backupH}h`, "Avg load"], ["Inverter", `${v.invKva}kVA`, "Min"], ["Cost", `R${(cost / 1000).toFixed(0)}k`, "Installed"]].map(([l, val, s]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: H, fontSize: 18, fontWeight: 900, color: t.accent }}>{val}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: t.text, marginBottom: 1, fontFamily: H }}>{l}</div>
            <div style={{ fontSize: 9, color: t.sub }}>{s}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        <div style={{ background: `rgba(${t.rgb},.06)`, borderRadius: 9, padding: "9px 12px" }}>
          <div style={{ fontSize: 10, color: t.sub, marginBottom: 2 }}>Annual savings</div>
          <div style={{ fontFamily: H, fontSize: 18, fontWeight: 900, color: "#4ade80" }}>R{save.toLocaleString()}</div>
        </div>
        <div style={{ background: `rgba(${t.rgb},.06)`, borderRadius: 9, padding: "9px 12px" }}>
          <div style={{ fontSize: 10, color: t.sub, marginBottom: 2 }}>Payback period</div>
          <div style={{ fontFamily: H, fontSize: 18, fontWeight: 900, color: t.accent }}>{payback} yrs</div>
        </div>
      </div>
      <div style={{ background: "rgba(0,0,0,.3)", borderRadius: 9, padding: "10px 13px", fontFamily: "monospace", fontSize: 11, color: t.sub, lineHeight: 1.9 }}>
        <div style={{ color: t.accent, fontWeight: 700, marginBottom: 3 }}>// Technical Specification</div>
        <div>Load: {v.kwh} kWh/day @ {v.psh} PSH</div>
        <div>PV: {panels} × 550Wp = {syskw.toFixed(2)} kWp</div>
        <div>Battery: {v.batAh}Ah × {v.batV}V × {v.dod}% = {batKwh.toFixed(2)} kWh</div>
        <div>System type: {v.type}</div>
      </div>
      <PBtn style={{ width: "100%", marginTop: 12 }} onClick={() => onResult(makeResult(v.kwh, parseFloat(syskw.toFixed(1))))}>Generate Full Report →</PBtn>
    </div>
  );

  const inputs = (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: `rgba(${t.rgb},.12)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ico.Settings s={18} c={t.accent} /></div>
        <div>
          <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: t.text }}>Pro Calculator</div>
          <div style={{ fontSize: 12, color: t.sub }}>Full technical parameters — for engineers and enthusiasts</div>
        </div>
      </div>
      <div style={{ background: `rgba(${t.rgb},.05)`, border: `1px solid rgba(${t.rgb},.15)`, borderRadius: 10, padding: "9px 14px", marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
        <Ico.Lightbulb s={14} c={t.accent} /><span style={{ fontSize: 12, color: t.sub }}>Tap + / − to adjust. Results update live.</span>
      </div>
      <div style={{ marginBottom: 4 }}>
        <SecHead id="load" SvgIcon={Ico.Zap} label="Load & Generation" />
        {open.load && (
          <div style={{ display: "grid", gridTemplateColumns: sc.isMobile ? "1fr" : "1fr 1fr", gap: 8, marginBottom: 14 }}>
            <NI k="kwh" label="Daily Consumption" desc="Total kWh/day" min={1} max={150} step={0.5} unit="kWh/day" />
            <NI k="psh" label="Peak Sun Hours" desc="SA avg 4.5–5.5 hrs" min={2} max={7} step={0.1} unit="hours" />
            <NI k="loss" label="System Losses" desc="Wiring + inverter + temp" min={5} max={40} step={1} unit="%" />
            <NI k="invKva" label="Inverter Size" desc="Handle peak load + 20%" min={1} max={30} step={0.5} unit="kVA" />
          </div>
        )}
      </div>
      <div style={{ marginBottom: 4 }}>
        <SecHead id="battery" SvgIcon={Ico.Battery} label="Battery Bank" />
        {open.battery && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8, marginBottom: 14 }}>
            <NI k="batAh" label="Capacity (Amp-hours)" desc="Total Ah" min={50} max={2000} step={25} unit="Ah" />
            <NI k="batV" label="Voltage" desc="12 / 24 / 48V" min={12} max={96} step={12} unit="V" />
            <NI k="dod" label="Depth of Discharge" desc="LiFePO4: 90%" min={20} max={100} step={5} unit="%" />
          </div>
        )}
      </div>
      <div style={{ marginBottom: 14 }}>
        <SecHead id="type" SvgIcon={Ico.Settings} label="System Type" />
        {open.type && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 4 }}>
            {[["hybrid", "Hybrid", "SA sweet spot"], ["gridtied", "Grid-Tied", "No battery"], ["offgrid", "Off-Grid", "Full independence"]].map(([k, lbl, desc]) => (
              <div key={k} onClick={() => up("type", k)} style={{ background: v.type === k ? `rgba(${t.rgb},.1)` : t.bgCard, border: `1px solid ${v.type === k ? `rgba(${t.rgb},.35)` : t.border}`, borderRadius: 12, padding: "12px 10px", cursor: "pointer", textAlign: "center", transition: "all .2s" }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: v.type === k ? t.accent : "transparent", border: `2px solid ${v.type === k ? t.accent : t.sub}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}>
                  {v.type === k && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: v.type === k ? t.accent : t.text, fontFamily: H }}>{lbl}</div>
                <div style={{ fontSize: 10, color: t.sub, marginTop: 2 }}>{desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return sc.isDesktop ? (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
      <div>{inputs}</div>
      <div style={{ position: "sticky", top: 80 }}>{results}</div>
    </div>
  ) : (
    <div>{inputs}{results}</div>
  );
}

// ─── CALCULATOR ───────────────────────────────────────────────
function Calculator({ onResult }) {
  const t = useT();
  const sc = useScreen();
  const [mode, setMode] = useState(null);
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({});
  const [apps, setApps] = useState({});
  const [bill, setBill] = useState("");
  const [cat, setCat] = useState("essentials");
  const [fade, setFade] = useState(false);
  const go = fn => { setFade(true); setTimeout(() => { fn(); setFade(false); }, 200); };

  const appCount = Object.values(apps).filter(h => h > 0).length;
  const fromApps = () => {
    const wh = Object.entries(apps).reduce((s, [id, h]) => {
      const a = APPLIANCES.find(x => x.id === id);
      return s + (a && h > 0 ? a.w * h : 0);
    }, 0);
    const d = wh / 1000;
    onResult(makeResult(d, Math.max(2, Math.ceil(d / 4))));
  };
  const fromBill = () => {
    const b = parseFloat(bill);
    if (!b) return;
    const d = b / RATE / 30;
    onResult(makeResult(d, Math.max(2, Math.ceil(d / 4))));
  };

  if (!mode) return (
    <div style={{ opacity: fade ? 0 : 1, transition: "opacity .2s", animation: "siqFadeUp .5s ease" }}>
      <div style={{ textAlign: "center", marginBottom: sc.isDesktop ? 40 : 28 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `rgba(${t.rgb},.08)`, border: `1px solid rgba(${t.rgb},.2)`, borderRadius: 20, padding: "5px 14px", marginBottom: 16 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.accent, display: "inline-block" }} />
          <span style={{ fontSize: 11, color: t.accent, fontWeight: 700, letterSpacing: 1 }}>NO TECHNICAL KNOWLEDGE NEEDED</span>
        </div>
        <h2 style={{ fontFamily: H, fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: t.text, lineHeight: 1.05, marginBottom: 12 }}>Find Your Perfect Solar Setup</h2>
        <p style={{ color: t.sub, fontSize: 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>Four ways to calculate your system — pick the one that works for you.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "repeat(4,1fr)" : "1fr 1fr", gap: sc.isDesktop ? 16 : 12, maxWidth: sc.isDesktop ? 960 : undefined, margin: "0 auto" }}>
        {[
          { k: "simple",   Icon: Ico.Sparkles, title: "Quick & Easy",   sub: "4 questions. 60 seconds.",    badge: "Most Popular" },
          { k: "appliance",Icon: Ico.GridIcon,  title: "By Appliances", sub: "Pick every device you own.",   badge: "Most Accurate" },
          { k: "bill",     Icon: Ico.FileText,  title: "From My Bill",  sub: "Enter your electricity bill.", badge: "Fastest" },
          { k: "engineer", Icon: Ico.Settings,  title: "Pro Calculator",sub: "Full technical inputs.",       badge: "Pro" },
        ].map(c => {
          const [hov, setHov] = useState(false);
          return (
            <div key={c.k} onClick={() => go(() => setMode(c.k))}
              onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
              style={{ background: hov ? `rgba(${t.rgb},.07)` : t.bgCard, border: `1px solid ${hov ? `rgba(${t.rgb},.4)` : t.border}`, borderRadius: 16, padding: sc.isDesktop ? "28px 22px" : "20px 16px", cursor: "pointer", transition: "all .22s", position: "relative", transform: hov ? "scale(1.03)" : "scale(1)", boxShadow: hov ? `0 0 28px rgba(${t.rgb},.18)` : "none" }}>
              <div style={{ position: "absolute", top: 10, right: 10, fontSize: 9, background: `rgba(${t.rgb},.15)`, color: t.accent, padding: "2px 7px", borderRadius: 10, fontWeight: 700 }}>{c.badge}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: 14, background: `rgba(${t.rgb},.1)`, marginBottom: 14 }}><c.Icon s={24} c={t.accent} /></div>
              <div style={{ fontFamily: H, fontSize: sc.isDesktop ? 18 : 16, fontWeight: 700, color: t.text, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.5 }}>{c.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (mode === "engineer") return (
    <div style={{ opacity: fade ? 0 : 1, transition: "opacity .2s" }}>
      <BackBtn onClick={() => go(() => setMode(null))} />
      <ProCalc onResult={onResult} />
    </div>
  );

  if (mode === "bill") return (
    <div style={{ opacity: fade ? 0 : 1, transition: "opacity .2s", animation: "siqFadeUp .4s ease" }}>
      <BackBtn onClick={() => go(() => setMode(null))} />
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: `rgba(${t.rgb},.1)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ico.FileText s={28} c={t.accent} />
          </div>
        </div>
        <h3 style={{ fontFamily: H, fontSize: 28, fontWeight: 900, color: t.text, marginBottom: 6 }}>Your Monthly Bill</h3>
        <p style={{ color: t.sub, fontSize: 14, marginBottom: 28 }}>Enter approximately what you pay for electricity per month</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20 }}>
          <span style={{ fontSize: 28, color: t.accent, fontWeight: 700 }}>R</span>
          <input type="number" placeholder="0" value={bill} onChange={e => setBill(e.target.value)}
            style={{ background: "transparent", border: "none", outline: "none", fontSize: sc.isMobile ? 48 : 64, fontFamily: H, fontWeight: 900, color: t.text, width: 220, textAlign: "center" }} />
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
          {[500, 1200, 2500, 4000].map(n => {
            const [hov, setHov] = useState(false);
            return (
              <button key={n} onClick={() => setBill(String(n))}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{ background: bill == n ? `rgba(${t.rgb},.15)` : t.bgCard, border: `1px solid ${bill == n ? t.accent : hov ? `rgba(${t.rgb},.3)` : t.border}`, color: bill == n ? t.accent : hov ? t.textMid : t.sub, padding: "9px 18px", borderRadius: 25, cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all .2s", fontFamily: B }}>
                R{n.toLocaleString()}
              </button>
            );
          })}
        </div>
        <PBtn onClick={fromBill} disabled={!bill} full style={{ maxWidth: 340, margin: "0 auto", display: "flex" }}>Calculate My System →</PBtn>
      </div>
    </div>
  );

  if (mode === "appliance") return (
    <div style={{ opacity: fade ? 0 : 1, transition: "opacity .2s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <BackBtn onClick={() => go(() => setMode(null))} />
        {appCount > 0 && <div style={{ fontSize: 12, color: t.accent, background: `rgba(${t.rgb},.1)`, padding: "4px 12px", borderRadius: 20, fontWeight: 700 }}>{appCount} selected</div>}
      </div>
      <h3 style={{ fontFamily: H, fontSize: 26, fontWeight: 900, color: t.text, marginBottom: 4 }}>Select Your Appliances</h3>
      <p style={{ color: t.sub, fontSize: 13, marginBottom: 16 }}>Tap each appliance you use regularly — adjust daily hours</p>
      <div style={{ display: "flex", borderBottom: `1px solid ${t.border}`, marginBottom: 18, overflowX: "auto" }}>
        {["essentials", "work", "home", "comfort"].map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ background: "none", border: "none", borderBottom: `2px solid ${cat === c ? t.accent : "transparent"}`, color: cat === c ? t.accent : t.sub, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600, textTransform: "capitalize", transition: "all .2s", fontFamily: B, whiteSpace: "nowrap" }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "repeat(auto-fill,minmax(140px,1fr))" : sc.isTablet ? "repeat(auto-fill,minmax(120px,1fr))" : "repeat(auto-fill,minmax(100px,1fr))", gap: 10, marginBottom: 28 }}>
        {APPLIANCES.filter(a => a.cat === cat).map(app => {
          const active = apps[app.id] > 0;
          const hrs = apps[app.id] || 0;
          const [hov, setHov] = useState(false);
          return (
            <div key={app.id}
              onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
              style={{ background: active ? `rgba(${t.rgb},.08)` : hov ? t.bgCard2 : t.bgCard, border: `1px solid ${active ? `rgba(${t.rgb},.4)` : hov ? `rgba(${t.rgb},.2)` : t.border}`, borderRadius: 14, padding: 12, textAlign: "center", transition: "all .2s", cursor: active ? "default" : "pointer", transform: hov && !active ? "scale(1.02)" : "none", boxShadow: active ? `0 0 16px rgba(${t.rgb},.12)` : "none" }}
              onClick={active ? undefined : () => setApps({ ...apps, [app.id]: app.h })}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, background: active ? `rgba(${t.rgb},.12)` : t.bgCard2, margin: "0 auto 6px" }}>
                <app.Icon s={20} c={active ? t.accent : t.sub} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: active ? t.text : t.sub, marginBottom: 2, fontFamily: B }}>{app.name}</div>
              <div style={{ fontSize: 10, color: t.sub, opacity: .7 }}>{app.w}W</div>
              {active && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 9, color: t.sub, marginBottom: 4 }}>hrs/day</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <button onClick={e => { e.stopPropagation(); const newHrs = Math.max(.25, hrs - .25); if (newHrs <= 0) { const next = { ...apps }; delete next[app.id]; setApps(next); } else setApps({ ...apps, [app.id]: newHrs }); }} style={{ background: `rgba(${t.rgb},.15)`, border: `1px solid rgba(${t.rgb},.2)`, color: t.text, width: 28, height: 28, borderRadius: 7, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>-</button>
                    <span style={{ fontSize: 13, fontWeight: 800, color: t.accent, minWidth: 24, textAlign: "center" }}>{hrs}</span>
                    <button onClick={e => { e.stopPropagation(); setApps({ ...apps, [app.id]: Math.min(24, hrs + .25) }); }} style={{ background: `rgba(${t.rgb},.15)`, border: `1px solid rgba(${t.rgb},.2)`, color: t.text, width: 28, height: 28, borderRadius: 7, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>+</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <PBtn onClick={fromApps} disabled={appCount === 0} full>
        {appCount > 0 ? `Calculate ${appCount} Appliance${appCount !== 1 ? "s" : ""} →` : "Select at least one appliance"}
      </PBtn>
    </div>
  );

  // Quick quiz mode
  const q = QUIZ[step];
  return (
    <div style={{ opacity: fade ? 0 : 1, transition: "opacity .2s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <BackBtn onClick={() => step === 0 ? go(() => setMode(null)) : go(() => setStep(s => s - 1))} />
        <div style={{ display: "flex", gap: 4 }}>
          {QUIZ.map((_, i) => <div key={i} style={{ width: i === step ? 22 : 6, height: 6, borderRadius: 3, background: i <= step ? t.accent : `rgba(${t.rgb},.15)`, transition: "all .3s" }} />)}
        </div>
        <div style={{ fontSize: 12, color: t.sub, fontWeight: 600 }}>{step + 1}/{QUIZ.length}</div>
      </div>
      <div key={step} style={{ animation: "siqFadeUp .3s ease", maxWidth: sc.isDesktop ? 720 : undefined, margin: sc.isDesktop ? "0 auto" : undefined }}>
        <div style={{ textAlign: "center", marginBottom: sc.isDesktop ? 36 : 24 }}>
          <h3 style={{ fontFamily: H, fontSize: sc.isDesktop ? "clamp(22px,3vw,32px)" : "clamp(18px,4vw,24px)", fontWeight: 900, color: t.text, marginBottom: 8 }}>{q.q}</h3>
          <p style={{ color: t.sub, fontSize: 14 }}>{q.hint}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "repeat(4,1fr)" : "1fr 1fr", gap: sc.isDesktop ? 14 : 12 }}>
          {q.opts.map(o => {
            const sel = ans[q.id] === o.v;
            const [hov, setHov] = useState(false);
            return (
              <button key={o.v}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                onClick={() => {
                  const na = { ...ans, [q.id]: o.v };
                  setAns(na);
                  if (step < QUIZ.length - 1) setTimeout(() => go(() => setStep(s => s + 1)), 180);
                  else setTimeout(() => {
                    const sz = QUIZ[0].opts.find(x => x.v === na[QUIZ[0].id]);
                    const bl = QUIZ[1].opts.find(x => x.v === na[QUIZ[1].id]);
                    const gl = QUIZ[2].opts.find(x => x.v === na[QUIZ[2].id]);
                    const rf = QUIZ[3].opts.find(x => x.v === na[QUIZ[3].id]);
                    onResult(makeResult((sz?.kwh || 18) * (bl?.mult || 1), gl?.kw || 5, rf?.bf || 1.5));
                  }, 200);
                }}
                style={{ background: sel ? `rgba(${t.rgb},.12)` : hov ? t.bgCard2 : t.bgCard, border: `1px solid ${sel ? t.accent : hov ? `rgba(${t.rgb},.3)` : t.border}`, borderRadius: 16, padding: sc.isDesktop ? "22px 16px" : "16px 12px", cursor: "pointer", textAlign: "center", transition: "all .2s", transform: hov && !sel ? "scale(1.03)" : "scale(1)", boxShadow: sel ? `0 0 20px rgba(${t.rgb},.2)` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: 14, background: `rgba(${t.rgb},.1)`, marginBottom: 10, margin: "0 auto 10px" }}>
                  <o.Icon s={24} c={t.accent} />
                </div>
                <div style={{ fontFamily: H, fontSize: sc.isMobile ? 13 : 15, fontWeight: 700, color: sel ? t.accent : t.text }}>{o.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── PDF GENERATION (print-friendly) ────────────────────────
function generateResultsPDF(r) {
  const acc = "#c47a0a";
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>SolarIQ System Report</title><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#111;padding:32px 40px;max-width:794px;margin:0 auto}
  .header{display:flex;align-items:center;justify-content:space-between;padding-bottom:20px;border-bottom:2px solid ${acc};margin-bottom:24px}
  .logo{display:flex;align-items:center;gap:10px;font-size:22px;font-weight:900;color:#111}
  .logo span{color:${acc}}
  .date{font-size:12px;color:#888}
  .hero{background:linear-gradient(135deg,#fff8ee,#fff3d6);border:1px solid ${acc}44;border-radius:12px;padding:24px;text-align:center;margin-bottom:20px}
  .hero h1{font-size:56px;font-weight:900;color:#111;line-height:1}
  .hero h1 span{font-size:28px;color:${acc}}
  .hero p{color:#555;margin-top:6px;font-size:14px}
  .specs{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px}
  .spec{background:#f9f9f9;border:1px solid #eee;border-radius:8px;padding:12px;text-align:center}
  .spec-val{font-size:20px;font-weight:900;color:${acc}}
  .spec-lbl{font-size:11px;color:#888;margin-top:3px}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px}
  .stat{background:#f9f9f9;border:1px solid #eee;border-radius:8px;padding:14px}
  .stat-lbl{font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
  .stat-val{font-size:22px;font-weight:900}
  .green{color:#16a34a}.blue{color:#2563eb}.amber{color:${acc}}.purple{color:#7c3aed}
  .bullets{background:#f9f9f9;border-radius:8px;padding:16px;margin-bottom:20px}
  .bullet{display:flex;align-items:flex-start;gap:8px;margin-bottom:8px;font-size:13px;color:#444;line-height:1.6}
  .check{color:#16a34a;font-weight:900;flex-shrink:0}
  .footer{border-top:1px solid #eee;padding-top:14px;font-size:11px;color:#aaa;text-align:center}
  @media print{body{padding:20px}@page{margin:0.5cm}}
  </style></head><body>
  <div class="header">
    <div class="logo">Solar<span>IQ</span></div>
    <div>
      <div style="font-size:14px;font-weight:700;color:#111">System Report</div>
      <div class="date">${new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}</div>
    </div>
  </div>
  <div class="hero">
    <h1>${r.systemKw}<span>kW</span></h1>
    <p>Recommended system · ${r.battKwh}kWh battery · ${r.panels} solar panels</p>
  </div>
  <div class="specs">
    <div class="spec"><div class="spec-val">${r.invKva} kVA</div><div class="spec-lbl">Inverter</div></div>
    <div class="spec"><div class="spec-val">${r.battKwh} kWh</div><div class="spec-lbl">Battery</div></div>
    <div class="spec"><div class="spec-val">${r.panels}×</div><div class="spec-lbl">Panels</div></div>
    <div class="spec"><div class="spec-val">${r.payback} yrs</div><div class="spec-lbl">Payback</div></div>
  </div>
  <div class="grid2">
    <div class="stat"><div class="stat-lbl">Estimated Installation Cost</div><div class="stat-val amber">R${r.cost.toLocaleString()}</div></div>
    <div class="stat"><div class="stat-lbl">Annual Electricity Savings</div><div class="stat-val green">R${r.annSave.toLocaleString()}</div></div>
    <div class="stat"><div class="stat-lbl">Current Monthly Bill</div><div class="stat-val blue">R${r.mo.toLocaleString()}/mo</div></div>
    <div class="stat"><div class="stat-lbl">Estimated Bill After Solar</div><div class="stat-val purple">~R${Math.round(r.mo * .25).toLocaleString()}/mo</div></div>
  </div>
  <div class="bullets">
    <div class="bullet"><span class="check">✓</span> Lights, WiFi, TV & fridge fully covered during grid outages</div>
    <div class="bullet"><span class="check">✓</span> Save ~R${Math.round(r.annSave / 12).toLocaleString()} every month on electricity</div>
    <div class="bullet"><span class="check">✓</span> Pays for itself in ${r.payback} years — then produces free electricity</div>
    <div class="bullet"><span class="check">✓</span> Claim up to R15,000 back from SARS on panel costs (ITR12)</div>
    <div class="bullet"><span class="check">✓</span> Property value typically increases by R50,000–R150,000</div>
    <div class="bullet"><span class="check">✓</span> Annual output: ~${Math.round(r.dailyKwh * 365 * .85)} kWh · 25-year output: ~${Math.round(r.dailyKwh * 365 * .85 * 25 / 1000)} MWh</div>
  </div>
  <div class="footer">Generated by SolarIQ · solariq.vercel.app · South Africa's complete solar platform</div>
  </body></html>`;

  const w = window.open("", "_blank");
  w.document.write(html);
  w.document.close();
  setTimeout(() => w.print(), 500);
}

// ─── RESULTS ─────────────────────────────────────────────────
function Results({ r, onReset, goInstallers }) {
  const t = useT();
  const sc = useScreen();
  const aC = useCount(r.cost);
  const aS = useCount(r.annSave);

  const hero = (
    <div style={{ background: `linear-gradient(135deg,rgba(${t.rgb},.12),rgba(${t.rgb},.05))`, border: `1px solid rgba(${t.rgb},.22)`, borderRadius: 20, padding: "28px", textAlign: "center", marginBottom: 14 }}>
      <Lbl center>Recommended System</Lbl>
      <div style={{ fontFamily: H, fontSize: "clamp(56px,8vw,84px)", fontWeight: 900, color: t.text, lineHeight: 1, marginBottom: 4 }}>
        {r.systemKw}<span style={{ fontSize: "0.38em", color: t.accent }}>kW</span>
      </div>
      <div style={{ color: t.sub, marginBottom: 22, fontSize: 14 }}>with {r.battKwh}kWh battery · {r.panels} panels</div>
      <div style={{ display: "flex", justifyContent: "center", gap: sc.isMobile ? 16 : 32, flexWrap: "wrap" }}>
        {[["Inverter", `${r.invKva}kVA`], ["Battery", `${r.battKwh}kWh`], ["Panels", `${r.panels}×`], ["Payback", `${r.payback} yrs`]].map(([l, v]) => (
          <div key={l}>
            <div style={{ fontFamily: H, fontSize: sc.isMobile ? 18 : 22, fontWeight: 700, color: t.accent }}>{v}</div>
            <div style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const stats = (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
      {[
        ["Estimated Cost",  `R${aC.toLocaleString()}`,                          t.accent],
        ["Annual Savings",  `R${aS.toLocaleString()}`,                          "#4ade80"],
        ["Current Bill",    `R${r.mo.toLocaleString()}/mo`,                     "#60a5fa"],
        ["After Solar",     `~R${Math.round(r.mo * .25).toLocaleString()}/mo`,  "#c084fc"],
      ].map(([l, v, c]) => (
        <div key={l} style={{ background: t.bgCard, border: `1px solid ${c}22`, borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 9, color: t.sub, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 5 }}>{l}</div>
          <div style={{ fontFamily: H, fontSize: sc.isMobile ? 18 : 22, fontWeight: 700, color: c }}>{v}</div>
        </div>
      ))}
    </div>
  );

  const bullets = (
    <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 13, padding: "18px", marginBottom: 14 }}>
      {[
        `Lights, WiFi, TV & fridge through all grid outages`,
        `Save ~R${Math.round(r.annSave / 12).toLocaleString()} every month`,
        `Pays for itself in ${r.payback} years — then free electricity`,
        `Claim up to R15,000 back from SARS on panel costs`,
        `Property value increases by R50k–R150k`,
      ].map(txt => (
        <div key={txt} style={{ fontSize: 13, color: t.sub, marginBottom: 8, lineHeight: 1.6, display: "flex", alignItems: "flex-start", gap: 8 }}>
          <span style={{ marginTop: 2, flexShrink: 0 }}><Ico.Check s={13} c="#4ade80" /></span>{txt}
        </div>
      ))}
    </div>
  );

  const sidebar = (
    <div style={{ position: "sticky", top: 80 }}>
      <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "20px", marginBottom: 12 }}>
        <div style={{ fontFamily: H, fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 16 }}>System overview</div>
        {[
          ["Daily usage",    `${r.dailyKwh} kWh/day`, "#4ade80"],
          ["Inverter",       `${r.invKva} kVA`,        t.accent],
          ["Battery",        `${r.battKwh} kWh`,       "#60a5fa"],
          ["Panels",         `${r.panels} × 550Wp`,    "#c084fc"],
          ["Annual output",  `~${Math.round(r.dailyKwh * 365 * .85)} kWh`, "#4ade80"],
          ["25-year output", `~${Math.round(r.dailyKwh * 365 * .85 * 25 / 1000)} MWh`, t.accent],
          ["CO₂ offset",     `~${Math.round(r.dailyKwh * 365 * .85 * 25 * .9)}kg`, "#4ade80"],
        ].map(([l, v, c]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${t.border}` }}>
            <span style={{ fontSize: 13, color: t.sub }}>{l}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: c, fontFamily: H }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        <PBtn full onClick={goInstallers}>Browse Verified Installers →</PBtn>
        {/* WhatsApp — green text link, no white box */}
        <button onClick={() => {
          const msg = encodeURIComponent(`Hi! I just used SolarIQ to size my solar system. My result: ${r.systemKw}kW system with ${r.battKwh}kWh battery (${r.panels} panels). Estimated cost R${r.cost.toLocaleString()}, annual savings R${r.annSave.toLocaleString()}. Can you give me a quote?`);
          window.open(`https://wa.me/?text=${msg}`, "_blank");
        }} style={{ background: "none", border: "none", color: "#25d366", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: B, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "10px 0", textDecoration: "underline", textDecorationColor: "#25d36644" }}>
          <Ico.Phone s={14} c="#25d366" /> Share results via WhatsApp
        </button>
        <button onClick={() => generateResultsPDF(r)} style={{ background: `rgba(${t.accent},.08)`, border: `1px solid rgba(${t.accent},.25)`, color: t.accent, borderRadius: 30, padding: "11px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: B, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "all .2s" }}>
          <Ico.Download s={14} c={t.accent} /> Download PDF Report
        </button>
      </div>
      <div style={{ textAlign: "center", marginTop: 14 }}>
        <button onClick={onReset} style={{ background: "none", border: "none", color: t.sub, cursor: "pointer", fontSize: 13, textDecoration: "underline", fontFamily: B }}>← Recalculate</button>
      </div>
    </div>
  );

  return (
    <div style={{ animation: "siqFadeUp .5s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
          <SolarIQLogo s={44} />
        </div>
        <h2 style={{ fontFamily: H, fontSize: "clamp(22px,4vw,38px)", fontWeight: 900, color: t.text, marginBottom: 5 }}>Your Solar Profile Is Ready</h2>
        <p style={{ color: t.sub, fontSize: 14 }}>Here's exactly what your home needs</p>
      </div>
      {sc.isDesktop ? (
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, alignItems: "start" }}>
          <div>{hero}{stats}{bullets}</div>
          {sidebar}
        </div>
      ) : (
        <div>
          {hero}{stats}{bullets}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
            <PBtn full onClick={goInstallers}>Browse Verified Installers →</PBtn>
            <button onClick={() => {
              const msg = encodeURIComponent(`Hi! SolarIQ recommends a ${r.systemKw}kW system with ${r.battKwh}kWh battery for my home. Estimated cost R${r.cost.toLocaleString()}. Annual savings R${r.annSave.toLocaleString()}. Can you quote?`);
              window.open(`https://wa.me/?text=${msg}`, "_blank");
            }} style={{ background: "none", border: "none", color: "#25d366", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: B, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "10px 0", textDecoration: "underline" }}>
              <Ico.Phone s={14} c="#25d366" /> Share results via WhatsApp
            </button>
            <button onClick={() => generateResultsPDF(r)} style={{ background: `rgba(${t.accent},.08)`, border: `1px solid rgba(${t.accent},.25)`, color: t.accent, borderRadius: 30, padding: "11px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: B, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
              <Ico.Download s={14} c={t.accent} /> Download PDF Report
            </button>
          </div>
          <div style={{ textAlign: "center" }}>
            <button onClick={onReset} style={{ background: "none", border: "none", color: t.sub, cursor: "pointer", fontSize: 13, textDecoration: "underline", fontFamily: B }}>← Recalculate</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── INSTALLER QUOTE MODAL ────────────────────────────────────
function QuoteModal({ inst, onClose }) {
  const t = useT();
  const [form, setForm] = useState({ name: "", phone: "", email: "", area: "", system_kw: "", roof: "", goal: "", monthly_bill: "", notes: "" });
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.name || !form.phone) return;
    setSaving(true);
    try {
      await sb.from("leads").insert({
        installer_id: inst?.supabaseId || null,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        area: form.area || (inst?.city ? `${inst.city}, ${inst.prov}` : ""),
        system_kw: parseFloat(form.system_kw) || 0,
        battery_kwh: 0, panels: 0, daily_kwh: 0,
        monthly_bill: parseFloat(form.monthly_bill) || 0,
        estimated_cost: 0,
        goal: form.goal,
        roof: form.roof,
        urgency: "Quote request via SolarIQ",
        notes: `Quote request for ${inst?.name || "installer"}. ${form.notes}`.trim(),
        source: "quote_request", status: "new",
      });
    } catch (e) { console.log(e); }
    setSent(true); setSaving(false);
  };

  const iStyle = { width: "100%", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 9, padding: "10px 13px", color: t.text, fontSize: 13, fontFamily: B, outline: "none", boxSizing: "border-box", transition: "border-color .2s" };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 490, background: "rgba(0,0,0,.65)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 500, width: "100%", maxWidth: 500, background: "#0a0d16", border: `1px solid ${t.border}`, borderRadius: 20, padding: 28, boxShadow: "0 32px 80px rgba(0,0,0,.6)", maxHeight: "90vh", overflowY: "auto" }}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "28px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(74,222,128,.12)", border: "2px solid rgba(74,222,128,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <Ico.Check s={28} c="#4ade80" />
            </div>
            <div style={{ fontFamily: H, fontSize: 20, fontWeight: 800, color: "#4ade80", marginBottom: 8 }}>Quote Request Sent!</div>
            <div style={{ fontSize: 13, color: t.sub, lineHeight: 1.7, marginBottom: 22 }}>{inst?.name} will be in touch shortly via {form.phone.includes("@") ? "email" : "phone or WhatsApp"}.</div>
            <button onClick={onClose} style={{ background: `linear-gradient(135deg,${t.accent},${t.accent2})`, border: "none", borderRadius: 10, padding: "11px 28px", fontSize: 14, fontWeight: 700, color: "#000", cursor: "pointer", fontFamily: B }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: H, fontSize: 18, fontWeight: 800, color: t.text }}>Request a Quote</div>
                <div style={{ fontSize: 12, color: t.sub, marginTop: 3 }}>From {inst?.name} · {inst?.city}</div>
              </div>
              <button onClick={onClose} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: t.sub, fontSize: 18, lineHeight: 1 }}>×</button>
            </div>
            {/* Two columns on desktop */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
              {[["Your Name *", "text", "John Smith", "name"], ["Phone / WhatsApp *", "tel", "+27 82 000 0000", "phone"]].map(([label, type, ph, field]) => (
                <div key={field} style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 5, fontWeight: 700 }}>{label}</label>
                  <input type={type} value={form[field]} onChange={e => up(field, e.target.value)} placeholder={ph} style={iStyle} onFocus={e => e.target.style.borderColor = `rgba(${t.rgb},.5)`} onBlur={e => e.target.style.borderColor = t.border} />
                </div>
              ))}
            </div>
            {[
              ["Email", "email", "john@email.com", "email"],
              ["Your Area / Suburb", "text", "Sandton, Johannesburg", "area"],
            ].map(([label, type, ph, field]) => (
              <div key={field} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 5, fontWeight: 700 }}>{label}</label>
                <input type={type} value={form[field]} onChange={e => up(field, e.target.value)} placeholder={ph} style={iStyle} onFocus={e => e.target.style.borderColor = `rgba(${t.rgb},.5)`} onBlur={e => e.target.style.borderColor = t.border} />
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 5, fontWeight: 700 }}>System Size (kW)</label>
                <input type="text" value={form.system_kw} onChange={e => up("system_kw", e.target.value)} placeholder="e.g. 5kW" style={iStyle} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 5, fontWeight: 700 }}>Monthly Bill (R)</label>
                <input type="number" value={form.monthly_bill} onChange={e => up("monthly_bill", e.target.value)} placeholder="e.g. 2500" style={iStyle} />
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 5, fontWeight: 700 }}>Roof Type</label>
              <select value={form.roof} onChange={e => up("roof", e.target.value)} style={{ ...iStyle }}>
                <option value="">Select roof type...</option>
                {["Tile / Double Storey", "IBR / Corrugated", "Concrete Flat Roof", "Mixed / Not sure"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 5, fontWeight: 700 }}>Main Goal</label>
              <select value={form.goal} onChange={e => up("goal", e.target.value)} style={{ ...iStyle }}>
                <option value="">What matters most...</option>
                {["Grid independence during outages", "Reduce my electricity bill", "Mostly self-sufficient", "Full off-grid"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 5, fontWeight: 700 }}>Any notes (optional)</label>
              <textarea value={form.notes} onChange={e => up("notes", e.target.value)} placeholder="Specific requirements, existing equipment, timeline..." style={{ ...iStyle, resize: "vertical", lineHeight: 1.6 }} rows={3} />
            </div>
            <button onClick={submit} disabled={!form.name || !form.phone || saving} style={{ width: "100%", background: !form.name || !form.phone ? "rgba(128,128,128,.15)" : `linear-gradient(135deg,${t.accent},${t.accent2})`, border: "none", borderRadius: 11, padding: "13px", fontSize: 14, fontWeight: 800, color: !form.name || !form.phone ? "#666" : "#000", cursor: !form.name || !form.phone || saving ? "not-allowed" : "pointer", fontFamily: H, transition: "all .2s" }}>
              {saving ? "Sending..." : "Send Quote Request →"}
            </button>
            <div style={{ fontSize: 11, color: t.sub, textAlign: "center", marginTop: 10 }}>Your details go directly to {inst?.name}</div>
          </>
        )}
      </div>
    </>
  );
}

// ─── INSTALLERS ───────────────────────────────────────────────
function Installers() {
  const t = useT();
  const sc = useScreen();
  const [search, setSearch] = useState("");
  const [prov, setProv] = useState("All");
  const [spec, setSpec] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sessaOnly, setSessaOnly] = useState(false);
  const [verOnly, setVerOnly] = useState(false);
  const [financeOnly, setFinanceOnly] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [openId, setOpenId] = useState(null); // single open card
  const [showF, setShowF] = useState(false);
  const [quoteInst, setQuoteInst] = useState(null);

  const filtered = INSTALLERS.filter(i => {
    if (search && !i.name.toLowerCase().includes(search.toLowerCase()) && !i.city.toLowerCase().includes(search.toLowerCase())) return false;
    if (prov !== "All" && i.prov !== prov) return false;
    if (spec !== "All" && i.spec !== spec) return false;
    if (brand !== "All" && !i.brands.includes(brand)) return false;
    if (sessaOnly && !i.sessa) return false;
    if (verOnly && !i.verified) return false;
    if (financeOnly && !i.finance) return false;
    return true;
  }).sort((a, b) => sortBy === "rating" ? b.rating - a.rating : sortBy === "reviews" ? b.rev - a.rev : sortBy === "jobs" ? b.jobs - a.jobs : b.yrs - a.yrs);

  const ac = [prov !== "All", spec !== "All", brand !== "All", sessaOnly, verOnly, financeOnly].filter(Boolean).length;
  const clearAll = () => { setProv("All"); setSpec("All"); setBrand("All"); setSessaOnly(false); setVerOnly(false); setFinanceOnly(false); };

  const InstCard = ({ inst, i }) => {
    const isOpen = openId === inst.id;
    const [hov, setHov] = useState(false);

    return (
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ background: isOpen ? `rgba(${t.rgb},.05)` : hov ? t.bgCard2 : t.bgCard, border: `1px solid ${isOpen ? `rgba(${t.rgb},.3)` : hov ? `rgba(${t.rgb},.18)` : t.border}`, borderRadius: 14, padding: "16px", transition: "all .22s", animation: `siqFadeUp .3s ease ${i * .04}s both`, boxShadow: isOpen ? `0 0 24px rgba(${t.rgb},.1)` : "none" }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }} onClick={() => setOpenId(isOpen ? null : inst.id)}>
          {/* Logo placeholder */}
          <div style={{ width: 44, height: 44, borderRadius: 11, background: `rgba(${t.rgb},.1)`, border: `1px solid rgba(${t.rgb},.2)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
            {inst.logo_url ? (
              <img src={inst.logo_url} alt={inst.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ fontFamily: H, fontSize: 16, fontWeight: 900, color: t.accent }}>{inst.name[0]}</div>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3, flexWrap: "wrap" }}>
              <span style={{ fontFamily: H, fontSize: 15, fontWeight: 700, color: t.text }}>{inst.name}</span>
              {inst.badge && <Tag>{inst.badge}</Tag>}
              {inst.sessa && <Tag color="#22c55e">SESSA</Tag>}
              {inst.verified && <Tag color="#60a5fa">Verified</Tag>}
              {inst.finance && <Tag color="#c084fc">Finance</Tag>}
            </div>
            <div style={{ fontSize: 11, color: t.sub, marginBottom: 4 }}>{inst.city}, {inst.prov} · {inst.yrs} yrs</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <Stars n={inst.rating} /><span style={{ fontSize: 11, color: t.sub }}>({inst.rev})</span>
              <span style={{ fontSize: 11, color: t.sub }}>· {inst.resp}</span>
              <span style={{ fontSize: 11, color: t.sub }}>· {inst.price}</span>
            </div>
          </div>
          <span style={{ fontSize: 14, color: t.sub, transition: "transform .2s", transform: isOpen ? "rotate(90deg)" : "none", flexShrink: 0, marginTop: 4 }}>›</span>
        </div>

        {/* Expanded panel */}
        {isOpen && (
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${t.border}`, animation: "siqFadeUp .25s ease" }}>
            <p style={{ fontSize: 13, color: t.sub, lineHeight: 1.7, marginBottom: 14 }}>{inst.about}</p>

            {/* Contact person */}
            {inst.contact_person && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, padding: "8px 12px", background: `rgba(${t.rgb},.05)`, borderRadius: 9, border: `1px solid rgba(${t.rgb},.12)` }}>
                <Ico.User s={13} c={t.accent} />
                <span style={{ fontSize: 12, color: t.textMid }}>Contact: <strong style={{ color: t.text }}>{inst.contact_person}</strong></span>
              </div>
            )}

            {/* Photo placeholder strip */}
            <div style={{ display: "flex", gap: 7, marginBottom: 14, flexWrap: "wrap" }}>
              {inst.photos && inst.photos.length > 0 ? (
                inst.photos.map((ph, idx) => (
                  <img key={idx} src={ph} alt="" style={{ width: 60, height: 60, borderRadius: 9, objectFit: "cover", border: `1px solid ${t.border}` }} />
                ))
              ) : (
                [0, 1, 2].map(idx => (
                  <div key={idx} title={idx === 0 ? "Installation work" : idx === 1 ? "System photos" : "Panel layout"} style={{ width: 60, height: 60, background: `rgba(${t.rgb},.08)`, border: `1px solid ${t.border}`, borderRadius: 9, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
                    <Ico.GridIcon s={16} c={t.sub} />
                    <span style={{ fontSize: 8, color: t.sub, textAlign: "center", lineHeight: 1.2 }}>{idx === 0 ? "Work" : idx === 1 ? "System" : "Panels"}</span>
                  </div>
                ))
              )}
              <div style={{ flex: 1, minWidth: 72, background: `rgba(${t.rgb},.04)`, border: `1px dashed rgba(${t.rgb},.2)`, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: t.sub, padding: 8, textAlign: "center", cursor: "pointer" }}>View all →</div>
            </div>

            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))", gap: 7, marginBottom: 14 }}>
              {[["Specialty", inst.spec], ["Experience", `${inst.yrs} yrs`], ["Response", inst.resp], ["Price", inst.price], ["Jobs done", `${inst.jobs}+`], ["Finance", inst.finance ? "Available" : "N/A"]].map(([l, v]) => (
                <div key={l} style={{ background: t.bgCard2, borderRadius: 8, padding: "8px 9px" }}>
                  <div style={{ fontSize: 9, color: t.sub, marginBottom: 2, textTransform: "uppercase", letterSpacing: .8 }}>{l}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: t.textMid }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Optional address */}
            {inst.address && (
              <div style={{ fontSize: 12, color: t.sub, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                <Ico.Map s={12} c={t.sub} /> {inst.address}
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <PBtn sm style={{ flex: 1, minWidth: 100, borderRadius: 9, padding: "10px" }} onClick={e => { e.stopPropagation(); setQuoteInst(inst); }}>Request Quote</PBtn>
              <button onClick={e => { e.stopPropagation(); const msg = encodeURIComponent(`Hi ${inst.name}, I found you on SolarIQ and would like a quote for solar installation. Please contact me.`); window.open(`https://wa.me/${(inst.phone || "").replace(/\s/g, "")}?text=${msg}`, "_blank"); }} style={{ background: "rgba(37,211,102,.1)", border: "1px solid rgba(37,211,102,.28)", color: "#25d366", borderRadius: 9, padding: "10px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: B, display: "flex", alignItems: "center", gap: 6, transition: "all .2s" }}>
                <Ico.Phone s={13} c="#25d366" /> WhatsApp
              </button>
              {inst.email && (
                <button onClick={e => { e.stopPropagation(); window.location.href = `mailto:${inst.email}`; }} style={{ background: t.bgCard, border: `1px solid ${t.border}`, color: t.sub, borderRadius: 9, padding: "10px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: B, display: "flex", alignItems: "center", gap: 6, transition: "all .2s" }}>
                  <Ico.Mail s={13} c={t.sub} /> Email
                </button>
              )}
              {inst.website && (
                <button onClick={e => { e.stopPropagation(); window.open(`https://${inst.website}`, "_blank"); }} style={{ background: t.bgCard, border: `1px solid ${t.border}`, color: t.sub, borderRadius: 9, padding: "10px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: B, display: "flex", alignItems: "center", gap: 6, transition: "all .2s" }}>
                  <Ico.Globe s={13} c={t.sub} /> Website
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <Lbl>Installer Directory</Lbl>
      <h2 style={{ fontFamily: H, fontSize: sc.isMobile ? 24 : 30, fontWeight: 700, color: t.text, marginBottom: 5 }}>Verified SA Installers</h2>
      <p style={{ color: t.sub, fontSize: 14, marginBottom: 18 }}>SESSA-accredited solar installers with real reviews from SA homeowners</p>

      {/* Search + filter bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Ico.Search s={14} c={t.sub} /></span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or city..." style={{ width: "100%", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 10, padding: "10px 12px 10px 32px", color: t.text, fontSize: 13, fontFamily: B, outline: "none", boxSizing: "border-box" }} />
        </div>
        <button onClick={() => setShowF(o => !o)} style={{ background: showF || ac > 0 ? `rgba(${t.rgb},.12)` : t.bgCard, border: `1px solid ${showF || ac > 0 ? `rgba(${t.rgb},.4)` : t.border}`, color: showF || ac > 0 ? t.accent : t.sub, borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, fontFamily: B, transition: "all .2s" }}>
          <Ico.Settings s={14} c={showF || ac > 0 ? t.accent : t.sub} /> Filters {ac > 0 && <span style={{ background: t.accent, color: "#000", borderRadius: "50%", width: 17, height: 17, fontSize: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>{ac}</span>}
        </button>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 10, padding: "10px 12px", color: t.text, fontSize: 13, outline: "none", fontFamily: B }}>
          <option value="rating">Top Rated</option>
          <option value="reviews">Most Reviews</option>
          <option value="jobs">Most Jobs</option>
          <option value="experience">Experience</option>
        </select>
      </div>

      {/* Filter panel — all 9 provinces */}
      {showF && (
        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 13, padding: "16px", marginBottom: 12, animation: "siqFadeUp .2s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: sc.isMobile ? "1fr 1fr" : "repeat(3,1fr)", gap: 10, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: t.sub, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 5, fontWeight: 700 }}>Province</div>
              <select value={prov} onChange={e => setProv(e.target.value)} style={{ width: "100%", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 8, padding: "9px 10px", color: t.text, fontSize: 13, outline: "none", fontFamily: B }}>
                {SA_PROVINCES_FILTER.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 10, color: t.sub, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 5, fontWeight: 700 }}>Specialty</div>
              <select value={spec} onChange={e => setSpec(e.target.value)} style={{ width: "100%", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 8, padding: "9px 10px", color: t.text, fontSize: 13, outline: "none", fontFamily: B }}>
                {SPECS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 10, color: t.sub, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 5, fontWeight: 700 }}>Brand</div>
              <select value={brand} onChange={e => setBrand(e.target.value)} style={{ width: "100%", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 8, padding: "9px 10px", color: t.text, fontSize: 13, outline: "none", fontFamily: B }}>
                {BRANDS.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            {[["SESSA only", sessaOnly, setSessaOnly], ["Verified only", verOnly, setVerOnly], ["Finance / Rent-to-own", financeOnly, setFinanceOnly]].map(([lbl, val, fn]) => (
              <label key={lbl} style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
                <input type="checkbox" checked={val} onChange={e => fn(e.target.checked)} style={{ accentColor: t.accent, width: 15, height: 15 }} />
                <span style={{ fontSize: 13, color: t.textMid, fontFamily: B }}>{lbl}</span>
              </label>
            ))}
            {ac > 0 && <button onClick={clearAll} style={{ marginLeft: "auto", background: "none", border: "none", color: t.accent, cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: B }}>Clear all</button>}
          </div>
        </div>
      )}

      <div style={{ fontSize: 12, color: t.sub, marginBottom: 14 }}>
        {filtered.length === 0 ? "No installers match." : `Showing ${filtered.length} installer${filtered.length !== 1 ? "s" : ""}`}
        {ac > 0 && <span style={{ color: t.accent }}> · filtered</span>}
      </div>

      {/* Two columns on desktop — each card independent */}
      {filtered.length === 0 ? (
        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 13, padding: "32px", textAlign: "center" }}>
          <div style={{ marginBottom: 10, opacity: .5 }}><Ico.Search s={28} c={t.sub} /></div>
          <div style={{ fontFamily: H, fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 8 }}>No Results Found</div>
          <button onClick={() => { clearAll(); setSearch(""); }} style={{ background: `rgba(${t.rgb},.1)`, border: `1px solid rgba(${t.rgb},.3)`, color: t.accent, borderRadius: 10, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: B }}>Clear All Filters</button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "1fr 1fr" : "1fr", gap: 10 }}>
          {filtered.map((inst, i) => <InstCard key={inst.id} inst={inst} i={i} />)}
        </div>
      )}

      {/* CTA strips */}
      <div style={{ marginTop: 18, background: `linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`, border: `1px solid rgba(${t.rgb},.18)`, borderRadius: 14, padding: "16px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: `rgba(${t.rgb},.12)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Ico.FileText s={20} c={t.accent} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: H, fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 2 }}>Installer? Get your PDF proposal generator</div>
            <div style={{ fontSize: 13, color: t.sub }}>Branded quotes from SolarIQ results — ready to send in 2 minutes.</div>
          </div>
          <a href="/installer" style={{ background: t.bgCard, border: `1px solid rgba(${t.rgb},.3)`, color: t.accent, borderRadius: 10, padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: B, textDecoration: "none", whiteSpace: "nowrap" }}>Join as Installer →</a>
        </div>
      </div>
      <div style={{ marginTop: 10, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: t.sub }}>Are you a solar installer? </span>
        <a href="/installer" style={{ color: t.accent, fontWeight: 700, fontFamily: B, fontSize: 13, textDecoration: "none" }}>List your business free →</a>
      </div>

      {/* Quote modal */}
      {quoteInst && <QuoteModal inst={quoteInst} onClose={() => setQuoteInst(null)} />}
    </div>
  );
}

// ─── SERVICING ────────────────────────────────────────────────
function Servicing() {
  const t = useT();
  const sc = useScreen();
  const [page, setPage] = useState("home");
  const [errCode, setErrCode] = useState("");
  const [errRes, setErrRes] = useState(null);
  const [hAns, setHAns] = useState({});
  const [hStep, setHStep] = useState(0);
  const [hResult, setHResult] = useState(null);
  const [tProv, setTProv] = useState("All");
  const [tSpec, setTSpec] = useState("All");
  const [tSearch, setTSearch] = useState(""); // search by error code

  const lookupErr = () => {
    const c = errCode.trim().toUpperCase();
    const m = ERRORS[c];
    setErrRes(m ? { ...m, code: c } : { notFound: true, code: c });
  };

  const calcHealth = () => {
    const sc2 = { age: [0, 5, 15, 25], perf: [0, 10, 25, 5], snd: [0, 10, 25, 40], err: [0, 10, 25, 40], cln: [0, 5, 20, 30], svc: [0, 10, 30, 15] };
    let tot = 0;
    Object.keys(sc2).forEach(k => {
      const idx = HEALTH_QS.find(q => q.id === k)?.opts.indexOf(hAns[k]);
      if (idx >= 0) tot += sc2[k][idx] || 0;
    });
    const score = Math.max(0, 100 - tot);
    setHResult({
      score,
      needsSpecs: score < 80 ? ["Full System Service"] : [],
      status: score >= 80 ? "System Healthy" : score >= 60 ? "Needs Attention" : score >= 40 ? "Service Required" : "Critical — Act Now",
      color: score >= 80 ? "#4ade80" : score >= 60 ? t.accent : score >= 40 ? "#fb923c" : "#ef4444",
      note: score >= 80 ? "Your system is performing well. Schedule an annual service within 3 months to keep it that way." : score >= 60 ? "Your system shows signs of reduced performance. Book an inspection soon before issues compound." : score >= 40 ? "Your system needs professional attention. Book a service within 2 weeks." : "Serious issue detected. Contact a qualified technician immediately — do not delay.",
    });
  };

  const reset = () => { setPage("home"); setErrCode(""); setErrRes(null); setHAns({}); setHStep(0); setHResult(null); };

  // Technician search — filter by error code to show matching specialists
  const filteredTechs = TECHS.filter(x => {
    if (tProv !== "All" && x.prov !== tProv) return false;
    if (tSpec !== "All" && x.spec !== tSpec) return false;
    if (tSearch) {
      const errMatch = ERRORS[tSearch.trim().toUpperCase()];
      if (errMatch) return errMatch.specs?.some(s => s === x.spec);
      return x.name.toLowerCase().includes(tSearch.toLowerCase()) || x.city.toLowerCase().includes(tSearch.toLowerCase());
    }
    return true;
  });

  const TechCard = ({ tech, i }) => {
    const [hov, setHov] = useState(false);
    return (
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: hov ? t.bgCard2 : t.bgCard, border: `1px solid ${hov ? `rgba(${t.rgb},.2)` : t.border}`, borderRadius: 13, padding: "16px", animation: `siqFadeUp .35s ease ${i * .07}s both`, transition: "all .22s", transform: hov ? "scale(1.01)" : "none" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
          {/* Logo placeholder */}
          <div style={{ width: 44, height: 44, borderRadius: 11, background: `rgba(${t.rgb},.1)`, border: `1px solid rgba(${t.rgb},.2)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: H, fontSize: 16, fontWeight: 900, color: t.accent }}>
            {tech.name[0]}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2, flexWrap: "wrap" }}>
              <span style={{ fontFamily: H, fontSize: 15, fontWeight: 700, color: t.text }}>{tech.name}</span>
              {tech.emergency && <span style={{ fontSize: 9, background: "rgba(239,68,68,.15)", color: "#f87171", padding: "2px 7px", borderRadius: 8, fontWeight: 700 }}>24/7 Emergency</span>}
            </div>
            <div style={{ fontSize: 12, color: t.sub, marginBottom: 3 }}>{tech.spec} · {tech.city}, {tech.prov}</div>
            <Stars n={tech.rating} /><span style={{ fontSize: 11, color: t.sub }}> ({tech.rev})</span>
          </div>
          <div style={{ fontFamily: H, fontSize: 14, fontWeight: 700, color: t.accent, flexShrink: 0, textAlign: "right" }}>
            <div>{tech.price}</div>
            <div style={{ fontSize: 10, color: t.sub, marginTop: 2 }}>{tech.yrs} yrs exp</div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: t.sub, lineHeight: 1.6, marginBottom: 12 }}>{tech.about}</p>
        <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
          {tech.brands.slice(0, 4).map(b => <span key={b} style={{ fontSize: 10, background: t.bgCard2, color: t.textMid, padding: "3px 8px", borderRadius: 6 }}>{b}</span>)}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <PBtn sm style={{ flex: 1, minWidth: 100, borderRadius: 9, padding: "9px" }}>Book Service</PBtn>
          <button onClick={() => { const msg = encodeURIComponent(`Hi ${tech.name}, I found you on SolarIQ. I need ${tech.spec}. Please contact me to schedule.`); window.open(`https://wa.me/?text=${msg}`, "_blank"); }} style={{ background: "rgba(37,211,102,.1)", border: "1px solid rgba(37,211,102,.25)", color: "#25d366", borderRadius: 9, padding: "9px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: B, display: "flex", alignItems: "center", gap: 5, transition: "all .2s" }}>
            <Ico.Phone s={12} c="#25d366" /> WhatsApp
          </button>
          {tech.email && (
            <button onClick={() => window.location.href = `mailto:${tech.email}`} style={{ background: t.bgCard, border: `1px solid ${t.border}`, color: t.sub, borderRadius: 9, padding: "9px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: B, display: "flex", alignItems: "center", gap: 5, transition: "all .2s" }}>
              <Ico.Mail s={12} c={t.sub} /> Email
            </button>
          )}
          {tech.website && (
            <button onClick={() => window.open(`https://${tech.website}`, "_blank")} style={{ background: t.bgCard, border: `1px solid ${t.border}`, color: t.sub, borderRadius: 9, padding: "9px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: B, display: "flex", alignItems: "center", gap: 5, transition: "all .2s" }}>
              <Ico.Globe s={12} c={t.sub} /> Website
            </button>
          )}
        </div>
      </div>
    );
  };

  if (page === "home") return (
    <div>
      <Lbl>After-Sales Care</Lbl>
      <h2 style={{ fontFamily: H, fontSize: sc.isMobile ? 22 : 28, fontWeight: 700, color: t.text, marginBottom: 5 }}>Solar Servicing & Repair</h2>
      <p style={{ color: t.sub, fontSize: 14, marginBottom: 24 }}>Keep your system at peak performance — for the lifetime of your investment.</p>

      <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "repeat(4,1fr)" : sc.isMobile ? "1fr 1fr" : "repeat(auto-fill,minmax(200px,1fr))", gap: sc.isDesktop ? 14 : 12, marginBottom: 18 }}>
        {[
          { id: "health",   Icon: Ico.Stethoscope,    title: "Health Check",           desc: "6 questions to diagnose your system — free.",         badge: "AI",     color: "#4ade80" },
          { id: "error",    Icon: Ico.AlertTriangle,   title: "Error Code Translator",  desc: "Type any inverter code. Plain English instantly.",     badge: "Instant",color: t.accent },
          { id: "techs",    Icon: Ico.Wrench,          title: "Find a Technician",      desc: "Verified repair specialists matched to your issue.",   badge: null,     color: "#60a5fa" },
          { id: "reminder", Icon: Ico.Calendar,        title: "Service Reminders",      desc: "WhatsApp alerts when your system is due for service.", badge: "Free",   color: "#c084fc" },
        ].map((c, i) => {
          const [hov, setHov] = useState(false);
          return (
            <div key={c.id} onClick={() => setPage(c.id)}
              onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
              style={{ background: hov ? `rgba(${c.color.replace("#","").match(/.{2}/g).map(h=>parseInt(h,16)).join(",")}, .08)` : t.bgCard, border: `1px solid ${hov ? c.color + "44" : t.border}`, borderRadius: 16, padding: sc.isDesktop ? "24px 20px" : "16px 14px", cursor: "pointer", transition: "all .22s", position: "relative", animation: `siqFadeUp .35s ease ${i * .07}s both`, transform: hov ? "scale(1.03)" : "none", boxShadow: hov ? `0 0 24px ${c.color}22` : "none" }}>
              {c.badge && <div style={{ position: "absolute", top: 12, right: 12, fontSize: 9, background: `${c.color}18`, color: c.color, padding: "2px 7px", borderRadius: 8, fontWeight: 700 }}>{c.badge}</div>}
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${c.color}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <c.Icon s={sc.isDesktop ? 24 : 20} c={c.color} />
              </div>
              <div style={{ fontFamily: H, fontSize: sc.isDesktop ? 16 : 14, fontWeight: 700, color: t.text, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          );
        })}
      </div>

      <div style={{ background: "rgba(239,68,68,.06)", border: "1px solid rgba(239,68,68,.15)", borderRadius: 12, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(239,68,68,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Ico.AlertTriangle s={20} c="#f87171" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: H, fontSize: 14, fontWeight: 700, color: "#f87171", marginBottom: 2 }}>System Completely Offline?</div>
          <div style={{ fontSize: 13, color: t.sub }}>Emergency technicians available 24/7 across SA.</div>
        </div>
        <button onClick={() => setPage("techs")} style={{ background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.3)", color: "#f87171", borderRadius: 9, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", fontFamily: B, transition: "all .2s" }}>Find Now →</button>
      </div>
    </div>
  );

  if (page === "error") {
    const errPanel = (
      <div>
        <Lbl>Diagnostic Tool</Lbl>
        <h3 style={{ fontFamily: H, fontSize: sc.isMobile ? 20 : 26, fontWeight: 900, color: t.text, marginBottom: 6 }}>Error Code Translator</h3>
        <p style={{ color: t.sub, fontSize: 13, marginBottom: 16 }}>Type the code shown on your inverter. Supports Sunsynk, Victron, Deye, Growatt, Pylontech, Huawei.</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input value={errCode} onChange={e => setErrCode(e.target.value)} onKeyDown={e => e.key === "Enter" && lookupErr()} placeholder="e.g. F32, E001, G05..."
            style={{ flex: 1, background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 10, padding: "12px 14px", color: t.text, fontSize: 16, fontFamily: "monospace", fontWeight: 700, letterSpacing: 2, outline: "none", transition: "border-color .2s" }}
            onFocus={e => e.target.style.borderColor = `rgba(${t.rgb},.5)`} onBlur={e => e.target.style.borderColor = t.border} />
          <PBtn sm onClick={lookupErr} style={{ borderRadius: 10, padding: "12px 18px" }}>Look Up</PBtn>
        </div>
        <div style={{ display: "flex", gap: 5, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: t.sub }}>Quick codes:</span>
          {Object.keys(ERRORS).map(c => {
            const [hov, setHov] = useState(false);
            return (
              <button key={c} onClick={() => { setErrCode(c); setErrRes(null); }}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{ background: hov ? `rgba(${t.rgb},.1)` : t.bgCard, border: `1px solid ${hov ? `rgba(${t.rgb},.3)` : t.border}`, color: hov ? t.accent : t.sub, borderRadius: 7, padding: "3px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700, letterSpacing: 1, fontFamily: "monospace", transition: "all .15s" }}>{c}</button>
            );
          })}
        </div>
        {errRes && (
          <div style={{ animation: "siqFadeUp .35s ease" }}>
            {errRes.notFound ? (
              <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 13, padding: "24px", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <Ico.AlertCircle s={24} c={t.sub} />
                </div>
                <div style={{ fontFamily: H, fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 6 }}>Code "{errRes.code}" Not Found</div>
                <div style={{ fontSize: 13, color: t.sub, marginBottom: 14 }}>We add new codes regularly. A technician can diagnose on the spot.</div>
                <button onClick={() => setPage("techs")} style={{ background: `rgba(${t.rgb},.1)`, border: `1px solid rgba(${t.rgb},.3)`, color: t.accent, borderRadius: 10, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: B }}>Find a Technician →</button>
              </div>
            ) : (
              <div style={{ background: errRes.sev === "critical" ? "rgba(239,68,68,.06)" : errRes.sev === "warning" ? `rgba(${t.rgb},.06)` : "rgba(96,165,250,.06)", border: `1px solid ${errRes.sev === "critical" ? "rgba(239,68,68,.2)" : errRes.sev === "warning" ? `rgba(${t.rgb},.2)` : "rgba(96,165,250,.2)"}`, borderRadius: 13, padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ fontFamily: H, fontSize: 28, fontWeight: 900, color: errRes.sev === "critical" ? "#ef4444" : errRes.sev === "warning" ? t.accent : "#60a5fa" }}>{errRes.code}</div>
                  <div>
                    <div style={{ fontSize: 10, color: t.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{errRes.brand}</div>
                    <span style={{ fontSize: 10, background: errRes.sev === "critical" ? "rgba(239,68,68,.15)" : errRes.sev === "warning" ? `rgba(${t.rgb},.15)` : "rgba(96,165,250,.15)", color: errRes.sev === "critical" ? "#f87171" : errRes.sev === "warning" ? t.accent : "#93c5fd", padding: "2px 8px", borderRadius: 8, fontWeight: 700, textTransform: "uppercase" }}>{errRes.sev}</span>
                  </div>
                </div>
                <div style={{ fontFamily: H, fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 10 }}>{errRes.title}</div>
                <div style={{ fontSize: 14, color: t.sub, lineHeight: 1.75, marginBottom: 14 }}>{errRes.fix}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, background: errRes.diy ? "rgba(74,222,128,.07)" : "rgba(239,68,68,.07)", border: `1px solid ${errRes.diy ? "rgba(74,222,128,.2)" : "rgba(239,68,68,.2)"}`, borderRadius: 10, padding: "10px 13px", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ display: "flex", alignItems: "center" }}>{errRes.diy ? <Ico.Check s={14} c="#4ade80" /> : <Ico.AlertTriangle s={14} c="#f87171" />}</span>
                    <span style={{ fontSize: 12, color: errRes.diy ? "#4ade80" : "#f87171", fontWeight: 600, fontFamily: B }}>{errRes.diy ? "You can resolve this yourself" : "Requires a qualified technician"}</span>
                  </div>
                  {!errRes.diy && <PBtn sm onClick={() => setPage("techs")} style={{ borderRadius: 10 }}>Find Technician →</PBtn>}
                </div>
                {errRes.specs && errRes.specs.length > 0 && (
                  <div style={{ marginTop: 12, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, padding: "11px 14px" }}>
                    <div style={{ fontSize: 11, color: t.sub, marginBottom: 6 }}>Recommended specialist:</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {errRes.specs.map(s => {
                        const [hov, setHov] = useState(false);
                        return <button key={s} onClick={() => { setTSpec(s); setPage("techs"); }}
                          onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                          style={{ background: hov ? `rgba(${t.rgb},.12)` : `rgba(${t.rgb},.06)`, border: `1px solid rgba(${t.rgb},.3)`, color: t.accent, borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: B, transition: "all .15s" }}>{s} →</button>;
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );

    const commonCodes = (
      <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: "20px" }}>
        <div style={{ fontFamily: H, fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 14 }}>Common error codes</div>
        {Object.entries(ERRORS).map(([code, err]) => {
          const [hov, setHov] = useState(false);
          return (
            <div key={code} onClick={() => { setErrCode(code); setErrRes({ ...err, code }); }}
              onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 9, cursor: "pointer", marginBottom: 4, transition: "all .2s", background: hov ? `rgba(${t.rgb},.06)` : "transparent" }}>
              <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 800, color: t.accent, width: 44, flexShrink: 0 }}>{code}</span>
              <span style={{ fontSize: 11, color: t.sub, flex: 1 }}>{err.title}</span>
              <span style={{ fontSize: 9, background: err.sev === "critical" ? "rgba(239,68,68,.15)" : err.sev === "warning" ? `rgba(${t.rgb},.15)` : "rgba(96,165,250,.15)", color: err.sev === "critical" ? "#f87171" : err.sev === "warning" ? t.accent : "#93c5fd", padding: "2px 7px", borderRadius: 6, fontWeight: 700, textTransform: "uppercase" }}>{err.sev}</span>
            </div>
          );
        })}
      </div>
    );

    return (
      <div>
        <BackBtn onClick={reset} />
        {sc.isDesktop ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
            {errPanel}{commonCodes}
          </div>
        ) : errPanel}
      </div>
    );
  }

  if (page === "health") {
    if (hResult) {
      const scoreBlock = (
        <div style={{ animation: "siqFadeUp .5s ease" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ width: 100, height: 100, borderRadius: "50%", background: `${hResult.color}18`, border: `3px solid ${hResult.color}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", flexDirection: "column", boxShadow: `0 0 32px ${hResult.color}30` }}>
              <div style={{ fontFamily: H, fontSize: 28, fontWeight: 900, color: hResult.color }}>{hResult.score}</div>
              <div style={{ fontSize: 10, color: hResult.color, fontWeight: 700 }}>/100</div>
            </div>
            <div style={{ fontFamily: H, fontSize: 26, fontWeight: 900, color: hResult.color, marginBottom: 6 }}>{hResult.status}</div>
            <p style={{ color: t.sub, fontSize: 14, lineHeight: 1.75, maxWidth: 380, margin: "0 auto" }}>{hResult.note}</p>
          </div>
          {hResult.needsSpecs.length > 0 && (
            <div style={{ background: `rgba(${t.rgb},.05)`, border: `1px solid rgba(${t.rgb},.2)`, borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: t.sub, marginBottom: 8 }}>Based on your answers, we recommend:</div>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {hResult.needsSpecs.map(s => <button key={s} onClick={() => { setTSpec(s); setPage("techs"); }} style={{ background: `rgba(${t.rgb},.1)`, border: `1px solid rgba(${t.rgb},.3)`, color: t.accent, borderRadius: 8, padding: "6px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: B }}>{s} →</button>)}
              </div>
            </div>
          )}
          <PBtn full onClick={() => setPage("techs")}>Book a Professional Service →</PBtn>
          <button onClick={() => { setHResult(null); setHAns({}); setHStep(0); }} style={{ display: "block", margin: "14px auto 0", background: "none", border: "none", color: t.sub, cursor: "pointer", fontSize: 13, fontFamily: B, textDecoration: "underline" }}>Take the check again</button>
        </div>
      );

      const bars = (
        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: "22px" }}>
          <div style={{ fontFamily: H, fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 18 }}>Diagnostic Breakdown</div>
          {[["Panel Output", hResult.score * .3 + 60, "#f5a623"], ["Battery Health", hResult.score * .4 + 50, "#4ade80"], ["Inverter Status", hResult.score * .5 + 45, "#60a5fa"]].map(([l, v, c]) => (
            <div key={l} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                <span style={{ fontSize: 14, color: t.textMid, fontWeight: 600 }}>{l}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: c }}>{Math.min(100, Math.round(v))}%</span>
              </div>
              <div style={{ height: 8, background: "rgba(128,128,128,.12)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${Math.min(100, v)}%`, height: "100%", background: `linear-gradient(90deg,${c},${c}aa)`, borderRadius: 4, transition: "width 1.2s cubic-bezier(.4,0,.2,1)", boxShadow: `0 0 8px ${c}50` }} />
              </div>
            </div>
          ))}
        </div>
      );

      return (
        <div>
          <BackBtn onClick={() => { setHResult(null); setHAns({}); setHStep(0); }} />
          {sc.isDesktop ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
              {scoreBlock}{bars}
            </div>
          ) : (
            <div>{scoreBlock}<div style={{ marginTop: 16 }}>{bars}</div></div>
          )}
        </div>
      );
    }

    const q = HEALTH_QS[hStep];
    return (
      <div style={{ maxWidth: sc.isDesktop ? 640 : undefined, margin: sc.isDesktop ? "0 auto" : undefined }}>
        <BackBtn onClick={() => hStep === 0 ? reset() : setHStep(s => s - 1)} />
        <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
          {HEALTH_QS.map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= hStep ? t.accent : `rgba(${t.rgb},.15)`, transition: "background .3s" }} />)}
        </div>
        <div key={hStep} style={{ animation: "siqFadeUp .3s ease" }}>
          <Lbl>Question {hStep + 1} of {HEALTH_QS.length}</Lbl>
          <h3 style={{ fontFamily: H, fontSize: sc.isDesktop ? 26 : "clamp(18px,4vw,22px)", fontWeight: 900, color: t.text, marginBottom: 24, lineHeight: 1.2 }}>{q.q}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.opts.map(o => {
              const sel = hAns[q.id] === o;
              const [hov, setHov] = useState(false);
              return (
                <button key={o} onClick={() => { const na = { ...hAns, [q.id]: o }; setHAns(na); if (hStep < HEALTH_QS.length - 1) setTimeout(() => setHStep(s => s + 1), 200); else setTimeout(calcHealth, 200); }}
                  onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                  style={{ background: sel ? `rgba(${t.rgb},.1)` : hov ? t.bgCard2 : t.bgCard, border: `1px solid ${sel ? t.accent : hov ? `rgba(${t.rgb},.25)` : t.border}`, borderRadius: 12, padding: "16px 20px", cursor: "pointer", textAlign: "left", fontSize: sc.isDesktop ? 15 : 14, color: sel ? t.accent : t.textMid, fontWeight: sel ? 700 : 500, transition: "all .2s", fontFamily: B }}>
                  {o}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (page === "techs") return (
    <div>
      <BackBtn onClick={reset} />
      <Lbl>Repair Specialists</Lbl>
      <h3 style={{ fontFamily: H, fontSize: sc.isMobile ? 20 : 26, fontWeight: 900, color: t.text, marginBottom: 5 }}>Find a Technician</h3>
      <p style={{ color: t.sub, fontSize: 13, marginBottom: 16 }}>Verified repair specialists across SA — or search by your error code</p>

      {/* Search bar — accepts error codes directly */}
      <div style={{ position: "relative", marginBottom: 14 }}>
        <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}><Ico.Search s={14} c={t.sub} /></span>
        <input value={tSearch} onChange={e => setTSearch(e.target.value)} placeholder="Search by name, city, or error code (e.g. F32)..."
          style={{ width: "100%", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 10, padding: "10px 12px 10px 32px", color: t.text, fontSize: 13, fontFamily: B, outline: "none", boxSizing: "border-box" }} />
      </div>

      {/* Province filter — all 9 */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        {TECH_PROVS.map(p => {
          const [hov, setHov] = useState(false);
          return <button key={p} onClick={() => setTProv(p)}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ background: tProv === p ? `rgba(${t.rgb},.12)` : hov ? t.bgCard2 : t.bgCard, border: `1px solid ${tProv === p ? `rgba(${t.rgb},.4)` : hov ? `rgba(${t.rgb},.2)` : t.border}`, color: tProv === p ? t.accent : t.sub, borderRadius: 20, padding: "5px 12px", cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: B, transition: "all .18s" }}>{p}</button>;
        })}
      </div>

      {/* Spec filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {["All", ...TECH_SPECS_LIST].map(s => {
          const [hov, setHov] = useState(false);
          return <button key={s} onClick={() => setTSpec(s)}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ background: tSpec === s ? `rgba(${t.rgb},.12)` : hov ? t.bgCard2 : t.bgCard, border: `1px solid ${tSpec === s ? `rgba(${t.rgb},.4)` : hov ? `rgba(${t.rgb},.2)` : t.border}`, color: tSpec === s ? t.accent : t.sub, borderRadius: 20, padding: "5px 12px", cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: B, transition: "all .18s" }}>{s}</button>;
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "1fr 1fr" : "1fr", gap: 12 }}>
        {filteredTechs.map((tech, i) => <TechCard key={tech.id} tech={tech} i={i} />)}
        {filteredTechs.length === 0 && (
          <div style={{ textAlign: "center", padding: "28px", color: t.sub, fontSize: 13 }}>
            No technicians match. <button onClick={() => { setTProv("All"); setTSpec("All"); setTSearch(""); }} style={{ background: "none", border: "none", color: t.accent, cursor: "pointer", fontWeight: 700, fontFamily: B }}>Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );

  if (page === "reminder") return (
    <div style={{ maxWidth: sc.isDesktop ? 520 : undefined, margin: sc.isDesktop ? "0 auto" : undefined }}>
      <BackBtn onClick={reset} />
      <Lbl>Free Service</Lbl>
      <h3 style={{ fontFamily: H, fontSize: sc.isMobile ? 20 : 26, fontWeight: 900, color: t.text, marginBottom: 6 }}>Service Reminders</h3>
      <p style={{ color: t.sub, fontSize: 14, marginBottom: 22 }}>Register once. We'll WhatsApp you when your system is due for service.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
        {[["Your name", "text", "John Smith"], ["WhatsApp number", "tel", "+27 82 000 0000"], ["System size & brand", "text", "e.g. 5kW Sunsynk"], ["Installation date", "date", ""], ["Inverter brand", "text", "e.g. Sunsynk, Victron, Deye"]].map(([l, tp, ph]) => (
          <div key={l}>
            <label style={{ fontSize: 11, color: t.sub, textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 5, fontWeight: 700 }}>{l}</label>
            <input type={tp} placeholder={ph} style={{ width: "100%", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 9, padding: "12px 14px", color: t.text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: B, transition: "border-color .2s" }} onFocus={e => e.target.style.borderColor = `rgba(${t.rgb},.5)`} onBlur={e => e.target.style.borderColor = t.border} />
          </div>
        ))}
      </div>
      <PBtn full>Register My System Free</PBtn>
      <div style={{ fontSize: 11, color: t.sub, textAlign: "center", marginTop: 10 }}>WhatsApp only · No spam · Unsubscribe anytime</div>
    </div>
  );

  return null;
}

// ─── BLOG ─────────────────────────────────────────────────────
function RatingBar({ label, score }) {
  const t = useT();
  const c = score >= 4.5 ? "#4ade80" : score >= 3.5 ? t.accent : "#f87171";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <div style={{ fontSize: 12, color: t.sub, width: 90, flexShrink: 0 }}>{label}</div>
      <div style={{ flex: 1, height: 5, background: "rgba(128,128,128,.15)", borderRadius: 3 }}>
        <div style={{ width: `${(score / 5) * 100}%`, height: "100%", background: c, borderRadius: 3 }} />
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, color: c, width: 28, textAlign: "right" }}>{score}</div>
    </div>
  );
}

function ArticleView({ article, onBack, onCalc }) {
  const t = useT();
  const sc = useScreen();
  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }, [article]);

  const related = article.related.map(id => ARTICLES.find(a => a.id === id)).filter(Boolean);

  const [calcHov, setCalcHov] = useState(false);

  const body = (
    <div ref={topRef}>
      <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 14 }}>
        <Tag>{article.tag}</Tag>
        {article.hot && <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "#f87171" }}><Ico.Fire s={12} /> Trending</span>}
        <span style={{ fontSize: 12, color: t.sub, marginLeft: "auto" }}>{article.min} min · {article.views} views</span>
      </div>
      <h1 style={{ fontFamily: H, fontSize: "clamp(20px,3vw,34px)", fontWeight: 900, color: t.text, lineHeight: 1.15, marginBottom: 16 }}>{article.title}</h1>
      <p style={{ fontSize: 15, color: t.textMid, lineHeight: 1.85, borderLeft: `3px solid ${t.accent}`, paddingLeft: 16, marginBottom: 26, fontStyle: "italic" }}>{article.intro}</p>

      {article.coverImg && (
        <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 26, border: `1px solid ${t.border}` }}>
          <img src={article.coverImg} alt={article.title} style={{ width: "100%", height: sc.isMobile ? 180 : 260, objectFit: "cover", display: "block" }} />
        </div>
      )}

      {article.youtubeId && (
        <div style={{ marginBottom: 26 }}>
          <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${t.border}`, position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe src={`https://www.youtube.com/embed/${article.youtubeId}`} title={article.youtubeTitle || "Video"} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allowFullScreen />
          </div>
          {article.youtubeTitle && <div style={{ fontSize: 11, color: t.sub, marginTop: 6, textAlign: "center" }}>{article.youtubeTitle}</div>}
        </div>
      )}

      {article.rating && (
        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 13, padding: "20px", marginBottom: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: H, fontSize: 44, fontWeight: 900, color: t.accent, lineHeight: 1 }}>{article.rating.overall}</div>
              <div style={{ fontSize: 10, color: t.sub, marginTop: 3 }}>Overall</div>
            </div>
            <div style={{ flex: 1 }}>
              <RatingBar label="Value" score={article.rating.value} />
              <RatingBar label="Build quality" score={article.rating.build} />
              <RatingBar label="Software" score={article.rating.software} />
              <RatingBar label="Support" score={article.rating.support} />
            </div>
          </div>
        </div>
      )}

      <div style={{ height: 1, background: `linear-gradient(90deg,${t.accent},transparent)`, marginBottom: 28, opacity: .4 }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 28 }}>
        {article.body.map((sec, i) => (
          <div key={i}>
            <h2 style={{ fontFamily: H, fontSize: sc.isMobile ? 17 : 20, fontWeight: 700, color: t.text, marginBottom: 10 }}>{sec.h}</h2>
            <p style={{ fontSize: 15, color: t.textMid, lineHeight: 1.85 }}>{sec.p}</p>
          </div>
        ))}
      </div>

      {article.photos && article.photos.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: sc.isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 26 }}>
          {article.photos.map((ph, i) => (
            <div key={i} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${t.border}` }}>
              <img src={ph.url} alt={ph.caption} style={{ width: "100%", height: 170, objectFit: "cover", display: "block" }} />
              {ph.caption && <div style={{ fontSize: 11, color: t.sub, padding: "8px 12px", background: t.bgCard }}>{ph.caption}</div>}
            </div>
          ))}
        </div>
      )}

      {article.affiliate && (
        <>
          <div style={{ background: `linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.04))`, border: `1px solid rgba(${t.rgb},.2)`, borderRadius: 12, padding: "16px 18px", marginBottom: 8 }}>
            <a href={article.affiliate.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, textDecoration: "none" }}>
              <div>
                <div style={{ fontFamily: H, fontSize: 15, fontWeight: 700, color: t.accent, marginBottom: 3 }}>{article.affiliate.label}</div>
                <div style={{ fontSize: 11, color: t.sub }}>Best current price · Usually ships in 3–5 days</div>
              </div>
              <Ico.ArrowRight s={18} c={t.accent} />
            </a>
          </div>
          <div style={{ fontSize: 10, color: t.sub, marginBottom: 26, lineHeight: 1.6, padding: "8px 12px", background: t.bgCard, borderRadius: 8 }}>
            <strong style={{ fontWeight: 700 }}>Disclosure: </strong>{article.affiliate.disclosure}
          </div>
        </>
      )}
    </div>
  );

  const sidebar = (
    <div style={{ position: "sticky", top: 80 }}>
      {/* Calculate CTA — text only, no icon */}
      <div
        onMouseEnter={() => setCalcHov(true)} onMouseLeave={() => setCalcHov(false)}
        style={{ background: calcHov ? `rgba(${t.rgb},.1)` : `linear-gradient(135deg,rgba(${t.rgb},.1),rgba(${t.rgb},.04))`, border: `1px solid rgba(${t.rgb},.2)`, borderRadius: 14, padding: "20px", textAlign: "center", marginBottom: 16, cursor: "pointer", transition: "all .22s", transform: calcHov ? "scale(1.02)" : "none", boxShadow: calcHov ? `0 0 24px rgba(${t.rgb},.2)` : "none" }}
        onClick={onCalc}>
        <div style={{ fontFamily: H, fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 6 }}>Ready to Calculate?</div>
        <p style={{ color: t.sub, fontSize: 13, marginBottom: 14 }}>Personalised result in under 2 minutes. Free.</p>
        <div style={{ background: `linear-gradient(135deg,${t.accent},${t.accent2})`, borderRadius: 25, padding: "10px 20px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#000", fontFamily: B }}>
          Calculate My System
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <div style={{ fontFamily: H, fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}>Related Articles</div>
          {related.map(rel => {
            const [hov, setHov] = useState(false);
            return (
              <div key={rel.id} onClick={() => onBack(rel)}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{ background: hov ? t.bgCard2 : t.bgCard, border: `1px solid ${hov ? `rgba(${t.rgb},.25)` : t.border}`, borderRadius: 10, padding: "12px 14px", cursor: "pointer", transition: "all .22s", display: "flex", alignItems: "center", gap: 10, marginBottom: 8, transform: hov ? "translateX(4px)" : "none" }}>
                <div style={{ flex: 1 }}>
                  <Tag>{rel.tag}</Tag>
                  <div style={{ fontFamily: H, fontSize: 12, fontWeight: 700, color: t.text, marginTop: 5, lineHeight: 1.3 }}>{rel.title}</div>
                </div>
                <span style={{ fontSize: 14, color: t.sub, flexShrink: 0 }}>›</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ animation: "siqFadeUp .4s ease" }}>
      <BackBtn onClick={() => onBack(null)} />
      {sc.isDesktop ? (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 40, alignItems: "start" }}>
          {body}{sidebar}
        </div>
      ) : (
        <div>
          {body}
          {/* Mobile CTA — text only */}
          <div onClick={onCalc} style={{ background: `linear-gradient(135deg,rgba(${t.rgb},.1),rgba(${t.rgb},.04))`, border: `1px solid rgba(${t.rgb},.2)`, borderRadius: 14, padding: "18px", textAlign: "center", marginBottom: 20, cursor: "pointer" }}>
            <div style={{ fontFamily: H, fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 5 }}>Ready to Calculate?</div>
            <div style={{ background: `linear-gradient(135deg,${t.accent},${t.accent2})`, borderRadius: 25, padding: "10px 20px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#000", fontFamily: B }}>
              Calculate My System
            </div>
          </div>
          {related.length > 0 && (
            <div>
              <div style={{ fontFamily: H, fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}>Related Articles</div>
              {related.map(rel => (
                <div key={rel.id} onClick={() => onBack(rel)} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ flex: 1 }}><Tag>{rel.tag}</Tag><div style={{ fontFamily: H, fontSize: 12, fontWeight: 700, color: t.text, marginTop: 4 }}>{rel.title}</div></div>
                  <span style={{ fontSize: 14, color: t.sub }}>›</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Blog({ onCalc }) {
  const t = useT();
  const sc = useScreen();
  const [active, setActive] = useState(null);
  const [tag, setTag] = useState("All");
  const tags = ["All", ...new Set(ARTICLES.map(a => a.tag))];

  if (active) return <ArticleView article={active} onBack={a => setActive(a || null)} onCalc={onCalc} />;

  const list = tag === "All" ? ARTICLES : ARTICLES.filter(a => a.tag === tag);

  return (
    <div>
      <Lbl>Knowledge Hub</Lbl>
      <h2 style={{ fontFamily: H, fontSize: sc.isMobile ? 22 : 28, fontWeight: 700, color: t.text, marginBottom: 5 }}>Solar Guides & Reviews</h2>
      <p style={{ color: t.sub, fontSize: 14, marginBottom: 18 }}>Honest solar content for South Africans. No brand deals. No bias.</p>

      <div style={{ display: "flex", gap: 7, marginBottom: 22, flexWrap: "wrap" }}>
        {tags.map(tg => {
          const [hov, setHov] = useState(false);
          return (
            <button key={tg} onClick={() => setTag(tg)}
              onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
              style={{ background: tag === tg ? `rgba(${t.rgb},.13)` : hov ? t.bgCard2 : t.bgCard, border: `1px solid ${tag === tg ? `rgba(${t.rgb},.4)` : hov ? `rgba(${t.rgb},.2)` : t.border}`, color: tag === tg ? t.accent : t.sub, borderRadius: 20, padding: "7px 16px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: B, transition: "all .18s" }}>{tg}</button>
          );
        })}
      </div>

      {/* Featured article */}
      {(() => {
        const [hov, setHov] = useState(false);
        return (
          <div onClick={() => setActive(list[0])}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ background: hov ? `rgba(${t.rgb},.06)` : `linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`, border: `1px solid ${hov ? `rgba(${t.rgb},.3)` : `rgba(${t.rgb},.15)`}`, borderRadius: 16, overflow: "hidden", marginBottom: 16, cursor: "pointer", transition: "all .22s", transform: hov ? "scale(1.008)" : "none", boxShadow: hov ? `0 0 28px rgba(${t.rgb},.12)` : "none" }}>
            {list[0].coverImg && <img src={list[0].coverImg} alt="" style={{ width: "100%", height: sc.isDesktop ? 270 : sc.isMobile ? 150 : 210, objectFit: "cover", display: "block" }} />}
            <div style={{ padding: sc.isDesktop ? "24px 26px" : "16px 18px" }}>
              <div style={{ display: "flex", gap: 7, marginBottom: 10, alignItems: "center" }}>
                <Tag>FEATURED</Tag><Tag>{list[0].tag}</Tag>
                {list[0].hot && <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "#f87171" }}><Ico.Fire s={11} /> {list[0].views} reads</span>}
              </div>
              <h3 style={{ fontFamily: H, fontSize: sc.isDesktop ? "clamp(18px,2vw,24px)" : "clamp(15px,3vw,20px)", fontWeight: 700, color: t.text, marginBottom: 8, lineHeight: 1.2 }}>{list[0].title}</h3>
              <p style={{ fontSize: 13, color: t.sub, lineHeight: 1.7, marginBottom: 12, maxWidth: 700 }}>{list[0].intro}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: t.sub }}>{list[0].min} min read</span>
                <span style={{ fontSize: 13, color: t.accent, fontWeight: 700 }}>Read article →</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "repeat(3,1fr)" : sc.isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
        {list.slice(1).map((p, i) => {
          const [hov, setHov] = useState(false);
          return (
            <div key={p.id} onClick={() => setActive(p)}
              onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
              style={{ background: hov ? t.bgCard2 : t.bgCard, border: `1px solid ${hov ? `rgba(${t.rgb},.25)` : t.border}`, borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "all .22s", animation: `siqFadeUp .35s ease ${i * .07}s both`, transform: hov ? "scale(1.02)" : "none", boxShadow: hov ? `0 0 20px rgba(${t.rgb},.1)` : "none" }}>
              {p.coverImg && <img src={p.coverImg} alt="" style={{ width: "100%", height: 120, objectFit: "cover", display: "block" }} />}
              <div style={{ padding: "14px" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "center" }}>
                  <Tag>{p.tag}</Tag>
                  {p.hot && <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 9, background: "rgba(248,113,113,.15)", color: "#f87171", padding: "1px 7px", borderRadius: 6, fontWeight: 700 }}><Ico.Fire s={9} /> Hot</span>}
                  <span style={{ fontSize: 10, color: t.sub, marginLeft: "auto" }}>{p.views}</span>
                </div>
                <h4 style={{ fontFamily: H, fontSize: 13, fontWeight: 700, color: t.text, lineHeight: 1.35, marginBottom: 10 }}>{p.title}</h4>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: t.sub }}>{p.min} min</span>
                  <span style={{ fontSize: 12, color: t.accent, fontWeight: 700 }}>Read →</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── COMING SOON ──────────────────────────────────────────────
function ComingSoon() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const t = DARK;

  const saveEmail = async () => {
    if (!email || saving) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return;
    setSaving(true);
    try { await sb.from("subscribers").upsert({ email: email.trim().toLowerCase(), source: "coming_soon", active: true }, { onConflict: "email" }); }
    catch (e) { console.log(e); }
    setDone(true); setSaving(false);
  };

  // Countdown to 01 June 2026
  const LAUNCH = new Date("2026-06-01T00:00:00+02:00");
  const [tl, setTl] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = LAUNCH - new Date();
      if (diff <= 0) { setTl({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTl({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    calc(); const id = setInterval(calc, 1000); return () => clearInterval(id);
  }, []);

  const pts = Array.from({ length: 20 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 2.5 + 1, dur: Math.random() * 8 + 6, delay: Math.random() * 6, op: Math.random() * .4 + .1 }));

  return (
    <div style={{ position: "fixed", inset: 0, background: "#06080c", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {pts.map(p => <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: "50%", background: "#f5a623", opacity: p.op, animation: `siqParticle ${p.dur}s ease-in-out ${p.delay}s infinite` }} />)}
      </div>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "70vw", height: "70vh", background: "radial-gradient(ellipse,rgba(245,166,35,.07) 0%,transparent 65%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 520 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, animation: "siqFadeUp .6s ease" }}>
          <SolarIQLogo s={42} />
          <span style={{ fontFamily: H, fontSize: 34, fontWeight: 900, letterSpacing: 1.5, color: "#f0f0f0" }}>Solar<span style={{ color: "#f5a623" }}>IQ</span></span>
        </div>

        <div style={{ textAlign: "center", marginBottom: 36, animation: "siqFadeUp .7s ease" }}>
          <h1 style={{ fontFamily: H, fontSize: "clamp(24px,6vw,46px)", fontWeight: 900, color: "#f0f0f0", lineHeight: 1.1, marginBottom: 12 }}>
            SA's Solar Platform.<br /><span style={{ color: "#f5a623" }}>Launching 01 June 2026.</span>
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.3)", lineHeight: 1.8, maxWidth: 380, margin: "0 auto" }}>
            Calculate your system. Find verified installers.<br />Diagnose faults. All free. All in one place.
          </p>
        </div>

        {/* Countdown */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 36, animation: "siqFadeUp .8s ease" }}>
          {[["Days", tl.d], ["Hours", tl.h], ["Min", tl.m], ["Sec", tl.s]].reduce((acc, el, i) => {
            const block = (
              <div key={el[0]} style={{ textAlign: "center", minWidth: 64 }}>
                <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(245,166,35,.12)", borderRadius: 12, padding: "12px 8px", marginBottom: 6 }}>
                  <div style={{ fontFamily: H, fontSize: "clamp(28px,6vw,48px)", fontWeight: 900, color: "#f5a623", lineHeight: 1 }}>{String(el[1]).padStart(2, "0")}</div>
                </div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.2)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>{el[0]}</div>
              </div>
            );
            if (i === 0) return [block];
            return [...acc, <div key={`s${i}`} style={{ fontFamily: H, fontSize: "clamp(20px,4vw,36px)", fontWeight: 900, color: "rgba(245,166,35,.25)", paddingTop: 10 }}>:</div>, block];
          }, [])}
        </div>

        <div style={{ width: "100%", maxWidth: 380, marginBottom: 14, animation: "siqFadeUp .9s ease" }}>
          {done ? (
            <div style={{ background: "rgba(74,222,128,.08)", border: "1px solid rgba(74,222,128,.2)", borderRadius: 12, padding: "16px", textAlign: "center" }}>
              <Ico.Check s={24} c="#4ade80" />
              <div style={{ fontFamily: H, fontSize: 16, fontWeight: 700, color: "#4ade80", marginBottom: 3, marginTop: 8 }}>You're on the list</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.3)" }}>We'll notify you on launch day.</div>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && saveEmail()}
                placeholder="your@email.com"
                style={{ flex: 1, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 10, padding: "12px 14px", color: "#f0f0f0", fontSize: 14, outline: "none", fontFamily: B }}
              />
              <button onClick={saveEmail} style={{ background: "linear-gradient(135deg,#f5a623,#ff6b00)", border: "none", borderRadius: 10, padding: "12px 18px", fontSize: 13, fontWeight: 800, color: "#000", cursor: "pointer", fontFamily: B, whiteSpace: "nowrap" }}>
                {saving ? "..." : "Notify Me"}
              </button>
            </div>
          )}
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,.16)", animation: "siqFadeUp 1s ease", textAlign: "center" }}>
          No spam · Unsubscribe anytime · Built for South Africa
        </div>
      </div>
    </div>
  );
}

// ─── GRID STATUS BANNER ───────────────────────────────────────
function GridStatusBanner({ status }) {
  const t = DARK;
  if (!status) return null;
  const stages = status?.eskom?.stage;
  const hasOutage = stages && parseInt(stages) > 0;
  const munIssues = Object.values(status).filter(s => s?.stage && parseInt(s.stage) > 0).length;
  if (!hasOutage && munIssues === 0) return null;
  return (
    <div style={{ background: "rgba(248,113,113,.06)", borderBottom: "1px solid rgba(248,113,113,.15)", padding: "7px 0" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", gap: 8 }}>
        <Ico.PowerOff s={13} c="#f87171" />
        <span style={{ fontSize: 12, color: "#f87171", fontWeight: 600, fontFamily: B }}>
          {hasOutage ? `Eskom Stage ${stages} active` : `${munIssues} municipal area${munIssues !== 1 ? "s" : ""} with active outages`} · Check your schedule
        </span>
        <a href="https://loadshedding.eskom.co.za" target="_blank" rel="noopener noreferrer" style={{ marginLeft: "auto", fontSize: 11, color: "#f87171", textDecoration: "underline", fontFamily: B }}>
          Check schedule →
        </a>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────
export default function App() {
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const unlocked = params.get("preview") === "solariq2026";

  const [tab, setTab] = useState("home");
  const [res, setRes] = useState(null);
  const [nlEmail, setNlEmail] = useState("");
  const [nlDone, setNlDone] = useState(false);
  const [nlSaving, setNlSaving] = useState(false);
  const sc = useScreen();
  const t = DARK;
  const gridStatus = useGridStatus();

  const saveNewsletter = async () => {
    if (!nlEmail || nlSaving) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nlEmail.trim())) return;
    setNlSaving(true);
    try { await sb.from("subscribers").upsert({ email: nlEmail.trim().toLowerCase(), source: "newsletter", active: true }, { onConflict: "email" }); }
    catch (e) { console.log(e); }
    setNlDone(true); setNlSaving(false);
  };

  const goTab = id => {
    setTab(id);
    if (id !== "result") setRes(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const TICKS = [
    "Solar tax rebate — claim 25% back from SARS",
    "Pro Calculator now live — full technical inputs",
    "Free System Health Check — 2 minutes",
    "Verified repair technicians across SA",
    "Find SESSA-accredited installers near you",
    "Download your system report as PDF",
  ];

  const NAV = [
    { id: "home",  l: "Home",       SvgIcon: Ico.Home    },
    { id: "calc",  l: "Calculator", SvgIcon: Ico.Zap     },
    { id: "inst",  l: "Installers", SvgIcon: Ico.Map     },
    { id: "serv",  l: "Servicing",  SvgIcon: Ico.Wrench  },
    { id: "blog",  l: "Guides",     SvgIcon: Ico.Book    },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html,body{width:100%;overflow-x:hidden}
    body{background:${t.bg};color:${t.text};font-family:${B};-webkit-text-size-adjust:100%}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-thumb{background:${t.accent};border-radius:4px}
    input::placeholder{color:#4a5068}
    select option{background:#0d1018;color:${t.text}}
    @keyframes siqFadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes siqFadeIn{from{opacity:0}to{opacity:1}}
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes siqPulse{0%,100%{opacity:1}50%{opacity:.3}}
    @keyframes siqParticle{0%,100%{transform:translateY(0) scale(1);opacity:.15}50%{transform:translateY(-18px) scale(1.4);opacity:.55}}
    @keyframes siqGlow{0%,100%{box-shadow:0 0 8px rgba(245,166,35,.3)}50%{box-shadow:0 0 22px rgba(245,166,35,.7)}}

    /* Nav link hover glow */
    .siq-nav-btn{transition:color .18s,text-shadow .18s !important}
    .siq-nav-btn:hover{color:#f5a623 !important;text-shadow:0 0 16px rgba(245,166,35,.5) !important}
    .siq-nav-btn.active{color:#f5a623 !important}

    /* Mobile PWA install prompt */
    #pwa-install{display:none}
  `;

  if (!unlocked) return (
    <>
      <style>{css}</style>
      <ComingSoon />
    </>
  );

  // ── HOME PAGE ────────────────────────────────────────────────
  const homePage = (
    <PageFade k="home">
      {/* Desktop: no-scroll single-screen layout matching desired screenshot */}
      <div style={{
        display: "grid",
        gridTemplateColumns: sc.isDesktop ? "55% 45%" : "1fr",
        gap: sc.isDesktop ? 48 : 28,
        alignItems: "center",
        marginBottom: sc.isDesktop ? 28 : 32,
        minHeight: sc.isDesktop ? "calc(100vh - 200px)" : "auto",
      }}>
        {/* Left column */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: `rgba(${t.rgb},.08)`, border: `1px solid rgba(${t.rgb},.2)`, borderRadius: 20, padding: "5px 14px", marginBottom: 18 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.accent, display: "inline-block", animation: "siqPulse 2s infinite" }} />
            <span style={{ fontSize: 11, color: t.accent, fontWeight: 700, letterSpacing: 1 }}>SA'S SOLAR INTELLIGENCE PLATFORM</span>
          </div>
          <h1 style={{ fontFamily: H, fontSize: "clamp(34px,4.5vw,58px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 18, color: t.text }}>
            From Research<br />To Install<br /><span style={{ color: t.accent }}>To Lifetime Care.</span>
          </h1>
          <p style={{ fontSize: sc.isMobile ? 14 : 16, color: t.sub, lineHeight: 1.8, marginBottom: 26, maxWidth: 420 }}>
            The only platform SA solar owners need — calculate, install, maintain, repair. Free. Always.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, maxWidth: 360 }}>
            {/* Calculate — no icon, text only but slightly bolder */}
            <PBtn onClick={() => goTab("calc")} style={{ fontSize: 15, padding: "15px 28px", fontWeight: 900, letterSpacing: .3 }}>
              Calculate My System
            </PBtn>
            {/* Service — no icon */}
            <button onClick={() => goTab("serv")} style={{ background: `rgba(${t.rgb},.08)`, border: `1px solid rgba(${t.rgb},.2)`, color: t.accent, borderRadius: 30, padding: "14px 22px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: B, width: "100%", transition: "all .22s", letterSpacing: .3 }}
              onMouseEnter={e => { e.currentTarget.style.background = `rgba(${t.rgb},.14)`; e.currentTarget.style.boxShadow = `0 0 18px rgba(${t.rgb},.2)`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `rgba(${t.rgb},.08)`; e.currentTarget.style.boxShadow = "none"; }}>
              Service My Solar
            </button>
          </div>

          {/* Stats row — desktop only */}
          {sc.isDesktop && (
            <div style={{ display: "flex", gap: 32, marginTop: 28, flexWrap: "wrap" }}>
              {[["4", "Calc modes"], ["R0", "Always free"], ["SA", "Built for SA"], ["24/7", "Support"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: H, fontSize: 20, fontWeight: 700, color: t.text }}>{v}</div>
                  <div style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column — tool list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { Icon: Ico.Sparkles,     l: "Quick Calculator",      s: "4 simple questions — 60 seconds",         tab: "calc" },
            { Icon: Ico.Settings,     l: "Pro Calculator",         s: "Full kW/kWh/Ah technical inputs",         tab: "calc" },
            { Icon: Ico.Map,          l: "Installer Directory",    s: "SESSA-accredited, verified + finance",    tab: "inst" },
            { Icon: Ico.Stethoscope,  l: "Health Check",           s: "AI-powered system diagnostic",            tab: "serv", badge: "AI" },
            { Icon: Ico.AlertTriangle,l: "Error Code Translator",  s: "Plain English inverter explanations",     tab: "serv" },
            { Icon: Ico.Wrench,       l: "Find a Technician",      s: "Matched to your issue, near you",         tab: "serv" },
          ].map((x, i) => {
            const [hov, setHov] = useState(false);
            return (
              <div key={x.l} onClick={() => goTab(x.tab)}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{ display: "flex", alignItems: "center", gap: 12, background: hov ? t.bgCard2 : t.bgCard, border: `1px solid ${hov ? `rgba(${t.rgb},.28)` : t.border}`, borderRadius: 12, padding: "12px 14px", cursor: "pointer", transition: "all .22s", animation: `siqFadeUp .4s ease ${i * .05}s both`, transform: hov ? "translateX(4px)" : "none", boxShadow: hov ? `0 0 14px rgba(${t.rgb},.1)` : "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: hov ? `rgba(${t.rgb},.14)` : `rgba(${t.rgb},.08)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background .2s" }}>
                  <x.Icon s={16} c={t.accent} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2, fontFamily: H }}>{x.l}</div>
                  <div style={{ fontSize: 11, color: t.sub }}>{x.s}</div>
                </div>
                {x.badge && <span style={{ fontSize: 9, background: `rgba(${t.rgb},.12)`, color: t.accent, padding: "2px 6px", borderRadius: 7, fontWeight: 700, flexShrink: 0 }}>{x.badge}</span>}
                <span style={{ fontSize: 13, color: t.sub, flexShrink: 0, transition: "color .18s" }}>›</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Your Solar Journey — 5 stage strip */}
      <div style={{ marginBottom: sc.isMobile ? 28 : 0 }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <Lbl center>Your Solar Journey</Lbl>
          <h2 style={{ fontFamily: H, fontSize: sc.isMobile ? 19 : 24, fontWeight: 700, color: t.text }}>SolarIQ is with you at every stage</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: sc.isMobile ? "1fr 1fr" : "repeat(5,1fr)", gap: 10 }}>
          {[
            { n: "01", l: "Research", Icon: Ico.Search,      d: "Calculate what you need",       c: t.accent  },
            { n: "02", l: "Compare",  Icon: Ico.Scale,       d: "Find the best installers",      c: t.accent2 },
            { n: "03", l: "Install",  Icon: Ico.Zap,         d: "Accredited professionals",      c: "#4ade80" },
            { n: "04", l: "Maintain", Icon: Ico.Wrench,      d: "Reminders & cleaning tips",     c: "#60a5fa" },
            { n: "05", l: "Repair",   Icon: Ico.Stethoscope, d: "Error codes & health checks",   c: "#c084fc" },
          ].map((s, i) => {
            const [hov, setHov] = useState(false);
            return (
              <div key={s.n}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{ background: hov ? t.bgCard2 : t.bgCard, border: `1px solid ${hov ? s.c + "44" : t.border}`, borderRadius: 12, padding: "16px 14px", animation: `siqFadeUp .4s ease ${i * .07}s both`, transition: "all .22s", transform: hov ? "scale(1.03)" : "none", boxShadow: hov ? `0 0 16px ${s.c}22` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <span style={{ fontFamily: H, fontSize: 10, fontWeight: 900, color: s.c, opacity: .4 }}>{s.n}</span>
                  <div style={{ flex: 1, height: 1, background: `${s.c}20` }} />
                  <s.Icon s={16} c={s.c} />
                </div>
                <div style={{ fontFamily: H, fontSize: 14, fontWeight: 700, color: s.c, marginBottom: 4 }}>{s.l}</div>
                <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.5 }}>{s.d}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Newsletter — mobile only (desktop fits on one screen) */}
      {sc.isMobile && (
        <div style={{ background: `linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`, border: `1px solid rgba(${t.rgb},.15)`, borderRadius: 16, padding: "22px", textAlign: "center", marginTop: 20 }}>
          <h3 style={{ fontFamily: H, fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 6 }}>Solar insights for SA homeowners</h3>
          <p style={{ color: t.sub, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>Weekly tips and updates. No spam, unsubscribe anytime.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {nlDone ? (
              <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Ico.Check s={14} c="#4ade80" /> You're subscribed!
              </div>
            ) : (
              <>
                <input value={nlEmail} onChange={e => setNlEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && saveNewsletter()} placeholder="your@email.com" style={{ width: "100%", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 9, padding: "11px 14px", color: t.text, fontSize: 14, outline: "none", fontFamily: B, boxSizing: "border-box" }} />
                <PBtn full onClick={saveNewsletter} sm>{nlSaving ? "..." : "Subscribe Free"}</PBtn>
              </>
            )}
          </div>
        </div>
      )}
    </PageFade>
  );

  return (
    <T.Provider value={t}>
      <style>{css}</style>
      <div style={{ fontFamily: B, background: t.bg, minHeight: "100vh", color: t.text, overflowX: "hidden", display: "flex", flexDirection: "column" }}>

        {/* Grid outage banner */}
        <GridStatusBanner status={gridStatus} />

        {/* Ticker bar — desktop only */}
        {!sc.isMobile && (
          <div style={{ background: `rgba(${t.rgb},.06)`, borderBottom: `1px solid ${t.border}`, height: 26, overflow: "hidden", display: "flex", alignItems: "center", flexShrink: 0 }}>
            <div style={{ display: "flex", animation: "ticker 38s linear infinite", whiteSpace: "nowrap" }}>
              {[...TICKS, ...TICKS].map((x, i) => (
                <span key={i} style={{ fontSize: 10, color: t.accent, marginRight: 56, opacity: .8, fontWeight: 600 }}>{x}</span>
              ))}
            </div>
          </div>
        )}

        {/* Desktop nav — FIXED, always on top */}
        {!sc.isMobile && (
          <nav style={{ background: t.navBg, backdropFilter: "blur(20px)", borderBottom: `1px solid ${t.border}`, padding: "0 28px", position: "fixed", top: gridStatus ? 52 : 26, left: 0, right: 0, zIndex: 200, height: 52, display: "flex", alignItems: "center" }}>
            <div style={{ maxWidth: 1360, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%", width: "100%", gap: 16 }}>
              {/* Logo */}
              <div onClick={() => goTab("home")} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flexShrink: 0 }}>
                <SolarIQLogo s={24} />
                <span style={{ fontFamily: H, fontSize: 20, fontWeight: 900, letterSpacing: 1, color: t.text }}>Solar<span style={{ color: t.accent }}>IQ</span></span>
                <span style={{ fontSize: 9, background: `rgba(${t.rgb},.15)`, color: t.accent, padding: "1px 6px", borderRadius: 8, fontWeight: 700, letterSpacing: 1 }}>BETA</span>
              </div>

              {/* Nav links */}
              <div style={{ display: "flex", gap: 2 }}>
                {NAV.map(x => {
                  const active = tab === x.id;
                  return (
                    <button key={x.id} onClick={() => goTab(x.id)}
                      className={`siq-nav-btn${active ? " active" : ""}`}
                      style={{ background: active ? `rgba(${t.rgb},.08)` : "none", border: `1px solid ${active ? `rgba(${t.rgb},.22)` : "transparent"}`, color: active ? t.accent : t.sub, padding: "5px 16px", borderRadius: 7, cursor: "pointer", fontSize: 13, fontWeight: active ? 700 : 500, fontFamily: B }}>
                      {x.l}
                    </button>
                  );
                })}
              </div>

              {/* Right actions */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Stay Updated — text only */}
                <button onClick={() => {
                  const el = document.getElementById("newsletter-input");
                  if (el) el.focus();
                  else goTab("home");
                }} style={{ background: `linear-gradient(135deg,${t.accent},${t.accent2})`, border: "none", borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#000", fontFamily: B, transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 16px rgba(${t.rgb},.45)`; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}>
                  Stay Updated
                </button>
              </div>
            </div>
          </nav>
        )}

        {/* Mobile fixed top bar */}
        {sc.isMobile && (
          <div style={{ background: t.navBg, backdropFilter: "blur(20px)", borderBottom: `1px solid ${t.border}`, padding: "0 16px", position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 50, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div onClick={() => goTab("home")} style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
              <SolarIQLogo s={22} />
              <span style={{ fontFamily: H, fontSize: 18, fontWeight: 900, letterSpacing: 1, color: t.text }}>Solar<span style={{ color: t.accent }}>IQ</span></span>
            </div>
            {/* Grid status dot on mobile */}
            {gridStatus && (
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f87171", animation: "siqPulse 2s infinite" }} />
            )}
          </div>
        )}

        {/* Main content — offset for fixed nav */}
        <div style={{ flex: 1, width: "100%", paddingTop: sc.isMobile ? 50 : (gridStatus ? 78 : 78) }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: sc.isMobile ? "16px 14px 100px" : sc.isDesktop ? "36px 48px 56px" : "28px 28px 56px", width: "100%" }}>

            {tab === "home"   && homePage}
            {tab === "calc"   && !res && <PageFade k="calc"><Calculator onResult={r => { setRes(r); setTab("result"); }} /></PageFade>}
            {tab === "result" && res   && <PageFade k="result"><Results r={res} onReset={() => { setRes(null); setTab("home"); }} goInstallers={() => goTab("inst")} /></PageFade>}
            {tab === "inst"   && <PageFade k="inst"><Installers /></PageFade>}
            {tab === "serv"   && <PageFade k="serv"><Servicing /></PageFade>}
            {tab === "blog"   && <PageFade k="blog"><Blog onCalc={() => goTab("calc")} /></PageFade>}

          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${t.border}`, padding: "18px 28px", textAlign: "center", paddingBottom: sc.isMobile ? 80 : 18, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 4 }}>
            <SolarIQLogo s={15} />
            <span style={{ fontFamily: H, fontSize: 14, fontWeight: 900, letterSpacing: 1, color: t.text }}>Solar<span style={{ color: t.accent }}>IQ</span></span>
          </div>
          <div style={{ fontSize: 12, color: t.sub }}>South Africa's complete solar platform.</div>
        </div>

        {/* Mobile bottom nav */}
        {sc.isMobile && (
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: t.navBg, backdropFilter: "blur(20px)", borderTop: `1px solid ${t.border}`, display: "flex", zIndex: 200, paddingBottom: "env(safe-area-inset-bottom,0px)" }}>
            {NAV.map(x => (
              <button key={x.id} onClick={() => goTab(x.id)} style={{ flex: 1, background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 4px", cursor: "pointer", gap: 3 }}>
                <x.SvgIcon s={18} c={tab === x.id ? t.accent : t.sub} />
                <span style={{ fontSize: 9, fontWeight: 600, color: tab === x.id ? t.accent : t.sub, fontFamily: B, letterSpacing: .3 }}>{x.l}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </T.Provider>
  );
}
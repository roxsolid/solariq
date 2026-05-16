import { useState, useEffect, useRef, createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://intvnxvannltfibguykw.supabase.co";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHZueHZhbm5sdGZpYmd1eWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzAwNjgsImV4cCI6MjA5MDA0NjA2OH0.KnPP0-vxXyBYTvHxbXfrH8AKd61u1hWpEO2gpjWnzNE";
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// DARK only — light mode eliminated
const DARK = {
  dark:true, accent:"#f5a623", accent2:"#ff6b00", rgb:"245,166,35",
  bg:"#07090d", bgCard:"rgba(255,255,255,.04)", bgCard2:"rgba(255,255,255,.07)",
  border:"rgba(255,255,255,.08)", text:"#f0f0f0", textMid:"#aaa", sub:"#555",
  navBg:"rgba(7,9,13,.97)", inputBg:"rgba(255,255,255,.06)"
};
const T = createContext(DARK);
const useT = () => useContext(T);
const H = "'Lexend',sans-serif";
const B = "'Plus Jakarta Sans',sans-serif";
const W = { logo:900, hero:900, section:700, card:700, sub:600 };

// ─── RAY-STYLE LOGO SVG (still, no animation) ────────────────
const LogoIcon = ({ s=26 }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="6" fill="#f5a623"/>
    <line x1="16" y1="1" x2="16" y2="6" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="16" y1="26" x2="16" y2="31" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="1" y1="16" x2="6" y2="16" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="26" y1="16" x2="31" y2="16" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="5.1" y1="5.1" x2="8.6" y2="8.6" stroke="#f5a623" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="23.4" y1="23.4" x2="26.9" y2="26.9" stroke="#f5a623" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="26.9" y1="5.1" x2="23.4" y2="8.6" stroke="#f5a623" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="8.6" y1="23.4" x2="5.1" y2="26.9" stroke="#f5a623" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);

// ─── SVG ICONS ────────────────────────────────────────────────
const Ico = {
  Sun:        ({s=20,c="#f5a623"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" fill={c}/><line x1="12" y1="2" x2="12" y2="5" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="19" x2="12" y2="22" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="2" y1="12" x2="5" y2="12" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="19" y1="12" x2="22" y2="12" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="19.78" y1="4.22" x2="17.66" y2="6.34" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="6.34" y1="17.66" x2="4.22" y2="19.78" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  Zap:        ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Battery:    ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/></svg>,
  Home:       ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Building:   ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="1"/><line x1="8" y1="7" x2="8" y2="7.01"/><line x1="12" y1="7" x2="12" y2="7.01"/><line x1="16" y1="7" x2="16" y2="7.01"/><line x1="8" y1="11" x2="8" y2="11.01"/><line x1="12" y1="11" x2="12" y2="11.01"/><line x1="16" y1="11" x2="16" y2="11.01"/><line x1="8" y1="15" x2="8" y2="15.01"/><line x1="12" y1="15" x2="12" y2="15.01"/></svg>,
  Wrench:     ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  FileText:   ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  Book:       ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Map:        ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  Search:     ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Settings:   ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Phone:      ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Globe:      ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Check:      ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  TrendUp:    ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Shield:     ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Stethoscope:({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>,
  AlertTriangle:({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Calendar:   ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  CreditCard: ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Leaf:       ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
  Lightbulb:  ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
  Tv:         ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>,
  Fridge:     ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14H5V6z"/><line x1="5" y1="10" x2="19" y2="10"/><line x1="9" y1="14" x2="9" y2="17"/><line x1="9" y1="5" x2="9" y2="8"/></svg>,
  Wifi:       ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  Laptop:     ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>,
  Monitor:    ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Printer:    ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
  WashMachine:({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="12" cy="13" r="4"/><line x1="7" y1="6" x2="7.01" y2="6"/><line x1="11" y1="6" x2="11.01" y2="6"/></svg>,
  Flame:      ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  Droplets:   ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>,
  Wind:       ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>,
  Waves:      ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2"/></svg>,
  Lock:       ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  DoorOpen:   ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 4h3a2 2 0 0 1 2 2v14"/><path d="M2 20h3"/><path d="M13 20h9"/><path d="M10 12v.01"/><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561z"/></svg>,
  Sparkles:   ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/></svg>,
  Scale:      ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M7 21h10"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>,
  DollarSign: ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  Coins:      ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>,
  ArrowRight: ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Chart:      ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  Mail:       ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Download:   ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  WhatsApp:   ({s=16,c="#25d366"})=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
  FireEmoji:  ()=><span style={{fontSize:13}}>🔥</span>,
};

function useScreen() {
  const [w,setW] = useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{ const fn=()=>setW(window.innerWidth); window.addEventListener("resize",fn); return ()=>window.removeEventListener("resize",fn); },[]);
  return { w, isMobile:w<640, isTablet:w>=640&&w<1024, isDesktop:w>=1024 };
}

const RATE=3.20;
const APPLIANCES=[
  {id:"lights",   Icon:Ico.Lightbulb,   name:"Lights",          w:10,   h:6,   cat:"essentials"},
  {id:"tv",       Icon:Ico.Tv,          name:"TV",              w:120,  h:4,   cat:"essentials"},
  {id:"fridge",   Icon:Ico.Fridge,      name:"Fridge",          w:150,  h:24,  cat:"essentials"},
  {id:"wifi",     Icon:Ico.Wifi,        name:"WiFi Router",     w:15,   h:24,  cat:"essentials"},
  {id:"phone",    Icon:Ico.Phone,       name:"Phone",           w:20,   h:3,   cat:"essentials"},
  {id:"laptop",   Icon:Ico.Laptop,      name:"Laptop",          w:65,   h:6,   cat:"work"},
  {id:"desktop",  Icon:Ico.Monitor,     name:"Desktop PC",      w:300,  h:6,   cat:"work"},
  {id:"printer",  Icon:Ico.Printer,     name:"Printer",         w:50,   h:1,   cat:"work"},
  {id:"washing",  Icon:Ico.WashMachine, name:"Washing Machine", w:500,  h:1,   cat:"home"},
  {id:"microwave",Icon:Ico.Flame,       name:"Microwave",       w:1000, h:.5,  cat:"home"},
  {id:"kettle",   Icon:Ico.Flame,       name:"Kettle",          w:2000, h:.25, cat:"home"},
  {id:"geyser",   Icon:Ico.Droplets,    name:"Geyser",          w:3000, h:2,   cat:"home"},
  {id:"aircon",   Icon:Ico.Wind,        name:"Air Con",         w:1500, h:4,   cat:"comfort"},
  {id:"pool",     Icon:Ico.Waves,       name:"Pool Pump",       w:1100, h:6,   cat:"comfort"},
  {id:"security", Icon:Ico.Lock,        name:"Security",        w:30,   h:24,  cat:"comfort"},
  {id:"gate",     Icon:Ico.DoorOpen,    name:"Gate Motor",      w:200,  h:.5,  cat:"comfort"},
];

const QUIZ=[
  {id:"size",q:"What size is your home?",hint:"Helps estimate your total energy needs",opts:[
    {label:"Studio / 1 Bed",  Icon:Ico.Home,        v:"s",kwh:8},
    {label:"2–3 Bedroom",     Icon:Ico.Home,        v:"m",kwh:18},
    {label:"4+ Bedroom",      Icon:Ico.Building,    v:"l",kwh:30},
    {label:"Small Business",  Icon:Ico.Building,    v:"b",kwh:45}]},
  {id:"bill",q:"Your average monthly Eskom bill?",hint:"Roughly is fine",opts:[
    {label:"Under R800",      Icon:Ico.Coins,       v:"lo",mult:.6},
    {label:"R800–R2 000",     Icon:Ico.Coins,       v:"md",mult:1},
    {label:"R2 000–R5 000",   Icon:Ico.DollarSign,  v:"hi",mult:1.8},
    {label:"Over R5 000",     Icon:Ico.DollarSign,  v:"xh",mult:3}]},
  {id:"goal",q:"What matters most to you?",hint:"This shapes the whole recommendation",opts:[
    {label:"Power outage backup",     Icon:Ico.Battery,    v:"bk",kw:3},
    {label:"Cut my electricity bill", Icon:Ico.Coins,      v:"sv",kw:5},
    {label:"Mostly off-grid",         Icon:Ico.Sun,        v:"og",kw:8},
    {label:"Full grid independence",  Icon:Ico.Zap,        v:"fo",kw:12}]},
  {id:"roof",q:"What type of roof do you have?",hint:"Affects installation method and panel count",opts:[
    {label:"Tiled / IBR",     Icon:Ico.Home,        v:"ti",bf:1},
    {label:"Flat concrete",   Icon:Ico.Building,    v:"fl",bf:1.2},
    {label:"Corrugated iron", Icon:Ico.Home,        v:"ci",bf:1},
    {label:"Not sure",        Icon:Ico.Shield,      v:"ns",bf:1.5}]},
];

const ALL_PROVS = ["All","Gauteng","Western Cape","KwaZulu-Natal","Eastern Cape","Free State","Mpumalanga","Northern Cape","North West","Limpopo"];

const INSTALLERS=[
  {id:1,name:"SunPower SA",city:"Johannesburg",prov:"Gauteng",rating:4.9,rev:312,sessa:true,jobs:847,yrs:12,badge:"Top Rated",resp:"2 hrs",spec:"Residential",brands:["Sunsynk","Victron"],price:"R80k–R200k",verified:true,about:"12 years installing solar across Gauteng. Specialise in hybrid systems for power outage resilience. All installations include 5-year workmanship warranty.",website:"sunpowersa.co.za",finance:true,contact:{whatsapp:"+27821234567",email:"info@sunpowersa.co.za",phone:"+27821234567"},address:"14 Solar Street, Randburg, Gauteng",contactPerson:"James van der Merwe"},
  {id:2,name:"Cape Solar Pro",city:"Cape Town",prov:"Western Cape",rating:4.8,rev:198,sessa:true,jobs:523,yrs:9,badge:"Most Popular",resp:"3 hrs",spec:"Commercial & Residential",brands:["Deye","Sunsynk"],price:"R60k–R350k",verified:true,about:"Cape Town's leading solar installer for homes and businesses. Over 500 completed installations across the Western Cape.",website:"capesolar.co.za",finance:true,contact:{whatsapp:"+27831234567",email:"quotes@capesolar.co.za",phone:"+27831234567"},contactPerson:"Sarah Johnson"},
  {id:3,name:"KZN Solar Solutions",city:"Durban",prov:"KwaZulu-Natal",rating:4.7,rev:143,sessa:true,jobs:389,yrs:7,badge:null,resp:"4 hrs",spec:"Off-grid",brands:["Victron","Pylontech"],price:"R70k–R250k",verified:true,about:"KZN specialists in off-grid and hybrid systems. Serving coastal and inland properties with custom energy solutions.",website:"kznsolar.co.za",finance:false,contact:{whatsapp:"+27841234567"},contactPerson:"Michael Dlamini"},
  {id:4,name:"Pretoria Solar Works",city:"Pretoria",prov:"Gauteng",rating:4.6,rev:89,sessa:false,jobs:201,yrs:5,badge:"Fast Response",resp:"Same day",spec:"Residential",brands:["Growatt","Deye"],price:"R50k–R150k",verified:true,about:"Fast-response residential installer based in Pretoria. Same-day site assessments available. Competitive pricing with flexible payment options.",website:"pretoriasolar.co.za",finance:true,contact:{whatsapp:"+27851234567",phone:"+27851234567"},contactPerson:"Andre Botha"},
  {id:5,name:"Green Energy EC",city:"Port Elizabeth",prov:"Eastern Cape",rating:4.5,rev:67,sessa:true,jobs:156,yrs:6,badge:null,resp:"5 hrs",spec:"Agricultural",brands:["Victron","Sunsynk"],price:"R90k–R400k",verified:false,about:"Agricultural solar specialists serving farms across the Eastern Cape. Large system experience up to 100kW.",website:"greenenergy-ec.co.za",finance:false,contact:{email:"info@greenenergy-ec.co.za"},contactPerson:"Thabo Nkosi"},
  {id:6,name:"Solar Hub BFN",city:"Bloemfontein",prov:"Free State",rating:4.4,rev:44,sessa:true,jobs:98,yrs:4,badge:null,resp:"6 hrs",spec:"Residential",brands:["Deye","Growatt"],price:"R45k–R130k",verified:true,about:"Free State's most affordable verified installer. Budget-conscious solutions without compromising on quality components.",website:"solarhub-bfn.co.za",finance:true,contact:{whatsapp:"+27861234567",email:"quotes@solarhub-bfn.co.za"},contactPerson:"Pieter Fourie"},
  {id:7,name:"Mpumalanga Solar",city:"Nelspruit",prov:"Mpumalanga",rating:4.6,rev:58,sessa:false,jobs:134,yrs:5,badge:null,resp:"4 hrs",spec:"Commercial",brands:["Sunsynk"],price:"R100k–R300k",verified:true,about:"Commercial solar solutions across Mpumalanga and Limpopo. Specialise in retail, hospitality and light industrial.",website:"mpusolar.co.za",finance:false,contact:{whatsapp:"+27871234567"},contactPerson:"Lucky Mahlangu"},
  {id:8,name:"Northern Cape Solar",city:"Kimberley",prov:"Northern Cape",rating:4.8,rev:31,sessa:true,jobs:76,yrs:8,badge:"High PSH Zone",resp:"3 hrs",spec:"Off-grid & Agricultural",brands:["Victron","Pylontech"],price:"R80k–R500k",verified:true,about:"Operating in one of SA's highest solar irradiance zones. Off-grid experts for farms and remote properties across the Northern Cape.",website:"ncapesolar.co.za",finance:false,contact:{email:"info@ncapesolar.co.za",phone:"+27811234567"},contactPerson:"Lena Pietersen"},
];

const SPECS=["All","Residential","Commercial","Off-grid","Agricultural","Commercial & Residential","Off-grid & Agricultural"];
const BRANDS=["All","Sunsynk","Victron","Deye","Growatt","Pylontech"];

const TECHS=[
  {id:1,name:"FixSolar SA",prov:"Gauteng",city:"Johannesburg",spec:"Inverter Repair",rating:4.9,rev:203,price:"R450/hr",emergency:true,brands:["Victron","Sunsynk","Deye"],yrs:8,about:"Inverter repair specialists with same-day callouts across Gauteng. All major brands serviced. Genuine parts only.",website:"fixsolar.co.za",contact:{whatsapp:"+27821111111",phone:"+27821111111"}},
  {id:2,name:"Panel Clean Pro",prov:"Western Cape",city:"Cape Town",spec:"Panel Cleaning",rating:4.8,rev:156,price:"R85/panel",emergency:false,brands:["All brands"],yrs:5,about:"Professional panel cleaning using deionised water systems. Proven to restore 15–25% lost efficiency. Regular contracts available.",website:"panelclean.co.za",contact:{whatsapp:"+27831111111",email:"info@panelclean.co.za"}},
  {id:3,name:"Battery Doctors",prov:"Gauteng",city:"Pretoria",spec:"Battery Replacement",rating:4.7,rev:98,price:"From R1 200",emergency:true,brands:["Pylontech","BSL","Freedom Won"],yrs:6,about:"Battery health diagnostics and replacement across Gauteng. Full BMS configuration included. Emergency callouts 24/7.",website:"batterydoctors.co.za",contact:{whatsapp:"+27841111111"}},
  {id:4,name:"Solar Doctor KZN",prov:"KwaZulu-Natal",city:"Durban",spec:"Full System Service",rating:4.8,rev:87,price:"R1 800",emergency:false,brands:["All brands"],yrs:7,about:"Comprehensive annual service packages for all system types. Includes panel inspection, inverter check, battery test and full report.",website:"solardoctor-kzn.co.za",contact:{whatsapp:"+27851111111",email:"book@solardoctor-kzn.co.za"}},
  {id:5,name:"Limpopo Solar Tech",prov:"Limpopo",city:"Polokwane",spec:"Inverter Repair",rating:4.5,rev:42,price:"R380/hr",emergency:true,brands:["Sunsynk","Growatt"],yrs:4,about:"Reliable inverter repair and system diagnostics across Limpopo province.",website:"limpopolar.co.za",contact:{whatsapp:"+27791111111"}},
  {id:6,name:"North West Solar Fix",prov:"North West",city:"Rustenburg",spec:"Full System Service",rating:4.4,rev:29,price:"R1 500",emergency:false,brands:["All brands"],yrs:3,about:"Full system servicing for residential and small commercial clients in the North West.",website:"nwsolarfix.co.za",contact:{whatsapp:"+27781111111",email:"info@nwsolarfix.co.za"}},
];

const TECH_SPECS=["Inverter Repair","Panel Cleaning","Battery Replacement","Full System Service"];

const ERRORS={
  "F01":{brand:"Sunsynk",title:"Grid voltage too high",sev:"warning",diy:true,fix:"Grid voltage above safe range — usually a municipal supply issue. Resolves itself. If it persists over 2 hours, contact your installer.",specs:["Inverter Repair"]},
  "F02":{brand:"Sunsynk",title:"Grid voltage too low",sev:"warning",diy:true,fix:"Grid voltage dropping below safe threshold. Common during power outage transitions. System auto-switches to battery.",specs:["Inverter Repair"]},
  "F32":{brand:"Sunsynk",title:"Battery over-temperature",sev:"critical",diy:false,fix:"Battery overheating. Ensure ventilation immediately. Do NOT continue using — contact technician urgently.",specs:["Battery Replacement","Full System Service"]},
  "E001":{brand:"Victron",title:"Low battery shutdown",sev:"warning",diy:true,fix:"Battery depleted to minimum safe level. Will resume charging once power is available.",specs:["Battery Replacement"]},
  "E002":{brand:"Victron",title:"Overload — too much drawn",sev:"warning",diy:true,fix:"Drawing more power than inverter can handle. Switch off heavy appliances and restart.",specs:["Inverter Repair"]},
  "E003":{brand:"Victron",title:"Inverter overheating",sev:"critical",diy:false,fix:"Switch off immediately. Ensure 20cm clearance on all sides. Do not restart until cool.",specs:["Inverter Repair","Full System Service"]},
  "W001":{brand:"Deye",title:"PV input voltage high",sev:"info",diy:true,fix:"Panel voltage slightly above optimal. Usually resolves as panels cool. Monitor for 24 hours.",specs:["Full System Service"]},
  "W003":{brand:"Deye",title:"Grid frequency out of range",sev:"warning",diy:true,fix:"Grid frequency unstable. Normal during power cut transitions.",specs:["Inverter Repair"]},
  "G01":{brand:"Growatt",title:"No grid connection detected",sev:"info",diy:true,fix:"Check your mains breaker first. If mains is on and not a power cut, contact your installer.",specs:["Inverter Repair"]},
  "G05":{brand:"Growatt",title:"Insulation resistance fault",sev:"critical",diy:false,fix:"Serious fault. Switch off at DC isolator immediately. Call a qualified electrician now.",specs:["Full System Service","Inverter Repair"]},
};

const HEALTH_QS=[
  {id:"age",q:"How old is your solar system?",opts:["Under 1 year","1–3 years","3–5 years","5+ years"]},
  {id:"perf",q:"Is your system performing as expected?",opts:["Yes, performing well","Slightly less than before","Much worse than before","Not sure"]},
  {id:"snd",q:"Any unusual sounds from your inverter?",opts:["No unusual sounds","Occasional clicking","Constant humming/buzzing","Loud unusual noise"]},
  {id:"err",q:"Any error codes or warning lights?",opts:["No errors","Occasional warnings","Regular error codes","System offline"]},
  {id:"cln",q:"When were your panels last cleaned?",opts:["Within 3 months","3–6 months ago","Over 6 months ago","Never cleaned"]},
  {id:"svc",q:"Has your system had a professional service?",opts:["Within the year","1–2 years ago","Never been serviced","Not sure"]},
];

const ARTICLES=[
  {id:1,tag:"Guide",hot:true,min:"7",views:"12.4k",title:"How much does a 5kW solar system cost in SA in 2026?",intro:"Solar prices have dropped. Here's exactly what a complete 5kW system costs installed — and what drives the price.",body:[{h:"What's included?",p:"When an installer quotes a '5kW system' they mean the inverter size. A complete system includes inverter, 8–10 solar panels, battery bank, mounting, cabling and labour. Never compare quotes without confirming what's included."},{h:"Prices in 2026",p:"A 5kW hybrid system with 10kWh lithium battery typically costs R85,000–R140,000 fully installed. Gauteng tends to be cheaper than Cape Town due to higher competition."},{h:"The tax rebate most miss",p:"SARS allows 25% of solar panel cost as a tax rebate — capped at R15,000. On R50,000 in panels that's R12,500 back. Claim via your ITR12 on eFiling."},{h:"Bottom line",p:"Budget R90,000–R120,000 for a quality system. Monthly savings of R1,500–R3,500 mean payback in 4–7 years. After that it's free electricity."}],related:[2,3,6]},
  {id:2,tag:"Comparison",hot:true,min:"9",views:"8.9k",title:"Sunsynk vs Deye vs Victron — which inverter is best for SA?",intro:"Three brands dominate the SA inverter market. An honest comparison — no sponsorships.",body:[{h:"Sunsynk — the SA favourite",p:"South African-designed, handles grid instability well, local support. Price: R12,000–R22,000. Best for typical SA suburban home."},{h:"Deye — the value king",p:"Chinese-manufactured, best spec-per-rand. Solid reliability. Price: R8,000–R16,000. Best for budget-conscious buyers."},{h:"Victron — the premium choice",p:"Dutch-engineered gold standard. Best monitoring, fully modular. Price: R18,000–R45,000. Best for off-grid or premium installs."},{h:"Verdict",p:"For most SA homeowners: Sunsynk. Budget: Deye. Off-grid or premium: Victron. Avoid cheap generic brands."}],related:[1,3,5]},
  {id:3,tag:"Tax",hot:false,min:"5",views:"6.2k",title:"How to claim your solar tax rebate from SARS — step by step",intro:"Most SA homeowners don't claim this. Here's exactly how to get up to R15,000 back.",body:[{h:"What qualifies?",p:"Only new and unused solar PV panels. Batteries, inverters, mounting, cabling and labour do not qualify."},{h:"How much?",p:"25% of panel cost, capped at R15,000. This is a rebate against your tax liability."},{h:"Documents needed",p:"Original invoice showing panel brand, model, wattage and cost separately. Certificate of compliance. Proof of payment."},{h:"How to claim",p:"On your ITR12 eFiling return, find Solar Energy Tax Credit. Enter the qualifying panel cost. SARS calculates the 25% automatically."}],related:[1,4,6]},
  {id:4,tag:"Maintenance",hot:false,min:"6",views:"4.8k",title:"Is your solar system actually working properly? 7 signs it isn't",intro:"Many SA solar systems quietly underperform for months. Here are the warning signs.",body:[{h:"Backup doesn't last as long",p:"Battery used to last 4 hours, now 2? Capacity has degraded or charge settings are wrong. Lithium should retain 80% after 3,000 cycles."},{h:"Still getting high Eskom bills",p:"If your bill hasn't dropped, system may be undersized, panels shaded, or inverter settings wrong."},{h:"Panels not cleaned in 6+ months",p:"Dirty panels lose up to 25% efficiency. R85–R150 per panel every 3–6 months is the best maintenance you can do."},{h:"Ignoring error codes",p:"Some sort themselves out. Others are early warnings. Use the Error Code Translator in the Servicing tab."}],related:[1,2,3]},
  {id:5,tag:"Guide",hot:false,min:"8",views:"3.9k",title:"Off-grid vs grid-tied solar in South Africa — the honest truth",intro:"The dream of zero electricity bill is real — but not for everyone.",body:[{h:"Grid-tied: cheapest, useless during outages",p:"No battery, no backup. System switches off during power cuts. Only makes sense if you're never affected."},{h:"Hybrid: the SA sweet spot",p:"Grid plus battery. Handles power cuts, reduces bill. What 95% of SA residential installations should be. Cost: R80,000–R200,000."},{h:"Off-grid: freedom, but expensive",p:"Needs 3× the battery capacity of hybrid. Makes sense for farms — not most SA suburbs."},{h:"Recommendation",p:"For urban SA: go hybrid. Size battery for 2× your worst outage hours with 20% buffer."}],related:[1,2,6]},
  {id:6,tag:"Comparison",hot:true,min:"10",views:"7.1k",title:"Best solar panels available in South Africa — ranked 2026",intro:"Not all solar panels are equal. The top panels available through SA installers right now.",body:[{h:"What to look for",p:"Four numbers: efficiency %, power output (Wp), annual degradation (aim under 0.5%/year), and product warranty (25 years standard)."},{h:"Tier 1: JA Solar & Longi",p:"Bloomberg Tier 1 bankable panels. Dominate SA installations. Efficiency 21–22.5%. R2,200–R3,200 per 550Wp panel."},{h:"Tier 1: Canadian Solar",p:"Strong warranty support, 20.5–21.5% efficiency, available through most SA distributors."},{h:"What to avoid",p:"Generic unbranded panels. No local warranty means a fault in year 5 is entirely your problem."}],related:[1,2,5]},
  {id:7,tag:"News",hot:true,min:"5",views:"3.1k",title:"Sodium-ion batteries are coming to SA — and they could change everything",intro:"A new battery technology is making its way to South Africa. Cheaper than lithium, no cobalt, doesn't catch fire.",coverImg:"https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",body:[{h:"What is sodium-ion?",p:"Sodium-ion batteries work on the same principle as lithium-ion — ions move between electrodes to store and release energy. The key difference: sodium instead of lithium, which is far more abundant globally."},{h:"Why it matters for SA",p:"SA's solar market has boomed since grid instability hit critical levels. Demand for batteries has pushed prices up. Sodium-ion could break this bottleneck — manufactured anywhere, without rare minerals."},{h:"The specs that matter",p:"Current Na-ion cells hit 140–160 Wh/kg energy density. Slightly larger pack for the same storage. But: safer chemistry, longer cycle life, and projected costs 20–30% below lithium by 2027."},{h:"Should you wait?",p:"No. If you need solar now, install lithium LFP — it's proven, warrantied and available. Na-ion is 12–18 months away from SA shelves at competitive prices."}],related:[1,2,6]},
];

// ─── HOOKS & UTILITIES ────────────────────────────────────────
function useCount(x,ms=1300){
  const[v,setV]=useState(0);
  useEffect(()=>{let s=null;const f=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/ms,1);setV(Math.floor((1-Math.pow(1-p,3))*x));if(p<1)requestAnimationFrame(f);};requestAnimationFrame(f);},[x]);
  return v;
}
function makeResult(d,k,bf=1.5){
  const invKva=Math.max(3,Math.ceil(k*1.25));
  const mo=Math.round(d*30*RATE),cost=Math.round(k*18000),save=Math.round(mo*12*.75);
  return{systemKw:k,battKwh:Math.round(k*bf*10)/10,invKva,cost,annSave:save,mo,payback:(cost/save).toFixed(1),dailyKwh:Math.round(d*10)/10,panels:Math.ceil(k/.55)};
}

// ─── PRIMITIVES ───────────────────────────────────────────────
function PBtn({children,onClick,disabled,sm,style={}}){
  const t=useT();
  const[hov,setHov]=useState(false);
  return <button onClick={onClick} disabled={disabled}
    onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
    style={{background:disabled?"rgba(128,128,128,.15)":`linear-gradient(135deg,${t.accent},${t.accent2})`,
      color:disabled?"#666":"#000",border:"none",borderRadius:30,
      padding:sm?"10px 20px":"13px 28px",fontSize:sm?13:14,fontWeight:800,
      cursor:disabled?"not-allowed":"pointer",fontFamily:B,
      transition:"all .2s",transform:hov&&!disabled?"scale(1.03)":"scale(1)",
      boxShadow:hov&&!disabled?`0 6px 24px rgba(${t.rgb},.4)`:"none",
      ...style}}>{children}</button>;
}
function Lbl({children,center}){const t=useT();return <div style={{fontSize:11,color:t.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:2.5,marginBottom:8,fontFamily:B,textAlign:center?"center":"left"}}>{children}</div>;}
function BackBtn({onClick}){const t=useT();return <button onClick={onClick} style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",gap:6,fontWeight:600,marginBottom:20,padding:0,fontFamily:B,transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color=t.accent} onMouseLeave={e=>e.currentTarget.style.color=t.sub}>← Back</button>;}
function Tag({children,color}){const t=useT();const c=color||t.accent;return <span style={{fontSize:10,fontWeight:700,background:`${c}18`,color:c,padding:"3px 9px",borderRadius:20,letterSpacing:.5}}>{children}</span>;}
function Stars({n}){return <span style={{color:"#f0c040",fontSize:12}}>{"★".repeat(Math.floor(n))}<span style={{color:"#555"}}> {n}</span></span>;}

// Hover-interactive card wrapper
function HoverCard({children,style={},onClick,glowColor}){
  const t=useT();
  const[hov,setHov]=useState(false);
  const gc=glowColor||t.accent;
  return <div onClick={onClick}
    onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
    style={{transition:"all .22s",transform:hov?"scale(1.025)":"scale(1)",
      boxShadow:hov?`0 8px 32px rgba(${t.rgb},.18)`:hov?`0 4px 16px rgba(${t.rgb},.1)`:"none",
      cursor:onClick?"pointer":"default",...style}}>{children}</div>;
}

// ─── PRO CALCULATOR ───────────────────────────────────────────
function ProCalc({onResult}){
  const t=useT();const sc=useScreen();
  const[v,setV]=useState({kwh:20,psh:4.5,loss:20,invKva:5,batAh:200,batV:48,dod:80,type:"hybrid"});
  const[open,setOpen]=useState({load:true,battery:false,type:true});
  const up=(k,val)=>setV(p=>({...p,[k]:val}));
  const tog=k=>setOpen(p=>({...p,[k]:!p[k]}));
  const panels=Math.ceil((v.kwh/(v.psh*(1-v.loss/100)))/.55);
  const syskw=panels*.55,batKwh=(v.batAh*v.batV*(v.dod/100))/1000;
  const backupH=(batKwh/(v.kwh/24)).toFixed(1),cost=Math.round(syskw*18000);
  const save=Math.round(v.kwh*365*RATE*.75),payback=(cost/save).toFixed(1);

  const NI=({k,label,desc,min,max,step,unit})=>(
    <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:12,padding:"12px 14px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:13,fontWeight:600,color:t.text,fontFamily:B}}>{label}</div>
          {desc&&<div style={{fontSize:10,color:t.sub,marginTop:2}}>{desc}</div>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
          <button onClick={()=>up(k,Math.max(min,parseFloat((v[k]-step).toFixed(2))))} style={{width:34,height:34,borderRadius:8,background:`rgba(${t.rgb},.12)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.text,cursor:"pointer",fontSize:20,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>−</button>
          <div style={{textAlign:"center",minWidth:58,flexShrink:0}}>
            <div style={{fontFamily:"monospace",fontSize:16,fontWeight:800,color:t.accent}}>{v[k]}</div>
            <div style={{fontSize:9,color:t.sub}}>{unit}</div>
          </div>
          <button onClick={()=>up(k,Math.min(max,parseFloat((v[k]+step).toFixed(2))))} style={{width:34,height:34,borderRadius:8,background:`rgba(${t.rgb},.12)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.text,cursor:"pointer",fontSize:20,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
        </div>
      </div>
    </div>
  );

  const results=(
    <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.1),rgba(${t.rgb},.04))`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:16,padding:"18px"}}>
      <div style={{fontSize:10,color:t.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:14,fontFamily:B}}>Live Results</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}}>
        {[["Panels",`${panels}×`,"550Wp"],["Array",`${syskw.toFixed(1)}kWp`,"Total"],["Battery",`${batKwh.toFixed(1)}kWh`,"Usable"],["Backup",`${backupH}h`,"Avg load"],["Inverter",`${v.invKva}kVA`,"Min"],["Cost",`R${(cost/1000).toFixed(0)}k`,"Installed"]].map(([l,val,s])=>(
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontFamily:H,fontSize:18,fontWeight:W.hero,color:t.accent}}>{val}</div>
            <div style={{fontSize:10,fontWeight:W.sub,color:t.text,marginBottom:1,fontFamily:H}}>{l}</div>
            <div style={{fontSize:9,color:t.sub}}>{s}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
        <div style={{background:`rgba(${t.rgb},.06)`,borderRadius:9,padding:"9px 12px"}}>
          <div style={{fontSize:10,color:t.sub,marginBottom:2}}>Annual savings</div>
          <div style={{fontFamily:H,fontSize:18,fontWeight:W.hero,color:"#4ade80"}}>R{save.toLocaleString()}</div>
        </div>
        <div style={{background:"rgba(96,165,250,.06)",borderRadius:9,padding:"9px 12px"}}>
          <div style={{fontSize:10,color:t.sub,marginBottom:2}}>Payback period</div>
          <div style={{fontFamily:H,fontSize:18,fontWeight:W.hero,color:"#60a5fa"}}>{payback} yrs</div>
        </div>
      </div>
      <PBtn onClick={()=>onResult(makeResult(v.kwh/24,syskw,v.type==="offgrid"?2.5:1.5))} style={{width:"100%"}}>Get Full Results →</PBtn>
    </div>
  );

  const inputs=(
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      <button onClick={()=>tog("load")} style={{background:"none",border:"none",display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"7px 0"}}>
        <Ico.Zap s={14} c={t.accent}/>
        <span style={{fontSize:10,color:t.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:2,fontFamily:B,flex:1,textAlign:"left"}}>Load Profile</span>
        <span style={{fontSize:14,color:t.sub,transition:"transform .25s",transform:open.load?"rotate(90deg)":"rotate(0deg)"}}>›</span>
      </button>
      {open.load&&<><NI k="kwh" label="Daily consumption" desc="Average kWh/day" min={1} max={200} step={1} unit="kWh/day"/><NI k="psh" label="Peak sun hours" desc="SA average: 4.5–6.5" min={2} max={8} step={.5} unit="hrs"/><NI k="loss" label="System losses" desc="Shading, wiring, inverter" min={5} max={40} step={1} unit="%"/><NI k="invKva" label="Inverter size" desc="Should exceed peak demand" min={1} max={30} step={.5} unit="kVA"/></>}
      <button onClick={()=>tog("battery")} style={{background:"none",border:"none",display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"7px 0",marginTop:4}}>
        <Ico.Battery s={14} c={t.accent}/>
        <span style={{fontSize:10,color:t.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:2,fontFamily:B,flex:1,textAlign:"left"}}>Battery Bank</span>
        <span style={{fontSize:14,color:t.sub,transition:"transform .25s",transform:open.battery?"rotate(90deg)":"rotate(0deg)"}}>›</span>
      </button>
      {open.battery&&<><NI k="batAh" label="Battery capacity" desc="Ah per bank" min={50} max={2000} step={50} unit="Ah"/><NI k="batV" label="Battery voltage" desc="12, 24, or 48V" min={12} max={48} step={12} unit="V"/><NI k="dod" label="Depth of discharge" desc="LFP = 80%, Lead = 50%" min={30} max={100} step={5} unit="%"/></>}
    </div>
  );

  if(sc.isDesktop){
    return(
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,alignItems:"start"}}>
        <div>{inputs}</div>
        <div style={{position:"sticky",top:80}}>{results}</div>
      </div>
    );
  }
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>{inputs}{results}</div>;
}

// ─── CALCULATOR ───────────────────────────────────────────────
function Calculator({onResult}){
  const t=useT();const sc=useScreen();
  const[mode,setMode]=useState(null);
  const[step,setStep]=useState(0);const[ans,setAns]=useState({});
  const[apps,setApps]=useState({});const[cat,setCat]=useState("essentials");
  const[bill,setBill]=useState("");const[fade,setFade]=useState(false);
  const go=fn=>{setFade(true);setTimeout(()=>{fn();setFade(false);},200);};
  const appCount=Object.values(apps).filter(v=>v>0).length;
  const fromApps=()=>{const d=APPLIANCES.reduce((s,a)=>s+(a.w*(apps[a.id]||0))/1000,0);onResult(makeResult(d,Math.max(2,Math.ceil(d*1.3/.55)*.55)));};
  const fromBill=()=>{const kwhDay=parseFloat(bill)/(RATE*30);onResult(makeResult(kwhDay,Math.max(2,Math.ceil(kwhDay*1.25/.55)*.55)));};

  if(!mode) return(
    <div style={{opacity:fade?0:1,transition:"opacity .2s"}}>
      <div style={{textAlign:"center",marginBottom:sc.isDesktop?40:24,paddingTop:sc.isDesktop?20:0}}>
        <Lbl center>No Technical Knowledge Needed</Lbl>
        <h2 style={{fontFamily:H,fontSize:"clamp(26px,4vw,42px)",fontWeight:W.hero,color:t.text,marginBottom:8}}>Find Your Perfect Solar Setup</h2>
        <p style={{color:t.sub,fontSize:14}}>Four ways to calculate — pick the one that suits you.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr":"1fr 1fr",gap:16,maxWidth:sc.isDesktop?820:undefined,margin:"0 auto"}}>
        {[
          {id:"quiz",   Icon:Ico.Sparkles, title:"Quick & Easy",    sub:"4 questions. 60 seconds.",   badge:"Most Popular", badgeC:"#f5a623"},
          {id:"appliance",Icon:Ico.Settings,title:"By Appliances",   sub:"Pick every device you own.",  badge:"Most Accurate",badgeC:"#4ade80"},
          {id:"bill",   Icon:Ico.FileText, title:"From My Bill",    sub:"Enter your Eskom bill.",      badge:"Fastest",      badgeC:"#60a5fa"},
          {id:"pro",    Icon:Ico.Settings, title:"Pro Calculator",  sub:"Full technical inputs.",      badge:"Pro",          badgeC:"#c084fc"},
        ].map((m,i)=>{
          const[hov,setHov]=useState(false);
          return(
            <div key={m.id} onClick={()=>go(()=>setMode(m.id))}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              style={{background:hov?`rgba(${t.rgb},.07)`:t.bgCard,border:`1px solid ${hov?`rgba(${t.rgb},.4)`:t.border}`,
                borderRadius:18,padding:sc.isDesktop?"32px 28px":"20px 18px",cursor:"pointer",
                transition:"all .25s",position:"relative",
                transform:hov?"scale(1.03)":"scale(1)",
                boxShadow:hov?`0 8px 32px rgba(${t.rgb},.22)`:"none",
                animation:`fadeUp .4s ease ${i*.08}s both`}}>
              {m.badge&&<div style={{position:"absolute",top:14,right:14,fontSize:10,background:`${m.badgeC}18`,color:m.badgeC,padding:"3px 9px",borderRadius:8,fontWeight:700}}>{m.badge}</div>}
              <div style={{width:52,height:52,borderRadius:14,background:`rgba(${t.rgb},.1)`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:sc.isDesktop?20:14}}>
                <m.Icon s={24} c={t.accent}/>
              </div>
              <div style={{fontFamily:H,fontSize:sc.isDesktop?22:18,fontWeight:W.card,color:t.text,marginBottom:5}}>{m.title}</div>
              <div style={{fontSize:13,color:t.sub}}>{m.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if(mode==="pro")return(
    <div style={{opacity:fade?0:1,transition:"opacity .2s"}}>
      <BackBtn onClick={()=>go(()=>setMode(null))}/>
      <Lbl>Technical Calculator</Lbl>
      <h3 style={{fontFamily:H,fontSize:sc.isMobile?20:26,fontWeight:W.section,color:t.text,marginBottom:5}}>Pro Calculator</h3>
      <p style={{color:t.sub,fontSize:13,marginBottom:20}}>Full engineering inputs — for installers, engineers and serious buyers.</p>
      <ProCalc onResult={onResult}/>
    </div>
  );

  if(mode==="bill")return(
    <div style={{opacity:fade?0:1,transition:"opacity .2s",maxWidth:sc.isDesktop?480:undefined,margin:sc.isDesktop?"0 auto":undefined}}>
      <BackBtn onClick={()=>go(()=>setMode(null))}/>
      <Lbl>From My Bill</Lbl>
      <h3 style={{fontFamily:H,fontSize:sc.isMobile?20:26,fontWeight:W.section,color:t.text,marginBottom:5}}>What's Your Monthly Eskom Bill?</h3>
      <p style={{color:t.sub,fontSize:14,marginBottom:24}}>Enter your average monthly electricity bill — we'll do the rest.</p>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:14,color:t.sub,marginBottom:6}}>Monthly bill (R)</div>
        <div style={{display:"inline-flex",alignItems:"center",gap:4,background:t.bgCard,border:`1px solid rgba(${t.rgb},.25)`,borderRadius:16,padding:"10px 20px"}}>
          <span style={{fontFamily:H,fontSize:36,fontWeight:W.hero,color:t.accent}}>R</span>
          <input value={bill} onChange={e=>setBill(e.target.value.replace(/[^0-9]/g,""))} placeholder="0" type="number" inputMode="numeric"
            style={{background:"transparent",border:"none",outline:"none",fontSize:sc.isMobile?44:56,fontFamily:H,fontWeight:W.hero,color:t.text,width:180,textAlign:"center"}}/>
        </div>
      </div>
      <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:20,flexWrap:"wrap"}}>
        {[500,1200,2500,4000].map(n=>(
          <button key={n} onClick={()=>setBill(String(n))}
            style={{background:bill==n?`rgba(${t.rgb},.15)`:t.bgCard,border:`1px solid ${bill==n?t.accent:t.border}`,
              color:bill==n?t.accent:t.sub,padding:"8px 16px",borderRadius:25,cursor:"pointer",
              fontSize:13,fontWeight:600,transition:"all .2s",fontFamily:B}}>R{n.toLocaleString()}</button>
        ))}
      </div>
      <PBtn onClick={fromBill} disabled={!bill} style={{maxWidth:320,margin:"0 auto",display:"block"}}>Calculate My System →</PBtn>
    </div>
  );

  if(mode==="appliance")return(
    <div style={{opacity:fade?0:1,transition:"opacity .2s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <BackBtn onClick={()=>go(()=>setMode(null))}/>
        {appCount>0&&<div style={{fontSize:12,color:t.accent,background:`rgba(${t.rgb},.1)`,padding:"4px 12px",borderRadius:20,fontWeight:700}}>{appCount} selected</div>}
      </div>
      <h3 style={{fontFamily:H,fontSize:24,fontWeight:W.section,color:t.text,marginBottom:3}}>Select Your Appliances</h3>
      <p style={{color:t.sub,fontSize:13,marginBottom:13}}>Tap each one you use regularly. Tap again to remove.</p>
      <div style={{display:"flex",borderBottom:`1px solid ${t.border}`,marginBottom:16,overflowX:"auto"}}>
        {["essentials","work","home","comfort"].map(c=><button key={c} onClick={()=>setCat(c)} style={{background:"none",border:"none",borderBottom:`2px solid ${cat===c?t.accent:"transparent"}`,color:cat===c?t.accent:t.sub,padding:"7px 14px",cursor:"pointer",fontSize:13,fontWeight:600,textTransform:"capitalize",transition:"all .2s",fontFamily:B,whiteSpace:"nowrap"}}>{c}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"repeat(auto-fill,minmax(130px,1fr))":sc.isTablet?"repeat(auto-fill,minmax(120px,1fr))":"repeat(auto-fill,minmax(100px,1fr))",gap:10,marginBottom:24}}>
        {APPLIANCES.filter(a=>a.cat===cat).map(app=>{
          const active=apps[app.id]>0,hrs=apps[app.id]||0;
          return(
            <div key={app.id} style={{background:active?`rgba(${t.rgb},.08)`:t.bgCard,border:`1px solid ${active?`rgba(${t.rgb},.4)`:t.border}`,borderRadius:14,padding:12,textAlign:"center",transition:"all .2s",cursor:"pointer"}}
              onClick={()=>{
                // toggle: if active and not clicking controls, deselect
                if(active){setApps({...apps,[app.id]:0});}
                else{setApps({...apps,[app.id]:app.h});}
              }}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:40,height:40,borderRadius:10,background:active?`rgba(${t.rgb},.12)`:t.bgCard2,margin:"0 auto 6px"}}><app.Icon s={20} c={active?t.accent:t.sub}/></div>
              <div style={{fontSize:12,fontWeight:600,color:active?t.text:t.sub,marginBottom:2,fontFamily:B}}>{app.name}</div>
              <div style={{fontSize:10,color:t.sub,opacity:.7}}>{app.w}W</div>
              {active&&(
                <div style={{marginTop:8}} onClick={e=>e.stopPropagation()}>
                  <div style={{fontSize:9,color:t.sub,marginBottom:4}}>hrs/day</div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                    <button onClick={e=>{e.stopPropagation();setApps(prev=>({...prev,[app.id]:Math.max(.25,hrs-.25);}));}} style={{background:`rgba(${t.rgb},.15)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.text,width:28,height:28,borderRadius:7,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>-</button>
                    <span style={{fontSize:13,fontWeight:800,color:t.accent,minWidth:24,textAlign:"center"}}>{hrs}</span>
                    <button onClick={e=>{e.stopPropagation();setApps(prev=>({...prev,[app.id]:Math.min(24,hrs+.25);}));}} style={{background:`rgba(${t.rgb},.15)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.text,width:28,height:28,borderRadius:7,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <PBtn onClick={fromApps} disabled={appCount===0} style={{width:"100%"}}>{appCount>0?`Calculate ${appCount} Appliances →`:"Select at least one appliance"}</PBtn>
    </div>
  );

  // Quiz mode
  const q=QUIZ[step];
  return(
    <div style={{opacity:fade?0:1,transition:"opacity .2s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <BackBtn onClick={()=>step===0?go(()=>setMode(null)):go(()=>setStep(s=>s-1))}/>
        <div style={{display:"flex",gap:4}}>{QUIZ.map((_,i)=><div key={i} style={{width:i===step?20:6,height:6,borderRadius:3,background:i<=step?t.accent:`rgba(${t.rgb},.15)`,transition:"all .3s"}}/>)}</div>
        <div style={{fontSize:12,color:t.sub,fontWeight:600}}>{step+1}/{QUIZ.length}</div>
      </div>
      <div key={step} style={{animation:"fadeUp .3s ease",maxWidth:sc.isDesktop?680:undefined,margin:sc.isDesktop?"0 auto":undefined}}>
        <div style={{textAlign:"center",marginBottom:sc.isDesktop?32:20}}>
          <h3 style={{fontFamily:H,fontSize:"clamp(18px,3vw,28px)",fontWeight:W.section,color:t.text,marginBottom:5}}>{q.q}</h3>
          <p style={{color:t.sub,fontSize:13}}>{q.hint}</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:sc.isDesktop?16:12}}>
          {q.opts.map(o=>{
            const sel=ans[q.id]===o.v;
            const[hov,setHov]=useState(false);
            return(
              <button key={o.v}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                onClick={()=>{const na={...ans,[q.id]:o.v};setAns(na);if(step<QUIZ.length-1)setTimeout(()=>go(()=>setStep(s=>s+1)),180);else setTimeout(()=>{const sz=QUIZ[0].opts.find(x=>x.v===na[QUIZ[0].id]);const bl=QUIZ[1].opts.find(x=>x.v===na[QUIZ[1].id]);const gl=QUIZ[2].opts.find(x=>x.v===na[QUIZ[2].id]);const rf=QUIZ[3].opts.find(x=>x.v===na[QUIZ[3].id]);onResult(makeResult((sz?.kwh||18)*(bl?.mult||1),gl?.kw||5,rf?.bf||1.5));},200);}}
                style={{background:sel?`rgba(${t.rgb},.12)`:hov?`rgba(${t.rgb},.06)`:t.bgCard,
                  border:`1px solid ${sel?t.accent:hov?`rgba(${t.rgb},.3)`:t.border}`,
                  borderRadius:14,padding:sc.isDesktop?"22px 18px":"18px 14px",cursor:"pointer",textAlign:"left",
                  transition:"all .2s",transform:hov&&!sel?"translateY(-2px)":"none",
                  boxShadow:hov&&!sel?`0 4px 16px rgba(${t.rgb},.12)`:"none"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:44,height:44,borderRadius:12,background:`rgba(${t.rgb},.1)`,marginBottom:sc.isDesktop?12:8}}><o.Icon s={22} c={t.accent}/></div>
                <div style={{fontFamily:H,fontSize:sc.isMobile?14:16,fontWeight:W.card,color:sel?t.accent:t.text}}>{o.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── RESULTS ──────────────────────────────────────────────────
function Results({r,onReset,goInstallers}){
  const t=useT();const sc=useScreen();
  const aC=useCount(r.cost);const aS=useCount(r.annSave);

  // PDF download
  const downloadPDF=()=>{
    const content=`SOLARIQ SYSTEM REPORT\n${"=".repeat(40)}\n\nRecommended System: ${r.systemKw}kW\nWith ${r.battKwh}kWh battery · ${r.panels} panels\n\nINVERTER: ${r.invKva}kVA\nBATTERY: ${r.battKwh}kWh\nPANELS: ${r.panels} × 550Wp\nPAYBACK: ${r.payback} years\n\nFINANCIALS\n${"─".repeat(20)}\nEstimated Cost: R${r.cost.toLocaleString()}\nAnnual Savings: R${r.annSave.toLocaleString()}\nCurrent Bill: R${r.mo.toLocaleString()}/mo\nAfter Solar: ~R${Math.round(r.mo*.25).toLocaleString()}/mo\n\nSYSTEM OVERVIEW\n${"─".repeat(20)}\nDaily usage: ${r.dailyKwh} kWh/day\nAnnual output: ~${Math.round(r.dailyKwh*365*.85)} kWh\n25-year output: ~${Math.round(r.dailyKwh*365*.85*25/1000)} MWh\nCO₂ saved: ~${Math.round(r.dailyKwh*365*.85*25*.9)}kg\n\nKEY BENEFITS\n${"─".repeat(20)}\n✓ Lights, WiFi, TV & fridge through all power outages\n✓ Save ~R${Math.round(r.annSave/12).toLocaleString()} every month\n✓ Pays for itself in ${r.payback} years\n✓ Claim up to R15,000 back from SARS on panel costs\n✓ Property value increases R50k–R150k\n\nGenerated by SolarIQ — South Africa's solar platform\nsolariq.co.za`;
    const blob=new Blob([content],{type:"text/plain"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="SolarIQ-System-Report.txt";a.click();
  };

  const waMsg=encodeURIComponent(`Hi! I used SolarIQ and my recommended system is ${r.systemKw}kW with ${r.battKwh}kWh battery (${r.panels} panels). Estimated cost R${r.cost.toLocaleString()}. Annual savings R${r.annSave.toLocaleString()}. Can you give me a quote?`);

  const hero=(
    <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.12),rgba(${t.rgb},.05))`,border:`1px solid rgba(${t.rgb},.22)`,borderRadius:20,padding:"24px",textAlign:"center",marginBottom:12}}>
      <Lbl center>Recommended System</Lbl>
      <div style={{fontFamily:H,fontSize:"clamp(52px,8vw,80px)",fontWeight:W.hero,color:t.text,lineHeight:1,marginBottom:4}}>
        {r.systemKw}<span style={{fontSize:"0.38em",color:t.accent}}>kW</span>
      </div>
      <div style={{color:t.sub,marginBottom:20}}>with {r.battKwh}kWh battery · {r.panels} panels</div>
      <div style={{display:"flex",justifyContent:"center",gap:sc.isMobile?14:28,flexWrap:"wrap"}}>
        {[["Inverter",`${r.invKva}kVA`],["Battery",`${r.battKwh}kWh`],["Panels",`${r.panels}×`],["Payback",`${r.payback} yrs`]].map(([l,v])=>(
          <div key={l}>
            <div style={{fontFamily:H,fontSize:sc.isMobile?16:20,fontWeight:W.section,color:t.accent}}>{v}</div>
            <div style={{fontSize:11,color:t.sub,marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const stats=(
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:12}}>
      {[["Estimated Cost",`R${aC.toLocaleString()}`,t.accent],["Annual Savings",`R${aS.toLocaleString()}`,"#4ade80"],["Current Bill",`R${r.mo.toLocaleString()}/mo`,"#60a5fa"],["After Solar",`~R${Math.round(r.mo*.25).toLocaleString()}/mo`,"#c084fc"]].map(([l,v,c])=>(
        <div key={l} style={{background:t.bgCard,border:`1px solid ${c}22`,borderRadius:12,padding:"14px 16px"}}>
          <div style={{fontSize:9,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:5}}>{l}</div>
          <div style={{fontFamily:H,fontSize:sc.isMobile?18:22,fontWeight:W.section,color:c}}>{v}</div>
        </div>
      ))}
    </div>
  );

  const bullets=(
    <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:13,padding:"16px",marginBottom:12}}>
      {[`Lights, WiFi, TV & fridge through all power outages`,`Save ~R${Math.round(r.annSave/12).toLocaleString()} every month`,`Pays for itself in ${r.payback} years — then free electricity`,`Claim up to R15,000 back from SARS on panel costs`,`Property value increases R50k–R150k`].map(txt=>(
        <div key={txt} style={{fontSize:13,color:t.sub,marginBottom:7,lineHeight:1.6,display:"flex",alignItems:"flex-start",gap:8}}>
          <span style={{marginTop:2,flexShrink:0}}><Ico.Check s={13} c={"#4ade80"}/></span>{txt}
        </div>
      ))}
    </div>
  );

  const sidebar=(
    <div style={{position:"sticky",top:80}}>
      <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:16,padding:"20px",marginBottom:12}}>
        <div style={{fontFamily:H,fontSize:15,fontWeight:W.section,color:t.text,marginBottom:16}}>System overview</div>
        {[["Daily usage",`${r.dailyKwh} kWh/day`,"#4ade80"],["Inverter",`${r.invKva} kVA`,t.accent],["Battery",`${r.battKwh} kWh`,"#60a5fa"],["Panels",`${r.panels} × 550Wp`,"#c084fc"],["Annual output",`~${Math.round(r.dailyKwh*365*.85)} kWh`,"#4ade80"],["25-year output",`~${Math.round(r.dailyKwh*365*.85*25/1000)} MWh`,t.accent],["CO₂ saved",`~${Math.round(r.dailyKwh*365*.85*25*.9)}kg`,"#4ade80"]].map(([l,v,c])=>(
          <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${t.border}`}}>
            <span style={{fontSize:13,color:t.sub}}>{l}</span>
            <span style={{fontSize:13,fontWeight:700,color:c,fontFamily:H}}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        <PBtn onClick={goInstallers}>Browse Verified Installers →</PBtn>
        {/* WhatsApp — green text link, no white box */}
        <a href={`https://wa.me/?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
          style={{color:"#25d366",fontSize:13,fontWeight:700,textDecoration:"none",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:7,padding:"10px",borderRadius:10,background:"rgba(37,211,102,.08)",border:"1px solid rgba(37,211,102,.2)",transition:"all .2s"}}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(37,211,102,.15)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(37,211,102,.08)";}}>
          <Ico.WhatsApp s={16} c="#25d366"/> WhatsApp My Results
        </a>
        <button onClick={downloadPDF}
          style={{background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:10,padding:"10px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:B,display:"flex",alignItems:"center",justifyContent:"center",gap:6,transition:"all .2s"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`;e.currentTarget.style.color=t.text;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.color=t.sub;}}>
          <Ico.Download s={14} c="currentColor"/> Download Report
        </button>
      </div>
      <div style={{textAlign:"center",marginTop:12}}>
        <button onClick={onReset} style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:13,textDecoration:"underline",fontFamily:B,transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color=t.accent} onMouseLeave={e=>e.currentTarget.style.color=t.sub}>← Recalculate</button>
      </div>
    </div>
  );

  return(
    <div style={{animation:"fadeUp .5s ease"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:9}}><LogoIcon s={44}/></div>
        <h2 style={{fontFamily:H,fontSize:"clamp(22px,4vw,38px)",fontWeight:W.hero,color:t.text,marginBottom:5}}>Your Solar Profile Is Ready</h2>
        <p style={{color:t.sub,fontSize:14}}>Here's exactly what your home needs</p>
      </div>
      {sc.isDesktop?(
        <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:28,alignItems:"start"}}>
          <div>{hero}{stats}{bullets}</div>
          {sidebar}
        </div>
      ):(
        <div>
          {hero}{stats}{bullets}
          <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:10}}>
            <PBtn onClick={goInstallers}>Browse Verified Installers →</PBtn>
            <a href={`https://wa.me/?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
              style={{color:"#25d366",fontSize:13,fontWeight:700,textDecoration:"none",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:7,padding:"10px",borderRadius:10,background:"rgba(37,211,102,.08)",border:"1px solid rgba(37,211,102,.2)"}}>
              <Ico.WhatsApp s={16} c="#25d366"/> WhatsApp My Results
            </a>
            <button onClick={downloadPDF} style={{background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:10,padding:"10px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:B,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              <Ico.Download s={14} c="currentColor"/> Download Report
            </button>
          </div>
          <div style={{textAlign:"center"}}><button onClick={onReset} style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:13,textDecoration:"underline",fontFamily:B}}>← Recalculate</button></div>
        </div>
      )}
    </div>
  );
}

// ─── INSTALLERS ───────────────────────────────────────────────
function Installers(){
  const t=useT();const sc=useScreen();
  const[search,setSearch]=useState("");const[prov,setProv]=useState("All");const[spec,setSpec]=useState("All");
  const[brand,setBrand]=useState("All");const[sessaOnly,setSessaOnly]=useState(false);const[verOnly,setVerOnly]=useState(false);const[financeOnly,setFinanceOnly]=useState(false);
  const[sortBy,setSortBy]=useState("rating");const[open,setOpen]=useState(null);const[showF,setShowF]=useState(false);
  const[quoteInst,setQuoteInst]=useState(null);
  const[quoteForm,setQuoteForm]=useState({name:"",email:"",phone:"",system_kw:"",roof_type:"",location:"",contact_person:"",notes:""});
  const[quoteSent,setQuoteSent]=useState(false);const[quoteSaving,setQuoteSaving]=useState(false);

  const filtered=INSTALLERS.filter(i=>{
    if(search&&!i.name.toLowerCase().includes(search.toLowerCase())&&!i.city.toLowerCase().includes(search.toLowerCase()))return false;
    if(prov!=="All"&&i.prov!==prov)return false;if(spec!=="All"&&i.spec!==spec)return false;
    if(brand!=="All"&&!i.brands.includes(brand))return false;if(sessaOnly&&!i.sessa)return false;
    if(verOnly&&!i.verified)return false;if(financeOnly&&!i.finance)return false;
    return true;
  }).sort((a,b)=>sortBy==="rating"?b.rating-a.rating:sortBy==="reviews"?b.rev-a.rev:sortBy==="jobs"?b.jobs-a.jobs:b.yrs-a.yrs);

  const ac=[prov!=="All",spec!=="All",brand!=="All",sessaOnly,verOnly,financeOnly].filter(Boolean).length;
  const clearAll=()=>{setProv("All");setSpec("All");setBrand("All");setSessaOnly(false);setVerOnly(false);setFinanceOnly(false);};
  const sel={width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:8,padding:"9px 10px",color:t.text,fontSize:13,outline:"none",fontFamily:B};

  const submitQuote=async()=>{
    if(!quoteForm.name||!quoteForm.phone)return;
    setQuoteSaving(true);
    try{
      const leadPayload={
        installer_id:quoteInst?.supabaseId||null,name:quoteForm.name.trim(),email:quoteForm.email.trim(),
        phone:quoteForm.phone.trim(),area:quoteForm.location||quoteInst?.city||"",
        system_kw:parseFloat(quoteForm.system_kw)||0,battery_kwh:0,panels:0,daily_kwh:0,monthly_bill:0,estimated_cost:0,
        goal:"",roof:quoteForm.roof_type||"",urgency:"Enquiry via SolarIQ",
        notes:`Quote for ${quoteInst?.name||"installer"}. Contact: ${quoteForm.contact_person||"N/A"}. ${quoteForm.notes||""}`.trim(),
        source:"quote_request",status:"new",
      };
      const{error}=await sb.from("leads").insert(leadPayload);
      if(error)console.error("Lead insert error:",error.message);
    }catch(e){console.log("submitQuote error:",e);}
    setQuoteSent(true);setQuoteSaving(false);
  };

  // Photo placeholder icon for installer card
  const InstLogo=()=>(
    <div style={{width:42,height:42,borderRadius:10,background:`rgba(${t.rgb},.1)`,border:`1px solid rgba(${t.rgb},.15)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <LogoIcon s={20}/>
    </div>
  );

  // Tooltip component
  const Tooltip=({label,children})=>{
    const[show,setShow]=useState(false);
    return(
      <div style={{position:"relative",display:"inline-flex"}} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
        {children}
        {show&&<div style={{position:"absolute",bottom:"100%",left:"50%",transform:"translateX(-50%)",background:"rgba(0,0,0,.85)",color:"#fff",fontSize:11,padding:"4px 10px",borderRadius:6,whiteSpace:"nowrap",marginBottom:5,pointerEvents:"none",zIndex:999}}>{label}</div>}
      </div>
    );
  };

  const InstCard=({inst,i})=>{
    const[hov,setHov]=useState(false);
    const isOpen=open===inst.id;
    return(
      <div
        onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{background:isOpen?`rgba(${t.rgb},.04)`:t.bgCard,border:`1px solid ${isOpen?`rgba(${t.rgb},.28)`:hov?`rgba(${t.rgb},.2)`:t.border}`,borderRadius:14,padding:"16px",transition:"all .2s",animation:`fadeUp .3s ease ${i*.04}s both`,
          boxShadow:hov?`0 4px 20px rgba(${t.rgb},.1)`:"none"}}>
        <div style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer"}} onClick={()=>setOpen(isOpen?null:inst.id)}>
          <InstLogo/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3,flexWrap:"wrap"}}>
              <span style={{fontFamily:H,fontSize:15,fontWeight:W.card,color:t.text}}>{inst.name}</span>
              {inst.badge&&<Tag>{inst.badge}</Tag>}
              {inst.sessa&&<Tag color="#22c55e">SESSA</Tag>}
              {inst.verified&&<Tag color="#60a5fa">Verified</Tag>}
              {inst.finance&&<Tag color="#c084fc">Finance</Tag>}
            </div>
            <div style={{fontSize:11,color:t.sub,marginBottom:4}}>{inst.city}, {inst.prov} · {inst.yrs} yrs</div>
            {inst.contactPerson&&<div style={{fontSize:11,color:t.textMid,marginBottom:4,fontWeight:600}}>Contact: {inst.contactPerson}</div>}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
              <Stars n={inst.rating}/><span style={{fontSize:11,color:t.sub}}>({inst.rev})</span>
              <span style={{fontSize:11,color:t.sub,display:"flex",alignItems:"center",gap:3}}><Ico.Zap s={10} c={t.sub}/>{inst.resp}</span>
              <span style={{fontSize:11,color:t.sub,display:"flex",alignItems:"center",gap:3}}><Ico.Coins s={10} c={t.sub}/>{inst.price}</span>
            </div>
          </div>
          <span style={{fontSize:14,color:t.sub,transition:"transform .2s",transform:isOpen?"rotate(90deg)":"none",flexShrink:0,marginTop:4}}>›</span>
        </div>
        {isOpen&&(
          <div style={{marginTop:13,paddingTop:13,borderTop:`1px solid ${t.border}`,animation:"fadeUp .25s ease"}}>
            <p style={{fontSize:13,color:t.sub,lineHeight:1.7,marginBottom:12}}>{inst.about}</p>
            {/* Logo placeholder + specialty icons with tooltips */}
            <div style={{display:"flex",gap:7,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
              <div style={{width:64,height:64,background:`rgba(${t.rgb},.06)`,border:`1px dashed rgba(${t.rgb},.25)`,borderRadius:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontSize:9,color:t.sub,gap:3}}>
                <LogoIcon s={20}/><span>Logo</span>
              </div>
              <Tooltip label="Solar panels & mounting">
                <div style={{width:54,height:54,background:`rgba(${t.rgb},.08)`,border:`1px solid ${t.border}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",cursor:"help",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=`rgba(${t.rgb},.35)`} onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}><Ico.Sun s={20} c={t.accent}/></div>
              </Tooltip>
              <Tooltip label="Battery storage systems">
                <div style={{width:54,height:54,background:`rgba(${t.rgb},.08)`,border:`1px solid ${t.border}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",cursor:"help",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=`rgba(${t.rgb},.35)`} onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}><Ico.Battery s={20} c={t.accent}/></div>
              </Tooltip>
              <Tooltip label="Inverter installation & programming">
                <div style={{width:54,height:54,background:`rgba(${t.rgb},.08)`,border:`1px solid ${t.border}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",cursor:"help",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=`rgba(${t.rgb},.35)`} onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}><Ico.Zap s={20} c={t.accent}/></div>
              </Tooltip>
              <div style={{flex:1,minWidth:80,background:`rgba(${t.rgb},.04)`,border:`1px dashed rgba(${t.rgb},.2)`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:t.sub,padding:8,textAlign:"center"}}>View all →</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))",gap:7,marginBottom:12}}>
              {[["Specialty",inst.spec],["Experience",`${inst.yrs} yrs`],["Response",inst.resp],["Price",inst.price],["Jobs",`${inst.jobs}+`],["Finance",inst.finance?"Available":"N/A"]].map(([l,v])=>(
                <div key={l} style={{background:t.bgCard2,borderRadius:8,padding:"8px 9px"}}>
                  <div style={{fontSize:9,color:t.sub,marginBottom:2,textTransform:"uppercase",letterSpacing:.8}}>{l}</div>
                  <div style={{fontSize:11,fontWeight:600,color:t.textMid}}>{v}</div>
                </div>
              ))}
            </div>
            {/* Contact options */}
            {inst.address&&<div style={{fontSize:12,color:t.sub,marginBottom:10,display:"flex",alignItems:"center",gap:6}}><Ico.Map s={12} c={t.sub}/>{inst.address}</div>}
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <PBtn sm style={{flex:1,minWidth:100,borderRadius:9,padding:"10px"}} onClick={e=>{e.stopPropagation();setQuoteInst(inst);setQuoteForm({name:"",email:"",phone:"",system_kw:"",roof_type:"",location:"",contact_person:"",notes:""});setQuoteSent(false);}}>Request Quote</PBtn>
              {inst.contact?.whatsapp&&(
                <button onClick={e=>{e.stopPropagation();const msg=encodeURIComponent(`Hi ${inst.name}, I found you on SolarIQ and would like a quote. Please contact me.`);window.open(`https://wa.me/${inst.contact.whatsapp.replace(/\D/g,"")}?text=${msg}`,"_blank");}}
                  style={{background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.28)",color:"#25d366",borderRadius:9,padding:"10px 14px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B,display:"flex",alignItems:"center",gap:6,transition:"all .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(37,211,102,.18)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(37,211,102,.1)"}><Ico.WhatsApp s={13} c="#25d366"/> WhatsApp</button>
              )}
              {inst.contact?.phone&&!inst.contact?.whatsapp&&(
                <button onClick={e=>{e.stopPropagation();window.location.href=`tel:${inst.contact.phone}`;}}
                  style={{background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:9,padding:"10px 14px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B,display:"flex",alignItems:"center",gap:6}}>
                  <Ico.Phone s={13} c={t.sub}/> Call
                </button>
              )}
              {inst.contact?.email&&(
                <button onClick={e=>{e.stopPropagation();window.location.href=`mailto:${inst.contact.email}`;}}
                  style={{background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:9,padding:"10px 14px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B,display:"flex",alignItems:"center",gap:6}}>
                  <Ico.Mail s={13} c={t.sub}/> Email
                </button>
              )}
              {inst.website&&(
                <button onClick={e=>{e.stopPropagation();window.open(`https://${inst.website}`,"_blank");}}
                  style={{background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:9,padding:"10px 14px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B,display:"flex",alignItems:"center",gap:6}}>
                  <Ico.Globe s={13} c={t.sub}/> Website
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return(
    <div>
      <Lbl>Installer Directory</Lbl>
      <h2 style={{fontFamily:H,fontSize:sc.isMobile?24:30,fontWeight:W.section,color:t.text,marginBottom:5}}>Verified SA Installers</h2>
      <p style={{color:t.sub,fontSize:14,marginBottom:16}}>SESSA-accredited solar installers with real reviews from SA homeowners</p>
      <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:180,position:"relative"}}>
          <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",display:"flex"}}><Ico.Search s={14} c={t.sub}/></span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or city..." style={{...sel,paddingLeft:32,borderRadius:10,padding:"10px 12px 10px 32px"}}/>
        </div>
        <button onClick={()=>setShowF(o=>!o)} style={{background:showF||ac>0?`rgba(${t.rgb},.12)`:t.bgCard,border:`1px solid ${showF||ac>0?`rgba(${t.rgb},.4)`:t.border}`,color:showF||ac>0?t.accent:t.sub,borderRadius:10,padding:"10px 14px",cursor:"pointer",fontSize:13,fontWeight:600,display:"flex",alignItems:"center",gap:6,fontFamily:B,transition:"all .2s"}}>
          <Ico.Settings s={14} c={showF||ac>0?t.accent:t.sub}/> Filters {ac>0&&<span style={{background:t.accent,color:"#000",borderRadius:"50%",width:17,height:17,fontSize:10,display:"inline-flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>{ac}</span>}
        </button>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{...sel,width:"auto",padding:"10px 12px",borderRadius:10}}>
          <option value="rating">Top Rated</option><option value="reviews">Most Reviews</option><option value="jobs">Most Jobs</option><option value="experience">Experience</option>
        </select>
      </div>
      {showF&&(
        <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:13,padding:"15px 16px",marginBottom:12,animation:"fadeUp .2s ease"}}>
          <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":"repeat(3,1fr)",gap:10,marginBottom:12}}>
            <div><div style={{fontSize:10,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:5,fontWeight:600}}>Province</div><select value={prov} onChange={e=>setProv(e.target.value)} style={sel}>{ALL_PROVS.map(p=><option key={p}>{p}</option>)}</select></div>
            <div><div style={{fontSize:10,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:5,fontWeight:600}}>Specialty</div><select value={spec} onChange={e=>setSpec(e.target.value)} style={sel}>{SPECS.map(s=><option key={s}>{s}</option>)}</select></div>
            <div><div style={{fontSize:10,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:5,fontWeight:600}}>Brand</div><select value={brand} onChange={e=>setBrand(e.target.value)} style={sel}>{BRANDS.map(b=><option key={b}>{b}</option>)}</select></div>
          </div>
          <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"center"}}>
            {[["SESSA only",sessaOnly,setSessaOnly],["Verified only",verOnly,setVerOnly],["Finance / Rent-to-own",financeOnly,setFinanceOnly]].map(([lbl,val,fn])=>(
              <label key={lbl} style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer"}}>
                <input type="checkbox" checked={val} onChange={e=>fn(e.target.checked)} style={{accentColor:t.accent,width:15,height:15}}/>
                <span style={{fontSize:13,color:t.textMid,fontFamily:B}}>{lbl}</span>
              </label>
            ))}
            {ac>0&&<button onClick={clearAll} style={{marginLeft:"auto",background:"none",border:"none",color:t.accent,cursor:"pointer",fontSize:13,fontWeight:700,fontFamily:B}}>Clear all</button>}
          </div>
        </div>
      )}
      <div style={{fontSize:12,color:t.sub,marginBottom:14}}>{filtered.length===0?"No installers match.":`Showing ${filtered.length} installer${filtered.length!==1?"s":""}`}{ac>0&&<span style={{color:t.accent}}> · filtered</span>}</div>
      {filtered.length===0?(
        <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:13,padding:"28px",textAlign:"center"}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:8}}><Ico.Search s={28} c={t.sub}/></div>
          <div style={{fontFamily:H,fontSize:17,fontWeight:W.section,color:t.text,marginBottom:8}}>No Results Found</div>
          <button onClick={()=>{clearAll();setSearch("");}} style={{background:`rgba(${t.rgb},.1)`,border:`1px solid rgba(${t.rgb},.3)`,color:t.accent,borderRadius:10,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B}}>Clear All Filters</button>
        </div>
      ):(
        <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1fr 1fr":"1fr",gap:10}}>
          {filtered.map((inst,i)=><InstCard key={inst.id} inst={inst} i={i}/>)}
        </div>
      )}
      <div style={{marginTop:16,background:`linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`,border:`1px solid rgba(${t.rgb},.18)`,borderRadius:14,padding:"16px 18px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <div style={{width:44,height:44,borderRadius:12,background:`rgba(${t.rgb},.12)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ico.FileText s={20} c={t.accent}/></div>
          <div style={{flex:1}}><div style={{fontFamily:H,fontSize:15,fontWeight:W.card,color:t.text,marginBottom:2}}>Installer? Generate PDF Proposals</div><div style={{fontSize:13,color:t.sub}}>Branded quotes from SolarIQ results. <span style={{color:"#4ade80",fontWeight:700}}>PDF generator is live →</span></div></div>
          <button style={{background:t.bgCard,border:`1px solid rgba(${t.rgb},.3)`,color:t.accent,borderRadius:10,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B,transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.background=`rgba(${t.rgb},.08)`} onMouseLeave={e=>e.currentTarget.style.background=t.bgCard}>Installer Login →</button>
        </div>
      </div>
      <div style={{marginTop:9,background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 16px",textAlign:"center"}}>
        <span style={{fontSize:13,color:t.sub}}>Are you a solar installer? </span>
        <button style={{background:"none",border:"none",color:t.accent,cursor:"pointer",fontSize:13,fontWeight:700,fontFamily:B,transition:"opacity .2s"}} onMouseEnter={e=>e.currentTarget.style.opacity=".7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>List your business free →</button>
      </div>

      {/* Quote Modal */}
      {quoteInst&&(
        <>
          <div onClick={()=>setQuoteInst(null)} style={{position:"fixed",inset:0,zIndex:490,background:"rgba(0,0,0,.6)",backdropFilter:"blur(4px)"}}/>
          <div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:500,width:"100%",maxWidth:480,background:"#0d1018",border:`1px solid ${t.border}`,borderRadius:20,padding:28,boxShadow:"0 32px 80px rgba(0,0,0,.5)",maxHeight:"90vh",overflowY:"auto"}}>
            {quoteSent?(
              <div style={{textAlign:"center",padding:"24px 0"}}>
                <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(74,222,128,.12)",border:"2px solid rgba(74,222,128,.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><Ico.Check s={28} c="#4ade80"/></div>
                <div style={{fontFamily:H,fontSize:20,fontWeight:800,color:"#4ade80",marginBottom:8}}>Quote Request Sent!</div>
                <div style={{fontSize:13,color:t.sub,lineHeight:1.7,marginBottom:20}}>{quoteInst.name} will be in touch shortly.</div>
                <PBtn sm onClick={()=>setQuoteInst(null)}>Done</PBtn>
              </div>
            ):(
              <>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:H,fontSize:17,fontWeight:800,color:t.text}}>Request a Quote</div>
                    <div style={{fontSize:12,color:t.sub,marginTop:2}}>from {quoteInst.name}</div>
                  </div>
                  <button onClick={()=>setQuoteInst(null)} style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:22,lineHeight:1}}>×</button>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:11}}>
                  {[
                    ["Your name *","text","name","John Smith"],
                    ["WhatsApp / Phone *","tel","phone","+27 82 000 0000"],
                    ["Email address","email","email","john@email.com"],
                    ["Contact person at installer","text","contact_person","e.g. Sales team / John"],
                    ["System size (kW)","text","system_kw","e.g. 5kW"],
                    ["Your location / area","text","location","e.g. Sandton, Johannesburg"],
                  ].map(([l,tp,k,ph])=>(
                    <div key={k}>
                      <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.2,display:"block",marginBottom:5,fontWeight:600}}>{l}</label>
                      <input type={tp} placeholder={ph} value={quoteForm[k]} onChange={e=>setQuoteForm(p=>({...p,[k]:e.target.value}))} style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"11px 13px",color:t.text,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:B,transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor=`rgba(${t.rgb},.5)`} onBlur={e=>e.target.style.borderColor=t.border}/>
                    </div>
                  ))}
                  <div>
                    <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.2,display:"block",marginBottom:5,fontWeight:600}}>Roof type</label>
                    <select value={quoteForm.roof_type} onChange={e=>setQuoteForm(p=>({...p,roof_type:e.target.value}))} style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"11px 13px",color:t.text,fontSize:14,outline:"none",fontFamily:B}}>
                      <option value="">Select roof type</option>
                      {["Tiled","IBR / Corrugated","Flat concrete","Thatch","Metal sheet","Other"].map(r=><option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.2,display:"block",marginBottom:5,fontWeight:600}}>Additional notes</label>
                    <textarea rows={3} placeholder="Any specific requirements, questions, or details..." value={quoteForm.notes} onChange={e=>setQuoteForm(p=>({...p,notes:e.target.value}))} style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"11px 13px",color:t.text,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:B,resize:"vertical"}}/>
                  </div>
                </div>
                <div style={{marginTop:16,display:"flex",gap:9}}>
                  <button onClick={()=>setQuoteInst(null)} style={{flex:1,background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:10,padding:"12px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B}}>Cancel</button>
                  <PBtn onClick={submitQuote} disabled={quoteSaving||!quoteForm.name||!quoteForm.phone} style={{flex:2,borderRadius:10,padding:"12px"}}>{quoteSaving?"Sending...":"Send Quote Request"}</PBtn>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ─── SERVICING ────────────────────────────────────────────────
function Servicing(){
  const t=useT();const sc=useScreen();
  const[page,setPage]=useState("home");
  const[errCode,setErrCode]=useState("");const[errRes,setErrRes]=useState(null);
  const[hStep,setHStep]=useState(0);const[hAns,setHAns]=useState({});const[hResult,setHResult]=useState(null);
  const[tProv,setTProv]=useState("All");const[tSpec,setTSpec]=useState("All");
  const reset=()=>setPage("home");

  const lookupErr=()=>{
    const code=errCode.trim().toUpperCase();
    if(ERRORS[code])setErrRes({...ERRORS[code],code});
    else setErrRes({notFound:true,code});
  };

  const calcHealth=()=>{
    let score=100;
    const na=hAns;
    if(na.age==="5+ years")score-=15;else if(na.age==="3–5 years")score-=8;
    if(na.perf==="Much worse than before")score-=25;else if(na.perf==="Slightly less than before")score-=12;
    if(na.snd==="Loud unusual noise")score-=20;else if(na.snd==="Constant humming/buzzing")score-=12;else if(na.snd==="Occasional clicking")score-=5;
    if(na.err==="System offline")score-=25;else if(na.err==="Regular error codes")score-=15;else if(na.err==="Occasional warnings")score-=5;
    if(na.cln==="Never cleaned")score-=15;else if(na.cln==="Over 6 months ago")score-=8;
    if(na.svc==="Never been serviced")score-=10;else if(na.svc==="1–2 years ago")score-=5;
    score=Math.max(0,Math.min(100,score));
    const needsSpecs=[];
    if(na.snd!=="No unusual sounds"||na.err!=="No errors")needsSpecs.push("Inverter Repair");
    if(na.cln!=="Within 3 months")needsSpecs.push("Panel Cleaning");
    if(score<60)needsSpecs.push("Full System Service");
    setHResult({score,status:score>=80?"Excellent":score>=60?"Good":score>=40?"Needs Attention":"Critical",color:score>=80?"#4ade80":score>=60?t.accent:score>=40?"#fb923c":"#f87171",note:score>=80?"Your system is performing well. Keep up the regular maintenance.":score>=60?"Minor issues detected. A service visit would be beneficial.":score>=40?"Several problems detected. Schedule a professional service soon.":"Your system needs urgent professional attention.",needsSpecs:[...new Set(needsSpecs)]});
  };

  const filteredTechs=TECHS.filter(x=>{if(tProv!=="All"&&x.prov!==tProv)return false;if(tSpec!=="All"&&x.spec!==tSpec)return false;return true;});

  // Search by error code in technicians
  const[techErrSearch,setTechErrSearch]=useState("");
  const filteredTechsByErr=techErrSearch?filteredTechs.filter(t=>t.spec===ERRORS[techErrSearch.toUpperCase()]?.specs?.[0]||ERRORS[techErrSearch.toUpperCase()]?.specs?.includes(t.spec)):filteredTechs;

  const TechCard=({tech,i})=>{
    const[hov,setHov]=useState(false);
    return(
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{background:t.bgCard,border:`1px solid ${hov?`rgba(${t.rgb},.25)`:t.border}`,borderRadius:13,padding:"16px",animation:`fadeUp .35s ease ${i*.07}s both`,transition:"all .22s",transform:hov?"translateY(-2px)":"none",boxShadow:hov?`0 6px 20px rgba(${t.rgb},.1)`:"none"}}>
        <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:12}}>
          <div style={{width:42,height:42,borderRadius:10,background:`rgba(${t.rgb},.1)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ico.Wrench s={20} c={t.accent}/></div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2,flexWrap:"wrap"}}>
              <span style={{fontFamily:H,fontSize:15,fontWeight:W.card,color:t.text}}>{tech.name}</span>
              {tech.emergency&&<span style={{fontSize:9,background:"rgba(239,68,68,.15)",color:"#f87171",padding:"2px 7px",borderRadius:8,fontWeight:700,display:"inline-flex",alignItems:"center",gap:3}}><Ico.AlertTriangle s={8} c="#f87171"/> 24/7</span>}
            </div>
            <div style={{fontSize:12,color:t.sub,marginBottom:3}}>{tech.spec} · {tech.city}, {tech.prov}</div>
            <Stars n={tech.rating}/><span style={{fontSize:11,color:t.sub}}> ({tech.rev} reviews)</span>
          </div>
          <div style={{fontFamily:H,fontSize:15,fontWeight:W.section,color:t.accent,flexShrink:0,textAlign:"right"}}>
            <div>{tech.price}</div>
            <div style={{fontSize:10,color:t.sub,marginTop:2}}>{tech.yrs} yrs exp</div>
          </div>
        </div>
        <p style={{fontSize:12,color:t.sub,lineHeight:1.6,marginBottom:12}}>{tech.about}</p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <PBtn sm style={{flex:1,minWidth:100,borderRadius:9,padding:"9px"}}>Book Service</PBtn>
          {tech.contact?.whatsapp&&(
            <button onClick={()=>{const msg=encodeURIComponent(`Hi ${tech.name}, I found you on SolarIQ. I need ${tech.spec}. Please contact me.`);window.open(`https://wa.me/${tech.contact.whatsapp.replace(/\D/g,"")}?text=${msg}`,"_blank");}}
              style={{background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.25)",color:"#25d366",borderRadius:9,padding:"9px 13px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:B,display:"flex",alignItems:"center",gap:5,transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(37,211,102,.18)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(37,211,102,.1)"}>
              <Ico.WhatsApp s={12} c="#25d366"/> WhatsApp
            </button>
          )}
          <button onClick={()=>window.open(`https://${tech.website}`,"_blank")} style={{background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:9,padding:"9px 13px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:B,display:"flex",alignItems:"center",gap:5}}><Ico.Globe s={12} c={t.sub}/> Website</button>
        </div>
      </div>
    );
  };

  if(page==="home")return(
    <div>
      <Lbl>After-Sales Care</Lbl>
      <h2 style={{fontFamily:H,fontSize:sc.isMobile?22:28,fontWeight:W.section,color:t.text,marginBottom:5}}>Solar Servicing & Repair</h2>
      <p style={{color:t.sub,fontSize:14,marginBottom:sc.isDesktop?32:20}}>Keep your system at peak performance — for the lifetime of your investment.</p>
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"repeat(4,1fr)":sc.isMobile?"1fr 1fr":"repeat(auto-fill,minmax(200px,1fr))",gap:sc.isDesktop?16:12,marginBottom:sc.isDesktop?24:16}}>
        {[
          {id:"health",SvgIcon:Ico.Stethoscope,title:"Health Check",desc:"6 questions to diagnose your system.",badge:"AI",color:"#4ade80"},
          {id:"error", SvgIcon:Ico.AlertTriangle,title:"Error Code Translator",desc:"Type any inverter code. Plain English instantly.",badge:"Instant",color:t.accent},
          {id:"techs", SvgIcon:Ico.Wrench,title:"Find a Technician",desc:"Verified repair specialists near you.",badge:null,color:"#60a5fa"},
          {id:"reminder",SvgIcon:Ico.Calendar,title:"Service Reminders",desc:"WhatsApp reminders when service is due.",badge:"Free",color:"#c084fc"},
        ].map((c,i)=>{
          const[hov,setHov]=useState(false);
          return(
            <div key={c.id} onClick={()=>setPage(c.id)}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              style={{background:hov?`${c.color}08`:t.bgCard,border:`1px solid ${hov?`${c.color}44`:t.border}`,borderRadius:16,padding:sc.isDesktop?"24px":"16px 14px",cursor:"pointer",transition:"all .22s",position:"relative",animation:`fadeUp .35s ease ${i*.07}s both`,display:"flex",flexDirection:"column",
                transform:hov?"scale(1.03)":"scale(1)",
                boxShadow:hov?`0 8px 28px ${c.color}22`:"none"}}>
              {c.badge&&<div style={{position:"absolute",top:12,right:12,fontSize:9,background:`${c.color}18`,color:c.color,padding:"2px 7px",borderRadius:8,fontWeight:700}}>{c.badge}</div>}
              <div style={{width:sc.isDesktop?52:44,height:sc.isDesktop?52:44,borderRadius:14,background:`${c.color}12`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:sc.isDesktop?16:12}}><c.SvgIcon s={sc.isDesktop?26:20} c={c.color}/></div>
              <div style={{fontFamily:H,fontSize:sc.isDesktop?17:15,fontWeight:W.card,color:t.text,marginBottom:6}}>{c.title}</div>
              <div style={{fontSize:12,color:t.sub,lineHeight:1.6,marginBottom:14,flex:1}}>{c.desc}</div>
              <div style={{fontSize:12,color:c.color,fontWeight:600,display:"flex",alignItems:"center",gap:4}}>Open <Ico.ArrowRight s={11} c={c.color}/></div>
            </div>
          );
        })}
      </div>
      <div style={{background:"rgba(239,68,68,.06)",border:"1px solid rgba(239,68,68,.15)",borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:38,height:38,borderRadius:10,background:"rgba(239,68,68,.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ico.AlertTriangle s={20} c="#f87171"/></div>
        <div style={{flex:1}}><div style={{fontFamily:H,fontSize:14,fontWeight:W.card,color:"#f87171",marginBottom:2}}>System Completely Offline?</div><div style={{fontSize:13,color:t.sub}}>Emergency technicians available 24/7 across SA.</div></div>
        <button onClick={()=>setPage("techs")} style={{background:"rgba(239,68,68,.15)",border:"1px solid rgba(239,68,68,.3)",color:"#f87171",borderRadius:9,padding:"10px 16px",fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",fontFamily:B,transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,.25)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(239,68,68,.15)"}>Find Now</button>
      </div>
    </div>
  );

  if(page==="error"){
    const errPanel=(
      <div>
        <Lbl>Diagnostic Tool</Lbl>
        <h3 style={{fontFamily:H,fontSize:sc.isMobile?20:24,fontWeight:W.section,color:t.text,marginBottom:5}}>Error Code Translator</h3>
        <p style={{color:t.sub,fontSize:13,marginBottom:14}}>Type the error code on your inverter display. Supports Sunsynk, Victron, Deye, Growatt.</p>
        <div style={{display:"flex",gap:8,marginBottom:10}}>
          <input value={errCode} onChange={e=>setErrCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&lookupErr()} placeholder="e.g. F32, E001, G05..."
            style={{flex:1,background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:10,padding:"11px 13px",color:t.text,fontSize:15,fontFamily:"monospace",fontWeight:700,letterSpacing:2,outline:"none"}}/>
          <PBtn sm onClick={lookupErr} style={{borderRadius:10,padding:"11px 16px",width:"auto"}}>Look Up</PBtn>
        </div>
        <div style={{display:"flex",gap:5,marginBottom:18,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:11,color:t.sub}}>Try:</span>
          {["F01","F32","E001","E002","E003","W003","G01","G05"].map(c=>(
            <button key={c} onClick={()=>{setErrCode(c);setErrRes(null);}} style={{background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:7,padding:"3px 10px",cursor:"pointer",fontSize:11,fontWeight:700,letterSpacing:1,fontFamily:"monospace",transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.35)`;e.currentTarget.style.color=t.accent;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.color=t.sub;}}>{c}</button>
          ))}
        </div>
        {errRes&&(
          <div style={{animation:"fadeUp .35s ease"}}>
            {errRes.notFound?(
              <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:13,padding:"20px",textAlign:"center"}}>
                <div style={{fontFamily:H,fontSize:17,fontWeight:W.section,color:t.text,marginBottom:4}}>Code "{errRes.code}" Not Found</div>
                <div style={{fontSize:13,color:t.sub,marginBottom:12}}>We add new codes daily. A technician can diagnose on the spot.</div>
                <button onClick={()=>setPage("techs")} style={{background:`rgba(${t.rgb},.1)`,border:`1px solid rgba(${t.rgb},.3)`,color:t.accent,borderRadius:10,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B}}>Find a Technician →</button>
              </div>
            ):(
              <div style={{background:errRes.sev==="critical"?"rgba(239,68,68,.06)":errRes.sev==="warning"?`rgba(${t.rgb},.06)`:"rgba(96,165,250,.06)",border:`1px solid ${errRes.sev==="critical"?"rgba(239,68,68,.2)":errRes.sev==="warning"?`rgba(${t.rgb},.2)`:"rgba(96,165,250,.2)"}`,borderRadius:13,padding:"18px"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <div style={{fontFamily:H,fontSize:26,fontWeight:W.hero,color:errRes.sev==="critical"?"#ef4444":errRes.sev==="warning"?t.accent:"#60a5fa"}}>{errRes.code}</div>
                  <div>
                    <div style={{fontSize:10,color:t.sub,textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>{errRes.brand}</div>
                    <span style={{fontSize:10,background:errRes.sev==="critical"?"rgba(239,68,68,.15)":errRes.sev==="warning"?`rgba(${t.rgb},.15)`:"rgba(96,165,250,.15)",color:errRes.sev==="critical"?"#f87171":errRes.sev==="warning"?t.accent:"#93c5fd",padding:"2px 8px",borderRadius:8,fontWeight:700,textTransform:"uppercase"}}>{errRes.sev}</span>
                  </div>
                </div>
                <div style={{fontFamily:H,fontSize:17,fontWeight:W.section,color:t.text,marginBottom:8}}>{errRes.title}</div>
                <div style={{fontSize:14,color:t.sub,lineHeight:1.7,marginBottom:10}}>{errRes.fix}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <div style={{flex:1,background:errRes.diy?"rgba(74,222,128,.07)":"rgba(239,68,68,.07)",border:`1px solid ${errRes.diy?"rgba(74,222,128,.2)":"rgba(239,68,68,.2)"}`,borderRadius:10,padding:"10px 13px",display:"flex",alignItems:"center",gap:8}}>
                    {errRes.diy?<Ico.Check s={14} c="#4ade80"/>:<Ico.AlertTriangle s={14} c="#f87171"/>}
                    <span style={{fontSize:12,color:errRes.diy?"#4ade80":"#f87171",fontWeight:600,fontFamily:B}}>{errRes.diy?"You can resolve this yourself":"Requires a qualified technician"}</span>
                  </div>
                  {!errRes.diy&&<PBtn sm onClick={()=>setPage("techs")} style={{borderRadius:10,width:"auto",padding:"10px 16px"}}>Find Technician →</PBtn>}
                </div>
                {errRes.specs&&errRes.specs.length>0&&(
                  <div style={{marginTop:10,background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:10,padding:"11px 14px"}}>
                    <div style={{fontSize:11,color:t.sub,marginBottom:6}}>Recommended specialist:</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {errRes.specs.map(s=><button key={s} onClick={()=>{setTSpec(s);setPage("techs");}} style={{background:`rgba(${t.rgb},.1)`,border:`1px solid rgba(${t.rgb},.3)`,color:t.accent,borderRadius:8,padding:"5px 12px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:B}}>{s} →</button>)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
    const commonCodes=(
      <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:14,padding:"18px"}}>
        <div style={{fontFamily:H,fontSize:15,fontWeight:W.section,color:t.text,marginBottom:14}}>Common error codes</div>
        {Object.entries(ERRORS).slice(0,6).map(([code,err])=>(
          <div key={code} onClick={()=>{setErrCode(code);setErrRes({...err,code});}} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 10px",borderRadius:9,cursor:"pointer",marginBottom:4,transition:"all .2s"}}
            onMouseEnter={e=>e.currentTarget.style.background=`rgba(${t.rgb},.06)`}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <span style={{fontFamily:"monospace",fontSize:12,fontWeight:800,color:t.accent,width:40,flexShrink:0}}>{code}</span>
            <span style={{fontSize:11,color:t.sub,flex:1}}>{err.title}</span>
            <span style={{fontSize:9,background:err.sev==="critical"?"rgba(239,68,68,.15)":err.sev==="warning"?`rgba(${t.rgb},.15)`:"rgba(96,165,250,.15)",color:err.sev==="critical"?"#f87171":err.sev==="warning"?t.accent:"#93c5fd",padding:"2px 7px",borderRadius:6,fontWeight:700,textTransform:"uppercase"}}>{err.sev}</span>
          </div>
        ))}
      </div>
    );
    return(
      <div>
        <BackBtn onClick={reset}/>
        {sc.isDesktop?(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,alignItems:"start"}}>
            {errPanel}{commonCodes}
          </div>
        ):errPanel}
      </div>
    );
  }

  if(page==="health"){
    if(hResult){
      const scoreColor=hResult.color;
      const scoreBlock=(
        <div style={{animation:"fadeUp .5s ease"}}>
          <div style={{textAlign:"center",marginBottom:22}}>
            <div style={{width:100,height:100,borderRadius:"50%",background:`${scoreColor}18`,border:`3px solid ${scoreColor}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",flexDirection:"column",position:"relative"}}>
              <div style={{position:"absolute",inset:0,borderRadius:"50%",background:`conic-gradient(${scoreColor} ${hResult.score*3.6}deg, transparent 0)`,opacity:.15}}/>
              <div style={{fontFamily:H,fontSize:28,fontWeight:W.hero,color:scoreColor,position:"relative"}}>{hResult.score}</div>
              <div style={{fontSize:10,color:scoreColor,fontWeight:600,position:"relative"}}>/100</div>
            </div>
            <div style={{fontFamily:H,fontSize:26,fontWeight:W.section,color:scoreColor,marginBottom:5}}>{hResult.status}</div>
            <p style={{color:t.sub,fontSize:14,lineHeight:1.7,maxWidth:380,margin:"0 auto"}}>{hResult.note}</p>
          </div>
          {hResult.needsSpecs.length>0&&(
            <div style={{background:`rgba(${t.rgb},.05)`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:10,padding:"11px 14px",marginBottom:14}}>
              <div style={{fontSize:12,color:t.sub,marginBottom:6}}>We recommend:</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {hResult.needsSpecs.map(s=><button key={s} onClick={()=>{setTSpec(s);setPage("techs");}} style={{background:`rgba(${t.rgb},.1)`,border:`1px solid rgba(${t.rgb},.3)`,color:t.accent,borderRadius:8,padding:"5px 12px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:B}}>{s} →</button>)}
              </div>
            </div>
          )}
          <PBtn onClick={()=>setPage("techs")} style={{width:"100%"}}>Book a Professional Service →</PBtn>
        </div>
      );
      const bars=(
        <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:14,padding:"20px"}}>
          <div style={{fontFamily:H,fontSize:15,fontWeight:W.section,color:t.text,marginBottom:16}}>Diagnostic Breakdown</div>
          {[["Panel Efficiency",hResult.score*.3+60,"#f5a623"],["Battery Health",hResult.score*.4+50,"#4ade80"],["Inverter Status",hResult.score*.5+45,"#60a5fa"]].map(([l,v,c])=>(
            <div key={l} style={{marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:13,color:t.sub}}>{l}</span><span style={{fontSize:13,fontWeight:700,color:c}}>{Math.min(100,Math.round(v))}%</span></div>
              <div style={{height:8,background:`rgba(128,128,128,.15)`,borderRadius:4}}>
                <div style={{width:`${Math.min(100,v)}%`,height:"100%",background:`linear-gradient(90deg,${c}88,${c})`,borderRadius:4,transition:"width .8s ease"}}/>
              </div>
            </div>
          ))}
        </div>
      );
      return(
        <div style={{animation:"fadeUp .5s ease"}}>
          <BackBtn onClick={()=>{setHResult(null);setHAns({});setHStep(0);}}/>
          {sc.isDesktop?(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,alignItems:"start"}}>{scoreBlock}{bars}</div>
          ):(
            <div>{scoreBlock}<div style={{marginTop:12}}>{bars}</div></div>
          )}
        </div>
      );
    }
    const q=HEALTH_QS[hStep];
    return(
      <div style={{maxWidth:sc.isDesktop?640:undefined,margin:sc.isDesktop?"0 auto":undefined}}>
        <BackBtn onClick={()=>hStep===0?reset():setHStep(s=>s-1)}/>
        <div style={{display:"flex",gap:4,marginBottom:24}}>{HEALTH_QS.map((_,i)=><div key={i} style={{flex:1,height:4,borderRadius:2,background:i<=hStep?t.accent:`rgba(${t.rgb},.15)`,transition:"background .3s"}}/>)}</div>
        <div key={hStep} style={{animation:"fadeUp .3s ease"}}>
          <Lbl>Question {hStep+1} of {HEALTH_QS.length}</Lbl>
          <h3 style={{fontFamily:H,fontSize:sc.isMobile?20:26,fontWeight:W.section,color:t.text,marginBottom:18,lineHeight:1.2}}>{q.q}</h3>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            {q.opts.map(o=>{
              const sel=hAns[q.id]===o;
              const[hov,setHov]=useState(false);
              return(
                <button key={o} onClick={()=>{const na={...hAns,[q.id]:o};setHAns(na);if(hStep<HEALTH_QS.length-1)setTimeout(()=>setHStep(s=>s+1),200);else setTimeout(calcHealth,200);}}
                  onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                  style={{background:sel?`rgba(${t.rgb},.1)`:hov?`rgba(${t.rgb},.05)`:t.bgCard,border:`1px solid ${sel?t.accent:hov?`rgba(${t.rgb},.3)`:t.border}`,borderRadius:12,padding:"16px 18px",cursor:"pointer",textAlign:"left",fontSize:15,color:sel?t.accent:t.textMid,fontWeight:sel?600:400,transition:"all .2s",fontFamily:B}}>{o}</button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if(page==="techs")return(
    <div>
      <BackBtn onClick={reset}/>
      <Lbl>Repair Specialists</Lbl>
      <h3 style={{fontFamily:H,fontSize:sc.isMobile?20:24,fontWeight:W.section,color:t.text,marginBottom:4}}>Find a Technician</h3>
      <p style={{color:t.sub,fontSize:13,marginBottom:14}}>Verified repair specialists across SA — matched to your issue</p>
      {/* Error code search in technicians */}
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        <input value={techErrSearch} onChange={e=>setTechErrSearch(e.target.value)} placeholder="Search by error code (e.g. F32)..." style={{flex:1,background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"9px 12px",color:t.text,fontSize:13,fontFamily:"monospace",outline:"none"}}/>
        {techErrSearch&&<button onClick={()=>setTechErrSearch("")} style={{background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:9,padding:"9px 14px",cursor:"pointer",fontFamily:B,fontSize:12}}>Clear</button>}
      </div>
      {/* Province filters — all 9 */}
      <div style={{display:"flex",gap:7,marginBottom:10,flexWrap:"wrap"}}>
        {["All","Gauteng","Western Cape","KwaZulu-Natal","Eastern Cape","Free State","Mpumalanga","Northern Cape","North West","Limpopo"].map(p=>(
          <button key={p} onClick={()=>setTProv(p)} style={{background:tProv===p?`rgba(${t.rgb},.12)`:t.bgCard,border:`1px solid ${tProv===p?`rgba(${t.rgb},.4)`:t.border}`,color:tProv===p?t.accent:t.sub,borderRadius:20,padding:"6px 13px",cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:B,transition:"all .15s"}}>{p}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap"}}>
        {["All",...TECH_SPECS].map(s=><button key={s} onClick={()=>setTSpec(s)} style={{background:tSpec===s?`rgba(${t.rgb},.12)`:t.bgCard,border:`1px solid ${tSpec===s?`rgba(${t.rgb},.4)`:t.border}`,color:tSpec===s?t.accent:t.sub,borderRadius:20,padding:"6px 13px",cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:B,transition:"all .15s"}}>{s}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1fr 1fr":"1fr",gap:12}}>
        {filteredTechsByErr.map((tech,i)=><TechCard key={tech.id} tech={tech} i={i}/>)}
        {filteredTechsByErr.length===0&&<div style={{textAlign:"center",padding:"24px",color:t.sub,fontSize:13}}>No technicians match. <button onClick={()=>{setTProv("All");setTSpec("All");setTechErrSearch("");}} style={{background:"none",border:"none",color:t.accent,cursor:"pointer",fontWeight:700,fontFamily:B}}>Clear filters</button></div>}
      </div>
    </div>
  );

  if(page==="reminder")return(
    <div style={{maxWidth:sc.isDesktop?520:undefined,margin:sc.isDesktop?"0 auto":undefined}}>
      <BackBtn onClick={reset}/>
      <Lbl>Free Service</Lbl>
      <h3 style={{fontFamily:H,fontSize:sc.isMobile?20:24,fontWeight:W.section,color:t.text,marginBottom:5}}>Service Reminders</h3>
      <p style={{color:t.sub,fontSize:14,marginBottom:20}}>Register once. We'll WhatsApp you when service is due.</p>
      <div style={{display:"flex",flexDirection:"column",gap:11,marginBottom:16}}>
        {[["Your name","text","John Smith"],["WhatsApp number","tel","+27 82 000 0000"],["System size","text","e.g. 5kW Sunsynk"],["Installation date","date",""],["Inverter brand","text","e.g. Sunsynk, Victron, Deye"]].map(([l,tp,ph])=>(
          <div key={l}>
            <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.2,display:"block",marginBottom:5,fontWeight:600}}>{l}</label>
            <input type={tp} placeholder={ph} style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"11px 13px",color:t.text,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:B,transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor=`rgba(${t.rgb},.5)`} onBlur={e=>e.target.style.borderColor=t.border}/>
          </div>
        ))}
      </div>
      <PBtn style={{width:"100%"}}>Register My System Free</PBtn>
      <div style={{fontSize:11,color:t.sub,textAlign:"center",marginTop:10}}>WhatsApp only · No spam · Unsubscribe anytime</div>
    </div>
  );
  return null;
}

// ─── BLOG ────────────────────────────────────────────────────
function RatingBar({label,score}){
  const t=useT();const c=score>=4.5?"#4ade80":score>=3.5?t.accent:"#f87171";
  return(
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:7}}>
      <div style={{fontSize:12,color:t.sub,width:90,flexShrink:0}}>{label}</div>
      <div style={{flex:1,height:4,background:`rgba(128,128,128,.15)`,borderRadius:2}}>
        <div style={{width:`${(score/5)*100}%`,height:"100%",background:c,borderRadius:2}}/>
      </div>
      <div style={{fontSize:12,fontWeight:700,color:c,width:28,textAlign:"right"}}>{score}</div>
    </div>
  );
}

function ArticleView({article,onBack}){
  const t=useT();const sc=useScreen();
  useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"});},[article.id]);
  const related=article.related.map(id=>ARTICLES.find(a=>a.id===id)).filter(Boolean);
  const body=(
    <div>
      <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:14}}>
        <Tag>{article.tag}</Tag>
        {article.hot&&<span style={{fontSize:13}}>🔥</span>}
        <span style={{fontSize:12,color:t.sub,marginLeft:"auto"}}>{article.min} min · {article.views} views</span>
      </div>
      <h1 style={{fontFamily:H,fontSize:"clamp(20px,3vw,34px)",fontWeight:W.hero,color:t.text,lineHeight:1.15,marginBottom:16}}>{article.title}</h1>
      <p style={{fontSize:15,color:t.textMid,lineHeight:1.85,borderLeft:`3px solid ${t.accent}`,paddingLeft:14,marginBottom:24,fontStyle:"italic"}}>{article.intro}</p>
      {article.coverImg&&(
        <div style={{borderRadius:14,overflow:"hidden",marginBottom:24,border:`1px solid ${t.border}`}}>
          <img src={article.coverImg} alt={article.title} style={{width:"100%",height:sc.isMobile?160:240,objectFit:"cover",display:"block"}}/>
        </div>
      )}
      {article.body&&article.body.map((s,i)=>(
        <div key={i} style={{marginBottom:22}}>
          <h3 style={{fontFamily:H,fontSize:sc.isMobile?16:19,fontWeight:W.section,color:t.text,marginBottom:9}}>{s.h}</h3>
          <p style={{fontSize:14,color:t.sub,lineHeight:1.8}}>{s.p}</p>
        </div>
      ))}
      {article.rating&&(
        <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:14,padding:"18px",marginTop:16,marginBottom:24}}>
          <div style={{fontFamily:H,fontSize:15,fontWeight:W.section,color:t.text,marginBottom:14}}>Our Rating</div>
          {Object.entries(article.rating).map(([k,v])=><RatingBar key={k} label={k.charAt(0).toUpperCase()+k.slice(1)} score={v}/>)}
        </div>
      )}
    </div>
  );
  const sidebar=(
    <div style={{position:"sticky",top:80}}>
      {/* Calculate button — text only, no icon */}
      <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.1),rgba(${t.rgb},.04))`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:14,padding:"18px",textAlign:"center",marginBottom:20}}>
        <div style={{fontFamily:H,fontSize:15,fontWeight:W.section,color:t.text,marginBottom:4}}>Ready to Calculate?</div>
        <PBtn sm style={{width:"100%",padding:"11px"}} onClick={()=>onBack(null)}>Calculate My System</PBtn>
      </div>
      {related.length>0&&(
        <div>
          <div style={{fontFamily:H,fontSize:14,fontWeight:W.section,color:t.text,marginBottom:12}}>Related Articles</div>
          {related.map(rel=>{
            const[hov,setHov]=useState(false);
            return(
              <div key={rel.id} onClick={()=>onBack(rel)}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                style={{background:hov?`rgba(${t.rgb},.06)`:t.bgCard,border:`1px solid ${hov?`rgba(${t.rgb},.25)`:t.border}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:10,marginBottom:8,transform:hov?"translateX(4px)":"none"}}>
                <div style={{flex:1}}><Tag>{rel.tag}</Tag><div style={{fontFamily:H,fontSize:12,fontWeight:W.card,color:t.text,marginTop:4}}>{rel.title}</div></div>
                <span style={{fontSize:14,color:t.sub,flexShrink:0}}>›</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <BackBtn onClick={()=>onBack(null)}/>
      {sc.isDesktop?(
        <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:32,alignItems:"start"}}>
          {body}
          {sidebar}
        </div>
      ):(
        <div>
          {body}
          <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.1),rgba(${t.rgb},.04))`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:14,padding:"18px",textAlign:"center",marginBottom:20}}>
            <div style={{fontFamily:H,fontSize:15,fontWeight:W.section,color:t.text,marginBottom:4}}>Ready to Calculate?</div>
            <PBtn sm style={{width:"100%",padding:"10px"}} onClick={()=>onBack(null)}>Calculate My System</PBtn>
          </div>
          {related.length>0&&(
            <div>
              <div style={{fontFamily:H,fontSize:14,fontWeight:W.section,color:t.text,marginBottom:10}}>Related Articles</div>
              {related.map(rel=>(
                <div key={rel.id} onClick={()=>{onBack(rel);window.scrollTo({top:0,behavior:"smooth"});}} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:10,marginBottom:8}} onMouseEnter={e=>e.currentTarget.style.borderColor=`rgba(${t.rgb},.25)`} onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}>
                  <div style={{flex:1}}><Tag>{rel.tag}</Tag><div style={{fontFamily:H,fontSize:12,fontWeight:W.card,color:t.text,marginTop:4}}>{rel.title}</div></div>
                  <span style={{fontSize:14,color:t.sub,flexShrink:0}}>›</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Blog(){
  const t=useT();const sc=useScreen();
  const[active,setActive]=useState(null);const[tag,setTag]=useState("All");
  const tags=["All",...new Set(ARTICLES.map(a=>a.tag))];
  if(active)return <ArticleView article={active} onBack={a=>{if(a){setActive(a);window.scrollTo({top:0,behavior:"smooth"});}else setActive(null);}}/>;
  const list=tag==="All"?ARTICLES:ARTICLES.filter(a=>a.tag===tag);
  return(
    <div>
      <Lbl>Knowledge Hub</Lbl>
      <h2 style={{fontFamily:H,fontSize:sc.isMobile?22:28,fontWeight:W.section,color:t.text,marginBottom:5}}>Solar Guides & Reviews</h2>
      <p style={{color:t.sub,fontSize:14,marginBottom:16}}>Honest solar content for South Africans. No brand deals. No bias.</p>
      <div style={{display:"flex",gap:7,marginBottom:20,flexWrap:"wrap"}}>
        {tags.map(tg=>{
          const[hov,setHov]=useState(false);
          return(
            <button key={tg} onClick={()=>setTag(tg)}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              style={{background:tag===tg?`rgba(${t.rgb},.13)`:hov?`rgba(${t.rgb},.06)`:t.bgCard,border:`1px solid ${tag===tg?`rgba(${t.rgb},.4)`:hov?`rgba(${t.rgb},.2)`:t.border}`,color:tag===tg?t.accent:t.sub,borderRadius:20,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:B,transition:"all .15s"}}>{tg}</button>
          );
        })}
      </div>
      {/* Featured */}
      {list[0]&&(
        <div onClick={()=>setActive(list[0])} style={{background:`linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`,border:`1px solid rgba(${t.rgb},.15)`,borderRadius:16,overflow:"hidden",marginBottom:14,cursor:"pointer",transition:"all .22s"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`;e.currentTarget.style.transform="scale(1.01)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.15)`;e.currentTarget.style.transform="none";}}>
          {list[0].coverImg&&<img src={list[0].coverImg} alt="" style={{width:"100%",height:sc.isDesktop?260:sc.isMobile?140:200,objectFit:"cover",display:"block"}}/>}
          <div style={{padding:sc.isDesktop?"22px 24px":"16px 18px"}}>
            <div style={{display:"flex",gap:7,marginBottom:10,alignItems:"center"}}>
              <Tag>FEATURED</Tag><Tag>{list[0].tag}</Tag>
              {list[0].hot&&<span style={{fontSize:15}}>🔥</span>}
              <span style={{fontSize:11,color:t.sub,marginLeft:"auto"}}>{list[0].views} reads</span>
            </div>
            <h3 style={{fontFamily:H,fontSize:sc.isDesktop?"clamp(18px,2vw,24px)":"clamp(15px,3vw,20px)",fontWeight:W.section,color:t.text,marginBottom:8,lineHeight:1.2}}>{list[0].title}</h3>
            <p style={{fontSize:13,color:t.sub,lineHeight:1.7,marginBottom:12,maxWidth:700}}>{list[0].intro}</p>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:12,color:t.sub}}>{list[0].min} min read</span>
              <span style={{fontSize:13,color:t.accent,fontWeight:600}}>Read article →</span>
            </div>
          </div>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"repeat(3,1fr)":sc.isMobile?"1fr":"1fr 1fr",gap:12}}>
        {list.slice(1).map((p,i)=>(
          <div key={p.id} onClick={()=>setActive(p)} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:14,overflow:"hidden",cursor:"pointer",transition:"all .2s",animation:`fadeUp .35s ease ${i*.07}s both`}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.25)`;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 24px rgba(${t.rgb},.12)`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
            {p.coverImg&&<img src={p.coverImg} alt="" style={{width:"100%",height:120,objectFit:"cover",display:"block"}}/>}
            <div style={{padding:"14px"}}>
              <div style={{display:"flex",gap:6,marginBottom:8,alignItems:"center"}}>
                <Tag>{p.tag}</Tag>
                {p.hot&&<span style={{fontSize:13}}>🔥</span>}
                <span style={{fontSize:10,color:t.sub,marginLeft:"auto"}}>{p.views}</span>
              </div>
              <h4 style={{fontFamily:H,fontSize:13,fontWeight:W.card,color:t.text,lineHeight:1.35,marginBottom:10}}>{p.title}</h4>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:11,color:t.sub}}>{p.min} min</span>
                <span style={{fontSize:12,color:t.accent,fontWeight:600}}>Read →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── COMING SOON ─────────────────────────────────────────────
function ComingSoon(){
  const[email,setEmail]=useState("");const[done,setDone]=useState(false);const[saving,setSaving]=useState(false);
  const saveEmail=async()=>{
    if(!email||saving)return;
    const emailOk=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if(!emailOk)return;
    setSaving(true);
    try{await sb.from("subscribers").upsert({email:email.trim().toLowerCase(),source:"coming_soon",active:true},{onConflict:"email"});}
    catch(e){console.log(e);}
    setDone(true);setSaving(false);
  };
  // Updated countdown to 01 June 2026
  const LAUNCH=new Date("2026-06-01T00:00:00+02:00");
  const[tl,setTl]=useState({d:0,h:0,m:0,s:0});
  const[pts]=useState(()=>Array.from({length:24},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,size:Math.random()*2.5+1,dur:Math.random()*8+6,delay:Math.random()*6,op:Math.random()*.45+.1})));
  useEffect(()=>{
    const calc=()=>{const now=new Date();const diff=LAUNCH-now;if(diff<=0){setTl({d:0,h:0,m:0,s:0});return;}setTl({d:Math.floor(diff/86400000),h:Math.floor((diff%86400000)/3600000),m:Math.floor((diff%3600000)/60000),s:Math.floor((diff%60000)/1000)});};
    calc();const id=setInterval(calc,1000);return()=>clearInterval(id);
  },[]);
  return(
    <div style={{position:"fixed",inset:0,background:"#06080c",zIndex:9999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 20px",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
        {pts.map(p=><div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,borderRadius:"50%",background:"#f5a623",opacity:p.op,animation:`particle ${p.dur}s ease-in-out ${p.delay}s infinite`}}/>)}
      </div>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"70vw",height:"70vh",background:"radial-gradient(ellipse,rgba(245,166,35,.07) 0%,transparent 65%)",pointerEvents:"none",animation:"breathe 7s ease infinite"}}/>
      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",width:"100%",maxWidth:520}}>
        {/* Logo — ray style, no floating box */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24,animation:"fadeUp .6s ease"}}>
          <LogoIcon s={38}/>
          <span style={{fontFamily:"'Lexend',sans-serif",fontSize:34,fontWeight:900,letterSpacing:1.5,color:"#f0f0f0"}}>Solar<span style={{color:"#f5a623"}}>IQ</span></span>
        </div>
        <div style={{textAlign:"center",marginBottom:32,animation:"fadeUp .7s ease"}}>
          <h1 style={{fontFamily:"'Lexend',sans-serif",fontSize:"clamp(24px,6vw,46px)",fontWeight:900,color:"#f0f0f0",lineHeight:1.1,marginBottom:12}}>SA's Solar Platform.<br/><span style={{color:"#f5a623"}}>Launching 1 June 2026.</span></h1>
          <p style={{fontSize:14,color:"rgba(255,255,255,.3)",lineHeight:1.8,maxWidth:380,margin:"0 auto"}}>Calculate your system. Find verified installers.<br/>Diagnose faults. All free. All in one place.</p>
        </div>
        <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:32,animation:"fadeUp .8s ease"}}>
          {[["Days",tl.d],["Hours",tl.h],["Min",tl.m],["Sec",tl.s]].reduce((acc,el,i)=>{
            const block=(<div key={el[0]} style={{textAlign:"center",minWidth:64}}>
              <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(245,166,35,.12)",borderRadius:12,padding:"12px 8px",marginBottom:6}}>
                <div style={{fontFamily:"'Lexend',sans-serif",fontSize:"clamp(28px,6vw,48px)",fontWeight:900,color:"#f5a623",lineHeight:1,letterSpacing:1}}>{String(el[1]).padStart(2,"0")}</div>
              </div>
              <div style={{fontSize:9,color:"rgba(255,255,255,.2)",fontWeight:600,textTransform:"uppercase",letterSpacing:2}}>{el[0]}</div>
            </div>);
            if(i===0)return[block];
            return[...acc,<div key={`s${i}`} style={{fontFamily:"'Lexend',sans-serif",fontSize:"clamp(20px,4vw,36px)",fontWeight:900,color:"rgba(245,166,35,.25)",paddingTop:10}}>:</div>,block];
          },[])}
        </div>
        <div style={{width:"100%",maxWidth:380,marginBottom:12,animation:"fadeUp .9s ease"}}>
          {done?(
            <div style={{background:"rgba(74,222,128,.08)",border:"1px solid rgba(74,222,128,.2)",borderRadius:12,padding:"16px",textAlign:"center"}}>
              <div style={{fontFamily:"'Lexend',sans-serif",fontSize:16,fontWeight:700,color:"#4ade80",marginBottom:2}}>You're on the list</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,.3)"}}>We'll notify you on launch day.</div>
            </div>
          ):(
            <div style={{display:"flex",gap:8}}>
              <input value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveEmail()} placeholder="your@email.com"
                style={{flex:1,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.09)",borderRadius:10,padding:"12px 14px",color:"#f0f0f0",fontSize:14,outline:"none",fontFamily:"'Plus Jakarta Sans',sans-serif"}}/>
              <button onClick={saveEmail} style={{background:"linear-gradient(135deg,#f5a623,#ff6b00)",border:"none",borderRadius:10,padding:"12px 18px",fontSize:13,fontWeight:800,color:"#000",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",whiteSpace:"nowrap"}}>{saving?"...":"Notify Me"}</button>
            </div>
          )}
        </div>
        <div style={{fontSize:11,color:"rgba(255,255,255,.16)",animation:"fadeUp 1s ease",textAlign:"center"}}>No spam · Unsubscribe anytime · Built for South Africa</div>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────
export default function App(){
  const params=typeof window!=="undefined"?new URLSearchParams(window.location.search):new URLSearchParams();
  const unlocked=params.get("preview")==="solariq2026";
  const[tab,setTab]=useState("home");
  const[res,setRes]=useState(null);
  const[nlEmail,setNlEmail]=useState("");const[nlDone,setNlDone]=useState(false);const[nlSaving,setNlSaving]=useState(false);
  const sc=useScreen();
  const t=DARK; // dark only

  const saveNewsletter=async()=>{
    if(!nlEmail||nlSaving)return;
    const emailOk=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nlEmail.trim());
    if(!emailOk)return;
    setNlSaving(true);
    try{await sb.from("subscribers").upsert({email:nlEmail.trim().toLowerCase(),source:"newsletter",active:true},{onConflict:"email"});}
    catch(e){console.log(e);}
    setNlDone(true);setNlSaving(false);
  };

  const goTab=id=>{setTab(id);if(id!=="result")setRes(null);window.scrollTo({top:0,behavior:"smooth"});};

  const NAV=[
    {id:"home", l:"Home",       SvgIcon:Ico.Home},
    {id:"calc", l:"Calculator", SvgIcon:Ico.Sun},
    {id:"inst", l:"Installers", SvgIcon:Ico.Map},
    {id:"serv", l:"Servicing",  SvgIcon:Ico.Wrench},
    {id:"blog", l:"Guides",     SvgIcon:Ico.Book},
  ];

  // Ticker — updated copy, remove "load shedding" language
  const TICKS=["Solar tax rebate: claim 25% back from SARS","Grid independence — is your system sized right?","Pro Calculator now live","Free System Health Check — 2 minutes","Verified repair technicians across SA","Installer PDF proposal generator now live"];

  const css=`
    @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html,body{width:100%;overflow-x:hidden}
    body{background:#07090d;-webkit-text-size-adjust:100%}
    ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#f5a623;border-radius:4px}
    input::placeholder{color:#444}
    select option{background:#111;color:#f0f0f0}
    @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
    @keyframes breathe{0%,100%{opacity:.6;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.08)}}
    @keyframes particle{0%,100%{transform:translateY(0) scale(1);opacity:.15}50%{transform:translateY(-18px) scale(1.4);opacity:.55}}
    @keyframes navGlow{0%,100%{box-shadow:none}50%{box-shadow:0 0 18px rgba(245,166,35,.15)}}
  `;

  if(!unlocked)return(<><style>{css}</style><ComingSoon/></>);

  return(
    <T.Provider value={t}>
      <style>{css}</style>
      <div style={{fontFamily:B,background:t.bg,minHeight:"100vh",color:t.text,overflowX:"hidden",display:"flex",flexDirection:"column"}}>
        {/* Ticker bar — desktop only */}
        {!sc.isMobile&&(
          <div style={{background:`rgba(${t.rgb},.06)`,borderBottom:`1px solid ${t.border}`,height:26,overflow:"hidden",display:"flex",alignItems:"center",flexShrink:0}}>
            <div style={{display:"flex",animation:"ticker 36s linear infinite",whiteSpace:"nowrap"}}>
              {[...TICKS,...TICKS].map((x,i)=><span key={i} style={{fontSize:10,color:t.accent,marginRight:52,opacity:.8,fontWeight:600}}>{x}</span>)}
            </div>
          </div>
        )}
        {/* Desktop nav — fixed/sticky, never scrolls away */}
        {!sc.isMobile&&(
          <nav style={{background:t.navBg,backdropFilter:"blur(20px)",borderBottom:`1px solid ${t.border}`,padding:"0 28px",position:"sticky",top:0,zIndex:200,flexShrink:0}}>
            <div style={{maxWidth:1360,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:52,width:"100%"}}>
              {/* Logo — ray style, still (no animation) */}
              <div onClick={()=>goTab("home")} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",flexShrink:0}}>
                <LogoIcon s={26}/>
                <span style={{fontFamily:H,fontSize:20,fontWeight:W.logo,letterSpacing:1,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></span>
                <span style={{fontSize:9,background:`rgba(${t.rgb},.15)`,color:t.accent,padding:"1px 6px",borderRadius:8,fontWeight:700,letterSpacing:1}}>BETA</span>
              </div>
              {/* Nav links with hover glow */}
              <div style={{display:"flex",gap:2}}>
                {NAV.map(x=>{
                  const active=tab===x.id;
                  const[hov,setHov]=useState(false);
                  return(
                    <button key={x.id} onClick={()=>goTab(x.id)}
                      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                      style={{background:active?`rgba(${t.rgb},.08)`:hov?`rgba(${t.rgb},.05)`:"none",
                        border:`1px solid ${active?`rgba(${t.rgb},.22)`:hov?`rgba(${t.rgb},.15)`:"transparent"}`,
                        color:active?t.accent:hov?t.textMid:t.sub,
                        padding:"5px 16px",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:600,
                        transition:"all .18s",fontFamily:B,
                        boxShadow:hov?`0 0 12px rgba(${t.rgb},.15)`:"none"}}>{x.l}</button>
                  );
                })}
              </div>
              {/* Right side — Stay Updated (text only, no icon) */}
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <PBtn sm style={{borderRadius:7,padding:"7px 18px",fontSize:12,width:"auto"}}>Stay Updated</PBtn>
              </div>
            </div>
          </nav>
        )}
        {/* Mobile top nav */}
        {sc.isMobile&&(
          <div style={{background:t.navBg,backdropFilter:"blur(20px)",borderBottom:`1px solid ${t.border}`,padding:"0 16px",position:"sticky",top:0,zIndex:200,height:50,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
            <div onClick={()=>goTab("home")} style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer"}}>
              <LogoIcon s={22}/>
              <span style={{fontFamily:H,fontSize:18,fontWeight:W.logo,letterSpacing:1,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></span>
            </div>
          </div>
        )}
        {/* Main content */}
        <div style={{flex:1,width:"100%"}}>
          <div style={{maxWidth:1360,margin:"0 auto",padding:sc.isMobile?"16px 14px 100px":sc.isDesktop?"44px 48px 64px":"32px 28px 60px",width:"100%"}}>
            {tab==="home"&&(
              <div style={{animation:"fadeUp .5s ease"}}>
                {/* Hero — desktop: no-scroll, everything fits. Mobile: keep as-is */}
                <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"55% 45%":"1fr",gap:sc.isDesktop?64:32,alignItems:"center",marginBottom:sc.isMobile?36:sc.isDesktop?40:48,minHeight:sc.isDesktop?"calc(100vh - 180px)":undefined}}>
                  <div>
                    <div style={{display:"inline-flex",alignItems:"center",gap:7,background:`rgba(${t.rgb},.08)`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:20,padding:"5px 13px",marginBottom:20}}>
                      <span style={{width:6,height:6,borderRadius:"50%",background:t.accent,display:"inline-block",animation:"pulse 2s infinite"}}/>
                      <span style={{fontSize:10,color:t.accent,fontWeight:700,letterSpacing:1}}>SA'S SOLAR INTELLIGENCE PLATFORM</span>
                    </div>
                    <h1 style={{fontFamily:H,fontSize:"clamp(34px,4.5vw,58px)",fontWeight:W.hero,lineHeight:1.05,marginBottom:18,color:t.text}}>
                      From Research<br/>To Install<br/><span style={{color:t.accent}}>To Lifetime Care.</span>
                    </h1>
                    <p style={{fontSize:sc.isMobile?14:16,color:t.sub,lineHeight:1.8,marginBottom:24,maxWidth:420}}>The only platform SA solar owners need — calculate, install, maintain, repair. Free. Always.</p>
                    <div style={{display:"flex",flexDirection:"column",gap:11,maxWidth:360}}>
                      {/* Calculate My System — text only (no icon) */}
                      <PBtn onClick={()=>goTab("calc")} style={{fontSize:15,padding:"14px 28px"}}>Calculate My System</PBtn>
                      {/* Service My Solar — text only (no icon) */}
                      <button onClick={()=>goTab("serv")}
                        style={{background:`rgba(${t.rgb},.08)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.accent,borderRadius:30,padding:"13px 20px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:B,width:"100%",transition:"all .2s"}}
                        onMouseEnter={e=>{e.currentTarget.style.background=`rgba(${t.rgb},.14)`;e.currentTarget.style.boxShadow=`0 4px 18px rgba(${t.rgb},.18)`;}}
                        onMouseLeave={e=>{e.currentTarget.style.background=`rgba(${t.rgb},.08)`;e.currentTarget.style.boxShadow="none";}}>Service My Solar</button>
                    </div>
                    <div style={{display:"flex",gap:sc.isMobile?16:32,marginTop:24,flexWrap:"wrap"}}>
                      {[["4","Calc modes"],["R0","Always free"],["SA","Built for SA"],["24/7","Support"]].map(([v,l])=>(
                        <div key={l}><div style={{fontFamily:H,fontSize:20,fontWeight:W.section,color:t.text}}>{v}</div><div style={{fontSize:11,color:t.sub,marginTop:2}}>{l}</div></div>
                      ))}
                    </div>
                  </div>
                  {/* Right panel — feature list */}
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {[
                      {SvgIcon:Ico.Sparkles,l:"Quick Calculator",  s:"4 simple questions — 60 seconds",    tab:"calc"},
                      {SvgIcon:Ico.Settings,l:"Pro Calculator",    s:"Full kW/kWh/Ah technical inputs",     tab:"calc"},
                      {SvgIcon:Ico.Map,     l:"Installer Directory",s:"SESSA-accredited, verified + finance options",tab:"inst"},
                      {SvgIcon:Ico.Stethoscope,l:"Health Check",   s:"AI-powered system diagnostic",       tab:"serv",badge:"AI"},
                      {SvgIcon:Ico.AlertTriangle,l:"Error Code Translator",s:"Plain English inverter explanations",tab:"serv"},
                      {SvgIcon:Ico.Wrench,  l:"Find a Technician", s:"Matched to your issue, near you",     tab:"serv"},
                    ].map((x,i)=>{
                      const[hov,setHov]=useState(false);
                      return(
                        <div key={x.l} onClick={()=>goTab(x.tab)}
                          onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                          style={{display:"flex",alignItems:"center",gap:12,background:hov?`rgba(${t.rgb},.06)`:t.bgCard,border:`1px solid ${hov?`rgba(${t.rgb},.3)`:t.border}`,borderRadius:12,padding:"12px 14px",cursor:"pointer",transition:"all .2s",animation:`fadeUp .4s ease ${i*.05}s both`,
                            transform:hov?"translateX(5px)":"none",boxShadow:hov?`0 4px 16px rgba(${t.rgb},.1)`:"none"}}>
                          <div style={{width:34,height:34,borderRadius:9,background:`rgba(${t.rgb},.08)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background .2s",background:hov?`rgba(${t.rgb},.15)`:`rgba(${t.rgb},.08)`}}>
                            <x.SvgIcon s={16} c={t.accent}/>
                          </div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:13,fontWeight:600,color:t.text,marginBottom:2,fontFamily:H}}>{x.l}</div>
                            <div style={{fontSize:11,color:t.sub}}>{x.s}</div>
                          </div>
                          {x.badge&&<span style={{fontSize:9,background:`rgba(${t.rgb},.12)`,color:t.accent,padding:"2px 6px",borderRadius:7,fontWeight:700,flexShrink:0}}>{x.badge}</span>}
                          <span style={{fontSize:13,color:hov?t.accent:t.sub,flexShrink:0,transition:"color .2s"}}>›</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Solar Journey — only show on desktop if there's space, always on mobile */}
                <div style={{marginBottom:32}}>
                  <div style={{textAlign:"center",marginBottom:20}}>
                    <Lbl center>Your Solar Journey</Lbl>
                    <h2 style={{fontFamily:H,fontSize:sc.isMobile?19:26,fontWeight:W.section,color:t.text}}>SolarIQ is with you at every stage</h2>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":"repeat(5,1fr)",gap:10}}>
                    {[{n:"01",l:"Research",SvgIcon:Ico.Search,d:"Calculate what you need",c:t.accent},{n:"02",l:"Compare",SvgIcon:Ico.Scale,d:"Find the best installers",c:t.accent2},{n:"03",l:"Install",SvgIcon:Ico.Zap,d:"Accredited professionals",c:"#4ade80"},{n:"04",l:"Maintain",SvgIcon:Ico.Wrench,d:"Reminders & cleaning tips",c:"#60a5fa"},{n:"05",l:"Repair",SvgIcon:Ico.Stethoscope,d:"Error codes & health checks",c:"#c084fc"}].map((s,i)=>{
                      const[hov,setHov]=useState(false);
                      return(
                        <div key={s.n} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                          style={{background:hov?`${s.c}08`:t.bgCard,border:`1px solid ${hov?`${s.c}33`:t.border}`,borderRadius:12,padding:"16px 14px",animation:`fadeUp .4s ease ${i*.07}s both`,transition:"all .22s",transform:hov?"translateY(-3px)":"none"}}>
                          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                            <span style={{fontFamily:H,fontSize:10,fontWeight:W.logo,color:s.c,opacity:.4}}>{s.n}</span>
                            <div style={{flex:1,height:1,background:`${s.c}20`}}/>
                            <s.SvgIcon s={16} c={s.c}/>
                          </div>
                          <div style={{fontFamily:H,fontSize:14,fontWeight:W.card,color:s.c,marginBottom:4}}>{s.l}</div>
                          <div style={{fontSize:12,color:t.sub,lineHeight:1.5}}>{s.d}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Newsletter — mobile only (keep), desktop hide if no space */}
                {sc.isMobile&&(
                  <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`,border:`1px solid rgba(${t.rgb},.15)`,borderRadius:16,padding:"20px"}}>
                    <h3 style={{fontFamily:H,fontSize:18,fontWeight:W.section,color:t.text,marginBottom:6}}>Solar Insights for SA Homeowners</h3>
                    <p style={{color:t.sub,fontSize:14,marginBottom:16,lineHeight:1.7}}>Weekly deals, maintenance tips and grid independence updates. No spam.</p>
                    <div style={{display:"flex",flexDirection:"column",gap:8}}>
                      {nlDone?(
                        <div style={{fontSize:13,color:"#4ade80",fontWeight:600,padding:"11px 0",display:"flex",alignItems:"center",gap:6}}><Ico.Check s={14} c="#4ade80"/> You're subscribed! Thanks.</div>
                      ):(
                        <>
                          <input value={nlEmail} onChange={e=>setNlEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveNewsletter()} placeholder="your@email.com" style={{flex:1,background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"11px 14px",color:t.text,fontSize:14,outline:"none",fontFamily:B,width:"100%"}}/>
                          <PBtn sm onClick={saveNewsletter} style={{borderRadius:9,padding:"11px 20px"}}>{nlSaving?"...":"Subscribe Free"}</PBtn>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            {tab==="calc"&&!res&&<Calculator onResult={r=>{setRes(r);setTab("result");}}/>}
            {tab==="result"&&res&&<Results r={res} onReset={()=>{setRes(null);setTab("home");}} goInstallers={()=>goTab("inst")}/>}
            {tab==="inst"&&<Installers/>}
            {tab==="serv"&&<Servicing/>}
            {tab==="blog"&&<Blog/>}
          </div>
        </div>
        {/* Footer */}
        <div style={{borderTop:`1px solid ${t.border}`,padding:"20px 28px",textAlign:"center",paddingBottom:sc.isMobile?80:20,flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,marginBottom:4}}>
            <LogoIcon s={16}/><span style={{fontFamily:H,fontSize:14,fontWeight:W.logo,letterSpacing:1,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></span>
          </div>
          <div style={{fontSize:12,color:t.sub}}>South Africa's complete solar platform.</div>
        </div>
        {/* Mobile bottom nav */}
        {sc.isMobile&&(
          <div style={{position:"fixed",bottom:0,left:0,right:0,background:t.navBg,backdropFilter:"blur(20px)",borderTop:`1px solid ${t.border}`,display:"flex",zIndex:200,paddingBottom:"env(safe-area-inset-bottom,0px)"}}>
            {NAV.map(x=>(
              <button key={x.id} onClick={()=>goTab(x.id)} style={{flex:1,background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 4px",cursor:"pointer",gap:3}}>
                <x.SvgIcon s={18} c={tab===x.id?t.accent:t.sub}/>
                <span style={{fontSize:9,fontWeight:600,color:tab===x.id?t.accent:t.sub,fontFamily:B,letterSpacing:.3}}>{x.l}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </T.Provider>
  );
}

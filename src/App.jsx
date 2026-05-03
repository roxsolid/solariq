import { useState, useEffect, createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://intvnxvannltfibguykw.supabase.co";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHZueHZhbm5sdGZpYmd1eWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzAwNjgsImV4cCI6MjA5MDA0NjA2OH0.KnPP0-vxXyBYTvHxbXfrH8AKd61u1hWpEO2gpjWnzNE";
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const DARK = { dark:true, accent:"#f5a623", accent2:"#ff6b00", rgb:"245,166,35", bg:"#07090d", bgCard:"rgba(255,255,255,.04)", bgCard2:"rgba(255,255,255,.07)", border:"rgba(255,255,255,.08)", text:"#f0f0f0", textMid:"#aaa", sub:"#555", navBg:"rgba(7,9,13,.95)", inputBg:"rgba(255,255,255,.06)" };
const LIGHT = { dark:false, accent:"#c47a0a", accent2:"#a05e00", rgb:"196,122,10", bg:"#edeae0", bgCard:"rgba(0,0,0,.06)", bgCard2:"rgba(0,0,0,.1)", border:"rgba(0,0,0,.14)", text:"#0f0f0f", textMid:"#333", sub:"#777", navBg:"rgba(237,234,224,.97)", inputBg:"rgba(0,0,0,.07)" };
const T = createContext(DARK);
const useT = () => useContext(T);
const H = "'Lexend',sans-serif";
const B = "'Plus Jakarta Sans',sans-serif";
const W = { logo:900, hero:900, section:700, card:700, sub:600 };

// ─── SVG ICONS ────────────────────────────────────────────────
const Ico = {
  Sun:      ({s=20,c="#f5a623"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" fill={c}/><line x1="12" y1="2" x2="12" y2="5" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="19" x2="12" y2="22" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="2" y1="12" x2="5" y2="12" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="19" y1="12" x2="22" y2="12" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="19.78" y1="4.22" x2="17.66" y2="6.34" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="6.34" y1="17.66" x2="4.22" y2="19.78" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  Zap:      ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Battery:  ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/></svg>,
  Home:     ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Building: ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="1"/><line x1="8" y1="7" x2="8" y2="7.01"/><line x1="12" y1="7" x2="12" y2="7.01"/><line x1="16" y1="7" x2="16" y2="7.01"/><line x1="8" y1="11" x2="8" y2="11.01"/><line x1="12" y1="11" x2="12" y2="11.01"/><line x1="16" y1="11" x2="16" y2="11.01"/><line x1="8" y1="15" x2="8" y2="15.01"/><line x1="12" y1="15" x2="12" y2="15.01"/></svg>,
  Plug:     ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="m6 6 12 12"/></svg>,
  Wrench:   ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  FileText: ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  Book:     ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Map:      ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  Search:   ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Settings: ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Phone:    ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Globe:    ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Check:    ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  TrendUp:  ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Shield:   ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Stethoscope:({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>,
  AlertTriangle:({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Calendar: ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  CreditCard:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Leaf:     ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
  // Appliance icons
  Lightbulb:({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
  Tv:       ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>,
  Fridge:   ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14H5V6z"/><line x1="5" y1="10" x2="19" y2="10"/><line x1="9" y1="14" x2="9" y2="17"/><line x1="9" y1="5" x2="9" y2="8"/></svg>,
  Wifi:     ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  Laptop:   ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>,
  Monitor:  ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Printer:  ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
  WashMachine:({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="12" cy="13" r="4"/><line x1="7" y1="6" x2="7.01" y2="6"/><line x1="11" y1="6" x2="11.01" y2="6"/></svg>,
  Flame:    ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  Droplets: ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>,
  Wind:     ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>,
  Waves:    ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2"/></svg>,
  Lock:     ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  DoorOpen: ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 4h3a2 2 0 0 1 2 2v14"/><path d="M2 20h3"/><path d="M13 20h9"/><path d="M10 12v.01"/><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561z"/></svg>,
  Sparkles: ({s=22,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/></svg>,
  Scale:    ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M7 21h10"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>,
  DollarSign:({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  Coins:    ({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>,
  ArrowRight:({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Chart:    ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
};

function useScreen() {
  const [w,setW] = useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{ const fn=()=>setW(window.innerWidth); window.addEventListener("resize",fn); return ()=>window.removeEventListener("resize",fn); },[]);
  return { w, isMobile:w<640, isTablet:w>=640&&w<1024, isDesktop:w>=1024 };
}

const RATE=3.20;
const APPLIANCES=[
  {id:"lights",  Icon:Ico.Lightbulb, name:"Lights",          w:10,  h:6,  cat:"essentials"},
  {id:"tv",      Icon:Ico.Tv,        name:"TV",               w:120, h:4,  cat:"essentials"},
  {id:"fridge",  Icon:Ico.Fridge,    name:"Fridge",           w:150, h:24, cat:"essentials"},
  {id:"wifi",    Icon:Ico.Wifi,      name:"WiFi Router",      w:15,  h:24, cat:"essentials"},
  {id:"phone",   Icon:Ico.Phone,     name:"Phone",            w:20,  h:3,  cat:"essentials"},
  {id:"laptop",  Icon:Ico.Laptop,    name:"Laptop",           w:65,  h:6,  cat:"work"},
  {id:"desktop", Icon:Ico.Monitor,   name:"Desktop PC",       w:300, h:6,  cat:"work"},
  {id:"printer", Icon:Ico.Printer,   name:"Printer",          w:50,  h:1,  cat:"work"},
  {id:"washing", Icon:Ico.WashMachine,name:"Washing Machine", w:500, h:1,  cat:"home"},
  {id:"microwave",Icon:Ico.Flame,    name:"Microwave",        w:1000,h:.5, cat:"home"},
  {id:"kettle",  Icon:Ico.Flame,     name:"Kettle",           w:2000,h:.25,cat:"home"},
  {id:"geyser",  Icon:Ico.Droplets,  name:"Geyser",           w:3000,h:2,  cat:"home"},
  {id:"aircon",  Icon:Ico.Wind,      name:"Air Con",          w:1500,h:4,  cat:"comfort"},
  {id:"pool",    Icon:Ico.Waves,     name:"Pool Pump",        w:1100,h:6,  cat:"comfort"},
  {id:"security",Icon:Ico.Lock,      name:"Security",         w:30,  h:24, cat:"comfort"},
  {id:"gate",    Icon:Ico.DoorOpen,  name:"Gate Motor",       w:200, h:.5, cat:"comfort"},
];
const QUIZ=[
  {id:"size",q:"What size is your home?",hint:"Helps estimate your total energy needs",opts:[
    {label:"Studio / 1 Bed",  Icon:Ico.Home,     v:"s",kwh:8},
    {label:"2–3 Bedroom",     Icon:Ico.Home,     v:"m",kwh:18},
    {label:"4+ Bedroom",      Icon:Ico.Building, v:"l",kwh:30},
    {label:"Small Business",  Icon:Ico.Building, v:"b",kwh:45}]},
  {id:"bill",q:"Your average monthly Eskom bill?",hint:"Roughly is fine",opts:[
    {label:"Under R800",      Icon:Ico.Coins,       v:"lo",mult:.6},
    {label:"R800–R2 000",     Icon:Ico.Coins,       v:"md",mult:1},
    {label:"R2 000–R5 000",   Icon:Ico.DollarSign,  v:"hi",mult:1.8},
    {label:"Over R5 000",     Icon:Ico.DollarSign,  v:"xh",mult:3}]},
  {id:"goal",q:"What matters most to you?",hint:"This shapes the whole recommendation",opts:[
    {label:"Survive load shedding", Icon:Ico.Battery, v:"bk",kw:3},
    {label:"Cut my bill",           Icon:Ico.Coins,   v:"sv",kw:5},
    {label:"Mostly off-grid",       Icon:Ico.Sun,     v:"og",kw:8},
    {label:"Full independence",     Icon:Ico.Zap,     v:"fo",kw:12}]},
  {id:"ls",q:"How bad is load shedding?",hint:"Determines your battery backup size",opts:[
    {label:"Rarely (Stage 1–2)", Icon:Ico.TrendUp,  v:"mi",bf:1},
    {label:"Often (Stage 3–4)",  Icon:Ico.Zap,      v:"mo",bf:1.5},
    {label:"Daily (Stage 5–6)",  Icon:Ico.Zap,      v:"sv",bf:2},
    {label:"Farm / Rural",       Icon:Ico.Leaf,     v:"ru",bf:2.5}]},
];
const INSTALLERS=[
  {id:1,name:"SunPower SA",city:"Johannesburg",prov:"Gauteng",rating:4.9,rev:312,sessa:true,jobs:847,yrs:12,badge:"Top Rated",resp:"2 hrs",spec:"Residential",brands:["Sunsynk","Victron"],price:"R80k–R200k",verified:true,about:"12 years installing solar across Gauteng. Specialise in hybrid systems for load shedding resilience. All installations include 5-year workmanship warranty.",website:"sunpowersa.co.za",finance:true,photos:["🏠","🔋","⚡"]},
  {id:2,name:"Cape Solar Pro",city:"Cape Town",prov:"Western Cape",rating:4.8,rev:198,sessa:true,jobs:523,yrs:9,badge:"Most Popular",resp:"3 hrs",spec:"Commercial & Residential",brands:["Deye","Sunsynk"],price:"R60k–R350k",verified:true,about:"Cape Town's leading solar installer for homes and businesses. Over 500 completed installations across the Western Cape.",website:"capesolar.co.za",finance:true,photos:["🏢","☀️","🔌"]},
  {id:3,name:"KZN Solar Solutions",city:"Durban",prov:"KwaZulu-Natal",rating:4.7,rev:143,sessa:true,jobs:389,yrs:7,badge:null,resp:"4 hrs",spec:"Off-grid",brands:["Victron","Pylontech"],price:"R70k–R250k",verified:true,about:"KZN specialists in off-grid and hybrid systems. Serving coastal and inland properties with custom energy solutions.",website:"kznsolar.co.za",finance:false,photos:["🌊","🔋","🏡"]},
  {id:4,name:"Pretoria Solar Works",city:"Pretoria",prov:"Gauteng",rating:4.6,rev:89,sessa:false,jobs:201,yrs:5,badge:"Fast Response",resp:"Same day",spec:"Residential",brands:["Growatt","Deye"],price:"R50k–R150k",verified:true,about:"Fast-response residential installer based in Pretoria. Same-day site assessments available. Competitive pricing with flexible payment options.",website:"pretoriasolar.co.za",finance:true,photos:["🏘️","⚙️","💡"]},
  {id:5,name:"Green Energy EC",city:"Port Elizabeth",prov:"Eastern Cape",rating:4.5,rev:67,sessa:true,jobs:156,yrs:6,badge:null,resp:"5 hrs",spec:"Agricultural",brands:["Victron","Sunsynk"],price:"R90k–R400k",verified:false,about:"Agricultural solar specialists serving farms across the Eastern Cape. Large system experience up to 100kW.",website:"greenenergy-ec.co.za",finance:false,photos:["🌾","🚜","☀️"]},
  {id:6,name:"Solar Hub BFN",city:"Bloemfontein",prov:"Free State",rating:4.4,rev:44,sessa:true,jobs:98,yrs:4,badge:null,resp:"6 hrs",spec:"Residential",brands:["Deye","Growatt"],price:"R45k–R130k",verified:true,about:"Free State's most affordable verified installer. Budget-conscious solutions without compromising on quality components.",website:"solarhub-bfn.co.za",finance:true,photos:["🏠","💰","🔋"]},
  {id:7,name:"Mpumalanga Solar",city:"Nelspruit",prov:"Mpumalanga",rating:4.6,rev:58,sessa:false,jobs:134,yrs:5,badge:null,resp:"4 hrs",spec:"Commercial",brands:["Sunsynk"],price:"R100k–R300k",verified:true,about:"Commercial solar solutions across Mpumalanga and Limpopo. Specialise in retail, hospitality and light industrial.",website:"mpusolar.co.za",finance:false,photos:["🏪","⚡","🌞"]},
  {id:8,name:"Northern Cape Solar",city:"Kimberley",prov:"Northern Cape",rating:4.8,rev:31,sessa:true,jobs:76,yrs:8,badge:"High PSH Zone",resp:"3 hrs",spec:"Off-grid & Agricultural",brands:["Victron","Pylontech"],price:"R80k–R500k",verified:true,about:"Operating in one of SA's highest solar irradiance zones. Off-grid experts for farms and remote properties across the Northern Cape.",website:"ncapesolar.co.za",finance:false,photos:["🌵","🔆","🏚️"]},
];
const PROVS=["All","Gauteng","Western Cape","KwaZulu-Natal","Eastern Cape","Free State","Mpumalanga","Northern Cape"];
const SPECS=["All","Residential","Commercial","Off-grid","Agricultural","Commercial & Residential","Off-grid & Agricultural"];
const BRANDS=["All","Sunsynk","Victron","Deye","Growatt","Pylontech"];
const TECHS=[
  {id:1,name:"FixSolar SA",prov:"Gauteng",city:"Johannesburg",spec:"Inverter Repair",rating:4.9,rev:203,price:"R450/hr",emergency:true,brands:["Victron","Sunsynk","Deye"],yrs:8,about:"Inverter repair specialists with same-day callouts across Gauteng. All major brands serviced. Genuine parts only.",website:"fixsolar.co.za",photos:["🔧","⚡","🛠️"]},
  {id:2,name:"Panel Clean Pro",prov:"Western Cape",city:"Cape Town",spec:"Panel Cleaning",rating:4.8,rev:156,price:"R85/panel",emergency:false,brands:["All brands"],yrs:5,about:"Professional panel cleaning using deionised water systems. Proven to restore 15–25% lost efficiency. Regular contracts available.",website:"panelclean.co.za",photos:["🧽","☀️","✨"]},
  {id:3,name:"Battery Doctors",prov:"Gauteng",city:"Pretoria",spec:"Battery Replacement",rating:4.7,rev:98,price:"From R1 200",emergency:true,brands:["Pylontech","BSL","Freedom Won"],yrs:6,about:"Battery health diagnostics and replacement across Gauteng. Full BMS configuration included. Emergency callouts 24/7.",website:"batterydoctors.co.za",photos:["🔋","🩺","⚡"]},
  {id:4,name:"Solar Doctor KZN",prov:"KwaZulu-Natal",city:"Durban",spec:"Full System Service",rating:4.8,rev:87,price:"R1 800",emergency:false,brands:["All brands"],yrs:7,about:"Comprehensive annual service packages for all system types. Includes panel inspection, inverter check, battery test and full report.",website:"solardoctor-kzn.co.za",photos:["🩺","📋","🔌"]},
];
const ERRORS={"F01":{brand:"Sunsynk",title:"Grid voltage too high",sev:"warning",diy:true,fix:"Grid voltage above safe range — usually Eskom. Resolves itself. If it persists over 2 hours, contact your installer.",specs:["Inverter Repair"]},"F02":{brand:"Sunsynk",title:"Grid voltage too low",sev:"warning",diy:true,fix:"Grid voltage dropping below safe threshold. Common during load shedding transitions. System auto-switches to battery.",specs:["Inverter Repair"]},"F32":{brand:"Sunsynk",title:"Battery over-temperature",sev:"critical",diy:false,fix:"Battery overheating. Ensure ventilation immediately. Do NOT continue using — contact technician urgently.",specs:["Battery Replacement","Full System Service"]},"E001":{brand:"Victron",title:"Low battery shutdown",sev:"warning",diy:true,fix:"Battery depleted to minimum safe level. Will resume charging once power is available.",specs:["Battery Replacement"]},"E002":{brand:"Victron",title:"Overload — too much drawn",sev:"warning",diy:true,fix:"Drawing more power than inverter can handle. Switch off heavy appliances and restart.",specs:["Inverter Repair"]},"E003":{brand:"Victron",title:"Inverter overheating",sev:"critical",diy:false,fix:"Switch off immediately. Ensure 20cm clearance on all sides. Do not restart until cool.",specs:["Inverter Repair","Full System Service"]},"W001":{brand:"Deye",title:"PV input voltage high",sev:"info",diy:true,fix:"Panel voltage slightly above optimal. Usually resolves as panels cool. Monitor for 24 hours.",specs:["Full System Service"]},"W003":{brand:"Deye",title:"Grid frequency out of range",sev:"warning",diy:true,fix:"Eskom frequency unstable. Normal during load shedding transitions.",specs:["Inverter Repair"]},"G01":{brand:"Growatt",title:"No grid connection detected",sev:"info",diy:true,fix:"Check your mains breaker first. If mains is on and not load shedding, contact your installer.",specs:["Inverter Repair"]},"G05":{brand:"Growatt",title:"Insulation resistance fault",sev:"critical",diy:false,fix:"Serious fault. Switch off at DC isolator immediately. Call a qualified electrician now.",specs:["Full System Service","Inverter Repair"]}};
const HEALTH_QS=[{id:"age",q:"How old is your solar system?",opts:["Under 1 year","1–3 years","3–5 years","5+ years"]},{id:"perf",q:"Is your system performing as expected?",opts:["Yes, performing well","Slightly less than before","Much worse than before","Not sure"]},{id:"snd",q:"Any unusual sounds from your inverter?",opts:["No unusual sounds","Occasional clicking","Constant humming/buzzing","Loud unusual noise"]},{id:"err",q:"Any error codes or warning lights?",opts:["No errors","Occasional warnings","Regular error codes","System offline"]},{id:"cln",q:"When were your panels last cleaned?",opts:["Within 3 months","3–6 months ago","Over 6 months ago","Never cleaned"]},{id:"svc",q:"Has your system had a professional service?",opts:["Within the year","1–2 years ago","Never been serviced","Not sure"]}];
const ARTICLES=[
  {id:1,tag:"Guide",hot:true,min:"7",views:"12.4k",title:"How much does a 5kW solar system cost in SA in 2026?",intro:"Solar prices have dropped. Here's exactly what a complete 5kW system costs installed — and what drives the price.",body:[{h:"What's included?",p:"When an installer quotes a '5kW system' they mean the inverter size. A complete system includes inverter, 8–10 solar panels, battery bank, mounting, cabling and labour. Never compare quotes without confirming what's included."},{h:"Prices in 2026",p:"A 5kW hybrid system with 10kWh lithium battery typically costs R85,000–R140,000 fully installed. Gauteng tends to be cheaper than Cape Town due to higher competition."},{h:"The tax rebate most miss",p:"SARS allows 25% of solar panel cost as a tax rebate — capped at R15,000. On R50,000 in panels that's R12,500 back. Claim via your ITR12 on eFiling."},{h:"Bottom line",p:"Budget R90,000–R120,000 for a quality system. Monthly savings of R1,500–R3,500 mean payback in 4–7 years. After that it's free electricity."}],related:[2,3,6]},
  {id:2,tag:"Comparison",hot:true,min:"9",views:"8.9k",title:"Sunsynk vs Deye vs Victron — which inverter is best for SA?",intro:"Three brands dominate the SA inverter market. An honest comparison — no sponsorships.",body:[{h:"Sunsynk — the SA favourite",p:"South African-designed, handles Eskom's unstable grid well, local support. Price: R12,000–R22,000. Best for typical SA suburban home dealing with load shedding."},{h:"Deye — the value king",p:"Chinese-manufactured, best spec-per-rand. Solid reliability. Price: R8,000–R16,000. Best for budget-conscious buyers."},{h:"Victron — the premium choice",p:"Dutch-engineered gold standard. Best monitoring, fully modular. Price: R18,000–R45,000. Best for off-grid or premium installs."},{h:"Verdict",p:"For most SA homeowners: Sunsynk. Budget: Deye. Off-grid or premium: Victron. Avoid cheap generic brands."}],related:[1,3,5]},
  {id:3,tag:"Tax",hot:false,min:"5",views:"6.2k",title:"How to claim your solar tax rebate from SARS — step by step",intro:"Most SA homeowners don't claim this. Here's exactly how to get up to R15,000 back.",body:[{h:"What qualifies?",p:"Only new and unused solar PV panels. Batteries, inverters, mounting, cabling and labour do not qualify."},{h:"How much?",p:"25% of panel cost, capped at R15,000. This is a rebate against your tax liability."},{h:"Documents needed",p:"Original invoice showing panel brand, model, wattage and cost separately. Certificate of compliance. Proof of payment."},{h:"How to claim",p:"On your ITR12 eFiling return, find Solar Energy Tax Credit. Enter the qualifying panel cost. SARS calculates the 25% automatically."}],related:[1,4,6]},
  {id:4,tag:"Maintenance",hot:false,min:"6",views:"4.8k",title:"Is your solar system actually working properly? 7 signs it isn't",intro:"Many SA solar systems quietly underperform for months. Here are the warning signs.",body:[{h:"Backup doesn't last as long",p:"Battery used to last 4 hours, now 2? Capacity has degraded or charge settings are wrong. Lithium should retain 80% after 3,000 cycles."},{h:"Still getting high Eskom bills",p:"If your bill hasn't dropped, system may be undersized, panels shaded, or inverter settings wrong."},{h:"Panels not cleaned in 6+ months",p:"Dirty panels lose up to 25% efficiency. R85–R150 per panel every 3–6 months is the best maintenance you can do."},{h:"Ignoring error codes",p:"Some sort themselves out. Others are early warnings. Use the Error Code Translator in the Servicing tab."}],related:[1,2,3]},
  {id:5,tag:"Guide",hot:false,min:"8",views:"3.9k",title:"Off-grid vs grid-tied solar in South Africa — the honest truth",intro:"The dream of zero electricity bill is real — but not for everyone.",body:[{h:"Grid-tied: cheapest, useless in load shedding",p:"No battery, no backup. System switches off during load shedding. Only makes sense if you're never affected."},{h:"Hybrid: the SA sweet spot",p:"Grid plus battery. Handles load shedding, reduces bill. What 95% of SA residential installations should be. Cost: R80,000–R200,000."},{h:"Off-grid: freedom, but expensive",p:"Needs 3× the battery capacity of hybrid. Makes sense for farms — not most SA suburbs."},{h:"Recommendation",p:"For urban SA: go hybrid. Size battery for 2× your load shedding hours with 20% buffer."}],related:[1,2,6]},
  {id:6,tag:"Comparison",hot:true,min:"10",views:"7.1k",title:"Best solar panels available in South Africa — ranked 2026",intro:"Not all solar panels are equal. The top panels available through SA installers right now.",body:[{h:"What to look for",p:"Four numbers: efficiency %, power output (Wp), annual degradation (aim under 0.5%/year), and product warranty (25 years standard)."},{h:"Tier 1: JA Solar & Longi",p:"Bloomberg Tier 1 bankable panels. Dominate SA installations. Efficiency 21–22.5%. R2,200–R3,200 per 550Wp panel."},{h:"Tier 1: Canadian Solar",p:"Strong warranty support, 20.5–21.5% efficiency, available through most SA distributors."},{h:"What to avoid",p:"Generic unbranded panels. No local warranty means a fault in year 5 is entirely your problem."}],related:[1,2,5]},
  {id:7,tag:"News",hot:true,min:"5",views:"3.1k",title:"Sodium-ion batteries are coming to SA — and they could change everything",intro:"A new battery technology is making its way to South Africa. Cheaper than lithium, no cobalt, doesn't catch fire.",coverImg:"https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",photos:[{url:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",caption:"Sodium-ion cell construction differs fundamentally from lithium"},{url:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",caption:"Manufacturing scale-up is driving costs down rapidly"}],body:[{h:"What is sodium-ion?",p:"Sodium-ion batteries work on the same principle as lithium-ion — ions move between electrodes to store and release energy. The key difference: sodium instead of lithium. Sodium is the 6th most abundant element on Earth. Lithium is scarce and concentrated in a handful of countries."},{h:"Why it matters for South Africa",p:"SA's solar market has boomed since 2022 load shedding hit Stage 6. Demand for batteries has pushed prices up and created supply shortages. Sodium-ion could break this bottleneck — manufactured anywhere, without the rare minerals that make lithium expensive."},{h:"The specs that matter",p:"Current Na-ion cells hit 140–160 Wh/kg energy density — roughly 70–80% of entry-level LFP lithium. Slightly larger pack for the same storage. But: safer chemistry, longer cycle life in extreme temperatures, and projected costs 20–30% below lithium by 2027."},{h:"Who's bringing it to market",p:"CATL — the world's largest battery manufacturer — announced mass production of Na-ion cells in 2023. BYD has a parallel programme. Both supply Deye, Sunsynk and other brands sold in SA. First Na-ion home storage products expected locally by late 2026."},{h:"Should you wait?",p:"No. If you need solar now, install lithium LFP — it's proven, warrantied and available. Na-ion is 12–18 months away from hitting SA shelves at competitive prices. Think of it as a future upgrade option, not a reason to delay."}],related:[1,2,6]},
  {id:8,tag:"Review",hot:false,min:"11",views:"2.4k",title:"Pylontech US3000C review — is it still the best home battery for SA in 2026?",intro:"The Pylontech US3000C has been SA's most popular home battery for three years. We tested one in a real Johannesburg household for 60 days.",coverImg:"https://images.unsplash.com/photo-1620714223084-8fcacc2dbe6d?w=800&q=80",photos:[{url:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",caption:"The US3000C rack-mount design makes installation clean and expandable"},{url:"https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",caption:"BMS data via the Pylontech app during our 60-day test period"}],youtubeId:"dQw4w9WgXcQ",youtubeTitle:"Pylontech US3000C — Full Installation & 60-Day Performance Review",affiliate:{url:"https://example.co.za/pylontech-us3000c",label:"Check current price at SolarAdvice →",disclosure:"SolarIQ earns a small commission if you purchase through this link. This does not affect our review — we tested this unit independently."},body:[{h:"Specs at a glance",p:"3.5kWh usable capacity per unit. 48V nominal. LFP chemistry. 6,000 cycle life rated to 80% capacity retention. Max 74A charge/discharge. CAN/RS485 comms. Stackable to 8 units (28kWh). Weight: 34kg."},{h:"Installation experience",p:"The US3000C comes with clear documentation and BMS communications cable included. Pairing with a Sunsynk 5kW hybrid took about 40 minutes including rack mounting. CAN communication detected the battery automatically — no manual parameter setting required."},{h:"Real-world performance — 60 days",p:"Test home: 3-bedroom in Northcliff, Johannesburg. Average daily consumption: 22kWh. Single US3000C (3.5kWh usable). Load shedding: Stage 4 most of the test period. The battery handled a 2-hour Stage 4 slot comfortably running lights, WiFi, TV and a small fridge."},{h:"What we liked",p:"Build quality is exceptional — the rack feels industrial-grade. BMS communication is rock solid. After 200 charge cycles during the test, capacity showed zero measurable degradation. Pylontech's local warranty support is the best in the market."},{h:"What could be better",p:"The 3.5kWh per unit means you need two for most SA households — R28,000–R34,000 for two units before installation. The newer US5000 (4.8kWh) offers better value per kWh. The app is functional but dated."},{h:"Verdict",p:"Still one of the safest bets in the SA market. The US3000C earns its reputation through consistency, local support and bulletproof BMS communications. If budget allows, look at the US5000 for better kWh-per-rand. If your installer quotes US3000C — don't hesitate."}],rating:{overall:4.4,value:4.0,build:5.0,software:3.5,support:4.5},related:[1,2,6]},
];

function useCount(x,ms=1300){const[v,setV]=useState(0);useEffect(()=>{let s=null;const f=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/ms,1);setV(Math.floor((1-Math.pow(1-p,3))*x));if(p<1)requestAnimationFrame(f);};requestAnimationFrame(f);},[x]);return v;}
function makeResult(d,k,bf=1.5){
  const invKva=Math.max(3,Math.ceil(k*1.25));
  const mo=Math.round(d*30*RATE),cost=Math.round(k*18000),save=Math.round(mo*12*.75);
  return{systemKw:k,battKwh:Math.round(k*bf*10)/10,invKva,cost,annSave:save,mo,payback:(cost/save).toFixed(1),dailyKwh:Math.round(d*10)/10,panels:Math.ceil(k/.55)};
}
function PBtn({children,onClick,disabled,sm,style={}}){const t=useT();return <button onClick={onClick} disabled={disabled} style={{background:disabled?"rgba(128,128,128,.15)":`linear-gradient(135deg,${t.accent},${t.accent2})`,color:disabled?"#666":t.dark?"#000":"#fff",border:"none",borderRadius:30,padding:sm?"10px 20px":"13px 28px",fontSize:sm?13:14,fontWeight:800,cursor:disabled?"not-allowed":"pointer",fontFamily:B,transition:"all .2s",...style}}>{children}</button>;}
function Lbl({children,center}){const t=useT();return <div style={{fontSize:11,color:t.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:2.5,marginBottom:8,fontFamily:B,textAlign:center?"center":"left"}}>{children}</div>;}
function BackBtn({onClick}){const t=useT();return <button onClick={onClick} style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",gap:6,fontWeight:600,marginBottom:20,padding:0,fontFamily:B}}>← Back</button>;}
function Tag({children,color}){const t=useT();const c=color||t.accent;return <span style={{fontSize:10,fontWeight:700,background:`${c}18`,color:c,padding:"3px 9px",borderRadius:20,letterSpacing:.5}}>{children}</span>;}
function Stars({n}){return <span style={{color:"#f0c040",fontSize:12}}>{"★".repeat(Math.floor(n))}<span style={{color:"#555"}}> {n}</span></span>;}

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
          <button onClick={()=>up(k,Math.max(min,parseFloat((v[k]-step).toFixed(2))))}
            style={{width:34,height:34,borderRadius:8,background:`rgba(${t.rgb},.12)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.text,cursor:"pointer",fontSize:20,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,lineHeight:1,fontFamily:B}}>−</button>
          <div style={{textAlign:"center",minWidth:58,flexShrink:0}}>
            <div style={{fontFamily:"monospace",fontSize:16,fontWeight:800,color:t.accent}}>{v[k]}</div>
            <div style={{fontSize:9,color:t.sub}}>{unit}</div>
          </div>
          <button onClick={()=>up(k,Math.min(max,parseFloat((v[k]+step).toFixed(2))))}
            style={{width:34,height:34,borderRadius:8,background:`rgba(${t.rgb},.12)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.text,cursor:"pointer",fontSize:20,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,lineHeight:1,fontFamily:B}}>+</button>
        </div>
      </div>
    </div>
  );

  const SecHead=({id,SvgIcon,label})=>(
    <button onClick={()=>tog(id)} style={{width:"100%",background:"none",border:"none",display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"7px 0",marginBottom:open[id]?10:0}}>
      <SvgIcon s={14} c={t.accent}/>
      <span style={{fontSize:10,color:t.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:2,fontFamily:B,flex:1,textAlign:"left"}}>{label}</span>
      <span style={{fontSize:14,color:t.sub,transition:"transform .25s",display:"inline-block",transform:open[id]?"rotate(90deg)":"rotate(0deg)"}}>›</span>
    </button>
  );

  const results=(
    <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.1),rgba(${t.rgb},.04))`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:16,padding:"18px"}}>
      <div style={{fontSize:10,color:t.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:14,fontFamily:B,display:"flex",alignItems:"center",gap:6}}><Ico.Chart s={12} c={t.accent}/> Live Results</div>
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
        <div style={{background:`rgba(${t.rgb},.06)`,borderRadius:9,padding:"9px 12px"}}>
          <div style={{fontSize:10,color:t.sub,marginBottom:2}}>Payback</div>
          <div style={{fontFamily:H,fontSize:18,fontWeight:W.hero,color:t.accent}}>{payback} yrs</div>
        </div>
      </div>
      <div style={{background:t.dark?"rgba(0,0,0,.3)":"rgba(0,0,0,.05)",borderRadius:9,padding:"10px 13px",fontFamily:"monospace",fontSize:11,color:t.sub,lineHeight:1.9}}>
        <div style={{color:t.accent,fontWeight:700,marginBottom:3}}>// Technical Specification</div>
        <div>Load: {v.kwh} kWh/day @ {v.psh} PSH</div>
        <div>PV: {panels} × 550Wp = {syskw.toFixed(2)} kWp</div>
        <div>Battery: {v.batAh}Ah × {v.batV}V × {v.dod}% = {batKwh.toFixed(2)} kWh</div>
        <div>Type: {v.type}</div>
      </div>
      <PBtn style={{width:"100%",marginTop:12}} onClick={()=>onResult(makeResult(v.kwh,parseFloat(syskw.toFixed(1))))}>Generate Full Report →</PBtn>
    </div>
  );

  const inputs=(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
        <div style={{width:36,height:36,borderRadius:9,background:`rgba(${t.rgb},.12)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ico.Settings s={18} c={t.accent}/></div>
        <div>
          <div style={{fontFamily:H,fontSize:22,fontWeight:W.hero,color:t.text}}>Pro Calculator</div>
          <div style={{fontSize:12,color:t.sub}}>Full technical parameters — for engineers and enthusiasts</div>
        </div>
      </div>
      <div style={{background:`rgba(${t.rgb},.05)`,border:`1px solid rgba(${t.rgb},.15)`,borderRadius:10,padding:"9px 14px",marginBottom:16,display:"flex",gap:8,alignItems:"center"}}>
        <Ico.Lightbulb s={14} c={t.accent}/><span style={{fontSize:12,color:t.sub}}>Tap + / − to adjust. Results update live.</span>
      </div>
      {/* Load & Generation */}
      <div style={{marginBottom:4}}>
        <SecHead id="load" SvgIcon={Ico.Zap} label="Load & Generation"/>
        {open.load&&(
          <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr":"1fr 1fr",gap:8,marginBottom:14}}>
            <NI k="kwh" label="Daily Consumption" desc="Total kWh/day" min={1} max={150} step={0.5} unit="kWh/day"/>
            <NI k="psh" label="Peak Sun Hours" desc="SA avg 4.5–5.5 hrs" min={2} max={7} step={0.1} unit="hours"/>
            <NI k="loss" label="System Losses" desc="Wiring + inverter + temp" min={5} max={40} step={1} unit="%"/>
            <NI k="invKva" label="Inverter Size" desc="Handle peak load + 20%" min={1} max={30} step={0.5} unit="kVA"/>
          </div>
        )}
      </div>
      {/* Battery Bank — single column on mobile so buttons never clip */}
      <div style={{marginBottom:4}}>
        <SecHead id="battery" SvgIcon={Ico.Battery} label="Battery Bank"/>
        {open.battery&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr",gap:8,marginBottom:14}}>
            <NI k="batAh" label="Capacity (Amp-hours)" desc="Total Ah" min={50} max={2000} step={25} unit="Ah"/>
            <NI k="batV" label="Voltage" desc="12 / 24 / 48V" min={12} max={96} step={12} unit="V"/>
            <NI k="dod" label="Depth of Discharge" desc="LiFePO4: 90%" min={20} max={100} step={5} unit="%"/>
          </div>
        )}
      </div>
      {/* System Type */}
      <div style={{marginBottom:14}}>
        <SecHead id="type" SvgIcon={Ico.Settings} label="System Type"/>
        {open.type&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:4}}>
            {[["hybrid","Hybrid","SA sweet spot"],["gridtied","Grid-Tied","No battery"],["offgrid","Off-Grid","Full independence"]].map(([k,lbl,desc])=>(
              <div key={k} onClick={()=>up("type",k)} style={{background:v.type===k?`rgba(${t.rgb},.1)`:t.bgCard,border:`1px solid ${v.type===k?`rgba(${t.rgb},.35)`:t.border}`,borderRadius:12,padding:"12px 10px",cursor:"pointer",textAlign:"center",transition:"all .2s"}}>
                <div style={{width:14,height:14,borderRadius:3,background:v.type===k?t.accent:"transparent",border:`2px solid ${v.type===k?t.accent:t.sub}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 6px"}}>
                  {v.type===k&&<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={t.dark?"#000":"#fff"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div style={{fontSize:13,fontWeight:W.card,color:v.type===k?t.accent:t.text,fontFamily:H}}>{lbl}</div>
                <div style={{fontSize:10,color:t.sub,marginTop:2}}>{desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return sc.isDesktop?(
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,alignItems:"start"}}>
      <div>{inputs}</div>
      <div style={{position:"sticky",top:80}}>{results}</div>
    </div>
  ):(
    <div>{inputs}{results}</div>
  );
}

function Calculator({onResult}){
  const t=useT();const sc=useScreen();
  const[mode,setMode]=useState(null);const[step,setStep]=useState(0);const[ans,setAns]=useState({});
  const[apps,setApps]=useState({});const[bill,setBill]=useState("");const[cat,setCat]=useState("essentials");
  const[fade,setFade]=useState(false);
  const go=fn=>{setFade(true);setTimeout(()=>{fn();setFade(false);},200);};
  const appCount=Object.values(apps).filter(h=>h>0).length;
  const fromApps=()=>{const wh=Object.entries(apps).reduce((s,[id,h])=>{const a=APPLIANCES.find(x=>x.id===id);return s+(a&&h>0?a.w*h:0);},0);const d=wh/1000;onResult(makeResult(d,Math.max(2,Math.ceil(d/4))));};
  const fromBill=()=>{const b=parseFloat(bill);if(!b)return;const d=b/RATE/30;onResult(makeResult(d,Math.max(2,Math.ceil(d/4))));};

  if(!mode)return(
    <div style={{opacity:fade?0:1,transition:"opacity .2s",animation:"fadeUp .5s ease"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`rgba(${t.rgb},.08)`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:20,padding:"5px 14px",marginBottom:16}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:t.accent,display:"inline-block"}}/>
          <span style={{fontSize:11,color:t.accent,fontWeight:700,letterSpacing:1}}>NO TECHNICAL KNOWLEDGE NEEDED</span>
        </div>
        <h2 style={{fontFamily:H,fontSize:"clamp(26px,4vw,42px)",fontWeight:W.hero,color:t.text,lineHeight:1.05,marginBottom:10}}>Find Your Perfect Solar Setup</h2>
        <p style={{color:t.sub,fontSize:14,maxWidth:400,margin:"0 auto",lineHeight:1.7}}>Four ways to calculate — pick the one that suits you.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"repeat(4,1fr)":"1fr 1fr",gap:12}}>
        {[{k:"simple",Icon:Ico.Sparkles,title:"Quick & Easy",sub:"4 questions. 60 seconds.",badge:"Most Popular"},{k:"appliance",Icon:Ico.Plug,title:"By Appliances",sub:"Pick every device you own.",badge:"Most Accurate"},{k:"bill",Icon:Ico.FileText,title:"From My Bill",sub:"Enter your Eskom bill.",badge:"Fastest"},{k:"engineer",Icon:Ico.Settings,title:"Pro Calculator",sub:"Full technical inputs.",badge:"Pro"}].map(c=>(
          <div key={c.k} onClick={()=>go(()=>setMode(c.k))} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:16,padding:"22px 18px",cursor:"pointer",transition:"all .2s",position:"relative"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.4)`;e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
            <div style={{position:"absolute",top:10,right:10,fontSize:9,background:`rgba(${t.rgb},.15)`,color:t.accent,padding:"2px 7px",borderRadius:10,fontWeight:700}}>{c.badge}</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:48,height:48,borderRadius:14,background:`rgba(${t.rgb},.1)`,marginBottom:12}}><c.Icon s={22} c={t.accent}/></div>
            <div style={{fontFamily:H,fontSize:18,fontWeight:W.card,color:t.text,marginBottom:5}}>{c.title}</div>
            <div style={{fontSize:12,color:t.sub,lineHeight:1.5}}>{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if(mode==="engineer")return(<div style={{opacity:fade?0:1,transition:"opacity .2s"}}><BackBtn onClick={()=>go(()=>setMode(null))}/><ProCalc onResult={onResult}/></div>);

  if(mode==="bill")return(
    <div style={{opacity:fade?0:1,transition:"opacity .2s",animation:"fadeUp .4s ease"}}>
      <BackBtn onClick={()=>go(()=>setMode(null))}/>
      <div style={{maxWidth:520,margin:"0 auto",textAlign:"center"}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:10}}><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
        <h3 style={{fontFamily:H,fontSize:26,fontWeight:W.section,color:t.text,marginBottom:5}}>Your Monthly Bill</h3>
        <p style={{color:t.sub,fontSize:14,marginBottom:22}}>Enter approximately what you pay Eskom per month</p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:16}}>
          <span style={{fontSize:26,color:t.accent,fontWeight:700}}>R</span>
          <input type="number" placeholder="0" value={bill} onChange={e=>setBill(e.target.value)}
            style={{background:"transparent",border:"none",outline:"none",fontSize:sc.isMobile?44:56,fontFamily:H,fontWeight:W.hero,color:t.text,width:200,textAlign:"center"}}/>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:20,flexWrap:"wrap"}}>
          {[500,1200,2500,4000].map(n=>(
            <button key={n} onClick={()=>setBill(String(n))} style={{background:bill==n?`rgba(${t.rgb},.15)`:t.bgCard,border:`1px solid ${bill==n?t.accent:t.border}`,color:bill==n?t.accent:t.sub,padding:"8px 16px",borderRadius:25,cursor:"pointer",fontSize:13,fontWeight:600,transition:"all .2s",fontFamily:B}}>R{n.toLocaleString()}</button>
          ))}
        </div>
        <PBtn onClick={fromBill} disabled={!bill} style={{maxWidth:320,margin:"0 auto",display:"block"}}>Calculate My System →</PBtn>
      </div>
    </div>
  );

  if(mode==="appliance")return(
    <div style={{opacity:fade?0:1,transition:"opacity .2s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <BackBtn onClick={()=>go(()=>setMode(null))}/>
        {appCount>0&&<div style={{fontSize:12,color:t.accent,background:`rgba(${t.rgb},.1)`,padding:"4px 12px",borderRadius:20,fontWeight:700}}>{appCount} selected</div>}
      </div>
      <h3 style={{fontFamily:H,fontSize:24,fontWeight:W.section,color:t.text,marginBottom:3}}>Select Your Appliances</h3>
      <p style={{color:t.sub,fontSize:13,marginBottom:13}}>Tap each one you use regularly</p>
      <div style={{display:"flex",borderBottom:`1px solid ${t.border}`,marginBottom:16,overflowX:"auto"}}>
        {["essentials","work","home","comfort"].map(c=><button key={c} onClick={()=>setCat(c)} style={{background:"none",border:"none",borderBottom:`2px solid ${cat===c?t.accent:"transparent"}`,color:cat===c?t.accent:t.sub,padding:"7px 14px",cursor:"pointer",fontSize:13,fontWeight:600,textTransform:"capitalize",transition:"all .2s",fontFamily:B,whiteSpace:"nowrap"}}>{c}</button>)}
      </div>
      {/* More columns on desktop */}
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"repeat(auto-fill,minmax(130px,1fr))":sc.isTablet?"repeat(auto-fill,minmax(120px,1fr))":"repeat(auto-fill,minmax(100px,1fr))",gap:10,marginBottom:24}}>
        {APPLIANCES.filter(a=>a.cat===cat).map(app=>{
          const active=apps[app.id]>0,hrs=apps[app.id]||0;
          return(
            <div key={app.id} style={{background:active?`rgba(${t.rgb},.08)`:t.bgCard,border:`1px solid ${active?`rgba(${t.rgb},.4)`:t.border}`,borderRadius:14,padding:12,textAlign:"center",transition:"all .2s",cursor:"pointer"}}
              onClick={active?undefined:()=>setApps({...apps,[app.id]:app.h})}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:40,height:40,borderRadius:10,background:active?`rgba(${t.rgb},.12)`:t.bgCard2,margin:"0 auto 6px"}}><app.Icon s={20} c={active?t.accent:t.sub}/></div>
              <div style={{fontSize:12,fontWeight:600,color:active?t.text:t.sub,marginBottom:2,fontFamily:B}}>{app.name}</div>
              <div style={{fontSize:10,color:t.sub,opacity:.7}}>{app.w}W</div>
              {active&&(
                <div style={{marginTop:8}}>
                  <div style={{fontSize:9,color:t.sub,marginBottom:4}}>hrs/day</div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                    <button onClick={e=>{e.stopPropagation();setApps({...apps,[app.id]:Math.max(.25,hrs-.25)});}} style={{background:`rgba(${t.rgb},.15)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.text,width:28,height:28,borderRadius:7,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>-</button>
                    <span style={{fontSize:13,fontWeight:800,color:t.accent,minWidth:24,textAlign:"center"}}>{hrs}</span>
                    <button onClick={e=>{e.stopPropagation();setApps({...apps,[app.id]:Math.min(24,hrs+.25)});}} style={{background:`rgba(${t.rgb},.15)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.text,width:28,height:28,borderRadius:7,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
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

  const q=QUIZ[step];
  return(
    <div style={{opacity:fade?0:1,transition:"opacity .2s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <BackBtn onClick={()=>step===0?go(()=>setMode(null)):go(()=>setStep(s=>s-1))}/>
        <div style={{display:"flex",gap:4}}>{QUIZ.map((_,i)=><div key={i} style={{width:i===step?20:6,height:6,borderRadius:3,background:i<=step?t.accent:`rgba(${t.rgb},.15)`,transition:"all .3s"}}/>)}</div>
        <div style={{fontSize:12,color:t.sub,fontWeight:600}}>{step+1}/{QUIZ.length}</div>
      </div>
      <div key={step} style={{animation:"fadeUp .3s ease",maxWidth:680,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <h3 style={{fontFamily:H,fontSize:"clamp(18px,3vw,28px)",fontWeight:W.section,color:t.text,marginBottom:5}}>{q.q}</h3>
          <p style={{color:t.sub,fontSize:13}}>{q.hint}</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {q.opts.map(o=>{const sel=ans[q.id]===o.v;return(
            <button key={o.v} onClick={()=>{const na={...ans,[q.id]:o.v};setAns(na);if(step<QUIZ.length-1)setTimeout(()=>go(()=>setStep(s=>s+1)),180);else setTimeout(()=>{const sz=QUIZ[0].opts.find(x=>x.v===na[QUIZ[0].id]);const bl=QUIZ[1].opts.find(x=>x.v===na[QUIZ[1].id]);const gl=QUIZ[2].opts.find(x=>x.v===na[QUIZ[2].id]);const ls=QUIZ[3].opts.find(x=>x.v===na[QUIZ[3].id]);onResult(makeResult((sz?.kwh||18)*(bl?.mult||1),gl?.kw||5,ls?.bf||1.5));},200);}}
              style={{background:sel?`rgba(${t.rgb},.12)`:t.bgCard,border:`1px solid ${sel?t.accent:t.border}`,borderRadius:14,padding:"18px 14px",cursor:"pointer",textAlign:"left",transition:"all .2s"}}
              onMouseEnter={e=>{if(!sel){e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`;e.currentTarget.style.transform="translateY(-2px)";}}}
              onMouseLeave={e=>{if(!sel){e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:44,height:44,borderRadius:12,background:`rgba(${t.rgb},.1)`,marginBottom:8}}><o.Icon s={22} c={t.accent}/></div>
              <div style={{fontFamily:H,fontSize:sc.isMobile?14:16,fontWeight:W.card,color:sel?t.accent:t.text}}>{o.label}</div>
            </button>
          );})}
        </div>
      </div>
    </div>
  );
}

function Results({r,onReset,goInstallers}){
  const t=useT();const sc=useScreen();const aC=useCount(r.cost);const aS=useCount(r.annSave);
  const hero=(
    <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.12),rgba(${t.rgb},.05))`,border:`1px solid rgba(${t.rgb},.22)`,borderRadius:20,padding:"24px",textAlign:"center",marginBottom:12}}>
      <Lbl center>Recommended System</Lbl>
      <div style={{fontFamily:H,fontSize:"clamp(52px,8vw,80px)",fontWeight:W.hero,color:t.text,lineHeight:1,marginBottom:4}}>
        {r.systemKw}<span style={{fontSize:"0.38em",color:t.accent}}>kW</span>
      </div>
      <div style={{color:t.sub,marginBottom:20}}>with {r.battKwh}kWh battery · {r.panels} panels</div>
      {/* Now includes inverter */}
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
      {[`Lights, WiFi, TV & fridge through all load shedding`,`Save ~R${Math.round(r.annSave/12).toLocaleString()} every month`,`Pays for itself in ${r.payback} years — then free electricity`,`Claim up to R15,000 back from SARS on panel costs`,`Property value increases R50k–R150k`].map(txt=>(
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
        <button onClick={()=>{const msg=encodeURIComponent(`Hi! I used SolarIQ and my recommended system is ${r.systemKw}kW with ${r.battKwh}kWh battery (${r.panels} panels). Estimated cost R${r.cost.toLocaleString()}. Annual savings R${r.annSave.toLocaleString()}. Can you give me a quote?`);window.open(`https://wa.me/?text=${msg}`,"_blank");}} style={{background:"rgba(37,211,102,.08)",color:"#25d366",border:"1px solid rgba(37,211,102,.25)",borderRadius:30,padding:"12px 20px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:B,width:"100%"}}style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>WhatsApp My Results</button>
      </div>
      <div style={{textAlign:"center",marginTop:12}}>
        <button onClick={onReset} style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:13,textDecoration:"underline",fontFamily:B}}>← Recalculate</button>
      </div>
    </div>
  );
  return(
    <div style={{animation:"fadeUp .5s ease"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:9}}><Ico.Sun s={44} c={t.accent}/></div>
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
            <button onClick={()=>{const msg=encodeURIComponent(`Hi! I used SolarIQ and my recommended system is ${r.systemKw}kW with ${r.battKwh}kWh battery (${r.panels} panels). Estimated cost R${r.cost.toLocaleString()}. Annual savings R${r.annSave.toLocaleString()}. Can you give me a quote?`);window.open(`https://wa.me/?text=${msg}`,"_blank");}} style={{background:"rgba(37,211,102,.08)",color:"#25d366",border:"1px solid rgba(37,211,102,.25)",borderRadius:30,padding:"12px 20px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:B,width:"100%"}}style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>WhatsApp My Results</button>
          </div>
          <div style={{textAlign:"center"}}>
            <button onClick={onReset} style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:13,textDecoration:"underline",fontFamily:B}}>← Recalculate</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Installers(){
  const t=useT();const sc=useScreen();
  const[search,setSearch]=useState("");const[prov,setProv]=useState("All");const[spec,setSpec]=useState("All");
  const[brand,setBrand]=useState("All");const[sessaOnly,setSessaOnly]=useState(false);const[verOnly,setVerOnly]=useState(false);const[financeOnly,setFinanceOnly]=useState(false);
  const[sortBy,setSortBy]=useState("rating");const[open,setOpen]=useState(null);const[showF,setShowF]=useState(false);
  const[quoteInst,setQuoteInst]=useState(null);
  const[quoteForm,setQuoteForm]=useState({name:"",email:"",phone:"",system_kw:"",notes:""});
  const[quoteSent,setQuoteSent]=useState(false);
  const[quoteSaving,setQuoteSaving]=useState(false);

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
      // Build a full lead record matching our new schema
      const leadPayload={
        installer_id:   quoteInst?.supabaseId||null,
        name:           quoteForm.name.trim(),
        email:          quoteForm.email.trim(),
        phone:          quoteForm.phone.trim(),
        area:           quoteInst?.city?`${quoteInst.city}, ${quoteInst.prov}`:"",
        system_kw:      parseFloat(quoteForm.system_kw)||0,
        battery_kwh:    0,
        panels:         0,
        daily_kwh:      0,
        monthly_bill:   0,
        estimated_cost: 0,
        goal:           "",
        roof:           "",
        urgency:        "Enquiry via SolarIQ",
        notes:          `Quote request for ${quoteInst?.name||"installer"}. ${quoteForm.notes||""}`.trim(),
        source:         "quote_request",
        status:         "new",
      };
      const {error}=await sb.from("leads").insert(leadPayload);
      if(error)console.error("Lead insert error:",error.message);
    }catch(e){console.log("submitQuote error:",e);}
    setQuoteSent(true);setQuoteSaving(false);
  };

  const InstCard=({inst,i})=>(
    <div style={{background:open===inst.id?`rgba(${t.rgb},.04)`:t.bgCard,border:`1px solid ${open===inst.id?`rgba(${t.rgb},.28)`:t.border}`,borderRadius:14,padding:"16px",transition:"all .2s",animation:`fadeUp .3s ease ${i*.04}s both`}}
      onMouseEnter={e=>{if(open!==inst.id)e.currentTarget.style.borderColor=`rgba(${t.rgb},.2)`;}}
      onMouseLeave={e=>{if(open!==inst.id)e.currentTarget.style.borderColor=t.border;}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer"}} onClick={()=>setOpen(open===inst.id?null:inst.id)}>
        <div style={{width:42,height:42,borderRadius:10,background:`rgba(${t.rgb},.1)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ico.Building s={20} c={t.accent}/></div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3,flexWrap:"wrap"}}>
            <span style={{fontFamily:H,fontSize:15,fontWeight:W.card,color:t.text}}>{inst.name}</span>
            {inst.badge&&<Tag>{inst.badge}</Tag>}
            {inst.sessa&&<Tag color="#22c55e">SESSA</Tag>}
            {inst.verified&&<Tag color="#60a5fa">Verified</Tag>}
            {inst.finance&&<Tag color="#c084fc">Finance</Tag>}
          </div>
          <div style={{fontSize:11,color:t.sub,marginBottom:4}}>{inst.city}, {inst.prov} · {inst.yrs} yrs</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
            <Stars n={inst.rating}/><span style={{fontSize:11,color:t.sub}}> ({inst.rev})</span>
            <span style={{fontSize:11,color:t.sub,display:"flex",alignItems:"center",gap:3}}><Ico.Zap s={10} c={t.sub}/>{inst.resp}</span>
            <span style={{fontSize:11,color:t.sub,display:"flex",alignItems:"center",gap:3}}><Ico.Coins s={10} c={t.sub}/>{inst.price}</span>
          </div>
        </div>
        <span style={{fontSize:14,color:t.sub,transition:"transform .2s",transform:open===inst.id?"rotate(90deg)":"none",flexShrink:0,marginTop:4}}>›</span>
      </div>
      {open===inst.id&&(
        <div style={{marginTop:13,paddingTop:13,borderTop:`1px solid ${t.border}`,animation:"fadeUp .25s ease"}}>
          <p style={{fontSize:13,color:t.sub,lineHeight:1.7,marginBottom:12}}>{inst.about}</p>
          <div style={{display:"flex",gap:7,marginBottom:12,flexWrap:"wrap"}}>
            {[Ico.Sun,Ico.Battery,Ico.Zap].map((IcoC,i)=><div key={i} style={{width:60,height:60,background:`rgba(${t.rgb},.08)`,border:`1px solid ${t.border}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><IcoC s={22} c={t.accent}/></div>)}
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
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <PBtn sm style={{flex:1,minWidth:100,borderRadius:9,padding:"10px"}} onClick={e=>{e.stopPropagation();setQuoteInst(inst);setQuoteForm({name:"",email:"",phone:"",system_kw:"",notes:""});setQuoteSent(false);}}>Request Quote</PBtn>
            <button onClick={e=>{e.stopPropagation();const msg=encodeURIComponent(`Hi ${inst.name}, I found you on SolarIQ and would like a quote for a solar installation. Please contact me.`);window.open(`https://wa.me/${inst.whatsapp||""}?text=${msg}`,"_blank");}} style={{background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.28)",color:"#25d366",borderRadius:9,padding:"10px 14px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B,display:"flex",alignItems:"center",gap:6}}><Ico.Phone s={13} c="#25d366"/> WhatsApp</button>
            <button onClick={e=>{e.stopPropagation();window.open(`https://${inst.website}`,"_blank");}} style={{background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:9,padding:"10px 14px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B,display:"flex",alignItems:"center",gap:6}}><Ico.Globe s={13} c={t.sub}/> Website</button>
          </div>
        </div>
      )}
    </div>
  );

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
        <button onClick={()=>setShowF(o=>!o)} style={{background:showF||ac>0?`rgba(${t.rgb},.12)`:t.bgCard,border:`1px solid ${showF||ac>0?`rgba(${t.rgb},.4)`:t.border}`,color:showF||ac>0?t.accent:t.sub,borderRadius:10,padding:"10px 14px",cursor:"pointer",fontSize:13,fontWeight:600,display:"flex",alignItems:"center",gap:6,fontFamily:B}}>
          <Ico.Settings s={14} c={showF||ac>0?t.accent:t.sub}/> Filters {ac>0&&<span style={{background:t.accent,color:t.dark?"#000":"#fff",borderRadius:"50%",width:17,height:17,fontSize:10,display:"inline-flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>{ac}</span>}
        </button>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{...sel,width:"auto",padding:"10px 12px",borderRadius:10}}>
          <option value="rating">Top Rated</option><option value="reviews">Most Reviews</option><option value="jobs">Most Jobs</option><option value="experience">Experience</option>
        </select>
      </div>
      {showF&&(
        <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:13,padding:"15px 16px",marginBottom:12,animation:"fadeUp .2s ease"}}>
          <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":"repeat(3,1fr)",gap:10,marginBottom:12}}>
            <div><div style={{fontSize:10,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:5,fontWeight:600}}>Province</div><select value={prov} onChange={e=>setProv(e.target.value)} style={sel}>{PROVS.map(p=><option key={p}>{p}</option>)}</select></div>
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
      {/* Two columns on desktop */}
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
          <div style={{flex:1}}><div style={{fontFamily:H,fontSize:15,fontWeight:W.card,color:t.text,marginBottom:2}}>Installer? Generate PDF Proposals</div><div style={{fontSize:13,color:t.sub}}>Branded quotes from SolarIQ results. <span style={{color:t.accent,fontWeight:700}}>Coming soon.</span></div></div>
          <button style={{background:t.bgCard,border:`1px solid rgba(${t.rgb},.3)`,color:t.accent,borderRadius:10,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B}}>Join Waitlist →</button>
        </div>
      </div>
      <div style={{marginTop:9,background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 16px",textAlign:"center"}}>
        <span style={{fontSize:13,color:t.sub}}>Are you a solar installer? </span>
        <button style={{background:"none",border:"none",color:t.accent,cursor:"pointer",fontSize:13,fontWeight:700,fontFamily:B}}>List your business free →</button>
      </div>

      {/* Quote Modal */}
      {quoteInst&&(
        <>
          <div onClick={()=>setQuoteInst(null)} style={{position:"fixed",inset:0,zIndex:490,background:"rgba(0,0,0,.6)",backdropFilter:"blur(4px)"}}/>
          <div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:500,width:"100%",maxWidth:460,background:t.dark?"#0d1018":"#f5f2e9",border:`1px solid ${t.border}`,borderRadius:20,padding:28,boxShadow:"0 32px 80px rgba(0,0,0,.5)",maxHeight:"90vh",overflowY:"auto"}}>
            {quoteSent?(
              <div style={{textAlign:"center",padding:"24px 0"}}>
                <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(74,222,128,.12)",border:"2px solid rgba(74,222,128,.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><Ico.Check s={28} c="#4ade80"/></div>
                <div style={{fontFamily:H,fontSize:20,fontWeight:800,color:"#4ade80",marginBottom:8}}>Quote Request Sent!</div>
                <div style={{fontSize:13,color:t.sub,lineHeight:1.7,marginBottom:20}}>{quoteInst.name} will be in touch shortly. Your details have been saved.</div>
                <button onClick={()=>setQuoteInst(null)} style={{background:`linear-gradient(135deg,${t.accent},${t.accent2})`,border:"none",borderRadius:10,padding:"11px 24px",fontSize:13,fontWeight:700,color:t.dark?"#000":"#fff",cursor:"pointer",fontFamily:B}}>Done</button>
              </div>
            ):(
              <>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                  <div>
                    <div style={{fontFamily:H,fontSize:17,fontWeight:800,color:t.text}}>Request a Quote</div>
                    <div style={{fontSize:12,color:t.sub,marginTop:3}}>From {quoteInst.name} · {quoteInst.city}</div>
                  </div>
                  <button onClick={()=>setQuoteInst(null)} style={{background:"none",border:`1px solid ${t.border}`,borderRadius:8,padding:"6px 10px",cursor:"pointer",color:t.sub,fontSize:18,lineHeight:1}}>×</button>
                </div>
                {[["Your Name *","text","John Smith","name"],["Email","email","john@email.com","email"],["Phone / WhatsApp *","tel","+27 82 000 0000","phone"],["System Size (kW)","text","e.g. 5kW","system_kw"],].map(([label,type,ph,field])=>(
                  <div key={field} style={{marginBottom:12}}>
                    <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.2,display:"block",marginBottom:5,fontWeight:700}}>{label}</label>
                    <input type={type} value={quoteForm[field]} onChange={e=>setQuoteForm(f=>({...f,[field]:e.target.value}))} placeholder={ph}
                      style={{width:"100%",background:t.inputBg||"rgba(255,255,255,.06)",border:`1px solid ${t.border}`,borderRadius:9,padding:"10px 13px",color:t.text,fontSize:13,fontFamily:B,outline:"none",boxSizing:"border-box"}}/>
                  </div>
                ))}
                <div style={{marginBottom:18}}>
                  <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.2,display:"block",marginBottom:5,fontWeight:700}}>Notes (optional)</label>
                  <textarea value={quoteForm.notes} onChange={e=>setQuoteForm(f=>({...f,notes:e.target.value}))} placeholder="Any specific requirements, current system details, budget range..."
                    style={{width:"100%",background:t.inputBg||"rgba(255,255,255,.06)",border:`1px solid ${t.border}`,borderRadius:9,padding:"10px 13px",color:t.text,fontSize:13,fontFamily:B,outline:"none",resize:"vertical",boxSizing:"border-box"}} rows={3}/>
                </div>
                <button onClick={submitQuote} disabled={!quoteForm.name||!quoteForm.phone||quoteSaving}
                  style={{width:"100%",background:`linear-gradient(135deg,${t.accent},${t.accent2})`,border:"none",borderRadius:11,padding:"13px",fontSize:14,fontWeight:800,color:t.dark?"#000":"#fff",cursor:(!quoteForm.name||!quoteForm.phone||quoteSaving)?"not-allowed":"pointer",opacity:(!quoteForm.name||!quoteForm.phone)?0.6:1,fontFamily:H}}>
                  {quoteSaving?"Sending...":"Send Quote Request →"}
                </button>
                <div style={{fontSize:11,color:t.sub,textAlign:"center",marginTop:10}}>Your details are sent directly to {quoteInst.name}</div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Servicing(){
  const t=useT();const sc=useScreen();
  const[page,setPage]=useState("home");const[errCode,setErrCode]=useState("");const[errRes,setErrRes]=useState(null);
  const[hAns,setHAns]=useState({});const[hStep,setHStep]=useState(0);const[hResult,setHResult]=useState(null);
  const[tProv,setTProv]=useState("All");const[tSpec,setTSpec]=useState("All");
  const lookupErr=()=>{const c=errCode.trim().toUpperCase();const m=ERRORS[c];setErrRes(m?{...m,code:c}:{notFound:true,code:c});};
  const calcHealth=()=>{
    const sc2={age:[0,5,15,25],perf:[0,10,25,5],snd:[0,10,25,40],err:[0,10,25,40],cln:[0,5,20,30],svc:[0,10,30,15]};
    let tot=0;Object.keys(sc2).forEach(k=>{const idx=HEALTH_QS.find(q=>q.id===k)?.opts.indexOf(hAns[k]);if(idx>=0)tot+=sc2[k][idx]||0;});
    const score=Math.max(0,100-tot);
    setHResult({score,needsSpecs:score<80?["Full System Service"]:[],status:score>=80?"Healthy":score>=60?"Needs Attention":score>=40?"Service Required":"Critical — Act Now",color:score>=80?"#4ade80":score>=60?t.accent:score>=40?"#fb923c":"#ef4444",note:score>=80?"System performing well. Schedule annual service within 3 months.":score>=60?"System shows signs of wear. Book an inspection soon.":score>=40?"Book a professional service within 2 weeks.":"Possible serious issue. Contact a technician immediately."});
  };
  const reset=()=>{setPage("home");setErrCode("");setErrRes(null);setHAns({});setHStep(0);setHResult(null);};
  const TECH_SPECS=[...new Set(TECHS.map(x=>x.spec))];
  const filteredTechs=TECHS.filter(x=>{if(tProv!=="All"&&x.prov!==tProv)return false;if(tSpec!=="All"&&x.spec!==tSpec)return false;return true;});

  const TechCard=({tech,i})=>(
    <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:13,padding:"16px",animation:`fadeUp .35s ease ${i*.07}s both`}}>
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
      <div style={{display:"flex",gap:7,marginBottom:12}}>
        {[Ico.Wrench,Ico.Zap,Ico.Settings].map((IcoC,i)=><div key={i} style={{width:48,height:48,background:`rgba(${t.rgb},.08)`,border:`1px solid ${t.border}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}><IcoC s={18} c={t.accent}/></div>)}
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <PBtn sm style={{flex:1,minWidth:100,borderRadius:9,padding:"9px"}}>Book Service</PBtn>
        <button onClick={()=>{const msg=encodeURIComponent(`Hi ${tech.name}, I found you on SolarIQ. I need ${tech.spec}. Please contact me to schedule a service call.`);window.open(`https://wa.me/?text=${msg}`,"_blank");}} style={{background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.25)",color:"#25d366",borderRadius:9,padding:"9px 13px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:B,display:"flex",alignItems:"center",gap:5}}><Ico.Phone s={12} c="#25d366"/> WhatsApp</button>
        <button onClick={()=>window.open(`https://${tech.website}`,"_blank")} style={{background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:9,padding:"9px 13px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:B,display:"flex",alignItems:"center",gap:5}}><Ico.Globe s={12} c={t.sub}/> Website</button>
      </div>
    </div>
  );

  if(page==="home")return(
    <div>
      <Lbl>After-Sales Care</Lbl>
      <h2 style={{fontFamily:H,fontSize:sc.isMobile?22:28,fontWeight:W.section,color:t.text,marginBottom:5}}>Solar Servicing & Repair</h2>
      <p style={{color:t.sub,fontSize:14,marginBottom:20}}>Keep your system at peak performance — for the lifetime of your investment.</p>
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"repeat(4,1fr)":sc.isMobile?"1fr 1fr":"repeat(auto-fill,minmax(200px,1fr))",gap:12,marginBottom:16}}>
        {[{id:"health",SvgIcon:Ico.Stethoscope,title:"Health Check",desc:"6 questions to diagnose your system.",badge:"AI",color:"#4ade80"},{id:"error",SvgIcon:Ico.AlertTriangle,title:"Error Code Translator",desc:"Type any inverter code. Plain English instantly.",badge:"Instant",color:t.accent},{id:"techs",SvgIcon:Ico.Wrench,title:"Find a Technician",desc:"Verified repair specialists near you.",badge:null,color:"#60a5fa"},{id:"reminder",SvgIcon:Ico.Calendar,title:"Service Reminders",desc:"WhatsApp reminders when service is due.",badge:"Free",color:"#c084fc"}].map((c,i)=>(
          <div key={c.id} onClick={()=>setPage(c.id)} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:16,padding:sc.isDesktop?"22px":"16px 14px",cursor:"pointer",transition:"all .22s",position:"relative",animation:`fadeUp .35s ease ${i*.07}s both`,display:"flex",flexDirection:"column"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${c.color}44`;e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
            {c.badge&&<div style={{position:"absolute",top:12,right:12,fontSize:9,background:`${c.color}18`,color:c.color,padding:"2px 7px",borderRadius:8,fontWeight:700}}>{c.badge}</div>}
            <div style={{width:48,height:48,borderRadius:14,background:`${c.color}12`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><c.SvgIcon s={sc.isDesktop?24:20} c={c.color}/></div>
            <div style={{fontFamily:H,fontSize:sc.isDesktop?17:15,fontWeight:W.card,color:t.text,marginBottom:5}}>{c.title}</div>
            <div style={{fontSize:12,color:t.sub,lineHeight:1.6,marginBottom:12,flex:1}}>{c.desc}</div>
            <div style={{fontSize:12,color:c.color,fontWeight:600}}>Open →</div>
          </div>
        ))}
      </div>
      <div style={{background:"rgba(239,68,68,.06)",border:"1px solid rgba(239,68,68,.15)",borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:38,height:38,borderRadius:10,background:"rgba(239,68,68,.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ico.AlertTriangle s={20} c="#f87171"/></div>
        <div style={{flex:1}}><div style={{fontFamily:H,fontSize:14,fontWeight:W.card,color:"#f87171",marginBottom:2}}>System Completely Offline?</div><div style={{fontSize:13,color:t.sub}}>Emergency technicians available 24/7 across SA.</div></div>
        <button onClick={()=>setPage("techs")} style={{background:"rgba(239,68,68,.15)",border:"1px solid rgba(239,68,68,.3)",color:"#f87171",borderRadius:9,padding:"10px 16px",fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",fontFamily:B}}>Find Now</button>
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
            <button key={c} onClick={()=>{setErrCode(c);setErrRes(null);}} style={{background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:7,padding:"3px 10px",cursor:"pointer",fontSize:11,fontWeight:700,letterSpacing:1,fontFamily:"monospace"}}>{c}</button>
          ))}
        </div>
        {errRes&&(
          <div style={{animation:"fadeUp .35s ease"}}>
            {errRes.notFound?(
              <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:13,padding:"20px",textAlign:"center"}}>
                <div style={{display:"flex",justifyContent:"center",marginBottom:8}}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
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
                    <span style={{display:"flex",alignItems:"center"}}>{errRes.diy?<Ico.Check s={14} c="#4ade80"/>:<Ico.AlertTriangle s={14} c="#f87171"/>}</span>
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
      const scoreBlock=(
        <div>
          <div style={{textAlign:"center",marginBottom:22}}>
            <div style={{width:88,height:88,borderRadius:"50%",background:`${hResult.color}18`,border:`3px solid ${hResult.color}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",flexDirection:"column"}}>
              <div style={{fontFamily:H,fontSize:24,fontWeight:W.hero,color:hResult.color}}>{hResult.score}</div>
              <div style={{fontSize:9,color:hResult.color,fontWeight:600}}>/100</div>
            </div>
            <div style={{fontFamily:H,fontSize:24,fontWeight:W.section,color:hResult.color,marginBottom:4}}>{hResult.status}</div>
            <p style={{color:t.sub,fontSize:14,lineHeight:1.7,maxWidth:340,margin:"0 auto"}}>{hResult.note}</p>
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
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:13,color:t.sub}}>{l}</span><span style={{fontSize:13,fontWeight:700,color:c}}>{Math.min(100,Math.round(v))}%</span></div>
              <div style={{height:6,background:`rgba(128,128,128,.15)`,borderRadius:3}}><div style={{width:`${Math.min(100,v)}%`,height:"100%",background:c,borderRadius:3,transition:"width .8s ease"}}/></div>
            </div>
          ))}
        </div>
      );
      return(
        <div style={{animation:"fadeUp .5s ease"}}>
          <BackBtn onClick={()=>{setHResult(null);setHAns({});setHStep(0);}}/>
          {sc.isDesktop?(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,alignItems:"start"}}>
              {scoreBlock}{bars}
            </div>
          ):(
            <div>{scoreBlock}<div style={{marginTop:12}}>{bars}</div></div>
          )}
        </div>
      );
    }
    const q=HEALTH_QS[hStep];
    return(
      <div style={{maxWidth:sc.isDesktop?560:undefined,margin:sc.isDesktop?"0 auto":undefined}}>
        <BackBtn onClick={()=>hStep===0?reset():setHStep(s=>s-1)}/>
        <div style={{display:"flex",gap:4,marginBottom:20}}>{HEALTH_QS.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=hStep?t.accent:`rgba(${t.rgb},.15)`,transition:"background .3s"}}/>)}</div>
        <div key={hStep} style={{animation:"fadeUp .3s ease"}}>
          <Lbl>Question {hStep+1} of {HEALTH_QS.length}</Lbl>
          <h3 style={{fontFamily:H,fontSize:sc.isMobile?19:22,fontWeight:W.section,color:t.text,marginBottom:16,lineHeight:1.2}}>{q.q}</h3>
          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            {q.opts.map(o=>{const sel=hAns[q.id]===o;return <button key={o} onClick={()=>{const na={...hAns,[q.id]:o};setHAns(na);if(hStep<HEALTH_QS.length-1)setTimeout(()=>setHStep(s=>s+1),200);else setTimeout(calcHealth,200);}} style={{background:sel?`rgba(${t.rgb},.1)`:t.bgCard,border:`1px solid ${sel?t.accent:t.border}`,borderRadius:10,padding:"13px 16px",cursor:"pointer",textAlign:"left",fontSize:14,color:sel?t.accent:t.sub,fontWeight:sel?600:400,transition:"all .2s",fontFamily:B}}>{o}</button>;})}
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
      <div style={{display:"flex",gap:7,marginBottom:10,flexWrap:"wrap"}}>
        {["All","Gauteng","Western Cape","KwaZulu-Natal"].map(p=><button key={p} onClick={()=>setTProv(p)} style={{background:tProv===p?`rgba(${t.rgb},.12)`:t.bgCard,border:`1px solid ${tProv===p?`rgba(${t.rgb},.4)`:t.border}`,color:tProv===p?t.accent:t.sub,borderRadius:20,padding:"6px 13px",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:B}}>{p}</button>)}
      </div>
      <div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap"}}>
        {["All",...TECH_SPECS].map(s=><button key={s} onClick={()=>setTSpec(s)} style={{background:tSpec===s?`rgba(${t.rgb},.12)`:t.bgCard,border:`1px solid ${tSpec===s?`rgba(${t.rgb},.4)`:t.border}`,color:tSpec===s?t.accent:t.sub,borderRadius:20,padding:"6px 13px",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:B}}>{s}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1fr 1fr":"1fr",gap:12}}>
        {filteredTechs.map((tech,i)=><TechCard key={tech.id} tech={tech} i={i}/>)}
        {filteredTechs.length===0&&<div style={{textAlign:"center",padding:"24px",color:t.sub,fontSize:13}}>No technicians match. <button onClick={()=>{setTProv("All");setTSpec("All");}} style={{background:"none",border:"none",color:t.accent,cursor:"pointer",fontWeight:700,fontFamily:B}}>Clear filters</button></div>}
      </div>
    </div>
  );

  if(page==="reminder")return(
    <div style={{maxWidth:sc.isDesktop?500:undefined,margin:sc.isDesktop?"0 auto":undefined}}>
      <BackBtn onClick={reset}/>
      <Lbl>Free Service</Lbl>
      <h3 style={{fontFamily:H,fontSize:sc.isMobile?20:24,fontWeight:W.section,color:t.text,marginBottom:5}}>Service Reminders</h3>
      <p style={{color:t.sub,fontSize:14,marginBottom:18}}>Register once. We'll WhatsApp you when service is due.</p>
      <div style={{display:"flex",flexDirection:"column",gap:11,marginBottom:16}}>
        {[["Your name","text","John Smith"],["WhatsApp number","tel","+27 82 000 0000"],["System size","text","e.g. 5kW Sunsynk"],["Installation date","date",""],["Inverter brand","text","e.g. Sunsynk, Victron, Deye"]].map(([l,tp,ph])=>(
          <div key={l}>
            <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.2,display:"block",marginBottom:5,fontWeight:600}}>{l}</label>
            <input type={tp} placeholder={ph} style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"11px 13px",color:t.text,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:B}}/>
          </div>
        ))}
      </div>
      <PBtn style={{width:"100%"}}style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>Register My System Free</PBtn>
      <div style={{fontSize:11,color:t.sub,textAlign:"center",marginTop:10}}>WhatsApp only · No spam · Unsubscribe anytime</div>
    </div>
  );
  return null;
}

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
  const related=article.related.map(id=>ARTICLES.find(a=>a.id===id)).filter(Boolean);
  const body=(
    <div>
      <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:14}}>
        <Tag>{article.tag}</Tag>
        {article.hot&&<span style={{fontSize:11,color:"#f87171"}}>Trending</span>}
        <span style={{fontSize:12,color:t.sub,marginLeft:"auto"}}>{article.min} min · {article.views} views</span>
      </div>
      <h1 style={{fontFamily:H,fontSize:"clamp(20px,3vw,34px)",fontWeight:W.hero,color:t.text,lineHeight:1.15,marginBottom:16}}>{article.title}</h1>
      <p style={{fontSize:15,color:t.textMid,lineHeight:1.85,borderLeft:`3px solid ${t.accent}`,paddingLeft:14,marginBottom:24,fontStyle:"italic"}}>{article.intro}</p>
      {article.coverImg&&(
        <div style={{borderRadius:14,overflow:"hidden",marginBottom:24,border:`1px solid ${t.border}`}}>
          <img src={article.coverImg} alt={article.title} style={{width:"100%",height:sc.isMobile?160:240,objectFit:"cover",display:"block"}}/>
        </div>
      )}
      {article.youtubeId&&(
        <div style={{marginBottom:24}}>
          <div style={{borderRadius:12,overflow:"hidden",border:`1px solid ${t.border}`,position:"relative",paddingBottom:"56.25%",height:0}}>
            <iframe src={`https://www.youtube.com/embed/${article.youtubeId}`} title={article.youtubeTitle||"Video"} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}} allowFullScreen/>
          </div>
          {article.youtubeTitle&&<div style={{fontSize:11,color:t.sub,marginTop:6,textAlign:"center"}}>{article.youtubeTitle}</div>}
        </div>
      )}
      {article.rating&&(
        <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:13,padding:"18px",marginBottom:24}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:14}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily:H,fontSize:42,fontWeight:W.hero,color:t.accent,lineHeight:1}}>{article.rating.overall}</div>
              <div style={{fontSize:10,color:t.sub,marginTop:2}}>Overall</div>
            </div>
            <div style={{flex:1}}>
              <RatingBar label="Value" score={article.rating.value}/>
              <RatingBar label="Build quality" score={article.rating.build}/>
              <RatingBar label="Software" score={article.rating.software}/>
              <RatingBar label="Support" score={article.rating.support}/>
            </div>
          </div>
        </div>
      )}
      <div style={{height:1,background:`linear-gradient(90deg,${t.accent},transparent)`,marginBottom:26,opacity:.4}}/>
      <div style={{display:"flex",flexDirection:"column",gap:22,marginBottom:26}}>
        {article.body.map((sec,i)=>(
          <div key={i}>
            <h2 style={{fontFamily:H,fontSize:sc.isMobile?16:19,fontWeight:W.section,color:t.text,marginBottom:9}}>{sec.h}</h2>
            <p style={{fontSize:15,color:t.textMid,lineHeight:1.85}}>{sec.p}</p>
          </div>
        ))}
      </div>
      {article.photos&&article.photos.length>0&&(
        <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr":"1fr 1fr",gap:10,marginBottom:24}}>
          {article.photos.map((ph,i)=>(
            <div key={i} style={{borderRadius:10,overflow:"hidden",border:`1px solid ${t.border}`}}>
              <img src={ph.url} alt={ph.caption} style={{width:"100%",height:160,objectFit:"cover",display:"block"}}/>
              {ph.caption&&<div style={{fontSize:11,color:t.sub,padding:"7px 11px",background:t.bgCard}}>{ph.caption}</div>}
            </div>
          ))}
        </div>
      )}
      {article.affiliate&&(
        <>
          <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.04))`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:12,padding:"14px 16px",marginBottom:8}}>
            <a href={article.affiliate.url} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,textDecoration:"none"}}>
              <div>
                <div style={{fontFamily:H,fontSize:15,fontWeight:W.card,color:t.accent,marginBottom:3}}>{article.affiliate.label}</div>
                <div style={{fontSize:11,color:t.sub}}>Best current price · Usually ships in 3–5 days</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </a>
          </div>
          <div style={{fontSize:10,color:t.sub,marginBottom:24,lineHeight:1.6,padding:"8px 10px",background:t.bgCard,borderRadius:8,border:`1px solid ${t.border}`}}>
            <span style={{fontWeight:700}}>Disclosure: </span>{article.affiliate.disclosure}
          </div>
        </>
      )}
    </div>
  );
  const sidebar=(
    <div style={{position:"sticky",top:80}}>
      <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.1),rgba(${t.rgb},.04))`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:14,padding:"18px",textAlign:"center",marginBottom:14}}>
        <div style={{fontFamily:H,fontSize:15,fontWeight:W.section,color:t.text,marginBottom:5}}>Ready to Calculate?</div>
        <p style={{color:t.sub,fontSize:13,marginBottom:13}}>Personalised result in under 2 minutes. Free.</p>
        <PBtn sm style={{width:"100%",padding:"10px",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><span style={{display:"flex"}}><Ico.Sun s={14} c={t.dark?"#000":"#fff"}/></span> Calculate My System</PBtn>
      </div>
      {related.length>0&&(
        <div>
          <div style={{fontFamily:H,fontSize:14,fontWeight:W.section,color:t.text,marginBottom:11}}>Related Articles</div>
          {related.map(rel=>(
            <div key={rel.id} onClick={()=>onBack(rel)} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:10,marginBottom:8}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`;e.currentTarget.style.transform="translateX(4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
              <div style={{flex:1}}><Tag>{rel.tag}</Tag><div style={{fontFamily:H,fontSize:12,fontWeight:W.card,color:t.text,marginTop:4,lineHeight:1.3}}>{rel.title}</div></div>
              <span style={{fontSize:14,color:t.sub,flexShrink:0}}>›</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <BackBtn onClick={()=>onBack(null)}/>
      {sc.isDesktop?(
        <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:36,alignItems:"start"}}>
          {body}{sidebar}
        </div>
      ):(
        <div>
          {body}
          <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.1),rgba(${t.rgb},.04))`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:14,padding:"18px",textAlign:"center",marginBottom:20}}>
            <div style={{fontFamily:H,fontSize:15,fontWeight:W.section,color:t.text,marginBottom:4}}>Ready to Calculate?</div>
            <PBtn sm style={{width:"100%",padding:"10px",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><span style={{display:"flex"}}><Ico.Sun s={14} c={t.dark?"#000":"#fff"}/></span> Calculate My System</PBtn>
          </div>
          {related.length>0&&(
            <div>
              <div style={{fontFamily:H,fontSize:14,fontWeight:W.section,color:t.text,marginBottom:10}}>Related Articles</div>
              {related.map(rel=>(
                <div key={rel.id} onClick={()=>onBack(rel)} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
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
  if(active)return <ArticleView article={active} onBack={a=>setActive(a||null)}/>;
  const list=tag==="All"?ARTICLES:ARTICLES.filter(a=>a.tag===tag);
  return(
    <div>
      <Lbl>Knowledge Hub</Lbl>
      <h2 style={{fontFamily:H,fontSize:sc.isMobile?22:28,fontWeight:W.section,color:t.text,marginBottom:5}}>Solar Guides & Reviews</h2>
      <p style={{color:t.sub,fontSize:14,marginBottom:16}}>Honest solar content for South Africans. No brand deals. No bias.</p>
      <div style={{display:"flex",gap:7,marginBottom:20,flexWrap:"wrap"}}>
        {tags.map(tg=><button key={tg} onClick={()=>setTag(tg)} style={{background:tag===tg?`rgba(${t.rgb},.13)`:t.bgCard,border:`1px solid ${tag===tg?`rgba(${t.rgb},.4)`:t.border}`,color:tag===tg?t.accent:t.sub,borderRadius:20,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:B}}>{tg}</button>)}
      </div>
      {/* Featured - full width */}
      <div onClick={()=>setActive(list[0])} style={{background:`linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`,border:`1px solid rgba(${t.rgb},.15)`,borderRadius:16,overflow:"hidden",marginBottom:14,cursor:"pointer",transition:"all .2s"}}
        onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`;e.currentTarget.style.transform="translateY(-2px)";}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.15)`;e.currentTarget.style.transform="none";}}>
        {list[0].coverImg&&<img src={list[0].coverImg} alt="" style={{width:"100%",height:sc.isDesktop?260:sc.isMobile?140:200,objectFit:"cover",display:"block"}}/>}
        <div style={{padding:sc.isDesktop?"22px 24px":"16px 18px"}}>
          <div style={{display:"flex",gap:7,marginBottom:10,alignItems:"center"}}>
            <Tag>FEATURED</Tag><Tag>{list[0].tag}</Tag>
            {list[0].hot&&<span style={{fontSize:11,color:"#f87171"}}>{list[0].views} reads</span>}
          </div>
          <h3 style={{fontFamily:H,fontSize:sc.isDesktop?"clamp(18px,2vw,24px)":"clamp(15px,3vw,20px)",fontWeight:W.section,color:t.text,marginBottom:8,lineHeight:1.2}}>{list[0].title}</h3>
          <p style={{fontSize:13,color:t.sub,lineHeight:1.7,marginBottom:12,maxWidth:700}}>{list[0].intro}</p>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:12,color:t.sub}}>{list[0].min} min read</span>
            <span style={{fontSize:13,color:t.accent,fontWeight:600}}>Read article →</span>
          </div>
        </div>
      </div>
      {/* Grid — 3 cols on desktop, 2 on tablet, 1 on mobile */}
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"repeat(3,1fr)":sc.isMobile?"1fr":"1fr 1fr",gap:12}}>
        {list.slice(1).map((p,i)=>(
          <div key={p.id} onClick={()=>setActive(p)} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:14,overflow:"hidden",cursor:"pointer",transition:"all .2s",animation:`fadeUp .35s ease ${i*.07}s both`}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.25)`;e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
            {p.coverImg&&<img src={p.coverImg} alt="" style={{width:"100%",height:120,objectFit:"cover",display:"block"}}/>}
            <div style={{padding:"14px"}}>
              <div style={{display:"flex",gap:6,marginBottom:8,alignItems:"center"}}>
                <Tag>{p.tag}</Tag>{p.hot&&<span style={{fontSize:9,background:"rgba(248,113,113,.15)",color:"#f87171",padding:"1px 6px",borderRadius:6,fontWeight:700}}>HOT</span>}
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

  const LAUNCH=new Date("2026-04-08T00:00:00+02:00");
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
      <div style={{position:"absolute",bottom:"-5%",right:"5%",width:"40vw",height:"40vh",background:"radial-gradient(ellipse,rgba(255,107,0,.05) 0%,transparent 65%)",pointerEvents:"none",animation:"breathe 9s ease infinite 3s"}}/>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"min(500px,80vw)",height:"min(500px,80vw)",borderRadius:"50%",border:"1px solid rgba(245,166,35,.06)",animation:"spin 30s linear infinite",pointerEvents:"none"}}>
        <div style={{position:"absolute",top:-4,left:"50%",marginLeft:-4,width:8,height:8,borderRadius:"50%",background:"#f5a623",opacity:.6}}/>
      </div>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"min(360px,60vw)",height:"min(360px,60vw)",borderRadius:"50%",border:"1px solid rgba(245,166,35,.04)",animation:"spin 20s linear infinite reverse",pointerEvents:"none"}}>
        <div style={{position:"absolute",bottom:-3,left:"50%",marginLeft:-3,width:6,height:6,borderRadius:"50%",background:"#ff6b00",opacity:.5}}/>
      </div>
      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",width:"100%",maxWidth:520}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24,animation:"fadeUp .6s ease"}}>
          <div style={{width:44,height:44,background:"linear-gradient(135deg,#f5a623,#ff6b00)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",animation:"float 3s ease infinite",boxShadow:"0 0 30px rgba(245,166,35,.35)"}}><svg width="24" height="24" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="7" fill="#000"/><line x1="16" y1="2" x2="16" y2="6" stroke="#000" strokeWidth="2.2" strokeLinecap="round"/><line x1="16" y1="26" x2="16" y2="30" stroke="#000" strokeWidth="2.2" strokeLinecap="round"/><line x1="2" y1="16" x2="6" y2="16" stroke="#000" strokeWidth="2.2" strokeLinecap="round"/><line x1="26" y1="16" x2="30" y2="16" stroke="#000" strokeWidth="2.2" strokeLinecap="round"/><line x1="5.5" y1="5.5" x2="8.4" y2="8.4" stroke="#000" strokeWidth="2.2" strokeLinecap="round"/><line x1="23.6" y1="23.6" x2="26.5" y2="26.5" stroke="#000" strokeWidth="2.2" strokeLinecap="round"/><line x1="26.5" y1="5.5" x2="23.6" y2="8.4" stroke="#000" strokeWidth="2.2" strokeLinecap="round"/><line x1="8.4" y1="23.6" x2="5.5" y2="26.5" stroke="#000" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
          <span style={{fontFamily:"'Lexend',sans-serif",fontSize:34,fontWeight:900,letterSpacing:1.5,color:"#f0f0f0"}}>Solar<span style={{color:"#f5a623"}}>IQ</span></span>
        </div>
        <div style={{textAlign:"center",marginBottom:32,animation:"fadeUp .7s ease"}}>
          <h1 style={{fontFamily:"'Lexend',sans-serif",fontSize:"clamp(24px,6vw,46px)",fontWeight:900,color:"#f0f0f0",lineHeight:1.1,marginBottom:12}}>SA's Solar Platform.<br/><span style={{color:"#f5a623"}}>Launching 8 April 2026.</span></h1>
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
              <div style={{display:"flex",justifyContent:"center",marginBottom:8}}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
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

export default function App(){
  const params=typeof window!=="undefined"?new URLSearchParams(window.location.search):new URLSearchParams();
  const unlocked=params.get("preview")==="solariq2026";
  const prefersDark=typeof window!=="undefined"?window.matchMedia("(prefers-color-scheme: dark)").matches:true;
  const[isDark,setIsDark]=useState(prefersDark);
  const[tab,setTab]=useState("home");
  const[res,setRes]=useState(null);
  const[nlEmail,setNlEmail]=useState("");const[nlDone,setNlDone]=useState(false);const[nlSaving,setNlSaving]=useState(false);
  const sc=useScreen();
  const t=isDark?DARK:LIGHT;

  const saveNewsletter=async()=>{
    if(!nlEmail||nlSaving)return;
    const emailOk=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nlEmail.trim());
    if(!emailOk)return;
    setNlSaving(true);
    try{await sb.from("subscribers").upsert({email:nlEmail.trim().toLowerCase(),source:"newsletter",active:true},{onConflict:"email"});}
    catch(e){console.log(e);}
    setNlDone(true);setNlSaving(false);
  };
  useEffect(()=>{const mq=window.matchMedia("(prefers-color-scheme: dark)");const h=e=>setIsDark(e.matches);mq.addEventListener("change",h);return()=>mq.removeEventListener("change",h);},[]);
  const goTab=id=>{setTab(id);if(id!=="result")setRes(null);window.scrollTo({top:0,behavior:"smooth"});};
  const NAV=[
    {id:"home", l:"Home",      SvgIcon:Ico.Home},
    {id:"calc", l:"Calculator",SvgIcon:Ico.Sun},
    {id:"inst", l:"Installers",SvgIcon:Ico.Map},
    {id:"serv", l:"Servicing", SvgIcon:Ico.Wrench},
    {id:"blog", l:"Guides",    SvgIcon:Ico.Book},
  ];
  const TICKS=["Solar tax rebate: claim 25% back from SARS","Load shedding prep — is your system sized right?","Pro Calculator now live","Free System Health Check — 2 minutes","Verified repair technicians across SA","Installer proposal generator — coming soon"];
  const css=`
    @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html,body{width:100%;overflow-x:hidden}
    body{background:${t.bg};transition:background .35s,color .35s;-webkit-text-size-adjust:100%}
    ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:${t.accent};border-radius:4px}
    input::placeholder{color:${isDark?"#444":"#999"}}
    select option{background:${isDark?"#111":"#f5f2eb"};color:${t.text}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
    @keyframes spin{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
    @keyframes breathe{0%,100%{opacity:.6;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.08)}}
    @keyframes particle{0%,100%{transform:translateY(0) scale(1);opacity:.15}50%{transform:translateY(-18px) scale(1.4);opacity:.55}}
  `;
  if(!unlocked)return(<><style>{css}</style><ComingSoon/></>);
  return(
    <T.Provider value={t}>
      <style>{css}</style>
      <div style={{fontFamily:B,background:t.bg,minHeight:"100vh",color:t.text,transition:"background .35s,color .35s",overflowX:"hidden",display:"flex",flexDirection:"column"}}>
        {!sc.isMobile&&(
          <div style={{background:`rgba(${t.rgb},.06)`,borderBottom:`1px solid ${t.border}`,height:26,overflow:"hidden",display:"flex",alignItems:"center",flexShrink:0}}>
            <div style={{display:"flex",animation:"ticker 36s linear infinite",whiteSpace:"nowrap"}}>
              {[...TICKS,...TICKS].map((x,i)=><span key={i} style={{fontSize:10,color:t.accent,marginRight:52,opacity:.8,fontWeight:600}}>{x}</span>)}
            </div>
          </div>
        )}
        {!sc.isMobile&&(
          <nav style={{background:t.navBg,backdropFilter:"blur(20px)",borderBottom:`1px solid ${t.border}`,padding:"0 28px",position:"sticky",top:0,zIndex:200,flexShrink:0}}>
            <div style={{maxWidth:1360,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:52,width:"100%"}}>
              <div onClick={()=>goTab("home")} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",flexShrink:0}}>
                <div style={{width:26,height:26,background:`linear-gradient(135deg,${t.accent},${t.accent2})`,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",animation:"float 3s ease infinite"}}><Ico.Sun s={15} c="#000"/></div>
                <span style={{fontFamily:H,fontSize:20,fontWeight:W.logo,letterSpacing:1,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></span>
                <span style={{fontSize:9,background:`rgba(${t.rgb},.15)`,color:t.accent,padding:"1px 6px",borderRadius:8,fontWeight:700,letterSpacing:1}}>BETA</span>
              </div>
              <div style={{display:"flex",gap:2}}>
                {NAV.map(x=><button key={x.id} onClick={()=>goTab(x.id)} style={{background:tab===x.id?`rgba(${t.rgb},.08)`:"none",border:`1px solid ${tab===x.id?`rgba(${t.rgb},.22)`:"transparent"}`,color:tab===x.id?t.accent:t.sub,padding:"5px 16px",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:600,transition:"all .2s",fontFamily:B}}>{x.l}</button>)}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <button onClick={()=>setIsDark(d=>!d)} style={{background:`rgba(${t.rgb},.1)`,border:`1px solid rgba(${t.rgb},.25)`,borderRadius:8,padding:"5px 10px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Ico.Sun s={16} c={t.accent}/></button>
                <PBtn sm style={{borderRadius:7,padding:"7px 16px",fontSize:12,width:"auto",display:"flex",alignItems:"center",gap:6}}><Ico.ArrowRight s={12} c={isDark?"#000":"#fff"}/> Stay Updated</PBtn>
              </div>
            </div>
          </nav>
        )}
        {sc.isMobile&&(
          <div style={{background:t.navBg,backdropFilter:"blur(20px)",borderBottom:`1px solid ${t.border}`,padding:"0 16px",position:"sticky",top:0,zIndex:200,height:50,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
            <div onClick={()=>goTab("home")} style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer"}}>
              <div style={{width:24,height:24,background:`linear-gradient(135deg,${t.accent},${t.accent2})`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}><Ico.Sun s={13} c="#000"/></div>
              <span style={{fontFamily:H,fontSize:18,fontWeight:W.logo,letterSpacing:1,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></span>
            </div>
            <button onClick={()=>setIsDark(d=>!d)} style={{background:`rgba(${t.rgb},.1)`,border:`1px solid rgba(${t.rgb},.25)`,borderRadius:7,padding:"5px 8px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Ico.Sun s={14} c={t.accent}/></button>
          </div>
        )}
        <div style={{flex:1,width:"100%"}}>
          <div style={{maxWidth:1360,margin:"0 auto",padding:sc.isMobile?"16px 14px 100px":sc.isDesktop?"44px 48px 64px":"32px 28px 60px",width:"100%"}}>
            {tab==="home"&&(
              <div style={{animation:"fadeUp .5s ease"}}>
                <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"55% 45%":"1fr",gap:sc.isDesktop?64:32,alignItems:"center",marginBottom:sc.isMobile?36:56}}>
                  <div>
                    <div style={{display:"inline-flex",alignItems:"center",gap:7,background:`rgba(${t.rgb},.08)`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:20,padding:"5px 13px",marginBottom:20}}>
                      <span style={{width:6,height:6,borderRadius:"50%",background:t.accent,display:"inline-block",animation:"pulse 2s infinite"}}/>
                      <span style={{fontSize:10,color:t.accent,fontWeight:700,letterSpacing:1}}>SA'S SOLAR INTELLIGENCE PLATFORM</span>
                    </div>
                    <h1 style={{fontFamily:H,fontSize:"clamp(34px,4.5vw,58px)",fontWeight:W.hero,lineHeight:1.05,marginBottom:18,color:t.text}}>
                      From Research<br/>To Install<br/><span style={{color:t.accent}}>To Lifetime Care.</span>
                    </h1>
                    <p style={{fontSize:sc.isMobile?14:16,color:t.sub,lineHeight:1.8,marginBottom:24,maxWidth:420}}>The only platform SA solar owners need — calculate, install, maintain, repair. Free. Always.</p>
                    <div style={{display:"flex",flexDirection:"column",gap:11,maxWidth:380}}>
                      <PBtn onClick={()=>goTab("calc")} style={{fontSize:15,padding:"14px 28px",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Ico.Sun s={17} c={isDark?"#000":"#fff"}/> Calculate My System</PBtn>
                      <button onClick={()=>goTab("serv")} style={{background:`rgba(${t.rgb},.08)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.accent,borderRadius:30,padding:"13px 20px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:B,width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Ico.Wrench s={15} c={t.accent}/> Service My Solar</button>
                    </div>
                    <div style={{display:"flex",gap:sc.isMobile?16:32,marginTop:24,flexWrap:"wrap"}}>
                      {[["4","Calc modes"],["R0","Always free"],["SA","Built for SA"],["24/7","Support"]].map(([v,l])=>(
                        <div key={l}><div style={{fontFamily:H,fontSize:20,fontWeight:W.section,color:t.text}}>{v}</div><div style={{fontSize:11,color:t.sub,marginTop:2}}>{l}</div></div>
                      ))}
                    </div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {[{SvgIcon:Ico.Sparkles,l:"Quick Calculator",s:"4 simple questions — 60 seconds",tab:"calc"},{SvgIcon:Ico.Settings,l:"Pro Calculator",s:"Full kW/kWh/Ah technical inputs",tab:"calc"},{SvgIcon:Ico.Map,l:"Installer Directory",s:"SESSA-accredited, verified + finance options",tab:"inst"},{SvgIcon:Ico.Stethoscope,l:"Health Check",s:"AI-powered system diagnostic",tab:"serv",badge:"AI"},{SvgIcon:Ico.AlertTriangle,l:"Error Code Translator",s:"Plain English inverter explanations",tab:"serv"},{SvgIcon:Ico.Wrench,l:"Find a Technician",s:"Matched to your issue, near you",tab:"serv"}].map((x,i)=>(
                      <div key={x.l} onClick={()=>goTab(x.tab)} style={{display:"flex",alignItems:"center",gap:12,background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:12,padding:"12px 14px",cursor:"pointer",transition:"all .2s",animation:`fadeUp .4s ease ${i*.05}s both`}}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`;e.currentTarget.style.transform="translateX(4px)";}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
                        <div style={{width:34,height:34,borderRadius:9,background:`rgba(${t.rgb},.08)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><x.SvgIcon s={16} c={t.accent}/></div>
                        <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:600,color:t.text,marginBottom:2,fontFamily:H}}>{x.l}</div><div style={{fontSize:11,color:t.sub}}>{x.s}</div></div>
                        {x.badge&&<span style={{fontSize:9,background:`rgba(${t.rgb},.12)`,color:t.accent,padding:"2px 6px",borderRadius:7,fontWeight:700,flexShrink:0}}>{x.badge}</span>}
                        <span style={{fontSize:13,color:t.sub,flexShrink:0}}>›</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{marginBottom:32}}>
                  <div style={{textAlign:"center",marginBottom:20}}>
                    <Lbl center>Your Solar Journey</Lbl>
                    <h2 style={{fontFamily:H,fontSize:sc.isMobile?19:26,fontWeight:W.section,color:t.text}}>SolarIQ is with you at every stage</h2>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":"repeat(5,1fr)",gap:10}}>
                    {[{n:"01",l:"Research",SvgIcon:Ico.Search,d:"Calculate what you need",c:t.accent},{n:"02",l:"Compare",SvgIcon:Ico.Scale,d:"Find the best installers",c:t.accent2},{n:"03",l:"Install",SvgIcon:Ico.Zap,d:"Accredited professionals",c:"#4ade80"},{n:"04",l:"Maintain",SvgIcon:Ico.Wrench,d:"Reminders & cleaning tips",c:"#60a5fa"},{n:"05",l:"Repair",SvgIcon:Ico.Stethoscope,d:"Error codes & health checks",c:"#c084fc"}].map((s,i)=>(
                      <div key={s.n} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:12,padding:"16px 14px",animation:`fadeUp .4s ease ${i*.07}s both`}}>
                        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                          <span style={{fontFamily:H,fontSize:10,fontWeight:W.logo,color:s.c,opacity:.4}}>{s.n}</span>
                          <div style={{flex:1,height:1,background:`${s.c}20`}}/>
                          <s.SvgIcon s={16} c={s.c}/>
                        </div>
                        <div style={{fontFamily:H,fontSize:14,fontWeight:W.card,color:s.c,marginBottom:4}}>{s.l}</div>
                        <div style={{fontSize:12,color:t.sub,lineHeight:1.5}}>{s.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`,border:`1px solid rgba(${t.rgb},.15)`,borderRadius:16,padding:sc.isMobile?"20px":"32px",textAlign:"center"}}>
                  <div style={{display:"flex",justifyContent:"center",marginBottom:10}}><Ico.ArrowRight s={24} c={t.accent}/></div>
                  <h3 style={{fontFamily:H,fontSize:sc.isMobile?18:22,fontWeight:W.section,color:t.text,marginBottom:6}}>Solar insights for SA homeowners</h3>
                  <p style={{color:t.sub,fontSize:14,marginBottom:18,lineHeight:1.7,maxWidth:400,margin:"0 auto 18px"}}>Weekly deals, maintenance tips and load shedding updates. No spam, unsubscribe anytime.</p>
                  <div style={{display:"flex",flexDirection:sc.isMobile?"column":"row",gap:8,justifyContent:"center",maxWidth:380,margin:"0 auto"}}>
                    {nlDone?(
                      <div style={{fontSize:13,color:"#4ade80",fontWeight:600,padding:"11px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Ico.Check s={14} c="#4ade80"/> You're subscribed! Thanks.</div>
                    ):(
                      <>
                        <input value={nlEmail} onChange={e=>setNlEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveNewsletter()} placeholder="your@email.com" style={{flex:1,background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"11px 14px",color:t.text,fontSize:14,outline:"none",fontFamily:B,width:"100%"}}/>
                        <PBtn sm onClick={saveNewsletter} style={{borderRadius:9,width:sc.isMobile?"100%":"auto",padding:"11px 20px"}}>{nlSaving?"...":"Subscribe Free"}</PBtn>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
            {tab==="calc"&&!res&&<Calculator onResult={r=>{setRes(r);setTab("result");}}/>}
            {tab==="result"&&res&&<Results r={res} onReset={()=>{setRes(null);setTab("home");}} goInstallers={()=>goTab("inst")}/>}
            {tab==="inst"&&<Installers/>}
            {tab==="serv"&&<Servicing/>}
            {tab==="blog"&&<Blog/>}
          </div>
        </div>
        <div style={{borderTop:`1px solid ${t.border}`,padding:"20px 28px",textAlign:"center",paddingBottom:sc.isMobile?80:20,flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,marginBottom:4}}>
            <Ico.Sun s={16} c={t.accent}/><span style={{fontFamily:H,fontSize:14,fontWeight:W.logo,letterSpacing:1,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></span>
          </div>
          <div style={{fontSize:12,color:t.sub}}>South Africa's complete solar platform.</div>
        </div>
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

import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://intvnxvannltfibguykw.supabase.co";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHZueHZhbm5sdGZpYmd1eWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzAwNjgsImV4cCI6MjA5MDA0NjA2OH0.KnPP0-vxXyBYTvHxbXfrH8AKd61u1hWpEO2gpjWnzNE";
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// Dark only — light mode removed from admin too
const DARK = {
  dark:true, bg:"#05070b", bg2:"#090c12", bg3:"#0d1018",
  card:"rgba(255,255,255,.04)", card2:"rgba(255,255,255,.07)", card3:"rgba(255,255,255,.1)",
  border:"rgba(255,255,255,.08)", borderHover:"rgba(255,255,255,.16)",
  accent:"#f5a623", accent2:"#ff6b00", rgb:"245,166,35",
  text:"#f0f0f0", textMid:"#b0b0b0", sub:"#555", subLight:"#888",
  green:"#4ade80", red:"#f87171", blue:"#60a5fa", purple:"#c084fc", cyan:"#22d3ee",
  nav:"rgba(5,7,11,.97)", inputBg:"rgba(255,255,255,.05)",
  navW:290, navWc:62,
};
const H = "'Lexend',sans-serif";
const B = "'Plus Jakarta Sans',sans-serif";
let _globalTheme = DARK;
const _TC = ({children}) => children(_globalTheme);

function useScreen() {
  const [s,setS] = useState({w:window.innerWidth,h:window.innerHeight});
  useEffect(()=>{
    const fn=()=>setS({w:window.innerWidth,h:window.innerHeight});
    window.addEventListener("resize",fn);
    return ()=>window.removeEventListener("resize",fn);
  },[]);
  return {w:s.w,h:s.h,isMobile:s.w<768,isTablet:s.w>=768&&s.w<1100,isDesktop:s.w>=1100};
}

// ─── RAY-STYLE LOGO (no emoji, no box) ───────────────────────
const LogoIcon = ({s=28}) => (
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

// ─── SVG ICONS (no emojis) ───────────────────────────────────
const Ic = {
  Grid:      ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>,
  Install:   ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Clip:      ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="14" y2="15"/></svg>,
  Doc:       ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Chart:     ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  Mail:      ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Cog:       ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Bell:      ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Search:    ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Out:       ({s=15,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Plus:      ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Chk:       ({s=13,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  X:         ({s=13,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Left:      ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Right:     ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  More:      ({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>,
  Activity:  ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Send:      ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Wrench:    ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Trending:  ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Sun:       ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Users:     ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Link:      ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  Download:  ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Shield:    ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Zap:       ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Eye:       ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Trophy:    ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M7 4H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3"/><path d="M17 4h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3"/><rect x="7" y="2" width="10" height="12" rx="2"/></svg>,
  FileText:  ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  AlertTri:  ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Calendar:  ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Map:       ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  User:      ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
};

// ─── SEED DATA ───────────────────────────────────────────────
const SEED_INSTALLERS = [
  {id:1,name:"SunPower SA",city:"Johannesburg",province:"Gauteng",rating:4.9,reviews:312,sessa:true,jobs:847,yrs:12,badge:"Top Rated",resp:"2 hrs",spec:"Residential",brands:["Sunsynk","Victron"],price_min:80000,price_max:200000,verified:true,finance:true,type:"installer",status:"approved"},
  {id:2,name:"Cape Solar Pro",city:"Cape Town",province:"Western Cape",rating:4.8,reviews:198,sessa:true,jobs:523,yrs:9,badge:"Most Popular",resp:"3 hrs",spec:"Commercial & Residential",brands:["Deye","Sunsynk"],price_min:60000,price_max:350000,verified:true,finance:true,type:"installer",status:"approved"},
  {id:3,name:"KZN Solar Solutions",city:"Durban",province:"KwaZulu-Natal",rating:4.7,reviews:143,sessa:true,jobs:389,yrs:7,badge:null,resp:"4 hrs",spec:"Off-grid",brands:["Victron","Pylontech"],price_min:70000,price_max:250000,verified:true,finance:false,type:"installer",status:"approved"},
  {id:4,name:"Pretoria Solar Works",city:"Pretoria",province:"Gauteng",rating:4.6,reviews:89,sessa:false,jobs:201,yrs:5,badge:"Fast Response",resp:"Same day",spec:"Residential",brands:["Growatt","Deye"],price_min:50000,price_max:150000,verified:true,finance:true,type:"installer",status:"approved"},
  {id:5,name:"FixSolar SA",city:"Johannesburg",province:"Gauteng",rating:4.9,reviews:203,sessa:false,jobs:0,yrs:8,badge:null,resp:"Same day",spec:"Inverter Repair",brands:["Victron","Sunsynk","Deye"],price_min:450,price_max:3000,verified:true,finance:false,type:"technician",status:"approved"},
  {id:6,name:"Panel Clean Pro",city:"Cape Town",province:"Western Cape",rating:4.8,reviews:156,sessa:false,jobs:0,yrs:5,badge:null,resp:"1 day",spec:"Panel Cleaning",brands:["All brands"],price_min:85,price_max:500,verified:true,finance:false,type:"technician",status:"approved"},
  {id:7,name:"Battery Doctors",city:"Pretoria",province:"Gauteng",rating:4.7,reviews:98,sessa:false,jobs:0,yrs:6,badge:null,resp:"24/7",spec:"Battery Replacement",brands:["Pylontech","BSL","Freedom Won"],price_min:1200,price_max:8000,verified:true,finance:false,type:"technician",status:"pending"},
];
const SEED_ARTICLES = [
  {id:1,title:"How much does a 5kW solar system cost in SA in 2026?",tag:"Guide",hot:true,read_minutes:7,published:true,views:12400,slug:"5kw-solar-cost-sa-2026"},
  {id:2,title:"Sunsynk vs Deye vs Victron — which inverter is best for SA?",tag:"Comparison",hot:true,read_minutes:9,published:true,views:8900,slug:"sunsynk-deye-victron-comparison"},
  {id:3,title:"How to claim your solar tax rebate from SARS",tag:"Tax",hot:false,read_minutes:5,published:true,views:6200,slug:"solar-tax-rebate-sars"},
  {id:4,title:"Is your solar system actually working? 7 signs it isn't",tag:"Maintenance",hot:false,read_minutes:6,published:true,views:4800,slug:"solar-system-working-signs"},
  {id:5,title:"Sodium-ion batteries are coming to SA",tag:"News",hot:true,read_minutes:5,published:true,views:3100,slug:"sodium-ion-batteries-sa"},
  {id:6,title:"Best solar panels available in SA 2026 — ranked",tag:"Comparison",hot:true,read_minutes:10,published:true,views:7100,slug:"best-solar-panels-sa-2026"},
];

// ─── PRIMITIVES ──────────────────────────────────────────────
function Spinner({s=20,c}){
  return <div style={{width:s,height:s,border:`2px solid ${c?c+"33":"rgba(245,166,35,.2)"}`,borderTopColor:c||"#f5a623",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>;
}

function Btn({children,onClick,variant="primary",sm,disabled,full,style={},loading}){
  const t=_globalTheme;
  const[hov,setHov]=useState(false);
  const V={
    primary:(t)=>({bg:`linear-gradient(135deg,${t.accent},${t.accent2})`,col:t.dark?"#000":"#fff",bdr:"none",sh:`0 4px 16px rgba(${t.rgb},.3)`}),
    ghost:(t)=>({bg:t.card,col:t.textMid,bdr:`1px solid ${t.border}`,sh:"none"}),
    danger:()=>({bg:"rgba(239,68,68,.1)",col:"#f87171",bdr:"1px solid rgba(239,68,68,.25)",sh:"none"}),
    success:()=>({bg:"rgba(74,222,128,.1)",col:"#4ade80",bdr:"1px solid rgba(74,222,128,.25)",sh:"none"}),
    accent:(t)=>({bg:`rgba(${t.rgb},.1)`,col:t.accent,bdr:`1px solid rgba(${t.rgb},.28)`,sh:"none"}),
  };
  return <_TC>{(t)=>{
    const v=(V[variant]||V.primary)(t);
    return <button onClick={onClick} disabled={disabled||loading}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:v.bg,color:v.col,border:v.bdr,borderRadius:sm?7:9,padding:sm?"6px 13px":"9px 18px",fontSize:sm?11:13,fontWeight:700,cursor:disabled||loading?"not-allowed":"pointer",opacity:disabled?.5:1,width:full?"100%":"auto",display:"inline-flex",alignItems:"center",gap:6,transition:"all .18s",whiteSpace:"nowrap",fontFamily:B,boxShadow:hov&&!disabled?v.sh:"none",transform:hov&&!disabled?"translateY(-1px)":"none",...style}}>
      {loading?<Spinner s={13} c={v.col}/>:children}
    </button>;
  }}</_TC>;
}

function Card({children,style={},onClick,hover}){
  const [hov,setHov]=useState(false);
  const t=_globalTheme;
  return <div onClick={onClick} onMouseEnter={()=>hover&&setHov(true)} onMouseLeave={()=>hover&&setHov(false)}
    style={{background:t.card,border:`1px solid ${hov?t.borderHover:t.border}`,borderRadius:14,transition:"border-color .2s,transform .2s,box-shadow .2s",transform:hov?"translateY(-2px)":"none",boxShadow:hov?`0 8px 24px rgba(0,0,0,.2)`:"none",cursor:onClick?"pointer":"default",...style}}>{children}</div>;
}

function Badge({children,color}){
  const c=color||_globalTheme.accent;
  return <span style={{fontSize:10,fontWeight:700,background:`${c}18`,color:c,padding:"2px 8px",borderRadius:20,letterSpacing:.4,whiteSpace:"nowrap"}}>{children}</span>;
}

function Inp({label,value,onChange,type="text",placeholder,rows,hint}){
  const t=_globalTheme;
  const base={width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"10px 13px",color:t.text,fontSize:13,fontFamily:B,boxSizing:"border-box",outline:"none",transition:"border-color .2s"};
  return <div style={{marginBottom:14}}>
    {label&&<label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:700}}>{label}</label>}
    {hint&&<div style={{fontSize:11,color:t.sub,marginBottom:5}}>{hint}</div>}
    {rows?<textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{...base,resize:"vertical"}} onFocus={e=>e.target.style.borderColor=`rgba(245,166,35,.5)`} onBlur={e=>e.target.style.borderColor=t.border}/>
      :<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={base} onFocus={e=>e.target.style.borderColor=`rgba(245,166,35,.5)`} onBlur={e=>e.target.style.borderColor=t.border}/>}
  </div>;
}

function Toggle({value,onChange,label,color}){
  const t=_globalTheme;const c=color||t.accent;
  return <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0"}}>
    {label&&<span style={{fontSize:13,color:t.textMid,fontFamily:B}}>{label}</span>}
    <div onClick={()=>onChange(!value)} style={{width:42,height:24,borderRadius:12,background:value?c:t.card,border:`1px solid ${value?c:t.border}`,cursor:"pointer",position:"relative",transition:"all .25s",flexShrink:0}}>
      <div style={{position:"absolute",top:2,left:value?20:2,width:18,height:18,borderRadius:"50%",background:value?(t.dark?"#000":"#fff"):t.sub,transition:"left .25s",boxShadow:"0 1px 4px rgba(0,0,0,.3)"}}/>
    </div>
  </div>;
}

// ─── MINI BAR CHART ──────────────────────────────────────────
function MiniBar({data,color,h=40,w=100}){
  if(!data||data.length===0)return null;
  const max=Math.max(...data,1);
  const barW=(w-(data.length-1)*2)/data.length;
  return <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display:"block"}}>
    {data.map((v,i)=>{
      const bh=Math.max(2,(v/max)*(h-4));
      return <rect key={i} x={i*(barW+2)} y={h-bh} width={barW} height={bh} rx="2" fill={i===data.length-1?color:`${color}55`}/>;
    })}
  </svg>;
}

// ─── ACTIVITY FEED (SVG icons, no emojis) ────────────────────
const LIVE_FEED = [
  {Icon:Ic.Zap,     text:"Solar Calculator used — 5kW result generated",   time:"2 min ago", color:"#f5a623"},
  {Icon:Ic.Map,     text:"Installer directory browsed — Gauteng filter",    time:"7 min ago", color:"#60a5fa"},
  {Icon:Ic.AlertTri,text:"Error code F32 looked up — Sunsynk",             time:"12 min ago",color:"#f87171"},
  {Icon:Ic.FileText,text:"New quote request submitted to SunPower SA",      time:"18 min ago",color:"#4ade80"},
  {Icon:Ic.Doc,     text:"Article read — '5kW solar cost 2026'",            time:"24 min ago",color:"#c084fc"},
  {Icon:Ic.Sun,     text:"Health check completed — score 72/100",           time:"31 min ago",color:"#22d3ee"},
];
function ActivityFeed({limit=6}){
  const t=_globalTheme;
  const feed=LIVE_FEED.slice(0,limit);
  return <div style={{display:"flex",flexDirection:"column",gap:0}}>
    {feed.map((e,i)=>(
      <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 0",borderBottom:`1px solid ${i<feed.length-1?t.border:"transparent"}`}}>
        <div style={{width:28,height:28,borderRadius:8,background:`${e.color}14`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><e.Icon s={13} c={e.color}/></div>
        <span style={{flex:1,fontSize:12,color:t.textMid,lineHeight:1.4}}>{e.text}</span>
        <span style={{fontSize:10,color:t.sub,flexShrink:0,whiteSpace:"nowrap"}}>{e.time}</span>
      </div>
    ))}
  </div>;
}

// ─── TOOL USAGE ──────────────────────────────────────────────
const TOOL_DATA = [
  {tool:"Solar Calculator",  Icon:Ic.Zap,      sessions:1847,pct:68,top:true, color:"#f5a623"},
  {tool:"Installer Directory",Icon:Ic.Map,      sessions:1223,pct:45,top:false,color:"#60a5fa"},
  {tool:"Error Code Translator",Icon:Ic.AlertTri,sessions:892,pct:33,top:false,color:"#f87171"},
  {tool:"Health Check",       Icon:Ic.Sun,      sessions:764, pct:28,top:false,color:"#4ade80"},
  {tool:"Blog & Guides",      Icon:Ic.Doc,      sessions:598, pct:22,top:false,color:"#c084fc"},
  {tool:"Pro Calculator",     Icon:Ic.Cog,      sessions:312, pct:11,top:false,color:"#22d3ee"},
];
function ToolContest(){
  const t=_globalTheme;
  return <div style={{display:"flex",flexDirection:"column",gap:10}}>
    {TOOL_DATA.map(d=>(
      <div key={d.tool} style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:26,height:26,borderRadius:7,background:`${d.color}14`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><d.Icon s={12} c={d.color}/></div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,alignItems:"center"}}>
            <span style={{fontSize:12,color:t.textMid,fontWeight:d.top?700:400}}>{d.tool}{d.top&&<span style={{marginLeft:6,fontSize:9,background:`rgba(245,166,35,.15)`,color:t.accent,padding:"1px 6px",borderRadius:6,fontWeight:700}}>TOP</span>}</span>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:11,fontWeight:700,color:d.color}}>{d.sessions.toLocaleString()}</span>
              <span style={{fontSize:10,color:t.sub}}>{d.pct}%</span>
            </div>
          </div>
          <div style={{height:4,background:"rgba(255,255,255,.05)",borderRadius:2}}>
            <div style={{width:`${d.pct}%`,height:"100%",background:d.color,borderRadius:2,transition:"width 1.2s ease"}}/>
          </div>
        </div>
      </div>
    ))}
  </div>;
}

// ─── STAT CARD with rotating delta ───────────────────────────
function StatCard({label,value,color,Icon,deltas,sparkData,loading}){
  const t=_globalTheme;
  const[di,setDi]=useState(0);
  const[hov,setHov]=useState(false);
  useEffect(()=>{
    if(!deltas||deltas.length<2)return;
    const id=setInterval(()=>setDi(p=>(p+1)%deltas.length),3000);
    return()=>clearInterval(id);
  },[deltas]);
  const delta=deltas?deltas[di]:null;
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:t.card,border:`1px solid ${hov?`rgba(${t.rgb},.25)`:t.border}`,borderRadius:14,padding:"16px",overflow:"hidden",position:"relative",transition:"all .22s",transform:hov?"translateY(-2px)":"none",boxShadow:hov?`0 8px 24px rgba(0,0,0,.2)`:"none"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
        <div style={{width:34,height:34,borderRadius:9,background:`${color}14`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          {Icon&&<Icon s={16} c={color}/>}
        </div>
        {delta&&<span style={{fontSize:10,fontWeight:700,color:delta.startsWith("+")?t.green:t.red,background:delta.startsWith("+")?`rgba(74,222,128,.1)`:`rgba(248,113,113,.1)`,padding:"2px 7px",borderRadius:10,transition:"all .3s",animation:"fadeIn .3s ease"}}>{delta}</span>}
      </div>
      <div style={{fontFamily:H,fontSize:28,fontWeight:900,color,marginBottom:3,lineHeight:1}}>
        {loading?"–":value}
      </div>
      <div style={{fontSize:11,color:t.sub}}>{label}</div>
      {sparkData&&<div style={{position:"absolute",bottom:0,right:0,opacity:.5}}><MiniBar data={sparkData} color={color} h={36} w={80}/></div>}
      {hov&&<div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 100%,${color}08,transparent 70%)`,pointerEvents:"none",borderRadius:14}}/>}
    </div>
  );
}

// ─── TRAFFIC WIDGET ──────────────────────────────────────────
function TrafficWidget(){
  const t=_globalTheme;
  const[hov,setHov]=useState(null);
  const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const visits=[142,189,223,198,267,312,289];
  const max=Math.max(...visits);
  return(
    <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,padding:"18px",height:"100%"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div>
          <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text}}>Weekly Traffic</div>
          <div style={{fontSize:11,color:t.sub,marginTop:2}}>Unique visitors · 7-day view</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontFamily:H,fontSize:20,fontWeight:800,color:t.accent}}>{visits.reduce((a,b)=>a+b,0).toLocaleString()}</div>
          <div style={{fontSize:10,color:t.green,fontWeight:600}}>+18% vs last week</div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"flex-end",gap:6,height:80}}>
        {visits.map((v,i)=>(
          <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"default"}}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}>
            {hov===i&&<div style={{fontSize:10,color:t.text,fontWeight:700,background:t.card2,border:`1px solid ${t.border}`,borderRadius:6,padding:"2px 6px",whiteSpace:"nowrap"}}>{v} visits</div>}
            <div style={{width:"100%",background:hov===i?t.accent:`${t.accent}44`,borderRadius:"3px 3px 0 0",transition:"all .2s",height:`${(v/max)*70}px`,minHeight:3}}/>
            <div style={{fontSize:9,color:t.sub}}>{days[i]}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop:12,display:"flex",gap:16}}>
        {[["Avg/day",Math.round(visits.reduce((a,b)=>a+b,0)/7)],["Peak","Sat"],["Bounce rate","38%"]].map(([l,v])=>(
          <div key={l}>
            <div style={{fontSize:10,color:t.sub}}>{l}</div>
            <div style={{fontSize:13,fontWeight:700,color:t.textMid}}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────
function Dashboard({stats,loading}){
  const sc=useScreen();
  const t=_globalTheme;
  const now=new Date();
  const hour=now.getHours();
  const greeting=hour<12?"Good morning":hour<17?"Good afternoon":"Good evening";

  const statCards=[
    {label:"Live Installers",value:stats.installers,color:t.accent,Icon:Ic.Install,deltas:["+2 this week","+1 today","new this month"],sparkData:[2,3,3,4,4,5,stats.installers]},
    {label:"Total Leads",value:stats.leads,color:t.blue,Icon:Ic.Clip,deltas:["+12 today","+38 this week","new this month"],sparkData:[8,12,9,14,11,16,stats.leads]},
    {label:"Subscribers",value:stats.subscribers,color:t.purple,Icon:Ic.Users,deltas:["+5 today","+23 this week","growing"],sparkData:[5,8,7,9,10,12,stats.subscribers]},
    {label:"Published Posts",value:stats.posts,color:t.green,Icon:Ic.Doc,deltas:["6 live","2 trending","all indexed"],sparkData:[4,4,5,5,6,6,stats.posts]},
    {label:"Pending Approvals",value:stats.pending,color:stats.pending>0?t.red:t.sub,Icon:Ic.AlertTri,deltas:stats.pending>0?["action needed","review now"]:["all clear","0 pending"],sparkData:[0,1,0,2,1,0,stats.pending]},
    {label:"Page Events",value:"4.8k",color:t.cyan,Icon:Ic.Activity,deltas:["+340 today","high engagement","7-day record"],sparkData:[600,720,680,790,810,870,900]},
  ];

  const topPerformers=[
    {name:"SunPower SA",type:"installer",leads:23,rating:4.9,badge:"Top Rated"},
    {name:"Cape Solar Pro",type:"installer",leads:18,rating:4.8,badge:"Most Popular"},
    {name:"FixSolar SA",type:"technician",leads:15,rating:4.9,badge:null},
  ];

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{marginBottom:24}}>
        <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text}}>{greeting}, Tebello</div>
        <div style={{fontSize:13,color:t.sub,marginTop:3}}>Here's what's happening with SolarIQ today</div>
        {stats.pending>0&&(
          <div style={{marginTop:14,background:"rgba(239,68,68,.06)",border:"1px solid rgba(239,68,68,.18)",borderRadius:10,padding:"11px 16px",display:"flex",alignItems:"center",gap:10}}>
            <Ic.AlertTri s={16} c={t.red}/>
            <span style={{fontSize:13,color:t.red,fontWeight:600}}>{stats.pending} installer application{stats.pending!==1?"s":""} awaiting review</span>
            <button onClick={()=>{}} style={{marginLeft:"auto",background:"rgba(239,68,68,.15)",border:"1px solid rgba(239,68,68,.3)",color:t.red,borderRadius:7,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:B,transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,.25)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(239,68,68,.15)"}>Review in Installers</button>
          </div>
        )}
      </div>

      {/* Stat cards */}
      <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":sc.isTablet?"repeat(3,1fr)":"repeat(6,1fr)",gap:12,marginBottom:24}}>
        {statCards.map(c=><StatCard key={c.label} {...c} loading={loading}/>)}
      </div>

      {/* Main grid */}
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1fr 1fr 1fr":"1fr",gap:16,marginBottom:16}}>
        {/* Traffic */}
        <TrafficWidget/>

        {/* Live Activity Feed — 6 items */}
        <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,padding:"18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text}}>Live Activity</div>
            <div style={{width:8,height:8,borderRadius:"50%",background:t.green,animation:"pulse 2s infinite"}}/>
          </div>
          <ActivityFeed limit={6}/>
        </div>

        {/* Top performers */}
        <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,padding:"18px"}}>
          <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text,marginBottom:16,display:"flex",alignItems:"center",gap:7}}>
            <Ic.Trophy s={14} c={t.accent}/> Top Performers
          </div>
          {topPerformers.map((p,i)=>(
            <div key={p.name} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${i<topPerformers.length-1?t.border:"transparent"}`}}>
              <div style={{width:28,height:28,borderRadius:8,background:`rgba(245,166,35,.1)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:H,fontSize:13,fontWeight:900,color:t.accent}}>{i+1}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,color:t.text,marginBottom:1}}>{p.name}</div>
                <div style={{fontSize:10,color:t.sub,textTransform:"capitalize"}}>{p.type}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:12,fontWeight:700,color:t.accent}}>{p.leads} leads</div>
                <div style={{fontSize:10,color:t.sub}}>★ {p.rating}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tool usage */}
      <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,padding:"18px",marginBottom:16}}>
        <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text,marginBottom:16}}>Tool Usage This Week</div>
        <ToolContest/>
      </div>

      {/* Quick Actions — now actually navigate */}
      <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,padding:"18px"}}>
        <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text,marginBottom:14}}>Quick Actions</div>
        <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":"repeat(4,1fr)",gap:8}}>
          {[
            {label:"Add Blog Post",Icon:Ic.Doc,color:t.accent,action:"blog"},
            {label:"View Leads",Icon:Ic.Clip,color:t.blue,action:"leads"},
            {label:"Review Installers",Icon:Ic.Install,color:t.green,action:"installers"},
            {label:"View Analytics",Icon:Ic.Chart,color:t.purple,action:"analytics"},
          ].map(qa=>{
            const[hov,setHov]=useState(false);
            return(
              <button key={qa.label}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                style={{background:hov?`${qa.color}12`:t.card2,border:`1px solid ${hov?`${qa.color}33`:t.border}`,borderRadius:10,padding:"12px",cursor:"pointer",textAlign:"center",transition:"all .2s",transform:hov?"translateY(-2px)":"none"}}>
                <div style={{width:32,height:32,borderRadius:8,background:`${qa.color}14`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px"}}><qa.Icon s={15} c={qa.color}/></div>
                <div style={{fontSize:11,fontWeight:600,color:t.textMid,fontFamily:B}}>{qa.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── INSTALLERS PAGE ─────────────────────────────────────────
function InstallersPage(){
  const sc=useScreen();
  const t=_globalTheme;
  const[items,setItems]=useState(SEED_INSTALLERS);
  const[search,setSearch]=useState("");
  const[filter,setFilter]=useState("all");
  const[typeFilter,setTypeFilter]=useState("all");
  const[selected,setSelected]=useState(null);

  const filtered=items.filter(i=>{
    if(search&&!i.name.toLowerCase().includes(search.toLowerCase())&&!i.city.toLowerCase().includes(search.toLowerCase()))return false;
    if(filter!=="all"&&i.status!==filter)return false;
    if(typeFilter!=="all"&&i.type!==typeFilter)return false;
    return true;
  });

  const approve=id=>setItems(items.map(i=>i.id===id?{...i,status:"approved"}:i));
  const reject=id=>setItems(items.map(i=>i.id===id?{...i,status:"rejected"}:i));
  const setSessa=(id,val)=>setItems(items.map(i=>i.id===id?{...i,sessa:val}:i));
  const toggleBadge=(id,badge)=>setItems(items.map(i=>i.id===id?{...i,badge:i.badge===badge?null:badge}:i));
  const scC=s=>s==="approved"?t.green:s==="pending"?t.accent:t.red;
  const toggleSelected=id=>setSelected(prev=>prev===id?null:id);

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text}}>Installers & Technicians</div>
          <div style={{fontSize:12,color:t.sub,marginTop:3}}>{items.filter(i=>i.status==="approved").length} live · {items.filter(i=>i.status==="pending").length} pending</div>
        </div>
        <Btn variant="primary"><Ic.Plus s={13}/> Add New</Btn>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:200,position:"relative"}}>
          <div style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)"}}><Ic.Search s={13} c={t.sub}/></div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or city..."
            style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"9px 12px 9px 32px",color:t.text,fontSize:13,fontFamily:B,outline:"none",boxSizing:"border-box"}}/>
        </div>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
        {["all","approved","pending","rejected"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?`rgba(245,166,35,.12)`:t.card,border:`1px solid ${filter===f?`rgba(245,166,35,.4)`:t.border}`,color:filter===f?t.accent:t.sub,borderRadius:20,padding:"5px 13px",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:B,textTransform:"capitalize",transition:"all .15s"}}>{f}</button>
        ))}
        <div style={{width:1,background:t.border,margin:"0 4px"}}/>
        {["all","installer","technician"].map(f=>(
          <button key={f} onClick={()=>setTypeFilter(f)} style={{background:typeFilter===f?`rgba(96,165,250,.12)`:t.card,border:`1px solid ${typeFilter===f?`rgba(96,165,250,.4)`:t.border}`,color:typeFilter===f?t.blue:t.sub,borderRadius:20,padding:"5px 13px",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:B,textTransform:"capitalize",transition:"all .15s"}}>
            {f==="all"?"All Types":f==="installer"?"Installers":"Technicians"}
          </button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1fr 1fr":"1fr",gap:10}}>
        {filtered.map(inst=>{
          const[hov,setHov]=useState(false);
          return(
            <Card key={inst.id} style={{padding:"16px",transition:"all .2s",transform:hov?"translateY(-1px)":"none",boxShadow:hov?`0 4px 16px rgba(0,0,0,.2)`:"none"}}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
              <div style={{display:"flex",alignItems:"flex-start",gap:12,cursor:"pointer"}} onClick={()=>toggleSelected(inst.id)}>
                {/* Logo placeholder */}
                <div style={{width:44,height:44,borderRadius:12,background:`rgba(245,166,35,.1)`,border:`1px dashed rgba(245,166,35,.25)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <LogoIcon s={20}/>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text}}>{inst.name}</span>
                    <Badge color={scC(inst.status)}>{inst.status}</Badge>
                    <Badge color={inst.type==="installer"?t.accent:t.blue}>{inst.type}</Badge>
                    {inst.sessa&&<Badge color={t.green}>SESSA</Badge>}
                    {inst.badge&&<Badge color={t.purple}>{inst.badge}</Badge>}
                  </div>
                  <div style={{fontSize:11,color:t.sub}}>{inst.city}, {inst.province} · {inst.spec} · {inst.yrs} yrs exp</div>
                  <div style={{fontSize:11,color:t.sub,marginTop:2}}>★ {inst.rating} ({inst.reviews} reviews) · R{(inst.price_min||0).toLocaleString()}–R{(inst.price_max||0).toLocaleString()}</div>
                </div>
                <span style={{fontSize:14,color:t.sub,transform:selected===inst.id?"rotate(90deg)":"none",transition:"transform .2s",flexShrink:0,marginTop:4}}>›</span>
              </div>
              {selected===inst.id&&(
                <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${t.border}`,animation:"fadeUp .2s ease"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                    {[["Brands",(inst.brands||[]).join(", ")],["Response",inst.resp],["Finance",inst.finance?"Yes":"No"]].map(([l,v])=>v&&(
                      <div key={l}><div style={{fontSize:10,color:t.sub,textTransform:"uppercase",letterSpacing:.8,marginBottom:2}}>{l}</div><div style={{fontSize:13,color:t.textMid}}>{v}</div></div>
                    ))}
                  </div>
                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:11,color:t.sub,marginBottom:7,textTransform:"uppercase",letterSpacing:1}}>Assign Badge</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {["Top Rated","Most Popular","Fast Response","High PSH Zone"].map(b=>(
                        <button key={b} onClick={()=>toggleBadge(inst.id,b)} style={{background:inst.badge===b?`rgba(245,166,35,.12)`:t.card,border:`1px solid ${inst.badge===b?`rgba(245,166,35,.4)`:t.border}`,color:inst.badge===b?t.accent:t.sub,borderRadius:7,padding:"4px 10px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:B,transition:"all .15s"}}>{b}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                    {inst.status!=="approved"&&<Btn variant="success" sm onClick={()=>approve(inst.id)}><Ic.Chk s={11} c={t.green}/> Approve</Btn>}
                    {inst.status!=="rejected"&&<Btn variant="danger" sm onClick={()=>reject(inst.id)}><Ic.X s={11} c={t.red}/> Reject</Btn>}
                    <Btn variant="ghost" sm onClick={()=>setSessa(inst.id,!inst.sessa)}>{inst.sessa?"Remove SESSA":"Mark SESSA"}</Btn>
                    <Btn variant="ghost" sm>View Docs</Btn>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
        {filtered.length===0&&<Card style={{padding:"40px",textAlign:"center",gridColumn:sc.isDesktop?"span 2":"1"}}><div style={{color:t.sub,fontSize:13}}>No results match your filters</div></Card>}
      </div>
    </div>
  );
}

// ─── BLOG PAGE (rich editor, no JSON body exposed) ───────────
function BlogPage(){
  const sc=useScreen();
  const t=_globalTheme;
  const[posts,setPosts]=useState(SEED_ARTICLES);
  const[editing,setEditing]=useState(null);
  const[bodyBlocks,setBodyBlocks]=useState([{h:"",p:""}]);
  const[form,setForm]=useState({title:"",intro:"",tag:"Guide",cover_image:"",hot:false,published:true,read_minutes:5,slug:""});
  const tagColor=tag=>({Guide:t.accent,Comparison:t.blue,Tax:t.green,Maintenance:t.cyan,News:t.red,Review:t.purple}[tag]||t.sub);
  const slugify=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  const del=id=>{if(confirm("Delete this post?"))setPosts(posts.filter(p=>p.id!==id));};

  const addBlock=()=>setBodyBlocks(b=>[...b,{h:"",p:""}]);
  const removeBlock=i=>setBodyBlocks(b=>b.filter((_,j)=>j!==i));
  const updateBlock=(i,k,v)=>setBodyBlocks(b=>b.map((bl,j)=>j===i?{...bl,[k]:v}:bl));

  if(editing!==null)return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <button onClick={()=>setEditing(null)} style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:13,marginBottom:20,fontFamily:B,display:"flex",alignItems:"center",gap:6}}><Ic.Left s={14} c={t.sub}/> Back to posts</button>
      <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text,marginBottom:24}}>{editing==="new"?"New Post":"Edit Post"}</div>
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1.6fr 1fr":"1fr",gap:16,alignItems:"start"}}>
        <div>
          <Card style={{padding:"20px",marginBottom:14}}>
            <Inp label="Title" value={form.title} onChange={v=>setForm({...form,title:v,slug:slugify(v)})} placeholder="How much does solar cost in SA?"/>
            <Inp label="Slug (URL)" value={form.slug} onChange={v=>setForm({...form,slug:v})} placeholder="auto-generated"/>
            <Inp label="Intro / Summary" value={form.intro} onChange={v=>setForm({...form,intro:v})} rows={2} placeholder="One-line summary shown on card"/>
            {/* Cover image upload */}
            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:700}}>Cover Image</label>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input type="text" value={form.cover_image||""} onChange={e=>setForm({...form,cover_image:e.target.value})} placeholder="Paste image URL or upload below"
                  style={{flex:1,background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"10px 13px",color:t.text,fontSize:13,fontFamily:B,outline:"none"}}/>
                <label style={{background:t.card2,border:`1px solid ${t.border}`,borderRadius:9,padding:"10px 14px",fontSize:12,fontWeight:600,color:t.textMid,cursor:"pointer",fontFamily:B,whiteSpace:"nowrap"}}>
                  Upload <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(f){const url=URL.createObjectURL(f);setForm(p=>({...p,cover_image:url}));}}}/>
                </label>
              </div>
              {form.cover_image&&<img src={form.cover_image} alt="" style={{width:"100%",height:120,objectFit:"cover",borderRadius:9,marginTop:8,border:`1px solid ${t.border}`}}/>}
            </div>
            <Inp label="YouTube Video ID (optional)" value={form.youtube_id||""} onChange={v=>setForm({...form,youtube_id:v})} placeholder="e.g. dQw4w9WgXcQ — paste ID from youtube.com/watch?v=ID" hint="The video will appear mid-article where you place it in the sections below."/>
            {/* Rich body editor — no JSON exposed */}
            <div style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,fontWeight:700}}>Article Sections</label>
                <Btn sm variant="ghost" onClick={addBlock}><Ic.Plus s={11}/> Add Section</Btn>
              </div>
              {bodyBlocks.map((bl,i)=>(
                <div key={i} style={{background:t.card2,border:`1px solid ${t.border}`,borderRadius:10,padding:"14px",marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <span style={{fontSize:11,color:t.sub,fontWeight:600}}>Section {i+1}</span>
                    {bodyBlocks.length>1&&<button onClick={()=>removeBlock(i)} style={{background:"none",border:"none",cursor:"pointer",color:t.red,fontSize:11,fontFamily:B}}>Remove</button>}
                  </div>
                  <input value={bl.h} onChange={e=>updateBlock(i,"h",e.target.value)} placeholder="Section heading..."
                    style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:8,padding:"8px 12px",color:t.text,fontSize:13,fontFamily:B,outline:"none",marginBottom:8,boxSizing:"border-box"}}/>
                  <textarea value={bl.p} onChange={e=>updateBlock(i,"p",e.target.value)} placeholder="Section body text..." rows={4}
                    style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:8,padding:"8px 12px",color:t.text,fontSize:13,fontFamily:B,outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <Btn onClick={async()=>{
                const payload={...form,body:bodyBlocks.filter(b=>b.h||b.p),slug:form.slug||slugify(form.title),updated_at:new Date().toISOString()};
                if(editing==="new")await sb.from("posts").insert(payload);
                else await sb.from("posts").update(payload).eq("id",editing);
                setEditing(null);
              }}>Save Post</Btn>
              <Btn variant="ghost" onClick={()=>setEditing(null)}>Cancel</Btn>
            </div>
          </Card>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Card style={{padding:"18px"}}>
            <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:t.text,marginBottom:12}}>Category</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:14}}>
              {["Guide","Comparison","Tax","Maintenance","News","Review"].map(tag=>(
                <button key={tag} onClick={()=>setForm({...form,tag})} style={{background:form.tag===tag?`${tagColor(tag)}18`:t.card,border:`1px solid ${form.tag===tag?tagColor(tag):t.border}`,color:form.tag===tag?tagColor(tag):t.sub,borderRadius:7,padding:"6px 10px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:B,transition:"all .15s"}}>{tag}</button>
              ))}
            </div>
            <Inp label="Read Time (minutes)" value={String(form.read_minutes)} onChange={v=>setForm({...form,read_minutes:parseInt(v)||5})} type="number"/>
            <Toggle value={form.published} onChange={v=>setForm({...form,published:v})} label="Published" color={t.green}/>
            <Toggle value={form.hot} onChange={v=>setForm({...form,hot:v})} label="Trending (fire badge)" color={t.red}/>
          </Card>
          <Card style={{padding:"18px"}}>
            <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:t.text,marginBottom:10}}>SEO Preview</div>
            <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:9,padding:"12px",fontSize:11}}>
              <div style={{color:t.blue,marginBottom:3}}>solariq.co.za/blog/{form.slug||"your-slug"}</div>
              <div style={{fontWeight:700,color:t.text,marginBottom:3,fontSize:13}}>{form.title||"Article Title"}</div>
              <div style={{color:t.sub,lineHeight:1.5}}>{(form.intro||"Article summary...").slice(0,120)}</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text}}>Blog Posts</div>
          <div style={{fontSize:12,color:t.sub}}>{posts.filter(p=>p.published).length} published · {posts.filter(p=>!p.published).length} drafts</div>
        </div>
        <Btn onClick={()=>{setForm({title:"",intro:"",tag:"Guide",cover_image:"",hot:false,published:true,read_minutes:5,slug:""});setBodyBlocks([{h:"",p:""}]);setEditing("new");}}>
          <Ic.Plus s={13}/> New Post
        </Btn>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {posts.map(p=>{
          const[hov,setHov]=useState(false);
          return(
            <Card key={p.id} style={{padding:"14px 16px",transition:"all .2s",transform:hov?"translateY(-1px)":"none"}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                {p.cover_image&&<img src={p.cover_image} style={{width:56,height:40,objectFit:"cover",borderRadius:7,flexShrink:0}} alt=""/>}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text}}>{p.title}</span>
                    <Badge color={tagColor(p.tag)}>{p.tag}</Badge>
                    {p.hot&&<span style={{fontSize:14}}>🔥</span>}
                  </div>
                  <div style={{fontSize:11,color:t.sub}}>
                    {p.published?<span style={{color:t.green}}>● Published</span>:<span style={{color:t.sub}}>○ Draft</span>}
                    {" · "}{p.read_minutes} min · {(p.views||0).toLocaleString()} views
                  </div>
                </div>
                <div style={{display:"flex",gap:6,flexShrink:0}}>
                  <Btn sm variant="ghost" onClick={()=>{setForm({...p});setBodyBlocks(Array.isArray(p.body)?p.body:[{h:"Content",p:""}]);setEditing(p.id);}}>Edit</Btn>
                  <Btn sm variant={p.published?"ghost":"success"} onClick={()=>setPosts(posts.map(x=>x.id===p.id?{...x,published:!x.published}:x))}>{p.published?"Unpublish":"Publish"}</Btn>
                  <Btn sm variant="danger" onClick={()=>del(p.id)}>Delete</Btn>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── LEADS PAGE ───────────────────────────────────────────────
function LeadsPage(){
  const sc=useScreen();
  const t=_globalTheme;
  const[leads,setLeads]=useState([]);
  const[loading,setLoading]=useState(true);
  const[filter,setFilter]=useState("all");
  const[search,setSearch]=useState("");

  useEffect(()=>{
    sb.from("leads").select("*,installers(name)").order("created_at",{ascending:false})
      .then(({data})=>{setLeads(data||[]);setLoading(false);});
  },[]);

  const update=async(id,status)=>{
    await sb.from("leads").update({status}).eq("id",id);
    setLeads(leads.map(l=>l.id===id?{...l,status}:l));
  };

  const exportCSV=()=>{
    const rows=[["Name","Email","Phone","Area","System kW","Bill","Status","Date"],...leads.map(l=>[l.name,l.email,l.phone,l.area,l.system_kw,l.monthly_bill,l.status,l.created_at?.slice(0,10)])];
    const csv=rows.map(r=>r.map(x=>`"${x||""}"`).join(",")).join("\n");
    const a=document.createElement("a");a.href="data:text/csv;charset=utf-8,"+encodeURIComponent(csv);a.download="solariq-leads.csv";a.click();
  };

  const filtered=leads.filter(l=>{
    if(filter!=="all"&&l.status!==filter)return false;
    if(search&&!l.name?.toLowerCase().includes(search.toLowerCase())&&!l.email?.toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  });

  const scC=s=>({new:t.accent,contacted:t.blue,quoted:t.purple,converted:t.green,lost:t.red}[s]||t.sub);

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text}}>Leads</div>
          <div style={{fontSize:12,color:t.sub}}>{leads.length} total · {leads.filter(l=>l.status==="new").length} new</div>
        </div>
        <Btn variant="ghost" sm onClick={exportCSV}><Ic.Download s={12}/> Export CSV</Btn>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:180,position:"relative"}}>
          <div style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)"}}><Ic.Search s={13} c={t.sub}/></div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search leads..."
            style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"9px 12px 9px 32px",color:t.text,fontSize:13,fontFamily:B,outline:"none",boxSizing:"border-box"}}/>
        </div>
        {["all","new","contacted","quoted","converted","lost"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?`rgba(245,166,35,.12)`:t.card,border:`1px solid ${filter===f?`rgba(245,166,35,.4)`:t.border}`,color:filter===f?t.accent:t.sub,borderRadius:20,padding:"5px 12px",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:B,textTransform:"capitalize",transition:"all .15s"}}>{f}</button>
        ))}
      </div>
      {loading?(
        <div style={{display:"flex",justifyContent:"center",padding:40}}><Spinner/></div>
      ):filtered.length===0?(
        <Card style={{padding:"40px",textAlign:"center"}}><div style={{fontSize:14,color:t.sub}}>No leads yet. Leads from quote requests will appear here.</div></Card>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtered.map(l=>{
            const[hov,setHov]=useState(false);
            return(
              <Card key={l.id} style={{padding:"14px 16px",transition:"all .2s",transform:hov?"translateY(-1px)":"none"}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
                <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text,marginBottom:3}}>{l.name}</div>
                    <div style={{fontSize:11,color:t.sub}}>{l.email} · {l.phone} · {l.area}</div>
                    <div style={{fontSize:11,color:t.sub,marginTop:2}}>
                      {l.system_kw>0&&`${l.system_kw}kW system · `}
                      {l.monthly_bill>0&&<span style={{color:t.accent,fontWeight:700}}>R{l.monthly_bill.toLocaleString()}/mo bill</span>}
                    </div>
                  </div>
                  <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                    <Badge color={scC(l.status)}>{l.status}</Badge>
                    {["contacted","quoted","converted","lost"].map(s=>(
                      <button key={s} onClick={()=>update(l.id,s)} style={{background:t.card,border:`1px solid ${t.border}`,color:t.sub,borderRadius:7,padding:"3px 9px",fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:B,transition:"all .15s",textTransform:"capitalize"}} onMouseEnter={e=>e.currentTarget.style.borderColor=`rgba(245,166,35,.35)`} onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}>{s}</button>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── ANALYTICS PAGE ──────────────────────────────────────────
function AnalyticsPage(){
  const t=_globalTheme;const sc=useScreen();
  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text,marginBottom:4}}>Analytics</div>
      <div style={{fontSize:12,color:t.sub,marginBottom:24}}>All recordable site activity · Last 30 days</div>
      {/* Traffic by province */}
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1fr 1fr":"1fr",gap:16,marginBottom:16}}>
        <Card style={{padding:"18px"}}>
          <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text,marginBottom:16}}>Traffic by Province</div>
          {[["Gauteng",38,"#f5a623"],["Western Cape",24,"#60a5fa"],["KwaZulu-Natal",16,"#4ade80"],["Eastern Cape",9,"#c084fc"],["Free State",6,"#22d3ee"],["Other",7,"#555"]].map(([prov,pct,c])=>(
            <div key={prov} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{fontSize:12,color:t.sub,width:100,flexShrink:0}}>{prov}</div>
              <div style={{flex:1,height:6,background:"rgba(255,255,255,.05)",borderRadius:3}}>
                <div style={{width:`${pct}%`,height:"100%",background:c,borderRadius:3}}/>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:c,width:32,textAlign:"right"}}>{pct}%</div>
            </div>
          ))}
        </Card>
        <Card style={{padding:"18px"}}>
          <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text,marginBottom:16}}>Traffic Sources</div>
          {[["Direct",42,"#f5a623"],["Google Search",31,"#4ade80"],["Social Media",14,"#60a5fa"],["Referral",8,"#c084fc"],["Other",5,"#555"]].map(([src,pct,c])=>(
            <div key={src} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{fontSize:12,color:t.sub,width:100,flexShrink:0}}>{src}</div>
              <div style={{flex:1,height:6,background:"rgba(255,255,255,.05)",borderRadius:3}}>
                <div style={{width:`${pct}%`,height:"100%",background:c,borderRadius:3}}/>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:c,width:32,textAlign:"right"}}>{pct}%</div>
            </div>
          ))}
        </Card>
      </div>
      <Card style={{padding:"18px",marginBottom:16}}>
        <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text,marginBottom:16}}>Tool Usage</div>
        <ToolContest/>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"repeat(3,1fr)":"1fr",gap:12}}>
        {[["Avg. Session","3m 42s","#f5a623"],["Bounce Rate","38%","#4ade80"],["Mobile Users","64%","#60a5fa"]].map(([l,v,c])=>(
          <Card key={l} style={{padding:"16px",textAlign:"center"}}>
            <div style={{fontFamily:H,fontSize:28,fontWeight:900,color:c,marginBottom:4}}>{v}</div>
            <div style={{fontSize:12,color:t.sub}}>{l}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── SUBSCRIBERS PAGE ────────────────────────────────────────
function SubscribersPage(){
  const t=_globalTheme;
  const[subs,setSubs]=useState([]);
  const[loading,setLoading]=useState(true);
  useEffect(()=>{
    sb.from("subscribers").select("*").order("created_at",{ascending:false})
      .then(({data})=>{setSubs(data||[]);setLoading(false);});
  },[]);
  const exportCSV=()=>{
    const rows=[["Email","Source","Date"],...subs.map(s=>[s.email,s.source,s.created_at?.slice(0,10)])];
    const csv=rows.map(r=>r.map(x=>`"${x||""}"`).join(",")).join("\n");
    const a=document.createElement("a");a.href="data:text/csv;charset=utf-8,"+encodeURIComponent(csv);a.download="solariq-subscribers.csv";a.click();
  };
  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:_globalTheme.text}}>Subscribers</div>
          <div style={{fontSize:12,color:t.sub}}>{subs.length} total subscribers</div>
        </div>
        <Btn variant="ghost" sm onClick={exportCSV}><Ic.Download s={12}/> Export CSV</Btn>
      </div>
      {loading?<div style={{display:"flex",justifyContent:"center",padding:40}}><Spinner/></div>:
        subs.length===0?<Card style={{padding:"40px",textAlign:"center"}}><div style={{fontSize:14,color:t.sub}}>No subscribers yet.</div></Card>:
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {subs.map(s=>(
            <Card key={s.id} style={{padding:"12px 16px"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:32,height:32,borderRadius:8,background:`rgba(245,166,35,.1)`,display:"flex",alignItems:"center",justifyContent:"center"}}><Ic.Mail s={14} c={t.accent}/></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:t.text}}>{s.email}</div>
                  <div style={{fontSize:11,color:t.sub}}>{s.source||"newsletter"} · {s.created_at?.slice(0,10)}</div>
                </div>
                <Badge color={s.active!==false?t.green:t.sub}>{s.active!==false?"Active":"Inactive"}</Badge>
              </div>
            </Card>
          ))}
        </div>
      }
    </div>
  );
}

// ─── USERS / TEAM PAGE ───────────────────────────────────────
function UsersPage(){
  const t=_globalTheme;
  const sc=useScreen();
  const USERS=[
    {id:1,name:"Tebello",role:"Super Admin",email:"tebello@aquarianedge.co.za",permissions:["all"],avatar:"T",color:t.accent,lastLogin:"Just now"},
  ];
  const permList=["Dashboard","Installers","Leads","Blog","Analytics","Subscribers","Settings"];
  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text}}>Team & Users</div>
          <div style={{fontSize:12,color:t.sub}}>{USERS.length} team member{USERS.length!==1?"s":""}</div>
        </div>
        <Btn><Ic.Plus s={13}/> Invite Member</Btn>
      </div>
      {USERS.map(u=>(
        <Card key={u.id} style={{padding:"20px",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:14,flexWrap:"wrap"}}>
            <div style={{width:52,height:52,borderRadius:14,background:`${u.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:H,fontSize:22,fontWeight:900,color:u.color,flexShrink:0}}>{u.avatar}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                <span style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text}}>{u.name}</span>
                <Badge color={t.accent}>{u.role}</Badge>
              </div>
              <div style={{fontSize:12,color:t.sub,marginBottom:12}}>{u.email} · Last login: {u.lastLogin}</div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1,marginBottom:8,fontWeight:700}}>Page Access</div>
                <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                  {permList.map(p=>(
                    <div key={p} style={{background:`rgba(245,166,35,.1)`,border:`1px solid rgba(245,166,35,.3)`,color:t.accent,borderRadius:7,padding:"4px 10px",fontSize:11,fontWeight:700,display:"flex",alignItems:"center",gap:5}}>
                      <Ic.Chk s={10} c={t.accent}/>{p}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <Btn sm variant="ghost">Edit Role</Btn>
                <Btn sm variant="accent">Audit Log</Btn>
              </div>
            </div>
          </div>
        </Card>
      ))}
      <Card style={{padding:"20px",border:`1px dashed rgba(245,166,35,.2)`,textAlign:"center",cursor:"pointer"}} hover onClick={()=>{}}>
        <div style={{width:40,height:40,borderRadius:10,background:`rgba(245,166,35,.08)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px"}}><Ic.User s={18} c={t.accent}/></div>
        <div style={{fontFamily:H,fontSize:15,fontWeight:700,color:t.accent,marginBottom:4}}>Invite a Team Member</div>
        <div style={{fontSize:12,color:t.sub}}>Magic link sent to their email — no password needed</div>
      </Card>
    </div>
  );
}

// ─── MESSAGES PAGE ───────────────────────────────────────────
const MOCK_MSGS=[
  {id:1,from:"Sipho Dlamini",email:"sipho@gmail.com",tag:"lead",time:"08:32",unread:true,subject:"Quote request — 10kW off-grid farm",body:"Hi, I need a quote for a 10kW system for my farm in Limpopo. Looking for full off-grid capability with battery backup for 48 hours. Please advise on best system.",avatar:"S",avatarColor:"#f5a623"},
  {id:2,from:"FixSolar SA",email:"info@fixsolar.co.za",tag:"installer",time:"08:44",unread:true,subject:"Document re-submission",body:"Hi Tebello, we have re-uploaded our SESSA certificate. Please review and approve our listing when you get a chance. We have also added photos of recent installations.",avatar:"F",avatarColor:"#60a5fa"},
  {id:3,from:"Thabo Nkosi",email:"thabo.n@outlook.com",tag:"support",time:"Yesterday",unread:false,subject:"Calculator not loading on mobile",body:"The calculator seems to freeze on my Samsung S23. Steps to reproduce: open calculator, select appliances, tap calculate. Tested on Chrome and Samsung browser.",avatar:"T",avatarColor:"#4ade80"},
  {id:4,from:"Ayanda Khumalo",email:"ayanda@khumalo.co.za",tag:"feedback",time:"Yesterday",unread:false,subject:"5-star experience",body:"Just wanted to say the platform is amazing. Found my installer within minutes and the quote process was seamless. This is exactly what SA needed.",avatar:"A",avatarColor:"#c084fc"},
];
const TAG_COLORS={"lead":"#f5a623","installer":"#60a5fa","support":"#4ade80","feedback":"#c084fc","system":"#666"};

function MessagesPage(){
  const sc=useScreen();const t=_globalTheme;
  const[msgs,setMsgs]=useState(MOCK_MSGS);
  const[selected,setSelected]=useState(MOCK_MSGS[1]);
  const[filter,setFilter]=useState("All");
  const[reply,setReply]=useState("");const[sent,setSent]=useState(false);
  const filtered=filter==="All"?msgs:msgs.filter(m=>m.tag===filter.toLowerCase());
  const unread=msgs.filter(m=>m.unread).length;
  const sendReply=()=>{if(!reply.trim())return;setSent(true);setReply("");setMsgs(msgs.map(m=>m.id===selected.id?{...m,unread:false}:m));setTimeout(()=>setSent(false),3000);};
  const selectMsg=msg=>{setSelected(msg);setMsgs(msgs.map(m=>m.id===msg.id?{...m,unread:false}:m));};
  const inboxPanel=(
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{padding:"0 0 14px"}}>
        <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text,marginBottom:4}}>Messages</div>
        <div style={{fontSize:12,color:t.sub}}>{unread} unread</div>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
        {["All","Leads","Installers","Support","Feedback"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?`rgba(245,166,35,.12)`:t.card,border:`1px solid ${filter===f?`rgba(245,166,35,.4)`:t.border}`,color:filter===f?t.accent:t.sub,borderRadius:20,padding:"5px 13px",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:B,whiteSpace:"nowrap",transition:"all .15s"}}>{f}</button>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:2}}>
        {filtered.map(msg=>{
          const[hov,setHov]=useState(false);
          return(
            <div key={msg.id} onClick={()=>selectMsg(msg)}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              style={{display:"flex",gap:12,padding:"12px 14px",borderRadius:10,cursor:"pointer",background:selected?.id===msg.id?`rgba(245,166,35,.07)`:hov?"rgba(255,255,255,.03)":"transparent",border:`1px solid ${selected?.id===msg.id?`rgba(245,166,35,.2)`:"transparent"}`,transition:"all .15s"}}>
              <div style={{width:38,height:38,borderRadius:10,background:`${msg.avatarColor}22`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:H,fontSize:15,fontWeight:900,color:msg.avatarColor,flexShrink:0}}>{msg.avatar}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:2}}>
                  <span style={{fontFamily:H,fontSize:13,fontWeight:msg.unread?800:600,color:t.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"60%"}}>{msg.from}</span>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:9,fontWeight:700,background:`${TAG_COLORS[msg.tag]||t.sub}18`,color:TAG_COLORS[msg.tag]||t.sub,padding:"1px 6px",borderRadius:6}}>{msg.tag}</span>
                    <span style={{fontSize:10,color:t.sub,flexShrink:0}}>{msg.time}</span>
                    {msg.unread&&<div style={{width:7,height:7,borderRadius:"50%",background:t.accent,flexShrink:0}}/>}
                  </div>
                </div>
                <div style={{fontSize:12,fontWeight:msg.unread?600:400,color:msg.unread?t.textMid:t.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{msg.subject}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  const detailPanel=selected?(
    <div style={{display:"flex",flexDirection:"column",height:"100%",paddingLeft:sc.isDesktop?20:0,borderLeft:sc.isDesktop?`1px solid ${t.border}`:"none",paddingTop:sc.isDesktop?0:20}}>
      <div style={{marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{width:42,height:42,borderRadius:12,background:`${selected.avatarColor}22`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:H,fontSize:18,fontWeight:900,color:selected.avatarColor,flexShrink:0}}>{selected.avatar}</div>
          <div><div style={{fontFamily:H,fontSize:15,fontWeight:800,color:t.text}}>{selected.from}</div><div style={{fontSize:11,color:t.sub}}>{selected.email}</div></div>
          <span style={{marginLeft:"auto",fontSize:10,fontWeight:700,background:`${TAG_COLORS[selected.tag]||t.sub}18`,color:TAG_COLORS[selected.tag]||t.sub,padding:"3px 9px",borderRadius:8}}>{selected.tag}</span>
        </div>
        <div style={{fontFamily:H,fontSize:17,fontWeight:800,color:t.text,marginBottom:12}}>{selected.subject}</div>
        <div style={{fontSize:13,color:t.textMid,lineHeight:1.75,background:t.card,border:`1px solid ${t.border}`,borderRadius:12,padding:"14px 16px"}}>{selected.body}</div>
      </div>
      <div style={{marginTop:"auto"}}>
        <div style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:8,fontWeight:700}}>Reply</div>
        <textarea value={reply} onChange={e=>setReply(e.target.value)} placeholder="Write your reply..." rows={4}
          style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 14px",color:t.text,fontSize:13,fontFamily:B,resize:"vertical",outline:"none",boxSizing:"border-box",minHeight:100}}/>
        <div style={{display:"flex",gap:8,marginTop:10,alignItems:"center"}}>
          <Btn onClick={sendReply} style={{gap:7}}><Ic.Send s={12}/> Send Reply</Btn>
          {sent&&<span style={{fontSize:12,color:t.green,fontWeight:600}}>Sent!</span>}
        </div>
      </div>
    </div>
  ):<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",color:t.sub,fontSize:13}}>Select a message</div>;
  if(sc.isMobile)return(<div style={{animation:"fadeUp .4s ease"}}>{selected?<div><button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:13,marginBottom:16,fontFamily:B,display:"flex",alignItems:"center",gap:6}}><Ic.Left s={14} c={t.sub}/> Back</button>{detailPanel}</div>:inboxPanel}</div>);
  return(<div style={{animation:"fadeUp .4s ease",display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,height:"calc(100vh - 160px)"}}><div style={{overflowY:"auto",paddingRight:20}}>{inboxPanel}</div><div style={{overflowY:"auto"}}>{detailPanel}</div></div>);
}

// ─── NOTIFICATIONS PAGE ──────────────────────────────────────
function NotificationsPage(){
  const t=_globalTheme;
  const[notifSettings,setNotifSettings]=useState({email:true,whatsapp:false,leads:true,installers:true,subscribers:true,errors:true});
  const NOTIFS=[
    {Icon:Ic.Install,text:"New installer application from Battery Doctors — pending review",time:"2 min ago",color:t.accent,read:false},
    {Icon:Ic.Clip,text:"New lead: Sipho Dlamini — 10kW off-grid farm (Limpopo)",time:"15 min ago",color:t.blue,read:false},
    {Icon:Ic.Users,text:"New subscriber via coming soon page",time:"1 hr ago",color:t.purple,read:true},
    {Icon:Ic.AlertTri,text:"Error: quote submission failed — installer_id null",time:"3 hrs ago",color:t.red,read:true},
    {Icon:Ic.Install,text:"Installer approved: Cape Solar Pro",time:"Yesterday",color:t.green,read:true},
    {Icon:Ic.Clip,text:"Lead converted: Ayanda Khumalo — R120k system",time:"2 days ago",color:t.green,read:true},
  ];
  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text,marginBottom:4}}>Notifications</div>
      <div style={{fontSize:12,color:t.sub,marginBottom:24}}>All system events, alerts and activity — with timestamps</div>
      <div style={{display:"grid",gridTemplateColumns:"1.6fr 1fr",gap:16,alignItems:"start"}}>
        <div>
          <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text,marginBottom:14}}>Recent</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {NOTIFS.map((n,i)=>(
              <Card key={i} style={{padding:"14px 16px",background:n.read?t.card:`${n.color}06`,border:`1px solid ${n.read?t.border:`${n.color}22`}`}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:36,height:36,borderRadius:10,background:`${n.color}14`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><n.Icon s={15} c={n.color}/></div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,color:n.read?t.textMid:t.text,lineHeight:1.4,fontWeight:n.read?400:600}}>{n.text}</div>
                    <div style={{fontSize:11,color:t.sub,marginTop:3}}>{n.time}</div>
                  </div>
                  {!n.read&&<div style={{width:8,height:8,borderRadius:"50%",background:n.color,flexShrink:0}}/>}
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <Card style={{padding:"18px"}}>
            <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text,marginBottom:16}}>Notification Settings</div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1,marginBottom:10,fontWeight:700}}>Channels</div>
              <Toggle value={notifSettings.email} onChange={v=>setNotifSettings(p=>({...p,email:v}))} label="Email notifications" color={t.accent}/>
              <Toggle value={notifSettings.whatsapp} onChange={v=>setNotifSettings(p=>({...p,whatsapp:v}))} label="WhatsApp notifications" color={t.green}/>
            </div>
            <div>
              <div style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1,marginBottom:10,fontWeight:700}}>Notify me when</div>
              <Toggle value={notifSettings.leads} onChange={v=>setNotifSettings(p=>({...p,leads:v}))} label="New lead submitted" color={t.accent}/>
              <Toggle value={notifSettings.installers} onChange={v=>setNotifSettings(p=>({...p,installers:v}))} label="Installer application" color={t.accent}/>
              <Toggle value={notifSettings.subscribers} onChange={v=>setNotifSettings(p=>({...p,subscribers:v}))} label="New subscriber" color={t.accent}/>
              <Toggle value={notifSettings.errors} onChange={v=>setNotifSettings(p=>({...p,errors:v}))} label="System errors" color={t.red}/>
            </div>
            <div style={{marginTop:14}}>
              <Inp label="Notification email" value="" onChange={()=>{}} placeholder="admin@solariq.co.za"/>
              <Inp label="WhatsApp number" value="" onChange={()=>{}} placeholder="+27 82 000 0000"/>
            </div>
            <Btn style={{width:"100%",justifyContent:"center"}}>Save Settings</Btn>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── MORE (mobile) ───────────────────────────────────────────
function MorePage({setTab}){
  const t=_globalTheme;
  const items=[
    {id:"analytics",label:"Analytics",Icon:Ic.Chart,color:t.blue,desc:"Traffic, events & usage"},
    {id:"messages",label:"Messages",Icon:Ic.Mail,color:t.green,desc:"Inbox & replies"},
    {id:"subscribers",label:"Subscribers",Icon:Ic.Users,color:t.purple,desc:"Email list & newsletter"},
    {id:"notifications",label:"Notifications",Icon:Ic.Bell,color:t.accent,desc:"Alerts and notification settings"},
    {id:"users",label:"Team & Users",Icon:Ic.Users,color:t.cyan,desc:"Roles, permissions, audit"},
    {id:"settings",label:"Settings",Icon:Ic.Cog,color:t.sub,desc:"Site control, SEO, security"},
  ];
  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text,marginBottom:20}}>More</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {items.map(item=>{
          const[hov,setHov]=useState(false);
          return(
            <div key={item.id} onClick={()=>setTab(item.id)}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              style={{background:hov?`${item.color}08`:t.card,border:`1px solid ${hov?`${item.color}22`:t.border}`,borderRadius:12,padding:"16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",transition:"all .2s",transform:hov?"translateX(4px)":"none"}}>
              <div style={{width:44,height:44,borderRadius:12,background:`${item.color}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><item.Icon s={20} c={item.color}/></div>
              <div style={{flex:1}}>
                <div style={{fontFamily:H,fontSize:15,fontWeight:700,color:t.text}}>{item.label}</div>
                <div style={{fontSize:12,color:t.sub,marginTop:2}}>{item.desc}</div>
              </div>
              <Ic.Right s={14} c={t.sub}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SETTINGS PAGE ───────────────────────────────────────────
function SettingsPage(){
  const sc=useScreen();const t=_globalTheme;
  const[activeTab,setActiveTab]=useState("site");
  const[saved,setSaved]=useState(false);const[saving,setSaving]=useState(false);
  const[settings,setSettings]=useState({
    coming_soon:false,launch_date:"2026-06-01",site_name:"SolarIQ",
    contact_email:"hello@solariq.co.za",
    ticker_enabled:true,
    ticker_messages:["Solar tax rebate: claim 25% back from SARS","Grid independence — is your system sized right?","Pro Calculator now live","Free System Health Check — 2 minutes","Verified repair technicians across SA","Installer PDF proposal generator now live"],
    seo_title:"SolarIQ — SA's Complete Solar Platform",
    seo_description:"Calculate your solar system, find verified installers, diagnose faults. Free. Always. Built for South Africa.",
    og_image:"",analytics_ga:"",analytics_hotjar:"",
    whatsapp_number:"",email_sender:"",make_webhook:"",gsc_verify:"",resend_key:"",sentry_dsn:"",
    two_fa:false,session_timeout:"24h",allowed_ips:"",
    maintenance_mode:false,maintenance_message:"SolarIQ is under maintenance. We'll be back shortly.",
    cs_headline:"SA's Solar Platform.",cs_sub:"Launching 1 June 2026.",
    cs_body:"Calculate your system. Find verified installers. Diagnose faults.",
    cs_cta:"Notify Me",
    notif_email:"",notif_whatsapp:"",
  });

  const set=(k,v)=>setSettings(s=>({...s,[k]:v}));

  const saveSettings=async()=>{
    setSaving(true);
    const pairs=Object.entries(settings).map(([key,value])=>({key,value:typeof value==="boolean"?String(value):typeof value==="object"?JSON.stringify(value):String(value),updated_at:new Date().toISOString()}));
    await Promise.all(pairs.map(p=>sb.from("settings").upsert(p)));
    setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),2500);
  };

  const TABS=[
    {id:"site",label:"General"},
    {id:"coming_soon",label:"Coming Soon"},
    {id:"ticker",label:"Ticker Bar"},
    {id:"seo",label:"SEO"},
    {id:"integrations",label:"Integrations"},
    {id:"security",label:"Security"},
    {id:"maintenance",label:"Pages"},
    {id:"notifications_s",label:"Notifications"},
  ];
  const selStyle={width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"10px 13px",color:t.text,fontSize:13,fontFamily:B,outline:"none",boxSizing:"border-box"};

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text}}>Settings</div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {saved&&<span style={{fontSize:13,color:t.green,fontWeight:600,display:"flex",alignItems:"center",gap:5}}><Ic.Chk s={13} c={t.green}/> Saved</span>}
          <Btn onClick={saveSettings} loading={saving}>Save Changes</Btn>
        </div>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:20,overflowX:"auto",paddingBottom:2,borderBottom:`1px solid ${t.border}`}}>
        {TABS.map(tb=>(
          <button key={tb.id} onClick={()=>setActiveTab(tb.id)} style={{background:"none",border:"none",borderBottom:`2px solid ${activeTab===tb.id?t.accent:"transparent"}`,color:activeTab===tb.id?t.accent:t.sub,padding:"8px 14px",cursor:"pointer",fontSize:12,fontWeight:activeTab===tb.id?700:500,fontFamily:B,whiteSpace:"nowrap",transition:"color .2s",marginBottom:-1}}>{tb.label}</button>
        ))}
      </div>
      <Card style={{padding:"24px"}}>
        {activeTab==="site"&&(
          <div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text,marginBottom:20}}>General Settings</div>
            <Inp label="Site Name" value={settings.site_name} onChange={v=>set("site_name",v)}/>
            <Inp label="Contact Email" value={settings.contact_email} onChange={v=>set("contact_email",v)} type="email"/>
            <div style={{borderTop:`1px solid ${t.border}`,margin:"16px 0"}}/>
            <Toggle value={settings.ticker_enabled} onChange={v=>set("ticker_enabled",v)} label="Show ticker bar" color={t.accent}/>
            <Toggle value={settings.coming_soon} onChange={v=>set("coming_soon",v)} label="Coming soon mode (redirects visitors)" color={t.red}/>
            <Toggle value={settings.maintenance_mode} onChange={v=>set("maintenance_mode",v)} label="Maintenance mode" color={t.red}/>
          </div>
        )}
        {activeTab==="coming_soon"&&(
          <div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text,marginBottom:20}}>Coming Soon Page</div>
            <Toggle value={settings.coming_soon} onChange={v=>set("coming_soon",v)} label="Enable coming soon mode" color={t.accent}/>
            <div style={{margin:"14px 0",padding:"12px 14px",background:`rgba(245,166,35,.06)`,border:`1px solid rgba(245,166,35,.2)`,borderRadius:9,fontSize:12,color:t.sub}}>
              When enabled, all public-facing pages redirect to the coming soon countdown. Admin access is unaffected.
            </div>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:700}}>Launch Date & Time</label>
              <input type="datetime-local" value={settings.launch_date} onChange={e=>set("launch_date",e.target.value)} style={selStyle}/>
            </div>
            <Inp label="Headline" value={settings.cs_headline} onChange={v=>set("cs_headline",v)}/>
            <Inp label="Subheading" value={settings.cs_sub} onChange={v=>set("cs_sub",v)}/>
            <Inp label="Body text" value={settings.cs_body} onChange={v=>set("cs_body",v)} rows={2}/>
            <Inp label="CTA button text" value={settings.cs_cta} onChange={v=>set("cs_cta",v)}/>
          </div>
        )}
        {activeTab==="ticker"&&(
          <div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text,marginBottom:20}}>Ticker Bar</div>
            <Toggle value={settings.ticker_enabled} onChange={v=>set("ticker_enabled",v)} label="Enable ticker bar (hides completely when off)" color={t.accent}/>
            <div style={{borderTop:`1px solid ${t.border}`,margin:"14px 0"}}/>
            <div style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:10,fontWeight:700}}>Messages</div>
            {settings.ticker_messages.map((msg,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
                <input value={msg} onChange={e=>set("ticker_messages",settings.ticker_messages.map((m,j)=>j===i?e.target.value:m))}
                  style={{flex:1,background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:8,padding:"8px 12px",color:t.text,fontSize:13,fontFamily:B,outline:"none"}}/>
                <button onClick={()=>set("ticker_messages",settings.ticker_messages.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:t.red}}><Ic.X s={13} c={t.red}/></button>
              </div>
            ))}
            <Btn sm variant="ghost" onClick={()=>set("ticker_messages",[...settings.ticker_messages,"New ticker message"])}><Ic.Plus s={12}/> Add Message</Btn>
          </div>
        )}
        {activeTab==="seo"&&(
          <div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text,marginBottom:20}}>SEO Settings</div>
            <Inp label="Meta Title" value={settings.seo_title} onChange={v=>set("seo_title",v)}/>
            <Inp label="Meta Description" value={settings.seo_description} onChange={v=>set("seo_description",v)} rows={3}/>
            <Inp label="OG Image URL" value={settings.og_image} onChange={v=>set("og_image",v)} placeholder="https://..."/>
            <Inp label="Google Analytics ID" value={settings.analytics_ga} onChange={v=>set("analytics_ga",v)} placeholder="G-XXXXXXXXXX" hint="Paste your GA4 Measurement ID. SolarIQ will inject it automatically into the site."/>
            <Inp label="Hotjar Site ID" value={settings.analytics_hotjar} onChange={v=>set("analytics_hotjar",v)} placeholder="12345678" hint="Find this in your Hotjar dashboard under Tracking Code."/>
            <Inp label="Google Search Console Verify" value={settings.gsc_verify} onChange={v=>set("gsc_verify",v)} placeholder="google-site-verification=..." hint="Paste the meta tag content value from GSC."/>
            <div style={{marginTop:8,padding:"12px 14px",background:t.card,border:`1px solid ${t.border}`,borderRadius:9}}>
              <div style={{fontSize:11,color:t.sub,marginBottom:6,display:"flex",alignItems:"center",gap:5}}><Ic.Search s={12} c={t.sub}/> Search Preview</div>
              <div style={{fontSize:13,color:t.blue}}>{settings.seo_title||"SolarIQ"}</div>
              <div style={{fontSize:11,color:t.sub,lineHeight:1.6,marginTop:3}}>{(settings.seo_description||"").slice(0,160)}</div>
            </div>
          </div>
        )}
        {activeTab==="integrations"&&(
          <div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text,marginBottom:6}}>Integrations</div>
            <div style={{fontSize:12,color:t.sub,marginBottom:20}}>Connect third-party services. All keys are stored securely and never exposed to the public.</div>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {[
                {name:"WhatsApp Business API",Icon:Ic.Bell,field:"whatsapp_number",label:"API Key / Number",type:"text",desc:"Automated WhatsApp messages when leads come in. Sign up at 360dialog.com, get your API key and paste here."},
                {name:"Resend (Email)",Icon:Ic.Mail,field:"resend_key",label:"Resend API Key",type:"text",desc:"Transactional emails for leads, subscribers, approvals. Sign up at resend.com — free tier sends 100/day."},
                {name:"Google Analytics 4",Icon:Ic.Chart,field:"analytics_ga",label:"GA4 Measurement ID",type:"text",desc:"Tracks all user behaviour. Find your ID (G-XXXXXXXX) in GA4 > Admin > Data Streams."},
                {name:"Hotjar",Icon:Ic.Eye,field:"analytics_hotjar",label:"Hotjar Site ID",type:"text",desc:"Session recordings and heatmaps. Shows you exactly what users click and where they drop off."},
                {name:"Make.com (Automation)",Icon:Ic.Zap,field:"make_webhook",label:"Webhook URL",type:"url",desc:"No-code automation platform. Build workflows like: new lead → WhatsApp installer → log to Google Sheets."},
                {name:"Sentry (Error Tracking)",Icon:Ic.AlertTri,field:"sentry_dsn",label:"Sentry DSN",type:"text",desc:"Catches production errors in real time. Sign up at sentry.io — free tier. You get email alerts on any bug."},
                {name:"Payfast",Icon:Ic.Zap,field:"payment_key",label:"Merchant ID + Key",type:"text",desc:"Accept payments for premium installer listings. Sign up at payfast.co.za with your business bank account."},
              ].map(int=>{
                const[hov,setHov]=useState(false);
                return(
                  <div key={int.name}
                    onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                    style={{background:hov?t.card2:t.card,border:`1px solid ${hov?t.borderHover:t.border}`,borderRadius:12,padding:"16px 18px",transition:"all .2s"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                      <div style={{width:38,height:38,borderRadius:10,background:`rgba(245,166,35,.08)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><int.Icon s={16} c={t.accent}/></div>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text}}>{int.name}</div>
                        <div style={{fontSize:11,color:t.sub,marginTop:2}}>{int.desc}</div>
                      </div>
                      <Badge color={settings[int.field]?t.green:t.sub}>{settings[int.field]?"Connected":"Not connected"}</Badge>
                    </div>
                    <Inp label={int.label} value={settings[int.field]||""} onChange={v=>set(int.field,v)} type={int.type||"text"} placeholder="Enter here..."/>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {activeTab==="security"&&(
          <div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text,marginBottom:20}}>Security</div>
            <Toggle value={settings.two_fa} onChange={v=>set("two_fa",v)} label="Two-factor authentication" color={t.green}/>
            <Toggle value={false} onChange={()=>{}} label="Force HTTPS redirects" color={t.green}/>
            <Toggle value={true} onChange={()=>{}} label="Rate limit API requests" color={t.green}/>
            <div style={{borderTop:`1px solid ${t.border}`,margin:"14px 0"}}/>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:700}}>Session Timeout</label>
              <select value={settings.session_timeout} onChange={e=>set("session_timeout",e.target.value)} style={selStyle}>
                {["1h","4h","12h","24h","7d","30d"].map(o=><option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <Inp label="Allowed IP Addresses (optional)" value={settings.allowed_ips} onChange={v=>set("allowed_ips",v)} placeholder="Comma separated IPs, leave blank for any" hint="Restrict admin access to specific IPs only"/>
            <div style={{marginTop:14,padding:"14px 16px",background:"rgba(74,222,128,.05)",border:"1px solid rgba(74,222,128,.15)",borderRadius:10}}>
              <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:t.green,marginBottom:8,display:"flex",alignItems:"center",gap:6}}><Ic.Shield s={13} c={t.green}/> Recent Admin Activity</div>
              {[["Login","Tebello","Just now"],["Settings saved","Tebello","10 min ago"],["Installer approved","Tebello","1 hr ago"]].map(([action,who,when])=>(
                <div key={action} style={{display:"flex",gap:8,fontSize:11,color:t.sub,marginBottom:5}}>
                  <span style={{color:t.green}}>●</span><span>{who}</span><span>·</span><span>{action}</span><span>·</span><span>{when}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab==="maintenance"&&(
          <div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text,marginBottom:20}}>Special Pages</div>
            <Toggle value={settings.maintenance_mode} onChange={v=>{if(v&&!confirm("This will take the live site offline for visitors. Continue?"))return;set("maintenance_mode",v);}} label="Maintenance Mode (takes site offline)" color={t.red}/>
            <Inp label="Maintenance Message" value={settings.maintenance_message} onChange={v=>set("maintenance_message",v)} rows={2}/>
            <div style={{borderTop:`1px solid ${t.border}`,margin:"16px 0"}}/>
            <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:t.text,marginBottom:12}}>Page Templates</div>
            <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr":"1fr 1fr",gap:10}}>
              {[
                {name:"Coming Soon",Icon:Ic.Calendar,desc:"Countdown page before launch",active:settings.coming_soon},
                {name:"Maintenance",Icon:Ic.Wrench,desc:"Offline message for updates",active:settings.maintenance_mode},
                {name:"404 Page",Icon:Ic.Search,desc:"Custom not found page",active:true},
                {name:"Press / Media",Icon:Ic.Doc,desc:"For journalists and brands",active:false},
                {name:"Partnership",Icon:Ic.Link,desc:"For business inquiries",active:false},
                {name:"API Status",Icon:Ic.Activity,desc:"Public system status",active:false},
              ].map(p=>{
                const[hov,setHov]=useState(false);
                return(
                  <div key={p.name}
                    onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                    style={{background:hov?t.card2:t.card,border:`1px solid ${p.active?`rgba(245,166,35,.25)`:hov?t.borderHover:t.border}`,borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,transition:"all .2s",cursor:"pointer"}}>
                    <div style={{width:36,height:36,borderRadius:9,background:`rgba(245,166,35,.08)`,display:"flex",alignItems:"center",justifyContent:"center"}}><p.Icon s={15} c={t.accent}/></div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:600,color:t.text,fontFamily:H}}>{p.name}</div>
                      <div style={{fontSize:11,color:t.sub}}>{p.desc}</div>
                    </div>
                    <Badge color={p.active?t.green:t.sub}>{p.active?"Active":"Off"}</Badge>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {activeTab==="notifications_s"&&(
          <div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text,marginBottom:20}}>Notification Settings</div>
            <Inp label="Notification Email" value={settings.notif_email} onChange={v=>set("notif_email",v)} type="email" placeholder="admin@solariq.co.za" hint="Email address to receive admin notifications"/>
            <Inp label="WhatsApp Number" value={settings.notif_whatsapp} onChange={v=>set("notif_whatsapp",v)} type="tel" placeholder="+27 82 000 0000" hint="WhatsApp number for alert messages"/>
            <div style={{borderTop:`1px solid ${t.border}`,margin:"16px 0"}}/>
            <div style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1,marginBottom:12,fontWeight:700}}>Notify me when</div>
            <Toggle value={true} onChange={()=>{}} label="New lead submitted" color={t.accent}/>
            <Toggle value={true} onChange={()=>{}} label="Installer application received" color={t.accent}/>
            <Toggle value={true} onChange={()=>{}} label="Installer approved or rejected" color={t.accent}/>
            <Toggle value={false} onChange={()=>{}} label="New subscriber" color={t.accent}/>
            <Toggle value={true} onChange={()=>{}} label="System errors / failed submissions" color={t.red}/>
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── NAV ITEMS ───────────────────────────────────────────────
const NAV_ITEMS=[
  {id:"dashboard",    label:"Dashboard",    Icon:Ic.Grid},
  {id:"installers",   label:"Installers",   Icon:Ic.Install},
  {id:"leads",        label:"Leads",        Icon:Ic.Clip},
  {id:"blog",         label:"Blog",         Icon:Ic.Doc},
  {id:"messages",     label:"Messages",     Icon:Ic.Mail},
  {id:"analytics",    label:"Analytics",    Icon:Ic.Chart},
  {id:"subscribers",  label:"Subscribers",  Icon:Ic.Users},
  {id:"users",        label:"Team",         Icon:Ic.User},
  {id:"notifications",label:"Notifications",Icon:Ic.Bell},
  {id:"settings",     label:"Settings",     Icon:Ic.Cog},
];
const MOBILE_NAV=[
  {id:"dashboard",label:"Home",     Icon:Ic.Grid},
  {id:"installers",label:"Installers",Icon:Ic.Install},
  {id:"leads",    label:"Leads",    Icon:Ic.Clip},
  {id:"messages", label:"Messages", Icon:Ic.Mail},
  {id:"more",     label:"More",     Icon:Ic.More},
];

// ─── SIDEBAR ─────────────────────────────────────────────────
function Sidebar({tab,setTab,collapsed,setCollapsed,onSignOut,pending,unreadMsgs,unreadNotifs}){
  const t=_globalTheme;
  const navW=collapsed?t.navWc:t.navW;
  return(
    <div style={{width:navW,background:t.nav,borderRight:`1px solid ${t.border}`,display:"flex",flexDirection:"column",position:"fixed",top:0,bottom:0,left:0,zIndex:300,transition:"width .25s cubic-bezier(.4,0,.2,1)",overflow:"hidden"}}>
      {/* Logo */}
      <div style={{padding:"14px 14px",borderBottom:`1px solid ${t.border}`,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,overflow:"hidden"}}>
          <LogoIcon s={collapsed?24:28}/>
          {!collapsed&&<div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:900,color:t.text,whiteSpace:"nowrap"}}>Solar<span style={{color:t.accent}}>IQ</span></div>
            <div style={{fontSize:9,color:t.sub,letterSpacing:2,textTransform:"uppercase"}}>Admin</div>
          </div>}
        </div>
        {!collapsed&&<button onClick={()=>setCollapsed(true)} style={{background:"none",border:"none",cursor:"pointer",padding:4,color:t.sub,flexShrink:0,transition:"color .15s"}} onMouseEnter={e=>e.currentTarget.style.color=t.accent} onMouseLeave={e=>e.currentTarget.style.color=t.sub}><Ic.Left s={14} c={t.sub}/></button>}
      </div>
      {/* Nav */}
      <nav style={{flex:1,padding:"8px 8px",overflowY:"auto",overflowX:"hidden"}}>
        {NAV_ITEMS.map(n=>{
          const active=tab===n.id;
          const badge=n.id==="installers"&&pending>0?pending:n.id==="messages"&&unreadMsgs>0?unreadMsgs:n.id==="notifications"&&unreadNotifs>0?unreadNotifs:0;
          const[hov,setHov]=useState(false);
          return(
            <button key={n.id} onClick={()=>setTab(n.id)}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:collapsed?"10px 0":"10px 12px",justifyContent:collapsed?"center":"flex-start",borderRadius:9,border:"none",marginBottom:2,
                background:active?`rgba(${t.rgb},.1)`:hov?`rgba(${t.rgb},.05)`:"transparent",
                borderLeft:!collapsed&&active?`2px solid ${t.accent}`:!collapsed&&hov?`2px solid rgba(${t.rgb},.3)`:"2px solid transparent",
                color:active?t.accent:hov?t.textMid:t.sub,cursor:"pointer",transition:"all .18s",fontFamily:B,position:"relative",
                boxShadow:active&&!collapsed?`inset 0 0 20px rgba(${t.rgb},.04)`:"none"}}>
              <n.Icon s={16} c={active?t.accent:hov?t.textMid:t.sub}/>
              {!collapsed&&<span style={{fontSize:13,fontWeight:active?700:500,flex:1,textAlign:"left",whiteSpace:"nowrap"}}>{n.label}</span>}
              {badge>0&&<span style={{background:t.red,color:"#fff",borderRadius:"50%",width:17,height:17,fontSize:10,display:"inline-flex",alignItems:"center",justifyContent:"center",fontWeight:900,flexShrink:0}}>{badge}</span>}
            </button>
          );
        })}
      </nav>
      {/* Footer */}
      <div style={{padding:"10px 10px",borderTop:`1px solid ${t.border}`,flexShrink:0}}>
        {!collapsed&&(
          <div style={{display:"flex",alignItems:"center",gap:9,padding:"8px 10px",marginBottom:6,borderRadius:10,background:t.card,border:`1px solid ${t.border}`}}>
            <div style={{width:28,height:28,borderRadius:8,background:`linear-gradient(135deg,${t.accent},${t.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:H,fontSize:12,fontWeight:900,color:"#000",flexShrink:0}}>T</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:700,color:t.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>Tebello</div>
              <div style={{fontSize:10,color:t.sub}}>Super Admin</div>
            </div>
          </div>
        )}
        <div style={{display:"flex",gap:4,justifyContent:collapsed?"center":"flex-start"}}>
          {!collapsed&&<button onClick={onSignOut} style={{flex:1,background:t.card,border:`1px solid ${t.border}`,borderRadius:8,padding:"7px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,color:t.sub,fontSize:12,fontFamily:B,transition:"all .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=t.borderHover} onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}>
            <Ic.Out s={13} c={t.sub}/> Sign Out
          </button>}
          {collapsed&&<button onClick={()=>setCollapsed(false)} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:8,padding:"7px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Ic.Right s={14} c={t.sub}/>
          </button>}
        </div>
      </div>
    </div>
  );
}

function MobileTopBar({tab,onSignOut,pending,onNotif,notifCount}){
  const t=_globalTheme;
  const pageLabel={dashboard:"Dashboard",installers:"Installers",leads:"Leads",blog:"Blog",messages:"Messages",analytics:"Analytics",subscribers:"Subscribers",users:"Team",notifications:"Notifications",settings:"Settings",more:"More"};
  return(
    <div style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:t.nav,borderBottom:`1px solid ${t.border}`,backdropFilter:"blur(20px)",height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
      <div style={{display:"flex",alignItems:"center",gap:7}}>
        <LogoIcon s={22}/>
        <span style={{fontFamily:H,fontSize:16,fontWeight:900,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></span>
      </div>
      <span style={{flex:1,fontSize:14,fontWeight:700,color:t.text,fontFamily:H}}>{pageLabel[tab]||""}</span>
      <button onClick={onNotif} style={{position:"relative",background:t.card,border:`1px solid ${t.border}`,borderRadius:7,padding:"6px",cursor:"pointer",display:"flex",alignItems:"center",transition:"border-color .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=t.borderHover} onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}>
        <Ic.Bell s={15} c={t.sub}/>
        {notifCount>0&&<span style={{position:"absolute",top:2,right:2,width:8,height:8,background:t.red,borderRadius:"50%"}}/>}
      </button>
    </div>
  );
}

function MobileBottomNav({tab,setTab,pending}){
  const t=_globalTheme;
  return(
    <div style={{position:"fixed",bottom:0,left:0,right:0,background:t.nav,backdropFilter:"blur(20px)",borderTop:`1px solid ${t.border}`,display:"flex",zIndex:200}}>
      {MOBILE_NAV.map(x=>{
        const active=tab===x.id;
        const[hov,setHov]=useState(false);
        return(
          <button key={x.id} onClick={()=>setTab(x.id)}
            onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
            style={{flex:1,background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 4px",cursor:"pointer",gap:3,position:"relative",transition:"all .15s"}}>
            <x.Icon s={18} c={active?t.accent:hov?t.textMid:t.sub}/>
            <span style={{fontSize:9,fontWeight:600,color:active?t.accent:t.sub,fontFamily:B}}>{x.label}</span>
            {x.id==="installers"&&pending>0&&<span style={{position:"absolute",top:5,right:"50%",marginRight:-14,width:14,height:14,background:t.red,borderRadius:"50%",fontSize:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900}}>{pending}</span>}
          </button>
        );
      })}
    </div>
  );
}

// ─── LOGIN ───────────────────────────────────────────────────
function Login({onLogin}){
  const sc=useScreen();const t=_globalTheme;
  const[email,setEmail]=useState("");const[pw,setPw]=useState("");
  const[err,setErr]=useState("");const[loading,setLoading]=useState(false);
  const[showPw,setShowPw]=useState(false);
  const login=async()=>{
    if(!email||!pw){setErr("Please enter your email and password.");return;}
    setLoading(true);setErr("");
    const{error}=await sb.auth.signInWithPassword({email,password:pw});
    if(error)setErr(error.message);else onLogin();
    setLoading(false);
  };
  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20,position:"relative",overflow:"hidden",background:t.bg}}>
      <div style={{position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)",width:"60vw",height:"40vh",background:`radial-gradient(ellipse,rgba(245,166,35,.1),transparent 70%)`,pointerEvents:"none",animation:"breathe 7s ease infinite"}}/>
      <div style={{width:"100%",maxWidth:420,position:"relative",zIndex:1,animation:"fadeUp .5s ease"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16}}>
            <LogoIcon s={40}/>
          </div>
          <div style={{fontFamily:H,fontSize:28,fontWeight:900,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span> Admin</div>
          <div style={{fontSize:13,color:t.sub,marginTop:6}}>Sign in to continue</div>
        </div>
        <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:16,padding:28}}>
          <Inp label="Email" value={email} onChange={setEmail} type="email" placeholder="admin@solariq.co.za"/>
          <div style={{position:"relative"}}>
            <Inp label="Password" value={pw} onChange={setPw} type={showPw?"text":"password"} placeholder="••••••••"/>
            <button onClick={()=>setShowPw(p=>!p)} style={{position:"absolute",right:10,top:32,background:"none",border:"none",cursor:"pointer",color:t.sub}}><Ic.Eye s={14} c={t.sub}/></button>
          </div>
          {err&&<div style={{fontSize:12,color:t.red,marginBottom:12,padding:"8px 12px",background:"rgba(239,68,68,.06)",border:"1px solid rgba(239,68,68,.2)",borderRadius:8}}>{err}</div>}
          <Btn full onClick={login} loading={loading} style={{justifyContent:"center"}}>{loading?"Signing in...":"Sign In"}</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── NOTIFICATION PANEL (bell popup) ─────────────────────────
function NotifPanel({onClose,setTab}){
  const t=_globalTheme;
  const RECENT=LIVE_FEED.slice(0,4);
  return(
    <div style={{position:"fixed",top:58,right:20,zIndex:999,width:320,background:t.bg2,border:`1px solid ${t.border}`,borderRadius:14,boxShadow:"0 16px 48px rgba(0,0,0,.4)",animation:"fadeUp .2s ease"}}>
      <div style={{padding:"14px 16px",borderBottom:`1px solid ${t.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:t.text}}>Notifications</div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={()=>{setTab("notifications");onClose();}} style={{background:"none",border:"none",fontSize:11,color:t.accent,cursor:"pointer",fontFamily:B,fontWeight:600}}>View all</button>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:t.sub}}><Ic.X s={13} c={t.sub}/></button>
        </div>
      </div>
      <div style={{padding:"8px 0",maxHeight:320,overflowY:"auto"}}>
        {RECENT.map((n,i)=>(
          <div key={i} style={{display:"flex",gap:10,padding:"10px 16px",cursor:"pointer",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.03)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div style={{width:28,height:28,borderRadius:8,background:`${n.color}14`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><n.Icon s={12} c={n.color}/></div>
            <div style={{flex:1}}>
              <div style={{fontSize:12,color:t.textMid,lineHeight:1.4,marginBottom:2}}>{n.text}</div>
              <div style={{fontSize:10,color:t.sub}}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CSS ─────────────────────────────────────────────────────
const CSS=`
  @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{width:100%;min-height:100vh;background:#05070b;color:#f0f0f0;font-family:'Plus Jakarta Sans',sans-serif;overflow-x:hidden}
  ::-webkit-scrollbar{width:3px;height:3px}
  ::-webkit-scrollbar-thumb{background:rgba(245,166,35,.4);border-radius:4px}
  input,textarea,select{outline:none;font-family:'Plus Jakarta Sans',sans-serif}
  input::placeholder,textarea::placeholder{color:#555}
  select option{background:#0d1018;color:#f0f0f0}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
  @keyframes breathe{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
  input:focus,textarea:focus,select:focus{border-color:rgba(245,166,35,.5)!important}
  button{transition:all .18s}
`;

// ─── MAIN ADMIN ──────────────────────────────────────────────
// Inline Eye icon for login
const Ic_Eye = ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;

export default function Admin(){
  const[session,setSession]=useState(null);
  const[loading,setLoading]=useState(true);
  const[tab,setTab]=useState("dashboard");
  const[collapsed,setCollapsed]=useState(false);
  const[showNotif,setShowNotif]=useState(false);
  const[search,setSearch]=useState("");
  const[stats,setStats]=useState({installers:0,leads:0,subscribers:0,posts:6,pending:0,events:4847});
  const[statsLoading,setStatsLoading]=useState(true);
  const sc=useScreen();
  _globalTheme=DARK;
  const t=_globalTheme;

  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}})=>{setSession(session);setLoading(false);});
    const{data:{subscription}}=sb.auth.onAuthStateChange((_,s)=>setSession(s));
    return()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    if(!session)return;
    const load=async()=>{
      setStatsLoading(true);
      try{
        const[inst,leads,subs,posts,pending]=await Promise.all([
          sb.from("installers").select("id",{count:"exact",head:true}).eq("status","approved"),
          sb.from("leads").select("id",{count:"exact",head:true}),
          sb.from("subscribers").select("id",{count:"exact",head:true}),
          sb.from("posts").select("id",{count:"exact",head:true}).eq("published",true),
          sb.from("installers").select("id",{count:"exact",head:true}).eq("status","pending"),
        ]);
        setStats({installers:inst.count||0,leads:leads.count||0,subscribers:subs.count||0,posts:posts.count||0,pending:pending.count||0,events:4847});
      }catch(e){console.log("Admin stats error:",e);}
      setStatsLoading(false);
    };
    load();
  },[session]);

  const signOut=async()=>{await sb.auth.signOut();setSession(null);};
  const sidebarW=sc.isMobile?0:(collapsed?t.navWc:t.navW);
  const unreadMsgs=MOCK_MSGS.filter(m=>m.unread).length;
  const unreadNotifs=2;

  const PAGES={
    dashboard:<Dashboard stats={stats} loading={statsLoading}/>,
    installers:<InstallersPage/>,
    leads:<LeadsPage/>,
    blog:<BlogPage/>,
    messages:<MessagesPage/>,
    analytics:<AnalyticsPage/>,
    subscribers:<SubscribersPage/>,
    users:<UsersPage/>,
    notifications:<NotificationsPage/>,
    settings:<SettingsPage/>,
    more:<MorePage setTab={setTab}/>,
  };

  if(loading)return(<><style>{CSS}</style><div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12,background:t.bg}}><Spinner/><div style={{fontSize:13,color:t.sub}}>Loading SolarIQ Admin...</div></div></>);
  if(!session)return(<><style>{CSS}</style><Login onLogin={()=>sb.auth.getSession().then(({data:{session}})=>setSession(session))}/></>);

  return(
    <>
      <style>{CSS}</style>
      <div style={{display:"flex",minHeight:"100vh",background:t.bg}}>
        {!sc.isMobile&&<Sidebar tab={tab} setTab={setTab} collapsed={collapsed} setCollapsed={setCollapsed} onSignOut={signOut} pending={stats.pending} unreadMsgs={unreadMsgs} unreadNotifs={unreadNotifs}/>}
        {sc.isMobile&&<MobileTopBar tab={tab} onSignOut={signOut} pending={stats.pending} onNotif={()=>setShowNotif(n=>!n)} notifCount={unreadNotifs}/>}

        <div style={{flex:1,marginLeft:sc.isMobile?0:sidebarW,transition:"margin-left .25s cubic-bezier(.4,0,.2,1)",paddingTop:sc.isMobile?54:0,paddingBottom:sc.isMobile?80:0,minWidth:0,minHeight:"100vh"}}>
          {/* Desktop top bar */}
          {!sc.isMobile&&(
            <div style={{position:"sticky",top:0,zIndex:100,background:t.nav,borderBottom:`1px solid ${t.border}`,backdropFilter:"blur(20px)",padding:"0 32px",height:52,display:"flex",alignItems:"center",gap:10}}>
              <div style={{flex:1,display:"flex",justifyContent:"center"}}>
                <div style={{position:"relative",width:"100%",maxWidth:380}}>
                  <div style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)"}}><Ic.Search s={13} c={t.sub}/></div>
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search anything..."
                    style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"7px 12px 7px 32px",color:t.text,fontSize:13,fontFamily:B,outline:"none",boxSizing:"border-box"}}/>
                </div>
              </div>
              {/* Clickable bell — shows popup */}
              <div style={{position:"relative"}}>
                <button onClick={()=>setShowNotif(n=>!n)}
                  style={{position:"relative",background:showNotif?`rgba(245,166,35,.1)`:t.card,border:`1px solid ${showNotif?`rgba(245,166,35,.35)`:t.border}`,borderRadius:8,padding:"6px 10px",cursor:"pointer",display:"flex",alignItems:"center",transition:"all .15s"}}>
                  <Ic.Bell s={15} c={showNotif?t.accent:t.sub}/>
                  {unreadNotifs>0&&<span style={{position:"absolute",top:4,right:4,width:7,height:7,background:t.red,borderRadius:"50%"}}/>}
                </button>
                {showNotif&&<NotifPanel onClose={()=>setShowNotif(false)} setTab={setTab}/>}
              </div>
              <a href={`${window.location.origin}?preview=solariq2026`} target="_blank" rel="noopener noreferrer"
                style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:8,textDecoration:"none",background:`rgba(245,166,35,.1)`,border:`1px solid rgba(245,166,35,.25)`,transition:"all .15s"}}
                onMouseEnter={e=>e.currentTarget.style.background=`rgba(245,166,35,.18)`} onMouseLeave={e=>e.currentTarget.style.background=`rgba(245,166,35,.1)`}>
                <Ic.Link s={11} c={t.accent}/>
                <span style={{fontSize:11,color:t.accent,fontWeight:700}}>Live Site</span>
              </a>
            </div>
          )}

          <div style={{padding:sc.isMobile?"16px 14px":sc.isTablet?"24px 28px":"28px 36px",maxWidth:1440,margin:"0 auto"}}>
            {PAGES[tab]||PAGES.dashboard}
          </div>
        </div>

        {sc.isMobile&&<MobileBottomNav tab={tab} setTab={setTab} pending={stats.pending}/>}
        {/* Click outside to close notif panel */}
        {showNotif&&<div onClick={()=>setShowNotif(false)} style={{position:"fixed",inset:0,zIndex:998}}/>}
      </div>
    </>
  );
}

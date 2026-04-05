import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://intvnxvannltfibguykw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHZueHZhbm5sdGZpYmd1eWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzAwNjgsImV4cCI6MjA5MDA0NjA2OH0.KnPP0-vxXyBYTvHxbXfrH8AKd61u1hWpEO2gpjWnzNE";
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const DARK = {
  dark:true, bg:"#05070b", bg2:"#090c12", bg3:"#0d1018",
  card:"rgba(255,255,255,.04)", card2:"rgba(255,255,255,.07)", card3:"rgba(255,255,255,.1)",
  border:"rgba(255,255,255,.08)", borderHover:"rgba(255,255,255,.16)",
  accent:"#f5a623", accent2:"#ff6b00", rgb:"245,166,35",
  text:"#f0f0f0", textMid:"#b0b0b0", sub:"#555", subLight:"#888",
  green:"#4ade80", red:"#f87171", blue:"#60a5fa", purple:"#c084fc", cyan:"#22d3ee",
  nav:"rgba(5,7,11,.97)", inputBg:"rgba(255,255,255,.05)",
  navW:248, navWc:58,
};
const LIGHT = {
  dark:false, bg:"#f0ede3", bg2:"#e8e4d8", bg3:"#ddd9cc",
  card:"rgba(0,0,0,.04)", card2:"rgba(0,0,0,.07)", card3:"rgba(0,0,0,.1)",
  border:"rgba(0,0,0,.1)", borderHover:"rgba(0,0,0,.2)",
  accent:"#c47a0a", accent2:"#a05e00", rgb:"196,122,10",
  text:"#0f0f0f", textMid:"#333", sub:"#999", subLight:"#666",
  green:"#16a34a", red:"#dc2626", blue:"#2563eb", purple:"#9333ea", cyan:"#0891b2",
  nav:"rgba(240,237,227,.97)", inputBg:"rgba(0,0,0,.05)",
  navW:248, navWc:58,
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

// ─── SEED DATA ───────────────────────────────────────────────
const SEED_INSTALLERS = [
  {id:1,name:"SunPower SA",city:"Johannesburg",province:"Gauteng",rating:4.9,reviews:312,sessa:true,jobs:847,yrs:12,badge:"Top Rated",resp:"2 hrs",spec:"Residential",brands:["Sunsynk","Victron"],price_min:80000,price_max:200000,verified:true,finance:true,type:"installer",status:"approved"},
  {id:2,name:"Cape Solar Pro",city:"Cape Town",province:"Western Cape",rating:4.8,reviews:198,sessa:true,jobs:523,yrs:9,badge:"Most Popular",resp:"3 hrs",spec:"Commercial & Residential",brands:["Deye","Sunsynk"],price_min:60000,price_max:350000,verified:true,finance:true,type:"installer",status:"approved"},
  {id:3,name:"KZN Solar Solutions",city:"Durban",province:"KwaZulu-Natal",rating:4.7,reviews:143,sessa:true,jobs:389,yrs:7,badge:null,resp:"4 hrs",spec:"Off-grid",brands:["Victron","Pylontech"],price_min:70000,price_max:250000,verified:true,finance:false,type:"installer",status:"approved"},
  {id:4,name:"Pretoria Solar Works",city:"Pretoria",province:"Gauteng",rating:4.6,reviews:89,sessa:false,jobs:201,yrs:5,badge:"Fast Response",resp:"Same day",spec:"Residential",brands:["Growatt","Deye"],price_min:50000,price_max:150000,verified:true,finance:true,type:"installer",status:"approved"},
  {id:5,name:"FixSolar SA",city:"Johannesburg",province:"Gauteng",rating:4.9,reviews:203,sessa:false,jobs:0,yrs:8,badge:null,resp:"Same day",spec:"Inverter Repair",brands:["Victron","Sunsynk","Deye"],price_min:450,price_max:3000,verified:true,finance:false,type:"technician",status:"approved"},
  {id:6,name:"Panel Clean Pro",city:"Cape Town",province:"Western Cape",rating:4.8,reviews:156,sessa:false,jobs:0,yrs:5,badge:null,resp:"1 day",spec:"Panel Cleaning",brands:["All brands"],price_min:85,price_max:500,verified:true,finance:false,type:"technician",status:"approved"},
  {id:7,name:"Battery Doctors",city:"Pretoria",province:"Gauteng",rating:4.7,reviews:98,sessa:false,jobs:0,yrs:6,badge:null,resp:"24/7",spec:"Battery Replacement",brands:["Pylontech","BSL","Freedom Won"],price_min:1200,price_max:8000,verified:true,finance:false,type:"technician",status:"approved"},
];
const SEED_ARTICLES = [
  {id:1,title:"How much does a 5kW solar system cost in SA in 2026?",tag:"Guide",hot:true,read_minutes:7,published:true,views:12400,slug:"5kw-solar-cost-sa-2026"},
  {id:2,title:"Sunsynk vs Deye vs Victron — which inverter is best for SA?",tag:"Comparison",hot:true,read_minutes:9,published:true,views:8900,slug:"sunsynk-deye-victron-comparison"},
  {id:3,title:"How to claim your solar tax rebate from SARS",tag:"Tax",hot:false,read_minutes:5,published:true,views:6200,slug:"solar-tax-rebate-sars"},
  {id:4,title:"Is your solar system actually working? 7 signs it isn't",tag:"Maintenance",hot:false,read_minutes:6,published:true,views:4800,slug:"solar-system-working-signs"},
  {id:5,title:"Sodium-ion batteries are coming to SA",tag:"News",hot:true,read_minutes:5,published:true,views:3100,slug:"sodium-ion-batteries-sa"},
  {id:6,title:"Best solar panels available in SA 2026 — ranked",tag:"Comparison",hot:true,read_minutes:10,published:true,views:7100,slug:"best-solar-panels-sa-2026"},
];

// ─── SVG ICONS ───────────────────────────────────────────────
const Ic = {
  Grid:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>,
  Install:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Clip:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="14" y2="15"/></svg>,
  Doc:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Chart:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  Mail:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Cog:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Bell:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Search:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Out:({s=15,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Left:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Right:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Plus:({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Chk:({s=13,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  X:({s=13,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Sun:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Moon:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  Users:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Link:({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  More:({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>,
  Activity:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Send:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Wrench:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Trending:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
};

// ─── PRIMITIVES ──────────────────────────────────────────────
function Spinner({s=20,c}){
  return <div style={{width:s,height:s,border:`2px solid ${c?c+"33":"rgba(245,166,35,.2)"}`,borderTopColor:c||"#f5a623",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>;
}

function Btn({children,onClick,variant="primary",sm,disabled,full,style={}}){
  const V = {
    primary:(t)=>({bg:`linear-gradient(135deg,${t.accent},${t.accent2})`,col:t.dark?"#000":"#fff",bdr:"none"}),
    ghost:(t)=>({bg:t.card,col:t.textMid,bdr:`1px solid ${t.border}`}),
    danger:()=>({bg:"rgba(239,68,68,.1)",col:"#f87171",bdr:"1px solid rgba(239,68,68,.25)"}),
    success:()=>({bg:"rgba(74,222,128,.1)",col:"#4ade80",bdr:"1px solid rgba(74,222,128,.25)"}),
    accent:(t)=>({bg:`rgba(${t.rgb},.1)`,col:t.accent,bdr:`1px solid rgba(${t.rgb},.28)`}),
  };
  return <_TC>{(t)=>{
    const v=(V[variant]||V.primary)(t);
    return <button onClick={onClick} disabled={disabled} style={{background:v.bg,color:v.col,border:v.bdr,borderRadius:sm?7:9,padding:sm?"6px 13px":"9px 18px",fontSize:sm?11:13,fontWeight:700,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,width:full?"100%":"auto",display:"inline-flex",alignItems:"center",gap:6,transition:"all .18s",whiteSpace:"nowrap",fontFamily:B,...style}}>{children}</button>;
  }}</_TC>;
}

function Card({children,style={},onClick,hover}){
  const [hov,setHov]=useState(false);
  const t=_globalTheme;
  return <div onClick={onClick} onMouseEnter={()=>hover&&setHov(true)} onMouseLeave={()=>hover&&setHov(false)} style={{background:t.card,border:`1px solid ${hov?t.borderHover:t.border}`,borderRadius:14,transition:"border-color .2s,transform .2s",transform:hov?"translateY(-2px)":"none",cursor:onClick?"pointer":"default",...style}}>{children}</div>;
}

function Badge({children,color}){
  const c=color||_globalTheme.accent;
  return <span style={{fontSize:10,fontWeight:700,background:`${c}18`,color:c,padding:"2px 8px",borderRadius:20,letterSpacing:.4,whiteSpace:"nowrap"}}>{children}</span>;
}

function Inp({label,value,onChange,type="text",placeholder,rows,hint}){
  const t=_globalTheme;
  const base={width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"10px 13px",color:t.text,fontSize:13,fontFamily:B,boxSizing:"border-box",outline:"none"};
  return <div style={{marginBottom:14}}>
    {label&&<label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:700}}>{label}</label>}
    {hint&&<div style={{fontSize:11,color:t.sub,marginBottom:5}}>{hint}</div>}
    {rows?<textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{...base,resize:"vertical"}}/>:<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={base}/>}
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

// ─── DONUT CHART ─────────────────────────────────────────────
function Donut({segments,size=72,stroke=10}){
  const r=(size-stroke)/2,circ=2*Math.PI*r;
  let offset=0;
  const total=segments.reduce((s,x)=>s+x.value,0)||1;
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    {segments.map((s,i)=>{
      const dash=(s.value/total)*circ,gap=circ-dash;
      const el=<circle key={i} cx={size/2} cy={size/2} r={r} fill="none" stroke={s.color} strokeWidth={stroke} strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"stroke-dasharray 1s ease"}}/>;
      offset+=dash;return el;
    })}
  </svg>;
}

// ─── BAR CHART (full) ────────────────────────────────────────
function BarChart({data,color,h=100,labels}){
  const t=_globalTheme;
  const max=Math.max(...data,1);
  return <div style={{display:"flex",alignItems:"flex-end",gap:6,height:h,paddingTop:16}}>
    {data.map((v,i)=>(
      <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
        <div style={{fontSize:9,color:t.sub,marginBottom:2}}>{v>0?v:""}</div>
        <div style={{width:"100%",height:`${(v/max)*85}%`,minHeight:3,borderRadius:"3px 3px 0 0",background:i===data.length-1?color:`${color}44`,transition:"height 1s ease"}}/>
        {labels&&<div style={{fontSize:9,color:t.sub,marginTop:2}}>{labels[i]}</div>}
      </div>
    ))}
  </div>;
}

// ─── ACTIVITY FEED ───────────────────────────────────────────
const LIVE_FEED = [
  {icon:"⚡",text:"Solar Calculator used — 5kW result generated",time:"2 min ago",color:"#f5a623"},
  {icon:"🗺️",text:"Installer directory browsed — Gauteng filter",time:"7 min ago",color:"#60a5fa"},
  {icon:"⚠️",text:"Error code F32 looked up — Sunsynk",time:"12 min ago",color:"#f87171"},
  {icon:"📋",text:"New quote request submitted to SunPower SA",time:"18 min ago",color:"#4ade80"},
  {icon:"📰",text:"Article read — '5kW solar cost 2026'",time:"24 min ago",color:"#c084fc"},
  {icon:"🩺",text:"Health check completed — score 72/100",time:"31 min ago",color:"#22d3ee"},
  {icon:"📬",text:"New subscriber via coming soon page",time:"45 min ago",color:"#4ade80"},
  {icon:"⚙️",text:"Pro Calculator used — 8kW off-grid result",time:"1 hr ago",color:"#f5a623"},
];
function ActivityFeed(){
  const t=_globalTheme;
  return <div style={{display:"flex",flexDirection:"column",gap:0}}>
    {LIVE_FEED.map((e,i)=>(
      <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 0",borderBottom:`1px solid ${i<LIVE_FEED.length-1?t.border:"transparent"}`}}>
        <div style={{width:28,height:28,borderRadius:8,background:`${e.color}14`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>{e.icon}</div>
        <span style={{flex:1,fontSize:12,color:t.textMid,lineHeight:1.4}}>{e.text}</span>
        <span style={{fontSize:10,color:t.sub,flexShrink:0,whiteSpace:"nowrap"}}>{e.time}</span>
      </div>
    ))}
  </div>;
}

// ─── TOOL CONTEST ────────────────────────────────────────────
const TOOL_DATA = [
  {tool:"Solar Calculator",icon:"⚡",sessions:1847,pct:68,top:true,color:"#f5a623"},
  {tool:"Installer Directory",icon:"🗺️",sessions:1223,pct:45,top:false,color:"#60a5fa"},
  {tool:"Error Code Translator",icon:"⚠️",sessions:892,pct:33,top:false,color:"#f87171"},
  {tool:"Health Check",icon:"🩺",sessions:764,pct:28,top:false,color:"#4ade80"},
  {tool:"Blog & Guides",icon:"📰",sessions:598,pct:22,top:false,color:"#c084fc"},
  {tool:"Pro Calculator",icon:"⚙️",sessions:312,pct:11,top:false,color:"#22d3ee"},
];
function ToolContest(){
  const t=_globalTheme;
  return <div style={{display:"flex",flexDirection:"column",gap:10}}>
    {TOOL_DATA.map((d,i)=>(
      <div key={d.tool} style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:26,height:26,borderRadius:7,background:`${d.color}14`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>{d.icon}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,alignItems:"center"}}>
            <span style={{fontSize:12,color:t.textMid,fontWeight:d.top?700:400}}>{d.tool}{d.top&&<span style={{marginLeft:6,fontSize:9,background:`rgba(${t.rgb},.15)`,color:t.accent,padding:"1px 6px",borderRadius:6,fontWeight:700}}>TOP</span>}</span>
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

// ─── STAT CARD ───────────────────────────────────────────────
function StatCard({label,value,color,icon,delta,sparkData,loading}){
  const t=_globalTheme;
  return <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,padding:"16px",overflow:"hidden",position:"relative",transition:"border-color .2s"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
      <div style={{width:34,height:34,borderRadius:9,background:`${color}14`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{icon}</div>
      {delta&&<span style={{fontSize:10,fontWeight:700,color:delta.startsWith("+")?t.green:t.red,background:delta.startsWith("+")?`rgba(74,222,128,.1)`:`rgba(248,113,113,.1)`,padding:"2px 7px",borderRadius:10}}>{delta}</span>}
    </div>
    <div style={{fontFamily:H,fontSize:28,fontWeight:900,color,marginBottom:3,lineHeight:1}}>
      {loading?"–":value}
    </div>
    <div style={{fontSize:11,color:t.sub}}>{label}</div>
    {sparkData&&<div style={{position:"absolute",bottom:0,right:0,opacity:.5}}><MiniBar data={sparkData} color={color} h={36} w={80}/></div>}
  </div>;
}

// ─── DASHBOARD ───────────────────────────────────────────────
function Dashboard({stats,loading}){
  const sc=useScreen();
  const t=_globalTheme;
  const [filter,setFilter]=useState("7 Days");
  const [errorToggle,setErrorToggle]=useState("today");
  const now=new Date();
  const hour=now.getHours();
  const greeting=hour<12?"Good morning":hour<17?"Good afternoon":"Good evening";
  const greetIcon=hour<12?"🌅":hour<17?"☀️":"🌙";

  const statCards=[
    {label:"Live Installers",value:stats.installers,color:t.accent,icon:"🏢",delta:"+2 this week",sparkData:[2,3,3,4,4,5,stats.installers]},
    {label:"Total Leads",value:stats.leads,color:t.green,icon:"📋",delta:"+5 today",sparkData:[0,0,0,0,0,0,stats.leads]},
    {label:"Subscribers",value:stats.subscribers,color:t.blue,icon:"📬",delta:"+3 today",sparkData:[0,0,0,0,0,0,stats.subscribers]},
    {label:"Published Posts",value:stats.posts,color:"#c084fc",icon:"📝",delta:null,sparkData:[4,5,5,5,6,6,stats.posts]},
    {label:"Pending Approvals",value:stats.pending,color:stats.pending>0?t.red:t.sub,icon:"⏳",delta:null,sparkData:null},
    {label:"Page Events",value:(stats.events||0).toLocaleString(),color:t.accent,icon:"📊",delta:"+12%",sparkData:[320,480,380,520,680,580,940]},
  ];

  const geographic=[
    {region:"Gauteng",pct:41,color:t.accent},
    {region:"Western Cape",pct:28,color:t.blue},
    {region:"KwaZulu-Natal",pct:16,color:t.green},
    {region:"Eastern Cape",pct:7,color:t.purple},
    {region:"Free State",pct:3,color:t.cyan},
    {region:"Other provinces",pct:3,color:t.sub},
    {region:"International",pct:2,color:t.subLight},
  ];

  const devices=[
    {name:"Mobile",pct:64,color:t.accent},
    {name:"Desktop",pct:28,color:t.blue},
    {name:"Tablet",pct:8,color:t.purple},
  ];

  const traffic=[
    {src:"Direct",v:420,color:t.accent},
    {src:"Google",v:310,color:t.blue},
    {src:"Social",v:180,color:t.purple},
    {src:"WhatsApp",v:95,color:"#25d366"},
    {src:"Referral",v:44,color:t.cyan},
  ];
  const trafficMax=traffic[0].v;

  const errorsByPeriod={
    today:[{code:"F32",brand:"Sunsynk",count:47,sev:"critical"},{code:"E001",brand:"Victron",count:31,sev:"warning"},{code:"W003",brand:"Deye",count:18,sev:"info"}],
    week:[{code:"F32",brand:"Sunsynk",count:214,sev:"critical"},{code:"E001",brand:"Victron",count:189,sev:"warning"},{code:"G01",brand:"Growatt",count:122,sev:"info"}],
    month:[{code:"F32",brand:"Sunsynk",count:847,sev:"critical"},{code:"E001",brand:"Victron",count:734,sev:"warning"},{code:"W003",brand:"Deye",count:511,sev:"info"}],
  };
  const currentErrors=errorsByPeriod[errorToggle]||errorsByPeriod.today;

  return (
    <div style={{animation:"fadeUp .4s ease"}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`,border:`1px solid rgba(${t.rgb},.12)`,borderRadius:16,padding:"20px 24px",marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontFamily:H,fontSize:24,fontWeight:900,color:t.text,marginBottom:3}}>{greetIcon} {greeting}, Tebello.</div>
          <div style={{fontSize:12,color:t.sub}}>{now.toLocaleDateString("en-ZA",{weekday:"long",year:"numeric",month:"long",day:"numeric"})} · Here's how today performed.</div>
        </div>
        <div style={{display:"flex",gap:6}}>
          {["Today","7 Days","30 Days","All Time"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?`rgba(${t.rgb},.15)`:t.card,border:`1px solid ${filter===f?`rgba(${t.rgb},.4)`:t.border}`,color:filter===f?t.accent:t.sub,borderRadius:20,padding:"5px 13px",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:B,whiteSpace:"nowrap"}}>{f}</button>
          ))}
        </div>
      </div>

      {stats.pending>0&&<div style={{background:"rgba(248,113,113,.06)",border:"1px solid rgba(248,113,113,.2)",borderRadius:10,padding:"10px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
        <span>⚠️</span><span style={{fontSize:13,color:t.red,fontWeight:600}}>{stats.pending} installer application{stats.pending!==1?"s":""} awaiting review</span>
        <span style={{fontSize:11,color:t.sub,marginLeft:"auto"}}>Review in Installers →</span>
      </div>}

      {/* Stat cards */}
      <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":sc.isTablet?"repeat(3,1fr)":"repeat(6,1fr)",gap:10,marginBottom:16}}>
        {statCards.map(c=><StatCard key={c.label} {...c} loading={loading}/>)}
      </div>

      {/* Row 1: Activity + Device + Platform */}
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1.5fr 1fr":"1fr",gap:14,marginBottom:14}}>
        <Card style={{padding:"18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontFamily:H,fontSize:14,fontWeight:800,color:t.text}}>Live Activity Feed</div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:t.green,animation:"pulse 2s infinite"}}/>
              <span style={{fontSize:10,color:t.green,fontWeight:700,letterSpacing:.5}}>LIVE</span>
            </div>
          </div>
          <ActivityFeed/>
        </Card>

        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <Card style={{padding:"18px"}}>
            <div style={{fontFamily:H,fontSize:14,fontWeight:800,color:t.text,marginBottom:14}}>Device Breakdown</div>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <Donut segments={devices.map(d=>({value:d.pct,color:d.color}))} size={72} stroke={10}/>
              <div style={{flex:1}}>
                {devices.map(d=>(
                  <div key={d.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
                    <div style={{display:"flex",alignItems:"center",gap:7}}>
                      <div style={{width:8,height:8,borderRadius:2,background:d.color}}/>
                      <span style={{fontSize:12,color:t.textMid}}>{d.name}</span>
                    </div>
                    <span style={{fontSize:12,fontWeight:700,color:d.color}}>{d.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card style={{padding:"18px"}}>
            <div style={{fontFamily:H,fontSize:14,fontWeight:800,color:t.text,marginBottom:12}}>Platform Health</div>
            {[["Database","Operational",t.green],["Auth","Operational",t.green],["Storage","Operational",t.green],["Vercel CDN","Operational",t.green],["WhatsApp API","Not connected",t.sub],["Edge Functions","Not configured",t.sub]].map(([name,status,color])=>(
              <div key={name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:`1px solid ${t.border}`}}>
                <span style={{fontSize:12,color:t.sub}}>{name}</span>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:color,animation:color===t.green?"pulse 2s infinite":"none"}}/>
                  <span style={{fontSize:11,color,fontWeight:600}}>{status}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Row 2: Tool performance + Province traffic */}
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1fr 1fr":"1fr",gap:14,marginBottom:14}}>
        <Card style={{padding:"18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontFamily:H,fontSize:14,fontWeight:800,color:t.text}}>Tool Performance</div>
            <Badge color={t.accent}>Live contest</Badge>
          </div>
          <ToolContest/>
        </Card>

        <Card style={{padding:"18px"}}>
          <div style={{fontFamily:H,fontSize:14,fontWeight:800,color:t.text,marginBottom:14}}>Traffic by Province</div>
          {geographic.map((g,i)=>(
            <div key={g.region} style={{marginBottom:i<geographic.length-1?9:0}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:12,color:t.textMid}}>{g.region}</span>
                <span style={{fontSize:12,fontWeight:700,color:g.color}}>{g.pct}%</span>
              </div>
              <div style={{height:4,background:`rgba(255,255,255,.05)`,borderRadius:2}}>
                <div style={{width:`${g.pct}%`,height:"100%",background:g.color,borderRadius:2,transition:"width 1.2s ease"}}/>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Row 3: Traffic sources + Most searched error */}
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1.2fr 1fr":"1fr",gap:14,marginBottom:14}}>
        <Card style={{padding:"18px"}}>
          <div style={{fontFamily:H,fontSize:14,fontWeight:800,color:t.text,marginBottom:16}}>Traffic Sources</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {traffic.map(s=>(
              <div key={s.src} style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:12,color:t.sub,width:70,flexShrink:0}}>{s.src}</span>
                <div style={{flex:1,height:5,background:`rgba(255,255,255,.05)`,borderRadius:3}}>
                  <div style={{width:`${(s.v/trafficMax)*100}%`,height:"100%",background:s.color,borderRadius:3,transition:"width 1.2s ease"}}/>
                </div>
                <span style={{fontSize:12,fontWeight:700,color:s.color,width:32,textAlign:"right",flexShrink:0}}>{s.v}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{padding:"18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontFamily:H,fontSize:14,fontWeight:800,color:t.text}}>Most Searched Errors</div>
            <div style={{display:"flex",gap:4}}>
              {["today","week","month"].map(p=>(
                <button key={p} onClick={()=>setErrorToggle(p)} style={{background:errorToggle===p?`rgba(${t.rgb},.12)`:t.card2,border:`1px solid ${errorToggle===p?`rgba(${t.rgb},.3)`:t.border}`,color:errorToggle===p?t.accent:t.sub,borderRadius:6,padding:"3px 8px",cursor:"pointer",fontSize:10,fontWeight:700,fontFamily:B,textTransform:"capitalize"}}>{p}</button>
              ))}
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {currentErrors.map((e,i)=>{
              const sevColor=e.sev==="critical"?t.red:e.sev==="warning"?t.accent:t.blue;
              return <div key={e.code} style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontFamily:"monospace",fontSize:13,fontWeight:800,color:sevColor,width:44,flexShrink:0}}>{e.code}</span>
                <div style={{flex:1,height:5,background:`rgba(255,255,255,.05)`,borderRadius:3}}>
                  <div style={{width:`${(e.count/currentErrors[0].count)*100}%`,height:"100%",background:sevColor,borderRadius:3}}/>
                </div>
                <span style={{fontSize:11,color:t.sub,width:28,textAlign:"right",flexShrink:0}}>{e.count}</span>
                <span style={{fontSize:10,color:t.sub,width:50,flexShrink:0}}>{e.brand}</span>
              </div>;
            })}
          </div>
          <div style={{marginTop:14,padding:"10px 12px",background:`rgba(${t.rgb},.06)`,border:`1px solid rgba(${t.rgb},.15)`,borderRadius:9}}>
            <div style={{fontSize:10,color:t.sub,marginBottom:2}}>Top error today</div>
            <div style={{fontFamily:H,fontSize:18,fontWeight:900,color:t.accent}}>F32 <span style={{fontSize:12,color:t.sub,fontWeight:400}}>— Sunsynk overheat</span></div>
          </div>
        </Card>
      </div>

      {/* Row 4: Quick actions */}
      <Card style={{padding:"18px"}}>
        <div style={{fontFamily:H,fontSize:14,fontWeight:800,color:t.text,marginBottom:14}}>Quick Actions</div>
        <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":"repeat(4,1fr)",gap:8}}>
          {[{icon:"📝",label:"Write new blog post",tab:"blog"},{icon:"🏢",label:"Review applications",tab:"installers"},{icon:"📊",label:"Full analytics",tab:"analytics"},{icon:"⚙️",label:"Site settings",tab:"settings"}].map(a=>(
            <div key={a.label} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:t.card2,borderRadius:10,cursor:"pointer",transition:"all .2s"}} onClick={()=>{}}
              onMouseEnter={e=>{e.currentTarget.style.background=`rgba(${t.rgb},.08)`;e.currentTarget.style.borderColor=`rgba(${t.rgb},.2)`}}
              onMouseLeave={e=>{e.currentTarget.style.background=t.card2}}>
              <span style={{fontSize:16}}>{a.icon}</span>
              <span style={{fontSize:12,color:t.textMid,flex:1}}>{a.label}</span>
              <Ic.Right s={12} c={t.sub}/>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── INSTALLERS ──────────────────────────────────────────────
function InstallersPage(){
  const sc=useScreen();
  const t=_globalTheme;
  const [items,setItems]=useState(SEED_INSTALLERS);
  const [filter,setFilter]=useState("all");
  const [typeFilter,setTypeFilter]=useState("all");
  const [search,setSearch]=useState("");
  const [selected,setSelected]=useState(null);

  const filtered=items.filter(i=>{
    if(filter!=="all"&&i.status!==filter)return false;
    if(typeFilter!=="all"&&i.type!==typeFilter)return false;
    if(search&&!i.name.toLowerCase().includes(search.toLowerCase())&&!i.city.toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  });

  const approve=id=>setItems(items.map(i=>i.id===id?{...i,status:"approved"}:i));
  const reject=id=>setItems(items.map(i=>i.id===id?{...i,status:"rejected"}:i));
  const setSessa=(id,val)=>setItems(items.map(i=>i.id===id?{...i,sessa:val}:i));
  const toggleBadge=(id,badge)=>setItems(items.map(i=>i.id===id?{...i,badge:i.badge===badge?null:badge}:i));
  const scC=s=>s==="approved"?t.green:s==="pending"?t.accent:t.red;

  const toggleSelected=id=>{
    setSelected(prev=>prev===id?null:id);
  };

  return (
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text}}>Installers & Technicians</div>
          <div style={{fontSize:12,color:t.sub,marginTop:3}}>{items.filter(i=>i.status==="approved").length} live · {items.filter(i=>i.status==="pending").length} pending</div>
        </div>
        <Btn variant="primary"><Ic.Plus s={13} c={t.dark?"#000":"#fff"}/> Add New</Btn>
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
          <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?`rgba(${t.rgb},.12)`:t.card,border:`1px solid ${filter===f?`rgba(${t.rgb},.4)`:t.border}`,color:filter===f?t.accent:t.sub,borderRadius:20,padding:"5px 13px",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:B,textTransform:"capitalize"}}>{f}</button>
        ))}
        <div style={{width:1,background:t.border,margin:"0 4px"}}/>
        {["all","installer","technician"].map(f=>(
          <button key={f} onClick={()=>setTypeFilter(f)} style={{background:typeFilter===f?`rgba(96,165,250,.12)`:t.card,border:`1px solid ${typeFilter===f?`rgba(96,165,250,.4)`:t.border}`,color:typeFilter===f?t.blue:t.sub,borderRadius:20,padding:"5px 13px",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:B,textTransform:"capitalize"}}>
            {f==="all"?"All Types":f==="installer"?"🏢 Installers":"🔧 Technicians"}
          </button>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1fr 1fr":"1fr",gap:10}}>
        {filtered.map(inst=>(
          <Card key={inst.id} style={{padding:"16px"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:12,cursor:"pointer"}} onClick={()=>toggleSelected(inst.id)}>
              <div style={{width:42,height:42,borderRadius:12,background:`rgba(${t.rgb},.1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>
                {inst.type==="technician"?"🔧":"🏢"}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,flexWrap:"wrap"}}>
                  <span style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text}}>{inst.name}</span>
                  <Badge color={scC(inst.status)}>{inst.status}</Badge>
                  <Badge color={inst.type==="installer"?t.accent:t.blue}>{inst.type}</Badge>
                  {inst.sessa&&<Badge color={t.green}>✓ SESSA</Badge>}
                  {inst.badge&&<Badge color={t.purple}>{inst.badge}</Badge>}
                </div>
                <div style={{fontSize:11,color:t.sub}}>{inst.city}, {inst.province} · {inst.spec} · {inst.yrs} yrs</div>
                <div style={{fontSize:11,color:t.sub,marginTop:2}}>⭐ {inst.rating} ({inst.reviews} reviews) · R{(inst.price_min||0).toLocaleString()}–R{(inst.price_max||0).toLocaleString()}</div>
              </div>
              <span style={{fontSize:14,color:t.sub,transform:selected===inst.id?"rotate(90deg)":"none",transition:"transform .2s",flexShrink:0,marginTop:4}}>›</span>
            </div>
            {selected===inst.id&&(
              <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${t.border}`,animation:"fadeUp .2s ease"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                  {[["Brands",(inst.brands||[]).join(", ")],["Response",inst.resp],["Finance",inst.finance?"✅ Yes":"No"]].map(([l,v])=>v&&(
                    <div key={l}><div style={{fontSize:10,color:t.sub,textTransform:"uppercase",letterSpacing:.8,marginBottom:2}}>{l}</div><div style={{fontSize:13,color:t.textMid}}>{v}</div></div>
                  ))}
                </div>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:11,color:t.sub,marginBottom:7,textTransform:"uppercase",letterSpacing:1}}>Assign Badge</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {["Top Rated","Most Popular","Fast Response","High PSH Zone"].map(b=>(
                      <button key={b} onClick={()=>toggleBadge(inst.id,b)} style={{background:inst.badge===b?`rgba(${t.rgb},.12)`:t.card,border:`1px solid ${inst.badge===b?`rgba(${t.rgb},.4)`:t.border}`,color:inst.badge===b?t.accent:t.sub,borderRadius:7,padding:"4px 10px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:B}}>{b}</button>
                    ))}
                  </div>
                </div>
                <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                  {inst.status!=="approved"&&<Btn variant="success" sm onClick={()=>approve(inst.id)}><Ic.Chk c={t.green}/> Approve</Btn>}
                  {inst.status!=="rejected"&&<Btn variant="danger" sm onClick={()=>reject(inst.id)}><Ic.X c={t.red}/> Reject</Btn>}
                  <Btn variant="ghost" sm onClick={()=>setSessa(inst.id,!inst.sessa)}>{inst.sessa?"Remove SESSA":"✓ Mark SESSA"}</Btn>
                </div>
              </div>
            )}
          </Card>
        ))}
        {filtered.length===0&&<Card style={{padding:"40px",textAlign:"center",gridColumn:sc.isDesktop?"span 2":"1"}}><div style={{fontSize:28,marginBottom:8}}>🔍</div><div style={{color:t.sub,fontSize:13}}>No results match your filters</div></Card>}
      </div>
    </div>
  );
}

// ─── BLOG ────────────────────────────────────────────────────
function BlogPage(){
  const sc=useScreen();
  const t=_globalTheme;
  const [posts,setPosts]=useState(SEED_ARTICLES);
  const [editing,setEditing]=useState(null);
  const [form,setForm]=useState({title:"",intro:"",tag:"Guide",body:"[]",cover_image:"",hot:false,published:true,read_minutes:5,slug:""});
  const tagColor=tag=>({Guide:t.accent,Comparison:t.blue,Tax:t.green,Maintenance:t.cyan,News:t.red,Review:t.purple}[tag]||t.sub);
  const slugify=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  const del=id=>{if(confirm("Delete this post?"))setPosts(posts.filter(p=>p.id!==id));};

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
            <Inp label="Cover Image URL" value={form.cover_image||""} onChange={v=>setForm({...form,cover_image:v})} placeholder="https://images.unsplash.com/..."/>
            <Inp label="YouTube Video ID" value={form.youtube_id||""} onChange={v=>setForm({...form,youtube_id:v})} placeholder="dQw4w9WgXcQ"/>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:700}}>Body Sections (JSON)</label>
              <div style={{fontSize:11,color:t.sub,marginBottom:6}}>{`[{"h":"Section heading","p":"Paragraph text"},...]`}</div>
              <textarea value={form.body} onChange={e=>setForm({...form,body:e.target.value})} rows={10}
                style={{width:"100%",background:"rgba(0,0,0,.3)",border:`1px solid ${t.border}`,borderRadius:9,padding:"10px 13px",color:t.text,fontSize:12,fontFamily:"monospace",resize:"vertical",outline:"none",boxSizing:"border-box"}}/>
            </div>
            <div style={{display:"flex",gap:8}}>
              <Btn onClick={async()=>{
                let bodyParsed;try{bodyParsed=JSON.parse(form.body);}catch{bodyParsed=[{h:"Content",p:form.body}];}
                const payload={...form,body:bodyParsed,slug:form.slug||slugify(form.title),updated_at:new Date().toISOString()};
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
                <button key={tag} onClick={()=>setForm({...form,tag})} style={{background:form.tag===tag?`${tagColor(tag)}18`:t.card,border:`1px solid ${form.tag===tag?tagColor(tag):t.border}`,color:form.tag===tag?tagColor(tag):t.sub,borderRadius:7,padding:"6px 10px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:B}}>{tag}</button>
              ))}
            </div>
            <Inp label="Read Time (minutes)" value={String(form.read_minutes)} onChange={v=>setForm({...form,read_minutes:parseInt(v)||5})} type="number"/>
            <Toggle value={form.published} onChange={v=>setForm({...form,published:v})} label="Published" color={t.green}/>
            <Toggle value={form.hot} onChange={v=>setForm({...form,hot:v})} label="🔥 Trending" color={t.red}/>
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
        <Btn onClick={()=>{setForm({title:"",intro:"",tag:"Guide",body:"[]",cover_image:"",hot:false,published:true,read_minutes:5,slug:""});setEditing("new");}}>
          <Ic.Plus s={13} c={t.dark?"#000":"#fff"}/> New Post
        </Btn>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {posts.map(p=>(
          <Card key={p.id} style={{padding:"14px 16px"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              {p.cover_image&&<img src={p.cover_image} style={{width:56,height:40,objectFit:"cover",borderRadius:7,flexShrink:0}} alt=""/>}
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4,flexWrap:"wrap"}}>
                  <span style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text}}>{p.title}</span>
                  <Badge color={tagColor(p.tag)}>{p.tag}</Badge>
                  {p.hot&&<Badge color={t.red}>🔥</Badge>}
                </div>
                <div style={{fontSize:11,color:t.sub}}>
                  {p.published?<span style={{color:t.green}}>● Published</span>:<span style={{color:t.sub}}>○ Draft</span>}
                  {" · "}{p.read_minutes} min · {(p.views||0).toLocaleString()} views
                </div>
              </div>
              <div style={{display:"flex",gap:6,flexShrink:0}}>
                <Btn sm variant="ghost" onClick={()=>{setForm({...p,body:typeof p.body==="object"?JSON.stringify(p.body,null,2):(p.body||"[]")});setEditing(p.id);}}>Edit</Btn>
                <Btn sm variant={p.published?"ghost":"success"} onClick={()=>setPosts(posts.map(x=>x.id===p.id?{...x,published:!x.published}:x))}>{p.published?"Unpublish":"Publish"}</Btn>
                <Btn sm variant="danger" onClick={()=>del(p.id)}>Delete</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── LEADS ───────────────────────────────────────────────────
function LeadsPage(){
  const sc=useScreen();
  const t=_globalTheme;
  const [leads,setLeads]=useState([]);
  const [loading,setLoading]=useState(true);
  const [filter,setFilter]=useState("all");
  const [search,setSearch]=useState("");

  useEffect(()=>{
    sb.from("leads").select("*,installers(name)").order("created_at",{ascending:false})
      .then(({data})=>{setLeads(data||[]);setLoading(false);});
  },[]);

  const update=async(id,status)=>{
    await sb.from("leads").update({status}).eq("id",id);
    setLeads(leads.map(l=>l.id===id?{...l,status}:l));
  };

  const filtered=leads.filter(l=>{
    if(filter!=="all"&&l.status!==filter)return false;
    if(search&&!l.name?.toLowerCase().includes(search.toLowerCase())&&!l.email?.toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  });

  const scC=s=>({new:t.accent,contacted:t.blue,quoted:t.purple,converted:t.green,lost:t.red}[s]||t.sub);
  const scoreLabel=cost=>cost>=120000?{label:"Premium",color:t.accent,action:"Priority lead"}:cost>=50000?{label:"Standard",color:t.blue,action:"Assign installer"}:{label:"Budget",color:t.sub,action:"Send guide"};

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text}}>Leads</div>
          <div style={{fontSize:12,color:t.sub}}>{leads.length} total · {leads.filter(l=>l.status==="new").length} new</div>
        </div>
        <Btn variant="ghost" sm>Export CSV</Btn>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:180,position:"relative"}}>
          <div style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)"}}><Ic.Search s={13} c={t.sub}/></div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search leads..."
            style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"9px 12px 9px 32px",color:t.text,fontSize:13,fontFamily:B,outline:"none",boxSizing:"border-box"}}/>
        </div>
        {["all","new","contacted","quoted","converted","lost"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?`rgba(${t.rgb},.12)`:t.card,border:`1px solid ${filter===f?`rgba(${t.rgb},.4)`:t.border}`,color:filter===f?t.accent:t.sub,borderRadius:20,padding:"5px 13px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:B,textTransform:"capitalize"}}>{f}</button>
        ))}
      </div>
      {loading?<div style={{textAlign:"center",padding:40}}><Spinner/></div>:(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtered.map(l=>{
            const sl=scoreLabel(l.estimated_cost||0);
            return(
              <Card key={l.id} style={{padding:"14px 16px"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                  <div style={{width:38,height:38,background:`${scC(l.status)}18`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>👤</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:4,flexWrap:"wrap"}}>
                      <span style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text}}>{l.name||"Anonymous"}</span>
                      <Badge color={scC(l.status)}>{l.status}</Badge>
                      <Badge color={sl.color}>{sl.label}</Badge>
                    </div>
                    <div style={{fontSize:11,color:t.sub}}>{l.email||"No email"} · {l.installers?.name||"No installer"}</div>
                    <div style={{fontSize:11,color:t.sub,marginTop:2}}>{l.system_kw}kW · R{(l.estimated_cost||0).toLocaleString()} est · {new Date(l.created_at).toLocaleDateString("en-ZA")}</div>
                  </div>
                  <select value={l.status} onChange={e=>update(l.id,e.target.value)} onClick={e=>e.stopPropagation()}
                    style={{background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:8,padding:"5px 9px",color:t.text,fontSize:12,fontFamily:B,cursor:"pointer",flexShrink:0}}>
                    {["new","contacted","quoted","converted","lost"].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
              </Card>
            );
          })}
          {filtered.length===0&&<Card style={{padding:"40px",textAlign:"center"}}><div style={{fontSize:24,marginBottom:8}}>📋</div><div style={{color:t.sub,fontSize:13}}>No leads yet — quote requests will appear here</div></Card>}
        </div>
      )}
    </div>
  );
}

// ─── SUBSCRIBERS ─────────────────────────────────────────────
function SubscribersPage(){
  const t=_globalTheme;
  const [subs,setSubs]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    sb.from("subscribers").select("*").order("created_at",{ascending:false})
      .then(({data})=>{setSubs(data||[]);setLoading(false);});
  },[]);

  const exportCSV=()=>{
    const csv=["Email,Source,Date",...subs.map(s=>`${s.email},${s.source},${new Date(s.created_at).toLocaleDateString("en-ZA")}`)].join("\n");
    const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="solariq-subscribers.csv";a.click();
  };
  const srcColor=s=>({coming_soon:t.accent,calculator:t.green,newsletter:t.blue,blog:t.purple}[s]||t.sub);

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text}}>Subscribers</div>
          <div style={{fontSize:12,color:t.sub}}>{subs.length} total email subscribers</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <Btn variant="ghost" sm onClick={exportCSV}>Export CSV</Btn>
          <Btn variant="accent" sm>📧 Send Newsletter</Btn>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:10,marginBottom:16}}>
        {[["Total",subs.length,t.accent],["This week",0,t.green],["From calc",subs.filter(s=>s.source==="calculator").length,t.blue],["From launch",subs.filter(s=>s.source==="coming_soon").length,t.purple]].map(([l,v,c])=>(
          <div key={l} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:12,padding:"14px 16px",textAlign:"center"}}>
            <div style={{fontFamily:H,fontSize:24,fontWeight:900,color:c}}>{v}</div>
            <div style={{fontSize:11,color:t.sub,marginTop:3}}>{l}</div>
          </div>
        ))}
      </div>
      {loading?<div style={{textAlign:"center",padding:40}}><Spinner/></div>:(
        <Card style={{padding:"16px"}}>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {subs.map(s=>(
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 11px",background:"rgba(255,255,255,.03)",borderRadius:8}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:`${srcColor(s.source)}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>📬</div>
                <span style={{flex:1,fontSize:13,color:t.text}}>{s.email}</span>
                <Badge color={srcColor(s.source)}>{s.source}</Badge>
                <span style={{fontSize:11,color:t.sub,flexShrink:0}}>{new Date(s.created_at).toLocaleDateString("en-ZA")}</span>
              </div>
            ))}
            {subs.length===0&&<div style={{color:t.sub,textAlign:"center",padding:24,fontSize:13}}>No subscribers yet.</div>}
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── ANALYTICS ───────────────────────────────────────────────
function AnalyticsPage(){
  const sc=useScreen();
  const t=_globalTheme;
  const [filter,setFilter]=useState("7d");

  const weekData=[420,510,380,720,850,630,940];
  const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const maxBar=Math.max(...weekData);

  const allProvinces=[
    {region:"Gauteng",pct:41,color:t.accent},
    {region:"Western Cape",pct:28,color:t.blue},
    {region:"KwaZulu-Natal",pct:16,color:t.green},
    {region:"Eastern Cape",pct:7,color:t.purple},
    {region:"Free State",pct:3,color:t.cyan},
    {region:"Mpumalanga",pct:2,color:"#f87171"},
    {region:"Limpopo",pct:1,color:"#94a3b8"},
    {region:"North West",pct:1,color:"#64748b"},
    {region:"Northern Cape",pct:0.5,color:"#475569"},
    {region:"International",pct:0.5,color:"#334155"},
  ];

  const errorData=[
    {code:"F32",count:47,brand:"Sunsynk",sev:"critical"},
    {code:"E001",count:38,brand:"Victron",sev:"warning"},
    {code:"W003",count:29,brand:"Deye",sev:"info"},
    {code:"G01",count:22,brand:"Growatt",sev:"info"},
    {code:"F01",count:18,brand:"Sunsynk",sev:"warning"},
    {code:"NOT_FOUND",count:14,brand:"Unknown",sev:"unknown"},
  ];

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text}}>Analytics</div>
          <div style={{fontSize:12,color:t.sub}}>Traffic, usage, and platform intelligence</div>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {["today","7d","30d","this year","all time"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?`rgba(${t.rgb},.12)`:t.card,border:`1px solid ${filter===f?`rgba(${t.rgb},.4)`:t.border}`,color:filter===f?t.accent:t.sub,borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:B,whiteSpace:"nowrap"}}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":"repeat(4,1fr)",gap:10,marginBottom:16}}>
        {[{label:"Page Views",value:"4,847",color:t.accent,delta:"+12%"},{label:"Unique Visitors",value:"1,923",color:t.blue,delta:"+8%"},{label:"Avg Session",value:"3m 42s",color:t.green,delta:"+3%"},{label:"Bounce Rate",value:"34%",color:t.purple,delta:"-5%"}].map((s,i)=>(
          <div key={s.label} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:12,padding:"14px 16px"}}>
            <div style={{fontSize:11,color:t.sub,marginBottom:6}}>{s.label}</div>
            <div style={{fontFamily:H,fontSize:24,fontWeight:900,color:t.text}}>{s.value}</div>
            <div style={{fontSize:11,color:t.green,marginTop:4,fontWeight:700}}>{s.delta} vs prev period</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1.3fr 1fr":"1fr",gap:14,marginBottom:14}}>
        <Card style={{padding:"20px"}}>
          <div style={{fontFamily:H,fontSize:14,fontWeight:800,color:t.text,marginBottom:4}}>Daily Traffic</div>
          <div style={{fontSize:11,color:t.sub,marginBottom:16}}>Visitors per day — last 7 days</div>
          <BarChart data={weekData} color={t.accent} h={100} labels={days}/>
        </Card>
        <Card style={{padding:"20px"}}>
          <div style={{fontFamily:H,fontSize:14,fontWeight:800,color:t.text,marginBottom:14}}>Error Code Searches</div>
          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            {errorData.map(e=>{
              const sevColor=e.sev==="critical"?t.red:e.sev==="warning"?t.accent:e.sev==="info"?t.blue:t.sub;
              return(
                <div key={e.code} style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{fontFamily:"monospace",fontSize:12,fontWeight:800,color:sevColor,width:60,flexShrink:0}}>{e.code}</div>
                  <div style={{flex:1,height:5,background:"rgba(255,255,255,.05)",borderRadius:3}}>
                    <div style={{width:`${(e.count/errorData[0].count)*100}%`,height:"100%",background:sevColor,borderRadius:3}}/>
                  </div>
                  <div style={{fontSize:11,color:t.sub,width:24,textAlign:"right"}}>{e.count}</div>
                  {e.code==="NOT_FOUND"&&<Badge color={t.red}>Add!</Badge>}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1fr 1fr":"1fr",gap:14,marginBottom:14}}>
        <Card style={{padding:"20px"}}>
          <div style={{fontFamily:H,fontSize:14,fontWeight:800,color:t.text,marginBottom:14}}>Traffic Sources</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[{src:"Organic",pct:52,icon:"🔍",color:t.green},{src:"Direct",pct:28,icon:"🔗",color:t.blue},{src:"Social",pct:13,icon:"📱",color:t.purple},{src:"Referral",pct:7,icon:"🤝",color:t.accent}].map(s=>(
              <div key={s.src} style={{background:t.card2,borderRadius:10,padding:"14px",textAlign:"center"}}>
                <div style={{fontSize:24,marginBottom:8}}>{s.icon}</div>
                <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:s.color}}>{s.pct}%</div>
                <div style={{fontSize:11,color:t.sub,marginTop:3}}>{s.src}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{padding:"20px"}}>
          <div style={{fontFamily:H,fontSize:14,fontWeight:800,color:t.text,marginBottom:14}}>All Provinces & International</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {allProvinces.map(g=>(
              <div key={g.region}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                  <span style={{fontSize:11,color:t.textMid}}>{g.region}</span>
                  <span style={{fontSize:11,fontWeight:700,color:g.color}}>{g.pct}%</span>
                </div>
                <div style={{height:3,background:`rgba(255,255,255,.05)`,borderRadius:2}}>
                  <div style={{width:`${(g.pct/41)*100}%`,height:"100%",background:g.color,borderRadius:2,transition:"width 1.2s ease"}}/>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card style={{padding:"20px"}}>
        <div style={{fontFamily:H,fontSize:14,fontWeight:800,color:t.text,marginBottom:16}}>Tool Usage Detail</div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {TOOL_DATA.map(d=>(
            <div key={d.tool} style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:30,height:30,borderRadius:8,background:`${d.color}14`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{d.icon}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,alignItems:"center"}}>
                  <span style={{fontSize:13,color:t.textMid,fontWeight:600}}>{d.tool}</span>
                  <div style={{display:"flex",gap:12,alignItems:"center"}}>
                    <span style={{fontSize:12,fontWeight:700,color:d.color}}>{d.sessions.toLocaleString()} sessions</span>
                    <span style={{fontSize:11,color:t.sub}}>{d.pct}% of users</span>
                  </div>
                </div>
                <div style={{height:6,background:"rgba(255,255,255,.05)",borderRadius:3}}>
                  <div style={{width:`${d.pct}%`,height:"100%",background:d.color,borderRadius:3,transition:"width 1.2s ease"}}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── TEAM ────────────────────────────────────────────────────
function UsersPage(){
  const t=_globalTheme;
  const [users]= useState([{id:1,name:"Tebello",email:"mail4tebello@gmail.com",role:"Super Admin",avatar:"T",color:t.accent,lastActive:"Now",permissions:["all"]}]);
  const roleColor=r=>({
    "Super Admin":t.accent,Admin:t.blue,Editor:t.green,Support:t.purple,Viewer:t.sub
  }[r]||t.sub);
  const permList=["Dashboard","Installers","Leads","Blog","Subscribers","Analytics","Settings","Users"];
  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text}}>Team & Users</div>
          <div style={{fontSize:12,color:t.sub}}>{users.length} admin user{users.length!==1?"s":""}</div>
        </div>
        <Btn><Ic.Plus s={13} c={t.dark?"#000":"#fff"}/> Invite User</Btn>
      </div>
      {users.map(u=>(
        <Card key={u.id} style={{padding:"18px",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
            <div style={{width:46,height:46,borderRadius:14,background:`linear-gradient(135deg,${t.accent},${t.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:H,fontSize:20,fontWeight:900,color:t.dark?"#000":"#fff",flexShrink:0}}>{u.avatar}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                <span style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text}}>{u.name}</span>
                <Badge color={roleColor(u.role)}>{u.role}</Badge>
                <Badge color={t.green}>● {u.lastActive}</Badge>
              </div>
              <div style={{fontSize:12,color:t.sub,marginBottom:12}}>{u.email}</div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1,marginBottom:8,fontWeight:700}}>Page Access</div>
                <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                  {permList.map(p=>(
                    <div key={p} style={{background:u.permissions.includes("all")?`rgba(${t.rgb},.1)`:t.card,border:`1px solid ${u.permissions.includes("all")?`rgba(${t.rgb},.3)`:t.border}`,color:u.permissions.includes("all")?t.accent:t.sub,borderRadius:7,padding:"4px 10px",fontSize:11,fontWeight:700,display:"flex",alignItems:"center",gap:5}}>
                      {u.permissions.includes("all")&&<Ic.Chk s={10} c={t.accent}/>}{p}
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
      <Card style={{padding:"20px",border:`1px dashed rgba(${t.rgb},.2)`,textAlign:"center"}} hover>
        <div style={{fontSize:24,marginBottom:8}}>👤</div>
        <div style={{fontFamily:H,fontSize:15,fontWeight:700,color:t.accent,marginBottom:4}}>Invite a Team Member</div>
        <div style={{fontSize:12,color:t.sub}}>Magic link sent to their email — no password needed</div>
      </Card>
    </div>
  );
}

// ─── MESSAGES ────────────────────────────────────────────────
const MOCK_MSGS=[
  {id:1,from:"Sipho Dlamini",email:"sipho@gmail.com",tag:"lead",time:"08:32",unread:true,subject:"Quote request — 10kW off-grid farm",body:"Hi, I need a quote for a 10kW system for my farm in Limpopo. Looking for full off-grid capability with battery backup for 48 hours. Please advise on best system.",avatar:"S",avatarColor:"#f5a623"},
  {id:2,from:"FixSolar SA",email:"info@fixsolar.co.za",tag:"installer",time:"08:44",unread:true,subject:"Document re-submission",body:"Hi Tebello, we have re-uploaded our SESSA certificate. Please review and approve our listing when you get a chance. We have also added photos of recent installations.",avatar:"F",avatarColor:"#60a5fa"},
  {id:3,from:"Thabo Nkosi",email:"thabo.n@outlook.com",tag:"support",time:"Yesterday",unread:false,subject:"Calculator not loading on mobile",body:"The calculator seems to freeze on my Samsung S23. Steps to reproduce: open calculator, select appliances, tap calculate. Tested on Chrome and Samsung browser.",avatar:"T",avatarColor:"#4ade80"},
  {id:4,from:"Ayanda Khumalo",email:"ayanda@khumalo.co.za",tag:"feedback",time:"Yesterday",unread:false,subject:"5-star experience",body:"Just wanted to say the platform is amazing. Found my installer within minutes and the quote process was seamless. This is exactly what SA needed.",avatar:"A",avatarColor:"#c084fc"},
  {id:5,from:"Vercel",email:"noreply@vercel.com",tag:"system",time:"2 days ago",unread:false,subject:"Deployment successful",body:"Your project solariq was successfully deployed to production at solariq.vercel.app.",avatar:"V",avatarColor:"#555"},
];
const TAG_COLORS={"lead":"#f5a623","installer":"#60a5fa","support":"#4ade80","feedback":"#c084fc","system":"#666"};

function MessagesPage(){
  const sc=useScreen();
  const t=_globalTheme;
  const [msgs,setMsgs]=useState(MOCK_MSGS);
  const [selected,setSelected]=useState(MOCK_MSGS[1]);
  const [filter,setFilter]=useState("All");
  const [reply,setReply]=useState("");
  const [sent,setSent]=useState(false);

  const filtered=filter==="All"?msgs:msgs.filter(m=>m.tag===filter.toLowerCase());
  const unread=msgs.filter(m=>m.unread).length;
  const filters=["All","Leads","Installers","Support","Feedback","System"];

  const sendReply=async()=>{
    if(!reply.trim())return;
    setSent(true);
    setReply("");
    setMsgs(msgs.map(m=>m.id===selected.id?{...m,unread:false}:m));
    setTimeout(()=>setSent(false),3000);
  };

  const markRead=id=>{
    setMsgs(msgs.map(m=>m.id===id?{...m,unread:false}:m));
  };

  const selectMsg=msg=>{
    setSelected(msg);
    markRead(msg.id);
  };

  const inboxPanel=(
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{padding:"0 0 14px"}}>
        <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text,marginBottom:4}}>Messages & Inbox</div>
        <div style={{fontSize:12,color:t.sub}}>{unread} unread · Contact form submissions and installer messages</div>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
        {filters.map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?`rgba(${t.rgb},.12)`:t.card,border:`1px solid ${filter===f?`rgba(${t.rgb},.4)`:t.border}`,color:filter===f?t.accent:t.sub,borderRadius:20,padding:"5px 13px",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:B,whiteSpace:"nowrap"}}>{f}</button>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:2}}>
        {filtered.map(msg=>(
          <div key={msg.id} onClick={()=>selectMsg(msg)} style={{display:"flex",gap:12,padding:"12px 14px",borderRadius:10,cursor:"pointer",background:selected?.id===msg.id?`rgba(${t.rgb},.07)`:msg.unread?"rgba(255,255,255,.03)":"transparent",border:`1px solid ${selected?.id===msg.id?`rgba(${t.rgb},.2)`:"transparent"}`,transition:"all .15s"}}
            onMouseEnter={e=>{if(selected?.id!==msg.id)e.currentTarget.style.background="rgba(255,255,255,.03)";}}
            onMouseLeave={e=>{if(selected?.id!==msg.id)e.currentTarget.style.background="transparent";}}>
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
              <div style={{fontSize:11,color:t.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginTop:1}}>{msg.body.slice(0,80)}...</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const detailPanel=selected?(
    <div style={{display:"flex",flexDirection:"column",height:"100%",paddingLeft:sc.isDesktop?20:0,borderLeft:sc.isDesktop?`1px solid ${t.border}`:"none",paddingTop:sc.isDesktop?0:20}}>
      <div style={{marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{width:42,height:42,borderRadius:12,background:`${selected.avatarColor}22`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:H,fontSize:18,fontWeight:900,color:selected.avatarColor,flexShrink:0}}>{selected.avatar}</div>
          <div>
            <div style={{fontFamily:H,fontSize:15,fontWeight:800,color:t.text}}>{selected.from}</div>
            <div style={{fontSize:11,color:t.sub}}>{selected.email}</div>
          </div>
          <span style={{marginLeft:"auto",fontSize:10,fontWeight:700,background:`${TAG_COLORS[selected.tag]||t.sub}18`,color:TAG_COLORS[selected.tag]||t.sub,padding:"3px 9px",borderRadius:8}}>{selected.tag}</span>
        </div>
        <div style={{fontFamily:H,fontSize:17,fontWeight:800,color:t.text,marginBottom:12}}>{selected.subject}</div>
        <div style={{fontSize:13,color:t.textMid,lineHeight:1.75,background:t.card,border:`1px solid ${t.border}`,borderRadius:12,padding:"14px 16px"}}>{selected.body}</div>
      </div>
      {selected.tag!=="system"&&(
        <div style={{marginTop:"auto"}}>
          <div style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:8,fontWeight:700}}>Reply</div>
          <textarea value={reply} onChange={e=>setReply(e.target.value)} placeholder="Write your reply..."
            style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 14px",color:t.text,fontSize:13,fontFamily:B,resize:"vertical",outline:"none",boxSizing:"border-box",minHeight:100}}
            rows={4}/>
          <div style={{display:"flex",gap:8,marginTop:10,alignItems:"center"}}>
            <Btn onClick={sendReply} style={{gap:7}}><Ic.Send s={12} c={t.dark?"#000":"#fff"}/> Send Reply</Btn>
            <Btn variant="ghost" onClick={()=>markRead(selected.id)}>Mark Read</Btn>
            {sent&&<span style={{fontSize:12,color:t.green,fontWeight:600}}>✓ Sent!</span>}
          </div>
        </div>
      )}
    </div>
  ):<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",color:t.sub,fontSize:13}}>Select a message</div>;

  if(sc.isMobile)return(
    <div style={{animation:"fadeUp .4s ease"}}>
      {selected?
        <div>
          <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:13,marginBottom:16,fontFamily:B,display:"flex",alignItems:"center",gap:6}}><Ic.Left s={14} c={t.sub}/> Back</button>
          {detailPanel}
        </div>:inboxPanel}
    </div>
  );

  return(
    <div style={{animation:"fadeUp .4s ease",display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,height:"calc(100vh - 160px)"}}>
      <div style={{overflowY:"auto",paddingRight:20}}>{inboxPanel}</div>
      <div style={{overflowY:"auto"}}>{detailPanel}</div>
    </div>
  );
}

// ─── MORE (mobile) ───────────────────────────────────────────
function MorePage({setTab}){
  const t=_globalTheme;
  const items=[
    {id:"analytics",label:"Analytics",Icon:Ic.Chart,color:t.blue,desc:"Traffic, events & usage"},
    {id:"messages",label:"Messages",Icon:Ic.Mail,color:t.green,desc:"Inbox & replies"},
    {id:"subscribers",label:"Subscribers",Icon:Ic.Mail,color:t.purple,desc:"Email list & newsletter"},
    {id:"users",label:"Team & Users",Icon:Ic.Users,color:t.cyan,desc:"Roles, permissions, audit"},
    {id:"settings",label:"Settings",Icon:Ic.Cog,color:t.sub,desc:"Site control, SEO, security"},
  ];
  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text,marginBottom:20}}>More</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {items.map((item,i)=>(
          <div key={item.id} onClick={()=>setTab(item.id)} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:12,padding:"16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}>
            <div style={{width:44,height:44,borderRadius:12,background:`${item.color}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><item.Icon s={20} c={item.color}/></div>
            <div style={{flex:1}}>
              <div style={{fontFamily:H,fontSize:15,fontWeight:700,color:t.text}}>{item.label}</div>
              <div style={{fontSize:12,color:t.sub,marginTop:2}}>{item.desc}</div>
            </div>
            <Ic.Right s={14} c={t.sub}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SETTINGS ────────────────────────────────────────────────
function SettingsPage(){
  const sc=useScreen();
  const t=_globalTheme;
  const [activeTab,setActiveTab]=useState("site");
  const [saved,setSaved]=useState(false);
  const [settings,setSettings]=useState({
    coming_soon:true,launch_date:"2026-04-08",site_name:"SolarIQ",
    contact_email:"hello@solariq.co.za",eskom_stage:"0",
    ticker_enabled:true,
    ticker_messages:["☀️ Solar tax rebate: claim 25% back from SARS","🔋 Load shedding prep — is your system sized right?","⚙️ Pro Calculator now live","🩺 Free System Health Check — 2 minutes","🔧 Verified repair technicians across SA"],
    seo_title:"SolarIQ — SA's Complete Solar Platform",
    seo_description:"Calculate your solar system, find verified installers, diagnose faults. Free. Always. Built for South Africa.",
    og_image:"",analytics_ga:"",analytics_hotjar:"",
    whatsapp_number:"",email_sender:"",make_webhook:"",gsc_verify:"",
    two_fa:false,session_timeout:"24h",allowed_ips:"",
    maintenance_mode:false,maintenance_message:"SolarIQ is under maintenance. We'll be back shortly.",
    cs_headline:"SA's Solar Platform.",cs_sub:"Launching 8 April 2026.",
    cs_body:"Calculate your system. Find verified installers. Diagnose faults.",
    cs_cta:"Notify Me",cs_icon:"☀️",
  });

  const set=(k,v)=>setSettings(s=>({...s,[k]:v}));

  const saveSettings=async()=>{
    const pairs=Object.entries(settings).map(([key,value])=>({key,value:typeof value==="boolean"?String(value):typeof value==="object"?JSON.stringify(value):String(value),updated_at:new Date().toISOString()}));
    await Promise.all(pairs.map(p=>sb.from("settings").upsert(p)));
    setSaved(true);setTimeout(()=>setSaved(false),2500);
  };

  const TABS=[
    {id:"site",label:"General"},
    {id:"coming_soon",label:"Coming Soon"},
    {id:"ticker",label:"Ticker Bar"},
    {id:"seo",label:"SEO"},
    {id:"integrations",label:"Integrations"},
    {id:"security",label:"Security"},
    {id:"maintenance",label:"Maintenance"},
  ];

  const selStyle={width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"10px 13px",color:t.text,fontSize:13,fontFamily:B,outline:"none",boxSizing:"border-box"};

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text}}>Settings</div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Btn onClick={saveSettings}>Save Changes</Btn>
          {saved&&<span style={{fontSize:13,color:t.green,fontWeight:600}}>✓ Saved</span>}
        </div>
      </div>

      {/* Tab strip */}
      <div style={{display:"flex",gap:4,marginBottom:20,overflowX:"auto",paddingBottom:2,borderBottom:`1px solid ${t.border}`}}>
        {TABS.map(tb=>(
          <button key={tb.id} onClick={()=>setActiveTab(tb.id)} style={{background:"none",border:"none",borderBottom:`2px solid ${activeTab===tb.id?t.accent:"transparent"}`,color:activeTab===tb.id?t.accent:t.sub,padding:"8px 14px",cursor:"pointer",fontSize:13,fontWeight:activeTab===tb.id?700:500,fontFamily:B,whiteSpace:"nowrap",transition:"color .2s",marginBottom:-1}}>{tb.label}</button>
        ))}
      </div>

      <Card style={{padding:"24px"}}>
        {activeTab==="site"&&(
          <div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text,marginBottom:20}}>Site Configuration</div>
            <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr":"1fr 1fr",gap:16,marginBottom:16}}>
              <div>
                <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:700}}>Coming Soon Mode</label>
                <select value={String(settings.coming_soon)} onChange={e=>set("coming_soon",e.target.value==="true")} style={selStyle}>
                  <option value="true">ON — Show coming soon page</option>
                  <option value="false">OFF — Show live site</option>
                </select>
              </div>
              <Inp label="Launch Date" value={settings.launch_date||""} onChange={v=>set("launch_date",v)} type="date"/>
              <Inp label="Site Name" value={settings.site_name||""} onChange={v=>set("site_name",v)}/>
              <Inp label="Contact Email" value={settings.contact_email||""} onChange={v=>set("contact_email",v)} type="email"/>
              <div>
                <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:700}}>Eskom Stage</label>
                <select value={settings.eskom_stage||"0"} onChange={e=>set("eskom_stage",e.target.value)} style={selStyle}>
                  {["0","1","2","3","4","5","6"].map(s=><option key={s} value={s}>Stage {s}{s==="0"?" (No Load Shedding)":""}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab==="coming_soon"&&(
          <div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text,marginBottom:20}}>Coming Soon Page</div>
            <Inp label="Headline" value={settings.cs_headline||""} onChange={v=>set("cs_headline",v)}/>
            <Inp label="Subheading (accent line)" value={settings.cs_sub||""} onChange={v=>set("cs_sub",v)}/>
            <Inp label="Body Text" value={settings.cs_body||""} onChange={v=>set("cs_body",v)} rows={3}/>
            <Inp label="CTA Button Text" value={settings.cs_cta||""} onChange={v=>set("cs_cta",v)}/>
            <div style={{marginTop:8}}>
              <div style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:8,fontWeight:700}}>Hero Icon</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {["☀️","⚡","🔋","🌞","🏠"].map(e=>(
                  <button key={e} onClick={()=>set("cs_icon",e)} style={{width:44,height:44,fontSize:22,borderRadius:10,border:`2px solid ${settings.cs_icon===e?t.accent:t.border}`,background:settings.cs_icon===e?`rgba(${t.rgb},.1)`:t.card,cursor:"pointer"}}>{e}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab==="ticker"&&(
          <div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text,marginBottom:16}}>Ticker Bar</div>
            <div style={{fontSize:12,color:t.sub,marginBottom:14}}>The scrolling news bar at the top of the main site</div>
            <Toggle value={settings.ticker_enabled} onChange={v=>set("ticker_enabled",v)} label="Ticker bar enabled" color={t.green}/>
            <div style={{borderTop:`1px solid ${t.border}`,marginTop:12,paddingTop:16}}>
              <div style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:12,fontWeight:700}}>Messages ({settings.ticker_messages.length})</div>
              {settings.ticker_messages.map((msg,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
                  <input value={msg} onChange={e=>{const arr=[...settings.ticker_messages];arr[i]=e.target.value;set("ticker_messages",arr);}}
                    style={{flex:1,background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:8,padding:"8px 12px",color:t.text,fontSize:13,fontFamily:B,outline:"none"}}/>
                  <button onClick={()=>set("ticker_messages",settings.ticker_messages.filter((_,j)=>j!==i))}
                    style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",borderRadius:7,padding:"7px",cursor:"pointer"}}>
                    <Ic.X s={12} c={t.red}/>
                  </button>
                </div>
              ))}
              <Btn sm variant="ghost" onClick={()=>set("ticker_messages",[...settings.ticker_messages,"✨ New ticker message"])}>
                <Ic.Plus s={12}/> Add Message
              </Btn>
            </div>
          </div>
        )}

        {activeTab==="seo"&&(
          <div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text,marginBottom:20}}>SEO Settings</div>
            <Inp label="Meta Title" value={settings.seo_title} onChange={v=>set("seo_title",v)}/>
            <Inp label="Meta Description" value={settings.seo_description} onChange={v=>set("seo_description",v)} rows={3}/>
            <Inp label="OG Image URL" value={settings.og_image} onChange={v=>set("og_image",v)} placeholder="https://..."/>
            <Inp label="Google Analytics ID" value={settings.analytics_ga} onChange={v=>set("analytics_ga",v)} placeholder="G-XXXXXXXXXX"/>
            <Inp label="Hotjar ID" value={settings.analytics_hotjar} onChange={v=>set("analytics_hotjar",v)} placeholder="12345678"/>
            <div style={{marginTop:8,padding:"12px 14px",background:t.card,border:`1px solid ${t.border}`,borderRadius:9}}>
              <div style={{fontSize:11,color:t.sub,marginBottom:6}}>🔍 Search Preview</div>
              <div style={{fontSize:13,color:t.blue}}>{settings.seo_title||"SolarIQ"}</div>
              <div style={{fontSize:11,color:t.sub,lineHeight:1.6,marginTop:3}}>{(settings.seo_description||"").slice(0,160)}</div>
            </div>
          </div>
        )}

        {activeTab==="integrations"&&(
          <div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text,marginBottom:20}}>Integrations</div>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {[
                {name:"WhatsApp Business API",icon:"📱",field:"whatsapp_number",label:"WhatsApp Number",type:"tel",desc:"Send automated lead follow-ups and installer notifications via WhatsApp."},
                {name:"SendGrid / Email",icon:"📧",field:"email_sender",label:"From Email",type:"email",desc:"Transactional emails for leads, subscribers and system notifications."},
                {name:"Google Analytics 4",icon:"📊",field:"analytics_ga",label:"GA4 Measurement ID",type:"text",desc:"Detailed user behaviour and traffic analytics."},
                {name:"Google Maps API",icon:"🗺️",field:"maps_key",label:"API Key",type:"text",desc:"Display installer locations on an interactive map."},
                {name:"Peach Payments / PayFast",icon:"💳",field:"payment_key",label:"API Key",type:"text",desc:"Accept payments for premium installer listings."},
                {name:"Make.com (Automation)",icon:"🔗",field:"make_webhook",label:"Webhook URL",type:"url",desc:"Connect to 1000+ apps for automated workflows."},
                {name:"Firebase Push Notifications",icon:"🔔",field:"firebase_key",label:"Server Key",type:"text",desc:"Send push notifications to mobile users."},
              ].map(int=>(
                <div key={int.name} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:12,padding:"16px 18px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                    <div style={{width:38,height:38,borderRadius:10,background:`rgba(${t.rgb},.08)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{int.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:t.text}}>{int.name}</div>
                      <div style={{fontSize:11,color:t.sub,marginTop:2}}>{int.desc}</div>
                    </div>
                    <Badge color={settings[int.field]?t.green:t.sub}>{settings[int.field]?"Connected":"Not connected"}</Badge>
                  </div>
                  <Inp label={int.label} value={settings[int.field]||""} onChange={v=>set(int.field,v)} type={int.type||"text"} placeholder="Enter here..."/>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==="security"&&(
          <div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text,marginBottom:20}}>Security</div>
            <Toggle value={settings.two_fa} onChange={v=>set("two_fa",v)} label="Two-factor authentication" color={t.green}/>
            <div style={{borderTop:`1px solid ${t.border}`,margin:"14px 0"}}/>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:700}}>Session Timeout</label>
              <select value={settings.session_timeout} onChange={e=>set("session_timeout",e.target.value)} style={selStyle}>
                {["1h","4h","12h","24h","7d","30d"].map(o=><option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <Inp label="Allowed IP Addresses (optional)" value={settings.allowed_ips} onChange={v=>set("allowed_ips",v)} placeholder="Comma separated IPs, leave blank for any" hint="Restrict admin access to specific IPs"/>
            <div style={{marginTop:14,padding:"14px 16px",background:"rgba(74,222,128,.05)",border:"1px solid rgba(74,222,128,.15)",borderRadius:10}}>
              <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:t.green,marginBottom:8}}>🛡️ Recent Admin Activity</div>
              {[["Login","Tebello","Just now"],["Settings saved","Tebello","10 min ago"],["Installer approved","Tebello","1 hr ago"]].map(([action,who,when])=>(
                <div key={action} style={{display:"flex",gap:8,fontSize:11,color:t.sub,marginBottom:5}}>
                  <span style={{color:t.green}}>●</span><span>{who}</span>·<span>{action}</span>·<span>{when}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==="maintenance"&&(
          <div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:t.text,marginBottom:20}}>Maintenance & Special Pages</div>
            <Toggle value={settings.maintenance_mode} onChange={v=>{
              if(v&&!confirm("⚠️ This will take the live site offline for visitors. Continue?"))return;
              set("maintenance_mode",v);
            }} label="🔧 Maintenance Mode" color={t.red}/>
            <Inp label="Maintenance Message" value={settings.maintenance_message} onChange={v=>set("maintenance_message",v)} rows={2}/>
            <div style={{borderTop:`1px solid ${t.border}`,margin:"16px 0"}}/>
            <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:t.text,marginBottom:12}}>Special Pages</div>
            <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr":"1fr 1fr",gap:10}}>
              {[{name:"Coming Soon",icon:"🚀",desc:"Countdown page before launch",active:settings.coming_soon},{name:"Maintenance",icon:"🔧",desc:"Offline message for updates",active:settings.maintenance_mode},{name:"404 Page",icon:"🔍",desc:"Custom not found page",active:true},{name:"Press / Media Page",icon:"📰",desc:"For journalists and brands",active:false},{name:"Partnership Page",icon:"🤝",desc:"For business inquiries",active:false},{name:"API Status Page",icon:"💻",desc:"Public system status",active:false}].map(p=>(
                <div key={p.name} style={{background:t.card,border:`1px solid ${p.active?`rgba(${t.rgb},.25)`:t.border}`,borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:20}}>{p.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:t.text,fontFamily:H}}>{p.name}</div>
                    <div style={{fontSize:11,color:t.sub}}>{p.desc}</div>
                  </div>
                  <Badge color={p.active?t.green:t.sub}>{p.active?"Active":"Off"}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────
const NAV_ITEMS=[
  {id:"dashboard",label:"Dashboard",Icon:Ic.Grid},
  {id:"installers",label:"Installers",Icon:Ic.Install},
  {id:"leads",label:"Leads",Icon:Ic.Clip},
  {id:"blog",label:"Blog",Icon:Ic.Doc},
  {id:"messages",label:"Messages",Icon:Ic.Mail},
  {id:"analytics",label:"Analytics",Icon:Ic.Chart},
  {id:"subscribers",label:"Subscribers",Icon: ({s,c})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>},
  {id:"users",label:"Team",Icon:Ic.Users},
  {id:"settings",label:"Settings",Icon:Ic.Cog},
];
const MOBILE_NAV=[
  {id:"dashboard",label:"Home",Icon:Ic.Grid},
  {id:"installers",label:"Installers",Icon:Ic.Install},
  {id:"leads",label:"Leads",Icon:Ic.Clip},
  {id:"messages",label:"Messages",Icon:Ic.Mail},
  {id:"more",label:"More",Icon:Ic.More},
];

function Sidebar({tab,setTab,collapsed,setCollapsed,onSignOut,pending,unreadMsgs,isDark,setIsDark}){
  const t=_globalTheme;
  const W=collapsed?t.navWc:t.navW;
  return(
    <div style={{width:W,background:t.nav,borderRight:`1px solid ${t.border}`,display:"flex",flexDirection:"column",position:"fixed",top:0,bottom:0,left:0,zIndex:300,transition:"width .25s cubic-bezier(.4,0,.2,1)",overflow:"hidden"}}>
      {/* Logo */}
      <div style={{padding:"14px 12px",borderBottom:`1px solid ${t.border}`,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:9,overflow:"hidden"}}>
          <div style={{width:32,height:32,background:`linear-gradient(135deg,${t.accent},${t.accent2})`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0,boxShadow:`0 0 20px rgba(${t.rgb},.35)`}}>☀️</div>
          {!collapsed&&<div>
            <div style={{fontFamily:H,fontSize:16,fontWeight:900,color:t.text,whiteSpace:"nowrap"}}>Solar<span style={{color:t.accent}}>IQ</span></div>
            <div style={{fontSize:9,color:t.sub,letterSpacing:2,textTransform:"uppercase"}}>Admin</div>
          </div>}
        </div>
        {!collapsed&&<button onClick={()=>setCollapsed(true)} style={{background:"none",border:"none",cursor:"pointer",padding:4,color:t.sub,flexShrink:0}}><Ic.Left s={14} c={t.sub}/></button>}
      </div>

      {/* Nav */}
      <nav style={{flex:1,padding:"8px 6px",overflowY:"auto",overflowX:"hidden"}}>
        {NAV_ITEMS.map(n=>{
          const active=tab===n.id;
          const badge=n.id==="installers"&&pending>0?pending:n.id==="messages"&&unreadMsgs>0?unreadMsgs:0;
          return(
            <button key={n.id} onClick={()=>setTab(n.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:collapsed?"10px 0":"9px 11px",justifyContent:collapsed?"center":"flex-start",borderRadius:9,border:"none",marginBottom:2,background:active?`rgba(${t.rgb},.1)`:"transparent",borderLeft:!collapsed&&active?`2px solid ${t.accent}`:"2px solid transparent",color:active?t.accent:t.sub,cursor:"pointer",transition:"all .18s",fontFamily:B,position:"relative"}}>
              <n.Icon s={16} c={active?t.accent:t.sub}/>
              {!collapsed&&<span style={{fontSize:13,fontWeight:active?700:500,flex:1,textAlign:"left",whiteSpace:"nowrap"}}>{n.label}</span>}
              {badge>0&&<span style={{background:active?t.accent:"rgba(239,68,68,.8)",color:"#000",borderRadius:"50%",width:17,height:17,fontSize:10,display:"inline-flex",alignItems:"center",justifyContent:"center",fontWeight:900,flexShrink:0}}>{badge}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{padding:"10px 8px",borderTop:`1px solid ${t.border}`,flexShrink:0}}>
        {!collapsed&&(
          <div style={{display:"flex",alignItems:"center",gap:9,padding:"8px 10px",marginBottom:6,borderRadius:10,background:t.card,border:`1px solid ${t.border}`}}>
            <div style={{width:28,height:28,borderRadius:8,background:`linear-gradient(135deg,${t.accent},${t.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:H,fontSize:12,fontWeight:900,color:t.dark?"#000":"#fff",flexShrink:0}}>T</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:700,color:t.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>Tebello</div>
              <div style={{fontSize:10,color:t.sub}}>Super Admin</div>
            </div>
          </div>
        )}
        <div style={{display:"flex",gap:4,justifyContent:collapsed?"center":"flex-start"}}>
          <button onClick={()=>setIsDark(!isDark)} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:8,padding:"7px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {isDark?<Ic.Sun s={14} c={t.sub}/>:<Ic.Moon s={14} c={t.sub}/>}
          </button>
          {!collapsed&&<button onClick={onSignOut} style={{flex:1,background:t.card,border:`1px solid ${t.border}`,borderRadius:8,padding:"7px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,color:t.sub,fontSize:12,fontFamily:B}}>
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

function MobileTopBar({tab,onSignOut,pending,onNotif,notifCount,isDark,setIsDark}){
  const t=_globalTheme;
  const pageLabel={dashboard:"Dashboard",installers:"Installers",leads:"Leads",blog:"Blog",messages:"Messages",analytics:"Analytics",subscribers:"Subscribers",users:"Team",settings:"Settings",more:"More"};
  return(
    <div style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:t.nav,borderBottom:`1px solid ${t.border}`,backdropFilter:"blur(20px)",height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
      <div style={{display:"flex",alignItems:"center",gap:7}}>
        <div style={{width:26,height:26,background:`linear-gradient(135deg,${t.accent},${t.accent2})`,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>☀️</div>
        <span style={{fontFamily:H,fontSize:16,fontWeight:900,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></span>
      </div>
      <span style={{flex:1,fontSize:14,fontWeight:700,color:t.text,fontFamily:H}}>{pageLabel[tab]||""}</span>
      <button onClick={()=>setIsDark(!isDark)} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:7,padding:"6px",cursor:"pointer",display:"flex",alignItems:"center"}}>
        {isDark?<Ic.Sun s={14} c={t.sub}/>:<Ic.Moon s={14} c={t.sub}/>}
      </button>
      <button onClick={onNotif} style={{position:"relative",background:t.card,border:`1px solid ${t.border}`,borderRadius:7,padding:"6px",cursor:"pointer",display:"flex",alignItems:"center"}}>
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
      {MOBILE_NAV.map(x=>(
        <button key={x.id} onClick={()=>setTab(x.id)} style={{flex:1,background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 4px",cursor:"pointer",gap:3,position:"relative"}}>
          <x.Icon s={18} c={tab===x.id?t.accent:t.sub}/>
          <span style={{fontSize:9,fontWeight:600,color:tab===x.id?t.accent:t.sub,fontFamily:B}}>{x.label}</span>
          {x.id==="installers"&&pending>0&&<span style={{position:"absolute",top:5,right:"50%",marginRight:-14,width:14,height:14,background:t.red,borderRadius:"50%",fontSize:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900}}>{pending}</span>}
        </button>
      ))}
    </div>
  );
}

// ─── LOGIN ───────────────────────────────────────────────────
function Login({onLogin}){
  const sc=useScreen();
  const t=_globalTheme;
  const [email,setEmail]=useState("");
  const [pw,setPw]=useState("");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);

  const login=async()=>{
    if(!email||!pw){setErr("Please enter your email and password.");return;}
    setLoading(true);setErr("");
    const {error}=await sb.auth.signInWithPassword({email,password:pw});
    if(error)setErr(error.message);
    else onLogin();
    setLoading(false);
  };

  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20,position:"relative",overflow:"hidden",background:t.bg}}>
      <div style={{position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)",width:"60vw",height:"40vh",background:`radial-gradient(ellipse,rgba(${t.rgb},.1),transparent 70%)`,pointerEvents:"none",animation:"breathe 7s ease infinite"}}/>
      <div style={{position:"absolute",bottom:0,right:"10%",width:"30vw",height:"30vh",background:`radial-gradient(ellipse,rgba(255,107,0,.07),transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{width:"100%",maxWidth:440,position:"relative",zIndex:1,animation:"fadeUp .5s ease"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{width:60,height:60,background:`linear-gradient(135deg,${t.accent},${t.accent2})`,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 16px",boxShadow:`0 0 50px rgba(${t.rgb},.35)`,animation:"float 3s ease infinite"}}>☀️</div>
          <div style={{fontFamily:H,fontSize:32,fontWeight:900,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></div>
          <div style={{fontSize:11,color:t.sub,marginTop:4,letterSpacing:3,textTransform:"uppercase"}}>Admin Portal</div>
        </div>
        <div style={{background:t.dark?"rgba(255,255,255,.03)":"rgba(0,0,0,.04)",border:`1px solid ${t.border}`,borderRadius:20,padding:36,backdropFilter:"blur(20px)"}}>
          <div style={{marginBottom:18}}>
            <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:7,fontWeight:700}}>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="mail4tebello@gmail.com"
              style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:11,padding:"13px 15px",color:t.text,fontSize:14,fontFamily:B,outline:"none",boxSizing:"border-box"}}/>
          </div>
          <div style={{marginBottom:err?16:26}}>
            <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:7,fontWeight:700}}>Password</label>
            <input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="••••••••••"
              style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:11,padding:"13px 15px",color:t.text,fontSize:14,fontFamily:B,outline:"none",boxSizing:"border-box"}}/>
          </div>
          {err&&<div style={{fontSize:12,color:t.red,marginBottom:16,display:"flex",alignItems:"center",gap:6}}><Ic.X c={t.red}/>{err}</div>}
          <button onClick={login} disabled={loading} style={{width:"100%",background:`linear-gradient(135deg,${t.accent},${t.accent2})`,border:"none",borderRadius:11,padding:"14px",fontSize:14,fontWeight:800,color:t.dark?"#000":"#fff",cursor:loading?"not-allowed":"pointer",opacity:loading?.7:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:H}}>
            {loading?<><Spinner s={18} c={t.dark?"#000":"#fff"}/> Signing in...</>:"Sign in to Admin →"}
          </button>
        </div>
        <div style={{textAlign:"center",marginTop:20,fontSize:11,color:t.sub}}>🔒 Secured by Supabase Auth · SolarIQ Admin</div>
      </div>
    </div>
  );
}

// ─── CSS ─────────────────────────────────────────────────────
const getCSS=(t)=>`
  @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{width:100%;min-height:100vh;background:${t.bg};color:${t.text};font-family:${B};overflow-x:hidden}
  ::-webkit-scrollbar{width:3px;height:3px}
  ::-webkit-scrollbar-thumb{background:rgba(${t.rgb},.4);border-radius:4px}
  input,textarea,select{outline:none;font-family:${B}}
  input::placeholder,textarea::placeholder{color:${t.sub}}
  select option{background:${t.dark?"#111":"#f0ede3"};color:${t.text}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
  @keyframes breathe{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
  input:focus,textarea:focus,select:focus{border-color:rgba(${t.rgb},.5)!important}
`;

// ─── MAIN APP ────────────────────────────────────────────────
export default function Admin(){
  const [session,setSession]=useState(null);
  const [loading,setLoading]=useState(true);
  const [tab,setTab]=useState("dashboard");
  const [collapsed,setCollapsed]=useState(false);
  const [isDark,setIsDark]=useState(true);
  const [showNotif,setShowNotif]=useState(false);
  const [search,setSearch]=useState("");
  const [stats,setStats]=useState({installers:0,leads:0,subscribers:0,posts:6,pending:0,events:4847});
  const [statsLoading,setStatsLoading]=useState(true);
  const sc=useScreen();

  _globalTheme=isDark?DARK:LIGHT;
  const t=_globalTheme;

  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}})=>{setSession(session);setLoading(false);});
    const {data:{subscription}}=sb.auth.onAuthStateChange((_,s)=>setSession(s));
    return ()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    if(!session)return;
    const load=async()=>{
      setStatsLoading(true);
      try{
        const [inst,leads,subs,posts,pending]=await Promise.all([
          sb.from("installers").select("id",{count:"exact",head:true}).eq("status","approved"),
          sb.from("leads").select("id",{count:"exact",head:true}),
          sb.from("subscribers").select("id",{count:"exact",head:true}),
          sb.from("posts").select("id",{count:"exact",head:true}).eq("published",true),
          sb.from("installers").select("id",{count:"exact",head:true}).eq("status","pending"),
        ]);
        setStats({
          installers:(inst.count||0)+SEED_INSTALLERS.filter(i=>i.type==="installer"&&i.status==="approved").length,
          leads:leads.count||0,
          subscribers:subs.count||0,
          posts:(posts.count||0)+SEED_ARTICLES.length,
          pending:pending.count||0,
          events:4847,
        });
      }catch(e){console.log(e);}
      setStatsLoading(false);
    };
    load();
  },[session]);

  const signOut=async()=>{await sb.auth.signOut();setSession(null);};
  const sidebarW=sc.isMobile?0:(collapsed?t.navWc:t.navW);
  const unreadMsgs=MOCK_MSGS.filter(m=>m.unread).length;

  const PAGES={
    dashboard:<Dashboard stats={stats} loading={statsLoading}/>,
    installers:<InstallersPage/>,
    leads:<LeadsPage/>,
    blog:<BlogPage/>,
    messages:<MessagesPage/>,
    analytics:<AnalyticsPage/>,
    subscribers:<SubscribersPage/>,
    users:<UsersPage/>,
    settings:<SettingsPage/>,
    more:<MorePage setTab={setTab}/>,
  };

  if(loading)return(<><style>{getCSS(t)}</style><div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12,background:t.bg}}><Spinner/><div style={{fontSize:13,color:t.sub}}>Loading SolarIQ Admin...</div></div></>);
  if(!session)return(<><style>{getCSS(t)}</style><Login onLogin={()=>sb.auth.getSession().then(({data:{session}})=>setSession(session))}/></>);

  return(
    <>
      <style>{getCSS(t)}</style>
      <div style={{display:"flex",minHeight:"100vh",background:t.bg,transition:"background .3s,color .3s"}}>
        {!sc.isMobile&&<Sidebar tab={tab} setTab={setTab} collapsed={collapsed} setCollapsed={setCollapsed} onSignOut={signOut} pending={stats.pending} unreadMsgs={unreadMsgs} isDark={isDark} setIsDark={setIsDark}/>}
        {sc.isMobile&&<MobileTopBar tab={tab} onSignOut={signOut} pending={stats.pending} onNotif={()=>setShowNotif(n=>!n)} notifCount={0} isDark={isDark} setIsDark={setIsDark}/>}

        <div style={{flex:1,marginLeft:sc.isMobile?0:sidebarW,transition:"margin-left .25s cubic-bezier(.4,0,.2,1)",paddingTop:sc.isMobile?54:0,paddingBottom:sc.isMobile?80:0,minWidth:0,minHeight:"100vh"}}>
          {/* Desktop top bar */}
          {!sc.isMobile&&(
            <div style={{position:"sticky",top:0,zIndex:100,background:t.nav,borderBottom:`1px solid ${t.border}`,backdropFilter:"blur(20px)",padding:"0 32px",height:52,display:"flex",alignItems:"center",gap:10}}>
              {/* Search center */}
              <div style={{flex:1,display:"flex",justifyContent:"center"}}>
                <div style={{position:"relative",width:"100%",maxWidth:380}}>
                  <div style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)"}}><Ic.Search s={13} c={t.sub}/></div>
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search anything..."
                    style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"7px 12px 7px 32px",color:t.text,fontSize:13,fontFamily:B,outline:"none",boxSizing:"border-box"}}/>
                </div>
              </div>
              {/* Right actions */}
              <button onClick={()=>setShowNotif(n=>!n)} style={{position:"relative",background:t.card,border:`1px solid ${t.border}`,borderRadius:8,padding:"6px 10px",cursor:"pointer",display:"flex",alignItems:"center"}}>
                <Ic.Bell s={15} c={t.sub}/>
                {unreadMsgs>0&&<span style={{position:"absolute",top:4,right:4,width:7,height:7,background:t.red,borderRadius:"50%"}}/>}
              </button>
              <a href={`${window.location.origin}?preview=solariq2026`} target="_blank" rel="noopener noreferrer"
                style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:8,textDecoration:"none",background:`rgba(${t.rgb},.1)`,border:`1px solid rgba(${t.rgb},.25)`}}>
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
      </div>
    </>
  );
}

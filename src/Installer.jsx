import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://intvnxvannltfibguykw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHZueHZhbm5sdGZpYmd1eWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzAwNjgsImV4cCI6MjA5MDA0NjA2OH0.KnPP0-vxXyBYTvHxbXfrH8AKd61u1hWpEO2gpjWnzNE";
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const T = {
  bg:"#060810", bg2:"#0a0d16", bg3:"#0f1320",
  card:"rgba(255,255,255,.038)", card2:"rgba(255,255,255,.06)", card3:"rgba(255,255,255,.09)",
  border:"rgba(255,255,255,.07)", borderHi:"rgba(255,255,255,.15)",
  accent:"#f5a623", accent2:"#ff6b00", accentDim:"rgba(245,166,35,.12)", rgb:"245,166,35",
  text:"#eef0f5", textMid:"#9ba3b8", sub:"#4a5068",
  green:"#34d399", red:"#f87171", blue:"#60a5fa", purple:"#a78bfa", cyan:"#22d3ee", orange:"#fb923c",
  nav:"rgba(6,8,16,.97)", inputBg:"rgba(255,255,255,.04)", navW:260,
};
const H = "'Lexend',sans-serif";
const B = "'Plus Jakarta Sans',sans-serif";

function useScreen() {
  const [w,setW]=useState(window.innerWidth);
  useEffect(()=>{ const fn=()=>setW(window.innerWidth); window.addEventListener("resize",fn); return ()=>window.removeEventListener("resize",fn); },[]);
  return {w,isMobile:w<768,isTablet:w>=768&&w<1100,isDesktop:w>=1100};
}

const CSS=`
  @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{width:100%;min-height:100vh;background:${T.bg};color:${T.text};font-family:${B};overflow-x:hidden}
  ::-webkit-scrollbar{width:3px;height:3px}
  ::-webkit-scrollbar-thumb{background:rgba(${T.rgb},.35);border-radius:4px}
  input,textarea,select{outline:none;font-family:${B}}
  input::placeholder,textarea::placeholder{color:${T.sub}}
  select option{background:#0f1320;color:${T.text}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
  @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(${T.rgb},.2)}50%{box-shadow:0 0 40px rgba(${T.rgb},.5)}}
  @keyframes slideIn{from{transform:translateX(-8px);opacity:0}to{transform:translateX(0);opacity:1}}
  @keyframes breathe{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.06);opacity:1}}
  input:focus,textarea:focus,select:focus{border-color:rgba(${T.rgb},.5)!important}
`;

// ─── ICONS (all SVG, no emoji) ───────────────────────────────
const Ic = {
  Logo:    ({s=32})=><svg width={s} height={s} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="7" fill="#f5a623"/><line x1="16" y1="2" x2="16" y2="6" stroke="#f5a623" strokeWidth="2.2" strokeLinecap="round"/><line x1="16" y1="26" x2="16" y2="30" stroke="#f5a623" strokeWidth="2.2" strokeLinecap="round"/><line x1="2" y1="16" x2="6" y2="16" stroke="#f5a623" strokeWidth="2.2" strokeLinecap="round"/><line x1="26" y1="16" x2="30" y2="16" stroke="#f5a623" strokeWidth="2.2" strokeLinecap="round"/><line x1="5.5" y1="5.5" x2="8.4" y2="8.4" stroke="#f5a623" strokeWidth="2.2" strokeLinecap="round"/><line x1="23.6" y1="23.6" x2="26.5" y2="26.5" stroke="#f5a623" strokeWidth="2.2" strokeLinecap="round"/><line x1="26.5" y1="5.5" x2="23.6" y2="8.4" stroke="#f5a623" strokeWidth="2.2" strokeLinecap="round"/><line x1="8.4" y1="23.6" x2="5.5" y2="26.5" stroke="#f5a623" strokeWidth="2.2" strokeLinecap="round"/></svg>,
  Inbox:   ({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
  Shield:  ({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  User:    ({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  FileText:({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Chart:   ({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  Receipt: ({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 4 6 20 12 17 18 20 18 4"/><line x1="6" y1="9" x2="18" y2="9"/><line x1="6" y1="13" x2="12" y2="13"/></svg>,
  Check:   ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  X:       ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Upload:  ({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
  Bell:    ({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Out:     ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Clock:   ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Phone:   ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Star:    ({s=13,c="currentColor",fill="none"})=><svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Right:   ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Left:    ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Plus:    ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Eye:     ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff:  ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Send:    ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Zap:     ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Trophy:  ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M7 4H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3"/><path d="M17 4h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3"/><rect x="7" y="2" width="10" height="12" rx="2"/></svg>,
  Tool:    ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Camera:  ({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Lock:    ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Mail:    ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Map:     ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  Grid:    ({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
  Trash:   ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Refresh: ({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
};

// ─── PRIMITIVES ──────────────────────────────────────────────
function Spinner({s=20,c=T.accent}){
  return <div style={{width:s,height:s,border:`2px solid ${c}28`,borderTopColor:c,borderRadius:"50%",animation:"spin .7s linear infinite"}}/>;
}
function Btn({children,onClick,variant="primary",sm,disabled,full,style={},loading}){
  const V={
    primary:{bg:`linear-gradient(135deg,${T.accent},${T.accent2})`,col:"#000",bdr:"none",sh:`0 4px 20px rgba(${T.rgb},.28)`},
    ghost:{bg:T.card,col:T.textMid,bdr:`1px solid ${T.border}`,sh:"none"},
    danger:{bg:"rgba(248,113,113,.08)",col:T.red,bdr:"1px solid rgba(248,113,113,.2)",sh:"none"},
    success:{bg:"rgba(52,211,153,.08)",col:T.green,bdr:"1px solid rgba(52,211,153,.2)",sh:"none"},
    accent:{bg:T.accentDim,col:T.accent,bdr:`1px solid rgba(${T.rgb},.25)`,sh:"none"},
  };
  const v=V[variant]||V.primary;
  return <button onClick={onClick} disabled={disabled||loading} style={{background:v.bg,color:v.col,border:v.bdr,borderRadius:sm?8:10,padding:sm?"6px 14px":"10px 20px",fontSize:sm?12:13,fontWeight:700,cursor:(disabled||loading)?"not-allowed":"pointer",opacity:disabled?.45:1,width:full?"100%":"auto",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,transition:"all .18s",whiteSpace:"nowrap",fontFamily:B,boxShadow:v.sh,...style}}>
    {loading?<Spinner s={14} c={v.col}/>:children}
  </button>;
}
function Card({children,style={},onClick}){
  const [h,setH]=useState(false);
  return <div onClick={onClick} onMouseEnter={()=>onClick&&setH(true)} onMouseLeave={()=>setH(false)} style={{background:T.card,border:`1px solid ${h?T.borderHi:T.border}`,borderRadius:16,transition:"all .2s",transform:h&&onClick?"translateY(-2px)":"none",cursor:onClick?"pointer":"default",...style}}>{children}</div>;
}
function Badge({children,color,dot}){
  const c=color||T.accent;
  return <span style={{fontSize:10,fontWeight:700,background:`${c}18`,color:c,padding:"2px 9px",borderRadius:20,letterSpacing:.5,whiteSpace:"nowrap",display:"inline-flex",alignItems:"center",gap:4}}>
    {dot&&<span style={{width:5,height:5,borderRadius:"50%",background:c,animation:"pulse 2s infinite",flexShrink:0}}/>}{children}
  </span>;
}
function Inp({label,value,onChange,type="text",placeholder,rows,hint,required}){
  return <div style={{marginBottom:14}}>
    {label&&<label style={{fontSize:11,color:T.sub,textTransform:"uppercase",letterSpacing:1.5,display:"flex",alignItems:"center",gap:4,marginBottom:6,fontWeight:700}}>{label}{required&&<span style={{color:T.accent}}>*</span>}</label>}
    {hint&&<div style={{fontSize:11,color:T.sub,marginBottom:6,lineHeight:1.5}}>{hint}</div>}
    {rows?<textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{width:"100%",background:T.inputBg,border:`1px solid ${T.border}`,borderRadius:10,padding:"11px 14px",color:T.text,fontSize:13,fontFamily:B,resize:"vertical",boxSizing:"border-box",lineHeight:1.6}}/>
    :<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{width:"100%",background:T.inputBg,border:`1px solid ${T.border}`,borderRadius:10,padding:"11px 14px",color:T.text,fontSize:13,fontFamily:B,boxSizing:"border-box"}}/>}
  </div>;
}
function Toggle({value,onChange,label}){
  return <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0"}}>
    {label&&<span style={{fontSize:13,color:T.textMid,fontFamily:B}}>{label}</span>}
    <div onClick={()=>onChange(!value)} style={{width:44,height:25,borderRadius:13,background:value?`linear-gradient(90deg,${T.accent},${T.accent2})`:T.card,border:`1px solid ${value?T.accent:T.border}`,cursor:"pointer",position:"relative",transition:"all .25s",flexShrink:0,boxShadow:value?`0 0 12px rgba(${T.rgb},.3)`:"none"}}>
      <div style={{position:"absolute",top:2,left:value?21:2,width:19,height:19,borderRadius:"50%",background:value?"#000":T.sub,transition:"left .25s",boxShadow:"0 1px 4px rgba(0,0,0,.4)"}}/>
    </div>
  </div>;
}
function SelField({label,value,onChange,options,required}){
  return <div style={{marginBottom:14}}>
    {label&&<label style={{fontSize:11,color:T.sub,textTransform:"uppercase",letterSpacing:1.5,display:"flex",alignItems:"center",gap:4,marginBottom:6,fontWeight:700}}>{label}{required&&<span style={{color:T.accent}}>*</span>}</label>}
    <select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",background:T.inputBg,border:`1px solid ${T.border}`,borderRadius:10,padding:"11px 14px",color:T.text,fontSize:13,fontFamily:B,boxSizing:"border-box"}}>
      {options.map(o=>Array.isArray(o)?<option key={o[0]} value={o[0]}>{o[1]}</option>:<option key={o}>{o}</option>)}
    </select>
  </div>;
}

// ─── CONSTANTS ───────────────────────────────────────────────
const SA_PROVINCES=["Gauteng","Western Cape","KwaZulu-Natal","Eastern Cape","Free State","Mpumalanga","Limpopo","North West","Northern Cape"];
const BRANDS_LIST=["Sunsynk","Deye","Victron","Growatt","Pylontech","BSL","Freedom Won","Canadian Solar","JA Solar","Longi","Huawei","SolarEdge"];
const INSTALL_SPECS=["Residential","Commercial","Agricultural","Off-Grid","Hybrid","Industrial"];
const REPAIR_SPECS=["Inverter Repair","Battery Replacement","Panel Cleaning","Full System Service","Emergency Callouts","Fault Finding"];

const STATUS={
  new:{label:"New",color:T.accent,bg:`rgba(${T.rgb},.12)`},
  contacted:{label:"Contacted",color:T.blue,bg:"rgba(96,165,250,.12)"},
  site_visit:{label:"Site Visit",color:T.purple,bg:"rgba(167,139,250,.12)"},
  quote_sent:{label:"Quote Sent",color:T.orange,bg:"rgba(251,146,60,.12)"},
  converted:{label:"Converted",color:T.green,bg:"rgba(52,211,153,.12)"},
  lost:{label:"Lost",color:T.sub,bg:"rgba(74,80,104,.12)"},
};

function timeSince(d){
  const diff=Date.now()-new Date(d).getTime();
  const m=Math.floor(diff/60000);
  if(m<60)return `${m}m ago`;
  const h=Math.floor(m/60);
  if(h<24)return `${h}h ago`;
  return `${Math.floor(h/24)}d ago`;
}
function urgencyColor(d){
  const h=(Date.now()-new Date(d).getTime())/3600000;
  if(h>24)return T.red;
  if(h>4)return T.orange;
  return T.green;
}

const MOCK_LEADS=[
  {id:"1",name:"Sipho Dlamini",phone:"+27821112233",email:"sipho@gmail.com",area:"Sandton, Gauteng",system_kw:5,battery_kwh:10,panels:8,estimated_cost:95000,daily_kwh:18,monthly_bill:2500,goal:"Full Off-Grid",roof:"Tile / Double Storey",urgency:"Ready in 30 days",status:"new",created_at:new Date(Date.now()-1.5*3600000).toISOString(),notes:""},
  {id:"2",name:"Ayanda Khumalo",phone:"+27734456677",email:"ayanda@outlook.com",area:"Umhlanga, KZN",system_kw:3,battery_kwh:5,panels:6,estimated_cost:62000,daily_kwh:12,monthly_bill:1800,goal:"Load Shedding Backup",roof:"IBR / Single Storey",urgency:"Just researching",status:"contacted",created_at:new Date(Date.now()-6*3600000).toISOString(),notes:"Called, interested, awaiting site visit"},
  {id:"3",name:"Pieter van Zyl",phone:"+27617890011",email:"pieter@gmail.com",area:"Somerset West, WC",system_kw:8,battery_kwh:15,panels:12,estimated_cost:145000,daily_kwh:28,monthly_bill:4200,goal:"Mostly Off-Grid",roof:"Concrete Flat",urgency:"ASAP",status:"quote_sent",created_at:new Date(Date.now()-30*3600000).toISOString(),notes:"Sent quote via WhatsApp"},
  {id:"4",name:"Fatima Ismail",phone:"+27842234455",email:"fatima@co.za",area:"Johannesburg North",system_kw:12,battery_kwh:20,panels:18,estimated_cost:210000,daily_kwh:42,monthly_bill:6800,goal:"Full Independence",roof:"Tile / Double Storey",urgency:"Ready in 30 days",status:"site_visit",created_at:new Date(Date.now()-3*3600000).toISOString(),notes:""},
  {id:"5",name:"Thabo Mokoena",phone:"+27793345566",email:"thabo@gmail.com",area:"Pretoria East",system_kw:5,battery_kwh:10,panels:8,estimated_cost:88000,daily_kwh:17,monthly_bill:2200,goal:"Bill Savings",roof:"IBR / Single Storey",urgency:"Flexible",status:"converted",created_at:new Date(Date.now()-5*24*3600000).toISOString(),notes:"Closed R92k install."},
];

// ─── AUTH SCREEN ─────────────────────────────────────────────
function InstallerAuth({onAuth}){
  const sc=useScreen();
  const [mode,setMode]=useState("login");
  const [email,setEmail]=useState("");
  const [pw,setPw]=useState("");
  const [name,setName]=useState("");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(false);
  const [showPw,setShowPw]=useState(false);

  const submit=async()=>{
    if(!email.trim()||!pw.trim()){setErr("Email and password are required.");return;}
    setLoading(true);setErr("");
    if(mode==="signup"){
      if(pw.length<6){setErr("Password must be at least 6 characters.");setLoading(false);return;}
      const {error}=await sb.auth.signUp({email:email.trim(),password:pw,options:{data:{name}}});
      if(error)setErr(error.message);
      else setDone(true);
    } else {
      const {data,error}=await sb.auth.signInWithPassword({email:email.trim(),password:pw});
      if(error)setErr(error.message);
      else if(data.session)onAuth(data.session);
    }
    setLoading(false);
  };

  const FEATURES=[
    {Icon:Ic.Inbox,title:"Qualified Lead Inbox",desc:"Homeowners who've already calculated their system — with specs and budget attached"},
    {Icon:Ic.Receipt,title:"Quote Builder",desc:"Generate professional PDF quotes from lead data in under two minutes"},
    {Icon:Ic.Shield,title:"Credentials Vault",desc:"SESSA, Wireman's License and compliance documents in one verified place"},
    {Icon:Ic.Chart,title:"Performance Analytics",desc:"Conversion rates, response times and province rankings — live"},
    {Icon:Ic.Trophy,title:"SolarIQ Verified Badge",desc:"The badge SA homeowners trust. Earn it, keep it, rank higher"},
  ];

  const FormSection=(
    <div style={{width:"100%",maxWidth:440,animation:"fadeUp .5s ease"}}>
      {/* Brand */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:36}}>
        <Ic.Logo s={38}/>
        <div>
          <div style={{fontFamily:H,fontSize:20,fontWeight:900,color:T.text,letterSpacing:.5}}>Solar<span style={{color:T.accent}}>IQ</span></div>
          <div style={{fontSize:9,color:T.sub,letterSpacing:2.5,textTransform:"uppercase",marginTop:1}}>Installer Portal</div>
        </div>
      </div>

      {done?(
        <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:20,padding:36,textAlign:"center"}}>
          <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(52,211,153,.1)",border:"2px solid rgba(52,211,153,.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}>
            <Ic.Mail s={26} c={T.green}/>
          </div>
          <div style={{fontFamily:H,fontSize:20,fontWeight:800,color:T.green,marginBottom:10}}>Check your inbox</div>
          <div style={{fontSize:13,color:T.textMid,lineHeight:1.8,marginBottom:24}}>
            Confirmation link sent to<br/><strong style={{color:T.text}}>{email}</strong><br/>Click it, then sign in here.
          </div>
          <Btn full variant="accent" onClick={()=>{setMode("login");setDone(false);setPw("");}}>
            <Ic.Left s={13} c={T.accent}/> Back to Sign In
          </Btn>
        </div>
      ):(
        <>
          <div style={{marginBottom:28}}>
            <div style={{fontFamily:H,fontSize:sc.isMobile?24:30,fontWeight:900,color:T.text,marginBottom:6,lineHeight:1.1}}>
              {mode==="login"?"Welcome back":"Create your account"}
            </div>
            <div style={{fontSize:14,color:T.sub}}>
              {mode==="login"?"Access your installer dashboard":"Join SolarIQ — free for verified SA installers"}
            </div>
          </div>

          {/* Mode tabs */}
          <div style={{display:"flex",background:T.bg2,borderRadius:12,padding:4,marginBottom:28,border:`1px solid ${T.border}`}}>
            {[["login","Sign In"],["signup","Create Account"]].map(([m,l])=>(
              <button key={m} onClick={()=>{setMode(m);setErr("");}} style={{flex:1,background:mode===m?T.card3:"none",border:`1px solid ${mode===m?T.borderHi:"transparent"}`,borderRadius:9,padding:"10px",fontSize:13,fontWeight:mode===m?700:500,color:mode===m?T.text:T.sub,cursor:"pointer",fontFamily:B,transition:"all .2s"}}>{l}</button>
            ))}
          </div>

          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:20,padding:sc.isMobile?24:32}}>
            {mode==="signup"&&(
              <div style={{marginBottom:14}}>
                <label style={{fontSize:11,color:T.sub,textTransform:"uppercase",letterSpacing:1.5,display:"flex",alignItems:"center",gap:4,marginBottom:6,fontWeight:700}}>Business Name <span style={{color:T.accent}}>*</span></label>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="SunPower SA (Pty) Ltd" style={{width:"100%",background:T.inputBg,border:`1px solid ${T.border}`,borderRadius:11,padding:"13px 15px",color:T.text,fontSize:14,fontFamily:B,outline:"none",boxSizing:"border-box"}}/>
              </div>
            )}

            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,color:T.sub,textTransform:"uppercase",letterSpacing:1.5,display:"flex",alignItems:"center",gap:6,marginBottom:6,fontWeight:700}}>
                <Ic.Mail s={12} c={T.sub}/> Email Address <span style={{color:T.accent}}>*</span>
              </label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="info@yourcompany.co.za" style={{width:"100%",background:T.inputBg,border:`1px solid ${T.border}`,borderRadius:11,padding:"13px 15px",color:T.text,fontSize:14,fontFamily:B,outline:"none",boxSizing:"border-box"}}/>
            </div>

            <div style={{marginBottom:err?16:24,position:"relative"}}>
              <label style={{fontSize:11,color:T.sub,textTransform:"uppercase",letterSpacing:1.5,display:"flex",alignItems:"center",gap:6,marginBottom:6,fontWeight:700}}>
                <Ic.Lock s={12} c={T.sub}/> Password <span style={{color:T.accent}}>*</span>
              </label>
              <input type={showPw?"text":"password"} value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder={mode==="signup"?"Minimum 6 characters":"••••••••••"} style={{width:"100%",background:T.inputBg,border:`1px solid ${T.border}`,borderRadius:11,padding:"13px 48px 13px 15px",color:T.text,fontSize:14,fontFamily:B,outline:"none",boxSizing:"border-box"}}/>
              <button onClick={()=>setShowPw(s=>!s)} style={{position:"absolute",right:14,top:38,background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",color:T.sub}}>
                {showPw?<Ic.EyeOff s={15} c={T.sub}/>:<Ic.Eye s={15} c={T.sub}/>}
              </button>
            </div>

            {err&&<div style={{display:"flex",alignItems:"center",gap:7,background:"rgba(248,113,113,.08)",border:"1px solid rgba(248,113,113,.2)",borderRadius:9,padding:"10px 13px",marginBottom:16,fontSize:12,color:T.red}}>
              <Ic.X s={12} c={T.red}/>{err}
            </div>}

            <button onClick={submit} disabled={loading} style={{width:"100%",background:`linear-gradient(135deg,${T.accent},${T.accent2})`,border:"none",borderRadius:11,padding:"14px",fontSize:14,fontWeight:800,color:"#000",cursor:loading?"not-allowed":"pointer",opacity:loading?.7:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:H,boxShadow:`0 4px 24px rgba(${T.rgb},.3)`,transition:"opacity .2s"}}>
              {loading?<><Spinner s={17} c="#000"/>{mode==="login"?"Signing in...":"Creating account..."}</>:
               mode==="login"?"Sign In to Dashboard":"Create Free Account"}
            </button>
          </div>

          <div style={{textAlign:"center",marginTop:20,fontSize:12,color:T.sub}}>
            {mode==="login"?"Don't have an account? ":"Already have an account? "}
            <button onClick={()=>{setMode(mode==="login"?"signup":"login");setErr("");}} style={{background:"none",border:"none",color:T.accent,cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:B}}>
              {mode==="login"?"Create one free":"Sign in"}
            </button>
          </div>
          <div style={{textAlign:"center",marginTop:12,fontSize:11,color:T.sub,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
            <Ic.Lock s={10} c={T.sub}/> Secured by Supabase Auth
          </div>
        </>
      )}
    </div>
  );

  if(!sc.isDesktop){
    return(
      <>
        <style>{CSS}</style>
        <div style={{minHeight:"100vh",background:T.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"32px 20px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:"25%",left:"50%",transform:"translateX(-50%)",width:"70vw",height:"50vh",background:`radial-gradient(ellipse,rgba(${T.rgb},.07) 0%,transparent 70%)`,pointerEvents:"none",animation:"breathe 8s ease infinite"}}/>
          <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:440}}>{FormSection}</div>
        </div>
      </>
    );
  }

  return(
    <>
      <style>{CSS}</style>
      <div style={{minHeight:"100vh",display:"flex",background:T.bg,overflow:"hidden"}}>
        {/* Left feature panel */}
        <div style={{width:"44%",minHeight:"100vh",background:T.bg2,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",padding:"52px 56px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:"20%",left:"30%",width:"60%",height:"40%",background:`radial-gradient(ellipse,rgba(${T.rgb},.08) 0%,transparent 70%)`,pointerEvents:"none",animation:"breathe 8s ease infinite"}}/>
          <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)`,backgroundSize:"44px 44px",pointerEvents:"none"}}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:56}}>
              <Ic.Logo s={42}/>
              <div>
                <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:T.text}}>Solar<span style={{color:T.accent}}>IQ</span></div>
                <div style={{fontSize:9,color:T.sub,letterSpacing:2.5,textTransform:"uppercase",marginTop:1}}>Installer Portal</div>
              </div>
            </div>
            <div style={{marginBottom:44}}>
              <div style={{fontFamily:H,fontSize:36,fontWeight:900,color:T.text,lineHeight:1.1,marginBottom:14}}>
                SA's leads.<br/><span style={{color:T.accent}}>Your pipeline.</span>
              </div>
              <div style={{fontSize:15,color:T.textMid,lineHeight:1.8,maxWidth:360}}>
                SolarIQ connects pre-qualified homeowners — with system specs and budgets already calculated — directly to your inbox.
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:20}}>
              {FEATURES.map((f,i)=>(
                <div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",animation:`fadeUp .4s ease ${i*.07}s both`}}>
                  <div style={{width:38,height:38,borderRadius:10,background:`rgba(${T.rgb},.1)`,border:`1px solid rgba(${T.rgb},.15)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <f.Icon s={17} c={T.accent}/>
                  </div>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:3,fontFamily:H}}>{f.title}</div>
                    <div style={{fontSize:12,color:T.sub,lineHeight:1.6}}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:44,padding:"16px 20px",background:`rgba(${T.rgb},.06)`,border:`1px solid rgba(${T.rgb},.12)`,borderRadius:14}}>
              <div style={{fontSize:13,color:T.textMid,lineHeight:1.7,fontStyle:"italic",marginBottom:10}}>
                "SolarIQ sends me customers who've already run the numbers. They know the system size, the cost, and they're ready to talk."
              </div>
              <div style={{fontSize:12,color:T.sub}}>SunPower SA, Johannesburg · <span style={{color:T.accent}}>847 installations</span></div>
            </div>
          </div>
        </div>
        {/* Right: form */}
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"52px 64px"}}>
          {FormSection}
        </div>
      </div>
    </>
  );
}

// ─── GALLERY DRAG-DROP ───────────────────────────────────────
function GalleryStep({data,setData}){
  const [photos,setPhotos]=useState(data.gallery||[]);
  const [dragging,setDragging]=useState(false);

  const processFiles=(files)=>{
    const imgs=Array.from(files).filter(f=>f.type.startsWith("image/")).slice(0,8-photos.length);
    imgs.forEach(file=>{
      const reader=new FileReader();
      reader.onload=(e)=>{
        setPhotos(prev=>{
          if(prev.length>=8)return prev;
          const next=[...prev,{id:Date.now()+Math.random(),src:e.target.result,name:file.name,caption:""}];
          setData(d=>({...d,gallery:next}));
          return next;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const remove=(id)=>{
    const next=photos.filter(p=>p.id!==id);
    setPhotos(next);
    setData(d=>({...d,gallery:next}));
  };

  const caption=(id,cap)=>{
    const next=photos.map(p=>p.id===id?{...p,caption:cap}:p);
    setPhotos(next);
    setData(d=>({...d,gallery:next}));
  };

  return(
    <div>
      <div style={{fontSize:13,color:T.textMid,marginBottom:20,lineHeight:1.6}}>
        Upload up to 8 photos of your best work — DB boards, roof layouts, completed systems. Profiles with photos receive significantly more enquiries.
      </div>
      {photos.length<8&&(
        <div
          onDragOver={e=>{e.preventDefault();setDragging(true);}}
          onDragLeave={()=>setDragging(false)}
          onDrop={e=>{e.preventDefault();setDragging(false);processFiles(e.dataTransfer.files);}}
          onClick={()=>document.getElementById("gallery-input").click()}
          style={{border:`2px dashed ${dragging?T.accent:`rgba(${T.rgb},.25)`}`,background:dragging?T.accentDim:T.card,borderRadius:14,padding:"36px 24px",textAlign:"center",marginBottom:18,transition:"all .2s",cursor:"pointer"}}
        >
          <div style={{width:44,height:44,borderRadius:12,background:`rgba(${T.rgb},.1)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>
            <Ic.Camera s={22} c={T.accent}/>
          </div>
          <div style={{fontFamily:H,fontSize:15,fontWeight:700,color:dragging?T.accent:T.text,marginBottom:6}}>
            {dragging?"Release to upload":"Drag and drop photos here"}
          </div>
          <div style={{fontSize:12,color:T.sub,marginBottom:14}}>or click to browse — JPG, PNG, max 8 photos</div>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 18px",background:T.accentDim,border:`1px solid rgba(${T.rgb},.3)`,borderRadius:20,fontSize:12,fontWeight:700,color:T.accent}}>
            <Ic.Upload s={13} c={T.accent}/> Choose Photos
          </div>
          <input id="gallery-input" type="file" multiple accept="image/*" style={{display:"none"}} onChange={e=>processFiles(e.target.files)}/>
        </div>
      )}
      {photos.length>0&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10,marginBottom:14}}>
          {photos.map((p,i)=>(
            <div key={p.id} style={{borderRadius:12,overflow:"hidden",border:`1px solid ${T.border}`,background:T.bg2,position:"relative"}}>
              <img src={p.src} alt="" style={{width:"100%",height:120,objectFit:"cover",display:"block"}}/>
              <button onClick={()=>remove(p.id)} style={{position:"absolute",top:6,right:6,width:24,height:24,background:"rgba(0,0,0,.75)",border:"none",borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ic.X s={11} c="#fff"/>
              </button>
              {i===0&&<div style={{position:"absolute",top:6,left:6,fontSize:9,background:`linear-gradient(135deg,${T.accent},${T.accent2})`,color:"#000",padding:"2px 7px",borderRadius:5,fontWeight:800,letterSpacing:.5}}>HERO</div>}
              <div style={{padding:"6px 8px"}}>
                <input value={p.caption} onChange={e=>caption(p.id,e.target.value)} placeholder="Add caption..." style={{width:"100%",background:"none",border:"none",color:T.sub,fontSize:10,fontFamily:B,outline:"none",boxSizing:"border-box"}}/>
              </div>
            </div>
          ))}
          {photos.length<8&&(
            <label style={{minHeight:140,borderRadius:12,border:`1px dashed rgba(${T.rgb},.2)`,background:T.card,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",gap:6,transition:"background .2s"}}
              onMouseEnter={e=>e.currentTarget.style.background=T.accentDim}
              onMouseLeave={e=>e.currentTarget.style.background=T.card}>
              <Ic.Plus s={22} c={T.sub}/>
              <span style={{fontSize:10,color:T.sub,fontWeight:600}}>Add more</span>
              <span style={{fontSize:9,color:T.sub}}>{8-photos.length} remaining</span>
              <input type="file" multiple accept="image/*" style={{display:"none"}} onChange={e=>processFiles(e.target.files)}/>
            </label>
          )}
        </div>
      )}
      <div style={{padding:"12px 14px",background:`rgba(${T.rgb},.05)`,border:`1px solid rgba(${T.rgb},.12)`,borderRadius:10,fontSize:12,color:T.textMid,lineHeight:1.6}}>
        Clean DB board photos and before/after roof shots perform best. SA homeowners buy with their eyes.
      </div>
    </div>
  );
}

// ─── ONBOARDING WIZARD ───────────────────────────────────────
const WIZARD_STEPS=[
  {id:"type",    label:"Business Type", Icon:Ic.Grid,   desc:"What services do you offer"},
  {id:"business",label:"Details",       Icon:Ic.User,   desc:"Your business information"},
  {id:"service", label:"Service Area",  Icon:Ic.Map,    desc:"Where you operate"},
  {id:"brands",  label:"Expertise",     Icon:Ic.Zap,    desc:"Brands and specialisations"},
  {id:"gallery", label:"Gallery",       Icon:Ic.Camera, desc:"Show your best work"},
];

function OnboardingWizard({installer,onComplete}){
  const sc=useScreen();
  const [step,setStep]=useState(0);
  const [saving,setSaving]=useState(false);
  const [saveErr,setSaveErr]=useState("");

  const [data,setData]=useState({
    businessType:"installer", // installer | technician | both
    name:installer?.name||"",
    about:installer?.about||"",
    phone:installer?.phone||"",
    whatsapp:installer?.whatsapp||"",
    email:installer?.email||"",
    website:installer?.website||"",
    city:installer?.city||"",
    province:installer?.province||"Gauteng",
    price_min:installer?.price_min||"",
    price_max:installer?.price_max||"",
    years_experience:installer?.years_experience||"",
    finance_available:installer?.finance_available||false,
    response_hours:installer?.response_hours||24,
    provinces_served:[],
    brands:[],
    install_specs:[],
    repair_specs:[],
    gallery:[],
  });

  const up=(k,v)=>setData(d=>({...d,[k]:v}));
  const toggleArr=(key,val)=>setData(d=>({...d,[key]:d[key].includes(val)?d[key].filter(x=>x!==val):[...d[key],val]}));

  const canProceed=[
    ()=>data.businessType,
    ()=>data.name.trim()&&data.phone.trim()&&data.city.trim(),
    ()=>data.provinces_served.length>0,
    ()=>data.brands.length>0,
    ()=>true,
  ][step]?.()??true;

  const saveAndContinue=async()=>{
    if(step<WIZARD_STEPS.length-1){setStep(s=>s+1);return;}
    setSaving(true);setSaveErr("");
    try{await onComplete(data);}
    catch(e){setSaveErr("Something went wrong. Please try again.");setSaving(false);}
  };

  const progress=Math.round((step/(WIZARD_STEPS.length-1))*100);

  const showInstall=data.businessType==="installer"||data.businessType==="both";
  const showRepair=data.businessType==="technician"||data.businessType==="both";

  return(
    <>
      <style>{CSS}</style>
      <div style={{minHeight:"100vh",background:T.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",padding:"32px 16px 48px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)",width:"60vw",height:"50vh",background:`radial-gradient(ellipse,rgba(${T.rgb},.05) 0%,transparent 70%)`,pointerEvents:"none",animation:"breathe 8s ease infinite"}}/>

        <div style={{width:"100%",maxWidth:sc.isDesktop?900:640,position:"relative",zIndex:1,animation:"fadeUp .5s ease"}}>
          {/* Header */}
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:32}}>
            <Ic.Logo s={36}/>
            <div>
              <div style={{fontFamily:H,fontSize:18,fontWeight:900,color:T.text}}>Solar<span style={{color:T.accent}}>IQ</span></div>
              <div style={{fontSize:9,color:T.sub,letterSpacing:2,textTransform:"uppercase"}}>Installer Portal</div>
            </div>
          </div>
          <div style={{fontFamily:H,fontSize:sc.isMobile?20:26,fontWeight:800,color:T.text,marginBottom:6}}>Set up your installer profile</div>
          <div style={{fontSize:13,color:T.sub,marginBottom:28}}>Complete your profile to unlock leads and get listed on SolarIQ.</div>

          {/* Step indicators */}
          <div style={{display:"flex",gap:sc.isMobile?4:8,marginBottom:20,flexWrap:"wrap"}}>
            {WIZARD_STEPS.map((s,i)=>(
              <div key={s.id} onClick={()=>i<step&&setStep(i)} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:20,background:i===step?T.accentDim:i<step?"rgba(52,211,153,.1)":T.card,border:`1px solid ${i===step?`rgba(${T.rgb},.4)`:i<step?"rgba(52,211,153,.3)":T.border}`,cursor:i<step?"pointer":"default",transition:"all .2s"}}>
                {i<step
                  ?<Ic.Check s={11} c={T.green}/>
                  :<s.Icon s={12} c={i===step?T.accent:T.sub}/>}
                {!sc.isMobile&&<span style={{fontSize:11,fontWeight:700,color:i===step?T.accent:i<step?T.green:T.sub}}>{s.label}</span>}
              </div>
            ))}
          </div>

          {/* Progress */}
          <div style={{height:3,background:T.card,borderRadius:2,marginBottom:28,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${T.accent},${T.accent2})`,borderRadius:2,transition:"width .4s ease",boxShadow:`0 0 8px rgba(${T.rgb},.5)`}}/>
          </div>

          {/* Card */}
          <Card style={{padding:sc.isMobile?"20px":"32px"}}>
            <div key={step} style={{animation:"slideIn .3s ease"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:22,paddingBottom:16,borderBottom:`1px solid ${T.border}`}}>
                <div style={{width:38,height:38,borderRadius:10,background:T.accentDim,border:`1px solid rgba(${T.rgb},.2)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {React.createElement(WIZARD_STEPS[step].Icon,{s:17,c:T.accent})}
                </div>
                <div>
                  <div style={{fontFamily:H,fontSize:16,fontWeight:800,color:T.text}}>{WIZARD_STEPS[step].label}</div>
                  <div style={{fontSize:12,color:T.sub,marginTop:2}}>{WIZARD_STEPS[step].desc}</div>
                </div>
              </div>

              {/* STEP 0: Business Type */}
              {step===0&&(
                <div>
                  <div style={{fontSize:13,color:T.textMid,marginBottom:20,lineHeight:1.6}}>
                    Select the type of solar services your business provides. This determines which leads and clients you receive.
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr":"repeat(3,1fr)",gap:12}}>
                    {[
                      {val:"installer",Icon:Ic.Zap,title:"Solar Installer",desc:"New system installations — residential, commercial or agricultural"},
                      {val:"technician",Icon:Ic.Tool,title:"Repair & Maintenance",desc:"Inverter repairs, battery replacements, panel cleaning, fault finding"},
                      {val:"both",Icon:Ic.Grid,title:"Both",desc:"Full service — installations plus ongoing maintenance and repairs"},
                    ].map(opt=>{
                      const active=data.businessType===opt.val;
                      return(
                        <div key={opt.val} onClick={()=>up("businessType",opt.val)} style={{padding:"20px 16px",borderRadius:14,border:`2px solid ${active?T.accent:T.border}`,background:active?T.accentDim:T.card,cursor:"pointer",transition:"all .2s",textAlign:"center"}}>
                          <div style={{width:46,height:46,borderRadius:12,background:active?`rgba(${T.rgb},.15)`:T.bg2,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",transition:"background .2s"}}>
                            <opt.Icon s={22} c={active?T.accent:T.sub}/>
                          </div>
                          <div style={{fontFamily:H,fontSize:14,fontWeight:800,color:active?T.accent:T.text,marginBottom:6}}>{opt.title}</div>
                          <div style={{fontSize:12,color:T.sub,lineHeight:1.5}}>{opt.desc}</div>
                          {active&&<div style={{marginTop:10,display:"inline-flex",alignItems:"center",gap:5,fontSize:11,color:T.green,fontWeight:700}}>
                            <Ic.Check s={11} c={T.green}/> Selected
                          </div>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 1: Business Details */}
              {step===1&&(
                <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr":"1fr 1fr",gap:"0 20px"}}>
                  <div style={{gridColumn:sc.isMobile?"1":"1/-1"}}><Inp label="Business Name" value={data.name} onChange={v=>up("name",v)} placeholder="SunPower SA (Pty) Ltd" required/></div>
                  <Inp label="Your City" value={data.city} onChange={v=>up("city",v)} placeholder="Johannesburg" required/>
                  <SelField label="Province" value={data.province} onChange={v=>up("province",v)} options={SA_PROVINCES} required/>
                  <Inp label="Phone" value={data.phone} onChange={v=>up("phone",v)} type="tel" placeholder="+27 82 000 0000" required/>
                  <Inp label="WhatsApp" value={data.whatsapp} onChange={v=>up("whatsapp",v)} type="tel" placeholder="+27 82 000 0000"/>
                  <Inp label="Business Email" value={data.email} onChange={v=>up("email",v)} type="email" placeholder="info@yourcompany.co.za"/>
                  <Inp label="Website" value={data.website} onChange={v=>up("website",v)} placeholder="yourcompany.co.za"/>
                  <Inp label="Years in Business" value={String(data.years_experience)} onChange={v=>up("years_experience",parseInt(v)||"")} type="number" placeholder="8"/>
                  <SelField label="Response Time" value={String(data.response_hours)} onChange={v=>up("response_hours",parseInt(v))} options={[[1,"Within 1 hour"],[2,"Within 2 hours"],[4,"Within 4 hours"],[8,"Within 8 hours"],[12,"Within 12 hours"],[24,"Within 1 day"],[48,"Within 2 days"]]}/>
                  {showInstall&&(<>
                    <div>
                      <label style={{fontSize:11,color:T.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:700}}>Min Price (R)</label>
                      <input type="number" value={data.price_min} onChange={e=>up("price_min",e.target.value)} placeholder="50000" style={{width:"100%",background:T.inputBg,border:`1px solid ${T.border}`,borderRadius:10,padding:"11px 14px",color:T.text,fontSize:13,fontFamily:B,marginBottom:14}}/>
                    </div>
                    <div>
                      <label style={{fontSize:11,color:T.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:700}}>Max Price (R)</label>
                      <input type="number" value={data.price_max} onChange={e=>up("price_max",e.target.value)} placeholder="200000" style={{width:"100%",background:T.inputBg,border:`1px solid ${T.border}`,borderRadius:10,padding:"11px 14px",color:T.text,fontSize:13,fontFamily:B,marginBottom:14}}/>
                    </div>
                  </>)}
                  <div style={{gridColumn:sc.isMobile?"1":"1/-1"}}><Inp label="About your business" value={data.about} onChange={v=>up("about",v)} rows={3} placeholder="Tell homeowners what makes your business stand out..."/></div>
                  <div style={{gridColumn:sc.isMobile?"1":"1/-1"}}><Toggle value={data.finance_available} onChange={v=>up("finance_available",v)} label="Finance / Rent-to-own available"/></div>
                </div>
              )}

              {/* STEP 2: Service area */}
              {step===2&&(
                <div>
                  <div style={{fontSize:13,color:T.textMid,marginBottom:18,lineHeight:1.6}}>Select all provinces you actively service. This determines which leads are routed to you.</div>
                  <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":"repeat(3,1fr)",gap:8}}>
                    {SA_PROVINCES.map(p=>{
                      const active=data.provinces_served.includes(p);
                      return(
                        <div key={p} onClick={()=>toggleArr("provinces_served",p)} style={{padding:"11px 14px",borderRadius:10,border:`1px solid ${active?`rgba(${T.rgb},.4)`:T.border}`,background:active?T.accentDim:T.card,cursor:"pointer",transition:"all .18s",display:"flex",alignItems:"center",gap:8}}>
                          <div style={{width:16,height:16,borderRadius:4,border:`2px solid ${active?T.accent:T.sub}`,background:active?T.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .18s"}}>
                            {active&&<Ic.Check s={10} c="#000"/>}
                          </div>
                          <span style={{fontSize:12,fontWeight:active?700:400,color:active?T.accent:T.textMid}}>{p}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{marginTop:12,padding:"10px 14px",background:T.card,border:`1px solid ${T.border}`,borderRadius:9,fontSize:12,color:T.sub}}>
                    {data.provinces_served.length===0?"Select at least one province":`Covering: ${data.provinces_served.join(", ")}`}
                  </div>
                </div>
              )}

              {/* STEP 3: Brands & Expertise */}
              {step===3&&(
                <div>
                  <div style={{marginBottom:22}}>
                    <div style={{fontSize:11,color:T.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:12,fontWeight:700}}>Inverter & Battery Brands</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                      {BRANDS_LIST.map(b=>{const a=data.brands.includes(b);return(
                        <div key={b} onClick={()=>toggleArr("brands",b)} style={{padding:"7px 14px",borderRadius:20,border:`1px solid ${a?`rgba(${T.rgb},.4)`:T.border}`,background:a?T.accentDim:T.card,cursor:"pointer",fontSize:12,fontWeight:a?700:400,color:a?T.accent:T.textMid,transition:"all .18s"}}>{b}</div>
                      );})}
                    </div>
                  </div>
                  {showInstall&&(
                    <div style={{marginBottom:22}}>
                      <div style={{fontSize:11,color:T.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:12,fontWeight:700}}>Installation Specialities</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                        {INSTALL_SPECS.map(s=>{const a=data.install_specs.includes(s);return(
                          <div key={s} onClick={()=>toggleArr("install_specs",s)} style={{padding:"7px 14px",borderRadius:20,border:`1px solid ${a?"rgba(96,165,250,.4)":T.border}`,background:a?"rgba(96,165,250,.1)":T.card,cursor:"pointer",fontSize:12,fontWeight:a?700:400,color:a?T.blue:T.textMid,transition:"all .18s"}}>{s}</div>
                        );})}
                      </div>
                    </div>
                  )}
                  {showRepair&&(
                    <div>
                      <div style={{fontSize:11,color:T.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:12,fontWeight:700}}>Repair & Maintenance Services</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                        {REPAIR_SPECS.map(s=>{const a=data.repair_specs.includes(s);return(
                          <div key={s} onClick={()=>toggleArr("repair_specs",s)} style={{padding:"7px 14px",borderRadius:20,border:`1px solid ${a?"rgba(52,211,153,.4)":T.border}`,background:a?"rgba(52,211,153,.1)":T.card,cursor:"pointer",fontSize:12,fontWeight:a?700:400,color:a?T.green:T.textMid,transition:"all .18s"}}>{s}</div>
                        );})}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: Gallery */}
              {step===4&&<GalleryStep data={data} setData={setData}/>}
            </div>

            {/* Nav */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:28,paddingTop:20,borderTop:`1px solid ${T.border}`}}>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                {step>0&&<button onClick={()=>setStep(s=>s-1)} style={{background:"none",border:"none",color:T.sub,cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:B,display:"flex",alignItems:"center",gap:5}}>
                  <Ic.Left s={13} c={T.sub}/> Back
                </button>}
                {step===4&&<button onClick={saveAndContinue} style={{background:"none",border:"none",color:T.sub,cursor:"pointer",fontSize:12,fontFamily:B,textDecoration:"underline"}}>Skip gallery for now</button>}
              </div>
              {saveErr&&<div style={{fontSize:12,color:T.red,flex:1,textAlign:"center"}}>{saveErr}</div>}
              <Btn onClick={saveAndContinue} disabled={!canProceed} loading={saving} style={{minWidth:160}}>
                {step===WIZARD_STEPS.length-1?"Launch My Profile":"Continue"}
                {step<WIZARD_STEPS.length-1&&<Ic.Right s={13} c="#000"/>}
              </Btn>
            </div>
          </Card>
          <div style={{textAlign:"center",marginTop:16,fontSize:11,color:T.sub,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
            <Ic.Lock s={10} c={T.sub}/> Your data is secured by Supabase
          </div>
        </div>
      </div>
    </>
  );
}
function LeadInbox({ leads, setLeads }) {
  const sc = useScreen();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [search, setSearch] = useState("");

  const filtered = leads.filter(l => {
    if (filter !== "all" && l.status !== filter) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.area.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const updateStatus = (id, status) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
  };

  const saveNote = (id) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, notes: noteText } : l));
    if (selected?.id === id) setSelected(prev => ({ ...prev, notes: noteText }));
  };

  const counts = Object.fromEntries(Object.keys(STATUS).map(k => [k, leads.filter(l => l.status === k).length]));
  const newCount = counts.new || 0;

  const goalColor = g => ({ "Full Off-Grid": T.green, "Load Shedding Backup": T.accent, "Mostly Off-Grid": T.cyan, "Bill Savings": T.blue, "Full Independence": T.purple }[g] || T.sub);

  // The Lead Card component
  const LeadCard = ({ lead, i }) => {
    const st = STATUS[lead.status] || STATUS.new;
    const uc = urgencyColor(lead.created_at);
    const isSelected = selected?.id === lead.id;

    return (
      <div
        onClick={() => { setSelected(lead); setNoteText(lead.notes || ""); }}
        style={{
          padding: "16px 18px", borderRadius: 14, cursor: "pointer",
          background: isSelected ? `rgba(${T.rgb},.06)` : T.card,
          border: `1px solid ${isSelected ? `rgba(${T.rgb},.3)` : T.border}`,
          transition: "all .18s", animation: `fadeUp .3s ease ${i * .04}s both`,
          position: "relative", overflow: "hidden",
        }}
        onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = T.borderHi; e.currentTarget.style.background = T.card2; } }}
        onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.card; } }}
      >
        {/* Urgency left border */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: uc, borderRadius: "14px 0 0 14px" }} />

        <div style={{ paddingLeft: 8 }}>
          {/* Row 1: Name + Status + Time */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: `${goalColor(lead.goal)}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0, fontWeight: 800, fontFamily: H, color: goalColor(lead.goal) }}>
              {lead.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: T.text }}>{lead.name}</div>
              <div style={{ fontSize: 11, color: T.sub }}>{lead.area}</div>
            </div>
            <Badge color={st.color}>{st.label}</Badge>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Ic.Clock s={11} c={uc} />
              <span style={{ fontSize: 10, color: uc, fontWeight: 700 }}>{timeSince(lead.created_at)}</span>
            </div>
          </div>

          {/* Row 2: Goal tag */}
          <div style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, background: `${goalColor(lead.goal)}14`, color: goalColor(lead.goal), padding: "2px 9px", borderRadius: 10 }}>{lead.goal}</span>
          </div>

          {/* Row 3: Technical specs grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 10 }}>
            {[
              [`${lead.system_kw}kW`, "System"],
              [`${lead.battery_kwh}kWh`, "Battery"],
              [`${lead.panels}× panels`, "Array"],
            ].map(([v, l]) => (
              <div key={l} style={{ background: T.bg2, borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.text }}>{v}</div>
                <div style={{ fontSize: 9, color: T.sub, marginTop: 1 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Row 4: Financial signals */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: T.textMid }}>R<strong style={{ color: T.green }}>R{lead.monthly_bill.toLocaleString()}/mo</strong> bill</div>
            <div style={{ fontSize: 12, color: T.textMid }}><strong style={{ color: T.accent }}>R{lead.estimated_cost.toLocaleString()}</strong> est.</div>
            {lead.urgency && <span style={{ fontSize: 10, background: "rgba(52,211,153,.1)", color: T.green, padding: "2px 8px", borderRadius: 8, fontWeight: 700 }}>{lead.urgency}</span>}
          </div>

          {/* Row 5: Quick actions */}
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => updateStatus(lead.id, lead.status === "new" ? "contacted" : lead.status)}
              style={{ flex: 1, minWidth: 100, background: lead.status === "new" ? `linear-gradient(135deg, ${T.accent}, ${T.accent2})` : T.card, border: `1px solid ${lead.status === "new" ? "none" : T.border}`, color: lead.status === "new" ? "#000" : T.textMid, borderRadius: 8, padding: "8px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: B, transition: "all .18s" }}>
              {lead.status === "new" ? "Mark Contacted" : "Update Status"}
            </button>
            <button
              onClick={() => { const m = encodeURIComponent(`Hi ${lead.name.split(" ")[0]}, I'm calling from ${" "}about your solar quote request on SolarIQ. Your recommended system is ${lead.system_kw}kW with ${lead.battery_kwh}kWh battery. I'd love to discuss this with you.`); window.open(`https://wa.me/${lead.phone?.replace(/\s/g, "")}?text=${m}`, "_blank"); }}
              style={{ background: "rgba(37,211,102,.1)", border: "1px solid rgba(37,211,102,.25)", color: "#25d366", borderRadius: 8, padding: "8px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: B }}>WhatsApp</button>
          </div>
        </div>
      </div>
    );
  };

  // Lead detail panel
  const LeadDetail = ({ lead }) => {
    const [localNote, setLocalNote] = useState(lead.notes || "");
    const [noteSaved, setNoteSaved] = useState(false);
    const st = STATUS[lead.status] || STATUS.new;

    const handleSaveNote = () => {
      saveNote(lead.id);
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2000);
    };

    return (
      <div style={{ animation: "fadeIn .25s ease" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 22, paddingBottom: 18, borderBottom: `1px solid ${T.border}` }}>
          <div style={{ width: 50, height: 50, borderRadius: 14, background: `rgba(${T.rgb},.1)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: H, fontSize: 20, fontWeight: 900, color: T.accent, flexShrink: 0 }}>
            {lead.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: H, fontSize: 20, fontWeight: 900, color: T.text, marginBottom: 4 }}>{lead.name}</div>
            <div style={{ fontSize: 12, color: T.sub, marginBottom: 8 }}>{lead.area} · {lead.email}</div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              <Badge color={st.color} dot={lead.status === "new"}>{st.label}</Badge>
              <Badge color={urgencyColor(lead.created_at)}>{timeSince(lead.created_at)}</Badge>
              <span style={{ fontSize: 10, fontWeight: 700, background: `${urgencyColor(lead.created_at)}14`, color: urgencyColor(lead.created_at), padding: "2px 8px", borderRadius: 8 }}>{lead.urgency}</span>
            </div>
          </div>
        </div>

        {/* Technical section */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: T.sub, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12, fontWeight: 700 }}>System Profile</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              ["Energy Goal", lead.goal, T.green],
              ["System Size", `${lead.system_kw}kW Inverter`, T.accent],
              ["Battery", `${lead.battery_kwh}kWh`, T.blue],
              ["Solar Array", `${lead.panels} × 550Wp`, T.cyan],
              ["Daily Usage", `${lead.daily_kwh} kWh/day`, T.purple],
              ["Roof Type", lead.roof, T.orange],
            ].map(([l, v, c]) => (
              <div key={l} style={{ background: T.bg2, borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 10, color: T.sub, textTransform: "uppercase", letterSpacing: .8, marginBottom: 4 }}>{l}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: c }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial signals */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
          <div style={{ background: "rgba(52,211,153,.07)", border: "1px solid rgba(52,211,153,.15)", borderRadius: 12, padding: "14px" }}>
            <div style={{ fontSize: 10, color: T.sub, textTransform: "uppercase", letterSpacing: .8, marginBottom: 4 }}>Monthly Bill</div>
            <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: T.green }}>R{lead.monthly_bill.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: T.sub, marginTop: 2 }}>per month — proves ROI</div>
          </div>
          <div style={{ background: `rgba(${T.rgb},.07)`, border: `1px solid rgba(${T.rgb},.15)`, borderRadius: 12, padding: "14px" }}>
            <div style={{ fontSize: 10, color: T.sub, textTransform: "uppercase", letterSpacing: .8, marginBottom: 4 }}>Estimated Budget</div>
            <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: T.accent }}>R{lead.estimated_cost.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: T.sub, marginTop: 2 }}>calculator estimate</div>
          </div>
        </div>

        {/* Status update */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: T.sub, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10, fontWeight: 700 }}>Update Status</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {Object.entries(STATUS).map(([key, val]) => (
              <button key={key} onClick={() => updateStatus(lead.id, key)} style={{ background: lead.status === key ? val.bg : T.card, border: `1px solid ${lead.status === key ? val.color + "60" : T.border}`, color: lead.status === key ? val.color : T.sub, borderRadius: 8, padding: "6px 13px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: B, transition: "all .18s" }}>{val.label}</button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: T.sub, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, fontWeight: 700 }}>Private Notes</div>
          <textarea value={localNote} onChange={e => setLocalNote(e.target.value)} placeholder="Add notes about this lead — call summaries, site visit findings, objections..."
            style={{ width: "100%", background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "11px 14px", color: T.text, fontSize: 13, fontFamily: B, resize: "vertical", outline: "none", boxSizing: "border-box", lineHeight: 1.6 }} rows={4} />
          <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
            <Btn sm onClick={handleSaveNote}>Save Note</Btn>
            {noteSaved && <span style={{ fontSize: 12, color: T.green }}>Saved</span>}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Btn full onClick={() => { const m = encodeURIComponent(`Hi ${lead.name.split(" ")[0]}, I'm reaching out about your solar quote request on SolarIQ. Your recommended system is a ${lead.system_kw}kW system with ${lead.battery_kwh}kWh battery. I'd love to discuss how we can help. When would be a good time to chat?`); window.open(`https://wa.me/${lead.phone?.replace(/\s/g, "")}?text=${m}`, "_blank"); }} style={{ background: "rgba(37,211,102,.1)", border: "1px solid rgba(37,211,102,.3)", color: "#25d366" }}>
            WhatsApp {lead.name.split(" ")[0]}
          </Btn>
          <Btn sm variant="accent" onClick={() => window.location.hash = `#quote-${lead.id}`}><Ic.Quote s={12} c={T.accent} /> Build Quote</Btn>
          <Btn sm variant="ghost" onClick={() => lead.phone && (window.location.href = `tel:${lead.phone}`)}><Ic.Phone s={12} c={T.textMid} /> Call</Btn>
        </div>
      </div>
    );
  };

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: T.text, display: "flex", alignItems: "center", gap: 10 }}>
            Lead Inbox
            {newCount > 0 && <span style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`, color: "#000", borderRadius: "50%", width: 24, height: 24, fontSize: 11, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, boxShadow: `0 0 12px rgba(${T.rgb},.4)`, animation: "glow 2s ease infinite" }}>{newCount}</span>}
          </div>
          <div style={{ fontSize: 12, color: T.sub, marginTop: 3 }}>{leads.length} total leads · {counts.converted || 0} converted</div>
        </div>
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads..." style={{ background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 9, padding: "8px 12px 8px 32px", color: T.text, fontSize: 12, fontFamily: B, outline: "none", width: 180 }} />
            
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 5, marginBottom: 16, overflowX: "auto", paddingBottom: 2 }}>
        {[["all", "All", leads.length], ...Object.entries(STATUS).map(([k, v]) => [k, v.label, counts[k] || 0])].map(([key, label, count]) => (
          <button key={key} onClick={() => setFilter(key)} style={{ background: filter === key ? `rgba(${T.rgb},.12)` : T.card, border: `1px solid ${filter === key ? `rgba(${T.rgb},.4)` : T.border}`, color: filter === key ? T.accent : T.sub, borderRadius: 20, padding: "5px 13px", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: B, whiteSpace: "nowrap", flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}>
            {label} {count > 0 && <span style={{ background: filter === key ? `rgba(${T.rgb},.2)` : T.card2, borderRadius: 10, padding: "0 5px", fontSize: 10 }}>{count}</span>}
          </button>
        ))}
      </div>

      {/* Layout */}
      <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "1.1fr 1fr" : "1fr", gap: 14, alignItems: "start" }}>
        {/* Lead list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.length === 0 ? (
            <Card style={{ padding: "48px", textAlign: "center" }}>
              <div style={{ width:48,height:48,borderRadius:14,background:T.card,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12 }}><Ic.Inbox s={22} c={T.sub}/></div>
              <div style={{ fontFamily: H, fontSize: 16, fontWeight: 700, color: T.textMid, marginBottom: 6 }}>{filter === "all" ? "No leads yet" : `No ${STATUS[filter]?.label.toLowerCase()} leads`}</div>
              <div style={{ fontSize: 13, color: T.sub, lineHeight: 1.6 }}>Leads appear here when homeowners request a quote through SolarIQ.</div>
            </Card>
          ) : (
            filtered.map((lead, i) => <LeadCard key={lead.id} lead={lead} i={i} />)
          )}
        </div>

        {/* Detail panel */}
        {sc.isDesktop && (
          <div style={{ position: "sticky", top: 80 }}>
            <Card style={{ padding: "22px" }}>
              {selected ? <LeadDetail lead={selected} /> : (
                <div style={{ padding: "60px 20px", textAlign: "center" }}>
                  <div style={{ marginBottom:16,opacity:.3 }}><Ic.Left s={40} c={T.sub}/></div>
                  <div style={{ fontFamily: H, fontSize: 16, fontWeight: 700, color: T.sub }}>Select a lead to view details</div>
                  <div style={{ fontSize: 12, color: T.sub, marginTop: 6 }}>Click any lead card on the left</div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>

      {/* Mobile detail modal */}
      {!sc.isDesktop && selected && (
        <>
          <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, zIndex: 490, background: "rgba(0,0,0,.7)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 500, background: T.bg3, borderTop: `1px solid ${T.border}`, borderRadius: "20px 20px 0 0", padding: "24px 20px", maxHeight: "85vh", overflowY: "auto", animation: "fadeUp .3s ease" }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: T.border, margin: "0 auto 20px" }} />
            <LeadDetail lead={selected} />
          </div>
        </>
      )}
    </div>
  );
}

// ─── CREDENTIALS VAULT ────────────────────────────────────────
function CredentialsVault({ installer }) {
  const sc = useScreen();
  const [docs, setDocs] = useState([
    { id: "cipc",      label: "CIPC Company Registration",            req: true,  file: null, expiry: "", status: "missing",  desc: "Business registration from CIPC" },
    { id: "wireman",   label: "DoL Electrical Contractor Certificate", req: true,  file: null, expiry: "", status: "missing",  desc: "Department of Labour Wireman's License" },
    { id: "sessa",     label: "SESSA / PV GreenCard",                 req: true,  file: null, expiry: "", status: "pending",  desc: "SESSA or SAPVIA solar accreditation" },
    { id: "tax",       label: "Tax Clearance Certificate",            req: false, file: null, expiry: "", status: "missing",  desc: "SARS tax clearance — builds trust" },
    { id: "insurance", label: "Public Liability Insurance",           req: false, file: null, expiry: "", status: "missing",  desc: "Optional but shown as premium signal" },
  ]);

  const statusConfig = {
    verified: { color: T.green, label: "Verified", icon: "check", bg: "rgba(52,211,153,.08)", border: "rgba(52,211,153,.2)" },
    pending:  { color: T.accent, label: "Pending Review", icon: "⏳", bg: `rgba(${T.rgb},.06)`, border: `rgba(${T.rgb},.2)` },
    expiring: { color: T.orange, label: "Expiring Soon", icon: "!", bg: "rgba(251,146,60,.08)", border: "rgba(251,146,60,.2)" },
    expired:  { color: T.red, label: "Expired", icon: "x", bg: "rgba(248,113,113,.08)", border: "rgba(248,113,113,.2)" },
    missing:  { color: T.sub, label: "Not uploaded", icon: "○", bg: T.card, border: T.border },
  };

  const verified = docs.filter(d => d.status === "verified").length;
  const required = docs.filter(d => d.req).length;
  const reqVerified = docs.filter(d => d.req && d.status === "verified").length;
  const pct = Math.round((reqVerified / required) * 100);

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: T.text, marginBottom: 4 }}>Credentials Vault</div>
        <div style={{ fontSize: 12, color: T.sub }}>Documents required for SolarIQ Verified badge</div>
      </div>

      {/* Verification progress card */}
      <Card style={{ padding: "22px", marginBottom: 20, background: pct === 100 ? "rgba(52,211,153,.05)" : `rgba(${T.rgb},.04)`, border: `1px solid ${pct === 100 ? "rgba(52,211,153,.2)" : `rgba(${T.rgb},.15)`}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: pct === 100 ? "rgba(52,211,153,.12)" : `rgba(${T.rgb},.1)`, border: `3px solid ${pct === 100 ? T.green : T.accent}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: H, fontSize: 18, fontWeight: 900, color: pct === 100 ? T.green : T.accent, boxShadow: `0 0 20px ${pct === 100 ? "rgba(52,211,153,.2)" : `rgba(${T.rgb},.2)`}` }}>
            {pct}%
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: H, fontSize: 17, fontWeight: 800, color: T.text, marginBottom: 4 }}>
              {pct === 100 ? "Fully Verified" : pct >= 67 ? "Almost there" : "Get verified to receive leads"}
            </div>
            <div style={{ fontSize: 12, color: T.sub, marginBottom: 10 }}>{reqVerified} of {required} required documents verified</div>
            <div style={{ height: 6, background: T.bg2, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? `linear-gradient(90deg, ${T.green}, #22d3ee)` : `linear-gradient(90deg, ${T.accent}, ${T.accent2})`, borderRadius: 3, transition: "width 1s ease", boxShadow: `0 0 8px rgba(${T.rgb},.4)` }} />
            </div>
          </div>
        </div>
        {pct < 100 && (
          <div style={{ marginTop: 14, padding: "10px 14px", background: T.bg2, borderRadius: 9, fontSize: 12, color: T.textMid, lineHeight: 1.6 }}>
            <strong style={{ color: T.accent }}>Missing documents = no leads.</strong> Unverified installers are hidden from homeowner search results until all required certificates are uploaded and approved.
          </div>
        )}
      </Card>

      {/* Document list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {docs.map(doc => {
          const sc2 = statusConfig[doc.status];
          return (
            <div key={doc.id} style={{ background: sc2.bg, border: `1px solid ${sc2.border}`, borderRadius: 14, padding: "18px 20px", transition: "all .2s" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                {/* Icon */}
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${sc2.color}14`, border: `1px solid ${sc2.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ic.Shield s={18} c={sc2.color} />
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: H, fontSize: 14, fontWeight: 700, color: T.text }}>{doc.label}</span>
                    {doc.req && <span style={{ fontSize: 9, background: `rgba(${T.rgb},.12)`, color: T.accent, padding: "1px 7px", borderRadius: 6, fontWeight: 700 }}>REQUIRED</span>}
                    <span style={{ fontSize: 10, fontWeight: 700, background: `${sc2.color}18`, color: sc2.color, padding: "2px 8px", borderRadius: 10 }}>{sc2.icon} {sc2.label}</span>
                  </div>
                  <div style={{ fontSize: 11, color: T.sub, marginBottom: doc.file ? 10 : 0 }}>{doc.desc}</div>
                  {doc.status !== "missing" && (
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
                      <div style={{ fontSize: 11, color: T.textMid, display:"flex",alignItems:"center",gap:5 }}><Ic.FileText s={11} c={T.textMid}/> Certificate_2025.pdf</div>
                      <div style={{ fontSize: 11, color: T.sub }}>Uploaded Jan 2025</div>
                      {doc.expiry && <div style={{ fontSize: 11, color: doc.status === "expiring" ? T.orange : T.sub }}>Expires: {doc.expiry}</div>}
                    </div>
                  )}
                </div>
                {/* Upload / replace */}
                <label style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: doc.status === "missing" ? `linear-gradient(135deg, ${T.accent}, ${T.accent2})` : T.card, border: `1px solid ${doc.status === "missing" ? "none" : T.border}`, borderRadius: 9, cursor: "pointer", fontSize: 11, fontWeight: 700, color: doc.status === "missing" ? "#000" : T.textMid, whiteSpace: "nowrap", flexShrink: 0, boxShadow: doc.status === "missing" ? `0 4px 14px rgba(${T.rgb},.3)` : "none" }}>
                  <Ic.Upload s={12} c={doc.status === "missing" ? "#000" : T.textMid} />
                  {doc.status === "missing" ? "Upload" : "Replace"}
                  <input type="file" accept=".pdf,.jpg,.png" style={{ display: "none" }} onChange={() => setDocs(prev => prev.map(d => d.id === doc.id ? { ...d, status: "pending" } : d))} />
                </label>
              </div>

              {/* Expiry date input for time-sensitive docs */}
              {(doc.id === "wireman" || doc.id === "sessa" || doc.id === "insurance") && doc.status !== "missing" && (
                <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, color: T.sub, whiteSpace: "nowrap" }}>Expiry date:</span>
                  <input type="date" value={doc.expiry} onChange={e => setDocs(prev => prev.map(d => d.id === doc.id ? { ...d, expiry: e.target.value } : d))}
                    style={{ background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 8, padding: "5px 10px", color: T.text, fontSize: 12, fontFamily: B, outline: "none" }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20, padding: "14px 18px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, fontSize: 12, color: T.textMid, lineHeight: 1.7 }}>
        Documents are reviewed by the SolarIQ team within 24 hours. You'll receive an email and in-app notification when each document is verified. <strong style={{ color: T.text }}>Expired certificates automatically hide your profile from search.</strong>
      </div>
    </div>
  );
}

// ─── PROFILE EDITOR ───────────────────────────────────────────
function ProfileEditor({ installer, setInstaller }) {
  const sc = useScreen();
  const [form, setForm] = useState({
    name: installer?.name || "SunPower SA",
    about: installer?.about || "12 years installing solar across Gauteng. Specialise in hybrid systems for load shedding resilience.",
    phone: installer?.phone || "+27 82 000 0000",
    whatsapp: installer?.whatsapp || "+27 82 000 0000",
    email: installer?.email || "info@sunpowersa.co.za",
    website: installer?.website || "sunpowersa.co.za",
    city: installer?.city || "Johannesburg",
    province: installer?.province || "Gauteng",
    price_min: installer?.price_min || 80000,
    price_max: installer?.price_max || 200000,
    years_experience: installer?.years_experience || 12,
    jobs_completed: installer?.jobs_completed || 847,
    specialty: installer?.specialty || "Residential",
    response_hours: installer?.response_hours || 2,
    finance_available: installer?.finance_available || true,
    brands: installer?.brands || ["Sunsynk", "Victron"],
    specialties: installer?.specialties || ["Residential", "Hybrid"],
    provinces_served: installer?.provinces_served || ["Gauteng"],
  });

  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleArr = (key, val) => setForm(f => ({ ...f, [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val] }));

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      if (installer?.id) await sb.from("installers").update(form).eq("id", installer.id);
      setInstaller(prev => ({ ...prev, ...form }));
    } catch (e) { console.log(e); }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Live preview card
  const PreviewCard = () => (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: "18px", position: "sticky", top: 80 }}>
      <div style={{ fontSize: 11, color: T.accent, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 14, fontWeight: 700 }}>Live Preview</div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
        <div style={{ width: 46, height: 46, borderRadius: 12, background: `rgba(${T.rgb},.1)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic.User s={20} c={T.accent}/></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: H, fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 3 }}>{form.name || "Your Business Name"}</div>
          <div style={{ fontSize: 11, color: T.sub }}>{form.city}, {form.province} · {form.years_experience} yrs</div>
          <div style={{ display: "flex", gap: 5, marginTop: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 9, background: "rgba(52,211,153,.12)", color: T.green, padding: "2px 7px", borderRadius: 6, fontWeight: 700 }}>✓ SESSA</span>
            <span style={{ fontSize: 9, background: "rgba(96,165,250,.12)", color: T.blue, padding: "2px 7px", borderRadius: 6, fontWeight: 700 }}>✓ Verified</span>
            {form.finance_available && <span style={{ fontSize: 9, background: "rgba(167,139,250,.12)", color: T.purple, padding: "2px 7px", borderRadius: 6, fontWeight: 700 }}>Finance</span>}
          </div>
        </div>
      </div>
      {form.about && <p style={{ fontSize: 12, color: T.sub, lineHeight: 1.7, marginBottom: 12 }}>{form.about.slice(0, 120)}{form.about.length > 120 ? "..." : ""}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 12 }}>
        <div style={{ background: T.bg2, borderRadius: 8, padding: "8px" }}><div style={{ fontSize: 9, color: T.sub }}>RESPONSE</div><div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{form.response_hours < 24 ? `${form.response_hours} hrs` : "1 day"}</div></div>
        <div style={{ background: T.bg2, borderRadius: 8, padding: "8px" }}><div style={{ fontSize: 9, color: T.sub }}>PRICE</div><div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>R{(form.price_min / 1000).toFixed(0)}k–R{(form.price_max / 1000).toFixed(0)}k</div></div>
      </div>
      {form.brands.length > 0 && (
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {form.brands.slice(0, 4).map(b => <span key={b} style={{ fontSize: 10, background: T.bg2, color: T.textMid, padding: "3px 8px", borderRadius: 6 }}>{b}</span>)}
          {form.brands.length > 4 && <span style={{ fontSize: 10, color: T.sub }}>+{form.brands.length - 4}</span>}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: T.text }}>Profile Editor</div>
          <div style={{ fontSize: 12, color: T.sub, marginTop: 3 }}>Changes update your public listing in real time</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Btn onClick={save} loading={saving}>Save Profile</Btn>
          {saved && <span style={{ fontSize: 12, color: T.green, fontWeight: 600 }}>Profile saved</span>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "1.4fr 1fr" : "1fr", gap: 20, alignItems: "start" }}>
        {/* Edit form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card style={{ padding: "22px" }}>
            <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 18 }}>Business Information</div>
            <div style={{ display: "grid", gridTemplateColumns: sc.isMobile ? "1fr" : "1fr 1fr", gap: "0 16px" }}>
              <div style={{ gridColumn: sc.isMobile ? "1" : "1 / -1" }}><Inp label="Business Name" value={form.name} onChange={v => up("name", v)} /></div>
              <div style={{ gridColumn: sc.isMobile ? "1" : "1 / -1" }}><Inp label="About" value={form.about} onChange={v => up("about", v)} rows={3} /></div>
              <Inp label="Phone" value={form.phone} onChange={v => up("phone", v)} type="tel" />
              <Inp label="WhatsApp" value={form.whatsapp} onChange={v => up("whatsapp", v)} type="tel" />
              <Inp label="Email" value={form.email} onChange={v => up("email", v)} type="email" />
              <Inp label="Website" value={form.website} onChange={v => up("website", v)} />
              <Inp label="City" value={form.city} onChange={v => up("city", v)} />
              <div>
                <label style={{ fontSize: 11, color: T.sub, textTransform: "uppercase", letterSpacing: 1.6, display: "block", marginBottom: 6, fontWeight: 700 }}>Province</label>
                <select value={form.province} onChange={e => up("province", e.target.value)} style={{ width: "100%", background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "11px 14px", color: T.text, fontSize: 13, fontFamily: B, marginBottom: 14 }}>
                  {SA_PROVINCES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <Inp label="Years Experience" value={String(form.years_experience)} onChange={v => up("years_experience", parseInt(v) || 0)} type="number" />
              <Inp label="Jobs Completed" value={String(form.jobs_completed)} onChange={v => up("jobs_completed", parseInt(v) || 0)} type="number" />
              <div>
                <label style={{ fontSize: 11, color: T.sub, textTransform: "uppercase", letterSpacing: 1.6, display: "block", marginBottom: 6, fontWeight: 700 }}>Min Price (R)</label>
                <input type="number" value={form.price_min} onChange={e => up("price_min", parseInt(e.target.value) || 0)} style={{ width: "100%", background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "11px 14px", color: T.text, fontSize: 13, fontFamily: B, marginBottom: 14 }} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: T.sub, textTransform: "uppercase", letterSpacing: 1.6, display: "block", marginBottom: 6, fontWeight: 700 }}>Max Price (R)</label>
                <input type="number" value={form.price_max} onChange={e => up("price_max", parseInt(e.target.value) || 0)} style={{ width: "100%", background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "11px 14px", color: T.text, fontSize: 13, fontFamily: B, marginBottom: 14 }} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: T.sub, textTransform: "uppercase", letterSpacing: 1.6, display: "block", marginBottom: 6, fontWeight: 700 }}>Response Time</label>
                <select value={form.response_hours} onChange={e => up("response_hours", parseInt(e.target.value))} style={{ width: "100%", background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "11px 14px", color: T.text, fontSize: 13, fontFamily: B, marginBottom: 14 }}>
                  {[1, 2, 4, 8, 12, 24].map(h => <option key={h} value={h}>{h < 24 ? `${h} hrs` : "1 day"}</option>)}
                </select>
              </div>
            </div>
            <Toggle value={form.finance_available} onChange={v => up("finance_available", v)} label="Finance / Rent-to-own available" />
          </Card>

          <Card style={{ padding: "22px" }}>
            <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 16 }}>Brands & Specialities</div>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, color: T.sub, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10, fontWeight: 700 }}>Brands</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {BRANDS_LIST.map(b => { const a = form.brands.includes(b); return <div key={b} onClick={() => toggleArr("brands", b)} style={{ padding: "6px 13px", borderRadius: 20, border: `1px solid ${a ? `rgba(${T.rgb},.4)` : T.border}`, background: a ? T.accentDim : T.card, cursor: "pointer", fontSize: 12, fontWeight: a ? 700 : 400, color: a ? T.accent : T.textMid, transition: "all .18s" }}>{b}</div>; })}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: T.sub, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10, fontWeight: 700 }}>Specialities</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {SPECS_LIST.map(s => { const a = form.specialties.includes(s); return <div key={s} onClick={() => toggleArr("specialties", s)} style={{ padding: "6px 13px", borderRadius: 20, border: `1px solid ${a ? "rgba(96,165,250,.4)" : T.border}`, background: a ? "rgba(96,165,250,.1)" : T.card, cursor: "pointer", fontSize: 12, fontWeight: a ? 700 : 400, color: a ? T.blue : T.textMid, transition: "all .18s" }}>{s}</div>; })}
              </div>
            </div>
          </Card>

          <Card style={{ padding: "22px" }}>
            <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 16 }}>Service Areas</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 7 }}>
              {SA_PROVINCES.map(p => { const a = form.provinces_served.includes(p); return <div key={p} onClick={() => toggleArr("provinces_served", p)} style={{ padding: "8px 10px", borderRadius: 9, border: `1px solid ${a ? `rgba(${T.rgb},.4)` : T.border}`, background: a ? T.accentDim : T.card, cursor: "pointer", fontSize: 11, fontWeight: a ? 700 : 400, color: a ? T.accent : T.textMid, transition: "all .18s", display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${a ? T.accent : T.sub}`, background: a ? T.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {a && <Ic.Check s={8} c="#000" />}
                </div>
                {p}
              </div>; })}
            </div>
          </Card>
        </div>

        {/* Preview */}
        {sc.isDesktop && <PreviewCard />}
      </div>
    </div>
  );
}

// ─── PERFORMANCE DASHBOARD ────────────────────────────────────
function PerformanceDashboard({ leads, installer }) {
  const sc = useScreen();

  const total = leads.length;
  const converted = leads.filter(l => l.status === "converted").length;
  const convRate = total > 0 ? Math.round((converted / total) * 100) : 0;
  const newLeads = leads.filter(l => l.status === "new").length;
  const avgResponse = 1.8; // mock hours

  const thisMonth = leads.filter(l => {
    const d = new Date(l.created_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const statCards = [
    { label: "Total Leads", value: total, color: T.accent, icon: "list", delta: `+${thisMonth} this month` },
    { label: "Converted", value: converted, color: T.green, icon: "trophy", delta: `${convRate}% conversion` },
    { label: "Avg Response", value: `${avgResponse}h`, color: avgResponse <= 2 ? T.green : avgResponse <= 4 ? T.orange : T.red, icon: "zap", delta: avgResponse <= 2 ? "Excellent" : "Needs improvement" },
    { label: "Profile Views", value: "147", color: T.blue, icon: "eye", delta: "+18% this week" },
    { label: "Rating", value: `${installer?.rating || 4.9}`, color: T.accent, icon: "star", delta: `${installer?.review_count || 312} reviews` },
    { label: "Province Rank", value: "#2", color: T.purple, icon: "medal", delta: "in Gauteng" },
  ];

  // Lead pipeline funnel data
  const funnelData = [
    { stage: "New", count: leads.filter(l => l.status === "new").length, color: T.accent },
    { stage: "Contacted", count: leads.filter(l => l.status === "contacted").length, color: T.blue },
    { stage: "Site Visit", count: leads.filter(l => l.status === "site_visit").length, color: T.purple },
    { stage: "Quote Sent", count: leads.filter(l => l.status === "quote_sent").length, color: T.orange },
    { stage: "Converted", count: leads.filter(l => l.status === "converted").length, color: T.green },
  ];
  const maxFunnel = Math.max(...funnelData.map(f => f.count), 1);

  // Revenue estimate
  const avgDeal = leads.reduce((s, l) => s + (l.estimated_cost || 0), 0) / (total || 1);
  const estimatedRevenue = converted * avgDeal;

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: T.text, marginBottom: 4 }}>Performance</div>
        <div style={{ fontSize: 12, color: T.sub }}>Your SolarIQ analytics — all time</div>
      </div>

      {/* Stat grid */}
      <div style={{ display: "grid", gridTemplateColumns: sc.isMobile ? "1fr 1fr" : sc.isTablet ? "repeat(3, 1fr)" : "repeat(6, 1fr)", gap: 10, marginBottom: 20 }}>
        {statCards.map((s, i) => {
          const IconMap = { list: Ic.FileText, trophy: Ic.Trophy, zap: Ic.Zap, eye: Ic.Eye, star: Ic.Star, medal: Ic.Trophy, chart: Ic.Chart };
          const IcComp = IconMap[s.icon] || Ic.Chart;
          return (
            <div key={s.label} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "16px", animation: `fadeUp .3s ease ${i * .06}s both`, overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
              <div style={{ marginBottom: 10 }}><IcComp s={18} c={s.color}/></div>
              <div style={{ fontFamily: H, fontSize: 26, fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: T.sub, marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: 10, color: T.textMid, fontWeight: 600 }}>{s.delta}</div>
            </div>
          );
        })}
      </div>

      {/* Revenue + Funnel row */}
      <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "1fr 1.2fr" : "1fr", gap: 14, marginBottom: 14 }}>
        {/* Revenue card */}
        <Card style={{ padding: "22px" }}>
          <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 18 }}>Revenue Estimate</div>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontFamily: H, fontSize: 42, fontWeight: 900, color: T.green, lineHeight: 1, marginBottom: 6 }}>
              R{(estimatedRevenue / 1000).toFixed(0)}k
            </div>
            <div style={{ fontSize: 13, color: T.sub, marginBottom: 20 }}>from {converted} converted leads</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
              {[["Avg deal", `R${(avgDeal / 1000).toFixed(0)}k`, T.accent], ["Conv. rate", `${convRate}%`, T.blue], ["Total leads", total, T.purple]].map(([l, v, c]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: H, fontSize: 18, fontWeight: 800, color: c }}>{v}</div>
                  <div style={{ fontSize: 10, color: T.sub, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Lead funnel */}
        <Card style={{ padding: "22px" }}>
          <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 18 }}>Lead Pipeline</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {funnelData.map(f => (
              <div key={f.stage} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12, color: T.textMid, width: 72, flexShrink: 0 }}>{f.stage}</span>
                <div style={{ flex: 1, height: 8, background: T.bg2, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${(f.count / maxFunnel) * 100}%`, height: "100%", background: f.color, borderRadius: 4, transition: "width 1.2s ease", boxShadow: `0 0 6px ${f.color}50` }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color: f.color, width: 24, textAlign: "right", flexShrink: 0 }}>{f.count}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: "10px 14px", background: T.bg2, borderRadius: 9, fontSize: 12, color: T.textMid, lineHeight: 1.6 }}>
            <strong style={{ color: T.text }}>Pro tip:</strong> Installers who respond within 2 hours close <strong style={{ color: T.accent }}>4× more deals</strong>.
          </div>
        </Card>
      </div>

      {/* Ranking + Reviews */}
      <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "1fr 1.5fr" : "1fr", gap: 14 }}>
        {/* Province ranking */}
        <Card style={{ padding: "22px", background: "rgba(167,139,250,.04)", border: "1px solid rgba(167,139,250,.15)" }}>
          <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 18 }}>Province Ranking</div>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 72, height: 72, borderRadius: "50%", background: "rgba(167,139,250,.1)", border: "2px solid rgba(167,139,250,.4)", fontFamily: H, fontSize: 32, fontWeight: 900, color: T.purple, marginBottom: 8, boxShadow: "0 0 20px rgba(167,139,250,.2)" }}>#2</div>
            <div style={{ fontFamily: H, fontSize: 16, fontWeight: 700, color: T.text }}>in Gauteng</div>
            <div style={{ fontSize: 12, color: T.sub, marginTop: 3 }}>out of 24 verified installers</div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: T.sub }}>Distance to #1</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.purple }}>3 more conversions</span>
            </div>
            <div style={{ height: 6, background: T.bg2, borderRadius: 3 }}>
              <div style={{ width: "82%", height: "100%", background: `linear-gradient(90deg, ${T.purple}, #60a5fa)`, borderRadius: 3, boxShadow: "0 0 8px rgba(167,139,250,.4)" }} />
            </div>
          </div>
          <div style={{ padding: "10px 14px", background: "rgba(167,139,250,.06)", borderRadius: 9, fontSize: 12, color: T.textMid }}>
            <Ic.Trophy s={12} c={T.purple} /> Convert 3 more leads to claim the #1 spot
          </div>
        </Card>

        {/* Recent reviews */}
        <Card style={{ padding: "22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontFamily: H, fontSize: 14, fontWeight: 800, color: T.text }}>Recent Reviews</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: T.accent }}>{installer?.rating || 4.9}</span>
              <div>
                <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(n => <Ic.Star key={n} s={12} c={T.accent} fill={n <= Math.floor(installer?.rating || 4.9) ? T.accent : "none"} />)}</div>
                <div style={{ fontSize: 10, color: T.sub }}>{installer?.review_count || 312} reviews</div>
              </div>
            </div>
          </div>
          {[
            { name: "Sipho D.", rating: 5, text: "Exceptional service. Showed up on time, clean installation, explained everything. Highly recommend.", date: "2 days ago" },
            { name: "Priya M.", rating: 5, text: "Best solar company in Gauteng. System performing above expectations 3 months later.", date: "1 week ago" },
            { name: "Johan V.", rating: 4, text: "Professional team, good quality work. Minor delay in starting but communicated well throughout.", date: "2 weeks ago" },
          ].map((r, i) => (
            <div key={i} style={{ padding: "12px 0", borderBottom: i < 2 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `rgba(${T.rgb},.1)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, fontFamily: H, color: T.accent }}>{r.name[0]}</div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{r.name}</span>
                </div>
                <div style={{ display: "flex", gap: 1 }}>{[1,2,3,4,5].map(n => <Ic.Star key={n} s={10} c={T.accent} fill={n <= r.rating ? T.accent : "none"} />)}</div>
              </div>
              <div style={{ fontSize: 12, color: T.textMid, lineHeight: 1.6, marginBottom: 4 }}>{r.text}</div>
              <div style={{ fontSize: 10, color: T.sub }}>{r.date}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── QUOTE BUILDER ────────────────────────────────────────────
function QuoteBuilder({ leads }) {
  const sc = useScreen();
  const [selectedLead, setSelectedLead] = useState(null);
  const [items, setItems] = useState([
    { id: 1, desc: "Sunsynk 5kW Hybrid Inverter", qty: 1, unit: 28500 },
    { id: 2, desc: "JA Solar 550Wp Panels", qty: 8, unit: 2800 },
    { id: 3, desc: "Pylontech US3000C 3.5kWh Battery", qty: 2, unit: 16000 },
    { id: 4, desc: "Mounting structure + cabling", qty: 1, unit: 8500 },
    { id: 5, desc: "Installation & commissioning", qty: 1, unit: 12000 },
  ]);
  const [margin, setMargin] = useState(18);
  const [validDays, setValidDays] = useState(14);
  const [notes, setNotes] = useState("This quote includes all materials, labour, and a 5-year workmanship warranty. System will be commissioned and tested before handover.");
  const [generated, setGenerated] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.qty * i.unit, 0);
  const marginAmt = Math.round(subtotal * (margin / 100));
  const total = subtotal + marginAmt;
  const validUntil = new Date(Date.now() + validDays * 86400000).toLocaleDateString("en-ZA");

  const updateItem = (id, field, val) => setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: field === "desc" ? val : parseFloat(val) || 0 } : i));
  const removeItem = id => setItems(prev => prev.filter(i => i.id !== id));
  const addItem = () => setItems(prev => [...prev, { id: Date.now(), desc: "", qty: 1, unit: 0 }]);

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: H, fontSize: 22, fontWeight: 900, color: T.text, marginBottom: 4 }}>Quote Builder</div>
        <div style={{ fontSize: 12, color: T.sub }}>Generate a branded quote PDF from a lead's system specs</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: sc.isDesktop ? "1.2fr 1fr" : "1fr", gap: 16, alignItems: "start" }}>
        {/* Left: form */}
        <div>
          {/* Link to lead */}
          <Card style={{ padding: "18px", marginBottom: 14 }}>
            <div style={{ fontFamily: H, fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 12 }}>Link to Lead (optional)</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {leads.slice(0, 4).map(l => (
                <div key={l.id} onClick={() => setSelectedLead(selectedLead?.id === l.id ? null : l)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: `1px solid ${selectedLead?.id === l.id ? `rgba(${T.rgb},.4)` : T.border}`, background: selectedLead?.id === l.id ? T.accentDim : T.card, cursor: "pointer", transition: "all .18s" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: selectedLead?.id === l.id ? T.accent : T.sub, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: selectedLead?.id === l.id ? 700 : 400, color: selectedLead?.id === l.id ? T.accent : T.textMid, flex: 1 }}>{l.name}</span>
                  <span style={{ fontSize: 11, color: T.sub }}>{l.system_kw}kW · R{l.estimated_cost.toLocaleString()}</span>
                </div>
              ))}
            </div>
            {selectedLead && (
              <div style={{ marginTop: 10, padding: "10px 13px", background: T.bg2, borderRadius: 9, fontSize: 12, color: T.textMid }}>
                Pre-filling with {selectedLead.name}'s system: {selectedLead.system_kw}kW, {selectedLead.battery_kwh}kWh, {selectedLead.panels} panels
              </div>
            )}
          </Card>

          {/* Line items */}
          <Card style={{ padding: "18px", marginBottom: 14 }}>
            <div style={{ fontFamily: H, fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 14 }}>Line Items</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {items.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input value={item.desc} onChange={e => updateItem(item.id, "desc", e.target.value)} placeholder="Item description" style={{ flex: 1, background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 8, padding: "8px 11px", color: T.text, fontSize: 12, fontFamily: B, outline: "none" }} />
                  <input value={item.qty} onChange={e => updateItem(item.id, "qty", e.target.value)} type="number" min="1" style={{ width: 52, background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 8, padding: "8px", color: T.text, fontSize: 12, fontFamily: B, outline: "none", textAlign: "center" }} />
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: T.sub }}>R</span>
                    <input value={item.unit} onChange={e => updateItem(item.id, "unit", e.target.value)} type="number" style={{ width: 90, background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 8, padding: "8px 8px 8px 20px", color: T.text, fontSize: 12, fontFamily: B, outline: "none" }} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.accent, width: 72, textAlign: "right", flexShrink: 0 }}>R{(item.qty * item.unit).toLocaleString()}</div>
                  <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: T.sub, padding: 4, display: "flex" }}><Ic.X s={13} c={T.sub} /></button>
                </div>
              ))}
            </div>
            <button onClick={addItem} style={{ marginTop: 10, background: "none", border: `1px dashed rgba(${T.rgb},.25)`, borderRadius: 8, padding: "8px 14px", color: T.accent, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: B, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Ic.Plus s={12} c={T.accent} /> Add Item
            </button>
          </Card>

          {/* Margin + notes */}
          <Card style={{ padding: "18px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 11, color: T.sub, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 6, fontWeight: 700 }}>Your Margin (%)</label>
                <input type="number" value={margin} onChange={e => setMargin(parseFloat(e.target.value) || 0)} style={{ width: "100%", background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 9, padding: "10px 13px", color: T.accent, fontSize: 16, fontWeight: 800, fontFamily: H, outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: T.sub, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 6, fontWeight: 700 }}>Valid for (days)</label>
                <input type="number" value={validDays} onChange={e => setValidDays(parseInt(e.target.value) || 14)} style={{ width: "100%", background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 9, padding: "10px 13px", color: T.text, fontSize: 14, fontFamily: B, outline: "none" }} />
              </div>
            </div>
            <Inp label="Terms & Notes" value={notes} onChange={setNotes} rows={3} />
          </Card>
        </div>

        {/* Right: live quote preview */}
        <div style={{ position: sc.isDesktop ? "sticky" : "static", top: 80 }}>
          <Card style={{ padding: "24px", background: "rgba(245,166,35,.03)", border: `1px solid rgba(${T.rgb},.15)` }}>
            {/* Quote header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${T.border}` }}>
              <div>
                <div style={{ fontFamily: H, fontSize: 18, fontWeight: 900, color: T.text, marginBottom: 2 }}>SolarIQ Quote</div>
                <div style={{ fontSize: 11, color: T.sub }}>Ref: SIQ-{Date.now().toString().slice(-6)}</div>
                <div style={{ fontSize: 11, color: T.sub }}>Valid until: {validUntil}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginBottom: 4 }}>
                  <Ic.Logo s={22}/>
                </div>
                <div style={{ fontSize: 9, color: T.sub, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>SolarIQ Verified</div>
              </div>
            </div>

            {/* Client info */}
            {selectedLead && (
              <div style={{ marginBottom: 16, padding: "10px 13px", background: T.bg2, borderRadius: 9 }}>
                <div style={{ fontSize: 11, color: T.sub, marginBottom: 4, textTransform: "uppercase", letterSpacing: .8 }}>Prepared for</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{selectedLead.name}</div>
                <div style={{ fontSize: 11, color: T.sub }}>{selectedLead.area} · {selectedLead.system_kw}kW system</div>
              </div>
            )}

            {/* Line items */}
            <div style={{ marginBottom: 16 }}>
              {items.filter(i => i.desc).map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${T.border}` }}>
                  <div>
                    <div style={{ fontSize: 12, color: T.text }}>{item.desc}</div>
                    <div style={{ fontSize: 10, color: T.sub }}>Qty: {item.qty} × R{item.unit.toLocaleString()}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text, flexShrink: 0 }}>R{(item.qty * item.unit).toLocaleString()}</div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ marginBottom: 18 }}>
              {[["Subtotal", subtotal, T.textMid], [`Margin (${margin}%)`, marginAmt, T.sub]].map(([l, v, c]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                  <span style={{ fontSize: 12, color: c }}>{l}</span>
                  <span style={{ fontSize: 12, color: c }}>R{v.toLocaleString()}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", borderTop: `1px solid ${T.border}`, marginTop: 6 }}>
                <span style={{ fontFamily: H, fontSize: 16, fontWeight: 900, color: T.text }}>Total Investment</span>
                <span style={{ fontFamily: H, fontSize: 20, fontWeight: 900, color: T.accent }}>R{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Savings */}
            {selectedLead && (
              <div style={{ padding: "12px 14px", background: "rgba(52,211,153,.07)", border: "1px solid rgba(52,211,153,.15)", borderRadius: 10, marginBottom: 18 }}>
                <div style={{ fontSize: 11, color: T.green, fontWeight: 700, marginBottom: 4 }}>ROI for {selectedLead.name.split(" ")[0]}</div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <div><div style={{ fontFamily: H, fontSize: 16, fontWeight: 800, color: T.green }}>R{Math.round(selectedLead.monthly_bill * 0.75).toLocaleString()}/mo</div><div style={{ fontSize: 10, color: T.sub }}>estimated savings</div></div>
                  <div><div style={{ fontFamily: H, fontSize: 16, fontWeight: 800, color: T.accent }}>{(total / (selectedLead.monthly_bill * 0.75 * 12)).toFixed(1)} yrs</div><div style={{ fontSize: 10, color: T.sub }}>payback period</div></div>
                </div>
              </div>
            )}

            {notes && <div style={{ fontSize: 11, color: T.sub, lineHeight: 1.7, marginBottom: 18, padding: "10px 13px", background: T.bg2, borderRadius: 9 }}>{notes}</div>}

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Btn full onClick={() => setGenerated(true)} loading={false}>
                <Ic.Doc s={13} c="#000" /> Generate PDF Quote
              </Btn>
              {generated && (
                <div style={{ animation: "fadeUp .3s ease" }}>
                  <Btn full variant="ghost" onClick={() => { const m = encodeURIComponent(`Hi${selectedLead ? " " + selectedLead.name.split(" ")[0] : ""}, your SolarIQ solar quote is ready. Total investment: R${total.toLocaleString()}. Valid until ${validUntil}. Please reply to discuss or schedule a site visit.`); window.open(`https://wa.me/${selectedLead?.phone?.replace(/\s/g, "") || ""}?text=${m}`, "_blank"); }} style={{ background: "rgba(37,211,102,.1)", border: "1px solid rgba(37,211,102,.25)", color: "#25d366" }}>
                    Send via WhatsApp
                  </Btn>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR NAV ─────────────────────────────────────────────
const NAV = [
  { id: "leads",       label: "Lead Inbox",    Icon: Ic.Inbox,  badge: true },
  { id: "quotes",      label: "Quote Builder", Icon: Ic.Quote,  badge: false },
  { id: "credentials", label: "Credentials",   Icon: Ic.Shield, badge: false },
  { id: "profile",     label: "My Profile",    Icon: Ic.User,   badge: false },
  { id: "performance", label: "Performance",   Icon: Ic.Chart,  badge: false },
];


// ─── SIDEBAR ─────────────────────────────────────────────────
const NAV_ITEMS=[
  {id:"leads",       label:"Lead Inbox",    Icon:Ic.Inbox,    badge:true},
  {id:"quotes",      label:"Quote Builder", Icon:Ic.Receipt,  badge:false},
  {id:"credentials", label:"Credentials",   Icon:Ic.Shield,   badge:false},
  {id:"profile",     label:"My Profile",    Icon:Ic.User,     badge:false},
  {id:"performance", label:"Performance",   Icon:Ic.Chart,    badge:false},
];

function InstallerSidebar({tab,setTab,installer,onSignOut,newLeads}){
  return(
    <div style={{width:T.navW,background:T.nav,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",position:"fixed",top:0,bottom:0,left:0,zIndex:300,overflow:"hidden"}}>
      <div style={{padding:"18px 18px 14px",borderBottom:`1px solid ${T.border}`,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <Ic.Logo s={34}/>
          <div>
            <div style={{fontFamily:H,fontSize:17,fontWeight:900,color:T.text}}>Solar<span style={{color:T.accent}}>IQ</span></div>
            <div style={{fontSize:9,color:T.sub,letterSpacing:2,textTransform:"uppercase",marginTop:1}}>Installer Portal</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:T.card,border:`1px solid ${T.border}`,borderRadius:11}}>
          <div style={{width:34,height:34,borderRadius:10,background:T.accentDim,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:H,fontSize:14,fontWeight:900,color:T.accent,flexShrink:0}}>
            {(installer?.name||"I")[0].toUpperCase()}
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12,fontWeight:700,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{installer?.name||"My Business"}</div>
            <div style={{fontSize:10,color:T.sub}}>{installer?.city||"—"}</div>
          </div>
          <div style={{width:7,height:7,borderRadius:"50%",background:T.green,flexShrink:0,animation:"pulse 2s infinite"}}/>
        </div>
      </div>

      <nav style={{flex:1,padding:"10px 8px",overflowY:"auto"}}>
        {NAV_ITEMS.map(n=>{
          const active=tab===n.id;
          const badge=n.badge?newLeads:0;
          return(
            <button key={n.id} onClick={()=>setTab(n.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,border:`1px solid ${active?`rgba(${T.rgb},.2)`:"transparent"}`,marginBottom:3,background:active?T.accentDim:"transparent",color:active?T.accent:T.sub,cursor:"pointer",transition:"all .18s",fontFamily:B,textAlign:"left",position:"relative"}}
              onMouseEnter={e=>{if(!active){e.currentTarget.style.background=T.card;e.currentTarget.style.color=T.textMid;}}}
              onMouseLeave={e=>{if(!active){e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.sub;}}}>
              <n.Icon s={17} c={active?T.accent:"currentColor"}/>
              <span style={{fontSize:13,fontWeight:active?700:500,flex:1}}>{n.label}</span>
              {badge>0&&<span style={{background:`linear-gradient(135deg,${T.accent},${T.accent2})`,color:"#000",borderRadius:"50%",width:18,height:18,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,boxShadow:`0 0 8px rgba(${T.rgb},.4)`,animation:"glow 2s ease infinite"}}>{badge}</span>}
            </button>
          );
        })}
      </nav>

      <div style={{padding:"10px 10px",borderTop:`1px solid ${T.border}`,flexShrink:0,display:"flex",gap:8}}>
        <a href={`${window.location.origin}?preview=solariq2026`} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",gap:6,padding:"8px 10px",background:T.card,border:`1px solid ${T.border}`,borderRadius:9,textDecoration:"none",fontSize:11,color:T.sub,fontWeight:600,fontFamily:B}}>
          <Ic.Eye s={12} c={T.sub}/> View Listing
        </a>
        <button onClick={onSignOut} style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"8px 10px",background:T.card,border:`1px solid ${T.border}`,borderRadius:9,cursor:"pointer",color:T.sub}}>
          <Ic.Out s={14} c={T.sub}/>
        </button>
      </div>
    </div>
  );
}

function MobileBottomNav({tab,setTab,newLeads}){
  return(
    <div style={{position:"fixed",bottom:0,left:0,right:0,background:T.nav,borderTop:`1px solid ${T.border}`,display:"flex",zIndex:200,backdropFilter:"blur(20px)"}}>
      {NAV_ITEMS.map(n=>(
        <button key={n.id} onClick={()=>setTab(n.id)} style={{flex:1,background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 4px",cursor:"pointer",gap:3,position:"relative"}}>
          <n.Icon s={18} c={tab===n.id?T.accent:T.sub}/>
          <span style={{fontSize:9,fontWeight:600,color:tab===n.id?T.accent:T.sub,fontFamily:B}}>{n.label.split(" ")[0]}</span>
          {n.badge&&newLeads>0&&<span style={{position:"absolute",top:4,right:"50%",marginRight:-16,background:T.accent,color:"#000",borderRadius:"50%",width:14,height:14,fontSize:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>{newLeads}</span>}
        </button>
      ))}
    </div>
  );
}

// ─── BOOTING SCREEN ──────────────────────────────────────────
function BootScreen(){
  return(
    <>
      <style>{CSS}</style>
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:20,background:T.bg}}>
        <div style={{position:"relative"}}>
          <Ic.Logo s={52}/>
          <div style={{position:"absolute",inset:-8,borderRadius:"50%",border:`1px solid rgba(${T.rgb},.2)`,animation:"spin 3s linear infinite"}}/>
        </div>
        <div style={{fontFamily:H,fontSize:18,fontWeight:700,color:T.text}}>Solar<span style={{color:T.accent}}>IQ</span></div>
        <Spinner s={18}/>
        <div style={{fontSize:12,color:T.sub,letterSpacing:.5}}>Loading portal...</div>
      </div>
    </>
  );
}

// ─── MAIN INSTALLER APP ──────────────────────────────────────
// appState machine: "booting" → "auth" → "onboarding" → "ready"
// All state transitions happen in one place — no race conditions.
export default function Installer(){
  const [appState,setAppState]=useState("booting");
  const [session,setSession]=useState(null);
  const [installer,setInstaller]=useState(null);
  const [leads,setLeads]=useState(MOCK_LEADS);
  const [tab,setTab]=useState("leads");
  const sc=useScreen();

  // loadProfile is defined OUTSIDE useEffect to avoid stale closure
  const loadProfile=useCallback(async(s)=>{
    if(!s?.user?.id)return;
    try{
      const {data,error}=await sb.from("installers").select("*").eq("user_id",s.user.id).maybeSingle();
      if(data&&!error){
        setInstaller(data);
        // Fetch this installer's real leads
        const {data:lData}=await sb.from("leads").select("*").order("created_at",{ascending:false});
        if(lData&&lData.length>0)setLeads(lData);
        setAppState("ready");
      } else {
        setAppState("onboarding");
      }
    } catch(e){
      console.warn("Profile load:",e?.message);
      setAppState("onboarding");
    }
  },[]);

  useEffect(()=>{
    let mounted=true;
    sb.auth.getSession().then(({data:{session:s}})=>{
      if(!mounted)return;
      if(s){setSession(s);loadProfile(s);}
      else setAppState("auth");
    });
    const {data:{subscription}}=sb.auth.onAuthStateChange((event,s)=>{
      if(!mounted)return;
      if(!s){setSession(null);setInstaller(null);setAppState("auth");return;}
      setSession(s);
      if(event==="SIGNED_IN"){loadProfile(s);}
    });
    return ()=>{mounted=false;subscription.unsubscribe();};
  },[loadProfile]);

  const signOut=async()=>{
    await sb.auth.signOut();
    setSession(null);setInstaller(null);setLeads(MOCK_LEADS);setAppState("auth");
  };

  const onAuth=useCallback(async(s)=>{
    if(s){setSession(s);await loadProfile(s);}
    else{
      const {data:{session:freshS}}=await sb.auth.getSession();
      if(freshS){setSession(freshS);await loadProfile(freshS);}
    }
  },[loadProfile]);

  const completeOnboarding=async(formData)=>{
    if(!session?.user?.id)throw new Error("No session");
    const payload={
      user_id:session.user.id,
      name:formData.name.trim(),
      city:formData.city.trim(),
      province:formData.province,
      about:formData.about||"",
      phone:formData.phone.trim(),
      whatsapp:formData.whatsapp||formData.phone,
      email:formData.email||session.user.email,
      website:formData.website||"",
      price_min:parseInt(formData.price_min)||null,
      price_max:parseInt(formData.price_max)||null,
      years_experience:parseInt(formData.years_experience)||1,
      specialty:(formData.install_specs||[]).join(", ")||(formData.businessType==="technician"?"Repair & Maintenance":"Residential"),
      brands:formData.brands||[],
      response_hours:parseInt(formData.response_hours)||24,
      finance_available:!!formData.finance_available,
      status:"pending",
    };
    const {data:inst,error}=await sb.from("installers").insert(payload).select().single();
    if(error){
      console.error("Insert error:",error);
      throw error;
    }
    setInstaller(inst);
    setAppState("ready");
  };

  const newLeads=leads.filter(l=>l.status==="new").length;

  // ── Render by state ──────────────────────────────────────
  if(appState==="booting")return <BootScreen/>;

  if(appState==="auth")return <InstallerAuth onAuth={onAuth}/>;

  if(appState==="onboarding")return <OnboardingWizard installer={installer} onComplete={completeOnboarding}/>;

  // ── READY ────────────────────────────────────────────────
  const PAGES={
    leads:       <LeadInbox leads={leads} setLeads={setLeads}/>,
    quotes:      <QuoteBuilder leads={leads}/>,
    credentials: <CredentialsVault installer={installer}/>,
    profile:     <ProfileEditor installer={installer} setInstaller={setInstaller}/>,
    performance: <PerformanceDashboard leads={leads} installer={installer}/>,
  };

  return(
    <>
      <style>{CSS}</style>
      <div style={{display:"flex",minHeight:"100vh",background:T.bg}}>
        {!sc.isMobile&&<InstallerSidebar tab={tab} setTab={setTab} installer={installer} onSignOut={signOut} newLeads={newLeads}/>}

        <div style={{flex:1,marginLeft:sc.isMobile?0:T.navW,minWidth:0,minHeight:"100vh",paddingBottom:sc.isMobile?80:0,transition:"margin-left .25s"}}>
          {/* Top bar */}
          <div style={{position:"sticky",top:0,zIndex:100,background:T.nav,borderBottom:`1px solid ${T.border}`,backdropFilter:"blur(20px)",height:54,display:"flex",alignItems:"center",padding:"0 28px",gap:12}}>
            {sc.isMobile&&(
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <Ic.Logo s={26}/>
                <span style={{fontFamily:H,fontSize:16,fontWeight:900,color:T.text}}>Solar<span style={{color:T.accent}}>IQ</span></span>
              </div>
            )}
            <div style={{flex:1}}/>
            {installer?.status==="pending"&&(
              <div style={{display:"flex",alignItems:"center",gap:6,padding:"5px 13px",background:`rgba(${T.rgb},.08)`,border:`1px solid rgba(${T.rgb},.2)`,borderRadius:20}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:T.accent,animation:"pulse 2s infinite"}}/>
                <span style={{fontSize:11,color:T.accent,fontWeight:700}}>Pending Review</span>
              </div>
            )}
            {installer?.status==="approved"&&(
              <div style={{display:"flex",alignItems:"center",gap:6,padding:"5px 13px",background:"rgba(52,211,153,.08)",border:"1px solid rgba(52,211,153,.2)",borderRadius:20}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:T.green,animation:"pulse 2s infinite"}}/>
                <span style={{fontSize:11,color:T.green,fontWeight:700}}>Verified and Live</span>
              </div>
            )}
            {!sc.isMobile&&(
              <button onClick={signOut} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 14px",background:T.card,border:`1px solid ${T.border}`,borderRadius:9,cursor:"pointer",color:T.sub,fontSize:12,fontWeight:600,fontFamily:B}}>
                <Ic.Out s={13} c={T.sub}/> Sign Out
              </button>
            )}
          </div>

          <div style={{padding:sc.isMobile?"16px 14px":sc.isTablet?"24px 28px":"30px 40px",maxWidth:1440,margin:"0 auto"}}>
            {PAGES[tab]||PAGES.leads}
          </div>
        </div>

        {sc.isMobile&&<MobileBottomNav tab={tab} setTab={setTab} newLeads={newLeads}/>}
      </div>
    </>
  );
}

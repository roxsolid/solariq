import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://intvnxvannltfibguykw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHZueHZhbm5sdGZpYmd1eWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzAwNjgsImV4cCI6MjA5MDA0NjA2OH0.KnPP0-vxXyBYTvHxbXfrH8AKd61u1hWpEO2gpjWnzNE";
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);
const H="'Lexend',sans-serif", B="'Plus Jakarta Sans',sans-serif";

const DARK={dark:true,bg:"#07090d",bg2:"#0b0e14",card:"rgba(255,255,255,.04)",card2:"rgba(255,255,255,.07)",border:"rgba(255,255,255,.08)",borderHover:"rgba(255,255,255,.16)",accent:"#f5a623",accent2:"#ff6b00",rgb:"245,166,35",text:"#f0f0f0",textMid:"#aaa",sub:"#4a4a5a",green:"#4ade80",red:"#f87171",blue:"#60a5fa",purple:"#c084fc",teal:"#2dd4bf",nav:"rgba(7,9,13,.97)"};
const LIGHT={dark:false,bg:"#f0ede4",bg2:"#e8e4d9",card:"rgba(0,0,0,.04)",card2:"rgba(0,0,0,.07)",border:"rgba(0,0,0,.1)",borderHover:"rgba(0,0,0,.2)",accent:"#c47a0a",accent2:"#a05e00",rgb:"196,122,10",text:"#0f0f0f",textMid:"#333",sub:"#888",green:"#16a34a",red:"#dc2626",blue:"#2563eb",purple:"#9333ea",teal:"#0d9488",nav:"rgba(240,237,228,.97)"};
const SW=240, SC=60;

function useScreen(){
  const[w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{const fn=()=>setW(window.innerWidth);window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn);},[]);
  return{w,isMobile:w<768,isTablet:w>=768&&w<1100,isDesktop:w>=1100};
}

const mkCss=t=>`
  @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{width:100%;min-height:100vh;background:${t.bg};color:${t.text};font-family:${B};overflow-x:hidden;transition:background .3s,color .3s}
  ::-webkit-scrollbar{width:3px;height:3px}::-webkit-scrollbar-thumb{background:rgba(${t.rgb},.35);border-radius:4px}
  input,textarea,select,button{outline:none;font-family:${B};transition:border-color .2s}
  input::placeholder,textarea::placeholder{color:${t.sub}}
  select option{background:${t.dark?"#111":"#f5f2eb"};color:${t.text}}
  input:focus,textarea:focus,select:focus{border-color:rgba(${t.rgb},.5)!important;box-shadow:0 0 0 3px rgba(${t.rgb},.07)}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.2}}
  @keyframes particle{0%,100%{transform:translateY(0) scale(1);opacity:.1}50%{transform:translateY(-20px) scale(1.5);opacity:.45}}
  @keyframes slideIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
  @keyframes popIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
  .nav-item{transition:all .18s cubic-bezier(.4,0,.2,1)}
  .nav-item:hover{background:rgba(${t.rgb},.07)!important}
  .lift{transition:transform .2s,box-shadow .2s,border-color .2s}
  .lift:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.18);border-color:${t.borderHover}!important}
  .rh{transition:background .15s}.rh:hover{background:rgba(${t.rgb},.04)!important}
  .tbtn{transition:all .18s;border-radius:8px;border:none;cursor:pointer;font-family:${B};font-weight:600;font-size:12px}
  .tbtn:hover{background:rgba(${t.rgb},.08)!important;color:${t.accent}!important}
`;

const Ic={
  Grid:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>,
  Building:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Clip:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="14" y2="15"/></svg>,
  Doc:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  Chart:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  Mail:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Cog:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Bell:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Search:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Out:p=><svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Left:p=><svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Right:p=><svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Link:p=><svg width={p.s||15} height={p.s||15} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  Plus:p=><svg width={p.s||15} height={p.s||15} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Chk:p=><svg width={p.s||13} height={p.s||13} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  X:p=><svg width={p.s||13} height={p.s||13} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  More:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>,
  Users:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Sun:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Moon:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  Msg:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Shield:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Plug:p=><svg width={p.s||18} height={p.s||18} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M7 6h1v5"/><path d="M16 6h1v5"/><path d="M8 17c0 2 1 3 4 3s4-1 4-3"/></svg>,
  TUp:p=><svg width={p.s||13} height={p.s||13} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  TDn:p=><svg width={p.s||13} height={p.s||13} viewBox="0 0 24 24" fill="none" stroke={p.c||"currentColor"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
};

function Btn({children,onClick,v="primary",sm,disabled,full,style={},t}){
  const th=t||DARK;
  const V={primary:{bg:`linear-gradient(135deg,${th.accent},${th.accent2})`,color:th.dark?"#000":"#fff",border:"none"},ghost:{bg:th.dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.06)",color:th.textMid,border:`1px solid ${th.border}`},danger:{bg:"rgba(239,68,68,.1)",color:th.red,border:"1px solid rgba(239,68,68,.25)"},success:{bg:"rgba(74,222,128,.1)",color:th.green,border:"1px solid rgba(74,222,128,.25)"},accent:{bg:`rgba(${th.rgb},.1)`,color:th.accent,border:`1px solid rgba(${th.rgb},.3)`}};
  const vs=V[v]||V.primary;
  return <button onClick={onClick} disabled={disabled} style={{background:vs.bg,color:vs.color,border:vs.border,borderRadius:sm?7:9,padding:sm?"5px 13px":"9px 18px",fontSize:sm?11:13,fontWeight:700,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,width:full?"100%":"auto",display:"inline-flex",alignItems:"center",gap:5,whiteSpace:"nowrap",flexShrink:0,...style}}>{children}</button>;
}
function Card({children,style={},className="",t}){const th=t||DARK;return <div className={className} style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:14,...style}}>{children}</div>;}
function Badge({children,color,t}){const th=t||DARK;const c=color||th.accent;return <span style={{fontSize:10,fontWeight:700,background:`${c}18`,color:c,padding:"2px 8px",borderRadius:20,letterSpacing:.4,whiteSpace:"nowrap"}}>{children}</span>;}
function Spinner({t}){const th=t||DARK;return <div style={{width:18,height:18,border:`2px solid rgba(${th.rgb},.2)`,borderTopColor:th.accent,borderRadius:"50%",animation:"spin 1s linear infinite",flexShrink:0}}/>;}
function Toggle({on,onChange,t}){const th=t||DARK;return <div onClick={()=>onChange(!on)} style={{width:40,height:22,borderRadius:11,background:on?th.accent:th.dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.15)",cursor:"pointer",position:"relative",transition:"background .25s",flexShrink:0}}><div style={{position:"absolute",top:3,left:on?20:3,width:16,height:16,borderRadius:"50%",background:"#fff",transition:"left .25s",boxShadow:"0 1px 4px rgba(0,0,0,.3)"}}/></div>;}
function Inp({label,value,onChange,type="text",placeholder,rows,t}){
  const th=t||DARK;
  const base={width:"100%",background:th.dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",border:`1px solid ${th.border}`,borderRadius:9,padding:"10px 13px",color:th.text,fontSize:13};
  return <div style={{marginBottom:14}}>{label&&<label style={{fontSize:11,color:th.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:600}}>{label}</label>}{rows?<textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{...base,resize:"vertical"}}/>:<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={base}/>}</div>;
}

let cid=0;
function LineChart({data=[],color,h=48,w=100,t}){
  const th=t||DARK;const id=useRef(`lc${cid++}`).current;
  if(data.length<2)return null;
  const max=Math.max(...data)||1,min=Math.min(...data),range=max-min||1;
  const pts=data.map((v,i)=>{const x=(i/(data.length-1))*(w-2)+1,y=h-2-((v-min)/range)*(h-6);return[x.toFixed(1),y.toFixed(1)];});
  const pd="M"+pts.map(p=>p.join(",")).join(" L"),ad=pd+` L${pts[pts.length-1][0]},${h} L${pts[0][0]},${h} Z`;
  return <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display:"block",overflow:"visible"}}><defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={th.dark?"0.15":"0.08"}/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs><path d={ad} fill={`url(#${id})`}/><path d={pd} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>{pts.map(([x,y],i)=>i===pts.length-1?<circle key={i} cx={x} cy={y} r="2.5" fill={color}/>:null)}</svg>;
}
function DonutChart({segments,size=110,stroke=13}){
  const r=(size-stroke)/2,cx=size/2,cy=size/2,circ=2*Math.PI*r;let offset=0;
  const total=segments.reduce((s,sg)=>s+sg.value,0)||1;
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{display:"block",transform:"rotate(-90deg)"}}><circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={stroke}/>{segments.map((sg,i)=>{const pct=sg.value/total,dash=pct*circ,el=<circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={sg.color} strokeWidth={stroke} strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-offset*circ} strokeLinecap="round"/>;offset+=pct;return el;})}</svg>;
}
function BarGroup({data=[],color,t}){
  const th=t||DARK;const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];const mx=Math.max(...data,1);
  return <div style={{display:"grid",gridTemplateColumns:`repeat(${data.length},1fr)`,gap:5,alignItems:"flex-end",height:70}}>{data.map((v,i)=><div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><div style={{width:"100%",height:`${Math.max(4,(v/mx)*54)}px`,borderRadius:"3px 3px 0 0",background:i===data.length-1?`linear-gradient(180deg,${color},${th.accent2})`:`rgba(${th.rgb},.35)`,transition:"height .8s cubic-bezier(.4,0,.2,1)",cursor:"pointer"}} title={`${days[i]||i}: ${v}`}/><div style={{fontSize:8,color:th.sub,fontWeight:600}}>{days[i]?.slice(0,2)||i}</div></div>)}</div>;
}
function HBar({label,value,max,color,sub,t}){
  const th=t||DARK;const pct=max>0?(value/max)*100:0;
  return <div style={{marginBottom:11}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><span style={{fontSize:12,color:th.textMid}}>{label}</span><div><span style={{fontSize:13,fontWeight:700,color,fontFamily:H}}>{typeof value==="number"?value.toLocaleString():value}</span>{sub&&<span style={{fontSize:10,color:th.sub,marginLeft:4}}>{sub}</span>}</div></div><div style={{height:4,background:th.dark?"rgba(255,255,255,.06)":"rgba(0,0,0,.08)",borderRadius:2,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:color,borderRadius:2,transition:"width 1s cubic-bezier(.4,0,.2,1)"}}/></div></div>;
}

function StatCard({icon,label,value,color,data,trend,trendUp,idx=0,t}){
  const th=t||DARK;const[disp,setDisp]=useState(0);
  useEffect(()=>{const target=typeof value==="number"?value:0;let s=null;const fn=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/900,1);setDisp(Math.floor((1-Math.pow(1-p,3))*target));if(p<1)requestAnimationFrame(fn);};requestAnimationFrame(fn);},[value]);
  return <div className="lift" style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:14,padding:"15px",display:"flex",flexDirection:"column",gap:10,animation:`fadeUp .4s ease ${idx*.07}s both`,position:"relative",overflow:"hidden",cursor:"default"}}>
    <div style={{position:"absolute",top:0,right:0,width:80,height:80,background:`radial-gradient(circle at top right,${color}14,transparent 70%)`,pointerEvents:"none"}}/>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div style={{width:34,height:34,borderRadius:9,background:`${color}12`,border:`1px solid ${color}1e`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{icon}</div>
      {trend&&<div style={{display:"flex",alignItems:"center",gap:3,fontSize:10,color:trendUp?th.green:th.red,fontWeight:700,background:trendUp?"rgba(74,222,128,.1)":"rgba(248,113,113,.1)",padding:"3px 7px",borderRadius:20}}>{trendUp?<Ic.TUp c={th.green} s={10}/>:<Ic.TDn c={th.red} s={10}/>} {trend}</div>}
    </div>
    <div><div style={{fontFamily:H,fontSize:23,fontWeight:900,color:th.text,lineHeight:1}}>{typeof value==="number"?disp.toLocaleString():value}</div><div style={{fontSize:11,color:th.sub,marginTop:2}}>{label}</div></div>
    {data&&<LineChart data={data} color={color} h={32} w={90} t={th}/>}
  </div>;
}

const MW=[12,18,15,22,19,28,24],ML=[2,4,3,6,5,8,7],MS=[1,2,1,3,2,4,3],ME=[20,35,28,42,38,55,49];
const MDEV=[{label:"Desktop",value:54,color:"#f5a623"},{label:"Mobile",value:38,color:"#60a5fa"},{label:"Tablet",value:8,color:"#c084fc"}];
const MSRC=[{label:"Direct",value:420,color:"#f5a623"},{label:"Google",value:310,color:"#4ade80"},{label:"Social",value:180,color:"#60a5fa"},{label:"WhatsApp",value:95,color:"#25d366"},{label:"Referral",value:44,color:"#c084fc"}];
const MTOOLS=[{label:"Solar Calculator",value:68,sessions:1240,color:"#f5a623"},{label:"Installer Directory",value:45,sessions:820,color:"#4ade80"},{label:"Error Code Lookup",value:31,sessions:564,color:"#60a5fa"},{label:"Health Check",value:28,sessions:509,color:"#c084fc"},{label:"Blog & Guides",value:22,sessions:400,color:"#fb923c"},{label:"Pro Calculator",value:14,sessions:254,color:"#2dd4bf"}];
const MPROV=[{label:"Gauteng",value:38,color:"#f5a623"},{label:"Western Cape",value:24,color:"#4ade80"},{label:"KwaZulu-Natal",value:16,color:"#60a5fa"},{label:"Eastern Cape",value:10,color:"#c084fc"},{label:"Other",value:12,color:"#666"}];
const MINST=[
  {id:1,name:"SunPower SA",city:"Johannesburg",province:"Gauteng",rating:4.9,review_count:312,sessa_verified:true,jobs_completed:847,years_experience:12,badge:"Top Rated",response_hours:2,specialty:"Residential",brands:["Sunsynk","Victron"],price_min:80000,price_max:200000,status:"approved",finance_available:true,about:"12 years installing solar across Gauteng. Specialise in hybrid systems for load shedding resilience. All installations include 5-year workmanship warranty.",type:"installer"},
  {id:2,name:"Cape Solar Pro",city:"Cape Town",province:"Western Cape",rating:4.8,review_count:198,sessa_verified:true,jobs_completed:523,years_experience:9,badge:"Most Popular",response_hours:3,specialty:"Commercial & Residential",brands:["Deye","Sunsynk"],price_min:60000,price_max:350000,status:"approved",finance_available:true,about:"Cape Town's leading solar installer for homes and businesses. Over 500 completed installations.",type:"installer"},
  {id:3,name:"KZN Solar Solutions",city:"Durban",province:"KwaZulu-Natal",rating:4.7,review_count:143,sessa_verified:true,jobs_completed:389,years_experience:7,badge:null,response_hours:4,specialty:"Off-grid",brands:["Victron","Pylontech"],price_min:70000,price_max:250000,status:"approved",finance_available:false,about:"KZN specialists in off-grid and hybrid systems.",type:"installer"},
  {id:4,name:"FixSolar SA",city:"Johannesburg",province:"Gauteng",rating:4.9,review_count:203,sessa_verified:false,jobs_completed:412,years_experience:8,badge:"Emergency",response_hours:1,specialty:"Inverter Repair",brands:["Victron","Sunsynk","Deye"],price_min:450,price_max:8000,status:"approved",finance_available:false,about:"Inverter repair specialists with same-day callouts across Gauteng.",type:"technician"},
  {id:5,name:"Battery Doctors",city:"Pretoria",province:"Gauteng",rating:4.7,review_count:98,sessa_verified:false,jobs_completed:210,years_experience:6,badge:"24/7",response_hours:1,specialty:"Battery Replacement",brands:["Pylontech","BSL","Freedom Won"],price_min:1200,price_max:15000,status:"approved",finance_available:false,about:"Battery health diagnostics and replacement. Emergency callouts 24/7.",type:"technician"},
  {id:6,name:"Pretoria Solar Works",city:"Pretoria",province:"Gauteng",rating:4.6,review_count:89,sessa_verified:false,jobs_completed:201,years_experience:5,badge:"Fast Response",response_hours:4,specialty:"Residential",brands:["Growatt","Deye"],price_min:50000,price_max:150000,status:"pending",finance_available:true,about:"Fast-response residential installer. Same-day site assessments available.",type:"installer"},
  {id:7,name:"Green Energy EC",city:"Port Elizabeth",province:"Eastern Cape",rating:4.5,review_count:67,sessa_verified:true,jobs_completed:156,years_experience:6,badge:null,response_hours:5,specialty:"Agricultural",brands:["Victron","Sunsynk"],price_min:90000,price_max:400000,status:"pending",finance_available:false,about:"Agricultural solar specialists across the Eastern Cape.",type:"installer"},
  {id:8,name:"Northern Cape Solar",city:"Kimberley",province:"Northern Cape",rating:4.8,review_count:31,sessa_verified:true,jobs_completed:76,years_experience:8,badge:"High PSH Zone",response_hours:3,specialty:"Off-grid & Agricultural",brands:["Victron","Pylontech"],price_min:80000,price_max:500000,status:"approved",finance_available:false,about:"Off-grid experts for farms and remote properties across the Northern Cape.",type:"installer"},
];
const MNOTIFS=[{id:1,type:"lead",msg:"New lead: Sipho M. — 8kW system in Johannesburg",time:"2 min ago",read:false},{id:2,type:"installer",msg:"Pretoria Solar Works awaiting approval",time:"14 min ago",read:false},{id:3,type:"review",msg:"New 5-star review for Cape Solar Pro",time:"1 hr ago",read:false},{id:4,type:"system",msg:"Vercel deployment successful — v2.4.1",time:"2 hrs ago",read:true},{id:5,type:"subscriber",msg:"3 new newsletter subscribers today",time:"3 hrs ago",read:true}];
const MMSGS=[{id:1,from:"Sipho Dlamini",email:"sipho@gmail.com",subject:"Quote request — 10kW off-grid farm",body:"Hi, I need a quote for a 10kW system for my farm in Limpopo. Looking for full off-grid capability with battery backup for 48 hours. Please advise on best system.",time:"09:12",read:false,tag:"lead"},{id:2,from:"FixSolar SA",email:"info@fixsolar.co.za",subject:"Document re-submission",body:"Hi Tebello, we have re-uploaded our SESSA certificate. Please review and approve our listing when you get a chance. We have also added photos of recent installations.",time:"08:44",read:false,tag:"installer"},{id:3,from:"Thabo Nkosi",email:"thabo.n@outlook.com",subject:"Calculator not loading on mobile",body:"The calculator seems to freeze on my Samsung S23. Steps to reproduce: open calculator, select appliances, tap calculate. Tested on Chrome and Samsung browser.",time:"Yesterday",read:true,tag:"support"},{id:4,from:"Ayanda Khumalo",email:"ayanda@gmail.com",subject:"5-star experience",body:"Just wanted to say the platform is amazing. Found my installer within minutes and the quote process was seamless. This is exactly what SA needed.",time:"Yesterday",read:true,tag:"feedback"},{id:5,from:"Vercel",email:"noreply@vercel.com",subject:"Deployment successful",body:"Your project solariq was successfully deployed to production at solariq.vercel.app.",time:"2 days ago",read:true,tag:"system"}];

const NAV=[{id:"dashboard",label:"Dashboard",Icon:Ic.Grid},{id:"installers",label:"Installers",Icon:Ic.Building},{id:"leads",label:"Leads",Icon:Ic.Clip},{id:"blog",label:"Blog",Icon:Ic.Doc},{id:"analytics",label:"Analytics",Icon:Ic.Chart},{id:"messages",label:"Messages",Icon:Ic.Msg},{id:"subscribers",label:"Subscribers",Icon:Ic.Mail},{id:"users",label:"Team",Icon:Ic.Users},{id:"settings",label:"Settings",Icon:Ic.Cog}];
const MOB=[{id:"dashboard",label:"Home",Icon:Ic.Grid},{id:"installers",label:"Installers",Icon:Ic.Building},{id:"leads",label:"Leads",Icon:Ic.Clip},{id:"blog",label:"Blog",Icon:Ic.Doc},{id:"more",label:"More",Icon:Ic.More}];
function getGreeting(n){const h=new Date().getHours();if(h<5)return[`🌙 Late night, ${n}.`,"The platform never sleeps."];if(h<12)return[`☀️ Good morning, ${n}.`,"Here's what happened overnight."];if(h<17)return[`🌤️ Good afternoon, ${n}.`,"Your platform at a glance."];return[`🌙 Good evening, ${n}.`,"Here's how today performed."];}

function NotifPanel({notifs,onClose,t}){
  const th=t||DARK;const ti=tp=>tp==="lead"?"📋":tp==="installer"?"🏢":tp==="review"?"⭐":tp==="subscriber"?"📬":"⚙️";
  return <div style={{position:"fixed",top:56,right:16,width:316,background:th.bg2,border:`1px solid ${th.border}`,borderRadius:14,zIndex:500,animation:"popIn .2s ease",overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,.4)"}}>
    <div style={{padding:"12px 15px",borderBottom:`1px solid ${th.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text}}>Notifications</div><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",display:"flex"}}><Ic.X s={14} c={th.sub}/></button></div>
    <div style={{maxHeight:340,overflowY:"auto"}}>{notifs.map(n=><div key={n.id} className="rh" style={{padding:"10px 15px",borderBottom:`1px solid ${th.border}`,display:"flex",gap:9,alignItems:"flex-start",background:n.read?"transparent":`rgba(${th.rgb},.04)`}}><span style={{fontSize:14,flexShrink:0,marginTop:1}}>{ti(n.type)}</span><div style={{flex:1,minWidth:0}}><div style={{fontSize:12,color:th.text,lineHeight:1.5,marginBottom:1}}>{n.msg}</div><div style={{fontSize:10,color:th.sub}}>{n.time}</div></div>{!n.read&&<div style={{width:6,height:6,borderRadius:"50%",background:th.accent,flexShrink:0,marginTop:4}}/>}</div>)}</div>
    <div style={{padding:"9px 15px",borderTop:`1px solid ${th.border}`}}><button style={{background:"none",border:"none",color:th.accent,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:B}}>Mark all as read</button></div>
  </div>;
}

function Login({onLogin}){
  const[email,setEmail]=useState(""),[pw,setPw]=useState(""),[err,setErr]=useState(""),[loading,setLoading]=useState(false);
  const sc=useScreen();const t=DARK;
  const pts=Array.from({length:20},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,s:Math.random()*2+.8,dur:Math.random()*10+8,del:Math.random()*8,op:Math.random()*.28+.07}));
  const login=async()=>{if(!email||!pw){setErr("Enter your email and password.");return;}setLoading(true);setErr("");const{error}=await sb.auth.signInWithPassword({email,password:pw});if(error)setErr(error.message);else onLogin();setLoading(false);};
  return <div style={{minHeight:"100vh",display:"flex",background:t.bg,overflow:"hidden"}}>
    {sc.isDesktop&&<div style={{width:"44%",background:`linear-gradient(160deg,rgba(${t.rgb},.1),rgba(255,107,0,.06) 50%,transparent 100%)`,borderRight:`1px solid ${t.border}`,display:"flex",flexDirection:"column",justifyContent:"center",padding:"60px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 70% 50% at 30% 50%,rgba(${t.rgb},.1),transparent)`,pointerEvents:"none"}}/>
      {pts.slice(0,12).map(p=><div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,width:p.s,height:p.s,borderRadius:"50%",background:t.accent,opacity:p.op,animation:`particle ${p.dur}s ease-in-out ${p.del}s infinite`,pointerEvents:"none"}}/>)}
      <div style={{position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:44}}><div style={{width:40,height:40,background:`linear-gradient(135deg,${t.accent},${t.accent2})`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:`0 0 28px rgba(${t.rgb},.4)`}}>☀️</div><span style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></span></div>
        <h1 style={{fontFamily:H,fontSize:34,fontWeight:900,color:t.text,lineHeight:1.1,marginBottom:14}}>South Africa's Solar Intelligence Platform.</h1>
        <p style={{fontSize:14,color:t.sub,lineHeight:1.8,marginBottom:32}}>Admin portal. Full control of installers, leads, content and platform analytics.</p>
        {[["🏢","Verified installer directory"],["📊","Real-time platform analytics"],["📋","Lead management & tracking"],["⚙️","Full site configuration"],["💬","Messages & inbox"],["🔒","Security & team access"]].map(([icon,text])=><div key={text} style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}><div style={{width:26,height:26,borderRadius:7,background:`rgba(${t.rgb},.1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>{icon}</div><span style={{fontSize:13,color:t.textMid}}>{text}</span></div>)}
      </div>
    </div>}
    <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:24,position:"relative"}}>
      {!sc.isDesktop&&pts.map(p=><div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,width:p.s,height:p.s,borderRadius:"50%",background:t.accent,opacity:p.op,animation:`particle ${p.dur}s ease-in-out ${p.del}s infinite`,pointerEvents:"none"}}/>)}
      <div style={{width:"100%",maxWidth:400,animation:"fadeUp .5s ease",position:"relative",zIndex:1}}>
        {!sc.isDesktop&&<div style={{textAlign:"center",marginBottom:30}}><div style={{width:52,height:52,background:`linear-gradient(135deg,${t.accent},${t.accent2})`,borderRadius:15,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,margin:"0 auto 13px",animation:"float 3s ease infinite",boxShadow:`0 0 36px rgba(${t.rgb},.3)`}}>☀️</div><div style={{fontFamily:H,fontSize:24,fontWeight:900,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></div><div style={{fontSize:10,color:t.sub,marginTop:3,letterSpacing:2,textTransform:"uppercase"}}>Admin Portal</div></div>}
        {sc.isDesktop&&<><div style={{fontFamily:H,fontSize:22,fontWeight:900,color:t.text,marginBottom:3}}>Sign in</div><div style={{fontSize:13,color:t.sub,marginBottom:22}}>Access your admin dashboard</div></>}
        <div style={{background:"rgba(255,255,255,.03)",border:`1px solid ${t.border}`,borderRadius:17,padding:sc.isDesktop?"28px":"22px",backdropFilter:"blur(20px)"}}>
          <Inp label="Email" value={email} onChange={setEmail} type="email" placeholder="mail4tebello@gmail.com" t={t}/>
          <Inp label="Password" value={pw} onChange={setPw} type="password" placeholder="••••••••••" t={t}/>
          {err&&<div style={{fontSize:12,color:t.red,marginBottom:13,display:"flex",alignItems:"center",gap:5,background:"rgba(248,113,113,.08)",border:"1px solid rgba(248,113,113,.2)",borderRadius:8,padding:"7px 11px"}}><Ic.X c={t.red}/>{err}</div>}
          <button onClick={login} disabled={loading} style={{width:"100%",background:`linear-gradient(135deg,${t.accent},${t.accent2})`,border:"none",borderRadius:10,padding:"13px",fontSize:14,fontWeight:800,color:"#000",cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:H,opacity:loading?.75:1}}>
            {loading?<><Spinner t={t}/>Signing in...</>:"Sign in to Admin →"}
          </button>
        </div>
        <div style={{textAlign:"center",marginTop:13,fontSize:11,color:t.sub}}>🔒 Secured · SolarIQ Admin</div>
      </div>
    </div>
  </div>;
}

function Sidebar({tab,setTab,collapsed,setCollapsed,onSignOut,pending,msgCount,t}){
  const th=t||DARK;
  return <div style={{width:collapsed?SC:SW,background:th.nav,borderRight:`1px solid ${th.border}`,display:"flex",flexDirection:"column",position:"fixed",top:0,bottom:0,left:0,zIndex:300,transition:"width .25s cubic-bezier(.4,0,.2,1)",overflow:"hidden"}}>
    <div style={{padding:"12px 10px 10px",borderBottom:`1px solid ${th.border}`,flexShrink:0}}><div style={{display:"flex",alignItems:"center",gap:9,overflow:"hidden"}}><div style={{width:31,height:31,background:`linear-gradient(135deg,${th.accent},${th.accent2})`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,animation:"float 3s ease infinite"}}>☀️</div>{!collapsed&&<div style={{animation:"fadeIn .15s ease",overflow:"hidden"}}><div style={{fontFamily:H,fontSize:15,fontWeight:900,color:th.text,whiteSpace:"nowrap"}}>Solar<span style={{color:th.accent}}>IQ</span></div><div style={{fontSize:8,color:th.sub,letterSpacing:2,textTransform:"uppercase"}}>Admin Panel</div></div>}</div></div>
    {!collapsed&&<div style={{padding:"7px 9px",borderBottom:`1px solid ${th.border}`,flexShrink:0}}><div style={{position:"relative"}}><div style={{position:"absolute",left:8,top:"50%",transform:"translateY(-50%)"}}><Ic.Search s={12} c={th.sub}/></div><input placeholder="Quick search..." style={{width:"100%",background:th.dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.06)",border:`1px solid ${th.border}`,borderRadius:8,padding:"7px 8px 7px 27px",color:th.text,fontSize:12}}/></div></div>}
    {!collapsed&&<div style={{padding:"6px 9px",borderBottom:`1px solid ${th.border}`,flexShrink:0}}><a href="https://solariq.vercel.app?preview=solariq2026" target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:6,padding:"6px 9px",borderRadius:7,textDecoration:"none",background:`rgba(${th.rgb},.06)`,border:`1px dashed rgba(${th.rgb},.2)`}}><Ic.Link s={11} c={th.accent}/><span style={{fontSize:11,color:th.accent,fontWeight:600,whiteSpace:"nowrap"}}>View Live Site →</span></a></div>}
    <nav style={{flex:1,padding:"5px",overflowY:"auto",overflowX:"hidden"}}>{NAV.map(n=>{const active=tab===n.id,badge=(n.id==="installers"&&pending>0)?pending:(n.id==="messages"&&msgCount>0)?msgCount:0;return <button key={n.id} onClick={()=>setTab(n.id)} className="nav-item" style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:collapsed?"10px 0":"7px 9px",justifyContent:collapsed?"center":"flex-start",borderRadius:8,border:"none",marginBottom:1,background:active?`rgba(${th.rgb},.1)`:"transparent",borderLeft:`2px solid ${active?th.accent:"transparent"}`,color:active?th.accent:th.sub,cursor:"pointer",position:"relative"}}><n.Icon s={15} c={active?th.accent:th.sub}/>{!collapsed&&<span style={{fontSize:12,fontWeight:active?700:500,whiteSpace:"nowrap",flex:1,textAlign:"left"}}>{n.label}</span>}{badge>0&&!collapsed&&<span style={{background:n.id==="messages"?th.red:th.accent,color:"#000",borderRadius:10,padding:"1px 6px",fontSize:9,fontWeight:800}}>{badge}</span>}{badge>0&&collapsed&&<span style={{position:"absolute",top:7,right:8,width:6,height:6,background:th.red,borderRadius:"50%"}}/>}</button>;})}
    </nav>
    <div style={{borderTop:`1px solid ${th.border}`,padding:"7px",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:7,padding:"5px",borderRadius:8,overflow:"hidden",marginBottom:4}}>
        <div style={{width:27,height:27,borderRadius:"50%",background:`linear-gradient(135deg,${th.accent},${th.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#000",flexShrink:0,fontFamily:H}}>T</div>
        {!collapsed&&<><div style={{flex:1,minWidth:0}}><div style={{fontSize:11,fontWeight:700,color:th.text,whiteSpace:"nowrap"}}>Tebello</div><div style={{fontSize:9,color:th.sub}}>Administrator</div></div><button onClick={onSignOut} title="Sign out" style={{background:"none",border:"none",cursor:"pointer",padding:3,display:"flex"}}><Ic.Out s={13} c={th.sub}/></button></>}
      </div>
      <button onClick={()=>setCollapsed(c=>!c)} style={{width:"100%",background:th.dark?"rgba(255,255,255,.04)":"rgba(0,0,0,.05)",border:`1px solid ${th.border}`,borderRadius:7,padding:"5px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{collapsed?<Ic.Right s={13} c={th.sub}/>:<Ic.Left s={13} c={th.sub}/>}</button>
    </div>
  </div>;
}

function MobileTopBar({tab,notifs,showNotif,setShowNotif,isDark,setIsDark,t}){
  const th=t||DARK;const label=[...NAV,{id:"more",label:"More"}].find(n=>n.id===tab)?.label||"";const unread=notifs.filter(n=>!n.read).length;
  return <div style={{position:"fixed",top:0,left:0,right:0,height:52,background:th.nav,borderBottom:`1px solid ${th.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 13px",zIndex:300,backdropFilter:"blur(20px)"}}>
    <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:24,height:24,background:`linear-gradient(135deg,${th.accent},${th.accent2})`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>☀️</div><span style={{fontFamily:H,fontSize:15,fontWeight:900,color:th.text}}>Solar<span style={{color:th.accent}}>IQ</span></span></div>
    <span style={{fontFamily:H,fontSize:12,fontWeight:700,color:th.textMid}}>{label}</span>
    <div style={{display:"flex",gap:5}}>
      <button onClick={()=>setIsDark(d=>!d)} style={{background:th.dark?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)",border:`1px solid ${th.border}`,borderRadius:7,padding:"5px 7px",cursor:"pointer",display:"flex"}}>{isDark?<Ic.Sun s={14} c={th.sub}/>:<Ic.Moon s={14} c={th.sub}/>}</button>
      <button onClick={()=>setShowNotif(s=>!s)} style={{position:"relative",background:th.dark?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)",border:`1px solid ${th.border}`,borderRadius:7,padding:"5px 7px",cursor:"pointer",display:"flex"}}><Ic.Bell s={14} c={th.sub}/>{unread>0&&<span style={{position:"absolute",top:3,right:3,width:6,height:6,background:th.red,borderRadius:"50%"}}/>}</button>
    </div>
  </div>;
}
function MobileBottomNav({tab,setTab,pending,t}){
  const th=t||DARK;
  return <div style={{position:"fixed",bottom:0,left:0,right:0,background:th.nav,borderTop:`1px solid ${th.border}`,display:"flex",zIndex:300,paddingBottom:"env(safe-area-inset-bottom,0px)"}}>
    {MOB.map(n=>{const active=tab===n.id,badge=n.id==="installers"&&pending>0;return <button key={n.id} onClick={()=>setTab(n.id)} style={{flex:1,background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"9px 4px 7px",cursor:"pointer",gap:3,position:"relative"}}>
      {badge&&<span style={{position:"absolute",top:6,right:"calc(50% - 14px)",width:6,height:6,background:th.red,borderRadius:"50%"}}/>}
      <div style={{opacity:active?1:.35,transition:"opacity .2s"}}><n.Icon s={19} c={active?th.accent:th.sub}/></div>
      <span style={{fontSize:9,fontWeight:700,color:active?th.accent:th.sub,transition:"color .2s"}}>{n.label}</span>
      {active&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:18,height:2,background:th.accent,borderRadius:"0 0 2px 2px"}}/>}
    </button>;})}
  </div>;
}
function DesktopTopBar({tab,notifs,showNotif,setShowNotif,isDark,setIsDark,t}){
  const th=t||DARK;const unread=notifs.filter(n=>!n.read).length;const label=NAV.find(n=>n.id===tab)?.label||"";
  return <div style={{height:52,background:th.nav,borderBottom:`1px solid ${th.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",position:"sticky",top:0,zIndex:200,backdropFilter:"blur(20px)"}}>
    <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:th.text}}>{label}</div>
    <div style={{display:"flex",gap:7,alignItems:"center"}}>
      <div style={{position:"relative"}}><div style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)"}}><Ic.Search s={12} c={th.sub}/></div><input placeholder="Search anything..." style={{background:th.dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",border:`1px solid ${th.border}`,borderRadius:9,padding:"7px 12px 7px 28px",color:th.text,fontSize:12,width:200}}/></div>
      <button onClick={()=>setIsDark(d=>!d)} style={{background:th.dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",border:`1px solid ${th.border}`,borderRadius:8,padding:"6px 8px",cursor:"pointer",display:"flex"}}>{isDark?<Ic.Sun s={14} c={th.sub}/>:<Ic.Moon s={14} c={th.sub}/>}</button>
      <button onClick={()=>setShowNotif(s=>!s)} style={{position:"relative",background:th.dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",border:`1px solid ${th.border}`,borderRadius:8,padding:"6px 8px",cursor:"pointer",display:"flex"}}><Ic.Bell s={14} c={th.sub}/>{unread>0&&<span style={{position:"absolute",top:5,right:5,width:6,height:6,background:th.red,borderRadius:"50%",border:`2px solid ${th.nav}`}}/>}</button>
      <a href="https://solariq.vercel.app?preview=solariq2026" target="_blank" rel="noopener noreferrer" style={{background:th.dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",border:`1px solid ${th.border}`,borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,color:th.accent,textDecoration:"none",display:"flex",alignItems:"center",gap:4}}><Ic.Link s={11} c={th.accent}/>Live Site</a>
    </div>
  </div>;
}

function Dashboard({stats,recentLeads,loading,t}){
  const th=t||DARK;const sc=useScreen();const[greet,sub]=getGreeting("Tebello");const[df,setDf]=useState("7d");
  if(loading)return <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:80,flexDirection:"column",gap:14}}><Spinner t={th}/><div style={{fontSize:13,color:th.sub}}>Loading dashboard...</div></div>;
  const cards=[
    {icon:<Ic.Building s={15} c={th.accent}/>,label:"Live Installers",value:stats.installers,color:th.accent,data:MW,trend:"+2 this week",trendUp:true},
    {icon:<Ic.Clip s={15} c={th.green}/>,label:"Total Leads",value:stats.leads,color:th.green,data:ML,trend:"+5 today",trendUp:true},
    {icon:<Ic.Mail s={15} c={th.blue}/>,label:"Subscribers",value:stats.subscribers,color:th.blue,data:MS,trend:"+3 today",trendUp:true},
    {icon:<Ic.Doc s={15} c={th.purple}/>,label:"Published Posts",value:stats.posts,color:th.purple,data:[2,2,3,3,4,4,4]},
    {icon:<Ic.Bell s={15} c={stats.pending>0?th.red:th.sub}/>,label:"Pending Approvals",value:stats.pending,color:stats.pending>0?th.red:th.sub,data:MW.map(v=>Math.floor(v/5))},
    {icon:<Ic.Chart s={15} c="#fb923c"/>,label:"Page Events",value:stats.events,color:"#fb923c",data:ME,trend:"+12%",trendUp:true},
  ];
  return <div style={{animation:"fadeUp .35s ease"}}>
    <div style={{background:`linear-gradient(135deg,rgba(${th.rgb},.09),rgba(255,107,0,.05) 60%,transparent)`,border:`1px solid rgba(${th.rgb},.13)`,borderRadius:16,padding:sc.isMobile?"14px":"18px 22px",marginBottom:13,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-30,right:-30,width:140,height:140,background:`radial-gradient(circle,rgba(${th.rgb},.12),transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:sc.isMobile?"flex-start":"center",flexDirection:sc.isMobile?"column":"row",gap:11}}>
        <div><div style={{fontFamily:H,fontSize:sc.isMobile?18:22,fontWeight:900,color:th.text,marginBottom:2}}>{greet}</div><div style={{fontSize:12,color:th.sub}}>{new Date().toLocaleDateString("en-ZA",{weekday:"long",year:"numeric",month:"long",day:"numeric"})} · {sub}</div></div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{[["1d","Today"],["7d","7 Days"],["30d","30 Days"],["all","All Time"]].map(([k,l])=><button key={k} onClick={()=>setDf(k)} className="tbtn" style={{background:df===k?`rgba(${th.rgb},.15)`:"transparent",color:df===k?th.accent:th.sub,padding:"4px 11px",border:`1px solid ${df===k?`rgba(${th.rgb},.35)`:th.border}`}}>{l}</button>)}</div>
      </div>
      {stats.pending>0&&<div style={{marginTop:11,background:"rgba(239,68,68,.07)",border:"1px solid rgba(239,68,68,.18)",borderRadius:9,padding:"8px 12px",display:"flex",alignItems:"center",gap:7}}>
        <span>⚠️</span><span style={{fontSize:13,color:th.red,fontWeight:600,flex:1}}>{stats.pending} installer application{stats.pending!==1?"s":""} awaiting review</span>
        <button style={{background:"rgba(239,68,68,.14)",border:"1px solid rgba(239,68,68,.25)",color:th.red,borderRadius:7,padding:"3px 10px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:B,flexShrink:0}}>Review now</button>
      </div>}
    </div>
    <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":sc.isTablet?"repeat(3,1fr)":"repeat(6,1fr)",gap:9,marginBottom:12}}>
      {cards.map((c,i)=><StatCard key={c.label} {...c} idx={i} t={th}/>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr":sc.isTablet?"1fr 1fr":"1.6fr 1fr 1fr",gap:10,marginBottom:10}}>
      <Card t={th} style={{padding:"16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:13}}><div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text}}>Platform Traffic</div><Badge color={th.green} t={th}>↑ 18% this week</Badge></div>
        <BarGroup data={ME} color={th.accent} t={th}/>
      </Card>
      <Card t={th} style={{padding:"16px"}}>
        <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text,marginBottom:13}}>Device Split</div>
        <div style={{display:"flex",justifyContent:"center",marginBottom:11}}><DonutChart segments={MDEV} size={92} stroke={11}/></div>
        {MDEV.map(d=><div key={d.label} style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}><div style={{width:7,height:7,borderRadius:2,background:d.color,flexShrink:0}}/><span style={{fontSize:11,color:th.textMid,flex:1}}>{d.label}</span><span style={{fontSize:11,fontWeight:700,color:d.color}}>{d.value}%</span></div>)}
      </Card>
      <Card t={th} style={{padding:"16px"}}>
        <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text,marginBottom:13}}>By Province</div>
        {MPROV.map(p=><HBar key={p.label} label={p.label} value={p.value} max={100} color={p.color} sub="%" t={th}/>)}
      </Card>
    </div>
    <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1.4fr 1fr":"1fr",gap:10}}>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <Card t={th} style={{padding:"16px"}}>
          <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text,marginBottom:13}}>Tool Usage — Sessions</div>
          {MTOOLS.map(tool=><HBar key={tool.label} label={tool.label} value={tool.sessions} max={1240} color={tool.color} sub={`${tool.value}% of users`} t={th}/>)}
        </Card>
        <Card t={th} style={{padding:"16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11}}><div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text}}>Recent Leads</div><Badge color={th.green} t={th}>{stats.leads} total</Badge></div>
          {recentLeads.length===0?<div style={{textAlign:"center",padding:"18px",color:th.sub,fontSize:13}}>No leads yet.</div>:
          <div style={{display:"flex",flexDirection:"column",gap:5}}>{recentLeads.map(l=><div key={l.id} className="rh" style={{display:"flex",alignItems:"center",gap:9,padding:"8px 10px",background:th.dark?"rgba(255,255,255,.02)":"rgba(0,0,0,.02)",borderRadius:8,cursor:"pointer"}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:`rgba(${th.rgb},.1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,flexShrink:0}}>👤</div>
            <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:600,color:th.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.name||"Anonymous"}</div><div style={{fontSize:10,color:th.sub}}>{l.system_kw}kW · {l.installers?.name||"—"}</div></div>
            <Badge color={l.status==="new"?th.accent:l.status==="converted"?th.green:th.sub} t={th}>{l.status}</Badge>
            <div style={{fontSize:10,color:th.sub,flexShrink:0}}>{new Date(l.created_at).toLocaleDateString("en-ZA")}</div>
          </div>)}</div>}
        </Card>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <Card t={th} style={{padding:"16px"}}>
          <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text,marginBottom:11}}>Traffic Sources</div>
          {MSRC.map(s=><HBar key={s.label} label={s.label} value={s.value} max={420} color={s.color} t={th}/>)}
        </Card>
        <Card t={th} style={{padding:"16px"}}>
          <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text,marginBottom:11}}>Platform Status</div>
          {[["Database","Operational",th.green],["Auth","Operational",th.green],["Storage","Operational",th.green],["Vercel CDN","Operational",th.green],["WhatsApp API","Not connected",th.sub],["Edge Functions","Not configured",th.sub]].map(([n,s,c])=><div key={n} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:12,color:th.sub}}>{n}</span>
            <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:5,height:5,borderRadius:"50%",background:c,animation:c===th.green?"pulse 2s infinite":"none"}}/><span style={{fontSize:11,color:c,fontWeight:600}}>{s}</span></div>
          </div>)}
        </Card>
        <Card t={th} style={{padding:"16px"}}>
          <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text,marginBottom:10}}>Quick Actions</div>
          {[["📝","Write new blog post"],["🏢","Review applications"],["📊","Full analytics"],["⚙️","Site settings"]].map(([icon,label])=><div key={label} className="rh" style={{display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderRadius:8,cursor:"pointer",border:`1px solid ${th.border}`,marginBottom:6}}>
            <span style={{fontSize:13}}>{icon}</span><span style={{fontSize:12,color:th.textMid,flex:1}}>{label}</span><Ic.Right s={12} c={th.sub}/>
          </div>)}
        </Card>
      </div>
    </div>
  </div>;
}

function InstallersManager({t}){
  const th=t||DARK;const sc=useScreen();
  const[filter,setFilter]=useState("all"),[typeF,setTypeF]=useState("all"),[search,setSearch]=useState(""),[sel,setSel]=useState(null);
  const filtered=MINST.filter(i=>{if(filter!=="all"&&i.status!==filter)return false;if(typeF!=="all"&&i.type!==typeF)return false;if(search&&!i.name.toLowerCase().includes(search.toLowerCase())&&!i.city.toLowerCase().includes(search.toLowerCase()))return false;return true;});
  const sc2=s=>s==="approved"?th.green:s==="pending"?th.accent:s==="rejected"?th.red:th.sub;
  return <div style={{animation:"fadeUp .35s ease"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:13,flexWrap:"wrap",gap:9}}>
      <div><div style={{fontFamily:H,fontSize:20,fontWeight:900,color:th.text}}>Installers & Technicians</div><div style={{fontSize:12,color:th.sub,marginTop:2}}>{filtered.length} showing · {MINST.filter(i=>i.status==="pending").length} pending</div></div>
      <Btn v="primary" sm t={th}><Ic.Plus s={13} c={th.dark?"#000":"#fff"}/>Add Installer</Btn>
    </div>
    <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:10,alignItems:"center"}}>
      <div style={{position:"relative",flex:1,minWidth:160}}><div style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)"}}><Ic.Search s={12} c={th.sub}/></div><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or city..." style={{width:"100%",background:th.dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",border:`1px solid ${th.border}`,borderRadius:9,padding:"7px 11px 7px 28px",color:th.text,fontSize:12}}/></div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{[["all","All"],["pending","Pending"],["approved","Approved"],["rejected","Rejected"]].map(([k,l])=><button key={k} onClick={()=>setFilter(k)} className="tbtn" style={{background:filter===k?`rgba(${th.rgb},.12)`:"transparent",color:filter===k?th.accent:th.sub,padding:"5px 10px",border:`1px solid ${filter===k?`rgba(${th.rgb},.35)`:th.border}`}}>{l}</button>)}</div>
      <div style={{display:"flex",gap:4}}>{[["all","All"],["installer","Installers"],["technician","Techs"]].map(([k,l])=><button key={k} onClick={()=>setTypeF(k)} className="tbtn" style={{background:typeF===k?`rgba(96,165,250,.12)`:"transparent",color:typeF===k?th.blue:th.sub,padding:"5px 10px",border:`1px solid ${typeF===k?"rgba(96,165,250,.35)":th.border}`}}>{l}</button>)}</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1fr 1fr":"1fr",gap:9}}>
      {filtered.map(inst=><div key={inst.id} className="lift" style={{background:th.card,border:`1px solid ${sel===inst.id?`rgba(${th.rgb},.3)`:th.border}`,borderRadius:13,padding:"13px 14px",cursor:"pointer"}} onClick={()=>setSel(sel===inst.id?null:inst.id)}>
        <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
          <div style={{width:38,height:38,borderRadius:9,background:inst.type==="technician"?`rgba(96,165,250,.1)`:`rgba(${th.rgb},.1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{inst.type==="technician"?"🔧":"🏢"}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3,flexWrap:"wrap"}}><span style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text}}>{inst.name}</span><Badge color={sc2(inst.status)} t={th}>{inst.status}</Badge><Badge color={inst.type==="technician"?th.blue:th.accent} t={th}>{inst.type==="technician"?"Tech":"Installer"}</Badge>{inst.sessa_verified&&<Badge color={th.green} t={th}>✓ SESSA</Badge>}{inst.badge&&<Badge color={th.purple} t={th}>{inst.badge}</Badge>}</div>
            <div style={{fontSize:11,color:th.sub}}>{inst.city}, {inst.province} · {inst.specialty}</div>
            <div style={{display:"flex",gap:10,marginTop:3,flexWrap:"wrap"}}><span style={{fontSize:10,color:th.sub}}>⭐ {inst.rating} ({inst.review_count})</span><span style={{fontSize:10,color:th.sub}}>⚡ {inst.response_hours}h</span><span style={{fontSize:10,color:th.sub}}>✅ {inst.jobs_completed} jobs</span></div>
          </div>
          <span style={{fontSize:13,color:th.sub,transition:"transform .2s",transform:sel===inst.id?"rotate(90deg)":"none",flexShrink:0}}>›</span>
        </div>
        {sel===inst.id&&<div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${th.border}`,animation:"fadeUp .2s ease"}}>
          <p style={{fontSize:12,color:th.sub,lineHeight:1.7,marginBottom:11}}>{inst.about}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:7,marginBottom:11}}>
            {[["Experience",`${inst.years_experience} yrs`],["Jobs",`${inst.jobs_completed}+`],["Response",`${inst.response_hours}h`],["Finance",inst.finance_available?"Yes":"N/A"],["Brands",(inst.brands||[]).join(", ")],["Specialty",inst.specialty]].map(([l,v])=><div key={l} style={{background:th.dark?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)",borderRadius:8,padding:"7px 9px"}}><div style={{fontSize:9,color:th.sub,marginBottom:2,textTransform:"uppercase",letterSpacing:.8}}>{l}</div><div style={{fontSize:11,color:th.textMid,fontWeight:600}}>{v}</div></div>)}
          </div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {inst.status!=="approved"&&<Btn v="success" sm t={th}><Ic.Chk s={11} c={th.green}/>Approve</Btn>}
            {inst.status!=="rejected"&&<Btn v="danger" sm t={th}><Ic.X s={11} c={th.red}/>Reject</Btn>}
            <Btn v="ghost" sm t={th}>Assign Badge</Btn>
            <Btn v="accent" sm t={th}>{inst.sessa_verified?"Remove SESSA":"Mark SESSA ✓"}</Btn>
          </div>
        </div>}
      </div>)}
    </div>
  </div>;
}

function Messages({t}){
  const th=t||DARK;const sc=useScreen();
  const[msgs]=useState(MMSGS),[active,setActive]=useState(null),[tagF,setTagF]=useState("all"),[reply,setReply]=useState("");
  const filtered=msgs.filter(m=>tagF==="all"||m.tag===tagF);
  const tc=tg=>tg==="lead"?th.accent:tg==="installer"?th.blue:tg==="support"?th.red:tg==="feedback"?th.green:th.sub;
  const am=msgs.find(m=>m.id===active);
  return <div style={{animation:"fadeUp .35s ease"}}>
    <div style={{fontFamily:H,fontSize:20,fontWeight:900,color:th.text,marginBottom:3}}>Messages & Inbox</div>
    <div style={{fontSize:12,color:th.sub,marginBottom:13}}>{msgs.filter(m=>!m.read).length} unread · Contact form submissions and installer messages</div>
    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>{[["all","All"],["lead","Leads"],["installer","Installers"],["support","Support"],["feedback","Feedback"],["system","System"]].map(([k,l])=><button key={k} onClick={()=>setTagF(k)} className="tbtn" style={{background:tagF===k?`rgba(${th.rgb},.12)`:"transparent",color:tagF===k?th.accent:th.sub,padding:"5px 10px",border:`1px solid ${tagF===k?`rgba(${th.rgb},.3)`:th.border}`}}>{l}</button>)}</div>
    <div style={{display:"grid",gridTemplateColumns:sc.isDesktop&&active?"1fr 1.3fr":"1fr",gap:11}}>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {filtered.map(m=><div key={m.id} className="rh" onClick={()=>setActive(active===m.id?null:m.id)} style={{background:active===m.id?`rgba(${th.rgb},.06)`:th.card,border:`1px solid ${active===m.id?`rgba(${th.rgb},.25)`:th.border}`,borderRadius:11,padding:"11px 13px",cursor:"pointer",transition:"all .18s"}}>
          <div style={{display:"flex",gap:9,alignItems:"flex-start"}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:`rgba(${th.rgb},.1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:th.accent,flexShrink:0,fontFamily:H}}>{m.from.charAt(0)}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}><span style={{fontSize:12,fontWeight:m.read?600:800,color:m.read?th.textMid:th.text}}>{m.from}</span><div style={{display:"flex",gap:5,alignItems:"center",flexShrink:0}}><Badge color={tc(m.tag)} t={th}>{m.tag}</Badge><span style={{fontSize:10,color:th.sub}}>{m.time}</span></div></div>
              <div style={{fontSize:11,fontWeight:m.read?500:700,color:m.read?th.sub:th.textMid,marginBottom:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{m.subject}</div>
              <div style={{fontSize:10,color:th.sub,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{m.body}</div>
            </div>
            {!m.read&&<div style={{width:6,height:6,borderRadius:"50%",background:th.accent,flexShrink:0,marginTop:3}}/>}
          </div>
        </div>)}
      </div>
      {am&&sc.isDesktop&&<div style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:13,padding:"18px",animation:"slideIn .2s ease",position:"sticky",top:72,maxHeight:"72vh",overflowY:"auto"}}>
        <div style={{display:"flex",gap:10,marginBottom:14,alignItems:"flex-start"}}>
          <div style={{width:38,height:38,borderRadius:"50%",background:`rgba(${th.rgb},.1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:th.accent,fontFamily:H}}>{am.from.charAt(0)}</div>
          <div style={{flex:1}}><div style={{fontFamily:H,fontSize:14,fontWeight:700,color:th.text,marginBottom:1}}>{am.from}</div><div style={{fontSize:11,color:th.sub}}>{am.email}</div></div>
          <Badge color={tc(am.tag)} t={th}>{am.tag}</Badge>
        </div>
        <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:th.text,marginBottom:10}}>{am.subject}</div>
        <p style={{fontSize:13,color:th.textMid,lineHeight:1.8,marginBottom:18}}>{am.body}</p>
        <div style={{borderTop:`1px solid ${th.border}`,paddingTop:13}}>
          <div style={{fontSize:10,color:th.sub,marginBottom:7,textTransform:"uppercase",letterSpacing:1}}>Reply</div>
          <textarea value={reply} onChange={e=>setReply(e.target.value)} rows={4} placeholder="Write your reply..." style={{width:"100%",background:th.dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",border:`1px solid ${th.border}`,borderRadius:9,padding:"9px 12px",color:th.text,fontSize:13,resize:"vertical",marginBottom:9}}/>
          <div style={{display:"flex",gap:7}}><Btn v="primary" sm t={th}>Send Reply</Btn><Btn v="ghost" sm t={th}>Mark Read</Btn></div>
        </div>
      </div>}
    </div>
  </div>;
}

function Analytics({t}){
  const th=t||DARK;const[df,setDf]=useState("7d");
  return <div style={{animation:"fadeUp .35s ease"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:9}}>
      <div><div style={{fontFamily:H,fontSize:20,fontWeight:900,color:th.text}}>Analytics</div><div style={{fontSize:12,color:th.sub}}>Platform traffic, user behaviour and tool performance</div></div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{[["1d","Today"],["7d","7 Days"],["30d","30 Days"],["90d","90 Days"],["1y","This Year"],["all","All Time"]].map(([k,l])=><button key={k} onClick={()=>setDf(k)} className="tbtn" style={{background:df===k?`rgba(${th.rgb},.12)`:"transparent",color:df===k?th.accent:th.sub,padding:"5px 10px",border:`1px solid ${df===k?`rgba(${th.rgb},.3)`:th.border}`}}>{l}</button>)}</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:9,marginBottom:13}}>
      {[["1,049","Total Sessions",th.accent],["4:12","Avg Session",th.green],["68%","Calculator Use",th.blue],["31%","Bounce Rate",th.purple],["2.3k","Unique Visitors",th.teal],["94","Error Lookups","#fb923c"]].map(([v,l,c],i)=><div key={l} className="lift" style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:13,padding:"15px",animation:`fadeUp .3s ease ${i*.06}s both`}}><div style={{fontFamily:H,fontSize:22,fontWeight:900,color:c,marginBottom:3}}>{v}</div><div style={{fontSize:11,color:th.sub}}>{l}</div></div>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:11}}>
      <Card t={th} style={{padding:"16px"}}><div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text,marginBottom:13}}>Tool Usage — Sessions</div>{MTOOLS.map(tool=><HBar key={tool.label} label={tool.label} value={tool.sessions} max={1240} color={tool.color} sub={`${tool.value}%`} t={th}/>)}</Card>
      <Card t={th} style={{padding:"16px"}}>
        <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text,marginBottom:13}}>Traffic Sources</div>
        <div style={{display:"flex",justifyContent:"center",marginBottom:14}}><DonutChart segments={MSRC.map(s=>({...s}))} size={100} stroke={12}/></div>
        {MSRC.map(s=><div key={s.label} style={{display:"flex",alignItems:"center",gap:7,marginBottom:6}}><div style={{width:7,height:7,borderRadius:2,background:s.color,flexShrink:0}}/><span style={{fontSize:11,color:th.textMid,flex:1}}>{s.label}</span><span style={{fontSize:11,fontWeight:700,color:s.color}}>{s.value}</span></div>)}
      </Card>
    </div>
    <Card t={th} style={{padding:"16px"}}><div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text,marginBottom:13}}>Province Distribution</div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>{MPROV.map(p=><HBar key={p.label} label={p.label} value={p.value} max={100} color={p.color} sub="% of traffic" t={th}/>)}</div></Card>
  </div>;
}

function BlogManager({t}){
  const th=t||DARK;
  const[posts,setPosts]=useState([]);const[loading,setLoading]=useState(true);
  const[editing,setEditing]=useState(null);
  const[form,setForm]=useState({title:"",intro:"",tag:"Guide",body:"",cover_image:"",hot:false,published:false,read_minutes:5,slug:""});
  const sel2={width:"100%",background:th.dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",border:`1px solid ${th.border}`,borderRadius:9,padding:"10px 13px",color:th.text,fontSize:13,fontFamily:B};
  const load=async()=>{setLoading(true);const{data}=await sb.from("posts").select("*").order("created_at",{ascending:false});setPosts(data||[]);setLoading(false);};
  useEffect(()=>{load();},[]);
  const slugify=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  const save=async()=>{let bp;try{bp=JSON.parse(form.body);}catch{bp=[{h:"Section",p:form.body}];}const payload={...form,body:bp,slug:form.slug||slugify(form.title),updated_at:new Date().toISOString()};if(editing==="new")await sb.from("posts").insert(payload);else await sb.from("posts").update(payload).eq("id",editing);setEditing(null);load();};
  const togglePublish=async(p)=>{await sb.from("posts").update({published:!p.published}).eq("id",p.id);load();};
  const del=async(id)=>{if(confirm("Delete this post?"))await sb.from("posts").delete().eq("id",id);load();};
  if(editing!==null)return <div style={{animation:"fadeUp .35s ease"}}>
    <button onClick={()=>setEditing(null)} style={{background:"none",border:"none",color:th.sub,cursor:"pointer",fontSize:13,marginBottom:16,fontFamily:B,display:"flex",alignItems:"center",gap:5}}><Ic.Left s={14} c={th.sub}/>Back to posts</button>
    <div style={{fontFamily:H,fontSize:19,fontWeight:900,color:th.text,marginBottom:16}}>{editing==="new"?"New Post":"Edit Post"}</div>
    <Card t={th} style={{padding:"18px"}}>
      <Inp label="Title" value={form.title} onChange={v=>setForm({...form,title:v,slug:slugify(v)})} placeholder="How much does solar cost in SA?" t={th}/>
      <Inp label="Slug" value={form.slug} onChange={v=>setForm({...form,slug:v})} t={th}/>
      <Inp label="Intro" value={form.intro} onChange={v=>setForm({...form,intro:v})} rows={2} t={th}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:11,marginBottom:14}}>
        <div><label style={{fontSize:11,color:th.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:5,fontWeight:600}}>Tag</label><select value={form.tag} onChange={e=>setForm({...form,tag:e.target.value})} style={sel2}>{["Guide","Comparison","Tax","Maintenance","News","Review"].map(tg=><option key={tg}>{tg}</option>)}</select></div>
        <Inp label="Read Minutes" value={form.read_minutes} onChange={v=>setForm({...form,read_minutes:parseInt(v)||5})} type="number" t={th}/>
        <div style={{paddingTop:22,display:"flex",gap:13}}><label style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer",fontSize:12,color:th.text}}><input type="checkbox" checked={form.hot} onChange={e=>setForm({...form,hot:e.target.checked})} style={{accentColor:th.accent}}/>🔥 Hot</label><label style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer",fontSize:12,color:th.text}}><input type="checkbox" checked={form.published} onChange={e=>setForm({...form,published:e.target.checked})} style={{accentColor:th.accent}}/>Published</label></div>
      </div>
      <Inp label="Cover Image URL" value={form.cover_image||""} onChange={v=>setForm({...form,cover_image:v})} placeholder="https://images.unsplash.com/..." t={th}/>
      <Inp label="YouTube Video ID" value={form.youtube_id||""} onChange={v=>setForm({...form,youtube_id:v})} t={th}/>
      <Inp label="Affiliate URL" value={form.affiliate_url||""} onChange={v=>setForm({...form,affiliate_url:v})} t={th}/>
      <div style={{marginBottom:13}}><label style={{fontSize:11,color:th.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:5,fontWeight:600}}>Body (JSON)</label><div style={{fontSize:11,color:th.sub,marginBottom:5}}>{`[{"h":"Heading","p":"Paragraph"},...]`}</div><textarea value={form.body} onChange={e=>setForm({...form,body:e.target.value})} rows={10} style={{width:"100%",background:th.dark?"rgba(0,0,0,.3)":"rgba(0,0,0,.04)",border:`1px solid ${th.border}`,borderRadius:9,padding:"9px 12px",color:th.text,fontSize:12,fontFamily:"monospace",resize:"vertical"}}/></div>
      <div style={{display:"flex",gap:7}}><Btn v="primary" t={th} onClick={save}>Save Post</Btn><Btn v="ghost" t={th} onClick={()=>setEditing(null)}>Cancel</Btn></div>
    </Card>
  </div>;
  return <div style={{animation:"fadeUp .35s ease"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontFamily:H,fontSize:20,fontWeight:900,color:th.text}}>Blog Posts</div><Btn v="primary" sm t={th} onClick={()=>{setForm({title:"",intro:"",tag:"Guide",body:"",cover_image:"",hot:false,published:false,read_minutes:5,slug:""});setEditing("new");}}><Ic.Plus s={13} c={th.dark?"#000":"#fff"}/>New Post</Btn></div>
    {loading?<div style={{textAlign:"center",padding:40}}><Spinner t={th}/></div>:<div style={{display:"flex",flexDirection:"column",gap:7}}>
      {posts.map(p=><Card key={p.id} t={th} style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"center",gap:11}}>
        <div style={{flex:1,minWidth:0}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3,flexWrap:"wrap"}}><span style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text}}>{p.title}</span><Badge color={th.accent} t={th}>{p.tag}</Badge>{p.hot&&<Badge color={th.red} t={th}>🔥</Badge>}</div><div style={{fontSize:11,color:th.sub}}>{p.published?<span style={{color:th.green}}>● Published</span>:<span>○ Draft</span>}{" · "}{p.read_minutes} min · {new Date(p.created_at).toLocaleDateString("en-ZA")}</div></div>
        <div style={{display:"flex",gap:5}}><Btn sm v="ghost" t={th} onClick={()=>{setForm({...p,body:JSON.stringify(p.body,null,2)});setEditing(p.id);}}>Edit</Btn><Btn sm v={p.published?"ghost":"success"} t={th} onClick={()=>togglePublish(p)}>{p.published?"Unpublish":"Publish"}</Btn><Btn sm v="danger" t={th} onClick={()=>del(p.id)}>Delete</Btn></div>
      </div></Card>)}
      {posts.length===0&&<Card t={th} style={{padding:"40px",textAlign:"center"}}><div style={{color:th.sub,fontSize:13}}>No posts yet.</div></Card>}
    </div>}
  </div>;
}

function LeadsManager({t}){
  const th=t||DARK;const[leads,setLeads]=useState([]);const[loading,setLoading]=useState(true);const[sf,setSf]=useState("all");
  useEffect(()=>{const load=async()=>{const{data}=await sb.from("leads").select("*,installers(name)").order("created_at",{ascending:false});setLeads(data||[]);setLoading(false);};load();},[]);
  const update=async(id,status)=>{await sb.from("leads").update({status}).eq("id",id);setLeads(leads.map(l=>l.id===id?{...l,status}:l));};
  const sc2=s=>s==="new"?th.accent:s==="converted"?th.green:s==="lost"?th.red:th.sub;
  const filtered=leads.filter(l=>sf==="all"||l.status===sf);
  const sel2={background:th.dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",border:`1px solid ${th.border}`,borderRadius:8,padding:"5px 9px",color:th.text,fontSize:12,fontFamily:B};
  return <div style={{animation:"fadeUp .35s ease"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:13,flexWrap:"wrap",gap:9}}>
      <div><div style={{fontFamily:H,fontSize:20,fontWeight:900,color:th.text}}>Leads</div><div style={{fontSize:12,color:th.sub}}>{filtered.length} showing · {leads.filter(l=>l.status==="new").length} new</div></div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{[["all","All"],["new","New"],["contacted","Contacted"],["converted","Converted"],["lost","Lost"]].map(([k,l])=><button key={k} onClick={()=>setSf(k)} className="tbtn" style={{background:sf===k?`rgba(${th.rgb},.12)`:"transparent",color:sf===k?th.accent:th.sub,padding:"5px 10px",border:`1px solid ${sf===k?`rgba(${th.rgb},.3)`:th.border}`}}>{l}</button>)}</div>
    </div>
    {loading?<div style={{textAlign:"center",padding:40}}><Spinner t={th}/></div>:<div style={{display:"flex",flexDirection:"column",gap:7}}>
      {filtered.map(l=><Card key={l.id} t={th} style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"flex-start",gap:10}}>
        <div style={{width:34,height:34,borderRadius:9,background:`rgba(${th.rgb},.08)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>👤</div>
        <div style={{flex:1,minWidth:0}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3,flexWrap:"wrap"}}><span style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text}}>{l.name||"Anonymous"}</span><Badge color={sc2(l.status)} t={th}>{l.status}</Badge></div><div style={{fontSize:11,color:th.sub}}>{l.email&&`${l.email} · `}{l.installers?.name||"No installer"}</div><div style={{fontSize:11,color:th.sub,marginTop:1}}>{l.system_kw}kW · R{l.estimated_cost?.toLocaleString()} · {new Date(l.created_at).toLocaleDateString("en-ZA")}</div></div>
        <select value={l.status} onChange={e=>update(l.id,e.target.value)} style={sel2}>{["new","contacted","quoted","converted","lost"].map(s=><option key={s}>{s}</option>)}</select>
      </div></Card>)}
      {filtered.length===0&&<Card t={th} style={{padding:"40px",textAlign:"center"}}><div style={{color:th.sub,fontSize:13}}>No leads in this category.</div></Card>}
    </div>}
  </div>;
}

function SubscribersManager({t}){
  const th=t||DARK;const[subs,setSubs]=useState([]);const[loading,setLoading]=useState(true);
  useEffect(()=>{const load=async()=>{const{data}=await sb.from("subscribers").select("*").order("created_at",{ascending:false});setSubs(data||[]);setLoading(false);};load();},[]);
  const exportCSV=()=>{const csv=["Email,Source,Date",...subs.map(s=>`${s.email},${s.source},${new Date(s.created_at).toLocaleDateString("en-ZA")}`)].join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="solariq-subscribers.csv";a.click();};
  return <div style={{animation:"fadeUp .35s ease"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div><div style={{fontFamily:H,fontSize:20,fontWeight:900,color:th.text}}>Subscribers</div><div style={{fontSize:12,color:th.sub}}>{subs.length} total</div></div><Btn v="ghost" t={th} onClick={exportCSV}>Export CSV</Btn></div>
    {loading?<div style={{textAlign:"center",padding:40}}><Spinner t={th}/></div>:<Card t={th} style={{padding:"13px"}}>
      {subs.map(s=><div key={s.id} className="rh" style={{display:"flex",alignItems:"center",gap:9,padding:"7px 9px",borderRadius:8}}><span>📬</span><span style={{flex:1,fontSize:13,color:th.text}}>{s.email}</span><Badge color={s.source==="coming_soon"?th.accent:s.source==="calculator"?th.green:th.blue} t={th}>{s.source}</Badge><span style={{fontSize:11,color:th.sub}}>{new Date(s.created_at).toLocaleDateString("en-ZA")}</span></div>)}
      {subs.length===0&&<div style={{color:th.sub,textAlign:"center",padding:22,fontSize:13}}>No subscribers yet.</div>}
    </Card>}
  </div>;
}

function TeamManager({t}){
  const th=t||DARK;
  return <div style={{animation:"fadeUp .35s ease"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div><div style={{fontFamily:H,fontSize:20,fontWeight:900,color:th.text}}>Team & Access</div><div style={{fontSize:12,color:th.sub}}>Manage admin users and permissions</div></div><Btn v="primary" sm t={th}><Ic.Plus s={13} c={th.dark?"#000":"#fff"}/>Invite Member</Btn></div>
    <Card t={th} style={{padding:"15px",marginBottom:11}}>
      <div style={{display:"flex",alignItems:"center",gap:11,padding:"8px 0"}}>
        <div style={{width:38,height:38,borderRadius:"50%",background:`linear-gradient(135deg,${th.accent},${th.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:900,color:"#000",fontFamily:H}}>T</div>
        <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:th.text,fontFamily:H}}>Tebello</div><div style={{fontSize:12,color:th.sub}}>mail4tebello@gmail.com</div></div>
        <Badge color={th.accent} t={th}>Super Admin</Badge>
        <div style={{width:7,height:7,borderRadius:"50%",background:th.green,animation:"pulse 2s infinite"}}/>
      </div>
    </Card>
    <Card t={th} style={{padding:"16px"}}>
      <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text,marginBottom:13}}>Role Permissions</div>
      {[["Super Admin","Full access — create, edit, delete, configure everything",th.accent],["Editor","Can manage blog and content only",th.blue],["Support","View leads and messages, cannot edit installers",th.green],["Analyst","Read-only access to analytics and reports",th.purple]].map(([role,desc,color])=><div key={role} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10,padding:"10px 12px",background:th.dark?"rgba(255,255,255,.03)":"rgba(0,0,0,.03)",borderRadius:9}}>
        <div style={{width:8,height:8,borderRadius:2,background:color,marginTop:4,flexShrink:0}}/>
        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:th.text,marginBottom:1}}>{role}</div><div style={{fontSize:12,color:th.sub}}>{desc}</div></div>
      </div>)}
    </Card>
  </div>;
}

function Settings({t}){
  const th=t||DARK;const[settings,setSettings]=useState({});const[loading,setLoading]=useState(true);const[saved,setSaved]=useState(false);const[activeTab,setActiveTab]=useState("general");
  const sel2={width:"100%",background:th.dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",border:`1px solid ${th.border}`,borderRadius:9,padding:"10px 13px",color:th.text,fontSize:13,fontFamily:B};
  useEffect(()=>{const load=async()=>{const{data}=await sb.from("settings").select("*");const map={};(data||[]).forEach(s=>{map[s.key]=s.value;});setSettings(map);setLoading(false);};load();},[]);
  const save=async()=>{await Promise.all(Object.entries(settings).map(([key,value])=>sb.from("settings").upsert({key,value,updated_at:new Date().toISOString()})));setSaved(true);setTimeout(()=>setSaved(false),2500);};
  if(loading)return <div style={{textAlign:"center",padding:40}}><Spinner t={th}/></div>;
  const STABS=[["general","General"],["coming_soon","Coming Soon"],["ticker","Ticker Bar"],["seo","SEO"],["integrations","Integrations"],["security","Security"]];
  return <div style={{animation:"fadeUp .35s ease"}}>
    <div style={{fontFamily:H,fontSize:20,fontWeight:900,color:th.text,marginBottom:14}}>Settings</div>
    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14,borderBottom:`1px solid ${th.border}`,paddingBottom:11}}>{STABS.map(([k,l])=><button key={k} onClick={()=>setActiveTab(k)} className="tbtn" style={{background:activeTab===k?`rgba(${th.rgb},.12)`:"transparent",color:activeTab===k?th.accent:th.sub,padding:"6px 13px",border:`1px solid ${activeTab===k?`rgba(${th.rgb},.3)`:th.border}`}}>{l}</button>)}</div>
    {activeTab==="general"&&<Card t={th} style={{padding:"18px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
        <div><label style={{fontSize:11,color:th.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:5,fontWeight:600}}>Coming Soon Mode</label><select value={settings.coming_soon_mode||"true"} onChange={e=>setSettings({...settings,coming_soon_mode:e.target.value})} style={sel2}><option value="true">ON — Show coming soon page</option><option value="false">OFF — Show live site</option></select></div>
        <Inp label="Launch Date" value={settings.launch_date||""} onChange={v=>setSettings({...settings,launch_date:v})} type="date" t={th}/>
        <Inp label="Site Name" value={settings.site_name||""} onChange={v=>setSettings({...settings,site_name:v})} t={th}/>
        <Inp label="Contact Email" value={settings.contact_email||""} onChange={v=>setSettings({...settings,contact_email:v})} type="email" t={th}/>
        <div><label style={{fontSize:11,color:th.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:5,fontWeight:600}}>Eskom Stage</label><select value={settings.eskom_stage||"0"} onChange={e=>setSettings({...settings,eskom_stage:e.target.value})} style={sel2}>{["0","1","2","3","4","5","6"].map(s=><option key={s} value={s}>Stage {s}{s==="0"?" (No Load Shedding)":""}</option>)}</select></div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:11}}><Btn v="primary" t={th} onClick={save}>Save Settings</Btn>{saved&&<div style={{display:"flex",alignItems:"center",gap:5,fontSize:13,color:th.green}}><Ic.Chk c={th.green}/>Saved</div>}</div>
    </Card>}
    {activeTab==="coming_soon"&&<Card t={th} style={{padding:"18px"}}>
      <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text,marginBottom:13}}>Coming Soon Page</div>
      <Inp label="Headline" value={settings.cs_headline||"SA's Solar Platform."} onChange={v=>setSettings({...settings,cs_headline:v})} t={th}/>
      <Inp label="Launch Date" value={settings.launch_date||""} onChange={v=>setSettings({...settings,launch_date:v})} type="date" t={th}/>
      <Inp label="Sub-headline" value={settings.cs_sub||"Launching 8 April 2026."} onChange={v=>setSettings({...settings,cs_sub:v})} t={th}/>
      <Inp label="Description" value={settings.cs_desc||"Calculate your system. Find verified installers."} onChange={v=>setSettings({...settings,cs_desc:v})} rows={3} t={th}/>
      <div style={{marginBottom:16,display:"flex",alignItems:"center",gap:11}}><Toggle on={settings.coming_soon_mode==="true"} onChange={v=>setSettings({...settings,coming_soon_mode:v?"true":"false"})} t={th}/><span style={{fontSize:13,color:th.textMid}}>{settings.coming_soon_mode==="true"?"Coming soon page is live":"Site is live"}</span></div>
      <div style={{display:"flex",gap:9}}><Btn v="primary" t={th} onClick={save}>Save Changes</Btn>{saved&&<div style={{display:"flex",alignItems:"center",gap:5,fontSize:13,color:th.green}}><Ic.Chk c={th.green}/>Saved</div>}</div>
    </Card>}
    {activeTab==="ticker"&&<Card t={th} style={{padding:"18px"}}>
      <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text,marginBottom:5}}>Ticker Bar</div>
      <div style={{fontSize:12,color:th.sub,marginBottom:13}}>The scrolling news bar at the top of the main site</div>
      <div style={{marginBottom:13,display:"flex",alignItems:"center",gap:11}}><Toggle on={settings.ticker_enabled!=="false"} onChange={v=>setSettings({...settings,ticker_enabled:v?"true":"false"})} t={th}/><span style={{fontSize:13,color:th.textMid}}>Ticker bar {settings.ticker_enabled==="false"?"disabled":"enabled"}</span></div>
      {["☀️ Solar tax rebate: claim 25% back from SARS","🔋 Load shedding prep — is your system sized right?","⚙️ Pro Calculator now live","🩺 Free System Health Check — 2 minutes","🔧 Verified repair technicians across SA"].map((msg,i)=><div key={i} style={{display:"flex",gap:7,alignItems:"center",marginBottom:7}}><input defaultValue={msg} style={{flex:1,background:th.dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",border:`1px solid ${th.border}`,borderRadius:8,padding:"7px 11px",color:th.text,fontSize:12}}/><Btn v="danger" sm t={th}><Ic.X s={11} c={th.red}/></Btn></div>)}
      <div style={{marginTop:9,display:"flex",gap:7}}><Btn v="accent" sm t={th}><Ic.Plus s={12} c={th.accent}/>Add Message</Btn><Btn v="primary" sm t={th} onClick={save}>Save Ticker</Btn></div>
    </Card>}
    {activeTab==="seo"&&<Card t={th} style={{padding:"18px"}}>
      <div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text,marginBottom:13}}>SEO & Meta</div>
      <Inp label="Meta Title" value={settings.meta_title||"SolarIQ — SA's Solar Intelligence Platform"} onChange={v=>setSettings({...settings,meta_title:v})} t={th}/>
      <Inp label="Meta Description" value={settings.meta_desc||"Calculate your system, find verified installers, diagnose faults."} onChange={v=>setSettings({...settings,meta_desc:v})} rows={3} t={th}/>
      <Inp label="OG Image URL" value={settings.og_image||""} onChange={v=>setSettings({...settings,og_image:v})} placeholder="https://..." t={th}/>
      <Inp label="Google Analytics ID" value={settings.ga_id||""} onChange={v=>setSettings({...settings,ga_id:v})} placeholder="G-XXXXXXXXXX" t={th}/>
      <div style={{display:"flex",gap:9}}><Btn v="primary" t={th} onClick={save}>Save SEO</Btn>{saved&&<div style={{display:"flex",alignItems:"center",gap:5,fontSize:13,color:th.green}}><Ic.Chk c={th.green}/>Saved</div>}</div>
    </Card>}
    {activeTab==="integrations"&&<div style={{display:"flex",flexDirection:"column",gap:9}}>
      {[["💬","WhatsApp Business API","Send automated lead follow-ups and installer notifications via WhatsApp."],["📧","SendGrid / Email","Transactional emails for leads, subscribers and system notifications."],["📊","Google Analytics 4","Detailed user behaviour and traffic analytics."],["🗺️","Google Maps API","Display installer locations on an interactive map."],["💳","Peach Payments / PayFast","Accept payments for premium installer listings."],["🔗","Make.com (Automation)","Connect to 1000+ apps for automated workflows."],["📱","Firebase Push Notifications","Send push notifications to mobile users."]].map(([icon,name,desc])=><Card key={name} t={th} style={{padding:"14px 16px"}}><div style={{display:"flex",alignItems:"center",gap:13}}><div style={{width:42,height:42,borderRadius:11,background:th.dark?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,flexShrink:0}}>{icon}</div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:th.text,fontFamily:H,marginBottom:2}}>{name}</div><div style={{fontSize:12,color:th.sub}}>{desc}</div></div><div style={{display:"flex",alignItems:"center",gap:7,flexShrink:0}}><div style={{width:6,height:6,borderRadius:"50%",background:th.sub}}/><span style={{fontSize:11,color:th.sub,fontWeight:600}}>Not connected</span><Btn v="ghost" sm t={th}>Connect</Btn></div></div></Card>)}
    </div>}
    {activeTab==="security"&&<div style={{display:"flex",flexDirection:"column",gap:11}}>
      <Card t={th} style={{padding:"16px"}}><div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text,marginBottom:13}}>Security Settings</div>
        {[["Two-factor authentication","Require 2FA for all admin logins",false],["Login alerts","Email on every new admin login",true],["Session timeout","Auto sign out after 8 hours",true]].map(([label,desc,def])=>{
          const[on,setOn]=useState(def);
          return <div key={label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,paddingBottom:14,borderBottom:`1px solid ${th.border}`}}><div><div style={{fontSize:13,fontWeight:600,color:th.text,marginBottom:1}}>{label}</div><div style={{fontSize:11,color:th.sub}}>{desc}</div></div><Toggle on={on} onChange={setOn} t={th}/></div>;
        })}
      </Card>
      <Card t={th} style={{padding:"16px"}}><div style={{fontFamily:H,fontSize:13,fontWeight:700,color:th.text,marginBottom:13}}>Audit Log</div>
        {[["Admin login","mail4tebello@gmail.com","2 hours ago"],["Settings saved","Coming soon mode updated","3 hours ago"],["Post published","How much does solar cost","Yesterday"]].map(([action,detail,time])=><div key={action+time} style={{display:"flex",gap:9,alignItems:"flex-start",marginBottom:9,paddingBottom:9,borderBottom:`1px solid ${th.border}`}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:th.green,marginTop:4,flexShrink:0}}/>
          <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:th.text}}>{action}</div><div style={{fontSize:11,color:th.sub}}>{detail}</div></div>
          <div style={{fontSize:10,color:th.sub,flexShrink:0}}>{time}</div>
        </div>)}
      </Card>
    </div>}
  </div>;
}

function MorePage({setTab,t}){
  const th=t||DARK;
  const items=[{id:"analytics",label:"Analytics",Icon:Ic.Chart,color:th.blue,desc:"Traffic, events & usage stats"},{id:"messages",label:"Messages",Icon:Ic.Msg,color:th.accent,desc:"Inbox & contact submissions"},{id:"subscribers",label:"Subscribers",Icon:Ic.Mail,color:th.purple,desc:"Email list & newsletter"},{id:"users",label:"Team",Icon:Ic.Users,color:th.green,desc:"Admin users & permissions"},{id:"settings",label:"Settings",Icon:Ic.Cog,color:th.textMid,desc:"Site config, SEO, integrations"}];
  return <div style={{animation:"fadeUp .35s ease"}}>
    <div style={{fontFamily:H,fontSize:20,fontWeight:900,color:th.text,marginBottom:3}}>More</div>
    <div style={{fontSize:13,color:th.sub,marginBottom:16}}>Additional tools and configuration</div>
    <div style={{display:"flex",flexDirection:"column",gap:7}}>{items.map((item,i)=><button key={item.id} onClick={()=>setTab(item.id)} style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:12,padding:"14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",width:"100%",textAlign:"left",animation:`fadeUp .3s ease ${i*.06}s both`,transition:"border .18s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=th.borderHover} onMouseLeave={e=>e.currentTarget.style.borderColor=th.border}>
      <div style={{width:40,height:40,borderRadius:10,background:`${item.color}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><item.Icon s={18} c={item.color}/></div>
      <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:th.text,fontFamily:H}}>{item.label}</div><div style={{fontSize:12,color:th.sub,marginTop:1}}>{item.desc}</div></div>
      <Ic.Right s={13} c={th.sub}/>
    </button>)}</div>
  </div>;
}

export default function Admin(){
  const[session,setSession]=useState(null);
  const[appLoading,setAppLoading]=useState(true);
  const[tab,setTab]=useState("dashboard");
  const[collapsed,setCollapsed]=useState(false);
  const[isDark,setIsDark]=useState(true);
  const[showNotif,setShowNotif]=useState(false);
  const[notifs]=useState(MNOTIFS);
  const[stats,setStats]=useState({installers:0,leads:0,subscribers:0,posts:0,pending:0,events:0});
  const[recentLeads,setRecentLeads]=useState([]);
  const[statsLoading,setStatsLoading]=useState(true);
  const sc=useScreen();
  const t=isDark?DARK:LIGHT;

  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}})=>{setSession(session);setAppLoading(false);});
    const{data:{subscription}}=sb.auth.onAuthStateChange((_,s)=>setSession(s));
    return()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    if(!session)return;
    const load=async()=>{
      setStatsLoading(true);
      const[inst,leads,subs,posts,pending,events,rl]=await Promise.all([
        sb.from("installers").select("id",{count:"exact",head:true}).eq("status","approved"),
        sb.from("leads").select("id",{count:"exact",head:true}),
        sb.from("subscribers").select("id",{count:"exact",head:true}),
        sb.from("posts").select("id",{count:"exact",head:true}).eq("published",true),
        sb.from("installers").select("id",{count:"exact",head:true}).eq("status","pending"),
        sb.from("events").select("id",{count:"exact",head:true}),
        sb.from("leads").select("*,installers(name)").order("created_at",{ascending:false}).limit(5),
      ]);
      setStats({installers:inst.count||0,leads:leads.count||0,subscribers:subs.count||0,posts:posts.count||0,pending:pending.count||0,events:events.count||0});
      setRecentLeads(rl.data||[]);
      setStatsLoading(false);
    };
    load();
  },[session]);

  const signOut=async()=>{await sb.auth.signOut();setSession(null);};
  const sidebarW=sc.isDesktop?(collapsed?SC:SW):0;
  const unreadMsgs=MMSGS.filter(m=>!m.read).length;

  const PAGES={
    dashboard:<Dashboard stats={stats} recentLeads={recentLeads} loading={statsLoading} t={t}/>,
    installers:<InstallersManager t={t}/>,
    leads:<LeadsManager t={t}/>,
    blog:<BlogManager t={t}/>,
    analytics:<Analytics t={t}/>,
    messages:<Messages t={t}/>,
    subscribers:<SubscribersManager t={t}/>,
    users:<TeamManager t={t}/>,
    settings:<Settings t={t}/>,
    more:<MorePage setTab={setTab} t={t}/>,
  };

  if(appLoading)return <>
    <style>{mkCss(DARK)}</style>
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:14,background:DARK.bg}}>
      <div style={{width:40,height:40,background:`linear-gradient(135deg,${DARK.accent},${DARK.accent2})`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,animation:"float 2s ease infinite"}}>☀️</div>
      <Spinner t={DARK}/>
    </div>
  </>;

  if(!session)return <>
    <style>{mkCss(DARK)}</style>
    <Login onLogin={()=>sb.auth.getSession().then(({data:{session}})=>setSession(session))}/>
  </>;

  return <>
    <style>{mkCss(t)}</style>
    <div style={{display:"flex",minHeight:"100vh",background:t.bg,transition:"background .3s"}}>
      {!sc.isMobile&&<Sidebar tab={tab} setTab={setTab} collapsed={collapsed} setCollapsed={setCollapsed} onSignOut={signOut} pending={stats.pending} msgCount={unreadMsgs} t={t}/>}
      {sc.isMobile&&<MobileTopBar tab={tab} notifs={notifs} showNotif={showNotif} setShowNotif={setShowNotif} isDark={isDark} setIsDark={setIsDark} t={t}/>}
      <div style={{flex:1,marginLeft:sc.isMobile?0:sidebarW,transition:"margin-left .25s cubic-bezier(.4,0,.2,1)",paddingTop:sc.isMobile?52:0,paddingBottom:sc.isMobile?68:0,minWidth:0,display:"flex",flexDirection:"column"}}>
        {!sc.isMobile&&<DesktopTopBar tab={tab} notifs={notifs} showNotif={showNotif} setShowNotif={setShowNotif} isDark={isDark} setIsDark={setIsDark} t={t}/>}
        <div style={{flex:1,padding:sc.isMobile?"13px 12px":sc.isTablet?"20px 22px":"22px 30px",maxWidth:1400,margin:"0 auto",width:"100%"}}>
          {PAGES[tab]||PAGES.dashboard}
        </div>
      </div>
      {sc.isMobile&&<MobileBottomNav tab={tab} setTab={setTab} pending={stats.pending} t={t}/>}
      {showNotif&&<NotifPanel notifs={notifs} onClose={()=>setShowNotif(false)} t={t}/>}
      {showNotif&&<div onClick={()=>setShowNotif(false)} style={{position:"fixed",inset:0,zIndex:499}}/>}
    </div>
  </>;
}

import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://intvnxvannltfibguykw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHZueHZhbm5sdGZpYmd1eWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzAwNjgsImV4cCI6MjA5MDA0NjA2OH0.KnPP0-vxXyBYTvHxbXfrH8AKd61u1hWpEO2gpjWnzNE";
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const H = "'Lexend',sans-serif";
const B = "'Plus Jakarta Sans',sans-serif";
const C = {
  bg:"#07090d", bg2:"#0c0f15", card:"rgba(255,255,255,.04)", card2:"rgba(255,255,255,.07)",
  border:"rgba(255,255,255,.08)", borderHover:"rgba(255,255,255,.15)",
  accent:"#f5a623", accent2:"#ff6b00", rgb:"245,166,35",
  text:"#f0f0f0", textMid:"#aaa", sub:"#555",
  green:"#4ade80", red:"#f87171", blue:"#60a5fa", purple:"#c084fc",
  nav:"rgba(7,9,13,.98)"
};
const SW = 240, SC = 64;

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{width:100%;min-height:100vh;background:${C.bg};color:${C.text};font-family:${B};overflow-x:hidden}
  ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(245,166,35,.4);border-radius:4px}
  input,textarea,select,button{outline:none;font-family:${B}}
  input::placeholder,textarea::placeholder{color:${C.sub}}
  select option{background:#111;color:${C.text}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
  @keyframes particle{0%,100%{transform:translateY(0) scale(1);opacity:.12}50%{transform:translateY(-18px) scale(1.4);opacity:.5}}
  @keyframes breathe{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:.9;transform:scale(1.06)}}
  @keyframes barGrow{from{width:0}to{width:var(--w)}}
  .nav-btn{transition:all .2s cubic-bezier(.4,0,.2,1)}
  .nav-btn:hover{background:rgba(245,166,35,.07)!important}
  .card-lift{transition:transform .2s cubic-bezier(.4,0,.2,1),border-color .2s}
  .card-lift:hover{transform:translateY(-2px);border-color:rgba(255,255,255,.14)!important}
  input:focus,textarea:focus,select:focus{border-color:rgba(245,166,35,.5)!important}
`;

// ── SCREEN HOOK ───────────────────────────────────────────────────────────────
function useScreen() {
  const [w,setW] = useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{
    const fn=()=>setW(window.innerWidth);
    window.addEventListener("resize",fn);
    return()=>window.removeEventListener("resize",fn);
  },[]);
  return{w,isMobile:w<768,isTablet:w>=768&&w<1100,isDesktop:w>=1100};
}

// ── SVG ICONS ─────────────────────────────────────────────────────────────────
const I={
  Grid:({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>,
  Building:({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Clip:({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="14" y2="15"/></svg>,
  Doc:({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Chart:({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  Mail:({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Cog:({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Bell:({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Search:({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Out:({s=16,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Left:({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Right:({s=18,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Link:({s=15,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  Up:({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Down:({s=14,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  More:({s=20,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>,
  Plus:({s=15,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Chk:({s=13,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  X:({s=13,c="currentColor"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

// ── SPARKLINE ─────────────────────────────────────────────────────────────────
let _sid = 0;
function Sparkline({ data, color=C.accent, h=34, w=96 }) {
  const id = useRef(`spk${_sid++}`).current;
  if(!data||data.length<2) return null;
  const max=Math.max(...data), min=Math.min(...data), range=max-min||1;
  const pts=data.map((v,i)=>{
    const x=(i/(data.length-1))*w;
    const y=h-((v-min)/range)*(h-4)-2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return(
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{overflow:"visible",display:"block"}}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#${id})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
const SP = {
  up:    [1,1.5,2,1.8,3,2.5,3.8,3.2,5,4.5,6,7],
  flat:  [4,4.2,3.8,4.5,4,4.8,4.1,5,4.3,4.9,4.6,5],
  spike: [2,2.5,3,2,4.5,8,5.5,4,3.5,5.5,4.8,6.5],
  zero:  [1,1,1,1,1,1,1,1,1,1,1,1],
};

// ── PRIMITIVES ────────────────────────────────────────────────────────────────
function Btn({children,onClick,variant="primary",sm,disabled,full,style={}}){
  const V={
    primary:{bg:`linear-gradient(135deg,${C.accent},${C.accent2})`,color:"#000",border:"none"},
    ghost:{bg:"rgba(255,255,255,.05)",color:C.textMid,border:`1px solid ${C.border}`},
    danger:{bg:"rgba(239,68,68,.1)",color:C.red,border:"1px solid rgba(239,68,68,.25)"},
    success:{bg:"rgba(74,222,128,.1)",color:C.green,border:"1px solid rgba(74,222,128,.25)"},
    accent:{bg:`rgba(${C.rgb},.1)`,color:C.accent,border:`1px solid rgba(${C.rgb},.28)`},
  };
  const v=V[variant]||V.primary;
  return(
    <button onClick={onClick} disabled={disabled} style={{
      background:v.bg,color:v.color,border:v.border,borderRadius:sm?8:10,
      padding:sm?"6px 14px":"10px 20px",fontSize:sm?12:13,fontWeight:700,
      cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,
      width:full?"100%":"auto",display:"inline-flex",alignItems:"center",
      gap:6,transition:"all .18s",whiteSpace:"nowrap",...style
    }}>{children}</button>
  );
}
function Card({children,style={},className=""}){
  return <div className={className} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,...style}}>{children}</div>;
}
function Badge({children,color}){
  const c=color||C.accent;
  return <span style={{fontSize:10,fontWeight:700,background:`${c}18`,color:c,padding:"2px 8px",borderRadius:20,letterSpacing:.5,whiteSpace:"nowrap"}}>{children}</span>;
}
function Inp({label,value,onChange,type="text",placeholder,rows}){
  return(
    <div style={{marginBottom:14}}>
      {label&&<label style={{fontSize:11,color:C.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:600}}>{label}</label>}
      {rows
        ?<textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:9,padding:"10px 13px",color:C.text,fontSize:13,resize:"vertical",transition:"border .2s"}}/>
        :<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:9,padding:"10px 13px",color:C.text,fontSize:13,transition:"border .2s"}}/>
      }
    </div>
  );
}
function Spinner(){
  return <div style={{width:20,height:20,border:`2px solid rgba(${C.rgb},.2)`,borderTopColor:C.accent,borderRadius:"50%",animation:"spin 1s linear infinite"}}/>;
}

// ── STAT CARD ─────────────────────────────────────────────────────────────────
function StatCard({icon,label,value,color,sparkData,trend,up,idx=0}){
  const [disp,setDisp]=useState(0);
  useEffect(()=>{
    const target=typeof value==="number"?value:0;
    let s=null;const dur=900;
    const fn=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/dur,1);setDisp(Math.floor((1-Math.pow(1-p,3))*target));if(p<1)requestAnimationFrame(fn);};
    requestAnimationFrame(fn);
  },[value]);
  return(
    <div className="card-lift" style={{
      background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"16px 18px",
      animation:`fadeUp .4s ease ${idx*.06}s both`,display:"flex",flexDirection:"column",gap:10,
      position:"relative",overflow:"hidden"
    }}>
      <div style={{position:"absolute",top:0,right:0,width:90,height:90,background:`radial-gradient(circle at top right,${color}15,transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div style={{width:34,height:34,borderRadius:9,background:`${color}15`,border:`1px solid ${color}25`,display:"flex",alignItems:"center",justifyContent:"center"}}>
          {icon}
        </div>
        {trend&&(
          <div style={{display:"flex",alignItems:"center",gap:3,fontSize:11,color:up?C.green:C.red,fontWeight:700}}>
            {up?<I.Up c={C.green}/>:<I.Down c={C.red}/>} {trend}
          </div>
        )}
      </div>
      <div>
        <div style={{fontFamily:H,fontSize:26,fontWeight:900,color:C.text,lineHeight:1}}>{typeof value==="number"?disp.toLocaleString():value}</div>
        <div style={{fontSize:11,color:C.sub,marginTop:3,fontWeight:500}}>{label}</div>
      </div>
      {sparkData&&<Sparkline data={sparkData} color={color} h={30} w={88}/>}
    </div>
  );
}

// ── GREETING ──────────────────────────────────────────────────────────────────
function getGreeting(name){
  const h=new Date().getHours();
  if(h<5) return[`🌙 Late night, ${name}`,"The platform never sleeps."];
  if(h<12) return[`☀️ Good morning, ${name}`,"Here's what happened overnight."];
  if(h<17) return[`🌤️ Good afternoon, ${name}`,"Here's your platform at a glance."];
  return[`🌙 Good evening, ${name}`,"Here's how today performed."];
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function Login({onLogin}){
  const [email,setEmail]=useState("");
  const [pw,setPw]=useState("");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);
  const sc=useScreen();
  const pts=Array.from({length:22},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,size:Math.random()*2+1,dur:Math.random()*10+8,delay:Math.random()*8,op:Math.random()*.35+.08}));

  const login=async()=>{
    if(!email||!pw){setErr("Please enter your email and password.");return;}
    setLoading(true);setErr("");
    const{error}=await sb.auth.signInWithPassword({email,password:pw});
    if(error)setErr(error.message);
    else onLogin();
    setLoading(false);
  };

  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20,position:"relative",overflow:"hidden"}}>
      {/* BG effects */}
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 80% 50% at 50% -10%,rgba(${C.rgb},.09),transparent)`,pointerEvents:"none"}}/>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 50% 40% at 90% 110%,rgba(255,107,0,.06),transparent)`,pointerEvents:"none"}}/>
      {pts.map(p=><div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,borderRadius:"50%",background:C.accent,opacity:p.op,animation:`particle ${p.dur}s ease-in-out ${p.delay}s infinite`,pointerEvents:"none"}}/>)}

      <div style={{width:"100%",maxWidth:sc.isDesktop?420:380,animation:"fadeUp .5s ease",position:"relative",zIndex:1}}>
        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{width:56,height:56,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 14px",animation:"float 3s ease infinite",boxShadow:`0 0 40px rgba(${C.rgb},.3)`}}>☀️</div>
          <div style={{fontFamily:H,fontSize:sc.isDesktop?30:26,fontWeight:900,color:C.text}}>Solar<span style={{color:C.accent}}>IQ</span></div>
          <div style={{fontSize:11,color:C.sub,marginTop:4,letterSpacing:2,textTransform:"uppercase"}}>Admin Portal</div>
        </div>

        {/* Card */}
        <div style={{background:"rgba(255,255,255,.03)",border:`1px solid rgba(255,255,255,.09)`,borderRadius:20,padding:sc.isDesktop?"32px":"24px",backdropFilter:"blur(20px)"}}>
          {/* Email */}
          <div style={{marginBottom:18}}>
            <label style={{fontSize:11,color:C.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:7,fontWeight:600}}>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="mail4tebello@gmail.com"
              style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",color:C.text,fontSize:14}}/>
          </div>
          {/* Password */}
          <div style={{marginBottom:err?14:24}}>
            <label style={{fontSize:11,color:C.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:7,fontWeight:600}}>Password</label>
            <input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="••••••••••"
              style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",color:C.text,fontSize:14}}/>
          </div>
          {err&&<div style={{fontSize:12,color:C.red,marginBottom:16,display:"flex",alignItems:"center",gap:6}}><I.X c={C.red}/> {err}</div>}
          <button onClick={login} disabled={loading} style={{width:"100%",background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",borderRadius:10,padding:"13px",fontSize:14,fontWeight:800,color:"#000",cursor:loading?"not-allowed":"pointer",opacity:loading?.7:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:H}}>
            {loading?<><Spinner/> Signing in...</>:"Sign in to Admin →"}
          </button>
        </div>
        <div style={{textAlign:"center",marginTop:18,fontSize:11,color:C.sub}}>🔒 Secured by Supabase · SolarIQ Admin</div>
      </div>
    </div>
  );
}

// ── NAV CONFIG ────────────────────────────────────────────────────────────────
const NAV=[
  {id:"dashboard",label:"Dashboard",Icon:I.Grid},
  {id:"installers",label:"Installers",Icon:I.Building},
  {id:"leads",label:"Leads",Icon:I.Clip},
  {id:"blog",label:"Blog",Icon:I.Doc},
  {id:"analytics",label:"Analytics",Icon:I.Chart},
  {id:"subscribers",label:"Subscribers",Icon:I.Mail},
  {id:"settings",label:"Settings",Icon:I.Cog},
];
const MOB=[
  {id:"dashboard",label:"Home",Icon:I.Grid},
  {id:"installers",label:"Installers",Icon:I.Building},
  {id:"leads",label:"Leads",Icon:I.Clip},
  {id:"blog",label:"Blog",Icon:I.Doc},
  {id:"more",label:"More",Icon:I.More},
];

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
function Sidebar({tab,setTab,collapsed,setCollapsed,onSignOut,pending}){
  return(
    <div style={{width:collapsed?SC:SW,background:C.nav,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",position:"fixed",top:0,bottom:0,left:0,zIndex:300,transition:"width .25s cubic-bezier(.4,0,.2,1)",overflow:"hidden"}}>
      {/* Logo */}
      <div style={{padding:"16px 14px 12px",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10,overflow:"hidden"}}>
          <div style={{width:32,height:32,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0,animation:"float 3s ease infinite"}}>☀️</div>
          {!collapsed&&<div style={{animation:"fadeIn .2s ease"}}>
            <div style={{fontFamily:H,fontSize:17,fontWeight:900,color:C.text,whiteSpace:"nowrap"}}>Solar<span style={{color:C.accent}}>IQ</span></div>
            <div style={{fontSize:9,color:C.sub,letterSpacing:2,textTransform:"uppercase"}}>Admin Panel</div>
          </div>}
        </div>
      </div>

      {/* Search */}
      {!collapsed&&(
        <div style={{padding:"10px 10px",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
          <div style={{position:"relative"}}>
            <div style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)"}}>
              <I.Search s={13} c={C.sub}/>
            </div>
            <input placeholder="Search..." style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 10px 8px 30px",color:C.text,fontSize:12}}/>
          </div>
        </div>
      )}

      {/* Live site link */}
      {!collapsed&&(
        <div style={{padding:"8px 10px",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
          <a href="https://solariq.vercel.app?preview=solariq2026" target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:8,textDecoration:"none",background:`rgba(${C.rgb},.05)`,border:`1px dashed rgba(${C.rgb},.2)`}}>
            <I.Link s={12} c={C.accent}/>
            <span style={{fontSize:11,color:C.accent,fontWeight:600,whiteSpace:"nowrap"}}>View Live Site</span>
          </a>
        </div>
      )}

      {/* Nav */}
      <nav style={{flex:1,padding:"8px",overflowY:"auto",overflowX:"hidden"}}>
        {NAV.map(n=>{
          const active=tab===n.id;
          const badge=n.id==="installers"&&pending>0;
          return(
            <button key={n.id} onClick={()=>setTab(n.id)} className="nav-btn" style={{
              width:"100%",display:"flex",alignItems:"center",gap:10,
              padding:collapsed?"10px 0":"9px 10px",justifyContent:collapsed?"center":"flex-start",
              borderRadius:9,border:"none",marginBottom:2,
              background:active?`rgba(${C.rgb},.1)`:"transparent",
              borderLeft:active?`2px solid ${C.accent}`:"2px solid transparent",
              color:active?C.accent:C.sub,cursor:"pointer",position:"relative"
            }}>
              <n.Icon s={17} c={active?C.accent:C.sub}/>
              {!collapsed&&<span style={{fontSize:13,fontWeight:active?700:500,whiteSpace:"nowrap"}}>{n.label}</span>}
              {badge&&!collapsed&&<span style={{marginLeft:"auto",background:C.red,color:"#fff",borderRadius:10,padding:"1px 7px",fontSize:10,fontWeight:700}}>{pending}</span>}
              {badge&&collapsed&&<span style={{position:"absolute",top:6,right:8,width:7,height:7,background:C.red,borderRadius:"50%"}}/>}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{borderTop:`1px solid ${C.border}`,padding:"10px 8px",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"7px 6px",borderRadius:9,justifyContent:collapsed?"center":"flex-start",overflow:"hidden"}}>
          <div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent},${C.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#000",flexShrink:0,fontFamily:H}}>T</div>
          {!collapsed&&<>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:700,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>Tebello</div>
              <div style={{fontSize:10,color:C.sub}}>Administrator</div>
            </div>
            <button onClick={onSignOut} title="Sign out" style={{background:"none",border:"none",cursor:"pointer",padding:4,display:"flex",color:C.sub}}>
              <I.Out s={15} c={C.sub}/>
            </button>
          </>}
        </div>
        <button onClick={()=>setCollapsed(c=>!c)} style={{width:"100%",background:"rgba(255,255,255,.04)",border:`1px solid ${C.border}`,borderRadius:8,padding:"7px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",marginTop:6,color:C.sub}}>
          {collapsed?<I.Right s={15} c={C.sub}/>:<I.Left s={15} c={C.sub}/>}
        </button>
      </div>
    </div>
  );
}

// ── MOBILE TOP BAR ────────────────────────────────────────────────────────────
function MobileTopBar({tab,onSignOut,pending}){
  const label=[...NAV,{id:"more",label:"More"}].find(n=>n.id===tab)?.label||"";
  return(
    <div style={{position:"fixed",top:0,left:0,right:0,height:54,background:C.nav,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",zIndex:300,backdropFilter:"blur(20px)"}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:26,height:26,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>☀️</div>
        <span style={{fontFamily:H,fontSize:16,fontWeight:900,color:C.text}}>Solar<span style={{color:C.accent}}>IQ</span></span>
      </div>
      <span style={{fontFamily:H,fontSize:13,fontWeight:700,color:C.textMid}}>{label}</span>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <button style={{position:"relative",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 8px",cursor:"pointer",display:"flex"}}>
          <I.Bell s={16} c={C.sub}/>
          {pending>0&&<span style={{position:"absolute",top:4,right:4,width:6,height:6,background:C.red,borderRadius:"50%"}}/>}
        </button>
        <button onClick={onSignOut} style={{background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 8px",cursor:"pointer",display:"flex"}}>
          <I.Out s={16} c={C.sub}/>
        </button>
      </div>
    </div>
  );
}

// ── MOBILE BOTTOM NAV ─────────────────────────────────────────────────────────
function MobileBottomNav({tab,setTab,pending}){
  return(
    <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.nav,borderTop:`1px solid ${C.border}`,display:"flex",zIndex:300,paddingBottom:"env(safe-area-inset-bottom,0px)",backdropFilter:"blur(20px)"}}>
      {MOB.map(n=>{
        const active=tab===n.id;
        const badge=n.id==="installers"&&pending>0;
        return(
          <button key={n.id} onClick={()=>setTab(n.id)} style={{flex:1,background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"10px 4px 8px",cursor:"pointer",gap:3,position:"relative"}}>
            {badge&&<span style={{position:"absolute",top:7,right:"calc(50% - 12px)",width:7,height:7,background:C.red,borderRadius:"50%"}}/>}
            <div style={{transition:"all .2s",opacity:active?1:.4}}>
              <n.Icon s={20} c={active?C.accent:C.sub}/>
            </div>
            <span style={{fontSize:9,fontWeight:700,color:active?C.accent:C.sub,letterSpacing:.3,transition:"color .2s"}}>{n.label}</span>
            {active&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:20,height:2,background:C.accent,borderRadius:"0 0 2px 2px"}}/>}
          </button>
        );
      })}
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({stats,recentLeads,loading}){
  const sc=useScreen();
  const [greet,sub]=getGreeting("Tebello");
  const dateStr=new Date().toLocaleDateString("en-ZA",{weekday:"long",year:"numeric",month:"long",day:"numeric"});

  if(loading) return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:80,flexDirection:"column",gap:12}}>
      <Spinner/><div style={{fontSize:13,color:C.sub}}>Loading dashboard...</div>
    </div>
  );

  const cards=[
    {icon:<I.Building s={16} c={C.accent}/>,label:"Live Installers",value:stats.installers,color:C.accent,sparkData:SP.up,trend:"Active",up:true},
    {icon:<I.Clip s={16} c={C.green}/>,label:"Total Leads",value:stats.leads,color:C.green,sparkData:SP.spike,trend:"New",up:true},
    {icon:<I.Mail s={16} c={C.blue}/>,label:"Subscribers",value:stats.subscribers,color:C.blue,sparkData:SP.up,trend:"+2",up:true},
    {icon:<I.Doc s={16} c={C.purple}/>,label:"Published Posts",value:stats.posts,color:C.purple,sparkData:SP.flat},
    {icon:<I.Bell s={16} c={stats.pending>0?C.red:C.sub}/>,label:"Pending Reviews",value:stats.pending,color:stats.pending>0?C.red:C.sub,sparkData:SP.zero},
    {icon:<I.Chart s={16} c="#fb923c"/>,label:"Page Events",value:stats.events,color:"#fb923c",sparkData:SP.up,trend:"↑",up:true},
  ];

  const tools=[
    {label:"Solar Calculator",pct:68,color:C.accent},
    {label:"Installer Directory",pct:45,color:C.green},
    {label:"Servicing Tools",pct:31,color:C.blue},
    {label:"Blog & Guides",pct:22,color:C.purple},
  ];

  const sc2=s=>s==="new"?C.accent:s==="converted"?C.green:s==="lost"?C.red:C.sub;

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      {/* Greeting */}
      <div style={{background:`linear-gradient(135deg,rgba(${C.rgb},.09) 0%,rgba(${C.rgb},.03) 60%,rgba(255,107,0,.05) 100%)`,border:`1px solid rgba(${C.rgb},.15)`,borderRadius:16,padding:sc.isMobile?"18px 16px":"22px 28px",marginBottom:18,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-20,right:-20,width:140,height:140,background:`radial-gradient(circle,rgba(${C.rgb},.14),transparent 70%)`,pointerEvents:"none"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:sc.isMobile?"flex-start":"center",flexDirection:sc.isMobile?"column":"row",gap:14}}>
          <div>
            <div style={{fontFamily:H,fontSize:sc.isMobile?20:26,fontWeight:900,color:C.text,marginBottom:3}}>{greet}</div>
            <div style={{fontSize:12,color:C.sub}}>{dateStr} · {sub}</div>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Btn sm variant="accent"><I.Plus s={13} c={C.accent}/>Add Installer</Btn>
            <Btn sm variant="ghost"><I.Doc s={13}/>New Post</Btn>
          </div>
        </div>
        {stats.pending>0&&(
          <div style={{marginTop:14,background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",borderRadius:9,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
            <span>⚠️</span>
            <span style={{fontSize:13,color:C.red,fontWeight:600}}>{stats.pending} installer application{stats.pending!==1?"s":""} awaiting review</span>
          </div>
        )}
      </div>

      {/* Stat cards */}
      <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":sc.isTablet?"repeat(3,1fr)":"repeat(6,1fr)",gap:10,marginBottom:16}}>
        {cards.map((c,i)=><StatCard key={c.label} {...c} idx={i}/>)}
      </div>

      {/* Bottom section */}
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1.4fr 1fr":"1fr",gap:12}}>
        {/* Recent leads */}
        <Card style={{padding:"18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontFamily:H,fontSize:15,fontWeight:700,color:C.text}}>Recent Leads</div>
            <Btn sm variant="ghost" style={{fontSize:11,padding:"4px 10px",borderRadius:6}}>View all →</Btn>
          </div>
          {recentLeads.length===0
            ?<div style={{textAlign:"center",padding:"28px",color:C.sub,fontSize:13}}>No leads yet — they'll appear here when quote requests come in.</div>
            :<div style={{display:"flex",flexDirection:"column",gap:6}}>
              {recentLeads.map((l,i)=>(
                <div key={l.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",background:"rgba(255,255,255,.03)",borderRadius:9,animation:`fadeUp .3s ease ${i*.05}s both`}}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:`rgba(${C.rgb},.1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>👤</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:600,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.name||"Anonymous"}</div>
                    <div style={{fontSize:11,color:C.sub}}>{l.installers?.name||"—"} · {l.system_kw}kW</div>
                  </div>
                  <Badge color={sc2(l.status)}>{l.status}</Badge>
                  <div style={{fontSize:10,color:C.sub,flexShrink:0}}>{new Date(l.created_at).toLocaleDateString("en-ZA")}</div>
                </div>
              ))}
            </div>
          }
        </Card>

        {/* Right panel */}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {/* Tool usage */}
          <Card style={{padding:"18px"}}>
            <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:C.text,marginBottom:16}}>Tool Usage</div>
            {tools.map((t,i)=>(
              <div key={t.label} style={{marginBottom:i<tools.length-1?14:0}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                  <span style={{fontSize:12,color:C.textMid}}>{t.label}</span>
                  <span style={{fontSize:12,fontWeight:700,color:t.color}}>{t.pct}%</span>
                </div>
                <div style={{height:4,background:"rgba(255,255,255,.06)",borderRadius:2,overflow:"hidden"}}>
                  <div style={{width:`${t.pct}%`,height:"100%",background:t.color,borderRadius:2,transition:"width 1.2s cubic-bezier(.4,0,.2,1)"}}/>
                </div>
              </div>
            ))}
          </Card>

          {/* Platform status */}
          <Card style={{padding:"18px"}}>
            <div style={{fontFamily:H,fontSize:14,fontWeight:700,color:C.text,marginBottom:14}}>Platform Status</div>
            {[["Database","Operational",C.green],["Auth","Operational",C.green],["Storage","Operational",C.green],["Edge Functions","Not set up",C.sub]].map(([name,status,color])=>(
              <div key={name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <span style={{fontSize:12,color:C.sub}}>{name}</span>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:color,animation:color===C.green?"pulse 2s infinite":"none"}}/>
                  <span style={{fontSize:11,color,fontWeight:600}}>{status}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── MORE PAGE (mobile) ────────────────────────────────────────────────────────
function MorePage({setTab}){
  const items=[
    {id:"analytics",label:"Analytics",Icon:I.Chart,color:C.blue,desc:"Traffic, events & usage stats"},
    {id:"subscribers",label:"Subscribers",Icon:I.Mail,color:C.purple,desc:"Email list & newsletter"},
    {id:"settings",label:"Settings",Icon:I.Cog,color:C.textMid,desc:"Site config, coming soon, SEO"},
  ];
  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:C.text,marginBottom:4}}>More</div>
      <div style={{fontSize:13,color:C.sub,marginBottom:20}}>Additional tools and settings</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {items.map((item,i)=>(
          <button key={item.id} onClick={()=>setTab(item.id)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",width:"100%",textAlign:"left",transition:"border .2s",animation:`fadeUp .3s ease ${i*.07}s both`}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=C.borderHover}
            onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
            <div style={{width:44,height:44,borderRadius:12,background:`${item.color}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <item.Icon s={20} c={item.color}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:700,color:C.text,fontFamily:H}}>{item.label}</div>
              <div style={{fontSize:12,color:C.sub,marginTop:2}}>{item.desc}</div>
            </div>
            <I.Right s={16} c={C.sub}/>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── ANALYTICS STUB ────────────────────────────────────────────────────────────
function Analytics(){
  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:C.text,marginBottom:4}}>Analytics</div>
      <div style={{fontSize:13,color:C.sub,marginBottom:24}}>Traffic, events and platform usage</div>
      <Card style={{padding:"40px",textAlign:"center"}}>
        <div style={{fontSize:32,marginBottom:12}}>📊</div>
        <div style={{fontFamily:H,fontSize:17,fontWeight:700,color:C.text,marginBottom:6}}>Coming in Phase 2</div>
        <div style={{fontSize:13,color:C.sub,maxWidth:320,margin:"0 auto"}}>Full analytics with traffic sources, device types, calculator usage, and filterable date ranges.</div>
      </Card>
    </div>
  );
}

// ── EXISTING PAGES (kept, re-wrapped) ─────────────────────────────────────────
function InstallersManager(){
  const[installers,setInstallers]=useState([]);const[loading,setLoading]=useState(true);
  const[filter,setFilter]=useState("pending");const[selected,setSelected]=useState(null);
  const[docs,setDocs]=useState([]);

  const load=async()=>{
    setLoading(true);
    const{data}=await sb.from("installers").select("*").order("created_at",{ascending:false});
    setInstallers(data||[]);setLoading(false);
  };
  useEffect(()=>{load();},[]);

  const loadDocs=async(id)=>{
    const{data}=await sb.from("installer_documents").select("*").eq("installer_id",id);
    setDocs(data||[]);
  };
  const approve=async(id)=>{await sb.from("installers").update({status:"approved"}).eq("id",id);load();setSelected(null);};
  const reject=async(id)=>{await sb.from("installers").update({status:"rejected"}).eq("id",id);load();setSelected(null);};
  const setSessa=async(id,val)=>{await sb.from("installers").update({sessa_verified:val}).eq("id",id);load();};
  const filtered=installers.filter(i=>filter==="all"||i.status===filter);
  const sc2=s=>s==="approved"?C.green:s==="pending"?C.accent:s==="rejected"?C.red:C.sub;

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:C.text}}>Installers</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {["pending","approved","rejected","all"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?`rgba(${C.rgb},.12)`:"rgba(255,255,255,.04)",border:`1px solid ${filter===f?`rgba(${C.rgb},.4)`:C.border}`,color:filter===f?C.accent:C.sub,borderRadius:20,padding:"5px 14px",cursor:"pointer",fontSize:12,fontWeight:600,textTransform:"capitalize",fontFamily:B}}>{f}</button>
          ))}
        </div>
      </div>
      {loading?<div style={{textAlign:"center",padding:40}}><Spinner/></div>:(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtered.length===0&&<Card style={{padding:"40px",textAlign:"center"}}><div style={{color:C.sub,fontSize:13}}>No installers in this category</div></Card>}
          {filtered.map(inst=>(
            <Card key={inst.id} style={{padding:"16px",cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:12}} onClick={()=>{setSelected(selected?.id===inst.id?null:inst);if(selected?.id!==inst.id)loadDocs(inst.id);}}>
                <div style={{width:40,height:40,background:`rgba(${C.rgb},.1)`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🏢</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{fontFamily:H,fontSize:14,fontWeight:700,color:C.text}}>{inst.name}</span>
                    <Badge color={sc2(inst.status)}>{inst.status}</Badge>
                    {inst.sessa_verified&&<Badge color={C.green}>✓ SESSA</Badge>}
                  </div>
                  <div style={{fontSize:12,color:C.sub}}>{inst.city}, {inst.province} · {inst.specialty}</div>
                  <div style={{fontSize:11,color:C.sub,marginTop:2}}>Applied {new Date(inst.created_at).toLocaleDateString("en-ZA")}</div>
                </div>
                <span style={{fontSize:14,color:C.sub,transition:"transform .2s",transform:selected?.id===inst.id?"rotate(90deg)":"none",flexShrink:0}}>›</span>
              </div>
              {selected?.id===inst.id&&(
                <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${C.border}`,animation:"fadeUp .2s ease"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                    {[["Phone",inst.phone],["Email",inst.email],["Website",inst.website],["Experience",`${inst.years_experience} yrs`],["Price",`R${inst.price_min?.toLocaleString()}–R${inst.price_max?.toLocaleString()}`],["Response",`${inst.response_hours}h`]].map(([l,v])=>v&&(
                      <div key={l}><div style={{fontSize:10,color:C.sub,marginBottom:2,textTransform:"uppercase",letterSpacing:.8}}>{l}</div><div style={{fontSize:13,color:C.text}}>{v}</div></div>
                    ))}
                  </div>
                  {inst.about&&<p style={{fontSize:13,color:C.sub,lineHeight:1.7,marginBottom:14}}>{inst.about}</p>}
                  {docs.length>0&&(
                    <div style={{marginBottom:14}}>
                      <div style={{fontSize:11,color:C.sub,marginBottom:7,textTransform:"uppercase",letterSpacing:1}}>Documents</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                        {docs.map(d=>(
                          <a key={d.id} href={`${SUPABASE_URL}/storage/v1/object/installer-docs/${d.file_path}`} target="_blank" rel="noopener noreferrer"
                            style={{background:"rgba(255,255,255,.06)",border:`1px solid ${C.border}`,borderRadius:8,padding:"5px 12px",fontSize:11,color:C.accent,fontWeight:600,textDecoration:"none"}}>
                            📄 {d.file_name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {inst.status!=="approved"&&<Btn variant="success" sm onClick={()=>approve(inst.id)}><I.Chk c={C.green}/>Approve</Btn>}
                    {inst.status!=="rejected"&&<Btn variant="danger" sm onClick={()=>reject(inst.id)}><I.X c={C.red}/>Reject</Btn>}
                    <Btn variant="ghost" sm onClick={()=>setSessa(inst.id,!inst.sessa_verified)}>{inst.sessa_verified?"Remove SESSA":"Mark SESSA ✓"}</Btn>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogManager(){
  const[posts,setPosts]=useState([]);const[loading,setLoading]=useState(true);
  const[editing,setEditing]=useState(null);
  const[form,setForm]=useState({title:"",intro:"",tag:"Guide",body:"",cover_image:"",hot:false,published:false,read_minutes:5,slug:""});

  const load=async()=>{setLoading(true);const{data}=await sb.from("posts").select("*").order("created_at",{ascending:false});setPosts(data||[]);setLoading(false);};
  useEffect(()=>{load();},[]);
  const slugify=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

  const save=async()=>{
    let bodyParsed;
    try{bodyParsed=JSON.parse(form.body);}catch{bodyParsed=[{h:"Section",p:form.body}];}
    const payload={...form,body:bodyParsed,slug:form.slug||slugify(form.title),updated_at:new Date().toISOString()};
    if(editing==="new")await sb.from("posts").insert(payload);
    else await sb.from("posts").update(payload).eq("id",editing);
    setEditing(null);load();
  };
  const togglePublish=async(p)=>{await sb.from("posts").update({published:!p.published}).eq("id",p.id);load();};
  const del=async(id)=>{if(confirm("Delete this post?"))await sb.from("posts").delete().eq("id",id);load();};

  const sel={width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:9,padding:"10px 13px",color:C.text,fontSize:13,fontFamily:B};

  if(editing!==null) return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <button onClick={()=>setEditing(null)} style={{background:"none",border:"none",color:C.sub,cursor:"pointer",fontSize:13,marginBottom:20,fontFamily:B,display:"flex",alignItems:"center",gap:6}}>
        <I.Left s={15} c={C.sub}/> Back to posts
      </button>
      <div style={{fontFamily:H,fontSize:20,fontWeight:900,color:C.text,marginBottom:20}}>{editing==="new"?"New Post":"Edit Post"}</div>
      <Card style={{padding:"20px"}}>
        <Inp label="Title" value={form.title} onChange={v=>setForm({...form,title:v,slug:slugify(v)})} placeholder="How much does solar cost in SA?"/>
        <Inp label="Slug (URL)" value={form.slug} onChange={v=>setForm({...form,slug:v})}/>
        <Inp label="Intro" value={form.intro} onChange={v=>setForm({...form,intro:v})} rows={2} placeholder="Article summary shown on card"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:14}}>
          <div>
            <label style={{fontSize:11,color:C.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:5,fontWeight:600}}>Tag</label>
            <select value={form.tag} onChange={e=>setForm({...form,tag:e.target.value})} style={sel}>
              {["Guide","Comparison","Tax","Maintenance","News","Review"].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <Inp label="Read Minutes" value={form.read_minutes} onChange={v=>setForm({...form,read_minutes:parseInt(v)||5})} type="number"/>
          <div style={{paddingTop:22,display:"flex",gap:12}}>
            <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13,color:C.text}}>
              <input type="checkbox" checked={form.hot} onChange={e=>setForm({...form,hot:e.target.checked})} style={{accentColor:C.accent}}/>🔥
            </label>
            <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13,color:C.text}}>
              <input type="checkbox" checked={form.published} onChange={e=>setForm({...form,published:e.target.checked})} style={{accentColor:C.accent}}/>Published
            </label>
          </div>
        </div>
        <Inp label="Cover Image URL" value={form.cover_image||""} onChange={v=>setForm({...form,cover_image:v})} placeholder="https://images.unsplash.com/..."/>
        <Inp label="YouTube Video ID" value={form.youtube_id||""} onChange={v=>setForm({...form,youtube_id:v})} placeholder="dQw4w9WgXcQ"/>
        <Inp label="Affiliate URL" value={form.affiliate_url||""} onChange={v=>setForm({...form,affiliate_url:v})} placeholder="https://..."/>
        <div style={{marginBottom:14}}>
          <label style={{fontSize:11,color:C.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:5,fontWeight:600}}>Body Sections (JSON)</label>
          <div style={{fontSize:11,color:C.sub,marginBottom:6}}>{`[{"h":"Heading","p":"Paragraph"},...]`}</div>
          <textarea value={form.body} onChange={e=>setForm({...form,body:e.target.value})} rows={10}
            style={{width:"100%",background:"rgba(0,0,0,.3)",border:`1px solid ${C.border}`,borderRadius:9,padding:"10px 13px",color:C.text,fontSize:12,fontFamily:"monospace",resize:"vertical"}}/>
        </div>
        <div style={{display:"flex",gap:8}}>
          <Btn onClick={save}>Save Post</Btn>
          <Btn variant="ghost" onClick={()=>setEditing(null)}>Cancel</Btn>
        </div>
      </Card>
    </div>
  );

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:C.text}}>Blog Posts</div>
        <Btn onClick={()=>{setForm({title:"",intro:"",tag:"Guide",body:"",cover_image:"",hot:false,published:false,read_minutes:5,slug:""});setEditing("new");}}><I.Plus s={14} c="#000"/>New Post</Btn>
      </div>
      {loading?<div style={{textAlign:"center",padding:40}}><Spinner/></div>:(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {posts.map(p=>(
            <Card key={p.id} style={{padding:"14px 16px"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{fontFamily:H,fontSize:14,fontWeight:700,color:C.text}}>{p.title}</span>
                    <Badge color={C.accent}>{p.tag}</Badge>
                    {p.hot&&<Badge color={C.red}>🔥</Badge>}
                  </div>
                  <div style={{fontSize:12,color:C.sub}}>
                    {p.published?<span style={{color:C.green}}>● Published</span>:<span style={{color:C.sub}}>○ Draft</span>}
                    {" · "}{p.read_minutes} min · {new Date(p.created_at).toLocaleDateString("en-ZA")}
                  </div>
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  <Btn sm variant="ghost" onClick={()=>{setForm({...p,body:JSON.stringify(p.body,null,2)});setEditing(p.id);}}>Edit</Btn>
                  <Btn sm variant={p.published?"ghost":"success"} onClick={()=>togglePublish(p)}>{p.published?"Unpublish":"Publish"}</Btn>
                  <Btn sm variant="danger" onClick={()=>del(p.id)}>Delete</Btn>
                </div>
              </div>
            </Card>
          ))}
          {posts.length===0&&<Card style={{padding:"40px",textAlign:"center"}}><div style={{color:C.sub,fontSize:13}}>No posts yet. Create your first one.</div></Card>}
        </div>
      )}
    </div>
  );
}

function LeadsManager(){
  const[leads,setLeads]=useState([]);const[loading,setLoading]=useState(true);
  useEffect(()=>{
    const load=async()=>{const{data}=await sb.from("leads").select("*,installers(name)").order("created_at",{ascending:false});setLeads(data||[]);setLoading(false);};
    load();
  },[]);
  const update=async(id,status)=>{await sb.from("leads").update({status}).eq("id",id);setLeads(leads.map(l=>l.id===id?{...l,status}:l));};
  const sc2=s=>s==="new"?C.accent:s==="converted"?C.green:s==="lost"?C.red:C.sub;
  const sel={background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:8,padding:"5px 10px",color:C.text,fontSize:12,fontFamily:B};
  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:C.text,marginBottom:20}}>Leads</div>
      {loading?<div style={{textAlign:"center",padding:40}}><Spinner/></div>:(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {leads.map(l=>(
            <Card key={l.id} style={{padding:"14px 16px"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                <div style={{width:38,height:38,background:"rgba(255,255,255,.06)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>👤</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{fontFamily:H,fontSize:14,fontWeight:700,color:C.text}}>{l.name||"Anonymous"}</span>
                    <Badge color={sc2(l.status)}>{l.status}</Badge>
                  </div>
                  <div style={{fontSize:12,color:C.sub}}>
                    {l.email&&<span>{l.email} · </span>}{l.installers?.name||"No installer"}
                  </div>
                  <div style={{fontSize:12,color:C.sub,marginTop:2}}>{l.system_kw}kW · R{l.estimated_cost?.toLocaleString()} est · {new Date(l.created_at).toLocaleDateString("en-ZA")}</div>
                </div>
                <select value={l.status} onChange={e=>update(l.id,e.target.value)} style={sel}>
                  {["new","contacted","quoted","converted","lost"].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
            </Card>
          ))}
          {leads.length===0&&<Card style={{padding:"40px",textAlign:"center"}}><div style={{color:C.sub,fontSize:13}}>No leads yet.</div></Card>}
        </div>
      )}
    </div>
  );
}

function SubscribersManager(){
  const[subs,setSubs]=useState([]);const[loading,setLoading]=useState(true);
  useEffect(()=>{
    const load=async()=>{const{data}=await sb.from("subscribers").select("*").order("created_at",{ascending:false});setSubs(data||[]);setLoading(false);};
    load();
  },[]);
  const exportCSV=()=>{
    const csv=["Email,Source,Date",...subs.map(s=>`${s.email},${s.source},${new Date(s.created_at).toLocaleDateString("en-ZA")}`)].join("\n");
    const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="solariq-subscribers.csv";a.click();
  };
  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:C.text}}>Subscribers</div>
          <div style={{fontSize:13,color:C.sub}}>{subs.length} total</div>
        </div>
        <Btn variant="ghost" onClick={exportCSV}>Export CSV</Btn>
      </div>
      {loading?<div style={{textAlign:"center",padding:40}}><Spinner/></div>:(
        <Card style={{padding:"16px"}}>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {subs.map(s=>(
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 11px",background:"rgba(255,255,255,.03)",borderRadius:8}}>
                <span style={{fontSize:14}}>📬</span>
                <span style={{flex:1,fontSize:13,color:C.text}}>{s.email}</span>
                <Badge color={s.source==="coming_soon"?C.accent:s.source==="calculator"?C.green:C.blue}>{s.source}</Badge>
                <span style={{fontSize:11,color:C.sub}}>{new Date(s.created_at).toLocaleDateString("en-ZA")}</span>
              </div>
            ))}
            {subs.length===0&&<div style={{color:C.sub,textAlign:"center",padding:24,fontSize:13}}>No subscribers yet.</div>}
          </div>
        </Card>
      )}
    </div>
  );
}

function Settings(){
  const[settings,setSettings]=useState({});const[loading,setLoading]=useState(true);const[saved,setSaved]=useState(false);
  useEffect(()=>{
    const load=async()=>{const{data}=await sb.from("settings").select("*");const map={};(data||[]).forEach(s=>{map[s.key]=s.value;});setSettings(map);setLoading(false);};
    load();
  },[]);
  const save=async()=>{
    await Promise.all(Object.entries(settings).map(([key,value])=>sb.from("settings").upsert({key,value,updated_at:new Date().toISOString()})));
    setSaved(true);setTimeout(()=>setSaved(false),2500);
  };
  const sel={width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:9,padding:"10px 13px",color:C.text,fontSize:13,fontFamily:B};
  if(loading) return<div style={{textAlign:"center",padding:40}}><Spinner/></div>;
  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:C.text,marginBottom:20}}>Site Settings</div>
      <Card style={{padding:"20px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
          <div>
            <label style={{fontSize:11,color:C.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:600}}>Coming Soon Mode</label>
            <select value={settings.coming_soon_mode||"true"} onChange={e=>setSettings({...settings,coming_soon_mode:e.target.value})} style={sel}>
              <option value="true">ON — Show coming soon page</option>
              <option value="false">OFF — Show live site</option>
            </select>
          </div>
          <Inp label="Launch Date" value={settings.launch_date||""} onChange={v=>setSettings({...settings,launch_date:v})} type="date"/>
          <Inp label="Site Name" value={settings.site_name||""} onChange={v=>setSettings({...settings,site_name:v})}/>
          <Inp label="Contact Email" value={settings.contact_email||""} onChange={v=>setSettings({...settings,contact_email:v})} type="email"/>
          <div>
            <label style={{fontSize:11,color:C.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6,fontWeight:600}}>Eskom Stage</label>
            <select value={settings.eskom_stage||"0"} onChange={e=>setSettings({...settings,eskom_stage:e.target.value})} style={sel}>
              {["0","1","2","3","4","5","6"].map(s=><option key={s} value={s}>Stage {s}{s==="0"?" (No Load Shedding)":""}</option>)}
            </select>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <Btn onClick={save}>Save Settings</Btn>
          {saved&&<div style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:C.green}}><I.Chk c={C.green}/>Saved successfully</div>}
        </div>
      </Card>
    </div>
  );
}

// ── MAIN ADMIN ────────────────────────────────────────────────────────────────
export default function Admin(){
  const [session,setSession]=useState(null);
  const [loading,setLoading]=useState(true);
  const [tab,setTab]=useState("dashboard");
  const [collapsed,setCollapsed]=useState(false);
  const [stats,setStats]=useState({installers:0,leads:0,subscribers:0,posts:0,pending:0,events:0});
  const [recentLeads,setRecentLeads]=useState([]);
  const [statsLoading,setStatsLoading]=useState(true);
  const sc=useScreen();

  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}})=>{setSession(session);setLoading(false);});
    sb.auth.onAuthStateChange((_,s)=>setSession(s));
  },[]);

  useEffect(()=>{
    if(!session) return;
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

  const PAGES={
    dashboard:<Dashboard stats={stats} recentLeads={recentLeads} loading={statsLoading}/>,
    installers:<InstallersManager/>,
    leads:<LeadsManager/>,
    blog:<BlogManager/>,
    analytics:<Analytics/>,
    subscribers:<SubscribersManager/>,
    settings:<Settings/>,
    more:<MorePage setTab={setTab}/>,
  };

  if(loading) return(
    <><style>{css}</style>
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12}}>
      <Spinner/><div style={{fontSize:13,color:C.sub}}>Loading...</div>
    </div></>
  );

  if(!session) return(<><style>{css}</style><Login onLogin={()=>sb.auth.getSession().then(({data:{session}})=>setSession(session))}/></>);

  return(
    <>
      <style>{css}</style>
      <div style={{display:"flex",minHeight:"100vh",background:C.bg}}>
        {/* Desktop/tablet sidebar */}
        {!sc.isMobile&&(
          <Sidebar tab={tab} setTab={setTab} collapsed={collapsed} setCollapsed={setCollapsed} onSignOut={signOut} pending={stats.pending}/>
        )}

        {/* Mobile top bar */}
        {sc.isMobile&&<MobileTopBar tab={tab} onSignOut={signOut} pending={stats.pending}/>}

        {/* Main content */}
        <div style={{
          flex:1,
          marginLeft:sc.isMobile?0:sidebarW,
          transition:"margin-left .25s cubic-bezier(.4,0,.2,1)",
          paddingTop:sc.isMobile?54:0,
          paddingBottom:sc.isMobile?72:0,
          minWidth:0
        }}>
          <div style={{padding:sc.isMobile?"16px 14px":sc.isTablet?"24px 28px":"28px 36px",maxWidth:1400,margin:"0 auto"}}>
            {PAGES[tab]||PAGES.dashboard}
          </div>
        </div>

        {/* Mobile bottom nav */}
        {sc.isMobile&&<MobileBottomNav tab={tab} setTab={setTab} pending={stats.pending}/>}
      </div>
    </>
  );
}

import { useState, useEffect, createContext, useContext } from "react";

// ─── THEMES: auto from OS preference ─────────────────────────────────────────
const DARK = {
  dark:true, accent:"#f5a623", accent2:"#ff8c42", rgb:"245,166,35",
  bg:"#07090d", bgCard:"rgba(255,255,255,.03)", bgCard2:"rgba(255,255,255,.06)",
  border:"rgba(255,255,255,.08)", text:"#f0f0f0", textMid:"#aaa", sub:"#555",
  glow:"rgba(245,166,35,.07)", navBg:"rgba(7,9,13,.93)", inputBg:"rgba(255,255,255,.05)",
};
const LIGHT = {
  dark:false, accent:"#d4830a", accent2:"#c05c00", rgb:"212,131,10",
  bg:"#f5f2eb", bgCard:"rgba(0,0,0,.04)", bgCard2:"rgba(0,0,0,.07)",
  border:"rgba(0,0,0,.1)", text:"#111111", textMid:"#444", sub:"#999",
  glow:"rgba(212,131,10,.08)", navBg:"rgba(245,242,235,.93)", inputBg:"rgba(0,0,0,.05)",
};
const T = createContext(DARK);
const useT = () => useContext(T);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const RATE = 3.20;

const APPLIANCES = [
  { id:"lights",    icon:"💡", name:"Lights",          w:10,   h:6,   cat:"essentials" },
  { id:"tv",        icon:"📺", name:"TV",               w:120,  h:4,   cat:"essentials" },
  { id:"fridge",    icon:"🧊", name:"Fridge/Freezer",   w:150,  h:24,  cat:"essentials" },
  { id:"wifi",      icon:"📶", name:"WiFi Router",      w:15,   h:24,  cat:"essentials" },
  { id:"phone",     icon:"📱", name:"Phone Charging",   w:20,   h:3,   cat:"essentials" },
  { id:"laptop",    icon:"💻", name:"Laptop",           w:65,   h:6,   cat:"work"       },
  { id:"desktop",   icon:"🖥️", name:"Desktop PC",      w:300,  h:6,   cat:"work"       },
  { id:"printer",   icon:"🖨️", name:"Printer",         w:50,   h:1,   cat:"work"       },
  { id:"washing",   icon:"🫧", name:"Washing Machine",  w:500,  h:1,   cat:"home"       },
  { id:"microwave", icon:"📡", name:"Microwave",        w:1000, h:.5,  cat:"home"       },
  { id:"kettle",    icon:"☕", name:"Kettle",            w:2000, h:.25, cat:"home"       },
  { id:"geyser",    icon:"🚿", name:"Geyser",           w:3000, h:2,   cat:"home"       },
  { id:"aircon",    icon:"❄️", name:"Air Conditioner",  w:1500, h:4,   cat:"comfort"    },
  { id:"pool",      icon:"🏊", name:"Pool Pump",        w:1100, h:6,   cat:"comfort"    },
  { id:"security",  icon:"🔒", name:"Security System",  w:30,   h:24,  cat:"comfort"    },
  { id:"gate",      icon:"🚪", name:"Gate Motor",       w:200,  h:.5,  cat:"comfort"    },
];

const QUIZ = [
  { id:"size", q:"What size is your home?", hint:"Helps estimate your total energy needs", opts:[
    { label:"Studio / 1 Bed", icon:"🏠", v:"s", kwh:8  },
    { label:"2–3 Bedroom",    icon:"🏡", v:"m", kwh:18 },
    { label:"4+ Bedroom",     icon:"🏘️", v:"l", kwh:30 },
    { label:"Small Business", icon:"🏢", v:"b", kwh:45 },
  ]},
  { id:"bill", q:"Your average monthly Eskom bill?", hint:"Roughly is fine — no need to find your statement", opts:[
    { label:"Under R800",      icon:"💚", v:"lo", mult:.6  },
    { label:"R800 – R2 000",   icon:"💛", v:"md", mult:1.0 },
    { label:"R2 000 – R5 000", icon:"🟠", v:"hi", mult:1.8 },
    { label:"Over R5 000",     icon:"🔴", v:"xh", mult:3.0 },
  ]},
  { id:"goal", q:"What matters most to you?", hint:"Be honest — this shapes the whole recommendation", opts:[
    { label:"Survive load shedding",   icon:"🔋", v:"bk", kw:3  },
    { label:"Cut my electricity bill", icon:"💸", v:"sv", kw:5  },
    { label:"Mostly off-grid",         icon:"🌞", v:"og", kw:8  },
    { label:"Full independence",       icon:"⚡", v:"fo", kw:12 },
  ]},
  { id:"ls", q:"How bad is load shedding where you live?", hint:"Determines your battery backup size", opts:[
    { label:"Rarely (Stage 1–2)", icon:"😌", v:"mi", bf:1   },
    { label:"Often (Stage 3–4)",  icon:"😤", v:"mo", bf:1.5 },
    { label:"Daily (Stage 5–6)",  icon:"😡", v:"sv", bf:2   },
    { label:"Farm / Rural",       icon:"🌾", v:"ru", bf:2.5 },
  ]},
];

const INSTALLERS = [
  { id:1, name:"SunPower SA",           city:"Johannesburg",   prov:"Gauteng",       rating:4.9, rev:312, sessa:true,  jobs:847, yrs:12, badge:"Top Rated",     resp:"2 hrs",    spec:"Residential",             brands:["Sunsynk","Victron"],   price:"R80k–R200k",  verified:true  },
  { id:2, name:"Cape Solar Pro",         city:"Cape Town",      prov:"Western Cape",  rating:4.8, rev:198, sessa:true,  jobs:523, yrs:9,  badge:"Most Popular",  resp:"3 hrs",    spec:"Commercial & Residential", brands:["Deye","Sunsynk"],      price:"R60k–R350k",  verified:true  },
  { id:3, name:"KZN Solar Solutions",    city:"Durban",         prov:"KwaZulu-Natal", rating:4.7, rev:143, sessa:true,  jobs:389, yrs:7,  badge:null,            resp:"4 hrs",    spec:"Off-grid",                brands:["Victron","Pylontech"], price:"R70k–R250k",  verified:true  },
  { id:4, name:"Pretoria Solar Works",   city:"Pretoria",       prov:"Gauteng",       rating:4.6, rev:89,  sessa:false, jobs:201, yrs:5,  badge:"Fast Response", resp:"Same day", spec:"Residential",             brands:["Growatt","Deye"],      price:"R50k–R150k",  verified:true  },
  { id:5, name:"Green Energy EC",        city:"Port Elizabeth", prov:"Eastern Cape",  rating:4.5, rev:67,  sessa:true,  jobs:156, yrs:6,  badge:null,            resp:"5 hrs",    spec:"Agricultural",            brands:["Victron","Sunsynk"],   price:"R90k–R400k",  verified:false },
  { id:6, name:"Solar Hub Bloemfontein", city:"Bloemfontein",   prov:"Free State",    rating:4.4, rev:44,  sessa:true,  jobs:98,  yrs:4,  badge:null,            resp:"6 hrs",    spec:"Residential",             brands:["Deye","Growatt"],      price:"R45k–R130k",  verified:true  },
  { id:7, name:"Mpumalanga Solar Co",    city:"Nelspruit",      prov:"Mpumalanga",    rating:4.6, rev:58,  sessa:false, jobs:134, yrs:5,  badge:null,            resp:"4 hrs",    spec:"Commercial",              brands:["Sunsynk"],             price:"R100k–R300k", verified:true  },
  { id:8, name:"Northern Cape Solar",    city:"Kimberley",      prov:"Northern Cape", rating:4.8, rev:31,  sessa:true,  jobs:76,  yrs:8,  badge:"High PSH Zone", resp:"3 hrs",    spec:"Off-grid & Agricultural", brands:["Victron","Pylontech"], price:"R80k–R500k",  verified:true  },
];

const PROVS   = ["All","Gauteng","Western Cape","KwaZulu-Natal","Eastern Cape","Free State","Mpumalanga","Northern Cape"];
const SPECS   = ["All","Residential","Commercial","Off-grid","Agricultural","Commercial & Residential","Off-grid & Agricultural"];
const BRANDS  = ["All","Sunsynk","Victron","Deye","Growatt","Pylontech"];

const TECHS = [
  { id:1, name:"FixSolar SA",      prov:"Gauteng",       spec:"Inverter Repair",    rating:4.9, rev:203, price:"R450/hr",            emergency:true,  brands:["Victron","Sunsynk","Deye"] },
  { id:2, name:"Panel Clean Pro",  prov:"Western Cape",  spec:"Panel Cleaning",      rating:4.8, rev:156, price:"R85/panel",          emergency:false, brands:["All brands"]               },
  { id:3, name:"Battery Doctors",  prov:"Gauteng",       spec:"Battery Replacement", rating:4.7, rev:98,  price:"From R1 200",        emergency:true,  brands:["Pylontech","BSL","Freedom Won"] },
  { id:4, name:"Solar Doctor KZN", prov:"KwaZulu-Natal", spec:"Full System Service", rating:4.8, rev:87,  price:"R1 800 full service", emergency:false, brands:["All brands"]               },
];

const ERRORS = {
  "F01": { brand:"Sunsynk", title:"Grid voltage too high",       sev:"warning",  diy:true,  fix:"Grid voltage is above the safe range — usually an Eskom supply issue. Resolves itself. If it persists over 2 hours, contact your installer." },
  "F02": { brand:"Sunsynk", title:"Grid voltage too low",        sev:"warning",  diy:true,  fix:"Grid voltage dropping below the safe threshold. Common during load shedding transitions. System auto-switches to battery." },
  "F32": { brand:"Sunsynk", title:"Battery over-temperature",    sev:"critical", diy:false, fix:"Battery is overheating. Immediately ensure adequate ventilation. Do NOT continue using the system — contact a technician urgently." },
  "E001":{ brand:"Victron", title:"Low battery shutdown",        sev:"warning",  diy:true,  fix:"Battery depleted to minimum safe level. System shut down to protect the battery. Will resume charging once power is available." },
  "E002":{ brand:"Victron", title:"Overload — too much drawn",   sev:"warning",  diy:true,  fix:"You are drawing more power than your inverter can handle. Switch off heavy appliances (geyser, kettle, aircon) and restart." },
  "E003":{ brand:"Victron", title:"Inverter overheating",        sev:"critical", diy:false, fix:"Inverter is dangerously hot. Switch it off immediately. Ensure 20cm clearance on all sides. Do not restart until cool." },
  "W001":{ brand:"Deye",    title:"PV input voltage high",       sev:"info",     diy:true,  fix:"Solar panel voltage slightly above optimal. Usually resolves as panels cool during the day. Monitor for 24 hours." },
  "W003":{ brand:"Deye",    title:"Grid frequency out of range", sev:"warning",  diy:true,  fix:"Eskom grid frequency is unstable. System protecting itself by disconnecting. Normal during load shedding transitions." },
  "G01": { brand:"Growatt", title:"No grid connection detected", sev:"info",     diy:true,  fix:"Inverter cannot detect grid power. Check your mains breaker first. If mains is on and grid is not shedding, contact your installer." },
  "G05": { brand:"Growatt", title:"Insulation resistance fault", sev:"critical", diy:false, fix:"Serious electrical fault. Switch off at the DC isolator immediately. Do NOT attempt to fix this yourself — call a qualified electrician now." },
};

const HEALTH_QS = [
  { id:"age",  q:"How old is your solar system?",           opts:["Under 1 year","1–3 years","3–5 years","5+ years"] },
  { id:"perf", q:"Is your system performing as expected?",  opts:["Yes, performing well","Slightly less than before","Much worse than before","Not sure"] },
  { id:"snd",  q:"Any unusual sounds from your inverter?",  opts:["No unusual sounds","Occasional clicking","Constant humming/buzzing","Loud unusual noise"] },
  { id:"err",  q:"Any error codes or warning lights?",      opts:["No errors","Occasional warnings","Regular error codes","System offline"] },
  { id:"cln",  q:"When were your panels last cleaned?",     opts:["Within 3 months","3–6 months ago","Over 6 months ago","Never cleaned"] },
  { id:"svc",  q:"Has your system had a professional service?", opts:["Within the year","1–2 years ago","Never been serviced","Not sure"] },
];

const ARTICLES = [
  { id:1, tag:"Guide", hot:true, min:"7", views:"12.4k",
    title:"How much does a 5kW solar system cost in South Africa in 2026?",
    intro:"Solar prices in SA have dropped significantly over the past three years. Here's exactly what a complete 5kW system costs — installed, with battery — and what drives the price up or down.",
    body:[
      { h:"What's included in a '5kW system'?", p:"When an installer quotes you for a '5kW system' they're referring to the inverter size — not the panels. A complete system includes the inverter, solar panels (usually 8–10 × 550Wp), a battery bank, mounting hardware, cabling, disconnect switches, and labour. Never compare quotes without confirming what's actually included." },
      { h:"Average installed prices in 2026", p:"A 5kW hybrid system with 10kWh of lithium battery typically costs between R85,000 and R140,000 fully installed. The range comes down to battery brand, inverter brand, and the installer's labour rate. Gauteng tends to be slightly cheaper than Cape Town due to higher competition." },
      { h:"The tax rebate you're leaving on the table", p:"SARS allows you to claim 25% of the cost of new and unused solar panels as a tax rebate in the year of installation. On a R50,000 panel spend that's R12,500 back. The rebate applies to panels only — not batteries, inverters, or labour. Claim it via your personal income tax return (ITR12)." },
      { h:"Bottom line", p:"Budget R90,000–R120,000 for a quality 5kW system that will last 15+ years. Factor in the SARS rebate, the monthly savings (typically R1,500–R3,500/month), and most systems pay themselves back in 4–7 years. Everything after that is free electricity." },
    ], related:[2,3,6] },
  { id:2, tag:"Comparison", hot:true, min:"9", views:"8.9k",
    title:"Sunsynk vs Deye vs Victron — which inverter is best for SA homeowners?",
    intro:"Three brands dominate the SA solar inverter market. Each has a different philosophy, price point, and ideal use case. Here's an honest comparison with no brand sponsorship.",
    body:[
      { h:"Sunsynk — the SA favourite", p:"Sunsynk is a South African-designed inverter built specifically for the SA market. It handles Eskom's unstable grid exceptionally well, has local support and spare parts, and the app is user-friendly. Price: R12,000–R22,000. Best for: typical SA suburban home, load shedding protection, grid-tied or hybrid." },
      { h:"Deye — the value king", p:"Deye is Chinese-manufactured and offers the best spec-per-rand on the market. Many SA installers use Deye as their budget recommendation. Build quality is slightly below Sunsynk and Victron but reliability is solid. Price: R8,000–R16,000. Best for: budget-conscious buyers and commercial installations." },
      { h:"Victron — the premium choice", p:"Victron is Dutch-engineered and considered the gold standard worldwide. Superior build quality, the best monitoring system (VRM portal), and a huge global support network. Every component is modular and upgradeable. Price: R18,000–R45,000. Best for: off-grid installations, high-end homes, anyone who wants their system to last 20+ years." },
      { h:"Which one should you choose?", p:"For most SA homeowners dealing with load shedding: Sunsynk hits the sweet spot. Budget installations or commercial: Deye. Off-grid farms, luxury homes, or anyone wanting the absolute best: Victron. Avoid cheap generic inverters from unknown brands — the saving is never worth the risk." },
    ], related:[1,3,5] },
  { id:3, tag:"Tax", hot:false, min:"5", views:"6.2k",
    title:"How to claim your solar tax rebate from SARS — step by step",
    intro:"South Africa's solar tax incentive allows individuals to claim back 25% of the cost of solar panels. Most homeowners don't claim it. Here's exactly how.",
    body:[
      { h:"What qualifies?", p:"Only new and unused solar photovoltaic (PV) panels qualify. Batteries, inverters, mounting, cabling, and labour do not qualify. The panels must be installed at a residence." },
      { h:"How much can you claim?", p:"25% of the cost of qualifying panels, capped at R15,000 per individual. If you spent R60,000 on panels, you can claim R15,000. This is a rebate against your tax liability — not a refund if you owe nothing." },
      { h:"Documentation you need", p:"Keep your original invoice from the installer (must show panel brand, model, wattage, and cost separately), a certificate of compliance (COC), and proof of payment. SARS may request these during verification." },
      { h:"How to claim", p:"When completing your ITR12 on eFiling, look for 'Solar Energy Tax Credit'. Enter the qualifying panel cost. SARS calculates the 25% rebate automatically. File this in the tax year the installation was completed." },
    ], related:[1,4,6] },
  { id:4, tag:"Maintenance", hot:false, min:"6", views:"4.8k",
    title:"Is your solar system actually working properly? 7 signs it isn't",
    intro:"Most SA homeowners install solar and assume it's working. Many systems quietly underperform for months. Here are the warning signs — and what to do.",
    body:[
      { h:"1. Backup doesn't last as long", p:"If your battery used to power your home through a 4-hour outage and now it's 2 hours, your battery capacity has degraded or there's an issue with charge settings. Lithium batteries should retain 80% capacity after 3,000 cycles." },
      { h:"2. Still getting high electricity bills", p:"If your Eskom bill hasn't dropped significantly after installation, your system may not be sized correctly, panels may be shaded at peak hours, or inverter settings aren't prioritising solar generation." },
      { h:"3. Panels not cleaned in 6+ months", p:"Dirty panels can lose up to 25% efficiency in SA conditions — more in dusty areas. Panel cleaning is the single highest-ROI maintenance activity. Budget R85–R150 per panel every 3–6 months." },
      { h:"4. Ignoring error codes", p:"Most homeowners dismiss inverter error codes. Some sort themselves out. Others are early warnings of serious issues — battery cell imbalance, grid connection problems, or thermal stress. Use our Error Code Translator." },
      { h:"5. No monitoring data", p:"If you haven't looked at your generation data in months, you have no idea if your system is working. Every modern inverter has a monitoring app. Check monthly: daily generation, battery state of health, and logged faults." },
    ], related:[1,2,3] },
  { id:5, tag:"Guide", hot:false, min:"8", views:"3.9k",
    title:"Off-grid vs grid-tied solar in South Africa — the honest truth",
    intro:"The dream of zero electricity bill is real — but it's not for everyone. Here's an honest breakdown of off-grid vs grid-tied vs hybrid, and which makes sense for your situation.",
    body:[
      { h:"Grid-tied: cheapest, useless during load shedding", p:"A grid-tied system feeds excess solar to the grid but has NO battery and NO backup. During load shedding your system switches off for safety. It's the cheapest option and makes sense only if load shedding doesn't affect you — which in SA is almost nobody." },
      { h:"Hybrid: the SA sweet spot", p:"A hybrid system connects to the grid AND has battery storage. During the day solar charges the battery and powers your home. During load shedding the battery kicks in. This is what 95% of SA residential installations should be. Cost: R80,000–R200,000 depending on size." },
      { h:"Off-grid: freedom, but expensive", p:"A true off-grid system has no grid connection at all. It needs enough panels and batteries to survive 3–5 overcast days. This requires roughly 3× the battery capacity of a hybrid, tripling the cost. Makes sense for farms and remote properties — not most SA suburbs." },
      { h:"The honest recommendation", p:"For urban and suburban SA: go hybrid. Size your battery for 2× your load shedding hours with 20% buffer. Don't over-size trying to eliminate your bill completely — you'll never recover the extra capital cost within the system's lifespan." },
    ], related:[1,2,6] },
  { id:6, tag:"Comparison", hot:true, min:"10", views:"7.1k",
    title:"Best solar panels available in South Africa right now — ranked 2026",
    intro:"Not all solar panels are equal. Efficiency, degradation rate, and warranty terms vary significantly. Here are the top panels available through SA installers in 2026.",
    body:[
      { h:"What to look for", p:"Four numbers matter: efficiency (higher = more power per m²), power output (Wp), annual degradation rate (aim for under 0.5%/year), and product warranty (25 years is standard, 30 is excellent). Anything without a local warranty backstop is a risk in SA." },
      { h:"Tier 1: JA Solar & Longi", p:"Both ranked in Bloomberg's Tier 1 bankable panel list. JA Solar's JAM72 and Longi's Hi-MO series dominate SA installations. Efficiency around 21–22.5%. The workhorses — reliable, widely available, backed by local distributors. Expect R2,200–R3,200 per 550Wp panel." },
      { h:"Tier 1: Canadian Solar", p:"Strong warranty support, good efficiency (20.5–21.5%), available through most SA distributors. Slightly more expensive than JA or Longi but the brand reputation adds comfort for large installations." },
      { h:"Premium: SunPower Maxeon", p:"The efficiency leader at 22.8%+. Maxeon cells handle heat and partial shading better than standard panels. The 40-year product warranty is unmatched. Price is 2–3× standard panels. Genuinely the best technology available in SA." },
      { h:"What to avoid", p:"Generic unbranded panels from unknown manufacturers. No local warranty support means a fault in year 5 is entirely your problem. The R200 saving per panel over Tier 1 is never worth it. Always confirm the manufacturer has local SA representation." },
    ], related:[1,2,5] },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function useCount(target, ms=1300) {
  const [v,setV] = useState(0);
  useEffect(() => {
    let s = null;
    const f = ts => { if(!s) s=ts; const p=Math.min((ts-s)/ms,1); setV(Math.floor((1-Math.pow(1-p,3))*target)); if(p<1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }, [target]);
  return v;
}

function makeResult(dailyKwh, systemKw, battF=1.5) {
  const mo   = Math.round(dailyKwh*30*RATE);
  const cost = Math.round(systemKw*18000);
  const save = Math.round(mo*12*.75);
  return { systemKw, battKwh:Math.round(systemKw*battF*10)/10, cost, annSave:save, mo, payback:(cost/save).toFixed(1), dailyKwh:Math.round(dailyKwh*10)/10, panels:Math.ceil(systemKw/.55) };
}

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
const H = "'Bebas Neue',sans-serif";
const B = "'Plus Jakarta Sans',sans-serif";

function PrimaryBtn({ children, onClick, disabled, small, style={} }) {
  const t = useT();
  return (
    <button onClick={onClick} disabled={disabled} style={{ background:disabled?"rgba(128,128,128,.15)":`linear-gradient(135deg,${t.accent},${t.accent2})`, color:disabled?"#666":t.dark?"#000":"#fff", border:"none", borderRadius:30, padding:small?"9px 22px":"13px 30px", fontSize:small?13:14, fontWeight:800, cursor:disabled?"not-allowed":"pointer", fontFamily:B, transition:"all .2s", ...style }}>{children}</button>
  );
}

function Lbl({ children, style={} }) {
  const t = useT();
  return <div style={{ fontSize:11, color:t.accent, fontWeight:800, textTransform:"uppercase", letterSpacing:2.5, marginBottom:8, fontFamily:B, ...style }}>{children}</div>;
}

function BackBtn({ onClick, style={} }) {
  const t = useT();
  return <button onClick={onClick} style={{ background:"none", border:"none", color:t.sub, cursor:"pointer", fontSize:13, display:"flex", alignItems:"center", gap:6, fontWeight:600, marginBottom:20, padding:0, fontFamily:B, ...style }}>← Back</button>;
}

function Tag({ children, color }) {
  const t = useT(); const c = color||t.accent;
  return <span style={{ fontSize:10, fontWeight:800, background:`${c}18`, color:c, padding:"3px 9px", borderRadius:20, letterSpacing:.5 }}>{children}</span>;
}

function Stars({ n, small }) {
  const t = useT();
  return <span style={{ color:"#f0c040", fontSize:small?11:12 }}>{"★".repeat(Math.floor(n))}<span style={{ color:t.sub }}> {n}</span></span>;
}

// ─── ENGINEER CALCULATOR ──────────────────────────────────────────────────────
function EngineerCalc({ onResult }) {
  const t = useT();
  const [v,setV] = useState({ kwh:20, psh:4.5, loss:20, invKva:5, batAh:200, batV:48, dod:80, type:"hybrid" });
  const up = (k,val) => setV(p=>({...p,[k]:val}));

  const panels  = Math.ceil((v.kwh/(v.psh*(1-v.loss/100)))/.55);
  const syskw   = panels*.55;
  const batKwh  = (v.batAh*v.batV*(v.dod/100))/1000;
  const backupH = (batKwh/(v.kwh/24)).toFixed(1);
  const cost    = Math.round(syskw*18000);
  const save    = Math.round(v.kwh*365*RATE*.75);
  const payback = (cost/save).toFixed(1);

  const Row = ({ k,label,desc,min,max,step,unit }) => (
    <div style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:12, padding:"13px 14px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:7 }}>
        <div style={{ flex:1, paddingRight:8 }}>
          <div style={{ fontSize:12, fontWeight:700, color:t.text, fontFamily:B }}>{label}</div>
          {desc && <div style={{ fontSize:10, color:t.sub, marginTop:2, lineHeight:1.4 }}>{desc}</div>}
        </div>
        <div style={{ textAlign:"right", flexShrink:0 }}>
          <input type="number" value={v[k]} onChange={e=>up(k,parseFloat(e.target.value)||0)}
            style={{ background:`rgba(${t.rgb},.08)`, border:`1px solid rgba(${t.rgb},.2)`, borderRadius:6, padding:"4px 7px", color:t.accent, fontSize:13, fontWeight:800, fontFamily:"monospace", width:64, textAlign:"right", outline:"none" }}/>
          <div style={{ fontSize:9, color:t.sub, marginTop:2 }}>{unit}</div>
        </div>
      </div>
      <input type="range" min={min} max={max} step={step} value={v[k]} onChange={e=>up(k,parseFloat(e.target.value))} style={{ width:"100%", accentColor:t.accent }}/>
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:2 }}>
        <span style={{ fontSize:9, color:t.sub, opacity:.4 }}>{min}{unit}</span>
        <span style={{ fontSize:9, color:t.sub, opacity:.4 }}>{max}{unit}</span>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
        <div style={{ width:32, height:32, borderRadius:9, background:`rgba(${t.rgb},.12)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>⚙️</div>
        <div>
          <div style={{ fontFamily:H, fontSize:22, letterSpacing:1, color:t.text }}>Engineer Mode</div>
          <div style={{ fontSize:12, color:t.sub }}>Full technical parameters — for installers and advanced users</div>
        </div>
      </div>
      <div style={{ background:`rgba(${t.rgb},.05)`, border:`1px solid rgba(${t.rgb},.15)`, borderRadius:10, padding:"9px 14px", marginBottom:18, display:"flex", gap:8, alignItems:"center" }}>
        <span>💡</span><span style={{ fontSize:12, color:t.sub }}>Type directly or use the slider. Results update live.</span>
      </div>

      <div style={{ fontSize:10, color:t.accent, fontWeight:800, textTransform:"uppercase", letterSpacing:2, marginBottom:8 }}>⚡ Load & Generation</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9, marginBottom:14 }}>
        <Row k="kwh"    label="Daily Consumption"    desc="Total kWh across all appliances"          min={1}  max={150} step={0.5} unit=" kWh/day"/>
        <Row k="psh"    label="Peak Sun Hours (PSH)" desc="SA avg 4.5–5.5. Higher in Northern Cape"  min={2}  max={7}   step={0.1} unit=" hrs"/>
        <Row k="loss"   label="System Losses"        desc="Wiring + inverter + temp. Typ. 15–25%"    min={5}  max={40}  step={1}   unit="%"/>
        <Row k="invKva" label="Inverter Size"        desc="Handle peak load + 20% safety margin"     min={1}  max={30}  step={0.5} unit=" kVA"/>
      </div>

      <div style={{ fontSize:10, color:t.accent, fontWeight:800, textTransform:"uppercase", letterSpacing:2, marginBottom:8 }}>🔋 Battery Bank</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:9, marginBottom:14 }}>
        <Row k="batAh" label="Capacity"  desc="Total Amp-hours"               min={50}  max={2000} step={25}  unit=" Ah"/>
        <Row k="batV"  label="Voltage"   desc="12V / 24V / 48V system"        min={12}  max={96}   step={12}  unit="V"/>
        <Row k="dod"   label="DoD"       desc="LiFePO4: 90%. Lead-acid: 50%"  min={20}  max={100}  step={5}   unit="%"/>
      </div>

      <div style={{ fontSize:10, color:t.accent, fontWeight:800, textTransform:"uppercase", letterSpacing:2, marginBottom:8 }}>🔌 System Type</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:9, marginBottom:18 }}>
        {[["hybrid","Hybrid","Grid + battery — best for SA"],["gridtied","Grid-Tied","Feed excess back. No battery."],["offgrid","Off-Grid","Fully independent from Eskom."]].map(([k,lbl,desc])=>(
          <div key={k} onClick={()=>up("type",k)} style={{ background:v.type===k?`rgba(${t.rgb},.1)`:t.bgCard, border:`1px solid ${v.type===k?`rgba(${t.rgb},.35)`:t.border}`, borderRadius:12, padding:"12px 13px", cursor:"pointer", transition:"all .2s" }}>
            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
              <div style={{ width:14, height:14, borderRadius:3, background:v.type===k?t.accent:"transparent", border:`2px solid ${v.type===k?t.accent:t.sub}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                {v.type===k&&<span style={{ fontSize:8, color:t.dark?"#000":"#fff", fontWeight:900 }}>✓</span>}
              </div>
              <span style={{ fontSize:12, fontWeight:700, color:v.type===k?t.accent:t.text, fontFamily:B }}>{lbl}</span>
            </div>
            <div style={{ fontSize:10, color:t.sub, paddingLeft:21, lineHeight:1.4 }}>{desc}</div>
          </div>
        ))}
      </div>

      <div style={{ background:`linear-gradient(135deg,rgba(${t.rgb},.1),rgba(${t.rgb},.05))`, border:`1px solid rgba(${t.rgb},.22)`, borderRadius:16, padding:"18px", marginBottom:12 }}>
        <div style={{ fontSize:10, color:t.accent, fontWeight:800, textTransform:"uppercase", letterSpacing:2, marginBottom:12 }}>📊 Live Results</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:13 }}>
          {[["Panels",`${panels}×`,"550Wp each"],["PV Array",`${syskw.toFixed(1)} kWp`,"Installed"],["Battery",`${batKwh.toFixed(1)} kWh`,"Usable"],["Backup",`${backupH} hrs`,"At avg load"],["Inverter",`${v.invKva} kVA`,"Minimum"],["Cost",`R${(cost/1000).toFixed(0)}k`,"Installed est."]].map(([l,val,s])=>(
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:H, fontSize:20, letterSpacing:1, color:t.accent }}>{val}</div>
              <div style={{ fontSize:10, fontWeight:700, color:t.text, marginBottom:1 }}>{l}</div>
              <div style={{ fontSize:9, color:t.sub }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ height:1, background:`rgba(${t.rgb},.15)`, margin:"0 0 12px" }}/>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9, marginBottom:12 }}>
          <div style={{ background:`rgba(${t.rgb},.06)`, borderRadius:9, padding:"9px 12px" }}>
            <div style={{ fontSize:10, color:t.sub, marginBottom:2 }}>Annual savings</div>
            <div style={{ fontFamily:H, fontSize:20, letterSpacing:1, color:"#4ade80" }}>R{save.toLocaleString()}</div>
          </div>
          <div style={{ background:`rgba(${t.rgb},.06)`, borderRadius:9, padding:"9px 12px" }}>
            <div style={{ fontSize:10, color:t.sub, marginBottom:2 }}>Payback period</div>
            <div style={{ fontFamily:H, fontSize:20, letterSpacing:1, color:t.accent }}>{payback} years</div>
          </div>
        </div>
        <div style={{ background:t.dark?"rgba(0,0,0,.35)":"rgba(0,0,0,.04)", borderRadius:9, padding:"10px 13px", fontFamily:"monospace", fontSize:11, color:t.sub, lineHeight:1.9 }}>
          <div style={{ color:t.accent, fontWeight:700, marginBottom:3 }}>// Technical Specification</div>
          <div>Load ......... {v.kwh} kWh/day @ {v.psh} PSH</div>
          <div>Required PV .. {(v.kwh/(1-v.loss/100)).toFixed(1)} kWh/day (incl. {v.loss}% losses)</div>
          <div>PV Array ..... {panels} × 550Wp = {syskw.toFixed(2)} kWp</div>
          <div>Battery ...... {v.batAh}Ah × {v.batV}V × {v.dod}% DoD = {batKwh.toFixed(2)} kWh</div>
          <div>System Type .. {v.type.charAt(0).toUpperCase()+v.type.slice(1)}</div>
        </div>
      </div>
      <PrimaryBtn style={{ width:"100%" }} onClick={()=>onResult(makeResult(v.kwh, parseFloat(syskw.toFixed(1))))}>Generate Full Report →</PrimaryBtn>
    </div>
  );
}

// ─── CALCULATOR ───────────────────────────────────────────────────────────────
function Calculator({ onResult }) {
  const t = useT();
  const [mode,setMode]   = useState(null);
  const [step,setStep]   = useState(0);
  const [ans,setAns]     = useState({});
  const [apps,setApps]   = useState({});
  const [bill,setBill]   = useState("");
  const [cat,setCat]     = useState("essentials");
  const [fade,setFade]   = useState(false);

  const go = fn => { setFade(true); setTimeout(()=>{ fn(); setFade(false); }, 200); };
  const appCount = Object.values(apps).filter(h=>h>0).length;
  const cats = ["essentials","work","home","comfort"];

  const fromApps = () => {
    const wh = Object.entries(apps).reduce((s,[id,h])=>{ const a=APPLIANCES.find(x=>x.id===id); return s+(a&&h>0?a.w*h:0); },0);
    const d = wh/1000; onResult(makeResult(d, Math.max(2,Math.ceil(d/4))));
  };
  const fromBill = () => { const b=parseFloat(bill); if(!b) return; const d=b/RATE/30; onResult(makeResult(d,Math.max(2,Math.ceil(d/4)))); };

  if(!mode) return (
    <div style={{ opacity:fade?0:1, transition:"opacity .2s", animation:"fadeUp .5s ease" }}>
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:`rgba(${t.rgb},.08)`, border:`1px solid rgba(${t.rgb},.2)`, borderRadius:20, padding:"5px 16px", marginBottom:16 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:t.accent, display:"inline-block" }}/>
          <span style={{ fontSize:11, color:t.accent, fontWeight:700, letterSpacing:1 }}>NO TECHNICAL KNOWLEDGE NEEDED</span>
        </div>
        <h2 style={{ fontFamily:H, fontSize:"clamp(34px,6vw,56px)", letterSpacing:2, color:t.text, lineHeight:1, marginBottom:10 }}>Find Your Perfect Solar Setup</h2>
        <p style={{ color:t.sub, fontSize:15, maxWidth:400, margin:"0 auto", lineHeight:1.7 }}>Four ways to calculate — pick the one that suits you.</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(195px,1fr))", gap:11 }}>
        {[
          { k:"simple",    icon:"✨", title:"Quick & Easy",     sub:"4 plain questions. Done in 60 seconds.",      badge:"Most Popular"  },
          { k:"appliance", icon:"🔌", title:"By My Appliances", sub:"Pick every device and set its hours of use.", badge:"Most Accurate" },
          { k:"bill",      icon:"📄", title:"From My Bill",     sub:"Enter your monthly Eskom bill. That's it.",   badge:"Fastest"       },
          { k:"engineer",  icon:"⚙️", title:"Engineer Mode",    sub:"Full kW / kWh / Ah technical inputs.",        badge:"Pro"           },
        ].map(c=>(
          <div key={c.k} onClick={()=>go(()=>setMode(c.k))} style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:16, padding:"20px 18px", cursor:"pointer", transition:"all .2s", position:"relative" }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor=`rgba(${t.rgb},.4)`; e.currentTarget.style.transform="translateY(-3px)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor=t.border; e.currentTarget.style.transform="none"; }}>
            <div style={{ position:"absolute", top:11, right:11, fontSize:9, background:`rgba(${t.rgb},.15)`, color:t.accent, padding:"2px 8px", borderRadius:10, fontWeight:800 }}>{c.badge}</div>
            <div style={{ fontSize:26, marginBottom:11 }}>{c.icon}</div>
            <div style={{ fontFamily:H, fontSize:20, letterSpacing:1, color:t.text, marginBottom:4 }}>{c.title}</div>
            <div style={{ fontSize:12, color:t.sub, lineHeight:1.6 }}>{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if(mode==="engineer") return (
    <div style={{ opacity:fade?0:1, transition:"opacity .2s" }}>
      <BackBtn onClick={()=>go(()=>setMode(null))}/>
      <EngineerCalc onResult={onResult}/>
    </div>
  );

  if(mode==="bill") return (
    <div style={{ opacity:fade?0:1, transition:"opacity .2s", animation:"fadeUp .4s ease" }}>
      <BackBtn onClick={()=>go(()=>setMode(null))}/>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:38, marginBottom:12 }}>📄</div>
        <h3 style={{ fontFamily:H, fontSize:32, letterSpacing:2, color:t.text, marginBottom:6 }}>Your Monthly Bill</h3>
        <p style={{ color:t.sub, fontSize:14, marginBottom:26 }}>Enter approximately what you pay Eskom per month</p>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:18 }}>
          <span style={{ fontSize:28, color:t.accent, fontWeight:700 }}>R</span>
          <input type="number" placeholder="0" value={bill} onChange={e=>setBill(e.target.value)}
            style={{ background:"transparent", border:"none", outline:"none", fontSize:54, fontFamily:H, letterSpacing:2, color:t.text, width:200, textAlign:"center" }}/>
        </div>
        <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:22, flexWrap:"wrap" }}>
          {[500,1200,2500,4000].map(n=>(
            <button key={n} onClick={()=>setBill(String(n))} style={{ background:bill==n?`rgba(${t.rgb},.15)`:t.bgCard, border:`1px solid ${bill==n?t.accent:t.border}`, color:bill==n?t.accent:t.sub, padding:"7px 16px", borderRadius:25, cursor:"pointer", fontSize:13, fontWeight:700, transition:"all .2s", fontFamily:B }}>R{n.toLocaleString()}</button>
          ))}
        </div>
        <PrimaryBtn onClick={fromBill} disabled={!bill}>Calculate My System →</PrimaryBtn>
      </div>
    </div>
  );

  if(mode==="appliance") return (
    <div style={{ opacity:fade?0:1, transition:"opacity .2s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <BackBtn onClick={()=>go(()=>setMode(null))} style={{ marginBottom:0 }}/>
        {appCount>0 && <div style={{ fontSize:12, color:t.accent, background:`rgba(${t.rgb},.1)`, padding:"4px 12px", borderRadius:20 }}>{appCount} selected</div>}
      </div>
      <h3 style={{ fontFamily:H, fontSize:28, letterSpacing:2, color:t.text, marginBottom:3 }}>Select Your Appliances</h3>
      <p style={{ color:t.sub, fontSize:13, marginBottom:14 }}>Tap each one you use and adjust hours per day</p>
      <div style={{ display:"flex", borderBottom:`1px solid ${t.border}`, marginBottom:14 }}>
        {cats.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{ background:"none", border:"none", borderBottom:`2px solid ${cat===c?t.accent:"transparent"}`, color:cat===c?t.accent:t.sub, padding:"7px 13px", cursor:"pointer", fontSize:12, fontWeight:700, textTransform:"capitalize", transition:"all .2s", fontFamily:B }}>{c}</button>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:8, marginBottom:20 }}>
        {APPLIANCES.filter(a=>a.cat===cat).map(app=>{
          const active = apps[app.id]>0;
          const hrs    = apps[app.id]||0;
          const toggle = () => { const c={...apps}; active?delete c[app.id]:(c[app.id]=app.h); setApps(c); };
          return (
            <div key={app.id} style={{ background:active?`rgba(${t.rgb},.08)`:t.bgCard, border:`1px solid ${active?`rgba(${t.rgb},.4)`:t.border}`, borderRadius:12, padding:11, textAlign:"center", transition:"all .2s", cursor:"pointer" }} onClick={active?undefined:toggle}>
              <div style={{ fontSize:22, marginBottom:4 }} onClick={toggle}>{app.icon}</div>
              <div style={{ fontSize:11, fontWeight:700, color:active?t.text:t.sub, marginBottom:1, fontFamily:B }} onClick={toggle}>{app.name}</div>
              <div style={{ fontSize:9, color:t.sub, opacity:.6 }}>{app.w}W</div>
              {active && (
                <div style={{ marginTop:8 }}>
                  <div style={{ fontSize:9, color:t.sub, marginBottom:3 }}>hrs/day</div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                    <button onClick={e=>{e.stopPropagation();setApps({...apps,[app.id]:Math.max(.25,hrs-.25)});}} style={{ background:`rgba(${t.rgb},.1)`, border:"none", color:t.text, width:20, height:20, borderRadius:5, cursor:"pointer", fontSize:13, lineHeight:1 }}>-</button>
                    <span style={{ fontSize:12, fontWeight:800, color:t.accent, minWidth:22, textAlign:"center" }}>{hrs}</span>
                    <button onClick={e=>{e.stopPropagation();setApps({...apps,[app.id]:Math.min(24,hrs+.25)});}} style={{ background:`rgba(${t.rgb},.1)`, border:"none", color:t.text, width:20, height:20, borderRadius:5, cursor:"pointer", fontSize:13, lineHeight:1 }}>+</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ textAlign:"center" }}>
        <PrimaryBtn onClick={fromApps} disabled={appCount===0}>{appCount>0?`Calculate ${appCount} Appliances →`:"Select at least one"}</PrimaryBtn>
      </div>
    </div>
  );

  // Simple quiz
  const q = QUIZ[step];
  return (
    <div style={{ opacity:fade?0:1, transition:"opacity .2s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:26 }}>
        <BackBtn onClick={()=>step===0?go(()=>setMode(null)):go(()=>setStep(s=>s-1))} style={{ marginBottom:0 }}/>
        <div style={{ display:"flex", gap:4 }}>{QUIZ.map((_,i)=><div key={i} style={{ width:i===step?20:6, height:6, borderRadius:3, background:i<=step?t.accent:`rgba(${t.rgb},.15)`, transition:"all .3s" }}/>)}</div>
        <div style={{ fontSize:12, color:t.sub }}>{step+1}/{QUIZ.length}</div>
      </div>
      <div key={step} style={{ animation:"fadeUp .3s ease" }}>
        <div style={{ textAlign:"center", marginBottom:22 }}>
          <h3 style={{ fontFamily:H, fontSize:"clamp(22px,4vw,34px)", letterSpacing:1.5, color:t.text, marginBottom:5 }}>{q.q}</h3>
          <p style={{ color:t.sub, fontSize:14 }}>{q.hint}</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))", gap:10 }}>
          {q.opts.map(o=>{
            const sel = ans[q.id]===o.v;
            return (
              <button key={o.v} onClick={()=>{
                const na = {...ans,[q.id]:o.v}; setAns(na);
                if(step<QUIZ.length-1) setTimeout(()=>go(()=>setStep(s=>s+1)),180);
                else setTimeout(()=>{
                  const sz=QUIZ[0].opts.find(x=>x.v===na[QUIZ[0].id]);
                  const bl=QUIZ[1].opts.find(x=>x.v===na[QUIZ[1].id]);
                  const gl=QUIZ[2].opts.find(x=>x.v===na[QUIZ[2].id]);
                  const ls=QUIZ[3].opts.find(x=>x.v===na[QUIZ[3].id]);
                  onResult(makeResult((sz?.kwh||18)*(bl?.mult||1), gl?.kw||5, ls?.bf||1.5));
                },200);
              }} style={{ background:sel?`rgba(${t.rgb},.12)`:t.bgCard, border:`1px solid ${sel?t.accent:t.border}`, borderRadius:14, padding:"18px 15px", cursor:"pointer", textAlign:"left", transition:"all .2s" }}
                onMouseEnter={e=>{ if(!sel){ e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`; e.currentTarget.style.transform="translateY(-2px)"; }}}
                onMouseLeave={e=>{ if(!sel){ e.currentTarget.style.borderColor=t.border; e.currentTarget.style.transform="none"; }}}>
                <div style={{ fontSize:26, marginBottom:8 }}>{o.icon}</div>
                <div style={{ fontFamily:H, fontSize:17, letterSpacing:1, color:sel?t.accent:t.text }}>{o.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── RESULTS ──────────────────────────────────────────────────────────────────
function Results({ r, onReset, goInstallers }) {
  const t = useT();
  const aC = useCount(r.cost);
  const aS = useCount(r.annSave);
  return (
    <div style={{ animation:"fadeUp .5s ease" }}>
      <div style={{ textAlign:"center", marginBottom:24 }}>
        <div style={{ fontSize:40, marginBottom:10 }}>☀️</div>
        <h2 style={{ fontFamily:H, fontSize:"clamp(28px,5vw,46px)", letterSpacing:2, color:t.text, marginBottom:5 }}>Your Solar Profile Is Ready</h2>
        <p style={{ color:t.sub, fontSize:14 }}>Here's exactly what your home needs</p>
      </div>
      <div style={{ background:`linear-gradient(135deg,rgba(${t.rgb},.12),rgba(${t.rgb},.05))`, border:`1px solid rgba(${t.rgb},.22)`, borderRadius:20, padding:"24px", textAlign:"center", marginBottom:12 }}>
        <Lbl>Recommended System</Lbl>
        <div style={{ fontFamily:H, fontSize:"clamp(58px,10vw,84px)", letterSpacing:3, color:t.text, lineHeight:1, marginBottom:4 }}>
          {r.systemKw}<span style={{ fontSize:"0.38em", color:t.accent, letterSpacing:2 }}>kW</span>
        </div>
        <div style={{ color:t.sub, marginBottom:20 }}>with {r.battKwh} kWh battery · {r.panels} solar panels</div>
        <div style={{ display:"flex", justifyContent:"center", gap:32, flexWrap:"wrap" }}>
          {[["Payback",`${r.payback} yrs`],["Daily Output",`${r.dailyKwh} kWh`],["After Solar",`~R${Math.round(r.mo*.25).toLocaleString()}/mo`]].map(([l,v])=>(
            <div key={l}><div style={{ fontFamily:H, fontSize:20, letterSpacing:1, color:t.accent }}>{v}</div><div style={{ fontSize:11, color:t.sub, marginTop:2 }}>{l}</div></div>
          ))}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
        {[["Estimated Cost",`R${aC.toLocaleString()}`,t.accent],["Annual Savings",`R${aS.toLocaleString()}`,"#4ade80"],["Current Bill",`R${r.mo.toLocaleString()}/mo`,"#60a5fa"],["After Solar",`~R${Math.round(r.mo*.25).toLocaleString()}/mo`,"#c084fc"]].map(([l,v,c])=>(
          <div key={l} style={{ background:t.bgCard, border:`1px solid ${c}22`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:10, color:t.sub, textTransform:"uppercase", letterSpacing:1.5, marginBottom:5 }}>{l}</div>
            <div style={{ fontFamily:H, fontSize:22, letterSpacing:1, color:c }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:13, padding:"16px", marginBottom:12 }}>
        <div style={{ fontFamily:H, fontSize:16, letterSpacing:1, color:t.text, marginBottom:9 }}>What This Means For You</div>
        {[`✅ Lights, WiFi, TV & fridge run through all load shedding`,`✅ Save ~R${Math.round(r.annSave/12).toLocaleString()} every single month`,`✅ System pays for itself in ${r.payback} years — then it's free energy`,`✅ Claim up to 25% of panel cost back from SARS`,`✅ Property value increases R50k–R150k with solar`].map(txt=>(
          <div key={txt} style={{ fontSize:13, color:t.sub, marginBottom:6, lineHeight:1.6 }}>{txt}</div>
        ))}
      </div>
      <div style={{ background:`linear-gradient(135deg,rgba(${t.rgb},.1),rgba(${t.rgb},.04))`, border:`1px solid rgba(${t.rgb},.2)`, borderRadius:16, padding:"22px", textAlign:"center", marginBottom:10 }}>
        <div style={{ fontFamily:H, fontSize:22, letterSpacing:1.5, color:t.text, marginBottom:5 }}>Find Verified Installers Near You</div>
        <p style={{ color:t.sub, fontSize:13, marginBottom:16, lineHeight:1.7 }}>SESSA-accredited installers matched to your system, with real reviews from SA homeowners.</p>
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          <PrimaryBtn onClick={goInstallers}>Browse Installers →</PrimaryBtn>
          <button style={{ background:"transparent", color:t.sub, border:`1px solid ${t.border}`, borderRadius:25, padding:"12px 20px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:B }}>📱 WhatsApp Results</button>
        </div>
      </div>
      <div style={{ textAlign:"center" }}>
        <button onClick={onReset} style={{ background:"none", border:"none", color:t.sub, cursor:"pointer", fontSize:13, textDecoration:"underline", fontFamily:B }}>← Recalculate</button>
      </div>
    </div>
  );
}

// ─── INSTALLERS ───────────────────────────────────────────────────────────────
function Installers() {
  const t = useT();
  const [search,setSearch]       = useState("");
  const [prov,setProv]           = useState("All");
  const [spec,setSpec]           = useState("All");
  const [brand,setBrand]         = useState("All");
  const [minRating,setMinRating] = useState(0);
  const [verOnly,setVerOnly]     = useState(false);
  const [sessaOnly,setSessaOnly] = useState(false);
  const [sortBy,setSortBy]       = useState("rating");
  const [open,setOpen]           = useState(null);
  const [showFilters,setShowFilters] = useState(false);

  const filtered = INSTALLERS.filter(i=>{
    if(search && !i.name.toLowerCase().includes(search.toLowerCase()) && !i.city.toLowerCase().includes(search.toLowerCase())) return false;
    if(prov!=="All" && i.prov!==prov) return false;
    if(spec!=="All" && i.spec!==spec) return false;
    if(brand!=="All" && !i.brands.includes(brand)) return false;
    if(i.rating < minRating) return false;
    if(verOnly && !i.verified) return false;
    if(sessaOnly && !i.sessa) return false;
    return true;
  }).sort((a,b)=>{
    if(sortBy==="rating") return b.rating-a.rating;
    if(sortBy==="reviews") return b.rev-a.rev;
    if(sortBy==="jobs") return b.jobs-a.jobs;
    if(sortBy==="experience") return b.yrs-a.yrs;
    return 0;
  });

  const activeCount = [prov!=="All",spec!=="All",brand!=="All",minRating>0,verOnly,sessaOnly].filter(Boolean).length;
  const clearAll = () => { setProv("All"); setSpec("All"); setBrand("All"); setMinRating(0); setVerOnly(false); setSessaOnly(false); };

  const sel = { width:"100%", background:t.inputBg, border:`1px solid ${t.border}`, borderRadius:8, padding:"8px 10px", color:t.text, fontSize:13, outline:"none", fontFamily:B };

  return (
    <div>
      <Lbl>Installer Directory</Lbl>
      <h2 style={{ fontFamily:H, fontSize:34, letterSpacing:2, color:t.text, marginBottom:5 }}>Verified SA Installers</h2>
      <p style={{ color:t.sub, fontSize:14, marginBottom:18 }}>SESSA-accredited solar installers with real reviews from SA homeowners</p>

      {/* Search + controls row */}
      <div style={{ display:"flex", gap:9, marginBottom:12, flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:180, position:"relative" }}>
          <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", fontSize:14, color:t.sub, pointerEvents:"none" }}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or city..."
            style={{ width:"100%", background:t.inputBg, border:`1px solid ${t.border}`, borderRadius:10, padding:"10px 12px 10px 34px", color:t.text, fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:B }}/>
        </div>
        <button onClick={()=>setShowFilters(o=>!o)} style={{ background:showFilters||activeCount>0?`rgba(${t.rgb},.12)`:t.bgCard, border:`1px solid ${showFilters||activeCount>0?`rgba(${t.rgb},.4)`:t.border}`, color:showFilters||activeCount>0?t.accent:t.sub, borderRadius:10, padding:"10px 15px", cursor:"pointer", fontSize:13, fontWeight:700, display:"flex", alignItems:"center", gap:7, transition:"all .2s", fontFamily:B }}>
          ⚙️ Filters {activeCount>0&&<span style={{ background:t.accent, color:t.dark?"#000":"#fff", borderRadius:"50%", width:17, height:17, fontSize:10, display:"inline-flex", alignItems:"center", justifyContent:"center", fontWeight:900 }}>{activeCount}</span>}
        </button>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{ ...sel, width:"auto", padding:"10px 12px" }}>
          <option value="rating">Top Rated</option>
          <option value="reviews">Most Reviews</option>
          <option value="jobs">Most Jobs</option>
          <option value="experience">Most Experience</option>
        </select>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:13, padding:"16px 18px", marginBottom:14, animation:"fadeUp .2s ease" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:13 }}>
            <div><div style={{ fontSize:10, color:t.sub, textTransform:"uppercase", letterSpacing:1.5, marginBottom:6, fontWeight:700 }}>Province</div><select value={prov} onChange={e=>setProv(e.target.value)} style={sel}>{PROVS.map(p=><option key={p}>{p}</option>)}</select></div>
            <div><div style={{ fontSize:10, color:t.sub, textTransform:"uppercase", letterSpacing:1.5, marginBottom:6, fontWeight:700 }}>Specialty</div><select value={spec} onChange={e=>setSpec(e.target.value)} style={sel}>{SPECS.map(s=><option key={s}>{s}</option>)}</select></div>
            <div><div style={{ fontSize:10, color:t.sub, textTransform:"uppercase", letterSpacing:1.5, marginBottom:6, fontWeight:700 }}>Brand</div><select value={brand} onChange={e=>setBrand(e.target.value)} style={sel}>{BRANDS.map(b=><option key={b}>{b}</option>)}</select></div>
            <div>
              <div style={{ fontSize:10, color:t.sub, textTransform:"uppercase", letterSpacing:1.5, marginBottom:6, fontWeight:700 }}>Min Rating: {minRating>0?`${minRating}★`:"Any"}</div>
              <input type="range" min={0} max={4.5} step={0.5} value={minRating} onChange={e=>setMinRating(parseFloat(e.target.value))} style={{ width:"100%", accentColor:t.accent }}/>
              <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ fontSize:9, color:t.sub }}>Any</span><span style={{ fontSize:9, color:t.sub }}>4.5+</span></div>
            </div>
          </div>
          <div style={{ display:"flex", gap:16, marginTop:12, flexWrap:"wrap", alignItems:"center" }}>
            {[["SESSA Accredited only",sessaOnly,setSessaOnly],["Verified only",verOnly,setVerOnly]].map(([lbl,val,fn])=>(
              <label key={lbl} style={{ display:"flex", alignItems:"center", gap:7, cursor:"pointer" }}>
                <input type="checkbox" checked={val} onChange={e=>fn(e.target.checked)} style={{ accentColor:t.accent, width:15, height:15 }}/>
                <span style={{ fontSize:13, color:t.textMid, fontFamily:B }}>{lbl}</span>
              </label>
            ))}
            {activeCount>0 && <button onClick={clearAll} style={{ marginLeft:"auto", background:"none", border:"none", color:t.accent, cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:B }}>Clear all</button>}
          </div>
        </div>
      )}

      <div style={{ fontSize:12, color:t.sub, marginBottom:13, fontFamily:B }}>
        {filtered.length===0?"No installers match your filters.":`Showing ${filtered.length} installer${filtered.length!==1?"s":""}`}
        {activeCount>0&&<span style={{ color:t.accent }}> · filtered</span>}
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
        {filtered.length===0?(
          <div style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:13, padding:"30px", textAlign:"center" }}>
            <div style={{ fontSize:30, marginBottom:9 }}>🔍</div>
            <div style={{ fontFamily:H, fontSize:20, letterSpacing:1, color:t.text, marginBottom:5 }}>No Results Found</div>
            <div style={{ fontSize:13, color:t.sub, marginBottom:13 }}>Try adjusting your filters or search term.</div>
            <button onClick={()=>{clearAll();setSearch("");}} style={{ background:`rgba(${t.rgb},.1)`, border:`1px solid rgba(${t.rgb},.3)`, color:t.accent, borderRadius:10, padding:"9px 18px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:B }}>Clear All Filters</button>
          </div>
        ):filtered.map((inst,i)=>(
          <div key={inst.id} style={{ background:open===inst.id?`rgba(${t.rgb},.04)`:t.bgCard, border:`1px solid ${open===inst.id?`rgba(${t.rgb},.28)`:t.border}`, borderRadius:15, padding:"17px 19px", cursor:"pointer", transition:"all .2s", animation:`fadeUp .3s ease ${i*.04}s both` }}
            onClick={()=>setOpen(open===inst.id?null:inst.id)}
            onMouseEnter={e=>{if(open!==inst.id) e.currentTarget.style.borderColor=`rgba(${t.rgb},.2)`;}}
            onMouseLeave={e=>{if(open!==inst.id) e.currentTarget.style.borderColor=t.border;}}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:11 }}>
              <div style={{ width:42, height:42, borderRadius:11, background:`rgba(${t.rgb},.1)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>🏢</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3, flexWrap:"wrap" }}>
                  <span style={{ fontFamily:H, fontSize:17, letterSpacing:.5, color:t.text }}>{inst.name}</span>
                  {inst.badge && <Tag>{inst.badge}</Tag>}
                  {inst.sessa && <Tag color="#22c55e">✓ SESSA</Tag>}
                  {inst.verified && <Tag color="#60a5fa">✓ Verified</Tag>}
                </div>
                <div style={{ fontSize:12, color:t.sub, marginBottom:4, fontFamily:B }}>{inst.city}, {inst.prov} · {inst.spec} · {inst.yrs} yrs exp</div>
                <div style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"center" }}>
                  <Stars n={inst.rating}/><span style={{ fontSize:11, color:t.sub, fontFamily:B }}> ({inst.rev})</span>
                  <span style={{ fontSize:11, color:t.sub }}>⚡ {inst.resp}</span>
                  <span style={{ fontSize:11, color:t.sub }}>🏠 {inst.jobs} installs</span>
                  <span style={{ fontSize:11, color:t.sub }}>💰 {inst.price}</span>
                </div>
              </div>
              <div style={{ display:"flex", gap:5, flexWrap:"wrap", maxWidth:120, alignItems:"flex-start" }}>
                {inst.brands.map(b=><span key={b} style={{ fontSize:9, color:t.sub, background:`rgba(${t.rgb},.06)`, border:`1px solid ${t.border}`, padding:"2px 7px", borderRadius:7, whiteSpace:"nowrap" }}>{b}</span>)}
              </div>
              <span style={{ fontSize:14, color:t.sub, transition:"transform .2s", transform:open===inst.id?"rotate(90deg)":"none", flexShrink:0, paddingTop:2 }}>›</span>
            </div>
            {open===inst.id && (
              <div style={{ marginTop:15, paddingTop:15, borderTop:`1px solid ${t.border}`, animation:"fadeUp .25s ease" }}>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(135px,1fr))", gap:8, marginBottom:13 }}>
                  {[["Specialty",inst.spec],["Experience",`${inst.yrs} years`],["Response",inst.resp],["Price Range",inst.price],["Jobs Done",`${inst.jobs}+`],["Accreditation",inst.sessa?"SESSA Certified":"Not accredited"]].map(([l,v])=>(
                    <div key={l} style={{ background:t.bgCard2, borderRadius:8, padding:"8px 10px" }}>
                      <div style={{ fontSize:10, color:t.sub, marginBottom:2 }}>{l}</div>
                      <div style={{ fontSize:12, fontWeight:700, color:t.textMid, fontFamily:B }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <PrimaryBtn small style={{ flex:1, borderRadius:9, padding:"9px" }}>Request Quote</PrimaryBtn>
                  <button style={{ background:"rgba(37,211,102,.1)", border:"1px solid rgba(37,211,102,.28)", color:"#25d366", borderRadius:9, padding:"9px 13px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:B }}>📱 WhatsApp</button>
                  <button style={{ background:t.bgCard, border:`1px solid ${t.border}`, color:t.sub, borderRadius:9, padding:"9px 13px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:B }}>View Profile</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Proposal generator teaser */}
      <div style={{ marginTop:20, background:`linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`, border:`1px solid rgba(${t.rgb},.18)`, borderRadius:15, padding:"20px 22px", display:"flex", gap:14, alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ fontSize:30 }}>📋</div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:H, fontSize:19, letterSpacing:1, color:t.text, marginBottom:3 }}>Installer? Generate Branded PDF Proposals</div>
          <div style={{ fontSize:13, color:t.sub, lineHeight:1.6 }}>Use SolarIQ results to generate professional, branded PDF quotes and send them to customers instantly. <span style={{ color:t.accent, fontWeight:700 }}>Coming soon.</span></div>
        </div>
        <button style={{ background:t.bgCard, border:`1px solid rgba(${t.rgb},.3)`, color:t.accent, borderRadius:10, padding:"10px 18px", fontSize:13, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", fontFamily:B }}>Join Waitlist →</button>
      </div>

      <div style={{ marginTop:10, background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:10, padding:"13px 18px", textAlign:"center" }}>
        <span style={{ fontSize:13, color:t.sub, fontFamily:B }}>Are you a solar installer? </span>
        <button style={{ background:"none", border:"none", color:t.accent, cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:B }}>List your business free →</button>
      </div>
    </div>
  );
}

// ─── SERVICING ────────────────────────────────────────────────────────────────
function Servicing() {
  const t = useT();
  const [page,setPage]       = useState("home");
  const [errCode,setErrCode] = useState("");
  const [errRes,setErrRes]   = useState(null);
  const [hAns,setHAns]       = useState({});
  const [hStep,setHStep]     = useState(0);
  const [hResult,setHResult] = useState(null);
  const [tProv,setTProv]     = useState("All");

  const lookupErr = () => { const c=errCode.trim().toUpperCase(); const m=ERRORS[c]; setErrRes(m?{...m,code:c}:{notFound:true,code:c}); };
  const calcHealth = () => {
    const sc={age:[0,5,15,25],perf:[0,10,25,5],snd:[0,10,25,40],err:[0,10,25,40],cln:[0,5,20,30],svc:[0,10,30,15]};
    let tot=0; Object.keys(sc).forEach(k=>{const idx=HEALTH_QS.find(q=>q.id===k)?.opts.indexOf(hAns[k]);if(idx>=0)tot+=sc[k][idx]||0;});
    const score=Math.max(0,100-tot);
    setHResult({score,status:score>=80?"Healthy":score>=60?"Needs Attention":score>=40?"Service Required":"Critical — Act Now",color:score>=80?"#4ade80":score>=60?t.accent:score>=40?"#fb923c":"#ef4444",note:score>=80?"System performing well. Schedule annual service within 3 months.":score>=60?"System shows signs of wear. Book an inspection soon.":score>=40?"Book a professional service within 2 weeks.":"Possible serious issue. Contact a technician immediately."});
  };
  const reset = () => { setPage("home");setErrCode("");setErrRes(null);setHAns({});setHStep(0);setHResult(null); };

  if(page==="home") return (
    <div>
      <Lbl>After-Sales Care</Lbl>
      <h2 style={{ fontFamily:H, fontSize:34, letterSpacing:2, color:t.text, marginBottom:5 }}>Solar Servicing & Repair</h2>
      <p style={{ color:t.sub, fontSize:14, lineHeight:1.7, marginBottom:20 }}>Keep your system at peak performance — for the lifetime of your investment.</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:11, marginBottom:16 }}>
        {[
          {id:"health",  icon:"🩺",title:"System Health Check",   desc:"6 quick questions to diagnose your system.",         badge:"AI",     color:"#4ade80"},
          {id:"error",   icon:"⚠️",title:"Error Code Translator", desc:"Type any inverter code. Plain English instantly.",    badge:"Instant",color:t.accent },
          {id:"techs",   icon:"🔧",title:"Find a Technician",     desc:"Verified repair specialists and panel cleaners.",     badge:null,     color:"#60a5fa"},
          {id:"reminder",icon:"📅",title:"Service Reminders",     desc:"WhatsApp reminders when your service is due.",        badge:"Free",   color:"#c084fc"},
        ].map((c,i)=>(
          <div key={c.id} onClick={()=>setPage(c.id)} style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:15, padding:"20px 18px", cursor:"pointer", transition:"all .22s", position:"relative", animation:`fadeUp .35s ease ${i*.07}s both` }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${c.color}44`;e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
            {c.badge&&<div style={{ position:"absolute", top:11, right:11, fontSize:9, background:`${c.color}18`, color:c.color, padding:"2px 7px", borderRadius:8, fontWeight:800, border:`1px solid ${c.color}33` }}>{c.badge}</div>}
            <div style={{ fontSize:26, marginBottom:10 }}>{c.icon}</div>
            <div style={{ fontFamily:H, fontSize:18, letterSpacing:1, color:t.text, marginBottom:4 }}>{c.title}</div>
            <div style={{ fontSize:13, color:t.sub, lineHeight:1.6, marginBottom:11 }}>{c.desc}</div>
            <div style={{ fontSize:12, color:c.color, fontWeight:700 }}>Open →</div>
          </div>
        ))}
      </div>
      <div style={{ background:"rgba(239,68,68,.06)", border:"1px solid rgba(239,68,68,.15)", borderRadius:12, padding:"14px 17px", display:"flex", alignItems:"center", gap:12 }}>
        <span style={{ fontSize:22 }}>🚨</span>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:H, fontSize:16, letterSpacing:1, color:"#f87171", marginBottom:2 }}>System Completely Offline?</div>
          <div style={{ fontSize:12, color:t.sub }}>Emergency technicians available across all major SA provinces.</div>
        </div>
        <button style={{ background:"rgba(239,68,68,.15)", border:"1px solid rgba(239,68,68,.3)", color:"#f87171", borderRadius:9, padding:"8px 14px", fontSize:12, fontWeight:800, cursor:"pointer", whiteSpace:"nowrap", fontFamily:B }}>Emergency Call</button>
      </div>
    </div>
  );

  if(page==="error") return (
    <div>
      <BackBtn onClick={reset}/>
      <Lbl>Diagnostic Tool</Lbl>
      <h3 style={{ fontFamily:H, fontSize:28, letterSpacing:2, color:t.text, marginBottom:5 }}>Error Code Translator</h3>
      <p style={{ color:t.sub, fontSize:14, marginBottom:16 }}>Type the error code on your inverter display. Supports Sunsynk, Victron, Deye and Growatt.</p>
      <div style={{ display:"flex", gap:9, marginBottom:12 }}>
        <input value={errCode} onChange={e=>setErrCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&lookupErr()} placeholder="e.g. F32, E001, G05..."
          style={{ flex:1, background:t.inputBg, border:`1px solid ${t.border}`, borderRadius:10, padding:"11px 14px", color:t.text, fontSize:15, fontFamily:"monospace", fontWeight:700, letterSpacing:2, outline:"none" }}/>
        <PrimaryBtn onClick={lookupErr} style={{ borderRadius:10, padding:"11px 18px" }}>Look Up</PrimaryBtn>
      </div>
      <div style={{ display:"flex", gap:6, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
        <span style={{ fontSize:11, color:t.sub }}>Try:</span>
        {["F01","F32","E001","E002","E003","W003","G01","G05"].map(c=>(
          <button key={c} onClick={()=>{setErrCode(c);setErrRes(null);}} style={{ background:t.bgCard, border:`1px solid ${t.border}`, color:t.sub, borderRadius:7, padding:"3px 10px", cursor:"pointer", fontSize:11, fontWeight:700, letterSpacing:1, transition:"all .2s", fontFamily:"monospace" }}
            onMouseEnter={e=>{e.currentTarget.style.color=t.accent;e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`;}}
            onMouseLeave={e=>{e.currentTarget.style.color=t.sub;e.currentTarget.style.borderColor=t.border;}}>{c}</button>
        ))}
      </div>
      {errRes&&(
        <div style={{ animation:"fadeUp .35s ease" }}>
          {errRes.notFound?(
            <div style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:13, padding:"22px", textAlign:"center" }}>
              <div style={{ fontSize:30, marginBottom:9 }}>🤔</div>
              <div style={{ fontFamily:H, fontSize:20, letterSpacing:1, color:t.text, marginBottom:5 }}>Code "{errRes.code}" Not In Database Yet</div>
              <div style={{ fontSize:13, color:t.sub, marginBottom:13 }}>We add new codes daily. A technician can diagnose this right away.</div>
              <button onClick={()=>setPage("techs")} style={{ background:`rgba(${t.rgb},.1)`, border:`1px solid rgba(${t.rgb},.3)`, color:t.accent, borderRadius:10, padding:"9px 18px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:B }}>Find a Technician →</button>
            </div>
          ):(
            <>
              <div style={{ background:errRes.sev==="critical"?"rgba(239,68,68,.06)":errRes.sev==="warning"?`rgba(${t.rgb},.06)`:"rgba(96,165,250,.06)", border:`1px solid ${errRes.sev==="critical"?"rgba(239,68,68,.2)":errRes.sev==="warning"?`rgba(${t.rgb},.2)`:"rgba(96,165,250,.2)"}`, borderRadius:13, padding:"20px", marginBottom:10 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:11 }}>
                  <div style={{ fontFamily:H, fontSize:28, letterSpacing:2, color:errRes.sev==="critical"?"#ef4444":errRes.sev==="warning"?t.accent:"#60a5fa" }}>{errRes.code}</div>
                  <div><div style={{ fontSize:10, color:t.sub, textTransform:"uppercase", letterSpacing:1, marginBottom:3 }}>{errRes.brand}</div>
                  <span style={{ fontSize:10, background:errRes.sev==="critical"?"rgba(239,68,68,.15)":errRes.sev==="warning"?`rgba(${t.rgb},.15)`:"rgba(96,165,250,.15)", color:errRes.sev==="critical"?"#f87171":errRes.sev==="warning"?t.accent:"#93c5fd", padding:"2px 8px", borderRadius:8, fontWeight:800, textTransform:"uppercase" }}>{errRes.sev}</span></div>
                </div>
                <div style={{ fontFamily:H, fontSize:20, letterSpacing:1, color:t.text, marginBottom:9 }}>{errRes.title}</div>
                <div style={{ fontSize:14, color:t.sub, lineHeight:1.7 }}>{errRes.fix}</div>
              </div>
              <div style={{ display:"flex", gap:9 }}>
                <div style={{ flex:1, background:errRes.diy?"rgba(74,222,128,.07)":"rgba(239,68,68,.07)", border:`1px solid ${errRes.diy?"rgba(74,222,128,.2)":"rgba(239,68,68,.2)"}`, borderRadius:10, padding:"10px 13px", display:"flex", alignItems:"center", gap:8 }}>
                  <span>{errRes.diy?"✅":"⚠️"}</span>
                  <span style={{ fontSize:12, color:errRes.diy?"#4ade80":"#f87171", fontWeight:600, fontFamily:B }}>{errRes.diy?"You can resolve this yourself":"Requires a qualified technician"}</span>
                </div>
                {!errRes.diy&&<PrimaryBtn small style={{ borderRadius:10, padding:"10px 16px" }} onClick={()=>setPage("techs")}>Find Technician →</PrimaryBtn>}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );

  if(page==="health") {
    if(hResult) return (
      <div style={{ animation:"fadeUp .5s ease" }}>
        <BackBtn onClick={()=>{setHResult(null);setHAns({});setHStep(0);}}/>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ width:86, height:86, borderRadius:"50%", background:`${hResult.color}18`, border:`3px solid ${hResult.color}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", flexDirection:"column" }}>
            <div style={{ fontFamily:H, fontSize:24, color:hResult.color }}>{hResult.score}</div>
            <div style={{ fontSize:9, color:hResult.color, fontWeight:700 }}>/100</div>
          </div>
          <div style={{ fontFamily:H, fontSize:26, letterSpacing:2, color:hResult.color, marginBottom:5 }}>{hResult.status}</div>
          <p style={{ color:t.sub, fontSize:14, maxWidth:360, margin:"0 auto", lineHeight:1.7 }}>{hResult.note}</p>
        </div>
        <div style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:12, padding:"15px", marginBottom:14 }}>
          {[["Panel Efficiency",hResult.score*.3+60,"#f5a623"],["Battery Health",hResult.score*.4+50,"#4ade80"],["Inverter Status",hResult.score*.5+45,"#60a5fa"]].map(([l,v,c])=>(
            <div key={l} style={{ marginBottom:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}><span style={{ fontSize:12, color:t.sub }}>{l}</span><span style={{ fontSize:12, fontWeight:700, color:c }}>{Math.min(100,Math.round(v))}%</span></div>
              <div style={{ height:4, background:`rgba(128,128,128,.15)`, borderRadius:2 }}><div style={{ width:`${Math.min(100,v)}%`, height:"100%", background:c, borderRadius:2, transition:"width .8s ease" }}/></div>
            </div>
          ))}
        </div>
        <PrimaryBtn style={{ width:"100%" }} onClick={()=>setPage("techs")}>Book a Professional Service →</PrimaryBtn>
      </div>
    );
    const q = HEALTH_QS[hStep];
    return (
      <div>
        <BackBtn onClick={()=>hStep===0?reset():setHStep(s=>s-1)}/>
        <div style={{ display:"flex", gap:4, marginBottom:20 }}>{HEALTH_QS.map((_,i)=><div key={i} style={{ flex:1, height:3, borderRadius:2, background:i<=hStep?t.accent:`rgba(${t.rgb},.15)`, transition:"background .3s" }}/>)}</div>
        <div key={hStep} style={{ animation:"fadeUp .3s ease" }}>
          <Lbl>Question {hStep+1} of {HEALTH_QS.length}</Lbl>
          <h3 style={{ fontFamily:H, fontSize:22, letterSpacing:1, color:t.text, marginBottom:16, lineHeight:1.2 }}>{q.q}</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {q.opts.map(o=>{
              const sel=hAns[q.id]===o;
              return <button key={o} onClick={()=>{const na={...hAns,[q.id]:o};setHAns(na);if(hStep<HEALTH_QS.length-1)setTimeout(()=>setHStep(s=>s+1),200);else setTimeout(calcHealth,200);}} style={{ background:sel?`rgba(${t.rgb},.1)`:t.bgCard, border:`1px solid ${sel?t.accent:t.border}`, borderRadius:10, padding:"12px 15px", cursor:"pointer", textAlign:"left", fontSize:14, color:sel?t.accent:t.sub, fontWeight:sel?700:400, transition:"all .2s", fontFamily:B }}>{o}</button>;
            })}
          </div>
        </div>
      </div>
    );
  }

  if(page==="techs") {
    const list = TECHS.filter(x=>tProv==="All"||x.prov===tProv);
    return (
      <div>
        <BackBtn onClick={reset}/>
        <Lbl>Repair Specialists</Lbl>
        <h3 style={{ fontFamily:H, fontSize:26, letterSpacing:2, color:t.text, marginBottom:4 }}>Find a Technician</h3>
        <p style={{ color:t.sub, fontSize:13, marginBottom:15 }}>Verified repair specialists, panel cleaners and battery experts</p>
        <div style={{ display:"flex", gap:7, marginBottom:15, flexWrap:"wrap" }}>
          {["All","Gauteng","Western Cape","KwaZulu-Natal"].map(p=>(
            <button key={p} onClick={()=>setTProv(p)} style={{ background:tProv===p?`rgba(${t.rgb},.12)`:t.bgCard, border:`1px solid ${tProv===p?`rgba(${t.rgb},.4)`:t.border}`, color:tProv===p?t.accent:t.sub, borderRadius:20, padding:"5px 13px", cursor:"pointer", fontSize:12, fontWeight:700, transition:"all .2s", fontFamily:B }}>{p}</button>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {list.map((tech,i)=>(
            <div key={tech.id} style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:14, padding:"16px 18px", animation:`fadeUp .35s ease ${i*.07}s both`, transition:"border .2s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=`rgba(${t.rgb},.22)`}
              onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:10 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:`rgba(${t.rgb},.1)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>🔧</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2, flexWrap:"wrap" }}>
                    <span style={{ fontFamily:H, fontSize:16, letterSpacing:.5, color:t.text }}>{tech.name}</span>
                    {tech.emergency&&<span style={{ fontSize:9, background:"rgba(239,68,68,.15)", color:"#f87171", padding:"2px 7px", borderRadius:8, fontWeight:800 }}>🚨 24/7</span>}
                  </div>
                  <div style={{ fontSize:12, color:t.sub, marginBottom:2, fontFamily:B }}>{tech.spec} · {tech.prov}</div>
                  <Stars n={tech.rating} small/><span style={{ fontSize:11, color:t.sub }}> ({tech.rev})</span>
                </div>
                <div style={{ fontFamily:H, fontSize:17, letterSpacing:1, color:t.accent }}>{tech.price}</div>
              </div>
              <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:10 }}>
                {tech.brands.map(b=><span key={b} style={{ fontSize:10, color:t.sub, background:`rgba(${t.rgb},.05)`, border:`1px solid ${t.border}`, padding:"2px 7px", borderRadius:7 }}>{b}</span>)}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <PrimaryBtn small style={{ flex:1, borderRadius:9, padding:"9px" }}>Book Service</PrimaryBtn>
                <button style={{ background:"rgba(37,211,102,.1)", border:"1px solid rgba(37,211,102,.25)", color:"#25d366", borderRadius:9, padding:"9px 13px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:B }}>WhatsApp</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if(page==="reminder") return (
    <div>
      <BackBtn onClick={reset}/>
      <Lbl>Free Service</Lbl>
      <h3 style={{ fontFamily:H, fontSize:26, letterSpacing:2, color:t.text, marginBottom:5 }}>Service Reminders</h3>
      <p style={{ color:t.sub, fontSize:14, lineHeight:1.7, marginBottom:18 }}>Register once. We'll WhatsApp you when cleaning, servicing or a health check is due.</p>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
        {[["Your name","text","John Smith"],["WhatsApp number","tel","+27 82 000 0000"],["System size (kW)","text","e.g. 5kW"],["Installation date","date",""],["Inverter brand","text","e.g. Sunsynk, Victron, Deye"]].map(([l,tp,ph])=>(
          <div key={l}>
            <label style={{ fontSize:11, color:t.sub, textTransform:"uppercase", letterSpacing:1.2, display:"block", marginBottom:4, fontWeight:700 }}>{l}</label>
            <input type={tp} placeholder={ph} style={{ width:"100%", background:t.inputBg, border:`1px solid ${t.border}`, borderRadius:9, padding:"10px 13px", color:t.text, fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:B }}/>
          </div>
        ))}
      </div>
      <PrimaryBtn style={{ width:"100%" }}>📱 Register My System Free</PrimaryBtn>
      <div style={{ fontSize:11, color:t.sub, textAlign:"center", marginTop:9 }}>WhatsApp reminders only · No spam · Unsubscribe anytime</div>
    </div>
  );
  return null;
}

// ─── ARTICLE VIEW ─────────────────────────────────────────────────────────────
function ArticleView({ article, onBack }) {
  const t = useT();
  const related = article.related.map(id=>ARTICLES.find(a=>a.id===id)).filter(Boolean);
  return (
    <div style={{ maxWidth:660, margin:"0 auto", animation:"fadeUp .4s ease" }}>
      <BackBtn onClick={()=>onBack(null)}/>
      <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:13 }}>
        <Tag>{article.tag}</Tag>
        {article.hot&&<span style={{ fontSize:11, color:"#f87171" }}>🔥 Trending</span>}
        <span style={{ fontSize:12, color:t.sub, marginLeft:"auto" }}>{article.min} min · {article.views} views</span>
      </div>
      <h1 style={{ fontFamily:H, fontSize:"clamp(26px,5vw,42px)", letterSpacing:1.5, color:t.text, lineHeight:1.1, marginBottom:16 }}>{article.title}</h1>
      <p style={{ fontSize:15, color:t.textMid, lineHeight:1.85, borderLeft:`3px solid ${t.accent}`, paddingLeft:16, marginBottom:24, fontStyle:"italic" }}>{article.intro}</p>
      <div style={{ height:1, background:`linear-gradient(90deg,${t.accent},transparent)`, marginBottom:28, opacity:.4 }}/>
      <div style={{ display:"flex", flexDirection:"column", gap:24, marginBottom:34 }}>
        {article.body.map((sec,i)=>(
          <div key={i}>
            <h2 style={{ fontFamily:H, fontSize:21, letterSpacing:1, color:t.text, marginBottom:9 }}>{sec.h}</h2>
            <p style={{ fontSize:15, color:t.textMid, lineHeight:1.85 }}>{sec.p}</p>
          </div>
        ))}
      </div>
      <div style={{ background:`linear-gradient(135deg,rgba(${t.rgb},.1),rgba(${t.rgb},.04))`, border:`1px solid rgba(${t.rgb},.2)`, borderRadius:15, padding:"20px", textAlign:"center", marginBottom:28 }}>
        <div style={{ fontFamily:H, fontSize:20, letterSpacing:1.5, color:t.text, marginBottom:5 }}>Ready to Calculate Your System?</div>
        <p style={{ color:t.sub, fontSize:13, marginBottom:14 }}>Free calculator — personalised recommendation in under 2 minutes.</p>
        <PrimaryBtn small>☀️ Calculate My System</PrimaryBtn>
      </div>
      {related.length>0&&(
        <div>
          <div style={{ fontFamily:H, fontSize:18, letterSpacing:1, color:t.text, marginBottom:12 }}>Related Articles</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {related.map(rel=>(
              <div key={rel.id} onClick={()=>onBack(rel)} style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:11, padding:"13px 15px", cursor:"pointer", transition:"all .2s", display:"flex", alignItems:"center", gap:11 }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`;e.currentTarget.style.transform="translateX(4px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
                <div style={{ flex:1 }}><Tag>{rel.tag}</Tag><div style={{ fontFamily:H, fontSize:14, letterSpacing:.5, color:t.text, marginTop:5 }}>{rel.title}</div></div>
                <span style={{ fontSize:14, color:t.sub, flexShrink:0 }}>›</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BLOG ─────────────────────────────────────────────────────────────────────
function Blog() {
  const t = useT();
  const [active,setActive] = useState(null);
  const [tag,setTag]       = useState("All");
  const tags = ["All",...new Set(ARTICLES.map(a=>a.tag))];
  if(active) return <ArticleView article={active} onBack={a=>setActive(a||null)}/>;
  const list = tag==="All"?ARTICLES:ARTICLES.filter(a=>a.tag===tag);
  return (
    <div>
      <Lbl>Knowledge Hub</Lbl>
      <h2 style={{ fontFamily:H, fontSize:34, letterSpacing:2, color:t.text, marginBottom:5 }}>Solar Guides & Reviews</h2>
      <p style={{ color:t.sub, fontSize:14, marginBottom:18 }}>Honest solar content for South Africans. No brand deals. No bias.</p>
      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {tags.map(tg=>(
          <button key={tg} onClick={()=>setTag(tg)} style={{ background:tag===tg?`rgba(${t.rgb},.13)`:t.bgCard, border:`1px solid ${tag===tg?`rgba(${t.rgb},.4)`:t.border}`, color:tag===tg?t.accent:t.sub, borderRadius:20, padding:"5px 14px", cursor:"pointer", fontSize:12, fontWeight:700, transition:"all .2s", fontFamily:B }}>{tg}</button>
        ))}
      </div>
      {/* Featured */}
      <div onClick={()=>setActive(list[0])} style={{ background:`linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`, border:`1px solid rgba(${t.rgb},.15)`, borderRadius:16, padding:"22px 20px", marginBottom:13, cursor:"pointer", transition:"all .2s" }}
        onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`;e.currentTarget.style.transform="translateY(-2px)";}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.15)`;e.currentTarget.style.transform="none";}}>
        <div style={{ display:"flex", gap:8, marginBottom:10, alignItems:"center" }}>
          <Tag>FEATURED</Tag>
          {list[0].hot&&<span style={{ fontSize:11, color:"#f87171" }}>🔥 {list[0].views} reads</span>}
        </div>
        <h3 style={{ fontFamily:H, fontSize:"clamp(18px,3vw,24px)", letterSpacing:1, color:t.text, marginBottom:8, lineHeight:1.2 }}>{list[0].title}</h3>
        <p style={{ fontSize:13, color:t.sub, lineHeight:1.6, marginBottom:12 }}>{list[0].intro}</p>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:12, color:t.sub }}>{list[0].min} min read</span>
          <span style={{ fontSize:13, color:t.accent, fontWeight:700 }}>Read article →</span>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:10 }}>
        {list.slice(1).map((p,i)=>(
          <div key={p.id} onClick={()=>setActive(p)} style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:14, padding:"18px 17px", cursor:"pointer", transition:"all .2s", animation:`fadeUp .35s ease ${i*.07}s both` }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.25)`;e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
            <div style={{ display:"flex", gap:7, marginBottom:8, alignItems:"center" }}>
              <Tag>{p.tag}</Tag>
              {p.hot&&<span style={{ fontSize:11, color:"#f87171" }}>🔥</span>}
              <span style={{ fontSize:10, color:t.sub, marginLeft:"auto" }}>{p.views}</span>
            </div>
            <h4 style={{ fontFamily:H, fontSize:16, letterSpacing:.5, color:t.text, lineHeight:1.3, marginBottom:9 }}>{p.title}</h4>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:11, color:t.sub }}>{p.min} min read</span>
              <span style={{ fontSize:12, color:t.accent, fontWeight:700 }}>Read →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark,setIsDark] = useState(prefersDark);
  const [tab,setTab]       = useState("home");
  const [res,setRes]       = useState(null);

  useEffect(()=>{
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = e => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  },[]);

  const t = isDark ? DARK : LIGHT;
  const goTab = id => { setTab(id); if(id!=="result") setRes(null); };

  const TICKS = ["☀️ Solar tax rebate: claim 25% back from SARS","🔋 Load shedding prep — is your system sized right?","⚙️ Engineer Mode calculator now live","🩺 Free System Health Check — diagnose in 2 minutes","🔧 Verified repair technicians across SA","📋 Installer proposal generator — coming soon"];
  const NAV   = [{id:"home",l:"Home"},{id:"calc",l:"☀️ Calculator"},{id:"inst",l:"Installers"},{id:"serv",l:"🔧 Servicing"},{id:"blog",l:"Guides"}];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${t.bg};transition:background .35s,color .35s}
    ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:${t.accent};border-radius:4px}
    input::placeholder{color:${isDark?"#333":"#bbb"}}
    input[type=range]{height:4px;cursor:pointer}
    select option{background:${isDark?"#111":"#fff"};color:${t.text}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
    @keyframes glow{0%,100%{opacity:.2}50%{opacity:.6}}
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
  `;

  return (
    <T.Provider value={t}>
      <style>{css}</style>
      <div style={{ fontFamily:B, background:t.bg, minHeight:"100vh", color:t.text, transition:"background .35s,color .35s" }}>

        {/* Ticker */}
        <div style={{ background:`rgba(${t.rgb},.05)`, borderBottom:`1px solid rgba(${t.rgb},.1)`, height:27, overflow:"hidden", display:"flex", alignItems:"center" }}>
          <div style={{ display:"flex", animation:"ticker 36s linear infinite", whiteSpace:"nowrap" }}>
            {[...TICKS,...TICKS].map((x,i)=><span key={i} style={{ fontSize:10, color:t.accent, marginRight:56, opacity:.75, fontWeight:600, letterSpacing:.3 }}>{x}</span>)}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ background:t.navBg, backdropFilter:"blur(20px)", borderBottom:`1px solid ${t.border}`, padding:"0 24px", position:"sticky", top:0, zIndex:200 }}>
          <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:54 }}>
            <div onClick={()=>goTab("home")} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
              <div style={{ width:28, height:28, background:`linear-gradient(135deg,${t.accent},${t.accent2})`, borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, animation:"float 3s ease infinite" }}>☀️</div>
              <span style={{ fontFamily:H, fontSize:22, letterSpacing:2, color:t.text }}>Solar<span style={{ color:t.accent }}>IQ</span></span>
              <span style={{ fontSize:9, background:`rgba(${t.rgb},.15)`, color:t.accent, padding:"1px 6px", borderRadius:8, fontWeight:800, letterSpacing:1 }}>BETA</span>
            </div>
            <div style={{ display:"flex", gap:2 }}>
              {NAV.map(x=>(
                <button key={x.id} onClick={()=>goTab(x.id)} style={{ background:tab===x.id?`rgba(${t.rgb},.08)`:"none", border:`1px solid ${tab===x.id?`rgba(${t.rgb},.22)`:"transparent"}`, color:tab===x.id?t.accent:t.sub, padding:"5px 11px", borderRadius:7, cursor:"pointer", fontSize:12, fontWeight:600, transition:"all .2s", fontFamily:B }}>{x.l}</button>
              ))}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              {/* Theme toggle */}
              <button onClick={()=>setIsDark(d=>!d)} title={isDark?"Switch to light mode":"Switch to dark mode"} style={{ background:`rgba(${t.rgb},.1)`, border:`1px solid rgba(${t.rgb},.25)`, borderRadius:8, padding:"6px 12px", cursor:"pointer", fontSize:14, transition:"all .2s" }}>{isDark?"🌤️":"🌑"}</button>
              <button style={{ background:`linear-gradient(135deg,${t.accent},${t.accent2})`, border:"none", borderRadius:7, padding:"7px 15px", color:t.dark?"#000":"#fff", fontSize:12, fontWeight:800, cursor:"pointer", fontFamily:B }}>📧 Newsletter</button>
            </div>
          </div>
        </nav>

        {/* Ambient glow */}
        <div style={{ position:"fixed", top:0, left:"50%", transform:"translateX(-50%)", width:700, height:320, background:`radial-gradient(ellipse,${t.glow} 0%,transparent 70%)`, pointerEvents:"none", animation:"glow 5s ease infinite" }}/>

        {/* Content */}
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"38px 24px 80px", position:"relative" }}>

          {/* ── HOME ── */}
          {tab==="home" && (
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)", gap:52, alignItems:"center", marginBottom:52, animation:"fadeUp .5s ease" }}>
                <div>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:`rgba(${t.rgb},.08)`, border:`1px solid rgba(${t.rgb},.2)`, borderRadius:20, padding:"5px 14px", marginBottom:20 }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:t.accent, display:"inline-block", animation:"pulse 2s infinite" }}/>
                    <span style={{ fontSize:11, color:t.accent, fontWeight:700, letterSpacing:1 }}>SOUTH AFRICA'S SOLAR INTELLIGENCE PLATFORM</span>
                  </div>
                  <h1 style={{ fontFamily:H, fontSize:"clamp(38px,5.5vw,62px)", letterSpacing:2, lineHeight:1.0, marginBottom:16, color:t.text }}>
                    From Research<br/>To Install<br/>
                    <span style={{ color:t.accent }}>To Lifetime Care.</span>
                  </h1>
                  <p style={{ fontSize:15, color:t.sub, lineHeight:1.8, marginBottom:24, maxWidth:400 }}>The only platform SA solar owners need — calculate, install, maintain, repair. Free. Always.</p>
                  <div style={{ display:"flex", gap:11, flexWrap:"wrap", marginBottom:26 }}>
                    <PrimaryBtn onClick={()=>goTab("calc")}>☀️ Calculate My System</PrimaryBtn>
                    <button onClick={()=>goTab("serv")} style={{ background:`rgba(${t.rgb},.08)`, border:`1px solid rgba(${t.rgb},.2)`, color:t.accent, borderRadius:25, padding:"13px 20px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:B }}>🔧 Service My Solar</button>
                  </div>
                  <div style={{ display:"flex", gap:24 }}>
                    {[["4","Calculator modes"],["R0","Always free"],["🇿🇦","SA built"],["24/7","Support"]].map(([v,l])=>(
                      <div key={l}><div style={{ fontFamily:H, fontSize:20, letterSpacing:1, color:t.text }}>{v}</div><div style={{ fontSize:10, color:t.sub, marginTop:1 }}>{l}</div></div>
                    ))}
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:8, animation:"fadeUp .5s ease .1s both" }}>
                  {[
                    {icon:"✨",l:"Quick Calculator",      s:"4 simple questions — 60 seconds",       tab:"calc"},
                    {icon:"⚙️",l:"Engineer Mode",         s:"Full kW/kWh/Ah technical parameters",   tab:"calc"},
                    {icon:"🗺️",l:"Installer Directory",   s:"SESSA-accredited, verified",            tab:"inst"},
                    {icon:"🩺",l:"System Health Check",   s:"AI-powered system diagnostic",          tab:"serv", badge:"AI"},
                    {icon:"⚠️",l:"Error Code Translator", s:"Plain English inverter explanations",   tab:"serv"},
                    {icon:"🔧",l:"Find a Technician",     s:"Repair specialists near you",           tab:"serv"},
                  ].map((x,i)=>(
                    <div key={x.l} onClick={()=>goTab(x.tab)} style={{ display:"flex", alignItems:"center", gap:11, background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:11, padding:"11px 13px", cursor:"pointer", transition:"all .2s", animation:`fadeUp .4s ease ${i*.05}s both` }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`;e.currentTarget.style.transform="translateX(4px)";}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
                      <div style={{ width:32, height:32, borderRadius:8, background:`rgba(${t.rgb},.08)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{x.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:t.text, marginBottom:1 }}>{x.l}</div>
                        <div style={{ fontSize:11, color:t.sub }}>{x.s}</div>
                      </div>
                      {x.badge&&<span style={{ fontSize:9, background:`rgba(${t.rgb},.12)`, color:t.accent, padding:"2px 7px", borderRadius:7, fontWeight:800, flexShrink:0 }}>{x.badge}</span>}
                      <span style={{ fontSize:13, color:t.sub }}>›</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Journey */}
              <div style={{ marginBottom:34, animation:"fadeUp .5s ease .2s both" }}>
                <div style={{ textAlign:"center", marginBottom:20 }}>
                  <Lbl style={{ display:"block", textAlign:"center" }}>Your Solar Journey</Lbl>
                  <h2 style={{ fontFamily:H, fontSize:28, letterSpacing:1.5, color:t.text }}>SolarIQ is with you at every stage</h2>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:10 }}>
                  {[
                    {n:"01",l:"Research",icon:"🔍",d:"Calculate what you need — 4 modes",      c:t.accent  },
                    {n:"02",l:"Compare", icon:"⚖️",d:"Find the best verified installers",       c:t.accent2 },
                    {n:"03",l:"Install", icon:"⚡",d:"Connect with accredited professionals",   c:"#4ade80" },
                    {n:"04",l:"Maintain",icon:"🔧",d:"Reminders, cleaning, annual servicing",   c:"#60a5fa" },
                    {n:"05",l:"Repair",  icon:"🩺",d:"Error codes, health checks, technicians", c:"#c084fc" },
                  ].map((s,i)=>(
                    <div key={s.n} style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:13, padding:"17px 14px", animation:`fadeUp .4s ease ${i*.07}s both` }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:8 }}>
                        <span style={{ fontFamily:H, fontSize:10, color:s.c, opacity:.45 }}>{s.n}</span>
                        <div style={{ flex:1, height:1, background:`${s.c}20` }}/>
                        <span style={{ fontSize:16 }}>{s.icon}</span>
                      </div>
                      <div style={{ fontFamily:H, fontSize:15, letterSpacing:.5, color:s.c, marginBottom:4 }}>{s.l}</div>
                      <div style={{ fontSize:12, color:t.sub, lineHeight:1.6 }}>{s.d}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div style={{ background:`linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`, border:`1px solid rgba(${t.rgb},.15)`, borderRadius:18, padding:"32px", textAlign:"center", animation:"fadeUp .5s ease .26s both" }}>
                <div style={{ fontSize:26, marginBottom:9 }}>📬</div>
                <h3 style={{ fontFamily:H, fontSize:24, letterSpacing:1.5, color:t.text, marginBottom:5 }}>SA's Only Solar Newsletter</h3>
                <p style={{ color:t.sub, fontSize:14, marginBottom:18, lineHeight:1.7 }}>Weekly solar deals, maintenance tips and load shedding updates. SA homeowners only.</p>
                <div style={{ display:"flex", gap:9, justifyContent:"center", maxWidth:380, margin:"0 auto" }}>
                  <input placeholder="your@email.com" style={{ flex:1, background:t.inputBg, border:`1px solid ${t.border}`, borderRadius:9, padding:"10px 13px", color:t.text, fontSize:14, outline:"none", fontFamily:B }}/>
                  <PrimaryBtn style={{ borderRadius:9, padding:"10px 18px", fontSize:13 }}>Subscribe Free</PrimaryBtn>
                </div>
              </div>
            </div>
          )}

          {tab==="calc"   && !res && <div style={{ maxWidth:720, margin:"0 auto" }}><Calculator onResult={r=>{setRes(r);setTab("result");}}/></div>}
          {tab==="result" && res  && <div style={{ maxWidth:720, margin:"0 auto" }}><Results r={res} onReset={()=>{setRes(null);setTab("home");}} goInstallers={()=>goTab("inst")}/></div>}
          {tab==="inst"   && <Installers/>}
          {tab==="serv"   && <div style={{ maxWidth:720, margin:"0 auto" }}><Servicing/></div>}
          {tab==="blog"   && <Blog/>}
        </div>

        {/* Footer */}
        <div style={{ borderTop:`1px solid ${t.border}`, padding:"20px 24px", textAlign:"center" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:7, marginBottom:5 }}>
            <span>☀️</span>
            <span style={{ fontFamily:H, fontSize:16, letterSpacing:2, color:t.text }}>Solar<span style={{ color:t.accent }}>IQ</span></span>
          </div>
          <div style={{ fontSize:12, color:t.sub }}>South Africa's complete solar platform — calculate, install, maintain, repair. 🇿🇦</div>
        </div>
      </div>
    </T.Provider>
  );
}

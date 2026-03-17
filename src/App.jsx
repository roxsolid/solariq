import { useState, useEffect, createContext, useContext, useRef } from "react";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const DARK = { dark:true, accent:"#f5a623", accent2:"#ff6b00", rgb:"245,166,35", bg:"#07090d", bgCard:"rgba(255,255,255,.04)", bgCard2:"rgba(255,255,255,.07)", border:"rgba(255,255,255,.08)", text:"#f0f0f0", textMid:"#aaa", sub:"#555", navBg:"rgba(7,9,13,.95)", inputBg:"rgba(255,255,255,.06)" };
const LIGHT = { dark:false, accent:"#c47a0a", accent2:"#a05e00", rgb:"196,122,10", bg:"#edeae0", bgCard:"rgba(0,0,0,.06)", bgCard2:"rgba(0,0,0,.1)", border:"rgba(0,0,0,.14)", text:"#0f0f0f", textMid:"#333", sub:"#777", navBg:"rgba(237,234,224,.97)", inputBg:"rgba(0,0,0,.07)" };
const T = createContext(DARK);
const useT = () => useContext(T);
const H = "'Lexend',sans-serif";
const B = "'Plus Jakarta Sans',sans-serif";
const W = { logo:900, hero:900, section:700, card:700, sub:600 };

function useScreen() {
  const [w,setW] = useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{ const fn=()=>setW(window.innerWidth); window.addEventListener("resize",fn); return ()=>window.removeEventListener("resize",fn); },[]);
  return { w, isMobile:w<640, isTablet:w>=640&&w<1024, isDesktop:w>=1024 };
}

const RATE = 3.20;
const APPLIANCES=[
  {id:"lights",icon:"💡",name:"Lights",w:10,h:6,cat:"essentials"},{id:"tv",icon:"📺",name:"TV",w:120,h:4,cat:"essentials"},
  {id:"fridge",icon:"🧊",name:"Fridge",w:150,h:24,cat:"essentials"},{id:"wifi",icon:"📶",name:"WiFi Router",w:15,h:24,cat:"essentials"},
  {id:"phone",icon:"📱",name:"Phone",w:20,h:3,cat:"essentials"},{id:"laptop",icon:"💻",name:"Laptop",w:65,h:6,cat:"work"},
  {id:"desktop",icon:"🖥️",name:"Desktop PC",w:300,h:6,cat:"work"},{id:"printer",icon:"🖨️",name:"Printer",w:50,h:1,cat:"work"},
  {id:"washing",icon:"🫧",name:"Washing Machine",w:500,h:1,cat:"home"},{id:"microwave",icon:"📡",name:"Microwave",w:1000,h:.5,cat:"home"},
  {id:"kettle",icon:"☕",name:"Kettle",w:2000,h:.25,cat:"home"},{id:"geyser",icon:"🚿",name:"Geyser",w:3000,h:2,cat:"home"},
  {id:"aircon",icon:"❄️",name:"Air Con",w:1500,h:4,cat:"comfort"},{id:"pool",icon:"🏊",name:"Pool Pump",w:1100,h:6,cat:"comfort"},
  {id:"security",icon:"🔒",name:"Security",w:30,h:24,cat:"comfort"},{id:"gate",icon:"🚪",name:"Gate Motor",w:200,h:.5,cat:"comfort"},
];
const QUIZ=[
  {id:"size",q:"What size is your home?",hint:"Helps estimate your total energy needs",opts:[{label:"Studio / 1 Bed",icon:"🏠",v:"s",kwh:8},{label:"2–3 Bedroom",icon:"🏡",v:"m",kwh:18},{label:"4+ Bedroom",icon:"🏘️",v:"l",kwh:30},{label:"Small Business",icon:"🏢",v:"b",kwh:45}]},
  {id:"bill",q:"Your average monthly Eskom bill?",hint:"Roughly is fine",opts:[{label:"Under R800",icon:"💚",v:"lo",mult:.6},{label:"R800–R2 000",icon:"💛",v:"md",mult:1},{label:"R2 000–R5 000",icon:"🟠",v:"hi",mult:1.8},{label:"Over R5 000",icon:"🔴",v:"xh",mult:3}]},
  {id:"goal",q:"What matters most to you?",hint:"This shapes the whole recommendation",opts:[{label:"Survive load shedding",icon:"🔋",v:"bk",kw:3},{label:"Cut my bill",icon:"💸",v:"sv",kw:5},{label:"Mostly off-grid",icon:"🌞",v:"og",kw:8},{label:"Full independence",icon:"⚡",v:"fo",kw:12}]},
  {id:"ls",q:"How bad is load shedding?",hint:"Determines your battery backup size",opts:[{label:"Rarely (Stage 1–2)",icon:"😌",v:"mi",bf:1},{label:"Often (Stage 3–4)",icon:"😤",v:"mo",bf:1.5},{label:"Daily (Stage 5–6)",icon:"😡",v:"sv",bf:2},{label:"Farm / Rural",icon:"🌾",v:"ru",bf:2.5}]},
];
const INSTALLERS=[
  {id:1,name:"SunPower SA",city:"Johannesburg",prov:"Gauteng",rating:4.9,rev:312,sessa:true,jobs:847,yrs:12,badge:"Top Rated",resp:"2 hrs",spec:"Residential",brands:["Sunsynk","Victron"],price:"R80k–R200k",verified:true,about:"12 years installing solar across Gauteng. Specialise in hybrid systems for load shedding resilience. All installations include 5-year workmanship warranty.",website:"sunpowersa.co.za",finance:true,photos:["🏠","🔋","⚡"]},
  {id:2,name:"Cape Solar Pro",city:"Cape Town",prov:"Western Cape",rating:4.8,rev:198,sessa:true,jobs:523,yrs:9,badge:"Most Popular",resp:"3 hrs",spec:"Commercial & Residential",brands:["Deye","Sunsynk"],price:"R60k–R350k",verified:true,about:"Cape Town's leading solar installer for homes and businesses. Over 500 completed installations across the Western Cape.",website:"capesolar.co.za",finance:true,photos:["🏢","☀️","🔌"]},
  {id:3,name:"KZN Solar Solutions",city:"Durban",prov:"KwaZulu-Natal",rating:4.7,rev:143,sessa:true,jobs:389,yrs:7,badge:null,resp:"4 hrs",spec:"Off-grid",brands:["Victron","Pylontech"],price:"R70k–R250k",verified:true,about:"KZN specialists in off-grid and hybrid systems. Serving coastal and inland properties.",website:"kznsolar.co.za",finance:false,photos:["🌊","🔋","🏡"]},
  {id:4,name:"Pretoria Solar Works",city:"Pretoria",prov:"Gauteng",rating:4.6,rev:89,sessa:false,jobs:201,yrs:5,badge:"Fast Response",resp:"Same day",spec:"Residential",brands:["Growatt","Deye"],price:"R50k–R150k",verified:true,about:"Fast-response residential installer based in Pretoria. Same-day site assessments available.",website:"pretoriasolar.co.za",finance:true,photos:["🏘️","⚙️","💡"]},
  {id:5,name:"Green Energy EC",city:"Port Elizabeth",prov:"Eastern Cape",rating:4.5,rev:67,sessa:true,jobs:156,yrs:6,badge:null,resp:"5 hrs",spec:"Agricultural",brands:["Victron","Sunsynk"],price:"R90k–R400k",verified:false,about:"Agricultural solar specialists serving farms across the Eastern Cape.",website:"greenenergy-ec.co.za",finance:false,photos:["🌾","🚜","☀️"]},
  {id:6,name:"Solar Hub BFN",city:"Bloemfontein",prov:"Free State",rating:4.4,rev:44,sessa:true,jobs:98,yrs:4,badge:null,resp:"6 hrs",spec:"Residential",brands:["Deye","Growatt"],price:"R45k–R130k",verified:true,about:"Free State's most affordable verified installer. Budget-conscious solutions.",website:"solarhub-bfn.co.za",finance:true,photos:["🏠","💰","🔋"]},
  {id:7,name:"Mpumalanga Solar",city:"Nelspruit",prov:"Mpumalanga",rating:4.6,rev:58,sessa:false,jobs:134,yrs:5,badge:null,resp:"4 hrs",spec:"Commercial",brands:["Sunsynk"],price:"R100k–R300k",verified:true,about:"Commercial solar solutions across Mpumalanga and Limpopo.",website:"mpusolar.co.za",finance:false,photos:["🏪","⚡","🌞"]},
  {id:8,name:"Northern Cape Solar",city:"Kimberley",prov:"Northern Cape",rating:4.8,rev:31,sessa:true,jobs:76,yrs:8,badge:"High PSH Zone",resp:"3 hrs",spec:"Off-grid & Agricultural",brands:["Victron","Pylontech"],price:"R80k–R500k",verified:true,about:"Operating in SA's highest solar irradiance zone. Off-grid experts for farms and remote properties.",website:"ncapesolar.co.za",finance:false,photos:["🌵","🔆","🏚️"]},
];
const PROVS=["All","Gauteng","Western Cape","KwaZulu-Natal","Eastern Cape","Free State","Mpumalanga","Northern Cape"];
const SPECS=["All","Residential","Commercial","Off-grid","Agricultural","Commercial & Residential","Off-grid & Agricultural"];
const BRANDS=["All","Sunsynk","Victron","Deye","Growatt","Pylontech"];
const TECHS=[
  {id:1,name:"FixSolar SA",prov:"Gauteng",city:"Johannesburg",spec:"Inverter Repair",rating:4.9,rev:203,price:"R450/hr",emergency:true,brands:["Victron","Sunsynk","Deye"],yrs:8,about:"Inverter repair specialists with same-day callouts across Gauteng. All major brands serviced.",website:"fixsolar.co.za",photos:["🔧","⚡","🛠️"]},
  {id:2,name:"Panel Clean Pro",prov:"Western Cape",city:"Cape Town",spec:"Panel Cleaning",rating:4.8,rev:156,price:"R85/panel",emergency:false,brands:["All brands"],yrs:5,about:"Professional panel cleaning using deionised water systems. Proven to restore 15–25% lost efficiency.",website:"panelclean.co.za",photos:["🧽","☀️","✨"]},
  {id:3,name:"Battery Doctors",prov:"Gauteng",city:"Pretoria",spec:"Battery Replacement",rating:4.7,rev:98,price:"From R1 200",emergency:true,brands:["Pylontech","BSL","Freedom Won"],yrs:6,about:"Battery health diagnostics and replacement across Gauteng. Full BMS configuration included.",website:"batterydoctors.co.za",photos:["🔋","🩺","⚡"]},
  {id:4,name:"Solar Doctor KZN",prov:"KwaZulu-Natal",city:"Durban",spec:"Full System Service",rating:4.8,rev:87,price:"R1 800",emergency:false,brands:["All brands"],yrs:7,about:"Comprehensive annual service packages for all system types. Includes panel inspection, inverter check, battery test and full report.",website:"solardoctor-kzn.co.za",photos:["🩺","📋","🔌"]},
];
const ERRORS={"F01":{brand:"Sunsynk",title:"Grid voltage too high",sev:"warning",diy:true,fix:"Grid voltage above safe range — usually Eskom. Resolves itself. If it persists over 2 hours, contact your installer.",specs:["Inverter Repair"]},"F02":{brand:"Sunsynk",title:"Grid voltage too low",sev:"warning",diy:true,fix:"Grid voltage dropping below safe threshold. Common during load shedding transitions.",specs:["Inverter Repair"]},"F32":{brand:"Sunsynk",title:"Battery over-temperature",sev:"critical",diy:false,fix:"Battery overheating. Ensure ventilation immediately. Do NOT continue using — contact technician urgently.",specs:["Battery Replacement","Full System Service"]},"E001":{brand:"Victron",title:"Low battery shutdown",sev:"warning",diy:true,fix:"Battery depleted to minimum safe level. Will resume charging once power is available.",specs:["Battery Replacement"]},"E002":{brand:"Victron",title:"Overload — too much drawn",sev:"warning",diy:true,fix:"Drawing more power than inverter can handle. Switch off heavy appliances and restart.",specs:["Inverter Repair"]},"E003":{brand:"Victron",title:"Inverter overheating",sev:"critical",diy:false,fix:"Switch off immediately. Ensure 20cm clearance on all sides. Do not restart until cool.",specs:["Inverter Repair","Full System Service"]},"W001":{brand:"Deye",title:"PV input voltage high",sev:"info",diy:true,fix:"Panel voltage slightly above optimal. Usually resolves as panels cool. Monitor for 24 hours.",specs:["Full System Service"]},"W003":{brand:"Deye",title:"Grid frequency out of range",sev:"warning",diy:true,fix:"Eskom frequency unstable. Normal during load shedding transitions.",specs:["Inverter Repair"]},"G01":{brand:"Growatt",title:"No grid connection detected",sev:"info",diy:true,fix:"Check your mains breaker first. If mains is on and not load shedding, contact your installer.",specs:["Inverter Repair"]},"G05":{brand:"Growatt",title:"Insulation resistance fault",sev:"critical",diy:false,fix:"Serious fault. Switch off at DC isolator immediately. Call a qualified electrician now.",specs:["Full System Service","Inverter Repair"]}};
const HEALTH_QS=[{id:"age",q:"How old is your solar system?",opts:["Under 1 year","1–3 years","3–5 years","5+ years"]},{id:"perf",q:"Is your system performing as expected?",opts:["Yes, performing well","Slightly less than before","Much worse than before","Not sure"]},{id:"snd",q:"Any unusual sounds from your inverter?",opts:["No unusual sounds","Occasional clicking","Constant humming/buzzing","Loud unusual noise"]},{id:"err",q:"Any error codes or warning lights?",opts:["No errors","Occasional warnings","Regular error codes","System offline"]},{id:"cln",q:"When were your panels last cleaned?",opts:["Within 3 months","3–6 months ago","Over 6 months ago","Never cleaned"]},{id:"svc",q:"Has your system had a professional service?",opts:["Within the year","1–2 years ago","Never been serviced","Not sure"]}];
const ARTICLES=[
  {id:1,tag:"Guide",hot:true,min:"7",views:"12.4k",title:"How much does a 5kW solar system cost in SA in 2026?",intro:"Solar prices have dropped. Here's exactly what a complete 5kW system costs installed — and what drives the price.",body:[{h:"What's included?",p:"When an installer quotes a '5kW system' they mean the inverter size. A complete system includes inverter, panels, battery, mounting, cabling and labour."},{h:"Prices in 2026",p:"A 5kW hybrid system with 10kWh lithium battery typically costs R85,000–R140,000 fully installed. Gauteng tends to be cheaper than Cape Town due to higher competition."},{h:"The tax rebate most miss",p:"SARS allows 25% of solar panel cost as a rebate — capped at R15,000. Claim via your ITR12 on eFiling."},{h:"Bottom line",p:"Budget R90,000–R120,000 for a quality system. Payback in 4–7 years. After that it's free electricity."}],related:[2,3,6]},
  {id:2,tag:"Comparison",hot:true,min:"9",views:"8.9k",title:"Sunsynk vs Deye vs Victron — which inverter is best for SA?",intro:"Three brands dominate the SA inverter market. An honest comparison — no sponsorships.",body:[{h:"Sunsynk — the SA favourite",p:"South African-designed, handles Eskom's unstable grid well. R12,000–R22,000. Best for typical SA suburban home."},{h:"Deye — the value king",p:"Best spec-per-rand. Solid reliability. R8,000–R16,000. Best for budget-conscious buyers."},{h:"Victron — the premium choice",p:"Dutch-engineered gold standard. Best monitoring. R18,000–R45,000. Best for off-grid or premium installs."},{h:"Verdict",p:"For most SA homeowners: Sunsynk. Budget: Deye. Off-grid: Victron. Avoid cheap generic brands."}],related:[1,3,5]},
  {id:3,tag:"Tax",hot:false,min:"5",views:"6.2k",title:"How to claim your solar tax rebate from SARS — step by step",intro:"Most SA homeowners don't claim this. Here's exactly how to get up to R15,000 back.",body:[{h:"What qualifies?",p:"Only new and unused solar PV panels. Batteries, inverters, mounting and labour do not qualify."},{h:"How much?",p:"25% of panel cost, capped at R15,000. This is a rebate against your tax liability."},{h:"Documents needed",p:"Original invoice showing panel brand, model, wattage and cost separately. Certificate of compliance. Proof of payment."},{h:"How to claim",p:"On your ITR12 eFiling return, find Solar Energy Tax Credit. Enter the qualifying panel cost. SARS calculates 25% automatically."}],related:[1,4,6]},
  {id:4,tag:"Maintenance",hot:false,min:"6",views:"4.8k",title:"Is your solar system actually working properly? 7 signs it isn't",intro:"Many SA solar systems quietly underperform for months. Here are the warning signs.",body:[{h:"Backup doesn't last as long",p:"Battery used to last 4 hours, now 2? Capacity has degraded or charge settings are wrong."},{h:"Still getting high Eskom bills",p:"If your bill hasn't dropped, system may be undersized, panels shaded, or inverter settings wrong."},{h:"Panels not cleaned in 6+ months",p:"Dirty panels lose up to 25% efficiency. R85–R150 per panel every 3–6 months is the best maintenance you can do."},{h:"Ignoring error codes",p:"Some sort themselves out. Others are early warnings. Use the Error Code Translator in the Servicing tab."}],related:[1,2,3]},
  {id:5,tag:"Guide",hot:false,min:"8",views:"3.9k",title:"Off-grid vs grid-tied solar in South Africa — the honest truth",intro:"The dream of zero electricity bill is real — but not for everyone.",body:[{h:"Grid-tied: cheapest, useless in load shedding",p:"No battery, no backup. System switches off during load shedding."},{h:"Hybrid: the SA sweet spot",p:"Grid plus battery. Handles load shedding, reduces bill. What 95% of SA residential installations should be."},{h:"Off-grid: freedom, but expensive",p:"Needs 3× the battery capacity of hybrid. Makes sense for farms — not most SA suburbs."},{h:"Recommendation",p:"For urban SA: go hybrid. Size battery for 2× your load shedding hours with 20% buffer."}],related:[1,2,6]},
  {id:6,tag:"Comparison",hot:true,min:"10",views:"7.1k",title:"Best solar panels available in South Africa — ranked 2026",intro:"Not all solar panels are equal. The top panels available through SA installers right now.",body:[{h:"What to look for",p:"Efficiency %, power output (Wp), annual degradation (aim under 0.5%/year), and product warranty (25 years standard)."},{h:"Tier 1: JA Solar & Longi",p:"Bloomberg Tier 1 bankable panels. Dominate SA installations. Efficiency 21–22.5%."},{h:"Tier 1: Canadian Solar",p:"Strong warranty support, 20.5–21.5% efficiency, available through most SA distributors."},{h:"What to avoid",p:"Generic unbranded panels. No local warranty means a fault in year 5 is entirely your problem."}],related:[1,2,5]},
  {id:7,tag:"News",hot:true,min:"5",views:"3.1k",title:"Sodium-ion batteries are coming to SA — and they could change everything",intro:"A new battery technology is making its way to South Africa. Cheaper than lithium, no cobalt, doesn't catch fire.",coverImg:"https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",photos:[{url:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",caption:"Sodium-ion cell construction differs fundamentally from lithium"},{url:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",caption:"Manufacturing scale-up is driving costs down rapidly"}],body:[{h:"What is sodium-ion?",p:"Sodium-ion batteries work on the same principle as lithium-ion. The key difference: sodium instead of lithium. Sodium is the 6th most abundant element on Earth."},{h:"Why it matters for South Africa",p:"SA's solar market has boomed since 2022. Demand for batteries has pushed prices up. Sodium-ion could break this bottleneck — manufactured anywhere, without rare minerals."},{h:"The specs that matter",p:"Current Na-ion cells hit 140–160 Wh/kg — roughly 70–80% of entry-level LFP lithium. Safer chemistry, longer cycle life, projected costs 20–30% below lithium by 2027."},{h:"Who's bringing it to market",p:"CATL announced mass production of Na-ion cells in 2023. BYD has a parallel programme. Both supply Deye and Sunsynk. First Na-ion home storage products expected in SA by late 2026."},{h:"Should you wait?",p:"No. If you need solar now, install lithium LFP. Na-ion is 12–18 months away from SA shelves at competitive prices."}],related:[1,2,6]},
  {id:8,tag:"Review",hot:false,min:"11",views:"2.4k",title:"Pylontech US3000C review — is it still the best home battery for SA in 2026?",intro:"The Pylontech US3000C has been SA's most popular home battery for three years. We tested one in a real Johannesburg household for 60 days.",coverImg:"https://images.unsplash.com/photo-1620714223084-8fcacc2dbe6d?w=800&q=80",photos:[{url:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",caption:"The US3000C rack-mount design makes installation clean and expandable"},{url:"https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",caption:"BMS data via the Pylontech app during our 60-day test period"}],youtubeId:"dQw4w9WgXcQ",youtubeTitle:"Pylontech US3000C — Full Installation & 60-Day Performance Review",affiliate:{url:"https://example.co.za/pylontech-us3000c",label:"Check current price at SolarAdvice →",disclosure:"SolarIQ earns a small commission if you purchase through this link. This does not affect our review."},body:[{h:"Specs at a glance",p:"3.5kWh usable per unit. 48V nominal. LFP chemistry. 6,000 cycle life. Max 74A charge/discharge. CAN/RS485 comms. Stackable to 8 units."},{h:"Installation experience",p:"Pairing with a Sunsynk 5kW hybrid took about 40 minutes. CAN communication detected the battery automatically."},{h:"Real-world performance — 60 days",p:"Test home: 3-bedroom in Northcliff, Johannesburg. The battery handled a 2-hour Stage 4 slot comfortably running lights, WiFi, TV and fridge."},{h:"What we liked",p:"Build quality is exceptional. BMS communication is rock solid. After 200 charge cycles, capacity showed zero measurable degradation."},{h:"What could be better",p:"3.5kWh per unit means you need two for most SA households. The newer US5000 offers better value per kWh."},{h:"Verdict",p:"Still one of the safest bets in the SA market. Consistent, local support, bulletproof BMS. If your installer quotes US3000C — don't hesitate."}],rating:{overall:4.4,value:4.0,build:5.0,software:3.5,support:4.5},related:[1,2,6]},
];

function useCount(x,ms=1300){const[v,setV]=useState(0);useEffect(()=>{let s=null;const f=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/ms,1);setV(Math.floor((1-Math.pow(1-p,3))*x));if(p<1)requestAnimationFrame(f);};requestAnimationFrame(f);},[x]);return v;}
function makeResult(d,k,bf=1.5){const invKva=Math.max(3,Math.ceil(k*1.25));const mo=Math.round(d*30*RATE),cost=Math.round(k*18000),save=Math.round(mo*12*.75);return{systemKw:k,battKwh:Math.round(k*bf*10)/10,invKva,cost,annSave:save,mo,payback:(cost/save).toFixed(1),dailyKwh:Math.round(d*10)/10,panels:Math.ceil(k/.55)};}
function PBtn({children,onClick,disabled,sm,style={}}){const t=useT();return <button onClick={onClick} disabled={disabled} style={{background:disabled?"rgba(128,128,128,.15)":`linear-gradient(135deg,${t.accent},${t.accent2})`,color:disabled?"#666":t.dark?"#000":"#fff",border:"none",borderRadius:30,padding:sm?"10px 20px":"13px 28px",fontSize:sm?13:14,fontWeight:800,cursor:disabled?"not-allowed":"pointer",fontFamily:B,transition:"all .2s",...style}}>{children}</button>;}
function Lbl({children,center}){const t=useT();return <div style={{fontSize:11,color:t.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:2.5,marginBottom:8,fontFamily:B,textAlign:center?"center":"left"}}>{children}</div>;}
function BackBtn({onClick}){const t=useT();return <button onClick={onClick} style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",gap:6,fontWeight:600,marginBottom:20,padding:0,fontFamily:B}}>← Back</button>;}
function Tag({children,color}){const t=useT();const c=color||t.accent;return <span style={{fontSize:10,fontWeight:700,background:`${c}18`,color:c,padding:"3px 9px",borderRadius:20,letterSpacing:.5}}>{children}</span>;}
function Stars({n}){return <span style={{color:"#f0c040",fontSize:12}}>{"★".repeat(Math.floor(n))}<span style={{color:"#555"}}> {n}</span></span>;}

// ═══════════════════════════════════════════════════
// SOLAR ROOF MAP — The v7 hero feature
// ═══════════════════════════════════════════════════

const SA_CITIES = [
  {name:"Sandton",lat:-26.1079,lng:28.0567},{name:"Cape Town",lat:-33.9249,lng:18.4241},
  {name:"Durban",lat:-29.8587,lng:31.0218},{name:"Pretoria",lat:-25.7461,lng:28.1881},
  {name:"Bloemfontein",lat:-29.0852,lng:26.1596},{name:"Port Elizabeth",lat:-33.9608,lng:25.6022},
];

const PSH_BY_CITY = {
  "Sandton":5.2,"Cape Town":5.8,"Durban":4.8,"Pretoria":5.4,
  "Bloemfontein":6.1,"Port Elizabeth":5.5,"default":5.0
};

function SolarRoofMap({onResult}){
  const t=useT();const sc=useScreen();
  const mapRef=useRef(null);const mapObjRef=useRef(null);
  const[query,setQuery]=useState("");
  const[status,setStatus]=useState("idle"); // idle | loading | success | error | notfound
  const[loadStep,setLoadStep]=useState(0);
  const[solarData,setSolarData]=useState(null);
  const[coords,setCoords]=useState(null);
  const[detectedCity,setDetectedCity]=useState("default");
  const[mapLoaded,setMapLoaded]=useState(false);

  const STEPS=["📍 Locating address...","🛰️ Loading satellite view...","☀️ Measuring roof area...","⚡ Calculating solar potential...","📊 Building your report..."];

  // Load Google Maps script
  useEffect(()=>{
    if(window.google){setMapLoaded(true);return;}
    const s=document.createElement("script");
    s.src=`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
    s.async=true;s.defer=true;
    s.onload=()=>setMapLoaded(true);
    document.head.appendChild(s);
  },[]);

  // Init map when loaded and coords available
  useEffect(()=>{
    if(!mapLoaded||!coords||!mapRef.current)return;
    const map=new window.google.maps.Map(mapRef.current,{
      center:coords,zoom:19,mapTypeId:"satellite",tilt:0,
      disableDefaultUI:true,gestureHandling:"none",
      styles:[{featureType:"all",elementType:"labels",stylers:[{visibility:"off"}]}]
    });
    mapObjRef.current=map;
  },[mapLoaded,coords]);

  const geocodeAndFetch=async(address)=>{
    setStatus("loading");setLoadStep(0);setSolarData(null);setCoords(null);
    try{
      // Step 1 - geocode
      const geoRes=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address+", South Africa")}&key=${GOOGLE_API_KEY}`);
      const geoData=await geoRes.json();
      if(!geoData.results||geoData.results.length===0){setStatus("notfound");return;}
      const loc=geoData.results[0].geometry.location;
      const formatted=geoData.results[0].formatted_address;
      setCoords(loc);setLoadStep(1);

      // Detect city for PSH
      const cityMatch=SA_CITIES.find(c=>formatted.toLowerCase().includes(c.name.toLowerCase()));
      const city=cityMatch?cityMatch.name:"default";
      setDetectedCity(city);
      setLoadStep(2);

      // Step 2 - Solar API
      await new Promise(r=>setTimeout(r,600));setLoadStep(3);
      let solar=null;
      try{
        const solarRes=await fetch(`https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${loc.lat}&location.longitude=${loc.lng}&requiredQuality=LOW&key=${GOOGLE_API_KEY}`);
        if(solarRes.ok)solar=await solarRes.json();
      }catch(e){solar=null;}

      await new Promise(r=>setTimeout(r,500));setLoadStep(4);
      await new Promise(r=>setTimeout(r,400));

      const psh=PSH_BY_CITY[city]||5.0;

      if(solar&&solar.solarPotential){
        const sp=solar.solarPotential;
        const roofArea=Math.round(sp.wholeRoofStats?.areaMeters2||sp.maxArrayAreaMeters2||80);
        const maxPanels=sp.maxArrayPanelsCount||Math.floor(roofArea/1.7);
        const usablePanels=Math.min(maxPanels,Math.floor(roofArea*.55/1.7));
        const systemKw=Math.round(usablePanels*.55*10)/10;
        const annualKwh=Math.round(sp.maxSunshineHoursPerYear?usablePanels*.55*sp.maxSunshineHoursPerYear*.8:systemKw*psh*365*.8);
        const dailyKwh=Math.round(annualKwh/365*10)/10;
        const mo=Math.round(dailyKwh*30*RATE);
        const cost=Math.round(systemKw*18000);
        const annSave=Math.round(mo*12*.75);
        const suitability=sp.maxSunshineHoursPerYear>1600?"Excellent":sp.maxSunshineHoursPerYear>1400?"Very Good":sp.maxSunshineHoursPerYear>1200?"Good":"Moderate";
        setSolarData({source:"api",address:formatted,roofArea,panels:usablePanels,systemKw,annualKwh,dailyKwh,mo,cost,annSave,payback:(cost/annSave).toFixed(1),suitability,psh,sunshine:Math.round(sp.maxSunshineHoursPerYear||psh*365),city,panelSegments:sp.solarPanelConfigs?.[0]?.panelLayoutUrl||null});
      }else{
        // Fallback — use our own calculation
        const roofArea=80,usablePanels=16,systemKw=8.8;
        const annualKwh=Math.round(systemKw*psh*365*.8);
        const dailyKwh=Math.round(annualKwh/365*10)/10;
        const mo=Math.round(dailyKwh*30*RATE);
        const cost=Math.round(systemKw*18000);
        const annSave=Math.round(mo*12*.75);
        setSolarData({source:"estimate",address:formatted,roofArea,panels:usablePanels,systemKw,annualKwh,dailyKwh,mo,cost,annSave,payback:(cost/annSave).toFixed(1),suitability:"Good",psh,sunshine:Math.round(psh*365),city});
      }
      setStatus("success");
    }catch(err){setStatus("error");}
  };

  const handleSearch=()=>{if(query.trim().length>3)geocodeAndFetch(query.trim());};

  const sev=c=>c==="Excellent"?"#4ade80":c==="Very Good"?t.accent:c==="Good"?"#60a5fa":"#f87171";

  return(
    <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.07),rgba(${t.rgb},.02))`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:20,overflow:"hidden",marginBottom:28}}>
      {/* Header */}
      <div style={{padding:sc.isMobile?"16px 18px":"20px 28px",borderBottom:`1px solid rgba(${t.rgb},.12)`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
          <div style={{background:`linear-gradient(135deg,${t.accent},${t.accent2})`,borderRadius:8,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🛰️</div>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontFamily:H,fontSize:sc.isMobile?18:22,fontWeight:W.hero,color:t.text}}>Solar Roof Analysis</span>
              <span style={{fontSize:9,background:`rgba(${t.rgb},.15)`,color:t.accent,padding:"2px 8px",borderRadius:8,fontWeight:700,letterSpacing:1}}>NEW</span>
            </div>
            <div style={{fontSize:12,color:t.sub}}>Enter your address — we analyse your actual roof using satellite data</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div style={{padding:sc.isMobile?"16px 18px":"20px 28px",borderBottom:`1px solid ${t.border}`}}>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <div style={{flex:1,position:"relative"}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,pointerEvents:"none"}}>📍</span>
            <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSearch()}
              placeholder="Enter your home address..."
              style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 12px 12px 36px",color:t.text,fontSize:14,outline:"none",fontFamily:B,boxSizing:"border-box"}}/>
          </div>
          <PBtn sm onClick={handleSearch} disabled={query.trim().length<4||status==="loading"} style={{borderRadius:10,padding:"12px 20px",whiteSpace:"nowrap",width:"auto"}}>
            {status==="loading"?"Analysing...":"Analyse Roof"}
          </PBtn>
        </div>
        {/* City chips */}
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {SA_CITIES.map(c=>(
            <button key={c.name} onClick={()=>{setQuery(c.name);geocodeAndFetch(c.name);}}
              style={{background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:20,padding:"4px 12px",cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:B,transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.4)`;e.currentTarget.style.color=t.accent;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.color=t.sub;}}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {status==="loading"&&(
        <div style={{padding:"32px 28px",textAlign:"center"}}>
          <div style={{width:56,height:56,border:`3px solid rgba(${t.rgb},.15)`,borderTop:`3px solid ${t.accent}`,borderRadius:"50%",animation:"spin2 1s linear infinite",margin:"0 auto 20px"}}/>
          <div style={{fontFamily:H,fontSize:16,fontWeight:W.section,color:t.text,marginBottom:6}}>{STEPS[loadStep]}</div>
          <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:16}}>
            {STEPS.map((_,i)=><div key={i} style={{width:i<=loadStep?20:6,height:4,borderRadius:2,background:i<=loadStep?t.accent:`rgba(${t.rgb},.15)`,transition:"all .4s"}}/>)}
          </div>
        </div>
      )}

      {/* Error / Not found */}
      {(status==="error"||status==="notfound")&&(
        <div style={{padding:"24px 28px",textAlign:"center"}}>
          <div style={{fontSize:32,marginBottom:8}}>{status==="notfound"?"🔍":"⚠️"}</div>
          <div style={{fontFamily:H,fontSize:16,fontWeight:W.section,color:t.text,marginBottom:4}}>{status==="notfound"?"Address not found":"Something went wrong"}</div>
          <div style={{fontSize:13,color:t.sub,marginBottom:12}}>{status==="notfound"?"Try adding your suburb or city — e.g. '14 Oak Street, Sandton'":"Please try again or use one of our calculators below"}</div>
          <button onClick={()=>setStatus("idle")} style={{background:`rgba(${t.rgb},.1)`,border:`1px solid rgba(${t.rgb},.3)`,color:t.accent,borderRadius:10,padding:"8px 18px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B}}>Try Again</button>
        </div>
      )}

      {/* Success */}
      {status==="success"&&solarData&&(
        <div>
          {/* Map */}
          {coords&&(
            <div style={{position:"relative",height:sc.isMobile?200:280,overflow:"hidden"}}>
              <div ref={mapRef} style={{width:"100%",height:"100%"}}/>
              {/* Overlay gradient */}
              <div style={{position:"absolute",bottom:0,left:0,right:0,height:60,background:`linear-gradient(transparent,${t.dark?"#07090d":"#edeae0"})`,pointerEvents:"none"}}/>
              {/* Source badge */}
              <div style={{position:"absolute",top:10,right:10,background:"rgba(0,0,0,.7)",color:"#fff",fontSize:9,padding:"3px 8px",borderRadius:6,fontWeight:700,letterSpacing:.5}}>
                {solarData.source==="api"?"🛰️ SOLAR API":"⚡ SOLARIQ ESTIMATE"}
              </div>
              {/* Suitability badge */}
              <div style={{position:"absolute",top:10,left:10,background:`${sev(solarData.suitability)}22`,border:`1px solid ${sev(solarData.suitability)}44`,color:sev(solarData.suitability),fontSize:11,padding:"4px 10px",borderRadius:8,fontWeight:700}}>
                {solarData.suitability} Solar Potential
              </div>
            </div>
          )}

          {/* Results */}
          <div style={{padding:sc.isMobile?"16px 18px":"20px 28px"}}>
            <div style={{fontSize:12,color:t.sub,marginBottom:14,fontFamily:B}}>
              📍 {solarData.address}
              {solarData.source==="estimate"&&<span style={{color:`rgba(${t.rgb},.6)`,marginLeft:6}}>· Estimated analysis (satellite data unavailable for this address)</span>}
            </div>

            {/* Key metrics */}
            <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"repeat(2,1fr)":"repeat(4,1fr)",gap:10,marginBottom:16}}>
              {[["Roof Area",`~${solarData.roofArea}m²`,"📐"],["Solar Panels",`${solarData.panels} panels`,"☀️"],["System Size",`${solarData.systemKw}kW`,"⚡"],["Annual Sun",`${solarData.sunshine}hrs`,"🌤️"]].map(([l,v,icon])=>(
                <div key={l} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:12,padding:"12px 14px",textAlign:"center"}}>
                  <div style={{fontSize:18,marginBottom:4}}>{icon}</div>
                  <div style={{fontFamily:H,fontSize:sc.isMobile?15:18,fontWeight:W.section,color:t.accent,marginBottom:2}}>{v}</div>
                  <div style={{fontSize:10,color:t.sub}}>{l}</div>
                </div>
              ))}
            </div>

            {/* Financial */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:16}}>
              {[["Monthly Savings",`R${solarData.mo.toLocaleString()}`,"#4ade80"],["Annual Savings",`R${solarData.annSave.toLocaleString()}`,"#4ade80"],["System Cost",`R${solarData.cost.toLocaleString()}`,t.accent],["Payback Period",`${solarData.payback} years`,t.accent]].map(([l,v,c])=>(
                <div key={l} style={{background:t.bgCard,border:`1px solid ${c}22`,borderRadius:12,padding:"13px 14px"}}>
                  <div style={{fontSize:9,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:4}}>{l}</div>
                  <div style={{fontFamily:H,fontSize:sc.isMobile?17:20,fontWeight:W.section,color:c}}>{v}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
              <PBtn onClick={()=>onResult(makeResult(solarData.dailyKwh,solarData.systemKw))} style={{flex:1,minWidth:160,borderRadius:12}}>
                Get Full System Report →
              </PBtn>
              <button onClick={()=>setStatus("idle")} style={{background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:12,padding:"13px 18px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:B}}>
                🔄 New Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Idle state hint */}
      {status==="idle"&&(
        <div style={{padding:"20px 28px",display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          {[["🛰️","Real satellite data"],["☀️","Actual roof analysis"],["⚡","Instant results"],["🇿🇦","Built for SA"]].map(([icon,l])=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:t.sub}}>
              <span>{icon}</span><span>{l}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
          <button onClick={()=>up(k,Math.max(min,parseFloat((v[k]-step).toFixed(2))))} style={{width:34,height:34,borderRadius:8,background:`rgba(${t.rgb},.12)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.text,cursor:"pointer",fontSize:20,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,lineHeight:1,fontFamily:B}}>−</button>
          <div style={{textAlign:"center",minWidth:58,flexShrink:0}}>
            <div style={{fontFamily:"monospace",fontSize:16,fontWeight:800,color:t.accent}}>{v[k]}</div>
            <div style={{fontSize:9,color:t.sub}}>{unit}</div>
          </div>
          <button onClick={()=>up(k,Math.min(max,parseFloat((v[k]+step).toFixed(2))))} style={{width:34,height:34,borderRadius:8,background:`rgba(${t.rgb},.12)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.text,cursor:"pointer",fontSize:20,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,lineHeight:1,fontFamily:B}}>+</button>
        </div>
      </div>
    </div>
  );
  const SH=({id,icon,label})=>(
    <button onClick={()=>tog(id)} style={{width:"100%",background:"none",border:"none",display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"7px 0",marginBottom:open[id]?10:0}}>
      <span style={{fontSize:14}}>{icon}</span>
      <span style={{fontSize:10,color:t.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:2,fontFamily:B,flex:1,textAlign:"left"}}>{label}</span>
      <span style={{fontSize:14,color:t.sub,transition:"transform .25s",display:"inline-block",transform:open[id]?"rotate(90deg)":"rotate(0deg)"}}>›</span>
    </button>
  );
  const results=(
    <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.1),rgba(${t.rgb},.04))`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:16,padding:"18px"}}>
      <div style={{fontSize:10,color:t.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:14,fontFamily:B}}>📊 Live Results</div>
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
        <div style={{background:`rgba(${t.rgb},.06)`,borderRadius:9,padding:"9px 12px"}}><div style={{fontSize:10,color:t.sub,marginBottom:2}}>Annual savings</div><div style={{fontFamily:H,fontSize:18,fontWeight:W.hero,color:"#4ade80"}}>R{save.toLocaleString()}</div></div>
        <div style={{background:`rgba(${t.rgb},.06)`,borderRadius:9,padding:"9px 12px"}}><div style={{fontSize:10,color:t.sub,marginBottom:2}}>Payback</div><div style={{fontFamily:H,fontSize:18,fontWeight:W.hero,color:t.accent}}>{payback} yrs</div></div>
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
        <div style={{width:36,height:36,borderRadius:9,background:`rgba(${t.rgb},.12)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>⚙️</div>
        <div><div style={{fontFamily:H,fontSize:22,fontWeight:W.hero,color:t.text}}>Pro Calculator</div><div style={{fontSize:12,color:t.sub}}>Full technical parameters</div></div>
      </div>
      <div style={{background:`rgba(${t.rgb},.05)`,border:`1px solid rgba(${t.rgb},.15)`,borderRadius:10,padding:"9px 14px",marginBottom:16,display:"flex",gap:8,alignItems:"center"}}>
        <span>💡</span><span style={{fontSize:12,color:t.sub}}>Tap + / − to adjust. Results update live.</span>
      </div>
      <div style={{marginBottom:4}}><SH id="load" icon="⚡" label="Load & Generation"/>{open.load&&<div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr":"1fr 1fr",gap:8,marginBottom:14}}><NI k="kwh" label="Daily Consumption" desc="Total kWh/day" min={1} max={150} step={0.5} unit="kWh/day"/><NI k="psh" label="Peak Sun Hours" desc="SA avg 4.5–5.5 hrs" min={2} max={7} step={0.1} unit="hours"/><NI k="loss" label="System Losses" desc="Wiring + inverter + temp" min={5} max={40} step={1} unit="%"/><NI k="invKva" label="Inverter Size" desc="Handle peak load + 20%" min={1} max={30} step={0.5} unit="kVA"/></div>}</div>
      <div style={{marginBottom:4}}><SH id="battery" icon="🔋" label="Battery Bank"/>{open.battery&&<div style={{display:"grid",gridTemplateColumns:"1fr",gap:8,marginBottom:14}}><NI k="batAh" label="Capacity (Amp-hours)" desc="Total Ah" min={50} max={2000} step={25} unit="Ah"/><NI k="batV" label="Voltage" desc="12 / 24 / 48V" min={12} max={96} step={12} unit="V"/><NI k="dod" label="Depth of Discharge" desc="LiFePO4: 90%" min={20} max={100} step={5} unit="%"/></div>}</div>
      <div style={{marginBottom:14}}><SH id="type" icon="🔌" label="System Type"/>{open.type&&<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:4}}>{[["hybrid","Hybrid","SA sweet spot"],["gridtied","Grid-Tied","No battery"],["offgrid","Off-Grid","Full independence"]].map(([k,lbl,desc])=>(
        <div key={k} onClick={()=>up("type",k)} style={{background:v.type===k?`rgba(${t.rgb},.1)`:t.bgCard,border:`1px solid ${v.type===k?`rgba(${t.rgb},.35)`:t.border}`,borderRadius:12,padding:"12px 10px",cursor:"pointer",textAlign:"center",transition:"all .2s"}}>
          <div style={{width:14,height:14,borderRadius:3,background:v.type===k?t.accent:"transparent",border:`2px solid ${v.type===k?t.accent:t.sub}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 6px"}}>{v.type===k&&<span style={{fontSize:8,color:t.dark?"#000":"#fff",fontWeight:900}}>✓</span>}</div>
          <div style={{fontSize:13,fontWeight:W.card,color:v.type===k?t.accent:t.text,fontFamily:H}}>{lbl}</div>
          <div style={{fontSize:10,color:t.sub,marginTop:2}}>{desc}</div>
        </div>
      ))}</div>}</div>
    </div>
  );
  return sc.isDesktop?(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,alignItems:"start"}}><div>{inputs}</div><div style={{position:"sticky",top:80}}>{results}</div></div>):(<div>{inputs}{results}</div>);
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
      {/* Solar Roof Map — hero calculator */}
      <SolarRoofMap onResult={onResult}/>
      {/* Divider */}
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`rgba(${t.rgb},.08)`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:20,padding:"5px 14px",marginBottom:16}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:t.accent,display:"inline-block"}}/>
          <span style={{fontSize:11,color:t.accent,fontWeight:700,letterSpacing:1}}>OR CHOOSE A MANUAL CALCULATOR</span>
        </div>
        <h2 style={{fontFamily:H,fontSize:"clamp(22px,3.5vw,36px)",fontWeight:W.hero,color:t.text,lineHeight:1.05,marginBottom:8}}>Calculate Your Solar Setup</h2>
        <p style={{color:t.sub,fontSize:14,maxWidth:400,margin:"0 auto",lineHeight:1.7}}>Four ways to get your system size — pick the one that suits you.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"repeat(4,1fr)":"1fr 1fr",gap:12}}>
        {[{k:"simple",icon:"✨",title:"Quick & Easy",sub:"4 questions. 60 seconds.",badge:"Most Popular"},{k:"appliance",icon:"🔌",title:"By Appliances",sub:"Pick every device you own.",badge:"Most Accurate"},{k:"bill",icon:"📄",title:"From My Bill",sub:"Enter your Eskom bill.",badge:"Fastest"},{k:"engineer",icon:"⚙️",title:"Pro Calculator",sub:"Full technical inputs.",badge:"Pro"}].map(c=>(
          <div key={c.k} onClick={()=>go(()=>setMode(c.k))} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:16,padding:"22px 18px",cursor:"pointer",transition:"all .2s",position:"relative"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.4)`;e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
            <div style={{position:"absolute",top:10,right:10,fontSize:9,background:`rgba(${t.rgb},.15)`,color:t.accent,padding:"2px 7px",borderRadius:10,fontWeight:700}}>{c.badge}</div>
            <div style={{fontSize:30,marginBottom:12}}>{c.icon}</div>
            <div style={{fontFamily:H,fontSize:18,fontWeight:W.card,color:t.text,marginBottom:5}}>{c.title}</div>
            <div style={{fontSize:12,color:t.sub,lineHeight:1.5}}>{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
  if(mode==="engineer")return(<div style={{opacity:fade?0:1,transition:"opacity .2s"}}><BackBtn onClick={()=>go(()=>setMode(null))}/><ProCalc onResult={onResult}/></div>);
  if(mode==="bill")return(
    <div style={{opacity:fade?0:1,transition:"opacity .2s",animation:"fadeUp .4s ease"}}><BackBtn onClick={()=>go(()=>setMode(null))}/>
      <div style={{maxWidth:520,margin:"0 auto",textAlign:"center"}}>
        <div style={{fontSize:36,marginBottom:10}}>📄</div>
        <h3 style={{fontFamily:H,fontSize:26,fontWeight:W.section,color:t.text,marginBottom:5}}>Your Monthly Bill</h3>
        <p style={{color:t.sub,fontSize:14,marginBottom:22}}>Enter approximately what you pay Eskom per month</p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:16}}>
          <span style={{fontSize:26,color:t.accent,fontWeight:700}}>R</span>
          <input type="number" placeholder="0" value={bill} onChange={e=>setBill(e.target.value)} style={{background:"transparent",border:"none",outline:"none",fontSize:sc.isMobile?44:56,fontFamily:H,fontWeight:W.hero,color:t.text,width:200,textAlign:"center"}}/>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:20,flexWrap:"wrap"}}>
          {[500,1200,2500,4000].map(n=><button key={n} onClick={()=>setBill(String(n))} style={{background:bill==n?`rgba(${t.rgb},.15)`:t.bgCard,border:`1px solid ${bill==n?t.accent:t.border}`,color:bill==n?t.accent:t.sub,padding:"8px 16px",borderRadius:25,cursor:"pointer",fontSize:13,fontWeight:600,transition:"all .2s",fontFamily:B}}>R{n.toLocaleString()}</button>)}
        </div>
        <PBtn onClick={fromBill} disabled={!bill} style={{maxWidth:320,margin:"0 auto",display:"block"}}>Calculate My System →</PBtn>
      </div>
    </div>
  );
  if(mode==="appliance")return(
    <div style={{opacity:fade?0:1,transition:"opacity .2s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><BackBtn onClick={()=>go(()=>setMode(null))}/>{appCount>0&&<div style={{fontSize:12,color:t.accent,background:`rgba(${t.rgb},.1)`,padding:"4px 12px",borderRadius:20,fontWeight:700}}>{appCount} selected</div>}</div>
      <h3 style={{fontFamily:H,fontSize:24,fontWeight:W.section,color:t.text,marginBottom:3}}>Select Your Appliances</h3>
      <p style={{color:t.sub,fontSize:13,marginBottom:13}}>Tap each one you use regularly</p>
      <div style={{display:"flex",borderBottom:`1px solid ${t.border}`,marginBottom:16,overflowX:"auto"}}>
        {["essentials","work","home","comfort"].map(c=><button key={c} onClick={()=>setCat(c)} style={{background:"none",border:"none",borderBottom:`2px solid ${cat===c?t.accent:"transparent"}`,color:cat===c?t.accent:t.sub,padding:"7px 14px",cursor:"pointer",fontSize:13,fontWeight:600,textTransform:"capitalize",transition:"all .2s",fontFamily:B,whiteSpace:"nowrap"}}>{c}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"repeat(auto-fill,minmax(130px,1fr))":sc.isTablet?"repeat(auto-fill,minmax(120px,1fr))":"repeat(auto-fill,minmax(100px,1fr))",gap:10,marginBottom:24}}>
        {APPLIANCES.filter(a=>a.cat===cat).map(app=>{
          const active=apps[app.id]>0,hrs=apps[app.id]||0;
          return(<div key={app.id} style={{background:active?`rgba(${t.rgb},.08)`:t.bgCard,border:`1px solid ${active?`rgba(${t.rgb},.4)`:t.border}`,borderRadius:14,padding:12,textAlign:"center",transition:"all .2s",cursor:"pointer"}} onClick={active?undefined:()=>setApps({...apps,[app.id]:app.h})}>
            <div style={{fontSize:24,marginBottom:4}}>{app.icon}</div>
            <div style={{fontSize:12,fontWeight:600,color:active?t.text:t.sub,marginBottom:2,fontFamily:B}}>{app.name}</div>
            <div style={{fontSize:10,color:t.sub,opacity:.7}}>{app.w}W</div>
            {active&&<div style={{marginTop:8}}><div style={{fontSize:9,color:t.sub,marginBottom:4}}>hrs/day</div><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
              <button onClick={e=>{e.stopPropagation();setApps({...apps,[app.id]:Math.max(.25,hrs-.25)});}} style={{background:`rgba(${t.rgb},.15)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.text,width:28,height:28,borderRadius:7,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>-</button>
              <span style={{fontSize:13,fontWeight:800,color:t.accent,minWidth:24,textAlign:"center"}}>{hrs}</span>
              <button onClick={e=>{e.stopPropagation();setApps({...apps,[app.id]:Math.min(24,hrs+.25)});}} style={{background:`rgba(${t.rgb},.15)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.text,width:28,height:28,borderRadius:7,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
            </div></div>}
          </div>);
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
              <div style={{fontSize:26,marginBottom:8}}>{o.icon}</div>
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
      {[`✅ Lights, WiFi, TV & fridge through all load shedding`,`✅ Save ~R${Math.round(r.annSave/12).toLocaleString()} every month`,`✅ Pays for itself in ${r.payback} years — then free electricity`,`✅ Claim up to R15,000 back from SARS on panel costs`,`✅ Property value increases R50k–R150k`].map(txt=>(
        <div key={txt} style={{fontSize:13,color:t.sub,marginBottom:7,lineHeight:1.6}}>{txt}</div>
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
        <button style={{background:"transparent",color:t.sub,border:`1px solid ${t.border}`,borderRadius:30,padding:"12px 20px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:B,width:"100%"}}>📱 WhatsApp My Results</button>
      </div>
      <div style={{textAlign:"center",marginTop:12}}>
        <button onClick={onReset} style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:13,textDecoration:"underline",fontFamily:B}}>← Recalculate</button>
      </div>
    </div>
  );
  return(
    <div style={{animation:"fadeUp .5s ease"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:38,marginBottom:9}}>☀️</div>
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
            <button style={{background:"transparent",color:t.sub,border:`1px solid ${t.border}`,borderRadius:30,padding:"12px 20px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:B,width:"100%"}}>📱 WhatsApp My Results</button>
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

  const InstCard=({inst,i})=>(
    <div style={{background:open===inst.id?`rgba(${t.rgb},.04)`:t.bgCard,border:`1px solid ${open===inst.id?`rgba(${t.rgb},.28)`:t.border}`,borderRadius:14,padding:"16px",cursor:"pointer",transition:"all .2s",animation:`fadeUp .3s ease ${i*.04}s both`}}
      onClick={()=>setOpen(open===inst.id?null:inst.id)}
      onMouseEnter={e=>{if(open!==inst.id)e.currentTarget.style.borderColor=`rgba(${t.rgb},.2)`;}}
      onMouseLeave={e=>{if(open!==inst.id)e.currentTarget.style.borderColor=t.border;}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
        <div style={{width:42,height:42,borderRadius:10,background:`rgba(${t.rgb},.1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🏢</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3,flexWrap:"wrap"}}>
            <span style={{fontFamily:H,fontSize:15,fontWeight:W.card,color:t.text}}>{inst.name}</span>
            {inst.badge&&<Tag>{inst.badge}</Tag>}
            {inst.sessa&&<Tag color="#22c55e">✓ SESSA</Tag>}
            {inst.verified&&<Tag color="#60a5fa">✓ Verified</Tag>}
            {inst.finance&&<Tag color="#c084fc">💳 Finance</Tag>}
          </div>
          <div style={{fontSize:11,color:t.sub,marginBottom:4}}>{inst.city}, {inst.prov} · {inst.yrs} yrs</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
            <Stars n={inst.rating}/><span style={{fontSize:11,color:t.sub}}> ({inst.rev})</span>
            <span style={{fontSize:11,color:t.sub}}>⚡ {inst.resp}</span>
            <span style={{fontSize:11,color:t.sub}}>💰 {inst.price}</span>
          </div>
        </div>
        <span style={{fontSize:14,color:t.sub,transition:"transform .2s",transform:open===inst.id?"rotate(90deg)":"none",flexShrink:0,marginTop:4}}>›</span>
      </div>
      {open===inst.id&&(
        <div style={{marginTop:13,paddingTop:13,borderTop:`1px solid ${t.border}`,animation:"fadeUp .25s ease"}}>
          <p style={{fontSize:13,color:t.sub,lineHeight:1.7,marginBottom:12}}>{inst.about}</p>
          <div style={{display:"flex",gap:7,marginBottom:12,flexWrap:"wrap"}}>
            {inst.photos.map((p,i)=><div key={i} style={{width:60,height:60,background:`rgba(${t.rgb},.08)`,border:`1px solid ${t.border}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{p}</div>)}
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
            <PBtn sm style={{flex:1,minWidth:100,borderRadius:9,padding:"10px"}}>Request Quote</PBtn>
            <button style={{background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.28)",color:"#25d366",borderRadius:9,padding:"10px 14px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B}}>📱 WhatsApp</button>
            <button style={{background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:9,padding:"10px 14px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B}}>🌐 Website</button>
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
          <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",fontSize:13,color:t.sub,pointerEvents:"none"}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or city..." style={{...sel,paddingLeft:32,borderRadius:10,padding:"10px 12px 10px 32px"}}/>
        </div>
        <button onClick={()=>setShowF(o=>!o)} style={{background:showF||ac>0?`rgba(${t.rgb},.12)`:t.bgCard,border:`1px solid ${showF||ac>0?`rgba(${t.rgb},.4)`:t.border}`,color:showF||ac>0?t.accent:t.sub,borderRadius:10,padding:"10px 14px",cursor:"pointer",fontSize:13,fontWeight:600,display:"flex",alignItems:"center",gap:6,fontFamily:B}}>
          ⚙️ Filters {ac>0&&<span style={{background:t.accent,color:t.dark?"#000":"#fff",borderRadius:"50%",width:17,height:17,fontSize:10,display:"inline-flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>{ac}</span>}
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
          <div style={{fontSize:28,marginBottom:8}}>🔍</div>
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
          <div style={{fontSize:26}}>📋</div>
          <div style={{flex:1}}><div style={{fontFamily:H,fontSize:15,fontWeight:W.card,color:t.text,marginBottom:2}}>Installer? Generate PDF Proposals</div><div style={{fontSize:13,color:t.sub}}>Branded quotes from SolarIQ results. <span style={{color:t.accent,fontWeight:700}}>Coming soon.</span></div></div>
          <button style={{background:t.bgCard,border:`1px solid rgba(${t.rgb},.3)`,color:t.accent,borderRadius:10,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B}}>Join Waitlist →</button>
        </div>
      </div>
      <div style={{marginTop:9,background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 16px",textAlign:"center"}}>
        <span style={{fontSize:13,color:t.sub}}>Are you a solar installer? </span>
        <button style={{background:"none",border:"none",color:t.accent,cursor:"pointer",fontSize:13,fontWeight:700,fontFamily:B}}>List your business free →</button>
      </div>
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
        <div style={{width:42,height:42,borderRadius:10,background:`rgba(${t.rgb},.1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🔧</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2,flexWrap:"wrap"}}>
            <span style={{fontFamily:H,fontSize:15,fontWeight:W.card,color:t.text}}>{tech.name}</span>
            {tech.emergency&&<span style={{fontSize:9,background:"rgba(239,68,68,.15)",color:"#f87171",padding:"2px 7px",borderRadius:8,fontWeight:700}}>🚨 24/7</span>}
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
        {tech.photos.map((p,i)=><div key={i} style={{width:48,height:48,background:`rgba(${t.rgb},.08)`,border:`1px solid ${t.border}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{p}</div>)}
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <PBtn sm style={{flex:1,minWidth:100,borderRadius:9,padding:"9px"}}>Book Service</PBtn>
        <button style={{background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.25)",color:"#25d366",borderRadius:9,padding:"9px 13px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:B}}>📱 WhatsApp</button>
        <button style={{background:t.bgCard,border:`1px solid ${t.border}`,color:t.sub,borderRadius:9,padding:"9px 13px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:B}}>🌐 Website</button>
      </div>
    </div>
  );

  if(page==="home")return(
    <div>
      <Lbl>After-Sales Care</Lbl>
      <h2 style={{fontFamily:H,fontSize:sc.isMobile?22:28,fontWeight:W.section,color:t.text,marginBottom:5}}>Solar Servicing & Repair</h2>
      <p style={{color:t.sub,fontSize:14,marginBottom:20}}>Keep your system at peak performance — for the lifetime of your investment.</p>
      <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"repeat(4,1fr)":sc.isMobile?"1fr 1fr":"repeat(auto-fill,minmax(200px,1fr))",gap:12,marginBottom:16}}>
        {[{id:"health",icon:"🩺",title:"Health Check",desc:"6 questions to diagnose your system.",badge:"AI",color:"#4ade80"},{id:"error",icon:"⚠️",title:"Error Code Translator",desc:"Type any inverter code. Plain English instantly.",badge:"Instant",color:t.accent},{id:"techs",icon:"🔧",title:"Find a Technician",desc:"Verified repair specialists near you.",badge:null,color:"#60a5fa"},{id:"reminder",icon:"📅",title:"Service Reminders",desc:"WhatsApp reminders when service is due.",badge:"Free",color:"#c084fc"}].map((c,i)=>(
          <div key={c.id} onClick={()=>setPage(c.id)} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:16,padding:sc.isDesktop?"22px":"16px 14px",cursor:"pointer",transition:"all .22s",position:"relative",animation:`fadeUp .35s ease ${i*.07}s both`,display:"flex",flexDirection:"column"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${c.color}44`;e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
            {c.badge&&<div style={{position:"absolute",top:12,right:12,fontSize:9,background:`${c.color}18`,color:c.color,padding:"2px 7px",borderRadius:8,fontWeight:700}}>{c.badge}</div>}
            <div style={{fontSize:sc.isDesktop?32:24,marginBottom:12}}>{c.icon}</div>
            <div style={{fontFamily:H,fontSize:sc.isDesktop?17:15,fontWeight:W.card,color:t.text,marginBottom:5}}>{c.title}</div>
            <div style={{fontSize:12,color:t.sub,lineHeight:1.6,marginBottom:12,flex:1}}>{c.desc}</div>
            <div style={{fontSize:12,color:c.color,fontWeight:600}}>Open →</div>
          </div>
        ))}
      </div>
      <div style={{background:"rgba(239,68,68,.06)",border:"1px solid rgba(239,68,68,.15)",borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:22}}>🚨</span>
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
                <div style={{fontSize:28,marginBottom:8}}>🤔</div>
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
                    <span>{errRes.diy?"✅":"⚠️"}</span>
                    <span style={{fontSize:12,color:errRes.diy?"#4ade80":"#f87171",fontWeight:600,fontFamily:B}}>{errRes.diy?"You can resolve this yourself":"Requires a qualified technician"}</span>
                  </div>
                  {!errRes.diy&&<PBtn sm onClick={()=>setPage("techs")} style={{borderRadius:10,width:"auto",padding:"10px 16px"}}>Find Technician →</PBtn>}
                </div>
                {errRes.specs&&errRes.specs.length>0&&(
                  <div style={{marginTop:10,background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:10,padding:"11px 14px"}}>
                    <div style={{fontSize:11,color:t.sub,marginBottom:6}}>🔧 Recommended specialist:</div>
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
              <div style={{fontSize:12,color:t.sub,marginBottom:6}}>🔧 We recommend:</div>
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
      <PBtn style={{width:"100%"}}>📱 Register My System Free</PBtn>
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
        {article.hot&&<span style={{fontSize:11,color:"#f87171"}}>🔥 Trending</span>}
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
              <span style={{fontSize:20,flexShrink:0}}>🛒</span>
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
        <PBtn sm style={{width:"100%",padding:"10px"}}>☀️ Calculate My System</PBtn>
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
            <PBtn sm style={{width:"100%",padding:"10px"}}>☀️ Calculate My System</PBtn>
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
            {list[0].hot&&<span style={{fontSize:11,color:"#f87171"}}>🔥 {list[0].views} reads</span>}
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
                <Tag>{p.tag}</Tag>{p.hot&&<span style={{fontSize:11,color:"#f87171"}}>🔥</span>}
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
  const[email,setEmail]=useState("");const[done,setDone]=useState(false);
  const LAUNCH=new Date("2026-04-08T00:00:00+02:00");
  const[tl,setTl]=useState({d:0,h:0,m:0,s:0});
  const[pts]=useState(()=>Array.from({length:24},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,size:Math.random()*2.5+1,dur:Math.random()*8+6,delay:Math.random()*6,op:Math.random()*.45+.1})));
  useEffect(()=>{
    const calc=()=>{const now=new Date();const diff=LAUNCH-now;if(diff<=0){setTl({d:0,h:0,m:0,s:0});return;}setTl({d:Math.floor(diff/86400000),h:Math.floor((diff%86400000)/3600000),m:Math.floor((diff%3600000)/60000),s:Math.floor((diff%60000)/1000)});};
    calc();const id=setInterval(calc,1000);return()=>clearInterval(id);
  },[]);

  const submitEmail=async()=>{
    if(!email)return;
    try{
      await fetch("https://formspree.io/f/xpwzgkno",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,source:"coming_soon"})});
    }catch(e){}
    setDone(true);
  };

  return(
    <div style={{position:"fixed",inset:0,background:"#06080c",zIndex:9999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 20px",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>{pts.map(p=><div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,borderRadius:"50%",background:"#f5a623",opacity:p.op,animation:`particle ${p.dur}s ease-in-out ${p.delay}s infinite`}}/>)}</div>
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
          <div style={{width:44,height:44,background:"linear-gradient(135deg,#f5a623,#ff6b00)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,animation:"float 3s ease infinite",boxShadow:"0 0 30px rgba(245,166,35,.35)"}}>☀️</div>
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
                <div style={{fontFamily:"'Lexend',sans-serif",fontSize:"clamp(28px,6vw,48px)",fontWeight:900,color:"#f5a623",lineHeight:1}}>{String(el[1]).padStart(2,"0")}</div>
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
              <div style={{fontSize:22,marginBottom:4}}>✅</div>
              <div style={{fontFamily:"'Lexend',sans-serif",fontSize:16,fontWeight:700,color:"#4ade80",marginBottom:2}}>You're on the list</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,.3)"}}>We'll notify you on launch day.</div>
            </div>
          ):(
            <div style={{display:"flex",gap:8}}>
              <input value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submitEmail()} placeholder="your@email.com"
                style={{flex:1,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.09)",borderRadius:10,padding:"12px 14px",color:"#f0f0f0",fontSize:14,outline:"none",fontFamily:"'Plus Jakarta Sans',sans-serif"}}/>
              <button onClick={submitEmail} style={{background:"linear-gradient(135deg,#f5a623,#ff6b00)",border:"none",borderRadius:10,padding:"12px 18px",fontSize:13,fontWeight:800,color:"#000",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",whiteSpace:"nowrap"}}>Notify Me</button>
            </div>
          )}
        </div>
        <div style={{fontSize:11,color:"rgba(255,255,255,.16)",animation:"fadeUp 1s ease",textAlign:"center"}}>No spam · Unsubscribe anytime · 🇿🇦 Built for South Africa</div>
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
  const sc=useScreen();
  const t=isDark?DARK:LIGHT;
  useEffect(()=>{const mq=window.matchMedia("(prefers-color-scheme: dark)");const h=e=>setIsDark(e.matches);mq.addEventListener("change",h);return()=>mq.removeEventListener("change",h);},[]);
  const goTab=id=>{setTab(id);if(id!=="result")setRes(null);window.scrollTo({top:0,behavior:"smooth"});};
  const NAV=[{id:"home",l:"Home",icon:"🏠"},{id:"calc",l:"Calculator",icon:"☀️"},{id:"inst",l:"Installers",icon:"🗺️"},{id:"serv",l:"Servicing",icon:"🔧"},{id:"blog",l:"Guides",icon:"📖"}];
  const TICKS=["☀️ Solar tax rebate: claim 25% back from SARS","🔋 Load shedding prep — is your system sized right?","🛰️ NEW: Solar Roof Analysis — scan your actual roof","⚙️ Pro Calculator now live","🩺 Free System Health Check — 2 minutes","🔧 Verified repair technicians across SA"];

  const submitNewsletter=async(emailVal)=>{
    try{await fetch("https://formspree.io/f/xpwzgkno",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:emailVal,source:"newsletter"})});}catch(e){}
  };

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
    @keyframes spin2{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
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
            <div style={{display:"flex",animation:"ticker 40s linear infinite",whiteSpace:"nowrap"}}>
              {[...TICKS,...TICKS].map((x,i)=><span key={i} style={{fontSize:10,color:t.accent,marginRight:52,opacity:.8,fontWeight:600}}>{x}</span>)}
            </div>
          </div>
        )}
        {!sc.isMobile&&(
          <nav style={{background:t.navBg,backdropFilter:"blur(20px)",borderBottom:`1px solid ${t.border}`,padding:"0 28px",position:"sticky",top:0,zIndex:200,flexShrink:0}}>
            <div style={{maxWidth:1360,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:52,width:"100%"}}>
              <div onClick={()=>goTab("home")} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",flexShrink:0}}>
                <div style={{width:26,height:26,background:`linear-gradient(135deg,${t.accent},${t.accent2})`,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,animation:"float 3s ease infinite"}}>☀️</div>
                <span style={{fontFamily:H,fontSize:20,fontWeight:W.logo,letterSpacing:1,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></span>
                <span style={{fontSize:9,background:`rgba(${t.rgb},.15)`,color:t.accent,padding:"1px 6px",borderRadius:8,fontWeight:700,letterSpacing:1}}>BETA</span>
              </div>
              <div style={{display:"flex",gap:2}}>
                {NAV.map(x=><button key={x.id} onClick={()=>goTab(x.id)} style={{background:tab===x.id?`rgba(${t.rgb},.08)`:"none",border:`1px solid ${tab===x.id?`rgba(${t.rgb},.22)`:"transparent"}`,color:tab===x.id?t.accent:t.sub,padding:"5px 16px",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:600,transition:"all .2s",fontFamily:B}}>{x.l}</button>)}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <button onClick={()=>setIsDark(d=>!d)} style={{background:`rgba(${t.rgb},.1)`,border:`1px solid rgba(${t.rgb},.25)`,borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:15,lineHeight:1}}>{isDark?"⛅":"☀️"}</button>
                <PBtn sm style={{borderRadius:7,padding:"7px 16px",fontSize:12,width:"auto"}} onClick={()=>goTab("calc")}>🛰️ Scan My Roof</PBtn>
              </div>
            </div>
          </nav>
        )}
        {sc.isMobile&&(
          <div style={{background:t.navBg,backdropFilter:"blur(20px)",borderBottom:`1px solid ${t.border}`,padding:"0 16px",position:"sticky",top:0,zIndex:200,height:50,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
            <div onClick={()=>goTab("home")} style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer"}}>
              <div style={{width:24,height:24,background:`linear-gradient(135deg,${t.accent},${t.accent2})`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>☀️</div>
              <span style={{fontFamily:H,fontSize:18,fontWeight:W.logo,letterSpacing:1,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></span>
            </div>
            <button onClick={()=>setIsDark(d=>!d)} style={{background:`rgba(${t.rgb},.1)`,border:`1px solid rgba(${t.rgb},.25)`,borderRadius:7,padding:"5px 10px",cursor:"pointer",fontSize:14,lineHeight:1}}>{isDark?"⛅":"☀️"}</button>
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
                      <PBtn onClick={()=>goTab("calc")} style={{fontSize:15,padding:"14px 28px"}}>🛰️ Scan My Roof</PBtn>
                      <button onClick={()=>goTab("serv")} style={{background:`rgba(${t.rgb},.08)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.accent,borderRadius:30,padding:"13px 20px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:B,width:"100%"}}>🔧 Service My Solar</button>
                    </div>
                    <div style={{display:"flex",gap:sc.isMobile?16:32,marginTop:24,flexWrap:"wrap"}}>
                      {[["5","Calculators"],["R0","Always free"],["🇿🇦","SA built"],["24/7","Support"]].map(([v,l])=>(
                        <div key={l}><div style={{fontFamily:H,fontSize:20,fontWeight:W.section,color:t.text}}>{v}</div><div style={{fontSize:11,color:t.sub,marginTop:2}}>{l}</div></div>
                      ))}
                    </div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {[{icon:"🛰️",l:"Solar Roof Analysis",s:"Scan your actual roof via satellite",tab:"calc",badge:"NEW"},{icon:"✨",l:"Quick Calculator",s:"4 simple questions — 60 seconds",tab:"calc"},{icon:"⚙️",l:"Pro Calculator",s:"Full kW/kWh/Ah technical inputs",tab:"calc"},{icon:"🗺️",l:"Installer Directory",s:"SESSA-accredited, verified + finance",tab:"inst"},{icon:"🩺",l:"Health Check",s:"AI-powered system diagnostic",tab:"serv",badge:"AI"},{icon:"⚠️",l:"Error Code Translator",s:"Plain English inverter explanations",tab:"serv"}].map((x,i)=>(
                      <div key={x.l} onClick={()=>goTab(x.tab)} style={{display:"flex",alignItems:"center",gap:12,background:i===0?`rgba(${t.rgb},.06)`:t.bgCard,border:`1px solid ${i===0?`rgba(${t.rgb},.2)`:t.border}`,borderRadius:12,padding:"12px 14px",cursor:"pointer",transition:"all .2s",animation:`fadeUp .4s ease ${i*.05}s both`}}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`;e.currentTarget.style.transform="translateX(4px)";}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor=i===0?`rgba(${t.rgb},.2)`:t.border;e.currentTarget.style.transform="none";}}>
                        <div style={{width:34,height:34,borderRadius:9,background:`rgba(${t.rgb},.08)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{x.icon}</div>
                        <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:600,color:t.text,marginBottom:2,fontFamily:H}}>{x.l}</div><div style={{fontSize:11,color:t.sub}}>{x.s}</div></div>
                        {x.badge&&<span style={{fontSize:9,background:x.badge==="NEW"?`rgba(${t.rgb},.15)`:`rgba(${t.rgb},.12)`,color:t.accent,padding:"2px 6px",borderRadius:7,fontWeight:700,flexShrink:0}}>{x.badge}</span>}
                        <span style={{fontSize:13,color:t.sub,flexShrink:0}}>›</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{marginBottom:32}}>
                  <div style={{textAlign:"center",marginBottom:20}}><Lbl center>Your Solar Journey</Lbl><h2 style={{fontFamily:H,fontSize:sc.isMobile?19:26,fontWeight:W.section,color:t.text}}>SolarIQ is with you at every stage</h2></div>
                  <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":"repeat(5,1fr)",gap:10}}>
                    {[{n:"01",l:"Research",icon:"🔍",d:"Scan roof or calculate",c:t.accent},{n:"02",l:"Compare",icon:"⚖️",d:"Find the best installers",c:t.accent2},{n:"03",l:"Install",icon:"⚡",d:"Accredited professionals",c:"#4ade80"},{n:"04",l:"Maintain",icon:"🔧",d:"Reminders & cleaning tips",c:"#60a5fa"},{n:"05",l:"Repair",icon:"🩺",d:"Error codes & health checks",c:"#c084fc"}].map((s,i)=>(
                      <div key={s.n} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:12,padding:"16px 14px",animation:`fadeUp .4s ease ${i*.07}s both`}}>
                        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}><span style={{fontFamily:H,fontSize:10,fontWeight:W.logo,color:s.c,opacity:.4}}>{s.n}</span><div style={{flex:1,height:1,background:`${s.c}20`}}/><span style={{fontSize:16}}>{s.icon}</span></div>
                        <div style={{fontFamily:H,fontSize:14,fontWeight:W.card,color:s.c,marginBottom:4}}>{s.l}</div>
                        <div style={{fontSize:12,color:t.sub,lineHeight:1.5}}>{s.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <NewsletterSection onSubmit={submitNewsletter} sc={sc} t={t}/>
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
            <span>☀️</span><span style={{fontFamily:H,fontSize:14,fontWeight:W.logo,letterSpacing:1,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></span>
          </div>
          <div style={{fontSize:12,color:t.sub}}>South Africa's complete solar platform. 🇿🇦</div>
        </div>
        {sc.isMobile&&(
          <div style={{position:"fixed",bottom:0,left:0,right:0,background:t.navBg,backdropFilter:"blur(20px)",borderTop:`1px solid ${t.border}`,display:"flex",zIndex:200,paddingBottom:"env(safe-area-inset-bottom,0px)"}}>
            {NAV.map(x=>(
              <button key={x.id} onClick={()=>goTab(x.id)} style={{flex:1,background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 4px",cursor:"pointer",gap:3}}>
                <span style={{fontSize:16,filter:tab===x.id?"none":"grayscale(1)",opacity:tab===x.id?1:.45}}>{x.icon}</span>
                <span style={{fontSize:9,fontWeight:600,color:tab===x.id?t.accent:t.sub,fontFamily:B,letterSpacing:.3}}>{x.l}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </T.Provider>
  );
}

function NewsletterSection({onSubmit,sc,t}){
  const[email,setEmail]=useState("");const[done,setDone]=useState(false);
  const submit=async()=>{if(!email)return;await onSubmit(email);setDone(true);};
  return(
    <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`,border:`1px solid rgba(${t.rgb},.15)`,borderRadius:16,padding:sc.isMobile?"20px":"32px",textAlign:"center"}}>
      <div style={{fontSize:24,marginBottom:10}}>📬</div>
      <h3 style={{fontFamily:H,fontSize:sc.isMobile?18:22,fontWeight:W.section,color:t.text,marginBottom:6}}>Solar insights for SA homeowners</h3>
      <p style={{color:t.sub,fontSize:14,marginBottom:18,lineHeight:1.7,maxWidth:400,margin:"0 auto 18px"}}>Weekly deals, maintenance tips and load shedding updates. No spam, unsubscribe anytime.</p>
      {done?(
        <div style={{color:"#4ade80",fontFamily:H,fontSize:16,fontWeight:W.section}}>✅ You're subscribed!</div>
      ):(
        <div style={{display:"flex",flexDirection:sc.isMobile?"column":"row",gap:8,justifyContent:"center",maxWidth:380,margin:"0 auto"}}>
          <input value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="your@email.com" style={{flex:1,background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"11px 14px",color:t.text,fontSize:14,outline:"none",fontFamily:B,width:"100%"}}/>
          <PBtn sm onClick={submit} style={{borderRadius:9,width:sc.isMobile?"100%":"auto",padding:"11px 20px"}}>Subscribe Free</PBtn>
        </div>
      )}
    </div>
  );
}

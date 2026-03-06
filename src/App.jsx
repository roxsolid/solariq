import { useState, useEffect, createContext, useContext } from "react";

const DARK = { dark:true, accent:"#f5a623", accent2:"#ff8c42", rgb:"245,166,35", bg:"#07090d", bgCard:"rgba(255,255,255,.04)", bgCard2:"rgba(255,255,255,.07)", border:"rgba(255,255,255,.08)", text:"#f0f0f0", textMid:"#aaa", sub:"#555", glow:"rgba(245,166,35,.07)", navBg:"rgba(7,9,13,.95)", inputBg:"rgba(255,255,255,.06)" };
const LIGHT = { dark:false, accent:"#d4830a", accent2:"#c05c00", rgb:"212,131,10", bg:"#f5f2eb", bgCard:"rgba(0,0,0,.04)", bgCard2:"rgba(0,0,0,.07)", border:"rgba(0,0,0,.1)", text:"#111111", textMid:"#444", sub:"#999", glow:"rgba(212,131,10,.08)", navBg:"rgba(245,242,235,.95)", inputBg:"rgba(0,0,0,.05)" };
const T = createContext(DARK);
const useT = () => useContext(T);
const H = "'Bebas Neue',sans-serif";
const B = "'Plus Jakarta Sans',sans-serif";

function useScreen() {
  const [w,setW] = useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{ const fn=()=>setW(window.innerWidth); window.addEventListener("resize",fn); return ()=>window.removeEventListener("resize",fn); },[]);
  return { w, isMobile:w<640, isTablet:w>=640&&w<1024, isDesktop:w>=1024 };
}

const RATE=3.20;
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
  {id:1,name:"SunPower SA",city:"Johannesburg",prov:"Gauteng",rating:4.9,rev:312,sessa:true,jobs:847,yrs:12,badge:"Top Rated",resp:"2 hrs",spec:"Residential",brands:["Sunsynk","Victron"],price:"R80k–R200k",verified:true},
  {id:2,name:"Cape Solar Pro",city:"Cape Town",prov:"Western Cape",rating:4.8,rev:198,sessa:true,jobs:523,yrs:9,badge:"Most Popular",resp:"3 hrs",spec:"Commercial & Residential",brands:["Deye","Sunsynk"],price:"R60k–R350k",verified:true},
  {id:3,name:"KZN Solar Solutions",city:"Durban",prov:"KwaZulu-Natal",rating:4.7,rev:143,sessa:true,jobs:389,yrs:7,badge:null,resp:"4 hrs",spec:"Off-grid",brands:["Victron","Pylontech"],price:"R70k–R250k",verified:true},
  {id:4,name:"Pretoria Solar Works",city:"Pretoria",prov:"Gauteng",rating:4.6,rev:89,sessa:false,jobs:201,yrs:5,badge:"Fast Response",resp:"Same day",spec:"Residential",brands:["Growatt","Deye"],price:"R50k–R150k",verified:true},
  {id:5,name:"Green Energy EC",city:"Port Elizabeth",prov:"Eastern Cape",rating:4.5,rev:67,sessa:true,jobs:156,yrs:6,badge:null,resp:"5 hrs",spec:"Agricultural",brands:["Victron","Sunsynk"],price:"R90k–R400k",verified:false},
  {id:6,name:"Solar Hub BFN",city:"Bloemfontein",prov:"Free State",rating:4.4,rev:44,sessa:true,jobs:98,yrs:4,badge:null,resp:"6 hrs",spec:"Residential",brands:["Deye","Growatt"],price:"R45k–R130k",verified:true},
  {id:7,name:"Mpumalanga Solar",city:"Nelspruit",prov:"Mpumalanga",rating:4.6,rev:58,sessa:false,jobs:134,yrs:5,badge:null,resp:"4 hrs",spec:"Commercial",brands:["Sunsynk"],price:"R100k–R300k",verified:true},
  {id:8,name:"Northern Cape Solar",city:"Kimberley",prov:"Northern Cape",rating:4.8,rev:31,sessa:true,jobs:76,yrs:8,badge:"High PSH Zone",resp:"3 hrs",spec:"Off-grid & Agricultural",brands:["Victron","Pylontech"],price:"R80k–R500k",verified:true},
];
const PROVS=["All","Gauteng","Western Cape","KwaZulu-Natal","Eastern Cape","Free State","Mpumalanga","Northern Cape"];
const SPECS=["All","Residential","Commercial","Off-grid","Agricultural","Commercial & Residential","Off-grid & Agricultural"];
const BRANDS=["All","Sunsynk","Victron","Deye","Growatt","Pylontech"];
const TECHS=[
  {id:1,name:"FixSolar SA",prov:"Gauteng",spec:"Inverter Repair",rating:4.9,rev:203,price:"R450/hr",emergency:true,brands:["Victron","Sunsynk","Deye"]},
  {id:2,name:"Panel Clean Pro",prov:"Western Cape",spec:"Panel Cleaning",rating:4.8,rev:156,price:"R85/panel",emergency:false,brands:["All brands"]},
  {id:3,name:"Battery Doctors",prov:"Gauteng",spec:"Battery Replacement",rating:4.7,rev:98,price:"From R1 200",emergency:true,brands:["Pylontech","BSL","Freedom Won"]},
  {id:4,name:"Solar Doctor KZN",prov:"KwaZulu-Natal",spec:"Full System Service",rating:4.8,rev:87,price:"R1 800",emergency:false,brands:["All brands"]},
];
const ERRORS={
  "F01":{brand:"Sunsynk",title:"Grid voltage too high",sev:"warning",diy:true,fix:"Grid voltage above safe range — usually Eskom. Resolves itself. If it persists over 2 hours, contact your installer."},
  "F02":{brand:"Sunsynk",title:"Grid voltage too low",sev:"warning",diy:true,fix:"Grid voltage dropping below safe threshold. Common during load shedding transitions. System auto-switches to battery."},
  "F32":{brand:"Sunsynk",title:"Battery over-temperature",sev:"critical",diy:false,fix:"Battery overheating. Ensure ventilation immediately. Do NOT continue using — contact technician urgently."},
  "E001":{brand:"Victron",title:"Low battery shutdown",sev:"warning",diy:true,fix:"Battery depleted to minimum safe level. Will resume charging once power is available."},
  "E002":{brand:"Victron",title:"Overload — too much drawn",sev:"warning",diy:true,fix:"Drawing more power than inverter can handle. Switch off heavy appliances (geyser, kettle, aircon) and restart."},
  "E003":{brand:"Victron",title:"Inverter overheating",sev:"critical",diy:false,fix:"Switch off immediately. Ensure 20cm clearance on all sides. Do not restart until cool."},
  "W001":{brand:"Deye",title:"PV input voltage high",sev:"info",diy:true,fix:"Panel voltage slightly above optimal. Usually resolves as panels cool. Monitor for 24 hours."},
  "W003":{brand:"Deye",title:"Grid frequency out of range",sev:"warning",diy:true,fix:"Eskom frequency unstable. Normal during load shedding transitions."},
  "G01":{brand:"Growatt",title:"No grid connection detected",sev:"info",diy:true,fix:"Check your mains breaker first. If mains is on and not load shedding, contact your installer."},
  "G05":{brand:"Growatt",title:"Insulation resistance fault",sev:"critical",diy:false,fix:"Serious fault. Switch off at DC isolator immediately. Call a qualified electrician now."},
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
  {id:2,tag:"Comparison",hot:true,min:"9",views:"8.9k",title:"Sunsynk vs Deye vs Victron — which inverter is best for SA?",intro:"Three brands dominate the SA inverter market. Honest comparison, no sponsorships.",body:[{h:"Sunsynk — the SA favourite",p:"South African-designed, handles Eskom's unstable grid well, local support. Price: R12,000–R22,000. Best for typical SA suburban home dealing with load shedding."},{h:"Deye — the value king",p:"Chinese-manufactured, best spec-per-rand. Solid reliability. Price: R8,000–R16,000. Best for budget-conscious buyers and commercial installations."},{h:"Victron — the premium choice",p:"Dutch-engineered gold standard. Best monitoring, fully modular. Price: R18,000–R45,000. Best for off-grid, high-end homes, 20+ year lifespan."},{h:"Verdict",p:"For most SA homeowners: Sunsynk. Budget: Deye. Off-grid or premium: Victron. Avoid cheap generic brands — the saving is never worth it."}],related:[1,3,5]},
  {id:3,tag:"Tax",hot:false,min:"5",views:"6.2k",title:"How to claim your solar tax rebate from SARS — step by step",intro:"Most SA homeowners don't claim this. Here's exactly how.",body:[{h:"What qualifies?",p:"Only new and unused solar PV panels. Batteries, inverters, mounting, cabling, and labour do not qualify."},{h:"How much?",p:"25% of panel cost, capped at R15,000. This is a rebate against your tax liability — not a cash refund."},{h:"Documents needed",p:"Original invoice showing panel brand, model, wattage and cost separately. Certificate of compliance (COC). Proof of payment."},{h:"How to claim",p:"On your ITR12 eFiling return, find 'Solar Energy Tax Credit'. Enter the qualifying panel cost. SARS calculates the 25% automatically."}],related:[1,4,6]},
  {id:4,tag:"Maintenance",hot:false,min:"6",views:"4.8k",title:"Is your solar system actually working properly? 7 signs it isn't",intro:"Many SA solar systems quietly underperform for months. Here are the warning signs.",body:[{h:"Backup doesn't last as long",p:"Battery used to last 4 hours, now it's 2? Capacity has degraded or charge settings are wrong. Lithium should retain 80% after 3,000 cycles."},{h:"Still getting high Eskom bills",p:"If your bill hasn't dropped, system may be undersized, panels shaded at peak hours, or inverter settings not prioritising solar."},{h:"Panels not cleaned in 6+ months",p:"Dirty panels lose up to 25% efficiency in SA conditions. R85–R150 per panel every 3–6 months is the highest-ROI maintenance you can do."},{h:"Ignoring error codes",p:"Some sort themselves out. Others are early warnings of serious issues. Use the Error Code Translator in the Servicing tab."}],related:[1,2,3]},
  {id:5,tag:"Guide",hot:false,min:"8",views:"3.9k",title:"Off-grid vs grid-tied solar in South Africa — the honest truth",intro:"The dream of zero electricity bill is real — but not for everyone.",body:[{h:"Grid-tied: cheapest, useless in load shedding",p:"No battery, no backup. System switches off during load shedding. Only makes sense if you're never affected — almost nobody in SA."},{h:"Hybrid: the SA sweet spot",p:"Grid plus battery. Handles load shedding, reduces bill, most flexible. What 95% of SA residential installations should be. Cost: R80,000–R200,000."},{h:"Off-grid: freedom, but expensive",p:"Needs 3× the battery capacity of hybrid to survive overcast days. Makes sense for farms and remote properties — not most SA suburbs."},{h:"Recommendation",p:"For urban SA: go hybrid. Size battery for 2× your load shedding hours with 20% buffer. Don't over-size chasing zero bill."}],related:[1,2,6]},
  {id:6,tag:"Comparison",hot:true,min:"10",views:"7.1k",title:"Best solar panels available in South Africa — ranked 2026",intro:"Not all solar panels are equal. Top panels through SA installers right now.",body:[{h:"What to look for",p:"Four numbers: efficiency %, power output (Wp), annual degradation (aim under 0.5%/year), and product warranty (25 years standard, 30 excellent)."},{h:"Tier 1: JA Solar & Longi",p:"Bloomberg Tier 1 bankable panels. Dominate SA installations. Efficiency 21–22.5%. R2,200–R3,200 per 550Wp panel."},{h:"Tier 1: Canadian Solar",p:"Strong warranty support, 20.5–21.5% efficiency, available through most SA distributors."},{h:"What to avoid",p:"Generic unbranded panels from unknown manufacturers. No local warranty means a fault in year 5 is entirely your problem."}],related:[1,2,5]},
];

function useCount(target,ms=1300){const[v,setV]=useState(0);useEffect(()=>{let s=null;const f=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/ms,1);setV(Math.floor((1-Math.pow(1-p,3))*target));if(p<1)requestAnimationFrame(f);};requestAnimationFrame(f);},[target]);return v;}
function makeResult(dailyKwh,systemKw,battF=1.5){const mo=Math.round(dailyKwh*30*RATE),cost=Math.round(systemKw*18000),save=Math.round(mo*12*.75);return{systemKw,battKwh:Math.round(systemKw*battF*10)/10,cost,annSave:save,mo,payback:(cost/save).toFixed(1),dailyKwh:Math.round(dailyKwh*10)/10,panels:Math.ceil(systemKw/.55)};}

function PBtn({children,onClick,disabled,sm,style={}}){const t=useT();return <button onClick={onClick} disabled={disabled} style={{background:disabled?"rgba(128,128,128,.15)":`linear-gradient(135deg,${t.accent},${t.accent2})`,color:disabled?"#666":t.dark?"#000":"#fff",border:"none",borderRadius:30,padding:sm?"10px 20px":"13px 28px",fontSize:sm?13:14,fontWeight:800,cursor:disabled?"not-allowed":"pointer",fontFamily:B,transition:"all .2s",...style}}>{children}</button>;}
function Lbl({children,center}){const t=useT();return <div style={{fontSize:11,color:t.accent,fontWeight:800,textTransform:"uppercase",letterSpacing:2.5,marginBottom:8,fontFamily:B,textAlign:center?"center":"left"}}>{children}</div>;}
function BackBtn({onClick}){const t=useT();return <button onClick={onClick} style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",gap:6,fontWeight:600,marginBottom:20,padding:0,fontFamily:B}}>← Back</button>;}
function Tag({children,color}){const t=useT();const c=color||t.accent;return <span style={{fontSize:10,fontWeight:800,background:`${c}18`,color:c,padding:"3px 9px",borderRadius:20,letterSpacing:.5}}>{children}</span>;}
function Stars({n}){const t=useT();return <span style={{color:"#f0c040",fontSize:12}}>{"★".repeat(Math.floor(n))}<span style={{color:t.sub}}> {n}</span></span>;}

function EngineerCalc({onResult}){
  const t=useT();const sc=useScreen();
  const[v,setV]=useState({kwh:20,psh:4.5,loss:20,invKva:5,batAh:200,batV:48,dod:80,type:"hybrid"});
  const up=(k,val)=>setV(p=>({...p,[k]:val}));
  const panels=Math.ceil((v.kwh/(v.psh*(1-v.loss/100)))/.55);
  const syskw=panels*.55,batKwh=(v.batAh*v.batV*(v.dod/100))/1000;
  const backupH=(batKwh/(v.kwh/24)).toFixed(1),cost=Math.round(syskw*18000);
  const save=Math.round(v.kwh*365*RATE*.75),payback=(cost/save).toFixed(1);
  const NI=({k,label,desc,min,max,step,unit})=>(
    <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:12,padding:"13px 14px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
        <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:t.text,fontFamily:B}}>{label}</div>{desc&&<div style={{fontSize:10,color:t.sub,marginTop:2,lineHeight:1.4}}>{desc}</div>}</div>
        <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
          <button onClick={()=>up(k,Math.max(min,parseFloat((v[k]-step).toFixed(2))))} style={{width:28,height:28,borderRadius:7,background:`rgba(${t.rgb},.1)`,border:`1px solid ${t.border}`,color:t.text,cursor:"pointer",fontSize:15,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
          <div style={{textAlign:"center",minWidth:60}}>
            <div style={{fontFamily:"monospace",fontSize:15,fontWeight:800,color:t.accent}}>{v[k]}</div>
            <div style={{fontSize:9,color:t.sub}}>{unit}</div>
          </div>
          <button onClick={()=>up(k,Math.min(max,parseFloat((v[k]+step).toFixed(2))))} style={{width:28,height:28,borderRadius:7,background:`rgba(${t.rgb},.1)`,border:`1px solid ${t.border}`,color:t.text,cursor:"pointer",fontSize:15,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
        </div>
      </div>
    </div>
  );
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
        <div style={{width:32,height:32,borderRadius:9,background:`rgba(${t.rgb},.12)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>⚙️</div>
        <div><div style={{fontFamily:H,fontSize:22,letterSpacing:1,color:t.text}}>Engineer Mode</div><div style={{fontSize:12,color:t.sub}}>Full technical parameters</div></div>
      </div>
      <div style={{background:`rgba(${t.rgb},.05)`,border:`1px solid rgba(${t.rgb},.15)`,borderRadius:10,padding:"9px 14px",marginBottom:16,display:"flex",gap:8,alignItems:"center"}}>
        <span>💡</span><span style={{fontSize:12,color:t.sub}}>Tap + / − to adjust each value. Results update live.</span>
      </div>
      <div style={{fontSize:10,color:t.accent,fontWeight:800,textTransform:"uppercase",letterSpacing:2,marginBottom:8}}>⚡ Load & Generation</div>
      <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr":"1fr 1fr",gap:8,marginBottom:14}}>
        <NI k="kwh" label="Daily Consumption" desc="Total kWh/day" min={1} max={150} step={0.5} unit="kWh/day"/>
        <NI k="psh" label="Peak Sun Hours" desc="SA avg 4.5–5.5 hrs" min={2} max={7} step={0.1} unit="hours"/>
        <NI k="loss" label="System Losses" desc="Wiring + inverter + temp" min={5} max={40} step={1} unit="%"/>
        <NI k="invKva" label="Inverter Size" desc="Handle peak load + 20%" min={1} max={30} step={0.5} unit="kVA"/>
      </div>
      <div style={{fontSize:10,color:t.accent,fontWeight:800,textTransform:"uppercase",letterSpacing:2,marginBottom:8}}>🔋 Battery Bank</div>
      <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":"1fr 1fr 1fr",gap:8,marginBottom:14}}>
        <NI k="batAh" label="Capacity" desc="Total Amp-hours" min={50} max={2000} step={25} unit="Ah"/>
        <NI k="batV" label="Voltage" desc="12 / 24 / 48V" min={12} max={96} step={12} unit="V"/>
        <NI k="dod" label="Depth of Discharge" desc="LiFePO4: 90%" min={20} max={100} step={5} unit="%"/>
      </div>
      <div style={{fontSize:10,color:t.accent,fontWeight:800,textTransform:"uppercase",letterSpacing:2,marginBottom:8}}>🔌 System Type</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:18}}>
        {[["hybrid","Hybrid","Best for SA"],["gridtied","Grid-Tied","No battery"],["offgrid","Off-Grid","Full independence"]].map(([k,lbl,desc])=>(
          <div key={k} onClick={()=>up("type",k)} style={{background:v.type===k?`rgba(${t.rgb},.1)`:t.bgCard,border:`1px solid ${v.type===k?`rgba(${t.rgb},.35)`:t.border}`,borderRadius:12,padding:"12px 10px",cursor:"pointer",transition:"all .2s",textAlign:"center"}}>
            <div style={{width:14,height:14,borderRadius:3,background:v.type===k?t.accent:"transparent",border:`2px solid ${v.type===k?t.accent:t.sub}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 6px"}}>
              {v.type===k&&<span style={{fontSize:8,color:t.dark?"#000":"#fff",fontWeight:900}}>✓</span>}
            </div>
            <div style={{fontSize:12,fontWeight:700,color:v.type===k?t.accent:t.text,fontFamily:B}}>{lbl}</div>
            <div style={{fontSize:10,color:t.sub,marginTop:2}}>{desc}</div>
          </div>
        ))}
      </div>
      <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.1),rgba(${t.rgb},.05))`,border:`1px solid rgba(${t.rgb},.22)`,borderRadius:16,padding:"18px",marginBottom:12}}>
        <div style={{fontSize:10,color:t.accent,fontWeight:800,textTransform:"uppercase",letterSpacing:2,marginBottom:12}}>📊 Live Results</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:13}}>
          {[["Panels",`${panels}×`,"550Wp"],["PV Array",`${syskw.toFixed(1)}kWp`,"Total"],["Battery",`${batKwh.toFixed(1)}kWh`,"Usable"],["Backup",`${backupH}hrs`,"At avg load"],["Inverter",`${v.invKva}kVA`,"Minimum"],["Cost",`R${(cost/1000).toFixed(0)}k`,"Installed"]].map(([l,val,s])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:H,fontSize:sc.isMobile?18:22,letterSpacing:1,color:t.accent}}>{val}</div>
              <div style={{fontSize:10,fontWeight:700,color:t.text,marginBottom:1}}>{l}</div>
              <div style={{fontSize:9,color:t.sub}}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:12}}>
          <div style={{background:`rgba(${t.rgb},.06)`,borderRadius:9,padding:"9px 12px"}}>
            <div style={{fontSize:10,color:t.sub,marginBottom:2}}>Annual savings</div>
            <div style={{fontFamily:H,fontSize:18,letterSpacing:1,color:"#4ade80"}}>R{save.toLocaleString()}</div>
          </div>
          <div style={{background:`rgba(${t.rgb},.06)`,borderRadius:9,padding:"9px 12px"}}>
            <div style={{fontSize:10,color:t.sub,marginBottom:2}}>Payback period</div>
            <div style={{fontFamily:H,fontSize:18,letterSpacing:1,color:t.accent}}>{payback} years</div>
          </div>
        </div>
        <div style={{background:t.dark?"rgba(0,0,0,.35)":"rgba(0,0,0,.04)",borderRadius:9,padding:"10px 13px",fontFamily:"monospace",fontSize:11,color:t.sub,lineHeight:1.9,overflowX:"auto"}}>
          <div style={{color:t.accent,fontWeight:700,marginBottom:3}}>// Technical Specification</div>
          <div>Load: {v.kwh} kWh/day @ {v.psh} PSH</div>
          <div>PV Array: {panels} × 550Wp = {syskw.toFixed(2)} kWp</div>
          <div>Battery: {v.batAh}Ah × {v.batV}V × {v.dod}% = {batKwh.toFixed(2)} kWh</div>
          <div>Type: {v.type.charAt(0).toUpperCase()+v.type.slice(1)}</div>
        </div>
      </div>
      <PBtn style={{width:"100%"}} onClick={()=>onResult(makeResult(v.kwh,parseFloat(syskw.toFixed(1))))}>Generate Full Report →</PBtn>
    </div>
  );
}

function Calculator({onResult}){
  const t=useT();const sc=useScreen();
  const[mode,setMode]=useState(null);const[step,setStep]=useState(0);const[ans,setAns]=useState({});
  const[apps,setApps]=useState({});const[bill,setBill]=useState("");const[cat,setCat]=useState("essentials");
  const[fade,setFade]=useState(false);
  const go=fn=>{setFade(true);setTimeout(()=>{fn();setFade(false);},200);};
  const appCount=Object.values(apps).filter(h=>h>0).length;
  const cats=["essentials","work","home","comfort"];
  const fromApps=()=>{const wh=Object.entries(apps).reduce((s,[id,h])=>{const a=APPLIANCES.find(x=>x.id===id);return s+(a&&h>0?a.w*h:0);},0);const d=wh/1000;onResult(makeResult(d,Math.max(2,Math.ceil(d/4))));};
  const fromBill=()=>{const b=parseFloat(bill);if(!b)return;const d=b/RATE/30;onResult(makeResult(d,Math.max(2,Math.ceil(d/4))));};
  if(!mode)return(
    <div style={{opacity:fade?0:1,transition:"opacity .2s",animation:"fadeUp .5s ease"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`rgba(${t.rgb},.08)`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:20,padding:"5px 14px",marginBottom:14}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:t.accent,display:"inline-block"}}/>
          <span style={{fontSize:11,color:t.accent,fontWeight:700,letterSpacing:1}}>NO TECHNICAL KNOWLEDGE NEEDED</span>
        </div>
        <h2 style={{fontFamily:H,fontSize:"clamp(30px,7vw,52px)",letterSpacing:2,color:t.text,lineHeight:1,marginBottom:10}}>Find Your Perfect Solar Setup</h2>
        <p style={{color:t.sub,fontSize:14,maxWidth:360,margin:"0 auto",lineHeight:1.7}}>Four ways to calculate — pick the one that suits you.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":"repeat(4,1fr)",gap:10}}>
        {[{k:"simple",icon:"✨",title:"Quick & Easy",sub:"4 questions. 60 seconds.",badge:"Most Popular"},{k:"appliance",icon:"🔌",title:"By Appliances",sub:"Pick every device you own.",badge:"Most Accurate"},{k:"bill",icon:"📄",title:"From My Bill",sub:"Enter your Eskom bill.",badge:"Fastest"},{k:"engineer",icon:"⚙️",title:"Engineer Mode",sub:"Full technical inputs.",badge:"Pro"}].map(c=>(
          <div key={c.k} onClick={()=>go(()=>setMode(c.k))} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:16,padding:sc.isMobile?"14px 12px":"20px 18px",cursor:"pointer",transition:"all .2s",position:"relative"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.4)`;e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
            <div style={{position:"absolute",top:9,right:9,fontSize:9,background:`rgba(${t.rgb},.15)`,color:t.accent,padding:"2px 7px",borderRadius:10,fontWeight:800}}>{c.badge}</div>
            <div style={{fontSize:sc.isMobile?22:26,marginBottom:9}}>{c.icon}</div>
            <div style={{fontFamily:H,fontSize:sc.isMobile?16:20,letterSpacing:1,color:t.text,marginBottom:3}}>{c.title}</div>
            <div style={{fontSize:11,color:t.sub,lineHeight:1.5}}>{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
  if(mode==="engineer")return(<div style={{opacity:fade?0:1,transition:"opacity .2s"}}><BackBtn onClick={()=>go(()=>setMode(null))}/><EngineerCalc onResult={onResult}/></div>);
  if(mode==="bill")return(
    <div style={{opacity:fade?0:1,transition:"opacity .2s",animation:"fadeUp .4s ease"}}>
      <BackBtn onClick={()=>go(()=>setMode(null))}/>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:36,marginBottom:10}}>📄</div>
        <h3 style={{fontFamily:H,fontSize:30,letterSpacing:2,color:t.text,marginBottom:5}}>Your Monthly Bill</h3>
        <p style={{color:t.sub,fontSize:14,marginBottom:22}}>Enter approximately what you pay Eskom per month</p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:16}}>
          <span style={{fontSize:26,color:t.accent,fontWeight:700}}>R</span>
          <input type="number" placeholder="0" value={bill} onChange={e=>setBill(e.target.value)}
            style={{background:"transparent",border:"none",outline:"none",fontSize:sc.isMobile?44:56,fontFamily:H,letterSpacing:2,color:t.text,width:sc.isMobile?160:200,textAlign:"center"}}/>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:20,flexWrap:"wrap"}}>
          {[500,1200,2500,4000].map(n=>(
            <button key={n} onClick={()=>setBill(String(n))} style={{background:bill==n?`rgba(${t.rgb},.15)`:t.bgCard,border:`1px solid ${bill==n?t.accent:t.border}`,color:bill==n?t.accent:t.sub,padding:"8px 16px",borderRadius:25,cursor:"pointer",fontSize:13,fontWeight:700,transition:"all .2s",fontFamily:B}}>R{n.toLocaleString()}</button>
          ))}
        </div>
        <PBtn onClick={fromBill} disabled={!bill}>Calculate My System →</PBtn>
      </div>
    </div>
  );
  if(mode==="appliance")return(
    <div style={{opacity:fade?0:1,transition:"opacity .2s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <BackBtn onClick={()=>go(()=>setMode(null))} style={{marginBottom:0}}/>
        {appCount>0&&<div style={{fontSize:12,color:t.accent,background:`rgba(${t.rgb},.1)`,padding:"4px 12px",borderRadius:20}}>{appCount} selected</div>}
      </div>
      <h3 style={{fontFamily:H,fontSize:26,letterSpacing:2,color:t.text,marginBottom:3}}>Select Your Appliances</h3>
      <p style={{color:t.sub,fontSize:13,marginBottom:13}}>Tap each one you use</p>
      <div style={{display:"flex",borderBottom:`1px solid ${t.border}`,marginBottom:13,overflowX:"auto"}}>
        {cats.map(c=><button key={c} onClick={()=>setCat(c)} style={{background:"none",border:"none",borderBottom:`2px solid ${cat===c?t.accent:"transparent"}`,color:cat===c?t.accent:t.sub,padding:"7px 12px",cursor:"pointer",fontSize:12,fontWeight:700,textTransform:"capitalize",transition:"all .2s",fontFamily:B,whiteSpace:"nowrap"}}>{c}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:`repeat(auto-fill,minmax(${sc.isMobile?100:130}px,1fr))`,gap:8,marginBottom:20}}>
        {APPLIANCES.filter(a=>a.cat===cat).map(app=>{
          const active=apps[app.id]>0,hrs=apps[app.id]||0;
          const toggle=()=>{const c={...apps};active?delete c[app.id]:(c[app.id]=app.h);setApps(c);};
          return(
            <div key={app.id} style={{background:active?`rgba(${t.rgb},.08)`:t.bgCard,border:`1px solid ${active?`rgba(${t.rgb},.4)`:t.border}`,borderRadius:12,padding:10,textAlign:"center",transition:"all .2s",cursor:"pointer"}} onClick={active?undefined:toggle}>
              <div style={{fontSize:20,marginBottom:3}} onClick={toggle}>{app.icon}</div>
              <div style={{fontSize:11,fontWeight:700,color:active?t.text:t.sub,marginBottom:1,fontFamily:B}} onClick={toggle}>{app.name}</div>
              <div style={{fontSize:9,color:t.sub,opacity:.6}}>{app.w}W</div>
              {active&&(
                <div style={{marginTop:7}}>
                  <div style={{fontSize:9,color:t.sub,marginBottom:2}}>hrs/day</div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
                    <button onClick={e=>{e.stopPropagation();setApps({...apps,[app.id]:Math.max(.25,hrs-.25)});}} style={{background:`rgba(${t.rgb},.1)`,border:"none",color:t.text,width:22,height:22,borderRadius:5,cursor:"pointer",fontSize:14,lineHeight:1}}>-</button>
                    <span style={{fontSize:12,fontWeight:800,color:t.accent,minWidth:20,textAlign:"center"}}>{hrs}</span>
                    <button onClick={e=>{e.stopPropagation();setApps({...apps,[app.id]:Math.min(24,hrs+.25)});}} style={{background:`rgba(${t.rgb},.1)`,border:"none",color:t.text,width:22,height:22,borderRadius:5,cursor:"pointer",fontSize:14,lineHeight:1}}>+</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <PBtn onClick={fromApps} disabled={appCount===0}>{appCount>0?`Calculate ${appCount} Appliances →`:"Select at least one"}</PBtn>
    </div>
  );
  const q=QUIZ[step];
  return(
    <div style={{opacity:fade?0:1,transition:"opacity .2s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <BackBtn onClick={()=>step===0?go(()=>setMode(null)):go(()=>setStep(s=>s-1))} style={{marginBottom:0}}/>
        <div style={{display:"flex",gap:4}}>{QUIZ.map((_,i)=><div key={i} style={{width:i===step?20:6,height:6,borderRadius:3,background:i<=step?t.accent:`rgba(${t.rgb},.15)`,transition:"all .3s"}}/>)}</div>
        <div style={{fontSize:12,color:t.sub}}>{step+1}/{QUIZ.length}</div>
      </div>
      <div key={step} style={{animation:"fadeUp .3s ease"}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <h3 style={{fontFamily:H,fontSize:"clamp(20px,4vw,32px)",letterSpacing:1.5,color:t.text,marginBottom:5}}>{q.q}</h3>
          <p style={{color:t.sub,fontSize:13}}>{q.hint}</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":"repeat(auto-fit,minmax(175px,1fr))",gap:10}}>
          {q.opts.map(o=>{
            const sel=ans[q.id]===o.v;
            return(
              <button key={o.v} onClick={()=>{
                const na={...ans,[q.id]:o.v};setAns(na);
                if(step<QUIZ.length-1)setTimeout(()=>go(()=>setStep(s=>s+1)),180);
                else setTimeout(()=>{
                  const sz=QUIZ[0].opts.find(x=>x.v===na[QUIZ[0].id]);
                  const bl=QUIZ[1].opts.find(x=>x.v===na[QUIZ[1].id]);
                  const gl=QUIZ[2].opts.find(x=>x.v===na[QUIZ[2].id]);
                  const ls=QUIZ[3].opts.find(x=>x.v===na[QUIZ[3].id]);
                  onResult(makeResult((sz?.kwh||18)*(bl?.mult||1),gl?.kw||5,ls?.bf||1.5));
                },200);
              }} style={{background:sel?`rgba(${t.rgb},.12)`:t.bgCard,border:`1px solid ${sel?t.accent:t.border}`,borderRadius:14,padding:sc.isMobile?"14px 10px":"18px 15px",cursor:"pointer",textAlign:"left",transition:"all .2s"}}
                onMouseEnter={e=>{if(!sel){e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`;e.currentTarget.style.transform="translateY(-2px)";}}}
                onMouseLeave={e=>{if(!sel){e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}}>
                <div style={{fontSize:sc.isMobile?22:26,marginBottom:7}}>{o.icon}</div>
                <div style={{fontFamily:H,fontSize:sc.isMobile?14:17,letterSpacing:1,color:sel?t.accent:t.text}}>{o.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Results({r,onReset,goInstallers}){
  const t=useT();const sc=useScreen();const aC=useCount(r.cost);const aS=useCount(r.annSave);
  return(
    <div style={{animation:"fadeUp .5s ease"}}>
      <div style={{textAlign:"center",marginBottom:22}}>
        <div style={{fontSize:38,marginBottom:9}}>☀️</div>
        <h2 style={{fontFamily:H,fontSize:"clamp(26px,6vw,44px)",letterSpacing:2,color:t.text,marginBottom:5}}>Your Solar Profile Is Ready</h2>
        <p style={{color:t.sub,fontSize:14}}>Here's exactly what your home needs</p>
      </div>
      <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.12),rgba(${t.rgb},.05))`,border:`1px solid rgba(${t.rgb},.22)`,borderRadius:20,padding:"22px",textAlign:"center",marginBottom:12}}>
        <Lbl center>Recommended System</Lbl>
        <div style={{fontFamily:H,fontSize:"clamp(52px,12vw,80px)",letterSpacing:3,color:t.text,lineHeight:1,marginBottom:4}}>
          {r.systemKw}<span style={{fontSize:"0.38em",color:t.accent,letterSpacing:2}}>kW</span>
        </div>
        <div style={{color:t.sub,marginBottom:18}}>with {r.battKwh}kWh battery · {r.panels} panels</div>
        <div style={{display:"flex",justifyContent:"center",gap:sc.isMobile?16:32,flexWrap:"wrap"}}>
          {[["Payback",`${r.payback} yrs`],["Daily",`${r.dailyKwh}kWh`],["After Solar",`~R${Math.round(r.mo*.25).toLocaleString()}/mo`]].map(([l,v])=>(
            <div key={l}><div style={{fontFamily:H,fontSize:18,letterSpacing:1,color:t.accent}}>{v}</div><div style={{fontSize:11,color:t.sub,marginTop:1}}>{l}</div></div>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:12}}>
        {[["Estimated Cost",`R${aC.toLocaleString()}`,t.accent],["Annual Savings",`R${aS.toLocaleString()}`,"#4ade80"],["Current Bill",`R${r.mo.toLocaleString()}/mo`,"#60a5fa"],["After Solar",`~R${Math.round(r.mo*.25).toLocaleString()}/mo`,"#c084fc"]].map(([l,v,c])=>(
          <div key={l} style={{background:t.bgCard,border:`1px solid ${c}22`,borderRadius:12,padding:"13px 14px"}}>
            <div style={{fontSize:9,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:4}}>{l}</div>
            <div style={{fontFamily:H,fontSize:sc.isMobile?18:22,letterSpacing:1,color:c}}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:13,padding:"15px",marginBottom:12}}>
        {[`✅ Lights, WiFi, TV & fridge run through all load shedding`,`✅ Save ~R${Math.round(r.annSave/12).toLocaleString()} every month`,`✅ Pays for itself in ${r.payback} years — then it's free`,`✅ Claim up to 25% of panel cost back from SARS`,`✅ Property value increases R50k–R150k`].map(txt=>(
          <div key={txt} style={{fontSize:13,color:t.sub,marginBottom:6,lineHeight:1.6}}>{txt}</div>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:10}}>
        <PBtn onClick={goInstallers}>Browse Verified Installers →</PBtn>
        <button style={{background:"transparent",color:t.sub,border:`1px solid ${t.border}`,borderRadius:30,padding:"12px 20px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:B,width:"100%"}}>📱 WhatsApp My Results</button>
      </div>
      <div style={{textAlign:"center"}}><button onClick={onReset} style={{background:"none",border:"none",color:t.sub,cursor:"pointer",fontSize:13,textDecoration:"underline",fontFamily:B}}>← Recalculate</button></div>
    </div>
  );
}

function Installers(){
  const t=useT();const sc=useScreen();
  const[search,setSearch]=useState("");const[prov,setProv]=useState("All");const[spec,setSpec]=useState("All");
  const[brand,setBrand]=useState("All");const[sessaOnly,setSessaOnly]=useState(false);const[verOnly,setVerOnly]=useState(false);
  const[sortBy,setSortBy]=useState("rating");const[open,setOpen]=useState(null);const[showF,setShowF]=useState(false);
  const filtered=INSTALLERS.filter(i=>{
    if(search&&!i.name.toLowerCase().includes(search.toLowerCase())&&!i.city.toLowerCase().includes(search.toLowerCase()))return false;
    if(prov!=="All"&&i.prov!==prov)return false;if(spec!=="All"&&i.spec!==spec)return false;
    if(brand!=="All"&&!i.brands.includes(brand))return false;if(sessaOnly&&!i.sessa)return false;if(verOnly&&!i.verified)return false;
    return true;
  }).sort((a,b)=>sortBy==="rating"?b.rating-a.rating:sortBy==="reviews"?b.rev-a.rev:sortBy==="jobs"?b.jobs-a.jobs:b.yrs-a.yrs);
  const ac=[prov!=="All",spec!=="All",brand!=="All",sessaOnly,verOnly].filter(Boolean).length;
  const clearAll=()=>{setProv("All");setSpec("All");setBrand("All");setSessaOnly(false);setVerOnly(false);};
  const selStyle={width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:8,padding:"9px 10px",color:t.text,fontSize:13,outline:"none",fontFamily:B};
  return(
    <div>
      <Lbl>Installer Directory</Lbl>
      <h2 style={{fontFamily:H,fontSize:sc.isMobile?28:34,letterSpacing:2,color:t.text,marginBottom:5}}>Verified SA Installers</h2>
      <p style={{color:t.sub,fontSize:14,marginBottom:16}}>SESSA-accredited solar installers with real reviews from SA homeowners</p>
      <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:sc.isMobile?"100%":160,position:"relative"}}>
          <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",fontSize:13,color:t.sub,pointerEvents:"none"}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or city..."
            style={{...selStyle,paddingLeft:32,borderRadius:10,padding:"10px 12px 10px 32px"}}/>
        </div>
        <button onClick={()=>setShowF(o=>!o)} style={{background:showF||ac>0?`rgba(${t.rgb},.12)`:t.bgCard,border:`1px solid ${showF||ac>0?`rgba(${t.rgb},.4)`:t.border}`,color:showF||ac>0?t.accent:t.sub,borderRadius:10,padding:"10px 14px",cursor:"pointer",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:6,fontFamily:B}}>
          ⚙️ Filters {ac>0&&<span style={{background:t.accent,color:t.dark?"#000":"#fff",borderRadius:"50%",width:17,height:17,fontSize:10,display:"inline-flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>{ac}</span>}
        </button>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{...selStyle,width:"auto",padding:"10px 12px",borderRadius:10}}>
          <option value="rating">Top Rated</option><option value="reviews">Most Reviews</option>
          <option value="jobs">Most Jobs</option><option value="experience">Experience</option>
        </select>
      </div>
      {showF&&(
        <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:13,padding:"15px 16px",marginBottom:12,animation:"fadeUp .2s ease"}}>
          <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":"repeat(3,1fr)",gap:10,marginBottom:12}}>
            <div><div style={{fontSize:10,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:5,fontWeight:700}}>Province</div><select value={prov} onChange={e=>setProv(e.target.value)} style={selStyle}>{PROVS.map(p=><option key={p}>{p}</option>)}</select></div>
            <div><div style={{fontSize:10,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:5,fontWeight:700}}>Specialty</div><select value={spec} onChange={e=>setSpec(e.target.value)} style={selStyle}>{SPECS.map(s=><option key={s}>{s}</option>)}</select></div>
            <div><div style={{fontSize:10,color:t.sub,textTransform:"uppercase",letterSpacing:1.5,marginBottom:5,fontWeight:700}}>Brand</div><select value={brand} onChange={e=>setBrand(e.target.value)} style={selStyle}>{BRANDS.map(b=><option key={b}>{b}</option>)}</select></div>
          </div>
          <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"center"}}>
            {[["SESSA only",sessaOnly,setSessaOnly],["Verified only",verOnly,setVerOnly]].map(([lbl,val,fn])=>(
              <label key={lbl} style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer"}}>
                <input type="checkbox" checked={val} onChange={e=>fn(e.target.checked)} style={{accentColor:t.accent,width:15,height:15}}/>
                <span style={{fontSize:13,color:t.textMid,fontFamily:B}}>{lbl}</span>
              </label>
            ))}
            {ac>0&&<button onClick={clearAll} style={{marginLeft:"auto",background:"none",border:"none",color:t.accent,cursor:"pointer",fontSize:13,fontWeight:700,fontFamily:B}}>Clear all</button>}
          </div>
        </div>
      )}
      <div style={{fontSize:12,color:t.sub,marginBottom:12,fontFamily:B}}>{filtered.length===0?"No installers match.":`Showing ${filtered.length} installer${filtered.length!==1?"s":""}`}{ac>0&&<span style={{color:t.accent}}> · filtered</span>}</div>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {filtered.length===0?(
          <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:13,padding:"28px",textAlign:"center"}}>
            <div style={{fontSize:28,marginBottom:8}}>🔍</div>
            <div style={{fontFamily:H,fontSize:18,letterSpacing:1,color:t.text,marginBottom:5}}>No Results Found</div>
            <button onClick={()=>{clearAll();setSearch("");}} style={{background:`rgba(${t.rgb},.1)`,border:`1px solid rgba(${t.rgb},.3)`,color:t.accent,borderRadius:10,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B}}>Clear All Filters</button>
          </div>
        ):filtered.map((inst,i)=>(
          <div key={inst.id} style={{background:open===inst.id?`rgba(${t.rgb},.04)`:t.bgCard,border:`1px solid ${open===inst.id?`rgba(${t.rgb},.28)`:t.border}`,borderRadius:14,padding:"15px 16px",cursor:"pointer",transition:"all .2s",animation:`fadeUp .3s ease ${i*.04}s both`}}
            onClick={()=>setOpen(open===inst.id?null:inst.id)}
            onMouseEnter={e=>{if(open!==inst.id)e.currentTarget.style.borderColor=`rgba(${t.rgb},.2)`;}}
            onMouseLeave={e=>{if(open!==inst.id)e.currentTarget.style.borderColor=t.border;}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
              <div style={{width:40,height:40,borderRadius:10,background:`rgba(${t.rgb},.1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>🏢</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3,flexWrap:"wrap"}}>
                  <span style={{fontFamily:H,fontSize:16,letterSpacing:.5,color:t.text}}>{inst.name}</span>
                  {inst.badge&&<Tag>{inst.badge}</Tag>}
                  {inst.sessa&&<Tag color="#22c55e">✓ SESSA</Tag>}
                  {inst.verified&&<Tag color="#60a5fa">✓ Verified</Tag>}
                </div>
                <div style={{fontSize:11,color:t.sub,marginBottom:4,fontFamily:B}}>{inst.city}, {inst.prov} · {inst.yrs} yrs exp</div>
                <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
                  <Stars n={inst.rating}/><span style={{fontSize:11,color:t.sub}}> ({inst.rev})</span>
                  <span style={{fontSize:11,color:t.sub}}>⚡ {inst.resp}</span>
                  {!sc.isMobile&&<span style={{fontSize:11,color:t.sub}}>💰 {inst.price}</span>}
                </div>
              </div>
              <span style={{fontSize:14,color:t.sub,transition:"transform .2s",transform:open===inst.id?"rotate(90deg)":"none",flexShrink:0}}>›</span>
            </div>
            {open===inst.id&&(
              <div style={{marginTop:13,paddingTop:13,borderTop:`1px solid ${t.border}`,animation:"fadeUp .25s ease"}}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:7,marginBottom:12}}>
                  {[["Specialty",inst.spec],["Experience",`${inst.yrs} years`],["Response",inst.resp],["Price Range",inst.price],["Jobs",`${inst.jobs}+`],["SESSA",inst.sessa?"Certified":"No"]].map(([l,v])=>(
                    <div key={l} style={{background:t.bgCard2,borderRadius:8,padding:"8px 9px"}}>
                      <div style={{fontSize:9,color:t.sub,marginBottom:2}}>{l}</div>
                      <div style={{fontSize:11,fontWeight:700,color:t.textMid,fontFamily:B}}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",flexDirection:sc.isMobile?"column":"row",gap:8}}>
                  <PBtn sm style={{flex:1,borderRadius:9,padding:"10px"}}>Request Quote</PBtn>
                  <button style={{background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.28)",color:"#25d366",borderRadius:9,padding:"10px 14px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B}}>📱 WhatsApp</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{marginTop:18,background:`linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`,border:`1px solid rgba(${t.rgb},.18)`,borderRadius:14,padding:"18px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <div style={{fontSize:28}}>📋</div>
          <div style={{flex:1}}><div style={{fontFamily:H,fontSize:17,letterSpacing:1,color:t.text,marginBottom:2}}>Installer? Generate PDF Proposals</div><div style={{fontSize:13,color:t.sub}}>Branded quotes from SolarIQ results. <span style={{color:t.accent,fontWeight:700}}>Coming soon.</span></div></div>
          <button style={{background:t.bgCard,border:`1px solid rgba(${t.rgb},.3)`,color:t.accent,borderRadius:10,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",fontFamily:B}}>Join Waitlist →</button>
        </div>
      </div>
      <div style={{marginTop:9,background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 16px",textAlign:"center"}}>
        <span style={{fontSize:13,color:t.sub,fontFamily:B}}>Are you a solar installer? </span>
        <button style={{background:"none",border:"none",color:t.accent,cursor:"pointer",fontSize:13,fontWeight:700,fontFamily:B}}>List your business free →</button>
      </div>
    </div>
  );
}

function Servicing(){
  const t=useT();const sc=useScreen();
  const[page,setPage]=useState("home");const[errCode,setErrCode]=useState("");const[errRes,setErrRes]=useState(null);
  const[hAns,setHAns]=useState({});const[hStep,setHStep]=useState(0);const[hResult,setHResult]=useState(null);const[tProv,setTProv]=useState("All");
  const lookupErr=()=>{const c=errCode.trim().toUpperCase();const m=ERRORS[c];setErrRes(m?{...m,code:c}:{notFound:true,code:c});};
  const calcHealth=()=>{
    const sc={age:[0,5,15,25],perf:[0,10,25,5],snd:[0,10,25,40],err:[0,10,25,40],cln:[0,5,20,30],svc:[0,10,30,15]};
    let tot=0;Object.keys(sc).forEach(k=>{const idx=HEALTH_QS.find(q=>q.id===k)?.opts.indexOf(hAns[k]);if(idx>=0)tot+=sc[k][idx]||0;});
    const score=Math.max(0,100-tot);
    setHResult({score,status:score>=80?"Healthy":score>=60?"Needs Attention":score>=40?"Service Required":"Critical — Act Now",color:score>=80?"#4ade80":score>=60?t.accent:score>=40?"#fb923c":"#ef4444",note:score>=80?"System performing well. Schedule annual service within 3 months.":score>=60?"System shows wear. Book an inspection soon.":score>=40?"Book professional service within 2 weeks.":"Possible serious issue. Contact a technician immediately."});
  };
  const reset=()=>{setPage("home");setErrCode("");setErrRes(null);setHAns({});setHStep(0);setHResult(null);};
  if(page==="home")return(
    <div>
      <Lbl>After-Sales Care</Lbl>
      <h2 style={{fontFamily:H,fontSize:sc.isMobile?26:34,letterSpacing:2,color:t.text,marginBottom:5}}>Solar Servicing & Repair</h2>
      <p style={{color:t.sub,fontSize:14,marginBottom:18}}>Keep your system at peak performance — for the lifetime of your investment.</p>
      <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":"repeat(auto-fill,minmax(220px,1fr))",gap:10,marginBottom:14}}>
        {[{id:"health",icon:"🩺",title:"Health Check",desc:"6 questions to diagnose your system.",badge:"AI",color:"#4ade80"},{id:"error",icon:"⚠️",title:"Error Code Translator",desc:"Type any inverter code. Plain English instantly.",badge:"Instant",color:t.accent},{id:"techs",icon:"🔧",title:"Find a Technician",desc:"Verified repair specialists near you.",badge:null,color:"#60a5fa"},{id:"reminder",icon:"📅",title:"Service Reminders",desc:"WhatsApp reminders when service is due.",badge:"Free",color:"#c084fc"}].map((c,i)=>(
          <div key={c.id} onClick={()=>setPage(c.id)} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:14,padding:sc.isMobile?"14px 12px":"18px",cursor:"pointer",transition:"all .22s",position:"relative",animation:`fadeUp .35s ease ${i*.07}s both`}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${c.color}44`;e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
            {c.badge&&<div style={{position:"absolute",top:10,right:10,fontSize:9,background:`${c.color}18`,color:c.color,padding:"2px 7px",borderRadius:8,fontWeight:800}}>{c.badge}</div>}
            <div style={{fontSize:sc.isMobile?22:26,marginBottom:9}}>{c.icon}</div>
            <div style={{fontFamily:H,fontSize:sc.isMobile?15:18,letterSpacing:1,color:t.text,marginBottom:3}}>{c.title}</div>
            <div style={{fontSize:12,color:t.sub,lineHeight:1.5,marginBottom:9}}>{c.desc}</div>
            <div style={{fontSize:12,color:c.color,fontWeight:700}}>Open →</div>
          </div>
        ))}
      </div>
      <div style={{background:"rgba(239,68,68,.06)",border:"1px solid rgba(239,68,68,.15)",borderRadius:12,padding:"13px 16px",display:"flex",alignItems:"center",gap:11}}>
        <span style={{fontSize:20}}>🚨</span>
        <div style={{flex:1}}><div style={{fontFamily:H,fontSize:15,letterSpacing:1,color:"#f87171",marginBottom:1}}>System Completely Offline?</div><div style={{fontSize:12,color:t.sub}}>Emergency technicians available across SA.</div></div>
        <button style={{background:"rgba(239,68,68,.15)",border:"1px solid rgba(239,68,68,.3)",color:"#f87171",borderRadius:9,padding:"8px 12px",fontSize:12,fontWeight:800,cursor:"pointer",whiteSpace:"nowrap",fontFamily:B}}>Emergency</button>
      </div>
    </div>
  );
  if(page==="error")return(
    <div>
      <BackBtn onClick={reset}/>
      <Lbl>Diagnostic Tool</Lbl>
      <h3 style={{fontFamily:H,fontSize:sc.isMobile?24:28,letterSpacing:2,color:t.text,marginBottom:5}}>Error Code Translator</h3>
      <p style={{color:t.sub,fontSize:13,marginBottom:14}}>Type the error code on your inverter. Supports Sunsynk, Victron, Deye, Growatt.</p>
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
              <div style={{fontFamily:H,fontSize:18,letterSpacing:1,color:t.text,marginBottom:4}}>Code "{errRes.code}" Not Found Yet</div>
              <div style={{fontSize:13,color:t.sub,marginBottom:12}}>We add new codes daily. A technician can diagnose this right away.</div>
              <button onClick={()=>setPage("techs")} style={{background:`rgba(${t.rgb},.1)`,border:`1px solid rgba(${t.rgb},.3)`,color:t.accent,borderRadius:10,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B}}>Find a Technician →</button>
            </div>
          ):(
            <>
              <div style={{background:errRes.sev==="critical"?"rgba(239,68,68,.06)":errRes.sev==="warning"?`rgba(${t.rgb},.06)`:"rgba(96,165,250,.06)",border:`1px solid ${errRes.sev==="critical"?"rgba(239,68,68,.2)":errRes.sev==="warning"?`rgba(${t.rgb},.2)`:"rgba(96,165,250,.2)"}`,borderRadius:13,padding:"18px",marginBottom:9}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <div style={{fontFamily:H,fontSize:26,letterSpacing:2,color:errRes.sev==="critical"?"#ef4444":errRes.sev==="warning"?t.accent:"#60a5fa"}}>{errRes.code}</div>
                  <div><div style={{fontSize:10,color:t.sub,textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>{errRes.brand}</div>
                  <span style={{fontSize:10,background:errRes.sev==="critical"?"rgba(239,68,68,.15)":errRes.sev==="warning"?`rgba(${t.rgb},.15)`:"rgba(96,165,250,.15)",color:errRes.sev==="critical"?"#f87171":errRes.sev==="warning"?t.accent:"#93c5fd",padding:"2px 8px",borderRadius:8,fontWeight:800,textTransform:"uppercase"}}>{errRes.sev}</span></div>
                </div>
                <div style={{fontFamily:H,fontSize:18,letterSpacing:1,color:t.text,marginBottom:8}}>{errRes.title}</div>
                <div style={{fontSize:14,color:t.sub,lineHeight:1.7}}>{errRes.fix}</div>
              </div>
              <div style={{display:"flex",flexDirection:sc.isMobile?"column":"row",gap:8}}>
                <div style={{flex:1,background:errRes.diy?"rgba(74,222,128,.07)":"rgba(239,68,68,.07)",border:`1px solid ${errRes.diy?"rgba(74,222,128,.2)":"rgba(239,68,68,.2)"}`,borderRadius:10,padding:"10px 13px",display:"flex",alignItems:"center",gap:8}}>
                  <span>{errRes.diy?"✅":"⚠️"}</span>
                  <span style={{fontSize:12,color:errRes.diy?"#4ade80":"#f87171",fontWeight:600,fontFamily:B}}>{errRes.diy?"You can resolve this yourself":"Requires a qualified technician"}</span>
                </div>
                {!errRes.diy&&<PBtn sm onClick={()=>setPage("techs")} style={{borderRadius:10,width:"auto",padding:"10px 16px"}}>Find Technician →</PBtn>}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
  if(page==="health"){
    if(hResult)return(
      <div style={{animation:"fadeUp .5s ease"}}>
        <BackBtn onClick={()=>{setHResult(null);setHAns({});setHStep(0);}}/>
        <div style={{textAlign:"center",marginBottom:22}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:`${hResult.color}18`,border:`3px solid ${hResult.color}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 11px",flexDirection:"column"}}>
            <div style={{fontFamily:H,fontSize:22,color:hResult.color}}>{hResult.score}</div>
            <div style={{fontSize:9,color:hResult.color,fontWeight:700}}>/100</div>
          </div>
          <div style={{fontFamily:H,fontSize:24,letterSpacing:2,color:hResult.color,marginBottom:4}}>{hResult.status}</div>
          <p style={{color:t.sub,fontSize:14,maxWidth:340,margin:"0 auto",lineHeight:1.7}}>{hResult.note}</p>
        </div>
        <div style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:12,padding:"14px",marginBottom:13}}>
          {[["Panel Efficiency",hResult.score*.3+60,"#f5a623"],["Battery Health",hResult.score*.4+50,"#4ade80"],["Inverter Status",hResult.score*.5+45,"#60a5fa"]].map(([l,v,c])=>(
            <div key={l} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,color:t.sub}}>{l}</span><span style={{fontSize:12,fontWeight:700,color:c}}>{Math.min(100,Math.round(v))}%</span></div>
              <div style={{height:4,background:`rgba(128,128,128,.15)`,borderRadius:2}}><div style={{width:`${Math.min(100,v)}%`,height:"100%",background:c,borderRadius:2,transition:"width .8s ease"}}/></div>
            </div>
          ))}
        </div>
        <PBtn onClick={()=>setPage("techs")}>Book a Professional Service →</PBtn>
      </div>
    );
    const q=HEALTH_QS[hStep];
    return(
      <div>
        <BackBtn onClick={()=>hStep===0?reset():setHStep(s=>s-1)}/>
        <div style={{display:"flex",gap:4,marginBottom:18}}>{HEALTH_QS.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=hStep?t.accent:`rgba(${t.rgb},.15)`,transition:"background .3s"}}/>)}</div>
        <div key={hStep} style={{animation:"fadeUp .3s ease"}}>
          <Lbl>Question {hStep+1} of {HEALTH_QS.length}</Lbl>
          <h3 style={{fontFamily:H,fontSize:sc.isMobile?20:24,letterSpacing:1,color:t.text,marginBottom:14,lineHeight:1.2}}>{q.q}</h3>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {q.opts.map(o=>{const sel=hAns[q.id]===o;return <button key={o} onClick={()=>{const na={...hAns,[q.id]:o};setHAns(na);if(hStep<HEALTH_QS.length-1)setTimeout(()=>setHStep(s=>s+1),200);else setTimeout(calcHealth,200);}} style={{background:sel?`rgba(${t.rgb},.1)`:t.bgCard,border:`1px solid ${sel?t.accent:t.border}`,borderRadius:10,padding:"12px 15px",cursor:"pointer",textAlign:"left",fontSize:14,color:sel?t.accent:t.sub,fontWeight:sel?700:400,transition:"all .2s",fontFamily:B}}>{o}</button>;})}
          </div>
        </div>
      </div>
    );
  }
  if(page==="techs"){
    const list=TECHS.filter(x=>tProv==="All"||x.prov===tProv);
    return(
      <div>
        <BackBtn onClick={reset}/>
        <Lbl>Repair Specialists</Lbl>
        <h3 style={{fontFamily:H,fontSize:sc.isMobile?22:26,letterSpacing:2,color:t.text,marginBottom:4}}>Find a Technician</h3>
        <div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap"}}>
          {["All","Gauteng","Western Cape","KwaZulu-Natal"].map(p=><button key={p} onClick={()=>setTProv(p)} style={{background:tProv===p?`rgba(${t.rgb},.12)`:t.bgCard,border:`1px solid ${tProv===p?`rgba(${t.rgb},.4)`:t.border}`,color:tProv===p?t.accent:t.sub,borderRadius:20,padding:"6px 13px",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:B}}>{p}</button>)}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {list.map((tech,i)=>(
            <div key={tech.id} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:13,padding:"14px 16px",animation:`fadeUp .35s ease ${i*.07}s both`}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:9}}>
                <div style={{width:38,height:38,borderRadius:9,background:`rgba(${t.rgb},.1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🔧</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2,flexWrap:"wrap"}}>
                    <span style={{fontFamily:H,fontSize:15,letterSpacing:.5,color:t.text}}>{tech.name}</span>
                    {tech.emergency&&<span style={{fontSize:9,background:"rgba(239,68,68,.15)",color:"#f87171",padding:"2px 7px",borderRadius:8,fontWeight:800}}>🚨 24/7</span>}
                  </div>
                  <div style={{fontSize:12,color:t.sub,fontFamily:B}}>{tech.spec} · {tech.prov}</div>
                  <Stars n={tech.rating}/><span style={{fontSize:11,color:t.sub}}> ({tech.rev})</span>
                </div>
                <div style={{fontFamily:H,fontSize:15,letterSpacing:1,color:t.accent,flexShrink:0}}>{tech.price}</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <PBtn sm style={{flex:1,borderRadius:9,padding:"9px"}}>Book Service</PBtn>
                <button style={{background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.25)",color:"#25d366",borderRadius:9,padding:"9px 13px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:B}}>WhatsApp</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if(page==="reminder")return(
    <div>
      <BackBtn onClick={reset}/>
      <Lbl>Free Service</Lbl>
      <h3 style={{fontFamily:H,fontSize:sc.isMobile?22:26,letterSpacing:2,color:t.text,marginBottom:5}}>Service Reminders</h3>
      <p style={{color:t.sub,fontSize:14,marginBottom:16}}>Register once. We'll WhatsApp you when service is due.</p>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
        {[["Your name","text","John Smith"],["WhatsApp number","tel","+27 82 000 0000"],["System size","text","e.g. 5kW"],["Installation date","date",""],["Inverter brand","text","e.g. Sunsynk, Victron, Deye"]].map(([l,tp,ph])=>(
          <div key={l}>
            <label style={{fontSize:11,color:t.sub,textTransform:"uppercase",letterSpacing:1.2,display:"block",marginBottom:4,fontWeight:700}}>{l}</label>
            <input type={tp} placeholder={ph} style={{width:"100%",background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"10px 13px",color:t.text,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:B}}/>
          </div>
        ))}
      </div>
      <PBtn>📱 Register My System Free</PBtn>
      <div style={{fontSize:11,color:t.sub,textAlign:"center",marginTop:8}}>WhatsApp only · No spam · Unsubscribe anytime</div>
    </div>
  );
  return null;
}

function ArticleView({article,onBack}){
  const t=useT();const sc=useScreen();
  const related=article.related.map(id=>ARTICLES.find(a=>a.id===id)).filter(Boolean);
  return(
    <div style={{maxWidth:640,margin:"0 auto",animation:"fadeUp .4s ease"}}>
      <BackBtn onClick={()=>onBack(null)}/>
      <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:12}}>
        <Tag>{article.tag}</Tag>
        {article.hot&&<span style={{fontSize:11,color:"#f87171"}}>🔥 Trending</span>}
        <span style={{fontSize:12,color:t.sub,marginLeft:"auto"}}>{article.min} min · {article.views} views</span>
      </div>
      <h1 style={{fontFamily:H,fontSize:"clamp(24px,5vw,40px)",letterSpacing:1.5,color:t.text,lineHeight:1.1,marginBottom:14}}>{article.title}</h1>
      <p style={{fontSize:15,color:t.textMid,lineHeight:1.85,borderLeft:`3px solid ${t.accent}`,paddingLeft:14,marginBottom:22,fontStyle:"italic"}}>{article.intro}</p>
      <div style={{height:1,background:`linear-gradient(90deg,${t.accent},transparent)`,marginBottom:24,opacity:.4}}/>
      <div style={{display:"flex",flexDirection:"column",gap:22,marginBottom:30}}>
        {article.body.map((sec,i)=>(
          <div key={i}>
            <h2 style={{fontFamily:H,fontSize:sc.isMobile?18:21,letterSpacing:1,color:t.text,marginBottom:8}}>{sec.h}</h2>
            <p style={{fontSize:15,color:t.textMid,lineHeight:1.85}}>{sec.p}</p>
          </div>
        ))}
      </div>
      <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.1),rgba(${t.rgb},.04))`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:14,padding:"18px",textAlign:"center",marginBottom:26}}>
        <div style={{fontFamily:H,fontSize:18,letterSpacing:1.5,color:t.text,marginBottom:4}}>Ready to Calculate Your System?</div>
        <p style={{color:t.sub,fontSize:13,marginBottom:13}}>Free calculator — personalised result in under 2 minutes.</p>
        <PBtn sm style={{width:"auto",padding:"10px 24px"}}>☀️ Calculate My System</PBtn>
      </div>
      {related.length>0&&(
        <div>
          <div style={{fontFamily:H,fontSize:17,letterSpacing:1,color:t.text,marginBottom:11}}>Related Articles</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {related.map(rel=>(
              <div key={rel.id} onClick={()=>onBack(rel)} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:10}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`;e.currentTarget.style.transform="translateX(4px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
                <div style={{flex:1}}><Tag>{rel.tag}</Tag><div style={{fontFamily:H,fontSize:13,letterSpacing:.5,color:t.text,marginTop:4}}>{rel.title}</div></div>
                <span style={{fontSize:14,color:t.sub,flexShrink:0}}>›</span>
              </div>
            ))}
          </div>
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
      <h2 style={{fontFamily:H,fontSize:sc.isMobile?26:34,letterSpacing:2,color:t.text,marginBottom:5}}>Solar Guides & Reviews</h2>
      <p style={{color:t.sub,fontSize:14,marginBottom:16}}>Honest solar content for South Africans. No brand deals. No bias.</p>
      <div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap"}}>
        {tags.map(tg=><button key={tg} onClick={()=>setTag(tg)} style={{background:tag===tg?`rgba(${t.rgb},.13)`:t.bgCard,border:`1px solid ${tag===tg?`rgba(${t.rgb},.4)`:t.border}`,color:tag===tg?t.accent:t.sub,borderRadius:20,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:B}}>{tg}</button>)}
      </div>
      <div onClick={()=>setActive(list[0])} style={{background:`linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`,border:`1px solid rgba(${t.rgb},.15)`,borderRadius:15,padding:"20px",marginBottom:11,cursor:"pointer",transition:"all .2s"}}
        onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`;e.currentTarget.style.transform="translateY(-2px)";}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.15)`;e.currentTarget.style.transform="none";}}>
        <div style={{display:"flex",gap:7,marginBottom:9,alignItems:"center"}}>
          <Tag>FEATURED</Tag>
          {list[0].hot&&<span style={{fontSize:11,color:"#f87171"}}>🔥 {list[0].views} reads</span>}
        </div>
        <h3 style={{fontFamily:H,fontSize:"clamp(16px,3vw,22px)",letterSpacing:1,color:t.text,marginBottom:7,lineHeight:1.2}}>{list[0].title}</h3>
        <p style={{fontSize:13,color:t.sub,lineHeight:1.6,marginBottom:10}}>{list[0].intro}</p>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:12,color:t.sub}}>{list[0].min} min read</span>
          <span style={{fontSize:13,color:t.accent,fontWeight:700}}>Read article →</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr":"repeat(auto-fill,minmax(250px,1fr))",gap:9}}>
        {list.slice(1).map((p,i)=>(
          <div key={p.id} onClick={()=>setActive(p)} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:13,padding:"16px",cursor:"pointer",transition:"all .2s",animation:`fadeUp .35s ease ${i*.07}s both`}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.25)`;e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
            <div style={{display:"flex",gap:6,marginBottom:7,alignItems:"center"}}>
              <Tag>{p.tag}</Tag>{p.hot&&<span style={{fontSize:11,color:"#f87171"}}>🔥</span>}
              <span style={{fontSize:10,color:t.sub,marginLeft:"auto"}}>{p.views}</span>
            </div>
            <h4 style={{fontFamily:H,fontSize:15,letterSpacing:.5,color:t.text,lineHeight:1.3,marginBottom:8}}>{p.title}</h4>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:11,color:t.sub}}>{p.min} min</span>
              <span style={{fontSize:12,color:t.accent,fontWeight:700}}>Read →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App(){
  const prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;
  const[isDark,setIsDark]=useState(prefersDark);
  const[tab,setTab]=useState("home");
  const[res,setRes]=useState(null);
  const sc=useScreen();

  useEffect(()=>{
    const mq=window.matchMedia("(prefers-color-scheme: dark)");
    const handler=e=>setIsDark(e.matches);
    mq.addEventListener("change",handler);
    return()=>mq.removeEventListener("change",handler);
  },[]);

  const t=isDark?DARK:LIGHT;
  const goTab=id=>{setTab(id);if(id!=="result")setRes(null);window.scrollTo({top:0,behavior:"smooth"});};

  const NAV=[{id:"home",l:"Home",icon:"🏠"},{id:"calc",l:"Calculator",icon:"☀️"},{id:"inst",l:"Installers",icon:"🗺️"},{id:"serv",l:"Servicing",icon:"🔧"},{id:"blog",l:"Guides",icon:"📖"}];
  const TICKS=["☀️ Solar tax rebate: claim 25% back from SARS","🔋 Load shedding prep — is your system sized right?","⚙️ Engineer Mode calculator now live","🩺 Free System Health Check — 2 minutes","🔧 Verified repair technicians across SA","📋 Installer proposal generator — coming soon"];

  const css=`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; overflow-x: hidden; }
    body { background: ${t.bg}; transition: background .35s, color .35s; -webkit-text-size-adjust: 100%; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: ${t.accent}; border-radius: 4px; }
    input::placeholder { color: ${isDark?"#444":"#bbb"}; }
    select option { background: ${isDark?"#111":"#fff"}; color: ${t.text}; }
    @keyframes fadeUp  { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
    @keyframes float   { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-5px) } }
    @keyframes glow    { 0%,100% { opacity:.2 } 50% { opacity:.6 } }
    @keyframes ticker  { 0% { transform:translateX(0) } 100% { transform:translateX(-50%) } }
    @keyframes pulse   { 0%,100% { opacity:1 } 50% { opacity:.3 } }
  `;

  return(
    <T.Provider value={t}>
      <style>{css}</style>
      <div style={{fontFamily:B,background:t.bg,minHeight:"100vh",color:t.text,transition:"background .35s,color .35s",overflowX:"hidden"}}>

        {/* Ticker — hidden on mobile to save space */}
        {!sc.isMobile&&(
          <div style={{background:`rgba(${t.rgb},.05)`,borderBottom:`1px solid rgba(${t.rgb},.1)`,height:26,overflow:"hidden",display:"flex",alignItems:"center"}}>
            <div style={{display:"flex",animation:"ticker 36s linear infinite",whiteSpace:"nowrap"}}>
              {[...TICKS,...TICKS].map((x,i)=><span key={i} style={{fontSize:10,color:t.accent,marginRight:52,opacity:.75,fontWeight:600}}>{x}</span>)}
            </div>
          </div>
        )}

        {/* Top Nav — desktop only */}
        {!sc.isMobile&&(
          <nav style={{background:t.navBg,backdropFilter:"blur(20px)",borderBottom:`1px solid ${t.border}`,padding:"0 20px",position:"sticky",top:0,zIndex:200}}>
            <div style={{maxWidth:1160,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:52}}>
              <div onClick={()=>goTab("home")} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",flexShrink:0}}>
                <div style={{width:26,height:26,background:`linear-gradient(135deg,${t.accent},${t.accent2})`,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,animation:"float 3s ease infinite"}}>☀️</div>
                <span style={{fontFamily:H,fontSize:20,letterSpacing:2,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></span>
                <span style={{fontSize:9,background:`rgba(${t.rgb},.15)`,color:t.accent,padding:"1px 6px",borderRadius:8,fontWeight:800,letterSpacing:1}}>BETA</span>
              </div>
              <div style={{display:"flex",gap:2}}>
                {NAV.map(x=><button key={x.id} onClick={()=>goTab(x.id)} style={{background:tab===x.id?`rgba(${t.rgb},.08)`:"none",border:`1px solid ${tab===x.id?`rgba(${t.rgb},.22)`:"transparent"}`,color:tab===x.id?t.accent:t.sub,padding:"5px 12px",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:600,transition:"all .2s",fontFamily:B}}>{x.l}</button>)}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <button onClick={()=>setIsDark(d=>!d)} style={{background:`rgba(${t.rgb},.1)`,border:`1px solid rgba(${t.rgb},.25)`,borderRadius:8,padding:"6px 11px",cursor:"pointer",fontSize:13}}>{isDark?"🌤️":"🌑"}</button>
                <PBtn sm style={{borderRadius:7,padding:"7px 14px",fontSize:12,width:"auto"}}>📧 Newsletter</PBtn>
              </div>
            </div>
          </nav>
        )}

        {/* Mobile top bar */}
        {sc.isMobile&&(
          <div style={{background:t.navBg,backdropFilter:"blur(20px)",borderBottom:`1px solid ${t.border}`,padding:"0 16px",position:"sticky",top:0,zIndex:200,height:50,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div onClick={()=>goTab("home")} style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer"}}>
              <div style={{width:24,height:24,background:`linear-gradient(135deg,${t.accent},${t.accent2})`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>☀️</div>
              <span style={{fontFamily:H,fontSize:18,letterSpacing:2,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></span>
            </div>
            <button onClick={()=>setIsDark(d=>!d)} style={{background:`rgba(${t.rgb},.1)`,border:`1px solid rgba(${t.rgb},.25)`,borderRadius:7,padding:"5px 10px",cursor:"pointer",fontSize:13}}>{isDark?"🌤️":"🌑"}</button>
          </div>
        )}

        {/* Ambient glow — desktop only */}
        {!sc.isMobile&&<div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"70vw",height:280,background:`radial-gradient(ellipse,${t.glow} 0%,transparent 70%)`,pointerEvents:"none",animation:"glow 5s ease infinite"}}/>}

        {/* Main content */}
        <div style={{maxWidth:1160,margin:"0 auto",padding:sc.isMobile?"16px 14px 100px":sc.isTablet?"24px 20px 60px":"36px 28px 60px",position:"relative",width:"100%"}}>

          {/* HOME */}
          {tab==="home"&&(
            <div style={{animation:"fadeUp .5s ease"}}>
              {/* Hero */}
              <div style={{display:"grid",gridTemplateColumns:sc.isDesktop?"1fr 1fr":"1fr",gap:sc.isDesktop?48:32,alignItems:"center",marginBottom:sc.isMobile?32:48}}>
                <div>
                  <div style={{display:"inline-flex",alignItems:"center",gap:7,background:`rgba(${t.rgb},.08)`,border:`1px solid rgba(${t.rgb},.2)`,borderRadius:20,padding:"5px 13px",marginBottom:16}}>
                    <span style={{width:6,height:6,borderRadius:"50%",background:t.accent,display:"inline-block",animation:"pulse 2s infinite"}}/>
                    <span style={{fontSize:10,color:t.accent,fontWeight:700,letterSpacing:1}}>SA'S SOLAR INTELLIGENCE PLATFORM</span>
                  </div>
                  <h1 style={{fontFamily:H,fontSize:"clamp(36px,8vw,60px)",letterSpacing:2,lineHeight:1.0,marginBottom:14,color:t.text}}>
                    From Research<br/>To Install<br/><span style={{color:t.accent}}>To Lifetime Care.</span>
                  </h1>
                  <p style={{fontSize:sc.isMobile?14:15,color:t.sub,lineHeight:1.8,marginBottom:20,maxWidth:400}}>The only platform SA solar owners need — calculate, install, maintain, repair. Free. Always.</p>
                  <div style={{display:"flex",flexDirection:"column",gap:9,maxWidth:360}}>
                    <PBtn onClick={()=>goTab("calc")}>☀️ Calculate My System</PBtn>
                    <button onClick={()=>goTab("serv")} style={{background:`rgba(${t.rgb},.08)`,border:`1px solid rgba(${t.rgb},.2)`,color:t.accent,borderRadius:30,padding:"12px 20px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:B,width:"100%"}}>🔧 Service My Solar</button>
                  </div>
                  <div style={{display:"flex",gap:sc.isMobile?16:24,marginTop:20,flexWrap:"wrap"}}>
                    {[["4","Calc modes"],["R0","Always free"],["🇿🇦","SA built"],["24/7","Support"]].map(([v,l])=>(
                      <div key={l}><div style={{fontFamily:H,fontSize:18,letterSpacing:1,color:t.text}}>{v}</div><div style={{fontSize:10,color:t.sub,marginTop:1}}>{l}</div></div>
                    ))}
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  {[{icon:"✨",l:"Quick Calculator",s:"4 simple questions — 60 seconds",tab:"calc"},{icon:"⚙️",l:"Engineer Mode",s:"Full kW/kWh/Ah technical inputs",tab:"calc"},{icon:"🗺️",l:"Installer Directory",s:"SESSA-accredited, verified",tab:"inst"},{icon:"🩺",l:"Health Check",s:"AI-powered system diagnostic",tab:"serv",badge:"AI"},{icon:"⚠️",l:"Error Code Translator",s:"Plain English inverter explanations",tab:"serv"},{icon:"🔧",l:"Find a Technician",s:"Repair specialists near you",tab:"serv"}].map((x,i)=>(
                    <div key={x.l} onClick={()=>goTab(x.tab)} style={{display:"flex",alignItems:"center",gap:10,background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:10,padding:"10px 13px",cursor:"pointer",transition:"all .2s",animation:`fadeUp .4s ease ${i*.05}s both`}}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${t.rgb},.3)`;e.currentTarget.style.transform="translateX(4px)";}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="none";}}>
                      <div style={{width:30,height:30,borderRadius:8,background:`rgba(${t.rgb},.08)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{x.icon}</div>
                      <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:1}}>{x.l}</div><div style={{fontSize:11,color:t.sub}}>{x.s}</div></div>
                      {x.badge&&<span style={{fontSize:9,background:`rgba(${t.rgb},.12)`,color:t.accent,padding:"2px 6px",borderRadius:7,fontWeight:800,flexShrink:0}}>{x.badge}</span>}
                      <span style={{fontSize:13,color:t.sub}}>›</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Journey steps */}
              <div style={{marginBottom:28}}>
                <div style={{textAlign:"center",marginBottom:18}}>
                  <Lbl center>Your Solar Journey</Lbl>
                  <h2 style={{fontFamily:H,fontSize:sc.isMobile?22:28,letterSpacing:1.5,color:t.text}}>SolarIQ is with you at every stage</h2>
                </div>
                <div style={{display:"grid",gridTemplateColumns:sc.isMobile?"1fr 1fr":"repeat(5,1fr)",gap:9}}>
                  {[{n:"01",l:"Research",icon:"🔍",d:"Calculate what you need",c:t.accent},{n:"02",l:"Compare",icon:"⚖️",d:"Find the best installers",c:t.accent2},{n:"03",l:"Install",icon:"⚡",d:"Accredited professionals",c:"#4ade80"},{n:"04",l:"Maintain",icon:"🔧",d:"Reminders & cleaning",c:"#60a5fa"},{n:"05",l:"Repair",icon:"🩺",d:"Error codes & health checks",c:"#c084fc"}].map((s,i)=>(
                    <div key={s.n} style={{background:t.bgCard,border:`1px solid ${t.border}`,borderRadius:12,padding:"14px 12px",animation:`fadeUp .4s ease ${i*.07}s both`}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:7}}>
                        <span style={{fontFamily:H,fontSize:10,color:s.c,opacity:.4}}>{s.n}</span>
                        <div style={{flex:1,height:1,background:`${s.c}20`}}/>
                        <span style={{fontSize:14}}>{s.icon}</span>
                      </div>
                      <div style={{fontFamily:H,fontSize:14,letterSpacing:.5,color:s.c,marginBottom:3}}>{s.l}</div>
                      <div style={{fontSize:11,color:t.sub,lineHeight:1.5}}>{s.d}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div style={{background:`linear-gradient(135deg,rgba(${t.rgb},.08),rgba(${t.rgb},.03))`,border:`1px solid rgba(${t.rgb},.15)`,borderRadius:16,padding:sc.isMobile?"20px":"28px",textAlign:"center"}}>
                <div style={{fontSize:24,marginBottom:8}}>📬</div>
                <h3 style={{fontFamily:H,fontSize:sc.isMobile?20:24,letterSpacing:1.5,color:t.text,marginBottom:5}}>SA's Only Solar Newsletter</h3>
                <p style={{color:t.sub,fontSize:14,marginBottom:16,lineHeight:1.7}}>Weekly solar deals, maintenance tips and load shedding updates.</p>
                <div style={{display:"flex",flexDirection:sc.isMobile?"column":"row",gap:8,justifyContent:"center",maxWidth:360,margin:"0 auto"}}>
                  <input placeholder="your@email.com" style={{flex:1,background:t.inputBg,border:`1px solid ${t.border}`,borderRadius:9,padding:"10px 13px",color:t.text,fontSize:14,outline:"none",fontFamily:B,width:"100%"}}/>
                  <PBtn sm style={{borderRadius:9,width:sc.isMobile?"100%":"auto",padding:"10px 18px"}}>Subscribe Free</PBtn>
                </div>
              </div>
            </div>
          )}

          {tab==="calc"&&!res&&<div style={{maxWidth:680,margin:"0 auto"}}><Calculator onResult={r=>{setRes(r);setTab("result");}}/></div>}
          {tab==="result"&&res&&<div style={{maxWidth:680,margin:"0 auto"}}><Results r={res} onReset={()=>{setRes(null);setTab("home");}} goInstallers={()=>goTab("inst")}/></div>}
          {tab==="inst"&&<Installers/>}
          {tab==="serv"&&<div style={{maxWidth:680,margin:"0 auto"}}><Servicing/></div>}
          {tab==="blog"&&<Blog/>}
        </div>

        {/* Footer */}
        <div style={{borderTop:`1px solid ${t.border}`,padding:"18px 20px",textAlign:"center",paddingBottom:sc.isMobile?80:18}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,marginBottom:4}}>
            <span>☀️</span><span style={{fontFamily:H,fontSize:15,letterSpacing:2,color:t.text}}>Solar<span style={{color:t.accent}}>IQ</span></span>
          </div>
          <div style={{fontSize:12,color:t.sub}}>South Africa's complete solar platform. 🇿🇦</div>
        </div>

        {/* Mobile bottom nav */}
        {sc.isMobile&&(
          <div style={{position:"fixed",bottom:0,left:0,right:0,background:t.navBg,backdropFilter:"blur(20px)",borderTop:`1px solid ${t.border}`,display:"flex",zIndex:200,paddingBottom:"env(safe-area-inset-bottom,0px)"}}>
            {NAV.map(x=>(
              <button key={x.id} onClick={()=>goTab(x.id)} style={{flex:1,background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 4px",cursor:"pointer",gap:3,transition:"all .2s"}}>
                <span style={{fontSize:16,filter:tab===x.id?"none":"grayscale(1)",opacity:tab===x.id?1:.5}}>{x.icon}</span>
                <span style={{fontSize:9,fontWeight:700,color:tab===x.id?t.accent:t.sub,fontFamily:B,letterSpacing:.3}}>{x.l}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </T.Provider>
  );
}

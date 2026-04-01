import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://intvnxvannltfibguykw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHZueHZhbm5sdGZpYmd1eWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzAwNjgsImV4cCI6MjA5MDA0NjA2OH0.KnPP0-vxXyBYTvHxbXfrH8AKd61u1hWpEO2gpjWnzNE";
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const H = "'Lexend',sans-serif";
const B = "'Plus Jakarta Sans',sans-serif";
const C = {
  bg:"#07090d", card:"rgba(255,255,255,.04)", border:"rgba(255,255,255,.08)",
  accent:"#f5a623", accent2:"#ff6b00", text:"#f0f0f0", sub:"#666",
  green:"#4ade80", red:"#f87171", blue:"#60a5fa", nav:"rgba(7,9,13,.97)"
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{width:100%;min-height:100vh;background:${C.bg};color:${C.text};font-family:${B}}
  ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:${C.accent};border-radius:4px}
  input,textarea,select{outline:none}
  input::placeholder,textarea::placeholder{color:#444}
  @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
`;

// ── PRIMITIVES ───────────────────────────────────────────────
function Btn({children,onClick,variant="primary",sm,disabled,style={}}){
  const bg = variant==="primary"?`linear-gradient(135deg,${C.accent},${C.accent2})`:
             variant==="danger"?"rgba(239,68,68,.15)":
             variant==="success"?"rgba(74,222,128,.15)":"rgba(255,255,255,.06)";
  const color = variant==="primary"?"#000":variant==="danger"?C.red:variant==="success"?C.green:C.text;
  return <button onClick={onClick} disabled={disabled} style={{background:bg,color,border:`1px solid ${variant==="danger"?"rgba(239,68,68,.3)":variant==="success"?"rgba(74,222,128,.3)":"rgba(255,255,255,.08)"}`,borderRadius:8,padding:sm?"6px 14px":"10px 20px",fontSize:sm?12:13,fontWeight:700,cursor:disabled?"not-allowed":"pointer",fontFamily:B,opacity:disabled?.5:1,transition:"all .2s",...style}}>{children}</button>;
}
function Input({label,value,onChange,type="text",placeholder,rows}){
  return(
    <div style={{marginBottom:14}}>
      {label&&<label style={{fontSize:11,color:C.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:5,fontWeight:600}}>{label}</label>}
      {rows?(
        <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows}
          style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 13px",color:C.text,fontSize:13,fontFamily:B,resize:"vertical"}}/>
      ):(
        <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
          style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 13px",color:C.text,fontSize:13,fontFamily:B}}/>
      )}
    </div>
  );
}
function Card({children,style={}}){
  return <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"20px",...style}}>{children}</div>;
}
function Badge({color,children}){
  return <span style={{fontSize:10,fontWeight:700,background:`${color}18`,color,padding:"2px 8px",borderRadius:20,letterSpacing:.5}}>{children}</span>;
}
function Stat({label,value,color,icon}){
  return(
    <Card>
      <div style={{fontSize:22,marginBottom:8}}>{icon}</div>
      <div style={{fontFamily:H,fontSize:28,fontWeight:900,color:color||C.accent,marginBottom:4}}>{value}</div>
      <div style={{fontSize:12,color:C.sub}}>{label}</div>
    </Card>
  );
}

// ── LOGIN ────────────────────────────────────────────────────
function Login({onLogin}){
  const[email,setEmail]=useState("");const[pw,setPw]=useState("");const[err,setErr]=useState("");const[loading,setLoading]=useState(false);
  const login=async()=>{
    setLoading(true);setErr("");
    const{error}=await sb.auth.signInWithPassword({email,password:pw});
    if(error)setErr(error.message);
    else onLogin();
    setLoading(false);
  };
  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:380,animation:"fadeUp .5s ease"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{width:52,height:52,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 16px"}}>☀️</div>
          <div style={{fontFamily:H,fontSize:28,fontWeight:900,color:C.text,marginBottom:4}}>Solar<span style={{color:C.accent}}>IQ</span> Admin</div>
          <div style={{fontSize:13,color:C.sub}}>Aquarian Edge Enterprises</div>
        </div>
        <Card>
          <Input label="Email" value={email} onChange={setEmail} type="email" placeholder="mail4tebello@gmail.com"/>
          <Input label="Password" value={pw} onChange={setPw} type="password" placeholder="••••••••"/>
          {err&&<div style={{fontSize:12,color:C.red,marginBottom:12}}>{err}</div>}
          <Btn onClick={login} disabled={loading} style={{width:"100%"}}>
            {loading?"Signing in...":"Sign In"}
          </Btn>
        </Card>
      </div>
    </div>
  );
}

// ── DASHBOARD ────────────────────────────────────────────────
function Dashboard(){
  const[stats,setStats]=useState({installers:0,leads:0,subscribers:0,posts:0,pending:0,events:0});
  const[recentLeads,setRecentLeads]=useState([]);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    const load=async()=>{
      const[inst,leads,subs,posts,pending,events,recentL]=await Promise.all([
        sb.from("installers").select("id",{count:"exact",head:true}).eq("status","approved"),
        sb.from("leads").select("id",{count:"exact",head:true}),
        sb.from("subscribers").select("id",{count:"exact",head:true}),
        sb.from("posts").select("id",{count:"exact",head:true}).eq("published",true),
        sb.from("installers").select("id",{count:"exact",head:true}).eq("status","pending"),
        sb.from("events").select("id",{count:"exact",head:true}),
        sb.from("leads").select("*,installers(name)").order("created_at",{ascending:false}).limit(5),
      ]);
      setStats({
        installers:inst.count||0,leads:leads.count||0,subscribers:subs.count||0,
        posts:posts.count||0,pending:pending.count||0,events:events.count||0
      });
      setRecentLeads(recentL.data||[]);
      setLoading(false);
    };
    load();
  },[]);

  if(loading)return <div style={{padding:40,textAlign:"center",color:C.sub}}>Loading...</div>;

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{marginBottom:24}}>
        <div style={{fontFamily:H,fontSize:26,fontWeight:900,color:C.text,marginBottom:4}}>Dashboard</div>
        <div style={{fontSize:13,color:C.sub}}>{new Date().toLocaleDateString("en-ZA",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
      </div>
      {stats.pending>0&&(
        <div style={{background:"rgba(245,166,35,.08)",border:"1px solid rgba(245,166,35,.25)",borderRadius:12,padding:"12px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:10}}>
          <span>⚠️</span>
          <span style={{fontSize:13,color:C.accent,fontWeight:600}}>{stats.pending} installer application{stats.pending!==1?"s":""} waiting for review</span>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:12,marginBottom:28}}>
        <Stat label="Live Installers" value={stats.installers} icon="🏢" color={C.accent}/>
        <Stat label="Total Leads" value={stats.leads} icon="📋" color={C.green}/>
        <Stat label="Subscribers" value={stats.subscribers} icon="📬" color={C.blue}/>
        <Stat label="Published Posts" value={stats.posts} icon="📝" color="#c084fc"/>
        <Stat label="Pending Approvals" value={stats.pending} icon="⏳" color={stats.pending>0?C.red:C.sub}/>
        <Stat label="Page Events" value={stats.events} icon="📊" color={C.accent}/>
      </div>
      {recentLeads.length>0&&(
        <Card>
          <div style={{fontFamily:H,fontSize:16,fontWeight:700,color:C.text,marginBottom:16}}>Recent Leads</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {recentLeads.map(l=>(
              <div key={l.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",background:"rgba(255,255,255,.03)",borderRadius:8}}>
                <span style={{fontSize:18}}>👤</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.text}}>{l.name||"Anonymous"}</div>
                  <div style={{fontSize:11,color:C.sub}}>{l.installers?.name||"—"} · {l.system_kw}kW system</div>
                </div>
                <Badge color={l.status==="new"?C.accent:l.status==="converted"?C.green:C.sub}>{l.status}</Badge>
                <div style={{fontSize:11,color:C.sub}}>{new Date(l.created_at).toLocaleDateString("en-ZA")}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ── INSTALLERS MANAGER ───────────────────────────────────────
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

  const loadDocs=async(installerId)=>{
    const{data}=await sb.from("installer_documents").select("*").eq("installer_id",installerId);
    setDocs(data||[]);
  };

  const approve=async(id)=>{
    await sb.from("installers").update({status:"approved"}).eq("id",id);
    load();setSelected(null);
  };
  const reject=async(id)=>{
    await sb.from("installers").update({status:"rejected"}).eq("id",id);
    load();setSelected(null);
  };
  const setSessa=async(id,val)=>{
    await sb.from("installers").update({sessa_verified:val}).eq("id",id);
    load();
  };

  const filtered=installers.filter(i=>filter==="all"||i.status===filter);

  const statusColor=s=>s==="approved"?C.green:s==="pending"?C.accent:s==="rejected"?C.red:C.sub;

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:C.text}}>Installers</div>
        <div style={{display:"flex",gap:6}}>
          {["pending","approved","rejected","all"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?`rgba(245,166,35,.15)`:"rgba(255,255,255,.04)",border:`1px solid ${filter===f?"rgba(245,166,35,.4)":C.border}`,color:filter===f?C.accent:C.sub,borderRadius:20,padding:"5px 14px",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:B,textTransform:"capitalize"}}>{f}</button>
          ))}
        </div>
      </div>

      {loading?<div style={{color:C.sub,textAlign:"center",padding:40}}>Loading...</div>:(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtered.length===0&&<div style={{color:C.sub,textAlign:"center",padding:40}}>No installers in this category</div>}
          {filtered.map(inst=>(
            <Card key={inst.id} style={{cursor:"pointer"}} >
              <div style={{display:"flex",alignItems:"flex-start",gap:12}} onClick={()=>{setSelected(selected?.id===inst.id?null:inst);if(selected?.id!==inst.id)loadDocs(inst.id);}}>
                <div style={{width:44,height:44,background:`rgba(245,166,35,.1)`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🏢</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{fontFamily:H,fontSize:15,fontWeight:700,color:C.text}}>{inst.name}</span>
                    <Badge color={statusColor(inst.status)}>{inst.status}</Badge>
                    {inst.sessa_verified&&<Badge color={C.green}>✓ SESSA</Badge>}
                    {inst.finance_available&&<Badge color="#c084fc">💳 Finance</Badge>}
                  </div>
                  <div style={{fontSize:12,color:C.sub}}>{inst.city}, {inst.province} · {inst.specialty}</div>
                  <div style={{fontSize:11,color:C.sub,marginTop:2}}>Applied {new Date(inst.created_at).toLocaleDateString("en-ZA")}</div>
                </div>
                <span style={{fontSize:14,color:C.sub,transition:"transform .2s",transform:selected?.id===inst.id?"rotate(90deg)":"none"}}>›</span>
              </div>

              {selected?.id===inst.id&&(
                <div style={{marginTop:16,paddingTop:16,borderTop:`1px solid ${C.border}`,animation:"fadeUp .2s ease"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                    {[["Phone",inst.phone],["WhatsApp",inst.whatsapp],["Email",inst.email],["Website",inst.website],["Price",`R${inst.price_min?.toLocaleString()}–R${inst.price_max?.toLocaleString()}`],["Experience",`${inst.years_experience} years`]].map(([l,v])=>v&&(
                      <div key={l}><div style={{fontSize:10,color:C.sub,marginBottom:2,textTransform:"uppercase",letterSpacing:.8}}>{l}</div><div style={{fontSize:13,color:C.text}}>{v}</div></div>
                    ))}
                  </div>
                  {inst.about&&<p style={{fontSize:13,color:C.sub,lineHeight:1.7,marginBottom:16}}>{inst.about}</p>}

                  {/* Documents */}
                  {docs.length>0&&(
                    <div style={{marginBottom:16}}>
                      <div style={{fontSize:11,color:C.sub,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Submitted Documents</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                        {docs.map(d=>(
                          <a key={d.id} href={`${SUPABASE_URL}/storage/v1/object/installer-docs/${d.file_path}`} target="_blank" rel="noopener noreferrer"
                            style={{background:"rgba(255,255,255,.06)",border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 12px",fontSize:11,color:C.accent,fontWeight:600,textDecoration:"none"}}>
                            📄 {d.file_name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {inst.status!=="approved"&&<Btn variant="success" sm onClick={()=>approve(inst.id)}>✓ Approve</Btn>}
                    {inst.status!=="rejected"&&<Btn variant="danger" sm onClick={()=>reject(inst.id)}>✗ Reject</Btn>}
                    <Btn variant="ghost" sm onClick={()=>setSessa(inst.id,!inst.sessa_verified)}>
                      {inst.sessa_verified?"Remove SESSA":"Mark SESSA Verified"}
                    </Btn>
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

// ── BLOG MANAGER ─────────────────────────────────────────────
function BlogManager(){
  const[posts,setPosts]=useState([]);const[loading,setLoading]=useState(true);
  const[editing,setEditing]=useState(null);
  const[form,setForm]=useState({title:"",intro:"",tag:"Guide",body:"",cover_image:"",hot:false,published:false,read_minutes:5,slug:""});

  const load=async()=>{
    setLoading(true);
    const{data}=await sb.from("posts").select("*").order("created_at",{ascending:false});
    setPosts(data||[]);setLoading(false);
  };
  useEffect(()=>{load();},[]);

  const slugify=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

  const startNew=()=>{
    setForm({title:"",intro:"",tag:"Guide",body:"",cover_image:"",hot:false,published:false,read_minutes:5,slug:""});
    setEditing("new");
  };

  const startEdit=p=>{
    setForm({...p,body:JSON.stringify(p.body,null,2)});
    setEditing(p.id);
  };

  const save=async()=>{
    let bodyParsed;
    try{ bodyParsed=JSON.parse(form.body); }
    catch{ bodyParsed=[{h:"Section",p:form.body}]; }
    const payload={...form,body:bodyParsed,slug:form.slug||slugify(form.title),updated_at:new Date().toISOString()};
    if(editing==="new"){
      await sb.from("posts").insert(payload);
    } else {
      await sb.from("posts").update(payload).eq("id",editing);
    }
    setEditing(null);load();
  };

  const togglePublish=async(p)=>{
    await sb.from("posts").update({published:!p.published}).eq("id",p.id);
    load();
  };

  const deletePost=async(id)=>{
    if(confirm("Delete this post?"))await sb.from("posts").delete().eq("id",id);
    load();
  };

  if(editing!==null)return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <button onClick={()=>setEditing(null)} style={{background:"none",border:"none",color:C.sub,cursor:"pointer",fontSize:13,marginBottom:20,fontFamily:B}}>← Back to posts</button>
      <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:C.text,marginBottom:24}}>{editing==="new"?"New Post":"Edit Post"}</div>
      <Card>
        <Input label="Title" value={form.title} onChange={v=>{setForm({...form,title:v,slug:slugify(v)});}} placeholder="How much does solar cost in SA?"/>
        <Input label="Slug (URL)" value={form.slug} onChange={v=>setForm({...form,slug:v})} placeholder="auto-generated from title"/>
        <Input label="Intro" value={form.intro} onChange={v=>setForm({...form,intro:v})} rows={2} placeholder="One-line article summary shown on card"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:14}}>
          <div>
            <label style={{fontSize:11,color:C.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:5,fontWeight:600}}>Tag</label>
            <select value={form.tag} onChange={e=>setForm({...form,tag:e.target.value})} style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 13px",color:C.text,fontSize:13,fontFamily:B}}>
              {["Guide","Comparison","Tax","Maintenance","News","Review"].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <Input label="Read Minutes" value={form.read_minutes} onChange={v=>setForm({...form,read_minutes:parseInt(v)||5})} type="number"/>
          <div style={{paddingTop:22,display:"flex",gap:12}}>
            <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13,color:C.text}}>
              <input type="checkbox" checked={form.hot} onChange={e=>setForm({...form,hot:e.target.checked})} style={{accentColor:C.accent}}/>🔥 Hot
            </label>
            <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13,color:C.text}}>
              <input type="checkbox" checked={form.published} onChange={e=>setForm({...form,published:e.target.checked})} style={{accentColor:C.accent}}/>Published
            </label>
          </div>
        </div>
        <Input label="Cover Image URL" value={form.cover_image||""} onChange={v=>setForm({...form,cover_image:v})} placeholder="https://images.unsplash.com/..."/>
        <Input label="YouTube Video ID (optional)" value={form.youtube_id||""} onChange={v=>setForm({...form,youtube_id:v})} placeholder="dQw4w9WgXcQ"/>
        <Input label="Affiliate URL (optional)" value={form.affiliate_url||""} onChange={v=>setForm({...form,affiliate_url:v})} placeholder="https://..."/>
        <div style={{marginBottom:14}}>
          <label style={{fontSize:11,color:C.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:5,fontWeight:600}}>
            Body Sections (JSON format)
          </label>
          <div style={{fontSize:11,color:C.sub,marginBottom:6}}>Format: {`[{"h":"Section heading","p":"Paragraph text"},...]`}</div>
          <textarea value={form.body} onChange={e=>setForm({...form,body:e.target.value})} rows={10}
            style={{width:"100%",background:"rgba(0,0,0,.3)",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 13px",color:C.text,fontSize:12,fontFamily:"monospace",resize:"vertical"}}/>
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
        <Btn onClick={startNew}>+ New Post</Btn>
      </div>
      {loading?<div style={{color:C.sub,textAlign:"center",padding:40}}>Loading...</div>:(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {posts.map(p=>(
            <Card key={p.id}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                    <span style={{fontFamily:H,fontSize:14,fontWeight:700,color:C.text}}>{p.title}</span>
                    <Badge color={p.tag==="News"?"#f87171":p.tag==="Review"?"#c084fc":C.accent}>{p.tag}</Badge>
                    {p.hot&&<Badge color="#f87171">🔥 Hot</Badge>}
                  </div>
                  <div style={{fontSize:12,color:C.sub}}>
                    {p.published?<span style={{color:C.green}}>● Published</span>:<span style={{color:C.sub}}>○ Draft</span>}
                    {" · "}{p.read_minutes} min{" · "}{new Date(p.created_at).toLocaleDateString("en-ZA")}
                  </div>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <Btn sm variant="ghost" onClick={()=>startEdit(p)}>Edit</Btn>
                  <Btn sm variant={p.published?"ghost":"success"} onClick={()=>togglePublish(p)}>{p.published?"Unpublish":"Publish"}</Btn>
                  <Btn sm variant="danger" onClick={()=>deletePost(p.id)}>Delete</Btn>
                </div>
              </div>
            </Card>
          ))}
          {posts.length===0&&<div style={{color:C.sub,textAlign:"center",padding:40}}>No posts yet. Create your first one.</div>}
        </div>
      )}
    </div>
  );
}

// ── LEADS MANAGER ────────────────────────────────────────────
function LeadsManager(){
  const[leads,setLeads]=useState([]);const[loading,setLoading]=useState(true);

  useEffect(()=>{
    const load=async()=>{
      const{data}=await sb.from("leads").select("*,installers(name)").order("created_at",{ascending:false});
      setLeads(data||[]);setLoading(false);
    };
    load();
  },[]);

  const updateStatus=async(id,status)=>{
    await sb.from("leads").update({status}).eq("id",id);
    setLeads(leads.map(l=>l.id===id?{...l,status}:l));
  };

  const statusColor=s=>s==="new"?C.accent:s==="converted"?C.green:s==="lost"?C.red:C.sub;

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:C.text,marginBottom:20}}>Leads</div>
      {loading?<div style={{color:C.sub,textAlign:"center",padding:40}}>Loading...</div>:(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {leads.map(l=>(
            <Card key={l.id}>
              <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                <div style={{width:40,height:40,background:"rgba(255,255,255,.06)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>👤</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                    <span style={{fontFamily:H,fontSize:14,fontWeight:700,color:C.text}}>{l.name||"Anonymous"}</span>
                    <Badge color={statusColor(l.status)}>{l.status}</Badge>
                  </div>
                  <div style={{fontSize:12,color:C.sub,marginBottom:4}}>
                    {l.email&&<span>{l.email} · </span>}{l.phone&&<span>{l.phone} · </span>}
                    <span>{l.installers?.name||"No installer"}</span>
                  </div>
                  <div style={{fontSize:12,color:C.sub}}>
                    {l.system_kw}kW system · R{l.estimated_cost?.toLocaleString()} est. · {new Date(l.created_at).toLocaleDateString("en-ZA")}
                  </div>
                </div>
                <select value={l.status} onChange={e=>updateStatus(l.id,e.target.value)}
                  style={{background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:8,padding:"5px 10px",color:C.text,fontSize:12,fontFamily:B}}>
                  {["new","contacted","quoted","converted","lost"].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
            </Card>
          ))}
          {leads.length===0&&<div style={{color:C.sub,textAlign:"center",padding:40}}>No leads yet. They'll appear here when installers get quote requests.</div>}
        </div>
      )}
    </div>
  );
}

// ── SUBSCRIBERS MANAGER ──────────────────────────────────────
function SubscribersManager(){
  const[subs,setSubs]=useState([]);const[loading,setLoading]=useState(true);

  useEffect(()=>{
    const load=async()=>{
      const{data}=await sb.from("subscribers").select("*").order("created_at",{ascending:false});
      setSubs(data||[]);setLoading(false);
    };
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
      {loading?<div style={{color:C.sub,textAlign:"center",padding:40}}>Loading...</div>:(
        <Card>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {subs.map(s=>(
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 10px",background:"rgba(255,255,255,.03)",borderRadius:8}}>
                <span style={{fontSize:14}}>📬</span>
                <span style={{flex:1,fontSize:13,color:C.text}}>{s.email}</span>
                <Badge color={s.source==="coming_soon"?C.accent:s.source==="calculator"?C.green:C.blue}>{s.source}</Badge>
                <span style={{fontSize:11,color:C.sub}}>{new Date(s.created_at).toLocaleDateString("en-ZA")}</span>
              </div>
            ))}
            {subs.length===0&&<div style={{color:C.sub,textAlign:"center",padding:20}}>No subscribers yet.</div>}
          </div>
        </Card>
      )}
    </div>
  );
}

// ── SETTINGS ─────────────────────────────────────────────────
function Settings(){
  const[settings,setSettings]=useState({});const[loading,setLoading]=useState(true);const[saved,setSaved]=useState(false);

  useEffect(()=>{
    const load=async()=>{
      const{data}=await sb.from("settings").select("*");
      const map={};(data||[]).forEach(s=>{map[s.key]=s.value;});
      setSettings(map);setLoading(false);
    };
    load();
  },[]);

  const save=async()=>{
    await Promise.all(Object.entries(settings).map(([key,value])=>
      sb.from("settings").upsert({key,value,updated_at:new Date().toISOString()})
    ));
    setSaved(true);setTimeout(()=>setSaved(false),2000);
  };

  if(loading)return <div style={{color:C.sub,textAlign:"center",padding:40}}>Loading...</div>;

  return(
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{fontFamily:H,fontSize:22,fontWeight:900,color:C.text,marginBottom:24}}>Site Settings</div>
      <Card>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
          <div>
            <label style={{fontSize:11,color:C.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:5,fontWeight:600}}>Coming Soon Mode</label>
            <select value={settings.coming_soon_mode||"true"} onChange={e=>setSettings({...settings,coming_soon_mode:e.target.value})}
              style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 13px",color:C.text,fontSize:13,fontFamily:B}}>
              <option value="true">ON — Show coming soon page</option>
              <option value="false">OFF — Show live site</option>
            </select>
          </div>
          <Input label="Launch Date" value={settings.launch_date||""} onChange={v=>setSettings({...settings,launch_date:v})} type="date"/>
          <Input label="Site Name" value={settings.site_name||""} onChange={v=>setSettings({...settings,site_name:v})}/>
          <Input label="Contact Email" value={settings.contact_email||""} onChange={v=>setSettings({...settings,contact_email:v})} type="email"/>
          <div>
            <label style={{fontSize:11,color:C.sub,textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:5,fontWeight:600}}>Eskom Stage</label>
            <select value={settings.eskom_stage||"0"} onChange={e=>setSettings({...settings,eskom_stage:e.target.value})}
              style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 13px",color:C.text,fontSize:13,fontFamily:B}}>
              {["0","1","2","3","4","5","6"].map(s=><option key={s} value={s}>Stage {s}{s==="0"?" (No Load Shedding)":""}</option>)}
            </select>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <Btn onClick={save}>Save Settings</Btn>
          {saved&&<span style={{fontSize:13,color:C.green}}>✓ Saved successfully</span>}
        </div>
      </Card>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────
const NAV=[
  {id:"dashboard",label:"Dashboard",icon:"📊"},
  {id:"installers",label:"Installers",icon:"🏢"},
  {id:"blog",label:"Blog",icon:"📝"},
  {id:"leads",label:"Leads",icon:"📋"},
  {id:"subscribers",label:"Subscribers",icon:"📬"},
  {id:"settings",label:"Settings",icon:"⚙️"},
];

export default function Admin(){
  const[session,setSession]=useState(null);const[loading,setLoading]=useState(true);const[tab,setTab]=useState("dashboard");

  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}})=>{setSession(session);setLoading(false);});
    sb.auth.onAuthStateChange((_,s)=>setSession(s));
  },[]);

  const signOut=async()=>{await sb.auth.signOut();setSession(null);};

  if(loading)return(<><style>{css}</style><div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:C.sub}}>Loading...</div></>);
  if(!session)return(<><style>{css}</style><Login onLogin={()=>sb.auth.getSession().then(({data:{session}})=>setSession(session))}/></>);

  const PAGES={dashboard:<Dashboard/>,installers:<InstallersManager/>,blog:<BlogManager/>,leads:<LeadsManager/>,subscribers:<SubscribersManager/>,settings:<Settings/>};

  return(
    <>
      <style>{css}</style>
      <div style={{display:"flex",minHeight:"100vh"}}>
        {/* Sidebar */}
        <div style={{width:220,background:C.nav,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",position:"fixed",top:0,bottom:0,left:0,zIndex:100}}>
          <div style={{padding:"20px 20px 16px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <div style={{width:28,height:28,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>☀️</div>
              <span style={{fontFamily:H,fontSize:17,fontWeight:900,color:C.text}}>Solar<span style={{color:C.accent}}>IQ</span></span>
            </div>
            <div style={{fontSize:10,color:C.sub,letterSpacing:1}}>ADMIN PANEL</div>
          </div>
          <nav style={{flex:1,padding:"8px 12px"}}>
            {NAV.map(n=>(
              <button key={n.id} onClick={()=>setTab(n.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:9,border:"none",background:tab===n.id?`rgba(245,166,35,.1)`:"transparent",color:tab===n.id?C.accent:C.sub,cursor:"pointer",fontSize:13,fontWeight:tab===n.id?600:400,fontFamily:B,marginBottom:2,transition:"all .2s",textAlign:"left"}}>
                <span style={{fontSize:16}}>{n.icon}</span>{n.label}
              </button>
            ))}
          </nav>
          <div style={{padding:"16px 20px",borderTop:`1px solid ${C.border}`}}>
            <button onClick={signOut} style={{background:"none",border:"none",color:C.sub,cursor:"pointer",fontSize:12,fontFamily:B,display:"flex",alignItems:"center",gap:6}}>
              🚪 Sign Out
            </button>
          </div>
        </div>
        {/* Main content */}
        <div style={{marginLeft:220,flex:1,padding:"32px 36px",maxWidth:1200}}>
          {PAGES[tab]}
        </div>
      </div>
    </>
  );
}

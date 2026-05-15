import { useState, useEffect } from "react";

const START = new Date('2026-05-15T00:00:00');
const RACE  = new Date('2026-07-25T16:00:00');
const TOTAL = 71;

const C = {
  bg:'#0D0B08', surf:'#161210', card:'#1E1A14', border:'#2C2620',
  gold:'#C8A44A', amber:'#C06B2A', green:'#5CA882', blue:'#5A9AC4', purple:'#8B6EA8',
  cream:'#EFE5CE', muted:'#7A6855', dim:'#3D3225', dim2:'#251F17',
};
const TC = {
  RUN_EASY:C.blue, RUN_LONG:C.amber, RUN_STRIDES:C.green,
  RUN_INTERVALS:C.amber, RUN_TEMPO:C.gold, RUN_SIMULACRO:'#D4884A',
  GYM:C.purple, REST:C.dim, RACE:C.gold,
};

const pad = n => String(n).padStart(2,'0');
const MO = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const DE = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

function getDayNum() {
  const n=new Date();n.setHours(0,0,0,0);
  const s=new Date(START);s.setHours(0,0,0,0);
  return Math.max(1,Math.min(72,Math.floor((n-s)/86400000)+1));
}
function getDate(n){const d=new Date(START);d.setDate(d.getDate()+n-1);return d;}
function fmt(d){return `${DE[d.getDay()]} ${d.getDate()} ${MO[d.getMonth()]}`;}

function plan(n) {
  if(n<1||n>72) return null;
  if(n===72) return {type:'RACE',badge:'CARRERA 🏁',label:'CARRERA — 12KM',km:12,pace:'5:30-5:50/km',
    desc:'¡El momento llegó! 4:00pm. Salí conservador los primeros 3km, acelerá en el km 6, dejá todo en los últimos 3km. Confiá en el entrenamiento.'};
  const w=Math.ceil(n/7),d=(n-1)%7;
  if(w<=3){const lk=6+w;return [
    {type:'RUN_EASY',badge:'FÁCIL',label:'Carrera Fácil',km:4,pace:'6:30-7:00/km',desc:'Ritmo conversacional. Si no podés hablar en frases cortas, vas muy rápido. Pisada mediopié, hombros relajados.'},
    {type:'GYM',badge:'GYM',label:'Gimnasio — Superior',desc:'Pecho, bíceps, tríceps, hombros. Core obligatorio: plancha 3×45s, dead bug 3×10, bird dog 3×10.'},
    {type:'RUN_LONG',badge:'LARGO',label:`Run Largo — ${lk}km`,km:lk,pace:'6:45-7:15/km',desc:'El run más importante de la semana. Terminarla es el único objetivo. Sin importar el tiempo. Hidratate cada 20min.'},
    {type:'REST',badge:'REST',label:'Descanso Activo',desc:'Caminata suave 20-30min. Foam roller en pantorrillas y cuádriceps. Dormir 8h mínimo.'},
    {type:'RUN_EASY',badge:'FÁCIL',label:'Carrera Fácil',km:4,pace:'6:30-7:00/km',desc:'Segundo run de la semana. Misma intensidad. Técnica: cadencia alta, pasos cortos, brazos relajados.'},
    {type:'RUN_STRIDES',badge:'STRIDES',label:'Run + Strides — 5km',km:5,pace:'6:20-6:45/km',desc:'4km fácil + 4 strides de 100m al 85% con 60s descanso. Construyen velocidad sin acumular fatiga.'},
    {type:'GYM',badge:'GYM',label:'Gimnasio — Inferior',desc:'Sentadilla, peso muerto, zancadas. Hip thrust 3×15. Band walks 3×15/lado. Plancha 3×45s.'},
  ][d];}
  if(w<=6){const lk={4:10,5:11,6:12}[w],w6=w===6?'¡PRIMERA VEZ EN 12KM! Solo terminarla. Ese logro ya es enorme.':'Ritmo controlado. Empezá conservador. Tomá agua en cada kilómetro.';return [
    {type:'RUN_INTERVALS',badge:'INTERVALOS',label:'Intervalos — 6×400m',desc:'2km calentamiento → 6×400m a 5:00-5:20/km con 90s descanso → 1km enfriamiento.'},
    {type:'GYM',badge:'GYM',label:'Gimnasio — Superior',desc:'Espalda, hombros, bíceps. Core: plancha 3×60s, dead bug, pallof press. Sin pierna pesada hoy.'},
    {type:'RUN_LONG',badge:w===6?'🔥 HITO':'LARGO',label:`Run Largo — ${lk}km`,km:lk,pace:'6:30-6:45/km',desc:w6},
    {type:'REST',badge:'REST',label:'Descanso',desc:'Recuperación completa. Foam roller 15min. Estiramiento profundo. Magnesio antes de dormir.'},
    {type:'RUN_TEMPO',badge:'TEMPO',label:'Tempo Run — 20-25min',desc:'1km cal → 20-25min a 5:30-5:45/km (incómodo pero sostenible) → 1km enf. Construye el motor aeróbico.'},
    {type:'RUN_EASY',badge:'FÁCIL',label:'Carrera Fácil — 5km',km:5,pace:'6:30/km',desc:'Recovery run. Muy suave. El objetivo es activar sin fatigar.'},
    {type:'GYM',badge:'GYM',label:'Gimnasio — Inferior',desc:'Sentadilla con barra, hip thrust pesado, zancadas. Band walks 3×15. Core completo.'},
  ][d];}
  if(w<=9){const lk={7:12,8:13,9:12}[w],sim=w===9;return [
    {type:'RUN_INTERVALS',badge:'INTERVALOS',label:w<=8?'Intervalos — 8×400m':'Intervalos — 4×800m',
     desc:w<=8?'2km cal → 8×400m a 4:50-5:10/km con 75s descanso → 1km enf. Máxima intensidad controlada.':'2km cal → 4×800m a 5:00/km con 2min descanso → 1km enf.'},
    {type:'GYM',badge:'GYM',label:'Gimnasio — Upper Ligero',desc:'Volumen reducido. Solo superior. Sin pierna pesada esta semana. Core: plancha 3×60s.'},
    {type:sim?'RUN_SIMULACRO':'RUN_LONG',badge:sim?'🔥 SIMULACRO':'LARGO',label:sim?'🔥 SIMULACRO — 12km':`Run Largo — ${lk}km`,km:lk,pace:sim?'5:30-5:50/km':'6:15-6:30/km',
     desc:sim?'Ensayo general. Todo igual que el 25 de julio: tenis, ropa, nutrición, hora. Este run te dice dónde estás.':'Push controlado. Primeros 3km lentos, acelerá en el último tercio.'},
    {type:'REST',badge:'REST',label:'Descanso Total',desc:'Descanso real. Dormir 8h mínimo. Foam roller 20min. Hidratación 3.5L.'},
    {type:'RUN_TEMPO',badge:'TEMPO',label:'Tempo Largo — 30-35min',desc:'1km cal → 30-35min a 5:20-5:35/km → 1km enf. La sesión tempo más exigente del plan.'},
    {type:'RUN_EASY',badge:'FÁCIL',label:'Recovery Run — 4km',km:4,pace:'7:00/km',desc:'Muy suave. Piernas frescas para el largo del domingo. No te exijás nada.'},
    {type:'GYM',badge:'GYM',label:'Core + Movilidad',desc:'Solo core y movilidad. Foam roller completo. Hip circles, leg swings, band walks. Sin carga.'},
  ][d];}
  const ti=n-64;
  return [{type:'RUN_EASY',badge:'TAPER',label:'Run Suave — 5km',km:5,pace:'6:30/km',desc:'Primera sesión del taper. Piernas frescas. Ritmo muy tranquilo.'},
    {type:'GYM',badge:'GYM',label:'Gimnasio — Upper Suave',desc:'Solo tren superior con bajo volumen. Sin pierna. Sin estrés corporal.'},
    {type:'RUN_EASY',badge:'TAPER',label:'Activación — 3km',km:3,pace:'6:00/km',desc:'3km suave + 4 strides de 100m para mantener las piernas despiertas.'},
    {type:'REST',badge:'REST',label:'Descanso Total',desc:'Nada de ejercicio. Hidratate 3.5L. Dormir 8-9h. Confirmar logística.'},
    {type:'REST',badge:'REST',label:'Descanso — Preparación',desc:'Sin entrenar. Preparar: tenis, ropa, número. Comer bien. Dormir temprano.'},
    {type:'REST',badge:'REST',label:'Descanso — Anteayer',desc:'Caminata suave 15min máximo. Hidratación máxima.'},
    {type:'REST',badge:'REST',label:'Día Antes 🏁',desc:'Cena: pasta o arroz + pollo. Sin grasas. Sin alcohol. Dormir antes de las 10pm.'},
    {type:'REST',badge:'REST',label:'Mañana de Carrera',desc:'Desayuno 3h antes: avena + banana + café negro. El trabajo está hecho. Confiá.'},
  ][Math.min(ti,7)]||{type:'REST',badge:'REST',label:'Descanso',desc:'Día libre.'};
}

const WU=[
  {n:'Caminata rápida',d:'3 min',w:'Eleva temperatura muscular'},
  {n:'Leg swings frontales',d:'15 × lado',w:'Activa cadera y flexores'},
  {n:'Leg swings laterales',d:'15 × lado',w:'Abre la articulación de cadera'},
  {n:'Hip circles',d:'10 × lado',w:'Lubrica la articulación coxal'},
  {n:'Heel raises lentos',d:'3 × 15',w:'Pre-activa la pantorrilla ★'},
  {n:'High knees',d:'30 seg',w:'Activa el patrón de carrera'},
  {n:'Butt kicks',d:'30 seg',w:'Activa isquiotibiales'},
  {n:'Trote muy suave',d:'2 min',w:'Transición gradual al ritmo'},
];
const ST=[
  {n:'Pantorrilla — Gastrocnemio',d:'60s × lado',c:'Pie contra pared, pierna extendida'},
  {n:'Pantorrilla — Sóleo',d:'60s × lado',c:'Rodilla ligeramente doblada'},
  {n:'Isquiotibiales',d:'60s × lado',c:'Pierna extendida sobre superficie elevada'},
  {n:'Cuádriceps',d:'45s × lado',c:'De pie, talón al glúteo'},
  {n:'Flexores de cadera',d:'60s × lado',c:'Zancada funda, cadera empujando adelante'},
  {n:'IT Band',d:'45s × lado',c:'Cruce de piernas apoyado en pared'},
  {n:'Espalda baja',d:'60s',c:'Rodillas al pecho acostado'},
];
const MN=[
  {t:'Segmentos pequeños',d:'No pensés en los 12km. Solo llegá a ese árbol, ese poste, esa esquina. Repetí infinitas veces.'},
  {t:'Chequeo de cuerpo',d:'"Todo en general" = el cerebro. Dolor localizado y agudo = señal real. Aprendé a distinguir.'},
  {t:'Respiración 2-2',d:'Inhalar 2 pasos, exhalar 2 pasos. Baja el cortisol y la percepción de esfuerzo cuando querés parar.'},
  {t:'Diálogo de proceso',d:'"Ritmo bien, respiración bien, sigo." Frases concretas, no emocionales vacías.'},
  {t:'El gobernador central',d:'Cuando sentís que ya no podés, tenés 40-60% de reserva. El cerebro alarma antes de que realmente estés en límite.'},
];
const SP=[
  {p:1,n:'Creatina Monohidratada',dose:'5g diarios',when:'Cualquier hora',why:'Recuperación, potencia, retener músculo mientras bajás grasa.'},
  {p:1,n:'Proteína en Polvo',dose:'25-30g',when:'Post-run o post-gym',why:'Para alcanzar 150-160g diarios si no llegás con comida real.'},
  {p:1,n:'Magnesio Glicinato',dose:'300-400mg',when:'Antes de dormir',why:'Previene calambres, mejora sueño, acelera recuperación muscular.'},
  {p:1,n:'Café negro',dose:'1-2 tazas',when:'30-45min pre-run duro',why:'Mejor ergogénico natural. Mejora rendimiento real.'},
  {p:2,n:'Omega-3',dose:'2-3g',when:'Con cualquier comida',why:'Reduce inflamación sistémica. Acelera recuperación entre sesiones.'},
  {p:2,n:'Vitamina D3',dose:'2,000-4,000 IU',when:'Con desayuno',why:'La mayoría están deficientes. Impacta rendimiento y recuperación.'},
  {p:2,n:'Electrolitos',dose:'Al gusto',when:'Runs de +45min',why:'En Costa Rica con el calor, indispensable.'},
  {p:3,n:'Beta-Alanina',dose:'3-4g',when:'Pre-entrenamiento',why:'Reduce quemada muscular en intervalos. Puede causar hormigueo.'},
];
const MEALS=[
  {m:'☀️ Desayuno',f:'Avena con fruta + 3 huevos + café negro'},
  {m:'🌤 Media mañana',f:'Fruta + nueces o mantequilla de maní'},
  {m:'🌞 Almuerzo',f:'Arroz + pollo o carne magra + ensalada + aguacate'},
  {m:'🏃 Pre-run',f:'Banana + mantequilla de maní (60-90min antes)'},
  {m:'⚡ Post-run',f:'Proteína en polvo + banana (ventana 30min)'},
  {m:'🌙 Cena',f:'Proteína magra + vegetales + carbohidrato moderado'},
];

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0D0B08;color:#EFE5CE;font-family:'DM Sans',sans-serif;min-height:100vh}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#161210}::-webkit-scrollbar-thumb{background:#2C2620;border-radius:2px}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.fade{animation:fadeIn .25s ease}
`;

export default function App() {
  const [tab,setTab]=useState('today');
  const [sel,setSel]=useState(null);
  const [nut,setNut]=useState('pre');
  const [cd,setCd]=useState({d:0,h:0,m:0,s:0});
  const [done,setDone]=useState(new Set());

  const today=getDayNum();
  const tp=plan(today);
  const sp=sel?plan(sel):null;
  const daysLeft=Math.max(0,72-today);
  const prog=Math.min(1,(today-1)/TOTAL);
  const tc=t=>TC[t]||C.gold;
  const R=72,CIRC=2*Math.PI*R;

  useEffect(()=>{
    const tick=()=>{
      const ms=RACE-new Date();
      if(ms<=0){setCd({d:0,h:0,m:0,s:0});return;}
      setCd({d:Math.floor(ms/86400000),h:Math.floor((ms%86400000)/3600000),m:Math.floor((ms%3600000)/60000),s:Math.floor((ms%60000)/1000)});
    };
    tick();const iv=setInterval(tick,1000);return()=>clearInterval(iv);
  },[]);

  const toggle=n=>setDone(p=>{const nx=new Set(p);nx.has(n)?nx.delete(n):nx.add(n);return nx;});

  const Badge=({type,badge})=>(
    <span style={{display:'inline-block',padding:'3px 10px',borderRadius:3,fontSize:9,fontWeight:800,letterSpacing:2.5,textTransform:'uppercase',background:tc(type)+'22',color:tc(type),border:`1px solid ${tc(type)}44`,marginBottom:8}}>{badge}</span>
  );
  const Chip=({ch})=>(
    <span style={{background:C.dim2,border:`1px solid ${C.border}`,borderRadius:6,padding:'4px 10px',fontFamily:"'Space Mono',monospace",fontSize:11,color:C.muted}}>{ch}</span>
  );
  const Card=({children,accent,xStyle={}})=>(
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderLeft:accent?`2px solid ${accent}`:undefined,borderRadius:12,padding:16,marginBottom:12,...xStyle}}>{children}</div>
  );
  const SL=({children,xm='16px 0 10px'})=>(
    <div style={{fontFamily:"'Bebas Neue',display",fontSize:11,letterSpacing:3.5,color:C.dim,margin:xm,textTransform:'uppercase'}}>{children}</div>
  );
  const Row=({num,name,detail,right,rc=C.gold})=>(
    <div style={{display:'flex',alignItems:'flex-start',gap:10,padding:'10px 0',borderBottom:`1px solid ${C.dim2}`}}>
      {num&&<div style={{fontFamily:"'Bebas Neue',display",fontSize:20,color:C.gold,width:22,flexShrink:0,lineHeight:1}}>{num}</div>}
      <div style={{flex:1}}>
        <div style={{fontSize:13,fontWeight:500,color:C.cream,marginBottom:2}}>{name}</div>
        {detail&&<div style={{fontSize:11,color:C.muted,lineHeight:1.5}}>{detail}</div>}
      </div>
      {right&&<div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:rc,flexShrink:0,marginLeft:8,textAlign:'right'}}>{right}</div>}
    </div>
  );
  const RI=({children,bullet='→',bc=C.amber})=>(
    <div style={{display:'flex',gap:8,padding:'8px 0',borderBottom:`1px solid ${C.dim2}`,fontSize:12,color:C.muted,lineHeight:1.55}}>
      <span style={{color:bc,fontWeight:800,flexShrink:0}}>{bullet}</span><span>{children}</span>
    </div>
  );
  const WCard=({n,p,showBtn=true})=>{
    if(!p) return null;
    const isDone=done.has(n);
    return(
      <Card>
        <Badge type={p.type} badge={p.badge}/>
        <div style={{fontFamily:"'Bebas Neue',display",fontSize:28,letterSpacing:1,lineHeight:1.1,marginBottom:8,color:C.cream}}>{p.label}</div>
        {p.km&&<div style={{display:'flex',gap:8,marginBottom:10,flexWrap:'wrap'}}>
          <Chip ch={`📍 ${p.km}km`}/>{p.pace&&<Chip ch={`⚡ ${p.pace}`}/>}
        </div>}
        <div style={{fontSize:13,lineHeight:1.65,color:C.muted}}>{p.desc}</div>
        {showBtn&&<button onClick={()=>toggle(n)} style={{width:'100%',marginTop:14,padding:'12px 0',borderRadius:8,border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:700,letterSpacing:1.5,background:isDone?C.green:C.dim2,color:isDone?C.dim2:C.cream,transition:'all .2s'}}>{isDone?'✓ COMPLETADO HOY':'MARCAR COMO COMPLETO'}</button>}
      </Card>
    );
  };

  const CalGrid=()=>{
    const hd=['V','S','D','L','M','X','J'];
    return(
      <div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3,marginBottom:4}}>
          {hd.map(h=><div key={h} style={{textAlign:'center',fontSize:8,fontWeight:700,letterSpacing:1,color:C.dim,padding:'3px 0'}}>{h}</div>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3}}>
          {Array.from({length:72},(_,i)=>{
            const n=i+1,p=plan(n),cl=p?tc(p.type):C.dim;
            const isT=n===today,isDone=done.has(n),isSel=n===sel;
            return(
              <div key={n} onClick={()=>setSel(isSel?null:n)} style={{aspectRatio:'1',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',borderRadius:5,cursor:'pointer',transition:'all .15s',position:'relative',background:isDone?cl+'44':isSel?cl+'30':cl+'18',border:isT?`1.5px solid ${cl}`:`1px solid ${cl}18`,boxShadow:isT?`0 0 8px ${cl}44`:'none'}}>
                <span style={{fontSize:9,fontWeight:700,color:isT?cl:C.dim}}>{n}</span>
                {isDone&&<span style={{position:'absolute',bottom:1,fontSize:6,color:C.green}}>✓</span>}
                {n===72&&!isDone&&<span style={{position:'absolute',top:1,fontSize:5,color:C.gold}}>★</span>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return(
    <>
      <style>{CSS}</style>
      <div style={{maxWidth:480,margin:'0 auto',minHeight:'100vh',background:C.bg,display:'flex',flexDirection:'column'}}>

        {/* ── HERO ── */}
        <div style={{background:C.surf,borderBottom:`1px solid ${C.border}`,padding:'18px 20px 16px'}}>
          <div style={{textAlign:'center',fontSize:9,fontWeight:700,letterSpacing:3,color:C.dim,textTransform:'uppercase',marginBottom:14}}>Hans · Carrera 12km · 25 Jul 2026 · 4:00pm</div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:18}}>
            {/* Circular ring */}
            <svg width="190" height="190" viewBox="0 0 200 200" style={{flexShrink:0,overflow:'visible'}}>
              <circle cx="100" cy="100" r="88" fill="none" stroke={C.dim2} strokeWidth="1"/>
              <circle cx="100" cy="100" r={R} fill="none" stroke={C.dim2} strokeWidth="6"/>
              <circle cx="100" cy="100" r={R} fill="none" stroke={C.gold} strokeWidth="6"
                strokeDasharray={CIRC} strokeDashoffset={CIRC*(1-prog)}
                strokeLinecap="round" transform="rotate(-90 100 100)"
                style={{transition:'stroke-dashoffset 1s ease'}}/>
              {prog>0.01&&prog<0.99&&(()=>{
                const a=(prog*360-90)*Math.PI/180;
                return <circle cx={100+R*Math.cos(a)} cy={100+R*Math.sin(a)} r="4" fill={C.gold}/>;
              })()}
              <text x="100" y="85" textAnchor="middle" fill={C.cream} fontFamily="Bebas Neue" fontSize="54" letterSpacing="2">{pad(daysLeft)}</text>
              <text x="100" y="104" textAnchor="middle" fill={C.muted} fontFamily="DM Sans" fontSize="10" fontWeight="500" letterSpacing="1.5">DÍAS RESTANTES</text>
              <text x="100" y="122" textAnchor="middle" fill={C.gold} fontFamily="Space Mono" fontSize="9">DÍA {today} / 72</text>
              <text x="100" y="140" textAnchor="middle" fill={C.dim} fontFamily="DM Sans" fontSize="9">{Math.round(prog*100)}% completado</text>
            </svg>
            {/* Time breakdown */}
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {[['d','días',cd.d,true],['h','horas',cd.h,false],['m','min',cd.m,false],['s','seg',cd.s,false]].map(([k,l,v,isMain])=>(
                <div key={k} style={{background:C.card,border:`1px solid ${C.border}`,borderLeft:isMain?`2px solid ${C.gold}`:undefined,borderRadius:8,padding:'7px 12px',textAlign:'center',minWidth:62}}>
                  <div style={{fontFamily:"'Bebas Neue',display",fontSize:isMain?28:22,lineHeight:1,color:isMain?C.gold:C.cream,letterSpacing:1}}>{pad(v)}</div>
                  <div style={{fontSize:8,fontWeight:700,letterSpacing:2,color:C.dim,textTransform:'uppercase',marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div style={{display:'flex',background:C.surf,borderBottom:`1px solid ${C.border}`,overflowX:'auto',scrollbarWidth:'none'}}>
          {[['today','HOY'],['plan','PLAN'],['nutri','NUTRICIÓN'],['recover','RECUPERAR'],['arsenal','ARSENAL']].map(([id,lb])=>(
            <button key={id} onClick={()=>setTab(id)} style={{flex:1,minWidth:56,padding:'12px 4px',background:'none',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',color:tab===id?C.gold:C.dim,borderBottom:tab===id?`2px solid ${C.gold}`:'2px solid transparent',transition:'all .2s',whiteSpace:'nowrap'}}>{lb}</button>
          ))}
        </div>

        {/* ── CONTENT ── */}
        <div style={{flex:1,overflowY:'auto',padding:16}}>

          {/* HOY */}
          {tab==='today'&&(
            <div className="fade">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                <div style={{fontFamily:"'Bebas Neue',display",fontSize:14,letterSpacing:2,color:C.muted}}>DÍA {today} — {fmt(getDate(today))}</div>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:C.dim}}>{daysLeft}d para la carrera</div>
              </div>
              <WCard n={today} p={tp}/>
              {tp?.type?.startsWith('RUN')&&<>
                <Card accent={C.gold}>
                  <SL xm='0 0 10px'>Antes — Calentamiento (8-10 min)</SL>
                  {WU.map((w,i)=><Row key={i} num={i+1} name={w.n} detail={w.w} right={w.d}/>)}
                </Card>
                <Card>
                  <SL xm='0 0 10px'>Después — Protocolo de recuperación</SL>
                  {[['1','Enfriamiento','3-5 min caminata. No parés de golpe.','5 min'],
                    ['2','Foam roller','Pantorrillas, cuádriceps, IT band — 60-90s por zona.','15 min'],
                    ['3','Estiramiento','45-60s por posición mínimo.','15 min'],
                    ['4','Ducha contraste','1min frío → 2min caliente × 4. Terminá en frío.','15 min'],
                    ['5','Ventana de nutrición','Proteína + carbs en los primeros 30min.','inmediato'],
                  ].map(([n,nm,dt,r])=><Row key={n} num={n} name={nm} detail={dt} right={r}/>)}
                </Card>
              </>}
              <Card>
                <SL xm='0 0 10px'>Nutrición hoy</SL>
                {tp?.type?.startsWith('RUN')?<>
                  <RI>60-90min antes: banana + mantequilla de maní o avena</RI>
                  <RI>30min antes: café negro si es sesión intensa</RI>
                  <RI>Post-run ventana 30min: proteína + carbohidratos simples</RI>
                  <RI>Agua mínimo 3.5L hoy</RI>
                </>:tp?.type==='GYM'?<>
                  <RI>Pre-gym: comida completa 1.5h antes</RI>
                  <RI>Post-gym: batido de proteína + fruta inmediatamente</RI>
                  <RI>Creatina 5g hoy también — sin excepción</RI>
                </>:<>
                  <RI>Día de descanso: alimentación limpia. No compensés ni restringás.</RI>
                  <RI>Proteína igual de importante: 150g mínimo</RI>
                  <RI>Magnesio antes de dormir, siempre</RI>
                </>}
              </Card>
            </div>
          )}

          {/* PLAN */}
          {tab==='plan'&&(
            <div className="fade">
              <SL xm='0 0 10px'>Calendario completo — 72 días</SL>
              <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:14}}>
                {[['RUN_EASY','Fácil'],['RUN_LONG','Largo/Intervalos'],['RUN_TEMPO','Tempo'],['GYM','Gym'],['REST','Descanso'],['RACE','Carrera']].map(([t,lb])=>(
                  <div key={t} style={{display:'flex',alignItems:'center',gap:4,fontSize:9,color:C.muted}}>
                    <div style={{width:8,height:8,borderRadius:2,background:tc(t)}}/>{lb}
                  </div>
                ))}
              </div>
              <CalGrid/>
              {sel&&sp&&(
                <div className="fade" style={{marginTop:14,background:C.card,border:`1px solid ${tc(sp.type)}33`,borderRadius:12,padding:16}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                    <div style={{fontFamily:"'Bebas Neue',display",fontSize:13,letterSpacing:2,color:C.muted}}>DÍA {sel} — {fmt(getDate(sel))}</div>
                    <button onClick={()=>setSel(null)} style={{background:'none',border:`1px solid ${C.border}`,color:C.muted,padding:'3px 10px',borderRadius:4,cursor:'pointer',fontSize:11}}>✕</button>
                  </div>
                  <Badge type={sp.type} badge={sp.badge}/>
                  <div style={{fontFamily:"'Bebas Neue',display",fontSize:22,letterSpacing:1,lineHeight:1.1,marginBottom:8,color:C.cream}}>{sp.label}</div>
                  {sp.km&&<div style={{display:'flex',gap:8,marginBottom:10}}><Chip ch={`📍 ${sp.km}km`}/>{sp.pace&&<Chip ch={`⚡ ${sp.pace}`}/>}</div>}
                  <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>{sp.desc}</div>
                  <button onClick={()=>toggle(sel)} style={{width:'100%',marginTop:12,padding:'10px 0',borderRadius:8,border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:700,letterSpacing:1.5,background:done.has(sel)?C.green:C.dim2,color:done.has(sel)?C.dim2:C.cream,transition:'all .2s'}}>{done.has(sel)?'✓ COMPLETADO':'MARCAR COMO COMPLETO'}</button>
                </div>
              )}
              <SL>Bloques de entrenamiento</SL>
              {[
                {l:'BLOQUE 1 — BASE',d:'Días 1-21 · May 15 - Jun 4',cl:C.blue,desc:'Construir base aeróbica. Runs fáciles, primeros largos.'},
                {l:'BLOQUE 2 — DESARROLLO',d:'Días 22-42 · Jun 5 - Jun 25',cl:C.gold,desc:'Intervalos y tempo. Primera vez en 12km en semana 6.'},
                {l:'BLOQUE 3 — VELOCIDAD',d:'Días 43-63 · Jun 26 - Jul 16',cl:C.amber,desc:'Intervalos avanzados. Bajar ritmo. Simulacro de carrera.'},
                {l:'BLOQUE 4 — TAPER',d:'Días 64-71 · Jul 17 - Jul 24',cl:C.green,desc:'Reducir carga. Llegar fresco y descansado al 25.'},
                {l:'🏁 CARRERA',d:'Día 72 · 25 Jul · 4:00pm',cl:C.gold,desc:'Hans vs 12km. Todo el entrenamiento en 1h10 o menos.'},
              ].map((b,i)=>(
                <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderLeft:`2px solid ${b.cl}`,borderRadius:10,padding:14,marginBottom:8}}>
                  <div style={{fontSize:10,fontWeight:700,color:b.cl,letterSpacing:1.5,marginBottom:2}}>{b.l}</div>
                  <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:C.dim,marginBottom:5}}>{b.d}</div>
                  <div style={{fontSize:12,color:C.muted}}>{b.desc}</div>
                </div>
              ))}
            </div>
          )}

          {/* NUTRICIÓN */}
          {tab==='nutri'&&(
            <div className="fade">
              <Card xStyle={{background:'#1C1710',borderColor:`${C.gold}33`}}>
                <SL xm='0 0 8px'>Reglas base</SL>
                {['Proteína en CADA comida — mínimo 150g/día','Carbohidratos ANTES y DESPUÉS del entrenamiento','FUERA: alcohol, azúcar líquida, procesados nocturnos','3L de agua mínimo. 3.5L en días de entrenamiento','Dormir 7.5-8h — tan importante como correr','Meta: bajar 3-4kg. Cada kg = 2s/km más rápido'].map((r,i)=><RI key={i}>{r}</RI>)}
              </Card>
              <SL>Plan diario de comidas</SL>
              <Card>
                {MEALS.map((m,i,a)=>(
                  <div key={i} style={{display:'flex',gap:10,padding:'9px 0',borderBottom:i<a.length-1?`1px solid ${C.dim2}`:''}}>
                    <div style={{fontSize:11,fontWeight:700,color:C.gold,width:90,flexShrink:0,lineHeight:1.4}}>{m.m}</div>
                    <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{m.f}</div>
                  </div>
                ))}
              </Card>
              <SL>Nutrición por momento</SL>
              <div style={{display:'flex',gap:6,marginBottom:12}}>
                {[['pre','🍌 Pre-Run'],['durante','🏃 Durante'],['post','⚡ Post-Run']].map(([id,lb])=>(
                  <button key={id} onClick={()=>setNut(id)} style={{flex:1,padding:'11px 6px',borderRadius:8,border:`1px solid ${nut===id?C.gold:C.border}`,background:nut===id?C.gold+'20':C.card,color:nut===id?C.gold:C.muted,fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:700,letterSpacing:1,cursor:'pointer',transition:'all .2s',lineHeight:1.3}}>{lb}</button>
                ))}
              </div>
              {nut==='pre'&&(
                <Card accent={C.gold} xStyle={{animation:'fadeIn .2s ease'}}>
                  <div style={{fontSize:9,fontWeight:700,color:C.gold,letterSpacing:2,marginBottom:10}}>60-90 MIN ANTES</div>
                  {['Banana + mantequilla de maní (opción ideal)','Tostada con miel','Avena con fruta','Yogur + granola'].map((f,i)=><RI key={i} bullet='✓' bc={C.gold}>{f}</RI>)}
                  <div style={{fontSize:9,fontWeight:700,color:C.gold,letterSpacing:2,margin:'14px 0 10px'}}>30 MIN ANTES</div>
                  <RI bullet='✓' bc={C.gold}>Café negro — el mejor ergogénico gratis</RI>
                  <RI bullet='✓' bc={C.gold}>Gel energético si corrés más de 10km</RI>
                </Card>
              )}
              {nut==='durante'&&(
                <Card accent={C.amber} xStyle={{animation:'fadeIn .2s ease'}}>
                  {[{t:'MENOS DE 45 MIN',d:'Solo agua si tenés sed. No necesitás nada más.',cl:C.blue},
                    {t:'45 – 75 MINUTOS',d:'Agua en cada estación. Electrolitos si hay calor fuerte.',cl:C.gold},
                    {t:'MÁS DE 75 MINUTOS',d:'Electrolitos cada 20-25min. Gel en km 6-7 opcional.',cl:C.amber},
                  ].map((b,i)=>(
                    <div key={i} style={{marginBottom:i<2?16:0}}>
                      <div style={{fontSize:9,fontWeight:700,color:b.cl,letterSpacing:2,marginBottom:6}}>{b.t}</div>
                      <div style={{fontSize:12,color:C.muted,lineHeight:1.55}}>{b.d}</div>
                    </div>
                  ))}
                </Card>
              )}
              {nut==='post'&&(
                <Card accent={C.green} xStyle={{animation:'fadeIn .2s ease'}}>
                  <div style={{fontSize:9,fontWeight:700,color:C.green,letterSpacing:2,marginBottom:10}}>0-30 MINUTOS — VENTANA CRÍTICA</div>
                  {['Batido de proteína + banana','500-750ml agua con electrolitos','Huevos con tostada si preferís comida real'].map((f,i)=><RI key={i} bullet='✓' bc={C.green}>{f}</RI>)}
                  <div style={{fontSize:9,fontWeight:700,color:C.green,letterSpacing:2,margin:'14px 0 10px'}}>1-2 HORAS DESPUÉS</div>
                  <RI bullet='✓' bc={C.green}>Comida completa: proteína + carbohidratos + vegetales</RI>
                </Card>
              )}
            </div>
          )}

          {/* RECUPERAR */}
          {tab==='recover'&&(
            <div className="fade">
              <div style={{background:'#1C1508',border:`1px solid ${C.gold}44`,borderRadius:12,padding:14,marginBottom:12}}>
                <div style={{fontSize:10,fontWeight:700,color:C.gold,letterSpacing:1.5,marginBottom:10}}>⚠️ PANTORRILLAS — PROTOCOLO URGENTE</div>
                <RI bullet='★' bc={C.gold}>Heel raises ANTES de correr: 3×15 lentos — siempre, sin excepción</RI>
                <RI bullet='★' bc={C.gold}>Tenis de CORRER, no de gym — verificá esto urgente</RI>
                <RI bullet='★' bc={C.gold}>Pisada mediopié — no aterrizés con el talón</RI>
                <RI bullet='★' bc={C.gold}>Magnesio antes de dormir — reduce calambres significativamente</RI>
                <RI bullet='★' bc={C.gold}>Estiramiento 60s × lado post-run sin excepción</RI>
              </div>
              <SL xm='0 0 10px'>Calentamiento — 8-10 min</SL>
              <Card accent={C.gold}>
                {WU.map((w,i)=><Row key={i} num={i+1} name={w.n} detail={w.w} right={w.d}/>)}
              </Card>
              <SL>Estiramiento post-run — 15 min</SL>
              <Card>
                <div style={{fontSize:11,color:C.muted,marginBottom:10,lineHeight:1.5}}>Mínimo 45-60s por posición. El músculo necesita tiempo para ceder.</div>
                {ST.map((s,i)=><Row key={i} num={i+1} name={s.n} detail={s.c} right={s.d}/>)}
              </Card>
              <SL>Protocolo completo post-run</SL>
              <Card>
                {[['1','Enfriamiento','3-5 min caminata. No parés de golpe.','5 min'],
                  ['2','Foam roller','Pantorrillas, cuádriceps, IT band. 60-90s por zona.','15 min'],
                  ['3','Estiramiento','45-60s mínimo por posición. Ver lista arriba.','15 min'],
                  ['4','Ducha contraste','1min frío → 2min caliente × 4. Terminá en frío.','15 min'],
                  ['5','Nutrición','Proteína + carbs en los primeros 30min.','inmediato'],
                  ['6','Hidratación','500-750ml con electrolitos o agua+sal+limón.','continuo'],
                ].map(([n,nm,dt,r])=><Row key={n} num={n} name={nm} detail={dt} right={r}/>)}
              </Card>
              <SL>Mentalidad — cuando querés parar</SL>
              {MN.map((m,i)=>(
                <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderLeft:`2px solid ${C.gold}`,borderRadius:10,padding:14,marginBottom:8}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.gold,marginBottom:5}}>{m.t}</div>
                  <div style={{fontSize:12,color:C.muted,lineHeight:1.55}}>{m.d}</div>
                </div>
              ))}
              <SL>Herramientas — comprar</SL>
              <Card>
                {[['Tenis de correr','₡30,000-80,000','Primero que comprás. No negociable.',C.amber],
                  ['Foam Roller','₡5,000-15,000','Post-run siempre. Pre-run en zonas tensas.',C.green],
                  ['Bandas de resistencia','₡3,000-8,000','Warm-up y fortalecimiento glúteo medio.',C.green],
                  ['Medias de compresión','₡10,000-25,000','Post-run largo. Recuperación vascular.',C.blue],
                  ['Botella 1L+','₡2,000-10,000','3.5L mínimo en días de entrenamiento.',C.blue],
                ].map(([nm,pr,wh,cl],i)=><Row key={i} name={nm} detail={wh} right={pr} rc={cl}/>)}
              </Card>
            </div>
          )}

          {/* ARSENAL */}
          {tab==='arsenal'&&(
            <div className="fade">
              <div style={{background:'#1C1710',border:`1px solid ${C.gold}33`,borderRadius:10,padding:14,marginBottom:4}}>
                <div style={{fontSize:12,color:C.gold,lineHeight:1.65}}>Solo suplementos con evidencia real. Sin marketing. Sin tirarle plata a lo que no funciona.</div>
              </div>
              {[{p:1,lb:'⭐ Prioridad 1 — Indispensables',cl:C.amber},{p:2,lb:'⚡ Prioridad 2 — Muy recomendados',cl:C.gold},{p:3,lb:'💡 Prioridad 3 — Opcionales',cl:C.blue}].map(({p,lb,cl})=>(
                <div key={p}>
                  <SL>{lb}</SL>
                  {SP.filter(s=>s.p===p).map((s,i)=>(
                    <div key={i} style={{background:C.card,border:`1px solid ${cl}22`,borderRadius:10,padding:14,marginBottom:8}}>
                      <div style={{fontSize:14,fontWeight:700,color:C.cream,marginBottom:4}}>{s.n}</div>
                      <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:cl,marginBottom:5}}>{s.dose} — {s.when}</div>
                      <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{s.why}</div>
                    </div>
                  ))}
                </div>
              ))}
              <SL>❌ No comprés esto</SL>
              <Card>
                {['BCAAs si ya tomás proteína suficiente — dinero tirado','Pre-workouts de estimulantes altos para running','Colágeno como suplemento muscular'].map((x,i,a)=>(
                  <div key={i} style={{display:'flex',gap:8,padding:'8px 0',borderBottom:i<a.length-1?`1px solid ${C.dim2}`:'',fontSize:12,color:C.dim}}>
                    <span style={{color:C.amber,flexShrink:0}}>✕</span>
                    <span style={{textDecoration:'line-through'}}>{x}</span>
                  </div>
                ))}
              </Card>
              <SL>Timing diario</SL>
              <Card>
                {[{t:'AM — Con desayuno',items:['Vitamina D3 2,000-4,000 IU','Omega-3 2-3g','Creatina 5g']},
                  {t:'Pre-Run (30-45 min)',items:['Café negro — siempre','Beta-alanina opcional']},
                  {t:'Post-Run / Post-Gym',items:['Proteína en polvo 25-30g','Electrolitos si fue run largo']},
                  {t:'Antes de dormir',items:['Magnesio 300-400mg — todos los días']},
                ].map((g,i)=>(
                  <div key={i} style={{marginBottom:12}}>
                    <div style={{fontSize:9,fontWeight:700,color:C.gold,letterSpacing:2,marginBottom:6,textTransform:'uppercase'}}>{g.t}</div>
                    {g.items.map((it,j)=><RI key={j}>{it}</RI>)}
                  </div>
                ))}
              </Card>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

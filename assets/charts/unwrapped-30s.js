// Sugar Funeral — Unwrapped (Cover)
// Full 5:38 gameplay chart, arranged by musical sections.
// BPM reference: ~133.93. The chart deliberately uses selected beats rather than every beat.
const UNWRAPPED_CHART = [
  {time:4.075,key:'ArrowLeft',strength:'normal'},
  {time:7.669,key:'ArrowDown',strength:'normal'},
  {time:10.389,key:'ArrowRight',strength:'normal'},
  {time:14.453,key:'ArrowUp',strength:'normal'},
  {time:18.101,key:'ArrowLeft',strength:'normal'},
  {time:22.203,key:'ArrowRight',strength:'normal'},
  {time:25.803,key:'ArrowDown',strength:'strong'},
  {time:29.419,key:'ArrowLeft',strength:'strong'},
  {time:31.189,key:'ArrowRight',strength:'normal'},
  {time:32.981,key:'ArrowUp',strength:'normal'},
  {time:34.325,key:'ArrowDown',strength:'normal'},
  {time:35.669,key:'ArrowLeft',strength:'strong'},
  {time:37.461,key:'ArrowRight',strength:'normal'},
  {time:38.805,key:'ArrowUp',strength:'normal'},
  {time:40.149,key:'ArrowDown',strength:'normal'},
  {time:41.941,key:'ArrowLeft',strength:'strong'},
  {time:43.285,key:'ArrowRight',strength:'normal'},
  {time:44.629,key:'ArrowUp',strength:'normal'},
  {time:46.421,key:'ArrowDown',strength:'normal'},
  {time:47.765,key:'ArrowLeft',strength:'strong'},
  {time:49.109,key:'ArrowRight',strength:'normal'},
  {time:50.901,key:'ArrowUp',strength:'normal'},
  {time:52.245,key:'ArrowDown',strength:'normal'},
  {time:53.589,key:'ArrowLeft',strength:'strong'},
  {time:54.933,key:'ArrowRight',strength:'normal'},
  {time:56.277,key:'ArrowUp',strength:'normal'},
  {time:58.069,key:'ArrowDown',strength:'strong'},
  {time:59.413,key:'ArrowLeft',strength:'normal'}
];

const BEAT = 60 / 133.93;
const LANES = ['ArrowLeft','ArrowUp','ArrowDown','ArrowRight'];
let laneCursor = 0;
function addNote(time,lane,strength='normal') {
  if (time < 59.8 || time > 337.8) return;
  UNWRAPPED_CHART.push({time:Number(time.toFixed(3)),key:LANES[lane % 4],strength});
}
function addSection(start,end,stepBeats,opts={}) {
  const step=BEAT*stepBeats; let i=0;
  for(let t=start;t<=end+0.001;t+=step,i++){
    const lane=(laneCursor+i+(opts.laneShift||0))%4;
    const strong=opts.strongEvery&&i%opts.strongEvery===0;
    addNote(t,lane,strong?'strong':'normal');
    if(opts.pairEvery&&i%opts.pairEvery===0&&t+BEAT/2<=end) addNote(t+BEAT/2,(lane+(opts.pairShift||1))%4,'normal');
    if(opts.tripleEvery&&i%opts.tripleEvery===0&&t+BEAT<=end){addNote(t+BEAT/2,(lane+2)%4,'normal');addNote(t+BEAT,(lane+1)%4,'strong');}
  }
  laneCursor=(laneCursor+i+(opts.laneShift||0))%4;
}
addSection(59.861,72.7,2,{strongEvery:4,pairEvery:8});
addSection(73.05,101.6,1.5,{strongEvery:4,pairEvery:10,pairShift:2});
addSection(102.0,135.4,2,{strongEvery:4,pairEvery:10});
addSection(136.0,149.4,1.5,{strongEvery:4,pairEvery:7});
addSection(150.0,184.7,1.5,{strongEvery:4,pairEvery:10,pairShift:2});
addSection(186.0,200.0,3,{strongEvery:3});
addSection(201.0,220.0,2.5,{strongEvery:4});
addSection(220.4,232.0,2,{strongEvery:4,pairEvery:10});
addSection(232.3,244.0,1.5,{strongEvery:4,pairEvery:8});
addSection(245.0,258.0,3,{strongEvery:3});
addSection(259.0,273.2,1.5,{strongEvery:4,pairEvery:8});
addSection(274.0,310.0,1.5,{strongEvery:4,pairEvery:10,pairShift:2});
addSection(311.0,321.0,2,{strongEvery:4,pairEvery:10});
addSection(321.5,330.0,2.5,{strongEvery:3});
addSection(330.5,337.0,3.5,{strongEvery:2});
UNWRAPPED_CHART.sort((a,b)=>a.time-b.time);

// Additional selectable charts. All timings are scaled to the game's common 338-second timeline,
// while the original audio remains untouched.
function buildSingleChart(bpm,beat0,sections){
  const beat=60/bpm, out=[], lanes=LANES; let cursor=0;
  const add=t=>out.push({time:Number(t.toFixed(3)),key:lanes[cursor++%4],strength:cursor%4===1?'strong':'normal'});
  for(const s of sections){
    const [start,end,step]=s;
    let i=Math.max(0,Math.ceil((start-beat0)/beat));
    const endI=Math.floor((end-beat0)/beat);
    for(;i<=endI;i+=step)add(beat0+i*beat);
  }
  return out.sort((a,b)=>a.time-b.time);
}
const THRONE_ORIGINAL_DURATION=348;
const FIREWORK_ORIGINAL_DURATION=292;
const GAME_TIMELINE=338;
const throneRaw=buildSingleChart(117.1875,2.144,[[0,40,4],[41,55,2],[56,98,1],[99,128,2],[129,141,2],[142,185,1],[186,208,1],[209,231,3],[232,279,1],[280,293,3],[294,312,2],[313,330,3],[331,340,3],[341,348,4]]);
const fireworkRaw=buildSingleChart(156.25,3.722667,[[0,26,4],[27,50,2],[51,74,2],[75,86,2],[87,112,1],[113,118,2],[119,142,2],[143,154,2],[155,180,1],[181,198,1],[199,218,3],[219,227,2],[228,238,2],[239,252,2],[253,292,1]]);
const selectedSong=localStorage.getItem('fredSong')||'unwrapped';
const songConfig={
  throne:{title:'THRONE',audio:'assets/audio/throne.mp3',stage:'assets/background/scene-2.png',duration:THRONE_ORIGINAL_DURATION,raw:throneRaw},
  unwrapped:{title:'UNWRAPPED',audio:'assets/audio/unwrapped.mp3',stage:'assets/background/cover-scene.png',duration:338,raw:UNWRAPPED_CHART},
  firework:{title:'FIREWORK',audio:'assets/audio/firework.mp3',stage:'assets/background/scene-3.png',duration:FIREWORK_ORIGINAL_DURATION,raw:fireworkRaw}
};
function applySong(id){
  const cfg=songConfig[id]||songConfig.unwrapped;
  localStorage.setItem('fredSong',id);
  const audio=document.getElementById('song'),stage=document.getElementById('stage');
  if(audio)audio.src=cfg.audio;
  if(stage)stage.src=cfg.stage;
  const factor=GAME_TIMELINE/cfg.duration;
  const desc=Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype,'currentTime');
  if(audio&&desc&&desc.get&&!audio.__fredScaled){
    Object.defineProperty(audio,'currentTime',{configurable:true,get(){return desc.get.call(this)*factor},set(v){desc.set.call(this,v/factor)}});
    audio.__fredScaled=true;
  }
  UNWRAPPED_CHART.length=0;
  for(const n of cfg.raw)UNWRAPPED_CHART.push({time:Number((n.time*factor).toFixed(3)),key:n.key,strength:n.strength});
  UNWRAPPED_CHART.sort((a,b)=>a.time-b.time);
  const t=document.getElementById('time');if(t)t.textContent=GAME_TIMELINE;
  const title=document.querySelector('#start h1');if(title)title.textContent='🎤 ФРЕДДИЧКА — '+cfg.title;
  return cfg;
}
applySong(selectedSong);

// Song selector is injected before the game's own inline script starts.
(function createSongSelector(){
  const old=document.getElementById('songSelect');if(old)old.remove();
  const wrap=document.createElement('div');wrap.id='songSelect';wrap.style.cssText='position:absolute;z-index:100;inset:0;display:flex;align-items:center;justify-content:center;background:#050314d9;backdrop-filter:blur(7px);color:#fff';
  wrap.innerHTML='<div style="width:min(92vw,620px);padding:34px 28px;text-align:center;border:1px solid #fff4;border-radius:28px;background:#110b2bed;box-shadow:0 20px 70px #0009"><h1 style="margin:0 0 10px;font-size:clamp(32px,6vw,58px)">ВЫБЕРИ ПЕСНЮ</h1><p style="opacity:.85;line-height:1.5;margin-bottom:22px">Выбери выступление Фреддички для теста.</p><div id="songChoices" style="display:grid;gap:12px"></div></div>';
  document.getElementById('game').appendChild(wrap);
  const list=document.getElementById('songChoices');
  const items=[['throne','THRONE','Медленное выступление • scene-2'],['unwrapped','UNWRAPPED','Средняя сложность • основная сцена'],['firework','FIREWORK','Быстрое выступление • scene-3']];
  items.forEach(([id,name,desc])=>{const b=document.createElement('button');b.style.cssText='padding:15px 20px;border:1px solid #fff5;border-radius:18px;background:#ffffff12;color:#fff;cursor:pointer;font-weight:900;font-size:18px;text-align:left';b.innerHTML='<div>'+name+'</div><div style="font-size:13px;font-weight:600;opacity:.7;margin-top:4px">'+desc+'</div>';b.onclick=()=>{applySong(id);wrap.remove();document.getElementById('start').style.display='flex'};list.appendChild(b)});
})();
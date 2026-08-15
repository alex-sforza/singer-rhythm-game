// Sugar Funeral — Unwrapped (Cover)
// Full 5:38 gameplay chart, arranged by musical sections.
// BPM reference: ~133.93. The chart deliberately uses selected beats rather than every beat.
const UNWRAPPED_CHART = [
  // 0:00–0:30 — intro: very sparse
  {time:4.075,key:'ArrowLeft',strength:'normal'},
  {time:7.669,key:'ArrowDown',strength:'normal'},
  {time:10.389,key:'ArrowRight',strength:'normal'},
  {time:14.453,key:'ArrowUp',strength:'normal'},
  {time:18.101,key:'ArrowLeft',strength:'normal'},
  {time:22.203,key:'ArrowRight',strength:'normal'},
  {time:25.803,key:'ArrowDown',strength:'strong'},
  {time:29.419,key:'ArrowLeft',strength:'strong'},
  // 0:30–0:59 — gentle rhythmic introduction
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

// 0:59–1:12 — preparation: gently increasing density
addSection(59.861,72.7,2,{strongEvery:4,pairEvery:8});
// 1:13–1:42 — chorus: complex but readable combinations
addSection(73.05,101.6,1,{strongEvery:4,pairEvery:4,pairShift:2});
// 1:42–2:15 — instrumental + second verse: ordinary speed
addSection(102.0,135.4,2,{strongEvery:4,pairEvery:10});
// 2:16–2:29 — preparation
addSection(136.0,149.4,1.5,{strongEvery:4,pairEvery:7});
// 2:30–3:05 — chorus: complex combinations
addSection(150.0,184.7,1,{strongEvery:4,pairEvery:4,pairShift:2});
// 3:06–3:20 — bridge: slow down, breathing room
addSection(186.0,200.0,3,{strongEvery:3});
// 3:21–4:04 — instrumental: gradual increase, only a few hardest moments at the end
addSection(201.0,220.0,2.5,{strongEvery:4});
addSection(220.4,232.0,2,{strongEvery:4,pairEvery:10});
addSection(232.3,244.0,1.5,{strongEvery:4,pairEvery:8});
// 4:05–4:18 — final verse: deliberate cooldown
addSection(245.0,258.0,3,{strongEvery:3});
// 4:19–4:33 — build back toward chorus level
addSection(259.0,273.2,1.5,{strongEvery:4,pairEvery:8});
// 4:34–5:10 — chorus: regular chorus difficulty, not maximal density
addSection(274.0,310.0,1,{strongEvery:4,pairEvery:5,pairShift:2});
// 5:11–5:38 — ending: progressively fewer notes, finishing with singles
addSection(311.0,321.0,2,{strongEvery:4,pairEvery:10});
addSection(321.5,330.0,2.5,{strongEvery:3});
addSection(330.5,337.0,3.5,{strongEvery:2});
UNWRAPPED_CHART.sort((a,b)=>a.time-b.time);

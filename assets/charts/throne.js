// Throne — rhythm chart
// Built from the uploaded track: detected tempo ~117.19 BPM, beat grid anchored at ~2.144s.
// No simultaneous double notes. The bridge is the hardest section, but still uses single notes.
const THRONE_BPM = 117.1875;
const THRONE_BEAT = 60 / THRONE_BPM;
const THRONE_BEAT0 = 2.144;
const THRONE_LANES = ['ArrowLeft','ArrowUp','ArrowDown','ArrowRight'];

function buildThroneChart(){
  const chart=[];
  let cursor=0;
  const add=(time)=>chart.push({time:Number(time.toFixed(3)),key:THRONE_LANES[cursor++%4],strength:(cursor%4===1?'strong':'normal')});
  const every=(start,end,step)=>{
    let i=Math.max(0,Math.ceil((start-THRONE_BEAT0)/THRONE_BEAT));
    const endI=Math.floor((end-THRONE_BEAT0)/THRONE_BEAT);
    for(;i<=endI;i+=step)add(THRONE_BEAT0+i*THRONE_BEAT);
  };

  // 0:00–0:40 — intro + first verse, warm-up
  every(0,40,4);
  // 0:41–0:55 — accelerate
  every(41,55,2);
  // 0:56–1:38 — chorus, increased complexity
  every(56,98,1);
  // 1:39–2:08 — second verse, slower but medium difficulty
  every(99,128,2);
  // 2:09–2:21 — accelerate
  every(129,141,2);
  // 2:22–3:05 — second chorus
  every(142,185,1);
  // 3:06–3:28 — bridge, climax / hardest section, no doubles
  every(186,208,1);
  // 3:29–3:51 — instrumental, repeating elements, rest
  every(209,231,3);
  // 3:52–4:39 — chorus, regular difficulty
  every(232,279,1);
  // 4:40–4:53 — rest
  every(280,293,3);
  // 4:54–5:48 — final chorus, gradually slowing to the end
  every(294,312,2);
  every(313,330,3);
  every(331,340,3);
  every(341,348,4);

  return chart;
}
const THRONE_CHART = buildThroneChart();

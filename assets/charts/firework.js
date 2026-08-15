// Firework — rhythm chart
// Built from the uploaded track: detected tempo ~156.25 BPM, beat grid anchored at ~3.723s.
// No simultaneous double notes. Sections follow the player's timing plan.
const FIREWORK_BPM = 156.25;
const FIREWORK_BEAT = 60 / FIREWORK_BPM;
const FIREWORK_BEAT0 = 3.722667;
const FIREWORK_LANES = ['ArrowLeft','ArrowUp','ArrowDown','ArrowRight'];

function buildFireworkChart(){
  const chart=[];
  let cursor=0;
  const add=(time)=>chart.push({time:Number(time.toFixed(3)),key:FIREWORK_LANES[cursor++%4],strength:(cursor%4===1?'strong':'normal')});
  const every=(start,end,step)=>{
    let i=Math.max(0,Math.ceil((start-FIREWORK_BEAT0)/FIREWORK_BEAT));
    const endI=Math.floor((end-FIREWORK_BEAT0)/FIREWORK_BEAT);
    for(;i<=endI;i+=step)add(FIREWORK_BEAT0+i*FIREWORK_BEAT);
  };
  const mixed=(start,end)=>{
    let i=Math.max(0,Math.ceil((start-FIREWORK_BEAT0)/FIREWORK_BEAT));
    const endI=Math.floor((end-FIREWORK_BEAT0)/FIREWORK_BEAT);
    let n=0;
    while(i<=endI){ add(FIREWORK_BEAT0+i*FIREWORK_BEAT); i += (++n%3===0 ? 1 : 2); }
  };

  // 0:00–0:26 — sparse intro
  every(0,26,4);
  // 0:27–0:50 — acceleration
  every(27,50,2);
  // 0:51–1:14 — verse, main speed
  every(51,74,2);
  // 1:15–1:26 — light acceleration
  mixed(75,86);
  // 1:27–1:52 — chorus, hardest section, single notes only
  every(87,112,1);
  // 1:53–1:58 — slow back to main speed
  every(113,118,2);
  // 1:59–2:22 — verse
  every(119,142,2);
  // 2:23–2:34 — light acceleration
  mixed(143,154);
  // 2:35–3:00 — chorus
  every(155,180,1);
  // 3:01–3:18 — instrumental, repeating chorus-speed elements
  every(181,198,1);
  // 3:19–3:38 — bridge, rest
  every(199,218,3);
  // 3:39–3:47 — exit, gentle build
  every(219,227,2);
  // 3:48–3:58 — final chorus, difficult but unhurried
  every(228,238,2);
  // 3:59–4:12 — accelerate toward chorus speed
  mixed(239,252);
  // 4:13–4:52 — additional chorus, regular chorus speed
  every(253,292,1);

  return chart;
}
const FIREWORK_CHART = buildFireworkChart();

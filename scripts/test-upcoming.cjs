const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const cp=require('node:child_process');
const html=fs.readFileSync('index.html','utf8');
const src=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/init\(\);\s*$/, '');
const context=vm.createContext({document:{getElementById:()=>({addEventListener(){}}),querySelectorAll:()=>[]}});
vm.runInContext(src,context);
const data=JSON.parse(fs.readFileSync('bands.json','utf8'));
const baseline=JSON.parse(cp.execFileSync('git',['show','6d12a58:bands.json'],{encoding:'utf8'}));
assert.deepEqual(data.want.filter(b=>b.name!=='Filow'),baseline.want.filter(b=>b.name!=='HOLY PRIEST'));
assert.deepEqual(data.seen.filter(b=>!['HOLY PRIEST','The Butcher Sisters'].includes(b.name)),baseline.seen.filter(b=>b.name!=='The Butcher Sisters'));
assert(data.seen.find(b=>b.name==='The Butcher Sisters').note.includes(baseline.seen.find(b=>b.name==='The Butcher Sisters').note));
const filow=data.want.filter(b=>b.name==='Filow');assert.equal(filow.length,1);assert.equal(filow[0].trackTitle,'Rasenschach');assert.match(filow[0].preview,/^previews\/Filow\.mp3\?v=\d+$/);assert(fs.statSync('previews/Filow.mp3').size>0);
const expected=[['2026-10-23','The Butcher Sisters','Mannheim'],['2026-11-06','HOLY PRIEST','Mannheim'],['2026-11-20','Drunken Masters','Stuttgart'],['2026-11-26','Filow','Frankfurt'],['2026-12-18','STUTYARD','Stuttgart'],['2027-02-18','JUGO ÜRDENS','Frankfurt'],['2027-04-03','RAUM27','Wiesbaden'],['2027-04-08','Jack Pott','Wiesbaden'],['2027-04-16','Drunken Masters','Mannheim'],['2027-04-22','Moonkid','Wiesbaden'],['2027-05-28','Fall Out Boy','Mönchengladbach']];
assert.deepEqual(data.upcoming.map(e=>[e.date,e.artist,e.city]),expected);
context.events=data.upcoming.slice().reverse();
const before=JSON.stringify(context.events);
for(const [today,count] of [['2026-10-12',11],['2026-10-23',11],['2026-10-24',10],['2026-11-07',9],['2027-02-18',6],['2027-02-19',5],['2027-04-03',5],['2027-04-04',4],['2027-04-17',2],['2027-04-23',1],['2027-05-28',1],['2027-05-29',0]]){
 context.today=today;
 const actual=vm.runInContext('upcomingEvents(events,today)',context);
 assert.equal(actual.length,count);assert.deepEqual(Array.from(actual,e=>[e.date,e.artist,e.city]),expected.filter(e=>e[0]>=today));
}
assert.equal(JSON.stringify(context.events),before);
for(const [instant,date] of [['2026-10-22T22:30:00Z','2026-10-23'],['2026-11-05T23:30:00Z','2026-11-06'],['2026-10-23T21:59:00Z','2026-10-23']]){
 context.instant=instant;assert.equal(vm.runInContext('berlinToday(new Date(instant))',context),date);
}
assert(html.indexOf('id="upcoming"')<html.indexOf('id="bucket"'));
assert.equal(data.want.length,35);assert.equal(data.seen.length,50);
console.log('PASS: exact 11 stored events, 9 current upcoming concerts, chronological order, Berlin midnight/DST, day-inclusive filtering, immutable input, unchanged 35 WANT / 50 SEEN.');

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
assert.deepEqual(data.want,baseline.want);assert.deepEqual(data.seen,baseline.seen);
const expected=[['2026-10-23','The Butcher Sisters','Mannheim'],['2026-11-06','HOLY PRIEST','Mannheim'],['2026-11-20','Drunken Masters','Stuttgart'],['2026-11-26','Filow','Frankfurt'],['2026-12-18','STUTYARD','Stuttgart'],['2027-04-08','Jack Pott','Wiesbaden'],['2027-04-16','Drunken Masters','Mannheim'],['2027-04-22','Moonkid','Wiesbaden']];
assert.deepEqual(data.upcoming.map(e=>[e.date,e.artist,e.city]),expected);
context.events=data.upcoming.slice().reverse();
const before=JSON.stringify(context.events);
for(const [today,count] of [['2026-10-12',8],['2026-10-23',8],['2026-10-24',7],['2027-04-17',1],['2027-04-23',0]]){
 context.today=today;
 const actual=vm.runInContext('upcomingEvents(events,today)',context);
 assert.equal(actual.length,count);assert.deepEqual(Array.from(actual,e=>[e.date,e.artist,e.city]),expected.filter(e=>e[0]>=today));
}
assert.equal(JSON.stringify(context.events),before);
for(const [instant,date] of [['2026-10-22T22:30:00Z','2026-10-23'],['2026-11-05T23:30:00Z','2026-11-06'],['2026-10-23T21:59:00Z','2026-10-23']]){
 context.instant=instant;assert.equal(vm.runInContext('berlinToday(new Date(instant))',context),date);
}
assert(html.indexOf('id="upcoming"')<html.indexOf('id="bucket"'));
assert.equal(data.want.length,35);assert.equal(data.seen.length,49);
console.log('PASS: exact 8 identities/dates/cities, chronological order, Berlin midnight/DST, day-inclusive filtering, immutable input, unchanged 35 WANT / 49 SEEN.');

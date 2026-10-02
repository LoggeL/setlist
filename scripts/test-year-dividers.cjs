const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1].replace(/init\(\);\s*$/, '');
class Element {
  constructor(){this.children=[];this.dataset={};this.style={};}
  appendChild(child){this.children.push(child);return child;}
  replaceChildren(){this.children=[];}
  addEventListener(){}
}
const elements = {};
const document = {createElement:()=>new Element(),createTextNode:text=>({textContent:text}),getElementById:id=>elements[id]??=new Element(),querySelectorAll:()=>[]};
let data;
const context = vm.createContext({document,fetch:async()=>({json:async()=>data})});
vm.runInContext(source,context);
async function check(input, labels, names){
  data=input;
  await vm.runInContext('init()',context);
  const children=elements.sg.children;
  assert.deepEqual(children.filter(e=>e.className==='year-divider').map(e=>e.textContent),labels);
  assert.equal(children.filter(e=>e.className==='seen-card').length,input.seen.length);
  assert.equal(elements.wg.children.length,input.want.length);
  if(names)assert.deepEqual(children.filter(e=>e.className==='seen-card').map(e=>e.children[1].children[0].children[0].textContent),names);
  return children;
}
(async()=>{
  const entries=[['unknown','Maybe 2029'],['old','31.12.2024'],['new','01.01.2026'],['invalid','31.02.2027'],['same','01.01.2026'],['mid','01.01.2025'],['empty','']].map(([name,note])=>({name,note}));
  await check({want:[],seen:entries},['2029','2027','2026','2025','2024','Ohne Datum'],['unknown','invalid','new','same','mid','old','empty']);
  const yearCases=[
    ['RaR2023','Rock am Ring, 2023',2023],
    ['Southside2025','Rock am Ring / Southside, 2025',2025],
    ['Multiple','Southside 2025 + Rock am Ring 2023',2023],
    ['Exact wins','07.06.2025 + note 2023',2025],
    ['Invalid','31.02.2027',2027],
    ['No year','Heidelberg',null],
    ['No note',undefined,null],
    ['Not a year','1232025123',null]
  ];
  for(const [name,note,year] of yearCases){
    context.entry={name,note};
    assert.equal(vm.runInContext('concertYear(entry)',context),year,name);
  }
  for(const note of ['31.02.2027','29.02.2025','00.06.2025','10.13.2025','Rock am Ring, 2023']){
    context.entry={note};assert.equal(vm.runInContext('concertDate(entry)',context),null,note);
  }
  await check({want:[],seen:[
    {name:'Z year only',note:'RaR 2025'},
    {name:'Later exact',note:'07.06.2025 + 2023'},
    {name:'A year only',note:'Southside 2025'},
    {name:'Earlier exact',note:'01.06.2025'},
    {name:'Multi year',note:'2025 + 2023'},
    {name:'Yearless',note:'Saarbrücken'}
  ]},['2025','2023','Ohne Datum'],['Later exact','Earlier exact','A year only','Z year only','Multi year','Yearless']);
  await check({want:[],seen:[]},[]);
  await check({want:[],seen:[{name:'Leap',note:'29.02.2024'}]},['2024']);
  const catalog=JSON.parse(fs.readFileSync('bands.json','utf8'));
  assert.equal(catalog.seen.length,49);assert.equal(catalog.want.length,35);
  const children=await check(catalog,['2026','2025','2024','2023','Ohne Datum']);
  let group;
  const counts={},groups={};
  for(const child of children){
    if(child.className==='year-divider')group=child.textContent;
    else {counts[group]=(counts[group]||0)+1;(groups[group]??=[]).push(child.children[1].children[0].children[0].textContent);}
  }
  assert.deepEqual(counts,{'2026':13,'2025':18,'2024':12,'2023':4,'Ohne Datum':2});
  assert.deepEqual(groups['2025'].slice(-5),['Bluthund','ENNIO','Peter Fox','Tream','Yu']);
  assert.equal(groups['2023'].at(-1),'From Fall to Spring');
  assert.deepEqual(groups['Ohne Datum'],['Drunken Masters','Mehnersmoos']);
  console.log('PASS: exact dates, year-only notes, earliest multi-year, exact-date precedence, invalid dates, chronological/alphabetic order; 49 SEEN / 35 WANT',counts);
})().catch(e=>{console.error(e);process.exitCode=1;});

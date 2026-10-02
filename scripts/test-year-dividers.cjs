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
  await check({want:[],seen:entries},['2026','2025','2024','Ohne Datum'],['new','same','mid','old','unknown','invalid','empty']);
  await check({want:[],seen:[]},[]);
  await check({want:[],seen:[{name:'Leap',note:'29.02.2024'}]},['2024']);
  const catalog=JSON.parse(fs.readFileSync('bands.json','utf8'));
  assert.equal(catalog.seen.length,49);assert.equal(catalog.want.length,35);
  const children=await check(catalog,['2026','2025','2024','2023','Ohne Datum']);
  let group;
  const counts={};
  for(const child of children){if(child.className==='year-divider')group=child.textContent;else counts[group]=(counts[group]||0)+1;}
  console.log('PASS: grouping, valid dates, stable chronology, unknown years, empty lists, leap date; 49 SEEN / 35 WANT',counts);
})().catch(e=>{console.error(e);process.exitCode=1;});

'use strict';
const panel=document.querySelector('.map-tools');
if(panel){
 const cards=[...document.querySelectorAll('.map-card')],buttons=[...panel.querySelectorAll('button')],input=document.querySelector('#map-search'),count=document.querySelector('#map-count'),empty=document.querySelector('#map-empty');
 const normal=s=>s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase();let kind='all';
 function apply(){let n=0;const q=normal(input.value.trim());for(const card of cards){const show=(kind==='all'||kind===card.dataset.kind)&&normal(card.dataset.search+' '+card.textContent).includes(q);card.hidden=!show;if(show)n++;}count.textContent=`${n} ${n===1?'map':'maps'}`;empty.hidden=n!==0;}
 buttons.forEach(b=>b.addEventListener('click',()=>{kind=b.dataset.kind;buttons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));apply();}));input.addEventListener('input',apply);panel.hidden=false;
}

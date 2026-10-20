'use strict';
// Progressive enhancement: all publications and links work without JavaScript.
const tools=document.querySelector('.publication-tools');
const search=document.querySelector('#publication-search');
const papers=[...document.querySelectorAll('.paper')];
const buttons=[...document.querySelectorAll('[data-filter]')];
const count=document.querySelector('#results-count');
const empty=document.querySelector('.no-results');
if(tools&&search&&count&&empty){
  let active='All';
  const normalise=s=>s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const apply=()=>{
    const query=normalise(search.value.trim());
    let visible=0;
    for(const p of papers){
      const match=(active==='All'||p.dataset.topic===active)&&normalise(p.textContent).includes(query);
      p.hidden=!match;
      if(match)visible++;
    }
    count.textContent=`${visible} of ${papers.length} selected journal articles · Newest first`;
    empty.hidden=visible!==0;
  };
  for(const b of buttons)b.addEventListener('click',()=>{
    active=b.dataset.filter;
    for(const x of buttons)x.setAttribute('aria-pressed',String(x===b));
    apply();
  });
  search.addEventListener('input',apply);
  document.querySelector('#clear-search').addEventListener('click',()=>{
    search.value='';active='All';
    for(const b of buttons)b.setAttribute('aria-pressed',String(b.dataset.filter==='All'));
    apply();search.focus();
  });
  tools.hidden=false;
}

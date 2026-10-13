const tiles=[...document.querySelectorAll('.tile')],lb=document.getElementById('lb'),li=lb.querySelector('img'),cap=lb.querySelector('figcaption');let vis=tiles,cur=0;
const grid=document.querySelector('.grid');
let curF='all';const VMQ=matchMedia('(max-width:600px)'),vm=()=>VMQ.matches?'b':'a',vtile=document.querySelector('.tile.vid');
const ratio=t=>{const m=t.querySelector('img,video');return (m.tagName=='IMG'&&m.naturalWidth?m.naturalHeight/m.naturalWidth:0)||m.getAttribute('height')/m.getAttribute('width')};
let hero=null;
function layout(){const n=innerWidth<700?1:innerWidth<1100?2:3;if(hero){hero.remove();hero=null}grid.innerHTML='';const cols=[],hs=[];
let list=tiles.filter(t=>!t.classList.contains('hide'));
if(vtile&&curF=='all'&&vm()=='a'&&list.length>3){ // big first painting + stack (video over the next tile), heights matched
 const big=list[0],other=list.find(t=>t!==big&&t!==vtile);list=list.filter(t=>t!==big&&t!==vtile&&t!==other);
 hero=document.createElement('div');hero.className='hero';const L=document.createElement('div'),R=document.createElement('div');L.className='h-big';R.className='h-stack';
 L.appendChild(big);R.appendChild(vtile);R.appendChild(other);hero.appendChild(L);hero.appendChild(R);grid.parentNode.insertBefore(hero,grid);
 const T=grid.clientWidth,g=parseFloat(getComputedStyle(grid).columnGap)||26,r1=ratio(big),r3=ratio(other),w2=((T-g)*r1-g)/(r1+1+r3);
 R.style.width=w2.toFixed(2)+'px';L.style.width=(T-g-w2).toFixed(2)+'px'}
for(let i=0;i<n;i++){const c=document.createElement('div');c.className='col';grid.appendChild(c);cols.push(c);hs.push(0)}
if(vtile&&curF=='all'&&vm()=='b'&&list[0]!==vtile&&list.includes(vtile)){list=list.filter(t=>t!==vtile);list.splice(1,0,vtile);cols[0].appendChild(list[0]);cols[0].appendChild(vtile);hs[0]+=ratio(list[0])+ratio(vtile);list=list.slice(2)}
list.forEach(t=>{let k=0;for(let i=1;i<n;i++)if(hs[i]<hs[k]-1)k=i;cols[k].appendChild(t);hs[k]+=ratio(t)});
document.querySelectorAll('.tile video').forEach(v=>{v.muted=true;const p=v.play();if(p&&p.catch)p.catch(()=>{})})}
addEventListener('resize',()=>{if(hero)layout()});VMQ.addEventListener('change',()=>layout());
let lastN=0;addEventListener('resize',()=>{const n=innerWidth<700?1:innerWidth<1100?2:3;if(n!=lastN){lastN=n;layout()}});lastN=innerWidth<700?1:innerWidth<1100?2:3;layout();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'50px'});
tiles.forEach(t=>io.observe(t));
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('on',x==b));const f=b.dataset.f;curF=f;
tiles.forEach(t=>{const s=f=='all'||t.dataset.c==f;t.classList.toggle('hide',!s);t.classList.remove('in');if(s){io.unobserve(t);io.observe(t)}});vis=tiles.filter(t=>!t.classList.contains('hide'));layout()});
const lv=lb.querySelector('video.lbv');
function show(i){cur=(i+vis.length)%vis.length;const t=vis[cur];
 if(t.dataset.v&&lv){li.hidden=true;lv.hidden=false;lv.poster=t.dataset.f;if(lv.getAttribute('src')!==t.dataset.v)lv.src=t.dataset.v;lv.muted=true;const p=lv.play();if(p&&p.catch)p.catch(()=>{});cap.textContent=t.dataset.t;return}
 if(lv){lv.pause();lv.hidden=true}li.hidden=false;
 li.style.opacity=0;const im=new Image();im.onload=()=>{li.src=t.dataset.f;li.alt=t.dataset.t;cap.textContent=t.dataset.t;li.style.opacity=1};im.src=t.dataset.f}
tiles.forEach(t=>t.onclick=()=>{show(vis.indexOf(t));lb.classList.add('open');lb.setAttribute('aria-hidden','false')});
const close=()=>{if(lv)lv.pause();lb.classList.remove('open');lb.setAttribute('aria-hidden','true')};
lb.querySelector('.x').onclick=close;lb.querySelector('.pv').onclick=e=>{e.stopPropagation();show(cur-1)};lb.querySelector('.nx').onclick=e=>{e.stopPropagation();show(cur+1)};
lb.onclick=e=>{if(e.target==lb)close()};
addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key=='Escape')close();if(e.key=='ArrowLeft')show(cur-1);if(e.key=='ArrowRight')show(cur+1)});
let sx=null;lb.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});
lb.addEventListener('touchend',e=>{if(sx==null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)show(cur+(dx<0?1:-1));sx=null});
(()=>{const h=location.hash.slice(1),b=h&&document.querySelector('nav button[data-f="'+h+'"]');if(b)b.click()})();

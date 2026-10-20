const tiles=[...document.querySelectorAll('.tile')],lb=document.getElementById('lb'),li=lb.querySelector('img'),cap=lb.querySelector('figcaption');let vis=tiles,cur=0;
const grid=document.querySelector('.grid');
function layout(){const n=innerWidth<700?1:innerWidth<1100?2:3;grid.innerHTML='';const cols=[],hs=[];for(let i=0;i<n;i++){const c=document.createElement('div');c.className='col';grid.appendChild(c);cols.push(c);hs.push(0)}
tiles.filter(t=>!t.classList.contains('hide')).forEach(t=>{const im=t.querySelector('img');let k=0;for(let i=1;i<n;i++)if(hs[i]<hs[k]-1)k=i;cols[k].appendChild(t);hs[k]+=im.height/im.width||im.getAttribute('height')/im.getAttribute('width')})}
let lastN=0;addEventListener('resize',()=>{const n=innerWidth<700?1:innerWidth<1100?2:3;if(n!=lastN){lastN=n;layout()}});lastN=innerWidth<700?1:innerWidth<1100?2:3;layout();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'50px'});
tiles.forEach(t=>io.observe(t));
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('on',x==b));const f=b.dataset.f;
tiles.forEach(t=>{const s=f=='all'||t.dataset.c==f;t.classList.toggle('hide',!s);t.classList.remove('in');if(s){io.unobserve(t);io.observe(t)}});vis=tiles.filter(t=>!t.classList.contains('hide'));layout()});
function show(i){cur=(i+vis.length)%vis.length;const t=vis[cur];li.style.opacity=0;const im=new Image();im.onload=()=>{li.src=t.dataset.f;li.alt=t.dataset.t;cap.textContent=t.dataset.t;li.style.opacity=1};im.src=t.dataset.f}
tiles.forEach(t=>t.onclick=()=>{show(vis.indexOf(t));lb.classList.add('open');lb.setAttribute('aria-hidden','false')});
const close=()=>{lb.classList.remove('open');lb.setAttribute('aria-hidden','true')};
lb.querySelector('.x').onclick=close;lb.querySelector('.pv').onclick=e=>{e.stopPropagation();show(cur-1)};lb.querySelector('.nx').onclick=e=>{e.stopPropagation();show(cur+1)};
lb.onclick=e=>{if(e.target==lb)close()};
addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key=='Escape')close();if(e.key=='ArrowLeft')show(cur-1);if(e.key=='ArrowRight')show(cur+1)});
let sx=null;lb.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});
lb.addEventListener('touchend',e=>{if(sx==null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)show(cur+(dx<0?1:-1));sx=null});
(()=>{const h=location.hash.slice(1),b=h&&document.querySelector('nav button[data-f="'+h+'"]');if(b)b.click()})();

/* Order Prints/Stickers pill: link to order page with the current category preselected */
(()=>{const o=document.getElementById('ord-pill');if(!o)return;const set=f=>{o.href='order-prints.html'+(f&&f!='all'?'?cat='+encodeURIComponent(f):'')};
document.querySelectorAll('nav button').forEach(b=>b.addEventListener('click',()=>set(b.dataset.f)));const on=document.querySelector('nav button.on');set(on&&on.dataset.f)})();

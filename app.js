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
const v2=tiles.find(t=>t.classList.contains('vid2'));if(hero&&v2&&list.includes(v2)){list=list.filter(t=>t!==v2);cols[n-1].appendChild(v2);hs[n-1]+=ratio(v2)}
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

/* =====================================================================
   NEWSLETTER CONFIG (MailerLite)  <-- paste your MailerLite details here
   action: the form's action URL from MailerLite's embedded form HTML,
           e.g. "https://assets.mailerlite.com/jsonp/123456/forms/987654321/subscribe"
   formId: the MailerLite form ID, e.g. "987654321"
   While either is empty the signup shows a friendly "coming soon" state.
   ===================================================================== */
const NEWSLETTER = { action: "", formId: "" };

(function(){
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const ML=['January','February','March','April','May','June','July','August','September','October','November','December'];const fmt=d=>{const p=String(d).split('-');return (p[1]?ML[+p[1]-1]+' ':'')+p[0]};
/* signup form (used in the New Art section and in the popup) */
const READY=!!(NEWSLETTER.action&&NEWSLETTER.formId);
const HEART='<svg class="na-heart" viewBox="0 0 64 56" aria-hidden="true"><path d="M32 54C14 41 3 31 3 18 3 9 10 2 18.5 2 25 2 29.5 5.6 32 10.5 34.5 5.6 39 2 45.5 2 54 2 61 9 61 18c0 13-11 23-29 36z"/></svg>';
function collage(inner,small){return '<div class="nlc'+(small?' nlc-sm':'')+'">'+inner+'</div>'}
function nokia(id){const ph='<img class="nk-phone" src="img/nokia-signup.webp" width="559" height="850" alt="Pink Nokia phone">';
 return '<div class="nk">'+'<div class="nk-stage">'+ph+
 '<form class="nk-screen nl-form" novalidate>'+
 '<p class="nk-title">Get new art in your inbox</p>'+
 '<p class="nk-line">New art, no spam.</p>'+
 '<label class="nl-label" for="'+id+'">Your email</label>'+
 '<div class="nk-field"><input id="'+id+'" type="email" name="fields[email]" autocomplete="email" inputmode="email" placeholder="your@email" required spellcheck="false"><span class="nk-cur" aria-hidden="true"></span></div>'+
 '<p class="nk-msg nl-msg" role="status" aria-live="polite">'+(READY?'':'Coming soon!')+'</p>'+
 '<div class="nk-keys"><button type="submit" class="nk-join">Join</button><button type="button" class="nk-clear">Clear</button></div>'+
 '</form></div>'+BLURB.replace('</p>',(READY?'':'<span class="soon">My mailing list opens very soon. Check back shortly!</span>')+'</p>')+'</div>'}
function formHTML(id){return '<form class="nl-form" novalidate data-id="'+id+'">'+
 '<label class="nl-label" for="'+id+'">Your email</label><div class="nl-row">'+
 '<input id="'+id+'" type="email" name="fields[email]" autocomplete="email" inputmode="email" placeholder="you@example.com" required'+(READY?'':' disabled')+'>'+
 '<button type="submit"'+(READY?'':' disabled')+'>'+(READY?'Sign me up':'Coming soon')+'</button></div>'+
 '<p class="nl-msg" role="status" aria-live="polite">'+(READY?'Just new art, a few times a year. Unsubscribe anytime.':'My mailing list opens very soon. Check back shortly!')+'</p></form>'}
function wire(f){f.addEventListener('submit',e=>{e.preventDefault();const msg=f.querySelector('.nl-msg'),inp=f.querySelector('input'),btn=f.querySelector('button');
 if(!READY){msg.textContent=f.classList.contains('nk-screen')?'Coming soon! Opens shortly.':'My mailing list opens very soon. Check back shortly!';return}
 const v=inp.value.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){msg.textContent='Please check that email address.';inp.focus();return}
 const fd=new FormData();fd.append('fields[email]',v);fd.append('ml-submit','1');fd.append('anticsrf','true');btn.disabled=true;btn.textContent='Sending…';
 fetch(NEWSLETTER.action,{method:'POST',body:fd,mode:'no-cors'}).then(()=>{f.classList.add('done');msg.textContent='Thank you! Check your inbox to confirm.';try{localStorage.setItem('dj_nl_joined','1')}catch(_){}})
  .catch(()=>{btn.disabled=false;btn.textContent=btn.classList.contains('nk-join')?'Join':'Sign me up';msg.textContent='Hmm, that didn\u2019t go through. Please try again.'})})}
const BLURB='<p class="nl-blurb"><strong>Join my art list:</strong> be the first to see new illustrations, paintings and videos the moment they\u2019re posted, plus occasional behind-the-scenes peeks. No spam, just art, and you can unsubscribe anytime.</p>';
(()=>{const box=document.getElementById('na-signup-top');if(!box)return;box.innerHTML=nokia('nl-email-top');const f=box.querySelector('form');wire(f);
 const inp=f.querySelector('input');f.querySelector('.nk-clear').onclick=()=>{inp.value='';f.querySelector('.nk-msg').textContent=READY?'':'Coming soon!';inp.focus()}})();

/* gentle once-per-visitor popup: after ~20s or 50% scroll; remembered in localStorage */
const KEY='dj_nl_popup_seen';let seen=false;try{seen=!!localStorage.getItem(KEY)||!!localStorage.getItem('dj_nl_joined')}catch(_){}
if(seen)return;
let shown=false,timer;
function open(){if(shown)return;shown=true;clearTimeout(timer);removeEventListener('scroll',onScroll);try{localStorage.setItem(KEY,'1')}catch(_){}
 const p=document.createElement('aside');p.className='nl-pop';p.setAttribute('role','dialog');p.setAttribute('aria-label','Get new art in your inbox');
 p.innerHTML='<button class="nl-x" type="button" aria-label="Close">&times;</button>'+collage('<h3 class="nl-title">Get new art in your inbox</h3><p class="nl-blurb">New art straight to you. No spam, ever.</p>'+formHTML('nl-pop-email'),true);
 document.body.appendChild(p);wire(p.querySelector('form'));requestAnimationFrame(()=>p.classList.add('show'));
 const close=()=>{p.classList.remove('show');setTimeout(()=>p.remove(),300);removeEventListener('keydown',esc2)};
 const esc2=e=>{if(e.key==='Escape')close()};p.querySelector('.nl-x').onclick=close;addEventListener('keydown',esc2)}
function onScroll(){const h=document.documentElement.scrollHeight-innerHeight;if(h>200&&scrollY/h>=.5)open()}
timer=setTimeout(open,20000);addEventListener('scroll',onScroll,{passive:true});
window.djShowSignupPopup=open; // handy for testing
})();

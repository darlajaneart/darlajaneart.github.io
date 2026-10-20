/* Size-reference preview ("Preview at actual scale"). Standalone module.
   Hook: order-prints.js calls window.sizePreview.update(state, mountEl) at the end of render(). */
(function(){
var CAN_H=4.83, CAN_W=2.6, FRAME=0.8; /* frame face width in inches (thin black wood, Gelato-style ~20mm) */
var CAN_IMG={src:'img/soda-can.png',w:444,h:842,bodyTop:6,bodyBot:835,bodyW:432}; /* px geometry of the cutout */
var dims={}, el=null, last=null;
var ISO={A4:[8.27,11.69],A3:[11.69,16.54],A2:[16.54,23.39]};
function parse(s){if(ISO[s])return ISO[s];var m=/^(\d+)x(\d+)$/.exec(s||'');return m?[+m[1],+m[2]]:null}
/* print-plans.json: generated from /workspace/fourthwall/pieces.csv + fit.py (background trim/extension only, never distortion) */
var PLANS=null,plansP=null;function plans(cb){if(PLANS)return cb(PLANS);if(!plansP)plansP=fetch('img/prints/print-plans.json').then(function(r){return r.json()}).catch(function(){return {}});plansP.then(function(j){PLANS=j||{};cb(PLANS)})}
function nat(src,cb){if(dims[src])return cb(dims[src]);var i=new Image();i.onload=function(){dims[src]=[i.naturalWidth,i.naturalHeight];cb(dims[src])};i.onerror=function(){cb(null)};i.src=src}
function ensure(mount){
 if(el&&el.isConnected)return el;
 el=document.createElement('section');el.className='sp';el.setAttribute('aria-label','Preview at actual scale');
 el.innerHTML='<p class="sp-eyebrow">Preview at actual scale</p><div class="sp-scene"><div class="sp-wall"></div><div class="sp-floor"></div><div class="sp-items"><div class="sp-print"><img class="sp-art" alt=""><span class="sp-glass" aria-hidden="true"></span><span class="sp-rabbet" aria-hidden="true"></span></div><img class="sp-can" src="'+CAN_IMG.src+'" alt="12 oz soda can for scale"></div></div><p class="sp-cap">Soda pop for scale (12 oz can) &middot; <span class="sp-dim"></span></p>';
 mount.appendChild(el);return el}
function layout(){if(!el||!last)return;var sc=el.querySelector('.sp-scene'),W=sc.clientWidth;if(!W)return;
 var p=last,fw=p.framed?FRAME:0,pw=p.w+2*fw,ph=p.h+2*fw,gap=Math.max(1.5,pw*0.12);
 var totW=pw+gap+CAN_W, maxH=Math.max(ph,CAN_H);
 var Hav=Math.min(window.innerHeight*0.62,560)-60, k=Math.min((W*0.84)/totW,Hav/maxH);
 var floor=40, Hs=Math.round(maxH*k+floor+Math.max(28,k*1.2));sc.style.height=Hs+'px';
 var it=el.querySelector('.sp-items');it.style.bottom=floor+'px';it.style.gap=Math.round(gap*k)+'px';
 var pr=el.querySelector('.sp-print');pr.style.width=Math.round(p.w*k)+'px';pr.style.height=Math.round(p.h*k)+'px';
 pr.style.borderWidth=p.framed?Math.max(3,Math.round(fw*k))+'px':'0';pr.classList.toggle('is-framed',!!p.framed);
 /* can: scale image so the can body (not shadow padding) equals 4.83in; base sits on floor line */
 var c=el.querySelector('.sp-can'),s=(CAN_H*k)/(CAN_IMG.bodyBot-CAN_IMG.bodyTop);
 c.style.width=Math.round(CAN_IMG.w*s)+'px';c.style.marginBottom=-Math.round((CAN_IMG.h-CAN_IMG.bodyBot)*s)+'px';
 c.style.marginLeft=c.style.marginRight=-Math.round((CAN_IMG.w-CAN_IMG.bodyW)/2*s)+'px'}
function update(S,mount){
 var ok=S&&S.type==='print'&&S.piece&&S.size&&S.framed&&S.thumb&&parse(S.size);
 if(!ok){if(el)el.hidden=true;last=null;return}
 var box=ensure(mount),d=parse(S.size),src=S.thumb,framed=S.framed==='framed',key=[src,S.size,framed].join('|');
 box.hidden=false;if(last&&last.key===key){layout();return}
 plans(function(P){var info=P[S.piece.toLowerCase()],src=(info&&info.src)||S.thumb;
 nat(src,function(n){var nw=info?info.W:(n?n[0]:1),nh=info?info.H:(n?n[1]:1),a=Math.min(d[0],d[1]),b=Math.max(d[0],d[1]),pl=info&&info.plans[S.size],w,h,pos;
  if(pl){w=pl[0];h=pl[1];/* canvas pl[2]xpl[3] source px, art offset -pl[4],-pl[5] */pos={l:-pl[4]/pl[2],t:-pl[5]/pl[3],w:nw/pl[2],h:nh/pl[3]}}
  else{var land=nw>nh;w=land?b:a;h=land?a:b;var k=Math.min(w/nw,h/nh);pos={w:nw*k/w,h:nh*k/h};pos.l=(1-pos.w)/2;pos.t=(1-pos.h)/2}/* fallback: uniform fit, never stretched */
  last={key:key,w:w,h:h,framed:framed};var img=box.querySelector('.sp-art'),pr=box.querySelector('.sp-print');if(img.getAttribute('src')!==src)img.src=src;
  img.style.left=pos.l*100+'%';img.style.top=pos.t*100+'%';img.style.width=pos.w*100+'%';img.style.height=pos.h*100+'%';
  var bg=(info&&info.bg)||[255,255,255];pr.style.backgroundColor='rgb('+bg.join(',')+')';img.alt=S.piece+' at '+w+'×'+h+'″';
  box.querySelector('.sp-dim').textContent=S.piece+', '+w+'×'+h+'″ '+(framed?'framed in black wood':'unframed matte print');layout()})})}
window.addEventListener('resize',layout);
window.sizePreview={update:update};
})();

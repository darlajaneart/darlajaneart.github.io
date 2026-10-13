/* Decorative accents (preview build). All aria-hidden, pointer-events none. */
(function(){
var D='img/deco/';
// fish band: animated pastel pixel school swimming right-to-left across the full width
var ab=document.querySelector('#about');
if(ab){var b=document.createElement('div');b.className='fish-band';b.setAttribute('aria-hidden','true');ab.appendChild(b);
 var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
 function band(){var W=document.documentElement.clientWidth,mob=innerWidth<=700,fw=mob?240:300,n=Math.max(2,Math.round(W/300)+1),sp=mob?38:46,D=((W+fw*1.12)/sp),h='';
  var gap=[0,.37,.61,.86,.2,.5],sc=[1,.82,1.08,.9,.96,.86],yy=[2,24,-6,16,-2,10],src=['fish-school-c.webp','fish-school-c-2.webp','fish-school-c-3.webp'];
  for(var i=0;i<n;i++){var dl=-((i+gap[i%6]*.25)*D/n).toFixed(2),y=yy[i%6];
   h+=rm?'<img class="fs" src="'+D_+'fish-still-c.webp" alt="" style="left:'+(4+i*(92/n)).toFixed(1)+'%;top:'+(y+6)+'px">'
     :'<img class="fs" src="'+D_+src[i%3]+'?v=1" alt="" style="left:100%;top:'+(y+6)+'px;width:'+(fw*sc[i%6]).toFixed(0)+'px;--dist:-'+(W+fw*1.12).toFixed(0)+'px;animation:fswim '+D.toFixed(2)+'s linear '+dl+'s infinite">'}
  b.innerHTML=h}
 var D_=D;band();var bw=innerWidth;addEventListener('resize',function(){if(innerWidth!==bw){bw=innerWidth;band()}})}
// Contact: cupid wax seal in normal page flow, centred above the CONTACT eyebrow (never over photos)
var ce=document.querySelector('#contact .eyebrow');if(ce&&!document.querySelector('.contact-seal')){var cs=document.createElement('img');cs.className='contact-seal';cs.src=D+'seal.png';cs.alt='';cs.setAttribute('aria-hidden','true');ce.parentNode.insertBefore(cs,ce)}
var L=document.createElement('div');L.className='deco-layer';L.setAttribute('aria-hidden','true');document.body.appendChild(L);
function put(src,x,y,w,rot){var W=document.documentElement.clientWidth;if(x<0||x+w>W)return;var i=document.createElement('img');i.src=D+src;i.alt='';i.style.cssText='left:'+x.toFixed(0)+'px;top:'+y.toFixed(0)+'px;width:'+w.toFixed(0)+'px;transform:rotate('+(rot||0)+'deg)';L.appendChild(i)}
function seqRects(){return [].map.call(document.querySelectorAll('.sq-layer img,.sq-top-layer img'),function(e){var r=e.getBoundingClientRect();return {l:r.left-3,t:r.top+scrollY-3,r:r.right+3,b:r.bottom+scrollY+3}})}
function free(x,y,s,Q){return Q.every(function(q){return x+s<q.l||x>q.r||y+s<q.t||y>q.b})}
function R(sel){var e=document.querySelector(sel);if(!e)return null;var r=e.getBoundingClientRect();if(!r.width&&!r.height)return null;return {l:r.left,t:r.top+scrollY,r:r.right,b:r.bottom+scrollY,w:r.width,h:r.height}}
function txt(sel){var e=document.querySelector(sel);if(!e||!e.getClientRects().length)return null;var g=document.createRange();g.selectNodeContents(e);var r=g.getBoundingClientRect();if(!r.width&&!r.height)return null;return {l:r.left,t:r.top+scrollY,r:r.right,b:r.bottom+scrollY,w:r.width,h:r.height}}
function place(){L.innerHTML='';var mob=innerWidth<=700,r;
  
 // Meet the Artist: rhinestone star + jewel flower flanking the eyebrow
 if(r=txt('.artist-head .eyebrow')){var s=mob?34:48;put('rhinestone-star.png',r.l-s-14,r.t+r.h/2-s/2,s,-10);put('jewel-flower.png',r.r+14,r.t+r.h/2-s/2,s,12)}
 // Collector tier: wax seal on the card corner
 var t=[].filter.call(document.querySelectorAll('.tier'),function(e){return /Collector/.test(e.textContent)})[0];
 if(t&&t.getClientRects().length){var b=t.getBoundingClientRect(),s=mob?62:76,x=b.right-s*.8,y=b.top+scrollY-s*.3,W=document.documentElement.clientWidth;if(x+s<=W){var g=document.createElement('span');g.className='gold-seal';g.style.cssText='left:'+x.toFixed(0)+'px;top:'+y.toFixed(0)+'px;width:'+s+'px;height:'+s+'px;transform:rotate(10deg)';g.innerHTML='<img src="'+D+'seal-gold-d.png" alt=""><i class="gl"></i><b class="tw t1"></b><b class="tw t2"></b><b class="tw t3"></b>';L.appendChild(g)}}
}
var tm;addEventListener('load',function(){setTimeout(place,80);setTimeout(place,700);setTimeout(place,1600)});addEventListener('resize',function(){clearTimeout(tm);tm=setTimeout(place,150)});addEventListener('hashchange',function(){clearTimeout(tm);tm=setTimeout(place,120)});if(document.fonts)document.fonts.ready.then(function(){setTimeout(place,80)})})();

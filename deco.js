/* Decorative accents (preview build). All aria-hidden, pointer-events none. */
(function(){
var D='img/deco/';
// bunny parade
var ab=document.querySelector('#about');
if(ab){var b=document.createElement('div');b.className='bunny-band';b.setAttribute('aria-hidden','true');
 var h='';[[8,30],[22,62],[37,20],[50,55],[63,28],[76,60],[90,24],[15,10],[44,8],[83,12]].forEach(function(p,i){h+='<img class="st" src="'+D+'star-red-'+(i+1)+'.png" alt="" style="left:'+p[0]+'%;top:'+p[1]+'%;animation-delay:'+(i*.37).toFixed(2)+'s">'});
 for(var i=0;i<4;i++)h+='<span class="bn" style="animation-delay:-'+(i*(innerWidth<=700?20:26)/4).toFixed(2)+'s;--x:'+(12+i*22)+'%"><img src="'+D+'bunny-'+(i+1)+'.png" alt="" style="animation-delay:-'+(i*.22).toFixed(2)+'s"></span>';
 b.innerHTML=h;ab.appendChild(b)}
// positioned accents
var L=document.createElement('div');L.className='deco-layer';L.setAttribute('aria-hidden','true');document.body.appendChild(L);
function put(src,x,y,w,rot){var W=document.documentElement.clientWidth;if(x<0||x+w>W)return;var i=document.createElement('img');i.src=D+src;i.alt='';i.style.cssText='left:'+x.toFixed(0)+'px;top:'+y.toFixed(0)+'px;width:'+w.toFixed(0)+'px;transform:rotate('+(rot||0)+'deg)';L.appendChild(i)}
function R(sel){var e=document.querySelector(sel);if(!e)return null;var r=e.getBoundingClientRect();return {l:r.left,t:r.top+scrollY,r:r.right,b:r.bottom+scrollY,w:r.width,h:r.height}}
function txt(sel){var e=document.querySelector(sel);if(!e)return null;var g=document.createRange();g.selectNodeContents(e);var r=g.getBoundingClientRect();return {l:r.left,t:r.top+scrollY,r:r.right,b:r.bottom+scrollY,w:r.width,h:r.height}}
function place(){L.innerHTML='';var mob=innerWidth<=700,r;
 // Contact: cupid wax seal "sealing" the section, centred above the eyebrow
 if(r=txt('#contact .eyebrow')){var s=mob?58:78;put('seal.png',(r.l+r.r)/2-s/2,r.t-s-14,s,-8)}
 // Meet the Artist: rhinestone star + jewel flower flanking the eyebrow
 if(r=txt('.artist-head .eyebrow')){var s=mob?34:48;put('rhinestone-star.png',r.l-s-14,r.t+r.h/2-s/2,s,-10);put('jewel-flower.png',r.r+14,r.t+r.h/2-s/2,s,12)}
 // Patreon label: symmetrical frame of pink gems around the PATREON word (no sparkle)
 if(r=R('p.hand-eyebrow img')){var cx=(r.l+r.r)/2,cy=(r.t+r.b)/2,gap=mob?18:24,rx=r.w/2+gap+6,ry=r.h/2+gap,n=mob?16:20,W=document.documentElement.clientWidth;
   rx=Math.min(rx,W/2-8);
   for(var k=0;k<n;k++){var th=Math.PI*(k+.5)/n*2,ex=Math.cos(th),ey=Math.sin(th);if(ey>0.55)continue;
     var gs=(mob?13:17)+((k%2)==0?(mob?3:4):0),x=cx+ex*rx-gs/2,y=cy+ey*ry-gs/2;put('gem-'+(1+(k%12))+'.png',x,y,gs,0)}}
 // Collector tier: wax seal on the card corner
 var t=[].filter.call(document.querySelectorAll('.tier'),function(e){return /Collector/.test(e.textContent)})[0];
 if(t){var b=t.getBoundingClientRect(),s=mob?62:76,x=b.right-s*.8,y=b.top+scrollY-s*.3,W=document.documentElement.clientWidth;if(x+s<=W){var g=document.createElement('span');g.className='gold-seal';g.style.cssText='left:'+x.toFixed(0)+'px;top:'+y.toFixed(0)+'px;width:'+s+'px;height:'+s+'px;transform:rotate(10deg)';g.innerHTML='<img src="'+D+'seal-gold.png" alt=""><i class="gl"></i><b class="tw t1"></b><b class="tw t2"></b><b class="tw t3"></b>';L.appendChild(g)}}
}
var tm;addEventListener('load',function(){setTimeout(place,80)});addEventListener('resize',function(){clearTimeout(tm);tm=setTimeout(place,150)});if(document.fonts)document.fonts.ready.then(function(){setTimeout(place,80)})})();

/* Deterministic sequin stripe around the signature title (shared: index + patreon) */
(function(){
var P='img/patreon/sequins/';
// [side, dx (x sig height, from sig edge), dy (x sig height, from sig top), size (x sig height), file, rotation]
// [fx (fraction of signature width from its left edge), dy (x signature height from its top), size (x sig height), file, rotation]
var S=[[.04,-.3,.22,'sq-10-pink.png',20],[.15,-.42,.18,'sq-01-gold.png',140],[.27,-.28,.15,'sq-02-teal.png',75],[.73,-.3,.16,'sq-18-silver.png',200],[.85,-.44,.2,'sq-15-teal.png',110],[.96,-.3,.22,'sq-12-pink.png',250]];
// beside the "Illustration" line: [side, gap (x size) from text edge, dy (x size) from line centre, size (x sig height), file, rot]
var T=[['L',.6,-.25,.26,'sq-21-gold.png',35],['L',2.0,.55,.2,'sq-16-pink.png',300],['R',.6,-.2,.24,'sq-09-silver.png',160],['R',2.0,.6,.2,'sq-04-teal.png',320]];
function place(){var L=document.querySelector('.sq-top-layer'),g=document.querySelector('header .sig img');if(!L||!g)return;L.innerHTML='';
var b=g.getBoundingClientRect(),h=b.height,W=document.documentElement.clientWidth,y0=b.top+scrollY;if(!h)return;
S.forEach(function(q){var s=Math.max(14,Math.min(34,q[2]*h)),x=b.left+q[0]*b.width-s/2,y=y0+q[1]*h-s/2;if(x<2||x+s>W-2||y<2)return;
var i=document.createElement('img');i.src=P+q[3];i.alt='';i.style.cssText='left:'+x.toFixed(0)+'px;top:'+y.toFixed(0)+'px;width:'+s.toFixed(0)+'px;transform:rotate('+q[4]+'deg)';L.appendChild(i)});var u=document.querySelector('header .sub');if(!u)return;var r=document.createRange();r.selectNodeContents(u);var t=r.getBoundingClientRect(),cy=t.top+scrollY+t.height/2;T.forEach(function(q){var s=Math.max(12,Math.min(24,q[3]*h)),x=q[0]=='L'?t.left-q[1]*s-s:t.right+q[1]*s,y=cy+q[2]*s-s/2;if(x<2||x+s>W-2)return;var i=document.createElement('img');i.src=P+q[4];i.alt='';i.style.cssText='left:'+x.toFixed(0)+'px;top:'+y.toFixed(0)+'px;width:'+s.toFixed(0)+'px;transform:rotate('+q[5]+'deg)';L.appendChild(i)})}
window.sqTopPlace=place;addEventListener('load',place);addEventListener('resize',function(){clearTimeout(window._sqt);window._sqt=setTimeout(place,120)})})();
/* nav: hide separator dot on items that start a new wrapped line */
(function(){function f(){var n=document.querySelector('header nav');if(!n)return;var t=null;[].forEach.call(n.children,function(c){c.classList.remove('nl');if(t!==null&&c.offsetTop>t+4)c.classList.add('nl');t=c.offsetTop})}
addEventListener('load',f);addEventListener('resize',f);if(document.fonts)document.fonts.ready.then(f)})();
/* Patreon: organic spilled-sequin scatter around the ribbon */
window.sqAfter=function(){var L=document.querySelector('.sq-layer'),p=document.querySelector('.pt-hero .lead'),ro=document.querySelector('.rosebtn>img'),ch=document.querySelector('.clickme');if(!L||!p||!ro)return;
var sy=scrollY,mob=innerWidth<=700,W=document.documentElement.clientWidth,pr=p.getBoundingClientRect(),cb=(ch||ro).getBoundingClientRect(),top=pr.bottom+sy-30,bot=Math.max(cb.bottom,ro.getBoundingClientRect().bottom)+sy+10;
var bx=[];function add(b,pd){if(b.width&&b.height)bx.push([b.left-pd,b.top+sy-pd,b.right+pd,b.bottom+sy+pd])}
document.querySelectorAll('.pt-hero p,.pt-hero h2,.pt-why h2,.pt-why p').forEach(function(e){var g=document.createRange();g.selectNodeContents(e);[].forEach.call(g.getClientRects(),function(r){add(r,mob?5:7)})});
document.querySelectorAll('.rosebtn>img,.joinrow .cg,.clickme,.btn-hand').forEach(function(e){add(e.getBoundingClientRect(),mob?5:8)});
[].slice.call(L.querySelectorAll('img')).forEach(function(i){var b=i.getBoundingClientRect(),cy=b.top+sy+b.height/2;if(cy>top&&cy<bot)i.remove()});
var sd=mob?29:47;function rnd(){sd=(sd*16807)%2147483647;return (sd-1)/2147483646}
var F=['sq-02-teal','sq-10-pink','sq-14-gold','sq-08-silver','sq-16-pink','sq-04-teal','sq-21-gold','sq-12-pink','sq-18-silver','sq-01-gold','sq-15-teal','sq-19-pink','sq-09-silver','sq-13-pink'];
var placed=[],N=mob?14:22,mn=mob?12:13,mx=mob?21:28,cl=[];for(var c=0;c<(mob?3:4);c++)cl.push([8+rnd()*(W-16),top+rnd()*(bot-top)]);
function ok(x,y,s){if(x<4||x+s>W-4||y<top||y+s>bot)return false;for(var k=0;k<bx.length;k++){var q=bx[k];if(x+s>q[0]&&x<q[2]&&y+s>q[1]&&y<q[3])return false}for(k=0;k<placed.length;k++){var o=placed[k];if(x+s>o[0]-2&&x<o[0]+o[2]+2&&y+s>o[1]-2&&y<o[1]+o[2]+2)return false}return true}
for(var t=0,n=0;n<N&&t<6000;t++){var s=mn+Math.pow(rnd(),1.6)*(mx-mn),x,y;if(rnd()<.55){var C=cl[Math.floor(rnd()*cl.length)],a=rnd()*6.28,d=rnd()*(mob?40:60);x=C[0]+Math.cos(a)*d;y=C[1]+Math.sin(a)*d*.7}else{x=rnd()*W;y=top+rnd()*(bot-top)}
 if(!ok(x,y,s))continue;placed.push([x,y,s]);n++;var i=document.createElement('img');i.className='trail';i.src='img/patreon/sequins/'+F[Math.floor(rnd()*F.length)]+'.png';i.alt='';i.style.cssText='left:'+x.toFixed(0)+'px;top:'+y.toFixed(0)+'px;width:'+s.toFixed(0)+'px;transform:rotate('+(rnd()*360).toFixed(0)+'deg)';L.appendChild(i)}};

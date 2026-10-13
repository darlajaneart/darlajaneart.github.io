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

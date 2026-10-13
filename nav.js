/* Sticky compact nav + back-to-top */
(function(){var n=document.querySelector('header nav');if(!n)return;
var sp=document.createElement('div');sp.className='nav-spacer';n.parentNode.insertBefore(sp,n);
var b=document.createElement('button');b.className='totop';b.type='button';b.setAttribute('aria-label','Back to top');b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 14l6-6 6 6"/></svg>';document.body.appendChild(b);
b.addEventListener('click',function(){scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});
function lines(){var t=null;[].forEach.call(n.children,function(c){c.classList.remove('nl');if(t!==null&&c.offsetTop>t+4)c.classList.add('nl');t=c.offsetTop})}
var stuck=false,y0=0;
function measure(){if(stuck)return;var r=sp.getBoundingClientRect();y0=r.top+scrollY+parseFloat(getComputedStyle(n).marginTop)}
function upd(){var s=scrollY>y0;if(s!==stuck){if(s){sp.style.height=(n.offsetHeight+parseFloat(getComputedStyle(n).marginTop))+'px'}else sp.style.height='0';stuck=s;document.body.classList.toggle('nav-stuck',s);lines()}
 b.classList.toggle('show',scrollY>Math.max(600,innerHeight*.9));
 document.documentElement.style.setProperty('--navh',(document.body.classList.contains('nav-stuck')?n.offsetHeight:document.querySelector('header nav').offsetHeight)+'px')}
addEventListener('scroll',upd,{passive:true});addEventListener('resize',function(){var w=stuck;if(w){document.body.classList.remove('nav-stuck');stuck=false;sp.style.height='0'}measure();upd();lines()});
addEventListener('load',function(){measure();upd()});measure();upd();
// filter taps while stuck: bring the gallery top into view
n.addEventListener('click',function(e){if(stuck&&e.target.closest('button')){var m=document.querySelector('main');if(m)setTimeout(function(){scrollTo({top:m.getBoundingClientRect().top+scrollY-n.offsetHeight-8})},0)}});
})();

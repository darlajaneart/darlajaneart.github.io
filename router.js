/* Hash routing: each nav tab shows only its own section, scrolled to the top.
   ''/#all = gallery (all), #digital #ink-and-pencil #paintings = filtered gallery, #meet = Meet the Artist, #contact = Contact */
(function(){var main=document.querySelector('main'),ab=document.getElementById('about'),ct=document.getElementById('contact'),nav=document.querySelector('header nav');if(!main||!nav)return;
if('scrollRestoration' in history)history.scrollRestoration='manual';
var F=['digital','ink-and-pencil','paintings'];
[].forEach.call(nav.querySelectorAll('a[href="#about"]'),function(a){a.setAttribute('href','#meet')});
function key(){var h=decodeURIComponent(location.hash.slice(1)).toLowerCase();if(h=='about')h='meet';return h=='meet'||h=='contact'||F.indexOf(h)>=0?h:'all'}
var busy=false;
function route(){var h=key(),view=h=='meet'||h=='contact'?h:'gallery';
 main.hidden=view!='gallery';if(ab)ab.hidden=view!='meet';if(ct)ct.hidden=view!='contact';document.body.setAttribute('data-view',view);
 if(view=='gallery'){var b=nav.querySelector('button[data-f="'+h+'"]');if(b&&!b.classList.contains('on')){busy=true;b.click();busy=false}}
 [].forEach.call(nav.querySelectorAll('button'),function(b){b.classList.toggle('on',view=='gallery'&&b.dataset.f==h);b.setAttribute('aria-pressed',view=='gallery'&&b.dataset.f==h?'true':'false')});
 [].forEach.call(nav.querySelectorAll('a[href^="#"]'),function(a){var on=a.getAttribute('href')=='#'+view;a.classList.toggle('on',on);if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 var top=function(){scrollTo(0,0)};top();setTimeout(top,30);requestAnimationFrame(function(){dispatchEvent(new Event('resize'));dispatchEvent(new Event('scroll'))})}
// gallery tabs update the URL (so Back and direct links work)
nav.addEventListener('click',function(e){var b=e.target.closest('button[data-f]');if(!b||busy)return;var f=b.dataset.f,want=f=='all'?'':'#'+f;
 if(location.hash!==want){history.pushState(null,'',want||location.pathname+location.search)}setTimeout(route,0)},true);
nav.addEventListener('click',function(e){var a=e.target.closest('a[href^="#"]');if(!a)return;e.preventDefault();var want=a.getAttribute('href');if(location.hash!==want)history.pushState(null,'',want);route()});
addEventListener('popstate',route);addEventListener('hashchange',route);
route();addEventListener('load',function(){setTimeout(route,0)})})();

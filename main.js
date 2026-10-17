const WA_NUMBER='919828457938';
const DEFAULT_MSG='Hello Homenium Homes, I visited your website and would like to discuss a property or design-related requirement in Kota or Jaipur. Please share the details.';
function openWhatsApp(message){window.open('https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(message||DEFAULT_MSG),'_blank','noopener');}

/* ===== EDIT ME: gallery data. Put photos in /images and set src, e.g. "images/elevation-1.jpg" ===== */
const GALLERY=[
 {title:'Modern Residential Elevation',cat:'House Elevations',src:'',alt:'Modern residential house elevation concept'},
 {title:'Contemporary Front Elevation',cat:'House Elevations',src:'',alt:'Contemporary front elevation design inspiration'},
 {title:'Contemporary Living Room',cat:'Living Rooms',src:'',alt:'Contemporary living room interior inspiration'},
 {title:'Premium Interior Concept',cat:'Interior Design',src:'',alt:'Premium interior design concept'},
 {title:'Modern Kitchen Interior',cat:'Interior Design',src:'',alt:'Modern kitchen interior inspiration'},
 {title:'Luxury Bedroom Concept',cat:'Bedroom Interiors',src:'',alt:'Luxury bedroom interior concept'},
 {title:'Modern House Floor Plan',cat:'House Plans',src:'',alt:'Modern house floor plan example'},
 {title:'Farmhouse Design Inspiration',cat:'Farmhouse Concepts',src:'',alt:'Farmhouse design inspiration'},
 {title:'Residential Construction Reference',cat:'Construction',src:'',alt:'Residential construction reference image'}
];

const PAGES=[['index.html','Home'],['about.html','About Us'],['services.html','Services'],['projects.html','Our Projects'],['contact.html','Contact']];
const page=document.body.dataset.page;
const hdr=document.getElementById('site-header');
hdr.className='hdr'+(page==='index.html'?' over':'');
hdr.innerHTML=`<div class="wrap"><a class="logo" href="index.html" aria-label="Homenium Homes home"><img src="images/logo.svg" alt="Homenium Homes" width="170" height="44"></a>
<button class="burger" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav"><span></span></button>
<nav class="nav" id="nav" aria-label="Main">${PAGES.map(([h,t])=>`<a href="${h}"${h===page?' aria-current="page"':''}>${t}</a>`).join('')}<a class="btn" href="contact.html">Discuss Your Project</a></nav></div>`;
const burger=hdr.querySelector('.burger'),menu=hdr.querySelector('.nav');
function setMenu(o){menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);}
burger.onclick=()=>setMenu(!menu.classList.contains('open'));
menu.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
if(page==='index.html'){const f=()=>hdr.classList.toggle('over',scrollY<40);addEventListener('scroll',f,{passive:true});f();}

const ft=document.getElementById('site-footer');
ft.className='ft';
ft.innerHTML=`<div class="wrap"><div class="grid"><div><a class="logo" href="index.html"><img src="images/logo.svg" alt="Homenium Homes" width="170" height="44"></a><p style="margin-top:1rem">Your Dream Home. Thoughtfully Designed. Residential property guidance, architecture and interiors.</p></div>
<div><h3>Pages</h3>${PAGES.map(([h,t])=>`<a href="${h}">${t}</a>`).join('')}</div>
<div><h3>Services</h3><a href="services.html#property">Houses &amp; Plots</a><a href="services.html#planning">Architectural Planning</a><a href="services.html#elevation">3D Elevation Design</a><a href="services.html#interior">Interior Design</a><a href="services.html#farmhouse">Farmhouse Projects</a></div>
<div><h3>Contact</h3><a href="tel:+919828457938">+91 98284 57938</a><a href="mailto:buildenium@gmail.com">buildenium@gmail.com</a><p>Serving Kota &amp; Jaipur, Rajasthan<br>10:00 AM – 7:00 PM</p><a href="https://www.instagram.com/homenium_homes/" target="_blank" rel="noopener">Instagram @homenium_homes</a></div></div>
<p class="copy">© ${new Date().getFullYear()} Homenium Homes. All rights reserved.</p></div>`;
const fab=document.createElement('button');fab.className='wa';fab.setAttribute('aria-label','Chat with Homenium Homes on WhatsApp');
fab.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11 19.8L3 29l6.400-2A13 13 0 1 0 16 3Zm7.600 18.100c-.3.900-1.800 1.700-2.500 1.800-.6.100-1.400.1-2.300-.1-.5-.2-1.200-.4-2-.8-3.500-1.500-5.800-5-6-5.300-.2-.2-1.400-1.900-1.400-3.600s.9-2.500 1.200-2.900c.3-.3.700-.4.900-.4h.7c.2 0 .5-.1.800.6l1 2.500c.1.200.1.400 0 .6l-.4.700-.5.600c-.2.200-.3.400-.1.700.2.300.9 1.500 2 2.400 1.300 1.200 2.400 1.500 2.700 1.700.3.100.5.100.7-.1l1-1.200c.2-.3.500-.2.800-.1l2.400 1.100c.3.200.5.300.6.400.1.300.1.900-.2 1.800Z"/></svg>';
fab.onclick=()=>openWhatsApp();document.body.appendChild(fab);

document.addEventListener('click',e=>{const b=e.target.closest('[data-wa]');if(b){e.preventDefault();openWhatsApp(b.dataset.wa);}});
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

const gal=document.getElementById('gallery');
if(gal){
 const cats=['All','House Elevations','Interior Design','Bedroom Interiors','Living Rooms','House Plans','Farmhouse Concepts','Construction'];
 const fl=document.getElementById('filters'),lb=document.getElementById('lightbox');
 const visual=g=>g.src?`<img src="${g.src}" alt="${g.alt}" loading="lazy" onerror="this.remove()">`:'';
 const draw=c=>{gal.innerHTML=GALLERY.filter(g=>c==='All'||g.cat===c).map(g=>`<button class="item" data-i="${GALLERY.indexOf(g)}"><div class="ph" role="img" aria-label="${g.alt}"><span>${g.title}</span>${visual(g)}</div><div class="cap"><small>${g.cat}</small>${g.title}</div></button>`).join('')||'<p>No items in this category yet. Ask us about similar ideas.</p>';};
 fl.innerHTML=cats.map((c,i)=>`<button aria-pressed="${i===0}">${c}</button>`).join('');
 fl.onclick=e=>{const b=e.target.closest('button');if(!b)return;fl.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(b.textContent);};
 draw('All');
 const close=()=>lb.classList.remove('on');
 gal.onclick=e=>{const b=e.target.closest('.item');if(!b)return;const g=GALLERY[b.dataset.i];lb.innerHTML=`<button class="x" aria-label="Close image">×</button><div><div class="ph" role="img" aria-label="${g.alt}"><span>${g.title}</span>${visual(g)}</div><p>${g.title} · ${g.cat} · Design inspiration</p></div>`;lb.classList.add('on');lb.querySelector('.x').focus();};
 lb.onclick=e=>{if(e.target===lb||e.target.closest('.x'))close();};
 addEventListener('keydown',e=>{if(e.key==='Escape')close();});
}

const form=document.getElementById('inquiry');
if(form){
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const v=n=>form.elements[n].value.trim();let ok=true;
  const bad=(n,t)=>{const el=form.elements[n];el.setAttribute('aria-invalid',t?'true':'false');el.parentNode.querySelector('.err').textContent=t;if(t)ok=false;};
  bad('name',v('name').length<2?'Enter your full name.':'');
  bad('phone',/^(\+?91)?[6-9]\d{9}$/.test(v('phone').replace(/[\s-]/g,''))?'':'Enter a valid 10-digit Indian mobile number.');
  bad('email',v('email')&&!/^\S+@\S+\.\S+$/.test(v('email'))?'Enter a valid email address.':'');
  bad('interest',v('interest')?'':'Choose what you are interested in.');
  bad('location',v('location').length<2?'Enter the project location.':'');
  bad('details',v('details').length<10?'Add a few details (at least 10 characters).':'');
  const m=document.getElementById('msg');m.classList.add('on');
  if(!ok){m.textContent='Please fix the highlighted fields and try again.';return;}
  const lines=['Hello Homenium Homes, I would like to make an inquiry.','','Name: '+v('name'),'Phone: '+v('phone'),v('email')?'Email: '+v('email'):null,'Interested in: '+v('interest'),'Location: '+v('location'),v('budget')?'Budget: '+v('budget'):null,'','Details: '+v('details')].filter(x=>x!==null);
  m.textContent='Your inquiry is ready. WhatsApp is opening. Press Send there to complete your submission. Nothing is stored on this website.';
  openWhatsApp(lines.join('\n'));
 });
}

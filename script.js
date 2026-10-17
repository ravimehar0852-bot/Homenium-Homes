/* ===== EDIT HERE ===== */
const SITE={whatsapp:'919828457938',email:'buidenium@gmail.com',
  /* Optional: paste a form endpoint (e.g. your own Vercel /api/enquiry or Formspree URL). Never put secret keys here. */
  formEndpoint:''};
/* ===================== */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const m=$('.menu'),ul=$('nav ul');
if(m)m.addEventListener('click',()=>{const o=ul.classList.toggle('open');m.setAttribute('aria-expanded',o)});
$$('nav a').forEach(a=>{if(a.getAttribute('href')===location.pathname.split('/').pop()||(a.getAttribute('href')==='index.html'&&!location.pathname.split('/').pop()))a.setAttribute('aria-current','page')});
$$('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
/* property filters */
const fs=$$('[data-filter]'),cards=$$('[data-prop]');
function applyFilters(){const q=($('#pq')||{value:''}).value.toLowerCase();
 cards.forEach(c=>{const ok=fs.every(f=>!f.value||c.dataset[f.dataset.filter]===f.value)&&c.textContent.toLowerCase().includes(q);c.hidden=!ok});
 const n=cards.filter(c=>!c.hidden).length,e=$('#pempty');if(e)e.hidden=n>0}
[...fs,$('#pq')].filter(Boolean).forEach(f=>f.addEventListener('input',applyFilters));
/* lightbox: put data-full on any <img> inside .gallery */
const lb=document.createElement('div');lb.className='lb';lb.innerHTML='<button class="btn sm" aria-label="Close">Close</button><img alt="">';document.body.append(lb);
document.addEventListener('click',e=>{const i=e.target.closest('.gallery img');if(i){$('img',lb).src=i.dataset.full||i.src;$('img',lb).alt=i.alt;lb.classList.add('on')}else if(e.target===lb||e.target.closest('.lb button'))lb.classList.remove('on')});
document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('on')});
/* enquiry buttons prefill the form */
$$('[data-enquire]').forEach(b=>b.addEventListener('click',()=>{const f=$('#enquiry');if(f)f.message.value='I am interested in: '+b.dataset.enquire}));
/* enquiry form */
const f=$('#enquiry');
if(f)f.addEventListener('submit',async e=>{e.preventDefault();const st=$('.status',f);let ok=true;
 const set=(n,msg)=>{$('#e-'+n).textContent=msg;if(msg)ok=false};
 set('name',f.name.value.trim().length<2?'Enter your name.':'');
 set('phone',!/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(f.phone.value.replace(/\s|-/g,'').replace(/^(\+?91)/,'$1'))?'Enter a valid 10-digit Indian mobile number.':'');
 set('service',f.service.value?'':'Choose a service.');
 set('location',f.location.value.trim()?'':'Enter your location.');
 if(!ok){st.className='status bad';st.textContent='Please fix the highlighted fields.';return}
 const d=Object.fromEntries(new FormData(f));
 const text=`Hello Homenium Homes, I'm ${d.name} (${d.phone}). Service: ${d.service}. Budget: ${d.budget||'n/a'}. Location: ${d.location}. ${d.message||''}`;
 if(SITE.formEndpoint){try{const r=await fetch(SITE.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});if(!r.ok)throw 0;st.className='status ok';st.textContent='Enquiry sent. We will contact you within business hours (10 AM – 7 PM).';f.reset()}catch{st.className='status bad';st.textContent='Could not send. Please use WhatsApp or call +91 98284 57938.'}}
 else{st.className='status ok';st.innerHTML='Nothing has been stored yet. Tap to send this enquiry on WhatsApp: <a href="https://wa.me/'+SITE.whatsapp+'?text='+encodeURIComponent(text)+'" target="_blank" rel="noopener"><b>Open WhatsApp</b></a>'}});

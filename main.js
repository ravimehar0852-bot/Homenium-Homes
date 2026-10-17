(() => {
  const PHONE = '98284 57938', TEL = '919828457938';
  const pages = [['index.html','Home'],['properties.html','Properties'],['services.html','Design Services'],['about.html','About'],['contact.html','Contact']];
  const cur = document.body.dataset.page + '.html';

  document.getElementById('site-header').outerHTML = `
  <header class="site"><div class="wrap bar">
    <a class="brand" href="index.html"><span class="mark" aria-hidden="true">H</span>Homenium Homes</a>
    <button class="burger" aria-expanded="false" aria-controls="nav">Menu</button>
    <nav id="nav" aria-label="Main"><ul>${pages.map(([h,t]) =>
      `<li><a href="${h}" ${h===cur?'aria-current="page"':''}>${t}</a></li>`).join('')}</ul></nav>
  </div></header>`;

  document.getElementById('site-footer').outerHTML = `
  <footer class="site"><div class="wrap">
    <div class="fgrid">
      <div><h4>Homenium Homes</h4><p>घर चाहिए तो Homenium. Houses and plots in Kota and Jaipur, with trusted deals and genuine properties.</p></div>
      <div><h4>Pages</h4>${pages.map(([h,t])=>`<a href="${h}">${t}</a>`).join('')}</div>
      <div><h4>Get in touch</h4><a href="tel:+${TEL}">${PHONE}</a><a href="https://wa.me/${TEL}">WhatsApp us</a><a href="https://instagram.com/homenium_homes">@homenium_homes</a></div>
    </div>
    <p class="legal">© ${new Date().getFullYear()} Homenium Homes. Floor plans shown are samples of design work; final plans follow your requirements.</p>
  </div></footer>`;

  const burger = document.querySelector('.burger'), nav = document.getElementById('nav');
  burger.addEventListener('click', () => burger.setAttribute('aria-expanded', nav.classList.toggle('open')));

  const info = document.getElementById('room-info');
  document.querySelectorAll('.plan .room').forEach(r => {
    const pick = () => {
      document.querySelectorAll('.plan .room.on').forEach(o => o.classList.remove('on'));
      r.classList.add('on'); info.innerHTML = `<b>${r.dataset.name}.</b> ${r.dataset.note}`;
    };
    r.addEventListener('click', pick);
    r.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); pick(); } });
  });

  const chips = document.querySelectorAll('.chip[data-f]'), items = document.querySelectorAll('[data-cat]'), empty = document.getElementById('empty');
  chips.forEach(c => c.addEventListener('click', () => {
    chips.forEach(x => x.setAttribute('aria-pressed', x === c));
    let n = 0;
    items.forEach(i => { const show = c.dataset.f==='all' || i.dataset.cat.split(' ').includes(c.dataset.f); i.hidden = !show; n += show; });
    empty.hidden = n > 0;
  }));

  const form = document.getElementById('enquiry');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form)), name = (d.name||'').trim(), phone = (d.phone||'').replace(/\D/g,'');
    const okName = name.length >= 2, okPhone = /^(91)?[6-9]\d{9}$/.test(phone);
    form.querySelector('[data-err=name]').textContent = okName ? '' : 'Enter your name.';
    form.querySelector('[data-err=phone]').textContent = okPhone ? '' : 'Enter a 10-digit Indian mobile number.';
    if (!okName || !okPhone) return;
    const text = `Hello Homenium Homes, I am ${name} (${d.phone}). I am looking for: ${d.type} in ${d.city}. ${(d.note||'').trim()}`;
    const safe = name.replace(/[<>&]/g,'');
    form.innerHTML = `<div class="ok" role="status"><b>Thanks, ${safe}.</b> Tap below to send this enquiry on WhatsApp.<div class="row"><a class="btn" href="https://wa.me/${TEL}?text=${encodeURIComponent(text)}">Send on WhatsApp</a></div></div>`;
  });
})();

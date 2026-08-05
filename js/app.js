(() => {
 const money = n => new Intl.NumberFormat('ru-RU').format(n) + ' ₸';
 const stars = n => '★'.repeat(n);
const art = t => `
<div class="card-art">
    <img src="${t.image || 'turk.jpg'}" alt="${t.hotel}" style="width:100%;height:220px;object-fit:cover;border-radius:16px;">
</div>`;
 const card = t => `<article class="tour-card">${art(t)}<div class="card-body"><div class="card-top"><span class="badge">${t.tag}</span><span class="rating">★ ${t.rating} <small>(${t.reviews})</small></span></div><p class="location">${t.country} · ${t.city}</p><h3>${t.hotel} <span class="stars">${stars(t.stars)}</span></h3><p class="details">${t.nights} ночей · ${t.meal}</p><div class="card-price"><div><del>${money(t.oldPrice)}</del><strong>от ${money(t.price)}</strong><small>за двоих</small></div><a href="tour.html?id=${t.id}" class="round-arrow" aria-label="Подробнее о туре">→</a></div></div></article>`;
 const grid = document.querySelector('#tourGrid');
 if (grid) {
  const dest = document.querySelector('#destination'); [...new Set(tours.map(t=>t.country))].forEach(c=>dest.insertAdjacentHTML('beforeend',`<option value="${c}">${c}</option>`));
  let current='all', search='';
  function render(){let items=tours.filter(t=>(current==='all'||t.country===current)&&(!search||t.country===search)); const sort=document.querySelector('#sort').value; if(sort==='priceUp') items.sort((a,b)=>a.price-b.price); if(sort==='priceDown') items.sort((a,b)=>b.price-a.price); grid.innerHTML=items.map(card).join(''); document.querySelector('#emptyState').hidden=!!items.length;}
  document.querySelectorAll('.chip').forEach(b=>b.addEventListener('click',()=>{document.querySelector('.chip.active').classList.remove('active');b.classList.add('active');current=b.dataset.filter;render()}));
  document.querySelector('#sort').addEventListener('change',render);
  document.querySelector('#tourSearch').addEventListener('submit',e=>{e.preventDefault();search=dest.value;current='all';document.querySelectorAll('.chip').forEach(x=>x.classList.toggle('active',x.dataset.filter==='all'));render();document.querySelector('#tours').scrollIntoView({behavior:'smooth'});});
  document.querySelector('#resetFilters').addEventListener('click',()=>{current='all';search='';dest.value='';document.querySelectorAll('.chip').forEach(x=>x.classList.toggle('active',x.dataset.filter==='all'));render();});
  document.querySelector('.menu-toggle').addEventListener('click',e=>{document.querySelector('.main-nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',document.querySelector('.main-nav').classList.contains('open'));});
  document.querySelector('#subscribeForm').addEventListener('submit',e=>{e.preventDefault();e.currentTarget.querySelector('.form-message').textContent='Готово! Проверьте почту для подтверждения.';e.currentTarget.reset();}); render();
 }
 const page=document.querySelector('#tourPage'); if(page){const id=Number(new URLSearchParams(location.search).get('id'))||1,t=tours.find(x=>x.id===id)||tours[0];page.innerHTML=`<a class="back" href="index.html#tours">← Все предложения</a><section class="tour-hero ${t.theme}"><img src="${t.image}" alt="${t.hotel}" class="tour-image"><div><p class="eyebrow">${t.country} · ${t.city}</p><h1>${t.hotel}</h1><p class="stars">${stars(t.stars)}</p></div></section><div class="tour-layout"><article class="tour-info"><h2>Об отеле</h2><p>${t.description}</p><div class="info-grid"><div><span>Продолжительность</span><b>${t.nights} ночей</b></div><div><span>Питание</span><b>${t.meal}</b></div><div><span>Рейтинг гостей</span><b>★ ${t.rating} из 10</b></div><div><span>Вылет</span><b>из Алматы</b></div></div><h2>В стоимость входит</h2><ul><li>Перелёт туда и обратно</li><li>Проживание в выбранном отеле</li><li>Трансфер аэропорт — отель — аэропорт</li><li>Медицинская страховка</li></ul></article><aside class="booking"><span class="badge">${t.tag}</span><del>${money(t.oldPrice)}</del><strong>от ${money(t.price)}</strong><small>за двоих · ${t.nights} ночей</small><button class="button" id="book">Оставить заявку</button><p class="form-message" id="bookMessage"></p></aside></div>`; document.querySelector('#book').addEventListener('click',()=>document.querySelector('#bookMessage').textContent='Заявка принята! Менеджер свяжется с вами в ближайшее время.');}
})();

import { baseLayout, COUNTRIES } from '../layout'
import { ALL_TOURS, ALL_GUIDES } from '../data'

export const homePage = () => {
  const hotTours  = ALL_TOURS.filter(t => t.isHot).slice(0, 4)
  const topGuides = ALL_GUIDES.filter(g => g.super).slice(0, 3)

  const countryTabsHtml = `<button onclick="filterCountry('')" id="cfALL"
    class="cf-btn flex-shrink-0 px-4 py-2 rounded-full border text-xs font-bold press active"
    style="background:#f59e0b;color:#0a0a0f;border-color:#f59e0b">🌏 전체</button>
  ${COUNTRIES.map(c => `<button onclick="filterCountry('${c.code}')" id="cf${c.code}"
    class="cf-btn flex-shrink-0 px-4 py-2 rounded-full border text-xs font-bold press"
    style="background:#13131a;border-color:#1e1e2e;color:#94a3b8">${c.flag} ${c.name}</button>`).join('')}`

  const hotTourCards = hotTours.map(t => {
    const isMature = (t as any).matureTag
    return `<a href="/tour/${t.id}" class="flex-shrink-0 relative rounded-2xl overflow-hidden press" style="width:200px;height:240px">
  <img src="${t.img}" class="w-full h-full object-cover" alt="${t.title}">
  <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(10,10,15,.95) 0%,transparent 55%)"></div>
  <div class="absolute top-2 left-2 flex gap-1">
    <span class="badge" style="background:#f59e0b22;color:#f59e0b;border:1px solid #f59e0b44">${t.flag} ${t.city}</span>
    ${isMature ? '<span class="badge" style="background:#ef444422;color:#ef4444;border:1px solid #ef444444">🔞 성인</span>' : ''}
  </div>
  <div class="absolute bottom-0 left-0 right-0 p-3">
    <p class="text-white text-sm font-black leading-tight mb-1">${t.title}</p>
    <p class="text-xs font-bold gold">₩${t.price.toLocaleString()} ~</p>
    <div class="flex items-center gap-1 mt-1">
      <span class="text-xs star">★</span><span class="text-xs text-slate-300">${t.rating} (${t.reviews})</span>
    </div>
  </div>
</a>`
  }).join('')

  const guideCards = topGuides.map(g => `
<a href="/guide/${g.id}" class="card flex items-center gap-3 p-3 press">
  <img src="${g.avatar}" class="w-12 h-12 rounded-full object-cover border-2 flex-shrink-0" style="border-color:#f59e0b">
  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-1 mb-0.5">
      <p class="text-sm font-black text-slate-100 truncate">${g.name}</p>
      ${g.verified ? '<span class="material-symbols-outlined text-sm verified" style="font-variation-settings:\'FILL\' 1">verified</span>' : ''}
    </div>
    <p class="text-xs text-slate-400 truncate">${g.flag} ${g.city} · ${g.tagline}</p>
    <div class="flex items-center gap-2 mt-1">
      <span class="text-xs star">★ ${g.rating}</span>
      <span class="text-xs text-slate-500">${g.reviews}개 리뷰</span>
      <span class="badge text-[10px]" style="background:#f59e0b11;color:#f59e0b;border:1px solid #f59e0b33">${g.badge}</span>
    </div>
  </div>
  <span class="material-symbols-outlined text-slate-500">chevron_right</span>
</a>`).join('')

  const content = `
  <!-- 헤더 -->
  <header class="sticky top-0 z-40 px-4 py-3 border-b" style="background:#0a0a0fee;backdrop-filter:blur(16px);border-color:#1e1e2e">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-2xl">🧭</span>
        <div>
          <span class="font-black text-base gold">로컬가이드</span>
          <span class="font-black text-base text-slate-100 ml-1">여행매니저</span>
        </div>
      </div>
      <div class="flex gap-2 items-center">
        <a href="/tours" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#13131a;border:1px solid #1e1e2e">
          <span class="material-symbols-outlined text-slate-300 text-xl">search</span>
        </a>
        <a href="/cart" class="relative w-9 h-9 flex items-center justify-center rounded-full press" style="background:#13131a;border:1px solid #1e1e2e">
          <span class="material-symbols-outlined text-slate-300 text-xl">shopping_cart</span>
          <span class="cart-badge cart-badge-count" style="display:none">0</span>
        </a>
      </div>
    </div>
  </header>

  <div class="pb-28 pt-4 space-y-8">

    <!-- 히어로 배너 -->
    <div class="px-4">
      <div class="relative rounded-3xl overflow-hidden" style="height:220px">
        <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&h=500&fit=crop"
             class="w-full h-full object-cover" alt="로컬가이드 여행">
        <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(10,10,15,.95) 0%,rgba(10,10,15,.3) 55%,transparent 100%)"></div>
        <div class="absolute bottom-0 left-0 right-0 p-5">
          <p class="text-xs font-bold mb-1 gold">🌏 6개국 · 현지 교민·가이드가 직접 짠 코스</p>
          <h2 class="text-white text-xl font-black leading-tight mb-2">내 동네 친구처럼<br>안내해드립니다</h2>
          <a href="/tours" class="inline-flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-full press" style="background:#f59e0b;color:#0a0a0f">
            <span class="material-symbols-outlined text-sm">luggage</span>
            투어 코스 보기
          </a>
        </div>
      </div>
    </div>

    <!-- 강점 배너 3개 -->
    <div class="px-4">
      <div class="grid grid-cols-3 gap-2">
        ${[
          {icon:'🏷️', title:'가격표 오픈', desc:'모든 업소 가격 투명 공개'},
          {icon:'🛡️', title:'바가지 제로', desc:'가이드 동행 바가지 차단'},
          {icon:'🆘', title:'24시간 SOS', desc:'긴급 상황 즉시 대응'},
        ].map(f => `<div class="card p-3 text-center">
  <p class="text-2xl mb-1">${f.icon}</p>
  <p class="text-xs font-black text-slate-200">${f.title}</p>
  <p class="text-[10px] text-slate-500 mt-0.5">${f.desc}</p>
</div>`).join('')}
      </div>
    </div>

    <!-- 국가 탭 -->
    <div>
      <div class="px-4 flex items-center justify-between mb-3">
        <h3 class="font-bold text-sm text-slate-100">국가별 탐색</h3>
        <a href="/tours" class="text-xs font-semibold gold">전체 →</a>
      </div>
      <div id="countryTabs" class="flex gap-2 px-4 overflow-x-auto ns pb-1 mb-4">
        ${countryTabsHtml}
      </div>
      <!-- 인기 투어 카드 -->
      <div id="tourFeed" class="flex gap-3 px-4 overflow-x-auto ns pb-1">
        ${hotTourCards}
      </div>
    </div>

    <!-- 슈퍼 가이드 -->
    <div class="px-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-sm text-slate-100">🏆 슈퍼 가이드</h3>
        <a href="/guides" class="text-xs font-semibold gold">전체 →</a>
      </div>
      <div class="space-y-2">
        ${guideCards}
      </div>
    </div>

    <!-- 후원 배너 -->
    <div class="px-4">
      <div class="card p-4 border" style="border-color:#f59e0b44;background:linear-gradient(135deg,#13131a,#1a1600)">
        <div class="flex items-center gap-3">
          <span class="text-3xl">☕</span>
          <div class="flex-1">
            <p class="font-black text-sm text-slate-100">가이드에게 커피 한잔 후원하기</p>
            <p class="text-xs text-slate-400 mt-0.5">현지 교민·가이드의 지속적인 활동을 응원해주세요</p>
          </div>
          <a href="/guides" class="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold press" style="background:#f59e0b;color:#0a0a0f">후원하기</a>
        </div>
      </div>
    </div>

    <!-- 장바구니 미리보기 -->
    <div class="px-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-sm text-slate-100">🛒 내 장바구니</h3>
        <a href="/cart" class="text-xs font-semibold gold">전체 보기 →</a>
      </div>
      <div id="homeCartPreview" class="space-y-2"></div>
    </div>

  </div>

  <script>
(function(){
  var ALL_TOURS=${JSON.stringify(ALL_TOURS)};

  function renderTourFeed(countryCode){
    var filtered=countryCode?ALL_TOURS.filter(function(t){return t.country===countryCode;}):ALL_TOURS.filter(function(t){return t.isHot;});
    if(!filtered.length)filtered=ALL_TOURS.filter(function(t){return t.country===countryCode;}).slice(0,6);
    var el=document.getElementById('tourFeed');
    if(!el)return;
    el.innerHTML=filtered.slice(0,6).map(function(t){
      var isMature=t.matureTag;
      return '<a href="/tour/'+t.id+'" class="flex-shrink-0 relative rounded-2xl overflow-hidden press" style="width:200px;height:240px">'
        +'<img src="'+t.img+'" class="w-full h-full object-cover" alt="'+t.title+'">'
        +'<div class="absolute inset-0" style="background:linear-gradient(to top,rgba(10,10,15,.95) 0%,transparent 55%)"></div>'
        +'<div class="absolute top-2 left-2 flex gap-1">'
        +'<span class="badge" style="background:#f59e0b22;color:#f59e0b;border:1px solid #f59e0b44">'+t.flag+' '+t.city+'</span>'
        +(isMature?'<span class="badge" style="background:#ef444422;color:#ef4444;border:1px solid #ef444444">🔞</span>':'')
        +'</div>'
        +'<div class="absolute bottom-0 left-0 right-0 p-3">'
        +'<p class="text-white text-sm font-black leading-tight mb-1">'+t.title+'</p>'
        +'<p class="text-xs font-bold" style="color:#f59e0b">₩'+t.price.toLocaleString()+' ~</p>'
        +'<div class="flex items-center gap-1 mt-1"><span class="text-xs" style="color:#f59e0b">★</span><span class="text-xs text-slate-300">'+t.rating+' ('+t.reviews+')</span></div>'
        +'</div></a>';
    }).join('');
  }

  window.filterCountry=function(code){
    document.querySelectorAll('.cf-btn').forEach(function(b){
      b.style.background='#13131a';b.style.color='#94a3b8';b.style.borderColor='#1e1e2e';
    });
    var btn=document.getElementById('cf'+(code||'ALL'));
    if(btn){btn.style.background='#f59e0b';btn.style.color='#0a0a0f';btn.style.borderColor='#f59e0b';}
    renderTourFeed(code);
  };

  function renderHomeCart(){
    var el=document.getElementById('homeCartPreview');
    if(!el)return;
    var items=window.LG?window.LG.getCart():[];
    if(!items||items.length===0){
      el.innerHTML='<a href="/tours" class="card flex items-center gap-3 p-3 press"><span class="text-xl">🛒</span><p class="text-sm text-slate-400">장바구니가 비어있습니다. 투어를 담아보세요!</p></a>';
      return;
    }
    el.innerHTML=items.slice(0,2).map(function(it){
      return '<div class="card flex items-center gap-3 p-3">'
        +'<div class="w-10 h-10 rounded-xl text-xl flex items-center justify-center flex-shrink-0" style="background:#f59e0b22">'+it.flag+'</div>'
        +'<div class="flex-1 min-w-0"><p class="text-sm font-bold text-slate-200 truncate">'+it.title+'</p>'
        +'<p class="text-xs gold font-bold">₩'+it.price.toLocaleString()+'</p></div>'
        +'<a href="/cart" class="text-xs px-2 py-1 rounded-lg press gold" style="background:#f59e0b22;border:1px solid #f59e0b44">보기</a>'
        +'</div>';
    }).join('')+(items.length>2?'<p class="text-xs text-center text-slate-500 mt-1">외 '+(items.length-2)+'개 더 있음</p>':'');
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){renderHomeCart();});
  }else{
    renderHomeCart();
  }
})();
  </script>
  `

  return baseLayout('홈', content, 'home')
}

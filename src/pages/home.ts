import { baseLayout, COUNTRIES } from '../layout'
import { ALL_TOURS, ALL_GUIDES } from '../data'

export const homePage = () => {
  const hotTours  = ALL_TOURS.filter(t => t.isHot).slice(0, 6)
  const topGuides = ALL_GUIDES.filter(g => g.super).slice(0, 3)

  // ── 슈퍼 가이드 카드 (히어로 영역용 - 크고 임팩트 있게) ──
  const guideHeroCards = topGuides.map(g => `
<a href="/guide/${g.id}" class="flex-shrink-0 press" style="width:160px">
  <div class="relative rounded-2xl overflow-hidden mb-2" style="height:200px">
    <img src="${g.avatar}" class="w-full h-full object-cover" alt="${g.name}">
    <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(10,10,15,.95) 0%,transparent 50%)"></div>
    ${g.super ? '<div class="absolute top-2 right-2"><span class="badge" style="background:#f59e0b;color:#0a0a0f;font-size:9px">👑 슈퍼</span></div>' : ''}
    <div class="absolute bottom-0 left-0 right-0 p-3">
      <p class="text-white text-xs font-black leading-snug">${g.name}</p>
      <p class="text-[10px] mt-0.5" style="color:#f59e0b">★ ${g.rating} <span class="text-slate-400">(${g.reviews})</span></p>
    </div>
  </div>
  <div class="px-1">
    <p class="text-xs text-slate-300 truncate">${g.flag} ${g.city}</p>
    <p class="text-[10px] text-slate-500 truncate leading-snug mt-0.5">${g.tagline}</p>
  </div>
</a>`).join('')

  // ── 인기 투어 카드 ──
  const hotTourCards = hotTours.map(t => {
    const isMature = (t as any).matureTag
    return `<a href="/tour/${t.id}" class="flex-shrink-0 relative rounded-2xl overflow-hidden press" style="width:160px;height:200px">
  <img src="${t.img}" class="w-full h-full object-cover" alt="${t.title}">
  <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(10,10,15,.95) 0%,transparent 55%)"></div>
  <div class="absolute top-2 left-2 flex gap-1">
    <span class="badge" style="background:#f59e0b22;color:#f59e0b;border:1px solid #f59e0b44;font-size:9px">${t.flag} ${t.city}</span>
    ${isMature ? '<span class="badge" style="background:#ef444422;color:#ef4444;border:1px solid #ef444444;font-size:9px">🔞</span>' : ''}
  </div>
  <div class="absolute bottom-0 left-0 right-0 p-3">
    <p class="text-white text-xs font-black leading-snug mb-1">${t.title}</p>
    <p class="text-[10px] font-bold gold">₩${t.price.toLocaleString()} ~</p>
  </div>
</a>`
  }).join('')

  const content = `

  <!-- ── 헤더 ── -->
  <header class="sticky top-0 z-40 px-4 py-3" style="background:#0a0a0fee;backdrop-filter:blur(20px)">
    <div class="flex items-center justify-between">
      <!-- 브랜드 -->
      <div class="flex items-center gap-2">
        <span class="text-xl">🧭</span>
        <div class="leading-none">
          <p class="font-black text-base text-white tracking-tight">가이드 여행매니저</p>
          <p class="text-[10px] text-slate-500 mt-0.5">현지 가이드가 직접 짜주는 코스</p>
        </div>
      </div>
      <!-- 액션 버튼 -->
      <div class="flex gap-2">
        <a href="/tours" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#13131a;border:1px solid #1e1e2e">
          <span class="material-symbols-outlined text-slate-300" style="font-size:20px">search</span>
        </a>
        <a href="/cart" class="relative w-9 h-9 flex items-center justify-center rounded-full press" style="background:#13131a;border:1px solid #1e1e2e">
          <span class="material-symbols-outlined text-slate-300" style="font-size:20px">shopping_cart</span>
          <span class="cart-badge cart-badge-count" style="display:none">0</span>
        </a>
      </div>
    </div>
  </header>

  <div class="pb-28 space-y-7 pt-2">

    <!-- ── SECTION 1: 가이드 매칭 히어로 (최상단 강조) ── -->
    <div class="px-4">

      <!-- 섹션 레이블 -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="w-1 h-5 rounded-full" style="background:#f59e0b;display:inline-block"></span>
          <h2 class="font-black text-base text-white">검증된 가이드 만나기</h2>
        </div>
        <a href="/guides" class="text-xs font-bold gold flex items-center gap-0.5">전체 <span class="material-symbols-outlined text-sm">chevron_right</span></a>
      </div>

      <!-- 가이드 카드 가로 스크롤 -->
      <div class="flex gap-3 overflow-x-auto ns pb-1">
        ${guideHeroCards}
        <!-- 더보기 카드 -->
        <a href="/guides" class="flex-shrink-0 press" style="width:100px">
          <div class="rounded-2xl flex flex-col items-center justify-center gap-2" style="height:200px;background:#13131a;border:1px dashed #2e2e3e">
            <span class="material-symbols-outlined text-slate-500 text-3xl">add_circle</span>
            <p class="text-[10px] text-slate-500 font-bold text-center leading-snug">가이드<br>더보기</p>
          </div>
        </a>
      </div>
    </div>

    <!-- ── SECTION 2: 3가지 핵심 약속 ── -->
    <div class="px-4">
      <div class="grid grid-cols-3 gap-2">
        ${[
          {icon:'💰', title:'가격표 공개', desc:'업소 요금 사전 확인'},
          {icon:'🛡️', title:'바가지 Zero', desc:'가이드 동행 보장'},
          {icon:'🆘', title:'24h SOS', desc:'긴급상황 즉시 대응'},
        ].map(f => `<div class="rounded-2xl p-3 text-center" style="background:#13131a;border:1px solid #1e1e2e">
  <p class="text-2xl mb-1.5">${f.icon}</p>
  <p class="text-xs font-black text-white">${f.title}</p>
  <p class="text-[10px] text-slate-500 mt-0.5 leading-snug">${f.desc}</p>
</div>`).join('')}
      </div>
    </div>

    <!-- ── SECTION 3: 국가 퀵 탭 + 인기 투어 ── -->
    <div>
      <div class="px-4 flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="w-1 h-5 rounded-full" style="background:#f59e0b;display:inline-block"></span>
          <h2 class="font-black text-base text-white">인기 투어</h2>
        </div>
        <a href="/tours" class="text-xs font-bold gold flex items-center gap-0.5">전체 <span class="material-symbols-outlined text-sm">chevron_right</span></a>
      </div>

      <!-- 국가 탭 -->
      <div id="countryTabs" class="flex gap-2 px-4 overflow-x-auto ns pb-2 mb-3">
        <button onclick="filterCountry('')" id="cfALL"
          class="cf-btn flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold press"
          style="background:#f59e0b;color:#0a0a0f">🌏 전체</button>
        ${COUNTRIES.map(c => `<button onclick="filterCountry('${c.code}')" id="cf${c.code}"
          class="cf-btn flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold press"
          style="background:#13131a;border:1px solid #1e1e2e;color:#94a3b8">${c.flag} ${c.name}</button>`).join('')}
      </div>

      <!-- 투어 카드 -->
      <div id="tourFeed" class="flex gap-3 px-4 overflow-x-auto ns pb-1">
        ${hotTourCards}
      </div>
    </div>

    <!-- ── SECTION 4: 가이드 예약 CTA 배너 ── -->
    <div class="px-4">
      <a href="/guides"
         class="flex items-center gap-4 rounded-2xl p-4 press"
         style="background:linear-gradient(135deg,#1a1400,#1a0e00);border:1px solid #f59e0b44">
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl" style="background:#f59e0b22">🗺</div>
        <div class="flex-1">
          <p class="font-black text-sm text-white">내 여행, 가이드에게 맡겨보세요</p>
          <p class="text-xs text-slate-400 mt-0.5">현지 교민이 직접 짜주는 맞춤 코스</p>
        </div>
        <div class="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-black press" style="background:#f59e0b;color:#0a0a0f">
          매칭 →
        </div>
      </a>
    </div>

    <!-- ── SECTION 5: 국가별 빠른 입장 ── -->
    <div class="px-4">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="w-1 h-5 rounded-full" style="background:#f59e0b;display:inline-block"></span>
          <h2 class="font-black text-base text-white">국가별 탐색</h2>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-2">
        ${COUNTRIES.map(c => `<a href="/tours?country=${c.code}"
  class="rounded-2xl p-3 text-center press block"
  style="background:#13131a;border:1px solid #1e1e2e">
  <p class="text-2xl mb-1">${c.flag}</p>
  <p class="text-xs font-black text-white">${c.name}</p>
  <p class="text-[10px] text-slate-500 mt-0.5">${c.cities[0]} 외 ${c.cities.length - 1}개 도시</p>
</a>`).join('')}
      </div>
    </div>

    <!-- ── SECTION 6: 후원 배너 ── -->
    <div class="px-4">
      <div class="rounded-2xl p-4" style="background:linear-gradient(135deg,#13131a,#1a1200);border:1px solid #2e2000">
        <div class="flex items-center gap-3">
          <span class="text-2xl">☕</span>
          <div class="flex-1">
            <p class="text-sm font-black text-white">가이드에게 커피 한 잔</p>
            <p class="text-[10px] text-slate-500 mt-0.5">활동을 응원해 주세요</p>
          </div>
          <a href="/guides" class="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold press" style="background:#f59e0b;color:#0a0a0f">후원</a>
        </div>
      </div>
    </div>

  </div>

  <script>
(function(){
  var ALL_TOURS=${JSON.stringify(ALL_TOURS)};

  function renderTourFeed(code){
    var filtered=code
      ? ALL_TOURS.filter(function(t){return t.country===code;})
      : ALL_TOURS.filter(function(t){return t.isHot;});
    if(!filtered.length) filtered=ALL_TOURS.filter(function(t){return t.country===code;});
    var el=document.getElementById('tourFeed');
    if(!el)return;
    el.innerHTML=filtered.slice(0,6).map(function(t){
      var m=t.matureTag;
      return '<a href="/tour/'+t.id+'" class="flex-shrink-0 relative rounded-2xl overflow-hidden press" style="width:160px;height:200px">'
        +'<img src="'+t.img+'" class="w-full h-full object-cover" alt="'+t.title+'">'
        +'<div class="absolute inset-0" style="background:linear-gradient(to top,rgba(10,10,15,.95) 0%,transparent 55%)"></div>'
        +'<div class="absolute top-2 left-2 flex gap-1">'
        +'<span class="badge" style="background:#f59e0b22;color:#f59e0b;border:1px solid #f59e0b44;font-size:9px">'+t.flag+' '+t.city+'</span>'
        +(m?'<span class="badge" style="background:#ef444422;color:#ef4444;border:1px solid #ef444444;font-size:9px">🔞</span>':'')
        +'</div>'
        +'<div class="absolute bottom-0 left-0 right-0 p-3">'
        +'<p class="text-white text-xs font-black leading-snug mb-1">'+t.title+'</p>'
        +'<p class="text-[10px] font-bold" style="color:#f59e0b">₩'+t.price.toLocaleString()+' ~</p>'
        +'</div></a>';
    }).join('');
  }

  window.filterCountry=function(code){
    document.querySelectorAll('.cf-btn').forEach(function(b){
      b.style.background='#13131a';b.style.color='#94a3b8';b.style.border='1px solid #1e1e2e';
    });
    var btn=document.getElementById('cf'+(code||'ALL'));
    if(btn){btn.style.background='#f59e0b';btn.style.color='#0a0a0f';btn.style.border='none';}
    renderTourFeed(code);
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){window.LG&&window.LG.updateCartBadge();});
  }else{
    window.LG&&window.LG.updateCartBadge();
  }
})();
  </script>
  `

  return baseLayout('홈', content, 'home')
}

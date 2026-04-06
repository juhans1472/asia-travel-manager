import { baseLayout, COUNTRIES } from '../layout'
import { ALL_TOURS, ALL_GUIDES } from '../data'

export const homePage = () => {

  const content = `

  <!-- ── 헤더 ── -->
  <header class="sticky top-0 z-40 px-4 py-3" style="background:#0a0a0fee;backdrop-filter:blur(20px)">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-xl">🧭</span>
        <div class="leading-none">
          <p class="font-black text-base text-white tracking-tight">가이드 여행매니저</p>
          <p class="text-[10px] text-slate-500 mt-0.5">현지 가이드가 직접 짜주는 코스</p>
        </div>
      </div>
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

  <div class="pb-28 space-y-6 pt-2">

    <!-- ── SECTION 1: 국가 탭 (맨 위로 — 선택이 먼저) ── -->
    <div class="px-4 pt-2">
      <div class="flex gap-2 overflow-x-auto ns pb-1">
        <!-- 전체 버튼 -->
        <button onclick="selectCountry('')" id="cf_ALL"
          class="cf-btn flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-2xl text-xs font-black press"
          style="background:#f59e0b;color:#0a0a0f;min-width:64px">
          <span style="font-size:22px">🌏</span>
          <span>전체</span>
        </button>
        ${COUNTRIES.map(c => `<button onclick="selectCountry('${c.code}')" id="cf_${c.code}"
          class="cf-btn flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-2xl text-xs font-bold press"
          style="background:#13131a;border:1px solid #1e1e2e;color:#94a3b8;min-width:64px">
          <span style="font-size:22px">${c.flag}</span>
          <span>${c.name}</span>
        </button>`).join('')}
      </div>
    </div>

    <!-- ── SECTION 2: 선택된 국가 라벨 ── -->
    <div class="px-4 -mt-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-1 h-5 rounded-full flex-shrink-0" style="background:#f59e0b;display:inline-block"></span>
          <h2 class="font-black text-base text-white" id="sectionLabel">🌏 전체 가이드</h2>
        </div>
        <a id="guideMoreBtn" href="/guides" class="text-xs font-bold gold flex items-center gap-0.5">
          전체 <span class="material-symbols-outlined text-sm">chevron_right</span>
        </a>
      </div>
    </div>

    <!-- ── SECTION 3: 가이드 카드 (동적 렌더링) ── -->
    <div class="px-4 -mt-3">
      <div id="guideFeed" class="flex gap-3 overflow-x-auto ns pb-1"></div>
    </div>

    <!-- ── SECTION 4: 3가지 핵심 약속 ── -->
    <div class="px-4">
      <div class="grid grid-cols-3 gap-2">
        ${[
          {icon:'💰', title:'가격표 공개', desc:'업소 요금 사전 확인'},
          {icon:'🛡️', title:'바가지 Zero', desc:'가이드 동행 보장'},
          {icon:'🆘', title:'24h SOS',    desc:'긴급상황 즉시 대응'},
        ].map(f => `<div class="rounded-2xl p-3 text-center" style="background:#13131a;border:1px solid #1e1e2e">
  <p class="text-2xl mb-1.5">${f.icon}</p>
  <p class="text-xs font-black text-white">${f.title}</p>
  <p class="text-[10px] text-slate-500 mt-0.5 leading-snug">${f.desc}</p>
</div>`).join('')}
      </div>
    </div>

    <!-- ── SECTION 5: 인기 투어 ── -->
    <div>
      <div class="px-4 flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="w-1 h-5 rounded-full flex-shrink-0" style="background:#f59e0b;display:inline-block"></span>
          <h2 class="font-black text-base text-white" id="tourLabel">🔥 인기 투어</h2>
        </div>
        <a id="tourMoreBtn" href="/tours" class="text-xs font-bold gold flex items-center gap-0.5">
          전체 <span class="material-symbols-outlined text-sm">chevron_right</span>
        </a>
      </div>
      <div id="tourFeed" class="flex gap-3 px-4 overflow-x-auto ns pb-1"></div>
    </div>

    <!-- ── SECTION 6: 가이드 매칭 CTA ── -->
    <div class="px-4">
      <a href="/guides"
         class="flex items-center gap-4 rounded-2xl p-4 press"
         style="background:linear-gradient(135deg,#1a1400,#1a0e00);border:1px solid #f59e0b44">
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl" style="background:#f59e0b22">🗺</div>
        <div class="flex-1">
          <p class="font-black text-sm text-white">내 여행, 가이드에게 맡겨보세요</p>
          <p class="text-xs text-slate-400 mt-0.5">현지 교민이 직접 짜주는 맞춤 코스</p>
        </div>
        <div class="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-black" style="background:#f59e0b;color:#0a0a0f">
          매칭 →
        </div>
      </a>
    </div>

    <!-- ── SECTION 7: 후원 배너 ── -->
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
  /* ── 데이터 ── */
  var ALL_GUIDES = ${JSON.stringify(ALL_GUIDES)};
  var ALL_TOURS  = ${JSON.stringify(ALL_TOURS)};
  var COUNTRIES  = ${JSON.stringify(COUNTRIES)};

  var curCountry = '';

  /* ── 가이드 카드 렌더 ── */
  function renderGuideFeed(code) {
    var list = code
      ? ALL_GUIDES.filter(function(g){ return g.country === code; })
      : ALL_GUIDES.filter(function(g){ return g.super; }).slice(0, 5);

    var el = document.getElementById('guideFeed');
    if (!el) return;

    if (!list.length) {
      el.innerHTML = '<div class="card p-6 text-center w-full"><p class="text-slate-400 text-sm">해당 국가 가이드 준비 중입니다</p></div>';
      return;
    }

    el.innerHTML = list.map(function(g) {
      var superBadge = g.super
        ? '<div class="absolute top-2 right-2"><span style="background:#f59e0b;color:#0a0a0f;font-size:9px;font-weight:900;padding:2px 6px;border-radius:999px">👑 슈퍼</span></div>'
        : '';
      var verifiedIcon = g.verified
        ? '<span class="material-symbols-outlined text-sm verified" style="font-size:13px">verified</span>'
        : '';
      return '<a href="/guide/'+g.id+'" class="flex-shrink-0 press" style="width:150px">'
        + '<div class="relative rounded-2xl overflow-hidden mb-2" style="height:190px">'
        + '<img src="'+g.avatar+'" class="w-full h-full object-cover" alt="'+g.name+'" loading="lazy">'
        + '<div class="absolute inset-0" style="background:linear-gradient(to top,rgba(10,10,15,.95) 0%,rgba(10,10,15,.1) 55%,transparent 100%)"></div>'
        + superBadge
        + '<div class="absolute bottom-0 left-0 right-0 p-3">'
        + '<div class="flex items-center gap-1 mb-0.5">'
        + '<p class="text-white text-xs font-black truncate">'+g.name+'</p>'
        + verifiedIcon
        + '</div>'
        + '<p class="text-[10px]" style="color:#f59e0b">★ '+g.rating+' <span style="color:#94a3b8">('+g.reviews+')</span></p>'
        + '</div></div>'
        + '<div class="px-1">'
        + '<p class="text-xs text-slate-300 truncate">'+g.flag+' '+g.city+'</p>'
        + '<p class="text-[10px] text-slate-500 truncate leading-snug mt-0.5">'+g.tagline+'</p>'
        + '</div></a>';
    }).join('')
    // 더보기 버튼
    + '<a href="'+(code?'/guides?country='+code:'/guides')+'" class="flex-shrink-0 press" style="width:88px">'
    + '<div class="rounded-2xl flex flex-col items-center justify-center gap-2" style="height:190px;background:#13131a;border:1px dashed #2e2e3e">'
    + '<span class="material-symbols-outlined text-slate-500 text-3xl">add_circle</span>'
    + '<p class="text-[10px] text-slate-500 font-bold text-center leading-snug">가이드<br>더보기</p>'
    + '</div></a>';
  }

  /* ── 투어 카드 렌더 ── */
  function renderTourFeed(code) {
    var list = code
      ? ALL_TOURS.filter(function(t){ return t.country === code; })
      : ALL_TOURS.filter(function(t){ return t.isHot; }).slice(0, 6);

    var el = document.getElementById('tourFeed');
    if (!el) return;

    if (!list.length) {
      el.innerHTML = '<div class="card p-6 text-center w-full"><p class="text-slate-400 text-sm">해당 국가 투어 준비 중입니다</p></div>';
      return;
    }

    el.innerHTML = list.slice(0, 6).map(function(t) {
      var m = t.matureTag;
      return '<a href="/tour/'+t.id+'" class="flex-shrink-0 relative rounded-2xl overflow-hidden press" style="width:160px;height:200px">'
        + '<img src="'+t.img+'" class="w-full h-full object-cover" alt="'+t.title+'" loading="lazy">'
        + '<div class="absolute inset-0" style="background:linear-gradient(to top,rgba(10,10,15,.95) 0%,transparent 55%)"></div>'
        + '<div class="absolute top-2 left-2 flex gap-1">'
        + '<span style="background:#f59e0b22;color:#f59e0b;border:1px solid #f59e0b44;font-size:9px;font-weight:700;padding:2px 6px;border-radius:999px">'+t.flag+' '+t.city+'</span>'
        + (m ? '<span style="background:#ef444422;color:#ef4444;border:1px solid #ef444444;font-size:9px;font-weight:700;padding:2px 6px;border-radius:999px">🔞</span>' : '')
        + '</div>'
        + '<div class="absolute bottom-0 left-0 right-0 p-3">'
        + '<p class="text-white text-xs font-black leading-snug mb-1">'+t.title+'</p>'
        + '<p class="text-[10px] font-bold" style="color:#f59e0b">₩'+t.price.toLocaleString()+' ~</p>'
        + '</div></a>';
    }).join('');
  }

  /* ── 라벨 & 링크 업데이트 ── */
  function updateLabels(code) {
    var country = code ? COUNTRIES.find(function(c){ return c.code === code; }) : null;
    var name    = country ? country.flag + ' ' + country.name : '🌏 전체';

    var gl = document.getElementById('sectionLabel');
    var tl = document.getElementById('tourLabel');
    var gm = document.getElementById('guideMoreBtn');
    var tm = document.getElementById('tourMoreBtn');

    if (gl) gl.textContent = name + ' 가이드';
    if (tl) tl.textContent = country ? name + ' 투어' : '🔥 인기 투어';
    if (gm) gm.href = code ? '/guides?country=' + code : '/guides';
    if (tm) tm.href = code ? '/tours?country='  + code : '/tours';
  }

  /* ── 국가 탭 클릭 ── */
  window.selectCountry = function(code) {
    curCountry = code;

    // 탭 스타일 토글
    document.querySelectorAll('.cf-btn').forEach(function(b) {
      b.style.background   = '#13131a';
      b.style.color        = '#94a3b8';
      b.style.border       = '1px solid #1e1e2e';
    });
    var active = document.getElementById('cf_' + (code || 'ALL'));
    if (active) {
      active.style.background = '#f59e0b';
      active.style.color      = '#0a0a0f';
      active.style.border     = 'none';
    }

    // 컨텐츠 갱신
    updateLabels(code);
    renderGuideFeed(code);
    renderTourFeed(code);
  };

  /* ── 초기 렌더 ── */
  function init() {
    renderGuideFeed('');
    renderTourFeed('');
    updateLabels('');
    window.LG && window.LG.updateCartBadge();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
  </script>
  `

  return baseLayout('홈', content, 'home')
}

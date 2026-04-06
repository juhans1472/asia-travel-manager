import { baseLayout, COUNTRIES } from '../layout'
import { ALL_GUIDES, GUIDE_MAP, ALL_TOURS, TOUR_MAP } from '../data'

export const guidesPage = (country = '') => {
  const content = `
  <style>
    .cf-btn.active{background:#f59e0b!important;color:#0a0a0f!important;border-color:#f59e0b!important}
  </style>

  <!-- 헤더 -->
  <header class="sticky top-0 z-40 px-4 py-3 border-b" style="background:#0a0a0fee;backdrop-filter:blur(16px);border-color:#1e1e2e">
    <div class="flex items-center gap-3">
      <a href="/" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#13131a;border:1px solid #1e1e2e">
        <span class="material-symbols-outlined text-slate-300 text-xl">arrow_back</span>
      </a>
      <h1 class="flex-1 font-bold text-base text-slate-100">현지 가이드</h1>
    </div>
    <div class="flex gap-2 overflow-x-auto ns pb-1 mt-3">
      <button onclick="filterG('')" id="gfALL" class="cf-btn active flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-bold press" style="background:#f59e0b;color:#0a0a0f;border-color:#f59e0b">전체</button>
      ${COUNTRIES.map(c => `<button onclick="filterG('${c.code}')" id="gf${c.code}" class="cf-btn flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-bold press" style="background:#13131a;border-color:#1e1e2e;color:#94a3b8">${c.flag} ${c.name}</button>`).join('')}
    </div>
  </header>

  <div class="pb-28 pt-4 px-4 space-y-3" id="guideList">
    ${ALL_GUIDES.map(g => guideCard(g)).join('')}
  </div>

  <script>
(function(){
  var guides=${JSON.stringify(ALL_GUIDES)};
  window.filterG=function(code){
    document.querySelectorAll('.cf-btn').forEach(function(b){b.style.background='#13131a';b.style.color='#94a3b8';b.style.borderColor='#1e1e2e';});
    var btn=document.getElementById('gf'+(code||'ALL'));
    if(btn){btn.style.background='#f59e0b';btn.style.color='#0a0a0f';btn.style.borderColor='#f59e0b';}
    var filtered=code?guides.filter(function(g){return g.country===code;}):guides;
    var el=document.getElementById('guideList');
    if(!el)return;
    el.innerHTML=filtered.map(function(g){
      var thStr=g.themes?g.themes.map(function(t){return '<span class="badge text-[10px]" style="background:#f59e0b11;color:#f59e0b;border:1px solid #f59e0b22">'+t+'</span>';}).join(''):'';
      var tagStr=g.tags?g.tags.map(function(t){return '<span class="text-[10px] px-2 py-0.5 rounded-full" style="background:#1e1e2e;color:#94a3b8">'+t+'</span>';}).join(''):'';
      var isSuper=g.super;
      return '<a href="/guide/'+g.id+'" class="card p-4 press block">'
        +'<div class="flex items-start gap-3">'
        +'<img src="'+g.avatar+'" class="w-14 h-14 rounded-full object-cover border-2 flex-shrink-0" style="border-color:'+(isSuper?'#f59e0b':'#1e1e2e')+'">'
        +'<div class="flex-1 min-w-0">'
        +'<div class="flex items-center gap-1 mb-0.5"><p class="text-sm font-black text-slate-100 truncate">'+g.name+'</p>'
        +(g.verified?'<span class="material-symbols-outlined text-sm verified" style="font-variation-settings:\'FILL\' 1">verified</span>':'')
        +'</div>'
        +'<p class="text-xs text-slate-400 mb-1">'+g.flag+' '+g.city+' · '+g.tagline+'</p>'
        +'<div class="flex items-center gap-2 flex-wrap mb-2">'
        +'<span class="text-xs star">★ '+g.rating+'</span>'
        +'<span class="text-xs text-slate-500">리뷰 '+g.reviews+'</span>'
        +'<span class="text-xs text-slate-500">완료 '+g.guides_done+'건</span>'
        +'<span class="badge text-[10px]" style="background:#f59e0b22;color:#f59e0b;border:1px solid #f59e0b44">'+g.badge+'</span>'
        +'</div>'
        +'<div class="flex gap-1 flex-wrap mb-2">'+thStr+'</div>'
        +'<div class="flex gap-1 flex-wrap">'+tagStr+'</div>'
        +'</div></div>'
        +'<div class="flex gap-2 mt-3">'
        +'<button onclick="event.preventDefault();supportGuide(\''+g.id+'\',\''+g.name+'\','+g.support_price+')" class="flex-1 py-2 rounded-xl text-xs font-bold press" style="background:#f59e0b22;border:1px solid #f59e0b44;color:#f59e0b">☕ 후원하기</button>'
        +'<span class="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold" style="background:#13131a;color:#94a3b8">투어 보기 →</span>'
        +'</div>'
        +'</a>';
    }).join('');
  };

  window.supportGuide=function(id,name,price){
    var modal=document.getElementById('supportModal');
    if(modal){
      document.getElementById('smName').textContent=name;
      document.getElementById('smId').value=id;
      document.getElementById('smPrice').value=price;
      modal.classList.remove('hidden');modal.classList.add('flex');
    }
  };
  window.closeSupportModal=function(){
    var m=document.getElementById('supportModal');
    if(m){m.classList.add('hidden');m.classList.remove('flex');}
  };
  window.confirmSupport=function(){
    var name=document.getElementById('smName').textContent;
    var price=parseInt(document.getElementById('smPrice').value)||10000;
    window.LG&&window.LG.showToast('☕ '+name+' 가이드에게 ₩'+price.toLocaleString()+' 후원했습니다!');
    window.closeSupportModal();
  };
})();
  </script>

  <!-- 후원 모달 -->
  <div id="supportModal" class="fixed inset-0 z-50 hidden items-center justify-center" style="background:rgba(0,0,0,.8)">
    <div class="card w-full max-w-[360px] mx-4 p-5 border" style="border-color:#f59e0b44">
      <div class="text-center mb-4">
        <p class="text-3xl mb-2">☕</p>
        <h3 class="font-black text-lg text-slate-100">가이드 후원하기</h3>
        <p class="text-sm text-slate-400 mt-1"><span id="smName"></span> 가이드에게 후원합니다</p>
      </div>
      <input type="hidden" id="smId">
      <div class="space-y-3 mb-4">
        <p class="text-xs text-slate-500 text-center">후원 금액 선택</p>
        <div class="grid grid-cols-3 gap-2">
          ${[5000,10000,20000].map(a => `<button onclick="document.getElementById('smPrice').value=${a}" class="py-2 rounded-xl border text-sm font-bold press" style="background:#13131a;border-color:#1e1e2e;color:#94a3b8">₩${a.toLocaleString()}</button>`).join('')}
        </div>
        <input type="number" id="smPrice" value="10000" placeholder="직접 입력 (원)">
      </div>
      <button onclick="confirmSupport()" class="w-full py-3 rounded-xl font-black press" style="background:#f59e0b;color:#0a0a0f">후원하기 ☕</button>
      <button onclick="closeSupportModal()" class="w-full mt-2 py-2 text-sm text-slate-500 press">취소</button>
    </div>
  </div>
  `
  return baseLayout('현지 가이드', content, 'guides')
}

function guideCard(g: typeof ALL_GUIDES[0]) {
  const isSuper = g.super
  const themeStr = g.themes.map(t => `<span class="badge text-[10px]" style="background:#f59e0b11;color:#f59e0b;border:1px solid #f59e0b22">${t}</span>`).join('')
  const tagStr   = g.tags.map(t => `<span class="text-[10px] px-2 py-0.5 rounded-full" style="background:#1e1e2e;color:#94a3b8">${t}</span>`).join('')
  return `
<a href="/guide/${g.id}" class="card p-4 press block">
  <div class="flex items-start gap-3">
    <img src="${g.avatar}" class="w-14 h-14 rounded-full object-cover border-2 flex-shrink-0" style="border-color:${isSuper ? '#f59e0b' : '#1e1e2e'}">
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-1 mb-0.5">
        <p class="text-sm font-black text-slate-100 truncate">${g.name}</p>
        ${g.verified ? '<span class="material-symbols-outlined text-sm verified" style="font-variation-settings:\'FILL\' 1">verified</span>' : ''}
      </div>
      <p class="text-xs text-slate-400 mb-1">${g.flag} ${g.city} · ${g.tagline}</p>
      <div class="flex items-center gap-2 flex-wrap mb-2">
        <span class="text-xs star">★ ${g.rating}</span>
        <span class="text-xs text-slate-500">리뷰 ${g.reviews}</span>
        <span class="text-xs text-slate-500">완료 ${g.guides_done}건</span>
        <span class="badge text-[10px]" style="background:#f59e0b22;color:#f59e0b;border:1px solid #f59e0b44">${g.badge}</span>
      </div>
      <div class="flex gap-1 flex-wrap mb-2">${themeStr}</div>
      <div class="flex gap-1 flex-wrap">${tagStr}</div>
    </div>
  </div>
  <div class="flex gap-2 mt-3">
    <button onclick="event.preventDefault();supportGuide('${g.id}','${g.name}',${g.support_price})"
            class="flex-1 py-2 rounded-xl text-xs font-bold press" style="background:#f59e0b22;border:1px solid #f59e0b44;color:#f59e0b">☕ 후원하기</button>
    <span class="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold" style="background:#13131a;color:#94a3b8">투어 보기 →</span>
  </div>
</a>`
}

// ─── 가이드 상세 페이지 ───────────────────────────────────
export const guideDetailPage = (id: string) => {
  const g = GUIDE_MAP[id]
  if (!g) return baseLayout('가이드 없음', '<div class="p-8 text-center text-slate-400">가이드를 찾을 수 없습니다.</div>', 'guides')

  const guideTours = ALL_TOURS.filter(t => t.guideId === id)

  const content = `
  <!-- 헤더 -->
  <header class="sticky top-0 z-40 px-4 py-3 border-b" style="background:#0a0a0fee;backdrop-filter:blur(16px);border-color:#1e1e2e">
    <div class="flex items-center gap-3">
      <a href="/guides" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#13131a;border:1px solid #1e1e2e">
        <span class="material-symbols-outlined text-slate-300 text-xl">arrow_back</span>
      </a>
      <h1 class="flex-1 font-bold text-base text-slate-100">${g.name}</h1>
      <button onclick="shareGuide()" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#13131a;border:1px solid #1e1e2e">
        <span class="material-symbols-outlined text-slate-300 text-xl">share</span>
      </button>
    </div>
  </header>

  <div class="pb-32 pt-4 px-4 space-y-5 fade-in">

    <!-- 프로필 -->
    <div class="card p-5 border" style="border-color:${g.super ? '#f59e0b44' : '#1e1e2e'}">
      <div class="flex items-center gap-4 mb-4">
        <img src="${g.avatar}" class="w-20 h-20 rounded-full object-cover border-2 flex-shrink-0" style="border-color:#f59e0b">
        <div class="flex-1">
          <div class="flex items-center gap-1 mb-1">
            <h2 class="text-lg font-black text-slate-100">${g.name}</h2>
            ${g.verified ? '<span class="material-symbols-outlined text-base verified" style="font-variation-settings:\'FILL\' 1">verified</span>' : ''}
          </div>
          <p class="text-xs text-slate-400">${g.flag} ${g.city} · ${g.countryName}</p>
          <div class="flex items-center gap-1 mt-1">
            <span class="badge text-xs" style="background:#f59e0b22;color:#f59e0b;border:1px solid #f59e0b44">${g.badge}</span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-2 mb-4">
        <div class="text-center"><p class="text-lg font-black gold">${g.rating}</p><p class="text-xs text-slate-500">평점</p></div>
        <div class="text-center"><p class="text-lg font-black text-slate-100">${g.reviews}</p><p class="text-xs text-slate-500">리뷰</p></div>
        <div class="text-center"><p class="text-lg font-black text-slate-100">${g.guides_done}</p><p class="text-xs text-slate-500">완료 건수</p></div>
      </div>
      <p class="text-sm text-slate-300 leading-relaxed mb-3">${g.intro}</p>
      <div class="flex gap-1 flex-wrap mb-3">
        ${g.tags.map(t => `<span class="text-xs px-2 py-0.5 rounded-full" style="background:#1e1e2e;color:#94a3b8">${t}</span>`).join('')}
      </div>
      <div class="flex gap-1 flex-wrap mb-3">
        <span class="text-xs text-slate-500">사용 언어:</span>
        ${g.lang.map(l => `<span class="badge text-[10px]" style="background:#3b82f611;color:#60a5fa;border:1px solid #3b82f633">${l}</span>`).join('')}
      </div>
      <div class="flex gap-1 flex-wrap">
        <span class="text-xs text-slate-500">테마:</span>
        ${g.themes.map(t => `<span class="badge text-[10px]" style="background:#f59e0b11;color:#f59e0b;border:1px solid #f59e0b33">${t}</span>`).join('')}
      </div>
    </div>

    <!-- 후원 버튼 -->
    <div class="card p-4 border" style="border-color:#f59e0b33;background:linear-gradient(135deg,#13131a,#1a1600)">
      <div class="flex items-center gap-3">
        <span class="text-3xl">☕</span>
        <div class="flex-1">
          <p class="text-sm font-black text-slate-100">가이드에게 후원하기</p>
          <p class="text-xs text-slate-400">현지 가이드 활동을 응원해주세요</p>
        </div>
        <button onclick="openSupport()" class="px-4 py-2 rounded-xl text-sm font-black press" style="background:#f59e0b;color:#0a0a0f">후원 ☕</button>
      </div>
    </div>

    <!-- 이 가이드의 투어 -->
    <div>
      <h3 class="font-bold text-sm text-slate-100 mb-3">📋 ${g.name}의 투어 코스</h3>
      <div class="space-y-3">
        ${guideTours.map(t => {
          const isMature = (t as any).matureTag
          return `<a href="/tour/${t.id}" class="card overflow-hidden press block">
  <div class="relative" style="height:140px">
    <img src="${t.img}" class="w-full h-full object-cover" alt="${t.title}">
    <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(10,10,15,.9) 0%,transparent 55%)"></div>
    ${isMature ? '<div class="absolute top-2 right-2"><span class="badge" style="background:#ef444422;color:#ef4444;border:1px solid #ef444444">🔞 성인전용</span></div>' : ''}
    <div class="absolute bottom-0 left-0 right-0 p-3">
      <p class="text-white text-sm font-black">${t.title}</p>
    </div>
  </div>
  <div class="p-3">
    <div class="flex items-center justify-between mb-2">
      <div class="flex gap-2 text-xs text-slate-400">
        <span>⏱ ${t.duration}</span><span>👥 ${t.groupSize}</span>
        <span class="star">★ ${t.rating}</span>
      </div>
      <p class="font-black gold text-sm">₩${t.price.toLocaleString()}</p>
    </div>
    <div class="flex gap-1 flex-wrap">
      ${t.tags.map(tg => `<span class="text-[10px] px-2 py-0.5 rounded-full" style="background:#1e1e2e;color:#94a3b8">${tg}</span>`).join('')}
    </div>
  </div>
</a>`
        }).join('')}
      </div>
    </div>

  </div>

  <!-- 후원 모달 -->
  <div id="supportModal" class="fixed inset-0 z-50 hidden items-center justify-center" style="background:rgba(0,0,0,.8)">
    <div class="card w-full max-w-[360px] mx-4 p-5 border" style="border-color:#f59e0b44">
      <div class="text-center mb-4">
        <p class="text-3xl mb-2">☕</p>
        <h3 class="font-black text-lg text-slate-100">후원하기</h3>
        <p class="text-sm text-slate-400 mt-1">${g.name} 가이드에게 후원합니다</p>
      </div>
      <div class="space-y-3 mb-4">
        <div class="grid grid-cols-3 gap-2">
          ${[5000,10000,20000].map(a => `<button onclick="document.getElementById('spAmt').value=${a}" class="py-2 rounded-xl border text-sm font-bold press" style="background:#13131a;border-color:#1e1e2e;color:#94a3b8">₩${a.toLocaleString()}</button>`).join('')}
        </div>
        <input type="number" id="spAmt" value="${g.support_price}" placeholder="직접 입력 (원)">
        <textarea placeholder="응원 메시지 (선택)" rows="2" id="spMsg" style="resize:none"></textarea>
      </div>
      <button onclick="doSupport()" class="w-full py-3 rounded-xl font-black press" style="background:#f59e0b;color:#0a0a0f">후원하기 ☕</button>
      <button onclick="closeSM()" class="w-full mt-2 py-2 text-sm text-slate-500 press">취소</button>
    </div>
  </div>

  <script>
(function(){
  window.openSupport=function(){
    var m=document.getElementById('supportModal');if(m){m.classList.remove('hidden');m.classList.add('flex');}
  };
  window.closeSM=function(){
    var m=document.getElementById('supportModal');if(m){m.classList.add('hidden');m.classList.remove('flex');}
  };
  window.doSupport=function(){
    var amt=parseInt(document.getElementById('spAmt').value)||10000;
    window.LG&&window.LG.showToast('☕ ₩'+amt.toLocaleString()+' 후원 완료! 감사합니다 🙏');
    window.closeSM();
  };
  window.shareGuide=function(){
    if(navigator.share)navigator.share({title:'${g.name} 가이드',url:location.href});
    else{navigator.clipboard&&navigator.clipboard.writeText(location.href);alert('링크가 복사되었습니다!');}
  };
})();
  </script>
  `
  return baseLayout(g.name, content, 'guides')
}

import { baseLayout, DESTINATIONS } from '../layout'

export const homePage = () => {
  const featured = [
    { id:'jp-tokyo', country:'일본', flag:'🇯🇵', city:'도쿄', code:'JP', tag:'#트렌디', desc:'감성 카페부터 애니까지', img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop', color:'#f43f5e', badge:'인기 1위' },
    { id:'th-bangkok', country:'태국', flag:'🇹🇭', city:'방콕', code:'TH', tag:'#가성비', desc:'길거리 음식과 화려한 궁전', img:'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&h=400&fit=crop', color:'#f59e0b', badge:'가성비 최고' },
    { id:'vn-danang', country:'베트남', flag:'🇻🇳', city:'다낭', code:'VN', tag:'#힐링', desc:'에메랄드빛 해변과 자연', img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=400&fit=crop', color:'#22c55e', badge:'NEW' },
    { id:'tw-taipei', country:'대만', flag:'🇹🇼', city:'타이베이', code:'TW', tag:'#야식', desc:'야시장과 버블티의 도시', img:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop', color:'#3b82f6', badge:'주목' },
    { id:'id-bali', country:'인도네시아', flag:'🇮🇩', city:'발리', code:'ID', tag:'#감성', desc:'신들의 섬, 인스타 성지', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop', color:'#14b8a6', badge:'인기' },
  ]

  const themes = [
    { key:'food',   icon:'🍜', label:'맛집 투어',  color:'#f59e0b', bg:'rgba(245,158,11,.12)' },
    { key:'nature', icon:'🏞', label:'자연/힐링',  color:'#22c55e', bg:'rgba(34,197,94,.12)' },
    { key:'city',   icon:'🏙', label:'도시 탐험',  color:'#38bdf8', bg:'rgba(56,189,248,.12)' },
    { key:'history',icon:'🏛', label:'역사/문화',  color:'#a855f7', bg:'rgba(168,85,247,.12)' },
    { key:'beach',  icon:'🏖', label:'해변/리조트', color:'#f43f5e', bg:'rgba(244,63,94,.12)' },
    { key:'shop',   icon:'🛍', label:'쇼핑',       color:'#ec4899', bg:'rgba(236,72,153,.12)' },
  ]

  const content = `
  <!-- 헤더 -->
  <header class="sticky top-0 z-40 px-4 py-3 border-b" style="background:#030712ee;backdrop-filter:blur(16px);border-color:#1e293b">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-2xl">✈️</span>
        <div>
          <span class="font-black text-base" style="color:#38bdf8">Asia</span>
          <span class="font-black text-base text-slate-100 ml-1">Travel</span>
          <span class="font-bold text-sm text-slate-400 ml-1">Manager</span>
        </div>
      </div>
      <div class="flex gap-2">
        <a href="/destinations" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#0f172a;border:1px solid #1e293b">
          <span class="material-symbols-outlined text-slate-300 text-xl">search</span>
        </a>
        <a href="/planner" class="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full press" style="background:#0ea5e9;color:#fff">
          <span class="material-symbols-outlined text-sm">add</span>
          일정 만들기
        </a>
      </div>
    </div>
  </header>

  <div class="pb-28 pt-4 space-y-8">

    <!-- 히어로 배너 -->
    <div class="px-4">
      <div class="relative rounded-3xl overflow-hidden" style="height:220px">
        <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&h=500&fit=crop"
             class="w-full h-full object-cover" alt="아시아 여행">
        <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(3,7,18,.95) 0%,rgba(3,7,18,.4) 55%,transparent 100%)"></div>
        <div class="absolute bottom-0 left-0 right-0 p-5">
          <p class="text-xs font-bold mb-1" style="color:#38bdf8">✈️ 8개국 · 30개 이상 도시</p>
          <h2 class="text-white text-xl font-black leading-tight mb-2">나만의 아시아 여행을<br>지금 계획해보세요</h2>
          <a href="/destinations" class="inline-flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-full press" style="background:#0ea5e9;color:#fff">
            <span class="material-symbols-outlined text-sm">travel_explore</span>
            여행지 탐색하기
          </a>
        </div>
      </div>
    </div>

    <!-- 빠른 검색 -->
    <div class="px-4">
      <a href="/destinations" class="flex items-center gap-3 px-4 py-3 rounded-2xl border press"
         style="background:#0f172a;border-color:#1e293b">
        <span class="material-symbols-outlined sky">search</span>
        <span class="text-sm text-slate-400">국가, 도시, 관광지 검색...</span>
        <span class="material-symbols-outlined text-slate-600 text-sm ml-auto">tune</span>
      </a>
    </div>

    <!-- 여행 테마 -->
    <div class="px-4">
      <h3 class="font-bold text-sm text-slate-100 mb-3">여행 테마</h3>
      <div class="grid grid-cols-3 gap-2">
        ${themes.map(t => `
        <a href="/destinations?theme=${t.key}" class="flex flex-col items-center gap-2 p-3 rounded-2xl border press"
           style="background:${t.bg};border-color:${t.color}33">
          <span class="text-2xl">${t.icon}</span>
          <span class="text-xs font-bold" style="color:${t.color}">${t.label}</span>
        </a>`).join('')}
      </div>
    </div>

    <!-- 인기 여행지 -->
    <div>
      <div class="px-4 flex items-center justify-between mb-3">
        <h3 class="font-bold text-sm text-slate-100">지금 인기 여행지</h3>
        <a href="/destinations" class="text-xs font-semibold sky">전체 →</a>
      </div>
      <div class="flex gap-3 px-4 overflow-x-auto ns pb-1">
        ${featured.map(f => `
        <a href="/destination/${f.id}" onclick="window.TM&&window.TM.addRecent({id:'${f.id}',type:'dest',name:'${f.city}',country:'${f.country}',flag:'${f.flag}',city:'${f.city}'})"
           class="flex-shrink-0 relative rounded-2xl overflow-hidden press" style="width:160px;height:200px">
          <img src="${f.img}" class="w-full h-full object-cover" alt="${f.city}">
          <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(3,7,18,.9) 0%,transparent 55%)"></div>
          <div class="absolute top-2 right-2">
            <span class="badge text-[10px]" style="background:${f.color}22;color:${f.color};border:1px solid ${f.color}44">${f.badge}</span>
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-3">
            <p class="text-[10px] font-bold mb-0.5" style="color:${f.color}">${f.flag} ${f.tag}</p>
            <p class="text-white text-sm font-black">${f.city}</p>
            <p class="text-slate-400 text-[10px]">${f.desc}</p>
          </div>
        </a>`).join('')}
      </div>
    </div>

    <!-- 국가별 탐색 -->
    <div class="px-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-sm text-slate-100">국가별 탐색</h3>
        <a href="/destinations" class="text-xs font-semibold sky">더보기 →</a>
      </div>
      <div class="flex gap-2 overflow-x-auto ns pb-1">
        ${DESTINATIONS.map(d => `
        <a href="/destinations?country=${d.code}" class="flex-shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border press"
           style="background:#0f172a;border-color:${d.color}33;min-width:76px">
          <span class="text-2xl">${d.flag}</span>
          <span class="text-xs font-bold text-slate-200">${d.country}</span>
          <span class="text-[10px] text-slate-500">${d.cities.length}개 도시</span>
        </a>`).join('')}
      </div>
    </div>

    <!-- 내 여행 일정 미리보기 -->
    <div class="px-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-sm text-slate-100">내 여행 일정</h3>
        <a href="/planner" class="text-xs font-semibold sky">일정 관리 →</a>
      </div>
      <div id="homeTrips" class="space-y-2"></div>
      <a href="/planner" class="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-dashed press text-sm font-bold sky" style="border-color:#0ea5e933">
        <span class="material-symbols-outlined text-sm">add_circle</span>
        새 여행 계획 만들기
      </a>
    </div>

    <!-- 여행 팁 미리보기 -->
    <div class="px-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-sm text-slate-100">여행 꿀팁</h3>
        <a href="/tips" class="text-xs font-semibold sky">더보기 →</a>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <a href="/tips?tab=currency" class="card p-3 press">
          <p class="text-xl mb-1">💴</p>
          <p class="text-sm font-bold text-slate-200">환율 계산기</p>
          <p class="text-xs text-slate-500 mt-0.5">실시간 환율 확인</p>
        </a>
        <a href="/tips?tab=phrase" class="card p-3 press">
          <p class="text-xl mb-1">🗣️</p>
          <p class="text-sm font-bold text-slate-200">현지 회화</p>
          <p class="text-xs text-slate-500 mt-0.5">국가별 필수 표현</p>
        </a>
        <a href="/tips?tab=visa" class="card p-3 press">
          <p class="text-xl mb-1">🛂</p>
          <p class="text-sm font-bold text-slate-200">비자 정보</p>
          <p class="text-xs text-slate-500 mt-0.5">무비자·이비자 안내</p>
        </a>
        <a href="/tips?tab=packing" class="card p-3 press">
          <p class="text-xl mb-1">🎒</p>
          <p class="text-sm font-bold text-slate-200">짐 챙기기</p>
          <p class="text-xs text-slate-500 mt-0.5">국가별 필수 준비물</p>
        </a>
      </div>
    </div>

  </div>

  <script>
(function(){
  function renderHomeTrips(){
    var el=document.getElementById('homeTrips');
    if(!el)return;
    var trips=window.TM?window.TM.getTrips():[];
    if(!trips||trips.length===0){
      el.innerHTML='<p class="text-center text-sm text-slate-500 py-4">저장된 여행 일정이 없습니다</p>';
      return;
    }
    el.innerHTML=trips.slice(0,2).map(function(t){
      var days=t.days?t.days.length:0;
      return '<a href="/planner?id='+t.id+'" class="card flex items-center gap-3 p-3 press">'
        +'<div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style="background:#0ea5e922">'+((t.flag)||'✈️')+'</div>'
        +'<div class="flex-1 min-w-0"><p class="text-sm font-bold text-slate-200 truncate">'+(t.title||'여행 계획')+'</p>'
        +'<p class="text-xs text-slate-500">'+(t.country||'')+(t.city?' · '+t.city:'')+' · '+days+'일 일정</p></div>'
        +'<span class="material-symbols-outlined text-slate-500 text-sm">chevron_right</span>'
        +'</a>';
    }).join('');
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',renderHomeTrips);
  }else{
    renderHomeTrips();
  }
})();
  </script>
  `

  return baseLayout('홈', content, 'home')
}

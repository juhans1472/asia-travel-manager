import { baseLayout, COUNTRIES } from '../layout'
import { ALL_TOURS, ALL_GUIDES, GUIDE_MAP, TOUR_MAP } from '../data'

export const toursPage = (country = '', theme = '') => {
  const content = `
  <style>
    .cf-btn.active{background:#f59e0b!important;color:#0a0a0f!important;border-color:#f59e0b!important}
    .tf-btn.active{background:#f59e0b!important;color:#0a0a0f!important;border-color:#f59e0b!important}
  </style>

  <header class="sticky top-0 z-40 px-4 py-3 border-b" style="background:#0a0a0fee;backdrop-filter:blur(16px);border-color:#1e1e2e">
    <div class="flex items-center gap-3">
      <a href="/" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#13131a;border:1px solid #1e1e2e">
        <span class="material-symbols-outlined text-slate-300 text-xl">arrow_back</span>
      </a>
      <h1 class="flex-1 font-bold text-base text-slate-100">투어 탐색</h1>
      <div class="relative">
        <a href="/cart" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#13131a;border:1px solid #1e1e2e">
          <span class="material-symbols-outlined text-slate-300 text-xl">shopping_cart</span>
          <span class="cart-badge cart-badge-count" style="display:none">0</span>
        </a>
      </div>
    </div>
    <!-- 검색 -->
    <div class="mt-2 relative">
      <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xl">search</span>
      <input id="tourSearch" type="text" placeholder="도시, 테마, 가이드 검색..." class="pl-10" oninput="renderTours()">
    </div>
    <!-- 국가 탭 -->
    <div class="flex gap-2 overflow-x-auto ns pb-1 mt-2">
      <button onclick="setTCountry('')" id="tcALL" class="cf-btn active flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-bold press" style="background:#f59e0b;color:#0a0a0f;border-color:#f59e0b">전체</button>
      ${COUNTRIES.map(c => `<button onclick="setTCountry('${c.code}')" id="tc${c.code}" class="cf-btn flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-bold press" style="background:#13131a;border-color:#1e1e2e;color:#94a3b8">${c.flag} ${c.name}</button>`).join('')}
    </div>
    <!-- 테마 탭 -->
    <div class="flex gap-2 overflow-x-auto ns pb-1 mt-2">
      ${[
        {key:'', label:'🗂 전체'},
        {key:'일반', label:'🌏 일반'},
        {key:'맛집', label:'🍜 맛집'},
        {key:'남성전용', label:'🔞 남성전용'},
        {key:'커플', label:'💑 커플'},
        {key:'배낭여행', label:'🎒 배낭'},
        {key:'힐링', label:'🧘 힐링'},
      ].map((t, i) => `<button onclick="setTTheme('${t.key}')" id="tt${t.key||'ALL'}" class="tf-btn flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-bold press${i===0?' active':''}" style="${i===0?'background:#f59e0b;color:#0a0a0f;border-color:#f59e0b':'background:#13131a;border-color:#1e1e2e;color:#94a3b8'}">${t.label}</button>`).join('')}
    </div>
  </header>

  <div class="pb-28 pt-3 px-4">
    <p class="text-xs text-slate-500 mb-3"><span id="tourCount">${ALL_TOURS.length}</span>개 투어</p>
    <div id="tourList" class="space-y-3"></div>
    <div id="tourEmpty" class="hidden py-16 text-center">
      <p class="text-4xl mb-3">🔍</p>
      <p class="text-slate-400 text-sm">검색 결과가 없습니다</p>
    </div>
  </div>

  <script>
(function(){
  var tours=${JSON.stringify(ALL_TOURS)};
  var guides=${JSON.stringify(ALL_GUIDES)};
  var guideMap={};guides.forEach(function(g){guideMap[g.id]=g;});
  var curCountry='${country}';var curTheme='${theme}';var curSearch='';

  function renderTours(){
    var q=(document.getElementById('tourSearch')||{value:''}).value.toLowerCase();
    curSearch=q;
    var filtered=tours.filter(function(t){
      var mc=!curCountry||t.country===curCountry;
      var mt=!curTheme||t.theme===curTheme;
      var g=guideMap[t.guideId]||{};
      var ms=!q||(t.title+t.city+(t.tags||[]).join('')+(g.name||'')).toLowerCase().indexOf(q)>=0;
      return mc&&mt&&ms;
    });
    var el=document.getElementById('tourList');
    var em=document.getElementById('tourEmpty');
    var rc=document.getElementById('tourCount');
    if(rc)rc.textContent=filtered.length;
    if(!filtered.length){if(el)el.innerHTML='';if(em)em.classList.remove('hidden');return;}
    if(em)em.classList.add('hidden');
    if(!el)return;
    el.innerHTML=filtered.map(function(t){
      var g=guideMap[t.guideId]||{};
      var isMature=t.matureTag;
      var inCart=window.LG&&window.LG.isInCart(t.id);
      return '<div class="card overflow-hidden">'
        +'<a href="/tour/'+t.id+'" class="block">'
        +'<div class="relative" style="height:160px">'
        +'<img src="'+t.img+'" class="w-full h-full object-cover" alt="'+t.title+'">'
        +'<div class="absolute inset-0" style="background:linear-gradient(to top,rgba(10,10,15,.9) 0%,transparent 55%)"></div>'
        +'<div class="absolute top-2 left-2 flex gap-1">'
        +'<span class="badge" style="background:#f59e0b22;color:#f59e0b;border:1px solid #f59e0b44">'+t.flag+' '+t.city+'</span>'
        +(isMature?'<span class="badge" style="background:#ef444422;color:#ef4444;border:1px solid #ef444444">🔞</span>':'')
        +'</div>'
        +'<div class="absolute bottom-0 left-0 right-0 p-3">'
        +'<p class="text-white text-base font-black">'+t.title+'</p>'
        +'</div></div>'
        +'<div class="p-3">'
        +'<div class="flex items-center justify-between mb-2">'
        +'<div class="flex gap-3 text-xs text-slate-400"><span>⏱ '+t.duration+'</span><span>👥 '+t.groupSize+'</span><span class="star">★ '+t.rating+' ('+t.reviews+')</span></div>'
        +'<p class="font-black text-lg gold">₩'+t.price.toLocaleString()+'</p>'
        +'</div>'
        +'<div class="flex gap-1 flex-wrap mb-2">'+(t.tags||[]).map(function(tg){return '<span class="text-[10px] px-2 py-0.5 rounded-full" style="background:#1e1e2e;color:#94a3b8">'+tg+'</span>';}).join('')+'</div>'
        +(g.name?'<a href="/guide/'+t.guideId+'" class="flex items-center gap-2 mb-2 press" onclick="event.stopPropagation()">'
          +'<img src="'+(g.avatar||'')+'" class="w-6 h-6 rounded-full object-cover flex-shrink-0" style="border:1px solid #f59e0b44">'
          +'<span class="text-xs text-slate-400">'+g.name+' 가이드</span></a>':'')
        +'<p class="text-xs text-slate-500 mb-3">예약금 '+t.depositRate+'% (₩'+(Math.round(t.price*t.depositRate/100)).toLocaleString()+') 결제 후 확정</p>'
        +'</div></a>'
        +'<div class="px-3 pb-3 flex gap-2">'
        +'<button onclick="toggleCart(this,\''+t.id+'\','+JSON.stringify(t).replace(/'/g,"\\'")+'" class="flex-1 py-2.5 rounded-xl text-sm font-bold press" id="cb_'+t.id+'" style="'+( inCart?'background:#f59e0b;color:#0a0a0f':'background:#f59e0b22;border:1px solid #f59e0b44;color:#f59e0b')+'">'+( inCart?'✓ 담김':'🛒 장바구니')+'</button>'
        +'<a href="/tour/'+t.id+'" class="flex-1 py-2.5 rounded-xl text-sm font-bold text-center press" style="background:#13131a;border:1px solid #1e1e2e;color:#94a3b8">자세히</a>'
        +'</div>'
        +'</div>';
    }).join('');
  }

  window.setTCountry=function(code){
    curCountry=code;
    document.querySelectorAll('.cf-btn').forEach(function(b){b.style.background='#13131a';b.style.color='#94a3b8';b.style.borderColor='#1e1e2e';});
    var btn=document.getElementById('tc'+(code||'ALL'));
    if(btn){btn.style.background='#f59e0b';btn.style.color='#0a0a0f';btn.style.borderColor='#f59e0b';}
    renderTours();
  };
  window.setTTheme=function(th){
    curTheme=th;
    document.querySelectorAll('.tf-btn').forEach(function(b){b.style.background='#13131a';b.style.color='#94a3b8';b.style.borderColor='#1e1e2e';});
    var btn=document.getElementById('tt'+(th||'ALL'));
    if(btn){btn.style.background='#f59e0b';btn.style.color='#0a0a0f';btn.style.borderColor='#f59e0b';}
    renderTours();
  };
  window.toggleCart=function(btn,id,tourJson){
    if(!window.LG)return;
    var tour=typeof tourJson==='object'?tourJson:JSON.parse(tourJson);
    if(window.LG.isInCart(id)){
      window.LG.removeCart(id);btn.textContent='🛒 장바구니';btn.style.background='#f59e0b22';btn.style.color='#f59e0b';btn.style.borderColor='1px solid #f59e0b44';btn.style.border='1px solid #f59e0b44';
    }else{
      window.LG.addCart({id:tour.id,title:tour.title,price:tour.price,flag:tour.flag,city:tour.city,country:tour.country,img:tour.img,depositRate:tour.depositRate,guideId:tour.guideId});
      btn.textContent='✓ 담김';btn.style.background='#f59e0b';btn.style.color='#0a0a0f';btn.style.border='none';
    }
  };

  if(curCountry)window.setTCountry(curCountry);
  if(curTheme)window.setTTheme(curTheme);
  renderTours();
})();
  </script>
  `
  return baseLayout('투어 탐색', content, 'tours')
}

// ─── 투어 상세 페이지 ───────────────────────────────────
export const tourDetailPage = (id: string) => {
  const t = TOUR_MAP[id]
  if (!t) return baseLayout('투어 없음', '<div class="p-8 text-center text-slate-400">투어를 찾을 수 없습니다.</div>', 'tours')
  const g = GUIDE_MAP[t.guideId]
  const isMature = (t as any).matureTag
  const depositAmt = Math.round(t.price * t.depositRate / 100)

  const content = `
  <!-- 헤더 -->
  <header class="sticky top-0 z-40 px-4 py-3 border-b" style="background:#0a0a0fee;backdrop-filter:blur(16px);border-color:#1e1e2e">
    <div class="flex items-center gap-3">
      <a href="/tours" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#13131a;border:1px solid #1e1e2e">
        <span class="material-symbols-outlined text-slate-300 text-xl">arrow_back</span>
      </a>
      <h1 class="flex-1 text-sm font-bold text-slate-100 truncate">${t.flag} ${t.city} · ${t.theme}</h1>
      <button onclick="shareTour()" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#13131a;border:1px solid #1e1e2e">
        <span class="material-symbols-outlined text-slate-300 text-xl">share</span>
      </button>
    </div>
  </header>

  <!-- 이미지 -->
  <div class="relative" style="height:240px">
    <img src="${t.img}" class="w-full h-full object-cover" alt="${t.title}">
    <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(10,10,15,.9) 0%,transparent 55%)"></div>
    <div class="absolute top-3 left-3 flex gap-1">
      <span class="badge" style="background:#f59e0b22;color:#f59e0b;border:1px solid #f59e0b44">${t.flag} ${t.city}</span>
      ${isMature ? '<span class="badge" style="background:#ef444422;color:#ef4444;border:1px solid #ef444444">🔞 성인전용</span>' : ''}
      <span class="badge" style="background:#13131a99;color:#94a3b8;border:1px solid #1e1e2e">${t.theme}</span>
    </div>
    <div class="absolute bottom-0 left-0 right-0 p-4">
      <h2 class="text-white text-xl font-black">${t.title}</h2>
      <div class="flex items-center gap-3 mt-1 text-xs text-slate-300">
        <span class="star">★ ${t.rating}</span><span>(${t.reviews}개 리뷰)</span>
        <span>⏱ ${t.duration}</span><span>👥 ${t.groupSize}</span>
      </div>
    </div>
  </div>

  <div class="pb-36 pt-4 px-4 space-y-5 fade-in">

    <!-- 가격 카드 -->
    <div class="card p-4 border" style="border-color:#f59e0b44">
      <div class="flex items-center justify-between mb-3">
        <div>
          <p class="text-2xl font-black gold">₩${t.price.toLocaleString()}</p>
          <p class="text-xs text-slate-500">1인 기준 · 투어 안내비용</p>
        </div>
        <div class="text-right">
          <p class="text-sm font-black text-slate-200">예약금 ${t.depositRate}%</p>
          <p class="text-lg font-black" style="color:#f97316">₩${depositAmt.toLocaleString()}</p>
          <p class="text-[10px] text-slate-500">노쇼 방지 선결제</p>
        </div>
      </div>
      <div class="flex gap-1 flex-wrap">
        ${t.tags.map(tg => `<span class="text-xs px-2 py-0.5 rounded-full" style="background:#1e1e2e;color:#94a3b8">${tg}</span>`).join('')}
      </div>
    </div>

    <!-- 가이드 -->
    ${g ? `<a href="/guide/${g.id}" class="card flex items-center gap-3 p-4 press">
  <img src="${g.avatar}" class="w-14 h-14 rounded-full object-cover border-2 flex-shrink-0" style="border-color:#f59e0b">
  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-1 mb-0.5">
      <p class="text-sm font-black text-slate-100">${g.name}</p>
      ${g.verified ? '<span class="material-symbols-outlined text-sm verified" style="font-variation-settings:\'FILL\' 1">verified</span>' : ''}
    </div>
    <p class="text-xs text-slate-400">${g.flag} ${g.city} · ${g.tagline}</p>
    <div class="flex items-center gap-2 mt-1">
      <span class="text-xs star">★ ${g.rating}</span>
      <span class="text-xs text-slate-500">리뷰 ${g.reviews} · 완료 ${g.guides_done}건</span>
    </div>
    <div class="flex gap-1 flex-wrap mt-1">
      ${g.lang.map(l => `<span class="badge text-[10px]" style="background:#3b82f611;color:#60a5fa;border:1px solid #3b82f633">${l}</span>`).join('')}
    </div>
  </div>
  <span class="material-symbols-outlined text-slate-500">chevron_right</span>
</a>` : ''}

    <!-- 포함/불포함 -->
    <div class="grid grid-cols-2 gap-3">
      <div class="card p-3">
        <p class="text-xs font-bold text-green-400 mb-2">✅ 포함</p>
        ${t.includes.map(i => `<p class="text-xs text-slate-300 py-0.5">• ${i}</p>`).join('')}
      </div>
      <div class="card p-3">
        <p class="text-xs font-bold text-red-400 mb-2">❌ 불포함</p>
        ${t.excludes.map(i => `<p class="text-xs text-slate-300 py-0.5">• ${i}</p>`).join('')}
      </div>
    </div>

    <!-- 일정표 -->
    <div>
      <h3 class="font-bold text-sm text-slate-100 mb-3">📋 투어 일정</h3>
      <div class="space-y-2">
        ${t.schedule.map((s, i) => `
        <div class="flex gap-3 items-start">
          <div class="flex flex-col items-center flex-shrink-0">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black" style="background:#f59e0b;color:#0a0a0f">${i + 1}</div>
            ${i < t.schedule.length - 1 ? '<div class="w-0.5 flex-1 mt-1" style="background:#1e1e2e;min-height:20px"></div>' : ''}
          </div>
          <div class="card p-3 flex-1 mb-1">
            <p class="text-xs font-bold gold mb-0.5">${s.time}</p>
            <p class="text-sm text-slate-200">${s.desc}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- 구글 지도 -->
    <div>
      <h3 class="font-bold text-sm text-slate-100 mb-3">📍 지도</h3>
      <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((t as any).mapQuery||t.city)}"
         target="_blank"
         class="card flex items-center gap-3 p-4 press">
        <span class="text-2xl">🗺</span>
        <div class="flex-1">
          <p class="text-sm font-bold text-slate-200">Google Maps에서 보기</p>
          <p class="text-xs text-slate-500">${t.city} 지도 열기</p>
        </div>
        <span class="material-symbols-outlined text-slate-500">open_in_new</span>
      </a>
    </div>

    <!-- 가격표 공개 안내 -->
    ${isMature ? `<div class="card p-4 border" style="border-color:#f9731644">
  <h3 class="font-bold text-sm mb-2" style="color:#f97316">💰 업소별 가격표 공개</h3>
  <p class="text-xs text-slate-400 mb-2">바가지 방지를 위해 방문 예정 업소의 가격을 사전에 공유합니다.</p>
  <p class="text-xs text-slate-300">• 가이드 예약 확정 후 카카오톡으로 상세 가격표 전달</p>
  <p class="text-xs text-slate-300">• 현장 추가 요금 발생 시 가이드가 즉시 중재</p>
  <p class="text-xs text-slate-300">• 불합리한 요금 발생 시 100% 환불 보장</p>
</div>` : ''}

    <!-- 예약 안내 -->
    <div class="card p-4" style="background:#13131a">
      <h3 class="font-bold text-sm text-slate-200 mb-2">📌 예약 안내</h3>
      <div class="space-y-1.5 text-xs text-slate-400">
        <p>• 예약금 ${t.depositRate}% (₩${depositAmt.toLocaleString()}) 결제 후 예약 확정</p>
        <p>• 가이드가 24시간 내 카카오톡 연락 드립니다</p>
        <p>• 투어 24시간 전 취소 시 예약금 100% 환불</p>
        <p>• 투어 당일 취소 시 예약금 환불 불가</p>
      </div>
    </div>

  </div>

  <!-- 하단 CTA -->
  <div class="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 z-30">
    <div class="flex gap-2">
      <button id="cartBtn" onclick="handleCart()" class="flex-1 py-4 rounded-2xl font-black text-sm press" style="background:#f59e0b22;border:2px solid #f59e0b;color:#f59e0b">🛒 장바구니</button>
      <button onclick="openBooking()" class="flex-1 py-4 rounded-2xl font-black text-sm text-white press" style="background:linear-gradient(135deg,#f59e0b,#f97316)">₩${depositAmt.toLocaleString()} 예약하기</button>
    </div>
  </div>

  <!-- 예약 모달 -->
  <div id="bookModal" class="fixed inset-0 z-50 hidden items-center justify-center" style="background:rgba(0,0,0,.85)">
    <div class="card w-full max-w-[380px] mx-4 p-5" style="max-height:90vh;overflow-y:auto">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-black text-slate-100">예약금 결제</h3>
        <button onclick="closeBM()" class="text-slate-400 press"><span class="material-symbols-outlined">close</span></button>
      </div>
      <div class="card p-3 mb-4" style="background:#0a0a0f">
        <p class="text-sm font-bold text-slate-200">${t.title}</p>
        <p class="text-xs text-slate-400">${t.flag} ${t.city} · ${t.duration}</p>
        <div class="flex justify-between mt-2">
          <span class="text-xs text-slate-500">예약금 ${t.depositRate}%</span>
          <span class="font-black gold">₩${depositAmt.toLocaleString()}</span>
        </div>
      </div>
      <div class="space-y-3 mb-4">
        <div><label class="text-xs text-slate-500 mb-1 block">이름</label><input type="text" id="bkName" placeholder="홍길동"></div>
        <div><label class="text-xs text-slate-500 mb-1 block">연락처 (카카오ID 또는 전화)</label><input type="text" id="bkContact" placeholder="카카오ID 또는 전화번호"></div>
        <div><label class="text-xs text-slate-500 mb-1 block">희망 날짜</label><input type="date" id="bkDate"></div>
        <div><label class="text-xs text-slate-500 mb-1 block">인원 수</label>
          <select id="bkPax">
            ${[1,2,3,4,5,6,7,8].map(n => `<option value="${n}">${n}명</option>`).join('')}
          </select>
        </div>
        <div><label class="text-xs text-slate-500 mb-1 block">요청사항 (선택)</label><textarea id="bkNote" placeholder="특별 요청사항" rows="2" style="resize:none;background:#0a0a0f;border:1px solid #1e1e2e;color:#f1f5f9;border-radius:12px;padding:10px 14px;width:100%;font-size:14px"></textarea></div>
      </div>
      <div class="card p-3 mb-4" style="background:#f59e0b11;border-color:#f59e0b44">
        <p class="text-xs gold font-bold mb-1">결제 방법 (시뮬레이션)</p>
        <div class="space-y-1">
          ${['카카오페이','토스','신용카드','계좌이체'].map(m => `<label class="flex items-center gap-2 text-sm text-slate-300 cursor-pointer"><input type="radio" name="payMethod" value="${m}" class="accent-yellow-400"> ${m}</label>`).join('')}
        </div>
      </div>
      <button onclick="confirmBooking()" class="w-full py-4 rounded-2xl font-black text-white press" style="background:linear-gradient(135deg,#f59e0b,#f97316)">
        ₩${depositAmt.toLocaleString()} 예약금 결제하기
      </button>
    </div>
  </div>

  <script>
(function(){
  var tourId='${t.id}';
  var tourTitle='${t.title}';
  var depositAmt=${depositAmt};

  function updateCartBtn(){
    var btn=document.getElementById('cartBtn');
    if(!btn||!window.LG)return;
    var inCart=window.LG.isInCart(tourId);
    btn.textContent=inCart?'✓ 담김':'🛒 장바구니';
    btn.style.background=inCart?'#f59e0b':'#f59e0b22';
    btn.style.color=inCart?'#0a0a0f':'#f59e0b';
  }
  window.handleCart=function(){
    if(!window.LG)return;
    var inCart=window.LG.isInCart(tourId);
    if(inCart){window.LG.removeCart(tourId);}
    else{window.LG.addCart({id:'${t.id}',title:'${t.title}',price:${t.price},flag:'${t.flag}',city:'${t.city}',country:'${t.country}',img:'${t.img}',depositRate:${t.depositRate},guideId:'${t.guideId}'});}
    updateCartBtn();
  };
  window.openBooking=function(){
    var m=document.getElementById('bookModal');if(m){m.classList.remove('hidden');m.classList.add('flex');}
  };
  window.closeBM=function(){
    var m=document.getElementById('bookModal');if(m){m.classList.add('hidden');m.classList.remove('flex');}
  };
  window.confirmBooking=function(){
    var name=document.getElementById('bkName');
    var contact=document.getElementById('bkContact');
    var date=document.getElementById('bkDate');
    var pax=document.getElementById('bkPax');
    if(!name||!name.value.trim()){alert('이름을 입력해주세요');return;}
    if(!contact||!contact.value.trim()){alert('연락처를 입력해주세요');return;}
    if(!date||!date.value){alert('희망 날짜를 선택해주세요');return;}
    var booking={id:'bk_'+Date.now(),tourId:tourId,title:tourTitle,guideName:'${g?.name||'가이드'}',city:'${t.city}',flag:'${t.flag}',name:name.value.trim(),contact:contact.value.trim(),date:date.value,pax:pax?pax.value:1,depositPaid:depositAmt,status:'확인중',bookedAt:new Date().toISOString()};
    window.LG&&window.LG.addBooking(booking);
    window.closeBM();
    window.LG&&window.LG.showToast('🎉 예약 완료! 가이드가 곧 연락드립니다');
    setTimeout(function(){location.href='/my?tab=bookings';},1500);
  };
  window.shareTour=function(){
    if(navigator.share)navigator.share({title:'${t.title}',url:location.href});
    else{navigator.clipboard&&navigator.clipboard.writeText(location.href);alert('링크 복사됨!');}
  };
  updateCartBtn();
})();
  </script>
  `
  return baseLayout(t.title, content, 'tours')
}

import { baseLayout } from '../layout'

export const myPage = (defaultTab = 'bookings') => {
  const content = `
  <style>
    .tab-btn.active{background:#f59e0b!important;color:#0a0a0f!important;border-color:#f59e0b!important}
    .bk-status-확인중{background:#f59e0b22;color:#f59e0b;border:1px solid #f59e0b44}
    .bk-status-확정{background:#22c55e22;color:#22c55e;border:1px solid #22c55e44}
    .bk-status-완료{background:#3b82f622;color:#60a5fa;border:1px solid #3b82f644}
    .bk-status-취소{background:#ef444422;color:#ef4444;border:1px solid #ef444444}
  </style>

  <!-- 헤더 -->
  <header class="sticky top-0 z-40 px-4 py-3 border-b" style="background:#0a0a0fee;backdrop-filter:blur(16px);border-color:#1e1e2e">
    <div class="flex items-center gap-3">
      <h1 class="flex-1 font-bold text-base text-slate-100">🧭 마이 여행</h1>
      <button onclick="switchTab('data')" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#13131a;border:1px solid #1e1e2e">
        <span class="material-symbols-outlined text-slate-300">settings</span>
      </button>
    </div>
  </header>

  <div class="px-4 pt-4 pb-28 space-y-5">

    <!-- 프로필 카드 -->
    <div class="card p-4 border" style="border-color:#f59e0b33">
      <div class="flex items-center gap-4">
        <div class="relative">
          <div class="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style="background:linear-gradient(135deg,#f59e0b44,#f97316aa)">✈️</div>
          <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2" style="border-color:#0a0a0f"></div>
        </div>
        <div class="flex-1">
          <h2 class="text-slate-100 font-black text-lg" id="profileName">내여행</h2>
          <p class="text-sm text-slate-500" id="profileSub">아시아 여행 탐험가</p>
          <div class="flex items-center gap-1 mt-1">
            <span class="text-lg" id="profileBadgeIcon">✨</span>
            <span class="text-xs font-bold gold" id="profileBadge">여행 시작</span>
          </div>
        </div>
        <button onclick="editProfile()" class="text-slate-300 text-xs font-semibold px-3 py-2 rounded-xl border press" style="background:#13131a;border-color:#1e1e2e">수정</button>
      </div>
    </div>

    <!-- 통계 -->
    <div class="grid grid-cols-3 gap-3">
      <div class="card p-3 text-center">
        <p class="text-slate-100 font-black text-xl" id="statBookings">0</p>
        <p class="text-xs text-slate-500">예약 건수</p>
      </div>
      <div class="card p-3 text-center">
        <p class="font-black text-xl gold" id="statFavs">0</p>
        <p class="text-xs text-slate-500">즐겨찾기</p>
      </div>
      <div class="card p-3 text-center">
        <p class="text-slate-100 font-black text-xl" id="statDeposit">0</p>
        <p class="text-xs text-slate-500">투어 계획</p>
      </div>
    </div>

    <!-- 탭 -->
    <div class="flex gap-2 overflow-x-auto ns pb-1">
      ${[
        {key:'bookings', label:'📋 예약 내역'},
        {key:'favs',     label:'❤️ 즐겨찾기'},
        {key:'trips',    label:'📅 내 일정'},
        {key:'data',     label:'💾 데이터'},
      ].map((t, i) => `<button onclick="switchTab('${t.key}')" id="tab_${t.key}"
  class="tab-btn flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-bold press"
  style="background:#13131a;border-color:#1e1e2e;color:#94a3b8">${t.label}</button>`).join('')}
    </div>

    <!-- 예약 내역 탭 -->
    <div id="panel_bookings" class="hidden space-y-3"></div>

    <!-- 즐겨찾기 탭 -->
    <div id="panel_favs" class="hidden space-y-3"></div>

    <!-- 내 일정 탭 -->
    <div id="panel_trips" class="hidden space-y-3"></div>

    <!-- 데이터 관리 탭 -->
    <div id="panel_data" class="hidden space-y-3">
      <!-- 내보내기 -->
      <div class="card p-4">
        <h4 class="font-bold text-sm text-slate-200 mb-3">📤 데이터 내보내기</h4>
        <div class="space-y-2">
          <button onclick="window.LG&&window.LG.exportData()" class="w-full flex items-center gap-3 p-3 rounded-xl press" style="background:#f59e0b11;border:1px solid #f59e0b33">
            <span class="text-xl">📦</span>
            <div class="flex-1 text-left">
              <p class="text-sm font-bold text-slate-200">JSON 백업</p>
              <p class="text-xs text-slate-500">장바구니·즐겨찾기·예약 전체 백업</p>
            </div>
            <span class="material-symbols-outlined text-slate-500">download</span>
          </button>
          <button onclick="exportBookingsCSV()" class="w-full flex items-center gap-3 p-3 rounded-xl press" style="background:#22c55e11;border:1px solid #22c55e33">
            <span class="text-xl">📊</span>
            <div class="flex-1 text-left">
              <p class="text-sm font-bold text-slate-200">예약 내역 CSV</p>
              <p class="text-xs text-slate-500">예약 목록 엑셀 파일 다운로드</p>
            </div>
            <span class="material-symbols-outlined text-slate-500">download</span>
          </button>
          <button onclick="exportTripText()" class="w-full flex items-center gap-3 p-3 rounded-xl press" style="background:#a855f711;border:1px solid #a855f733">
            <span class="text-xl">📝</span>
            <div class="flex-1 text-left">
              <p class="text-sm font-bold text-slate-200">일정표 텍스트</p>
              <p class="text-xs text-slate-500">저장된 일정을 텍스트로 다운로드</p>
            </div>
            <span class="material-symbols-outlined text-slate-500">download</span>
          </button>
        </div>
      </div>

      <!-- 가져오기 -->
      <div class="card p-4">
        <h4 class="font-bold text-sm text-slate-200 mb-3">📥 데이터 가져오기</h4>
        <label class="w-full flex items-center gap-3 p-3 rounded-xl press cursor-pointer" style="background:#f59e0b11;border:1px solid #f59e0b33">
          <span class="text-xl">📂</span>
          <div class="flex-1 text-left">
            <p class="text-sm font-bold text-slate-200">JSON 파일 불러오기</p>
            <p class="text-xs text-slate-500">이전에 백업한 JSON 파일 복원</p>
          </div>
          <span class="material-symbols-outlined text-slate-500">upload</span>
          <input type="file" accept=".json" class="hidden" onchange="importFile(this)">
        </label>
      </div>

      <!-- 저장 공간 -->
      <div class="card p-4">
        <h4 class="font-bold text-sm text-slate-200 mb-3">💿 저장 공간</h4>
        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-400">예약 내역</span>
            <span class="gold font-bold" id="storeBookCount">0건</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-400">즐겨찾기</span>
            <span class="gold font-bold" id="storeFavCount">0개</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-400">장바구니</span>
            <span class="gold font-bold" id="storeCartCount">0개</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-400">여행 일정</span>
            <span class="gold font-bold" id="storeTripCount">0개</span>
          </div>
          <hr style="border-color:#1e1e2e">
          <button onclick="clearAllData()" class="w-full py-2 rounded-xl text-xs font-bold text-red-400 press" style="background:#ef444411;border:1px solid #ef444433">
            🗑 전체 데이터 초기화
          </button>
        </div>
      </div>

      <!-- PWA 설치 -->
      <div class="card p-4">
        <h4 class="font-bold text-sm text-slate-200 mb-3">📱 앱 설치</h4>
        <button onclick="installPWA()" class="w-full flex items-center gap-3 p-3 rounded-xl press" style="background:#f59e0b22;border:1px solid #f59e0b44">
          <span class="text-xl">📲</span>
          <div class="flex-1 text-left">
            <p class="text-sm font-bold gold">홈 화면에 추가</p>
            <p class="text-xs text-slate-500">오프라인에서도 사용 가능한 PWA</p>
          </div>
        </button>
      </div>

      <!-- 가이드 포털 링크 -->
      <div class="card p-4 border" style="border-color:#3b82f633">
        <h4 class="font-bold text-sm text-slate-200 mb-3">🌐 가이드 포털</h4>
        <a href="/guides" class="w-full flex items-center gap-3 p-3 rounded-xl press block" style="background:#3b82f611;border:1px solid #3b82f633">
          <span class="text-xl">🗺</span>
          <div class="flex-1">
            <p class="text-sm font-bold text-slate-200">현지 가이드 찾기</p>
            <p class="text-xs text-slate-500">교민·가이드 매칭 플랫폼</p>
          </div>
          <span class="material-symbols-outlined text-slate-500">chevron_right</span>
        </a>
      </div>
    </div>

  </div>

  <!-- 프로필 수정 모달 -->
  <div id="profileModal" class="fixed inset-0 z-50 hidden items-center justify-center" style="background:rgba(0,0,0,.7)">
    <div class="card w-full max-w-[390px] mx-4 p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-slate-100">프로필 수정</h3>
        <button onclick="closeProfileModal()" class="text-slate-400 press"><span class="material-symbols-outlined">close</span></button>
      </div>
      <div class="space-y-3">
        <div>
          <label class="text-xs text-slate-500 mb-1 block">이름</label>
          <input type="text" id="editName" placeholder="내여행 닉네임">
        </div>
        <div>
          <label class="text-xs text-slate-500 mb-1 block">소개</label>
          <input type="text" id="editSub" placeholder="아시아 여행 탐험가">
        </div>
        <button onclick="saveProfile()" class="w-full py-3 rounded-xl font-bold press" style="background:#f59e0b;color:#0a0a0f">저장</button>
      </div>
    </div>
  </div>

  <!-- 예약 취소 확인 모달 -->
  <div id="cancelModal" class="fixed inset-0 z-50 hidden items-center justify-center" style="background:rgba(0,0,0,.8)">
    <div class="card w-full max-w-[360px] mx-4 p-5 border" style="border-color:#ef444444">
      <p class="text-3xl text-center mb-3">⚠️</p>
      <h3 class="font-black text-center text-slate-100 mb-2">예약을 취소하시겠습니까?</h3>
      <p class="text-xs text-center text-slate-400 mb-4">투어 24시간 전 취소 시 예약금 100% 환불<br>당일 취소 시 예약금 환불 불가</p>
      <input type="hidden" id="cancelId">
      <div class="flex gap-2">
        <button onclick="closeCancelModal()" class="flex-1 py-3 rounded-xl font-bold text-slate-400 press" style="background:#1e1e2e">돌아가기</button>
        <button onclick="confirmCancel()" class="flex-1 py-3 rounded-xl font-bold text-white press" style="background:#ef4444">취소 확인</button>
      </div>
    </div>
  </div>

  <script>
(function(){
  var curTab='${defaultTab}';

  /* ── 통계 업데이트 ── */
  function updateStats(){
    var bookings=window.LG?window.LG.getBookings():[];
    var favs=window.LG?window.LG.getFavs():[];
    var cart=window.LG?window.LG.getCart():[];
    var trips=[];try{trips=JSON.parse(localStorage.getItem('tm_trips')||'[]');}catch(e){}

    var sb=document.getElementById('statBookings');var sf=document.getElementById('statFavs');var sd=document.getElementById('statDeposit');
    if(sb)sb.textContent=bookings.length;if(sf)sf.textContent=favs.length;if(sd)sd.textContent=trips.length;

    var sbc=document.getElementById('storeBookCount');var sfc=document.getElementById('storeFavCount');
    var scc=document.getElementById('storeCartCount');var stc=document.getElementById('storeTripCount');
    if(sbc)sbc.textContent=bookings.length+'건';if(sfc)sfc.textContent=favs.length+'개';
    if(scc)scc.textContent=cart.length+'개';if(stc)stc.textContent=trips.length+'개';

    var badge=document.getElementById('profileBadge');var bi=document.getElementById('profileBadgeIcon');
    var n=bookings.length;
    if(badge){badge.textContent=n>=20?'아시아 마스터':n>=10?'베테랑 내여행러':n>=5?'내여행 중급자':n>=1?'내여행 초보자':'내여행 시작';}
    if(bi){bi.textContent=n>=20?'🌏':n>=10?'✈️':n>=5?'🗺':n>=1?'🚀':'✨';}
  }

  /* ── 예약 내역 렌더링 ── */
  function renderBookings(){
    var el=document.getElementById('panel_bookings');if(!el)return;
    var bookings=window.LG?window.LG.getBookings():[];
    if(!bookings||bookings.length===0){
      el.innerHTML='<div class="card p-8 text-center"><p class="text-5xl mb-3">📋</p>'
        +'<p class="text-slate-400 text-sm mb-4">예약 내역이 없습니다</p>'
        +'<a href="/tours" class="inline-block px-5 py-2.5 rounded-xl text-sm font-bold press" style="background:#f59e0b;color:#0a0a0f">투어 예약하기</a></div>';
      return;
    }
    el.innerHTML=bookings.map(function(b){
      var statusClass='bk-status-'+(b.status||'확인중');
      var toursText=b.tours?b.tours.map(function(t){return t.flag+' '+t.title;}).join(', '):(b.title||'투어');
      return '<div class="card p-4 space-y-3">'
        +'<div class="flex items-start justify-between">'
        +'<div class="flex-1 min-w-0">'
        +'<p class="text-sm font-black text-slate-100 truncate">'+toursText+'</p>'
        +'<p class="text-xs text-slate-500 mt-0.5">📅 '+b.date+' · 👥 '+(b.pax||1)+'명</p>'
        +'<p class="text-xs text-slate-500">📞 '+b.contact+'</p>'
        +'</div>'
        +'<span class="badge flex-shrink-0 ml-2 '+statusClass+'">'+( b.status||'확인중')+'</span>'
        +'</div>'
        +'<div class="flex items-center justify-between pt-2 border-t" style="border-color:#1e1e2e">'
        +'<div><p class="text-xs text-slate-500">납입 예약금</p>'
        +'<p class="font-black text-sm" style="color:#f97316">₩'+(b.depositPaid||0).toLocaleString()+'</p></div>'
        +'<div class="flex gap-2">'
        +(b.status!=='취소'&&b.status!=='완료'?'<button data-bkid="'+b.id+'" onclick="window.openCancelModal(this.dataset.bkid)" class="text-xs px-3 py-1.5 rounded-xl font-bold press" style="background:#ef444411;border:1px solid #ef444433;color:#ef4444">취소</button>':'')
        +'<p class="text-[10px] text-slate-600">'+new Date(b.bookedAt).toLocaleDateString()+'</p>'
        +'</div>'
        +'</div>'
        +'</div>';
    }).join('');
  }

  /* ── 즐겨찾기 렌더링 ── */
  function renderFavs(){
    var el=document.getElementById('panel_favs');if(!el)return;
    var favs=window.LG?window.LG.getFavs():[];
    if(!favs||favs.length===0){
      el.innerHTML='<div class="card p-8 text-center"><p class="text-4xl mb-3">❤️</p>'
        +'<p class="text-slate-400 text-sm mb-3">즐겨찾기한 투어·가이드가 없습니다</p>'
        +'<a href="/tours" class="inline-block px-4 py-2 rounded-xl text-sm font-bold press" style="background:#f59e0b;color:#0a0a0f">투어 탐색</a></div>';
      return;
    }
    el.innerHTML=favs.map(function(f){
      return '<div class="card flex items-center gap-3 p-3">'
        +'<div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style="background:#f59e0b22">'+(f.flag||'📍')+'</div>'
        +'<div class="flex-1 min-w-0">'
        +'<p class="text-sm font-bold text-slate-200 truncate">'+(f.name||f.title||f.city||'')+'</p>'
        +'<p class="text-xs text-slate-500">'+(f.country||'')+(f.city?' · '+f.city:'')+'</p>'
        +(f.savedAt?'<p class="text-xs text-slate-600">'+new Date(f.savedAt).toLocaleDateString()+'</p>':'')
        +'</div>'
        +'<button data-fid="'+f.id+'" onclick="window.removeFav(this.dataset.fid)" class="text-slate-500 press"><span class="material-symbols-outlined text-base">delete</span></button>'
        +'</div>';
    }).join('');
  }

  /* ── 일정 렌더링 ── */
  function renderTrips(){
    var el=document.getElementById('panel_trips');if(!el)return;
    var trips=[];try{trips=JSON.parse(localStorage.getItem('tm_trips')||'[]');}catch(e){}
    if(!trips||trips.length===0){
      el.innerHTML='<div class="card p-8 text-center"><p class="text-4xl mb-3">📅</p>'
        +'<p class="text-slate-400 text-sm mb-3">저장된 여행 계획이 없습니다</p>'
        +'<a href="/planner" class="inline-block px-4 py-2 rounded-xl text-sm font-bold press" style="background:#f59e0b;color:#0a0a0f">일정 만들기</a></div>';
      return;
    }
    el.innerHTML=trips.map(function(t){
      var days=t.days?t.days.length:0;
      var totalItems=t.days?t.days.reduce(function(s,d){return s+(d.schedules?d.schedules.length:0);},0):0;
      return '<a href="/planner?id='+t.id+'" class="card flex items-center gap-3 p-3 press block">'
        +'<div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style="background:#f59e0b22">'+(t.flag||'✈️')+'</div>'
        +'<div class="flex-1 min-w-0">'
        +'<p class="text-sm font-bold text-slate-200 truncate">'+(t.title||'여행 계획')+'</p>'
        +'<p class="text-xs text-slate-500">'+(t.country||'')+(t.city?' · '+t.city:'')+' · '+days+'일 · '+totalItems+'개 항목</p>'
        +(t.startDate?'<p class="text-xs text-slate-600">'+t.startDate+(t.endDate?' ~ '+t.endDate:'')+'</p>':'')
        +'</div>'
        +'<span class="material-symbols-outlined text-slate-500">chevron_right</span>'
        +'</a>';
    }).join('');
  }

  /* ── 탭 전환 ── */
  window.switchTab=function(key){
    curTab=key;
    ['bookings','favs','trips','data'].forEach(function(k){
      var btn=document.getElementById('tab_'+k);
      var panel=document.getElementById('panel_'+k);
      if(k===key){
        if(btn){btn.classList.add('active');btn.style.background='#f59e0b';btn.style.color='#0a0a0f';btn.style.borderColor='#f59e0b';}
        if(panel)panel.classList.remove('hidden');
      }else{
        if(btn){btn.classList.remove('active');btn.style.background='#13131a';btn.style.color='#94a3b8';btn.style.borderColor='#1e1e2e';}
        if(panel)panel.classList.add('hidden');
      }
    });
    if(key==='bookings')renderBookings();
    else if(key==='favs')renderFavs();
    else if(key==='trips')renderTrips();
  };

  /* ── 즐겨찾기 삭제 ── */
  window.removeFav=function(id){
    if(!window.LG)return;
    var favs=window.LG.getFavs().filter(function(f){return f.id!==id;});
    localStorage.setItem('lg_favs',JSON.stringify(favs));
    renderFavs();updateStats();
  };

  /* ── 예약 취소 ── */
  window.openCancelModal=function(id){
    var m=document.getElementById('cancelModal');
    var ci=document.getElementById('cancelId');
    if(ci)ci.value=id;
    if(m){m.classList.remove('hidden');m.classList.add('flex');}
  };
  window.closeCancelModal=function(){
    var m=document.getElementById('cancelModal');
    if(m){m.classList.add('hidden');m.classList.remove('flex');}
  };
  window.confirmCancel=function(){
    var ci=document.getElementById('cancelId');
    if(!ci||!ci.value)return;
    var bookings=window.LG?window.LG.getBookings():[];
    bookings=bookings.map(function(b){return b.id===ci.value?Object.assign({},b,{status:'취소'}):b;});
    localStorage.setItem('lg_bookings',JSON.stringify(bookings));
    window.closeCancelModal();
    renderBookings();updateStats();
    window.LG&&window.LG.showToast('예약이 취소되었습니다','#ef4444');
  };

  /* ── 데이터 내보내기 ── */
  window.exportBookingsCSV=function(){
    var bookings=window.LG?window.LG.getBookings():[];
    if(!bookings||bookings.length===0){alert('예약 내역이 없습니다.');return;}
    var headers=['예약ID','날짜','상태','예약자','연락처','인원','투어','예약금'];
    var rows=bookings.map(function(b){
      var tours=b.tours?b.tours.map(function(t){return t.title;}).join(' / '):(b.title||'');
      return [b.id,b.date,b.status,b.name,b.contact,b.pax||1,tours,(b.depositPaid||0)];
    });
    var nl=String.fromCharCode(10);
    var csv=[headers.join(',')].concat(rows.map(function(r){return r.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(',');})).join(nl);
    var blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
    var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='bookings-'+new Date().toISOString().slice(0,10)+'.csv';a.click();
  };
  window.exportTripText=function(){
    var trips=[];try{trips=JSON.parse(localStorage.getItem('tm_trips')||'[]');}catch(e){}
    if(!trips||trips.length===0){alert('저장된 여행 일정이 없습니다.');return;}
    var nl=String.fromCharCode(10);
    var lines=['===== 가이드 여행매니저 일정표 =====',nl];
    trips.forEach(function(t){
      lines.push('['+t.title+']');
      if(t.startDate)lines.push('기간: '+t.startDate+' ~ '+t.endDate);
      if(t.country)lines.push('목적지: '+t.country+(t.city?' '+t.city:''));
      lines.push('');
      if(t.days)t.days.forEach(function(d){
        lines.push('  ['+d.label+']');
        if(d.schedules&&d.schedules.length){
          d.schedules.forEach(function(s){lines.push('    '+(s.time||'--:--')+' '+s.name+(s.memo?' ('+s.memo+')':'')+(s.cost?' - '+(s.cost).toLocaleString()+'원':''));});
        }else{lines.push('    (일정 없음)');}
        lines.push('');
      });
      lines.push('');
    });
    var blob=new Blob([lines.join(nl)],{type:'text/plain;charset=utf-8'});
    var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='travel-plans-'+new Date().toISOString().slice(0,10)+'.txt';a.click();
  };
  window.importFile=function(inp){
    var file=inp.files[0];if(!file)return;
    var reader=new FileReader();
    reader.onload=function(e){
      try{
        var data=JSON.parse(e.target.result);
        if(data.cart)localStorage.setItem('lg_cart',JSON.stringify(data.cart));
        if(data.favs)localStorage.setItem('lg_favs',JSON.stringify(data.favs));
        if(data.bookings)localStorage.setItem('lg_bookings',JSON.stringify(data.bookings));
        window.LG&&window.LG.showToast('데이터를 불러왔습니다! ✅');
        updateStats();renderBookings();
      }catch(err){alert('잘못된 파일 형식입니다.');}
    };
    reader.readAsText(file);
  };

  /* ── 전체 초기화 ── */
  window.clearAllData=function(){
    if(!confirm('모든 데이터를 초기화하시겠습니까?'+String.fromCharCode(10)+'(예약, 즐겨찾기, 장바구니, 일정)'))return;
    ['lg_cart','lg_favs','lg_bookings','tm_trips','tm_recent'].forEach(function(k){localStorage.removeItem(k);});
    updateStats();renderBookings();renderFavs();renderTrips();
    window.LG&&window.LG.showToast('초기화 완료','#ef4444');
  };

  /* ── PWA 설치 ── */
  window.installPWA=function(){
    if(window._deferredPrompt){window._deferredPrompt.prompt();window._deferredPrompt=null;}
    else{alert('iOS: 하단 공유 버튼 → '+String.fromCharCode(10)+'홈 화면에 추가'+String.fromCharCode(10)+'Android: 브라우저 메뉴 → 홈 화면에 추가');}
  };

  /* ── 프로필 ── */
  window.editProfile=function(){
    var pn=document.getElementById('profileName');var ps=document.getElementById('profileSub');
    var en=document.getElementById('editName');var es=document.getElementById('editSub');
    if(en&&pn)en.value=pn.textContent||'';if(es&&ps)es.value=ps.textContent||'';
    var m=document.getElementById('profileModal');if(m){m.classList.remove('hidden');m.classList.add('flex');}
  };
  window.closeProfileModal=function(){
    var m=document.getElementById('profileModal');if(m){m.classList.add('hidden');m.classList.remove('flex');}
  };
  window.saveProfile=function(){
    var en=document.getElementById('editName');var es=document.getElementById('editSub');
    var pn=document.getElementById('profileName');var ps=document.getElementById('profileSub');
    if(en&&pn&&en.value.trim())pn.textContent=en.value.trim();
    if(es&&ps&&es.value.trim())ps.textContent=es.value.trim();
    localStorage.setItem('lg_profile',JSON.stringify({name:en?en.value.trim():'',sub:es?es.value.trim():''}));
    window.closeProfileModal();
    window.LG&&window.LG.showToast('프로필이 저장되었습니다 ✅');
  };

  /* ── 프로필 불러오기 ── */
  var prof=null;try{prof=JSON.parse(localStorage.getItem('lg_profile')||'null');}catch(e){}
  if(prof){
    var pn=document.getElementById('profileName');var ps=document.getElementById('profileSub');
    if(pn&&prof.name)pn.textContent=prof.name;if(ps&&prof.sub)ps.textContent=prof.sub;
  }

  /* ── 초기화 ── */
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){updateStats();switchTab(curTab);});
  }else{
    updateStats();switchTab(curTab);
  }
})();
  </script>
  `

  return baseLayout('마이 여행', content, 'my')
}

import { baseLayout } from '../layout'

export const myPage = () => {
  const content = `
  <style>
    .tab-btn{transition:all .15s}
    .tab-btn.active{background:#0ea5e9;color:#fff;border-color:#0ea5e9}
    .section-card{background:#0f172a;border:1px solid #1e293b;border-radius:16px;overflow:hidden}
  </style>

  <!-- 헤더 -->
  <header class="sticky top-0 z-40 px-4 py-3 border-b" style="background:#030712ee;backdrop-filter:blur(16px);border-color:#1e293b">
    <div class="flex items-center gap-3">
      <h1 class="flex-1 font-bold text-base text-slate-100">마이 여행</h1>
      <button onclick="openSettings()" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#0f172a;border:1px solid #1e293b">
        <span class="material-symbols-outlined text-slate-300">settings</span>
      </button>
    </div>
  </header>

  <div class="px-4 pt-4 pb-28 space-y-5">

    <!-- 프로필 카드 -->
    <div class="section-card p-4">
      <div class="flex items-center gap-4">
        <div class="relative">
          <div class="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style="background:linear-gradient(135deg,#0ea5e9,#6366f1)">✈️</div>
          <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2" style="border-color:#030712"></div>
        </div>
        <div class="flex-1">
          <h2 class="text-slate-100 font-black text-lg" id="profileName">여행자</h2>
          <p class="text-sm text-slate-500" id="profileSub">아시아 여행 탐험가</p>
          <div class="flex items-center gap-1 mt-1">
            <span class="material-symbols-outlined text-sm text-sky-400" style="font-variation-settings:'FILL' 1">workspace_premium</span>
            <span class="text-xs font-bold text-sky-400" id="profileBadge">여행 시작</span>
          </div>
        </div>
        <button onclick="editProfile()" class="text-slate-300 text-xs font-semibold px-3 py-2 rounded-xl border press" style="background:#030712;border-color:#1e293b">수정</button>
      </div>
    </div>

    <!-- 통계 -->
    <div class="grid grid-cols-3 gap-3">
      <div class="section-card p-3 text-center">
        <p class="text-slate-100 font-black text-xl" id="statTrips">0</p>
        <p class="text-xs text-slate-500">저장 여행</p>
      </div>
      <div class="section-card p-3 text-center">
        <p class="font-black text-xl sky" id="statFavs">0</p>
        <p class="text-xs text-slate-500">즐겨찾기</p>
      </div>
      <div class="section-card p-3 text-center">
        <p class="text-slate-100 font-black text-xl" id="statRecent">0</p>
        <p class="text-xs text-slate-500">최근 조회</p>
      </div>
    </div>

    <!-- 탭 -->
    <div class="flex gap-2 overflow-x-auto ns pb-1">
      ${[
        {key:'trips',  label:'📅 내 일정'},
        {key:'favs',   label:'❤️ 즐겨찾기'},
        {key:'recent', label:'🕐 최근 조회'},
        {key:'data',   label:'💾 데이터 관리'},
      ].map((t, i) => `<button onclick="switchTab('${t.key}')" id="tab_${t.key}" class="tab-btn flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-bold press${i===0?' active':''}" style="background:#0f172a;border-color:#1e293b;color:#94a3b8">${t.label}</button>`).join('')}
    </div>

    <!-- 내 여행 일정 탭 -->
    <div id="panel_trips" class="space-y-3"></div>

    <!-- 즐겨찾기 탭 -->
    <div id="panel_favs" class="hidden space-y-3"></div>

    <!-- 최근 조회 탭 -->
    <div id="panel_recent" class="hidden space-y-3"></div>

    <!-- 데이터 관리 탭 -->
    <div id="panel_data" class="hidden space-y-3">
      <!-- 내보내기 -->
      <div class="section-card p-4">
        <h4 class="font-bold text-sm text-slate-200 mb-3">📤 데이터 내보내기</h4>
        <div class="space-y-2">
          <button onclick="window.TM&&window.TM.exportJSON()" class="w-full flex items-center gap-3 p-3 rounded-xl press" style="background:#0ea5e911;border:1px solid #0ea5e933">
            <span class="text-xl">📦</span>
            <div class="flex-1 text-left">
              <p class="text-sm font-bold text-slate-200">JSON 백업</p>
              <p class="text-xs text-slate-500">전체 여행 데이터 백업 파일</p>
            </div>
            <span class="material-symbols-outlined text-slate-500">download</span>
          </button>
          <button onclick="window.TM&&window.TM.exportCSV()" class="w-full flex items-center gap-3 p-3 rounded-xl press" style="background:#22c55e11;border:1px solid #22c55e33">
            <span class="text-xl">📊</span>
            <div class="flex-1 text-left">
              <p class="text-sm font-bold text-slate-200">CSV 내보내기</p>
              <p class="text-xs text-slate-500">즐겨찾기 목록 (엑셀 호환)</p>
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
      <div class="section-card p-4">
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
      <div class="section-card p-4">
        <h4 class="font-bold text-sm text-slate-200 mb-3">💿 저장 공간</h4>
        <div id="storageInfo" class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-400">즐겨찾기</span>
            <span class="sky font-bold" id="storeFavCount">0개</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-400">여행 일정</span>
            <span class="sky font-bold" id="storeTripCount">0개</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-400">최근 조회</span>
            <span class="sky font-bold" id="storeRecentCount">0개</span>
          </div>
          <hr style="border-color:#1e293b">
          <button onclick="clearAllData()" class="w-full py-2 rounded-xl text-xs font-bold text-red-400 press" style="background:#ef444411;border:1px solid #ef444433">
            🗑 전체 데이터 초기화
          </button>
        </div>
      </div>

      <!-- PWA 설치 -->
      <div class="section-card p-4">
        <h4 class="font-bold text-sm text-slate-200 mb-3">📱 앱 설치</h4>
        <button onclick="installPWA()" id="installBtn" class="w-full flex items-center gap-3 p-3 rounded-xl press" style="background:#0ea5e922;border:1px solid #0ea5e944">
          <span class="text-xl">📲</span>
          <div class="flex-1 text-left">
            <p class="text-sm font-bold sky">홈 화면에 추가</p>
            <p class="text-xs text-slate-500">오프라인에서도 사용 가능</p>
          </div>
        </button>
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
          <input type="text" id="editName" placeholder="여행자 이름">
        </div>
        <div>
          <label class="text-xs text-slate-500 mb-1 block">소개</label>
          <input type="text" id="editSub" placeholder="아시아 여행 탐험가">
        </div>
        <button onclick="saveProfile()" class="w-full py-3 rounded-xl font-bold text-white press" style="background:#0ea5e9">저장</button>
      </div>
    </div>
  </div>

  <script>
(function(){
  var curTab='trips';

  function updateStats(){
    if(!window.TM)return;
    var trips=window.TM.getTrips();
    var favs=window.TM.getFavs();
    var recent=window.TM.getRecent();
    var st=document.getElementById('statTrips');var sf=document.getElementById('statFavs');var sr=document.getElementById('statRecent');
    if(st)st.textContent=trips.length;if(sf)sf.textContent=favs.length;if(sr)sr.textContent=recent.length;
    var sfc=document.getElementById('storeFavCount');var stc=document.getElementById('storeTripCount');var src=document.getElementById('storeRecentCount');
    if(sfc)sfc.textContent=favs.length+'개';if(stc)stc.textContent=trips.length+'개';if(src)src.textContent=recent.length+'개';
    var badge=document.getElementById('profileBadge');
    if(badge){
      var n=trips.length;
      badge.textContent=n>=20?'🌏 아시아 마스터':n>=10?'✈️ 베테랑 여행자':n>=5?'🗺 여행 중급자':n>=1?'🚀 여행 초보자':'✨ 여행 시작';
    }
  }

  function renderTrips(){
    var el=document.getElementById('panel_trips');
    if(!el)return;
    var trips=window.TM?window.TM.getTrips():[];
    if(!trips||trips.length===0){
      el.innerHTML='<div class="section-card p-8 text-center"><p class="text-4xl mb-3">✈️</p><p class="text-slate-400 text-sm mb-3">저장된 여행 계획이 없습니다</p><a href="/planner" class="inline-block px-4 py-2 rounded-xl text-sm font-bold text-white press" style="background:#0ea5e9">첫 여행 계획 만들기</a></div>';
      return;
    }
    el.innerHTML=trips.map(function(t){
      var days=t.days?t.days.length:0;
      var totalCost=t.days?t.days.reduce(function(s,d){return s+(d.schedules?d.schedules.reduce(function(ss,x){return ss+(x.cost||0);},0):0);},0):0;
      var totalItems=t.days?t.days.reduce(function(s,d){return s+(d.schedules?d.schedules.length:0);},0):0;
      return '<a href="/planner?id='+t.id+'" class="section-card flex items-center gap-3 p-3 press block">'
        +'<div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style="background:#0ea5e922">'+(t.flag||'✈️')+'</div>'
        +'<div class="flex-1 min-w-0">'
        +'<p class="text-sm font-bold text-slate-200 truncate">'+(t.title||'여행 계획')+'</p>'
        +'<p class="text-xs text-slate-500">'+(t.country||'')+(t.city?' · '+t.city:'')+' · '+days+'일 일정 · '+totalItems+'개 항목</p>'
        +(t.startDate?'<p class="text-xs text-slate-600">'+t.startDate+(t.endDate?' ~ '+t.endDate:'')+'</p>':'')
        +(totalCost>0?'<p class="text-xs sky">💰 '+totalCost.toLocaleString()+'원</p>':'')
        +'</div>'
        +'<span class="material-symbols-outlined text-slate-500">chevron_right</span>'
        +'</a>';
    }).join('');
  }

  function renderFavs(){
    var el=document.getElementById('panel_favs');
    if(!el)return;
    var favs=window.TM?window.TM.getFavs():[];
    if(!favs||favs.length===0){
      el.innerHTML='<div class="section-card p-8 text-center"><p class="text-4xl mb-3">❤️</p><p class="text-slate-400 text-sm mb-3">즐겨찾기한 여행지가 없습니다</p><a href="/destinations" class="inline-block px-4 py-2 rounded-xl text-sm font-bold text-white press" style="background:#0ea5e9">여행지 탐색하기</a></div>';
      return;
    }
    el.innerHTML=favs.map(function(f){
      var catIcon={city:'🏙',food:'🍜',nature:'🏞',beach:'🏖',history:'🏛',shop:'🛍'};
      var icon=catIcon[f.category]||'📍';
      return '<div class="section-card flex items-center gap-3 p-3">'
        +'<div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style="background:#f43f5e11">'+icon+'</div>'
        +'<div class="flex-1 min-w-0">'
        +'<p class="text-sm font-bold text-slate-200">'+(f.name||f.city||'')+'</p>'
        +'<p class="text-xs text-slate-500">'+(f.flag||'')+(f.country?' '+f.country:'')+(f.city?' · '+f.city:'')+'</p>'
        +(f.savedAt?'<p class="text-xs text-slate-600">'+new Date(f.savedAt).toLocaleDateString()+'</p>':'')
        +'</div>'
        +'<div class="flex gap-2">'
        +'<a href="/destination/'+f.id+'" class="text-xs px-2 py-1 rounded-lg sky press" style="background:#0ea5e922">보기</a>'
        +'<button onclick="removeFav(\''+f.id+'\')" class="text-slate-500 press"><span class="material-symbols-outlined text-base">delete</span></button>'
        +'</div>'
        +'</div>';
    }).join('');
  }

  function renderRecent(){
    var el=document.getElementById('panel_recent');
    if(!el)return;
    var recent=window.TM?window.TM.getRecent():[];
    if(!recent||recent.length===0){
      el.innerHTML='<div class="section-card p-8 text-center"><p class="text-4xl mb-3">🕐</p><p class="text-slate-400 text-sm">최근 조회한 여행지가 없습니다</p></div>';
      return;
    }
    el.innerHTML=recent.map(function(r){
      var ago='';
      if(r.viewedAt){var d=new Date(r.viewedAt),n=new Date(),diff=Math.floor((n-d)/60000);ago=diff<60?diff+'분 전':diff<1440?Math.floor(diff/60)+'시간 전':Math.floor(diff/1440)+'일 전';}
      return '<div class="section-card flex items-center gap-3 p-3">'
        +'<div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style="background:#0ea5e911">'+(r.flag||'🗺')+'</div>'
        +'<div class="flex-1 min-w-0">'
        +'<p class="text-sm font-bold text-slate-200">'+(r.name||r.city||'')+'</p>'
        +'<p class="text-xs text-slate-500">'+(r.country||'')+(r.city?' · '+r.city:'')+(ago?' · '+ago:'')+'</p>'
        +'</div>'
        +'<a href="/destination/'+r.id+'" class="text-xs px-2 py-1 rounded-lg sky press" style="background:#0ea5e922">보기</a>'
        +'</div>';
    }).join('');
  }

  window.switchTab=function(key){
    curTab=key;
    ['trips','favs','recent','data'].forEach(function(k){
      var btn=document.getElementById('tab_'+k);
      var panel=document.getElementById('panel_'+k);
      if(k===key){
        if(btn){btn.classList.add('active');btn.style.background='#0ea5e9';btn.style.color='#fff';btn.style.borderColor='#0ea5e9';}
        if(panel)panel.classList.remove('hidden');
      }else{
        if(btn){btn.classList.remove('active');btn.style.background='#0f172a';btn.style.color='#94a3b8';btn.style.borderColor='#1e293b';}
        if(panel)panel.classList.add('hidden');
      }
    });
    if(key==='trips')renderTrips();
    else if(key==='favs')renderFavs();
    else if(key==='recent')renderRecent();
  };

  window.removeFav=function(id){
    if(!window.TM)return;
    window.TM.removeFav(id);
    renderFavs();updateStats();
  };

  window.clearAllData=function(){
    if(!confirm('모든 여행 데이터를 초기화하시겠습니까?\\n이 작업은 되돌릴 수 없습니다.'))return;
    localStorage.removeItem('tm_favorites');
    localStorage.removeItem('tm_trips');
    localStorage.removeItem('tm_recent');
    updateStats();
    renderTrips();renderFavs();renderRecent();
    alert('데이터가 초기화되었습니다.');
  };

  window.exportTripText=function(){
    if(!window.TM)return;
    var trips=window.TM.getTrips();
    if(!trips||trips.length===0){alert('저장된 여행 일정이 없습니다.');return;}
    var nl=String.fromCharCode(10);
    var lines=['===== Asia Travel Manager 일정표 =====',nl];
    trips.forEach(function(t){
      lines.push('['+t.title+']');
      if(t.startDate)lines.push('기간: '+t.startDate+' ~ '+t.endDate);
      if(t.country)lines.push('목적지: '+t.country+(t.city?' '+t.city:''));
      if(t.memo)lines.push('메모: '+t.memo);
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
    var file=inp.files[0];
    if(!file)return;
    if(window.TM)window.TM.importJSON(file);
  };

  window.installPWA=function(){
    if(window._deferredPrompt){window._deferredPrompt.prompt();window._deferredPrompt=null;}
    else{alert('iOS: 하단 공유 버튼 -> "홈 화면에 추가"\\nAndroid: 브라우저 메뉴 -> "홈 화면에 추가"');}
  };

  window.editProfile=function(){
    var modal=document.getElementById('profileModal');
    var pn=document.getElementById('profileName');var ps=document.getElementById('profileSub');
    var en=document.getElementById('editName');var es=document.getElementById('editSub');
    if(en&&pn)en.value=pn.textContent||'';
    if(es&&ps)es.value=ps.textContent||'';
    if(modal){modal.classList.remove('hidden');modal.classList.add('flex');}
  };
  window.closeProfileModal=function(){
    var modal=document.getElementById('profileModal');
    if(modal){modal.classList.add('hidden');modal.classList.remove('flex');}
  };
  window.saveProfile=function(){
    var en=document.getElementById('editName');var es=document.getElementById('editSub');
    var pn=document.getElementById('profileName');var ps=document.getElementById('profileSub');
    if(en&&pn&&en.value.trim())pn.textContent=en.value.trim();
    if(es&&ps&&es.value.trim())ps.textContent=es.value.trim();
    localStorage.setItem('tm_profile',JSON.stringify({name:en?en.value.trim():'',sub:es?es.value.trim():''}));
    window.closeProfileModal();
  };

  window.openSettings=function(){
    window.switchTab('data');
  };

  // 프로필 불러오기
  var prof=null;try{prof=JSON.parse(localStorage.getItem('tm_profile')||'null');}catch(e){}
  if(prof){
    var pn=document.getElementById('profileName');var ps=document.getElementById('profileSub');
    if(pn&&prof.name)pn.textContent=prof.name;
    if(ps&&prof.sub)ps.textContent=prof.sub;
  }

  // PWA install prompt
  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window._deferredPrompt=e;});

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){updateStats();renderTrips();});
  }else{
    updateStats();renderTrips();
  }
})();
  </script>
  `

  return baseLayout('마이 여행', content, 'my')
}

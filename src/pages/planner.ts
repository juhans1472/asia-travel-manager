import { baseLayout } from '../layout'

export const plannerPage = (destId = '', destCity = '', destCountry = '', destFlag = '') => {
  const content = `
  <style>
    .day-tab{transition:all .15s}
    .day-tab.active{background:#0ea5e9;color:#fff}
    .schedule-item{transition:transform .12s}
    .schedule-item:active{transform:scale(.98)}
  </style>

  <!-- 헤더 -->
  <header class="sticky top-0 z-40 px-4 py-3 border-b" style="background:#030712ee;backdrop-filter:blur(16px);border-color:#1e293b">
    <div class="flex items-center gap-3">
      <a href="/" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#0f172a;border:1px solid #1e293b">
        <span class="material-symbols-outlined text-slate-300 text-xl">arrow_back</span>
      </a>
      <h1 class="flex-1 font-bold text-base text-slate-100">여행 일정 플래너</h1>
      <button onclick="saveTrip()" class="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full press" style="background:#0ea5e9;color:#fff">
        <span class="material-symbols-outlined text-sm">save</span>
        저장
      </button>
    </div>
  </header>

  <div class="pb-28 pt-4 space-y-5 px-4">

    <!-- 여행 기본 정보 -->
    <div class="card p-4">
      <h3 class="font-bold text-sm text-slate-300 mb-3">✈️ 여행 기본 정보</h3>
      <div class="space-y-3">
        <div>
          <label class="text-xs text-slate-500 mb-1 block">여행 제목</label>
          <input type="text" id="tripTitle" placeholder="예: 오사카 3박4일 먹방 여행" value="${destCity ? destFlag+' '+destCity+' 여행' : ''}">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-slate-500 mb-1 block">출발일</label>
            <input type="date" id="startDate">
          </div>
          <div>
            <label class="text-xs text-slate-500 mb-1 block">귀국일</label>
            <input type="date" id="endDate">
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-slate-500 mb-1 block">국가</label>
            <input type="text" id="tripCountry" placeholder="예: 일본" value="${destCountry}">
          </div>
          <div>
            <label class="text-xs text-slate-500 mb-1 block">도시</label>
            <input type="text" id="tripCity" placeholder="예: 오사카" value="${destCity}">
          </div>
        </div>
        <div>
          <label class="text-xs text-slate-500 mb-1 block">여행 메모</label>
          <textarea id="tripMemo" placeholder="여행 컨셉, 목적, 동행인 등..." rows="2" style="background:#0f172a;border:1px solid #1e293b;color:#f1f5f9;border-radius:12px;padding:10px 14px;width:100%;outline:none;font-size:14px;resize:none"></textarea>
        </div>
        <div>
          <label class="text-xs text-slate-500 mb-1 block">총 예산 (원)</label>
          <input type="number" id="tripBudget" placeholder="예: 1500000" min="0">
        </div>
      </div>
    </div>

    <!-- 빠른 도구 -->
    ${destCity && destCountry ? `
    <div class="card p-4">
      <h3 class="font-bold text-sm text-slate-200 mb-3">🛠 빠른 도구</h3>
      <div class="grid grid-cols-2 gap-2">
        <a href="/tips?tab=currency&city=${encodeURIComponent(destCity)}&country=${encodeURIComponent(destCountry)}" 
           class="flex items-center gap-2 p-3 rounded-xl press" style="background:#22c55e11;border:1px solid #22c55e33">
          <span class="text-xl">🏦</span>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-slate-200">환전소 찾기</p>
            <p class="text-[10px] text-slate-500">${destCity} 추천 환전소</p>
          </div>
        </a>
        <a href="/tips?tab=phrase" 
           class="flex items-center gap-2 p-3 rounded-xl press" style="background:#f59e0b11;border:1px solid #f59e0b33">
          <span class="text-xl">🗣️</span>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-slate-200">현지 회화</p>
            <p class="text-[10px] text-slate-500">기본 회화 보기</p>
          </div>
        </a>
      </div>
    </div>
    ` : ''}

    <!-- 일별 일정 탭 -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-sm text-slate-100">📅 일별 일정</h3>
        <button onclick="addDay()" class="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full press sky" style="background:#0ea5e922;border:1px solid #0ea5e944">
          <span class="material-symbols-outlined text-sm">add</span>
          일 추가
        </button>
      </div>

      <!-- 일 탭 -->
      <div id="dayTabs" class="flex gap-2 overflow-x-auto ns pb-2 mb-3"></div>

      <!-- 현재 선택 일 일정 -->
      <div id="daySchedule" class="space-y-3"></div>

      <!-- 일정 추가 버튼 -->
      <button onclick="addSchedule()" class="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-dashed text-sm font-bold sky press" style="border-color:#0ea5e933">
        <span class="material-symbols-outlined text-sm">add_circle</span>
        일정 항목 추가
      </button>
    </div>

    <!-- 저장된 여행 목록 -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-sm text-slate-100">💾 저장된 여행 계획</h3>
        <button onclick="loadTrips()" class="text-xs text-slate-500 press">새로고침</button>
      </div>
      <div id="savedTripList" class="space-y-2"></div>
    </div>

  </div>

  <!-- 일정 추가 모달 -->
  <div id="scheduleModal" class="fixed inset-0 z-50 hidden items-center justify-center" style="background:rgba(0,0,0,.7)">
    <div class="card w-full max-w-[390px] mx-4 p-5" style="max-height:85vh;overflow-y:auto">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-slate-100">일정 항목 추가</h3>
        <button onclick="closeScheduleModal()" class="text-slate-400 press">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div class="space-y-3">
        <div>
          <label class="text-xs text-slate-500 mb-1 block">카테고리</label>
          <div class="grid grid-cols-4 gap-2" id="catBtns">
            ${[
              {key:'transport', icon:'✈️', label:'교통'},
              {key:'hotel', icon:'🏨', label:'숙소'},
              {key:'food', icon:'🍜', label:'맛집'},
              {key:'spot', icon:'🗺', label:'명소'},
              {key:'activity', icon:'🏄', label:'액티비티'},
              {key:'shop', icon:'🛍', label:'쇼핑'},
              {key:'etc', icon:'📌', label:'기타'},
              {key:'night', icon:'🌙', label:'야간'},
            ].map(c => `<button onclick="selectCat('${c.key}',this)" class="cat-btn flex flex-col items-center gap-1 py-2 rounded-xl border text-xs press" style="background:#0f172a;border-color:#1e293b;color:#94a3b8" data-key="${c.key}"><span>${c.icon}</span><span>${c.label}</span></button>`).join('')}
          </div>
        </div>
        <div>
          <label class="text-xs text-slate-500 mb-1 block">시간</label>
          <input type="time" id="schedTime" value="09:00">
        </div>
        <div>
          <label class="text-xs text-slate-500 mb-1 block">장소/활동 이름</label>
          <input type="text" id="schedName" placeholder="예: 도톤보리 타코야키">
        </div>
        <div>
          <label class="text-xs text-slate-500 mb-1 block">메모 (선택)</label>
          <input type="text" id="schedMemo" placeholder="예: 줄 길면 다른 곳으로">
        </div>
        <div>
          <label class="text-xs text-slate-500 mb-1 block">예상 비용 (원)</label>
          <input type="number" id="schedCost" placeholder="0" min="0">
        </div>
        <button onclick="confirmAddSchedule()" class="w-full py-3 rounded-xl font-bold text-white press" style="background:#0ea5e9">추가하기</button>
      </div>
    </div>
  </div>

  <!-- 여행 불러오기 모달 -->
  <div id="loadTripModal" class="fixed inset-0 z-50 hidden items-center justify-center" style="background:rgba(0,0,0,.7)">
    <div class="card w-full max-w-[390px] mx-4 p-5" style="max-height:85vh;overflow-y:auto">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-slate-100">저장된 여행 불러오기</h3>
        <button onclick="closeLoadModal()" class="text-slate-400 press">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div id="loadTripList" class="space-y-2"></div>
    </div>
  </div>

  <script>
(function(){
  var trip={id:'',title:'',country:'',city:'',flag:'',startDate:'',endDate:'',memo:'',budget:0,days:[]};
  var curDay=0;
  var selectedCat='spot';
  var editIdx=-1;

  // URL 파라미터 처리
  var params=new URLSearchParams(location.search);
  var destId=params.get('dest')||'';
  var pCity=params.get('city')||'${destCity}';
  var pCountry=params.get('country')||'${destCountry}';
  var pFlag=params.get('flag')||'${destFlag}';
  var pTripId=params.get('id')||'';

  if(pTripId&&window.TM){
    var saved=window.TM.getTrips().find(function(t){return t.id===pTripId;});
    if(saved){trip=JSON.parse(JSON.stringify(saved));loadTripToForm();}
  }else{
    if(pCity){var el=document.getElementById('tripCity');if(el)el.value=pCity;}
    if(pCountry){var el2=document.getElementById('tripCountry');if(el2)el2.value=pCountry;}
    if(pCity||pFlag){
      var el3=document.getElementById('tripTitle');
      if(el3&&!el3.value)el3.value=(pFlag?pFlag+' ':'')+pCity+' 여행';
    }
    trip.days=[{label:'Day 1',schedules:[]}];
    curDay=0;
  }

  function loadTripToForm(){
    var fields={tripTitle:'title',tripCountry:'country',tripCity:'city',startDate:'startDate',endDate:'endDate',tripMemo:'memo',tripBudget:'budget'};
    Object.keys(fields).forEach(function(id){
      var el=document.getElementById(id);
      if(el)el.value=trip[fields[id]]||'';
    });
    renderDayTabs();
    renderSchedule();
  }

  function renderDayTabs(){
    var el=document.getElementById('dayTabs');
    if(!el)return;
    el.innerHTML=trip.days.map(function(d,i){
      var cost=d.schedules?d.schedules.reduce(function(s,x){return s+(x.cost||0);},0):0;
      return '<button onclick="selectDay('+i+')" class="day-tab flex-shrink-0 px-3 py-1.5 rounded-xl border text-xs font-bold press'+(i===curDay?' active':'')+'" style="border-color:#1e293b;'+(i!==curDay?'background:#0f172a;color:#94a3b8':'')+'"><span>'+d.label+'</span>'+(cost>0?'<span class="block text-[9px] mt-0.5">'+(cost/10000).toFixed(1)+'만원</span>':'')+'</button>';
    }).join('');
  }

  function renderSchedule(){
    var el=document.getElementById('daySchedule');
    if(!el)return;
    var day=trip.days[curDay];
    if(!day||!day.schedules||day.schedules.length===0){
      el.innerHTML='<div class="card p-8 text-center"><p class="text-slate-500 text-sm">아직 일정이 없습니다<br>아래 버튼으로 추가해보세요</p></div>';
      return;
    }
    var catIcon={transport:'✈️',hotel:'🏨',food:'🍜',spot:'🗺',activity:'🏄',shop:'🛍',etc:'📌',night:'🌙'};
    el.innerHTML=day.schedules.map(function(s,i){
      return '<div class="card p-3 schedule-item flex items-start gap-3">'
        +'<div class="text-center flex-shrink-0 pt-1"><p class="text-lg">'+(catIcon[s.cat]||'📌')+'</p><p class="text-[10px] text-slate-500 mt-0.5">'+(s.time||'')+'</p></div>'
        +'<div class="flex-1 min-w-0">'
        +'<p class="text-sm font-bold text-slate-200">'+(s.name||'')+'</p>'
        +(s.memo?'<p class="text-xs text-slate-500 mt-0.5">'+(s.memo)+'</p>':'')
        +(s.cost?'<p class="text-xs mt-1" style="color:#38bdf8">💰 '+(s.cost).toLocaleString()+'원</p>':'')
        +'</div>'
        +'<button onclick="removeSchedule('+i+')" class="text-slate-600 press"><span class="material-symbols-outlined text-lg">delete</span></button>'
        +'</div>';
    }).join('');
  }

  window.selectDay=function(i){curDay=i;renderDayTabs();renderSchedule();};

  window.addDay=function(){
    trip.days.push({label:'Day '+(trip.days.length+1),schedules:[]});
    curDay=trip.days.length-1;
    renderDayTabs();renderSchedule();
  };

  window.addSchedule=function(){
    var modal=document.getElementById('scheduleModal');
    if(modal){modal.classList.remove('hidden');modal.classList.add('flex');}
  };

  window.closeScheduleModal=function(){
    var modal=document.getElementById('scheduleModal');
    if(modal){modal.classList.add('hidden');modal.classList.remove('flex');}
    selectedCat='spot';
    document.querySelectorAll('.cat-btn').forEach(function(b){b.style.background='#0f172a';b.style.color='#94a3b8';b.style.borderColor='#1e293b';});
  };

  window.selectCat=function(key,btn){
    selectedCat=key;
    document.querySelectorAll('.cat-btn').forEach(function(b){b.style.background='#0f172a';b.style.color='#94a3b8';b.style.borderColor='#1e293b';});
    if(btn){btn.style.background='#0ea5e933';btn.style.color='#38bdf8';btn.style.borderColor='#0ea5e9';}
  };

  window.confirmAddSchedule=function(){
    var name=document.getElementById('schedName');
    var time=document.getElementById('schedTime');
    var memo=document.getElementById('schedMemo');
    var cost=document.getElementById('schedCost');
    if(!name||!name.value.trim()){alert('장소/활동 이름을 입력해주세요');return;}
    if(!trip.days[curDay])trip.days[curDay]={label:'Day '+(curDay+1),schedules:[]};
    if(!trip.days[curDay].schedules)trip.days[curDay].schedules=[];
    trip.days[curDay].schedules.push({
      cat:selectedCat,
      time:time?time.value:'',
      name:name.value.trim(),
      memo:memo?memo.value.trim():'',
      cost:cost&&cost.value?parseInt(cost.value):0,
    });
    trip.days[curDay].schedules.sort(function(a,b){return (a.time||'').localeCompare(b.time||'');});
    if(name)name.value='';if(memo)memo.value='';if(cost)cost.value='';
    window.closeScheduleModal();
    renderSchedule();renderDayTabs();
  };

  window.removeSchedule=function(i){
    if(!trip.days[curDay])return;
    trip.days[curDay].schedules.splice(i,1);
    renderSchedule();renderDayTabs();
  };

  window.saveTrip=function(){
    var title=document.getElementById('tripTitle');
    var country=document.getElementById('tripCountry');
    var city=document.getElementById('tripCity');
    var start=document.getElementById('startDate');
    var end=document.getElementById('endDate');
    var memo=document.getElementById('tripMemo');
    var budget=document.getElementById('tripBudget');
    if(!title||!title.value.trim()){alert('여행 제목을 입력해주세요');return;}
    trip.id=trip.id||'trip_'+Date.now();
    trip.title=title?title.value.trim():'';
    trip.country=country?country.value.trim():'';
    trip.city=city?city.value.trim():'';
    trip.flag=pFlag||'✈️';
    trip.startDate=start?start.value:'';
    trip.endDate=end?end.value:'';
    trip.memo=memo?memo.value.trim():'';
    trip.budget=budget&&budget.value?parseInt(budget.value):0;
    trip.savedAt=new Date().toISOString();
    if(window.TM){window.TM.saveTrip(trip);}
    loadTrips();
    var s=document.createElement('div');
    s.style.cssText='position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#0ea5e9;color:#fff;padding:12px 24px;border-radius:24px;font-weight:700;font-size:14px;z-index:9999;animation:fadeIn .3s';
    s.textContent='✅ 여행 일정이 저장되었습니다!';
    document.body.appendChild(s);
    setTimeout(function(){s.remove();},2500);
  };

  function loadTrips(){
    var el=document.getElementById('savedTripList');
    if(!el)return;
    var trips=window.TM?window.TM.getTrips():[];
    if(!trips||trips.length===0){
      el.innerHTML='<p class="text-sm text-slate-500 text-center py-4">저장된 여행 계획이 없습니다</p>';
      return;
    }
    el.innerHTML=trips.map(function(t){
      var days=t.days?t.days.length:0;
      var totalCost=t.days?t.days.reduce(function(s,d){return s+(d.schedules?d.schedules.reduce(function(ss,x){return ss+(x.cost||0);},0):0);},0):0;
      return '<div class="card p-3 flex items-center gap-3">'
        +'<div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style="background:#0ea5e922">'+(t.flag||'✈️')+'</div>'
        +'<div class="flex-1 min-w-0">'
        +'<p class="text-sm font-bold text-slate-200 truncate">'+(t.title||'여행 계획')+'</p>'
        +'<p class="text-xs text-slate-500">'+(t.country||'')+(t.city?' · '+t.city:'')+' · '+days+'일</p>'
        +(totalCost>0?'<p class="text-xs sky">💰 '+totalCost.toLocaleString()+'원</p>':'')
        +'</div>'
        +'<div class="flex gap-2">'
        +'<button onclick="loadThisTrip(\''+t.id+'\')" class="text-xs font-bold sky press" style="background:#0ea5e922;padding:6px 10px;border-radius:8px">불러오기</button>'
        +'<button onclick="deleteTrip(\''+t.id+'\')" class="text-slate-500 press"><span class="material-symbols-outlined text-base">delete</span></button>'
        +'</div>'
        +'</div>';
    }).join('');
  }

  window.loadThisTrip=function(id){
    if(!window.TM)return;
    var t=window.TM.getTrips().find(function(x){return x.id===id;});
    if(!t)return;
    trip=JSON.parse(JSON.stringify(t));
    curDay=0;
    loadTripToForm();
  };

  window.deleteTrip=function(id){
    if(!confirm('이 여행 계획을 삭제하시겠습니까?'))return;
    if(window.TM)window.TM.removeTrip(id);
    loadTrips();
    if(trip.id===id){trip={id:'',title:'',country:'',city:'',flag:'',startDate:'',endDate:'',memo:'',budget:0,days:[{label:'Day 1',schedules:[]}]};curDay=0;loadTripToForm();}
  };

  window.exportTripPDF=function(){
    if(!trip.title){alert('저장된 여행 계획을 먼저 불러오세요');return;}
    var lines=[trip.title+' - 여행 일정',''];
    if(trip.startDate)lines.push('출발: '+trip.startDate+' ~ '+trip.endDate);
    if(trip.country)lines.push('목적지: '+trip.country+' '+trip.city);
    lines.push('');
    trip.days.forEach(function(d){
      lines.push('['+d.label+']');
      if(d.schedules&&d.schedules.length){
        d.schedules.forEach(function(s){lines.push('  '+(s.time||'')+' '+s.name+(s.memo?' ('+s.memo+')':'')+(s.cost?' - '+(s.cost).toLocaleString()+'원':''));});
      }else{lines.push('  (일정 없음)');}
      lines.push('');
    });
    var nl=String.fromCharCode(10);
    var blob=new Blob([lines.join(nl)],{type:'text/plain;charset=utf-8'});
    var a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download=(trip.title||'travel')+'-일정표.txt';
    a.click();
  };

  renderDayTabs();
  renderSchedule();
  loadTrips();
})();
  </script>
  `

  return baseLayout('여행 일정 플래너', content, 'planner')
}

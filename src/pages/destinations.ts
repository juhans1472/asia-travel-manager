import { baseLayout, COUNTRIES } from '../layout'

const ALL_SPOTS = [
  // ─── 일본 ───
  { id:'jp-tokyo',    country:'JP', flag:'🇯🇵', countryName:'일본', city:'도쿄',     category:'city',    name:'도쿄 도심 탐방',    tags:['#쇼핑','#음식','#문화'],   rating:4.9, reviews:12430, budget:'중', img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=320&fit=crop', desc:'시부야 스크램블에서 아키하바라까지, 도쿄의 모든 것', bestTime:'3~5월, 10~11월', days:'3~5일', theme:'city' },
  { id:'jp-osaka',    country:'JP', flag:'🇯🇵', countryName:'일본', city:'오사카',    category:'food',    name:'오사카 먹방 여행',   tags:['#타코야키','#라멘','#길거리음식'], rating:4.9, reviews:9870, budget:'중', img:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&h=320&fit=crop', desc:'천하의 부엌, 먹방 여행의 성지', bestTime:'3~5월, 9~11월', days:'2~4일', theme:'food' },
  { id:'jp-kyoto',    country:'JP', flag:'🇯🇵', countryName:'일본', city:'교토',     category:'history', name:'교토 고도 여행',     tags:['#신사','#기모노','#전통'], rating:5.0, reviews:8950, budget:'중상', img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&h=320&fit=crop', desc:'천 년 고도, 일본 전통 문화의 정수', bestTime:'3~4월(벚꽃), 11월(단풍)', days:'2~3일', theme:'history' },
  { id:'jp-hokkaido', country:'JP', flag:'🇯🇵', countryName:'일본', city:'삿포로',   category:'nature',  name:'홋카이도 자연 여행', tags:['#스키','#라벤더','#해산물'], rating:4.8, reviews:5230, budget:'중상', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=320&fit=crop', desc:'일본의 대자연, 사계절이 아름다운 곳', bestTime:'1~2월(스키), 7~8월(라벤더)', days:'3~5일', theme:'nature' },
  // ─── 태국 ───
  { id:'th-bangkok',  country:'TH', flag:'🇹🇭', countryName:'태국', city:'방콕',     category:'city',    name:'방콕 도시 여행',     tags:['#왕궁','#야시장','#쏨땀'], rating:4.8, reviews:15200, budget:'하', img:'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=500&h=320&fit=crop', desc:'동남아 최대 대도시, 황금 사원의 도시', bestTime:'11~2월(건기)', days:'3~4일', theme:'city' },
  { id:'th-phuket',   country:'TH', flag:'🇹🇭', countryName:'태국', city:'푸켓',     category:'beach',   name:'푸켓 해변 리조트',   tags:['#에메랄드바다','#리조트','#스노클링'], rating:4.9, reviews:11000, budget:'중', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=320&fit=crop', desc:'태국 최고의 해변 휴양지', bestTime:'11~4월', days:'4~7일', theme:'beach' },
  { id:'th-chiangmai',country:'TH', flag:'🇹🇭', countryName:'태국', city:'치앙마이', category:'nature',  name:'치앙마이 힐링 여행', tags:['#코끼리','#트레킹','#나이트마켓'], rating:4.8, reviews:7600, budget:'하', img:'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&h=320&fit=crop', desc:'북부 태국의 문화 도시, 쿨한 분위기', bestTime:'11~2월', days:'2~4일', theme:'nature' },
  // ─── 베트남 ───
  { id:'vn-danang',   country:'VN', flag:'🇻🇳', countryName:'베트남', city:'다낭',   category:'beach',   name:'다낭 해변 여행',     tags:['#미케비치','#오행산','#바나힐'], rating:4.8, reviews:9340, budget:'하', img:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&h=320&fit=crop', desc:'깨끗한 해변과 세계유산 호이안이 가까운 도시', bestTime:'2~8월', days:'3~5일', theme:'beach' },
  { id:'vn-hanoi',    country:'VN', flag:'🇻🇳', countryName:'베트남', city:'하노이', category:'food',    name:'하노이 음식 여행',   tags:['#쌀국수','#분짜','#에그커피'], rating:4.7, reviews:6780, budget:'하', img:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=320&fit=crop', desc:'베트남 수도, 정통 음식과 호수의 도시', bestTime:'10~12월, 3~4월', days:'2~3일', theme:'food' },
  { id:'vn-halong',   country:'VN', flag:'🇻🇳', countryName:'베트남', city:'하노이', category:'nature',  name:'하롱베이 크루즈',    tags:['#크루즈','#석회암섬','#해상카약'], rating:5.0, reviews:8120, budget:'중', img:'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&h=320&fit=crop', desc:'유네스코 세계자연유산, 비경의 바다', bestTime:'3~5월, 9~11월', days:'1~2일(크루즈)', theme:'nature' },
  // ─── 대만 ───
  { id:'tw-taipei',   country:'TW', flag:'🇹🇼', countryName:'대만', city:'타이베이', category:'food',    name:'타이베이 야시장',    tags:['#스린야시장','#버블티','#우육면'], rating:4.8, reviews:10200, budget:'중', img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=320&fit=crop', desc:'세계 최고의 야시장과 먹거리 천국', bestTime:'10~12월, 3~5월', days:'3~5일', theme:'food' },
  { id:'tw-hualien',  country:'TW', flag:'🇹🇼', countryName:'대만', city:'화롄',    category:'nature',  name:'타로코 협곡',        tags:['#협곡','#트레킹','#절경'], rating:5.0, reviews:4560, budget:'중', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=320&fit=crop', desc:'대만이 자랑하는 최고의 자연 경관', bestTime:'10~4월', days:'1~2일', theme:'nature' },
  // ─── 싱가포르 ───
  { id:'sg-city',     country:'SG', flag:'🇸🇬', countryName:'싱가포르', city:'싱가포르', category:'city', name:'싱가포르 도시 투어', tags:['#마리나베이','#가든스','#칠리크랩'], rating:4.9, reviews:13500, budget:'상', img:'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&h=320&fit=crop', desc:'아시아의 지구촌, 깔끔한 미래 도시', bestTime:'연중(실내 위주)', days:'3~4일', theme:'city' },
  // ─── 인도네시아 ───
  { id:'id-bali',     country:'ID', flag:'🇮🇩', countryName:'인도네시아', city:'발리', category:'beach', name:'발리 감성 여행',     tags:['#우붓','#꾸따비치','#인피니티풀'], rating:4.9, reviews:16800, budget:'중', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=320&fit=crop', desc:'신들의 섬, 인스타그램 성지 발리', bestTime:'4~9월(건기)', days:'5~7일', theme:'beach' },
  // ─── 말레이시아 ───
  { id:'my-kl',       country:'MY', flag:'🇲🇾', countryName:'말레이시아', city:'쿠알라룸푸르', category:'city', name:'쿠알라룸푸르',  tags:['#페트로나스','#야시장','#다문화'], rating:4.7, reviews:8900, budget:'하', img:'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=500&h=320&fit=crop', desc:'다민족 문화와 현대 도시의 조화', bestTime:'5~7월, 12~2월', days:'2~4일', theme:'city' },
]

const budgetLabel: Record<string, string> = { '하': '💚 저예산', '중': '💛 중간', '중상': '🧡 중상', '상': '❤️ 고급' }
const budgetColor: Record<string, string> = { '하': '#22c55e', '중': '#f59e0b', '중상': '#f97316', '상': '#ef4444' }

export const destinationsPage = (country = '', theme = '') => {
  const content = `
  <style>
    .spot-card:hover{transform:scale(1.01)}
    .spot-card{transition:transform .15s}
    .filter-btn{transition:all .15s}
    .filter-btn.active{background:#0ea5e9;color:#fff;border-color:#0ea5e9}
  </style>

  <!-- 헤더 -->
  <header class="sticky top-0 z-40 px-4 py-3 border-b" style="background:#030712ee;backdrop-filter:blur(16px);border-color:#1e293b">
    <div class="flex items-center gap-3">
      <a href="/" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#0f172a;border:1px solid #1e293b">
        <span class="material-symbols-outlined text-slate-300 text-xl">arrow_back</span>
      </a>
      <h1 class="flex-1 font-bold text-base text-slate-100">여행지 탐색</h1>
    </div>
    <!-- 검색창 -->
    <div class="mt-3 relative">
      <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xl">search</span>
      <input type="text" id="searchInput" placeholder="국가, 도시, 관광지, 환전 검색..." style="background:#0f172a;border:1px solid #1e293b;color:#f1f5f9;border-radius:12px;padding:10px 14px 10px 44px;width:100%;outline:none;font-size:14px">
    </div>
  </header>

  <div class="pb-28 pt-4">

    <!-- Debug info -->
    <div class="px-4 mb-3">
      <div id="debugInfo" class="p-4 rounded-lg" style="background:#10b981;color:#fff;font-family:sans-serif;font-size:16px;font-weight:700;line-height:1.8;box-shadow:0 4px 12px rgba(16,185,129,0.3)">
        ⏳ 초기화 중...
      </div>
      <div id="liveInput" class="mt-2 p-3 rounded-lg" style="background:#0f172a;border:2px solid #f59e0b;color:#f59e0b;font-family:monospace;font-size:14px;min-height:50px">
        <div>⌨️ <strong>실시간 입력:</strong> <span id="liveInputText">없음</span></div>
        <div class="mt-1">🔍 <strong>이벤트 감지:</strong> <span id="eventStatus">대기중...</span></div>
      </div>
    </div>

    <!-- 국가 필터 -->
    <div class="px-4 mb-4">
      <div class="flex gap-2 overflow-x-auto ns pb-1">
        <button onclick="setCountry('')" id="cfALL" class="filter-btn flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-bold press active"
                style="background:#0ea5e9;color:#fff;border-color:#0ea5e9">전체</button>
        ${COUNTRIES.filter(c => ['JP','TH','VN','TW','SG','ID','MY','HK'].includes(c.code)).map(d => `
        <button onclick="setCountry('${d.code}')" id="cf${d.code}" class="filter-btn flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-bold press"
                style="background:#0f172a;border-color:#1e293b;color:#94a3b8">${d.flag} ${d.name}</button>`).join('')}
      </div>
    </div>

    <!-- 테마 필터 -->
    <div class="px-4 mb-4">
      <div class="flex gap-2 overflow-x-auto ns pb-1">
        ${[
          {key:'', label:'🗂 전체'},
          {key:'city', label:'🏙 도시'},
          {key:'food', label:'🍜 맛집'},
          {key:'nature', label:'🏞 자연'},
          {key:'beach', label:'🏖 해변'},
          {key:'history', label:'🏛 역사'},
        ].map(t => `
        <button onclick="setTheme('${t.key}')" id="tf${t.key||'ALL'}" class="filter-btn flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-bold press${!t.key ? ' active' : ''}"
                style="background:#0f172a;border-color:#1e293b;color:#94a3b8${!t.key ? ';background:#0ea5e9;color:#fff;border-color:#0ea5e9' : ''}">${t.label}</button>`).join('')}
      </div>
    </div>

    <!-- 결과 수 -->
    <div class="px-4 mb-3">
      <p class="text-xs text-slate-500"><span id="resultCount">${ALL_SPOTS.length}</span>개의 여행지</p>
    </div>

    <!-- 여행지 카드 목록 -->
    <div id="spotList" class="px-4 space-y-3">
      ${ALL_SPOTS.map(s => spotCard(s)).join('')}
    </div>

    <div id="emptyState" class="hidden px-4 py-16 text-center">
      <p class="text-4xl mb-3">🔍</p>
      <p class="text-slate-400 text-sm">검색 결과가 없습니다</p>
    </div>

  </div>

  <script>
(function(){
  console.log('🔍 [DEBUG] Search script loaded at', new Date().toISOString());
  var spots=${JSON.stringify(ALL_SPOTS)};
  var curCountry='${country}';
  var curTheme='${theme}';
  var curSearch='';
  console.log('🔍 [DEBUG] Initial data:', spots.length, 'spots loaded');

  function render(){
    console.log('[Render] Starting render. curCountry:', curCountry, 'curTheme:', curTheme, 'curSearch:', curSearch);
    var filtered=spots.filter(function(s){
      var matchC=!curCountry||s.country===curCountry;
      var matchT=!curTheme||s.theme===curTheme;
      var q=curSearch.toLowerCase();
      // 검색어에 '환전' 포함시 모든 결과 표시
      var tagsText = (s.tags && Array.isArray(s.tags)) ? s.tags.join('') : '';
      var searchText=(s.name+s.city+s.countryName+tagsText+'환전소환전환율').toLowerCase();
      var matchS=!q||searchText.indexOf(q)>=0;
      
      // 디버그: 각 항목의 매칭 상태 (처음 3개만)
      if(q && filtered.length < 3){
        console.log('[Filter]', s.city, s.name);
        console.log('  matchC:', matchC, '(country:', s.country, 'vs', curCountry||'all', ')');
        console.log('  matchT:', matchT, '(theme:', s.theme, 'vs', curTheme||'all', ')');
        console.log('  matchS:', matchS, '(searchText:', searchText.substring(0, 50)+'...', ')');
        console.log('  indexOf("'+q+'"):', searchText.indexOf(q));
      }
      
      return matchC&&matchT&&matchS;
    });
    console.log('[Render] Filtered results:', filtered.length, '/ Total:', spots.length);
    
    var el=document.getElementById('spotList');
    var em=document.getElementById('emptyState');
    var rc=document.getElementById('resultCount');
    
    console.log('[Render] DOM elements - spotList:', el, 'emptyState:', em, 'resultCount:', rc);
    
    // Update debug info with result
    var debug=document.getElementById('debugInfo');
    if(debug){
      debug.innerHTML='🔍 검색어: <strong>"'+(curSearch||'(없음)')+'"</strong><br>'
        +'📊 총 데이터: '+spots.length+'개<br>'
        +'🌍 국가필터: '+(curCountry||'전체')+' | 🎨 테마필터: '+(curTheme||'전체')+'<br>'
        +'✅ <strong style="color:#22c55e;font-size:14px">검색결과: '+filtered.length+'개</strong><br>'
        +'⏰ '+new Date().toLocaleTimeString();
    }
    
    if(rc)rc.textContent=filtered.length;
    if(filtered.length===0){if(el)el.innerHTML='';if(em)em.classList.remove('hidden');console.log('[Render] No results, showing empty state');return;}
    if(em)em.classList.add('hidden');
    if(el)el.innerHTML=filtered.map(function(s){
      var bColor='${budgetColor['중']}'.replace('중','');
      var bl='${budgetLabel['중']}'.replace('중','');
      var bc=s.budget==='하'?'#22c55e':s.budget==='중'?'#f59e0b':s.budget==='중상'?'#f97316':'#ef4444';
      var blab=s.budget==='하'?'💚 저예산':s.budget==='중'?'💛 중간':s.budget==='중상'?'🧡 중상':'❤️ 고급';
      var isFav=window.TM&&window.TM.isFav(s.id);
      return '<div class="card overflow-hidden spot-card">'
        +'<div class="relative" style="height:160px">'
        +'<img src="'+s.img+'" class="w-full h-full object-cover" alt="'+s.city+'">'
        +'<div class="absolute inset-0" style="background:linear-gradient(to top,rgba(3,7,18,.85) 0%,transparent 55%)"></div>'
        +'<div class="absolute top-2 left-2 flex gap-1">'
        +'<span class="badge" style="background:#0f172a99;color:#94a3b8;border:1px solid #1e293b">'+s.flag+' '+s.countryName+'</span>'
        +'<span class="badge" style="background:'+bc+'22;color:'+bc+';border:1px solid '+bc+'44">'+blab+'</span>'
        +'</div>'
        +'<button onclick="toggleFavSpot(this,&quot;"+s.id+"&quot;,&quot;"+s.name+"&quot;,&quot;"+s.countryName+"&quot;,&quot;"+s.flag+"&quot;,&quot;"+s.city+"&quot;,&quot;"+s.category+"&quot;)" class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full press" style="background:#0f172a99">'
        +'<span class="material-symbols-outlined text-lg" style="font-variation-settings:&quot;FILL&quot; '+(isFav?1:0)+',&quot;wght&quot; 400,&quot;GRAD&quot; 0,&quot;opsz&quot; 24;color:'+(isFav?'#f43f5e':'#94a3b8')+'">favorite</span>'
        +'</button>'
        +'<div class="absolute bottom-0 left-0 right-0 p-3">'
        +'<p class="text-white text-base font-black">'+s.city+' - '+s.name+'</p>'
        +'<p class="text-slate-400 text-xs">'+s.desc+'</p>'
        +'</div></div>'
        +'<div class="p-3">'
        +'<div class="flex items-center gap-3 mb-2 text-xs text-slate-400">'
        +'<span><span class="material-symbols-outlined text-sm" style="vertical-align:middle;color:#f59e0b">star</span> '+s.rating+' ('+s.reviews.toLocaleString()+')</span>'
        +'<span>📅 '+s.bestTime+'</span>'
        +'<span>⏱ '+s.days+'</span>'
        +'</div>'
        +'<div class="flex gap-1 flex-wrap">'
        +((s.tags && Array.isArray(s.tags)) ? s.tags.map(function(t){return '<span class="text-[10px] px-2 py-0.5 rounded-full" style="background:#0ea5e911;color:#38bdf8">'+t+'</span>';}).join('') : '')
        +'</div>'
        +'<div class="space-y-2 mt-3">'
        +'<div class="flex gap-2">'
        +'<a href="/destination/'+s.id+'" onclick="window.TM&&window.TM.addRecent({id:&quot;'+s.id+'&quot;,type:&quot;dest&quot;,name:&quot;'+s.name+'&quot;,country:&quot;'+s.countryName+'&quot;,flag:&quot;'+s.flag+'&quot;,city:&quot;'+s.city+'&quot;})" class="flex-1 text-center py-2 rounded-xl text-xs font-bold press sky" style="background:#0ea5e922;border:1px solid #0ea5e944">상세 보기</a>'
        +'<a href="/planner?dest='+s.id+'&city='+encodeURIComponent(s.city)+'&country='+encodeURIComponent(s.countryName)+'" class="flex-1 text-center py-2 rounded-xl text-xs font-bold press text-white" style="background:#0ea5e9">일정 추가</a>'
        +'</div>'
        +'<a href="/tips?tab=currency&city='+encodeURIComponent(s.city)+'&country='+encodeURIComponent(s.countryName)+'" class="w-full flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold press" style="background:#22c55e11;color:#22c55e;border:1px solid #22c55e33">'
        +'<span class="material-symbols-outlined text-sm">account_balance</span>'
        +s.city+' 환전소 찾기'
        +'</a>'
        +'</div></div></div>';
    }).join('');
  }

  window.setCountry=function(code){
    curCountry=code;
    document.querySelectorAll('.filter-btn[id^="cf"]').forEach(function(b){b.classList.remove('active');b.style.background='#0f172a';b.style.color='#94a3b8';b.style.borderColor='#1e293b';});
    var btn=document.getElementById('cf'+(code||'ALL'));
    if(btn){btn.classList.add('active');btn.style.background='#0ea5e9';btn.style.color='#fff';btn.style.borderColor='#0ea5e9';}
    render();
  };
  window.setTheme=function(th){
    curTheme=th;
    document.querySelectorAll('.filter-btn[id^="tf"]').forEach(function(b){b.classList.remove('active');b.style.background='#0f172a';b.style.color='#94a3b8';b.style.borderColor='#1e293b';});
    var btn=document.getElementById('tf'+(th||'ALL'));
    if(btn){btn.classList.add('active');btn.style.background='#0ea5e9';btn.style.color='#fff';btn.style.borderColor='#0ea5e9';}
    render();
  };
  window.filterSpots=function(){
    console.log('🔍 [DEBUG] filterSpots() function called!');
    var inp=document.getElementById('searchInput');
    console.log('🔍 [DEBUG] Input element:', inp);
    curSearch=inp?inp.value:'';
    console.log('🔍 [DEBUG] curSearch value:', curSearch);
    
    render();
  };
  window.toggleFavSpot=function(btn,id,name,country,flag,city,category){
    if(!window.TM)return;
    var isFav=window.TM.isFav(id);
    var icon=btn.querySelector('.material-symbols-outlined');
    if(isFav){
      window.TM.removeFav(id);
      if(icon){icon.style.setProperty('font-variation-settings',"'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24");icon.style.color='#94a3b8';}
    }else{
      window.TM.addFav({id:id,name:name,country:country,flag:flag,city:city,category:category,savedAt:new Date().toISOString()});
      if(icon){icon.style.setProperty('font-variation-settings',"'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24");icon.style.color='#f43f5e';}
    }
  };

  if(curCountry){window.setCountry(curCountry);}
  if(curTheme){window.setTheme(curTheme);}
  
  // URL 파라미터에서 검색어 가져오기
  var urlParams = new URLSearchParams(window.location.search);
  var searchParam = urlParams.get('search');
  if(searchParam){
    var input = document.getElementById('searchInput');
    if(input){
      input.value = searchParam;
      curSearch = searchParam;
      console.log('[Init] Auto-search from URL:', searchParam);
    }
  }
  
  // ✅ 이벤트 리스너 설정 함수
  function setupSearchListeners(){
    var searchInput = document.getElementById('searchInput');
    console.log('🔧 [Setup] Trying to attach listeners. Element:', searchInput);
    
    if(searchInput){
      console.log('✅ [Setup] searchInput found! Attaching event listeners...');
      
      // input 이벤트 (타이핑할 때마다)
      searchInput.addEventListener('input', function(e){
        var val = e.target.value;
        console.log('📝 Input event detected!', val);
        
        // 실시간 입력 표시
        var liveText = document.getElementById('liveInputText');
        var eventStatus = document.getElementById('eventStatus');
        if(liveText) liveText.textContent = val || '(비어있음)';
        if(eventStatus) eventStatus.textContent = '✅ 이벤트 발생! (' + new Date().toLocaleTimeString() + ')';
        
        // ✅ curSearch 직접 업데이트
        curSearch = val;
        console.log('✅ [addEventListener] curSearch updated to:', curSearch);
        render();
      });
      
      // Enter 키 이벤트
      searchInput.addEventListener('keydown', function(e){
        if(e.key === 'Enter'){
          console.log('⏎ Enter key pressed!');
          curSearch = e.target.value;
          console.log('✅ [Enter] curSearch updated to:', curSearch);
          render();
        }
      });
      
      console.log('✅ [Setup] Event listeners attached successfully');
    } else {
      console.error('❌ [Setup] searchInput element not found!');
    }
  }
  
  // 즉시 실행
  setupSearchListeners();
  
  // DOMContentLoaded 이후에도 실행 (안전장치)
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setupSearchListeners);
  }
  
  render();
})();
  </script>
  `

  return baseLayout('여행지 탐색', content, 'dest')
}

// 여행지 상세 데이터
const SPOT_DETAIL: Record<string, {
  id: string, name: string, city: string, country: string, countryName: string, flag: string
  category: string, tags: string[], rating: number, reviews: number, budget: string
  img: string, imgs: string[], desc: string, bestTime: string, days: string, theme: string
  highlights: string[], tips: string[], transport: string[], food: string[]
}> = {
  'jp-tokyo': {
    id:'jp-tokyo', name:'도쿄 도심 탐방', city:'도쿄', country:'JP', countryName:'일본', flag:'🇯🇵',
    category:'city', tags:['#쇼핑','#음식','#문화','#애니'], rating:4.9, reviews:12430, budget:'중',
    img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop',
    imgs:['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=320&fit=crop','https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&h=320&fit=crop','https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&h=320&fit=crop'],
    desc:'세계에서 가장 흥미로운 도시 중 하나. 시부야 스크램블에서 아키하바라 전자상가, 아사쿠사 전통 거리까지 모든 것이 공존합니다.',
    bestTime:'3~5월(벚꽃), 10~11월(단풍)', days:'3~5일', theme:'city',
    highlights:['시부야 스크램블 교차로','도쿄 스카이트리 전망','아사쿠사 센소지 절','아키하바라 전자 상가','하라주쿠 다케시타 거리','신주쿠 골든가이'],
    tips:['IC 카드(스이카) 필수 구매','교통패스(도쿄프리킷퍼) 활용','편의점 음식도 훌륭','신발 끈 없는 신발 권장(신사 방문시)'],
    transport:['나리타 공항 → 닛포리역 (케이세이 스카이라이너 41분)','하네다 공항 → 도쿄역 (모노레일+JR 30분)'],
    food:['스시 다이(築地市場)','이치란 라멘','모스버거','팀호완'],
  },
  'th-phuket': {
    id:'th-phuket', name:'푸켓 해변 리조트', city:'푸켓', country:'TH', countryName:'태국', flag:'🇹🇭',
    category:'beach', tags:['#에메랄드바다','#리조트','#스노클링','#선셋'], rating:4.9, reviews:11000, budget:'중',
    img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop',
    imgs:['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=320&fit=crop','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=320&fit=crop','https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=500&h=320&fit=crop'],
    desc:'태국 최고의 해변 휴양지. 에메랄드빛 안다만 해와 화려한 리조트, 신선한 해산물이 기다리는 곳.',
    bestTime:'11월~4월(건기)', days:'4~7일', theme:'beach',
    highlights:['빠통 비치 수영','피피섬 당일치기','팡아만 석회암 절벽','프롬텝 곶 일몰','빅붓다 사원','제임스본드섬'],
    tips:['11~4월 건기 강력 추천','선크림 SPF50+ 필수','그랩(Grab) 앱 설치','현지 SIM 공항서 구매'],
    transport:['인천 → 푸켓 직항 약 5.5시간','공항 → 빠통해변 (그랩 약 300바트)'],
    food:['로컬 해산물 BBQ','빠통 나이트마켓','깟말라이 레스토랑'],
  },
  'id-bali': {
    id:'id-bali', name:'발리 감성 여행', city:'발리', country:'ID', countryName:'인도네시아', flag:'🇮🇩',
    category:'beach', tags:['#우붓','#꾸따비치','#인피니티풀','#인스타'], rating:4.9, reviews:16800, budget:'중',
    img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop',
    imgs:['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=320&fit=crop','https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&h=320&fit=crop','https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=320&fit=crop'],
    desc:'신들의 섬. 울창한 논다랑 논밭, 웅장한 사원, 세계적인 서핑 스팟과 럭셔리 리조트가 모두 있는 곳.',
    bestTime:'4~9월(건기)', days:'5~7일', theme:'beach',
    highlights:['우붓 논다랑 트레킹','따나롯 사원 일몰','스미냑 비치 클럽','아궁 화산 트레킹','바투르 호수 뷰','우붓 왕궁'],
    tips:['4~9월 건기가 최적','그랩은 쿠타/스미냑만 가능','우붓은 오젝(오토바이 택시) 이용','사원 방문시 사롱 필수'],
    transport:['인천 → 응우라라이 공항 직항 약 7시간','공항 → 쿠타 (택시 약 30분, 15만 루피아)'],
    food:['나시고렝','미고렝','사테','부부숲 레스토랑 우붓'],
  },
}

export const destinationDetailPage = (id: string) => {
  const s = SPOT_DETAIL[id] || ALL_SPOTS.find(x => x.id === id)
  if (!s) return baseLayout('여행지 상세', '<div class="p-8 text-center text-slate-400">여행지 정보를 찾을 수 없습니다.</div>', 'dest')

  const imgs = (s as any).imgs || [s.img]
  const highlights = (s as any).highlights || []
  const tips = (s as any).tips || []
  const transport = (s as any).transport || []
  const food = (s as any).food || []
  const budgetColor = s.budget==='하'?'#22c55e':s.budget==='중'?'#f59e0b':s.budget==='중상'?'#f97316':'#ef4444'
  const budgetLabel = s.budget==='하'?'💚 저예산':s.budget==='중'?'💛 중간':s.budget==='중상'?'🧡 중상':'❤️ 고급'

  const content = `
  <!-- 헤더 -->
  <header class="sticky top-0 z-40 px-4 py-3 border-b" style="background:#030712ee;backdrop-filter:blur(16px);border-color:#1e293b">
    <div class="flex items-center gap-3">
      <a href="/destinations" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#0f172a;border:1px solid #1e293b">
        <span class="material-symbols-outlined text-slate-300 text-xl">arrow_back</span>
      </a>
      <h1 class="flex-1 font-bold text-base text-slate-100">${s.flag} ${s.city}</h1>
      <button onclick="shareDest()" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#0f172a;border:1px solid #1e293b">
        <span class="material-symbols-outlined text-slate-300 text-xl">share</span>
      </button>
      <button id="favBtn" onclick="toggleFav(this)" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#0f172a;border:1px solid #1e293b">
        <span class="material-symbols-outlined text-xl" style="color:#94a3b8">favorite</span>
      </button>
    </div>
  </header>

  <!-- 이미지 캐러셀 -->
  <div class="relative overflow-hidden" style="height:260px">
    <div id="imgCarousel" class="flex h-full transition-transform duration-300">
      ${imgs.map((img: string, i: number) => `<img src="${img}" class="flex-shrink-0 w-full h-full object-cover" alt="${s.city} ${i+1}">`).join('')}
    </div>
    <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
      ${imgs.map((_: string, i: number) => `<button onclick="goImg(${i})" class="w-1.5 h-1.5 rounded-full transition-all dot-btn" style="background:${i===0?'#fff':'rgba(255,255,255,.4)'}"></button>`).join('')}
    </div>
  </div>

  <div class="px-4 pb-32 pt-5 space-y-5">

    <!-- 기본 정보 -->
    <div>
      <div class="flex items-start gap-2 mb-2">
        <div class="flex-1">
          <h2 class="text-xl font-black text-slate-100">${s.name}</h2>
          <p class="text-sm text-slate-400 mt-1">${s.desc}</p>
        </div>
      </div>
      <div class="flex gap-2 flex-wrap mt-3">
        ${(s.tags && Array.isArray(s.tags)) ? s.tags.map((t: string) => `<span class="badge" style="background:#0ea5e911;color:#38bdf8;border:1px solid #0ea5e922">${t}</span>`).join('') : ''}
      </div>
      <div class="grid grid-cols-3 gap-2 mt-4">
        <div class="card p-3 text-center">
          <p class="text-lg font-black text-slate-100">${s.rating}</p>
          <p class="text-xs text-yellow-400">★ 평점</p>
        </div>
        <div class="card p-3 text-center">
          <p class="text-sm font-black" style="color:${budgetColor}">${budgetLabel}</p>
          <p class="text-xs text-slate-500">예산</p>
        </div>
        <div class="card p-3 text-center">
          <p class="text-sm font-black text-slate-100">${s.days}</p>
          <p class="text-xs text-slate-500">추천 기간</p>
        </div>
      </div>
      <div class="card p-3 mt-2 flex items-center gap-2">
        <span class="material-symbols-outlined text-sky-400 text-xl">calendar_today</span>
        <div>
          <p class="text-xs text-slate-500">최적 여행 시기</p>
          <p class="text-sm font-bold text-slate-200">${s.bestTime}</p>
        </div>
      </div>
    </div>

    ${highlights.length ? `
    <!-- 주요 명소 -->
    <div>
      <h3 class="font-bold text-sm text-slate-100 mb-3">🗺 주요 명소</h3>
      <div class="space-y-2">
        ${highlights.map((h: string, i: number) => `
        <div class="flex items-center gap-3 card p-3">
          <span class="w-7 h-7 flex items-center justify-center rounded-full text-xs font-black sky" style="background:#0ea5e922">${i+1}</span>
          <p class="text-sm text-slate-200">${h}</p>
        </div>`).join('')}
      </div>
    </div>` : ''}

    ${tips.length ? `
    <!-- 여행 팁 -->
    <div>
      <h3 class="font-bold text-sm text-slate-100 mb-3">💡 여행 팁</h3>
      <div class="card p-4 space-y-2">
        ${tips.map((t: string) => `<p class="text-sm text-slate-300 flex items-start gap-2"><span class="sky text-xs mt-0.5">✓</span>${t}</p>`).join('')}
      </div>
    </div>` : ''}

    ${transport.length ? `
    <!-- 교통 정보 -->
    <div>
      <h3 class="font-bold text-sm text-slate-100 mb-3">✈️ 교통 정보</h3>
      <div class="card p-4 space-y-2">
        ${transport.map((t: string) => `<p class="text-sm text-slate-300">${t}</p>`).join('')}
      </div>
    </div>` : ''}

    ${food.length ? `
    <!-- 추천 음식 -->
    <div>
      <h3 class="font-bold text-sm text-slate-100 mb-3">🍽 추천 음식 / 식당</h3>
      <div class="flex gap-2 flex-wrap">
        ${food.map((f: string) => `<span class="badge" style="background:#f59e0b11;color:#fbbf24;border:1px solid #f59e0b33">${f}</span>`).join('')}
      </div>
    </div>` : ''}

    <!-- 여행 준비 도구 -->
    <div>
      <h3 class="font-bold text-sm text-slate-100 mb-3">🛠 여행 준비 도구</h3>
      <div class="grid grid-cols-2 gap-2">
        <a href="/tips?tab=currency&city=${encodeURIComponent(s.city)}&country=${encodeURIComponent(s.countryName)}" 
           class="card p-3 flex items-center gap-2 press">
          <span class="text-2xl">🏦</span>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-slate-200">환전소 찾기</p>
            <p class="text-[10px] text-slate-500 mt-0.5">${s.city} 환전 정보</p>
          </div>
        </a>
        <a href="/tips?tab=phrase" 
           class="card p-3 flex items-center gap-2 press">
          <span class="text-2xl">🗣️</span>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-slate-200">현지 회화</p>
            <p class="text-[10px] text-slate-500 mt-0.5">기본 회화 보기</p>
          </div>
        </a>
        <a href="/tips?tab=visa" 
           class="card p-3 flex items-center gap-2 press">
          <span class="text-2xl">🛂</span>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-slate-200">비자 정보</p>
            <p class="text-[10px] text-slate-500 mt-0.5">입국 요건 확인</p>
          </div>
        </a>
        <a href="/tips?tab=packing" 
           class="card p-3 flex items-center gap-2 press">
          <span class="text-2xl">🎒</span>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-slate-200">짐 챙기기</p>
            <p class="text-[10px] text-slate-500 mt-0.5">준비물 체크</p>
          </div>
        </a>
      </div>
    </div>

  </div>

  <!-- 하단 CTA -->
  <div class="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4">
    <a href="/planner?dest=${s.id}&city=${encodeURIComponent(s.city)}&country=${encodeURIComponent(s.countryName)}&flag=${encodeURIComponent(s.flag)}"
       class="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-white press"
       style="background:linear-gradient(135deg,#0ea5e9,#6366f1)">
      <span class="material-symbols-outlined">add_circle</span>
      이 여행지로 일정 만들기
    </a>
  </div>

  <script>
(function(){
  var destId='${s.id}';
  var cur=0;
  var total=${imgs.length};
  function updateCarousel(){
    var c=document.getElementById('imgCarousel');
    if(c)c.style.transform='translateX(-'+cur*100+'%)';
    document.querySelectorAll('.dot-btn').forEach(function(d,i){
      d.style.background=i===cur?'#fff':'rgba(255,255,255,.4)';
      d.style.width=i===cur?'16px':'6px';
    });
  }
  window.goImg=function(i){cur=i;updateCarousel();};

  var favBtn=document.getElementById('favBtn');
  function updateFavBtn(){
    if(!favBtn||!window.TM)return;
    var icon=favBtn.querySelector('.material-symbols-outlined');
    var isFav=window.TM.isFav(destId);
    if(icon){
      icon.style.setProperty('font-variation-settings',"'FILL' "+(isFav?1:0)+",'wght' 400,'GRAD' 0,'opsz' 24");
      icon.style.color=isFav?'#f43f5e':'#94a3b8';
    }
  }
  window.toggleFav=function(){
    if(!window.TM)return;
    var isFav=window.TM.isFav(destId);
    if(isFav){
      window.TM.removeFav(destId);
    }else{
      window.TM.addFav({id:destId,name:'${s.name}',country:'${s.countryName}',flag:'${s.flag}',city:'${s.city}',category:'${s.category}',savedAt:new Date().toISOString()});
    }
    updateFavBtn();
  };
  window.shareDest=function(){
    if(navigator.share){navigator.share({title:'${s.city} 여행',url:location.href});}
    else{navigator.clipboard&&navigator.clipboard.writeText(location.href);alert('링크가 복사되었습니다!');}
  };

  if(window.TM){window.TM.addRecent({id:destId,type:'dest',name:'${s.name}',country:'${s.countryName}',flag:'${s.flag}',city:'${s.city}'});}
  updateFavBtn();
})();
  </script>
  `

  return baseLayout(`${s.city} - ${s.name}`, content, 'dest')
}

// ALL_SPOTS도 export
export { ALL_SPOTS }

function spotCard(s: typeof ALL_SPOTS[0]) {
  const budgetColor = s.budget==='하'?'#22c55e':s.budget==='중'?'#f59e0b':s.budget==='중상'?'#f97316':'#ef4444'
  const budgetLabel = s.budget==='하'?'💚 저예산':s.budget==='중'?'💛 중간':s.budget==='중상'?'🧡 중상':'❤️ 고급'
  return `
<div class="card overflow-hidden spot-card">
  <div class="relative" style="height:160px">
    <img src="${s.img}" class="w-full h-full object-cover" alt="${s.city}">
    <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(3,7,18,.85) 0%,transparent 55%)"></div>
    <div class="absolute top-2 left-2 flex gap-1">
      <span class="badge" style="background:#0f172a99;color:#94a3b8;border:1px solid #1e293b">${s.flag} ${s.countryName}</span>
      <span class="badge" style="background:${budgetColor}22;color:${budgetColor};border:1px solid ${budgetColor}44">${budgetLabel}</span>
    </div>
    <div class="absolute bottom-0 left-0 right-0 p-3">
      <p class="text-white text-base font-black">${s.city} - ${s.name}</p>
      <p class="text-slate-400 text-xs">${s.desc}</p>
    </div>
  </div>
  <div class="p-3">
    <div class="flex items-center gap-3 mb-2 text-xs text-slate-400">
      <span><span class="material-symbols-outlined text-sm" style="vertical-align:middle;color:#f59e0b">star</span> ${s.rating} (${s.reviews.toLocaleString()})</span>
      <span>📅 ${s.bestTime}</span>
      <span>⏱ ${s.days}</span>
    </div>
    <div class="flex gap-1 flex-wrap">
      ${(s.tags && Array.isArray(s.tags)) ? s.tags.map(t => `<span class="text-[10px] px-2 py-0.5 rounded-full" style="background:#0ea5e911;color:#38bdf8">${t}</span>`).join('') : ''}
    </div>
    <div class="space-y-2 mt-3">
      <div class="flex gap-2">
        <a href="/destination/${s.id}" class="flex-1 text-center py-2 rounded-xl text-xs font-bold press sky" style="background:#0ea5e922;border:1px solid #0ea5e944">상세 보기</a>
        <a href="/planner?dest=${s.id}&city=${encodeURIComponent(s.city)}&country=${encodeURIComponent(s.countryName)}" class="flex-1 text-center py-2 rounded-xl text-xs font-bold press text-white" style="background:#0ea5e9">일정 추가</a>
      </div>
      <a href="/tips?tab=currency&city=${encodeURIComponent(s.city)}&country=${encodeURIComponent(s.countryName)}" class="w-full flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold press" style="background:#22c55e11;color:#22c55e;border:1px solid #22c55e33">
        <span class="material-symbols-outlined text-sm">account_balance</span>
        ${s.city} 환전소 찾기
      </a>
    </div>
  </div>
</div>`
}

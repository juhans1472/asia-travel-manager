import { baseLayout } from '../layout'

export const tipsPage = (tab = 'currency') => {
  const content = `
  <style>
    .tab-btn{transition:all .15s}
    .tab-btn.active{background:#0ea5e9;color:#fff;border-color:#0ea5e9}
  </style>

  <!-- 헤더 -->
  <header class="sticky top-0 z-40 px-4 py-3 border-b" style="background:#030712ee;backdrop-filter:blur(16px);border-color:#1e293b">
    <div class="flex items-center gap-3">
      <a href="/" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#0f172a;border:1px solid #1e293b">
        <span class="material-symbols-outlined text-slate-300 text-xl">arrow_back</span>
      </a>
      <h1 class="flex-1 font-bold text-base text-slate-100">여행 꿀팁</h1>
    </div>
    <!-- 탭 -->
    <div class="flex gap-2 overflow-x-auto ns pb-1 mt-3">
      ${[
        {key:'currency', label:'💴 환율'},
        {key:'phrase',   label:'🗣️ 회화'},
        {key:'visa',     label:'🛂 비자'},
        {key:'packing',  label:'🎒 짐 챙기기'},
        {key:'emergency',label:'🆘 긴급 정보'},
      ].map(t => `<button onclick="switchTip('${t.key}')" id="ttab_${t.key}" class="tab-btn flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-bold press${t.key===tab?' active':''}" style="background:#0f172a;border-color:#1e293b;color:#94a3b8${t.key===tab?';background:#0ea5e9;color:#fff;border-color:#0ea5e9':''}">${t.label}</button>`).join('')}
    </div>
  </header>

  <div class="pb-28 pt-4 px-4">

    <!-- 환율 계산기 -->
    <div id="tip_currency" class="${tab!=='currency'?'hidden':''} space-y-4">
      <div class="card p-4">
        <h3 class="font-bold text-sm text-slate-200 mb-3">💴 환율 계산기 (참고용)</h3>
        <p class="text-xs text-slate-500 mb-3">실시간이 아닌 참고용 환율입니다. 실제 환율은 달라질 수 있습니다.</p>
        <div class="space-y-3">
          <div>
            <label class="text-xs text-slate-500 mb-1 block">금액 (원)</label>
            <input type="number" id="krwAmount" placeholder="100000" value="100000" oninput="calcRate()">
          </div>
          <div class="grid grid-cols-2 gap-3">
            ${[
              {code:'JPY', name:'일본 엔', flag:'🇯🇵', rate:0.0091, unit:'¥'},
              {code:'THB', name:'태국 바트', flag:'🇹🇭', rate:0.026, unit:'฿'},
              {code:'VND', name:'베트남 동', flag:'🇻🇳', rate:39.5, unit:'₫'},
              {code:'TWD', name:'대만 달러', flag:'🇹🇼', rate:0.024, unit:'NT$'},
              {code:'SGD', name:'싱가포르 달러', flag:'🇸🇬', rate:0.00056, unit:'S$'},
              {code:'IDR', name:'인도네시아 루피아', flag:'🇮🇩', rate:11.5, unit:'Rp'},
              {code:'MYR', name:'말레이시아 링깃', flag:'🇲🇾', rate:0.0033, unit:'RM'},
              {code:'USD', name:'미국 달러', flag:'🇺🇸', rate:0.00073, unit:'$'},
            ].map(c => `
            <div class="card p-3">
              <p class="text-xs text-slate-500 mb-1">${c.flag} ${c.name}</p>
              <p class="text-base font-black sky" id="rate_${c.code}">계산 중...</p>
              <p class="text-[10px] text-slate-600">1원 ≈ ${c.rate.toFixed(4)} ${c.unit}</p>
            </div>`).join('')}
          </div>
        </div>
      </div>
      <div class="card p-4">
        <h4 class="font-bold text-sm text-slate-200 mb-2">💡 환전 팁</h4>
        <ul class="space-y-1.5 text-xs text-slate-400">
          <li>• 공항보다 시중 은행 또는 하나은행 앱이 유리</li>
          <li>• 베트남 동은 현지 ATM이 편리 (수수료 확인)</li>
          <li>• 태국 슈퍼리치 환전소가 환율 우대</li>
          <li>• 일본은 세븐일레븐 ATM (Wise/트래블로그 카드)</li>
          <li>• 트래블로그 체크카드 필수 지참 추천</li>
        </ul>
      </div>
    </div>

    <!-- 현지 회화 -->
    <div id="tip_phrase" class="${tab!=='phrase'?'hidden':''} space-y-4">
      ${[
        {country:'일본', flag:'🇯🇵', color:'#f43f5e', phrases:[
          {ko:'감사합니다', local:'아리가토 고자이마스', latin:'Arigatou gozaimasu'},
          {ko:'얼마예요?', local:'이쿠라 데스카?', latin:'Ikura desu ka?'},
          {ko:'어디예요?', local:'도코 데스카?', latin:'Doko desu ka?'},
          {ko:'맛있어요', local:'오이시이 데스', latin:'Oishii desu'},
          {ko:'영어 됩니까?', local:'에이고 와 하나세마스카?', latin:'Eigo wa hanasemasu ka?'},
          {ko:'도와주세요', local:'타스케테 쿠다사이', latin:'Tasukete kudasai'},
        ]},
        {country:'태국', flag:'🇹🇭', color:'#f59e0b', phrases:[
          {ko:'감사합니다', local:'콥쿤 크랍/카', latin:'Khob khun khrab/kha'},
          {ko:'얼마예요?', local:'타오라이 크랍/카?', latin:'Thao rai khrab/kha?'},
          {ko:'맛있어요', local:'아로이 마크', latin:'Aroi mak'},
          {ko:'화장실 어디예요?', local:'홍남 유 티나이?', latin:'Hongnam yu thinai?'},
          {ko:'깎아주세요', local:'롯 다이 마이?', latin:'Lot dai mai?'},
          {ko:'도와주세요', local:'추아이 두아이', latin:'Chuai duai'},
        ]},
        {country:'베트남', flag:'🇻🇳', color:'#22c55e', phrases:[
          {ko:'감사합니다', local:'깜 언 반', latin:'Cam on ban'},
          {ko:'얼마예요?', local:'바오 니에우 띠엔?', latin:'Bao nhieu tien?'},
          {ko:'맛있어요', local:'응온 럼', latin:'Ngon lam'},
          {ko:'어디예요?', local:'어 더우?', latin:'O dau?'},
          {ko:'너무 비싸요', local:'닷 꽈', latin:'Dat qua'},
          {ko:'도와주세요', local:'끄우 또이 버이', latin:'Cuu toi voi'},
        ]},
      ].map(c => `
      <div class="card overflow-hidden">
        <div class="px-4 py-3 flex items-center gap-2" style="background:${c.color}22;border-bottom:1px solid ${c.color}33">
          <span class="text-xl">${c.flag}</span>
          <h3 class="font-bold text-sm text-slate-200">${c.country} 기본 회화</h3>
        </div>
        <div class="divide-y" style="border-color:#1e293b">
          ${c.phrases.map(p => `
          <div class="px-4 py-3 flex items-center justify-between gap-3">
            <div class="flex-1">
              <p class="text-xs text-slate-500">${p.ko}</p>
              <p class="text-sm font-bold text-slate-200">${p.local}</p>
              <p class="text-[10px] text-slate-600">${p.latin}</p>
            </div>
            <button onclick="speakPhrase('${p.local}')" class="w-8 h-8 flex items-center justify-center rounded-full press sky" style="background:#0ea5e911;border:1px solid #0ea5e933">
              <span class="material-symbols-outlined text-sm">volume_up</span>
            </button>
          </div>`).join('')}
        </div>
      </div>`).join('')}
    </div>

    <!-- 비자 정보 -->
    <div id="tip_visa" class="${tab!=='visa'?'hidden':''} space-y-3">
      <div class="card p-4">
        <h3 class="font-bold text-sm text-slate-200 mb-1">🛂 한국인 비자 안내</h3>
        <p class="text-xs text-slate-500 mb-4">출국 전 반드시 최신 정보를 확인하세요</p>
        ${[
          {country:'일본', flag:'🇯🇵', type:'무비자', days:'90일', note:'관광 목적', color:'#22c55e'},
          {country:'태국', flag:'🇹🇭', type:'무비자', days:'30일', note:'무비자 입국', color:'#22c55e'},
          {country:'베트남', flag:'🇻🇳', type:'무비자', days:'45일', note:'2023년부터 45일로 연장', color:'#22c55e'},
          {country:'대만', flag:'🇹🇼', type:'무비자', days:'90일', note:'관광 목적', color:'#22c55e'},
          {country:'싱가포르', flag:'🇸🇬', type:'무비자', days:'30일', note:'관광 목적', color:'#22c55e'},
          {country:'인도네시아', flag:'🇮🇩', type:'무비자', days:'30일', note:'발리 포함 관광', color:'#22c55e'},
          {country:'말레이시아', flag:'🇲🇾', type:'무비자', days:'90일', note:'관광 목적', color:'#22c55e'},
          {country:'홍콩', flag:'🇭🇰', type:'무비자', days:'90일', note:'관광 목적', color:'#22c55e'},
        ].map(v => `
        <div class="flex items-center gap-3 py-2.5 border-b" style="border-color:#1e293b">
          <span class="text-2xl">${v.flag}</span>
          <div class="flex-1">
            <p class="text-sm font-bold text-slate-200">${v.country}</p>
            <p class="text-xs text-slate-500">${v.note}</p>
          </div>
          <div class="text-right">
            <span class="badge" style="background:${v.color}22;color:${v.color};border:1px solid ${v.color}44">${v.type}</span>
            <p class="text-xs text-slate-500 mt-0.5">${v.days}</p>
          </div>
        </div>`).join('')}
        <p class="text-xs text-slate-600 mt-3">⚠️ 비자 정책은 변경될 수 있으니 출국 전 반드시 외교부 또는 각 대사관에서 확인하세요</p>
      </div>
      <div class="card p-4">
        <h4 class="font-bold text-sm text-slate-200 mb-2">📋 공통 주의사항</h4>
        <ul class="space-y-1.5 text-xs text-slate-400">
          <li>• 여권 유효기간: 귀국일 기준 최소 6개월 이상 남아있어야 함</li>
          <li>• 왕복 항공권 및 체류 증명 서류 지참 권장</li>
          <li>• 출입국 신고서: 일부 국가 공항에서 작성 필요</li>
          <li>• 여행자 보험 필수 가입 권장</li>
        </ul>
      </div>
    </div>

    <!-- 짐 챙기기 -->
    <div id="tip_packing" class="${tab!=='packing'?'hidden':''} space-y-3">
      ${[
        {title:'필수 서류', icon:'📄', color:'#0ea5e9', items:['여권 (사본 별도 보관)','항공권 e-ticket','숙소 예약 확인서','여행자 보험 증서','긴급 연락처 메모']},
        {title:'전자기기', icon:'🔌', color:'#a855f7', items:['스마트폰 + 충전기','보조배터리 (기내반입)','멀티어댑터/변환 플러그','이어폰/헤드셋','카메라 (선택)']},
        {title:'건강/위생', icon:'💊', color:'#22c55e', items:['상비약 (소화제, 지사제, 진통제)','선크림 SPF50+','모기 기피제 (동남아)','마스크','손 소독제']},
        {title:'의류/편의', icon:'👕', color:'#f59e0b', items:['가벼운 겉옷 (냉방 대비)','슬리퍼/편한 신발','우산/우비','수영복 (해변 지역)','세탁망']},
        {title:'앱 설치', icon:'📱', color:'#38bdf8', items:['Google 지도 (오프라인 저장)','Grab (동남아 택시)','Google 번역 (오프라인 다운)','XE Currency (환율)','Agoda/Airbnb (숙소)']},
      ].map(p => `
      <div class="card p-4">
        <h3 class="font-bold text-sm text-slate-200 mb-3">${p.icon} ${p.title}</h3>
        <div class="space-y-2" id="pack_${p.title}">
          ${p.items.map((item, i) => `
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded" style="accent-color:#0ea5e9" onchange="savePacking()">
            <span class="text-sm text-slate-300">${item}</span>
          </label>`).join('')}
        </div>
      </div>`).join('')}
    </div>

    <!-- 긴급 정보 -->
    <div id="tip_emergency" class="${tab!=='emergency'?'hidden':''} space-y-3">
      ${[
        {country:'일본', flag:'🇯🇵', color:'#f43f5e',
          nums:[{label:'긴급신고(경찰)', num:'110'},{label:'소방/구조', num:'119'},{label:'한국대사관', num:'+81-3-3452-7611'}],
          tips:['지진 발생시: 테이블 아래로 대피','JR EAST 앱으로 교통 확인','119는 구급차+소방 통합'],
        },
        {country:'태국', flag:'🇹🇭', color:'#f59e0b',
          nums:[{label:'긴급신고', num:'191'},{label:'소방/구조', num:'199'},{label:'관광경찰', num:'1155'},{label:'한국대사관', num:'+66-2-247-7537'}],
          tips:['관광경찰은 영어 가능','택시는 미터기 사용 요청','물 마실 때 생수 구입'],
        },
        {country:'베트남', flag:'🇻🇳', color:'#22c55e',
          nums:[{label:'경찰', num:'113'},{label:'소방', num:'114'},{label:'구급', num:'115'},{label:'한국대사관(하노이)', num:'+84-24-3831-5110'}],
          tips:['소매치기 주의 (가방 앞으로)','오토바이 픽소매치기 주의','여행자 보험 필수'],
        },
      ].map(e => `
      <div class="card overflow-hidden">
        <div class="px-4 py-3 flex items-center gap-2" style="background:${e.color}22;border-bottom:1px solid ${e.color}33">
          <span class="text-xl">${e.flag}</span>
          <h3 class="font-bold text-sm text-slate-200">${e.country} 긴급 연락처</h3>
        </div>
        <div class="p-4 space-y-2">
          ${e.nums.map(n => `
          <div class="flex items-center justify-between">
            <span class="text-xs text-slate-400">${n.label}</span>
            <a href="tel:${n.num}" class="text-sm font-black sky press">${n.num}</a>
          </div>`).join('')}
          <hr style="border-color:#1e293b;margin:8px 0">
          ${e.tips.map(t => `<p class="text-xs text-slate-400">• ${t}</p>`).join('')}
        </div>
      </div>`).join('')}
      <div class="card p-4">
        <h4 class="font-bold text-sm text-slate-200 mb-2">🆘 해외 여행 공통 긴급 연락처</h4>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs text-slate-400">외교부 24시간 영사콜센터</span>
            <a href="tel:+82-2-3210-0404" class="text-sm font-black sky">+82-2-3210-0404</a>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-slate-400">해외 사건사고</span>
            <a href="tel:+82-2-3210-0404" class="text-sm font-black sky">+82-2-3210-0404</a>
          </div>
        </div>
      </div>
    </div>

  </div>

  <script>
(function(){
  var RATES={JPY:{rate:0.0091,unit:'¥',decimals:0},THB:{rate:0.026,unit:'฿',decimals:1},VND:{rate:39.5,unit:'₫',decimals:0},TWD:{rate:0.024,unit:'NT$',decimals:1},SGD:{rate:0.00056,unit:'S$',decimals:2},IDR:{rate:11.5,unit:'Rp',decimals:0},MYR:{rate:0.0033,unit:'RM',decimals:2},USD:{rate:0.00073,unit:'$',decimals:2}};

  window.calcRate=function(){
    var inp=document.getElementById('krwAmount');
    var krw=inp?parseFloat(inp.value)||0:0;
    Object.keys(RATES).forEach(function(code){
      var r=RATES[code];
      var val=(krw*r.rate).toFixed(r.decimals);
      var el=document.getElementById('rate_'+code);
      if(el)el.textContent=r.unit+' '+parseFloat(val).toLocaleString();
    });
  };

  window.switchTip=function(key){
    ['currency','phrase','visa','packing','emergency'].forEach(function(k){
      var btn=document.getElementById('ttab_'+k);
      var panel=document.getElementById('tip_'+k);
      if(k===key){
        if(btn){btn.classList.add('active');btn.style.background='#0ea5e9';btn.style.color='#fff';btn.style.borderColor='#0ea5e9';}
        if(panel)panel.classList.remove('hidden');
      }else{
        if(btn){btn.classList.remove('active');btn.style.background='#0f172a';btn.style.color='#94a3b8';btn.style.borderColor='#1e293b';}
        if(panel)panel.classList.add('hidden');
      }
    });
  };

  window.speakPhrase=function(text){
    if('speechSynthesis' in window){
      var u=new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(u);
    }else{
      alert(text);
    }
  };

  window.savePacking=function(){};

  window.calcRate();
})();
  </script>
  `

  return baseLayout('여행 꿀팁', content, 'tips')
}

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
      
      <!-- 실시간 환율 조회 -->
      <div class="card p-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-bold text-sm text-slate-200">💴 실시간 환율</h3>
          <button onclick="loadRealRates()" class="text-xs px-3 py-1 rounded-full press sky" style="background:#0ea5e922;border:1px solid #0ea5e944">
            <span class="material-symbols-outlined text-xs" style="vertical-align:middle">refresh</span> 새로고침
          </button>
        </div>
        <p class="text-xs text-slate-500 mb-3" id="rateTime">실시간 환율을 불러오는 중...</p>
        <div class="grid grid-cols-2 gap-3" id="realRatesGrid">
          ${[
            {code:'JPY', name:'일본 엔', flag:'🇯🇵'},
            {code:'THB', name:'태국 바트', flag:'🇹🇭'},
            {code:'VND', name:'베트남 동', flag:'🇻🇳'},
            {code:'TWD', name:'대만 달러', flag:'🇹🇼'},
            {code:'SGD', name:'싱가포르 달러', flag:'🇸🇬'},
            {code:'IDR', name:'인도네시아 루피아', flag:'🇮🇩'},
            {code:'MYR', name:'말레이시아 링깃', flag:'🇲🇾'},
            {code:'HKD', name:'홍콩 달러', flag:'🇭🇰'},
          ].map(c => `
          <div class="card p-3">
            <p class="text-xs text-slate-500 mb-1">${c.flag} ${c.name}</p>
            <p class="text-base font-black sky" id="realRate_${c.code}">로딩중...</p>
          </div>`).join('')}
        </div>
      </div>

      <!-- 환전 계산기 -->
      <div class="card p-4">
        <h3 class="font-bold text-sm text-slate-200 mb-3">🧮 환전 계산기</h3>
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

      <!-- 환전소 찾기 -->
      <div class="card p-4">
        <h4 class="font-bold text-sm text-slate-200 mb-3">🏦 현지 환전소 찾기</h4>
        <div class="space-y-2 mb-3">
          <label class="text-xs text-slate-500 mb-1 block">국가/도시 선택</label>
          <select id="exchangeCity" onchange="loadExchangeSpots()" style="background:#0f172a;border:1px solid #1e293b;color:#f1f5f9;border-radius:12px;padding:10px 14px;width:100%;outline:none;font-size:14px">
            <option value="">선택하세요</option>
            ${[
              {country:'일본', cities:['도쿄','오사카','교토','삿포로']},
              {country:'태국', cities:['방콕','푸켓','치앙마이','파타야']},
              {country:'베트남', cities:['다낭','하노이','호치민','나트랑']},
              {country:'대만', cities:['타이베이','타이중','가오슝']},
              {country:'싱가포르', cities:['싱가포르']},
              {country:'인도네시아', cities:['발리','자카르타']},
              {country:'말레이시아', cities:['쿠알라룸푸르','페낭']},
              {country:'홍콩', cities:['홍콩']},
            ].map(c => c.cities.map(city => `<option value="${c.country}-${city}">${c.country} - ${city}</option>`).join('')).join('')}
          </select>
        </div>
        <div id="exchangeSpotsList"></div>
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
          <li>• 여행 보험 필수 가입 권장</li>
        </ul>
      </div>
    </div>

    <!-- 짐 챙기기 -->
    <div id="tip_packing" class="${tab!=='packing'?'hidden':''} space-y-3">
      ${[
        {title:'필수 서류', icon:'📄', color:'#0ea5e9', items:['여권 (사본 별도 보관)','항공권 e-ticket','숙소 예약 확인서','여행 보험 증서','긴급 연락처 메모']},
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
          tips:['소매치기 주의 (가방 앞으로)','오토바이 픽소매치기 주의','여행 보험 필수'],
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
  var RATES={JPY:{rate:0.0091,unit:'¥',decimals:0},THB:{rate:0.026,unit:'฿',decimals:1},VND:{rate:39.5,unit:'₫',decimals:0},TWD:{rate:0.024,unit:'NT$',decimals:1},SGD:{rate:0.00056,unit:'S$',decimals:2},IDR:{rate:11.5,unit:'Rp',decimals:0},MYR:{rate:0.0033,unit:'RM',decimals:2},HKD:{rate:0.0093,unit:'HK$',decimals:2},USD:{rate:0.00073,unit:'$',decimals:2}};
  var realRates={};

  // 실시간 환율 불러오기
  window.loadRealRates=function(){
    var timeEl=document.getElementById('rateTime');
    if(timeEl)timeEl.textContent='환율을 불러오는 중...';
    fetch('/api/exchange-rates')
      .then(function(r){return r.json();})
      .then(function(data){
        if(data&&data.rates){
          realRates=data.rates;
          var codes=['JPY','THB','VND','TWD','SGD','IDR','MYR','HKD'];
          codes.forEach(function(code){
            var rate=realRates[code];
            if(rate){
              var decimals=code==='VND'||code==='IDR'||code==='JPY'?0:code==='TWD'||code==='THB'?1:2;
              var el=document.getElementById('realRate_'+code);
              if(el){
                var krw=1;
                var converted=(krw*rate).toFixed(decimals);
                var unit=RATES[code]?RATES[code].unit:code;
                el.textContent=unit+' '+parseFloat(converted).toLocaleString();
              }
            }
          });
          if(timeEl){
            var now=new Date();
            timeEl.textContent='마지막 업데이트: '+now.toLocaleTimeString('ko-KR');
          }
        }
      })
      .catch(function(err){
        console.error('환율 로딩 실패:',err);
        if(timeEl)timeEl.textContent='환율 로딩 실패. 새로고침 버튼을 눌러주세요.';
      });
  };

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

  // 환전소 데이터
  var exchangeSpots={
    '일본-도쿄':[
      {name:'세븐은행 ATM',addr:'도쿄 전역 세븐일레븐',hours:'24시간',tip:'Wise/트래블로그 카드 추천'},
      {name:'JTB 외화환전',addr:'시부야/신주쿠 지점',hours:'10:00-19:00',tip:'현금 환전 우대율'},
      {name:'티켓레인저',addr:'신주쿠/이케부쿠로',hours:'10:00-20:00',tip:'한국어 가능'},
    ],
    '일본-오사카':[
      {name:'세븐은행 ATM',addr:'오사카 전역',hours:'24시간',tip:'수수료 저렴'},
      {name:'난바 환전소',addr:'난바역 인근',hours:'10:00-21:00',tip:'환율 우대'},
    ],
    '일본-교토':[
      {name:'세븐은행 ATM',addr:'교토 전역',hours:'24시간',tip:'편의점 이용'},
      {name:'교토역 환전',addr:'교토역 구내',hours:'09:00-20:00',tip:'역 내 편리'},
    ],
    '일본-삿포로':[
      {name:'세븐은행 ATM',addr:'삿포로 전역',hours:'24시간',tip:'24시간 이용 가능'},
      {name:'삿포로역 환전',addr:'삿포로역 구내',hours:'09:00-19:00',tip:'역 이용객 편리'},
    ],
    '태국-방콕':[
      {name:'슈퍼리치(녹색)',addr:'센트럴월드/프라투남',hours:'09:00-18:00',tip:'최고 환율'},
      {name:'슈퍼리치(주황)',addr:'BTS 나나역 인근',hours:'09:00-18:00',tip:'환율 우수'},
      {name:'발루엔지',addr:'시암파라곤',hours:'10:00-21:00',tip:'쇼핑몰 내 편리'},
    ],
    '태국-푸켓':[
      {name:'슈퍼리치 푸켓',addr:'빠통 해변',hours:'09:00-20:00',tip:'해변가 최고 환율'},
      {name:'정타레이 환전',addr:'정실론 쇼핑몰',hours:'10:00-22:00',tip:'쇼핑 중 환전'},
    ],
    '태국-치앙마이':[
      {name:'슈퍼리치 치앙마이',addr:'님만해민 로드',hours:'09:00-18:00',tip:'시내 중심'},
      {name:'니만 환전소',addr:'님만해민 소이 1',hours:'10:00-20:00',tip:'관광객 많음'},
    ],
    '태국-파타야':[
      {name:'TT환전소',addr:'워킹스트리트 입구',hours:'10:00-22:00',tip:'야경 보기 전 환전'},
      {name:'센트럴페스티벌 환전',addr:'센트럴페스티벌 1층',hours:'10:00-21:00',tip:'쇼핑몰 내'},
    ],
    '베트남-다낭':[
      {name:'비디드엔뜨엉',addr:'한시장 인근',hours:'08:00-21:00',tip:'최고 환율'},
      {name:'공항 환전소',addr:'다낭 국제공항',hours:'24시간',tip:'도착 즉시 소액만'},
    ],
    '베트남-하노이':[
      {name:'하노이 타워 환전',addr:'구시가지',hours:'08:00-20:00',tip:'관광객 많음'},
      {name:'호안끼엠 환전소',addr:'호안끼엠 호수 근처',hours:'08:00-19:00',tip:'시내 중심'},
    ],
    '베트남-호치민':[
      {name:'은히엔환전',addr:'벤탄시장 인근',hours:'08:00-21:00',tip:'시장 방문 전 환전'},
      {name:'동커이 환전소',addr:'동커이 거리',hours:'09:00-20:00',tip:'쇼핑가 중심'},
    ],
    '베트남-나트랑':[
      {name:'나트랑센터 환전',addr:'트란푸 거리',hours:'08:00-20:00',tip:'해변 접근성 좋음'},
    ],
    '대만-타이베이':[
      {name:'타오위엔공항 환전',addr:'타오위엔 국제공항',hours:'24시간',tip:'도착 즉시 환전'},
      {name:'타이베이역 환전',addr:'타이베이 메인역',hours:'09:00-21:00',tip:'시내 중심'},
    ],
    '대만-타이중':[
      {name:'타이중역 환전',addr:'타이중역 구내',hours:'09:00-20:00',tip:'역 이용 편리'},
    ],
    '대만-가오슝':[
      {name:'가오슝공항 환전',addr:'가오슝 국제공항',hours:'24시간',tip:'공항 환전'},
    ],
    '싱가포르-싱가포르':[
      {name:'더 아케이드 환전',addr:'래플즈 플레이스',hours:'09:00-17:00',tip:'최고 환율'},
      {name:'무스타파센터',addr:'리틀인디아',hours:'24시간',tip:'24시간 환전'},
    ],
    '인도네시아-발리':[
      {name:'BMC 환전소',addr:'쿠타/스미냑',hours:'08:00-22:00',tip:'해변가 최고 환율'},
      {name:'센트럴쿠타 환전',addr:'센트럴쿠타 몰',hours:'10:00-22:00',tip:'쇼핑몰 내'},
    ],
    '인도네시아-자카르타':[
      {name:'그랜드인도네시아 환전',addr:'그랜드인도네시아 몰',hours:'10:00-21:00',tip:'시내 중심'},
    ],
    '말레이시아-쿠알라룸푸르':[
      {name:'Mid Valley 환전',addr:'미드밸리 메가몰',hours:'10:00-22:00',tip:'쇼핑 중 환전'},
      {name:'KL센트럴 환전',addr:'KL센트럴역',hours:'08:00-22:00',tip:'교통 허브'},
    ],
    '말레이시아-페낭':[
      {name:'거니플라자 환전',addr:'거니 드라이브',hours:'10:00-21:00',tip:'해변 인근'},
    ],
    '홍콩-홍콩':[
      {name:'침사추이 환전소',addr:'네이션 로드',hours:'09:00-21:00',tip:'최고 환율'},
      {name:'센트럴 환전',addr:'센트럴역 인근',hours:'09:00-19:00',tip:'금융가 중심'},
    ],
  };

  window.loadExchangeSpots=function(){
    var sel=document.getElementById('exchangeCity');
    var list=document.getElementById('exchangeSpotsList');
    if(!sel||!list)return;
    var key=sel.value;
    if(!key){list.innerHTML='<p class=\"text-sm text-slate-400 text-center py-4\">도시를 선택해주세요</p>';return;}
    var spots=exchangeSpots[key];
    if(!spots||spots.length===0){
      list.innerHTML='<p class=\"text-sm text-slate-400 text-center py-4\">해당 도시의 환전소 정보가 없습니다</p>';
      return;
    }
    list.innerHTML='<div class=\"space-y-2 mt-3\">'+spots.map(function(s){
      return '<div class=\"card p-3\"><div class=\"flex items-start gap-3\"><div class=\"w-8 h-8 rounded-lg flex items-center justify-center text-lg flex-shrink-0\" style=\"background:#22c55e22\">🏦</div><div class=\"flex-1 min-w-0\"><p class=\"text-sm font-bold text-slate-200\">'+s.name+'</p><p class=\"text-xs text-slate-500 mt-0.5\">📍 '+s.addr+'</p><p class=\"text-xs text-slate-500\">🕐 '+s.hours+'</p><p class=\"text-xs sky mt-1\">💡 '+s.tip+'</p></div></div></div>';
    }).join('')+'</div>';
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

  // URL 파라미터로 도시 자동 선택
  var params=new URLSearchParams(location.search);
  var cityParam=params.get('city');
  var countryParam=params.get('country');
  if(cityParam&&countryParam){
    var sel=document.getElementById('exchangeCity');
    if(sel){
      var key=countryParam+'-'+cityParam;
      sel.value=key;
      window.loadExchangeSpots();
    }
  }

  window.calcRate();
  window.loadRealRates();
})();
  </script>
  `

  return baseLayout('여행 꿀팁', content, 'tips')
}

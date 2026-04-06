import { baseLayout, COUNTRIES } from '../layout'
import { ALL_TOURS, ALL_GUIDES } from '../data'

export const cartPage = () => {
  // SSR 단계에서 데이터를 JSON으로 직렬화
  const GUIDES_JSON = JSON.stringify(ALL_GUIDES)
  const TOURS_JSON  = JSON.stringify(ALL_TOURS)
  const COUNTRIES_JSON = JSON.stringify(COUNTRIES)

  const content = `
  <style>
    /* 결제 수단 카드 */
    .pay-method{border:2px solid #1e1e2e;background:#13131a;border-radius:14px;padding:12px;cursor:pointer;transition:all .15s;text-align:center}
    .pay-method.selected{border-color:#f59e0b;background:#f59e0b11}
    /* 스텝 도트 */
    .step-dot{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;flex-shrink:0}
    .step-dot.active{background:#f59e0b;color:#0a0a0f}
    .step-dot.done{background:#22c55e;color:#fff}
    .step-dot.idle{background:#1e1e2e;color:#64748b}
    /* 카테고리 탭 */
    .cat-tab{border:1px solid #1e1e2e;background:#13131a;border-radius:999px;padding:6px 14px;font-size:11px;font-weight:700;color:#64748b;cursor:pointer;white-space:nowrap;transition:all .15s}
    .cat-tab.on{background:#f59e0b;color:#0a0a0f;border-color:#f59e0b}
    /* 지역 필터 탭 */
    .rgn-tab{border:1px solid #1e1e2e;background:#0a0a0f;border-radius:999px;padding:5px 12px;font-size:11px;font-weight:700;color:#64748b;cursor:pointer;white-space:nowrap;transition:all .15s}
    .rgn-tab.on{background:#3b82f622;color:#60a5fa;border-color:#3b82f6}
    /* 아이템 카드 */
    .item-card{background:#13131a;border:1px solid #1e1e2e;border-radius:16px;overflow:hidden;transition:border-color .15s;cursor:pointer}
    .item-card.in-cart{border-color:#f59e0b;background:#f59e0b08}
    /* 담기 버튼 */
    .add-btn{background:#f59e0b22;border:1px solid #f59e0b44;color:#f59e0b;border-radius:10px;padding:6px 12px;font-size:11px;font-weight:700;cursor:pointer;transition:all .15s;flex-shrink:0}
    .add-btn.added{background:#f59e0b;color:#0a0a0f;border-color:#f59e0b}
    /* 장바구니 뱃지 */
    .cart-badge{position:absolute;top:-4px;right:-4px;background:#f97316;color:#fff;border-radius:999px;font-size:9px;font-weight:900;padding:1px 5px;min-width:16px;text-align:center}
    /* 지역 선택 카드 */
    .country-card{border:2px solid #1e1e2e;background:#13131a;border-radius:16px;padding:14px 10px;cursor:pointer;text-align:center;transition:all .18s;position:relative}
    .country-card.selected{border-color:#3b82f6;background:#3b82f615}
    /* 선택된 국가 표시줄 */
    .selected-country-bar{background:#3b82f618;border:1px solid #3b82f633;border-radius:12px;padding:8px 12px;display:flex;align-items:center;gap:8px}
    /* 입력 필드 공통 */
    input[type=text],input[type=date],select,textarea{
      width:100%;background:#13131a;border:1px solid #1e1e2e;border-radius:12px;
      color:#e2e8f0;padding:10px 12px;font-size:13px;outline:none;
      transition:border-color .15s;
    }
    input:focus,select:focus,textarea:focus{border-color:#f59e0b}
  </style>

  <!-- ────────── 헤더 ────────── -->
  <header class="sticky top-0 z-40 px-4 py-3 border-b" style="background:#0a0a0fee;backdrop-filter:blur(16px);border-color:#1e1e2e">
    <div class="flex items-center gap-3">
      <a href="/" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#13131a;border:1px solid #1e1e2e">
        <span class="material-symbols-outlined text-slate-300 text-xl">arrow_back</span>
      </a>
      <h1 class="flex-1 font-bold text-base text-slate-100">🛒 내여행 담기</h1>
      <div class="relative">
        <button onclick="clearAllCart()" class="text-xs text-red-400 font-bold px-3 py-1.5 rounded-xl press" style="background:#ef444411;border:1px solid #ef444433">전체 삭제</button>
      </div>
    </div>
  </header>

  <!-- ────────── 스텝 바 ────────── -->
  <div class="px-4 py-3 border-b" style="border-color:#1e1e2e">
    <div class="flex items-center gap-2">
      <div class="step-dot active" id="step1dot">1</div>
      <div class="flex-1 h-0.5" id="step1line" style="background:#f59e0b"></div>
      <div class="step-dot idle"  id="step2dot">2</div>
      <div class="flex-1 h-0.5" id="step2line" style="background:#1e1e2e"></div>
      <div class="step-dot idle"  id="step3dot">3</div>
    </div>
    <div class="flex justify-between mt-1 text-[10px] text-slate-500">
      <span>여행 구성</span><span>예약 정보</span><span>결제 완료</span>
    </div>
  </div>

  <div class="pb-32 pt-3">

    <!-- ════════════════════════════════
         STEP 1: 여행 구성 + 장바구니
    ════════════════════════════════ -->
    <div id="panelCart">

      <!-- ▶ 지역 선택 섹션 -->
      <div class="px-4 mb-3">
        <p class="text-xs font-bold text-slate-400 mb-2">① 여행 지역 선택</p>
        <div class="grid grid-cols-3 gap-2" id="countryGrid"></div>
        <!-- 선택된 지역 표시 -->
        <div id="selectedCountryBar" class="hidden mt-2 selected-country-bar">
          <span id="selectedCountryFlag" class="text-lg"></span>
          <span id="selectedCountryName" class="text-sm font-bold text-blue-300 flex-1"></span>
          <button onclick="clearCountry()" class="text-xs text-slate-500 press">✕ 초기화</button>
        </div>
      </div>

      <!-- ▶ 카테고리 탭 -->
      <div class="px-4 mb-1">
        <p class="text-xs font-bold text-slate-400 mb-2">② 항목 카테고리 선택</p>
      </div>
      <div class="flex gap-2 px-4 overflow-x-auto ns pb-2">
        <button class="cat-tab on" onclick="switchCat('guide',this)">🧑‍💼 매니저</button>
        <button class="cat-tab"    onclick="switchCat('tour',this)">🗺 여행코스</button>
        <button class="cat-tab"    onclick="switchCat('hotel',this)">🏨 숙소</button>
        <button class="cat-tab"    onclick="switchCat('food',this)">🍜 맛집</button>
        <button class="cat-tab"    onclick="switchCat('service',this)">🎁 서비스</button>
      </div>

      <!-- 카탈로그 결과 수 표시 -->
      <div class="px-4 py-1 flex items-center justify-between">
        <p class="text-xs text-slate-500" id="catalogCount"></p>
        <p class="text-[10px] text-slate-600">지역 선택 시 자동 필터</p>
      </div>

      <!-- ▶ 카탈로그 아이템 목록 -->
      <div id="catalogList" class="px-4 space-y-3 mb-4"></div>

      <!-- 구분선 -->
      <div class="px-4 mb-3 mt-2">
        <div class="flex items-center gap-3">
          <div class="flex-1 h-px" style="background:#1e1e2e"></div>
          <span class="text-xs text-slate-500 font-bold">🛒 담은 항목</span>
          <div class="flex-1 h-px" style="background:#1e1e2e"></div>
        </div>
      </div>

      <!-- ▶ 장바구니 담긴 항목 -->
      <div class="px-4 space-y-2" id="cartList"></div>
      <div id="cartEmpty" class="hidden px-4 py-8 text-center">
        <p class="text-4xl mb-2">🛒</p>
        <p class="text-slate-500 text-sm font-bold">아직 담긴 항목이 없어요</p>
        <p class="text-slate-600 text-xs mt-1">지역 선택 후 매니저·코스·숙소를 담아보세요</p>
      </div>

      <!-- ▶ 합계 & 다음 버튼 -->
      <div id="cartSummary" class="hidden px-4 mt-4">
        <div class="card p-4 border mb-3" style="border-color:#f59e0b44">
          <div class="space-y-1.5 mb-3">
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">총 금액</span>
              <span class="text-slate-200 font-bold" id="sumTotal">₩0</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">예약금 (선결제)</span>
              <span class="font-black" style="color:#f97316" id="sumDeposit">₩0</span>
            </div>
            <p class="text-[10px] text-slate-600">※ 예약금만 지금 결제 · 잔금은 현장 지불</p>
          </div>
          <button onclick="goStep2()" class="w-full py-3.5 rounded-2xl font-black text-white press" style="background:linear-gradient(135deg,#f59e0b,#f97316)">
            예약 정보 입력 →
          </button>
        </div>
      </div>

    </div><!-- /panelCart -->

    <!-- ════════════════════════════════
         STEP 2: 예약 정보 입력
    ════════════════════════════════ -->
    <div id="panelInfo" class="hidden px-4 space-y-4">

      <!-- 선택된 항목 요약 -->
      <div class="card p-4" id="step2Summary"></div>

      <!-- 예약자 정보 -->
      <div class="card p-4">
        <h3 class="font-bold text-sm text-slate-100 mb-3">👤 예약자 정보</h3>
        <div class="space-y-3">
          <div>
            <label class="text-xs text-slate-500 mb-1 block">이름 *</label>
            <input type="text" id="bkName" placeholder="홍길동">
          </div>
          <div>
            <label class="text-xs text-slate-500 mb-1 block">카카오ID 또는 전화번호 *</label>
            <input type="text" id="bkContact" placeholder="카카오ID 또는 010-0000-0000">
          </div>
          <div>
            <label class="text-xs text-slate-500 mb-1 block">희망 날짜 *</label>
            <input type="date" id="bkDate">
          </div>
          <div>
            <label class="text-xs text-slate-500 mb-1 block">인원</label>
            <select id="bkPax">
              ${[1,2,3,4,5,6,7,8].map(n => `<option value="${n}">${n}명</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="text-xs text-slate-500 mb-1 block">요청사항 (선택)</label>
            <textarea id="bkNote" rows="2" placeholder="알레르기, 이동 불편, 특이사항 등" style="resize:none"></textarea>
          </div>
        </div>
      </div>

      <!-- 결제 수단 -->
      <div class="card p-4">
        <h3 class="font-bold text-sm text-slate-100 mb-3">💳 결제 수단</h3>
        <div class="grid grid-cols-2 gap-2">
          ${[
            {id:'kakaopay', icon:'💛', label:'카카오페이'},
            {id:'toss',     icon:'💙', label:'토스'},
            {id:'card',     icon:'💳', label:'신용·체크카드'},
            {id:'transfer', icon:'🏦', label:'계좌이체'},
          ].map((m,i) => `<div class="pay-method press${i===0?' selected':''}" onclick="selectPay('${m.id}',this)">
  <p class="text-xl mb-1">${m.icon}</p>
  <p class="text-xs font-bold text-slate-200">${m.label}</p>
</div>`).join('')}
        </div>
        <p class="text-[10px] text-slate-600 mt-2">※ 예약금만 선결제 · 노쇼 방지 에스크로 보관</p>
      </div>

      <!-- 결제 요약 -->
      <div class="card p-4 border" style="border-color:#f59e0b33;background:linear-gradient(135deg,#13131a,#1a1600)">
        <div class="flex justify-between items-center">
          <span class="text-sm text-slate-400">결제 예약금</span>
          <span class="text-xl font-black" style="color:#f97316" id="infoDeposit">₩0</span>
        </div>
        <p class="text-[10px] text-slate-600 mt-1">확정 후 24시간 내 담당 매니저가 카카오톡 연락</p>
      </div>

      <div class="flex gap-2">
        <button onclick="goStep1()" class="flex-1 py-3 rounded-2xl font-bold press" style="background:#1e1e2e;color:#94a3b8">← 이전</button>
        <button onclick="doCheckout()" class="py-3 rounded-2xl font-black text-white press" style="flex:2;background:linear-gradient(135deg,#f59e0b,#f97316)">예약금 결제하기</button>
      </div>
    </div><!-- /panelInfo -->

    <!-- ════════════════════════════════
         STEP 3: 결제 완료
    ════════════════════════════════ -->
    <div id="panelDone" class="hidden px-4">
      <div class="text-center py-10">
        <div class="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-5"
             style="background:linear-gradient(135deg,#22c55e22,#22c55e44);border:2px solid #22c55e">✅</div>
        <h2 class="text-xl font-black text-slate-100 mb-2">예약 완료!</h2>
        <p class="text-sm text-slate-400 mb-1">담당 매니저가 24시간 내 카카오톡으로 연락드립니다</p>
        <p class="text-xs text-slate-500 mb-6" id="doneContact"></p>

        <div class="card p-4 mb-4 text-left" id="doneSummary"></div>

        <div class="card p-4 border mb-5" style="border-color:#f59e0b33;background:#f59e0b08">
          <p class="text-xs font-bold gold mb-2">📌 다음 단계</p>
          <div class="space-y-1 text-xs text-slate-400 text-left">
            <p>1️⃣ 매니저 카카오톡 메시지 확인</p>
            <p>2️⃣ 상세 일정 & 가격표 수신</p>
            <p>3️⃣ 투어 당일 만남 장소 확정</p>
            <p>4️⃣ 후기 작성 시 다음 예약 5% 할인</p>
          </div>
        </div>

        <div class="flex gap-2">
          <a href="/my?tab=bookings" class="flex-1 py-3 rounded-2xl text-sm font-bold text-center press"
             style="background:#f59e0b22;border:1px solid #f59e0b44;color:#f59e0b">예약 내역 확인</a>
          <a href="/" class="flex-1 py-3 rounded-2xl text-sm font-bold text-center text-white press"
             style="background:linear-gradient(135deg,#f59e0b,#f97316)">홈으로</a>
        </div>
      </div>
    </div><!-- /panelDone -->

  </div><!-- /pb-32 -->

  <script>
(function(){
  /* ── 서버에서 주입된 데이터 ── */
  var ALL_GUIDES  = ${GUIDES_JSON};
  var ALL_TOURS   = ${TOURS_JSON};
  var COUNTRIES   = ${COUNTRIES_JSON};

  /* ── 정적 카탈로그 (숙소·맛집·서비스) ── */
  var STATIC_HOTELS = [
    {id:'h01',type:'hotel',cat:'hotel',icon:'🏨',title:'사파이어 부티크 호텔',desc:'방콕 · 수쿰빗 · 4성급',price:120000,depositRate:30,flag:'🇹🇭',city:'방콕',country:'TH',img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',badge:'🏨 숙소',rating:4.7,reviews:312},
    {id:'h02',type:'hotel',cat:'hotel',icon:'🏩',title:'미케비치 씨뷰 리조트',desc:'다낭 · 미케비치 · 오션뷰',price:95000,depositRate:30,flag:'🇻🇳',city:'다낭',country:'VN',img:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop',badge:'🏨 숙소',rating:4.8,reviews:487},
    {id:'h03',type:'hotel',cat:'hotel',icon:'🏯',title:'도톤보리 캡슐호텔',desc:'오사카 · 도톤보리 · 가성비',price:38000,depositRate:50,flag:'🇯🇵',city:'오사카',country:'JP',img:'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=250&fit=crop',badge:'🏨 숙소',rating:4.5,reviews:203},
    {id:'h04',type:'hotel',cat:'hotel',icon:'🌴',title:'루앙프라방 리버뷰 게스트하우스',desc:'루앙프라방 · 메콩강뷰 · 힐링',price:28000,depositRate:30,flag:'🇱🇦',city:'루앙프라방',country:'LA',img:'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=250&fit=crop',badge:'🏨 숙소',rating:4.6,reviews:156},
    {id:'h05',type:'hotel',cat:'hotel',icon:'🏙',title:'호치민 루프탑 호텔',desc:'호치민 · 1군 · 도심뷰',price:75000,depositRate:30,flag:'🇻🇳',city:'호치민',country:'VN',img:'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&h=250&fit=crop',badge:'🏨 숙소',rating:4.7,reviews:389},
    {id:'h06',type:'hotel',cat:'hotel',icon:'🌃',title:'도쿄 시부야 게스트하우스',desc:'도쿄 · 시부야 · 가성비',price:52000,depositRate:30,flag:'🇯🇵',city:'도쿄',country:'JP',img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop',badge:'🏨 숙소',rating:4.4,reviews:178},
    {id:'h07',type:'hotel',cat:'hotel',icon:'🌸',title:'방비엥 강변 방갈로',desc:'방비엥 · 남쏭강뷰 · 힐링',price:22000,depositRate:30,flag:'🇱🇦',city:'방비엥',country:'LA',img:'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=400&h=250&fit=crop',badge:'🏨 숙소',rating:4.7,reviews:94},
  ];
  var STATIC_FOOD = [
    {id:'f01',type:'food',cat:'food',icon:'🍜',title:'방콕 야시장 맛집 패키지',desc:'카오산·차이나타운·야시장 맛집 5곳',price:35000,depositRate:20,flag:'🇹🇭',city:'방콕',country:'TH',img:'https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&h=250&fit=crop',badge:'🍜 맛집',rating:4.9,reviews:521},
    {id:'f02',type:'food',cat:'food',icon:'🍚',title:'다낭 쌀국수·반미 투어',desc:'미꽝·반미·반쎄오 원조 맛집',price:22000,depositRate:20,flag:'🇻🇳',city:'다낭',country:'VN',img:'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=250&fit=crop',badge:'🍜 맛집',rating:4.8,reviews:344},
    {id:'f03',type:'food',cat:'food',icon:'🍣',title:'오사카 도톤보리 먹킷리스트',desc:'타코야키·라멘·회전초밥 투어',price:48000,depositRate:20,flag:'🇯🇵',city:'오사카',country:'JP',img:'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=250&fit=crop',badge:'🍜 맛집',rating:4.9,reviews:612},
    {id:'f04',type:'food',cat:'food',icon:'🥘',title:'호치민 반미·분보 투어',desc:'벤탄시장 야식 포함 맛집 루트',price:25000,depositRate:20,flag:'🇻🇳',city:'호치민',country:'VN',img:'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=250&fit=crop',badge:'🍜 맛집',rating:4.7,reviews:289},
    {id:'f05',type:'food',cat:'food',icon:'🌶',title:'방콕 쿠킹클래스',desc:'재래시장 장보기+요리 체험',price:55000,depositRate:30,flag:'🇹🇭',city:'방콕',country:'TH',img:'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=400&h=250&fit=crop',badge:'🍜 맛집',rating:4.8,reviews:178},
    {id:'f06',type:'food',cat:'food',icon:'🍡',title:'교토·오사카 스트리트푸드',desc:'니시키시장·구로몬시장 투어',price:42000,depositRate:20,flag:'🇯🇵',city:'오사카',country:'JP',img:'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=250&fit=crop',badge:'🍜 맛집',rating:4.8,reviews:267},
  ];
  var STATIC_SERVICE = [
    {id:'s01',type:'service',cat:'service',icon:'☕',title:'매니저 커피 후원',desc:'활동 응원 소액 후원',price:5000,depositRate:100,flag:'🌏',city:'전체',country:'ALL',img:'',badge:'🎁 서비스',rating:5.0,reviews:999},
    {id:'s02',type:'service',cat:'service',icon:'📱',title:'24시간 SOS 케어',desc:'긴급상황 즉시 대응 서비스',price:15000,depositRate:100,flag:'🌏',city:'전체',country:'ALL',img:'',badge:'🎁 서비스',rating:4.9,reviews:432},
    {id:'s03',type:'service',cat:'service',icon:'🚐',title:'공항 픽업 서비스',desc:'도착 후 숙소까지 안전 이동',price:45000,depositRate:50,flag:'🌏',city:'전체',country:'ALL',img:'',badge:'🎁 서비스',rating:4.8,reviews:267},
    {id:'s04',type:'service',cat:'service',icon:'📋',title:'맞춤 여행 플랜 작성',desc:'매니저가 1:1로 일정 직접 설계',price:30000,depositRate:100,flag:'🌏',city:'전체',country:'ALL',img:'',badge:'🎁 서비스',rating:4.9,reviews:183},
    {id:'s05',type:'service',cat:'service',icon:'🎧',title:'오디오 가이드 PDF',desc:'현지 꿀팁 전자책+오디오 패키지',price:9900,depositRate:100,flag:'🌏',city:'전체',country:'ALL',img:'',badge:'🎁 서비스',rating:4.7,reviews:521},
    {id:'s06',type:'service',cat:'service',icon:'💆',title:'마사지샵 예약 대행',desc:'검증된 업소 가격표 포함 예약',price:10000,depositRate:100,flag:'🌏',city:'전체',country:'ALL',img:'',badge:'🎁 서비스',rating:4.8,reviews:398},
  ];

  /* ── 상태 변수 ── */
  var curCat       = 'guide';   // 현재 카테고리
  var curCountry   = '';        // 선택된 국가코드 (빈 문자열=전체)
  var cartItems    = [];
  var selectedPay  = 'kakaopay';
  var curStep      = 1;

  /* ═══════════════════════════════════
     국가 그리드 렌더
  ═══════════════════════════════════ */
  function renderCountryGrid(){
    var grid = document.getElementById('countryGrid');
    if(!grid) return;
    grid.innerHTML = COUNTRIES.map(function(c){
      var isSelected = (curCountry === c.code);
      return '<div class="country-card'+(isSelected?' selected':'')+'" data-code="'+c.code+'" onclick="window.selectCountry(this.dataset.code)">'
        +'<div class="text-2xl mb-1">'+c.flag+'</div>'
        +'<p class="text-xs font-bold text-slate-200">'+c.name+'</p>'
        +'<p class="text-[9px] text-slate-500 mt-0.5">'+c.cities.length+'개 도시</p>'
        +(isSelected?'<div class="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"><span style="color:#fff;font-size:9px;font-weight:900">&#10003;</span></div>':'')
        +'</div>';
    }).join('');
  }

  /* ═══════════════════════════════════
     국가 선택 / 해제
  ═══════════════════════════════════ */
  window.selectCountry = function(code){
    if(curCountry === code){
      curCountry = '';
    } else {
      curCountry = code;
    }
    renderCountryGrid();
    // 선택 표시줄 업데이트
    var bar  = document.getElementById('selectedCountryBar');
    var flag = document.getElementById('selectedCountryFlag');
    var name = document.getElementById('selectedCountryName');
    if(curCountry){
      var found = COUNTRIES.find(function(c){return c.code===curCountry;});
      if(found){
        if(flag) flag.textContent = found.flag;
        if(name) name.textContent = found.name+' 지역 항목만 표시 중';
      }
      if(bar) bar.classList.remove('hidden');
    } else {
      if(bar) bar.classList.add('hidden');
    }
    renderCatalog(curCat);
  };

  window.clearCountry = function(){
    curCountry = '';
    renderCountryGrid();
    var bar = document.getElementById('selectedCountryBar');
    if(bar) bar.classList.add('hidden');
    renderCatalog(curCat);
  };

  /* ═══════════════════════════════════
     카탈로그 데이터 조립 (카테고리별)
  ═══════════════════════════════════ */
  function getCatalogItems(cat){
    var raw = [];
    if(cat === 'guide'){
      raw = ALL_GUIDES.map(function(g){
        return {
          id:'gd_'+g.id, type:'guide', cat:'guide',
          icon:g.flag, title:g.name,
          desc:g.city+' · '+g.tagline,
          price:g.support_price||10000, depositRate:100,
          flag:g.flag, city:g.city, country:g.country,
          img:g.avatar, badge:g.badge||'🥇 인증 매니저',
          rating:g.rating, reviews:g.reviews, guideId:g.id
        };
      });
    } else if(cat === 'tour'){
      raw = ALL_TOURS.map(function(t){
        return {
          id:'tr_'+t.id, type:'tour', cat:'tour',
          icon:t.flag, title:t.title,
          desc:t.city+' · '+t.duration+' · '+t.groupSize,
          price:t.price, depositRate:t.depositRate||30,
          flag:t.flag, city:t.city, country:t.country,
          img:t.img, badge:'🗺 여행코스',
          rating:t.rating, reviews:t.reviews, matureTag:t.matureTag
        };
      });
    } else if(cat === 'hotel'){
      raw = STATIC_HOTELS;
    } else if(cat === 'food'){
      raw = STATIC_FOOD;
    } else if(cat === 'service'){
      raw = STATIC_SERVICE;
    }
    // 국가 필터 적용 (서비스는 전체 표시)
    if(curCountry && cat !== 'service'){
      raw = raw.filter(function(item){
        return item.country === curCountry;
      });
    }
    return raw;
  }

  /* ═══════════════════════════════════
     카탈로그 렌더
  ═══════════════════════════════════ */
  function renderCatalog(cat){
    var list = getCatalogItems(cat);
    var el   = document.getElementById('catalogList');
    var cnt  = document.getElementById('catalogCount');
    if(!el) return;

    if(cnt) cnt.textContent = list.length > 0 ? list.length+'개 항목' : '';

    if(list.length === 0){
      el.innerHTML = '<div class="py-8 text-center">'
        +'<p class="text-3xl mb-2">'+(curCountry?'🔍':'📋')+'</p>'
        +'<p class="text-sm text-slate-400 font-bold">'+(curCountry?'선택한 지역에 해당 항목이 없습니다':'항목을 준비 중입니다')+'</p>'
        +(curCountry?'<p class="text-xs text-slate-600 mt-1">다른 지역을 선택하거나 초기화해보세요</p>':'')
        +'</div>';
      return;
    }

    el.innerHTML = list.map(function(item){
      var inCart  = window.LG && window.LG.isInCart(item.id);
      var hasImg  = item.img && item.img.length > 0;
      var ratingHtml = item.rating
        ? '<span class="text-[10px]" style="color:#f59e0b">★ '+item.rating+'</span>'
          +'<span class="text-[10px] text-slate-500"> ('+item.reviews+')</span>'
        : '';
      var matureHtml = item.matureTag
        ? '<span style="background:#ef444422;color:#ef4444;border:1px solid #ef444444;font-size:9px;font-weight:700;padding:1px 5px;border-radius:999px">🔞</span>' : '';

      var addBtnHtml = '<button id="btn_'+item.id+'" data-iid="'+item.id+'" data-cat="'+cat+'" onclick="window.toggleItem(this,this.dataset.iid,this.dataset.cat)"'
        +' class="add-btn'+(inCart?' added':'')+'">'+( inCart?'&#10003; 담김':'+ 담기')+'</button>';

      /* 이미지 없는 카드 (서비스 등) */
      if(!hasImg){
        return '<div class="item-card p-4'+(inCart?' in-cart':'')+'" id="card_'+item.id+'">'
          +'<div class="flex items-center gap-3">'
          +'<div class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style="background:#f59e0b11">'+item.icon+'</div>'
          +'<div class="flex-1 min-w-0">'
          +'<div class="flex items-center gap-1 flex-wrap mb-0.5">'
          +'<p class="text-sm font-black text-white">'+item.title+'</p>'+matureHtml
          +'</div>'
          +'<p class="text-xs text-slate-400">'+item.desc+'</p>'
          +(ratingHtml?'<div class="flex gap-1 mt-0.5">'+ratingHtml+'</div>':'')
          +'</div>'
          +'<div class="flex flex-col items-end gap-1 flex-shrink-0">'
          +(item.price>0
            ?'<p class="text-sm font-black" style="color:#f59e0b">₩'+item.price.toLocaleString()+'</p>'
            :'<p class="text-sm font-black text-slate-400">무료</p>')
          +addBtnHtml
          +'</div></div></div>';
      }

      /* 이미지 있는 카드 (가이드·투어·숙소·맛집) */
      return '<div class="item-card'+(inCart?' in-cart':'')+'" id="card_'+item.id+'">'
        +'<div class="flex gap-3 p-3">'
        +'<div class="relative rounded-xl overflow-hidden flex-shrink-0" style="width:88px;height:88px">'
        +'<img src="'+item.img+'" class="w-full h-full object-cover" loading="lazy" alt="'+item.title+'">'
        +'<div class="absolute top-1 left-1">'
        +'<span style="background:#0a0a0fcc;color:#f59e0b;font-size:9px;font-weight:700;padding:1px 5px;border-radius:999px">'+item.badge+'</span>'
        +'</div>'
        +'</div>'
        +'<div class="flex-1 min-w-0 flex flex-col justify-between">'
        +'<div>'
        +'<div class="flex items-center gap-1 mb-0.5 flex-wrap">'
        +'<p class="text-sm font-black text-white leading-snug">'+item.title+'</p>'+matureHtml
        +'</div>'
        +'<p class="text-xs text-slate-400 leading-snug">'+item.desc+'</p>'
        +(ratingHtml?'<div class="flex gap-1 mt-0.5">'+ratingHtml+'</div>':'')
        +'</div>'
        +'<div class="flex items-center justify-between mt-2">'
        +(item.price>0
          ?'<div><p class="text-sm font-black" style="color:#f59e0b">₩'+item.price.toLocaleString()+'~</p>'
            +(item.depositRate<100?'<p class="text-[9px] text-slate-500">예약금 '+item.depositRate+'%</p>':'')+'</div>'
          :'<p class="text-sm font-black text-slate-400">무료 상담</p>')
        +addBtnHtml
        +'</div></div></div></div>';
    }).join('');
  }

  /* ═══════════════════════════════════
     장바구니 렌더
  ═══════════════════════════════════ */
  function renderCart(){
    cartItems = window.LG ? window.LG.getCart() : [];
    var el  = document.getElementById('cartList');
    var em  = document.getElementById('cartEmpty');
    var sm  = document.getElementById('cartSummary');

    if(!cartItems.length){
      if(el) el.innerHTML='';
      if(em) em.classList.remove('hidden');
      if(sm) sm.classList.add('hidden');
      return;
    }
    if(em) em.classList.add('hidden');
    if(sm) sm.classList.remove('hidden');

    var typeIcons = {guide:'🧑',tour:'🗺',hotel:'🏨',food:'🍜',service:'🎁'};
    if(el) el.innerHTML = cartItems.map(function(it){
      var dep = it.depositRate===100 ? it.price : Math.round(it.price*(it.depositRate||30)/100);
      var ico = typeIcons[it.type] || '📌';
      var typeLabel = {guide:'매니저',tour:'여행코스',hotel:'숙소',food:'맛집',service:'서비스'}[it.type]||'기타';
      return '<div class="flex items-center gap-3 rounded-2xl p-3" style="background:#13131a;border:1px solid #f59e0b33">'
        +'<div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style="background:#f59e0b11">'+ico+'</div>'
        +'<div class="flex-1 min-w-0">'
        +'<div class="flex items-center gap-1.5 mb-0.5">'
        +'<span style="background:#f59e0b22;color:#f59e0b;font-size:9px;font-weight:700;padding:1px 5px;border-radius:999px">'+typeLabel+'</span>'
        +'</div>'
        +'<p class="text-sm font-bold text-white truncate">'+it.title+'</p>'
        +'<p class="text-xs text-slate-500 truncate">'+(it.city||'')+(it.flag?' '+it.flag:'')+'</p>'
        +(it.price>0
          ?'<p class="text-xs" style="color:#f59e0b">₩'+it.price.toLocaleString()
            +(it.depositRate<100?' · 예약금 ₩'+dep.toLocaleString():'')+'</p>'
          :'<p class="text-xs text-slate-500">무료 상담</p>')
        +'</div>'
        +'<button data-rid="'+it.id+'" onclick="window.removeItem(this.dataset.rid)" class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 press" style="background:#ef444422;border:1px solid #ef444433">'        
        +'<span class="material-symbols-outlined text-red-400" style="font-size:16px">close</span></button>'
        +'</div>';
    }).join('');

    updateSummary();
  }

  /* ═══════════════════════════════════
     합계 계산
  ═══════════════════════════════════ */
  function updateSummary(){
    var total   = cartItems.reduce(function(s,it){return s+(it.price||0);},0);
    var deposit = cartItems.reduce(function(s,it){
      return s+(it.depositRate===100?it.price:Math.round((it.price||0)*(it.depositRate||30)/100));
    },0);
    var st=document.getElementById('sumTotal');
    var sd=document.getElementById('sumDeposit');
    var id=document.getElementById('infoDeposit');
    if(st) st.textContent='₩'+total.toLocaleString();
    if(sd) sd.textContent='₩'+deposit.toLocaleString();
    if(id) id.textContent='₩'+deposit.toLocaleString();
  }

  /* ═══════════════════════════════════
     담기/빼기 토글
  ═══════════════════════════════════ */
  window.toggleItem = function(btn, id, cat){
    var list = getCatalogItems(cat);
    var item = list.find(function(x){return x.id===id;});
    if(!item||!window.LG) return;

    var inCart = window.LG.isInCart(id);
    if(inCart){
      window.LG.removeCart(id);
      if(btn){btn.textContent='+ 담기'; btn.classList.remove('added');}
      var card=document.getElementById('card_'+id);
      if(card){ card.classList.remove('in-cart'); }
    } else {
      window.LG.addCart({
        id:item.id, title:item.title, price:item.price,
        depositRate:item.depositRate, flag:item.flag, city:item.city,
        img:item.img||'', type:item.type, badge:item.badge, country:item.country||''
      });
      if(btn){btn.textContent='✓ 담김'; btn.classList.add('added');}
      var card=document.getElementById('card_'+id);
      if(card){ card.classList.add('in-cart'); }
      window.LG.showToast(item.title+' 담겼습니다!','#22c55e');
    }
    renderCart();
    window.LG&&window.LG.updateCartBadge();
  };

  window.removeItem = function(id){
    if(window.LG) window.LG.removeCart(id);
    var btn=document.getElementById('btn_'+id);
    if(btn){btn.textContent='+ 담기'; btn.classList.remove('added');}
    var card=document.getElementById('card_'+id);
    if(card) card.classList.remove('in-cart');
    renderCart();
    window.LG&&window.LG.updateCartBadge();
  };

  window.clearAllCart = function(){
    if(!confirm('장바구니를 모두 비울까요?')) return;
    if(window.LG) window.LG.clearCart();
    document.querySelectorAll('.add-btn.added').forEach(function(b){
      b.textContent='+ 담기'; b.classList.remove('added');
    });
    document.querySelectorAll('.item-card.in-cart').forEach(function(c){
      c.classList.remove('in-cart');
    });
    renderCart();
    window.LG&&window.LG.updateCartBadge();
  };

  /* ═══════════════════════════════════
     카테고리 탭 전환
  ═══════════════════════════════════ */
  window.switchCat = function(cat, tabEl){
    curCat = cat;
    document.querySelectorAll('.cat-tab').forEach(function(b){b.classList.remove('on');});
    if(tabEl) tabEl.classList.add('on');
    renderCatalog(cat);
  };

  /* ═══════════════════════════════════
     결제 수단 선택
  ═══════════════════════════════════ */
  window.selectPay = function(pid, el){
    selectedPay = pid;
    document.querySelectorAll('.pay-method').forEach(function(e){e.classList.remove('selected');});
    if(el) el.classList.add('selected');
  };

  /* ═══════════════════════════════════
     스텝 이동
  ═══════════════════════════════════ */
  function setStep(n){
    curStep = n;
    document.getElementById('panelCart').classList.toggle('hidden', n!==1);
    document.getElementById('panelInfo').classList.toggle('hidden', n!==2);
    document.getElementById('panelDone').classList.toggle('hidden', n!==3);
    ['step1dot','step2dot','step3dot'].forEach(function(did,i){
      var d=document.getElementById(did); if(!d) return;
      if(i+1<n){d.className='step-dot done';d.textContent='✓';}
      else if(i+1===n){d.className='step-dot active';d.textContent=String(i+1);}
      else{d.className='step-dot idle';d.textContent=String(i+1);}
    });
    var l1=document.getElementById('step1line');
    var l2=document.getElementById('step2line');
    if(l1) l1.style.background=n>1?'#22c55e':'#f59e0b';
    if(l2) l2.style.background=n>2?'#22c55e':'#1e1e2e';
  }

  window.goStep1 = function(){ setStep(1); };

  window.goStep2 = function(){
    if(!cartItems.length){
      window.LG&&window.LG.showToast('먼저 항목을 담아주세요','#ef4444'); return;
    }
    // Step2 담긴 항목 요약 표시
    var ss = document.getElementById('step2Summary');
    if(ss){
      var typeLabel = {guide:'매니저',tour:'여행코스',hotel:'숙소',food:'맛집',service:'서비스'};
      var typeIco   = {guide:'🧑',tour:'🗺',hotel:'🏨',food:'🍜',service:'🎁'};
      ss.innerHTML = '<p class="text-xs font-bold text-slate-400 mb-2">📋 선택된 항목 ('+cartItems.length+'개)</p>'
        +'<div class="space-y-1.5">'
        +cartItems.map(function(it){
          return '<div class="flex items-center gap-2">'
            +'<span class="text-sm">'+( typeIco[it.type]||'📌')+'</span>'
            +'<span class="text-xs text-slate-300 flex-1 truncate">'+it.title+'</span>'
            +'<span class="text-xs font-bold" style="color:#f59e0b">₩'+it.price.toLocaleString()+'</span>'
            +'</div>';
        }).join('')
        +'</div>';
    }
    setStep(2); updateSummary();
  };

  /* ═══════════════════════════════════
     결제 처리
  ═══════════════════════════════════ */
  window.doCheckout = function(){
    var name    = document.getElementById('bkName');
    var contact = document.getElementById('bkContact');
    var date    = document.getElementById('bkDate');
    var pax     = document.getElementById('bkPax');
    var note    = document.getElementById('bkNote');

    if(!name||!name.value.trim())      { alert('이름을 입력해주세요'); return; }
    if(!contact||!contact.value.trim()){ alert('연락처를 입력해주세요'); return; }
    if(!date||!date.value)             { alert('희망 날짜를 선택해주세요'); return; }

    var deposit = cartItems.reduce(function(s,it){
      return s+(it.depositRate===100?it.price:Math.round((it.price||0)*(it.depositRate||30)/100));
    },0);

    var booking = {
      id:       'bk_'+Date.now(),
      tours:    cartItems.map(function(it){
        return {id:it.id,title:it.title,city:it.city||'',flag:it.flag||'',
                price:it.price,depositRate:it.depositRate||30,type:it.type||'tour'};
      }),
      name:       name.value.trim(),
      contact:    contact.value.trim(),
      date:       date.value,
      pax:        pax?pax.value:'1',
      note:       note?note.value:'',
      payMethod:  selectedPay,
      depositPaid:deposit,
      status:     '확인중',
      bookedAt:   new Date().toISOString()
    };

    if(window.LG){ window.LG.addBooking(booking); window.LG.clearCart(); }
    cartItems = [];

    var dc = document.getElementById('doneContact');
    if(dc) dc.textContent = contact.value.trim()+' 으로 매니저 연락 예정';

    var typeIco2 = {guide:'🧑',tour:'🗺',hotel:'🏨',food:'🍜',service:'🎁'};
    var ds = document.getElementById('doneSummary');
    if(ds) ds.innerHTML='<p class="text-xs text-slate-500 mb-2">예약 항목</p>'
      +'<div class="space-y-1">'
      +booking.tours.map(function(t){
        return '<p class="text-sm text-slate-300">'+(typeIco2[t.type]||'📌')+' '+t.title+'</p>';
      }).join('')
      +'</div>'
      +'<hr class="my-2" style="border-color:#1e1e2e">'
      +'<div class="flex justify-between"><span class="text-xs text-slate-500">날짜</span><span class="text-xs text-slate-300">'+date.value+'</span></div>'
      +'<div class="flex justify-between"><span class="text-xs text-slate-500">인원</span><span class="text-xs text-slate-300">'+(pax?pax.value:'1')+'명</span></div>'
      +'<div class="flex justify-between mt-1"><span class="text-sm text-slate-400">예약금</span><span class="text-sm font-black" style="color:#f97316">₩'+deposit.toLocaleString()+'</span></div>';

    window.LG&&window.LG.updateCartBadge();
    setStep(3);
  };

  /* ═══════════════════════════════════
     초기화
  ═══════════════════════════════════ */
  function init(){
    renderCountryGrid();
    renderCatalog(curCat);
    renderCart();
    window.LG&&window.LG.updateCartBadge();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
  </script>
  `
  return baseLayout('내여행 담기', content, 'cart')
}

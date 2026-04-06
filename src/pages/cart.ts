import { baseLayout } from '../layout'

export const cartPage = () => {
  const content = `
  <style>
    .pay-method{border:2px solid #1e1e2e;background:#13131a;border-radius:14px;padding:14px;cursor:pointer;transition:all .15s}
    .pay-method.selected{border-color:#f59e0b;background:#f59e0b11}
    .step-dot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900}
    .step-dot.active{background:#f59e0b;color:#0a0a0f}
    .step-dot.done{background:#22c55e;color:#fff}
    .step-dot.idle{background:#1e1e2e;color:#64748b}
  </style>

  <!-- 헤더 -->
  <header class="sticky top-0 z-40 px-4 py-3 border-b" style="background:#0a0a0fee;backdrop-filter:blur(16px);border-color:#1e1e2e">
    <div class="flex items-center gap-3">
      <a href="/tours" class="w-9 h-9 flex items-center justify-center rounded-full press" style="background:#13131a;border:1px solid #1e1e2e">
        <span class="material-symbols-outlined text-slate-300 text-xl">arrow_back</span>
      </a>
      <h1 class="flex-1 font-bold text-base text-slate-100">장바구니 / 결제</h1>
      <button onclick="clearAllCart()" class="text-xs text-red-400 font-bold px-3 py-1.5 rounded-xl press" style="background:#ef444411;border:1px solid #ef444433">전체 삭제</button>
    </div>
  </header>

  <!-- 스텝 표시 -->
  <div class="px-4 py-3 border-b" style="border-color:#1e1e2e">
    <div class="flex items-center gap-2">
      <div class="step-dot active" id="step1dot">1</div>
      <div class="flex-1 h-0.5" style="background:#f59e0b" id="step1line"></div>
      <div class="step-dot idle" id="step2dot">2</div>
      <div class="flex-1 h-0.5" style="background:#1e1e2e" id="step2line"></div>
      <div class="step-dot idle" id="step3dot">3</div>
    </div>
    <div class="flex justify-between mt-1">
      <span class="text-[10px] text-slate-400">투어 선택</span>
      <span class="text-[10px] text-slate-400">예약 정보</span>
      <span class="text-[10px] text-slate-400">결제 완료</span>
    </div>
  </div>

  <div class="pb-32 pt-3">

    <!-- STEP 1: 장바구니 -->
    <div id="panelCart" class="px-4 space-y-3">
      <div id="cartEmpty" class="hidden py-16 text-center">
        <p class="text-5xl mb-4">🛒</p>
        <p class="text-slate-400 text-sm mb-4">장바구니가 비어있습니다</p>
        <a href="/tours" class="inline-block px-6 py-3 rounded-2xl font-bold press" style="background:#f59e0b;color:#0a0a0f">투어 둘러보기</a>
      </div>
      <div id="cartList" class="space-y-3"></div>
      <!-- 요약 -->
      <div id="cartSummary" class="hidden card p-4 border" style="border-color:#f59e0b44">
        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-sm">
            <span class="text-slate-400">총 투어 금액</span>
            <span class="text-slate-200 font-bold" id="sumTotal">₩0</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-400">예약금 (합계)</span>
            <span class="font-black" style="color:#f97316" id="sumDeposit">₩0</span>
          </div>
          <div class="text-xs text-slate-500">※ 예약금만 지금 결제 / 잔금은 투어 당일 현장 지불</div>
        </div>
        <button onclick="goStep2()" class="w-full py-4 rounded-2xl font-black text-white press" style="background:linear-gradient(135deg,#f59e0b,#f97316)">
          예약 정보 입력 →
        </button>
      </div>
    </div>

    <!-- STEP 2: 예약 정보 입력 -->
    <div id="panelInfo" class="hidden px-4 space-y-4">
      <div class="card p-4">
        <h3 class="font-bold text-sm text-slate-100 mb-3">👤 예약자 정보</h3>
        <div class="space-y-3">
          <div>
            <label class="text-xs text-slate-500 mb-1 block">이름 *</label>
            <input type="text" id="bkName" placeholder="홍길동">
          </div>
          <div>
            <label class="text-xs text-slate-500 mb-1 block">연락처 (카카오ID 또는 전화) *</label>
            <input type="text" id="bkContact" placeholder="카카오ID 또는 010-0000-0000">
          </div>
          <div>
            <label class="text-xs text-slate-500 mb-1 block">희망 투어 날짜 *</label>
            <input type="date" id="bkDate">
          </div>
          <div>
            <label class="text-xs text-slate-500 mb-1 block">총 인원</label>
            <select id="bkPax">
              ${[1,2,3,4,5,6,7,8].map(n => `<option value="${n}">${n}명</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="text-xs text-slate-500 mb-1 block">요청사항 (선택)</label>
            <textarea id="bkNote" rows="2" placeholder="알레르기, 이동 불편 등 특이사항" style="resize:none"></textarea>
          </div>
        </div>
      </div>

      <!-- 결제 수단 -->
      <div class="card p-4">
        <h3 class="font-bold text-sm text-slate-100 mb-3">💳 결제 수단</h3>
        <div class="grid grid-cols-2 gap-2" id="payMethods">
          ${[
            {id:'kakaopay',  icon:'💛', label:'카카오페이'},
            {id:'toss',      icon:'💙', label:'토스'},
            {id:'card',      icon:'💳', label:'신용/체크카드'},
            {id:'transfer',  icon:'🏦', label:'계좌이체'},
          ].map((m, i) => `<div class="pay-method press${i===0?' selected':''}" onclick="selectPay('${m.id}',this)" data-pid="${m.id}">
  <p class="text-xl mb-1">${m.icon}</p>
  <p class="text-sm font-bold text-slate-200">${m.label}</p>
</div>`).join('')}
        </div>
        <p class="text-xs text-slate-500 mt-2">※ 예약금만 선결제 (노쇼 방지 에스크로 보관)</p>
      </div>

      <!-- 예약금 요약 -->
      <div class="card p-4 border" style="border-color:#f59e0b44;background:linear-gradient(135deg,#13131a,#1a1600)">
        <div class="flex justify-between mb-2">
          <span class="text-sm text-slate-400">결제 예약금</span>
          <span class="text-lg font-black" style="color:#f97316" id="infoDeposit">₩0</span>
        </div>
        <p class="text-xs text-slate-500">투어 확정 후 24시간 내 가이드 카카오톡 연락</p>
      </div>

      <div class="flex gap-2">
        <button onclick="goStep1()" class="flex-1 py-3 rounded-2xl font-bold press" style="background:#1e1e2e;color:#94a3b8">← 이전</button>
        <button onclick="doCheckout()" class="flex-2 py-3 rounded-2xl font-black text-white press" style="flex:2;background:linear-gradient(135deg,#f59e0b,#f97316)">예약금 결제하기</button>
      </div>
    </div>

    <!-- STEP 3: 완료 -->
    <div id="panelDone" class="hidden px-4">
      <div class="text-center py-10">
        <div class="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-5" style="background:linear-gradient(135deg,#22c55e22,#22c55e44);border:2px solid #22c55e">✅</div>
        <h2 class="text-xl font-black text-slate-100 mb-2">예약 완료!</h2>
        <p class="text-sm text-slate-400 mb-1">담당 가이드가 24시간 내 카카오톡으로 연락드립니다</p>
        <p class="text-xs text-slate-500 mb-6" id="doneContact"></p>

        <div class="card p-4 mb-5 text-left space-y-2" id="doneSummary"></div>

        <div class="card p-4 border mb-5" style="border-color:#f59e0b44;background:#f59e0b08">
          <p class="text-xs font-bold gold mb-2">📌 다음 단계</p>
          <div class="space-y-1 text-xs text-slate-400 text-left">
            <p>1️⃣ 가이드 카카오톡 메시지 확인</p>
            <p>2️⃣ 상세 일정 & 가격표 수신</p>
            <p>3️⃣ 투어 당일 만남 장소 확정</p>
            <p>4️⃣ 투어 후기 작성 시 다음 투어 5% 할인</p>
          </div>
        </div>

        <div class="flex gap-2">
          <a href="/my?tab=bookings" class="flex-1 py-3 rounded-2xl text-sm font-bold text-center press" style="background:#f59e0b22;border:1px solid #f59e0b44;color:#f59e0b">예약 내역 확인</a>
          <a href="/tours" class="flex-1 py-3 rounded-2xl text-sm font-bold text-center text-white press" style="background:linear-gradient(135deg,#f59e0b,#f97316)">투어 더 보기</a>
        </div>
      </div>
    </div>

  </div>

  <script>
(function(){
  var cartItems=[];
  var selectedPay='kakaopay';
  var curStep=1;

  function loadCart(){
    cartItems=window.LG?window.LG.getCart():[];
    renderCartList();
  }

  function renderCartList(){
    var el=document.getElementById('cartList');
    var em=document.getElementById('cartEmpty');
    var sm=document.getElementById('cartSummary');
    if(!cartItems||cartItems.length===0){
      if(el)el.innerHTML='';
      if(em)em.classList.remove('hidden');
      if(sm)sm.classList.add('hidden');
      return;
    }
    if(em)em.classList.add('hidden');
    if(sm)sm.classList.remove('hidden');

    if(el)el.innerHTML=cartItems.map(function(it){
      var dep=Math.round(it.price*(it.depositRate||30)/100);
      return '<div class="card overflow-hidden">'
        +'<div class="relative" style="height:120px">'
        +'<img src="'+it.img+'" class="w-full h-full object-cover" alt="'+it.title+'">'
        +'<div class="absolute inset-0" style="background:linear-gradient(to top,rgba(10,10,15,.9) 0%,transparent 55%)"></div>'
        +'<div class="absolute top-2 left-2"><span class="badge" style="background:#f59e0b22;color:#f59e0b;border:1px solid #f59e0b44">'+it.flag+' '+it.city+'</span></div>'
        +'<button onclick="removeItem(\''+it.id+'\')" class="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center press" style="background:rgba(239,68,68,.8)">'
        +'<span class="material-symbols-outlined text-white text-base">close</span></button>'
        +'<div class="absolute bottom-0 left-0 right-0 p-3"><p class="text-white text-sm font-black">'+it.title+'</p></div>'
        +'</div>'
        +'<div class="p-3 flex items-center justify-between">'
        +'<div><p class="text-xs text-slate-400">투어 금액</p><p class="font-black text-slate-200">₩'+it.price.toLocaleString()+'</p></div>'
        +'<div class="text-right"><p class="text-xs text-slate-400">예약금 '+(it.depositRate||30)+'%</p><p class="font-black" style="color:#f97316">₩'+dep.toLocaleString()+'</p></div>'
        +'</div></div>';
    }).join('');

    updateSummary();
  }

  function updateSummary(){
    var total=cartItems.reduce(function(s,it){return s+it.price;},0);
    var deposit=cartItems.reduce(function(s,it){return s+Math.round(it.price*(it.depositRate||30)/100);},0);
    var st=document.getElementById('sumTotal');var sd=document.getElementById('sumDeposit');
    var id=document.getElementById('infoDeposit');
    if(st)st.textContent='₩'+total.toLocaleString();
    if(sd)sd.textContent='₩'+deposit.toLocaleString();
    if(id)id.textContent='₩'+deposit.toLocaleString();
  }

  window.removeItem=function(id){
    window.LG&&window.LG.removeCart(id);
    loadCart();
  };
  window.clearAllCart=function(){
    if(!confirm('장바구니를 모두 비울까요?'))return;
    window.LG&&window.LG.clearCart();
    loadCart();
  };
  window.selectPay=function(pid,el){
    selectedPay=pid;
    document.querySelectorAll('.pay-method').forEach(function(e){e.classList.remove('selected');});
    if(el)el.classList.add('selected');
  };

  function setStep(n){
    curStep=n;
    document.getElementById('panelCart').classList.toggle('hidden',n!==1);
    document.getElementById('panelInfo').classList.toggle('hidden',n!==2);
    document.getElementById('panelDone').classList.toggle('hidden',n!==3);

    ['step1dot','step2dot','step3dot'].forEach(function(id,i){
      var dot=document.getElementById(id);
      if(!dot)return;
      if(i+1<n){dot.className='step-dot done';dot.textContent='✓';}
      else if(i+1===n){dot.className='step-dot active';dot.textContent=String(i+1);}
      else{dot.className='step-dot idle';dot.textContent=String(i+1);}
    });
    var l1=document.getElementById('step1line');var l2=document.getElementById('step2line');
    if(l1)l1.style.background=n>1?'#22c55e':'#f59e0b';
    if(l2)l2.style.background=n>2?'#22c55e':'#1e1e2e';
  }

  window.goStep1=function(){setStep(1);};
  window.goStep2=function(){
    if(!cartItems||cartItems.length===0){window.LG&&window.LG.showToast('장바구니가 비어있습니다','#ef4444');return;}
    setStep(2);updateSummary();
  };

  window.doCheckout=function(){
    var name=document.getElementById('bkName');
    var contact=document.getElementById('bkContact');
    var date=document.getElementById('bkDate');
    var pax=document.getElementById('bkPax');
    var note=document.getElementById('bkNote');
    if(!name||!name.value.trim()){alert('이름을 입력해주세요');return;}
    if(!contact||!contact.value.trim()){alert('연락처를 입력해주세요');return;}
    if(!date||!date.value){alert('희망 날짜를 선택해주세요');return;}

    var deposit=cartItems.reduce(function(s,it){return s+Math.round(it.price*(it.depositRate||30)/100);},0);
    var booking={
      id:'bk_'+Date.now(),
      tours:cartItems.map(function(it){return{id:it.id,title:it.title,city:it.city,flag:it.flag,price:it.price,depositRate:it.depositRate||30,guideId:it.guideId};}),
      name:name.value.trim(),
      contact:contact.value.trim(),
      date:date.value,
      pax:pax?pax.value:'1',
      note:note?note.value:'',
      payMethod:selectedPay,
      depositPaid:deposit,
      status:'확인중',
      bookedAt:new Date().toISOString()
    };
    window.LG&&window.LG.addBooking(booking);
    window.LG&&window.LG.clearCart();
    cartItems=[];

    var dc=document.getElementById('doneContact');
    if(dc)dc.textContent=contact.value.trim()+' 로 가이드 연락 예정';
    var ds=document.getElementById('doneSummary');
    if(ds)ds.innerHTML='<p class="text-xs text-slate-500 mb-2">예약 요약</p>'
      +'<div class="space-y-1">'
      +booking.tours.map(function(t){return '<p class="text-sm text-slate-300">• '+t.flag+' '+t.title+'</p>';}).join('')
      +'</div>'
      +'<hr class="my-2" style="border-color:#1e1e2e">'
      +'<div class="flex justify-between"><span class="text-xs text-slate-400">날짜</span><span class="text-xs text-slate-300">'+date.value+'</span></div>'
      +'<div class="flex justify-between"><span class="text-xs text-slate-400">인원</span><span class="text-xs text-slate-300">'+(pax?pax.value:'1')+'명</span></div>'
      +'<div class="flex justify-between"><span class="text-xs text-slate-400">결제수단</span><span class="text-xs text-slate-300">'+selectedPay+'</span></div>'
      +'<div class="flex justify-between mt-1"><span class="text-sm text-slate-400">예약금</span><span class="text-sm font-black" style="color:#f97316">₩'+deposit.toLocaleString()+'</span></div>';

    setStep(3);
  };

  loadCart();
})();
  </script>
  `
  return baseLayout('장바구니', content, 'cart')
}

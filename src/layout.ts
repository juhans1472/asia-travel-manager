// Local Guide Travel Platform - 공통 레이아웃

export const COUNTRIES = [
  { code: 'KR', name: '한국',   flag: '🇰🇷', color: '#3b82f6', cities: ['서울', '부산', '제주', '경주'] },
  { code: 'JP', name: '일본',   flag: '🇯🇵', color: '#f43f5e', cities: ['도쿄', '오사카', '교토', '후쿠오카'] },
  { code: 'CN', name: '중국',   flag: '🇨🇳', color: '#ef4444', cities: ['상하이', '베이징', '광저우', '청두'] },
  { code: 'VN', name: '베트남', flag: '🇻🇳', color: '#22c55e', cities: ['하노이', '다낭', '호치민', '나트랑'] },
  { code: 'TH', name: '태국',   flag: '🇹🇭', color: '#f59e0b', cities: ['방콕', '파타야', '치앙마이', '푸켓'] },
  { code: 'LA', name: '라오스', flag: '🇱🇦', color: '#a78bfa', cities: ['비엔티안', '루앙프라방', '방비엥'] },
]

export const baseLayout = (title: string, content: string, activeNav = 'home') => {
  const navItems = [
    { key: 'home',    icon: 'explore',        label: '탐색',   href: '/' },
    { key: 'tours',   icon: 'luggage',        label: '투어',   href: '/tours' },
    { key: 'guides',  icon: 'support_agent',  label: '가이드', href: '/guides' },
    { key: 'cart',    icon: 'shopping_cart',  label: '장바구니', href: '/cart' },
    { key: 'my',      icon: 'account_circle', label: '마이',   href: '/my' },
  ]

  const navHtml = navItems.map(n => {
    const isActive = n.key === activeNav
    const fillVal  = isActive ? 1 : 0
    const col      = isActive ? 'color:#f59e0b' : 'color:#64748b'
    return `<a href="${n.href}" class="flex flex-col items-center gap-0.5 py-2 flex-1 press" style="${col}" id="nav_${n.key}">
  <span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' ${fillVal},'wght' 400,'GRAD' 0,'opsz' 24">${n.icon}</span>
  <span class="text-[10px] font-semibold">${n.label}</span>
</a>`
  }).join('')

  return `<!DOCTYPE html>
<html lang="ko" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <meta name="theme-color" content="#f59e0b">
  <meta name="description" content="현지 교민·가이드가 직접 짜주는 아시아 여행 플랫폼 - 가이드 매칭, 가성비 숙소·맛집·투어">
  <meta property="og:title" content="${title} - 가이드 여행매니저">
  <meta property="og:type" content="website">
  <link rel="manifest" href="/manifest.json">
  <link rel="apple-touch-icon" href="/static/icons/icon-152.png">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="가이드여행">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧭</text></svg>">
  <title>${title} - 가이드 여행매니저</title>
  <link rel="stylesheet" href="/static/tailwind.css">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
  <style>
    *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
    body{font-family:'Apple SD Gothic Neo','Malgun Gothic',system-ui,sans-serif;background:#0a0a0f;color:#f1f5f9;min-height:100vh;max-width:430px;margin:0 auto;overflow-x:hidden}
    .material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;user-select:none}
    .press{transition:transform .12s,opacity .12s;cursor:pointer}
    .press:active{transform:scale(.95);opacity:.85}
    .ns{scrollbar-width:none;-ms-overflow-style:none}
    .ns::-webkit-scrollbar{display:none}
    .card{background:#13131a;border:1px solid #1e1e2e;border-radius:16px}
    .badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700}
    .gold{color:#f59e0b}
    .bg-gold{background:#f59e0b;color:#0a0a0f}
    input,textarea,select{background:#13131a;border:1px solid #1e1e2e;color:#f1f5f9;border-radius:12px;padding:10px 14px;width:100%;outline:none;font-size:14px}
    input:focus,textarea:focus{border-color:#f59e0b}
    .fade-in{animation:fadeIn .3s ease}
    @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
    .toast{position:fixed;bottom:100px;left:50%;transform:translateX(-50%);padding:12px 24px;border-radius:24px;font-weight:700;font-size:13px;z-index:9999;white-space:nowrap;animation:fadeIn .3s}
    .star{color:#f59e0b}
    .verified{color:#3b82f6}
    .sos-btn{position:fixed;right:16px;bottom:88px;width:52px;height:52px;border-radius:50%;background:#ef4444;color:#fff;font-weight:900;font-size:13px;display:flex;align-items:center;justify-content:center;z-index:40;box-shadow:0 0 0 4px rgba(239,68,68,.3);animation:pulse 2s infinite;cursor:pointer}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 4px rgba(239,68,68,.3)}50%{box-shadow:0 0 0 8px rgba(239,68,68,.1)}}
    .cart-badge{position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;border-radius:50%;width:16px;height:16px;font-size:9px;font-weight:900;display:flex;align-items:center;justify-content:center}
  </style>
</head>
<body>
  ${content}

  <!-- SOS 버튼 -->
  <div class="sos-btn press" onclick="openSOS()" title="긴급 SOS">SOS</div>

  <!-- 하단 네비 -->
  <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] border-t z-50 flex"
       style="background:#0a0a0fee;backdrop-filter:blur(16px);border-color:#1e1e2e">
    ${navHtml}
  </nav>

  <!-- SOS 모달 -->
  <div id="sosModal" class="fixed inset-0 z-[60] hidden items-center justify-center" style="background:rgba(0,0,0,.85)">
    <div class="card w-full max-w-[360px] mx-4 p-5 border" style="border-color:#ef444444">
      <div class="text-center mb-4">
        <p class="text-4xl mb-2">🆘</p>
        <h3 class="font-black text-lg text-white">긴급 상황 SOS</h3>
        <p class="text-xs text-slate-400 mt-1">현재 위치와 연락처가 담당 가이드에게 전송됩니다</p>
      </div>
      <div class="space-y-2">
        <button onclick="sosSend('여권/지갑 분실')" class="w-full py-3 rounded-xl font-bold press text-white" style="background:#f97316">🔑 여권 / 지갑 분실</button>
        <button onclick="sosSend('교통사고/부상')" class="w-full py-3 rounded-xl font-bold press text-white" style="background:#ef4444">🚑 교통사고 / 부상</button>
        <button onclick="sosSend('질병/응급')" class="w-full py-3 rounded-xl font-bold press text-white" style="background:#dc2626">🏥 질병 / 응급</button>
        <button onclick="sosSend('치안/위험')" class="w-full py-3 rounded-xl font-bold press text-white" style="background:#9333ea">⚠️ 치안 위험</button>
        <button onclick="sosSend('기타도움요청')" class="w-full py-3 rounded-xl font-bold press" style="background:#1e1e2e;color:#94a3b8">기타 도움 요청</button>
      </div>
      <button onclick="closeSOS()" class="w-full mt-3 py-2 text-sm text-slate-500 press">취소</button>
    </div>
  </div>

  <!-- 전역 스크립트 -->
  <script>
(function(){
  var CART_KEY='lg_cart', FAV_KEY='lg_favs', BOOK_KEY='lg_bookings', USER_KEY='lg_user';
  window.LG={};

  /* 장바구니 */
  window.LG.getCart=function(){try{return JSON.parse(localStorage.getItem(CART_KEY)||'[]');}catch(e){return[];}};
  window.LG.addCart=function(item){
    var a=window.LG.getCart().filter(function(x){return x.id!==item.id;});
    a.push(item);localStorage.setItem(CART_KEY,JSON.stringify(a));
    window.LG.updateCartBadge();
    window.LG.showToast('장바구니에 추가되었습니다 🛒');
  };
  window.LG.removeCart=function(id){
    var a=window.LG.getCart().filter(function(x){return x.id!==id;});
    localStorage.setItem(CART_KEY,JSON.stringify(a));
    window.LG.updateCartBadge();
  };
  window.LG.isInCart=function(id){return window.LG.getCart().some(function(x){return x.id===id;});};
  window.LG.clearCart=function(){localStorage.removeItem(CART_KEY);window.LG.updateCartBadge();};
  window.LG.updateCartBadge=function(){
    var n=window.LG.getCart().length;
    document.querySelectorAll('.cart-badge-count').forEach(function(el){el.textContent=n;el.style.display=n>0?'flex':'none';});
  };

  /* 즐겨찾기 */
  window.LG.getFavs=function(){try{return JSON.parse(localStorage.getItem(FAV_KEY)||'[]');}catch(e){return[];}};
  window.LG.toggleFav=function(item){
    var a=window.LG.getFavs();
    var idx=a.findIndex(function(x){return x.id===item.id;});
    if(idx>=0){a.splice(idx,1);}else{a.unshift(item);}
    localStorage.setItem(FAV_KEY,JSON.stringify(a));
    return idx<0;
  };
  window.LG.isFav=function(id){return window.LG.getFavs().some(function(x){return x.id===id;});};

  /* 예약 */
  window.LG.getBookings=function(){try{return JSON.parse(localStorage.getItem(BOOK_KEY)||'[]');}catch(e){return[];}};
  window.LG.addBooking=function(b){
    var a=window.LG.getBookings();a.unshift(b);localStorage.setItem(BOOK_KEY,JSON.stringify(a.slice(0,50)));
  };

  /* 유저 */
  window.LG.getUser=function(){try{return JSON.parse(localStorage.getItem(USER_KEY)||'null');}catch(e){return null;}};
  window.LG.saveUser=function(u){localStorage.setItem(USER_KEY,JSON.stringify(u));};

  /* 토스트 */
  window.LG.showToast=function(msg,color){
    var t=document.createElement('div');
    t.className='toast';t.textContent=msg;
    t.style.background=color||'#f59e0b';t.style.color='#0a0a0f';
    document.body.appendChild(t);
    setTimeout(function(){t.style.opacity='0';t.style.transition='opacity .4s';setTimeout(function(){t.remove();},400);},2200);
  };

  /* SOS */
  window.openSOS=function(){
    var m=document.getElementById('sosModal');if(m){m.classList.remove('hidden');m.classList.add('flex');}
  };
  window.closeSOS=function(){
    var m=document.getElementById('sosModal');if(m){m.classList.add('hidden');m.classList.remove('flex');}
  };
  window.sosSend=function(type){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(pos){
        var lat=pos.coords.latitude,lng=pos.coords.longitude;
        window.LG.showToast('SOS 전송! 담당 가이드에게 위치가 전달됩니다','#ef4444');
        window.closeSOS();
      },function(){
        window.LG.showToast('SOS 전송 완료 (위치 없음)','#ef4444');
        window.closeSOS();
      });
    }else{
      window.LG.showToast('SOS 전송 완료','#ef4444');
      window.closeSOS();
    }
  };

  /* 내보내기 JSON */
  window.LG.exportData=function(){
    var data={version:'1.0',exportedAt:new Date().toISOString(),cart:window.LG.getCart(),favs:window.LG.getFavs(),bookings:window.LG.getBookings()};
    var blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='localguide-backup-'+new Date().toISOString().slice(0,10)+'.json';a.click();
  };

  /* 서비스 워커 */
  if('serviceWorker' in navigator){
    window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){});});
  }

  /* 카트 뱃지 업데이트 */
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){window.LG.updateCartBadge();});
  }else{
    window.LG.updateCartBadge();
  }
  /* beforeinstallprompt */
  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window._deferredPrompt=e;});
})();
  </script>
</body>
</html>`
}

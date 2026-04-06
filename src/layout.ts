// Travel Manager - 공통 레이아웃

export const DESTINATIONS = [
  {
    country: '일본', flag: '🇯🇵', code: 'JP',
    cities: ['도쿄', '오사카', '교토', '후쿠오카', '삿포로'],
    color: '#f43f5e',
    theme: '#ff6b6b',
    desc: '전통과 현대가 공존하는 나라',
  },
  {
    country: '태국', flag: '🇹🇭', code: 'TH',
    cities: ['방콕', '치앙마이', '파타야', '푸켓', '코사무이'],
    color: '#f59e0b',
    theme: '#fbbf24',
    desc: '미소의 나라, 황금 사원의 땅',
  },
  {
    country: '베트남', flag: '🇻🇳', code: 'VN',
    cities: ['하노이', '다낭', '호치민', '호이안', '나트랑'],
    color: '#22c55e',
    theme: '#4ade80',
    desc: '에메랄드빛 자연과 쌀국수의 나라',
  },
  {
    country: '대만', flag: '🇹🇼', code: 'TW',
    cities: ['타이베이', '타이중', '가오슝', '화롄'],
    color: '#3b82f6',
    theme: '#60a5fa',
    desc: '야시장과 온천의 보물섬',
  },
  {
    country: '싱가포르', flag: '🇸🇬', code: 'SG',
    cities: ['싱가포르'],
    color: '#a855f7',
    theme: '#c084fc',
    desc: '아시아의 작은 지구촌',
  },
  {
    country: '홍콩', flag: '🇭🇰', code: 'HK',
    cities: ['홍콩'],
    color: '#ec4899',
    theme: '#f472b6',
    desc: '동서양이 만나는 항구 도시',
  },
  {
    country: '인도네시아', flag: '🇮🇩', code: 'ID',
    cities: ['발리', '자카르타', '롬복'],
    color: '#14b8a6',
    theme: '#2dd4bf',
    desc: '신들의 섬 발리를 품은 군도',
  },
  {
    country: '말레이시아', flag: '🇲🇾', code: 'MY',
    cities: ['쿠알라룸푸르', '페낭', '코타키나발루', '랑카위'],
    color: '#f97316',
    theme: '#fb923c',
    desc: '열대우림과 현대 도시의 나라',
  },
]

export const baseLayout = (title: string, content: string, activeNav = 'home') => {
  const navItems = [
    { key: 'home',     icon: 'explore',          label: '탐색',   href: '/' },
    { key: 'dest',     icon: 'travel_explore',   label: '여행지', href: '/destinations' },
    { key: 'planner',  icon: 'event_note',       label: '일정',   href: '/planner' },
    { key: 'tips',     icon: 'tips_and_updates', label: '여행팁', href: '/tips' },
    { key: 'my',       icon: 'account_circle',   label: '마이',   href: '/my' },
  ]

  const navHtml = navItems.map(n => {
    const isActive = n.key === activeNav
    const fillVal = isActive ? 1 : 0
    const colorStyle = isActive ? 'color:#38bdf8' : 'color:#64748b'
    return `<a href="${n.href}" class="flex flex-col items-center gap-0.5 py-2 flex-1 press" style="${colorStyle}">
      <span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' ${fillVal},'wght' 400,'GRAD' 0,'opsz' 24">${n.icon}</span>
      <span class="text-[10px] font-semibold">${n.label}</span>
    </a>`
  }).join('')

  return `<!DOCTYPE html>
<html lang="ko" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="theme-color" content="#0ea5e9">
  <meta name="description" content="아시아 여행매니저 - 일본, 태국, 베트남 등 아시아 최고 여행지 탐색 & 일정 관리">
  <meta property="og:title" content="${title} - Asia Travel Manager">
  <meta property="og:description" content="나만의 아시아 여행 일정을 만들어보세요">
  <meta property="og:type" content="website">
  <meta property="og:image" content="/static/icons/icon-512.png">
  <!-- PWA -->
  <link rel="manifest" href="/manifest.json">
  <link rel="apple-touch-icon" href="/static/icons/icon-152.png">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="여행매니저">
  <meta name="mobile-web-app-capable" content="yes">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✈</text></svg>">
  <title>${title} - Asia Travel Manager</title>
  <link rel="stylesheet" href="/static/tailwind.css">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
  <style>
    *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
    body{font-family:'Apple SD Gothic Neo','Malgun Gothic',system-ui,sans-serif;background:#030712;color:#f1f5f9;min-height:100vh;max-width:430px;margin:0 auto;overflow-x:hidden}
    .material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;user-select:none}
    .press{transition:transform .12s,opacity .12s;cursor:pointer}
    .press:active{transform:scale(.95);opacity:.85}
    .ns{scrollbar-width:none;-ms-overflow-style:none}
    .ns::-webkit-scrollbar{display:none}
    .card{background:#0f172a;border:1px solid #1e293b;border-radius:16px}
    .card-dark{background:#020617;border:1px solid #1e293b;border-radius:16px}
    .badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700}
    .sky{color:#38bdf8}
    .bg-sky-btn{background:#0ea5e9;color:#fff}
    input,textarea,select{background:#0f172a;border:1px solid #1e293b;color:#f1f5f9;border-radius:12px;padding:10px 14px;width:100%;outline:none;font-size:14px}
    input:focus,textarea:focus,select:focus{border-color:#0ea5e9}
    .shimmer{background:linear-gradient(90deg,#0f172a 25%,#1e293b 50%,#0f172a 75%);background-size:400% 100%;animation:shimmer 1.4s infinite}
    @keyframes shimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}
    .fade-in{animation:fadeIn .3s ease}
    @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  </style>
</head>
<body>
  ${content}

  <!-- 하단 네비게이션 -->
  <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] border-t z-50 flex"
       style="background:#030712ee;backdrop-filter:blur(16px);border-color:#1e293b">
    ${navHtml}
  </nav>

  <!-- 전역 스크립트 -->
  <script>
(function(){
  var FAVS='tm_favorites',TRIPS='tm_trips',RECENT='tm_recent';
  window.TM={};
  window.TM.getFavs=function(){try{return JSON.parse(localStorage.getItem(FAVS)||'[]');}catch(e){return[];}};
  window.TM.addFav=function(item){var a=window.TM.getFavs().filter(function(x){return!(x.id===item.id);});a.unshift(item);localStorage.setItem(FAVS,JSON.stringify(a.slice(0,50)));return a.length;};
  window.TM.removeFav=function(id){var a=window.TM.getFavs().filter(function(x){return x.id!==id;});localStorage.setItem(FAVS,JSON.stringify(a));};
  window.TM.isFav=function(id){return window.TM.getFavs().some(function(x){return x.id===id;});};
  window.TM.getTrips=function(){try{return JSON.parse(localStorage.getItem(TRIPS)||'[]');}catch(e){return[];}};
  window.TM.saveTrip=function(trip){var a=window.TM.getTrips().filter(function(x){return x.id!==trip.id;});a.unshift(trip);localStorage.setItem(TRIPS,JSON.stringify(a.slice(0,30)));};
  window.TM.removeTrip=function(id){var a=window.TM.getTrips().filter(function(x){return x.id!==id;});localStorage.setItem(TRIPS,JSON.stringify(a));};
  window.TM.getRecent=function(){try{return JSON.parse(localStorage.getItem(RECENT)||'[]');}catch(e){return[];}};
  window.TM.addRecent=function(item){var a=window.TM.getRecent().filter(function(x){return!(x.id===item.id&&x.type===item.type);});item.viewedAt=new Date().toISOString();a.unshift(item);localStorage.setItem(RECENT,JSON.stringify(a.slice(0,30)));};
  window.TM.exportJSON=function(){
    var data={version:'1.0',exportedAt:new Date().toISOString(),favorites:window.TM.getFavs(),trips:window.TM.getTrips(),recent:window.TM.getRecent()};
    var blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    var a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='travel-manager-backup-'+new Date().toISOString().slice(0,10)+'.json';
    a.click();
  };
  window.TM.exportCSV=function(){
    var favs=window.TM.getFavs();
    var nl=String.fromCharCode(10);
    var hdr='이름,국가,도시,카테고리,추가일';
    var rows=favs.map(function(f){return [f.name||'',f.country||'',f.city||'',f.category||'',f.savedAt||''].join(',');});
    var bom=String.fromCharCode(0xFEFF);
    var csv=bom+[hdr].concat(rows).join(nl);
    var blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
    var a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='travel-manager-favs-'+new Date().toISOString().slice(0,10)+'.csv';
    a.click();
  };
  window.TM.importJSON=function(file){
    var reader=new FileReader();
    reader.onload=function(e){
      try{
        var data=JSON.parse(e.target.result);
        if(data.favorites)localStorage.setItem(FAVS,JSON.stringify(data.favorites));
        if(data.trips)localStorage.setItem(TRIPS,JSON.stringify(data.trips));
        alert('데이터 가져오기 완료!');
        location.reload();
      }catch(err){alert('파일 형식이 올바르지 않습니다.');}
    };
    reader.readAsText(file);
  };
  /* Service Worker */
  if('serviceWorker' in navigator){
    window.addEventListener('load',function(){
      navigator.serviceWorker.register('/sw.js').catch(function(){});
    });
  }
})();
  </script>
</body>
</html>`
}

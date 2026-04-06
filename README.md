# ✈️ Asia Travel Manager

아시아 8개국 여행 탐색 & 일정 관리 앱

## 앱 미리보기
**샌드박스 URL**: https://3001-iru85vrpkytug5v59kv2m-5c13a017.sandbox.novita.ai  
**GitHub**: https://github.com/juhans1472/asia-travel-manager

---

## 주요 기능

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 홈 | `/` | 인기 여행지, 국가 탐색, 테마별 추천 |
| 여행지 탐색 | `/destinations` | 국가/테마 필터, 즐겨찾기, 일정 추가 |
| 여행지 상세 | `/destination/:id` | 명소, 팁, 교통, 음식 정보 |
| 일정 플래너 | `/planner` | 일별 일정 추가/편집/저장 |
| 여행 팁 | `/tips` | 환율 계산기, 회화, 비자, 짐 챙기기, 긴급 정보 |
| 마이 여행 | `/my` | 저장 일정, 즐겨찾기, 최근 조회, 데이터 관리 |

---

## 대상 국가
🇯🇵 일본 (도쿄, 오사카, 교토, 삿포로)  
🇹🇭 태국 (방콕, 푸켓, 치앙마이)  
🇻🇳 베트남 (다낭, 하노이, 하롱베이)  
🇹🇼 대만 (타이베이, 화롄)  
🇸🇬 싱가포르  
🇮🇩 인도네시아 (발리)  
🇲🇾 말레이시아 (쿠알라룸푸르)  
🇭🇰 홍콩  

---

## 데이터 저장 기능
- **즐겨찾기**: 하트 버튼으로 여행지 저장
- **여행 일정**: 일별 스케줄 생성/편집 (localStorage)
- **내보내기**: JSON 백업, CSV (엑셀), 텍스트 일정표
- **가져오기**: JSON 파일 복원
- **PWA 설치**: 홈 화면 추가, 오프라인 지원

---

## 기술 스택
- **Backend**: Hono (TypeScript)
- **Frontend**: Tailwind CSS + Material Icons (CDN)
- **스토리지**: localStorage (즐겨찾기, 일정)
- **배포**: Cloudflare Pages
- **빌드**: Vite + @hono/vite-cloudflare-pages

---

## 로컬 개발
```bash
npm install
npm run build
pm2 start ecosystem.config.cjs
# http://localhost:3001
```

## 배포
```bash
npm run build
npx wrangler pages deploy dist --project-name asia-travel-manager
```

---

## 향후 개발 예정
- [ ] 지도 연동 (Google Maps)
- [ ] 날씨 API 연동
- [ ] 항공편 검색 연결
- [ ] 다국어 지원
- [ ] 소셜 공유 기능
- [ ] 여행 후기/리뷰 작성

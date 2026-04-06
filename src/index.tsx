import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { homePage } from './pages/home'
import { toursPage, tourDetailPage } from './pages/tours'
import { guidesPage, guideDetailPage } from './pages/guides'
import { cartPage } from './pages/cart'
import { plannerPage } from './pages/planner'
import { tipsPage } from './pages/tips'
import { myPage } from './pages/mypage'

const app = new Hono()

// Static files
app.use('/static/*', serveStatic({ root: './' }))

// PWA 파일
app.get('/manifest.json', async (c) => {
  const env = c.env as { ASSETS?: { fetch: (req: Request) => Promise<Response> } }
  if (env?.ASSETS) {
    const url = new URL('/manifest.json', c.req.url)
    return env.ASSETS.fetch(new Request(url.toString()))
  }
  return c.redirect('/static/../manifest.json', 301)
})

app.get('/sw.js', async (c) => {
  const env = c.env as { ASSETS?: { fetch: (req: Request) => Promise<Response> } }
  if (env?.ASSETS) {
    const url = new URL('/sw.js', c.req.url)
    return env.ASSETS.fetch(new Request(url.toString()))
  }
  return c.redirect('/static/../sw.js', 301)
})

// API (CORS)
app.use('/api/*', cors({ origin: '*', allowMethods: ['GET','POST','PATCH','DELETE','OPTIONS'] }))

// API 엔드포인트
app.get('/api/tours', (c) => {
  const country = c.req.query('country') || ''
  const theme   = c.req.query('theme')   || ''
  return c.json({ country, theme, message: 'Use the web pages for full functionality' })
})

app.get('/api/guides', (c) => {
  return c.json({ message: 'Use /guides page for full guide listings' })
})

app.get('/api/bookings', (c) => {
  return c.json({ message: 'Bookings are stored client-side via localStorage' })
})

// ── 홈 ──────────────────────────────────────────────────
app.get('/', (c) => c.html(homePage()))

// ── 투어 ────────────────────────────────────────────────
app.get('/tours', (c) => {
  const country = c.req.query('country') || ''
  const theme   = c.req.query('theme')   || ''
  return c.html(toursPage(country, theme))
})

app.get('/tour/:id', (c) => {
  const id = c.req.param('id')
  return c.html(tourDetailPage(id))
})

// ── 가이드 ──────────────────────────────────────────────
app.get('/guides', (c) => {
  const country = c.req.query('country') || ''
  return c.html(guidesPage(country))
})

app.get('/guide/:id', (c) => {
  const id = c.req.param('id')
  return c.html(guideDetailPage(id))
})

// ── 장바구니 ────────────────────────────────────────────
app.get('/cart', (c) => c.html(cartPage()))

// ── 플래너 ──────────────────────────────────────────────
app.get('/planner', (c) => {
  const dest    = c.req.query('dest')    || ''
  const city    = c.req.query('city')    || ''
  const country = c.req.query('country') || ''
  const flag    = c.req.query('flag')    || ''
  return c.html(plannerPage(dest, city, country, flag))
})

// ── 팁 ──────────────────────────────────────────────────
app.get('/tips', (c) => {
  const tab = c.req.query('tab') || 'currency'
  return c.html(tipsPage(tab))
})

// ── 마이페이지 ──────────────────────────────────────────
app.get('/my', (c) => {
  const tab = c.req.query('tab') || 'bookings'
  return c.html(myPage(tab))
})

export default app

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { homePage } from './pages/home'
import { destinationsPage, destinationDetailPage } from './pages/destinations'
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
app.get('/api/destinations', (c) => {
  const country = c.req.query('country') || ''
  const theme   = c.req.query('theme')   || ''
  return c.json({ country, theme, message: 'Use the web pages for full functionality' })
})

app.get('/api/trips', (c) => {
  return c.json({ message: 'Trips are stored client-side via localStorage' })
})

// ── 페이지 라우트 ──────────────────────────────────
app.get('/', (c) => c.html(homePage()))

app.get('/destinations', (c) => {
  const country = c.req.query('country') || ''
  const theme   = c.req.query('theme')   || ''
  return c.html(destinationsPage(country, theme))
})

app.get('/destination/:id', (c) => {
  const id = c.req.param('id')
  return c.html(destinationDetailPage(id))
})

app.get('/planner', (c) => {
  const dest    = c.req.query('dest')    || ''
  const city    = c.req.query('city')    || ''
  const country = c.req.query('country') || ''
  const flag    = c.req.query('flag')    || ''
  return c.html(plannerPage(dest, city, country, flag))
})

app.get('/tips', (c) => {
  const tab = c.req.query('tab') || 'currency'
  return c.html(tipsPage(tab))
})

app.get('/my', (c) => c.html(myPage()))

export default app

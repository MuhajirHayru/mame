import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { t, LANGS, AVAILABLE_LANGS } from './translations'

const BASE = import.meta.env.BASE_URL || '/'

const VIDEOS = {
  faceAuth: [
    { id: 'Uyt2egIE1yk', titleEn: 'Face Authentication – Full Guide' },
  ],
  getStarted: [
    { id: 'Uyt2egIE1yk', titleEn: 'Getting Started on the Platform' },
  ],
  tasks: [
    { id: 'rSx69gz77Pg', titleEn: 'How to Complete Daily Tasks' },
  ],
  withdraw: [
    { id: 'uP0kaqwBQu0', titleEn: 'How to Withdraw Your Earnings' },
  ],
  exchange: [
    { id: '8hc6GPo9qow', titleEn: 'How to Exchange and Get Points' },
  ],
  platform: [
    { id: 'yVNBF5y6nmo', titleEn: 'Platform Information & Rules' },
  ],
  agency: [
    { id: 'e3iI5sqwQro', titleEn: 'How to Create an Agency' },
  ],
  inviteHosts: [
    { id: 'LoHAh5SUKRI', titleEn: 'How to Invite New Hosts' },
  ],
  applyAgency: [
    { id: 'e3iI5sqwQro', titleEn: 'How to Apply to an Agency' },
  ],
}

const CATS = [
  { id: 'faceAuth',    key: 'cat.faceAuth',     descKey: 'cat.faceAuth.desc',    icon: '🪪', color: '#818cf8' },
  { id: 'getStarted',  key: 'cat.getStarted',   descKey: 'cat.getStarted.desc',  icon: '🚀', color: '#38bdf8' },
  { id: 'tasks',       key: 'cat.tasks',        descKey: 'cat.tasks.desc',       icon: '✅', color: '#34d399' },
  { id: 'withdraw',    key: 'cat.withdraw',     descKey: 'cat.withdraw.desc',    icon: '💰', color: '#fbbf24' },
  { id: 'exchange',    key: 'cat.exchange',     descKey: 'cat.exchange.desc',    icon: '🔄', color: '#f472b6' },
  { id: 'platform',    key: 'cat.platform',     descKey: 'cat.platform.desc',    icon: '📱', color: '#a78bfa' },
  { id: 'agency',      key: 'cat.agency',       descKey: 'cat.agency.desc',      icon: '🏢', color: '#2dd4bf' },
  { id: 'inviteHosts', key: 'cat.inviteHosts',  descKey: 'cat.inviteHosts.desc', icon: '👥', color: '#fb923c' },
  { id: 'applyAgency', key: 'cat.applyAgency',  descKey: 'cat.applyAgency.desc', icon: '📋', color: '#22d3ee' },
]

const NAV_ITEMS = [
  { id: 'home',      key: 'nav.home' },
  { id: 'tutorials', key: 'nav.tutorials' },
  { id: 'about',     key: 'nav.about' },
  { id: 'contact',   key: 'nav.contact' },
]

const LANG_FLAGS = {
  EN: '🇬🇧', FR: '🇫🇷', AR: '🇸🇦', AM: '🇪🇹', OM: '🇪🇹', TL: '🇵🇭',
}

// ── Custom Language Dropdown ──
function LangPicker({ lang, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  return (
    <div className="lang-picker" ref={ref}>
      <button className="lang-trigger" onClick={() => setOpen(v => !v)} aria-haspopup="listbox" aria-expanded={open}>
        <span className="lang-trigger-globe" aria-hidden="true">🌐</span>
        <span className="lang-trigger-code">{lang}</span>
        <span className={`lang-trigger-chev${open ? ' open' : ''}`} aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className="lang-menu" role="listbox" aria-label="Select language">
          {AVAILABLE_LANGS.map(code => {
            const l = LANGS[code]
            return (
              <button
                key={code}
                role="option"
                aria-selected={lang === code}
                className={`lang-opt${lang === code ? ' active' : ''}`}
                onClick={() => { onChange(code); setOpen(false) }}
              >
                <span className="lang-opt-flag" aria-hidden="true">{LANG_FLAGS[code]}</span>
                <span className="lang-opt-name">{l.name}</span>
                <span className="lang-opt-code">{l.label}</span>
                {lang === code && <span className="lang-opt-check" aria-label="Selected">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Video Modal ──
function VideoModal({ video, lang, onClose }) {
  const closeRef = useRef(onClose)
  const overlayRef = useRef(null)
  const prevFocusRef = useRef(null)

  // Keep the latest onClose in a ref so the effect doesn't need to re-run
  useEffect(() => { closeRef.current = onClose }, [onClose])

  useEffect(() => {
    // Save previously focused element
    prevFocusRef.current = document.activeElement

    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeRef.current()
        return
      }
      // Basic focus trap
      if (e.key === 'Tab' && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      // Restore focus
      if (prevFocusRef.current && typeof prevFocusRef.current.focus === 'function') {
        prevFocusRef.current.focus()
      }
    }
  }, []) // no deps — closeRef keeps it stable

  return (
    <div className="overlay" onClick={onClose} ref={overlayRef} role="dialog" aria-modal="true" aria-label={video.titleEn}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{video.titleEn}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close video">✕</button>
        </div>
        <div className="modal-video">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.titleEn}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="modal-footer">{t('modal.esc', lang)}</div>
      </div>
    </div>
  )
}

// ── Video Card ──
function VideoCard({ video, index, onPlay, lang }) {
  return (
    <button className="vcard" onClick={() => onPlay(video)} style={{ '--delay': `${index * 0.07}s` }} aria-label={`${t('tuts.watchNow', lang)}: ${video.titleEn}`}>
      <div className="vcard-thumb">
        <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.titleEn} loading="lazy" />
        <div className="vcard-overlay" aria-hidden="true">
          <div className="vcard-play">
            <svg viewBox="0 0 24 24" fill="white" width="36" height="36"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
        <span className="vcard-num">#{index + 1}</span>
      </div>
      <div className="vcard-info">
        <span className="vcard-title">{video.titleEn}</span>
        <span className="vcard-cta">{t('tuts.watchNow', lang)} →</span>
      </div>
    </button>
  )
}

// ── Category Row (Accordion) ──
function CatRow({ cat, onPlay, lang, open, onToggle }) {
  const videos = VIDEOS[cat.id] || []
  const bodyRef = useRef(null)
  const rowRef = useRef(null)

  useEffect(() => {
    if (open && rowRef.current) {
      const id = requestAnimationFrame(() => {
        rowRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      })
      return () => cancelAnimationFrame(id)
    }
  }, [open])

  return (
    <div ref={rowRef} className={`catrow${open ? ' catrow--open' : ''}`} style={{ '--cc': cat.color }}>
      <button
        className="catrow-head"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`cat-body-${cat.id}`}
      >
        <div className="catrow-left">
          <div className="catrow-icon-wrap" style={{ background: `${cat.color}1a`, borderColor: `${cat.color}40` }}>
            <span className="catrow-icon" aria-hidden="true">{cat.icon}</span>
          </div>
          <div className="catrow-text">
            <span className="catrow-label">{t(cat.key, lang)}</span>
            <span className="catrow-desc">{t(cat.descKey, lang)}</span>
          </div>
        </div>
        <div className="catrow-right">
          <span className="catrow-count">{videos.length} {t('tuts.videoCount', lang)}</span>
          <span className={`catrow-arrow${open ? ' open' : ''}`} aria-hidden="true">›</span>
        </div>
      </button>
      <div
        ref={bodyRef}
        className="catrow-body"
        id={`cat-body-${cat.id}`}
        role="region"
        aria-labelledby={`cat-head-${cat.id}`}
        style={{
          gridTemplateRows: open ? '1fr' : '0fr',
          opacity: open ? 1 : 0,
          padding: open ? '16px 20px' : '0 20px',
        }}
      >
        <div className="catrow-body-inner">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} index={videos.indexOf(v)} onPlay={onPlay} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Home Page ──
function HomePage({ setPage, onPlay, lang }) {
  const featured = VIDEOS.faceAuth[0]
  return (
    <div className="page">
      <section className="hero" aria-label="Hero">
        <div className="hero-orb orb1" aria-hidden="true" />
        <div className="hero-orb orb2" aria-hidden="true" />
        <div className="hero-orb orb3" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-badge"><span className="live-dot" aria-hidden="true" />{t('home.badge', lang)}</div>
          <h1 className="hero-h1">{t('home.title1', lang)}<span className="hero-accent">{t('home.title2', lang)}</span></h1>
          <p className="hero-p">{t('home.desc', lang)}</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => setPage('tutorials')}>{t('home.browseBtn', lang)} <span aria-hidden="true">→</span></button>
            <button className="btn-outline" onClick={() => onPlay(featured)}><span className="tri" aria-hidden="true">▶</span> {t('home.watchBtn', lang)}</button>
          </div>
        </div>
        <div className="hero-stats">
          {[['9', t('home.statCategories', lang)], ['27+', t('home.statVideos', lang)], ['24/7', t('home.statAccess', lang)], ['6', t('home.statLanguages', lang)]].map(([n, l], i) => (
            <div key={l} className="hsg">
              {i > 0 && <div className="hsd" aria-hidden="true" />}
              <div className="hs"><strong>{n}</strong><span>{l}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sec-title"><span aria-hidden="true">⭐</span> {t('home.featuredTitle', lang)} <div className="sec-line" aria-hidden="true" /></div>
        <button className="feat" onClick={() => onPlay(featured)} aria-label={`${t('home.featuredTitle', lang)}: ${featured.titleEn}`}>
          <div className="feat-thumb">
            <img src={`https://img.youtube.com/vi/${featured.id}/hqdefault.jpg`} alt={featured.titleEn} />
            <div className="feat-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="white" width="52" height="52"><path d="M8 5v14l11-7z" /></svg></div>
          </div>
          <div className="feat-info">
            <span className="feat-badge">🔥 {t('home.featuredBadge', lang)}</span>
            <span className="feat-title">{featured.titleEn}</span>
            <p>{t('home.featuredDesc', lang)}</p>
            <span className="feat-cta">{t('home.watchNow', lang)} →</span>
          </div>
        </button>
      </section>

      <section className="section">
        <div className="sec-title"><span aria-hidden="true">📚</span> {t('home.allCategories', lang)} <div className="sec-line" aria-hidden="true" /></div>
        <div className="cat-grid" role="list" aria-label={t('home.allCategories', lang)}>
          {CATS.map((c) => (
            <button key={c.id} className="cat-card" style={{ '--cc': c.color, '--delay': `${CATS.indexOf(c) * 0.06}s` }} onClick={() => setPage('tutorials', c.id)} role="listitem">
              <div className="cat-card-icon" aria-hidden="true" style={{ background: `${c.color}1a` }}>{c.icon}</div>
              <div className="cat-card-body">
                <strong>{t(c.key, lang)}</strong>
                <p>{t(c.descKey, lang)}</p>
              </div>
              <span className="cat-card-count">{(VIDEOS[c.id]||[]).length} {t('tuts.videoCount', lang)} <span className="cat-card-arrow" aria-hidden="true">→</span></span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

// ── Tutorials Page ──
function TutorialsPage({ onPlay, openCatId, lang }) {
  const [q, setQ] = useState('')
  const searchRef = useRef(null)
  const [openCat, setOpenCat] = useState(openCatId || CATS[0]?.id || null)

  // Sync when navigating from home with a category
  useEffect(() => {
    if (openCatId) setOpenCat(openCatId)
  }, [openCatId]) // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = q.trim()
    ? CATS.filter(c =>
        t(c.key, lang).toLowerCase().includes(q.toLowerCase()) ||
        t(c.descKey, lang).toLowerCase().includes(q.toLowerCase()) ||
        (VIDEOS[c.id]||[]).some(v => v.titleEn.toLowerCase().includes(q.toLowerCase()))
      )
    : CATS

  const resultsId = 'search-results-count'

  return (
    <div className="page">
      <div className="page-hd">
        <h1>🎬 {t('tuts.title', lang)}</h1>
        <p>{t('tuts.desc', lang)}</p>
      </div>
      <div className="searchbox" role="search">
        <span aria-hidden="true">🔍</span>
        <input
          ref={searchRef}
          type="search"
          placeholder={t('tuts.search', lang)}
          value={q}
          onChange={e => setQ(e.target.value)}
          aria-describedby={resultsId}
        />
        {q && <button className="search-x" onClick={() => { setQ(''); searchRef.current?.focus() }} aria-label="Clear search">✕</button>}
      </div>
      <div id={resultsId} className="sr-only" aria-live="polite">
        {filtered.length} {t('tuts.videoCount', lang)}
      </div>
      {filtered.length === 0 && <div className="empty">{t('tuts.noResults', lang)} &ldquo;<strong>{q}</strong>&rdquo;</div>}
      <div className="cat-list">
        {filtered.map((c) => (
          <CatRow
            key={c.id}
            cat={c}
            onPlay={onPlay}
            lang={lang}
            open={openCat === c.id}
            onToggle={() => setOpenCat(openCat === c.id ? null : c.id)}
          />
        ))}
      </div>
    </div>
  )
}

// ── About Page ──
function AboutPage({ lang }) {
  const items = [
    { icon: '🎯', titleKey: 'about.missionTitle', bodyKey: 'about.missionBody' },
    { icon: '🌍', titleKey: 'about.whoTitle',     bodyKey: 'about.whoBody' },
    { icon: '🪪', titleKey: 'about.familyIdTitle', bodyKey: 'about.familyIdBody' },
    { icon: '🏆', titleKey: 'about.whatTitle',     bodyKey: 'about.whatBody' },
    { icon: '🤝', titleKey: 'about.valuesTitle',   bodyKey: 'about.valuesBody' },
    { icon: '📈', titleKey: 'about.growthTitle',   bodyKey: 'about.growthBody' },
  ]
  return (
    <div className="page">
      <div className="page-hd">
        <h1>ℹ️ {t('about.title', lang)}</h1>
        <p>{t('about.desc', lang)}</p>
      </div>
      <div className="about-grid">
        {items.map((it) => (
          <div key={it.titleKey} className="about-card" style={{ '--delay': `${items.indexOf(it) * 0.08}s` }}>
            <span className="about-icon" aria-hidden="true">{it.icon}</span>
            <h2 className="about-card-title">{t(it.titleKey, lang)}</h2>
            <p>{t(it.bodyKey, lang)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Contact Page ──
function ContactPage({ lang }) {
  return (
    <div className="page">
      <div className="page-hd">
        <h1>📬 {t('contact.title', lang)}</h1>
        <p>{t('contact.desc', lang)}</p>
      </div>
      <div className="contact-grid">
        <a href="mailto:hello@halamobile.com" className="contact-card">
          <span className="contact-icon" aria-hidden="true">✉️</span>
          <div><strong>{t('contact.emailLabel', lang)}</strong><span>hello@halamobile.com</span><p>{t('contact.emailDesc', lang)}</p></div>
        </a>
        <a href="tel:0923566471" className="contact-card">
          <span className="contact-icon" aria-hidden="true">📞</span>
          <div><strong>{t('contact.phoneLabel', lang)}</strong><span>0923566471</span><p>{t('contact.phoneDesc', lang)}</p></div>
        </a>
        <a href="https://wa.me/0923566471" target="_blank" rel="noreferrer" className="contact-card">
          <span className="contact-icon" aria-hidden="true">💬</span>
          <div><strong>{t('contact.whatsappLabel', lang)}</strong><span>0923566471</span><p>{t('contact.whatsappDesc', lang)}</p></div>
        </a>
        <a href="https://t.me/mame3398" target="_blank" rel="noreferrer" className="contact-card">
          <span className="contact-icon" aria-hidden="true">✈️</span>
          <div><strong>{t('contact.telegramLabel', lang)}</strong><span>@mame3398</span><p>{t('contact.telegramDesc', lang)}</p></div>
        </a>
        <div className="contact-card no-hover">
          <span className="contact-icon" aria-hidden="true">🪪</span>
          <div><strong>{t('contact.agencyLabel', lang)}</strong><span>1099400</span><p>{t('contact.agencyDesc', lang)}</p></div>
        </div>
      </div>
      <div className="contact-note">
        <span aria-hidden="true">💡</span>
        <p>{t('contact.note', lang)}</p>
      </div>
    </div>
  )
}

// ── App Root ──
export default function App() {
  const [page, setPage]       = useState('home')
  const [catId, setCatId]     = useState(null)
  const [playing, setPlaying] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang]       = useState('EN')
  const drawerRef = useRef(null)

  const navigate = useCallback((p, c) => {
    setPage(p); setCatId(c || null); setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const closePlaying = useCallback(() => setPlaying(null), [])

  useEffect(() => {
    const fn = (e) => { if (drawerRef.current && !drawerRef.current.contains(e.target)) setMenuOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  useEffect(() => {
    document.documentElement.dir = LANGS[lang]?.dir || 'ltr'
  }, [lang])

  return (
    <div className={`app${LANGS[lang]?.dir === 'rtl' ? ' rtl' : ''}`}>
      <header className="navbar">
        <button className="nb-brand" onClick={() => navigate('home')}>
          <img src={`${BASE}mame-logo.jpg`} alt="Mame Family" className="nb-logo" />
          <div className="nb-info">
            <span className="nb-name">{t('nav.brand', lang)}</span>
            <span className="nb-id">{t('nav.id', lang)}</span>
          </div>
        </button>

        <nav className="nb-nav" aria-label="Main navigation">
          {NAV_ITEMS.map(n => (
            <button key={n.id} className={`nb-link${page === n.id ? ' active' : ''}`} onClick={() => navigate(n.id)}>
              {t(n.key, lang)}
            </button>
          ))}
        </nav>

        <div className="nb-right">
          <LangPicker lang={lang} onChange={setLang} />
          <button className={`burger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
        </div>

        {menuOpen && (
          <div className="drawer" ref={drawerRef} role="navigation" aria-label="Mobile navigation">
            <div className="drawer-group">
              {NAV_ITEMS.map(n => (
                <button key={n.id} className={`drawer-item${page === n.id ? ' active' : ''}`} onClick={() => navigate(n.id)}>
                  {t(n.key, lang)}
                </button>
              ))}
            </div>
            <div className="drawer-label">{t('nav.categories', lang)}</div>
            <div className="drawer-group">
              {CATS.map(c => (
                <button key={c.id} className="drawer-item" onClick={() => navigate('tutorials', c.id)}>
                  <span className="drawer-cat-icon" aria-hidden="true">{c.icon}</span> {t(c.key, lang)}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="main" id="main-content">
        {page === 'home'      && <HomePage      setPage={navigate} onPlay={setPlaying} lang={lang} />}
        {page === 'tutorials' && <TutorialsPage onPlay={setPlaying} openCatId={catId} lang={lang} />}
        {page === 'about'     && <AboutPage lang={lang} />}
        {page === 'contact'   && <ContactPage lang={lang} />}
      </main>

      <footer className="footer" role="contentinfo">
        <div className="footer-body">
          <div className="footer-brand">
            <img src={`${BASE}mame-logo.jpg`} alt="Mame Family" className="footer-logo" />
            <div>
              <div className="footer-name">{t('nav.brand', lang)}</div>
              <div className="footer-sub">{t('nav.subtitle', lang)}</div>
            </div>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <div className="footer-col-hd">{t('footer.pages', lang)}</div>
              {NAV_ITEMS.map(n => <button key={n.id} className="footer-link" onClick={() => navigate(n.id)}>{t(n.key, lang)}</button>)}
            </div>
            <div className="footer-col">
              <div className="footer-col-hd">{t('footer.categories', lang)}</div>
              {CATS.slice(0,5).map(c => <button key={c.id} className="footer-link" onClick={() => navigate('tutorials', c.id)}>{t(c.key, lang)}</button>)}
            </div>
            <div className="footer-col">
              <div className="footer-col-hd">{t('footer.contact', lang)}</div>
              <a className="footer-link" href="mailto:hello@halamobile.com">✉️ hello@halamobile.com</a>
              <a className="footer-link" href="tel:0923566471">� 0923566471</a>
              <a className="footer-link" href="https://wa.me/0923566471" target="_blank" rel="noreferrer">💬 WhatsApp</a>
              <a className="footer-link" href="https://t.me/mame3398" target="_blank" rel="noreferrer">✈️ @mame3398</a>
              <span className="footer-link">🪪 ID: 1099400</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} {t('nav.brand', lang)} · {t('nav.id', lang)} · {t('footer.copyright', lang)}
        </div>
      </footer>

      {playing && <VideoModal video={playing} lang={lang} onClose={closePlaying} />}
    </div>
  )
}

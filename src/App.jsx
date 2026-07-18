import { useEffect, useRef, useState } from 'react'
import './App.css'
import { t, LANGS, AVAILABLE_LANGS } from './translations'

const VIDEOS = {
  faceAuth: [
    { id: 'rSx69gz77Pg', titleEn: 'Face Authentication – Full Guide' },
    { id: '2Vv-BfVoq4g', titleEn: 'Face ID Setup Step by Step' },
    { id: 'tAGnKpE4NCI', titleEn: 'Verify Your Identity on Hala' },
  ],
  getStarted: [
    { id: 'V3GaxZKU0zY', titleEn: 'How to Get Started on the Platform' },
    { id: 'kXYiU_JCYtU', titleEn: 'First Steps After Registration' },
    { id: 'CevxZvSJLk8', titleEn: 'Complete Beginner Walkthrough' },
  ],
  tasks: [
    { id: 'IUjWvHXvD3g', titleEn: 'How to Complete Daily Tasks' },
    { id: 'gqF50QQq1bU', titleEn: 'Task Status and Staying Active' },
    { id: 'tVj0ZTS4WF4', titleEn: 'Task Guide for New Agents' },
  ],
  withdraw: [
    { id: '3JZ_D3ELwOQ', titleEn: 'How to Withdraw Your Earnings' },
    { id: '04854XqcfCY', titleEn: 'Withdrawal Methods Explained' },
    { id: 'QtXby3twMmI', titleEn: 'Coins Withdrawal Step by Step' },
  ],
  exchange: [
    { id: '60ItHLz5WEA', titleEn: 'How to Exchange and Get Points' },
    { id: 'rSx69gz77Pg', titleEn: 'Coin Exchange Full Tutorial' },
    { id: '2Vv-BfVoq4g', titleEn: 'Points System Explained' },
  ],
  platform: [
    { id: 'tAGnKpE4NCI', titleEn: 'Platform General Overview' },
    { id: 'V3GaxZKU0zY', titleEn: 'Rules and Guidelines for Hosts' },
    { id: 'kXYiU_JCYtU', titleEn: 'Platform Features Tour' },
  ],
  agency: [
    { id: 'CevxZvSJLk8', titleEn: 'How to Create an Agency' },
    { id: 'IUjWvHXvD3g', titleEn: 'Agency Setup and Management' },
    { id: 'gqF50QQq1bU', titleEn: 'Agency Leader Responsibilities' },
  ],
  inviteHosts: [
    { id: 'tVj0ZTS4WF4', titleEn: 'How to Invite New Hosts' },
    { id: '3JZ_D3ELwOQ', titleEn: 'Recruit Hosts from the Platform' },
    { id: '04854XqcfCY', titleEn: 'Growing Your Host Network' },
  ],
  applyAgency: [
    { id: 'QtXby3twMmI', titleEn: 'How to Apply to an Agency' },
    { id: '60ItHLz5WEA', titleEn: 'Agency Application Process' },
    { id: 'rSx69gz77Pg', titleEn: 'What Happens After You Apply' },
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
        <span className="lang-trigger-globe">🌐</span>
        <span className="lang-trigger-code">{lang}</span>
        <span className={`lang-trigger-chev${open ? ' open' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="lang-menu" role="listbox">
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
                <span className="lang-opt-flag">{LANG_FLAGS[code]}</span>
                <span className="lang-opt-name">{l.name}</span>
                <span className="lang-opt-code">{l.label}</span>
                {lang === code && <span className="lang-opt-check">✓</span>}
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
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{video.titleEn}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
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
    <button className="vcard" onClick={() => onPlay(video)} style={{ '--delay': `${index * 0.07}s` }}>
      <div className="vcard-thumb">
        <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.titleEn} loading="lazy" />
        <div className="vcard-overlay">
          <div className="vcard-play">
            <svg viewBox="0 0 24 24" fill="white" width="36" height="36"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
        <span className="vcard-num">#{index + 1}</span>
      </div>
      <div className="vcard-info">
        <p className="vcard-title">{video.titleEn}</p>
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
      requestAnimationFrame(() => {
        rowRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      })
    }
  }, [open])

  return (
    <div ref={rowRef} className={`catrow${open ? ' catrow--open' : ''}`} style={{ '--cc': cat.color }}>
      <button className="catrow-head" onClick={onToggle}>
        <div className="catrow-left">
          <div className="catrow-icon-wrap" style={{ background: `${cat.color}1a`, borderColor: `${cat.color}40` }}>
            <span className="catrow-icon">{cat.icon}</span>
          </div>
          <div className="catrow-text">
            <span className="catrow-label">{t(cat.key, lang)}</span>
            <span className="catrow-desc">{t(cat.descKey, lang)}</span>
          </div>
        </div>
        <div className="catrow-right">
          <span className="catrow-count">{videos.length} {t('tuts.videoCount', lang)}</span>
          <span className={`catrow-arrow${open ? ' open' : ''}`} aria-hidden>›</span>
        </div>
      </button>
      <div
        ref={bodyRef}
        className="catrow-body"
        style={{
          gridTemplateRows: open ? '1fr' : '0fr',
          opacity: open ? 1 : 0,
          padding: open ? '16px 20px' : '0 20px',
        }}
      >
        <div className="catrow-body-inner">
          {videos.map((v, i) => (
            <VideoCard key={v.id + i} video={v} index={i} onPlay={onPlay} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Home Page ──
function HomePage({ navigate, onPlay, lang }) {
  const featured = VIDEOS.faceAuth[0]
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-orb orb1" />
        <div className="hero-orb orb2" />
        <div className="hero-orb orb3" />
        <div className="hero-inner">
          <div className="hero-badge"><span className="live-dot" />{t('home.badge', lang)}</div>
          <h1 className="hero-h1">{t('home.title1', lang)}<span className="hero-accent">{t('home.title2', lang)}</span></h1>
          <p className="hero-p">{t('home.desc', lang)}</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate('tutorials')}>{t('home.browseBtn', lang)} <span>→</span></button>
            <button className="btn-outline" onClick={() => onPlay(featured)}><span className="tri">▶</span> {t('home.watchBtn', lang)}</button>
          </div>
        </div>
        <div className="hero-stats">
          {[['9', t('home.statCategories', lang)], ['27+', t('home.statVideos', lang)], ['24/7', t('home.statAccess', lang)], ['6', t('home.statLanguages', lang)]].map(([n, l], i) => (
            <div key={l} className="hsg">
              {i > 0 && <div className="hsd" />}
              <div className="hs"><strong>{n}</strong><span>{l}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sec-title"><span>⭐</span> {t('home.featuredTitle', lang)} <div className="sec-line" /></div>
        <button className="feat" onClick={() => onPlay(featured)}>
          <div className="feat-thumb">
            <img src={`https://img.youtube.com/vi/${featured.id}/hqdefault.jpg`} alt={featured.titleEn} />
            <div className="feat-play"><svg viewBox="0 0 24 24" fill="white" width="52" height="52"><path d="M8 5v14l11-7z" /></svg></div>
          </div>
          <div className="feat-info">
            <span className="feat-badge">🔥 {t('home.featuredBadge', lang)}</span>
            <h3>{featured.titleEn}</h3>
            <p>{t('home.featuredDesc', lang)}</p>
            <span className="feat-cta">{t('home.watchNow', lang)} →</span>
          </div>
        </button>
      </section>

      <section className="section">
        <div className="sec-title"><span>📚</span> {t('home.allCategories', lang)} <div className="sec-line" /></div>
        <div className="cat-grid">
          {CATS.map((c, i) => (
            <button key={c.id} className="cat-card" style={{ '--cc': c.color, '--delay': `${i * 0.06}s` }} onClick={() => navigate('tutorials', c.id)}>
              <div className="cat-card-icon" style={{ background: `${c.color}1a` }}>{c.icon}</div>
              <div className="cat-card-body">
                <strong>{t(c.key, lang)}</strong>
                <p>{t(c.descKey, lang)}</p>
              </div>
              <span className="cat-card-count">{(VIDEOS[c.id]||[]).length} {t('tuts.videoCount', lang)} <span className="cat-card-arrow">→</span></span>
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
  const [openCat, setOpenCat] = useState(openCatId || CATS[0]?.id || null)

  useEffect(() => {
    if (openCatId) setOpenCat(openCatId)
  }, [openCatId])

  const filtered = q.trim()
    ? CATS.filter(c =>
        t(c.key, lang).toLowerCase().includes(q.toLowerCase()) ||
        t(c.descKey, lang).toLowerCase().includes(q.toLowerCase()) ||
        (VIDEOS[c.id]||[]).some(v => v.titleEn.toLowerCase().includes(q.toLowerCase()))
      )
    : CATS

  return (
    <div className="page">
      <div className="page-hd">
        <h1>🎬 {t('tuts.title', lang)}</h1>
        <p>{t('tuts.desc', lang)}</p>
      </div>
      <div className="searchbox">
        <span>🔍</span>
        <input type="search" placeholder={t('tuts.search', lang)} value={q} onChange={e => setQ(e.target.value)} />
        {q && <button className="search-x" onClick={() => setQ('')}>✕</button>}
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
        {items.map((it, i) => (
          <div key={it.titleKey} className="about-card" style={{ '--delay': `${i * 0.08}s` }}>
            <span className="about-icon">{it.icon}</span>
            <h3>{t(it.titleKey, lang)}</h3>
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
          <span className="contact-icon">✉️</span>
          <div><strong>{t('contact.emailLabel', lang)}</strong><span>hello@halamobile.com</span><p>{t('contact.emailDesc', lang)}</p></div>
        </a>
        <a href="tel:+1234567890" className="contact-card">
          <span className="contact-icon">📞</span>
          <div><strong>{t('contact.phoneLabel', lang)}</strong><span>+1 234 567 890</span><p>{t('contact.phoneDesc', lang)}</p></div>
        </a>
        <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="contact-card">
          <span className="contact-icon">💬</span>
          <div><strong>{t('contact.whatsappLabel', lang)}</strong><span>+1 234 567 890</span><p>{t('contact.whatsappDesc', lang)}</p></div>
        </a>
        <div className="contact-card no-hover">
          <span className="contact-icon">🪪</span>
          <div><strong>{t('contact.agencyLabel', lang)}</strong><span>1099400</span><p>{t('contact.agencyDesc', lang)}</p></div>
        </div>
      </div>
      <div className="contact-note">
        <span>💡</span>
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

  const navigate = (p, c) => {
    setPage(p); setCatId(c || null); setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
          <img src="/mame-logo.jpg" alt="Mame Family" className="nb-logo" />
          <div className="nb-info">
            <span className="nb-name">{t('nav.brand', lang)}</span>
            <span className="nb-id">{t('nav.id', lang)}</span>
          </div>
        </button>

        <nav className="nb-nav">
          {NAV_ITEMS.map(n => (
            <button key={n.id} className={`nb-link${page === n.id ? ' active' : ''}`} onClick={() => navigate(n.id)}>
              {t(n.key, lang)}
            </button>
          ))}
        </nav>

        <div className="nb-right">
          <LangPicker lang={lang} onChange={setLang} />
          <button className={`burger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>

        {menuOpen && (
          <div className="drawer" ref={drawerRef}>
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
                  <span className="drawer-cat-icon">{c.icon}</span> {t(c.key, lang)}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="main">
        {page === 'home'      && <HomePage      navigate={navigate} onPlay={setPlaying} lang={lang} />}
        {page === 'tutorials' && <TutorialsPage onPlay={setPlaying} openCatId={catId} lang={lang} />}
        {page === 'about'     && <AboutPage lang={lang} />}
        {page === 'contact'   && <ContactPage lang={lang} />}
      </main>

      <footer className="footer">
        <div className="footer-body">
          <div className="footer-brand">
            <img src="/mame-logo.jpg" alt="Mame Family" className="footer-logo" />
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
              <a className="footer-link" href="mailto:hello@halamobile.com">✉️ {t('footer.emailUs', lang)}</a>
              <a className="footer-link" href="https://wa.me/1234567890" target="_blank" rel="noreferrer">💬 {t('footer.whatsapp', lang)}</a>
              <a className="footer-link" href="tel:+1234567890">📞 {t('footer.callUs', lang)}</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} {t('nav.brand', lang)} · {t('nav.id', lang)} · {t('footer.copyright', lang)}
        </div>
      </footer>

      {playing && <VideoModal video={playing} lang={lang} onClose={() => setPlaying(null)} />}
    </div>
  )
}

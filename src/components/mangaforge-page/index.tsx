import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Curated Discovery',
    desc: 'Immersive hero carousel showcasing featured titles alongside trending, popular, newly released, and top-rated shelves — all on one beautifully crafted home screen.',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.2)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    title: 'Manga & Manhwa Tabs',
    desc: 'Dedicated browsing tabs for Japanese manga and Korean manhwa — each with its own filtering, sorting, and genre system so you never mix up your reading lists.',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.2)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: 'Flexible Reading Modes',
    desc: 'Read the way you prefer — Left-to-Right for Western comics, Right-to-Left for traditional manga, or continuous Vertical Webtoon scroll for Korean webcomics.',
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.08)',
    border: 'rgba(56,189,248,0.2)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    title: 'Offline Downloads',
    desc: 'Save chapters locally and read anywhere, even without an internet connection. Perfect for long commutes, travel, or places with spotty connectivity.',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.2)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Smart Library',
    desc: 'Organize your collection into custom categories and use powerful filtering to find exactly what you\'re in the mood for — romance, action, isekai, or anything in between.',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.2)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
    title: 'Community Extensions',
    desc: 'Expand your content sources with community-built extensions. The open ecosystem lets the community continuously grow and maintain access to more titles.',
    color: '#f471b5',
    bg: 'rgba(244,113,181,0.08)',
    border: 'rgba(244,113,181,0.2)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: 'Material You Theming',
    desc: 'Dynamic color theming powered by Material You adapts to your wallpaper. Includes a true OLED dark mode that saves battery on AMOLED screens.',
    color: '#818cf8',
    bg: 'rgba(129,140,248,0.08)',
    border: 'rgba(129,140,248,0.2)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Free & Open Source',
    desc: 'Built on the Mihon framework under the Apache 2.0 license. No ads, no subscriptions, no tracking — just a clean reading experience maintained by the community.',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.2)',
  },
];

const TECH_STACK = [
  { name: 'Kotlin', color: '#a855f7' },
  { name: 'Jetpack Compose', color: '#f97316' },
  { name: 'Material You', color: '#38bdf8' },
  { name: 'AniList API', color: '#34d399' },
  { name: 'Android 8.0+', color: '#fbbf24' },
  { name: 'Apache 2.0', color: '#f471b5' },
];

const APK_VARIANTS = [
  { arch: 'arm64-v8a', desc: 'Most modern Android phones', recommended: true },
  { arch: 'armeabi-v7a', desc: 'Older 32-bit Android devices', recommended: false },
  { arch: 'x86_64', desc: 'Emulators & x86 tablets', recommended: false },
  { arch: 'Universal', desc: 'All architectures (larger size)', recommended: false },
];

const MangaForgePage = ({ onBack }: { onBack?: () => void }) => {
  const navigate = useNavigate();
  const handleBack = () => (onBack ? onBack() : navigate('/'));

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f1117',
        color: 'rgba(226,232,240,0.9)',
        fontFamily: 'inherit',
      }}
    >
      {/* Mouse spotlight also works here via CSS vars */}
      <div className="mouse-spotlight" aria-hidden="true" />

      {/* ── Top Nav ─────────────────────────────────────────────────── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          height: '60px',
          background: 'rgba(15,17,23,0.85)',
          borderBottom: '1px solid rgba(168,85,247,0.12)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <button
          onClick={handleBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(168,85,247,0.85)',
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            padding: '0.35rem 0.75rem',
            borderRadius: '8px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(168,85,247,0.1)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Portfolio
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img
            src="/mangaforge_icon.png"
            alt="MangaForge"
            style={{ width: '28px', height: '28px', borderRadius: '7px', objectFit: 'cover' }}
          />
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'rgba(226,232,240,0.9)' }}>
            MangaForge
          </span>
        </div>

        <a
          href="https://github.com/crimznexus/MangaForge/releases"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 1rem',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #a855f7, #f97316)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.8rem',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download
        </a>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '7rem 2rem 5rem',
          textAlign: 'center',
        }}
      >
        {/* Background gradient blobs */}
        <div style={{
          position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(168,85,247,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '20%', left: '10%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '10%', right: '8%',
          width: '250px', height: '250px',
          background: 'radial-gradient(circle, rgba(244,113,181,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto' }}>
          {/* App icon */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.75rem',
          }}>
            <div style={{
              position: 'relative',
              width: '110px',
              height: '110px',
            }}>
              {/* Animated gradient ring */}
              <div style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '28px',
                background: 'linear-gradient(135deg, #a855f7, #f97316, #f471b5, #a855f7)',
                backgroundSize: '300% 300%',
                animation: 'rotateGradient 4s linear infinite',
                zIndex: 0,
              }} />
              <img
                src="/mangaforge_icon.png"
                alt="MangaForge"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  height: '100%',
                  borderRadius: '24px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[
              { label: 'Free & Open Source', color: '#a855f7' },
              { label: 'No Ads', color: '#34d399' },
              { label: 'Android 8.0+', color: '#f97316' },
              { label: 'Active Dev', color: '#38bdf8' },
            ].map((b) => (
              <span
                key={b.label}
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                  background: `${b.color}18`,
                  border: `1px solid ${b.color}40`,
                  color: b.color,
                }}
              >
                {b.label}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '1.25rem',
            background: 'linear-gradient(135deg, #e2e8f0 10%, #a855f7 50%, #f97316 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            MangaForge
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'rgba(166,173,187,0.75)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: '580px',
            margin: '0 auto 2.5rem',
          }}>
            A beautiful, blazing-fast Android manga & webtoon reader. Discover thousands
            of titles, read offline, and organize your library — all for free, forever.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/crimznexus/MangaForge/releases"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 2rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #a855f7, #f97316)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(168,85,247,0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 12px 40px rgba(168,85,247,0.4)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 8px 32px rgba(168,85,247,0.3)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download APK
            </a>
            <a
              href="https://github.com/crimznexus/MangaForge"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 2rem',
                borderRadius: '12px',
                background: 'rgba(168,85,247,0.08)',
                border: '1px solid rgba(168,85,247,0.25)',
                color: 'rgba(168,85,247,0.9)',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(168,85,247,0.14)';
                el.style.borderColor = 'rgba(168,85,247,0.4)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(168,85,247,0.08)';
                el.style.borderColor = 'rgba(168,85,247,0.25)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Tech Stack strip ────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
        padding: '1.5rem 2rem 2.5rem',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        {TECH_STACK.map((t) => (
          <span
            key={t.name}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '0.4rem 0.9rem',
              borderRadius: '999px',
              background: `${t.color}12`,
              border: `1px solid ${t.color}30`,
              color: t.color,
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: t.color, flexShrink: 0 }} />
            {t.name}
          </span>
        ))}
      </div>

      {/* ── Features Grid ────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#a855f7',
            marginBottom: '0.75rem',
          }}>
            What&apos;s Inside
          </p>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 800,
            color: 'rgba(226,232,240,0.92)',
            lineHeight: 1.25,
          }}>
            Everything you need for a<br />
            <span style={{
              background: 'linear-gradient(90deg, #a855f7, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>perfect reading experience</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {FEATURES.map((f, i) => (
            <div
              key={i}
              style={{
                padding: '1.5rem',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                transition: 'transform 0.25s, background 0.25s, border-color 0.25s, box-shadow 0.25s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-4px)';
                el.style.background = f.bg;
                el.style.borderColor = f.border;
                el.style.boxShadow = `0 16px 40px rgba(0,0,0,0.3), 0 0 0 1px ${f.border}`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.background = 'rgba(255,255,255,0.025)';
                el.style.borderColor = 'rgba(255,255,255,0.07)';
                el.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: f.bg,
                  border: `1px solid ${f.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: f.color,
                  marginBottom: '1rem',
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'rgba(226,232,240,0.9)', marginBottom: '0.5rem' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.83rem', color: 'rgba(166,173,187,0.55)', lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Download Section ─────────────────────────────────────────── */}
      <section style={{
        padding: '4rem 2rem 5rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: '#f97316', marginBottom: '0.75rem',
          }}>
            Get the App
          </p>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
            fontWeight: 800,
            color: 'rgba(226,232,240,0.92)',
            marginBottom: '0.75rem',
          }}>
            Download MangaForge
          </h2>
          <p style={{ color: 'rgba(166,173,187,0.5)', fontSize: '0.9rem' }}>
            Choose the APK variant that matches your device architecture for the best performance.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          {APK_VARIANTS.map((v) => (
            <a
              key={v.arch}
              href="https://github.com/crimznexus/MangaForge/releases"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1.4rem 1rem',
                borderRadius: '14px',
                background: v.recommended ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.025)',
                border: v.recommended ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(255,255,255,0.07)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.2s, background 0.2s',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-3px)';
                el.style.background = 'rgba(168,85,247,0.12)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.background = v.recommended ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.025)';
              }}
            >
              {v.recommended && (
                <span style={{
                  position: 'absolute',
                  top: '-10px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  background: 'linear-gradient(90deg, #a855f7, #f97316)',
                  color: '#fff',
                }}>
                  Recommended
                </span>
              )}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.75rem' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'rgba(226,232,240,0.9)', marginBottom: '0.3rem' }}>
                {v.arch}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(166,173,187,0.45)', textAlign: 'center' }}>
                {v.desc}
              </span>
            </a>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'rgba(166,173,187,0.35)' }}>
          Requires Android 8.0 (API level 26) or higher &nbsp;·&nbsp; Apache License 2.0 &nbsp;·&nbsp; No account required
        </p>
      </section>

      {/* ── Open Source Banner ───────────────────────────────────────── */}
      <section style={{
        margin: '0 2rem 5rem',
        borderRadius: '20px',
        padding: '3rem 2.5rem',
        background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(249,115,22,0.06) 100%)',
        border: '1px solid rgba(168,85,247,0.15)',
        textAlign: 'center',
        maxWidth: '860px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <div style={{
          width: '52px', height: '52px', borderRadius: '14px',
          background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem',
          color: '#a855f7',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'rgba(226,232,240,0.92)', marginBottom: '0.75rem' }}>
          Built in the open
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'rgba(166,173,187,0.6)', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 1.75rem' }}>
          MangaForge is fully open-source. Star the repo, report bugs, suggest features,
          or contribute code — every bit of help makes the app better for everyone.
        </p>
        <a
          href="https://github.com/crimznexus/MangaForge"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.7rem 1.5rem',
            borderRadius: '10px',
            background: 'rgba(168,85,247,0.12)',
            border: '1px solid rgba(168,85,247,0.3)',
            color: '#a855f7',
            fontWeight: 600,
            fontSize: '0.875rem',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(168,85,247,0.2)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(168,85,247,0.12)'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          View Source on GitHub
        </a>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src="/mangaforge_icon.png" alt="" style={{ width: '20px', height: '20px', borderRadius: '5px' }} />
          <span style={{ fontSize: '0.8rem', color: 'rgba(166,173,187,0.4)' }}>MangaForge · Apache 2.0</span>
        </div>
        <button
          onClick={handleBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.8rem',
            color: 'rgba(168,85,247,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Portfolio
        </button>
      </div>
    </div>
  );
};

export default MangaForgePage;

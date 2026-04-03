import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.page}>
      {/* Animated background blobs */}
      <div style={{ ...styles.blob, ...styles.blob1 }} />
      <div style={{ ...styles.blob, ...styles.blob2 }} />
      <div style={{ ...styles.blob, ...styles.blob3 }} />
      <div style={{ ...styles.blob, ...styles.blob4 }} />

      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.navBrand}>
          <div style={styles.navIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <span style={styles.navLogo}>SmartNotes</span>
        </div>
        <div style={styles.navLinks}>
          <Link href="/login" style={styles.navLogin}>Log In</Link>
          <Link href="/signup" style={styles.navSignup}>Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={styles.hero}>
        {/* Badge */}
        <div style={styles.badge}>
          <span style={styles.badgeDot} />
          ✨ Your AI-powered note companion
        </div>

        {/* Headline */}
        <h1 style={styles.headline}>
          Think Faster.<br />
          <span style={styles.headlineGradient}>Write Smarter.</span>
        </h1>

        <p style={styles.description}>
          Capture ideas instantly, organize effortlessly, and never lose a thought again.
          Smart Notes keeps your mind clear and your ideas in order.
        </p>

        {/* CTA Buttons */}
        <div style={styles.ctaGroup}>
          <Link href="/signup" style={styles.ctaPrimary}>
            Start for Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }}>
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
          <Link href="/login" style={styles.ctaSecondary}>Log In</Link>
        </div>

        {/* Feature cards */}
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={{ ...styles.featureIcon, background: "linear-gradient(135deg, #7c3aed33, #4f46e533)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <h3 style={styles.featureTitle}>Quick Capture</h3>
            <p style={styles.featureDesc}>Jot down ideas in seconds before they slip away</p>
          </div>

          <div style={styles.featureCard}>
            <div style={{ ...styles.featureIcon, background: "linear-gradient(135deg, #06b6d433, #3b82f633)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            </div>
            <h3 style={styles.featureTitle}>Stay Organized</h3>
            <p style={styles.featureDesc}>Structure your notes with smart tagging & folders</p>
          </div>

          <div style={styles.featureCard}>
            <div style={{ ...styles.featureIcon, background: "linear-gradient(135deg, #ec489933, #8b5cf633)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <h3 style={styles.featureTitle}>Find Instantly</h3>
            <p style={styles.featureDesc}>Powerful search to retrieve any note in milliseconds</p>
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }

        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -80px) scale(1.07); }
          66% { transform: translate(-40px, 40px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-60px, 50px) scale(1.1); }
          66% { transform: translate(80px, -30px) scale(0.93); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 60px) scale(1.08); }
        }
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-50px, -40px) scale(1.05); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .hero-badge   { animation: fadeUp 0.6s ease both; }
        .hero-h1      { animation: fadeUp 0.7s 0.1s ease both; }
        .hero-desc    { animation: fadeUp 0.7s 0.2s ease both; }
        .hero-cta     { animation: fadeUp 0.7s 0.3s ease both; }
        .hero-cards   { animation: fadeUp 0.8s 0.45s ease both; }

        .cta-primary:hover  { opacity: 0.88; transform: translateY(-2px); box-shadow: 0 16px 40px rgba(124,58,237,0.5) !important; }
        .cta-primary        { transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s; }
        .cta-secondary:hover { background: rgba(255,255,255,0.14) !important; }
        .cta-secondary       { transition: background 0.2s; }
        .nav-login:hover  { color: #ffffff !important; }
        .nav-signup:hover { opacity: 0.85; }
        .feature-card:hover { border-color: rgba(255,255,255,0.22) !important; transform: translateY(-4px); background: rgba(255,255,255,0.09) !important; }
        .feature-card { transition: transform 0.25s, border-color 0.25s, background 0.25s; }
      `}</style>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(145deg, #07050f 0%, #0f0c29 40%, #1a1040 70%, #0d1117 100%)",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  /* ── blobs ── */
  blob: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(100px)",
    pointerEvents: "none",
  },
  blob1: {
    width: 650,
    height: 650,
    background: "radial-gradient(circle, #7c3aed 0%, #4f46e5 60%, transparent 100%)",
    top: "-200px",
    left: "-180px",
    opacity: 0.35,
    animation: "float1 14s ease-in-out infinite",
  },
  blob2: {
    width: 500,
    height: 500,
    background: "radial-gradient(circle, #06b6d4 0%, #3b82f6 60%, transparent 100%)",
    bottom: "-120px",
    right: "-120px",
    opacity: 0.3,
    animation: "float2 18s ease-in-out infinite",
  },
  blob3: {
    width: 380,
    height: 380,
    background: "radial-gradient(circle, #ec4899 0%, #8b5cf6 70%, transparent 100%)",
    top: "55%",
    left: "65%",
    opacity: 0.25,
    animation: "float3 11s ease-in-out infinite",
  },
  blob4: {
    width: 280,
    height: 280,
    background: "radial-gradient(circle, #f59e0b 0%, #ef4444 70%, transparent 100%)",
    top: "20%",
    right: "5%",
    opacity: 0.18,
    animation: "float4 16s ease-in-out infinite",
  },

  /* ── navbar ── */
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 40px",
    background: "rgba(7,5,15,0.55)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  navBrand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  navIcon: {
    width: 34,
    height: 34,
    borderRadius: "9px",
    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 14px rgba(124,58,237,0.45)",
  },
  navLogo: {
    fontSize: "17px",
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: "-0.3px",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  navLogin: {
    fontSize: "14px",
    fontWeight: 500,
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    transition: "color 0.2s",
  },
  navSignup: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#ffffff",
    textDecoration: "none",
    padding: "8px 20px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
    boxShadow: "0 4px 14px rgba(124,58,237,0.4)",
    transition: "opacity 0.2s",
  },

  /* ── hero ── */
  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "160px",
    paddingBottom: "100px",
    paddingLeft: "24px",
    paddingRight: "24px",
    maxWidth: "820px",
    zIndex: 1,
    width: "100%",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    fontWeight: 500,
    color: "rgba(255,255,255,0.75)",
    background: "rgba(124,58,237,0.18)",
    border: "1px solid rgba(124,58,237,0.4)",
    borderRadius: "999px",
    padding: "6px 16px",
    marginBottom: "32px",
    letterSpacing: "0.2px",
  } as React.CSSProperties,
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#a78bfa",
    boxShadow: "0 0 8px #a78bfa",
    display: "inline-block",
  },

  headline: {
    fontSize: "clamp(48px, 8vw, 80px)",
    fontWeight: 900,
    color: "#ffffff",
    lineHeight: 1.08,
    letterSpacing: "-2px",
    marginBottom: "24px",
  },
  headlineGradient: {
    background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 40%, #f472b6 80%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "shimmer 4s linear infinite",
  },

  description: {
    fontSize: "18px",
    color: "rgba(255,255,255,0.52)",
    lineHeight: 1.75,
    maxWidth: "560px",
    marginBottom: "48px",
  },

  ctaGroup: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "80px",
    flexWrap: "wrap" as const,
    justifyContent: "center",
  },
  ctaPrimary: {
    display: "inline-flex",
    alignItems: "center",
    padding: "15px 32px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 700,
    textDecoration: "none",
    boxShadow: "0 10px 32px rgba(124,58,237,0.45)",
    letterSpacing: "-0.2px",
  } as React.CSSProperties,
  ctaSecondary: {
    display: "inline-flex",
    alignItems: "center",
    padding: "15px 32px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 600,
    textDecoration: "none",
    backdropFilter: "blur(8px)",
  } as React.CSSProperties,

  /* ── feature cards ── */
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    width: "100%",
    maxWidth: "780px",
  },
  featureCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "28px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  } as React.CSSProperties,
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  featureTitle: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "8px",
    letterSpacing: "-0.2px",
  },
  featureDesc: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.6,
  },
};

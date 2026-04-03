"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data);
    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      alert(data.message || "Something went wrong");
    }
  };

  return (
    <div style={styles.page}>
      {/* Home button */}
      <a href="/" style={styles.homeBtn} title="Go to Home"
        onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
        onMouseOut={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </a>

      {/* Animated blobs */}
      <div style={{ ...styles.blob, ...styles.blob1 }} />
      <div style={{ ...styles.blob, ...styles.blob2 }} />
      <div style={{ ...styles.blob, ...styles.blob3 }} />

      {/* Glassmorphism card */}
      <div style={styles.card}>
        {/* Icon */}
        <div style={styles.iconWrap}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        <h1 style={styles.title}>Welcome </h1>
        <p style={styles.subtitle}>Log in to your Smart Notes account</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseOver={e => (e.currentTarget.style.opacity = "0.9")}
            onMouseOut={e => (e.currentTarget.style.opacity = "1")}
          >
            Log In
          </button>
        </form>

        <p style={styles.signupText}>
          Don&apos;t have an account?{" "}
          <a href="/signup" style={styles.signupLink}>Sign up</a>
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }

        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.05); }
          66% { transform: translate(-30px, 30px) scale(0.97); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 40px) scale(1.08); }
          66% { transform: translate(60px, -20px) scale(0.95); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 50px) scale(1.06); }
        }
      `}</style>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  homeBtn: {
    position: "fixed",
    top: "20px",
    left: "20px",
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    zIndex: 10,
    transition: "background 0.2s",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
  },
  blob: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(80px)",
    opacity: 0.5,
    pointerEvents: "none",
  },
  blob1: {
    width: 500,
    height: 500,
    background: "radial-gradient(circle, #7c3aed, #4f46e5)",
    top: "-120px",
    left: "-100px",
    animation: "float1 12s ease-in-out infinite",
  },
  blob2: {
    width: 400,
    height: 400,
    background: "radial-gradient(circle, #06b6d4, #3b82f6)",
    bottom: "-80px",
    right: "-80px",
    animation: "float2 15s ease-in-out infinite",
  },
  blob3: {
    width: 300,
    height: 300,
    background: "radial-gradient(circle, #ec4899, #8b5cf6)",
    top: "50%",
    left: "60%",
    animation: "float3 10s ease-in-out infinite",
  },
  card: {
    background: "rgba(255,255,255,0.07)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "24px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: "16px",
    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    boxShadow: "0 8px 24px rgba(124,58,237,0.4)",
  },
  title: {
    fontSize: "26px",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "6px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.5)",
    marginBottom: "32px",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.7)",
    fontWeight: 500,
  },
  input: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.08)",
    color: "#ffffff",
    fontSize: "15px",
    outline: "none",
    transition: "border 0.2s",
  },
  button: {
    marginTop: "8px",
    padding: "13px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
    transition: "opacity 0.2s",
  },
  signupText: {
    marginTop: "24px",
    fontSize: "13px",
    color: "rgba(255,255,255,0.45)",
  },
  signupLink: {
    color: "#a78bfa",
    fontWeight: 600,
    textDecoration: "none",
  },
};
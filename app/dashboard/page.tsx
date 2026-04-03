"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState("");
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const handleAI = async (note: any) => {
    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ content: note.content }),
    });
    const data = await res.json();
    if (data.result) {
      setEditId(note._id);
      setTitle(note.title);
      setContent(data.result);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      alert("AI improvement failed. Please try again.");
    }
  };

  const togglePin = async (note: any) => {
    await fetch(`/api/notes/${note._id}`, {
      method: "PUT",
      body: JSON.stringify({ ...note, pinned: !note.pinned }),
    });
    fetchNotes();
  };

  const startEdit = (note: any) => {
    setEditId(note._id);
    setTitle(note.title);
    setContent(note.content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUserId(decoded.userid);
      setUserName(decoded.name || "User");
    }
  }, []);

  const fetchNotes = async () => {
    const res = await fetch(`/api/notes?userId=${userId}`);
    const data = await res.json();
    if (Array.isArray(data.notes)) {
      setNotes(data.notes);
    } else {
      setNotes([]);
    }
  };

  useEffect(() => {
    if (userId) fetchNotes();
  }, [userId]);

  const addNote = async (e: any) => {
    e.preventDefault();
    if (editId) {
      await fetch(`/api/notes/${editId}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
      });
      setEditId("");
    } else {
      await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify({ title, content, userId }),
      });
    }
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  const cancelEdit = () => {
    setEditId("");
    setTitle("");
    setContent("");
  };

  const filteredNotes = (notes as any[])
    .sort((a, b) => b.pinned - a.pinned)
    .filter((note) => note.title.toLowerCase().includes(search.toLowerCase()));

  const pinnedCount = (notes as any[]).filter((n: any) => n.pinned).length;

  return (
    <div style={s.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #f5f3ff; }

        ::placeholder { color: #b0a8d0; }

        .note-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(124,58,237,0.13) !important; }
        .note-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }

        .btn-delete:hover  { background: #ef4444 !important; color: #fff !important; }
        .btn-edit:hover    { background: #f59e0b !important; color: #fff !important; }
        .btn-pin:hover     { background: #7c3aed !important; color: #fff !important; }
        .btn-ai:hover      { background: #059669 !important; color: #fff !important; }
        .btn-delete, .btn-edit, .btn-pin, .btn-ai { transition: background 0.18s, color 0.18s; }

        .input-focus:focus { border-color: #8b5cf6 !important; box-shadow: 0 0 0 3px rgba(139,92,246,0.12) !important; outline: none; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeUp 0.4s ease both; }
      `}</style>

      {/* ── Header ── */}
      <header style={s.header}>
        <div style={s.headerLeft}>
          <div style={s.logoWrap}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <div>
            <div style={s.headerTitle}>SmartNotes</div>
            <div style={s.headerSub}>
              {userName ? `👋 Welcome back, ${userName}!` : "Your personal notebook"}
            </div>
          </div>
        </div>

        <div style={s.headerRight}>
          <div style={s.statsChip}>
            <span style={s.statsNum}>{(notes as any[]).length}</span> notes
          </div>
          {pinnedCount > 0 && (
            <div style={{ ...s.statsChip, background: "#f5f3ff", color: "#7c3aed", border: "1px solid #ddd6fe" }}>
              📌 {pinnedCount} pinned
            </div>
          )}
          <button onClick={handleLogout} style={s.logoutBtn}
            onMouseOver={e => (e.currentTarget.style.background = "#fef2f2")}
            onMouseOut={e => (e.currentTarget.style.background = "white")}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* ── Main content ── */}
      <main style={s.main}>

        {/* ── Note Form ── */}
        <section style={s.formCard} className="fade-in">
          <div style={s.formHeader}>
            <div style={s.formTitle}>
              {editId ? (
                <>
                  <span style={s.formTitleIcon}>✏️</span> Edit Note
                </>
              ) : (
                <>
                  <span style={s.formTitleIcon}>✨</span> New Note
                </>
              )}
            </div>
            {editId && (
              <button onClick={cancelEdit} style={s.cancelBtn}>Cancel</button>
            )}
          </div>

          <form onSubmit={addNote} style={s.form}>
            <input
              type="text"
              placeholder="Note title…"
              style={s.input}
              className="input-focus"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="What's on your mind?"
              style={{ ...s.input, flex: 1 }}
              className="input-focus"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <button type="submit" style={s.addBtn}
              onMouseOver={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseOut={e => (e.currentTarget.style.opacity = "1")}
            >
              {editId ? "Update Note" : "+ Add Note"}
            </button>
          </form>
        </section>

        {/* ── Search ── */}
        <div style={s.searchWrap} className="fade-in">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search notes…"
            style={s.searchInput}
            className="input-focus"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ── Notes Grid ── */}
        {filteredNotes.length === 0 ? (
          <div style={s.emptyState}>
            <div style={s.emptyIcon}>📝</div>
            <p style={s.emptyText}>{search ? "No notes match your search." : "No notes yet. Add your first one above!"}</p>
          </div>
        ) : (
          <div style={s.grid}>
            {filteredNotes.map((note: any, i: number) => (
              <div
                key={note._id}
                style={{ ...s.noteCard, animationDelay: `${i * 0.05}s` }}
                className="note-card fade-in"
              >
                {/* Pinned badge */}
                {note.pinned && (
                  <div style={s.pinnedBadge}>📌 Pinned</div>
                )}

                <div style={s.noteBody}>
                  <h2 style={s.noteTitle}>{note.title}</h2>
                  <p style={s.noteContent}>{note.content}</p>
                </div>

                <div style={s.noteFooter}>
                  <span style={s.noteDate}>
                    🕒 {new Date(note.createdAt).toLocaleString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit"
                    })}
                  </span>

                  <div style={s.actionRow}>
                    <button onClick={() => togglePin(note)} style={s.btnPin} className="btn-pin">
                      {note.pinned ? "Unpin" : "📌 Pin"}
                    </button>
                    <button onClick={() => startEdit(note)} style={s.btnEdit} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => deleteNote(note._id)} style={s.btnDelete} className="btn-delete">
                      Delete
                    </button>
                    <button onClick={() => handleAI(note)} style={s.btnAI} className="btn-ai">
                      🤖 AI
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/* ─── Styles ─── */
const s: { [k: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #faf8ff 0%, #f0ebff 50%, #eef2ff 100%)",
    fontFamily: "'Inter', sans-serif",
  },

  /* header */
  header: {
    position: "sticky",
    top: 0,
    zIndex: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 32px",
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(139,92,246,0.12)",
    boxShadow: "0 2px 16px rgba(124,58,237,0.07)",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoWrap: {
    width: 38,
    height: 38,
    borderRadius: "10px",
    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(124,58,237,0.35)",
  },
  headerTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#1e1b4b",
    letterSpacing: "-0.3px",
  },
  headerSub: {
    fontSize: "12px",
    color: "#9ca3af",
    marginTop: "1px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  statsChip: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#6b7280",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "999px",
    padding: "5px 14px",
  },
  statsNum: {
    fontWeight: 700,
    color: "#7c3aed",
  },
  logoutBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#ef4444",
    background: "white",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    padding: "7px 14px",
    cursor: "pointer",
    transition: "background 0.18s",
  },

  /* main */
  main: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "36px 24px 80px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  /* form card */
  formCard: {
    background: "white",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 4px 24px rgba(124,58,237,0.09)",
    border: "1px solid rgba(139,92,246,0.1)",
  },
  formHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  formTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#1e1b4b",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  formTitleIcon: {
    fontSize: "18px",
  },
  cancelBtn: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#6b7280",
    background: "#f3f4f6",
    border: "none",
    borderRadius: "8px",
    padding: "6px 14px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap" as const,
    alignItems: "center",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1.5px solid #e5e7eb",
    fontSize: "14px",
    color: "#1f2937",
    background: "#fafafa",
    transition: "border 0.2s, box-shadow 0.2s",
    minWidth: "160px",
    flex: "1",
  },
  addBtn: {
    padding: "12px 24px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    color: "white",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
    whiteSpace: "nowrap" as const,
    transition: "opacity 0.18s",
    flexShrink: 0,
  },

  /* search */
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "white",
    border: "1.5px solid #e5e7eb",
    borderRadius: "12px",
    padding: "10px 16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "14px",
    color: "#374151",
    background: "transparent",
  },

  /* empty state */
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "64px 24px",
    gap: "12px",
  },
  emptyIcon: {
    fontSize: "48px",
    lineHeight: 1,
  },
  emptyText: {
    fontSize: "15px",
    color: "#9ca3af",
    textAlign: "center" as const,
  },

  /* grid + card */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "16px",
  },
  noteCard: {
    background: "white",
    border: "1px solid rgba(139,92,246,0.1)",
    borderRadius: "18px",
    padding: "22px",
    boxShadow: "0 2px 12px rgba(124,58,237,0.07)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  pinnedBadge: {
    display: "inline-flex",
    alignSelf: "flex-start" as const,
    fontSize: "11px",
    fontWeight: 600,
    color: "#7c3aed",
    background: "#f5f3ff",
    border: "1px solid #ddd6fe",
    borderRadius: "999px",
    padding: "3px 10px",
  },
  noteBody: {
    flex: 1,
  },
  noteTitle: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#1e1b4b",
    marginBottom: "6px",
    lineHeight: 1.4,
  },
  noteContent: {
    fontSize: "13.5px",
    color: "#6b7280",
    lineHeight: 1.65,
  },
  noteFooter: {
    borderTop: "1px solid #f3f4f6",
    paddingTop: "12px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  noteDate: {
    fontSize: "11.5px",
    color: "#9ca3af",
  },
  actionRow: {
    display: "flex",
    gap: "8px",
  },
  btnDelete: {
    flex: 1,
    padding: "7px 0",
    borderRadius: "8px",
    border: "1.5px solid #fecaca",
    background: "#fff5f5",
    color: "#ef4444",
    fontSize: "12.5px",
    fontWeight: 600,
    cursor: "pointer",
  },
  btnEdit: {
    flex: 1,
    padding: "7px 0",
    borderRadius: "8px",
    border: "1.5px solid #fde68a",
    background: "#fffbeb",
    color: "#d97706",
    fontSize: "12.5px",
    fontWeight: 600,
    cursor: "pointer",
  },
  btnPin: {
    flex: 1,
    padding: "7px 0",
    borderRadius: "8px",
    border: "1.5px solid #ddd6fe",
    background: "#f5f3ff",
    color: "#7c3aed",
    fontSize: "12.5px",
    fontWeight: 600,
    cursor: "pointer",
  },
  btnAI: {
    flex: 1,
    padding: "7px 0",
    borderRadius: "8px",
    border: "1.5px solid #a7f3d0",
    background: "#ecfdf5",
    color: "#059669",
    fontSize: "12.5px",
    fontWeight: 600,
    cursor: "pointer",
  },
};

// Shared building blocks: Nav, Footer, Placeholder, Ornament, Countdown.
// Exposed on window for sibling babel scripts.

const { useState, useEffect, useRef, useMemo } = React;

// ── Placeholder image. Striped + dashed inner border + monospace label. ──────
function Placeholder({ label, ratio = "16/10", style, className = "", children }) {
  return (
    <div className={`placeholder ${className}`}
         style={{ aspectRatio: ratio, ...style }}>
      <span className="placeholder-tag">{label}</span>
      {children}
    </div>
  );
}

// Sanskrit ornament: ❀ श्री ❀ — small caps style separator
function Ornament({ char = "ॐ" }) {
  return (
    <span className="ornament">
      <span className="deva">{char}</span>
    </span>
  );
}

// Tiny lotus mark — geometric only, no anatomical SVG drawing
function LotusMark({ size = 26, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
        <circle cx="12" cy="12" r="2.4" />
        <path d="M12 4.5 V8.5"/><path d="M12 19.5 V15.5"/>
        <path d="M4.5 12 H8.5"/><path d="M19.5 12 H15.5"/>
        <path d="M6.5 6.5 L9 9"/><path d="M17.5 17.5 L15 15"/>
        <path d="M17.5 6.5 L15 9"/><path d="M6.5 17.5 L9 15"/>
      </g>
    </svg>
  );
}

// ── Icons (line, 18-22px) ────────────────────────────────────────────────────
function Icon({ name, size = 18 }) {
  const s = size;
  const stroke = { stroke: "currentColor", strokeWidth: 1.4, fill: "none",
                   strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    sun:    <g {...stroke}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/></g>,
    moon:   <g {...stroke}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></g>,
    globe:  <g {...stroke}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></g>,
    bell:   <g {...stroke}><path d="M6 16V10a6 6 0 1 1 12 0v6"/><path d="M4.5 16h15"/><path d="M10 19a2 2 0 0 0 4 0"/></g>,
    calendar:<g {...stroke}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></g>,
    download:<g {...stroke}><path d="M12 4v12"/><path d="M7 11l5 5 5-5"/><path d="M4 20h16"/></g>,
    pin:    <g {...stroke}><path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></g>,
    arrow:  <g {...stroke}><path d="M5 12h14"/><path d="M14 6l6 6-6 6"/></g>,
    arrowL: <g {...stroke}><path d="M19 12H5"/><path d="M10 6l-6 6 6 6"/></g>,
    close:  <g {...stroke}><path d="M6 6l12 12M18 6 6 18"/></g>,
    search: <g {...stroke}><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/></g>,
    play:   <g fill="currentColor"><path d="M8 5v14l11-7z"/></g>,
    check:  <g {...stroke}><path d="M5 12.5 10 17 19 7.5"/></g>,
    plus:   <g {...stroke}><path d="M12 5v14M5 12h14"/></g>,
    filter: <g {...stroke}><path d="M4 6h16M7 12h10M10 18h4"/></g>,
    share:  <g {...stroke}><circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M8 11l8-4M8 13l8 4"/></g>,
    heart:  <g {...stroke}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></g>,
    map:    <g {...stroke}><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v16M15 6v16"/></g>,
    mail:   <g {...stroke}><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7l8 6 8-6"/></g>,
    phone:  <g {...stroke}><path d="M5 4h3l2 5-2 1a10 10 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></g>,
    direction:<g {...stroke}><path d="M12 3l9 9-9 9-9-9z"/><path d="M9 13v-2h4V8.5l4 3.5-4 3.5V13z"/></g>,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={{ display: "block" }}>
      {paths[name] || null}
    </svg>
  );
}

// ── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ route, setRoute, lang, setLang, theme, setTheme, t }) {
  const links = [
    ["home",      t.nav.home],
    ["about",     t.nav.about],
    ["events",    t.nav.events],
    ["calendar",  t.nav.calendar],
    ["committee", t.nav.committee],
    ["gallery",   t.nav.gallery],
    ["donate",    t.nav.donate],
    ["contact",   t.nav.contact],
  ];
  const [langOpen, setLangOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="brand" onClick={() => setRoute("home")}>
          <div className="brand-mark">ॐ</div>
          <div className="brand-text">
            <div className="brand-name">Damodar Devasthan</div>
            <div className="brand-sub">श्री दामोदर · est. 1565</div>
          </div>
        </div>
        <div className="nav-links">
          {links.map(([id, label]) => (
            <div key={id}
                 className={`nav-link ${route === id ? "active" : ""}`}
                 onClick={() => setRoute(id)}>{label}</div>
          ))}
        </div>
        <div className="nav-tools">
          <div style={{ position: "relative" }}>
            <button className="icon-btn" title="Language"
                    onClick={() => setLangOpen(o => !o)}>
              <Icon name="globe" />
            </button>
            {langOpen && (
              <div onMouseLeave={() => setLangOpen(false)}
                   style={{ position: "absolute", top: 40, right: 0,
                            background: "var(--bg)", border: "1px solid var(--line)",
                            borderRadius: 10, padding: 4, minWidth: 160,
                            boxShadow: "0 12px 32px rgba(0,0,0,.12)", zIndex: 60 }}>
                {[["en","English"],["mr","मराठी · Marathi"],["kok","कोंकणी · Konkani"]].map(([k,v]) => (
                  <div key={k} onClick={() => { setLang(k); setLangOpen(false); }}
                       style={{ padding: "8px 12px", borderRadius: 6, cursor: "pointer",
                                fontSize: 13, color: lang === k ? "var(--maroon)" : "var(--ink)",
                                fontWeight: lang === k ? 600 : 400,
                                background: lang === k ? "var(--bg-2)" : "transparent" }}>
                    {v}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="icon-btn" title="Theme"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>
          <button className="btn btn-primary" style={{ marginLeft: 8 }}
                  onClick={() => setRoute("donate")}>
            <Icon name="heart" size={14}/> Donate
          </button>
        </div>
      </div>
    </nav>
  );
}

// ── Countdown ────────────────────────────────────────────────────────────────
function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const ms = Math.max(0, new Date(target).getTime() - now);
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s, ms };
}

function Countdown({ target, size = "lg" }) {
  const c = useCountdown(target);
  const cell = (n, l) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="tabular display"
           style={{ fontSize: size === "lg" ? 64 : 36, lineHeight: 1, fontWeight: 500,
                    color: "var(--ink)" }}>
        {String(n).padStart(2, "0")}
      </div>
      <div className="mono" style={{ marginTop: 8, opacity: 0.7 }}>{l}</div>
    </div>
  );
  return (
    <div style={{ display: "flex", gap: size === "lg" ? 36 : 22, alignItems: "flex-end" }}>
      {cell(c.d, "Days")}
      <div className="display" style={{ fontSize: size === "lg" ? 52 : 28, color: "var(--gold)", lineHeight: 1.1 }}>:</div>
      {cell(c.h, "Hours")}
      <div className="display" style={{ fontSize: size === "lg" ? 52 : 28, color: "var(--gold)", lineHeight: 1.1 }}>:</div>
      {cell(c.m, "Min")}
      <div className="display" style={{ fontSize: size === "lg" ? 52 : 28, color: "var(--gold)", lineHeight: 1.1 }}>:</div>
      {cell(c.s, "Sec")}
    </div>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer({ setRoute, t }) {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div className="brand-mark"
                   style={{ background: "var(--gold)", color: "var(--maroon-2)" }}>ॐ</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22 }}>Damodar Devasthan</div>
            </div>
            <p style={{ opacity: 0.78, maxWidth: 280, fontSize: 13 }}>
              {t.footer.made}. A devotee-run sansthan on the banks of the Kushawati, in service of Shri Damodar since 1565.
            </p>
            <div className="mono" style={{ marginTop: 18, opacity: 0.55, fontSize: 10 }}>
              {t.footer.trust}
            </div>
          </div>
          <div>
            <h5>Visit</h5>
            <ul>
              <li>Daily · 05:00 — 21:00</li>
              <li>Kushawati Valley, Goa</li>
              <li onClick={() => setRoute("contact")} style={{cursor:"pointer"}}>Directions ↗</li>
            </ul>
          </div>
          <div>
            <h5>Devasthan</h5>
            <ul>
              <li onClick={() => setRoute("about")}     style={{cursor:"pointer"}}>About</li>
              <li onClick={() => setRoute("committee")} style={{cursor:"pointer"}}>Committee</li>
              <li onClick={() => setRoute("calendar")}  style={{cursor:"pointer"}}>Calendar</li>
              <li onClick={() => setRoute("gallery")}   style={{cursor:"pointer"}}>Gallery</li>
            </ul>
          </div>
          <div>
            <h5>Seva</h5>
            <ul>
              <li onClick={() => setRoute("donate")} style={{cursor:"pointer"}}>Donate</li>
              <li onClick={() => setRoute("donate")} style={{cursor:"pointer"}}>Sponsor a pooja</li>
              <li onClick={() => setRoute("contact")} style={{cursor:"pointer"}}>Volunteer</li>
              <li onClick={() => setRoute("events")} style={{cursor:"pointer"}}>Live darshan</li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div className="mono" style={{ opacity: 0.6 }}>© Damodar Devasthan Trust · MMXXVI</div>
          <div className="mono" style={{ opacity: 0.6 }}>damodardevasthan.org</div>
        </div>
      </div>
    </footer>
  );
}

// ── ICS export ───────────────────────────────────────────────────────────────
// Local-time floating events (Asia/Kolkata) — no TZID, follow VTODO/VEVENT
// per RFC 5545. dtstamp uses UTC zulu.
function pad(n) { return String(n).padStart(2, "0"); }
function toICSLocal(dt) {
  const d = new Date(dt);
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}
function toICSZulu(dt) {
  const d = new Date(dt);
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}
function buildICS(events, name = "Damodar Devasthan") {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Damodar Devasthan//Festival Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${name}`,
    "X-WR-TIMEZONE:Asia/Kolkata",
  ];
  const stamp = toICSZulu(new Date());
  events.forEach(ev => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${ev.id}@damodardevasthan.org`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${toICSLocal(ev.start)}`,
      `DTEND:${toICSLocal(ev.end)}`,
      `SUMMARY:${ev.name} · ${ev.deva}`,
      `DESCRIPTION:${(ev.desc || "").replace(/\n/g, "\\n")}`,
      "LOCATION:Shri Damodar Devasthan, Kushawati Valley, Goa",
      "END:VEVENT"
    );
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}
function downloadICS(events, filename = "damodar-devasthan.ics", name) {
  const ics = buildICS(events, name);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ── Date helpers ────────────────────────────────────────────────────────────
const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];
const MONTHS_DEVA = ["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून",
                     "जुलै","ऑगस्ट","सप्टेंबर","ऑक्टोबर","नोव्हेंबर","डिसेंबर"];
const DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function fmtDate(d, opts = {}) {
  const dt = new Date(d);
  const day = dt.getDate();
  const m = MONTHS[dt.getMonth()];
  const y = dt.getFullYear();
  if (opts.short) return `${day} ${m.slice(0,3)} ${y}`;
  return `${day} ${m} ${y}`;
}
function fmtTime(d) {
  const dt = new Date(d);
  let h = dt.getHours();
  const m = dt.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = ((h + 11) % 12) + 1;
  return `${h}:${pad(m)} ${ampm}`;
}

// ── Shared layout helpers (used across pages) ────────────────────────────────
function SectionHead({ kicker, title, deva, align = "left", maxw = 560 }) {
  return (
    <div style={{ textAlign: align, maxWidth: maxw,
                  margin: align === "center" ? "0 auto 56px" : "0 0 56px",
                  display: "flex", flexDirection: "column",
                  alignItems: align === "center" ? "center" : "flex-start",
                  gap: 14 }}>
      <span className="eyebrow">{kicker}</span>
      <h2 style={{ textWrap: "balance" }}>{title}</h2>
      {deva && <div className="deva" style={{ color: "var(--gold)", fontSize: 22, marginTop: 4 }}>{deva}</div>}
    </div>
  );
}

function PageHeader({ kicker, title, deva, sub }) {
  return (
    <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--line)" }}>
      <div className="container">
        <div className="eyebrow">{kicker}</div>
        <h1 className="display"
            style={{ marginTop: 18, textWrap: "balance", fontSize: "clamp(48px, 7vw, 96px)",
                     fontStyle: "italic", fontWeight: 400, maxWidth: 920 }}>
          {title}
        </h1>
        {deva && (
          <div className="deva" style={{ color: "var(--gold)", fontSize: 26, marginTop: 18 }}>
            {deva}
          </div>
        )}
        {sub && (
          <p style={{ marginTop: 24, fontSize: 17, color: "var(--ink-2)", maxWidth: 640 }}>
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}

function HeroBadge({ ornament = "ॐ", children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "8px 14px", borderRadius: 999,
                  border: "1px solid var(--line)", background: "var(--bg-2)" }}>
      <span className="deva" style={{ color: "var(--gold)" }}>{ornament}</span>
      <span className="mono" style={{ fontSize: 10.5 }}>{children}</span>
    </div>
  );
}

Object.assign(window, {
  Placeholder, Ornament, LotusMark, Icon, Nav, Footer,
  Countdown, useCountdown,
  buildICS, downloadICS,
  MONTHS, MONTHS_DEVA, DOW, fmtDate, fmtTime, pad,
  SectionHead, PageHeader, HeroBadge,
});

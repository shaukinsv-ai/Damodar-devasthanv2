// Events listing + event detail modal

function EventCard({ ev, onClick, layout = "grid" }) {
  if (layout === "row") {
    return (
      <div onClick={onClick}
           style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 32,
                    padding: "32px 0", borderTop: "1px solid var(--line)",
                    cursor: "pointer", alignItems: "start" }}>
        <div style={{ borderRight: "1px solid var(--line)", paddingRight: 32 }}>
          <div className="display" style={{ fontSize: 48, lineHeight: 1, color: "var(--maroon)" }}>
            {new Date(ev.start).getDate()}
          </div>
          <div className="mono" style={{ marginTop: 6, color: "var(--ink-3)" }}>
            {MONTHS[new Date(ev.start).getMonth()].slice(0,3)} · {new Date(ev.start).getFullYear()}
          </div>
        </div>
        <div>
          <div className="mono" style={{ color: "var(--maroon)" }}>
            {ev.kind === "rathotsav" ? "Signature festival" :
             ev.kind === "ekadashi"  ? "Ekadashi vrat" : "Festival"}
          </div>
          <h3 style={{ marginTop: 8 }}>{ev.name}</h3>
          <div className="deva" style={{ color: "var(--gold)", fontSize: 18, marginTop: 4 }}>
            {ev.deva}
          </div>
          <p style={{ marginTop: 14, color: "var(--ink-2)", maxWidth: 580 }}>
            {ev.desc}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
          <span className="mono tabular muted">{fmtTime(ev.start)}</span>
          <span className="btn btn-ghost" style={{ pointerEvents: "none" }}>
            Details <Icon name="arrow" size={14}/>
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}
         onClick={onClick}>
      <Placeholder ratio="4/3" label={ev.img} style={{ borderRadius: 0 }}/>
      <div style={{ padding: 22 }}>
        <div className="between">
          <span className="mono" style={{ color: "var(--maroon)" }}>
            {fmtDate(ev.start, { short: true })}
          </span>
          {ev.featured && <span className="mono"
                                style={{ color: "var(--gold)", fontSize: 9.5,
                                          padding: "3px 8px", borderRadius: 999,
                                          background: "color-mix(in oklch, var(--gold) 18%, transparent)" }}>
            Featured
          </span>}
        </div>
        <h3 style={{ fontSize: 24, marginTop: 10 }}>{ev.name}</h3>
        <div className="deva" style={{ color: "var(--gold)", fontSize: 16, marginTop: 4 }}>
          {ev.deva}
        </div>
        <p style={{ marginTop: 12, color: "var(--ink-2)", fontSize: 13.5,
                    display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
                    overflow: "hidden" }}>
          {ev.desc}
        </p>
      </div>
    </div>
  );
}

function EventModal({ ev, onClose }) {
  if (!ev) return null;
  const past = window.GALLERY.slice(0, 3);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><Icon name="close"/></button>
        <Placeholder ratio="16/8" label={ev.img}
                     style={{ borderRadius: 0 }}/>
        <div style={{ padding: 40 }}>
          <div className="mono" style={{ color: "var(--maroon)" }}>
            {fmtDate(ev.start)} · {fmtTime(ev.start)}
          </div>
          <h2 style={{ marginTop: 14, textWrap: "balance", fontStyle: "italic", fontWeight: 400 }}>
            {ev.name}
          </h2>
          <div className="deva" style={{ color: "var(--gold)", fontSize: 24, marginTop: 6 }}>
            {ev.deva}
          </div>
          <p style={{ marginTop: 20, color: "var(--ink)", fontSize: 15.5, lineHeight: 1.65 }}>
            {ev.desc}
          </p>
          <div className="rule-diamond"><i/></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, fontSize: 13.5 }}>
            <div>
              <div className="mono muted">Begins</div>
              <div style={{ marginTop: 4 }}>{fmtDate(ev.start)} · {fmtTime(ev.start)}</div>
            </div>
            <div>
              <div className="mono muted">Concludes</div>
              <div style={{ marginTop: 4 }}>{fmtDate(ev.end)} · {fmtTime(ev.end)}</div>
            </div>
            <div>
              <div className="mono muted">Dress code</div>
              <div style={{ marginTop: 4 }}>{ev.dress}</div>
            </div>
            <div>
              <div className="mono muted">Locale</div>
              <div style={{ marginTop: 4 }}>Main sabhamandap, Kushawati riverbank</div>
            </div>
          </div>
          <div className="rule-diamond"><i/></div>
          <div className="mono muted">Sponsorship</div>
          <p style={{ marginTop: 6, fontSize: 13.5 }}>
            Devotees may sponsor naivedya, oil for the lamps, garlands for the deity, or the
            full mahapooja. Sponsorship is acknowledged in the temple records and on the
            day's notice board.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
            <button className="btn btn-primary"
                    onClick={() => downloadICS([ev], `${ev.id}.ics`, ev.name)}>
              <Icon name="download" size={14}/> Add to calendar (.ics)
            </button>
            <button className="btn btn-outline">
              <Icon name="heart" size={14}/> Sponsor this pooja
            </button>
            <button className="btn btn-ghost">
              <Icon name="share" size={14}/> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventsPage({ setRoute }) {
  const [tab, setTab] = React.useState("upcoming");
  const [layout, setLayout] = React.useState("grid");
  const [open, setOpen] = React.useState(null);
  const all = window.EVENTS;
  const now = Date.now();
  const upcoming = all.filter(e => new Date(e.start).getTime() >= now);
  const past = all.filter(e => new Date(e.start).getTime() < now);
  const list = tab === "upcoming" ? upcoming : past;
  return (
    <>
      <PageHeader
        kicker="Festivals & events"
        title="The temple year, festival by festival."
        deva="उत्सव क्रमावली"
        sub="Six major festivals, a dozen Ekadashi observances, and the weekly bhajan. Browse the year ahead, sponsor a seva, or add the temple calendar to your phone."
      />

      <section className="section">
        <div className="container">
          <div className="between" style={{ marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", gap: 8 }}>
              {[["upcoming", `Upcoming · ${upcoming.length}`],
                ["past",     `Past gallery · ${past.length}`]].map(([k, l]) => (
                <button key={k}
                        className={tab === k ? "btn btn-primary" : "btn btn-outline"}
                        onClick={() => setTab(k)}>{l}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button className="btn btn-ghost"
                      onClick={() => downloadICS(upcoming, "damodar-devasthan-events.ics")}>
                <Icon name="download" size={14}/> Add all to calendar
              </button>
              <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 999,
                            background: "var(--bg-2)" }}>
                <button className="icon-btn"
                        style={{ background: layout === "grid" ? "var(--bg)" : "transparent",
                                 width: 32, height: 32 }}
                        onClick={() => setLayout("grid")}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <rect x="1" y="1" width="5" height="5"/><rect x="8" y="1" width="5" height="5"/>
                    <rect x="1" y="8" width="5" height="5"/><rect x="8" y="8" width="5" height="5"/>
                  </svg>
                </button>
                <button className="icon-btn"
                        style={{ background: layout === "row" ? "var(--bg)" : "transparent",
                                 width: 32, height: 32 }}
                        onClick={() => setLayout("row")}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M1 3h12M1 7h12M1 11h12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {layout === "grid" ? (
            <div style={{ display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
              {list.map(ev => (
                <EventCard key={ev.id} ev={ev} onClick={() => setOpen(ev)}/>
              ))}
            </div>
          ) : (
            <div>
              {list.map(ev => (
                <EventCard key={ev.id} ev={ev} layout="row" onClick={() => setOpen(ev)}/>
              ))}
              <div style={{ borderTop: "1px solid var(--line)" }}/>
            </div>
          )}

          {list.length === 0 && (
            <div style={{ padding: 80, textAlign: "center", color: "var(--ink-3)" }}>
              No events to display.
            </div>
          )}
        </div>
      </section>

      <EventModal ev={open} onClose={() => setOpen(null)}/>
    </>
  );
}

Object.assign(window, { EventsPage, EventModal, EventCard });

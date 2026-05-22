// Festival Calendar — month/year switching, filters, ICS export per event + bulk.

function CalendarPage() {
  const today = new Date();
  const [year, setYear] = React.useState(2026);
  const [month, setMonth] = React.useState(today.getMonth()); // 0-11
  const [filter, setFilter] = React.useState({ festival: true, ekadashi: true, rathotsav: true });
  const [hovered, setHovered] = React.useState(null);

  // events filtered
  const allFiltered = window.EVENTS.filter(e => filter[e.kind] !== false);

  const monthEvents = allFiltered.filter(e => {
    const d = new Date(e.start);
    return d.getFullYear() === year && d.getMonth() === month;
  });
  const yearEvents = allFiltered.filter(e => new Date(e.start).getFullYear() === year);

  // grid for calendar
  const firstDay = new Date(year, month, 1);
  const startDow = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsForDay = (d) => allFiltered.filter(e => {
    const dt = new Date(e.start);
    return dt.getFullYear() === year && dt.getMonth() === month && dt.getDate() === d;
  });

  const monthName = MONTHS[month];
  const monthDeva = MONTHS_DEVA[month];

  const prev = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1);
  };
  const next = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1);
  };
  const isToday = (d) => year === today.getFullYear() && month === today.getMonth() && d === today.getDate();

  return (
    <>
      <PageHeader
        kicker="Festival calendar"
        title="The temple year, in tithi and date."
        deva="पंचांग"
        sub="The full year of festivals, Ekadashis and signature events. Subscribe the whole calendar to your phone, or add individual events one by one."
      />

      {/* Toolbar */}
      <section style={{ padding: "32px 0", borderBottom: "1px solid var(--line)",
                         background: "var(--bg-2)" }}>
        <div className="container">
          <div className="between" style={{ flexWrap: "wrap", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button className="icon-btn" onClick={prev}><Icon name="arrowL"/></button>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 240 }}>
                <div className="display" style={{ fontSize: 32, fontStyle: "italic", fontWeight: 400 }}>
                  {monthName} {year}
                </div>
                <div className="deva" style={{ color: "var(--gold)" }}>{monthDeva}</div>
              </div>
              <button className="icon-btn" onClick={next}><Icon name="arrow"/></button>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <span className="mono muted" style={{ marginRight: 6 }}>Filter</span>
              {[
                ["festival",   "Festivals", "var(--maroon)"],
                ["ekadashi",   "Ekadashis", "var(--gold)"],
                ["rathotsav",  "Rathotsav", "var(--ink)"],
              ].map(([k, l, c]) => (
                <button key={k}
                        className="btn"
                        style={{
                          padding: "6px 14px", fontSize: 12,
                          background: filter[k] ? c : "transparent",
                          color: filter[k] ? "var(--bg)" : "var(--ink-2)",
                          border: `1px solid ${filter[k] ? c : "var(--line)"}`,
                        }}
                        onClick={() => setFilter(f => ({ ...f, [k]: !f[k] }))}>
                  <span style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: filter[k] ? "var(--bg)" : c, marginRight: 4
                  }}/> {l}
                </button>
              ))}
              <div style={{ width: 1, height: 24, background: "var(--line)", margin: "0 8px" }}/>
              <button className="btn btn-primary"
                      onClick={() => downloadICS(yearEvents,
                                                 `damodar-devasthan-${year}.ics`,
                                                 `Damodar Devasthan · ${year}`)}>
                <Icon name="download" size={14}/> Add entire calendar
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 48 }}>
            {/* Calendar grid */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1,
                            background: "var(--line)",
                            border: "1px solid var(--line)" }}>
                {DOW.map(d => (
                  <div key={d} className="mono"
                       style={{ background: "var(--bg-2)", padding: "12px 14px",
                                color: "var(--ink-3)", fontSize: 10 }}>{d}</div>
                ))}
                {cells.map((d, i) => {
                  const evs = d ? eventsForDay(d) : [];
                  const hasEv = evs.length > 0;
                  return (
                    <div key={i}
                         style={{ background: "var(--bg)", padding: "10px 12px",
                                  minHeight: 96, position: "relative",
                                  cursor: hasEv ? "pointer" : "default",
                                  outline: isToday(d) ? "2px solid var(--maroon)" : "none",
                                  outlineOffset: -2 }}
                         onMouseEnter={() => hasEv && setHovered(evs[0])}
                         onMouseLeave={() => setHovered(null)}>
                      <div className="tabular" style={{
                        fontFamily: "var(--font-display)", fontSize: 22,
                        color: d ? (isToday(d) ? "var(--maroon)" : "var(--ink)") : "transparent",
                        lineHeight: 1
                      }}>{d || "—"}</div>
                      {evs.map(ev => (
                        <div key={ev.id}
                             style={{ marginTop: 6, padding: "3px 6px", borderRadius: 3,
                                      fontSize: 10.5, lineHeight: 1.25,
                                      background: ev.kind === "rathotsav" ? "var(--ink)" :
                                                  ev.kind === "ekadashi"  ? "color-mix(in oklch, var(--gold) 30%, transparent)" :
                                                                            "color-mix(in oklch, var(--maroon) 16%, transparent)",
                                      color: ev.kind === "rathotsav" ? "var(--bg)" :
                                             ev.kind === "ekadashi"  ? "color-mix(in oklch, var(--maroon) 60%, var(--ink))" :
                                                                       "var(--maroon)",
                                      fontWeight: 500,
                                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {ev.name}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
              <div className="mono muted" style={{ marginTop: 14, fontSize: 10 }}>
                Note · dates are temple-observed (Asia/Kolkata). Tithi-based events may shift ±1 day in actual observance.
              </div>
            </div>

            {/* Side list */}
            <div>
              <div className="eyebrow">{monthName} · this month</div>
              <h3 style={{ marginTop: 8, fontStyle: "italic", fontWeight: 400 }}>
                {monthEvents.length === 0
                  ? "No festivals this month"
                  : `${monthEvents.length} ${monthEvents.length === 1 ? "festival" : "festivals"}`}
              </h3>
              <div className="rule-diamond"><i/></div>
              {monthEvents.length === 0 && (
                <p className="muted">A quiet month at the devasthan — daily darshan and the weekly Saturday bhajan continue as usual.</p>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {monthEvents.map(ev => (
                  <div key={ev.id} className="card" style={{ padding: 20,
                                                              outline: hovered?.id === ev.id ? "2px solid var(--gold)" : "none",
                                                              outlineOffset: -1 }}>
                    <div className="between">
                      <div>
                        <div className="display" style={{ fontSize: 22 }}>{ev.name}</div>
                        <div className="deva" style={{ color: "var(--gold)", fontSize: 15 }}>{ev.deva}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div className="display tabular" style={{ fontSize: 28, color: "var(--maroon)", lineHeight: 1 }}>
                          {new Date(ev.start).getDate()}
                        </div>
                        <div className="mono muted" style={{ fontSize: 10 }}>
                          {fmtTime(ev.start)}
                        </div>
                      </div>
                    </div>
                    <p style={{ marginTop: 12, fontSize: 13, color: "var(--ink-2)" }}>
                      {ev.desc.split(". ")[0]}.
                    </p>
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <button className="btn btn-outline" style={{ padding: "8px 14px", fontSize: 12 }}
                              onClick={() => downloadICS([ev], `${ev.id}.ics`, ev.name)}>
                        <Icon name="plus" size={12}/> Add this event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sync banner */}
      <section className="section" style={{ background: "var(--maroon-2)", color: "var(--bg)" }}>
        <div className="container">
          <div className="between" style={{ flexWrap: "wrap", gap: 24 }}>
            <div style={{ maxWidth: 480 }}>
              <Ornament char="॥ कालो हि कारणं ॥"/>
              <h2 className="display" style={{ marginTop: 18, color: "var(--bg)", fontStyle: "italic", fontWeight: 400 }}>
                Take the temple year with you.
              </h2>
              <p style={{ marginTop: 14, opacity: 0.86 }}>
                Subscribe the full Damodar Devasthan calendar to your phone — works
                with Google, Apple, Outlook and any standards-compliant calendar app.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="btn btn-gold"
                      onClick={() => downloadICS(window.EVENTS, "damodar-devasthan-full.ics",
                                                  "Damodar Devasthan · Festival Calendar")}>
                <Icon name="download" size={14}/> Download .ICS file
              </button>
              <button className="btn"
                      style={{ background: "transparent", border: "1px solid rgba(255,255,255,.3)", color: "var(--bg)" }}>
                Google Calendar
              </button>
              <button className="btn"
                      style={{ background: "transparent", border: "1px solid rgba(255,255,255,.3)", color: "var(--bg)" }}>
                Apple Calendar
              </button>
              <button className="btn"
                      style={{ background: "transparent", border: "1px solid rgba(255,255,255,.3)", color: "var(--bg)" }}>
                Outlook
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { CalendarPage });

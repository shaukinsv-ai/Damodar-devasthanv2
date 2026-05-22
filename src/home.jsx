// Three Home page variants:
//   A · Editorial — wide cream hero, large serif headline, asymmetric block.
//   B · Cinematic — full-bleed image with overlay, dark warm tones, dramatic typography.
//   C · Heritage Almanac — magazine-style typeset, columns, calligraphic numerals.

const { useState: useS, useEffect: useE } = React;

// HeroBadge + SectionHead live in components.jsx (shared across files).

// ── Variant A: Editorial ─────────────────────────────────────────────────────
function HomeEditorial({ next, setRoute, t }) {
  return (
    <>
      <section style={{ padding: "56px 0 96px", borderBottom: "1px solid var(--line)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 56,
                        alignItems: "end" }}>
            <div>
              <HeroBadge>{t.hero.kicker}</HeroBadge>
              <h1 className="display" style={{ marginTop: 28, textWrap: "balance",
                                                fontStyle: "italic", fontWeight: 400 }}>
                {t.hero.title}
              </h1>
              <div className="deva" style={{ fontSize: 28, color: "var(--gold)", marginTop: 18 }}>
                श्री दामोदर देवस्थान
              </div>
              <p style={{ marginTop: 28, fontSize: 17, lineHeight: 1.6, color: "var(--ink-2)",
                          maxWidth: 540 }}>
                {t.hero.sub}
              </p>
              <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn btn-primary" onClick={() => setRoute("calendar")}>
                  <Icon name="calendar" size={14}/> {t.hero.cta1}
                </button>
                <button className="btn btn-outline" onClick={() => setRoute("contact")}>
                  {t.hero.cta2} <Icon name="arrow" size={14}/>
                </button>
              </div>
            </div>
            <div>
              <Placeholder ratio="3/4" label="Hero · Temple gopuram at dawn, lamps lit"
                           style={{ height: 480 }}/>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                <Placeholder ratio="4/3" label="Sanctum · idol of Lord Damodar" />
                <Placeholder ratio="4/3" label="Kushawati riverbank" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr",
                        gap: 64, alignItems: "center" }}>
            <div>
              <span className="eyebrow">{t.hero.next}</span>
              <h2 style={{ marginTop: 10, textWrap: "balance" }}>{next.name}</h2>
              <div className="deva" style={{ fontSize: 22, color: "var(--gold)", marginTop: 6 }}>
                {next.deva}
              </div>
              <div className="rule-diamond"><i/></div>
              <div className="mono" style={{ color: "var(--ink-3)" }}>
                {fmtDate(next.start)} · {fmtTime(next.start)}
              </div>
              <p style={{ marginTop: 18, color: "var(--ink-2)" }}>{next.desc}</p>
              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                <button className="btn btn-gold"
                        onClick={() => downloadICS([next], `${next.id}.ics`, next.name)}>
                  <Icon name="plus" size={14}/> Add this event
                </button>
                <button className="btn btn-ghost" onClick={() => setRoute("events")}>
                  Event details <Icon name="arrow" size={14}/>
                </button>
              </div>
            </div>
            <div className="card" style={{ padding: 40 }}>
              <div className="mono" style={{ color: "var(--ink-3)", marginBottom: 18 }}>
                Counting down to {next.name}
              </div>
              <Countdown target={next.start} />
            </div>
          </div>
        </div>
      </section>

      <HomeShared next={next} setRoute={setRoute} t={t}/>
    </>
  );
}

// ── Variant B: Cinematic ─────────────────────────────────────────────────────
function HomeCinematic({ next, setRoute, t }) {
  return (
    <>
      <section style={{ position: "relative", overflow: "hidden",
                        background: "var(--maroon-2)",
                        color: "color-mix(in oklch, var(--bg) 95%, transparent)" }}>
        <Placeholder ratio="16/9" label="Full-bleed · temple at dusk, oil lamps, mist"
                     style={{ position: "absolute", inset: 0, height: "100%", aspectRatio: "auto",
                              opacity: 0.18,
                              filter: "saturate(0.5)" }}/>
        <div style={{ position: "relative", padding: "120px 0 140px" }}>
          <div className="container">
            <Ornament char="॥ ॐ नमो भगवते दामोदराय ॥"/>
            <h1 className="display"
                style={{ marginTop: 36, color: "var(--bg)", textWrap: "balance",
                         fontSize: "clamp(56px, 9vw, 140px)", lineHeight: 0.92, fontWeight: 400 }}>
              {t.hero.title}
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end",
                          justifyContent: "space-between", gap: 40, marginTop: 56 }}>
              <p style={{ maxWidth: 480, opacity: 0.86, fontSize: 16, lineHeight: 1.7 }}>
                {t.hero.sub}
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn btn-gold" onClick={() => setRoute("calendar")}>
                  <Icon name="calendar" size={14}/> {t.hero.cta1}
                </button>
                <button className="btn"
                        style={{ border: "1px solid rgba(255,255,255,.3)",
                                 color: "var(--bg)", background: "transparent" }}
                        onClick={() => setRoute("about")}>
                  Our story <Icon name="arrow" size={14}/>
                </button>
              </div>
            </div>

            {/* Inline countdown strip */}
            <div style={{ marginTop: 96, padding: "28px 0",
                          borderTop: "1px solid rgba(255,255,255,.18)",
                          borderBottom: "1px solid rgba(255,255,255,.18)",
                          display: "flex", justifyContent: "space-between",
                          alignItems: "center", flexWrap: "wrap", gap: 24 }}>
              <div>
                <div className="mono" style={{ opacity: 0.6, fontSize: 10 }}>{t.hero.next}</div>
                <div className="display" style={{ fontSize: 32, marginTop: 4 }}>
                  {next.name} <span style={{ color: "var(--gold-2)" }}>· {fmtDate(next.start, {short:true})}</span>
                </div>
              </div>
              <Countdown target={next.start} size="md"/>
            </div>
          </div>
        </div>
      </section>

      <HomeShared next={next} setRoute={setRoute} t={t}/>
    </>
  );
}

// ── Variant C: Heritage Almanac ──────────────────────────────────────────────
function HomeAlmanac({ next, setRoute, t }) {
  return (
    <>
      <section style={{ padding: "48px 0 72px", borderBottom: "1px solid var(--line)" }}>
        <div className="container">
          {/* Masthead */}
          <div style={{ display: "flex", justifyContent: "space-between",
                        alignItems: "center", paddingBottom: 24,
                        borderBottom: "1px solid var(--ink)", color: "var(--ink)" }}>
            <div className="mono">Vol. CDLXI · No. 17</div>
            <div className="mono">श्री दामोदर · MMXXVI</div>
            <div className="mono">Kushawati · Goa</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 32, marginTop: 32 }}>
            <div>
              <span className="eyebrow">An almanac for devotees</span>
              <div className="display" style={{ fontSize: 24, lineHeight: 1.3, marginTop: 10,
                                                  fontStyle: "italic" }}>
                "एक नदी, एक शिळा,
                सातशे वर्षांचा प्रकाश।"
              </div>
              <p style={{ marginTop: 18, fontSize: 13.5, color: "var(--ink-2)" }}>
                {t.hero.sub}
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="display"
                   style={{ fontSize: "clamp(80px, 11vw, 168px)", lineHeight: 0.88,
                            fontStyle: "italic", fontWeight: 400, textWrap: "balance" }}>
                Damodar
              </div>
              <div className="deva" style={{ fontSize: 32, color: "var(--gold)", marginTop: 10 }}>
                श्री दामोदर देवस्थान
              </div>
              <div className="rule-diamond" style={{ maxWidth: 240, margin: "20px auto" }}><i/></div>
              <div className="mono" style={{ color: "var(--ink-3)" }}>
                Established 1565 · Kushawati Valley, Goa
              </div>
            </div>
            <div>
              <Placeholder ratio="3/4" label="Heritage portrait · main idol"
                           style={{ height: 280 }} />
              <div className="mono" style={{ marginTop: 12, color: "var(--ink-3)", fontSize: 10 }}>
                Fig. 1 — Shri Damodar, central sanctum.
                Carved black basalt, mid-16th century, relocated from Margao
                during the period of religious displacement.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Front-page index */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr",
                        gap: 64, alignItems: "start" }}>
            <div>
              <div className="eyebrow">{t.hero.next} · in this issue</div>
              <h2 style={{ marginTop: 12, fontStyle: "italic", fontWeight: 400 }}>
                {next.name}
              </h2>
              <div className="deva" style={{ fontSize: 22, color: "var(--gold)", marginTop: 4 }}>
                {next.deva}
              </div>
              <div className="rule-diamond"><i/></div>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "10px 28px",
                            fontSize: 13.5, color: "var(--ink-2)" }}>
                <div className="mono">Tithi</div><div>{fmtDate(next.start)}</div>
                <div className="mono">Begins</div><div>{fmtTime(next.start)}</div>
                <div className="mono">Dress</div><div>{next.dress}</div>
                <div className="mono">Locale</div><div>Main sabhamandap · Kushawati riverbank</div>
              </div>
              <p style={{ marginTop: 22, columnCount: 2, columnGap: 28, fontSize: 14.5,
                          color: "var(--ink)" }}>
                {next.desc} The Devasthan trust extends a warm welcome to devotees travelling from across Goa and beyond; arrangements for parking, prasad and overnight darshan have been finalised by the volunteers' committee.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button className="btn btn-primary"
                        onClick={() => downloadICS([next], `${next.id}.ics`, next.name)}>
                  <Icon name="download" size={14}/> Add to calendar
                </button>
                <button className="btn btn-ghost" onClick={() => setRoute("events")}>
                  All festivals <Icon name="arrow" size={14}/>
                </button>
              </div>
            </div>
            <div>
              <div className="card" style={{ background: "var(--bg)", borderRadius: 4 }}>
                <div className="mono" style={{ color: "var(--ink-3)" }}>Counting down</div>
                <div style={{ marginTop: 16 }}>
                  <Countdown target={next.start} size="md"/>
                </div>
                <div className="rule-diamond"><i/></div>
                <div className="mono" style={{ color: "var(--ink-3)" }}>This week at the temple</div>
                <ul style={{ marginTop: 14, paddingLeft: 0, listStyle: "none",
                             display: "flex", flexDirection: "column", gap: 8, fontSize: 13.5 }}>
                  {POOJA_TIMINGS.slice(0, 4).map(p => (
                    <li key={p.name} style={{ display: "flex", justifyContent: "space-between",
                                              borderBottom: "1px dotted var(--line)", paddingBottom: 8 }}>
                      <span>{p.name} · <span className="deva" style={{color:"var(--gold)"}}>{p.deva}</span></span>
                      <span className="mono tabular">{p.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeShared next={next} setRoute={setRoute} t={t}/>
    </>
  );
}

// ── Shared lower-page sections (used by all three variants) ──────────────────
function HomeShared({ next, setRoute, t }) {
  const featured = window.EVENTS.filter(e => e.featured).slice(0, 4);
  return (
    <>
      {/* About teaser */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
                        gap: 80, alignItems: "center" }}>
            <Placeholder ratio="4/5" label="Temple complex aerial — laterite stone, red-tiled mandap"/>
            <div>
              <SectionHead kicker="About the devasthan"
                           title="Brought across the river in 1565, the lineage continues."
                           deva="॥ श्री गुरुदेव दत्त ॥"/>
              <p>
                When the deity was relocated from the original shrine in Margao during the period of
                religious displacement, devotees crossed the Kushawati and rebuilt the temple stone by
                stone on the new bank. The basalt idol consecrated then remains in the sanctum today.
              </p>
              <p>
                Today the temple is the heart of three villages: site of the annual Rathotsav, of Shigmo
                folk-dance, and of a weekly bhajan tradition unbroken for four hundred years.
              </p>
              <button className="btn btn-outline" onClick={() => setRoute("about")}
                      style={{ marginTop: 12 }}>
                Read our history <Icon name="arrow" size={14}/>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming festivals */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div className="between" style={{ marginBottom: 40 }}>
            <SectionHead kicker="Upcoming festivals"
                         title="The temple year ahead"
                         maxw={520}/>
            <button className="btn btn-ghost" onClick={() => setRoute("calendar")}>
              Full calendar <Icon name="arrow" size={14}/>
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
            {featured.map(ev => (
              <div key={ev.id} className="card" style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}
                   onClick={() => setRoute("events")}>
                <Placeholder ratio="4/5" label={ev.img}
                             style={{ borderRadius: 0 }}/>
                <div style={{ padding: 20 }}>
                  <div className="mono" style={{ color: "var(--maroon)" }}>
                    {fmtDate(ev.start, { short: true })}
                  </div>
                  <h4 style={{ marginTop: 8 }}>{ev.name}</h4>
                  <div className="deva" style={{ color: "var(--gold)", fontSize: 16, marginTop: 4 }}>
                    {ev.deva}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily pooja timings */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr",
                        gap: 64, alignItems: "start" }}>
            <SectionHead kicker="Daily darshan"
                         title="Pooja timings"
                         deva="दैनिक पूजा"
                         maxw={420}/>
            <ul style={{ listStyle: "none", padding: 0, margin: 0,
                         display: "flex", flexDirection: "column" }}>
              {POOJA_TIMINGS.map((p, i) => (
                <li key={p.name}
                    style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr auto",
                             gap: 24, alignItems: "center",
                             padding: "20px 0", borderTop: "1px solid var(--line)",
                             borderBottom: i === POOJA_TIMINGS.length-1 ? "1px solid var(--line)" : "none" }}>
                  <div className="mono tabular" style={{ color: "var(--ink-3)" }}>0{i+1}.</div>
                  <div>
                    <div className="display" style={{ fontSize: 22 }}>{p.name}</div>
                    <div className="deva" style={{ color: "var(--gold)", fontSize: 15 }}>{p.deva}</div>
                  </div>
                  <div className="muted" style={{ fontSize: 13 }}>
                    {i === 0 && "Brass bell, first lamp"}
                    {i === 1 && "Bath of the deity, fresh garments"}
                    {i === 2 && "Naivedya offering, prasad"}
                    {i === 3 && "Evening lamps lit in mandap"}
                    {i === 4 && "Final aarti, sanctum closed"}
                  </div>
                  <div className="mono tabular">{p.time}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Committee message */}
      <section className="section" style={{ background: "var(--maroon-2)", color: "var(--bg)" }}>
        <div className="container">
          <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
            <Ornament char="॥ शुभं भवतु ॥"/>
            <h2 className="display"
                style={{ marginTop: 28, color: "var(--bg)", fontStyle: "italic",
                         fontWeight: 400, textWrap: "balance" }}>
              "Whether you have come for darshan, for the bhajan, or simply to sit by the river —
              you are welcome here. The temple is yours."
            </h2>
            <div style={{ marginTop: 32, opacity: 0.86 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>
                Shri Ramakant V. Naik
              </div>
              <div className="mono" style={{ marginTop: 4, opacity: 0.7 }}>
                Adhyaksha · President of the Devasthan Trust
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit footer-section */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr",
                        gap: 64, alignItems: "stretch" }}>
            <div>
              <SectionHead kicker="Visit"
                           title="On the banks of the Kushawati"
                           maxw={420}/>
              <p>
                The temple sits a short walk from the village square in the
                Kushawati valley of South Goa, twelve kilometres east of Margao.
                Open daily from 05:00 to 21:00.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
                <button className="btn btn-outline" onClick={() => setRoute("contact")}>
                  <Icon name="direction" size={14}/> Get directions
                </button>
                <button className="btn btn-ghost" onClick={() => setRoute("contact")}>
                  Parking, accessibility & timings <Icon name="arrow" size={14}/>
                </button>
              </div>
            </div>
            <Placeholder ratio="16/10" label="Map placeholder — Kushawati valley, marker on temple"/>
          </div>
        </div>
      </section>
    </>
  );
}

function Home({ variant, setRoute, t }) {
  const next = window.EVENTS.find(e => new Date(e.start) > new Date()) || window.EVENTS[0];
  if (variant === "cinematic") return <HomeCinematic next={next} setRoute={setRoute} t={t}/>;
  if (variant === "almanac")   return <HomeAlmanac   next={next} setRoute={setRoute} t={t}/>;
  return <HomeEditorial next={next} setRoute={setRoute} t={t}/>;
}

Object.assign(window, { Home });

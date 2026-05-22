// About + Committee + Contact pages.
// PageHeader, SectionHead, HeroBadge live in components.jsx so they're loaded
// first and available to every page module.

// ─── About ───────────────────────────────────────────────────────────────────
function AboutPage({ setRoute }) {
  const timeline = [
    { year: "1310", title: "Origin in Margao", body: "The original deity is consecrated at the Damodar shrine in the Salcete capital, Margao. The temple becomes a pilgrimage centre for the Saraswat community of South Goa." },
    { year: "1565", title: "The river crossing", body: "During the period of religious displacement in coastal Goa, the basalt idol of Shri Damodar is carried across the Sal and the Kushawati to the safety of the Antruz hill country. A new sanctum is built stone by stone over six monsoons." },
    { year: "1620", title: "Sabhamandap completed", body: "The wooden mandap with its carved teak pillars — each donated by a village house — is consecrated. The Shigmo folk-dance tradition takes root in its colonnaded courtyard." },
    { year: "1798", title: "The first Rathotsav", body: "Devotees from forty surrounding villages contribute carved panels for the ceremonial rath. The two-day procession through the valley becomes the temple's defining festival." },
    { year: "1962", title: "Liberation restoration", body: "Following the integration of Goa, the trust is formally re-registered and the sanctum's laterite walls are restored. The original idol is returned to its black-basalt pedestal." },
    { year: "2005", title: "Heritage protection", body: "The temple complex is listed on the Goa State Department of Archives & Archaeology heritage register. The riverbank ghats and the Naga shrine are added to the protected precinct." },
    { year: "2025", title: "Sansthan today", body: "Run by a forty-member trust and a community of two thousand registered devotees, the temple welcomes some thirty thousand visitors a year — and still keeps its evening lamps lit by hand." },
  ];
  return (
    <>
      <PageHeader
        kicker="About the devasthan"
        title="A temple of song, of harvest, and of the slow Goan dusk."
        deva="॥ ॐ नमो भगवते दामोदराय ॥"
        sub="Home of the Damodar lineage since its relocation from Margao in the year 1565 — and continuously in worship for every one of the four hundred and sixty years since."
      />

      {/* Heritage paragraphs */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <Placeholder ratio="3/4" label="Sanctum of Lord Damodar — black basalt idol, golden trimmings"/>
              <div className="mono" style={{ marginTop: 14, fontSize: 10.5, color: "var(--ink-3)" }}>
                The sanctum, undisturbed since 1565.
              </div>
            </div>
            <div>
              <span className="eyebrow">The deity</span>
              <h2 style={{ marginTop: 12, textWrap: "balance" }}>
                Damodar — the rope-bound one.
              </h2>
              <p style={{ marginTop: 20 }}>
                Damodar is an aspect of Vishnu — specifically of the child Krishna,
                bound at the waist with a rope (दामन्) by his mother Yashoda.
                The form is gentle, household, agrarian: a god of harvest, of family,
                of the slow patience of motherhood.
              </p>
              <p>
                The basalt idol in our sanctum was carved in the early 14th century
                and originally installed at the Damodar temple in Margao. When it
                was no longer safe to keep there, devotees moved it east, across
                the Kushawati, to the present site — a journey of three nights,
                covered in cloth and carried by relay through the forest.
              </p>
              <p>
                The Kushawati itself is considered sacred to the temple. The Naga shrine
                on the riverbank is older than the main sanctum, and many of the temple's
                rituals — the Mangal Snan, the Naga Panchami offerings, the ritual
                immersion at Shigmo — take place at its ghats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <SectionHead kicker="Seven hundred years" title="A timeline" deva="कालक्रम" maxw={520}/>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr",
                        columnGap: 56, rowGap: 0 }}>
            {timeline.map((t, i) => (
              <React.Fragment key={t.year}>
                <div style={{ paddingTop: 32,
                              borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--line)",
                              fontFamily: "var(--font-display)", fontSize: 64,
                              fontStyle: "italic", fontWeight: 400,
                              color: "var(--maroon)", lineHeight: 1, paddingBottom: 32 }}>
                  {t.year}
                </div>
                <div style={{ paddingTop: 32,
                              borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--line)",
                              paddingBottom: 32 }}>
                  <div className="display" style={{ fontSize: 26 }}>{t.title}</div>
                  <p style={{ marginTop: 10, color: "var(--ink-2)", maxWidth: 620 }}>{t.body}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Significance */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48 }}>
            {[
              { kicker: "Architecture",
                title: "Laterite and teak.",
                body: "The sanctum is built of locally-quarried laterite, the mandap of teak. The roof is the traditional South-Goan red Mangalore tile. The walls were last consolidated in 1962 using lime mortar to the original recipe." },
              { kicker: "Traditions",
                title: "An unbroken bhajan parampara.",
                body: "Weekly bhajans every Saturday since 1612. The Kushawati valley folk tradition — distinct from Saraswat and Bhandari styles — is preserved here by the Saraswati bhajan mandali." },
              { kicker: "Festivals",
                title: "From Shigmo to Rathotsav.",
                body: "Six major festivals in the temple year. Shigmo in spring and Rathotsav in the cool months are the largest, drawing devotees from across South Goa." },
            ].map(c => (
              <div key={c.kicker}>
                <span className="eyebrow">{c.kicker}</span>
                <h3 style={{ marginTop: 12 }}>{c.title}</h3>
                <div className="rule-diamond"><i/></div>
                <p style={{ color: "var(--ink-2)" }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <Ornament char="॥ श्री दामोदर अर्पणमस्तु ॥"/>
          <h2 style={{ marginTop: 28, textWrap: "balance", maxWidth: 680, margin: "28px auto 0" }}>
            Visit us, attend a festival, or take the temple year with you.
          </h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center",
                        marginTop: 32, flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => setRoute("calendar")}>
              <Icon name="calendar" size={14}/> Add festival calendar
            </button>
            <button className="btn btn-outline" onClick={() => setRoute("contact")}>
              Plan a visit <Icon name="arrow" size={14}/>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Committee ───────────────────────────────────────────────────────────────
function CommitteePage() {
  const groups = [
    { id: "Executive",     roles: ["President", "Vice President", "Treasurer", "Secretary"] },
    { id: "Trustees",      roles: ["Trustee · Heritage", "Trustee · Estate"] },
    { id: "Event",         roles: ["Event Committee · Chair", "Event Committee"] },
    { id: "Religious",     roles: ["Pujari Pramukh", "Bhajan Mandali · Lead"] },
    { id: "Volunteers",    roles: ["Volunteers · Coordinator", "Bhojanshala · Annapurna"] },
  ];
  const inGroup = (group) =>
    window.COMMITTEE.filter(m => group.roles.some(r => m.role.includes(r.split(" · ")[0]))
                                                     && (group.roles.some(r => m.role === r) || group.id === "Executive"));
  // simpler: bucket by role keyword
  const buckets = {
    "Executive":   window.COMMITTEE.filter(m => /President|Treasurer|Secretary/.test(m.role)),
    "Trustees":    window.COMMITTEE.filter(m => /Trustee/.test(m.role)),
    "Event":       window.COMMITTEE.filter(m => /Event Committee/.test(m.role)),
    "Religious":   window.COMMITTEE.filter(m => /Pujari|Bhajan/.test(m.role)),
    "Volunteers":  window.COMMITTEE.filter(m => /Volunteers|Bhojanshala/.test(m.role)),
  };
  const order = ["Executive", "Trustees", "Event", "Religious", "Volunteers"];
  return (
    <>
      <PageHeader
        kicker="Devasthan committee"
        title="In the service of Shri Damodar."
        deva="समिती सदस्य"
        sub="The temple is run entirely by a forty-member devotee-trust drawn from the surrounding villages. Below are the office-bearers for the term 2024 – 2028."
      />
      <section className="section">
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 64 }}>
          {order.map(g => (
            <div key={g}>
              <div className="between" style={{ marginBottom: 28,
                                                  borderBottom: "1px solid var(--ink)",
                                                  paddingBottom: 18 }}>
                <div className="display" style={{ fontSize: 36, fontStyle: "italic", fontWeight: 400 }}>{g}</div>
                <div className="mono" style={{ color: "var(--ink-3)" }}>
                  {buckets[g].length} {buckets[g].length === 1 ? "member" : "members"}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
                {buckets[g].map(m => (
                  <div key={m.name} className="card" style={{ padding: 0, overflow: "hidden" }}>
                    <Placeholder ratio="1/1" label={`Portrait · ${m.name.split(" ").slice(1,3).join(" ")}`}
                                 style={{ borderRadius: 0 }}/>
                    <div style={{ padding: 18 }}>
                      <div className="display" style={{ fontSize: 19 }}>{m.name}</div>
                      <div className="mono" style={{ marginTop: 6, fontSize: 10.5, color: "var(--maroon)" }}>
                        {m.role}
                      </div>
                      <div className="muted" style={{ marginTop: 10, fontSize: 12 }}>
                        in service since {m.since}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function ContactPage() {
  const [sent, setSent] = React.useState(false);
  return (
    <>
      <PageHeader kicker="Contact & visit"
                  title="A short walk from the village square."
                  deva="संपर्क"
                  sub="The temple is twelve kilometres east of Margao, in the Kushawati valley. Open daily from 05:00 to 21:00. Festival days may have extended hours — please check the calendar."/>
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64 }}>
            <Placeholder ratio="4/3" label="Map · Kushawati valley with temple pin"
                         style={{ height: "100%", minHeight: 460 }}/>
            <div>
              <div className="card">
                <div className="eyebrow">Address</div>
                <div className="display" style={{ fontSize: 22, marginTop: 8 }}>
                  Shri Damodar Devasthan
                </div>
                <p style={{ marginTop: 6, color: "var(--ink-2)", fontSize: 14 }}>
                  Kushawati Valley, Antruz Mahal<br/>
                  Sanguem Taluka, South Goa 403704<br/>
                  India
                </p>
                <div className="rule-diamond"><i/></div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 13.5 }}>
                  <div className="between"><span className="mono muted">Phone</span>
                       <span>+91 832 264 5510</span></div>
                  <div className="between"><span className="mono muted">Email</span>
                       <span>seva@damodardevasthan.org</span></div>
                  <div className="between"><span className="mono muted">Hours</span>
                       <span className="tabular">05:00 — 21:00</span></div>
                  <div className="between"><span className="mono muted">Parking</span>
                       <span>Free, 80 vehicles</span></div>
                </div>
                <button className="btn btn-outline" style={{ marginTop: 22, width: "100%" }}>
                  <Icon name="direction" size={14}/> Open in Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64 }}>
            <SectionHead kicker="Reach the office"
                         title="Devotee enquiries, seva booking, volunteer registration."
                         maxw={420}/>
            <form onSubmit={e => { e.preventDefault(); setSent(true); }}
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <input className="input" placeholder="Your name"/>
              <input className="input" placeholder="Phone or email"/>
              <select className="input" style={{ gridColumn: "1 / -1" }}>
                <option>I would like to…</option>
                <option>Book a seva or pooja</option>
                <option>Volunteer for an event</option>
                <option>Donate / sponsor</option>
                <option>Visit the temple</option>
                <option>Speak with the committee</option>
              </select>
              <textarea className="input" placeholder="Message — please share any context the trust should know"
                        style={{ gridColumn: "1 / -1", minHeight: 140 }}/>
              <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12, alignItems: "center" }}>
                <button className="btn btn-primary" type="submit">
                  Send to the office <Icon name="arrow" size={14}/>
                </button>
                {sent && (
                  <span className="mono" style={{ color: "var(--maroon)" }}>
                    ✓ Received. We will respond within 48 hours.
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { AboutPage, CommitteePage, ContactPage });

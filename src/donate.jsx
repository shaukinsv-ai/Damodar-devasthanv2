// Donation page — UPI QR mock, amount picker, sponsor-a-pooja, receipt mock.

function UpiQR({ amount = 0 }) {
  // Deterministic pseudo-QR: 25x25 grid of cells. Pure ornamental — looks like
  // a real QR without claiming to be one. Seeded from amount for variation.
  const N = 25;
  const seed = (amount * 9301 + 49297) % 233280;
  let s = seed || 1;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const cells = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      // Three position-detection corner squares (real QR feature)
      const inFinder = (X, Y) =>
        (x >= X && x < X + 7 && y >= Y && y < Y + 7);
      if (inFinder(0, 0) || inFinder(N - 7, 0) || inFinder(0, N - 7)) {
        const lx = inFinder(0,0) ? x : inFinder(N-7,0) ? x - (N-7) : x;
        const ly = inFinder(0,0) || inFinder(N-7,0) ? y : y - (N-7);
        const edge = lx === 0 || lx === 6 || ly === 0 || ly === 6;
        const center = (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
        cells.push(edge || center);
        continue;
      }
      cells.push(rand() > 0.52);
    }
  }
  return (
    <div style={{ width: 220, height: 220, padding: 14, background: "white",
                  borderRadius: 8, boxShadow: "0 1px 0 var(--line) inset",
                  border: "1px solid var(--line)" }}>
      <svg viewBox={`0 0 ${N} ${N}`} width="100%" height="100%" shapeRendering="crispEdges">
        {cells.map((on, i) => on && (
          <rect key={i} x={i % N} y={Math.floor(i / N)} width="1" height="1" fill="#1a0e0a"/>
        ))}
      </svg>
    </div>
  );
}

function DonatePage() {
  const presets = [251, 501, 1001, 2501, 5001, 11001];
  const [amount, setAmount] = React.useState(1001);
  const [custom, setCustom] = React.useState("");
  const [purpose, setPurpose] = React.useState("general");
  const [step, setStep] = React.useState("amount"); // amount | pay | done
  const [pan, setPan] = React.useState("");

  const purposes = [
    { id: "general",  label: "General fund",      sub: "Daily upkeep, lamps, prasad" },
    { id: "annapurna",label: "Annapurna seva",    sub: "Sponsor the community meal"  },
    { id: "rathotsav",label: "Rathotsav fund",    sub: "Annual chariot festival"     },
    { id: "heritage", label: "Heritage restoration", sub: "Sanctum, mandap, ghats"   },
    { id: "lamps",    label: "Oil for the lamps", sub: "One year of perpetual flame" },
  ];

  const finalAmount = Number(custom) || amount;

  return (
    <>
      <PageHeader
        kicker="Seva · daan"
        title="Offer your seva to the devasthan."
        deva="दान · सेवा"
        sub="Every contribution — small or large — keeps the lamps lit, the bhajan singing, and the temple doors open. All donations are receipted; PAN required above ₹50,000."
      />

      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 64,
                        alignItems: "start" }}>
            <div>
              {step === "amount" && <>
                <span className="eyebrow">Step 1 of 2 · Your offering</span>
                <h2 style={{ marginTop: 10 }}>Choose an amount.</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                              gap: 10, marginTop: 24 }}>
                  {presets.map(p => (
                    <button key={p}
                            className="card"
                            style={{ padding: "18px 18px",
                                     borderColor: amount === p && !custom ? "var(--maroon)" : "var(--line)",
                                     background: amount === p && !custom ? "color-mix(in oklch, var(--maroon) 8%, var(--bg-2))" : "var(--bg-2)",
                                     cursor: "pointer", textAlign: "left" }}
                            onClick={() => { setAmount(p); setCustom(""); }}>
                      <div className="display tabular" style={{ fontSize: 28 }}>
                        ₹{p.toLocaleString("en-IN")}
                      </div>
                      <div className="mono muted" style={{ fontSize: 10, marginTop: 4 }}>
                        {p === 251 && "One day of lamps"}
                        {p === 501 && "Naivedya · single seva"}
                        {p === 1001 && "Abhishek · routine"}
                        {p === 2501 && "Annapurna · 50 devotees"}
                        {p === 5001 && "Mahapooja · sponsor"}
                        {p === 11001 && "Patron · full month"}
                      </div>
                    </button>
                  ))}
                </div>

                <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="mono muted">or custom</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8,
                                background: "var(--bg-2)", borderRadius: var_radius_lg(),
                                padding: "4px 14px", border: "1px solid var(--line)",
                                flex: 1, maxWidth: 320 }}>
                    <span className="display" style={{ fontSize: 22 }}>₹</span>
                    <input
                      type="number" value={custom}
                      placeholder="Enter amount"
                      onChange={e => setCustom(e.target.value)}
                      style={{ border: 0, background: "transparent", outline: "none",
                                fontFamily: "var(--font-display)", fontSize: 22,
                                color: "var(--ink)", width: "100%", padding: "10px 0" }}
                    />
                  </div>
                </div>

                <h3 style={{ marginTop: 48 }}>Apply to a purpose</h3>
                <div className="rule-diamond"><i/></div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {purposes.map(p => (
                    <label key={p.id}
                           style={{ display: "flex", padding: "16px 0", gap: 18,
                                    borderTop: "1px solid var(--line)", cursor: "pointer",
                                    alignItems: "center" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%",
                                    border: "1.5px solid " + (purpose === p.id ? "var(--maroon)" : "var(--line)"),
                                    display: "grid", placeItems: "center" }}>
                        {purpose === p.id && (
                          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--maroon)" }}/>
                        )}
                      </div>
                      <input type="radio" name="purpose" style={{ display: "none" }}
                             checked={purpose === p.id} onChange={() => setPurpose(p.id)}/>
                      <div style={{ flex: 1 }}>
                        <div className="display" style={{ fontSize: 20 }}>{p.label}</div>
                        <div className="mono muted" style={{ fontSize: 11 }}>{p.sub}</div>
                      </div>
                    </label>
                  ))}
                  <div style={{ borderTop: "1px solid var(--line)" }}/>
                </div>

                <input className="input" placeholder="PAN (required above ₹50,000)"
                       style={{ marginTop: 28, maxWidth: 320 }}
                       value={pan} onChange={e => setPan(e.target.value)}/>

                <button className="btn btn-primary"
                        style={{ marginTop: 28 }}
                        onClick={() => setStep("pay")}>
                  Continue to payment · ₹{finalAmount.toLocaleString("en-IN")}
                  <Icon name="arrow" size={14}/>
                </button>
              </>}

              {step === "pay" && <>
                <button className="btn btn-ghost" style={{ paddingLeft: 0 }} onClick={() => setStep("amount")}>
                  <Icon name="arrowL" size={14}/> Back
                </button>
                <span className="eyebrow" style={{ marginTop: 14, display: "block" }}>Step 2 of 2 · Payment</span>
                <h2 style={{ marginTop: 10 }}>Pay ₹{finalAmount.toLocaleString("en-IN")} by UPI.</h2>
                <p style={{ marginTop: 14, maxWidth: 520 }}>
                  Scan the QR code with any UPI app — GPay, PhonePe, Paytm, BHIM —
                  or send to <span className="mono">damodardevasthan@kotak</span>.
                  Your receipt will be generated automatically once payment is confirmed.
                </p>

                <div style={{ display: "flex", gap: 32, marginTop: 28, flexWrap: "wrap", alignItems: "center" }}>
                  <UpiQR amount={finalAmount}/>
                  <div>
                    <div className="mono muted">UPI ID</div>
                    <div className="display" style={{ fontSize: 24, marginTop: 4 }}>
                      damodardevasthan@kotak
                    </div>
                    <div className="rule-diamond" style={{ margin: "20px 0" }}><i/></div>
                    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr",
                                  gap: "8px 24px", fontSize: 13 }}>
                      <span className="mono muted">Amount</span>
                      <span className="tabular">₹{finalAmount.toLocaleString("en-IN")}</span>
                      <span className="mono muted">Purpose</span>
                      <span>{purposes.find(p => p.id === purpose).label}</span>
                      <span className="mono muted">Reference</span>
                      <span className="mono">DAM-{Date.now().toString().slice(-7)}</span>
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary" style={{ marginTop: 32 }}
                        onClick={() => setStep("done")}>
                  <Icon name="check" size={14}/> I have completed the payment
                </button>
                <button className="btn btn-ghost" style={{ marginTop: 32, marginLeft: 8 }}>
                  Or pay by card / netbanking <Icon name="arrow" size={14}/>
                </button>
              </>}

              {step === "done" && <>
                <Ornament char="॥ धन्यवाद ॥"/>
                <h2 style={{ marginTop: 22 }}>Thank you for your seva.</h2>
                <p style={{ marginTop: 14, maxWidth: 520 }}>
                  May Shri Damodar accept your offering. The trust has emailed your receipt
                  and will acknowledge your contribution at the next mahapooja.
                </p>
                <div className="card" style={{ marginTop: 28, maxWidth: 480 }}>
                  <div className="between">
                    <div className="mono muted">Receipt</div>
                    <div className="mono">DAM-{Date.now().toString().slice(-7)}</div>
                  </div>
                  <div className="rule-diamond"><i/></div>
                  <div style={{ display: "grid", gridTemplateColumns: "auto 1fr",
                                gap: "10px 28px", fontSize: 13.5 }}>
                    <span className="mono muted">Amount</span>
                    <span className="display tabular" style={{ fontSize: 22 }}>
                      ₹{finalAmount.toLocaleString("en-IN")}
                    </span>
                    <span className="mono muted">Purpose</span>
                    <span>{purposes.find(p => p.id === purpose).label}</span>
                    <span className="mono muted">Date</span>
                    <span>{fmtDate(new Date())}</span>
                  </div>
                </div>
                <button className="btn btn-outline" style={{ marginTop: 24 }}
                        onClick={() => { setStep("amount"); setAmount(1001); setCustom(""); }}>
                  Make another offering <Icon name="plus" size={14}/>
                </button>
              </>}
            </div>

            {/* Sidebar: sponsor-a-pooja */}
            <aside style={{ position: "sticky", top: 96 }}>
              <div className="card">
                <Ornament char="श्री"/>
                <h3 style={{ marginTop: 16 }}>Sponsor a pooja</h3>
                <p style={{ marginTop: 10, fontSize: 13.5, color: "var(--ink-2)" }}>
                  Reserve a specific seva on a specific day — your name (or a name
                  of your choosing) will be read aloud at the sankalp.
                </p>
                <div style={{ display: "flex", flexDirection: "column", marginTop: 14 }}>
                  {[
                    ["Mahapooja",    "₹11,001"],
                    ["Abhishek",     "₹5,001"],
                    ["Naivedya",     "₹2,501"],
                    ["Annapurna",    "₹1,501 / 50 devotees"],
                    ["Lamp dedication", "₹251 / day"],
                  ].map(([n, p], i) => (
                    <div key={n} style={{ display: "flex", justifyContent: "space-between",
                                            padding: "12px 0",
                                            borderTop: i === 0 ? "none" : "1px solid var(--line)" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>{n}</span>
                      <span className="mono tabular" style={{ color: "var(--maroon)" }}>{p}</span>
                    </div>
                  ))}
                </div>
                <button className="btn btn-outline" style={{ marginTop: 18, width: "100%" }}>
                  Book a date <Icon name="arrow" size={14}/>
                </button>
              </div>

              <div style={{ marginTop: 18, padding: 18, fontSize: 12,
                            color: "var(--ink-3)", lineHeight: 1.6 }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", marginBottom: 8 }}>
                  80G Tax exemption
                </div>
                Donations to the Damodar Devasthan Trust are eligible for tax exemption under
                Section 80G of the Income Tax Act. Reg. No. GOA/REG/E-04217. 80G certificate
                AABTD8419L · valid through FY 2027–28.
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

// Tiny helper so JSX inline style can reference the CSS custom property easily.
function var_radius_lg() { return "14px"; }

Object.assign(window, { DonatePage });

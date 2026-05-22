// Gallery — masonry layout + lightbox

function GalleryPage() {
  const [open, setOpen] = React.useState(null); // index
  const items = window.GALLERY;
  const [filter, setFilter] = React.useState("all");

  const filters = [
    ["all", "All"], ["festival", "Festivals"], ["heritage", "Heritage"], ["aerial", "Drone"]
  ];

  // tag bucket
  const matches = (tag) => {
    if (filter === "all") return true;
    if (filter === "festival") return /Mahashivratri|Rathotsav|Shigmo|Diwali|Ganesh|Bhajan|Saptah/.test(tag);
    if (filter === "heritage") return /heritage|gopuram|1962|Naga|riverbank|Sabhamandap/i.test(tag);
    if (filter === "aerial") return /aerial|drone/i.test(tag);
    return true;
  };

  const filtered = items.map((it, i) => ({ ...it, i })).filter(it => matches(it.tag));

  const close = () => setOpen(null);
  const nav = (dir) => setOpen(o => {
    const idx = filtered.findIndex(it => it.i === o);
    const ni = (idx + dir + filtered.length) % filtered.length;
    return filtered[ni].i;
  });

  React.useEffect(() => {
    if (open == null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft") nav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <PageHeader
        kicker="Gallery"
        title="The temple year, in photographs."
        deva="चित्रदालन"
        sub="A selection from the temple's annual photography. Festivals, heritage, daily darshan and aerial views of the complex."
      />

      <section style={{ padding: "32px 0", borderBottom: "1px solid var(--line)" }}>
        <div className="container">
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Icon name="filter" size={16}/>
            {filters.map(([k, l]) => (
              <button key={k}
                      className={filter === k ? "btn btn-primary" : "btn btn-ghost"}
                      style={{ padding: "8px 16px", fontSize: 12 }}
                      onClick={() => setFilter(k)}>{l}</button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <div style={{ columnCount: 3, columnGap: 18 }}>
            {filtered.map(it => (
              <div key={it.i} style={{ breakInside: "avoid", marginBottom: 18 }}>
                <div onClick={() => setOpen(it.i)} style={{ cursor: "zoom-in" }}>
                  <Placeholder ratio={it.ratio} label={it.tag}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {open != null && (
        <div className="modal-backdrop" onClick={close}
             style={{ background: "rgba(0,0,0,.9)", padding: 0,
                       display: "flex", flexDirection: "column" }}>
          <div style={{ position: "absolute", top: 18, right: 18, display: "flex", gap: 8, zIndex: 2 }}>
            <button className="icon-btn"
                    style={{ background: "rgba(255,255,255,.12)", color: "white" }}
                    onClick={e => { e.stopPropagation(); close(); }}>
              <Icon name="close"/>
            </button>
          </div>
          <div style={{ position: "absolute", left: 18, top: "50%", zIndex: 2 }}>
            <button className="icon-btn" style={{ background: "rgba(255,255,255,.12)", color: "white", width: 48, height: 48 }}
                    onClick={e => { e.stopPropagation(); nav(-1); }}>
              <Icon name="arrowL"/>
            </button>
          </div>
          <div style={{ position: "absolute", right: 18, top: "50%", zIndex: 2 }}>
            <button className="icon-btn" style={{ background: "rgba(255,255,255,.12)", color: "white", width: 48, height: 48 }}
                    onClick={e => { e.stopPropagation(); nav(1); }}>
              <Icon name="arrow"/>
            </button>
          </div>
          <div style={{ margin: "auto", maxWidth: "min(1100px, 90vw)", width: "100%" }}
               onClick={e => e.stopPropagation()}>
            <Placeholder ratio={items[open].ratio} label={items[open].tag}
                         style={{ width: "100%" }}/>
            <div className="mono" style={{ color: "rgba(255,255,255,.7)", marginTop: 16,
                                            textAlign: "center", fontSize: 11 }}>
              {filtered.findIndex(it => it.i === open) + 1} / {filtered.length} · {items[open].tag}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Object.assign(window, { GalleryPage });

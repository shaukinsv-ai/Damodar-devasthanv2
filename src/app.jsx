// Main app — route switching, tweaks, theme.

const { useState: useState_, useEffect: useEffect_ } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "homeVariant": "editorial",
  "palette": ["#5C1A1B", "#C89B45", "#F7EFE0"],
  "fontPairing": "cormorant-manrope",
  "dark": false
}/*EDITMODE-END*/;

const FONT_PAIRINGS = {
  "cormorant-manrope": {
    label: "Cormorant + Manrope",
    display: "\"Cormorant Garamond\", \"Garamond\", serif",
    body:    "\"Manrope\", ui-sans-serif, -apple-system, system-ui, sans-serif",
  },
  "spectral-dmsans": {
    label: "Spectral + DM Sans",
    display: "\"Spectral\", \"Cormorant Garamond\", serif",
    body:    "\"DM Sans\", \"Manrope\", ui-sans-serif, sans-serif",
  },
  "ebgaramond-workSans": {
    label: "EB Garamond + Work Sans",
    display: "\"EB Garamond\", \"Cormorant Garamond\", serif",
    body:    "\"Work Sans\", \"Manrope\", ui-sans-serif, sans-serif",
  },
};

const PALETTES = [
  ["#5C1A1B", "#C89B45", "#F7EFE0"], // maroon · warm gold · cream (default)
  ["#3D2818", "#B98850", "#F0E6D2"], // earth brown · ochre · sand
  ["#2A4D3A", "#C99C36", "#F3EEDD"], // forest green · gold · ivory
  ["#4B1E2F", "#D4A050", "#FAF4E8"], // plum · amber · linen
];

function App() {
  const [t_, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState_("home");
  const [lang, setLang] = useState_("en");
  const [theme, setTheme] = useState_(t_.dark ? "dark" : "light");

  // Sync theme tweak ↔ state
  useEffect_(() => { setTheme(t_.dark ? "dark" : "light"); }, [t_.dark]);

  // Apply tweaks to CSS custom properties at the root
  useEffect_(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);

    const fp = FONT_PAIRINGS[t_.fontPairing] || FONT_PAIRINGS["cormorant-manrope"];
    root.style.setProperty("--font-display", fp.display);
    root.style.setProperty("--font-body", fp.body);

    const [maroon, gold, cream] = t_.palette || PALETTES[0];
    // Allow palette override but keep oklch-based ones if default chosen
    root.style.setProperty("--maroon", maroon);
    root.style.setProperty("--gold",   gold);
    if (theme === "light") {
      root.style.setProperty("--bg", cream);
    }
  }, [t_.palette, t_.fontPairing, theme]);

  // Scroll to top on route change
  useEffect_(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [route]);

  const tStrings = window.I18N[lang] || window.I18N.en;

  // Page label for comments tooling
  const screenLabel = {
    home: "Home", about: "About", events: "Events", calendar: "Calendar",
    committee: "Committee", gallery: "Gallery", donate: "Donate", contact: "Contact"
  }[route];

  return (
    <div className="app" data-screen-label={screenLabel}>
      <Nav route={route} setRoute={setRoute}
           lang={lang} setLang={setLang}
           theme={theme} setTheme={(v) => { setTheme(v); setTweak("dark", v === "dark"); }}
           t={tStrings}/>

      <main>
        {route === "home"      && <Home variant={t_.homeVariant} setRoute={setRoute} t={tStrings}/>}
        {route === "about"     && <AboutPage setRoute={setRoute}/>}
        {route === "committee" && <CommitteePage/>}
        {route === "events"    && <EventsPage setRoute={setRoute}/>}
        {route === "calendar"  && <CalendarPage/>}
        {route === "gallery"   && <GalleryPage/>}
        {route === "donate"    && <DonatePage/>}
        {route === "contact"   && <ContactPage/>}
      </main>

      <Footer setRoute={setRoute} t={tStrings}/>

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Home variant"/>
        <window.TweakRadio
          label="Layout"
          value={t_.homeVariant}
          options={[
            { value: "editorial", label: "Editorial" },
            { value: "cinematic", label: "Cinematic" },
            { value: "almanac",   label: "Almanac"   },
          ]}
          onChange={(v) => setTweak("homeVariant", v)}
        />

        <window.TweakSection label="Theme"/>
        <window.TweakColor
          label="Palette"
          value={t_.palette}
          options={PALETTES}
          onChange={(v) => setTweak("palette", v)}
        />
        <window.TweakToggle
          label="Dark mode"
          value={!!t_.dark}
          onChange={(v) => setTweak("dark", v)}
        />

        <window.TweakSection label="Typography"/>
        <window.TweakSelect
          label="Font pairing"
          value={t_.fontPairing}
          options={Object.entries(FONT_PAIRINGS).map(([v, c]) => ({ value: v, label: c.label }))}
          onChange={(v) => setTweak("fontPairing", v)}
        />

        <window.TweakSection label="Quick links"/>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {["home","calendar","events","gallery","donate","about"].map(r => (
            <window.TweakButton key={r} label={r[0].toUpperCase() + r.slice(1)}
              secondary={route !== r}
              onClick={() => setRoute(r)}/>
          ))}
        </div>
      </window.TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);

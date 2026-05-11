import React, { useState, useEffect, useCallback, useMemo } from "react";
const SkemaBygger = React.lazy(() => import("./SkemaBygger"));
const PERIODS = [
  "Sensommer",
  "Efterår 1",
  "Efterår 2",
];

const PERIOD_GROUPS = [
  { title: "Efterår", items: ["Sensommer", "Efterår 1", "Efterår 2"] },
];

const WEEKDAYS = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"];
const TIME_SLOTS = [
  { label: "9:30", start: 0, end: 1 },
  { label: "12:15", start: 1, end: 2 },
  { label: "16:00", start: 2, end: 3 },
];

const BLOCKS = [
  {
    id: "gul",
    day: "Mandag",
    label: "Valgfag",
    bg: "#f8cc66",
    rowStart: 2,
    rowEnd: 5,
    col: 1,
  },
  {
    id: "blaa",
    day: "Tirsdag",
    label: "Valgfag",
    bg: "#80a5d6",
    rowStart: 2,
    rowEnd: 4,
    col: 2,
  },
  {
    id: "orange-ons",
    day: "Onsdag",
    label: "Hovedfag Onsdag",
    bg: "#efa252",
    rowStart: 2,
    rowEnd: 6,
    col: 3,
  },
  {
    id: "orange-tors",
    day: "Torsdag",
    label: "Hovedfag Torsdag",
    bg: "#efa252",
    rowStart: 2,
    rowEnd: 4,
    col: 4,
  },
  {
    id: "roed",
    day: "Fredag",
    label: "Valgfag",
    bg: "#dc6c53",
    rowStart: 2,
    rowEnd: 6,
    col: 5,
  },
];
const BLOCK_MAP = Object.fromEntries(BLOCKS.map(b => [b.id, b]));
const SUBJECT_DEFINITIONS = [
 
  // SENSOMMER
  {
    id: "skibums-sensommer",
    title: "Skibums ",
    block: "orange",
    periods: ["Sensommer", "Efterår 1", "Efterår 2"],
  },

  {
    id: "band-sensommer",
    title: "Band - sammenspil",
    block: "gul",
    periods: ["Sensommer"],
  },
  {
    id: "biavl-sensommer",
    title: "Biavl",
    block: "gul",
    periods: ["Sensommer"],
  },
  {
    id: "havebrug-sensommer",
    title: "Havebrug",
    block: "gul",
    periods: ["Sensommer"],
  },
  {
    id: "genbrugsdesign-sensommer",
    title: "Genbrugsdesign",
    block: "gul",
    periods: ["Sensommer"],
  },
  {
    id: "havkajak-sensommer",
    title: "Havkajak",
    block: "gul",
    periods: ["Sensommer"],
  },

  {
    id: "verdensdans-sensommer",
    title: "Verdensdans",
    block: "roed",
    periods: ["Sensommer"],
  },
  {
    id: "mad-over-ild-sensommer",
    title: "Mad over ild",
    block: "roed",
    periods: ["Sensommer"],
  },
  {
    id: "dansk-kultur-sensommer",
    title: "Dansk sprog og kultur",
    block: "roed",
    periods: ["Sensommer"],
  },
  {
    id: "vandring-filosofi-sensommer",
    title: "Vandring og filosofi",
    block: "roed",
    periods: ["Sensommer"],
  },
  {
    id: "film-foto-sensommer",
    title: "Film og foto",
    block: "roed",
    periods: ["Sensommer"],
  },

  {
    id: "multisport-sensommer",
    title: "Multisport",
    block: "blaa",
    periods: ["Sensommer"],
  },
  {
    id: "traehaandvaerk-sensommer",
    title: "Træhåndværk",
    block: "blaa",
    periods: ["Sensommer"],
  },
  {
    id: "eksistentiel-sensommer",
    title: "Eksistentiel vejledning",
    block: "blaa",
    periods: ["Sensommer"],
  },
  {
    id: "sang-stemme-sensommer",
    title: "Sang og stemme",
    block: "blaa",
    periods: ["Sensommer"],
  },
  {
    id: "faellesskabelse-sensommer",
    title: "Fællesskabelse",
    block: "blaa",
    periods: ["Sensommer"],
  },

  // EFTERÅR 1

  {
    id: "hej-lege-efteraar1",
    title: "Hej, skal vi lege",
    block: "gul",
    periods: ["Efterår 1", "Efterår 2"],
  },
  {
    id: "dans-teater-efteraar1",
    title: "Dans og teater",
    block: "gul",
    periods: ["Efterår 1", "Efterår 2"],
  },
  {
    id: "keramik-valgfag-efteraar1",
    title: "Keramik",
    block: "gul",
    periods: ["Efterår 1", "Efterår 2"],
  },
  {
    id: "elektronisk-musik-efteraar1",
    title: "Elektronisk musik",
    block: "gul",
    periods: ["Efterår 1", "Efterår 2"],
  },
  {
    id: "kks-efteraar1",
    title: "Køn, krop og seksualitet",
    block: "gul",
    periods: ["Efterår 1", "Efterår 2"],
  },

  {
    id: "chocolatier-efteraar1",
    title: "Chocolatier",
    block: "roed",
    periods: ["Efterår 1"],
  },
  {
    id: "projektledelse-efteraar1",
    title: "Projektledelse (Venneweekend)",
    block: "roed",
    periods: ["Efterår 1"],
  },
  {
    id: "salsa-efteraar1",
    title: "Salsa",
    block: "roed",
    periods: ["Efterår 1"],
  },
  {
    id: "naturen-fjaeset-efteraar1",
    title: "Naturen lige i fjæset",
    block: "roed",
    periods: ["Efterår 1"],
  },
  {
    id: "sydafrika-efteraar1",
    title: "Sydafrika (forberedelse)",
    block: "roed",
    periods: ["Efterår 1"],
  },

  {
    id: "yoga-mindfulness-efteraar1",
    title: "Yoga og mindfulness",
    block: "blaa",
    periods: ["Efterår 1"],
  },
  {
    id: "sang-stemme-efteraar1",
    title: "Sang og stemme",
    block: "blaa",
    periods: ["Efterår 1"],
  },
  {
    id: "svampedyrkning-efteraar1",
    title: "Svampedyrkning",
    block: "blaa",
    periods: ["Efterår 1"],
  },
  {
    id: "bouldering-valgfag-efteraar1",
    title: "Bouldering",
    block: "blaa",
    periods: ["Efterår 1"],
  },
  {
    id: "faellesskabelse-efteraar1",
    title: "Fællesskabelse",
    block: "blaa",
    periods: ["Efterår 1"],
  },

  // EFTERÅR 2
  {
    id: "skibums-tysk-efteraar2",
    title: "Skibums (tysk)",
    block: "roed",
    periods: ["Efterår 2"],
  },
 

  {
    id: "yoga-mindfulness-efteraar2",
    title: "Yoga og mindfulness",
    block: "blaa",
    periods: ["Efterår 2"],
  },
  {
    id: "studievejledning-efteraar2",
    title: "Studievejledning",
    block: "blaa",
    periods: ["Efterår 2"],
  },
  {
    id: "goer-det-selv-efteraar2",
    title: "Gør det selv, tør det selv",
    block: "blaa",
    periods: ["Efterår 2"],
  },
  {
    id: "bouldering-valgfag-efteraar2",
    title: "Bouldering",
    block: "blaa",
    periods: ["Efterår 2"],
  },
  {
    id: "croquis-efteraar2",
    title: "Croquis",
    block: "blaa",
    periods: ["Efterår 2"],
  },
];

const KEEP_RULES = [
    {
    from: "Efterår 1",
    to: "Efterår 2",
    blocks: ["gul"],
  },
  {
    from: "Efterår 2",
    to: "Efterår 1",
    blocks: ["gul"],
  },
];
const BlockItem = React.memo(function BlockItem({
  block,
  subj,
  isMobile,
}) {
  const startIdx = block.rowStart - 2;
  const endIdx = block.rowEnd - 2;

  const column = isMobile
    ? `${startIdx + 2} / ${endIdx + 2}`
    : `${block.col + 1} / ${block.col + 2}`;

  const row = isMobile
    ? `${WEEKDAYS.indexOf(block.day) + 2} / ${
        WEEKDAYS.indexOf(block.day) + 3
      }`
    : `${block.rowStart} / ${block.rowEnd}`;

  return (
    <div
      style={{
        gridColumn: column,
        gridRow: row,
        display: "flex",
        alignItems: "center",
        justifyContent: isMobile ? "flex-start" : "center",
        borderRadius: 8,
        padding: isMobile ? "8px 10px" : 8,
        background: block.bg,
        textAlign: isMobile ? "left" : "center",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {subj ? (
        <div style={{ fontWeight: 700 }}>{subj.title}</div>
      ) : (
        <div style={{ color: "#666" }}>{block.label}</div>
      )}
    </div>
  );
});
export default function SkemaBygger({ initialPeriod = "Sensommer" }) {
  const [period, setPeriod] = useState(initialPeriod);
  const [timetable, setTimetable] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

 useEffect(() => {
  let timeout;

  const handleResize = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setIsMobile(window.innerWidth < 768);
    }, 150); // debounce
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

const availableSubjects = useMemo(() => {
  return SUBJECT_DEFINITIONS
    .filter((s) => s.periods.includes(period))
    .sort(
      (a, b) =>
        ["orange", "gul", "blaa", "roed"].indexOf(a.block) -
        ["orange", "gul", "blaa", "roed"].indexOf(b.block)
    );
}, [period]);
const groupedSubjects = useMemo(() => {
  return {
    orange: availableSubjects.filter((s) => s.block === "orange"),
    gul: availableSubjects.filter((s) => s.block === "gul"),
    blaa: availableSubjects.filter((s) => s.block === "blaa"),
    roed: availableSubjects.filter((s) => s.block === "roed"),
  };
}, [availableSubjects]);
useEffect(() => {
  const skibums = SUBJECT_DEFINITIONS.find(
    (s) =>
      s.id === "skibums-sensommer" &&
      s.periods.includes(period)
  );
  const tysk = SUBJECT_DEFINITIONS.find(
    (s) =>
      s.id === "skibums-tysk-efteraar2" &&
      s.periods.includes(period)
  );
  setTimetable((prev) => ({
    ...prev,
    "orange-ons": skibums,
    "orange-tors": skibums,
    ...(tysk ? { roed: tysk } : {}),
  }));
}, [period]);
  
  const placeSubject = useCallback((subj) => {
  setTimetable((prev) => {
    const newTable = { ...prev };

if (subj.block === "orange") return prev;
    Object.keys(newTable).forEach((k) => {
        if (k.startsWith("orange")) delete newTable[k];
      });
      newTable["orange-ons"] = subj;
      newTable["orange-tors"] = subj;
    } else {
      Object.keys(newTable).forEach((k) => {
        if (k.startsWith(subj.block)) delete newTable[k];
      });
      newTable[subj.block] = subj;
    }

    return newTable;
  });
}, []);

  function handlePeriodChange(next) {
    let kept = {};
    const rule = KEEP_RULES.find((r) => r.from === period && r.to === next);
    if (rule) {
      Object.entries(timetable).forEach(([blockKey, subj]) => {
        if (rule.keepSubjectIds && rule.keepSubjectIds.includes(subj.id)) {
          kept[blockKey] = subj;
        } else if (rule.blocks && rule.blocks.includes(subj.block)) {
          kept[blockKey] = subj;
        }
      });
    }
    setTimetable(kept);
    setPeriod(next);
  }

 function clearTimetable() {
  const skibums = SUBJECT_DEFINITIONS.find(
    (s) => s.id === "skibums-sensommer"
  );

  const tysk = SUBJECT_DEFINITIONS.find(
    (s) =>
      s.id === "skibums-tysk-efteraar2" &&
      s.periods.includes(period)
  );

  setTimetable({
    "orange-ons": skibums,
    "orange-tors": skibums,
    ...(tysk ? { roed: tysk } : {}),
  });
}

  const gridStyle = useMemo(() => {
  return isMobile
    ? {
        display: "grid",
        gridTemplateColumns: "60px repeat(3, 1fr)",
        gridTemplateRows: "40px repeat(5, auto)",
        gap: 6,
        position: "relative",
      }
    : {
        display: "grid",
        gridTemplateColumns: "60px repeat(5, 1fr)",
        gridTemplateRows: "40px 120px 120px 120px 40px",
        gap: 6,
        position: "relative",
      };
}, [isMobile]);


const paletteItemStyle = useCallback((s) => ({
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ddd",
  cursor: "pointer",
  background:
    s.block === "orange"
      ? "#FDBA74"
      : BLOCK_MAP[s.block]?.bg || "#eee",
}), []);

  return (
    <div
      style={{
        padding: 16,
        minHeight: "70vh", // mindre høj
        fontFamily: "Arial, sans-serif",
        background: "transparent",
      }}
    >
      {/* Toplinje med titel og ryd-knap */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {/* Titel */}
      </div>

      {/* Perioder + knapper */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          marginBottom: 12,
          gap: 16,
        }}
      >
        {/* Venstre side: perioder */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {PERIOD_GROUPS.map((group) => (
            <div
              key={group.title}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: 4,
                  background: "#EA8115",
                  color: "#fff",
                  padding: "6px 10px",
                  borderRadius: 6,
                  textAlign: "center",
                }}
              >
                {group.title}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {group.items.map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePeriodChange(p)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 6,
                      border: "none",
                      background: p === period ? "#63c58e" : "#e5e7eb",
                      color: p === period ? "#fff" : "#111",
                      cursor: "pointer",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Højre side: ryd/gem knapper */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={clearTimetable}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              background: "#ef4444",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Ryd skema
          </button>

        </div>
      </div>

      {/* Skema-container */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 20,
        }}
      >
        {/* Palette */}
        <div
          style={{
            maxHeight: isMobile ? 120 : 400,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            paddingRight: 4,
          }}
        >
{[
  { key: "gul", title: "Mandag" },
  { key: "blaa", title: "Tirsdag" },
  { key: "roed", title: "Fredag" },
].map((group) => {
  const items = groupedSubjects[group.key];

  if (!items.length) return null;

  return (
    <div key={group.key}>
      {/* Group title */}
      <div
        style={{
          fontWeight: 700,
          marginTop: 10,
          marginBottom: 6,
        marginBottom: 12,
      borderTop: "1px solid #ddd",
      paddingTop: 6,
        }}
      >
        {group.title}
      </div>

      {/* Items */}
      {items.map((s) => (
        <div
          key={s.id}
          onClick={() => placeSubject(s)}
          style={paletteItemStyle(s)}
        >
          {s.title}
        </div>
      ))}
    </div>
  );
})}
          {availableSubjects.length === 0 && (
            <div style={{ color: "#666" }}>Ingen fag i denne periode</div>
          )}
        </div>

        {/* Skema */}
        <div
          id="skema-container"
          style={{
            overflowX: "auto",
            overflowY: "auto",
            maxHeight: 500,
            flex: 1,
            background: "#fff",
            padding: 12,
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        >
          <div style={gridStyle}>
            {/* Tomt hjørne */}
            <div
              style={{
                gridColumn: "1 / 2",
                gridRow: "1 / 2",
                background: "#fff",
                position: "sticky",
                top: 0,
                left: 0,
                zIndex: 2,
              }}
            />

            {/* Dage */}
            {WEEKDAYS.map((day, i) => (
              <div
                key={day}
                style={{
                  gridColumn: isMobile ? "1 / 2" : `${i + 2} / ${i + 3}`,
                  gridRow: isMobile ? `${i + 2} / ${i + 3}` : "1 / 2",
                  textAlign: "center",
                  fontWeight: 600,
                  position: "sticky",
                  top: isMobile ? undefined : 0,
                  left: isMobile ? 0 : undefined,
                  background: "#fff",
                  zIndex: 2,
                  borderBottom: isMobile ? "none" : "1px solid #ddd",
                  borderRight: isMobile ? "1px solid #ddd" : undefined,
                  padding: 4,
                }}
              >
                {day}
              </div>
            ))}

            {/* Tidsblokke */}
            {TIME_SLOTS.map((slot, idx) => (
              <div
                key={slot.label}
                style={{
                  gridColumn: isMobile ? `${idx + 2} / ${idx + 3}` : "1 / 2",
                  gridRow: isMobile ? "1 / 2" : `${idx + 2} / ${idx + 3}`,
                  position: "sticky",
                  top: isMobile ? 0 : undefined,
                  background: "#fff",
                  borderBottom: "1px solid #ddd",
                  zIndex: 1,
                  padding: 4,
                  display: "flex",
                  alignItems: isMobile
                    ? "flex-start"
                    : slot.label === "9:30"
                    ? "flex-start"
                    : "flex-end",
                  justifyContent: isMobile
                    ? slot.label === "9:30"
                      ? "flex-start" // 9:30 venstre
                      : "flex-end" // 12:15 og 16 højre
                    : "center",
                }}
              >
                {slot.label}
              </div>
            ))}

            {/* Fagblokke */}
{BLOCKS.map((block) => (
  <BlockItem
    key={block.id}
    block={block}
    subj={timetable[block.id]}
    isMobile={isMobile}
  />
))}
          </div>
        </div>
      </div>
    </div>
  );
}

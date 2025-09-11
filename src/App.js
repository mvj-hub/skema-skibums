import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
const PERIODS = [
  "Vinter",
  "Forår 1",
  "Forår 2",
  "Sensommer",
  "Efterår 1",
  "Efterår 2",
];

const PERIOD_GROUPS = [
  { title: "Forår", items: ["Vinter", "Forår 1", "Forår 2"] },
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

const SUBJECT_DEFINITIONS = [
  // VINTER
  {
    id: "hjemmelavet-vinter",
    title: "Hjemmelavet - Life Skills (hovedfag)",
    block: "orange",
    periods: ["Vinter"],
  },
  {
    id: "friluftsliv-vinter",
    title: "Friluftsliv (hovedfag)",
    block: "orange",
    periods: ["Vinter"],
  },
  {
    id: "keramik-vinter",
    title: "Keramik (hovedfag)",
    block: "orange",
    periods: ["Vinter"],
  },
  {
    id: "Mindful-vinter",
    title: "Mindful (hovedfag)",
    block: "orange",
    periods: ["Vinter"],
  },
  {
    id: "musik-hovedfag-vinter",
    title: "Musik (hovedfag)",
    block: "orange",
    periods: ["Vinter"],
  },
  {
    id: "bouldering-vinter",
    title: "Bouldering (hovedfag)",
    block: "orange",
    periods: ["Vinter"],
  },

  {
    id: "band-vinter",
    title: "Band - sammenspil",
    block: "gul",
    periods: ["Vinter"],
  },
  {
    id: "mad-med-mod-vinter",
    title: "Mad med mod",
    block: "gul",
    periods: ["Vinter"],
  },
  {
    id: "permakultur-vinter",
    title: "Permakultur design",
    block: "gul",
    periods: ["Vinter"],
  },
  {
    id: "kks-vinter",
    title: "Køn, krop og seksualitet",
    block: "gul",
    periods: ["Vinter"],
  },
  {
    id: "linoleumstryk-vinter",
    title: "Linoleumstryk",
    block: "gul",
    periods: ["Vinter"],
  },

  {
    id: "sommelier-vinter",
    title: "Sommelier",
    block: "roed",
    periods: ["Vinter"],
  },
  {
    id: "vandring-filosofi-vinter",
    title: "Vandring og filosofi",
    block: "roed",
    periods: ["Vinter"],
  },
  {
    id: "yoga-mindfulness-vinter",
    title: "Yoga og mindfulness",
    block: "roed",
    periods: ["Vinter"],
  },
  {
    id: "dansk-kultur-vinter",
    title: "Dansk sprog og kultur",
    block: "roed",
    periods: ["Vinter"],
  },
  { id: "salsa-vinter", title: "Salsa", block: "roed", periods: ["Vinter"] },

  {
    id: "studievejledning-vinter",
    title: "Studievejledning",
    block: "blaa",
    periods: ["Vinter"],
  },
  {
    id: "chocolatier-vinter",
    title: "Chocolatier",
    block: "blaa",
    periods: ["Vinter"],
  },
  {
    id: "faellesskabelse-vinter",
    title: "Fællesskabelse",
    block: "blaa",
    periods: ["Vinter"],
  },
  {
    id: "bouldering-valgfag-vinter",
    title: "Bouldering",
    block: "blaa",
    periods: ["Vinter"],
  },
  {
    id: "sang-stemme-vinter",
    title: "Sang og stemme",
    block: "blaa",
    periods: ["Vinter"],
  },

  // FORÅR 1
  {
    id: "hjemmelavet-foraar1",
    title: "Hjemmelavet - Vild mad (hovedfag)",
    block: "orange",
    periods: ["Forår 1", "Forår 2"],
  },
  {
    id: "friluftsliv-foraar1",
    title: "Friluftsliv (hovedfag)",
    block: "orange",
    periods: ["Forår 1", "Forår 2"],
  },
  {
    id: "bouldering-foraar1",
    title: "Bouldering (hovedfag)",
    block: "orange",
    periods: ["Forår 1", "Forår 2"],
  },
  {
    id: "musik-hovedfag-foraar1",
    title: "Musik (hovedfag)",
    block: "orange",
    periods: ["Forår 1", "Forår 2"],
  },
  {
    id: "festival-projektledelse-foraar1",
    title: "Festival & projektledelse (hovedfag)",
    block: "orange",
    periods: ["Forår 1", "Forår 2"],
  },

  {
    id: "elektronisk-musik-foraar1",
    title: "Elektronisk musik",
    block: "gul",
    periods: ["Forår 1", "Forår 2"],
  },
  {
    id: "havkajak-foraar1",
    title: "Havkajak",
    block: "gul",
    periods: ["Forår 1", "Forår 2"],
  },
  {
    id: "kks-foraar1",
    title: "Køn, krop og seksualitet",
    block: "gul",
    periods: ["Forår 1", "Forår 2"],
  },
  {
    id: "verdensdans-foraar1",
    title: "Verdensdans",
    block: "gul",
    periods: ["Forår 1", "Forår 2"],
  },
  {
    id: "keramik-foraar1",
    title: "Keramik",
    block: "gul",
    periods: ["Forår 1", "Forår 2"],
  },

  {
    id: "croquis-foraar1",
    title: "Croquis",
    block: "roed",
    periods: ["Forår 1"],
  },
  {
    id: "teater-foraar1",
    title: "Teater",
    block: "roed",
    periods: ["Forår 1"],
  },
  {
    id: "oelbrygning-foraar1",
    title: "Ølbrygning",
    block: "roed",
    periods: ["Forår 1"],
  },
  {
    id: "mad-over-ild-foraar1",
    title: "Mad over ild",
    block: "roed",
    periods: ["Forår 1"],
  },
  {
    id: "yoga-mindfulness-foraar1",
    title: "Yoga og mindfulness",
    block: "roed",
    periods: ["Forår 1"],
  },

  {
    id: "traehaandvaerk-foraar1",
    title: "Træhåndværk",
    block: "blaa",
    periods: ["Forår 1"],
  },
  {
    id: "bouldering-valgfag-foraar1",
    title: "Bouldering",
    block: "blaa",
    periods: ["Forår 1"],
  },
  {
    id: "skole-demokrati-foraar1",
    title: "Skoledemokratiet",
    block: "blaa",
    periods: ["Forår 1"],
  },
  {
    id: "kor-foraar1",
    title: "Kor (sang for alle)",
    block: "blaa",
    periods: ["Forår 1"],
  },
  {
    id: "kunstfag-foraar1",
    title: "Kunstfag",
    block: "blaa",
    periods: ["Forår 1"],
  },

  // FORÅR 2
  { id: "salsa-foraar2", title: "Salsa", block: "roed", periods: ["Forår 2"] },
  {
    id: "havkajak-foraar2",
    title: "Havkajak",
    block: "roed",
    periods: ["Forår 2"],
  },
  {
    id: "havebrug-foraar2",
    title: "Havebrug",
    block: "roed",
    periods: ["Forår 2"],
  },
  {
    id: "naturkraft-foraar2",
    title: "Naturkraft",
    block: "roed",
    periods: ["Forår 2"],
  },
  {
    id: "vandring-filosofi-foraar2",
    title: "Vandring og filosofi",
    block: "roed",
    periods: ["Forår 2"],
  },

  { id: "biavl-foraar2", title: "Biavl", block: "blaa", periods: ["Forår 2"] },
  {
    id: "craftmanship-foraar2",
    title: "Craftmanship",
    block: "blaa",
    periods: ["Forår 2"],
  },
  {
    id: "tegning-foraar2",
    title: "Tegning",
    block: "blaa",
    periods: ["Forår 2"],
  },
  {
    id: "eksistentiel-foraar2",
    title: "Eksistentiel vejledning",
    block: "blaa",
    periods: ["Forår 2"],
  },
  {
    id: "hej-lege-foraar2",
    title: "Hej! Skal vi lege?",
    block: "blaa",
    periods: ["Forår 2"],
  },
  {
    id: "faellesskabelse-foraar2",
    title: "Fællesskabelse",
    block: "blaa",
    periods: ["Forår 2"],
  },

  // SENSOMMER
  {
    id: "hjemmelavet-sensommer",
    title: "Hjemmelavet - Vild mad (hovedfag)",
    block: "orange",
    periods: ["Sensommer"],
  },
  {
    id: "friluftsliv-sensommer",
    title: "Friluftsliv (hovedfag)",
    block: "orange",
    periods: ["Sensommer"],
  },
  {
    id: "keramik-sensommer",
    title: "Keramik (hovedfag)",
    block: "orange",
    periods: ["Sensommer"],
  },
  {
    id: "musik-hovedfag-sensommer",
    title: "Musik (hovedfag)",
    block: "orange",
    periods: ["Sensommer"],
  },
  {
    id: "bouldering-sensommer",
    title: "Bouldering (hovedfag)",
    block: "orange",
    periods: ["Sensommer"],
  },
  {
    id: "skibums-sensommer",
    title: "Skibums (hovedfag)",
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
    id: "hjemmelavet-efteraar1",
    title: "Hjemmelavet - Life Skills (hovedfag)",
    block: "orange",
    periods: ["Efterår 1", "Efterår 2"],
  },
  {
    id: "friluftsliv-efteraar1",
    title: "Friluftsliv (hovedfag)",
    block: "orange",
    periods: ["Efterår 1", "Efterår 2"],
  },
  {
    id: "keramik-hovedfag-efteraar1",
    title: "Keramik (hovedfag)",
    block: "orange",
    periods: ["Efterår 1", "Efterår 2"],
  },
  {
    id: "musik-hovedfag-efteraar1",
    title: "Musik (hovedfag)",
    block: "orange",
    periods: ["Efterår 1", "Efterår 2"],
  },
  {
    id: "bouldering-efteraar1",
    title: "Bouldering (hovedfag)",
    block: "orange",
    periods: ["Efterår 1", "Efterår 2"],
  },
  {
    id: "skibums-efteraar1",
    title: "Skibums (hovedfag)",
    block: "orange",
    periods: ["Efterår 1", "Efterår 2"],
  },

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
    id: "dansefag-efteraar2",
    title: "Dansefag",
    block: "roed",
    periods: ["Efterår 2"],
  },
  {
    id: "linoleumstryk-efteraar2",
    title: "Linoleumstryk",
    block: "roed",
    periods: ["Efterår 2"],
  },
  {
    id: "oelbrygning-efteraar2",
    title: "Ølbrygning",
    block: "roed",
    periods: ["Efterår 2"],
  },
  {
    id: "mad-over-ild-efteraar2",
    title: "Mad over ild",
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
  { from: "Forår 1", to: "Forår 2", blocks: ["gul", "orange"] },
  { from: "Forår 2", to: "Forår 1", blocks: ["gul", "orange"] },
  { from: "Efterår 1", to: "Efterår 2", blocks: ["gul", "orange"] },
  { from: "Efterår 2", to: "Efterår 1", blocks: ["gul", "orange"] },
  {
    from: "Sensommer",
    to: "Efterår 1",
    blocks: [],
    keepSubjectIds: ["skibums-sensommer"],
  },
  {
    from: "Sensommer",
    to: "Efterår 2",
    blocks: [],
    keepSubjectIds: ["skibums-sensommer"],
  },
  {
    from: "Efterår 1",
    to: "Sensommer",
    blocks: [],
    keepSubjectIds: ["skibums-sensommer"],
  },
  {
    from: "Efterår 2",
    to: "Sensommer",
    blocks: [],
    keepSubjectIds: ["skibums-sensommer"],
  },
  {
    from: "Efterår 1",
    to: "Efterår 2",
    blocks: [],
    keepSubjectIds: ["skibums-sensommer"],
  },
];

export default function SkemaBygger({ initialPeriod = "Vinter" }) {
  const [period, setPeriod] = useState(initialPeriod);
  const [timetable, setTimetable] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const availableSubjects = SUBJECT_DEFINITIONS.filter((s) =>
    s.periods.includes(period)
  ).sort(
    (a, b) =>
      ["orange", "gul", "blaa", "roed"].indexOf(a.block) -
      ["orange", "gul", "blaa", "roed"].indexOf(b.block)
  );

  function placeSubject(subj) {
    const newTable = { ...timetable };
    if (subj.block === "orange") {
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
    setTimetable(newTable);
  }

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
    setTimetable({});
  }

  const gridStyle = isMobile
    ? {
        display: "grid",
        gridTemplateColumns: "60px repeat(3, 1fr)", // mindre bredde
        gridTemplateRows: "40px repeat(5, auto)",
        gap: 6, // mindre mellemrum
        position: "relative",
      }
    : {
        display: "grid",
        gridTemplateColumns: "60px repeat(5, 1fr)", // tid-kolonne smallere
        gridTemplateRows: "40px 120px 120px 120px 40px",
        gap: 6, // mindre mellemrum
        position: "relative",
      };

  const paletteItemStyle = (s) => ({
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
    cursor: "pointer",
    background:
      s.block === "orange"
        ? "#FDBA74"
        : BLOCKS.find((b) => b.id === s.block)?.bg || "#eee",
  });
  function downloadImage() {
    // Find elementet, vi vil tage billede af
    const skemaElement = document.getElementById("skema-container");
    if (!skemaElement) return;

    html2canvas(skemaElement).then((canvas) => {
      const link = document.createElement("a");
      link.download = `skema-${period}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  }
  return (
    <div
      style={{
        padding: 16,
        minHeight: "70vh", // mindre høj
        fontFamily: "Arial, sans-serif",
        background: "#bedbd5",
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
          <button
            onClick={downloadImage}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              background: "#3b82f6",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Gem billede
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
          {availableSubjects.map((s) => (
            <div
              key={s.id}
              onClick={() => placeSubject(s)}
              style={paletteItemStyle(s)}
            >
              {s.title}
            </div>
          ))}
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
            {BLOCKS.map((block) => {
              const subj = timetable[block.id];

              // Beregn kolonner (tid) for mobil korrekt
              const startIdx = block.rowStart - 2; // header offset
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
                  key={block.id}
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

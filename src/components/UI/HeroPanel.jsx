import { MONTHS, HERO_QUOTES } from "../../data/constants.js";

function HeroPanel({ theme, year, month }) {
  const quoteIdx = (year * 12 + month) % HERO_QUOTES.length;
  const quote = HERO_QUOTES[quoteIdx];
  const now = new Date();
  const isCurrent = now.getFullYear() === year && now.getMonth() === month;

  return (
    <div
      style={{
        background: theme.heroGrad,
        borderRadius: "var(--radius)",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 240,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.18)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -30,
          left: -30,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.09)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.38)",
            marginBottom: "0.5rem",
          }}
        >
          {isCurrent ? "✦ Current Month" : MONTHS[month]}
        </div>
        <h1
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: "clamp(2.2rem,5vw,3.4rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            color: "rgba(0,0,0,0.74)",
            letterSpacing: "-0.02em",
          }}
        >
          {MONTHS[month]}
          <span style={{ fontStyle: "italic", fontWeight: 400 }}>
            {" '"}
            {String(year).slice(2)}
          </span>
        </h1>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontFamily: "Caveat",
            fontSize: 17,
            lineHeight: 1.5,
            color: "rgba(0,0,0,0.62)",
            marginBottom: 4,
          }}
        >
          "{quote.text}"
        </div>
        <div
          style={{
            fontSize: 11,
            color: "rgba(0,0,0,0.38)",
            letterSpacing: "0.05em",
          }}
        >
          {quote.author}
        </div>
      </div>
    </div>
  );
}

export default HeroPanel;

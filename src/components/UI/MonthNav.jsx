import { MONTHS } from "../../data/constants.js";

function MonthNav({ month, year, onPrev, onNext, onToday }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        borderRadius: "var(--radius)",
        padding: "1.1rem 1.25rem",
        border: "0.5px solid var(--border)",
        boxShadow: "var(--shadow)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.85rem",
        }}
      >
        <button
          onClick={onPrev}
          className="nav-btn"
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "var(--bg2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            color: "var(--text2)",
          }}
        >
          ‹
        </button>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: 17,
              fontWeight: 600,
              color: "var(--text)",
            }}
          >
            {MONTHS[month]}
          </div>
          <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 1 }}>
            {year}
          </div>
        </div>
        <button
          onClick={onNext}
          className="nav-btn"
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "var(--bg2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            color: "var(--text2)",
          }}
        >
          ›
        </button>
      </div>
      <button
        onClick={onToday}
        className="nav-btn"
        style={{
          width: "100%",
          padding: "7px",
          borderRadius: 8,
          fontSize: 12.5,
          fontWeight: 500,
          background: "var(--bg2)",
          color: "var(--text2)",
          border: "0.5px solid var(--border2)",
        }}
      >
        Today
      </button>
    </div>
  );
}

export default MonthNav;

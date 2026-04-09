import { parseKey } from "../../utils/dateUtils.js";
import { MONTHS } from "../../data/constants.js";

function RangeBadge({ selectedRange, onClear }) {
  if (!selectedRange.start) return null;
  const s = parseKey(selectedRange.start);
  const e = selectedRange.end ? parseKey(selectedRange.end) : null;
  return (
    <div
      style={{
        background: "var(--surface)",
        borderRadius: 12,
        padding: "0.85rem 1rem",
        border: "0.5px solid var(--border2)",
        boxShadow: "var(--shadow)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 10.5,
            color: "var(--text3)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 3,
            fontWeight: 500,
          }}
        >
          Selected Range
        </div>
        <div
          style={{ fontFamily: "Caveat", fontSize: 16, color: "var(--text)" }}
        >
          {MONTHS[s.m].slice(0, 3)} {s.d}
          {e && ` → ${MONTHS[e.m].slice(0, 3)} ${e.d}`}
        </div>
      </div>
      <button
        onClick={onClear}
        style={{
          fontSize: 12,
          color: "var(--text3)",
          padding: "4px 8px",
          borderRadius: 6,
          background: "var(--bg2)",
        }}
      >
        ✕ clear
      </button>
    </div>
  );
}

export default RangeBadge;

import { useState } from "react";

function NotesPanel({ notes, setNotes, selectedRange }) {
  const [tab, setTab] = useState("month");
  const rangeKey =
    selectedRange.start && selectedRange.end
      ? `${selectedRange.start}_${selectedRange.end}`
      : null;
  const hasRange = !!(selectedRange.start && selectedRange.end);

  const monthNote = notes.month || "";
  const rangeNote = rangeKey ? notes.range?.[rangeKey] || "" : "";

  const updateMonthNote = (v) => setNotes((n) => ({ ...n, month: v }));
  const updateRangeNote = (v) => {
    if (!rangeKey) return;
    setNotes((n) => ({ ...n, range: { ...(n.range || {}), [rangeKey]: v } }));
  };

  return (
    <div
      style={{
        background: "var(--surface)",
        borderRadius: "var(--radius)",
        padding: "1.25rem",
        border: "0.5px solid var(--border)",
        boxShadow: "var(--shadow)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 3,
          marginBottom: "1rem",
          background: "var(--bg2)",
          borderRadius: 10,
          padding: 3,
        }}
      >
        {["month", hasRange ? "range" : null].filter(Boolean).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "6px 8px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
              background: tab === t ? "var(--surface)" : "transparent",
              color: tab === t ? "var(--text)" : "var(--text3)",
              transition: "all 0.15s",
              boxShadow: tab === t ? "var(--shadow)" : "none",
            }}
          >
            {t === "month" ? "📝 Month Notes" : "📌 Range Notes"}
          </button>
        ))}
      </div>

      <p
        style={{
          fontSize: 10.5,
          color: "var(--text3)",
          marginBottom: 8,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        {tab === "month"
          ? "General notes for this month"
          : "Notes for selected range"}
      </p>
      <textarea
        value={tab === "month" ? monthNote : rangeNote}
        onChange={(e) =>
          tab === "month"
            ? updateMonthNote(e.target.value)
            : updateRangeNote(e.target.value)
        }
        placeholder={
          tab === "month"
            ? "Goals, reminders, intentions..."
            : "Notes for this date range..."
        }
        style={{
          flex: 1,
          minHeight: 130,
          padding: "10px 12px",
          borderRadius: 10,
          fontSize: 13,
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          resize: "none",
          lineHeight: 1.65,
          outline: "none",
          color: "var(--text)",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
      />
    </div>
  );
}

export default NotesPanel;

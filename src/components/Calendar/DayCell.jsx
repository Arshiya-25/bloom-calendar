function DayCell({ day, dateKey, events = [], onClick, isToday, isSelected }) {
  const visibleEvents = events.slice(0, 2);

  return (
    <div
      onClick={() => onClick(dateKey)}
      style={{
        height: 110,
        borderRadius: 16,
        padding: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "var(--bg)",
        border: isSelected
          ? "1px solid var(--accent)"
          : "1px solid var(--border)",
        transition: "all 0.15s ease",
        overflow: "hidden",
      }}
    >
      {/* Date */}
      <div
        style={{
          fontSize: 12,
          color: isToday ? "var(--accent)" : "var(--text3)",
          fontWeight: 500,
        }}
      >
        {day}
      </div>

      {/* Events */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          overflow: "hidden",
        }}
      >
        {visibleEvents.map((ev) => (
          <div
            key={ev.id}
            style={{
              fontSize: 11,
              padding: "4px 8px",
              borderRadius: 8,
              background: ev.color || "var(--accent)",
              color: "#000",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {ev.title}
          </div>
        ))}

        {/* + more */}
        {events.length > 2 && (
          <div
            style={{
              fontSize: 10,
              color: "var(--text3)",
            }}
          >
            +{events.length - 2} more
          </div>
        )}
      </div>
    </div>
  );
}

export default DayCell;

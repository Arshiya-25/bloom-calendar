import { getCatById } from "../../utils/dateUtils.js";

function EventChip({ event, onClick }) {
  const cat = getCatById(event.category);

  return (
    <div
      className="chip"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      style={{
        fontSize: 10.5,
        padding: "3px 7px",
        borderRadius: 6,
        background: cat.color + "30",
        borderLeft: `2.5px solid ${cat.color}`,
        color: "var(--text2)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer",
        lineHeight: 1.4,
        fontWeight: 500,
        letterSpacing: "0.01em",
      }}
    >
      {event.important && <span style={{ marginRight: 3, fontSize: 8 }}>★</span>}
      {event.title}
    </div>
  );
}

export default EventChip;

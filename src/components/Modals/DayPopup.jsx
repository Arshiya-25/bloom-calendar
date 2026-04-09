import Modal from "./Modal.jsx";
import { parseKey, getCatById } from "../../utils/dateUtils.js";
import { DAYS_SHORT, MONTHS } from "../../data/constants.js";

function DayPopup({
  date,
  events,
  onClose,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) {
  const { y, m, d } = parseKey(date);
  const dayName = DAYS_SHORT[new Date(y, m, d).getDay()];
  const label = `${dayName}, ${MONTHS[m]} ${d}`;

  return (
    <Modal title={label} onClose={onClose} width={400}>
      {events.length === 0 ? (
        <p
          style={{
            color: "var(--text3)",
            fontSize: 13.5,
            marginBottom: "1.25rem",
            fontStyle: "italic",
          }}
        >
          No events scheduled for this day.
        </p>
      ) : (
        <div
          style={{
            marginBottom: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {events.map((ev) => {
            const cat = getCatById(ev.category);
            return (
              <div
                key={ev.id}
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  background: cat.color + "28",
                  borderLeft: `3px solid ${cat.color}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  transition: "background 0.15s",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 13.5,
                      color: "var(--text)",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    {ev.important && (
                      <span style={{ fontSize: 10, color: "var(--accent)" }}>★</span>
                    )}
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {ev.title}
                    </span>
                  </div>
                  {ev.time && (
                    <div
                      style={{
                        fontSize: 11.5,
                        marginTop: 3,
                        color: "var(--text3)",
                      }}
                    >
                      {ev.time}
                    </div>
                  )}
                  {ev.note && (
                    <div
                      style={{
                        fontSize: 11.5,
                        marginTop: 5,
                        color: "var(--text3)",
                        fontStyle: "italic",
                        lineHeight: 1.4,
                      }}
                    >
                      {ev.note}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    flexShrink: 0,
                    marginLeft: 10,
                  }}
                >
                  <button
                    onClick={() => onEditEvent(ev)}
                    style={{
                      fontSize: 11,
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: "var(--bg2)",
                      border: "0.5px solid var(--border)",
                      color: "var(--text2)",
                      fontWeight: 500,
                    }}
                  >
                    edit
                  </button>
                  <button
                    onClick={() => onDeleteEvent(ev.id)}
                    style={{
                      fontSize: 11,
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: "var(--bg2)",
                      border: "0.5px solid var(--border)",
                      color: "var(--text3)",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={() => onAddEvent(date)}
        className="nav-btn"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: 11,
          fontSize: 13,
          fontWeight: 500,
          background: "var(--bg2)",
          color: "var(--text2)",
          border: "1.5px dashed var(--border2)",
        }}
      >
        + Add Event
      </button>
    </Modal>
  );
}

export default DayPopup;

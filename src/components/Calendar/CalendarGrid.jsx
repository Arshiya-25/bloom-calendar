import { memo } from "react";
import { getDaysInMonth, getFirstDay, dateKey } from "../../utils/dateUtils.js";
import { DAYS_SHORT } from "../../data/constants.js";
import EventChip from "../UI/EventChip.jsx";

const MAX_VISIBLE_EVENTS = 2;

function CalendarGrid({
  year,
  month,
  events,
  selectedRange,
  onSelectDate,
  onDayPopup,
  today,
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);

  // build cells array: nulls for padding, then day numbers
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  // split into weeks
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  // range helpers
  const rangeStart = selectedRange.start;
  const rangeEnd = selectedRange.end;

  const checkRange = (d) => {
    if (!d || !rangeStart || !rangeEnd) return { inRange: false, isStart: false, isEnd: false };
    const k = dateKey(year, month, d);
    return {
      inRange: k > rangeStart && k < rangeEnd,
      isStart: k === rangeStart,
      isEnd: k === rangeEnd,
    };
  };

  return (
    <div>
      {/* day headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginBottom: 6,
        }}
      >
        {DAYS_SHORT.map((day, i) => (
          <div
            key={day}
            style={{
              textAlign: "center",
              fontSize: 10.5,
              fontWeight: 600,
              color: i === 0 || i === 6 ? "var(--accent)" : "var(--text3)",
              padding: "5px 0",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* grid rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {weeks.map((week, wi) => (
          <div
            key={wi}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 3,
            }}
          >
            {week.map((d, di) => {
              if (!d) {
                return <div key={di} className="day-empty" />;
              }

              const k = dateKey(year, month, d);
              const dayEvents = events[k] || [];
              const isToday = k === today;
              const isWeekend = di === 0 || di === 6;
              const { inRange, isStart, isEnd } = checkRange(d);
              const highlighted = isStart || isEnd;

              // figure out the background
              let bg = "var(--bg)";
              if (highlighted) bg = "var(--accent)";
              else if (inRange) bg = "rgba(var(--accent-rgb), 0.1)";

              // text color for the day number
              let numColor = "var(--text2)";
              if (highlighted) numColor = "#fff";
              else if (isToday) numColor = "var(--accent)";
              else if (isWeekend) numColor = "var(--accent)";

              return (
                <div
                  key={di}
                  className="day-cell"
                  onClick={() => onSelectDate(k)}
                  onDoubleClick={() => onDayPopup(k)}
                  style={{
                    padding: 6,
                    borderRadius: 10,
                    background: bg,
                    cursor: "pointer",
                    position: "relative",
                    border:
                      isToday && !highlighted
                        ? "1.5px solid var(--accent)"
                        : "1.5px solid transparent",
                  }}
                >
                  {/* day number row */}
                  <div
                    style={{
                      fontSize: 12.5,
                      fontWeight: isToday ? 700 : 400,
                      color: numColor,
                      marginBottom: 3,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <span>{d}</span>
                    {dayEvents.some((e) => e.important) && (
                      <span
                        style={{
                          fontSize: 7,
                          color: highlighted ? "rgba(255,255,255,0.8)" : "var(--accent)",
                        }}
                      >
                        ★
                      </span>
                    )}
                  </div>

                  {/* event chips */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {dayEvents.slice(0, MAX_VISIBLE_EVENTS).map((ev) => (
                      <EventChip
                        key={ev.id}
                        event={ev}
                        onClick={() => onDayPopup(k)}
                      />
                    ))}
                    {dayEvents.length > MAX_VISIBLE_EVENTS && (
                      <div
                        style={{
                          fontSize: 9.5,
                          color: highlighted ? "rgba(255,255,255,0.7)" : "var(--text3)",
                          paddingLeft: 3,
                          fontStyle: "italic",
                        }}
                      >
                        +{dayEvents.length - MAX_VISIBLE_EVENTS} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p
        style={{
          fontSize: 11,
          color: "var(--text3)",
          marginTop: 10,
          fontStyle: "italic",
          textAlign: "center",
          letterSpacing: "0.02em",
        }}
      >
        Click to select range · Double-click to view/add events
      </p>
    </div>
  );
}

export default memo(CalendarGrid);

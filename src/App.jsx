import { useState, useEffect, useCallback, useMemo } from "react";

import { THEMES, MONTHS } from "./data/constants.js";
import { dateKey, parseKey } from "./utils/dateUtils.js";

import ThemePicker from "./components/UI/ThemePicker.jsx";
import Legend from "./components/UI/Legend.jsx";
import HeroPanel from "./components/UI/HeroPanel.jsx";
import MonthNav from "./components/UI/MonthNav.jsx";
import RangeBadge from "./components/UI/RangeBadge.jsx";
import NotesPanel from "./components/UI/NotesPanel.jsx";

import CalendarGrid from "./components/Calendar/CalendarGrid.jsx";

import DayPopup from "./components/Modals/DayPopup.jsx";
import AddEventModal from "./components/Modals/AddEventModal.jsx";

function App() {
  const now = new Date();
  const todayKey = dateKey(now.getFullYear(), now.getMonth(), now.getDate());

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [darkMode, setDarkMode] = useState(true);
  const [themeIdx, setThemeIdx] = useState(0);
  const [events, setEvents] = useState({});
  const [notes, setNotes] = useState({});
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [addingEvent, setAddingEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [dayPopup, setDayPopup] = useState(null);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  const theme = THEMES[themeIdx];

  // apply CSS vars
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", darkMode ? "dark" : "light");
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent2", theme.accent2);
    root.style.setProperty("--accent-rgb", theme.accentRgb);
    root.style.setProperty("--hero-grad", theme.heroGrad);
  }, [darkMode, theme]);

  // load saved data on mount
  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem("bloom_events_v2");
      const savedNotes = localStorage.getItem("bloom_notes_v2");
      if (savedEvents) setEvents(JSON.parse(savedEvents));
      if (savedNotes) setNotes(JSON.parse(savedNotes));
    } catch (err) {
      console.warn("Failed to load saved data:", err);
    }
  }, []);

  // persist events
  useEffect(() => {
    try { localStorage.setItem("bloom_events_v2", JSON.stringify(events)); }
    catch {}
  }, [events]);

  // persist notes
  useEffect(() => {
    try { localStorage.setItem("bloom_notes_v2", JSON.stringify(notes)); }
    catch {}
  }, [notes]);

  // close dropdowns when clicking outside
  useEffect(() => {
    const closeDropdowns = () => {
      setShowThemePicker(false);
      setShowLegend(false);
    };
    window.addEventListener("click", closeDropdowns);
    return () => window.removeEventListener("click", closeDropdowns);
  }, []);

  const monthKey = `${year}-${month}`;
  const monthNotes = {
    month: notes[monthKey]?.month || "",
    range: notes[monthKey]?.range || {},
  };

  const setMonthNotes = (updater) =>
    setNotes((prev) => {
      const cur = prev[monthKey] || {};
      return {
        ...prev,
        [monthKey]: typeof updater === "function" ? updater(cur) : updater,
      };
    });

  const handleSelectDate = (k) => {
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: k, end: null });
    } else if (k < selectedRange.start) {
      setSelectedRange({ start: k, end: selectedRange.start });
    } else if (k === selectedRange.start) {
      setSelectedRange({ start: null, end: null });
    } else {
      setSelectedRange({ start: selectedRange.start, end: k });
    }
  };

  const saveEvent = useCallback((ev) => {
    if (!ev?.date) return;
    setEvents((prev) => {
      const list = prev[ev.date] || [];
      const idx = list.findIndex((e) => e.id === ev.id);
      if (idx >= 0) {
        const updated = [...list];
        updated[idx] = ev;
        return { ...prev, [ev.date]: updated };
      }
      return { ...prev, [ev.date]: [...list, ev] };
    });
  }, []);

  const deleteEvent = useCallback((date, id) => {
    setEvents((prev) => ({
      ...prev,
      [date]: (prev[date] || []).filter((e) => e.id !== id),
    }));
  }, []);

  const prevMonth = () => {
    if (month === 0) { setYear((y) => y - 1); setMonth(11); }
    else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setYear((y) => y + 1); setMonth(0); }
    else setMonth((m) => m + 1);
  };
  const goToday = () => {
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  };

  // memoize so DayPopup doesn't get a new array ref each render
  const dayPopupEvents = useMemo(
    () => (dayPopup ? events[dayPopup] || [] : []),
    [dayPopup, events]
  );

  // stats for the calendar header
  const monthEvCount = useMemo(() => {
    return Object.entries(events)
      .filter(([k]) => {
        const p = parseKey(k);
        return p.y === year && p.m === month;
      })
      .reduce((total, [, evs]) => total + evs.length, 0);
  }, [events, year, month]);

  const todayEvCount = (events[todayKey] || []).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        transition: "background 0.35s",
      }}
    >
      {/* top bar */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.75rem",
          height: 54,
          background: "var(--surface)",
          borderBottom: "0.5px solid var(--border)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 1px 10px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--text)",
            }}
          >
            bloom
          </span>
          <span
            style={{
              fontSize: 10,
              padding: "2px 8px",
              borderRadius: 20,
              background: "var(--bg3)",
              color: "var(--text3)",
              letterSpacing: "0.06em",
              fontWeight: 500,
            }}
          >
            calendar
          </span>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", gap: 8 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              setShowLegend((v) => !v);
              setShowThemePicker(false);
            }}
            style={{
              fontSize: 11.5,
              padding: "5px 12px",
              borderRadius: 8,
              background: "var(--bg2)",
              color: "var(--text2)",
              fontWeight: 500,
              border: "0.5px solid var(--border2)",
              transition: "background 0.15s",
            }}
          >
            legend
          </button>

          <button
            onClick={() => {
              setShowThemePicker((v) => !v);
              setShowLegend(false);
            }}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
              boxShadow: showThemePicker
                ? `0 0 0 3px var(--bg), 0 0 0 5px var(--accent)`
                : "0 2px 8px rgba(0,0,0,0.2)",
              transition: "box-shadow 0.2s",
            }}
            title="Themes"
          />

          <button
            onClick={() => setDarkMode((v) => !v)}
            style={{
              fontSize: 15,
              width: 34,
              height: 34,
              borderRadius: 9,
              background: "var(--bg2)",
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "0.5px solid var(--border2)",
              transition: "background 0.15s",
            }}
          >
            {darkMode ? "☀" : "☾"}
          </button>
        </div>
      </header>

      {showThemePicker && (
        <ThemePicker
          themes={THEMES}
          currentIdx={themeIdx}
          onSelect={setThemeIdx}
          onClose={() => setShowThemePicker(false)}
        />
      )}
      {showLegend && <Legend onClose={() => setShowLegend(false)} />}

      {/* main layout */}
      <main
        className="bloom-main"
        style={{
          flex: 1,
          padding: "1.5rem 1.75rem",
          maxWidth: 1360,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "1.25rem",
            alignItems: "stretch",
            minHeight: "calc(100vh - 54px - 3rem)",
          }}
        >
          {/* left sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <HeroPanel theme={theme} year={year} month={month} />
            <MonthNav
              month={month}
              year={year}
              onPrev={prevMonth}
              onNext={nextMonth}
              onToday={goToday}
            />
            <RangeBadge
              selectedRange={selectedRange}
              onClear={() => setSelectedRange({ start: null, end: null })}
            />
            <NotesPanel
              notes={monthNotes}
              setNotes={setMonthNotes}
              selectedRange={selectedRange}
            />
          </div>

          {/* calendar area */}
          <div
            style={{
              background: "var(--surface)",
              borderRadius: "var(--radius)",
              padding: "1.5rem 1.75rem",
              border: "0.5px solid var(--border)",
              boxShadow: "var(--shadow)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* calendar header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "Cormorant Garamond",
                  fontSize: 26,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--text)",
                }}
              >
                {MONTHS[month]}
                <span
                  style={{
                    color: "var(--text3)",
                    fontWeight: 400,
                    fontSize: 20,
                    marginLeft: 8,
                  }}
                >
                  {year}
                </span>
              </h2>
              <button
                className="accent-btn"
                onClick={() => {
                  const k = dateKey(now.getFullYear(), now.getMonth(), now.getDate());
                  setDayPopup(k);
                  setYear(now.getFullYear());
                  setMonth(now.getMonth());
                }}
                style={{
                  fontSize: 12.5,
                  padding: "7px 16px",
                  borderRadius: 9,
                  fontWeight: 500,
                  background: "var(--accent)",
                  color: "#fff",
                  letterSpacing: "0.01em",
                  boxShadow: "0 2px 12px rgba(var(--accent-rgb), 0.3)",
                }}
              >
                + Add Today
              </button>
            </div>

            {/* stats */}
            <div style={{ display: "flex", gap: 8, marginBottom: "1.25rem" }}>
              {[
                { label: "This month", val: monthEvCount },
                { label: "Today", val: todayEvCount },
              ].map(({ label, val }) => (
                <div
                  key={label}
                  style={{
                    background: "var(--bg2)",
                    borderRadius: 10,
                    padding: "8px 14px",
                    border: "0.5px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      fontFamily: "Cormorant Garamond",
                      color: "var(--accent)",
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: "var(--text3)",
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* the grid */}
            <div style={{ flex: 1 }}>
              <CalendarGrid
                year={year}
                month={month}
                events={events}
                selectedRange={selectedRange}
                onSelectDate={handleSelectDate}
                onDayPopup={setDayPopup}
                today={todayKey}
              />
            </div>
          </div>
        </div>
      </main>

      {/* modals */}
      {dayPopup && (
        <DayPopup
          date={dayPopup}
          events={dayPopupEvents}
          onClose={() => setDayPopup(null)}
          onAddEvent={(date) => {
            setDayPopup(null);
            setAddingEvent(date);
          }}
          onEditEvent={(ev) => {
            setDayPopup(null);
            setEditingEvent(ev);
          }}
          onDeleteEvent={(id) => deleteEvent(dayPopup, id)}
        />
      )}
      {addingEvent && (
        <AddEventModal
          date={addingEvent}
          onClose={() => setAddingEvent(null)}
          onSave={saveEvent}
        />
      )}
      {editingEvent && (
        <AddEventModal
          date={editingEvent.date}
          existing={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSave={saveEvent}
        />
      )}

      <style>{`
        @media (max-width: 800px) {
          main > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default App;

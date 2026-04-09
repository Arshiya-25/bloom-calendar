import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import InputField from "../UI/InputField";

import { parseKey } from "../../utils/dateUtils";
import { MONTHS, EVENT_CATEGORIES } from "../../data/constants";

function AddEventModal({ date, onClose, onSave, existing }) {
  const [title, setTitle] = useState(existing?.title || "");
  const [category, setCategory] = useState(existing?.category || "work");
  const [important, setImportant] = useState(existing?.important || false);
  const [time, setTime] = useState(existing?.time || "");
  const [note, setNote] = useState(existing?.note || "");
  const titleRef = useRef(null);

  useEffect(() => {
    // small delay so the modal animation doesn't fight with focus
    const t = setTimeout(() => titleRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  if (!date) return null;

  const { y, m, d } = parseKey(date);
  const label = `${MONTHS[m]} ${d}, ${y}`;

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      id: existing?.id || Date.now(),
      title: title.trim(),
      category,
      important,
      time,
      note,
      date,
    });

    // close after saving
    onClose();
  };

  return (
    <Modal title={existing ? "Edit Event" : "New Event"} onClose={onClose}>
      {/* date label */}
      <p
        style={{
          fontSize: 15,
          color: "var(--text3)",
          marginBottom: "1.35rem",
          fontFamily: "Caveat",
        }}
      >
        {label}
      </p>

      <InputField
        label="Title"
        value={title}
        onChange={setTitle}
        ref={titleRef}
        onEnter={handleSave}
        placeholder="What's happening?"
      />

      {/* category picker */}
      <div style={{ marginBottom: "1.4rem" }}>
        <label
          style={{
            fontSize: 10.5,
            color: "var(--text3)",
            marginBottom: 8,
            display: "block",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 500,
          }}
        >
          Category
        </label>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {EVENT_CATEGORIES.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                className="tag-btn"
                onClick={() => setCategory(cat.id)}
                style={{
                  padding: "6px 15px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: active ? 500 : 400,
                  background: active ? cat.color : "transparent",
                  color: active ? cat.textColor : "var(--text2)",
                  border: `1px solid ${active ? "transparent" : "var(--border2)"}`,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <InputField
        label="Time (optional)"
        value={time}
        onChange={setTime}
        placeholder="e.g. 2:00 PM"
      />

      {/* important toggle */}
      <div
        style={{
          marginBottom: "1.4rem",
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
        }}
        onClick={() => setImportant((v) => !v)}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 6,
            background: important ? "var(--accent)" : "var(--bg2)",
            border: `1.5px solid ${important ? "var(--accent)" : "var(--border2)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
          }}
        >
          {important && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
        </div>
        <span style={{ fontSize: 13, color: "var(--text2)" }}>
          ★ Mark as Important
        </span>
      </div>

      {/* note */}
      <div style={{ marginBottom: "1.6rem" }}>
        <label
          style={{
            fontSize: 10.5,
            color: "var(--text3)",
            marginBottom: 6,
            display: "block",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 500,
          }}
        >
          Note
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Any notes..."
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 12,
            fontSize: 13,
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            resize: "vertical",
            lineHeight: 1.6,
            outline: "none",
            color: "var(--text)",
          }}
        />
      </div>

      {/* actions */}
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button
          onClick={onClose}
          style={{
            padding: "9px 20px",
            borderRadius: 10,
            fontSize: 13,
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            color: "var(--text2)",
          }}
        >
          Cancel
        </button>
        <button
          className="accent-btn"
          onClick={handleSave}
          style={{
            padding: "9px 22px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 500,
            background: "var(--accent)",
            color: "#fff",
            opacity: title.trim() ? 1 : 0.45,
            pointerEvents: title.trim() ? "auto" : "none",
          }}
        >
          {existing ? "Update" : "Save Event"}
        </button>
      </div>
    </Modal>
  );
}

export default AddEventModal;

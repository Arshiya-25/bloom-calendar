import { EVENT_CATEGORIES } from "../../data/constants.js";

function Legend({ onClose }) {
  return (
    <div
      className="dropdown"
      style={{
        position: "fixed",
        top: 58,
        right: 170,
        zIndex: 200,
        background: "var(--surface)",
        borderRadius: 14,
        padding: "1rem 1.1rem",
        border: "0.5px solid var(--border2)",
        boxShadow: "var(--shadow2)",
        minWidth: 210,
      }}
    >
      <p
        style={{
          fontSize: 10.5,
          color: "var(--text3)",
          marginBottom: 10,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        Event Categories
      </p>
      {EVENT_CATEGORIES.map((cat) => (
        <div
          key={cat.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            marginBottom: 7,
          }}
        >
          <div
            style={{
              width: 30,
              height: 14,
              borderRadius: 4,
              background: cat.color,
              flexShrink: 0,
            }}
          />
          <span
            style={{ fontSize: 13, color: "var(--text2)", fontWeight: 400 }}
          >
            {cat.label}
          </span>
        </div>
      ))}
      <div
        style={{
          borderTop: "0.5px solid var(--border)",
          marginTop: 10,
          paddingTop: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontSize: 12,
            color: "var(--text3)",
          }}
        >
          <span>★</span>
          <span>Important event</span>
        </div>
      </div>
    </div>
  );
}

export default Legend;

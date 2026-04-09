function ThemePicker({ themes, currentIdx, onSelect, onClose }) {
  return (
    <div
      className="dropdown"
      style={{
        position: "fixed",
        top: 58,
        right: 56,
        zIndex: 200,
        background: "var(--surface)",
        borderRadius: 14,
        padding: "0.75rem",
        border: "0.5px solid var(--border2)",
        boxShadow: "var(--shadow2)",
        minWidth: 190,
      }}
    >
      <p
        style={{
          fontSize: 10.5,
          color: "var(--text3)",
          marginBottom: 8,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          fontWeight: 500,
          paddingLeft: 4,
        }}
      >
        Theme
      </p>
      {themes.map((t, i) => (
        <button
          key={t.name}
          onClick={() => {
            onSelect(i);
            onClose();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "7px 8px",
            borderRadius: 9,
            background: i === currentIdx ? "var(--bg2)" : "transparent",
            width: "100%",
            textAlign: "left",
            transition: "background 0.15s",
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: `linear-gradient(135deg,${t.accent},${t.accent2})`,
              flexShrink: 0,
              boxShadow: `0 2px 6px rgba(0,0,0,0.15)`,
            }}
          />
          <span
            style={{
              fontSize: 13,
              color: "var(--text)",
              fontWeight: i === currentIdx ? 500 : 400,
            }}
          >
            {t.name}
          </span>
          {i === currentIdx && (
            <span
              style={{
                marginLeft: "auto",
                fontSize: 12,
                color: "var(--accent)",
              }}
            >
              ✓
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export default ThemePicker;

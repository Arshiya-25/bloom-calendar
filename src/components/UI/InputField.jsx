import React from "react";

const InputField = React.forwardRef(
  ({ label, value, onChange, placeholder, onEnter }, ref) => {
    return (
      <div style={{ marginBottom: "1.3rem" }}>
        {/* Label */}
        {label && (
          <label
            style={{
              fontSize: 11,
              color: "var(--text3)",
              marginBottom: 6,
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 500,
            }}
          >
            {label}
          </label>
        )}

        {/* Input */}
        <input
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 12,
            fontSize: 14,
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            outline: "none",
            color: "var(--text)",
            transition: "all 0.2s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--accent)";
            e.target.style.boxShadow = "0 0 0 3px rgba(var(--accent-rgb),0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>
    );
  },
);

export default InputField;

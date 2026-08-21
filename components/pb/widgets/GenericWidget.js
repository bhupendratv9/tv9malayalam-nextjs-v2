"use client";

import { useState } from "react";

export default function GenericWidget(props) {
  const [open, setOpen] = useState(false);

  const {
    title,
    sectionTitle,
    sectionUrl,
    items,
    section,
    type,
    widgetType,
  } = props;

  return (
    <section
      style={{
        padding: "20px 0",
        border: "2px solid red",
        margin: "20px 0",
        background: "#fff",
      }}
    >
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          background: "red",
          color: "#fff",
          padding: "12px 16px",
          fontWeight: "bold",
          fontSize: "18px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>
          GENERIC WIDGET FALLBACK →{" "}
          {sectionTitle || title || section?.slug || "Unknown Widget"}
        </span>

        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {open ? "−" : "+"}
        </span>
      </div>

      {/* Collapsible Content */}
      {open && (
        <>
          {/* Main Info */}
          <div style={{ padding: 12 }}>
            <h2 style={{ margin: 0 }}>
              <a href={sectionUrl || "#"}>
                {sectionTitle ||
                  title ||
                  section?.slug ||
                  "Unknown Widget"}
              </a>
            </h2>
          </div>

          {/* Debug Info */}
          <div
            style={{
              background: "#f5f5f5",
              padding: 12,
              borderTop: "1px solid #ddd",
              borderBottom: "1px solid #ddd",
            }}
          >
            <div>
              <strong>type:</strong> {String(type)}
            </div>

            <div>
              <strong>widgetType:</strong> {String(widgetType)}
            </div>

            <div>
              <strong>section.slug:</strong> {section?.slug || "N/A"}
            </div>

            <div>
              <strong>title:</strong> {title || "N/A"}
            </div>

            <div>
              <strong>itemsCount:</strong>{" "}
              {Array.isArray(items) ? items.length : 0}
            </div>
          </div>

          {/* Full Props */}
          <pre
            style={{
              background: "#000",
              color: "#0f0",
              padding: 12,
              borderRadius: 4,
              overflow: "auto",
              fontSize: 12,
              marginTop: 10,
            }}
          >
            {JSON.stringify(props, null, 2)}
          </pre>
        </>
      )}
    </section>
  );
}
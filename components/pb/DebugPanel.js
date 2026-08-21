"use client";
import { useState } from "react";

// ─── colour tokens ────────────────────────────────────────────────────────────
const C = {
  bg:        "#1a1a1a",
  bgCard:    "#252525",
  bgCardAlt: "#2d2d2d",
  border:    "#3a3a3a",
  orange:    "#f90",
  green:     "#4ec9b0",
  red:       "#f44747",
  yellow:    "#dcdcaa",
  blue:      "#9cdcfe",
  purple:    "#c586c0",
  dim:       "#777",
  text:      "#d4d4d4",
};

// ─── tiny helpers ─────────────────────────────────────────────────────────────
const s = (obj) => Object.assign({}, obj); // shallow clone (avoids mutation)

function Badge({ label, color = C.dim }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "1px 6px",
      borderRadius: 3,
      background: color + "22",
      border: `1px solid ${color}55`,
      color,
      fontSize: 11,
      fontWeight: "bold",
      marginLeft: 4,
    }}>
      {label}
    </span>
  );
}

function JsonBlock({ data, maxHeight = 260 }) {
  const [open, setOpen] = useState(false);
  const text = JSON.stringify(data, null, 2);
  const lines = text.split("\n").length;
  const collapsed = !open && lines > 12;

  return (
    <div style={{ position: "relative" }}>
      <pre style={{
        margin: 0,
        background: C.bgCardAlt,
        border: `1px solid ${C.border}`,
        borderRadius: 4,
        padding: "8px 10px",
        fontSize: 11,
        overflowX: "auto",
        overflowY: collapsed ? "hidden" : "auto",
        maxHeight: collapsed ? 140 : maxHeight,
        color: C.text,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
      }}>
        {text}
      </pre>
      {lines > 12 && (
        <button
          onClick={() => setOpen(!open)}
          style={{
            position: collapsed ? "absolute" : "static",
            bottom: 0, left: 0, right: 0,
            width: "100%",
            background: collapsed ? "linear-gradient(transparent, #1a1a1aee)" : C.bgCard,
            border: "none",
            borderTop: `1px solid ${C.border}`,
            color: C.orange,
            cursor: "pointer",
            padding: "4px 0",
            fontSize: 11,
            textAlign: "center",
          }}
        >
          {open ? "▲ collapse" : `▼ expand (${lines} lines)`}
        </button>
      )}
    </div>
  );
}

// ─── Tab bar ──────────────────────────────────────────────────────────────────
function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 2, marginBottom: 10, flexWrap: "wrap" }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            padding: "4px 12px",
            background: active === t.id ? C.orange : C.bgCard,
            color:      active === t.id ? "#000"   : C.text,
            border: `1px solid ${active === t.id ? C.orange : C.border}`,
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: active === t.id ? "bold" : "normal",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ─── Section 1 — URL / Query params ──────────────────────────────────────────
function TabParams({ queryParams }) {
  return (
    <div>
      <Row label="id"          value={queryParams?.id}          highlight={!queryParams?.id} />
      <Row label="category"    value={queryParams?.category} />
      <Row label="subcategory" value={queryParams?.subcategory} />
      <Row label="title"       value={queryParams?.title} />
      <div style={{ marginTop: 8 }}>
        <Label>Full queryParams object</Label>
        <JsonBlock data={queryParams} />
      </div>
    </div>
  );
}

// ─── Section 2 — PageBuilder meta ────────────────────────────────────────────
function TabPageBuilder({ pageDebug, meta }) {
  return (
    <div>
      <Row
        label="PageBuilder page id"
        value={pageDebug?.pageId}
      />
      <Row
        label="API status"
        value={pageDebug?.pbError ? `ERROR: ${pageDebug.pbError}` : "OK"}
        color={pageDebug?.pbError ? C.red : C.green}
      />
      <Row label="Total widgets"  value={pageDebug?.totalWidgets} />
      <Row label="Active widgets" value={pageDebug?.activeWidgets} />
      <div style={{ marginTop: 8 }}>
        <Label>Meta</Label>
        <JsonBlock data={meta} />
      </div>
    </div>
  );
}

// ─── Section 3 — Widgets overview ────────────────────────────────────────────
function TabWidgets({ sections, onSelect }) {
  return (
    <div>
      {sections.length === 0 && (
        <div style={{ color: C.red, padding: "8px 0" }}>
          ⚠ No sections returned — check PageBuilder API and page id.
        </div>
      )}
      {sections.map((s, i) => {
        const d = s._debug || {};
        const posColor =
          s.position === "right-sidebar" ? C.green :
          s.position === "main"          ? C.yellow :
          s.position === "header"        ? C.purple :
          s.position === "footer"        ? C.purple : C.dim;

        return (
          <div
            key={i}
            onClick={() => onSelect(i)}
            style={{
              background: C.bgCard,
              border: `1px solid ${C.border}`,
              borderRadius: 4,
              padding: "7px 10px",
              marginBottom: 6,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span style={{ color: C.dim, minWidth: 22 }}>#{i + 1}</span>
            <span style={{ color: C.blue, fontWeight: "bold", minWidth: 180 }}>
              {s.type || "(no type)"}
            </span>
            <Badge label={s.position || "?"} color={posColor} />
            <Badge
              label={d.endpointType || "no-type"}
              color={d.endpointType === "detail" ? C.green : d.endpointType === "listing" ? C.yellow : C.dim}
            />
            {d.fetchError && <Badge label="FETCH ERR" color={C.red} />}
            {d.fetchStatus && (
              <Badge
                label={`HTTP ${d.fetchStatus}`}
                color={d.fetchStatus === 200 ? C.green : C.red}
              />
            )}
            <Badge
              label={`${d.itemCount ?? 0} items`}
              color={(d.itemCount ?? 0) > 0 ? C.green : C.red}
            />
            <span style={{ color: C.dim, fontSize: 11, marginLeft: "auto" }}>
              click for detail →
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Section 4 — Single widget deep-dive ─────────────────────────────────────
function TabWidgetDetail({ section }) {
  const [subTab, setSubTab] = useState("endpoint");
  const d = section._debug || {};

  const subTabs = [
    { id: "endpoint", label: "Endpoint" },
    { id: "items",    label: `Items (${section.items?.length ?? 0})` },
    { id: "response", label: "Raw Response" },
    { id: "config",   label: "dataConfig" },
    { id: "widget",   label: "Widget Config" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <span style={{ color: C.blue, fontWeight: "bold", fontSize: 13 }}>
          {section.type || "(no type)"}
        </span>
        <Badge label={section.position} color={C.yellow} />
        <Badge label={`sort: ${section.sortOrder}`} color={C.dim} />
      </div>

      <Tabs tabs={subTabs} active={subTab} onChange={setSubTab} />

      {subTab === "endpoint" && (
        <div>
          <Row label="endpointType"     value={d.endpointType || "(none)"} color={d.endpointType === "detail" ? C.green : C.dim} />
          <Row label="rawEndpoint"      value={d.rawEndpoint || "(empty)"} />
          <Row
            label="resolvedEndpoint"
            value={d.resolvedEndpoint || "(empty)"}
            color={d.resolvedEndpoint !== d.rawEndpoint ? C.green : C.text}
          />
          <Row
            label="fetchStatus"
            value={d.fetchError ? `FETCH ERROR: ${d.fetchError}` : d.fetchStatus ? `HTTP ${d.fetchStatus}` : "n/a"}
            color={d.fetchError ? C.red : d.fetchStatus === 200 ? C.green : d.fetchStatus ? C.red : C.dim}
          />
          <Row label="itemCount" value={d.itemCount ?? 0} color={(d.itemCount ?? 0) > 0 ? C.green : C.red} />
        </div>
      )}

      {subTab === "items" && (
        <JsonBlock data={section.items ?? []} maxHeight={400} />
      )}

      {subTab === "response" && (
        <JsonBlock data={section.response ?? section.data ?? null} maxHeight={400} />
      )}

      {subTab === "config" && (
        <JsonBlock data={section.dataConfig ?? {}} maxHeight={400} />
      )}

      {subTab === "widget" && (
        <JsonBlock data={section.section ?? {}} maxHeight={400} />
      )}
    </div>
  );
}

// ─── Shared micro-components ──────────────────────────────────────────────────
function Label({ children }) {
  return (
    <div style={{ color: C.dim, fontSize: 11, marginBottom: 3 }}>{children}</div>
  );
}

function Row({ label, value, color, highlight }) {
  const val = value === undefined || value === null || value === "" ? "(empty)" : String(value);
  const c = color || (highlight || val === "(empty)" ? C.red : C.text);
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 4, alignItems: "flex-start" }}>
      <span style={{ color: C.dim, minWidth: 160, flexShrink: 0, fontSize: 12 }}>{label}</span>
      <span style={{ color: c, fontSize: 12, wordBreak: "break-all" }}>{val}</span>
    </div>
  );
}

// ─── Main DebugPanel export ───────────────────────────────────────────────────
export default function DebugPanel({ queryParams, pageDebug, sections, meta }) {
  const [open, setOpen]         = useState(true);
  const [tab, setTab]           = useState("params");
  const [widgetIdx, setWidgetIdx] = useState(null);

  const normalizedSections = Array.isArray(sections) ? sections : [];

  const mainTabs = [
    { id: "params",  label: `① URL Params` },
    { id: "pb",      label: `② PageBuilder` },
    { id: "widgets", label: `③ Widgets (${normalizedSections.length})` },
    ...(widgetIdx !== null
      ? [{ id: "widget-detail", label: `④ ${normalizedSections[widgetIdx]?.type || "Widget"} ✕` }]
      : []),
  ];

  const panelHeight = open ? "55vh" : "36px";

  return (
    <div style={{
      position: "fixed",
      bottom: 0, left: 0, right: 0,
      height: panelHeight,
      background: C.bg,
      color: C.text,
      fontFamily: "'Consolas','Fira Mono','monospace'",
      fontSize: 12,
      zIndex: 99999,
      borderTop: `3px solid ${C.orange}`,
      display: "flex",
      flexDirection: "column",
      transition: "height 0.2s ease",
    }}>
      {/* ── toolbar ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "4px 12px",
        borderBottom: `1px solid ${C.border}`,
        gap: 8,
        flexShrink: 0,
      }}>
        <span style={{ color: C.orange, fontWeight: "bold", fontSize: 13 }}>
          🐛 Debug Panel
        </span>
        <span style={{ color: C.dim, fontSize: 11 }}>
          id={queryParams?.id || "—"} | page={pageDebug?.pageId || "—"} | widgets={normalizedSections.length}
        </span>
        <button
          onClick={() => setOpen(!open)}
          style={{
            marginLeft: "auto",
            background: "none",
            border: `1px solid ${C.border}`,
            color: C.text,
            cursor: "pointer",
            borderRadius: 3,
            padding: "2px 8px",
            fontSize: 12,
          }}
        >
          {open ? "▼ hide" : "▲ show"}
        </button>
      </div>

      {/* ── body ── */}
      {open && (
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px" }}>
          <Tabs
            tabs={mainTabs}
            active={tab}
            onChange={(id) => {
              if (id === "widget-detail" && widgetIdx === null) return;
              setTab(id);
            }}
          />

          {tab === "params" && (
            <TabParams queryParams={queryParams} />
          )}

          {tab === "pb" && (
            <TabPageBuilder pageDebug={pageDebug} meta={meta} />
          )}

          {tab === "widgets" && (
            <TabWidgets
              sections={normalizedSections}
              onSelect={(i) => { setWidgetIdx(i); setTab("widget-detail"); }}
            />
          )}

          {tab === "widget-detail" && widgetIdx !== null && (
            <TabWidgetDetail section={normalizedSections[widgetIdx]} />
          )}
        </div>
      )}
    </div>
  );
}

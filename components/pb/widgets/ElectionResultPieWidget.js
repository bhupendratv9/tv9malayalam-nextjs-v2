import { useEffect, useMemo, useRef, useState } from "react";

const W = 600;
const H = 360;
const CX = W / 2;
const CY = H - 40;
const OUTER_R = 280;
const MIN_NORM_R = 0.30;
const MAX_NORM_R = 0.95;
const DOT_SPACING_FACTOR = 0.065;
const ANIM_DURATION = 1400;
const DEFAULT_DOT_STROKE = "#b8b8b8";
const DEFAULT_DOT_FILL = "#ffffff";

function getLayoutConfig(totalSeats) {
  if (totalSeats <= 40) return { rowsMin: 3, rowsMax: 7, rMin: 0.5, rMax: 0.92, spacing: 0.095 };
  if (totalSeats <= 80) return { rowsMin: 4, rowsMax: 10, rMin: 0.42, rMax: 0.94, spacing: 0.082 };
  if (totalSeats <= 140) return { rowsMin: 5, rowsMax: 14, rMin: 0.36, rMax: 0.95, spacing: 0.074 };
  return { rowsMin: 6, rowsMax: 25, rMin: MIN_NORM_R, rMax: MAX_NORM_R, spacing: DOT_SPACING_FACTOR };
}

function buildLayout(totalSeats) {
  const cfg = getLayoutConfig(totalSeats);
  let numRows = cfg.rowsMin;

  for (let r = cfg.rowsMin; r <= cfg.rowsMax; r++) {
    const step = (cfg.rMax - cfg.rMin) / (r - 1 || 1);
    let cap = 0;
    for (let i = 0; i < r; i++) {
      cap += Math.floor(Math.PI * (cfg.rMin + i * step) / cfg.spacing);
    }
    if (cap >= totalSeats) {
      numRows = r;
      break;
    }
  }

  const step = (cfg.rMax - cfg.rMin) / (numRows - 1 || 1);
  const caps = Array.from({ length: numRows }, (_, i) =>
    Math.floor(Math.PI * (cfg.rMin + i * step) / cfg.spacing)
  );

  const totalCap = caps.reduce((a, b) => a + b, 0);
  const rowCounts = caps.map((c) => Math.round((c / totalCap) * totalSeats));

  let diff = rowCounts.reduce((a, b) => a + b, 0) - totalSeats;
  for (let i = numRows - 1; diff !== 0; i = (i - 1 + numRows) % numRows) {
    rowCounts[i] -= Math.sign(diff);
    diff -= Math.sign(diff);
  }

  const positions = [];
  for (let i = 0; i < numRows; i++) {
    const normR = cfg.rMin + i * step;
    const count = rowCounts[i];
    for (let j = 0; j < count; j++) {
      const angle = Math.PI + (j / (count > 1 ? count - 1 : 1)) * Math.PI;
      positions.push({ normR, angle });
    }
  }

  positions.sort((a, b) => {
    if (Math.abs(a.angle - b.angle) > 0.001) return a.angle - b.angle;
    return a.normR - b.normR;
  });

  return { positions, cfg };
}

function buildSeatModel(parties, totalSeats) {
  const allSeats = Array.from({ length: totalSeats }, () => ({
    color: "#cccccc",
    name: "Remaining",
    seats: 0,
    animRound: 0,
  }));

  let leftPtr = 0;
  let rightPtr = totalSeats - 1;
  let maxPartyRound = -1;

  parties.forEach((p, partyIdx) => {
    const seatCount = Math.max(0, parseInt(p.seats || 0, 10));
    const fromLeft = partyIdx % 2 === 0;

    for (let i = 0; i < seatCount && leftPtr <= rightPtr; i++) {
      const targetIdx = fromLeft ? leftPtr++ : rightPtr--;
      allSeats[targetIdx] = {
        color: p.color || "#999999",
        name: p.name || "",
        seats: seatCount,
        animRound: i,
      };
      if (i > maxPartyRound) maxPartyRound = i;
    }
  });

  let remRound = maxPartyRound + 1;
  while (leftPtr <= rightPtr) {
    allSeats[leftPtr++].animRound = remRound++;
  }

  return allSeats;
}

function ParliamentSvg({ totalSeats, majority, parties }) {
  const mountedRef = useRef(false);
  const { positions, cfg } = useMemo(() => buildLayout(totalSeats || 0), [totalSeats]);
  const allSeats = useMemo(() => buildSeatModel(parties || [], totalSeats || 0), [parties, totalSeats]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  if (!totalSeats || totalSeats <= 0) {
    return (
      <svg
        viewBox="26.72 24.05 546.56 303.23"
        className="election-parliament-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x={CX}
          y={CY - 120}
          textAnchor="middle"
          fontSize="18"
          fontWeight="600"
          fontFamily="Noto Sans, sans-serif"
          fill="#666"
        >
          Data not found
        </text>
      </svg>
    );
  }

  const dotR = Math.max(3.5, Math.min(9.5, OUTER_R * cfg.spacing * 0.48));
  const lineTop = CY - OUTER_R * cfg.rMax - 15;
  const maxAnimRound = allSeats.reduce(
    (m, s) => Math.max(m, typeof s.animRound === "number" ? s.animRound : 0),
    0
  );

  return (
    <svg
      viewBox="26.72 24.05 546.56 303.23"
      className="election-parliament-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1={CX}
        y1={lineTop}
        x2={CX}
        y2={CY - 60}
        stroke="var(--majority-mark-line, #999)"
        strokeWidth="1.5"
        strokeDasharray="5,4"
      />

      <text
        x={CX}
        y={lineTop - 6}
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fontFamily="Noto Sans, sans-serif"
        fill="var(--majority-mark-text, #444)"
      >
        {`Majority Mark: ${majority}`}
      </text>

      {positions.map((pos, idx) => {
        const seat = allSeats[idx] || {
          color: "#cccccc",
          name: "Remaining",
          seats: 0,
          animRound: 0,
        };

        const r = pos.normR * OUTER_R;
        const x = CX + r * Math.cos(pos.angle);
        const y = CY + r * Math.sin(pos.angle);

        const seatRound = typeof seat.animRound === "number" ? seat.animRound : 0;
        const delayFrac = maxAnimRound > 0 ? seatRound / maxAnimRound : 0;
        const delayMs = delayFrac * ANIM_DURATION * 1.72;

        return (
          <circle
            key={`${idx}-${seat.name}-${seatRound}`}
            cx={x.toFixed(2)}
            cy={y.toFixed(2)}
            r={dotR.toFixed(2)}
            fill={mountedRef.current ? seat.color : DEFAULT_DOT_FILL}
            stroke={mountedRef.current ? seat.color : DEFAULT_DOT_STROKE}
            strokeWidth="1"
            style={{
              transition: "fill 320ms ease, stroke 320ms ease",
              transitionDelay: `${delayMs.toFixed(0)}ms`,
            }}
          />
        );
      })}
    </svg>
  );
}

export default function ElectionResultPieWidget({title = "Assembly Election Result",sectionUrl = "#",dataConfig = {},}) {
  
  // console.log(dataConfig.states);
  
  const states = Array.isArray(dataConfig.states)
    ? dataConfig.states
    : [
      ];

  const years = Array.isArray(dataConfig.years)
    ? dataConfig.years
    : [
      ];

  const defaultState = dataConfig.default_state || states?.[0]?.value || "04";
  const defaultYear = dataConfig.default_year || years?.[0]?.value || "2025";
  const apiBase =
    dataConfig.api_base ||
    process.env.NEXT_PUBLIC_ELECTION_API_BASE_URL ||
    "https://d2mbatxl9mg7js.cloudfront.net/election/ts/vs/dashboard/en";

  const [currState, setCurrState] = useState(defaultState);
  const [currYear, setCurrYear] = useState(defaultYear);
  const [loading, setLoading] = useState(false);
  const [stateName, setStateName] = useState("State");
  const [seatCount, setSeatCount] = useState("0");
  const [totalSeats, setTotalSeats] = useState("0");
  const [majority, setMajority] = useState(0);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    let active = true;
    let timer = null;

    async function fetchData() {
      try {
        setLoading(true);

        const res = await fetch(`${apiBase}/${currState}/${currYear}`, {
          headers: { Accept: "application/json" },
        });

        const json = await res.json();
        const s = json?.data?.[0];

        if (!active || !s) {
          if (active) {
            setStateName("State");
            setSeatCount("0");
            setTotalSeats("0");
            setMajority(0);
            setDetails([]);
          }
          return;
        }

        const total = parseInt(s.stateseats || 0, 10);
        const maj = parseInt(s.majority || Math.floor(total / 2) + 1, 10);
        const mapped = (s.details || []).map((p) => ({
          name: p.partycode,
          seats: parseInt(p.currentleads || 0, 10),
          color: p.partycolor,
          change: p.change,
          raw: p,
        }));

        const filled = mapped.reduce((a, b) => a + b.seats, 0);

        setStateName(`${s.estatename || "State"} (${filled} / ${total})`);
        setSeatCount(String(filled));
        setTotalSeats(String(total));
        setMajority(maj);
        setDetails(mapped);
      } catch (e) {
        if (active) {
          setStateName("State");
          setSeatCount("0");
          setTotalSeats("0");
          setMajority(0);
          setDetails([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchData();

    if (currYear === "2025") {
      timer = setInterval(fetchData, 10000);
    }

    return () => {
      active = false;
      if (timer) clearInterval(timer);
    };
  }, [apiBase, currState, currYear]);

  return (
    <div className="electionResults_Wrapper">
      <div className="tabs">
        <div className="electionHD">
          <h2 className="h2">
            <a target="_top" href={sectionUrl} id="pageTitle">
              {title}
            </a>
          </h2>

          <div className="dropdown_selectors">
            <div className="selectbtn">
              <select
                className="selectDropdown"
                value={currState}
                onChange={(e) => setCurrState(e.target.value)}
              >
                {states.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="selectbtn">
              <select
                className="selectDropdown"
                value={currYear}
                onChange={(e) => setCurrYear(e.target.value)}
              >
                {years.map((year) => (
                  <option key={year.value} value={year.value}>
                    {year.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="parliament-wrap">
          <ParliamentSvg
            totalSeats={Number(totalSeats)}
            majority={majority}
            parties={details}
          />

          <div className="seat-summary">
            <div className="total" id="seatCount">
              {seatCount}
            </div>
            <div className="label">
              <span id="totalSeats" style={{ display: "none" }}>
                {totalSeats}
              </span>
              Total Seats
            </div>
          </div>
        </div>

        <div className="result-tally">
          <h2 id="stateName">{loading ? "Loading..." : stateName}</h2>

          <table>
            <thead>
              <tr>
                <th>Alliance / Party</th>
                <th>Seats</th>
                <th>Change(+/-)</th>
              </tr>
            </thead>
            <tbody id="electionTableBody">
              {details.map((p, idx) => (
                <tr key={`${p.name}-${idx}`}>
                  <td style={{ color: p.color || "#222" }}>{p.name}</td>
                  <td>{p.seats}</td>
                  <td>{p.change ?? p.raw?.change ?? "-"}</td>
                </tr>
              ))}
              {!loading && details.length === 0 && (
                <tr>
                  <td colSpan="3">Data not found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
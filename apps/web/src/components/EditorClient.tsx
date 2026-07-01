'use client';

import { loadScript } from '@/lib/loadScript';
import type { Lane, Score } from '@/types/sse';
import { useCallback, useEffect, useRef, useState } from 'react';

// The arrangement editor — "Ableton for voice". A horizontal timeline: lanes stacked vertically,
// time flowing left→right, each line a draggable clip. Drag a clip in time (x) or across lanes (y);
// add/duplicate/delete clips and lanes; toggle a lane between an AI voice and a live human performer;
// export/import the portable SCORE JSON; and Perform the current arrangement through the shared
// engine (edited lines preview via Web Speech; L4 will render them as neural voices).

const PX_PER_ROW = 15;
const LANE_H = 60;
const GUTTER = 150;

const C = {
  stage: '#101012',
  page: '#34393b',
  ink: '#e9e6dc',
  accent: '#cdbf9a',
  rule: 'rgba(233, 230, 220, 0.14)',
  faint: 'rgba(233, 230, 220, 0.5)',
  band: 'rgba(255, 255, 255, 0.02)',
  bandAlt: 'rgba(255, 255, 255, 0.04)',
};

const SCORE_SCRIPTS = [
  '/prototypes/scores/philip-glass.js',
  '/prototypes/scores/richard-and-anne.js',
  '/prototypes/scores/earnest-duet.js',
];

interface EditEvent {
  id: string;
  row: number;
  lane: string;
  text: string;
  stage?: boolean;
}

interface DragState {
  id: string;
  startX: number;
  startY: number;
  row: number;
  laneIdx: number;
  moved: boolean;
}

const slug = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'untitled';

function blankLanes(): Lane[] {
  return [
    {
      id: 'A',
      name: 'Voice A',
      performer: 'ai',
      pan: -0.3,
      gain: 1,
      tone: { f: 440, type: 'sine' },
    },
    {
      id: 'B',
      name: 'Voice B',
      performer: 'ai',
      pan: 0.3,
      gain: 1,
      tone: { f: 330, type: 'sine' },
    },
  ];
}

export function EditorClient() {
  const [lanes, setLanes] = useState<Lane[]>(blankLanes);
  const [events, setEvents] = useState<EditEvent[]>([]);
  const [tempo, setTempo] = useState(3);
  const [title, setTitle] = useState('Untitled');
  const [scoreId, setScoreId] = useState('untitled');
  const [selected, setSelected] = useState<string | null>(null);
  const [registry, setRegistry] = useState<Record<string, Score>>({});
  const [performing, setPerforming] = useState(false);

  const lanesRef = useRef<Lane[]>(lanes);
  lanesRef.current = lanes;
  const dragRef = useRef<DragState | null>(null);
  const seq = useRef(0);
  const uid = () => `e${seq.current++}`;

  const loadScore = useCallback((sc: Score) => {
    setLanes(sc.lanes.map((l) => ({ ...l })));
    setEvents(
      sc.events.map((e, i) => ({
        id: `e${i}`,
        row: e.row,
        lane: e.lane,
        text: e.text,
        ...(e.stage ? { stage: true } : {}),
      })),
    );
    seq.current = sc.events.length;
    setTempo(sc.tempo ?? 3);
    setTitle(sc.title);
    setScoreId(sc.id);
    setSelected(null);
  }, []);

  // Load the score registry (for the "start from" picker), and any ?score= starting point.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const src of SCORE_SCRIPTS) await loadScript(src);
      if (cancelled) return;
      const scores = window.SSE_SCORES ?? {};
      setRegistry(scores);
      const wanted = new URLSearchParams(window.location.search).get('score');
      if (wanted && scores[wanted]) loadScore(scores[wanted]);
    })().catch((err) => console.error(err));
    return () => {
      cancelled = true;
    };
  }, [loadScore]);

  // ---- drag a clip in time (x) and across lanes (y) ----
  const onDragMove = useCallback((e: PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) d.moved = true;
    const newRow = Math.max(0, d.row + Math.round(dx / PX_PER_ROW));
    const ls = lanesRef.current;
    const idx = Math.min(ls.length - 1, Math.max(0, d.laneIdx + Math.round(dy / LANE_H)));
    const newLane = ls[idx]?.id;
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === d.id ? { ...ev, row: newRow, ...(newLane ? { lane: newLane } : {}) } : ev,
      ),
    );
  }, []);

  const onDragEnd = useCallback(() => {
    window.removeEventListener('pointermove', onDragMove);
    window.removeEventListener('pointerup', onDragEnd);
    const d = dragRef.current;
    dragRef.current = null;
    if (d && !d.moved) setSelected(d.id);
  }, [onDragMove]);

  const onClipPointerDown = (e: React.PointerEvent, ev: EditEvent) => {
    e.preventDefault();
    const laneIdx = lanesRef.current.findIndex((l) => l.id === ev.lane);
    dragRef.current = {
      id: ev.id,
      startX: e.clientX,
      startY: e.clientY,
      row: ev.row,
      laneIdx,
      moved: false,
    };
    window.addEventListener('pointermove', onDragMove);
    window.addEventListener('pointerup', onDragEnd);
  };

  // ---- mutations ----
  const addClip = () => {
    const laneId =
      (selected ? events.find((e) => e.id === selected)?.lane : undefined) ?? lanes[0]?.id;
    if (!laneId) return;
    const maxRow = events.reduce((m, e) => Math.max(m, e.row), -2);
    const ev: EditEvent = { id: uid(), row: maxRow + 2, lane: laneId, text: 'new line' };
    setEvents((prev) => [...prev, ev]);
    setSelected(ev.id);
  };
  const duplicateClip = () => {
    const src = events.find((e) => e.id === selected);
    if (!src) return;
    const ev: EditEvent = { ...src, id: uid(), row: src.row + 2 };
    setEvents((prev) => [...prev, ev]);
    setSelected(ev.id);
  };
  const deleteClip = () => {
    if (!selected) return;
    setEvents((prev) => prev.filter((e) => e.id !== selected));
    setSelected(null);
  };
  const patchClip = (patch: Partial<EditEvent>) => {
    if (!selected) return;
    setEvents((prev) => prev.map((e) => (e.id === selected ? { ...e, ...patch } : e)));
  };

  const addLane = () => {
    setLanes((prev) => {
      const n = prev.length + 1;
      const lane: Lane = {
        id: `L${seq.current++}`,
        name: `Voice ${n}`,
        performer: 'ai',
        pan: 0,
        gain: 1,
        tone: { f: 440, type: 'sine' },
      };
      return [...prev, lane];
    });
  };
  const renameLane = (id: string, name: string) => {
    setLanes((prev) => prev.map((l) => (l.id === id ? { ...l, name } : l)));
  };
  const toggleLanePerformer = (id: string) => {
    setLanes((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, performer: l.performer === 'human' ? 'ai' : 'human' } : l,
      ),
    );
  };
  const deleteLane = (id: string) => {
    setLanes((prev) => (prev.length > 1 ? prev.filter((l) => l.id !== id) : prev));
    setEvents((prev) => prev.filter((e) => e.lane !== id));
  };

  // ---- portable SCORE (export / perform) ----
  const toScore = useCallback((): Score => {
    const maxRow = events.reduce((m, e) => Math.max(m, e.row), 0);
    const id = slug(scoreId || title);
    return {
      id,
      short: title,
      title,
      tempo,
      lanes,
      sections: {},
      total: maxRow + 3,
      events: events
        .slice()
        .sort((a, b) => a.row - b.row)
        .map((e) => ({
          row: e.row,
          lane: e.lane,
          text: e.text,
          ...(e.stage ? { stage: true } : {}),
        })),
    };
  }, [events, lanes, tempo, title, scoreId]);

  const exportJson = () => {
    const score = toScore();
    const blob = new Blob([JSON.stringify(score, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${score.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const importJson = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text()) as Score;
      if (Array.isArray(parsed.lanes) && Array.isArray(parsed.events)) loadScore(parsed);
    } catch (err) {
      console.error(err);
    }
  };

  // ---- perform the current arrangement through the shared engine ----
  const performRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!performing) return;
    let handle: { destroy: () => void } | null = null;
    let cancelled = false;
    (async () => {
      await loadScript('/prototypes/tracker-engine.js');
      const el = performRef.current;
      const engine = window.SSEEngine;
      if (cancelled || !el || !engine) return;
      const score = toScore();
      handle = engine.mount(el, { score, clips: null, scores: [score] });
    })().catch((err) => console.error(err));
    return () => {
      cancelled = true;
      if (handle) handle.destroy();
    };
  }, [performing, toScore]);

  const selectedEv = events.find((e) => e.id === selected) ?? null;
  const maxRow = events.reduce((m, e) => Math.max(m, e.row), 0);
  const timelineW = (maxRow + 10) * PX_PER_ROW;
  const timelineH = lanes.length * LANE_H;

  const btn: React.CSSProperties = {
    fontSize: 12,
    padding: '5px 10px',
    borderRadius: 3,
    border: `1px solid ${C.rule}`,
    background: 'transparent',
    color: C.ink,
    cursor: 'pointer',
  };
  const field: React.CSSProperties = {
    fontSize: 12,
    padding: '4px 6px',
    background: C.stage,
    color: C.ink,
    border: `1px solid ${C.rule}`,
    borderRadius: 3,
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: C.stage,
        color: C.ink,
        fontFamily: 'ui-serif, Georgia, serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* toolbar */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '8px 12px',
          borderBottom: `1px solid ${C.rule}`,
        }}
      >
        <strong style={{ letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 11 }}>
          Arrange
        </strong>
        <input
          aria-label="Score title"
          style={{ ...field, width: 180 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label style={{ fontSize: 11, color: C.faint }}>
          Tempo{' '}
          <input
            aria-label="Tempo"
            type="range"
            min={1}
            max={9}
            step={0.5}
            value={tempo}
            onChange={(e) => setTempo(Number.parseFloat(e.target.value))}
          />
        </label>
        <span style={{ flex: 1 }} />
        <button type="button" style={btn} onClick={addClip}>
          + Clip
        </button>
        <button type="button" style={btn} onClick={addLane}>
          + Lane
        </button>
        <select
          aria-label="Start from a score"
          style={field}
          value=""
          onChange={(e) => {
            const sc = registry[e.target.value];
            if (sc) loadScore(sc);
          }}
        >
          <option value="">Start from…</option>
          {Object.values(registry).map((s) => (
            <option key={s.id} value={s.id}>
              {s.short ?? s.title}
            </option>
          ))}
        </select>
        <label style={{ ...btn }}>
          Import
          <input
            aria-label="Import score JSON"
            type="file"
            accept="application/json,.json"
            style={{ display: 'none' }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void importJson(f);
            }}
          />
        </label>
        <button type="button" style={btn} onClick={exportJson}>
          Export JSON
        </button>
        <button
          type="button"
          style={{ ...btn, borderColor: C.accent, color: C.accent }}
          onClick={() => setPerforming(true)}
        >
          ▶ Perform
        </button>
      </div>

      {/* arrange area: lane labels + draggable timeline */}
      <div style={{ flex: 1, display: 'flex', overflow: 'auto' }}>
        {/* lane label column */}
        <div
          style={{
            width: GUTTER,
            flexShrink: 0,
            position: 'sticky',
            left: 0,
            zIndex: 2,
            background: C.stage,
          }}
        >
          {lanes.map((l) => (
            <div
              key={l.id}
              style={{
                height: LANE_H,
                borderBottom: `1px solid ${C.rule}`,
                padding: '6px 8px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                justifyContent: 'center',
              }}
            >
              <input
                aria-label={`Lane name for ${l.id}`}
                style={{ ...field, color: l.performer === 'human' ? C.accent : C.ink }}
                value={l.name ?? l.id}
                onChange={(e) => renameLane(l.id, e.target.value)}
              />
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  type="button"
                  style={{
                    ...btn,
                    fontSize: 10,
                    padding: '2px 6px',
                    color: l.performer === 'human' ? C.accent : C.faint,
                  }}
                  onClick={() => toggleLanePerformer(l.id)}
                >
                  {l.performer === 'human' ? '● live' : 'AI'}
                </button>
                <button
                  type="button"
                  style={{ ...btn, fontSize: 10, padding: '2px 6px', color: C.faint }}
                  onClick={() => deleteLane(l.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* timeline */}
        <div
          style={{
            position: 'relative',
            width: timelineW,
            height: timelineH,
            minWidth: '100%',
            backgroundImage: `repeating-linear-gradient(90deg, ${C.rule} 0, ${C.rule} 1px, transparent 1px, transparent ${PX_PER_ROW * 4}px)`,
          }}
        >
          {/* lane bands */}
          {lanes.map((l, i) => (
            <div
              key={l.id}
              style={{
                position: 'absolute',
                top: i * LANE_H,
                left: 0,
                right: 0,
                height: LANE_H,
                background: i % 2 === 0 ? C.band : C.bandAlt,
                borderBottom: `1px solid ${C.rule}`,
              }}
            />
          ))}
          {/* clips */}
          {events.map((ev) => {
            const laneIdx = lanes.findIndex((l) => l.id === ev.lane);
            if (laneIdx < 0) return null;
            const human = lanes[laneIdx]?.performer === 'human';
            const isSel = ev.id === selected;
            return (
              <button
                type="button"
                key={ev.id}
                onPointerDown={(e) => onClipPointerDown(e, ev)}
                style={{
                  position: 'absolute',
                  left: ev.row * PX_PER_ROW,
                  top: laneIdx * LANE_H + 10,
                  height: LANE_H - 20,
                  maxWidth: 260,
                  padding: '2px 8px',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  cursor: 'grab',
                  color: human ? C.accent : C.ink,
                  background: isSel ? 'rgba(205, 191, 154, 0.18)' : 'rgba(0, 0, 0, 0.25)',
                  border: `1px solid ${isSel ? C.accent : C.rule}`,
                  borderRadius: 4,
                  touchAction: 'none',
                }}
              >
                {ev.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* selected-clip inspector */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '8px 12px',
          borderTop: `1px solid ${C.rule}`,
          minHeight: 46,
        }}
      >
        {selectedEv ? (
          <>
            <input
              aria-label="Clip text"
              style={{ ...field, flex: 1, minWidth: 200 }}
              value={selectedEv.text}
              onChange={(e) => patchClip({ text: e.target.value })}
            />
            <select
              aria-label="Clip lane"
              style={field}
              value={selectedEv.lane}
              onChange={(e) => patchClip({ lane: e.target.value })}
            >
              {lanes.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name ?? l.id}
                </option>
              ))}
            </select>
            <label style={{ fontSize: 11, color: C.faint }}>
              Row{' '}
              <input
                aria-label="Clip row"
                type="number"
                min={0}
                style={{ ...field, width: 64 }}
                value={selectedEv.row}
                onChange={(e) =>
                  patchClip({ row: Math.max(0, Number.parseInt(e.target.value, 10) || 0) })
                }
              />
            </label>
            <button type="button" style={btn} onClick={duplicateClip}>
              Duplicate
            </button>
            <button type="button" style={{ ...btn, color: '#e0a0a0' }} onClick={deleteClip}>
              Delete
            </button>
          </>
        ) : (
          <span style={{ fontSize: 12, color: C.faint }}>
            Drag clips to retime (⇄) or recast across lanes (↕). Click a clip to edit it.
          </span>
        )}
      </div>

      {/* perform overlay */}
      {performing && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10, background: C.stage }}>
          <button
            type="button"
            style={{ ...btn, position: 'absolute', top: 10, right: 10, zIndex: 11 }}
            onClick={() => setPerforming(false)}
          >
            ✕ Close
          </button>
          <div ref={performRef} style={{ width: '100%', height: '100%' }} />
        </div>
      )}
    </div>
  );
}

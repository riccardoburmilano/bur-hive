import { MODULES } from "@/lib/modules";
import { HiveCell } from "./HiveCell";

// ── Geometria flat-top hexagonal grid ────────────────────────
// Forma: diamante/esagono grande — righe 2-3-4-3-2-1 = 15 celle
const W = 148;
const H = W * Math.sqrt(3) / 2; // ~128px

const LAYOUT: Array<{ col: number; row: number }> = [
  // row 0 — 2 celle, offset 1.5
  { col: 0, row: 0 }, { col: 1, row: 0 },
  // row 1 — 3 celle, offset 1.0
  { col: 0, row: 1 }, { col: 1, row: 1 }, { col: 2, row: 1 },
  // row 2 — 4 celle, offset 0.5
  { col: 0, row: 2 }, { col: 1, row: 2 }, { col: 2, row: 2 }, { col: 3, row: 2 },
  // row 3 — 4 celle, offset 0.5
  { col: 0, row: 3 }, { col: 1, row: 3 }, { col: 2, row: 3 }, { col: 3, row: 3 },
  // row 4 — 3 celle, offset 1.0
  { col: 0, row: 4 }, { col: 1, row: 4 }, { col: 2, row: 4 },
  // row 5 — 2 celle, offset 1.5
  { col: 0, row: 5 }, { col: 1, row: 5 },
  // row 6 — 1 cella, offset 2.0
  { col: 0, row: 6 },
];

const ROW_OFFSETS: Record<number, number> = {
  0: 1.5,
  1: 1.0,
  2: 0.5,
  3: 0.5,
  4: 1.0,
  5: 1.5,
  6: 2.0,
};

function computePositions() {
  const grouped: Record<number, number[]> = {};
  LAYOUT.forEach(({ col, row }) => {
    if (!grouped[row]) grouped[row] = [];
    grouped[row].push(col);
  });

  const positions: Array<{ x: number; y: number }> = [];
  LAYOUT.forEach(({ col, row }) => {
    const offsetCols = ROW_OFFSETS[row] ?? 0;
    positions.push({
      x: (offsetCols + col) * W * 0.76,
      y: row * H * 0.88,
    });
  });
  return positions;
}

export function Hive() {
  const positions = computePositions();
  const xs = positions.map(p => p.x);
  const ys = positions.map(p => p.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const boardW = Math.max(...xs) - minX + W;
  const boardH = Math.max(...ys) - minY + H;

  const modules = [
    ...MODULES,
    // Padding con celle ghost se servono
    ...Array(Math.max(0, positions.length - MODULES.length)).fill({
      slug: "ghost",
      name: "",
      tagline: "",
      description: "",
      status: "soon" as const,
    }),
  ];

  return (
    <div
      className="relative mx-auto"
      style={{ width: boardW, height: boardH }}
      role="navigation"
      aria-label="BUR Hive"
    >
      {positions.map((p, i) => {
        const module = modules[i] ?? {
          slug: `ghost-${i}`,
          name: "",
          tagline: "",
          description: "",
          status: "soon" as const,
        };
        return (
          <div
            key={module.slug + i}
            className="hive-cell-wrap"
            style={{
              position: "absolute",
              left: p.x - minX,
              top: p.y - minY,
              animationDelay: `${i * 40}ms`,
            }}
          >
            <HiveCell module={module} x={0} y={0} size={W} />
          </div>
        );
      })}
    </div>
  );
}

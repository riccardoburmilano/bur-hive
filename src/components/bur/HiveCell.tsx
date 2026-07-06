import { Link } from "react-router-dom";
import type { BurModule } from "@/lib/modules";

export function HiveCell({ module, x, y, size }: { module: BurModule; x: number; y: number; size: number }) {
  const isEmpty = module.name === "";
  const isSoon = module.status === "soon";

  const cellClass = [
    "hive-cell group flex flex-col items-center justify-center text-center select-none",
    isEmpty ? "hive-cell--ghost" : isSoon ? "hive-cell--soon" : "hive-cell--active",
  ].join(" ");

  const style: React.CSSProperties = {
    width: size,
    height: size * 1.1547,
    position: "relative",
  };

  const inner = (
    <div className={cellClass} style={style}>
      {!isEmpty && (
        <div className="relative z-10 flex flex-col items-center px-3">
          {module.glyph && (
            <div
              className="mb-1.5 font-light transition-all duration-300 group-hover:scale-110"
              style={{
                fontSize: 20,
                color: "var(--bur-ink)",
                opacity: 0.6,
              }}
            >
              {module.glyph}
            </div>
          )}
          <div
            className="font-medium uppercase transition-colors duration-300"
            style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--bur-ink)" }}
          >
            {module.name}
          </div>
          <div
            className="mt-1 leading-tight transition-opacity duration-300"
            style={{
              fontSize: 8,
              color: "var(--muted-foreground)",
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            {isSoon ? "Soon" : module.tagline}
          </div>
        </div>
      )}
    </div>
  );

  if (isEmpty || isSoon) return <div style={{ ...style, position: "relative" }}>{inner}</div>;

  return (
    <Link
      to={`/module/${module.slug}`}
      style={{ display: "block", position: "relative" }}
      aria-label={module.name}
    >
      {inner}
    </Link>
  );
}

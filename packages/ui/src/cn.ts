// Conditional className joiner. Accepts strings, undefined/null/false, arrays,
// and {className: boolean} objects. The single utility every React UI in this
// monorepo will reach for; bundled here so future components can rely on it.
export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const value of inputs) {
    if (!value && value !== 0) continue;
    if (typeof value === 'string' || typeof value === 'number') {
      out.push(String(value));
      continue;
    }
    if (Array.isArray(value)) {
      const inner = cn(...value);
      if (inner) out.push(inner);
      continue;
    }
    if (typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) {
        if (v) out.push(k);
      }
    }
  }
  return out.join(' ');
}

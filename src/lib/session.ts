// ============================================================
// session.ts — sesi harian sampling acak (PRD: 3-5 trace + 1-2 explain)
// Pure functions, deterministic dari seed tanggal → soal hari ini konsisten.
// ============================================================
import type { Question } from "@/content/types"

// PRNG deterministik sederhana (mulberry32-ish) dari seed string
// ponytail: no lib — cukup stabil buat sampling harian, bukan kriptografi
function seededRng(seed: string): () => number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pickN<T>(arr: T[], n: number, rng: () => number): T[] {
  const copy = [...arr]
  const out: T[] = []
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(rng() * copy.length)
    out.push(copy.splice(idx, 1)[0])
  }
  return out
}

// trace 3-5, explain 1-2 (PRD open item — diputuskan di sesi ini)
export function buildSession(
  questions: Question[],
  todayIso: string,
  traceCount?: number,
  explainCount?: number
): Question[] {
  const rng = seededRng(todayIso)
  const traces = questions.filter((q) => q.kind === "trace")
  const explains = questions.filter((q) => q.kind === "explain")
  const nTrace = traceCount ?? 3 + Math.floor(rng() * 3) // 3-5
  const nExplain = explainCount ?? 1 + Math.floor(rng() * 2) // 1-2
  return [...pickN(traces, nTrace, rng), ...pickN(explains, nExplain, rng)]
}

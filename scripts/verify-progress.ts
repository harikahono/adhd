// ============================================================
// verify-progress.ts — cek logika streak, XP, & statistik (M6b)
// Pakai: pnpm run verify:progress
// ============================================================
import {
  computeNext,
  effectiveStreak,
  EMPTY_PROGRESS,
  recordDone,
} from "../src/lib/useProgress"
import type { Question } from "../src/content/types"

let fail = 0
const check = (name: string, got: unknown, want: unknown) => {
  const ok = got === want
  console.log(`${ok ? "✓" : "✗"} ${name} — got ${got}, want ${want}`)
  if (!ok) fail++
}

const D1 = "2026-08-08"
const D2 = "2026-08-09"

const traceJs: Question = {
  kind: "trace",
  id: "trace-x",
  category: "js",
  title: "t",
  snippet: "s",
  steps: [],
  xp: 10,
  verified: "auto",
}
const explainReact: Question = {
  kind: "explain",
  id: "explain-x",
  category: "react",
  title: "t",
  snippet: "s",
  prompt: "p",
  rubric: "r",
  sampleAnswer: "a",
  xp: 10,
  verified: "manual",
}

// sesi perdana
{
  const r = computeNext(EMPTY_PROGRESS, 10, D1)
  check("first session streak=1", r.streak, 1)
  check("first xp=10", r.xp, 10)
}
// sesi lagi di hari yang sama → streak nggak naik dobel, xp akumulasi
{
  const base = computeNext(EMPTY_PROGRESS, 10, D1)
  const r = computeNext(base, 5, D1)
  check("re-do same day streak=1", r.streak, 1)
  check("re-do same day xp=15", r.xp, 15)
}
// lanjut besok → streak naik
{
  const base = computeNext(EMPTY_PROGRESS, 10, D1)
  const r = computeNext(base, 10, D2)
  check("next day streak=2", r.streak, 2)
}
// absen 2 hari → streak reset ke 1
{
  const skip = "2026-08-15"
  const base = computeNext(EMPTY_PROGRESS, 10, D1)
  const r = computeNext(base, 10, skip)
  check("gap resets streak=1", r.streak, 1)
}
// recordDone: kategori naik, manual/pasted (M6b)
{
  const a = recordDone(EMPTY_PROGRESS, traceJs)
  check("trace js done=1", a.doneByCategory.js, 1)
  check("trace nggak hitung manual/pasted", a.manual + a.pasted, 0)

  const b = recordDone(a, explainReact, "manual")
  check("explain react done=1", b.doneByCategory.react, 1)
  check("manual=1", b.manual, 1)

  const c = recordDone(b, explainReact, "pasted")
  check("pasted=1", c.pasted, 1)
  check("manual tetap 1", c.manual, 1)
  check("xp nggak berubah dari recordDone", c.xp, 0)
}
// legacy localStorage tanpa field baru → merge default
{
  const merged = {
    ...EMPTY_PROGRESS,
    ...{ xp: 50, streak: 3, todaySession: D1 },
  }
  check(
    "legacy data di-merge (doneByCategory ada)",
    merged.doneByCategory.js,
    0
  )
  check("legacy xp dipertahankan", merged.xp, 50)
}
// effectiveStreak: putus kalau gap > 1 hari (fix M6b)
{
  const D3 = "2026-08-10"
  const base = computeNext(EMPTY_PROGRESS, 10, D1) // sesi selesai D1 → streak 1
  check("streak aktif hari yang sama", effectiveStreak(base, D1), 1)
  check("streak aktif besok (belum sesi)", effectiveStreak(base, D2), 1)
  check("streak putus setelah gap", effectiveStreak(base, D3), 0)
  check(
    "streak putus total kalau belum pernah sesi",
    effectiveStreak(EMPTY_PROGRESS, D1),
    0
  )
}

console.log(fail === 0 ? "\n✅ Progress valid" : `\n❌ ${fail} masalah`)
process.exit(fail === 0 ? 0 : 1)

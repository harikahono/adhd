// ============================================================
// verify-progress.ts — cek logika streak & XP (computeNext)
// Pakai: pnpm run verify:progress
// ============================================================
import { computeNext } from "../src/lib/useProgress"

let fail = 0
const check = (name: string, got: number, want: number) => {
  const ok = got === want
  console.log(`${ok ? "✓" : "✗"} ${name} — got ${got}, want ${want}`)
  if (!ok) fail++
}

const D1 = "2026-08-08"
const D2 = "2026-08-09"

// sesi perdana
{
  const r = computeNext({ xp: 0, streak: 0, todaySession: "" }, 10, D1)
  check("first session streak=1", r.streak, 1)
  check("first xp=10", r.xp, 10)
}
// sesi lagi di hari yang sama → streak nggak naik dobel, xp akumulasi
{
  const base = computeNext({ xp: 0, streak: 0, todaySession: "" }, 10, D1)
  const r = computeNext(base, 5, D1)
  check("re-do same day streak=1", r.streak, 1)
  check("re-do same day xp=15", r.xp, 15)
}
// lanjut besok → streak naik
{
  const base = computeNext({ xp: 0, streak: 0, todaySession: "" }, 10, D1)
  const r = computeNext(base, 10, D2)
  check("next day streak=2", r.streak, 2)
}
// absen 2 hari → streak reset ke 1
{
  const skip = "2026-08-15"
  const base = computeNext({ xp: 0, streak: 0, todaySession: "" }, 10, D1)
  const r = computeNext(base, 10, skip)
  check("gap resets streak=1", r.streak, 1)
}

console.log(fail === 0 ? "\n✅ Progress valid" : `\n❌ ${fail} masalah`)
process.exit(fail === 0 ? 0 : 1)
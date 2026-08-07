// ============================================================
// verify-session.ts — cek sampling sesi harian (M6a)
// Pakai: pnpm run verify:session
// ============================================================
import { questions } from "../src/content/questions"
import { buildSession } from "../src/lib/session"

let fail = 0

// 1) jumlah trace 3-5, explain 1-2, untuk beberapa hari berbeda
for (let d = 1; d <= 7; d++) {
  const iso = `2026-08-0${d}`
  const s = buildSession(questions, iso)
  const nTrace = s.filter((q) => q.kind === "trace").length
  const nExplain = s.filter((q) => q.kind === "explain").length
  const traceOk = nTrace >= 3 && nTrace <= 5
  const explainOk = nExplain >= 1 && nExplain <= 2
  if (!traceOk || !explainOk) {
    console.error(
      `✗ ${iso}: trace=${nTrace} explain=${nExplain} (harus 3-5 + 1-2)`
    )
    fail++
  }
}

// 2) deterministik: seed sama → output sama
const a = buildSession(questions, "2026-08-07")
const b = buildSession(questions, "2026-08-07")
if (JSON.stringify(a.map((q) => q.id)) !== JSON.stringify(b.map((q) => q.id))) {
  console.error("✗ buildSession nggak deterministik untuk seed yang sama")
  fail++
}

// 3) seed beda → urutan beda (praktisnya hampir pasti beda)
const c = buildSession(questions, "2026-08-08")
if (JSON.stringify(a.map((q) => q.id)) === JSON.stringify(c.map((q) => q.id))) {
  console.error("✗ dua hari beda malah dapat sesi identik (mencurigakan)")
  fail++
}

// 4) urutan: trace dulu, explain belakangan
const firstExplain = a.findIndex((q) => q.kind === "explain")
const lastTrace = a.findLastIndex((q) => q.kind === "trace")
if (firstExplain !== -1 && lastTrace > firstExplain) {
  console.error("✗ ada explain sebelum trace selesai")
  fail++
}

console.log(
  fail === 0
    ? "\n✅ Session valid (deterministik + 3-5 trace + 1-2 explain)"
    : `\n❌ ${fail} masalah`
)
process.exit(fail === 0 ? 0 : 1)

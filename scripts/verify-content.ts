// ============================================================
// verify-content.ts — validasi struktur + jalankan snippet trace
// Pakai: pnpm run verify:content
// ============================================================
import vm from "node:vm"
import { questions } from "../src/content/questions"

let fail = 0

// ── 1. Validasi struktur ──
const ids = new Set<string>()
for (const q of questions) {
  if (ids.has(q.id)) {
    console.error(`✗ id duplikat: ${q.id}`)
    fail++
  }
  ids.add(q.id)
  if (!q.title.trim()) {
    console.error(`✗ ${q.id}: title kosong`)
    fail++
  }
  if (!q.snippet.trim()) {
    console.error(`✗ ${q.id}: snippet kosong`)
    fail++
  }

  if (q.kind === "trace") {
    if (q.steps.length < 2 || q.steps.length > 4) {
      console.error(`✗ ${q.id}: steps harus 2-4, sekarang ${q.steps.length}`)
      fail++
    }
    for (const [i, s] of q.steps.entries()) {
      if (s.options.length !== 4) {
        console.error(
          `✗ ${q.id} step ${i + 1}: harus 4 pilihan, sekarang ${s.options.length}`
        )
        fail++
      }
      if (s.answer < 0 || s.answer > 3) {
        console.error(`✗ ${q.id} step ${i + 1}: answer di luar 0-3`)
        fail++
      }
      if (!s.prompt.trim() || !s.explanation.trim()) {
        console.error(`✗ ${q.id} step ${i + 1}: prompt/explanation kosong`)
        fail++
      }
    }
  } else {
    if (!q.prompt.trim() || !q.rubric.trim() || !q.sampleAnswer.trim()) {
      console.error(`✗ ${q.id}: prompt/rubric/sampleAnswer kosong`)
      fail++
    }
  }
}

// ── 2. Jalankan snippet trace verified:auto ──
for (const q of questions) {
  if (q.kind !== "trace" || q.verified !== "auto") continue
  const logs: string[] = []
  const queue: (() => void)[] = []
  const sandbox = {
    console: { log: (...a: unknown[]) => logs.push(a.map(String).join(" ")) },
    // mock setTimeout: tunda eksekusi sampai kode sinkron selesai (mirip event loop),
    // biar var/let loop menghasilkan nilai final yang benar (3,3,3 vs 0,1,2)
    setTimeout: (fn: () => void) => {
      queue.push(fn)
    },
  }
  try {
    vm.runInNewContext(q.snippet, sandbox, { timeout: 1000 })
    for (const fn of queue) fn()
    if (logs.length === 0) {
      console.warn(
        `⚠ ${q.id} jalan TANPA output — snippet nggak print apa-apa, jawaban dicek manual`
      )
    } else {
      console.log(`✓ ${q.id} jalan — output: [${logs.join(" | ")}]`)
    }
  } catch (e) {
    console.error(`✗ ${q.id} ERROR saat dijalankan: ${(e as Error).message}`)
    fail++
  }
}

console.log(fail === 0 ? "\n✅ Semua valid" : `\n❌ ${fail} masalah ditemukan`)
process.exit(fail === 0 ? 0 : 1)

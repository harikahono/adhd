// ============================================================
// verify-grade.ts — check NIM grading (butuh NVIDIA_API_KEY di env)
// Pakai: pnpm run verify:grade
// Kalau key nggak ada → warning, exit 0 (biar CI lokal tetap jalan).
// ============================================================
import { gradeExplain } from "../api/grade"
import type { ExplainQuestion } from "../src/content/types"

const key = process.env.NVIDIA_API_KEY
if (!key) {
  console.warn(
    "⚠ NVIDIA_API_KEY kosong — skip. Salin .env.example → .env dan isi key."
  )
  process.exit(0)
}

const q: ExplainQuestion = {
  kind: "explain",
  id: "explain-001",
  category: "react",
  title: "Satpam yang Malas",
  snippet: `{isOpen === true && <div className="fixed">Modal Kebuka!</div>}`,
  prompt:
    "Jelaskan dengan kata-katamu sendiri: gimana cara komputer membaca baris di atas?",
  rubric:
    "WAJIB disebut: (1) conditional rendering, (2) && = short-circuit, (3) false → bagian kanan nggak dirender, (4) true → <div> dirender.",
  sampleAnswer: "",
  xp: 10,
  verified: "manual",
}

const bad = "coba di jalanin aja kali yak kayak biasanya"

const result = await gradeExplain(q, bad, "manual")
console.log(`✓ score: ${result.score}`)
console.log(`✓ feedback: ${result.feedback.slice(0, 120)}...`)
console.log(`✓ corrections: ${result.corrections.length} item`)
if (typeof result.score !== "number" || result.feedback.length < 10) {
  console.error("✗ hasil grading nggak valid")
  process.exit(1)
}
console.log("\n✅ Grade OK")

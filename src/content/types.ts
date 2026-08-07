// ============================================================
// Schema Soal — dari PRD v1.4, Section 12
// Jangan diubah dulu sampai konten 10 soal beres (M1 → M2),
// baru schema "dilahirkan ulang" dari konten nyata kalau perlu.
// ============================================================

export type Category = "js" | "react" | "tailwind"

// ── Modul A: Bedah Kode Bertingkat (MCQ statis, tanpa AI) ──
export interface Step {
  prompt: string // pertanyaan bedah (Bahasa Indonesia)
  options: string[] // 4 pilihan
  answer: number // index bener (0-3)
  explanation: string // koreksi analogi — muncul kalau jawaban salah
}

export interface TraceQuestion {
  kind: "trace"
  id: string // "trace-001"
  category: Category
  title: string
  snippet: string // kode yang dibedah
  steps: Step[] // 2-4 langkah bedah
  xp: number
  verified: "auto" | "manual" // auto = bisa di-run pure JS & dicek; manual = konseptual (react/tailwind)
}

// ── Modul B: Jelasin Pakai Kata-kata (dinilai AI) ──
export interface ExplainQuestion {
  kind: "explain"
  id: string
  category: Category
  title: string
  snippet: string
  prompt: string // "Jelaskan dengan kata-katamu sendiri..."
  rubric: string // panduan grading AI: istilah wajib + konsep inti
  sampleAnswer: string // jawaban model — buat QA kualitas AI pas nulis konten
  xp: number
  verified: "manual" // explain selalu manual (butuh AI buat nilai)
}

export type Question = TraceQuestion | ExplainQuestion

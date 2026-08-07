# Konteks Agent — AI Grading / Explain (M5, belum dibangun)

Planned for **M5**. Detail lengkap ada di `docs/adhd-prd-v1.4.md`. Ini ringkasan pemicu:

## Yang akan dibangun
- Fungsi `api/grade.ts` — serverless function (ARUD/Vercel) yang memanggil **NVIDIA NIM** buat menilai jawaban Explain.
- Endpoint: menerima `questionId` + input user, mengembalikan score + feedback analogi.

## Kontrak data (dari `src/content/types.ts`)
- `ExplainQuestion.rubric` — panduan grading AI: istilah wajib + konsep inti.
- `ExplainQuestion.sampleAnswer` — jawaban model, buat QA kualitas prompt AI.
- `ExplainQuestion.verified` selalu `"manual"` (butuh AI).

## Hal yang harus dijaga
- Prompt grading = rubric-driven, bahasa Indonesia.
- Output terstruktur → interop dengan UI `Session`.
- Jangan hardcode key di repo (`.env` / secret, ikut aturan Never).

## Sebelum bikin
1. Baca PRD section terkait (`docs/adhd-prd-v1.4.md`) untuk output schema.

> 💡 Ini dok context — belum implementasi. Jangan claim M5 selesai. Cek `docs/agents/frontend.md` buat pola UI pakai Textarea + Button.
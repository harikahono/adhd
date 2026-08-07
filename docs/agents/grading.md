# Konteks Agent — AI Grading / Explain (M5, LIVE)

Detail lengkap ada di `docs/adhd-prd-v1.4.md`. Ringkasan kondisi saat ini:

## Sudah dibangun
- `api/grade.ts` — serverless function (pola Vercel Web API handler) yang memanggil **NVIDIA NIM** buat menilai jawaban Explain.
  - `gradeExplain(q, answer, mode)` — pure async, bisa di-test via tsx.
  - `buildPrompt()` — rubric-driven, bahasa Indonesia, output JSON `{score, feedback, corrections}`.
  - `parseGrade()` → `extractLastJson()` — ambil JSON valid PALING BELAKANG dari respons (model suka nulis draft JSON).
  - Validasi: POST only (405), body wajib `question.id/prompt/rubric` + answer (400), answer ≤ 4000 char, NIM gagal → 502.
- `src/components/ExplainCard.tsx` — UI jawab explain: Textarea + deteksi paste (`onPaste` → badge "Ditempel" vs "Ditulis Manual") + tombol kirim + loading + tampil hasil (score/feedback/corrections/model) + fallback error + `onXp`/`onDone`.
- `scripts/verify-grade.ts` (npm script `verify:grade`) — test `gradeExplain` end-to-end; skip kalau key nggak ada.
- Urutan sesi di `src/routes/Session.tsx`: trace dulu, explain belakangan (satu daftar `session`).

## Kontrak data (dari `src/content/types.ts`)
- `ExplainQuestion.rubric` — panduan grading AI: istilah wajib + konsep inti.
- `ExplainQuestion.sampleAnswer` — jawaban model, buat QA kualitas prompt AI.
- `ExplainQuestion.verified` selalu `"manual"` (butuh AI).

## Jebakan model NIM (penting!)
- **Model reasoning (mis. `stepfun-ai/step-3.7-flash`) TIDAK dipakai** — output-nya di `message.reasoning`, `message.content` = `null`, dan reasoning ke-cut `max_tokens` sehingga JSON terpotong. Grade hasilnya 0 terus.
- Default saat ini: `deepseek-ai/deepseek-v4-flash-0731` (content normal, JSON bersih, bahasa Indonesia). Bisa diganti via `NIM_MODEL` di `.env`.
- `gradeExplain` fallback ke `msg.reasoning` kalau `content` null — jaga-jaga kalau model diganti.

## Hal yang harus dijaga
- API key HANYA di `.env` (sudah ada di `.gitignore`) — jangan pernah commit. Template: `.env.example`.
- Output terstruktur → interop dengan UI `Session` via `ExplainCard`.
- `pnpm verify:grade` butuh key di env — kalau tanpa key, dia skip dengan warning (exit 0), biar CI lokal tetap hijau.

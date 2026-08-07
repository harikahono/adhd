# Konteks Agent — Konten Soal (`src/content/`)

## Domain language

- **Soal / Question** — satu unit latihan. Dua jenis.
- **Trace / Bedah** (`TraceQuestion`) — bedah kode bertingkat, MCQ statis.
- **Explain / Jelasin** (`ExplainQuestion`) — tulis penjelasan, dinilai AI.
- **Step** — satu langkah MCQ dalam Trace.
- **verified** — `"auto"` (snippet di-run pure JS & dicek) atau `"manual"` (konseptual, butuh AI/inspeksi).

## Skema (`types.ts`)
```
Category = "js" | "react" | "tailwind"
Question = TraceQuestion | ExplainQuestion

TraceQuestion: kind, id, category, title, snippet, steps[2-4], xp, verified
  Step: prompt, options[4], answer(index), explanation

ExplainQuestion: kind, id, category, title, snippet, prompt, rubric, sampleAnswer, xp, verified
```

## rule emas
- `answer` = **index** jawaban benar (0-based), bukan teks.
- `snippet` ditulis sebagai **string literal** (pakai backtick / template escape) — karena di-render ke layar & di-run verifier.
- `xp` int kecil (10).
- ID: `trace-001`, `explain-002`, dst — banjir tanpa duplikat.

## Verified: `"auto"` vs `"manual"`
- **`"auto"`** — snippet berupa kode JS murni yang bisa dieksekusi oleh `scripts/verify-content.ts` untuk **mengecek output** step. Kalau nggak bisa di-run murni → jangan pilih auto.
- **`"manual"`** — konseptual (React/Tailwind) atau butuh AI grading. Snippet `react`/`tailwind` TIDAK boleh `auto` kecuali isinya JS murni.

## Menambah soal
1. Tambah object ke array `questions` di `questions.ts` (bisa di sembarang posisi).
2. Id harus unik.
3. Jalankan `pnpm verify:content` → harus hijau.
4. `pnpm typecheck` → harus hijau.

## Gaya koreksi (WAJIB)
Feedback `explanation` / koreksi pakai **analogi konkret sehari-hari** + bahasa lisan Indonesia:
- analogi: satpam seleksi (filter), pabrik modifikasi (map), lem super (fixed), papan tulis bareng (var), dll.
- JANGAN definisi kering / textbook.
- Aturan "1 real code snippet > 3 paragraf deskripsi."

## Avoid
- Jangan edit `types.ts` dulu — skema udah dipakai verifier. Ubah cuma kalau skema bener-bener gagal nampung konten nyata, dan ketat sinkron dengan `scripts/verify-content.ts`.
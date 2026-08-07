# A.D.H.D. — Any Dummy Handles Debugging

> **AI Detox for Human Developers.** Latihan harian 10-15 menit buat pulihkan
> muscle memory baca & nalar kode manual — karena AI yang ngerjain semua bikin
> otak developer tumpul di level sintaks.

## Kenapa

AI code assistant bikin lo cepet, tapi diam-diam bikin otak lo malas mikir.
Pas AI nggak bisa bantu (bug aneh, kode orang lain, interview), lo nyangkut.
A.D.H.D. rehab ringan ala Duolingo: bedah kode per-bagian, terus jelasin
pakai kata-kata lo sendiri — dua skill yang paling cepat tumpul.

## Fitur

- **Modul Bedah Kode Bertingkat** — satu snippet dipecah jadi MCQ bertingkat
  (2-4 langkah), feedback analogi instan per langkah. Statis, tanpa AI, jalan
  offline.
- **Modul Jelasin Pakai Kata-kata** — ketik penjelasan lo sendiri, AI nilai +
  koreksi kritis (rubric-driven). Ditulis manual, bukan ditempel dari AI.
- **Anti-paste, bukan anti-cheat** — tag "Ditulis Manual vs Ditempel", bukan
  blokir. Data pribadi di localStorage, 100% statis + 1 serverless function.
- **Streak & XP** — biar balik lagi besok.
- **Bilingual (ID/EN)** — switch bahasa di pojok kanan; konten soal & koreksi AI ikut bahasa yang dipilih.

## Stack

| Layer | Pilihan |
|---|---|
| Frontend | React 19 · Vite 8 · TypeScript 6 · Tailwind v4 |
| UI | shadcn/ui (Base UI, preset Nova) |
| Routing | React Router v8 (`react-router`) |
| AI grading | Serverless function (NVIDIA NIM) — `api/grade.ts` |
| Deploy | Vercel |

## Quickstart

```bash
pnpm install
pnpm dev             # jalankan app (http://localhost:5173)
pnpm verify:content  # validasi & verifikasi soal konten
pnpm typecheck       # cek tipe
pnpm build           # build produksi
```

## Struktur

```
src/
  content/       # soal (types.ts + questions.ts) + terjemahan EN (translations.ts)
  i18n/          # switch bahasa: strings.ts + I18nProvider (index.tsx)
  routes/        # landing, sesi, dashboard
  components/    # ui/ (shadcn) + shared (ExplainCard, LangToggle)
  lib/           # util (session, useProgress, localize)
docs/            # PRD + prototype desain
scripts/         # tooling dev (verify-content)
api/             # serverless AI grading (M5)
```

## Roadmap

- [x] M1 — Konten: 10 soal (7 trace + 3 explain)
- [x] M2 — Verifikasi konten (auto-run snippet + cek jawaban)
- [x] M3 — Fondasi app: Vite + shadcn + Router (repo ini)
- [x] M4 — Sesi interaktif (bedah kode bertingkat)
- [x] M5 — Explain dinilai AI (serverless, NVIDIA NIM)
- [x] M6 — Dashboard: streak & XP (localStorage) + fix streak putus
- [x] M7 — Switch bahasa ID/EN (UI + konten + AI grading)
- [ ] M8 — Landing polish + deploy Vercel

Detail lengkap: [docs/adhd-prd-v1.5.md](docs/adhd-prd-v1.5.md)

## Lisensi

MIT

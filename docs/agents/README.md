# Konteks Agent — A.D.H.D.

Folder ini berisi **konteks operasional per concern** buat AI coding agent.
AGENTS.md di root = ringkasan <150 baris (selalu dimuat). File di sini = detail
yang agent tarik hanya kalau menyentuh area itu — biar token nggak kebuang.

## Ref Arch Folder / Milestone
- [content.md](content.md) — skema & gimana bikin/ubah soal (`src/content/`). M1-M2.
- [frontend.md](frontend.md) — pola SPA, Base UI `render`, react-router v8, shadcn. M3; dipakai M4/M6/M7.
- [grading.md](grading.md) — AI grading Explain (NVIDIA NIM), `api/grade.ts`. M5.

## Cara pakai
- Menyentuh soal → baca `content.md`.
- Nambah komponen/halaman → baca `frontend.md`.
- Kerjaan AI grading → baca `grading.md`.

## Konvensi
- Ringkas, spesifik. Analogi > definisi.
- Selalu tutup dengan `pnpm typecheck` (+ `pnpm verify:content` kalau content).
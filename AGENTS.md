# AGENTS.md — A.D.H.D.

A.D.H.D. (Any Dummy Handles Debugging) — "AI Detox for Human Developers":
latihan harian buat pulihkan kemampuan baca & nalar kode manual, gaya Duolingo.
Bedah kode bertingkat + mode "jelasin" yang dinilai AI. Bahasa konten: **Indonesia**.

## Stack (yang nggak boleh bego)

- **Vite 8 + React 19.2 + TypeScript 6** — SPA pure, tanpa SSR.
- **Tailwind v4 CSS-first** — `@import "tailwindcss"` di `src/index.css`. TIDAK ada `tailwind.config.js`. Styling via utility class di komponen.
- **shadcn/ui (preset Nova, Base UI)** — komponen di `src/components/ui/`. JANGAN edit file `ui/*.tsx` (dikeluarkan oleh CLI, di-regenerate).
- **react-router v8** — import dari **`react-router`**, JANGAN dari `react-router-dom` (di-hapus di v8).
- **Base UI gotcha:** komponen pakai prop `render={<Link .../>}` bukan `asChild`. Saat render non-`<button>`, tambah `nativeButton={false}`.
- pnpm 11 — setting cuma di `pnpm-workspace.yaml` (format camelCase, `allowBuilds.esbuild: true` wajib).

## Commands

```bash
pnpm install          # install deps
pnpm dev              # dev server → http://localhost:5173
pnpm typecheck        # tsc --noEmit — WAJIB sebelum selesai
pnpm build            # tsc -b && vite build
pnpm verify:content   # runner konten: jalankan snippet + cek jawaban soal
pnpm format           # prettier
```

### ✅ Always
- `pnpm typecheck` hijau sebelum selesai.
- `pnpm verify:content` hijau kalau menyentuh `src/content/`.
- Commit: conventional (`feat:`, `fix:`, `chore:`, `docs:`) + concise.

### 🚫 Never
- Commit `.env`, secret, `*.local`.
- Import `react-router-dom` (v8 nggak ada) — pakai `react-router`.
- Edit langsung `src/components/ui/*` — regen pake `shadcn`.
- Edit `components.json` / `pnpm-workspace.yaml` tanpa alasan jelas.

## Konten soal (`src/content/`)

- `types.ts` — skema. `Question = TraceQuestion | ExplainQuestion`.
- `questions.ts` — data. Jangan diubah sampai bener-bener mau, karena dikoordinasi sama `scripts/verify-content.ts`.
- **TraceQuestion** (`kind:"trace"`): `steps` (2-4). `verified:"auto"` = snippet bisa di-run pure JS & dicek otomatis. `verified:"manual"` = konseptual (react/tailwind).
- **ExplainQuestion** (`kind:"explain"`): rubric-driven, `verified` selalu `"manual"` (butuh AI grading).
- Gaya koreksi: **analogi** + bahasa lisan Indonesia. "1 real code snippet > 3 paragraf deskripsi": jawab dengan analogi konkret (satpam, pabrik, lem super), bukan definisi kering.

## Arsitektur

- `src/routes/` — halaman: `Landing` (`/`), `Session` (`/session`), `Dashboard` (`/dashboard`).
- `src/content/` — data soal (statis, ditampilkan via import).
- `src/components/` — `ui/` (shadcn) + shared.
- `api/grade.ts` — serverless AI grading (M5), NVIDIA NIM.
- `docs/` — PRD `adhd-prd-v1.4.md` + `agents/` (konteks agent per concern) + `prototype/`.

## Progress (milestone)

- M1-M2 ✅ jenis-konten 10 soal + verifikasi
- M3 ✅ fondasi app (scaffold, shadcn, router, repo)
- M4 ✅ sesi interaktif trace (MCQ bertingkat + feedback instan + XP & streak localStorage)
- M5-M6 belum: explain AI (`api/grade.ts`), dashboard streak/XP penuh.
Baca `docs/adhd-prd-v1.4.md` buat detail spesifikasi sebelum kerjaan yang melibatkan fitur baru.
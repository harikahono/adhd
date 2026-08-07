# Konteks Agent — Arsitektur & Konvensi

## Routing (`react-router` v8)

- Import dari **`react-router`** saja. `react-router-dom` **tidak ada di v8**.
- Declarative mode dipakai: `BrowserRouter > Routes > Route`.
- Route saat ini: `/` (Landing), `/session` (Session), `/dashboard` (Dashboard), `*` (404).
- Navigation via `Link` dari `react-router`. Kalau butuh navigasi programatik → `useNavigate`.

## Base UI + shadcn (preset Nova)

- Komponen di `src/components/ui/*` — **di-generate CLI**, jangan edit langsung.
- Bedanya dari Radix/shadcn lama: **Base UI pakai prop `render`, bukan `asChild`.**
  - Bener: `<Button render={<Link to="/x" />} />`
  - Salah (nggak ada di Base UI): `<Button asChild>`
- Saat `render` menghasilkan **non-`<button>`** (mis. `<Link>`), **wajib** tambah `nativeButton={false}` biar nggak warning aksesbilitas:
  ```tsx
  <Button render={<Link to="/x" />} nativeButton={false}>Teks</Button>
  ```
- Komponen yang dipakai saat ini: `Button`, `Card`, `Badge`, `Progress`, `Textarea`.
- Styling: utility class Tailwind v4. Tema via CSS var di `index.css` + `theme-provider.tsx`.

## Config & alias

- `@/` → `src/*` (alias di `tsconfig` + `vite.config.ts`).
- `components.json` — registry shadcn, jangan diedit manual.
- `pnpm-workspace.yaml` — `allowBuilds.esbuild: true` wajib (pnpm 11 blokir build tanpa ini).

## Konvensi kode
- Prettier (format otomatis via `pnpm format`).
- Function component functional, export named.
- Ketik ketat TS — `pnpm typecheck` harus ijo.
- File path relatif: pakai alias `@/...`, bukan `../../`.

## Menambah halaman
1. Bikin file di `src/routes/`.
2. Tambah `<Route>` di `App.tsx`.
3. Kalau butuh navigasi, pakai `Link` / `useNavigate` dari `react-router`.
4. `pnpm typecheck` ijo.

## Avoid
- Import `react-router-dom`.
- Edit komponen `ui/*` langsung (regen).
- Nambah dependency tanpa alasan — pake stdlib/native dulu.
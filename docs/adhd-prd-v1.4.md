# Product Requirement Document (PRD) - MVP v1.4
## Nama Proyek: **A.D.H.D.** — *Any Dummy Handles Debugging*
**Tagline:** AI Detox for Human Developers
**Author:** Bintang | **Status:** Draft v1.4 (Pasca Grill) | **Tanggal:** Agustus 2026

> **Changelog dari v1.3:** Sesi grill lanjutan (9 Agustus 2026) — format soal berubah jadi **"Bedah Kode Bertingkat"** (satu snippet dipecah jadi MCQ kecil per bagian), Modul B **diredefinisi total** dari "Pseudocode-to-Syntax" jadi **"Jelasin Pakai Kata-kata"** (free-text dinilai AI via NVIDIA NIM — keputusan user, pola proxy mengikuti contract-policy), arsitektur berubah dari "zero-AI" jadi "statis + 1 titik AI proxy", scaffold dikunci ke shadcn `init -t vite` + React Router v8, tracing 100% MCQ. Detail di Section 12.

---

## 1. Latar Belakang & Masalah (The "Why")

Di era dominasi AI Code Assistant (Cursor, Copilot, v0), banyak developer tingkat *mid-to-senior* mengalami **"AI Brain Drain"**. Mereka memahami arsitektur makro dan logika sistem, namun memori motorik sintaks dasar (*syntax-level muscle memory*) mereka tumpul parah karena terlalu sering melakukan *prompting*.

Platform belajar saat ini (LeetCode, HackerRank) terlalu fokus pada algoritma rumit untuk interview kerja. Platform *typing practice* (typing.io, TypeQuicker) fokus ke kecepatan mengetik kode, bukan pemahaman logika. **Belum ada platform yang fokus ke rehabilitasi kemampuan *membaca & menalar* kode secara manual** — bukan mengetik cepat, tapi memahami alur.

**A.D.H.D.** hadir dengan pesan yang jujur ke diri sendiri: siapa pun — termasuk developer senior yang "otaknya udah manja sama AI" — bisa balik jago debugging manual kalau latihan konsisten. Nama ini sengaja self-deprecating, bukan olok-olok kondisi medis; pesannya *"nggak perlu jenius buat jago debugging lagi, cukup latihan"*.

---

## 2. Profil Pengguna (User Persona)

- **Persona Utama:** Developer Front-End (React/Next.js/Tailwind) tingkat *mid-to-senior*.
- **Karakteristik:** Sibuk (sering *freelance* atau kerja *full-time*), rentang perhatian pendek, frustrasi karena sering lupa sintaks dasar, *information overload* saat baca dokumentasi resmi yang kaku.

> **Catatan sensitivitas naming:** karena target persona eksplisit menyebut "rentang perhatian pendek", tim harus jaga tone marketing supaya nama A.D.H.D. terasa sebagai *self-aware humor* buat komunitas developer, bukan menyepelekan kondisi ADHD sungguhan. Copywriting landing page harus lolos review "apakah ini masih lucu kalau dibaca orang yang beneran ADHD?" sebelum publish.

---

## 3. Tujuan Produk (Product Goals)

- Membantu developer memulihkan *muscle memory* koding dalam 10-15 menit per hari.
- Menyediakan metode belajar berbasis **Analogi Praktikal** dan **Code Tracing** (membaca/menebak alur kode).
- Mendorong kejujuran & kesadaran diri soal ketergantungan AI selama sesi latihan — bukan memaksakan pembatasan teknis yang gak bisa ditegakkan.

---

## 4. Ruang Lingkup MVP (Scope of MVP)

### Fitur Utama (Core Features)

#### A. Modul Latihan "Code Tracing" (Tebak Alur Kode) — **Core Differentiator**

- **Deskripsi:** User disuguhkan potongan kode React/TypeScript/Tailwind pendek yang sering dipakai di dunia nyata. User diminta menebak *output*, status *state*, atau perubahan kelas CSS secara interaktif.
- **Format soal: "Bedah Kode Bertingkat"** *(keputusan grill v1.4)* — satu snippet dipecah menjadi **2-4 pertanyaan MCQ kecil**, tiap pertanyaan membedah satu konsep yang berbeda (contoh: bedah class `fixed` → bedah `inset-0` → bedah ternary `block/hidden`). Ini meniru gaya "mentor yang kritis" ala Gemini — koreksi per-bagian, bukan satu tebakan besar.
- **Mekanisme:** 100% Pilihan Ganda (MCQ) — **bukan isian singkat**. Alasan: tidak ada AI yang menilai di modul ini, komputer hanya bisa membedakan BENAR/SALAH secara tegas; modul B yang menangani jawaban terbuka.
- **Teknis Penilaian:** Tiap langkah (step) yang salah langsung memicu penjelasan kritis pakai analogi non-akademis (contoh: `&&` = "satpam yang malas" / short-circuit, `hidden` = "si div ngumpet total"). Feedback instan per langkah, bukan di akhir.
- **Prioritas:** Fitur paling defensible secara kompetitif — bangun ini duluan dan paling matang.

#### B. Modul "Jelasin Pakai Kata-kata" (Explain the Code) — dinilai AI

- **Deskripsi:** User disuguhkan snippet kode, lalu **mengetik penjelasan dengan kata-kata sendiri** ("Jelaskan gimana cara komputer membaca baris `{isOpen && <div>...}` ini"). AI menilai jawaban + memberi koreksi kritis ala Gemini.
- **Bentuk interaksi (contoh nyata dari sesi brainstorming):**
  - User: *"bacanya gini kali yee, kalo si saklar kebuka itu adalah true tanda && akan menggambar sebuah div..."*
  - AI: *"90% BENAR! Tapi ada 2 istilah teknis yang cara baca lo masih meleset: 1) `fixed` itu bukan nama div, itu utility class Tailwind... 2) 'Modal Pop-up Kebuka!' itu disebut Children/Text Content... Cara baca yang presisi ala FE Senior: ..."*
- **Mekanisme grading:** AI diberi **rubric per soal** (istilah wajib, konsep inti yang harus disebut) + snippet + jawaban user → AI mengembalikan nilai (persentase), koreksi istilah yang meleset, dan penjelasan analogi.
- **Kejujuran, bukan pemblokiran paksa:** deteksi event `paste` tetap dicatat transparan → hasil latihan ditandai **"Ditulis Manual"** vs **"Ditempel Sebagian/Penuh"** — user memilih integritas sendiri.
- **Editor:** textarea biasa — tidak perlu CodeMirror untuk mengetik penjelasan. *(CodeMirror ditunda, lihat Section 10)*

---

## 5. Kebutuhan Non-Fungsional (Non-Functional Requirements)

- **Aksesibilitas Tinggi:** Aplikasi harus sangat cepat diakses (berbasis web), minim distraksi visual, teks penjelasan singkat.
- **Keamanan Kode (requirement realistis):**
  - Tidak ada klaim "memblokir ekstensi AI di browser" — ini secara teknis tidak bisa dijamin dari sisi web app.
  - Editor latihan bebas autocomplete — v1 memakai textarea polos (modul explain), nol saran otomatis dari app.
- **Resiliensi AI:** Modul A (tracing) **100% statis, jalan tanpa internet**. Modul B butuh API AI; jika API error/key tidak ada, modul B menampilkan pesan "coba lagi nanti" — app utama tidak rusak.
- **Keamanan API key:** API key AI **tidak pernah** ada di client/browser. Semua request grading melewati proxy server-side (lihat Section 10).

---

## 6. Alur Pengguna (User Flow)

1. User masuk ke halaman utama (*Landing Page*).
2. User memilih modul harian (Contoh: "Hari ini: Bedah Hooks & State").
3. User menyelesaikan 3-5 soal *Code Tracing* cepat (10 menit) + 1-2 soal *Explain*.
4. User mendapatkan evaluasi dengan bahasa analogi yang mudah dicerna — instan per langkah (MCQ) atau koreksi kritis dari AI (explain).
5. Sesi selesai, status *streak* harian bertambah, user kembali ke pekerjaan utama.

---

## 7. Dashboard Progres Ringkas

Halaman sederhana untuk menjaga konsistensi latihan harian (*streak*), mirip konsep Duolingo tetapi untuk koding. Untuk MVP, cukup: jumlah streak, jumlah soal selesai per kategori, dan rasio "Ditulis Manual" vs "Ditempel".

---

## 8. Content Pipeline

- Menulis snippet real-world React/TS/Tailwind + analogi non-akademis adalah bottleneck utama MVP, bukan sandbox atau UI.
- **Format konten per tipe:**
  - Soal **trace**: snippet + 2-4 step MCQ (masing-masing 4 pilihan + explanation analogi).
  - Soal **explain**: snippet + prompt ("jelaskan...") + **rubric** (istilah wajib) + **sampleAnswer** (jawaban model, untuk QA kualitas AI saat menulis konten).
- **Komposisi 10 soal pertama (draft):** 8 JS/TS (array methods chaining, destructuring/spread edge case, closure & scope var-vs-let, hoisting, `this` binding, event loop setTimeout-vs-Promise, coercion, optional chaining/nullish) + 2 React konseptual (useEffect dependencies, stale closure di useState). Kategori `tailwind` menyusul di batch berikutnya (contoh soal bedah modal sudah disiapkan).
- **Target realistis MVP:** 30-40 soal. **Ship floor: 15-20 soal** — cukup buat rilis pertama, sisanya nambah post-deploy.
- **Estimasi effort:** ±20-30 menit per soal (trace) → 30 soal ≈ 10-15 jam; soal explain sedikit lebih lama karena harus menulis rubric + sampleAnswer.
- **Rekomendasi:** jangan mulai coding app sebelum minimal 10 soal pertama selesai ditulis, supaya schema data soal didesain dari konten nyata.

---

## 9. Rencana Rilis & Validasi Pasar (Go-to-Market Strategy)

> **Status: ditunda.** Keputusan user (sesi brainstorming): fokus ke product dulu, pemasaran belakangan.

- **Fase 1 (Pre-Validation):** Publikasikan cerita jujur soal masalah "AI Brain Drain" di LinkedIn/Twitter, sekaligus perkenalkan nama **A.D.H.D.** sebagai hook — ukur reaksi audience sebelum full commit ke nama ini secara publik.
- **Fase 2 (Landing Page):** Rilis *landing page* minimalis berisi 3 contoh soal Code Tracing interaktif gratis + tombol "Join Waitlist".
- **Fase 3 (SaaS):** Jika waitlist mencapai target (misal 500+ pendaftar), mulai kembangkan MVP penuh dengan sistem langganan bulanan.

---

## 10. Referensi Teknis (Starter & Tooling) — DIREVISI HASIL GRILL v1.4

| Kebutuhan | Keputusan | Catatan |
|---|---|---|
| Fondasi app | **From-scratch** — React + Vite + TypeScript + Tailwind | ~~`sanidhyy/duolingo-clone`~~ **DITOLAK**: itu Next.js full-stack (Postgres + Clerk auth + Stripe + react-admin), langsung membatalkan keputusan portfolio-first. Hanya jadikan **referensi desain schema gamifikasi** (challenges, hearts, quests), bukan basis kode |
| Scaffold | **`pnpm dlx shadcn@latest init -t vite`** (jalur resmi) + **React Router v8** | Baseline Vite 7 + React 19; React Router v8 non-breaking dari v7. Starter komunitas (Niteshcodes/vite-shadcn-starter, hayyi2/react-shadcn-starter) dievaluasi dan di-skip — setara shadcn init + router, tapi bukan jalur resmi |
| Editor modul B | **TEXTAREA biasa — CodeMirror DITUNDA** *(revisi v1.4)* | Modul B v1 = mengetik penjelasan (free-text), tidak butuh editor kode. CodeMirror 6 tanpa autocomplete tetap jadi keputusan **future work** kalau nanti ada modul "ketik sintaks" |
| AI grading proxy | **Vercel Serverless Function** (`api/grade.ts`, Node) — pola sama dengan `proxy.php` di proyek contract-policy: client → function → LLM, API key di env Vercel, **tidak pernah di client** | Alternatif lokal: proxy PHP + Laragon (pola contract-policy). Keputusan final menunggu konfirmasi deploy (Section 11 open items) |
| LLM Provider | **NVIDIA NIM** — model configurable (default `openai/gpt-oss-120b`, bisa gonta-ganti model dari katalog NIM) | Keputusan user: fleksibilitas ganti model tanpa ganti arsitektur. Catatan dari contract-policy: model gpt-oss-120b punya baked-in disclaimer — diatasi via prompt/rubric |
| Prototipe modul A | ~~`AbdulBasit313/React-Quiz-App-Template`~~ **Skip — from-scratch** | Modul A (MCQ + code snippet + feedback) terlalu sederhana untuk butuh template; adaptasi template justru menambah pekerjaan buang fitur tak terpakai (timer, MAQ, result flow) |
| Referensi desain | Figma: "Learning Skills Platform", "Streaks UI Kit" (opsional) | Kombinasikan struktur, jangan comot 1 template mentah — cek lisensi dulu |
| Dev-time validation | `verify-content.ts` (script Node) | Jalanin tiap snippet tracing pure JS → cocokkan expected answer sebelum masuk app. Soal React/Tailwind konseptual ditandai `verified: manual`. Soal explain selalu `verified: manual` (kualitas rubric dicek lewat sampleAnswer) |

---

## 11. Keputusan Arsitektur (LOCKED — hasil sesi grill 8-9 Agustus 2026)

| Aspek | Keputusan | Alasan |
|---|---|---|
| Stack | React + Vite + TS + Tailwind + shadcn/ui + React Router v8 | Boring default yang works, relevan untuk karir front-end; scaffold jalur resmi shadcn |
| Backend | **Statis + 1 titik AI proxy** — progress di localStorage, konten JSON lokal, `api/grade.ts` (serverless) khusus grading explain | Modul A tidak butuh server (MCQ compare index); modul B butuh proxy karena AI grading. Portfolio-first |
| Sandbox runner kode | **Tidak dibangun** | Tidak ada eksekusi kode user di app; grading = compare jawaban vs expected answer (MCQ) / AI rubric (explain) |
| Format soal Modul A | **Bedah Kode Bertingkat** — 1 snippet, 2-4 MCQ per bagian | Meniru gaya koreksi kritis per-konsep ala Gemini; feedback instan per langkah; grading tegas tanpa AI |
| Format soal Modul B | **Explain free-text** dinilai AI (rubric-driven) | Keputusan user: "baca kode → jelasin sendiri → AI koreksi" — persis pengalaman Gemini yang jadi inspirasi produk |
| Grading | MCQ: compare index (statis). Explain: AI + rubric per soal → nilai %, koreksi istilah, analogi | Zero AI di modul A = murah & offline; AI cuma di modul B |
| LLM Provider | **NVIDIA NIM**, model configurable | Keputusan user: katalog model banyak, ganti-ganti aman tanpa ubah arsitektur |
| API key | Hanya di server (env Vercel / .env lokal), lewat proxy | Client tidak pernah pegang key (pola contract-policy `proxy.php`) |
| Editor modul B | Textarea polos (v1) — CodeMirror ditunda | YAGNI: jelasin pakai kata-kata tidak butuh editor kode |
| Anti-copy-paste | Deteksi + tagging integritas "Manual vs Ditempel", bukan blokir | Blokir = security theater (mudah di-bypass) + merusak UX ADHD-friendly |
| Fondasi kode | From-scratch | Template duolingo-clone = full-stack berat, membatalkan keputusan portfolio-first |
| Urutan build | Konten dulu (10 soal) → schema → verify script → baru app | Schema didesain dari konten nyata, bukan asumsi (rekomendasi PRD Section 8) |
| Framing | Portofolio-first | Keputusan user; fase SaaS jadi future work |
| Anti-ekstensi AI browser | Tidak ada klaim blokir; mitigasi permukaan interaksi saja | Secara teknis tidak bisa dijamin dari sisi web |

**Open items (menunggu konfirmasi user):**
1. Deploy final: Vercel (dengan serverless function) vs Laragon lokal (proxy PHP). Rekomendasi: Vercel — satu tempat, otomatis, pattern function = proxy.
2. Komposisi sesi harian: rasio soal trace vs explain per sesi.

---

## 12. Schema Data Soal (v1.4)

```ts
// MCQ bedah bertingkat — modul A (statis, tanpa AI)
type Step = {
  prompt: string      // pertanyaan bedah (Bahasa Indonesia)
  options: string[]   // 4 pilihan
  answer: number      // index bener (0-3)
  explanation: string // koreksi analogi, muncul kalau salah
}

type TraceQuestion = {
  kind: "trace"
  id: string            // "trace-001"
  category: "js" | "react" | "tailwind"
  title: string         // "Bedah Modal Pop-up"
  snippet: string       // kode yang dibedah
  steps: Step[]         // 2-4 langkah bedah
  xp: number            // XP total per soal
  verified: "auto" | "manual"
}

// Jelasin pakai kata-kata — modul B (dinilai AI)
type ExplainQuestion = {
  kind: "explain"
  id: string
  category: "js" | "react" | "tailwind"
  title: string
  snippet: string
  prompt: string        // "Jelaskan cara komputer membaca baris ini..."
  rubric: string        // panduan grading AI: istilah wajib + konsep inti
  sampleAnswer: string  // jawaban model, buat QA kualitas AI pas nulis konten
  xp: number
  verified: "manual"    // explain selalu manual (butuh AI)
}
```

---

## 13. Ringkasan Perubahan Kunci

| Versi | Perubahan Utama |
|---|---|
| v1.0 → v1.1 | Fix anti-copy-paste (deteksi, bukan blokir), hapus requirement anti-ekstensi AI, tambah Content Pipeline |
| v1.1 → v1.2 | Rebrand nama: SyntaxGym → **A.D.H.D. (Any Dummy Handles Debugging)**, tambah catatan sensitivitas naming, tambah referensi teknis starter/tooling |
| v1.2 → v1.3 | **Hasil grill:** duolingo-clone dibuang (full-stack, nabrak keputusan), editor disepakati CodeMirror tanpa autocomplete, template quiz di-skip, kontradiksi internal v1.2 di-resolve, tambah Section 11 Keputusan Arsitektur Locked |
| v1.3 → v1.4 | **Hasil grill lanjutan:** format soal "Bedah Kode Bertingkat" (MCQ per bagian), Modul B **diredefinisi** jadi "Jelasin Pakai Kata-kata" dinilai AI (NVIDIA NIM via proxy, pola contract-policy), arsitektur "statis + 1 titik AI", CodeMirror ditunda (textarea dulu), scaffold shadcn + React Router v8, tracing 100% MCQ, schema 2 tipe soal (trace/explain) |

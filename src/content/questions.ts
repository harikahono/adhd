// ============================================================
// KONTEN SOAL — M1 (10 soal: 7 trace + 3 explain)
// ============================================================

import type { Question } from "./types"

export const questions: Question[] = [
  // ════════════════════════════════════════════════════════════
  // 1. TRACE — Tailwind (Contoh Bawaan)
  // ════════════════════════════════════════════════════════════
  {
    kind: "trace",
    id: "trace-001",
    category: "tailwind",
    title: "Bedah Modal Pop-up",
    snippet: `<div className={\`fixed inset-0 bg-black \${isOpen ? 'block' : 'hidden'}\`}>`,
    steps: [
      {
        prompt: "Apa fungsi class `fixed` di baris itu?",
        options: [
          "Elemen menempel di posisi layar, nggak ikut scroll",
          "Elemen gabisa diklik sama user",
          "Elemen selalu paling depan",
          "Elemen penuh layar",
        ],
        answer: 0,
        explanation:
          "`fixed` itu kayak nempel pake lem super ke layar — coba lo scroll, dia bakal diam di tempat, nggak ikut jalan. Buat 'paling depan' itu job-nya `z-index`, beda orang. Dan 'penuh layar' itu job-nya `inset-0`.",
      },
      {
        prompt: "Saat isOpen bernilai FALSE, class apa yang kepasang?",
        options: [
          "block — modal muncul",
          "hidden — modal ngumpet",
          "keduanya",
          "error — sintaks patah",
        ],
        answer: 1,
        explanation:
          "Ternary itu if-else satu baris: isOpen false → yang dipilih sisi kanan titik dua, yaitu 'hidden'. Dan hidden = display:none = si div ngumpet total, bukan cuma transparan.",
      },
      {
        prompt: "Saat isOpen bernilai TRUE, class final div-nya apa?",
        options: [
          "fixed inset-0 bg-black block",
          "fixed inset-0 bg-black hidden",
          "fixed inset-0 bg-black",
          "fixed inset-0 bg-black block hidden",
        ],
        answer: 0,
        explanation:
          "Ternary milih SATU nilai, bukan dua-duanya. isOpen true → pilih 'block'. Jadi class final: fixed inset-0 bg-black block — modal kelihatan.",
      },
    ],
    xp: 10,
    verified: "manual",
  },

  // ════════════════════════════════════════════════════════════
  // 2. EXPLAIN — React (Contoh Bawaan)
  // ════════════════════════════════════════════════════════════
  {
    kind: "explain",
    id: "explain-001",
    category: "react",
    title: "Satpam yang Malas",
    snippet: `{isOpen === true && <div className="fixed">Modal Kebuka!</div>}`,
    prompt:
      "Jelaskan dengan kata-katamu sendiri: gimana cara komputer membaca baris di atas? Apa yang terjadi saat isOpen bernilai true, dan saat false?",
    rubric:
      "WAJIB disebut: (1) conditional rendering, (2) && = short-circuit — dibaca dari kiri, (3) kalau kiri false → langsung stop, bagian kanan nggak dirender, (4) kalau kiri true → <div> dirender. BONUS kalau nyebut JSX / expression / boolean. Nilai >=90% kalau semua poin wajib ada.",
    sampleAnswer:
      "Komputer baca dari kiri: cek isOpen === true dulu. Karena && itu short-circuit — kayak satpam yang malas — kalau hasil kiri false, dia langsung stop dan nggak jalan ke kanan, jadi <div> nggak dirender. Tapi kalau isOpen true, dia lanjut ke kanan dan me-render <div className='fixed'>Modal Kebuka!</div> ke layar. Ini namanya conditional rendering.",
    xp: 10,
    verified: "manual",
  },

  // ════════════════════════════════════════════════════════════
  // 3. TRACE — Array methods chaining (JS)
  // ════════════════════════════════════════════════════════════
  {
    kind: "trace",
    id: "trace-002",
    category: "js",
    title: "Bedah Rantai Array",
    snippet: `const nums = [1, 2, 3];\nconst res = nums.filter(n => n > 1).map(n => n * 2);`,
    steps: [
      {
        prompt:
          "Setelah melewati .filter(n => n > 1), isi array sementaranya jadi apa?",
        options: ["1, 2, 3", "2, 3", "false, true, true", "error"],
        answer: 1,
        explanation:
          "Filter itu satpam seleksi. Syaratnya n harus lebih dari 1. Angka 1 gagal masuk, angka 2 dan 3 lolos. Hasilnya [2, 3]. Kalau lu jawab false/true, itu cara kerjanya, tapi yang di-return adalah value aslinya yang lolos seleksi.",
      },
      {
        prompt:
          "Setelah .map(n => n * 2) selesai jalan, apa nilai dari variabel `res`?",
        options: ["2, 4, 6", "4, 6", "2, 3", "undefined"],
        answer: 1,
        explanation:
          "Map itu pabrik modifikasi. Modal dari step sebelumnya adalah [2, 3]. Masing-masing dikali 2, jadinya [4, 6]. Nggak mungkin [2, 4, 6] karena angka 1 udah dibuang sama satpam filter di awal.",
      },
      {
        prompt: "Sekarang, coba cek variabel `nums` aslinya. Apa isinya?",
        options: ["1, 2, 3", "4, 6", "2, 3", "kosong"],
        answer: 0,
        explanation:
          "Map dan Filter itu method 'ramah lingkungan'. Mereka bikin array BARU sebagai output, dan nggak pernah ngerusak array original. `nums` bakal tetap suci [1, 2, 3].",
      },
    ],
    xp: 10,
    verified: "auto",
  },

  // ════════════════════════════════════════════════════════════
  // 4. TRACE — Closure var-vs-let (JS)
  // ════════════════════════════════════════════════════════════
  {
    kind: "trace",
    id: "trace-004",
    category: "js",
    title: "Bedah Ilusi Loop",
    snippet: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}`,
    steps: [
      {
        prompt: "Apa output yang muncul di console setelah 100ms?",
        options: ["0, 1, 2", "1, 2, 3", "3, 3, 3", "error"],
        answer: 2,
        explanation:
          "Jebakan Batman tertua di JS. `var` itu kayak 1 papan tulis buat bareng-bareng. Loop jalan cepat banget nulis 0, 1, 2, dan berhenti di 3. Pas 100ms kemudian `setTimeout` nengok ke papan tulis, yang tersisa ya cuma angka terakhir: 3. Makanya muncul 3, 3, 3.",
      },
      {
        prompt: "Bagaimana cara benerin kodenya biar outputnya jadi 0, 1, 2?",
        options: [
          "Ganti setTimeout jadi setInterval",
          "Ganti var jadi let",
          "Ganti var jadi const",
          "Turunin delay dari 100 ke 0",
        ],
        answer: 1,
        explanation:
          "`let` itu kayak ngasih buku catatan personal per iterasi loop. Loop pertama nyimpen 0 di bukunya sendiri, loop kedua nyimpen 1, dst. Pas setTimeout jalan, dia baca catatan pribadinya masing-masing. (Const bakal error pas `i++`).",
      },
    ],
    xp: 10,
    verified: "auto",
  },

  // ════════════════════════════════════════════════════════════
  // 5. TRACE — Hoisting (JS)
  // ════════════════════════════════════════════════════════════
  {
    kind: "trace",
    id: "trace-005",
    category: "js",
    title: "Bedah Mesin Waktu JS",
    snippet: `console.log(nama);\nvar nama = "Jarvis";\n\nconsole.log(sapa());\nfunction sapa() { return "Halo!"; }`,
    steps: [
      {
        prompt: "Apa hasil eksekusi baris pertama: `console.log(nama);`?",
        options: ["Jarvis", "undefined", "ReferenceError", "null"],
        answer: 1,
        explanation:
          "Karena 'var', variabelnya diangkat ke atas (hoisted) tapi ISINYA ditinggal. Kayak lu pesen meja di restoran atas nama 'nama', mejanya ada (nggak error), tapi makannya belum dateng (undefined). Kalau pakai 'let', baru kena ReferenceError.",
      },
      {
        prompt: "Apa hasil eksekusi baris ketiga: `console.log(sapa());`?",
        options: ["Halo!", "undefined", "TypeError", "ReferenceError"],
        answer: 0,
        explanation:
          "Function declaration (function biasa) ini berstatus VIP. Sama JS, SATU BADAN function diangkat (hoisted) ke paling atas sebelum kode dieksekusi. Makanya lu bisa manggil sebelum deklarasinya ditulis.",
      },
    ],
    xp: 10,
    verified: "auto",
  },

  // ════════════════════════════════════════════════════════════
  // 6. TRACE — this binding (JS)
  // ════════════════════════════════════════════════════════════
  {
    kind: "trace",
    id: "trace-006",
    category: "js",
    title: "Bedah Identitas Si 'this'",
    snippet: `const user = {\n  nama: "Stark",\n  getNamaBiasa: function() { return this.nama; },\n  getNamaArrow: () => { return this.nama; }\n};`,
    steps: [
      {
        prompt: "Kalau lu panggil `user.getNamaBiasa()`, outputnya apa?",
        options: ["Stark", "undefined", "error", "window"],
        answer: 0,
        explanation:
          "Function biasa itu pragmatis: `this` adalah SIAPA YANG MANGGIL dia. Karena yang manggil adalah `user` (ada di sbelah kiri titik), maka `this` merujuk ke object `user` tersebut.",
      },
      {
        prompt: "Kalau lu panggil `user.getNamaArrow()`, outputnya apa?",
        options: [
          "Stark",
          "undefined (atau error di strict mode)",
          "null",
          "user",
        ],
        answer: 1,
        explanation:
          "Arrow function itu rebel, dia nggak punya `this` sendiri. Dia minjem `this` dari tempat dia diciptakan (lexical scope), dalam hal ini scope luar object (window/global). Di luar nggak ada `nama`, jadi undefined deh.",
      },
    ],
    xp: 10,
    verified: "auto",
  },

  // ════════════════════════════════════════════════════════════
  // 7. TRACE — Coercion (JS)
  // ════════════════════════════════════════════════════════════
  {
    kind: "trace",
    id: "trace-007",
    category: "js",
    title: "Bedah Matematika Ajaib",
    snippet: `const a = "1" + 1;\nconst b = "1" - 1;`,
    steps: [
      {
        prompt: "Berapa nilai dari variabel `a`?",
        options: ["2", `"2"`, `"11"`, "NaN"],
        answer: 2,
        explanation:
          "Tanda plus (+) itu mak comblang string. Kalau salah satunya string, JS malas ngitung matematika dan milih ngikut aja digabung jadi teks: '1' jejer 1 jadi '11'.",
      },
      {
        prompt: "Berapa nilai dari variabel `b`?",
        options: ["0", `"0"`, `""`, "NaN"],
        answer: 0,
        explanation:
          "Tanda minus (-) itu guru matematika galak. Nggak ada ceritanya teks dikurang teks. Dia bakal paksa string '1' berubah jadi angka beneran, lalu dihitung matematis: 1 - 1 = 0.",
      },
    ],
    xp: 10,
    verified: "auto",
  },

  // ════════════════════════════════════════════════════════════
  // 8. TRACE — useEffect dependencies (React)
  // ════════════════════════════════════════════════════════════
  {
    kind: "trace",
    id: "trace-008",
    category: "react",
    title: "Bedah Rem Blong useEffect",
    snippet: `useEffect(() => {\n  console.log("Sinkronisasi!");\n}, []);`,
    steps: [
      {
        prompt: "Kapan tulisan 'Sinkronisasi!' akan muncul di console?",
        options: [
          "Tiap kali state apapun di komponen berubah",
          "Cuma sekali, saat komponen pertama kali dirender (mount)",
          "Tidak akan pernah muncul karena array kosong",
          "Tiap 1 detik",
        ],
        answer: 1,
        explanation:
          "Array kosong `[]` itu ibarat pass VIP buat pembukaan toko doang. Effect-nya cuma dijalanin SATU KALI pas komponen awal nampil, terus udah, dia cabut. Kalau lu milih opsi 1, itu kejadian kalau array-nya dihapus total.",
      },
      {
        prompt:
          "Kalau array kosong `[]` (termasuk komanya) KITA HAPUS, apa yang terjadi?",
        options: [
          "Sama aja, cuma sekali jalan",
          "Error syntax",
          "Jalan tiap kali ADA state/props apapun yang berubah di komponen itu",
          "Jalan pas komponen dihapus (unmount)",
        ],
        answer: 2,
        explanation:
          "Tanpa array dependency sama sekali, useEffect itu rem blong. Tiap ada perubahan sekecil apapun di komponen (render ulang), dia bakal terus-terusan dieksekusi. Boros resource, bisa bikin infinite loop kalau lu update state di dalemnya.",
      },
    ],
    xp: 10,
    verified: "manual",
  },

  // ════════════════════════════════════════════════════════════
  // 9. EXPLAIN — Event loop (JS)
  // ════════════════════════════════════════════════════════════
  {
    kind: "explain",
    id: "explain-002",
    category: "js",
    title: "Bedah Antrian VIP",
    snippet: `setTimeout(() => console.log('A'), 0);\nPromise.resolve().then(() => console.log('B'));\nconsole.log('C');`,
    prompt:
      "Dari kode di atas, urutan print di console adalah C, lalu B, terakhir A. Jelaskan pakai kata-katamu sendiri kenapa urutannya bisa begitu, padahal setTimeout delay-nya 0ms?",
    rubric:
      "WAJIB disebut: (1) C adalah synchronous (langsung dieksekusi di Call Stack). (2) B adalah Promise yang masuk Microtask Queue. (3) A adalah setTimeout yang masuk Macrotask Queue. (4) Event Loop SELALU memprioritaskan Microtask (Promise) sampai habis sebelum mengeksekusi Macrotask (setTimeout).",
    sampleAnswer:
      "'C' jalan duluan karena dia kode biasa (synchronous) yang langsung diproses di kasir (Call stack). Nah, pas kasir kosong, JS ngecek antrian nunggu. Promise itu masuk antrian Microtask (antrian VIP prioritas), sedangkan setTimeout masuk Macrotask (antrian reguler). Walaupun delay setTimeout 0, Event Loop JS punya hukum mutlak: habisin dulu semua antrian VIP (keluar 'B'), baru layanin antrian reguler (keluar 'A').",
    xp: 10,
    verified: "manual",
  },

  // ════════════════════════════════════════════════════════════
  // 10. EXPLAIN — Optional chaining & nullish (JS)
  // ════════════════════════════════════════════════════════════
  {
    kind: "explain",
    id: "explain-003",
    category: "js",
    title: "Bedah Sabuk Pengaman",
    snippet: `const displayName = user?.profile?.name ?? 'Anonim';`,
    prompt:
      "Jelaskan cara kerja baris kode di atas! Apa fungsi dari tanda `?.` dan `??`, dan dalam kondisi persis seperti apa string 'Anonim' akan dipakai?",
    rubric:
      "WAJIB disebut: (1) `?.` (optional chaining) mencegah error kalau `user` atau `profile` bernilai null/undefined (langsung return undefined tanpa crash). (2) `??` (nullish coalescing) memberikan nilai fallback. (3) 'Anonim' hanya dipakai JIKA hasil sebelah kiri bernilai null atau undefined (bukan nilai falsy lain seperti 0 atau string kosong).",
    sampleAnswer:
      "Tanda `?.` (optional chaining) itu sabuk pengaman biar web lu nggak crash (Cannot read properties of undefined). Kalau `user` atau `profile` belum ada / masih loading, dia stop nyari dan langsung ngasih `undefined`. Terus, tanda `??` (nullish coalescing) itu ban serep: kalau aja hasil di sisi kirinya itu `null` atau `undefined`, dia bakal otomatis masukin nilai default di kanan, yaitu 'Anonim'.",
    xp: 10,
    verified: "manual",
  },
]

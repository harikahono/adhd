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

  // ════════════════════════════════════════════════════════════
  // 11. TRACE — Tailwind (Responsive Grid) (M8 — kapal floor 15+)
  // ════════════════════════════════════════════════════════════
  {
    kind: "trace",
    id: "trace-009",
    category: "tailwind",
    title: "Bedah Grid Responsif",
    snippet: `<div className="grid grid-cols-1 gap-4 md:grid-cols-3">`,
    steps: [
      {
        prompt: "Di layar kecil (mobile), berapa kolom yang kepasang?",
        options: ["1 kolom", "3 kolom", "4 kolom", "automatic ngikutin konten"],
        answer: 0,
        explanation:
          "Grid itu kabinet rak yang ikut aturan baku dari kiri: `grid-cols-1` = paling depan, kepasang duluan. Di layar kecil, sisanya (`md:grid-cols-3`) nganggur karena prefiks `md:` itu cuma aktif lewat breakpoint medium.",
      },
      {
        prompt: "Kapan baris `md:grid-cols-3` mulai kepasang?",
        options: [
          "Pas lebar layar >= 768px (medium)",
          "Pas lebar layar <= 768px",
          "Setiap saat, selalu",
          "Nggak pernah — md cuma buat debug",
        ],
        answer: 0,
        explanation:
          "`md:` itu kayak pompa yang mulai kerja kalau lebar layar udah sampe titik medium (≥768px di Tailwind default). Di bawah itu, aturan dasar (`grid-cols-1`) yang jalan — mobile-first.",
      },
      {
        prompt: "Fungsi `gap-4` di baris itu apa?",
        options: [
          "Beri jarak antar kolom & baris dalam grid",
          "Beri padding di dalam tiap kolom",
          "Jarak antar halaman",
          "Biar grid selalu di tengah",
        ],
        answer: 0,
        explanation:
          "`gap` itu jarak antar sel di grid — kayak kursi kosong antar meja di ruang meeting. `-4` = 1rem (16px). Kalau mau jarak antar kolom doang, pakai `gap-x`; antar baris pakai `gap-y`.",
      },
    ],
    xp: 10,
    verified: "manual",
  },

  // ════════════════════════════════════════════════════════════
  // 12. TRACE — Tailwind (Flexbox) (M8)
  // ════════════════════════════════════════════════════════════
  {
    kind: "trace",
    id: "trace-010",
    category: "tailwind",
    title: "Bedah Antrian Flexbox",
    snippet: `<header className="flex items-center justify-between px-4">`,
    steps: [
      {
        prompt: "Tanpa `flex`, header di atas bakal tampil seperti apa?",
        options: [
          "Numpuk ke bawah (block)",
          "Sejajar berjejer ke samping",
          "Hilang total",
          "Posisi beneran nggak bisa",
        ],
        answer: 0,
        explanation:
          "HTML baris itu defaultnya block — kayak tumpukan kardus di gudang, tiap anak numpuk turun. `flex` naikin ke saman jadi lorong; anak-anaknya jadi bisa ngantri samping-samping.",
      },
      {
        prompt: "Apa yang dilakukan `justify-between`?",
        options: [
          "Sisanya di antara konten, ujung item nempel ke sisi kanan-kiri",
          "Gabung semua item jadi satu di tengah",
          "Beri jarak merata, sebelum-udahnya juga",
          "Item paling belakang balik ke baris baru",
        ],
        answer: 0,
        explanation:
          "Sumbu horizontal: `justify-between` ngejar item pertama ke kiri, item terakhir ke kanan, sisanya ditebar di antara. Kayak trukin bola billiard ke dua sisi meja — memanggang separuh.",
      },
      {
        prompt: "`items-center` mengatur apa?",
        options: [
          "Align item di sumbu vertikal",
          "Align item di sumbu horizontal",
          "Bikin item jadi lingkaran",
          "Center semua kelas lain juga",
        ],
        answer: 0,
        explanation:
          "`items-center` (= align-items: center) ngunci posisi di sumbu vertikal, jadi logo dan teks di sampingnya bakal segaris di tengah. Kalau bedah horizontal, itu urusan `justify-*`. Dua-duanya anak dari class `flex`.",
      },
    ],
    xp: 10,
    verified: "manual",
  },

  // ════════════════════════════════════════════════════════════
  // 13. TRACE — JS (Destructuring) (M8)
  // ════════════════════════════════════════════════════════════
  {
    kind: "trace",
    id: "trace-011",
    category: "js",
    title: "Bedah Unpacking Vacuum",
    snippet: `const [a, b, ...rest] = [1, 2, 3, 4];\nconsole.log(a, b, rest);`,
    steps: [
      {
        prompt: "Setelah unpacking, berapa nilai variabel `a` dan `b`?",
        options: [
          "a=1, b=2",
          "a=1, b=3",
          "a=1, b=undefined",
          "error — sintaks nggak valid",
        ],
        answer: 0,
        explanation:
          "Destructuring ala unpacking vacuum: posisi beneran terima urutan dari kiri. `const [a, b]` ambil index 0 dan 1 dari array → a=1, b=2.",
      },
      {
        prompt: "Apa isi variabel `rest` setelah unpacking?",
        options: ["[3, 4]", "[2, 3, 4]", "3", "error"],
        answer: 0,
        explanation:
          "`...rest` (rest operator) ngumpulin SISA array yang nggak di-ambil, dan hasilnya SELALU array baru. Bukan angka 3, tapi sisa semuanya: [3, 4].",
      },
    ],
    xp: 10,
    verified: "auto",
  },

  // ════════════════════════════════════════════════════════════
  // 14. TRACE — JS (template literal) (M8)
  // ════════════════════════════════════════════════════════════
  {
    kind: "trace",
    id: "trace-012",
    category: "js",
    title: "Bedah Cetakan Template",
    snippet: "const n = 42;\nconst msg = `Jawaban: ${n}`;\nconsole.log(msg);",
    steps: [
      {
        prompt: "Setelah masuk ke template literal, apa nilai `msg`?",
        options: [
          '"Jawaban: 42"',
          "'Jawaban: ${n}'",
          '"Jawaban: [42]"',
          "error — n bikin string patah",
        ],
        answer: 0,
        explanation:
          "Backtick itu cetakan: `${n}` dibaca sebagai ekspresi (di-evaluate), bukan teks kosong. Jadi `msg` berisi 'Jawaban: 42'. Kalau pakai kutip biasa, ekspresi di dalamnya nggak dievaluasi dan tetap jadi teks `${n}`.",
      },
      {
        prompt: "Template literal selain string biasa, bisa dipakai untuk?",
        options: [
          "Multi-line string tanpa escape \\n",
          "Hanya satu kata",
          "Persis sama kayak kutip satu",
          "Nggak boleh di nested",
        ],
        answer: 0,
        explanation:
          "Backtick otomatis nyimpen line break asli tanpa perlu `\\n` — paling enak buat blok teks panjang. Ekspresi `${expr}` juga bisa pakai apa pun (fungsi, variabel). Itu kenapa string dinamis modern prefer backtick.",
      },
    ],
    xp: 10,
    verified: "auto",
  },

  // ════════════════════════════════════════════════════════════
  // 15. EXPLAIN — React (State & Re-render) (M8)
  // ════════════════════════════════════════════════════════════
  {
    kind: "explain",
    id: "explain-004",
    category: "react",
    title: "Bedah Siklus Re-render",
    snippet: `function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}`,
    prompt:
      "Jelaskan dengan kata-katamu sendiri: pas tombol diklik, apa yang terjadi sampai angka di layar berubah? Kenapa UI-nya update padahal nggak ada HTML yang ditulis ulang?",
    rubric:
      "WAJIB disebut: (1) setCount mengubah state, (2) perubahan state memicu re-render komponen, (3) re-render = React memanggil ulang fungsi komponen, (4) nilai baru count dibaca saat render → UI ikut. BONUS kalau jelasin kenapa nggak perlu update DOM manual.",
    sampleAnswer:
      "Pas diklik, React jalanin `setCount(count + 1)` — itu kayak nulis angka baru di papan tulis state. Abis itu React otomatis manggil ulang fungsi komponen (re-render). Pas render ulang, fungsi baca nilai state yang paling baru (count = 1), hasilnya dipasang ke JSX. Jadi angka di layar naik — dan semua ini otomatis, beda dengan jaman dulu harus update DOM pakai document.getElementById manual.",
    xp: 10,
    verified: "manual",
  },

  // ════════════════════════════════════════════════════════════
  // 16. EXPLAIN — React (useEffect cleanup) (M8)
  // ════════════════════════════════════════════════════════════
  {
    kind: "explain",
    id: "explain-005",
    category: "react",
    title: "Bedah Resik-resik useEffect",
    snippet: `useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);`,
    prompt:
      "Jelaskan dengan kata-katamu sendiri: kenapa `clearInterval(id)` ada di fungsi return? Apa jadinya kalau cleanup itu nggak ada? (petunjuk: bayangin komponen ini dimuat & ditutup berkali-kali)",
    rubric:
      "Harus ada: (1) return di useEffect = cleanup function, (2) jalan pas komponen unmount / sebelum effect dijalanin ulang, (3) tanpa clearInterval → interval terus jalan walau komponen udah dihapus → memory leak + callback jalan ke komponen lama. BONUS kalau nyebut: unmount + mount ulang = perlu bersihin.",
    sampleAnswer:
      "Return yang ada di dalam useEffect itu 'cleanup': karcis pulang yang dijalankan pas komponen mau dihapus (unmount). `clearInterval(id)` berhentikan timer biar nggak jalan terus. Kalau cleanup ilang, interval bakal tetap nembak setiap 1 detik walau komponen udah nggak ada — itu leak: si pencuri jam tangan terus nyuri padahal toko udah tutup, bikin memory nggelindir doang.",
    xp: 10,
    verified: "manual",
  },
]

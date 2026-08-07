// ============================================================
// strings.ts — semua UI string, keyed, bilingual (id / en)
// Pakai lewat useI18n().t(). Konten soal terjemahan ada di
// src/content/translations.ts — ini khusus komponen UI.
// ============================================================

export type Lang = "id" | "en"

export const STRINGS = {
  id: {
    badgeTitle: "AI Detox for Human Developers",
    landingH1:
      "Pulihin nalar kode yang udah tumpul gara-gara AI ngerjain semuanya.",
    landingDeck:
      "Rehab ringan buat otak yang tumpul gara-gara AI ngerjain semuanya. Bedah kode per-bagian, terus jelasin pakai kata-kata lo sendiri.",
    landingTodayCard: "Latihan hari ini",
    landingTodayDesc:
      "Sesi hari ini: {trace} bedah kode + {explain} jelasin (dinilai AI). Total {total} soal siap.",
    landingCta: "Buktikan Lo Masih Jago",
    landingListTitle: "Daftar soal",
    landingKindTrace: "Bedah kode bertingkat",
    landingKindExplain: "Jelasin pakai kata-kata",
    landingDemoNote:
      "Nama ini sengaja self-deprecating. Bukan soal diagnosa — soal latihan.",
    sessionExit: "← Keluar",
    sessionDoneTitle: "Sesi selesai 🎉",
    sessionDoneBody: "Kamu ngerjain {n} soal. XP yang didapat hari ini: +{xp}.",
    sessionTotalXp: "Total XP: {xp}",
    sessionStreak: "Streak: {n} hari",
    sessionPlayAgain: "Main lagi",
    sessionBackHome: "Kembali ke beranda",
    sessionExplainStep: "Soal {i}/{n} · Jelasin pakai kata-kata (dinilai AI)",
    sessionTraceStep: "Soal {i}/{n} · Step {s}/{t}",
    sessionWrongTitle: "Hampir — bedah lagi langkah ini:",
    sessionRetry: "Coba lagi",
    sessionNext: "Lanjut →",
    sessionFinish: "Selesai soal ✓",
    explainPasted: "Ditempel",
    explainManual: "Ditulis Manual",
    explainGood: "Lumayan!",
    explainOk: "Bisa lebih",
    explainLow: "Perlu dibedah ulang",
    explainPlaceholder:
      "Jelasin pakai kata-kata lo sendiri. Nggak apa-apa nggak rapi — yang penting nalarnya keliatan.",
    explainIntegrity:
      "Tag integritas otomatis: paste = “Ditempel”. Kejujuran pilihan lo.",
    explainSubmit: "Kirim Jawaban",
    explainLoading: "Menilai...",
    explainErrorTitle: "Gagal menilai.",
    explainErrorBody:
      "Layanan AI grading lagi bermasalah. Coba lagi nanti — progress trace lo aman.",
    explainRetry: "Coba lagi",
    explainCorrections: "Istilah yang meleset:",
    explainRewrite: "Tulis ulang jawaban",
    explainNext: "Soal berikutnya →",
    dashboardTitle: "Dashboard",
    dashboardSubtitle: "Konsistensi latihan harian lo.",
    dashboardStreakBroken: "(putus — lanjutin hari ini!)",
    dashboardStreakDays: "hari",
    dashboardXp: "⚡ XP total: {xp}",
    dashboardDone: "✅ {n} soal selesai",
    dashboardCatTitle: "Soal selesai per kategori",
    dashboardCatCount: "{n} soal ({p}%)",
    dashboardExplainTitle: "Jelasin pakai kata-kata",
    dashboardEmptyExplain:
      "Belum ada soal explain yang dikerjain. Integritas lo: jujur itu nilainya.",
    dashboardManual: "Ditulis Manual",
    dashboardPastedNote:
      "Ditempel: {n}. Tag integritas otomatis dari tombol “Ditempel” — rasio ini cuma buat lo sendiri, nggak dihukum.",
    dashboardCta: "Mulai sesi hari ini",
    appNotFound: "404 — kayak variabel yang nggak pernah di-declare.",
    appBackHome: "Balik ke beranda",
  },
  en: {
    badgeTitle: "AI Detox for Human Developers",
    landingH1:
      "Bring back the code-reading skill that went soft while AI did all the work.",
    landingDeck:
      "Light rehab for brains gone mushy because AI does all the heavy lifting. Read code piece by piece, then explain it in your own words.",
    landingTodayCard: "Today's workout",
    landingTodayDesc:
      "Today's session: {trace} code dissections + {explain} explanations (AI-graded). {total} questions ready.",
    landingCta: "Prove You Still Got It",
    landingListTitle: "Questions",
    landingKindTrace: "Step-by-step code dissection",
    landingKindExplain: "Explain in your own words",
    landingDemoNote:
      "The name is self-deprecating on purpose. It's about the habit, not the diagnosis.",
    sessionExit: "← Exit",
    sessionDoneTitle: "Session complete 🎉",
    sessionDoneBody: "You did {n} questions. XP earned today: +{xp}.",
    sessionTotalXp: "Total XP: {xp}",
    sessionStreak: "Streak: {n} days",
    sessionPlayAgain: "Play again",
    sessionBackHome: "Back to home",
    sessionExplainStep:
      "Question {i}/{n} · Explain in your own words (AI-graded)",
    sessionTraceStep: "Question {i}/{n} · Step {s}/{t}",
    sessionWrongTitle: "Almost — dissect this step again:",
    sessionRetry: "Try again",
    sessionNext: "Next →",
    sessionFinish: "Finish ✓",
    explainPasted: "Pasted",
    explainManual: "Written by hand",
    explainGood: "Nice!",
    explainOk: "Could be better",
    explainLow: "Needs another look",
    explainPlaceholder:
      "Explain in your own words. Messy is fine — the reasoning is what matters.",
    explainIntegrity:
      "Automatic integrity tag: paste = “Pasted”. Honesty is your call.",
    explainSubmit: "Submit answer",
    explainLoading: "Grading...",
    explainErrorTitle: "Grading failed.",
    explainErrorBody:
      "The AI grading service is acting up. Try again later — your trace progress is safe.",
    explainRetry: "Try again",
    explainCorrections: "Terms to fix:",
    explainRewrite: "Rewrite answer",
    explainNext: "Next question →",
    dashboardTitle: "Dashboard",
    dashboardSubtitle: "Your daily practice consistency.",
    dashboardStreakBroken: "(broken — pick it back up today!)",
    dashboardStreakDays: "days",
    dashboardXp: "⚡ Total XP: {xp}",
    dashboardDone: "✅ {n} questions done",
    dashboardCatTitle: "Questions done by category",
    dashboardCatCount: "{n} questions ({p}%)",
    dashboardExplainTitle: "Explain in your own words",
    dashboardEmptyExplain:
      "No explain questions answered yet. Your integrity: honesty has value.",
    dashboardManual: "Written by hand",
    dashboardPastedNote:
      "Pasted: {n}. Integrity tag from the “Pasted” mode — this ratio is just for you, no judgement.",
    dashboardCta: "Start today's session",
    appNotFound: "404 — like a variable that was never declared.",
    appBackHome: "Back home",
  },
} as const

export type StringKey = keyof (typeof STRINGS)["id"]

export function translate(
  lang: Lang,
  key: StringKey,
  params?: Record<string, string | number>
): string {
  const dict = STRINGS[lang]
  let s: string = dict[key] ?? STRINGS.id[key] ?? key
  if (params)
    for (const [k, v] of Object.entries(params))
      s = s.replace(`{${k}}`, String(v))
  return s
}

// ============================================================
// localize.ts — terjemahan konten soal (id → en)
// Pola: soal asli (questions.ts) = sumber kebenaran + verified.
// Bagian konten berbahasa (title/prompt/options/dll) bisa
// di-override per bahasa. Snippet kode, answer index, xp LAHIR
// dari soal asli — nggak pernah diterjemahkan.
// ============================================================

import type { ExplainQuestion, Question, TraceQuestion } from "../content/types"
import { translations } from "../content/translations"
import type { Lang } from "../i18n/strings"

export function localizeQuestion(q: Question, lang: Lang): Question {
  if (lang === "id") return q
  const tr = translations[q.id]
  if (!tr) return q // belum diterjemahkan → fallback ke asli (id)

  if (q.kind === "trace" && tr.steps) {
    const steps = q.steps.map((s, i) => {
      const st = tr.steps?.[i]
      return {
        ...s,
        prompt: st?.prompt ?? s.prompt,
        options: st?.options ?? s.options,
        explanation: st?.explanation ?? s.explanation,
      }
    })
    const localized: TraceQuestion = {
      ...q,
      title: tr.title ?? q.title,
      steps,
    }
    return localized
  }

  if (q.kind === "explain") {
    const localized: ExplainQuestion = {
      ...q,
      title: tr.title ?? q.title,
      prompt: tr.prompt ?? q.prompt,
      rubric: tr.rubric ?? q.rubric,
      sampleAnswer: tr.sampleAnswer ?? q.sampleAnswer,
    }
    return localized
  }

  return q
}

export function localizeQuestions(
  questions: Question[],
  lang: Lang
): Question[] {
  return questions.map((q) => localizeQuestion(q, lang))
}

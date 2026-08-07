// ============================================================
// api/grade.ts — serverless AI grading (M5)
// Pola: client → function → NVIDIA NIM. API key HANYA di env server.
// Runtime: Vercel Node (Web API handler) / bisa di-test via tsx.
// ============================================================
import type { ExplainQuestion } from "../src/content/types.ts"

const NIM_URL = "https://integrate.api.nvidia.com/v1/chat/completions"

export type Lang = "id" | "en"

export interface GradeResult {
  score: number // 0-100
  feedback: string // koreksi analogi, bahasa sesuai lang
  corrections: string[] // istilah yang meleset
  model: string
}

const INSTRUCTIONS: Record<Lang, string> = {
  id: `Kamu mentor koding senior yang kritis tapi hangat, gaya koreksi Gemini: per-bagian, pakai analogi konkret sehari-hari, bahasa Indonesia lisan santai.

TUGAS: nilai jawaban user terhadap soal explain di bawah ini.

=== SOAL ===
{title}

Kode yang dibedah:
{snippet}

Instruksi ke user:
{prompt}

=== RUBRIC (istilah & konsep yang WAJIB muncul) ===
{rubric}

=== JAWABAN USER (ditandai: {mode}) ===
{answer}

=== PERINTAH OUTPUT ===
Balas HANYA dengan JSON valid tanpa markdown, tanpa teks lain:
{"score": <0-100>, "feedback": "<koreksi: sebut yang bener, analogi, bahasa Indonesia>", "corrections": ["<istilah yang meleset 1>", "<istilah yang meleset 2>"]}
score 90+ kalau semua istilah wajib ada dan benar; kurangi tiap istilah wajib yang salah/kurang; 0-30 kalau nyasar total.`,
  en: `You are a senior coding mentor, critical but warm, Gemini-style correction: point-by-point, concrete everyday analogies, casual spoken English.

TASK: grade the user's answer to the explain question below.

=== QUESTION ===
{title}

Code to dissect:
{snippet}

Instruction to the user:
{prompt}

=== RUBRIC (terms & concepts that MUST appear) ===
{rubric}

=== USER's ANSWER (flagged: {mode}) ===
{answer}

=== OUTPUT RULES ===
Reply with ONLY valid JSON, no markdown, no extra text:
{"score": <0-100>, "feedback": "<english correction: what's right, analogy, casual>", "corrections": ["<wrongly used term 1>", "<wrongly used term 2>"]}
score 90+ when all required terms are present and correct; deduct per missing/wrong required term; 0-30 when completely off-track.`,
}

function buildPrompt(
  q: ExplainQuestion,
  answer: string,
  mode: string,
  lang: Lang
): string {
  const tpl = INSTRUCTIONS[lang]
  return tpl
    .replaceAll("{title}", q.title)
    .replaceAll("{snippet}", q.snippet)
    .replaceAll("{prompt}", q.prompt)
    .replaceAll("{rubric}", q.rubric)
    .replaceAll("{mode}", mode)
    .replaceAll("{answer}", answer)
}

// model reasoning nulis banyak draft JSON di tengah teks — ambil JSON valid PALING BELAKANG
function extractLastJson(text: string): Record<string, unknown> | null {
  let end = text.lastIndexOf("}")
  while (end !== -1) {
    let start = text.lastIndexOf("{", end)
    while (start !== -1) {
      try {
        return JSON.parse(text.slice(start, end + 1))
      } catch {
        start = text.lastIndexOf("{", start - 1)
      }
    }
    end = text.lastIndexOf("}", end - 1)
  }
  return null
}

function parseGrade(text: string, model: string): GradeResult {
  const j = extractLastJson(text)
  if (!j) return { score: 0, feedback: text, corrections: [], model }
  const score =
    typeof j.score === "number"
      ? Math.max(0, Math.min(100, Math.round(j.score)))
      : 0
  return {
    score,
    feedback: typeof j.feedback === "string" ? j.feedback : "",
    corrections: Array.isArray(j.corrections)
      ? j.corrections.filter((c): c is string => typeof c === "string")
      : [],
    model,
  }
}

// pure, bisa di-test via tsx (scripts/verify-grade.ts)
export async function gradeExplain(
  q: ExplainQuestion,
  answer: string,
  mode: "manual" | "pasted",
  lang: Lang = "id"
): Promise<GradeResult> {
  const key = process.env.NVIDIA_API_KEY
  if (!key) throw new Error("NVIDIA_API_KEY tidak ada di env")
  const model = process.env.NIM_MODEL ?? "deepseek-ai/deepseek-v4-flash-0731"

  const res = await fetch(NIM_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: buildPrompt(q, answer, mode, lang) }],
      temperature: 0.3,
      top_p: 0.95,
      max_tokens: 1024,
      stream: false,
    }),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    throw new Error(`NIM error ${res.status}: ${detail.slice(0, 200)}`)
  }
  const data = await res.json()
  // ponytail: model reasoning — output di message.reasoning, content null
  const msg = data?.choices?.[0]?.message
  const text: string = msg?.content ?? msg?.reasoning ?? ""
  return parseGrade(text, model)
}

// Vercel serverless handler (Vær API)
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST")
    return Response.json({ error: "Method not allowed" }, { status: 405 })
  let body: {
    question?: ExplainQuestion
    answer?: string
    mode?: string
    lang?: string
  }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Bad JSON" }, { status: 400 })
  }
  const q = body.question
  const answer = (body.answer ?? "").trim()
  if (!q?.id || !q.prompt || !q.rubric || !answer) {
    return Response.json(
      { error: "question.id/prompt/rubric + answer wajib" },
      { status: 400 }
    )
  }
  if (answer.length > 4000)
    return Response.json(
      { error: "Jawaban maks 4000 karakter" },
      { status: 400 }
    )

  try {
    const result = await gradeExplain(
      q,
      answer,
      body.mode === "pasted" ? "pasted" : "manual",
      body.lang === "en" ? "en" : "id"
    )
    return Response.json(result)
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown"
    return Response.json({ error: msg }, { status: 502 })
  }
}

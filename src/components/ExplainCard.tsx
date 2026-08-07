import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { ExplainQuestion } from "@/content/types"
import { useI18n } from "@/i18n"

type Phase = "writing" | "loading" | "done" | "error"

interface Result {
  score: number
  feedback: string
  corrections: string[]
  model: string
}

export function ExplainCard({
  question,
  onXp,
  onDone,
}: {
  question: ExplainQuestion
  onXp: (xp: number, mode: "manual" | "pasted") => void
  onDone: () => void
}) {
  const { lang, t } = useI18n()
  const [answer, setAnswer] = useState("")
  const [phase, setPhase] = useState<Phase>("writing")
  const [pasted, setPasted] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [xpAwarded, setXpAwarded] = useState(false)

  async function submit() {
    setPhase("loading")
    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          answer,
          mode: pasted ? "pasted" : "manual",
          lang,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? res.statusText)
      setResult(data)
      setPhase("done")
      // XP cuma sekali per soal — ulang jawab nggak nambah XP (anti-grind)
      if (!xpAwarded) {
        setXpAwarded(true)
        onXp(question.xp, pasted ? "pasted" : "manual")
      }
    } catch {
      setPhase("error")
    }
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 py-6">
        <div className="flex items-center gap-2">
          <Badge variant={pasted ? "secondary" : "outline"}>
            {pasted ? t("explainPasted") : t("explainManual")}
          </Badge>
          {phase === "done" && result && (
            <Badge>
              {result.score >= 80
                ? t("explainGood")
                : result.score >= 50
                  ? t("explainOk")
                  : t("explainLow")}
            </Badge>
          )}
        </div>

        {phase !== "done" && (
          <>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onPaste={() => setPasted(true)}
              placeholder={t("explainPlaceholder")}
              className="min-h-40"
            />
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs">
                {t("explainIntegrity")}
              </p>
              <Button
                onClick={submit}
                disabled={phase === "loading" || answer.trim().length < 10}
              >
                {phase === "loading" ? t("explainLoading") : t("explainSubmit")}
              </Button>
            </div>
          </>
        )}

        {phase === "error" && (
          <div className="border-destructive/40 bg-destructive/5 rounded-lg border p-4 text-sm">
            <p className="text-destructive font-semibold">
              {t("explainErrorTitle")}
            </p>
            <p className="text-muted-foreground mt-1">
              {t("explainErrorBody")}
            </p>
            <Button
              variant="outline"
              className="mt-3"
              onClick={() => setPhase("writing")}
            >
              {t("explainRetry")}
            </Button>
          </div>
        )}

        {phase === "done" && result && (
          <div className="flex flex-col gap-3">
            <div className="bg-muted/50 rounded-lg border p-4">
              <p className="text-2xl font-bold">{result.score}/100</p>
              <p className="mt-2 text-sm whitespace-pre-wrap">
                {result.feedback}
              </p>
            </div>
            {result.corrections.length > 0 && (
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{t("explainCorrections")}</p>
                {result.corrections.map((c, i) => (
                  <p key={i} className="text-muted-foreground text-sm">
                    • {c}
                  </p>
                ))}
              </div>
            )}
            <p className="text-muted-foreground text-xs">
              model: {result.model}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setPhase("writing")}>
                {t("explainRewrite")}
              </Button>
              <Button onClick={onDone}>{t("explainNext")}</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

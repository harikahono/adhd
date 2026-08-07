import { useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { ExplainQuestion } from "@/content/types"

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
  onXp: (xp: number) => void
  onDone: () => void
}) {
  const [answer, setAnswer] = useState("")
  const [phase, setPhase] = useState<Phase>("writing")
  const [pasted, setPasted] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const pastedRef = useRef(false)

  async function submit() {
    setPhase("loading")
    pastedRef.current = pasted
    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer, mode: pasted ? "pasted" : "manual" }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? res.statusText)
      setResult(data)
      setPhase("done")
      onXp(question.xp)
    } catch {
      setPhase("error")
    }
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 py-6">
        <div className="flex items-center gap-2">
          <Badge variant={pasted ? "secondary" : "outline"}>
            {pasted ? "Ditempel" : "Ditulis Manual"}
          </Badge>
          {phase === "done" && result && (
            <Badge>{result.score >= 80 ? "Lumayan!" : result.score >= 50 ? "Bisa lebih" : "Perlu dibedah ulang"}</Badge>
          )}
        </div>

        {phase !== "done" && (
          <>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onPaste={() => setPasted(true)}
              placeholder="Jelasin pakai kata-kata lo sendiri. Nggak apa-apa nggak rapi — yang penting nalarnya keliatan."
              className="min-h-40"
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Tag integritas otomatis: paste = &ldquo;Ditempel&rdquo;. Kejujuran pilihan lo.
              </p>
              <Button onClick={submit} disabled={phase === "loading" || answer.trim().length < 10}>
                {phase === "loading" ? "Menilai..." : "Kirim jawaban"}
              </Button>
            </div>
          </>
        )}

        {phase === "error" && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm">
            <p className="font-semibold text-destructive">Gagal menilai.</p>
            <p className="mt-1 text-muted-foreground">
              Layanan AI grading lagi bermasalah. Coba lagi nanti — progress trace lo aman.
            </p>
            <Button variant="outline" className="mt-3" onClick={() => setPhase("writing")}>
              Coba lagi
            </Button>
          </div>
        )}

        {phase === "done" && result && (
          <div className="flex flex-col gap-3">
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-2xl font-bold">{result.score}/100</p>
              <p className="mt-2 text-sm whitespace-pre-wrap">{result.feedback}</p>
            </div>
            {result.corrections.length > 0 && (
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Istilah yang meleset:</p>
                {result.corrections.map((c, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    • {c}
                  </p>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">model: {result.model}</p>
            <Button onClick={onDone} className="w-fit">
              Soal berikutnya →
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

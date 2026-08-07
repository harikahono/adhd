import { useMemo, useState } from "react"
import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ExplainCard } from "@/components/ExplainCard"
import { questions } from "@/content/questions"
import type { Question, Step } from "@/content/types"
import { buildSession } from "@/lib/session"
import { useProgress } from "@/lib/useProgress"

const categoryLabel: Record<Question["category"], string> = {
  js: "JavaScript",
  react: "React",
  tailwind: "Tailwind",
}

type Status = "idle" | "correct" | "wrong"

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-muted/50 text-foreground overflow-x-auto rounded-lg border p-4 font-mono text-sm whitespace-pre">
      {code}
    </pre>
  )
}

export function Session() {
  const { xp, streak, addXp, markDone } = useProgress()
  // sesi harian: acak 3-5 trace + 1-2 explain, konsisten seharian (seed = tanggal)
  const session = useMemo(() => buildSession(questions, todayIso()), [])
  const [qIdx, setQIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)
  const [status, setStatus] = useState<Status>("idle")
  const [chosen, setChosen] = useState<number | null>(null)
  const [gained, setGained] = useState(0)
  const done = qIdx >= session.length

  // ponytail: satu komponen — trace step diperlakukan sebagai urutan lurus (no per-step xp)
  const question = session[qIdx]

  if (done) {
    return (
      <div className="mx-auto flex min-h-svh max-w-2xl flex-col gap-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Sesi selesai 🎉</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-muted-foreground text-sm">
              Kamu ngerjain {session.length} soal. XP yang didapat hari ini:{" "}
              <span className="text-foreground font-semibold">+{gained}</span>.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">Total XP: {xp}</Badge>
              <Badge variant="secondary">Streak: {streak} hari</Badge>
            </div>
          </CardContent>
        </Card>
        <Button render={<Link to="/" />} nativeButton={false}>
          Kembali ke beranda
        </Button>
      </div>
    )
  }

  // ── soal explain: textarea + AI grading ──
  if (question.kind === "explain") {
    return (
      <div className="mx-auto flex min-h-svh max-w-2xl flex-col gap-6 p-6">
        <header className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{question.id}</Badge>
            <Badge variant="secondary">
              {categoryLabel[question.category]}
            </Badge>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Badge variant="outline">XP: {xp}</Badge>
            <Badge variant="outline">🔥 {streak}</Badge>
          </div>
        </header>
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold tracking-tight">{question.title}</h1>
          <CodeBlock code={question.snippet} />
          <p className="text-muted-foreground text-sm">{question.prompt}</p>
          <p className="text-muted-foreground text-xs">
            Soal {qIdx + 1}/{session.length} · Jelasin pakai kata-kata (dinilai
            AI)
          </p>
        </div>
        <ExplainCard
          question={question}
          onXp={(earned, mode) => {
            addXp(earned)
            markDone(question, mode)
            setGained((g) => g + earned)
          }}
          onDone={() => setQIdx((i) => i + 1)}
        />
      </div>
    )
  }

  const step: Step = question.steps[stepIdx]
  const stepTotal = question.steps.length
  const progressPct = Math.round(
    ((stepIdx + (status === "correct" ? 1 : 0)) / stepTotal) * 100
  )

  function choose(i: number) {
    if (status === "correct") return
    setChosen(i)
    setStatus(i === step.answer ? "correct" : "wrong")
  }

  function next() {
    if (stepIdx + 1 < stepTotal) {
      setStepIdx(stepIdx + 1)
      setChosen(null)
      setStatus("idle")
    } else {
      // soal kelar → XP soal tercatat + statistik kategori
      const earned = question.xp
      addXp(earned)
      markDone(question)
      setGained((g) => g + earned)
      setQIdx(qIdx + 1)
      setStepIdx(0)
      setChosen(null)
      setStatus("idle")
    }
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-2xl flex-col gap-6 p-6">
      <header className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{question.id}</Badge>
          <Badge variant="secondary">{categoryLabel[question.category]}</Badge>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <Badge variant="outline">XP: {xp}</Badge>
          <Badge variant="outline">🔥 {streak}</Badge>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{question.title}</CardTitle>
          <Progress value={progressPct} className="h-2" />
          <p className="text-muted-foreground text-xs">
            Soal {qIdx + 1}/{session.length} · Step {stepIdx + 1}/{stepTotal}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CodeBlock code={question.snippet} />
          <div className="flex flex-col gap-1.5">
            <p className="font-medium">{step.prompt}</p>
            <div className="flex flex-col gap-2">
              {step.options.map((opt, i) => {
                const isAnswer = i === step.answer
                const isChosen = status !== "idle" && i === chosen
                return (
                  <Button
                    key={i}
                    variant={
                      isChosen
                        ? isAnswer
                          ? "default"
                          : "destructive"
                        : "outline"
                    }
                    className="h-auto justify-start px-3 py-2.5 text-left"
                    disabled={status !== "idle"}
                    onClick={() => choose(i)}
                  >
                    {opt}
                  </Button>
                )
              })}
            </div>
          </div>

          {status === "wrong" && (
            <div className="border-destructive/40 bg-destructive/5 rounded-lg border p-4 text-sm">
              <p className="text-destructive font-semibold">Belum tepat.</p>
              <p className="text-muted-foreground mt-1">{step.explanation}</p>
            </div>
          )}

          {status === "correct" && (
            <Button
              onClick={next}
              className="w-fit"
              variant={stepIdx + 1 < stepTotal ? "default" : "secondary"}
            >
              {stepIdx + 1 < stepTotal ? "Lanjut →" : "Selesai soal ✓"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

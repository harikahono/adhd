import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { questions } from "@/content/questions"
import type { Question } from "@/content/types"

const categoryLabel: Record<Question["category"], string> = {
  js: "JavaScript",
  react: "React",
  tailwind: "Tailwind",
}

export function Landing() {
  const traceCount = questions.filter((q) => q.kind === "trace").length
  const explainCount = questions.filter((q) => q.kind === "explain").length

  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 p-6">
      <header className="flex flex-col gap-2 pt-8">
        <Badge className="w-fit">AI Detox for Human Developers</Badge>
        <h1 className="text-3xl font-bold tracking-tight">
          A.D.H.D. — Any Dummy Handles Debugging
        </h1>
        <p className="text-muted-foreground">
          Rehab ringan buat otak yang tumpul gara-gara AI ngerjain semuanya.
          Bedah kode per-bagian, terus jelasin pakai kata-kata lo sendiri.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Latihan hari ini</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">
            {questions.length} soal siap — {traceCount} bedah kode +{" "}
            {explainCount} jelasin (dinilai AI).
          </p>
          <Button
            render={<Link to="/session" />}
            nativeButton={false}
            className="w-fit"
          >
            Mulai sesi
          </Button>
        </CardContent>
      </Card>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Daftar soal</h2>
        {questions.map((q) => (
          <Card key={q.id}>
            <CardContent className="flex items-center justify-between gap-4 py-4">
              <div className="flex flex-col gap-1">
                <span className="font-medium">{q.title}</span>
                <span className="text-muted-foreground text-xs">
                  {q.kind === "trace"
                    ? "Bedah kode bertingkat"
                    : "Jelasin pakai kata-kata"}
                </span>
              </div>
              <Badge variant="secondary">{categoryLabel[q.category]}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}

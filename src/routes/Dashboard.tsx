import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Question } from "@/content/types"
import { useProgress } from "@/lib/useProgress"

const categoryLabel: Record<Question["category"], string> = {
  js: "JavaScript",
  react: "React",
  tailwind: "Tailwind",
}

export function Dashboard() {
  const { xp, streak, doneByCategory, manual, pasted } = useProgress()
  const totalDone = Object.values(doneByCategory).reduce((a, b) => a + b, 0)
  const totalExplain = manual + pasted
  const manualPct =
    totalExplain === 0 ? 0 : Math.round((manual / totalExplain) * 100)

  return (
    <div className="mx-auto flex min-h-svh max-w-2xl flex-col gap-6 p-6">
      <header className="flex flex-col gap-2 pt-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Konsistensi latihan harian lo.</p>
      </header>

      <div className="flex gap-3">
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          🔥 Streak: {streak} hari
        </Badge>
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          ⚡ XP total: {xp}
        </Badge>
        <Badge variant="outline" className="px-4 py-2 text-sm">
          ✅ {totalDone} soal selesai
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Soal selesai per kategori</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {(Object.keys(doneByCategory) as Question["category"][]).map(
            (cat) => {
              const count = doneByCategory[cat]
              const pct =
                totalDone === 0 ? 0 : Math.round((count / totalDone) * 100)
              return (
                <div key={cat} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{categoryLabel[cat]}</span>
                    <span className="text-muted-foreground">
                      {count} soal ({pct}%)
                    </span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              )
            }
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Jelasin pakai kata-kata</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {totalExplain === 0 ? (
            <p className="text-muted-foreground text-sm">
              Belum ada soal explain yang dikerjain. Integritas lo: jujur itu
              nilainya.
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Ditulis Manual</span>
                  <span className="text-muted-foreground">
                    {manual} ({manualPct}%)
                  </span>
                </div>
                <Progress value={manualPct} className="h-2" />
              </div>
              <p className="text-muted-foreground text-xs">
                Ditempel: {pasted}. Tag integritas otomatis dari tombol
                &ldquo;Ditempel&rdquo; — rasio ini cuma buat lo sendiri, nggak
                dihukum.
              </p>
            </>
          )}
        </CardContent>
      </Card>

      <Button
        render={<Link to="/session" />}
        nativeButton={false}
        className="w-fit"
      >
        Mulai sesi hari ini
      </Button>
    </div>
  )
}

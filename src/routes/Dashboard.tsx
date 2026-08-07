import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Question } from "@/content/types"
import { effectiveStreak, useProgress } from "@/lib/useProgress"
import { useI18n } from "@/i18n"

const categoryLabel: Record<Question["category"], string> = {
  js: "JavaScript",
  react: "React",
  tailwind: "Tailwind",
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function Dashboard() {
  const { t } = useI18n()
  const { xp, streak, todaySession, doneByCategory, manual, pasted } =
    useProgress()
  const streakNow = effectiveStreak(
    { xp, streak, todaySession, doneByCategory, manual, pasted },
    todayIso()
  )
  const totalDone = Object.values(doneByCategory).reduce((a, b) => a + b, 0)
  const totalExplain = manual + pasted
  const manualPct =
    totalExplain === 0 ? 0 : Math.round((manual / totalExplain) * 100)

  return (
    <div className="mx-auto flex min-h-svh max-w-2xl flex-col gap-6 p-6">
      <header className="flex flex-col gap-2 pt-8">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("dashboardTitle")}
        </h1>
        <p className="text-muted-foreground">{t("dashboardSubtitle")}</p>
      </header>

      <div className="flex gap-3">
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          🔥 Streak: {streakNow}{" "}
          {streakNow === 0 && streak > 0
            ? t("dashboardStreakBroken")
            : t("dashboardStreakDays")}
        </Badge>
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          {t("dashboardXp", { xp })}
        </Badge>
        <Badge variant="outline" className="px-4 py-2 text-sm">
          {t("dashboardDone", { n: totalDone })}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("dashboardCatTitle")}</CardTitle>
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
                      {t("dashboardCatCount", { n: count, p: pct })}
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
          <CardTitle>{t("dashboardExplainTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {totalExplain === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t("dashboardEmptyExplain")}
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{t("dashboardManual")}</span>
                  <span className="text-muted-foreground">
                    {manual} ({manualPct}%)
                  </span>
                </div>
                <Progress value={manualPct} className="h-2" />
              </div>
              <p className="text-muted-foreground text-xs">
                {t("dashboardPastedNote", { n: pasted })}
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
        {t("dashboardCta")}
      </Button>
    </div>
  )
}

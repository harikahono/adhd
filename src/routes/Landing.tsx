import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { questions } from "@/content/questions"
import { localizeQuestions } from "@/lib/localize"
import type { Question } from "@/content/types"
import { buildSession } from "@/lib/session"
import { useI18n } from "@/i18n"

const categoryLabel: Record<Question["category"], string> = {
  js: "JavaScript",
  react: "React",
  tailwind: "Tailwind",
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function Landing() {
  const { lang, t } = useI18n()
  const localized = localizeQuestions(questions, lang)
  const session = buildSession(localized, todayIso())
  const traceCount = session.filter((q) => q.kind === "trace").length
  const explainCount = session.filter((q) => q.kind === "explain").length

  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 p-6">
      <header className="flex flex-col gap-2 pt-8">
        <Badge className="w-fit">A.D.H.D. — Any Dummy Handles Debugging</Badge>
        <h1 className="text-3xl font-bold tracking-tight">{t("landingH1")}</h1>
        <p className="text-muted-foreground">{t("landingDeck")}</p>
        <p className="text-muted-foreground text-xs">{t("landingDemoNote")}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("landingTodayCard")}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">
            {t("landingTodayDesc", {
              trace: traceCount,
              explain: explainCount,
              total: localized.length,
            })}
          </p>
          <Button
            render={<Link to="/session" />}
            nativeButton={false}
            className="w-fit"
          >
            {t("landingCta")}
          </Button>
        </CardContent>
      </Card>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">{t("landingListTitle")}</h2>
        {localized.map((q) => (
          <Card key={q.id}>
            <CardContent className="flex items-center justify-between gap-4 py-4">
              <div className="flex flex-col gap-1">
                <span className="font-medium">{q.title}</span>
                <span className="text-muted-foreground text-xs">
                  {q.kind === "trace"
                    ? t("landingKindTrace")
                    : t("landingKindExplain")}
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

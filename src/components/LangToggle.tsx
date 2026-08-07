import { Button } from "@/components/ui/button"
import { useI18n } from "@/i18n"

export function LangToggle() {
  const { lang, setLang } = useI18n()
  return (
    <Button
      variant="outline"
      size="sm"
      className="w-14"
      onClick={() => setLang(lang === "id" ? "en" : "id")}
    >
      {lang === "id" ? "EN" : "ID"}
    </Button>
  )
}

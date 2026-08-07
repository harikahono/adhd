import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import type { ReactNode } from "react"
import type { Lang, StringKey } from "./strings"
import { STRINGS, translate } from "./strings"

const LANG_KEY = "adhd.lang"

interface I18nCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: StringKey, params?: Record<string, string | number>) => string
}

const Ctx = createContext<I18nCtx | null>(null)

function initLang(): Lang {
  const saved = localStorage.getItem(LANG_KEY)
  return saved === "en" ? "en" : "id"
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => initLang())
  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem(LANG_KEY, l)
  }, [])
  const t = useCallback(
    (key: StringKey, params?: Record<string, string | number>) =>
      translate(lang, key, params),
    [lang]
  )
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n(): I18nCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider")
  return ctx
}

// supaya STRINGS di-import & dipakai type-level
export { STRINGS }

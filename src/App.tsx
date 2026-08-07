import { BrowserRouter, Link, Route, Routes } from "react-router"
import { Landing } from "@/routes/Landing"
import { Session } from "@/routes/Session"
import { Dashboard } from "@/routes/Dashboard"
import { LangToggle } from "@/components/LangToggle"
import { useI18n } from "@/i18n"

export function App() {
  const { t } = useI18n()
  return (
    <BrowserRouter>
      <div className="relative min-h-svh">
        <div className="absolute top-4 right-4 z-50">
          <LangToggle />
        </div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/session" element={<Session />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="*"
            element={
              <div className="p-6">
                <p>{t("appNotFound")}</p>
                <Link to="/">{t("appBackHome")}</Link>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Link, Route, Routes } from "react-router"
import { Landing } from "@/routes/Landing"
import { Session } from "@/routes/Session"
import { Dashboard } from "@/routes/Dashboard"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/session" element={<Session />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="*"
          element={
            <div className="p-6">
              <p>404 — halaman nggak ada.</p>
              <Link to="/">Balik ke beranda</Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

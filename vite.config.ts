import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv, type Plugin } from "vite"
import type { Connect } from "vite"

// dev-only: jembatan /api/grade → handler api/grade.ts (Vercel function).
// Prod nggak butuh ini — Vercel serve folder api/ asli.
function apiDevPlugin(
  handler: (req: Request) => Promise<Response> | Response
): Plugin {
  return {
    name: "api-dev-grade",
    configureServer(server) {
      server.middlewares.use(
        "/api/grade",
        async (req: Connect.IncomingMessage, res) => {
          try {
            const body = await readBody(req)
            const response = await handler(
              new Request("http://localhost/api/grade", {
                method: req.method ?? "GET",
                headers: req.headers as Record<string, string>,
                body: req.method === "POST" ? body : undefined,
              })
            )
            res.statusCode = response.status
            res.setHeader("Content-Type", "application/json; charset=utf-8")
            res.end(await response.text())
          } catch (e) {
            res.statusCode = 500
            res.end(`API error: ${e instanceof Error ? e.message : e}`)
          }
        }
      )
    },
  }
}

function readBody(req: Connect.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ""
    req.on("data", (c) => (data += c))
    req.on("end", () => resolve(data))
    req.on("error", reject)
  })
}

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  // masukkan env .env ke process.env biar handler api/grade kebaca
  Object.assign(process.env, env)
  const gradeHandler = (await import("./api/grade.ts")).default
  return {
    plugins: [react(), tailwindcss(), apiDevPlugin(gradeHandler)],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
  }
})

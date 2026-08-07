import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function Dashboard() {
  // ponytail: streak & XP (localStorage) dibangun di M6.
  return (
    <div className="mx-auto flex min-h-svh max-w-2xl flex-col gap-8 p-6">
      <header className="flex flex-col gap-2 pt-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Coming soon — M6.</p>
      </header>
      <Card>
        <CardContent className="flex flex-col items-start gap-4 py-6">
          <p className="text-sm text-muted-foreground">
            Streak, XP, dan riwayat sesi bakal muncul di sini.
          </p>
          <Button variant="outline" render={<Link to="/" />} nativeButton={false}>
            Kembali ke beranda
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

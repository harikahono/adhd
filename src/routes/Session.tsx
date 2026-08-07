import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function Session() {
  // ponytail: sesi interaktif (MCQ + explain + XP) dibangun di M4.
  return (
    <div className="mx-auto flex min-h-svh max-w-2xl flex-col gap-8 p-6">
      <header className="flex flex-col gap-2 pt-8">
        <h1 className="text-2xl font-bold tracking-tight">Sesi latihan</h1>
        <p className="text-muted-foreground">Coming soon — M4.</p>
      </header>
      <Card>
        <CardContent className="flex flex-col items-start gap-4 py-6">
          <p className="text-sm text-muted-foreground">
            Interaksi sesi (bedah kode bertingkat + mode explain dinilai AI) bakal
            dibangun di milestone berikutnya. Landing udah nampilin daftar soal dari
            <code className="rounded bg-muted px-1">src/content</code>.
          </p>
          <Button variant="outline" render={<Link to="/" />} nativeButton={false}>
            Kembali ke beranda
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

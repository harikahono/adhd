import { useCallback, useState } from "react"

interface Progress {
  xp: number
  streak: number
  todaySession: string // YYYY-MM-DD sesi terakhir diselesaikan
}

const KEY = "adhd.progress"

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

// dipisah biar bisa di-test (verify-progress)
export function computeNext(p: Progress, xpGained: number, todayIso: string): Progress {
  const yesterday = new Date(Date.parse(todayIso) - 24 * 3600 * 1000).toISOString().slice(0, 10)
  const nextStreak =
    p.todaySession === todayIso ? p.streak : p.todaySession === yesterday ? p.streak + 1 : 1
  return { xp: p.xp + xpGained, streak: nextStreak, todaySession: todayIso }
}

function init(): Progress {
  const raw = localStorage.getItem(KEY)
  if (!raw) return { xp: 0, streak: 0, todaySession: "" }
  return JSON.parse(raw)
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => init())
  const addXp = useCallback((xp: number) => {
    setProgress((prev) => {
      const next = computeNext(prev, xp, today())
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return { ...progress, addXp, streakToday: progress.todaySession === today() }
}
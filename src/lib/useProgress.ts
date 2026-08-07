import { useCallback, useState } from "react"
import type { Category, Question } from "@/content/types"

// ponytail: schema flat — counter per kategori + rasio manual/pasted (PRD §7)
export interface Progress {
  xp: number
  streak: number
  todaySession: string // YYYY-MM-DD sesi terakhir diselesaikan
  doneByCategory: Record<Category, number> // total soal selesai per kategori (kumulatif)
  manual: number // explain dikerjain manual
  pasted: number // explain di-paste
}

const KEY = "adhd.progress"

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export const EMPTY_PROGRESS: Progress = {
  xp: 0,
  streak: 0,
  todaySession: "",
  doneByCategory: { js: 0, react: 0, tailwind: 0 },
  manual: 0,
  pasted: 0,
}

// dipisah biar bisa di-test (verify-progress)
export function computeNext(
  p: Progress,
  xpGained: number,
  todayIso: string
): Progress {
  const yesterday = new Date(Date.parse(todayIso) - 24 * 3600 * 1000)
    .toISOString()
    .slice(0, 10)
  const nextStreak =
    p.todaySession === todayIso
      ? p.streak
      : p.todaySession === yesterday
        ? p.streak + 1
        : 1
  return {
    ...p,
    xp: p.xp + xpGained,
    streak: nextStreak,
    todaySession: todayIso,
  }
}

// catat soal selesai: +1 per kategori, +manual/pasted buat explain
export function recordDone(
  p: Progress,
  q: Question,
  mode?: "manual" | "pasted"
): Progress {
  return {
    ...p,
    doneByCategory: {
      ...p.doneByCategory,
      [q.category]: p.doneByCategory[q.category] + 1,
    },
    manual: mode === "manual" ? p.manual + 1 : p.manual,
    pasted: mode === "pasted" ? p.pasted + 1 : p.pasted,
  }
}

function init(): Progress {
  const raw = localStorage.getItem(KEY)
  if (!raw) return EMPTY_PROGRESS
  try {
    return { ...EMPTY_PROGRESS, ...JSON.parse(raw) }
  } catch {
    return EMPTY_PROGRESS // data korup → reset, jangan crash
  }
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
  const markDone = useCallback((q: Question, mode?: "manual" | "pasted") => {
    setProgress((prev) => {
      const next = recordDone(prev, q, mode)
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return {
    ...progress,
    addXp,
    markDone,
    streakToday: progress.todaySession === today(),
  }
}

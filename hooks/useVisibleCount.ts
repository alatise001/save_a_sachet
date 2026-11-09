import { useEffect, useState } from "react"

/** Picks how many carousel slides fit: `steps` is a list of [maxWidth, count], checked in order. */
export function useVisibleCount(steps: [number, number][], fallback: number) {
  const compute = () => {
    if (typeof window === "undefined") return fallback
    const w = window.innerWidth
    for (const [max, count] of steps) if (w <= max) return count
    return fallback
  }
  const [count, setCount] = useState(compute)

  useEffect(() => {
    const onResize = () => setCount(compute())
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return count
}

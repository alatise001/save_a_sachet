import { useEffect } from "react"

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title
      ? `${title} · Save a Sachet`
      : "Save a Sachet — Akungba Akoko"
  }, [title])
}

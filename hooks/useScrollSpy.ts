import { useEffect, useState } from "react"

/** Returns the id of the section currently crossing the middle of the viewport. */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState("")
  const key = ids.join("|")

  useEffect(() => {
    const els = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -54% 0px" },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}

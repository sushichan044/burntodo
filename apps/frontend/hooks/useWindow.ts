import { useSyncExternalStore } from "react"

const useWindow = () => {
  const w = useSyncExternalStore(
    (cb) => {
      document.addEventListener("DOMContentLoaded", cb)
      return () => document.removeEventListener("DOMContentLoaded", cb)
    },
    () => window,
    () => null,
  )
  return w
}

export { useWindow }

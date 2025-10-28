import { useEffect } from "react";

export function useTitle(title = 'E-commerce') {
  useEffect(() => {
    document.title = title
    return () => { }
  }, [title])
}
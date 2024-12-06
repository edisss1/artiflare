import { useEffect, useState } from "react"
import { ObserverProps } from "../types/Observer"

export function useObserver({ observableElementRef }: ObserverProps) {
    const [isVisible, setIsVisible] = useState(false)

    const callback = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries
        setIsVisible(entry.isIntersecting)
    }

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callback, options)

        if (observableElementRef.current)
            observer.observe(observableElementRef.current)

        return () => {
            if (observableElementRef.current)
                observer.unobserve(observableElementRef.current)
        }
    }, [observableElementRef, options])

    return isVisible
}

export function throttle<T extends any[]>(
    func: (...args: T) => void,
    delay: number
) {
    let shouldWait = false
    let waitingArgs: T | null = null

    const timeoutFunc = () => {
        if (waitingArgs === null) {
            shouldWait = false
        } else {
            func(...waitingArgs)
            setTimeout(timeoutFunc, delay)
        }
    }

    return (...args: T) => {
        if (shouldWait) {
            waitingArgs = args
            return
        }
        func(...args)
        shouldWait = true
        setTimeout(timeoutFunc, delay)
    }
}

import { useEffect, useRef } from 'react'

const useInterval = (callback: () => void, delay?: number | null) => {
  // 创建一个ref用于存储回调函数
  const savedCallback = useRef<() => void>(() => {})

  useEffect(() => {
    // 当回调函数改变时更新ref
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay !== null) {
      // 创建一个定时器，并在指定的delay后执行回调函数
      const interval = setInterval(() => savedCallback.current(), delay || 0)

      // 返回一个清除定时器的函数，以在组件卸载时使用
      return () => {
        clearInterval(interval)
      }
    }

    return undefined
  }, [delay])
}

export default useInterval

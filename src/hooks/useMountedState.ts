import { useCallback, useEffect, useRef } from 'react'

// 用于追踪组件是否已经挂载
export default function useMountedState(): () => boolean {
  // 创建一个引用
  const mountedRef = useRef<boolean>(false)
  // 使用useCallback创建了一个函数（get），它返回mountedRef.current，这个函数是一个纯函数，因此它在每次渲染时都会返回相同的引用。
  const get = useCallback(() => mountedRef.current, [])

  // 在useEffect钩子内部，通过将mountedRef.current设置为true，表示组件已挂载。随后，在清理阶段，当组件卸载时，通过返回的函数将mountedRef.current设置为false，以指示组件已卸载。
  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  })

  return get
}

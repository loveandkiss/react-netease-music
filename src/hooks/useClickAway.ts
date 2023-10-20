import { type RefObject, useEffect, useRef } from 'react'

const defaultEvents = ['mousedown', 'touchstart']

// 例如: obj.addEventListener('click', () => {})
export const on = (obj: any, ...args: any[]) => obj.addEventListener(...args)
export const off = (obj: any, ...args: any[]) => obj.removeEventListener(...args)

// 自定义 React Hook，名为 useClickAway，监听用户点击元素之外的区域并执行相应的回调函数。
const useClickAway = <E extends Event = Event>(
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: E) => void,
  events: string[] = defaultEvents,
) => {
  // const ref = useRef(initialValue)
  // onClickAway 是一个函数，它被传递给 useRef 的初始值。savedCallback 的目的是保存 onClickAway 函数的引用，以便在组件的生命周期内保持不变。
  const savedCallback = useRef(onClickAway)

  useEffect(() => {
    savedCallback.current = onClickAway
  }, [onClickAway])

  useEffect(() => {
    const handler = (event: any) => {
      const { current: el } = ref
      // contains 方法是 DOM 中 Node 对象的一个方法，用于检查一个节点是否是另一个节点的后代（包含在内部）。它通常用于确定一个 DOM 元素是否包含另一个 DOM 元素。
      // parentNode.contains(childNode);
      // 如果 childNode 是 parentNode 的后代节点，返回 true。
      // 如果 childNode 不是 parentNode 的后代节点，返回 false。
      console.log('event', event)
      el && !el.contains(event.target) && savedCallback.current(event)
    }

    // 遍历绑定
    for (const eventName of events) {
      on(document, eventName, handler)
    }

    // 组件卸载时取消事件监听器
    return () => {
      // 遍历清除绑定
      for (const eventName of events) {
        off(document, eventName, handler)
      }
    }
  }, [events, ref])
}

export default useClickAway

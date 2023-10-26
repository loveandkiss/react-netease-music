import { DependencyList, useCallback, useState, useRef } from 'react'
import useMountedState from './useMountedState'

/**
 * 联合类型（union type）
 *
 * 常用于异步操作，例如在应用中进行数据获取，然后根据加载的状态来渲染UI。
 */
export type AsyncState<T> =
  | {
      loading: boolean
      error?: undefined
      value?: undefined
    }
  | {
      loading: false
      error: Error
      value?: undefined
    }
  | {
      loading: false
      error?: undefined
      value: T
    }

// 泛型类型定义
// 元组（tuple）类型
// extends any[] 表示 Args 必须是一个数组类型，而不是其他类型。
// = any[] 意味着如果在使用 AsyncFn 时没有显式地提供 Args 的具体类型，那么默认会将其解释为一个任意类型的数组（any[]）。
export type AsyncFn<Result = any, Args extends any[] = any[]> = [
  AsyncState<Result>,
  (...args: Args) => Promise<Result | null>,
]

export interface IOptions<Result> {
  deps: DependencyList
  initialState: AsyncState<Result>
  successHandler?: (value: Result) => void
  errorHandler?: (error: Error) => void
}

// extends any[] 表示 Args 必须是一个数组类型，而不是其他类型。
//  = any[] 意味着如果在使用 AsyncFn 时没有显式地提供 Args 的具体类型，那么默认会将其解释为一个任意类型的数组（any[]）。
// 所以 Args 数据类型需要从外部传入的数据类型确定。
export default function useAsyncFn<Result = any, Args extends any[] = any[]>(
  fn: (...args: Args) => Promise<Result>,
  options: IOptions<Result> = {
    deps: [],
    initialState: { loading: false },
  },
): AsyncFn<Result, Args> {
  // 对 options 进行解构，提取initialState、deps、successHandler和errorHandler
  const { initialState = { loading: false }, deps = [], successHandler, errorHandler } = options

  // lastCallId是一个ref，用于跟踪异步调用的顺序。
  const lastCallId = useRef(0)

  // 保存请求结果 => state 是异步操作的当前状态，初始化为initialState。
  const [state, set] = useState<AsyncState<Result>>(initialState)

  // isMounted是由useMountedState hook返回的函数，用于检查组件是否仍然挂载。
  const isMounted = useMountedState()

  // 使用useCallback来记忆回调函数，以防止不必要的重新渲染。通过指定依赖项(deps)来确定何时重新创建回调函数。
  const callback = useCallback((...args: Args) => {
    // lastCallId.current自身也自增了一下 例如 原先为0，自增一次则为1；原先为1，自增一次则为2
    const callId = ++lastCallId.current
    set({ loading: true })

    return fn(...args).then(
      (value) => {
        // 从函数的参数中获取最后一个参数并将其赋值给 callback 变量
        const callback = args[args.length - 1]
        if (isMounted() && callId === lastCallId.current) {
          successHandler && successHandler(value)

          // 判断callback类型是否为函数类型，是函数类型则调用
          if (typeof callback === 'function') {
            callback()
          }
          // 设置 state 的值
          set({ value, loading: false })
        }
        return value
      },
      (error) => {
        if (isMounted() && callId === lastCallId.current) {
          errorHandler && errorHandler(error)
          set({ error, loading: false })
        }
        return null
      },
    )
  }, deps)

  return [state, callback]
}

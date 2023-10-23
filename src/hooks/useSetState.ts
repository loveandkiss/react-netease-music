import { useCallback, useState } from 'react'

// Record
// Partial
// 索引类型
type R = Record<string, any>
// The code you provided defines a custom React hook named useSetState.
// This hook is designed to manage a state object and provides a function for updating parts of that state.
const useSetState = <T extends R>(
  initialState: T = {} as T,
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] => {
  // useState
  const [state, set] = useState<T>(initialState)
  // useCallback
  const setState = useCallback(
    (patch) => {
      set((prevState) => Object.assign({}, prevState, patch instanceof Function ? patch(prevState) : patch))
    },
    [set],
  )

  return [state, setState]
}

export default useSetState

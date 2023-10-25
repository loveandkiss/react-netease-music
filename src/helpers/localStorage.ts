export const DEFAULT_VALUE = {
  ARRAY: '[]', // 数组
  OBJECT: '{}', // 对象
  STRING: '', // 字符串
}

interface ILocalStorageFactoryParams<T> {
  key: string
  defaultValue: string
  raw?: boolean
  serializer?: (value: T) => string // 字符串系列化
  deserializer?: (value: string) => T
}

interface ILocalStorageFactoryReturn<T> {
  setItem: (value: T) => void
  getItem: () => T
  removeItem: () => void
}

/**
 * 表达式声明的泛型函数
 *
 * const functionName = <T>(arg: T): T => {
 *   // Function body here
 * }
 *
 */
export const localStorageFactory = <T>(params: ILocalStorageFactoryParams<T>): ILocalStorageFactoryReturn<T> => {
  // serializer 给默认值
  // deserializer 给默认值
  const { key, defaultValue, raw, serializer = JSON.stringify, deserializer = JSON.parse } = params

  const setItem = (value: T) => {
    const data = (raw ? value : serializer(value)) as string
    window.localStorage.setItem(key, data || defaultValue)
  }

  const getItem = () => {
    const data = window.localStorage.getItem(key) || defaultValue
    return raw ? data : deserializer(data)
  }

  const removeItem = () => window.localStorage.removeItem(key)

  return {
    setItem,
    getItem,
    removeItem,
  }
}

import createHTMLMediaHook from './utils/createHTMLMediaHook'
// 自定义 React Hook
const useAudio = createHTMLMediaHook('audio')
console.log('useAudio', useAudio)

export default useAudio

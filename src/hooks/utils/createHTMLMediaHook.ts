import * as React from 'react'
import { useEffect, useRef } from 'react'
import useSetState from 'hooks/useSetState'
import parseTimeRanges from './parseTimeRanges'

// 拓展接口属性
export interface HTMLMediaProps extends React.AudioHTMLAttributes<any>, React.VideoHTMLAttributes<any> {
  src: string
}

export interface HTMLMediaState {
  buffered: any[]
  duration: number
  paused: boolean // 是否暂停
  muted: boolean
  time: number
  volume: number // 音量
}

export interface HTMLMediaControls {
  play: () => Promise<void> | void
  pause: () => void
  mute: () => void
  unmute: () => void
  volume: (volume: number) => void
  seek: (time: number) => void
}

// 创建 media hook
const createHTMLMediaHook = (tag: 'audio' | 'video') => {
  // 定义一个函数， 入参
  const hook = (
    elOrProps: HTMLMediaProps | React.ReactElement<HTMLMediaProps>,
  ): [React.ReactElement<HTMLMediaProps>, HTMLMediaState, HTMLMediaControls, { current: HTMLAudioElement | null }] => {
    let element: React.ReactElement<any> | undefined
    let props: HTMLMediaProps
    // 检查给定的参数是否是有效的 React 元素。
    if (React.isValidElement(elOrProps)) {
      element = elOrProps
      props = element.props
    } else {
      // console.log('elOrProps', elOrProps)
      props = elOrProps as HTMLMediaProps
    }

    // 注意setState
    const [state, setState] = useSetState<HTMLMediaState>({
      buffered: [],
      time: 0,
      duration: 0,
      paused: true,
      muted: false,
      volume: 1,
    })

    const ref = useRef<HTMLAudioElement | null>(null)

    const wrapEvent = (userEvent: any, proxyEvent?: any) => {
      // 在 React 中，React.BaseSyntheticEvent 是合成事件的基本类型。
      return (event: React.BaseSyntheticEvent) => {
        try {
          proxyEvent && proxyEvent(event)
        } finally {
          userEvent && userEvent(event)
        }
      }
    }

    const onPlay = () => setState({ paused: false })
    const onPause = () => setState({ paused: true })

    const onVolumeChange = () => {
      const el = ref.current
      if (!el) {
        return
      }
      setState({
        muted: el.muted,
        volume: el.volume,
      })
    }
    const onDurationChange = () => {
      const el = ref.current
      if (!el) {
        return
      }
      const { duration, buffered } = el
      setState({
        duration,
        buffered: parseTimeRanges(buffered),
      })
    }
    const onTimeUpdate = () => {
      const el = ref.current
      if (!el) {
        return
      }
      setState({ time: el.currentTime })
    }
    const onProgress = () => {
      const el = ref.current
      if (!el) {
        return
      }
      setState({ buffered: parseTimeRanges(el.buffered) })
    }

    if (element) {
      // React.cloneElement 是用于克隆（复制）一个已经存在的 React 元素，并可以修改它的属性。
      // React.cloneElement(element, [props], [...children])，其中 element 是要克隆的 React 元素，props 是一个包含新属性的对象，children 是可选的，表示新的子元素。
      element = React.cloneElement(element, {
        controls: false,
        ...props,
        ref,
        onPlay: wrapEvent(props.onPlay, onPlay),
        onPause: wrapEvent(props.onPause, onPause),
        onVolumeChange: wrapEvent(props.onVolumeChange, onVolumeChange),
        onDurationChange: wrapEvent(props.onDurationChange, onDurationChange),
        onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
        onProgress: wrapEvent(props.onProgress, onProgress),
      })
    } else {
      // React.createElement 是用于创建新的 React 元素（虚拟 DOM 节点）的函数。
      // React.createElement(type, [props], [...children])，其中 type 表示要创建的元素类型（通常是一个组件或 HTML 标签），props 是一个包含元素属性的对象，children 是元素的子元素。
      element = React.createElement(tag, {
        controls: false,
        ...props,
        ref,
        onPlay: wrapEvent(props.onPlay, onPlay),
        onPause: wrapEvent(props.onPause, onPause),
        onVolumeChange: wrapEvent(props.onVolumeChange, onVolumeChange),
        onDurationChange: wrapEvent(props.onDurationChange, onDurationChange),
        onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
        onProgress: wrapEvent(props.onProgress, onProgress),
      } as any) // TODO: fix this typing.
    }

    // Some browsers return `Promise` on `.play()` and may throw errors
    // if one tries to execute another `.play()` or `.pause()` while that
    // promise is resolving. So prevent that with this lock.
    // See: https://bugs.chromium.org/p/chromium/issues/detail?id=593273
    let lockPlay = false

    const controls = {
      play: () => {
        // console.log('%cplay', 'color: red;')
        const el = ref.current
        if (!el) {
          return undefined
        }

        if (!lockPlay) {
          const promise = el.play()
          const isPromise = typeof promise === 'object'

          if (isPromise) {
            lockPlay = true
            const resetLock = () => {
              lockPlay = false
            }
            promise.then(resetLock, resetLock)
          }

          return promise
        }
        return undefined
      },
      pause: () => {
        // console.log('%cpause', 'color: red;')
        const el = ref.current
        if (el && !lockPlay) {
          return el.pause()
        }
      },
      // 播放进度
      seek: (time: number) => {
        // console.log('%cseek', 'color: red;')
        const el = ref.current
        if (!el || state.duration === undefined) {
          return
        }
        time = Math.min(state.duration, Math.max(0, time))
        el.currentTime = time
      },
      // 音量
      volume: (volume: number) => {
        // console.log('%cvolume', 'color: red;')
        const el = ref.current
        if (!el) {
          return
        }
        volume = Math.min(1, Math.max(0, volume))
        el.volume = volume
        setState({ volume })
      },
      mute: () => {
        // console.log('%cmute', 'color: red;')
        const el = ref.current
        if (!el) {
          return
        }
        el.muted = true
      },
      unmute: () => {
        // console.log('%cunmute', 'color: red;')
        const el = ref.current
        if (!el) {
          return
        }
        el.muted = false
      },
    }

    useEffect(() => {
      const el = ref.current

      if (!el) {
        if (process.env.NODE_ENV !== 'production') {
          if (tag === 'audio') {
            console.error(
              'useAudio() ref to <audio> element is empty at mount. ' +
                'It seem you have not rendered the audio element, which it ' +
                'returns as the first argument const [audio] = useAudio(...).',
            )
          } else if (tag === 'video') {
            console.error(
              'useVideo() ref to <video> element is empty at mount. ' +
                'It seem you have not rendered the video element, which it ' +
                'returns as the first argument const [video] = useVideo(...).',
            )
          }
        }
        return
      }

      setState({
        volume: el.volume,
        muted: el.muted,
        paused: el.paused,
      })

      // Start media, if autoPlay requested.
      if (props.autoPlay && el.paused) {
        controls.play()
      }
    }, [props.src])

    return [element, state, controls, ref]
  }

  return hook
}

export default createHTMLMediaHook

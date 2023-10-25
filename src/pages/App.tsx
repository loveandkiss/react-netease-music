import React, { useReducer, useMemo, useCallback, lazy, Suspense } from 'react'
// router
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Layout from 'components/Layout'
import useAudio from 'hooks/useAudio'
import { MODE, playList as playListLocalStorage } from 'helpers/play'

// playMusicReducer
import playMusicReducer, {
  initialState,
  PlayMusicStateContext,
  PlayMusicDispatchContext,
  AudioContext,
  ACTIONS,
} from 'reducers/playMusic'

// logReducer
import logReducer, { initialState as logInitialState, LogStateContext, LogDispatchContext } from 'reducers/log'

import { IMyMusic } from 'apis/types/business'
import ROUTES from 'constants/routes'

// 使用 React 中的 lazy 函数和 import() 动态导入语法来实现组件的懒加载。
// 动态导入（dynamic import）文件。这意味着在运行时（而不是在编译时）才会加载文件。这
// 有助于减小初始加载的应用程序体积，因为只有在用户实际需要查看 Markdown 预览时才会加载相关代码。
const Discovery = lazy(() => import('./Discovery'))
const Videos = lazy(() => import('./Videos'))
const Search = lazy(() => import('./Search'))
const SonglistDetail = lazy(() => import('./SonglistDetail'))

const App = () => {
  // useReducer => 向组件添加一个 reducer
  const [logState, logDispath] = useReducer(logReducer, logInitialState)
  const [state, dispatch] = useReducer(playMusicReducer, initialState)
  const { musicId, musicUrl, playMode } = state
  // console.log('App=>musicUrl=>1', musicUrl)

  // 缓存值
  // useMemo(calculateValue, dependencies)
  const playList = useMemo(() => playListLocalStorage.getItem(), [musicId])

  // 初始化播放器实例 => 传入 musicUrl
  const [audio, audioState, audioControls, audioRef] = useAudio({
    src: musicUrl,
    autoPlay: true, // 自动播放
    onEnded: () => playNextMusic(),
    onError: () => {
      if (playMode === MODE.SINGLE_CYCLE) {
        return
      }
      playNextMusic()
    },
  })

  // 缓存值
  // useMemo(calculateValue, dependencies)
  const audioInfo = useMemo(() => {
    // console.log('----audioInfo-----', musicUrl)
    return {
      audio,
      state: audioState,
      controls: audioControls,
      ref: audioRef,
    }
  }, [musicUrl, audio, audioState, audioControls, audioRef])

  const playMusic = useCallback(
    (index: number) => {
      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: playList[index].id,
          music: playList[index],
        },
      })
    },
    [playList],
  )

  // 缓存函数
  const playNextMusic = useCallback(() => {
    switch (playMode) {
      case MODE.PLAY_IN_ORDER: {
        const idx = playList.findIndex(({ id }: IMyMusic) => id === musicId)
        if (playList.length) {
          const nextIdx = idx > -1 ? (idx + 1) % playList.length : 0
          playMusic(nextIdx)
        }
        return
      }
      case MODE.SINGLE_CYCLE: {
        audioControls.play()
        return
      }
      case MODE.SHUFFLE_PLAYBACK: {
        if (playList.length) {
          const randomIdx = Math.floor(Math.random() * playList.length)
          playMusic(randomIdx)
        }
        return
      }
      default:
        return
    }
  }, [musicId, playMode, audioControls, playList])

  return (
    <BrowserRouter>
      <LogDispatchContext.Provider value={logDispath}>
        <LogStateContext.Provider value={logState}>
          <PlayMusicDispatchContext.Provider value={dispatch}>
            <PlayMusicStateContext.Provider value={state}>
              {/* 提供音频相关上下文数据的组件 */}
              <AudioContext.Provider value={audioInfo}>
                <Layout>
                  {audio}

                  {/* 使用 Suspense 实现懒加载组件: 使用了<Suspense>组件来包装<Switch>组件，以实现懒加载。  */}
                  <Suspense fallback={null}>
                    <Switch>
                      <Route path={ROUTES.DISCOVERY} component={Discovery} />
                      <Route path={ROUTES.VIDEOS} component={Videos} />
                      <Route exact path={ROUTES.SEARCH} component={Search} />
                      <Route exact path={ROUTES.SONG_LIST_DETAIL} component={SonglistDetail} />
                      <Redirect from={ROUTES.ROOT} to={ROUTES.DEFAULT_ROUTE} />
                    </Switch>
                  </Suspense>
                </Layout>
              </AudioContext.Provider>
            </PlayMusicStateContext.Provider>
          </PlayMusicDispatchContext.Provider>
        </LogStateContext.Provider>
      </LogDispatchContext.Provider>
    </BrowserRouter>
  )
}

export default App

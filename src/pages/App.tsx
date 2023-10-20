import React, { useReducer, useMemo, useCallback, lazy, Suspense } from 'react'
// router
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Layout from 'components/Layout'
import useAudio from 'hooks/useAudio'
import { MODE, playList as playListLocalStorage } from 'helpers/play'
import playMusicReducer, {
  initialState,
  PlayMusicStateContext,
  PlayMusicDispatchContext,
  AudioContext,
  ACTIONS,
} from 'reducers/playMusic'

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
  // console.log('%cApp入口组件初始化一些数据', 'color: red; font-size: 22px;')
  const [logState, logDispath] = useReducer(logReducer, logInitialState)
  const [state, dispatch] = useReducer(playMusicReducer, initialState)
  // console.log('state', state)
  const { musicId, musicUrl, playMode } = state

  const playList = useMemo(() => playListLocalStorage.getItem(), [musicId])

  const [audio, audioState, audioControls, audioRef] = useAudio({
    src: musicUrl,
    autoPlay: true,
    onEnded: () => playNextMusic(),
    onError: () => {
      if (playMode === MODE.SINGLE_CYCLE) {
        return
      }
      playNextMusic()
    },
  })

  const audioInfo = useMemo(() => {
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
              <AudioContext.Provider value={audioInfo}>
                <Layout>
                  {audio}

                  {/* 使用 Suspense 实现懒加载组件  */}
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

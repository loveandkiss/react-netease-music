import React, { useContext, useMemo, useCallback } from 'react'
import { Icon } from '@blueprintjs/core'

import { PlayMusicStateContext, PlayMusicDispatchContext, AudioContext, ACTIONS } from 'reducers/playMusic'
import { playList as playListLocalStorage } from 'helpers/play'
import styles from './style.module.css'

const PlayOperations = () => {
  // 获取播放器上下文
  const audioInfo = useContext(AudioContext)
  const { state: audioState, controls } = audioInfo

  // 通过useContext从上下文中获取dispatch
  const dispatch = useContext(PlayMusicDispatchContext)
  const state = useContext(PlayMusicStateContext)
  const { musicId } = state

  const playList = useMemo(() => playListLocalStorage.getItem(), [musicId])

  // 播放 | 暂停
  const togglePlayStatus = useCallback(() => {
    if (audioState?.paused) {
      controls?.play()
    } else {
      controls?.pause()
    }
  }, [audioState?.paused, controls])

  // 播放
  const play = useCallback(
    (prev?: boolean) => {
      const len = playList.length
      if (!len) {
        return
      }

      const index = playList.findIndex(({ id }) => id === musicId)
      let nextIndex = -1

      if (index > -1) {
        nextIndex = prev ? (index - 1 + len) % len : (index + 1) % len
      } else {
        nextIndex = 0
      }

      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: playList[nextIndex].id,
          music: playList[nextIndex],
        },
      })
    },
    [playList, musicId, dispatch],
  )

  // 上一首
  const playPrev = useCallback(() => play(true), [play])
  // 下一首
  const playNext = useCallback(() => play(), [play])

  return (
    <>
      <div className={styles.prev} onClick={playPrev}>
        <Icon icon='step-backward' />
      </div>
      <div className={styles.pause} onClick={togglePlayStatus}>
        <Icon icon={audioInfo.state?.paused ? 'play' : 'pause'} />
      </div>
      <div className={styles.next} onClick={playNext}>
        <Icon icon='step-forward' />
      </div>
    </>
  )
}

export default PlayOperations

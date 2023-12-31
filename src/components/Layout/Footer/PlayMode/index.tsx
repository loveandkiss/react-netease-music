import React from 'react'
// blueprintjs
import { Tooltip, Icon, IconName } from '@blueprintjs/core'

import { MODE } from 'helpers/play'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'

const MODE_ORDER = [MODE.PLAY_IN_ORDER, MODE.SINGLE_CYCLE, MODE.SHUFFLE_PLAYBACK]

const MODE_MAP: IDictionary<{
  label: string
  icon: IconName
}> = {
  [MODE.PLAY_IN_ORDER]: {
    label: '顺序播放',
    icon: 'sort',
  },
  [MODE.SINGLE_CYCLE]: {
    label: '单曲循环',
    icon: 'repeat',
  },
  [MODE.SHUFFLE_PLAYBACK]: {
    label: '随机播放',
    icon: 'random',
  },
}

const { useContext, useCallback } = React

const PlayMode = () => {
  // 通过useContext从上下文中获取dispatch
  const dispatch = useContext(PlayMusicDispatchContext)
  const state = useContext(PlayMusicStateContext)
  const { playMode } = state

  // 点击 => 切换播放模式
  const handleClick = useCallback(() => {
    console.log('播放模式切换逻辑')
    const idx = MODE_ORDER.findIndex((m) => m === playMode)
    const nextMode = MODE_ORDER[(idx + 1) % MODE_ORDER.length]

    dispatch({
      type: ACTIONS.SET_PLAY_MODE,
      payload: {
        playMode: nextMode,
      },
    })
  }, [dispatch, playMode])

  return (
    <Tooltip content={MODE_MAP[playMode].label}>
      <Icon icon={MODE_MAP[playMode].icon} onClick={handleClick} />
    </Tooltip>
  )
}

export default PlayMode

import React from 'react'

import { AudioContext } from 'reducers/playMusic'
import { formatTime } from 'helpers/time'

const { useContext, useMemo } = React

const AudioTimer = () => {
  // 获取音频上下文
  const audioInfo = useContext(AudioContext)
  const { state } = audioInfo

  const time = useMemo(() => {
    return `${formatTime(state?.time)} / ${formatTime(state?.duration)}`
  }, [state?.time, state?.duration])

  return <div>{time}</div>
}

export default AudioTimer

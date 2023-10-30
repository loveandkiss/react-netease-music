import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ROUTES from 'constants/routes'
import styles from './style.module.css'
import { PlayMusicDispatchContext, PlayMusicStateContext, AudioContext } from 'reducers/playMusic'

// 下载管理
const Download = () => {
  const audioState = useContext(AudioContext)
  const state = useContext(PlayMusicStateContext)
  const dispatch = useContext(PlayMusicDispatchContext)
  // console.log('Download----audioState', audioState)
  // console.log('Download----state', state)
  // console.log('Download----dispatch', dispatch)

  const handleClick = () => {
    // audioState.controls?.play()
  }
  return (
    <div className={styles.root} onClick={handleClick}>
      Download
    </div>
  )
}

export default Download

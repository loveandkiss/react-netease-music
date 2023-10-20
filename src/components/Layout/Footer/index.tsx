import React, { useContext, useState, useCallback, useEffect } from 'react'

// Blueprint
import { Icon, Tooltip } from '@blueprintjs/core'
import cn from 'classnames'

import Artists from 'components/Artists'
import AudioTimer from './AudioTimer'
import ProgressBar from './ProgressBar'
import PlayRecord from './PlayRecord'
import PlayMode from './PlayMode'
import PlayOperations from './PlayOperations'
import PlayVolume from './PlayVolume'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import styles from './style.module.css'

// const { useContext, useState, useCallback } = React

const Footer = () => {
  // 播放记录
  const [showPlayRecord, setShowPlayRecord] = useState(false)
  // 获取dispatch
  const dispatch = useContext(PlayMusicDispatchContext)
  // 获取state
  const state = useContext(PlayMusicStateContext)
  const { musicId, music, showLyric } = state

  // useEffect(() => {
  //   console.log('-----', showPlayRecord)
  // }, [])

  const togglePlayRecord = useCallback(() => {
    console.log('22')
    // setShowPlayRecord(!showPlayRecord)
    setShowPlayRecord((prevShowPlayRecord) => !prevShowPlayRecord)
  }, [])

  // 展示歌词
  const handleShowLyric = useCallback(() => {
    dispatch({
      type: ACTIONS.SHOW_LYRIC,
    })
  }, [dispatch])

  // 隐藏歌词
  const handleHideLyric = useCallback(() => {
    dispatch({
      type: ACTIONS.HIDE_LYRIC,
    })
  }, [dispatch])

  return (
    <div className={styles.root}>
      {musicId ? (
        <div className={styles.progressBar}>
          <ProgressBar />
        </div>
      ) : null}

      <div className={styles.songWrap}>
        {!!musicId && (
          <>
            <div className={cn(styles.pic, !showLyric && styles.showLyric)}>
              <img src={music?.picUrl ? `${music?.picUrl}?param=40y40` : undefined} loading='lazy' />
              {!showLyric && (
                <div className={styles.mask} onClick={handleShowLyric}>
                  <Icon icon='double-chevron-up' />
                </div>
              )}
              {showLyric && (
                <div className={cn(styles.mask, styles.hideLyric)} onClick={handleHideLyric}>
                  <Icon icon='double-chevron-down' />
                </div>
              )}
            </div>
            <div>
              <div className={styles.info}>
                <div className={styles.name}>{`${music?.name || '--'} -`}</div>
                <Artists artists={state?.music?.artists} />
              </div>
              <div className={styles.time}>
                <AudioTimer />
              </div>
            </div>
          </>
        )}
      </div>

      {/* 播放 */}
      <div className={styles.operations}>
        <PlayOperations />
      </div>

      <div className={styles.otherOperations}>
        {/* 切换播放模式 */}
        <div className={styles.item}>
          <PlayMode />
        </div>

        {/* 打开播放列表 */}
        <div onClick={togglePlayRecord} className={styles.item}>
          <Tooltip content='打开播放列表'>
            <Icon icon='menu-closed' className={showPlayRecord ? 'active' : ''} />
          </Tooltip>
        </div>
        <div className={styles.item}>
          <PlayVolume />
        </div>
      </div>

      {/* 播放记录组件 */}
      <PlayRecord show={showPlayRecord} onClickAway={() => setShowPlayRecord(false)} />
    </div>
  )
}

export default React.memo(Footer)

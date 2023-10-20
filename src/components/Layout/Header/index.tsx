import React, { useContext } from 'react'
// router
import { useHistory } from 'react-router-dom'
// Blueprint
import { Icon } from '@blueprintjs/core'

import Navbar from './Navbar'
import Searcher from './Searcher'
// reducers
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import { REPOSITORY } from 'constants/github'
import styles from './style.module.css'

// const { useContext } = React

const Header = () => {
  // 获取history
  const history = useHistory()
  // 获取dispatch
  const dispatch = useContext(PlayMusicDispatchContext)
  // 获取state
  const state = useContext(PlayMusicStateContext)
  // console.log('state', state)
  const { showLyric } = state

  // 返回
  const handleGoBack = () => history.goBack()
  // 前进
  const handleGoForward = () => history.goForward()

  // 隐藏歌词
  const hideLyric = () => {
    dispatch({
      type: ACTIONS.HIDE_LYRIC,
    })
  }

  return (
    <div className={styles.root}>
      <div className={styles.actions}>
        <div className={styles.iconsWrap}>
          <div className={styles.circle}>
            <Icon icon='cross' iconSize={8} />
          </div>
          <div className={styles.circle}>
            <Icon icon='minus' iconSize={8} />
          </div>
          <div className={styles.circle}>
            <Icon icon='maximize' iconSize={7} />
          </div>

          {/* 条件渲染 */}
          {showLyric && (
            <div className={styles.down} onClick={hideLyric}>
              <Icon icon='chevron-down' iconSize={20} />
            </div>
          )}
        </div>

        {/* 条件渲染 */}
        {!showLyric && (
          <div className={styles.backForward}>
            <div onClick={handleGoBack}>
              <Icon icon='chevron-left' />
            </div>
            <div onClick={handleGoForward}>
              <Icon icon='chevron-right' />
            </div>
          </div>
        )}
      </div>

      <div className={styles.content}>
        {/* 条件渲染 */}
        <div>{!showLyric && <Navbar />}</div>

        <div className={styles.operations}>
          <Searcher />
          <div className={styles.githubLogo} onClick={() => window.open(REPOSITORY)} />
        </div>
      </div>
    </div>
  )
}

export default Header

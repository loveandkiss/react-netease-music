import React, { useContext } from 'react'

import List from '../List'
import { IMyMusic } from 'apis/types/business'
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import { playList as playListLocalStorage } from 'helpers/play'
import useUpdate from 'hooks/useUpdate'

// 播放列表
const PlayList = () => {
  const forceUpdate = useUpdate()
  // 通过useContext从上下文中获取dispatch
  const dispatch = useContext(PlayMusicDispatchContext)
  // 获取播放列表
  const playList = playListLocalStorage.getItem()
  // console.log('playList', playList)

  // 双击
  const handleDoubleClick = (item: IMyMusic) => {
    // console.log('双击====item', item)
    dispatch({
      type: ACTIONS.PLAY,
      payload: {
        musicId: item.id,
        music: item,
      },
    })
  }

  const handleClear = () => {
    dispatch({ type: ACTIONS.CLEAR_PLAY_LIST })
    // 强制更新 => 手动触发组件重新渲染
    forceUpdate()
  }

  return <List data={playList} onDoubleClick={handleDoubleClick} onClear={handleClear} />
}

export default PlayList

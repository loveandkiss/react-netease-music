import React, { useEffect, useContext } from 'react'
import { Spinner } from '@blueprintjs/core'
// 获取查询参数Hooks
import { useParams } from 'react-router-dom'
// useLazyQuery 是 Apollo Client 中的一个 React 钩子，用于在 React 组件中执行延迟查询（Lazy Query）。它与 useQuery 钩子不同，useQuery 在组件渲染时立即执行查询，而 useLazyQuery 允许你在组件中显式触发查询的执行。
import { useLazyQuery } from '@apollo/client'
import { message } from '@mui/Notification'

import Tabs from 'components/Tabs'
import MusicList from 'components/MusicList'
import BasicInfo from './BasicInfo'
import { createMusic } from 'helpers/business'
// 导入你的 GraphQL 查询
import { getSonglistDetail } from 'graphql/music'
import { IMusic } from 'apis/types/business'
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import styles from './style.module.css'

// const { useEffect, useContext } = React

const TABS = [
  {
    label: '歌曲列表',
    key: 'songlist',
  },
  {
    label: '评论',
    key: 'comment',
  },
]

// 函数组件
const SonglistDetail = () => {
  // 通过useContext从上下文中获取dispatch
  const dispatch = useContext(PlayMusicDispatchContext)
  // 获取params
  const params = useParams<IDictionary<string>>()
  const { songlistId } = params

  // loading 变量用于显示加载状态，如果查询正在进行中，它为 true，否则为 false。一旦查询完成，数据将存储在 data 中，我们可以在组件中渲染查询的结果。
  const [getSonglistDetailGql, { loading, data }] = useLazyQuery(getSonglistDetail, {
    onError: (error) => {
      message.error(error.message)
    },
  })

  const result = data?.getSonglistDetail
  const songs = result?.songs as IMusic[]

  useEffect(() => {
    // 调用 getSonglistDetailGql 函数来触发查询
    getSonglistDetailGql({
      variables: {
        id: songlistId,
      },
    })
  }, [songlistId])

  const playAll = (autoPlay?: boolean) => {
    const list = songs.map((item) => {
      return createMusic({
        ...item,
        duration: item.duration / 1000,
      })
    })

    dispatch({
      type: ACTIONS.SET_PLAY_LIST,
      payload: {
        playList: list,
      },
    })

    if (autoPlay) {
      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: list[0].id,
          music: list[0],
        },
      })
    }
  }

  return (
    <div className={styles.root}>
      {loading ? (
        <Spinner className='spinner' />
      ) : (
        <>
          <div className={styles.basicInfo}>
            <BasicInfo data={result?.songlist} onPlayAll={playAll} />
          </div>

          <div className={styles.content}>
            <div className={styles.tabs}>
              <Tabs tabs={TABS} />
            </div>
            <MusicList data={songs} onPlayAll={playAll} />
          </div>
        </>
      )}
    </div>
  )
}

export default SonglistDetail

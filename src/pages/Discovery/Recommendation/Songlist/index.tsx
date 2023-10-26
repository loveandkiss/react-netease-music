import React from 'react'
import { Spinner } from '@blueprintjs/core'

import LinkTitle from 'components/LinkTitle'
import Songlists from 'components/Songlists'

import ROUTES from 'constants/routes'
import useAsyncFn from 'hooks/useAsyncFn'
import personalizedApis from 'apis/personalized'
import styles from './style.module.css'

const { useEffect } = React

const Songlist = () => {
  const [state, personalizedSonglistFn] = useAsyncFn(personalizedApis.getPersonalizedSonglist)

  // 解构赋值
  const { value: songlist = [], loading: isGettingSonglist } = state || {}

  // 依赖项数组 [] 是一个空数组，表示此useEffect中的副作用代码只在组件挂载时执行一次，不依赖于任何组件的状态或属性的变化。
  // 这是一个常见的用法，通常用于初始化数据或执行一次性的操作。
  useEffect(() => {
    // personalizedSonglistFn({ limit: 10 })
    // 传入回调函数
    personalizedSonglistFn({ limit: 10 }, () => {
      console.log('%c传入回调函数callback', 'color: red; font-size: 20px;')
    })
  }, [])

  return (
    <div className={styles.root}>
      <LinkTitle title='推荐歌单' route={ROUTES.SONG_LIST} />
      {isGettingSonglist ? <Spinner /> : <Songlists data={songlist} />}
    </div>
  )
}

export default Songlist

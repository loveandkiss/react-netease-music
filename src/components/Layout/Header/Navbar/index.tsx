import React from 'react'
// router
import { useHistory, useLocation } from 'react-router-dom'
import cn from 'classnames'
import ROUTES from 'constants/routes'

import styles from './style.module.css'

const NAVBAR = {
  // 发现音乐
  [ROUTES.DISCOVERY]: [
    {
      label: '个性推荐',
      route: ROUTES.RECOMMENDATION,
    },
    {
      label: '每日歌曲推荐',
      route: ROUTES.RECOMMEND_DAILY,
    },
    {
      label: '歌单',
      route: ROUTES.SONG_LIST,
    },
    {
      label: '排行榜',
      route: ROUTES.LEADER_BOARD,
    },
    {
      label: '歌手',
      route: ROUTES.SINGERS,
    },
    {
      label: '最新音乐',
      route: ROUTES.LATEST_MUSIC,
    },
  ],
  // 视频
  [ROUTES.VIDEOS]: [
    {
      label: '视频',
      route: ROUTES.VIDEO,
    },
    {
      label: 'MV',
      route: ROUTES.MV,
    },
  ],
}

// 组件
const Navbar = () => {
  // 获取history对象
  const history = useHistory()
  // 获取url相关信息
  const { pathname } = useLocation()

  const matchPathPrefix = Object.keys(NAVBAR).find((key) => pathname.startsWith(key))

  if (!matchPathPrefix) {
    return null
  }

  const items = NAVBAR[matchPathPrefix]

  const hasMatchRoute = items.find(({ route }) => route === pathname)

  const handleItemClick = (route: string) => {
    console.log('history.push()', route)
    history.push(route)
  }

  return (
    <div className={styles.root}>
      {items.map(({ label, route }, index) => {
        const isActive = hasMatchRoute ? route === pathname : index === 0

        return (
          <div
            key={label}
            className={cn(styles.item, isActive ? styles.active : '')}
            onClick={() => handleItemClick(route)}
          >
            {label}
          </div>
        )
      })}
    </div>
  )
}

export default Navbar

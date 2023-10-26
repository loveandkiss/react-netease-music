import React, { useEffect, useState, useMemo, useContext } from 'react'
import { Spinner } from '@blueprintjs/core'
import cn from 'classnames'

import BannerItem from './BannerItem'
import useAsyncFn from 'hooks/useAsyncFn'
import useInterval from 'hooks/useInterval'
import personalizedApis from 'apis/personalized'
import songApis from 'apis/song'
import { TARGET_TYPE } from 'apis/types/business'
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import styles from './style.module.css'

// 轮播图组件
const Banner = () => {
  // 通过useContext从上下文中获取dispatch
  const dispatch = useContext(PlayMusicDispatchContext)
  // 当前处理正中位置图片的索引，默认值为0
  const [currentMid, setCurrentMid] = useState(0)

  // 返回一个状态和一个函数，该函数能改变状态
  const [state, getBannerFn] = useAsyncFn(personalizedApis.getBanner)
  // 解构赋值
  const { value: banners = [], loading: isGettingBanner } = state

  // 依赖项数组 [] 是一个空数组，表示此useEffect中的副作用代码只在组件挂载时执行一次，不依赖于任何组件的状态或属性的变化。
  // 这是一个常见的用法，通常用于初始化数据或执行一次性的操作。
  useEffect(() => {
    // 调取后端接口，获取banner图
    getBannerFn()
  }, [])

  // 开启自动轮播
  useInterval(() => {
    if (!banners.length) {
      return
    }
    // 模
    setCurrentMid((currentMid + 1) % banners.length)
  }, 6000)

  const bannersClassName = useMemo(() => {
    const len = banners.length // banners总长度
    const left = (currentMid - 1 + len) % len
    const right = (currentMid + 1) % len
    // 索引下标映射样式
    return {
      [currentMid]: styles.middle,
      [left]: styles.left,
      [right]: styles.right,
    }
  }, [currentMid, banners])

  // 鼠标悬浮触发
  const handleMidChange = (index: number) => {
    setCurrentMid(index)
  }

  const handleItemClick = async (musicId: number) => {
    const songs = await songApis.getSongDetail([musicId])
    if (songs?.length) {
      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId,
          music: songs[0],
        },
      })
    }
  }

  return isGettingBanner ? (
    <Spinner />
  ) : (
    <div className={styles.root}>
      <div className={styles.banners}>
        {banners.map(({ imageUrl, typeTitle, targetId, targetType }, index) => {
          // 映射样式
          const className = bannersClassName[index] || styles.hidden
          const isMusicType = targetType === TARGET_TYPE.MUSIC
          return (
            <BannerItem
              key={imageUrl}
              typeTitle={typeTitle}
              imageUrl={imageUrl}
              className={cn(className, isMusicType && styles.enabled)}
              onClick={isMusicType ? () => handleItemClick(targetId) : undefined}
            />
          )
        })}
      </div>
      <div className={styles.dots}>
        {banners.map(({ imageUrl }, index) => {
          return (
            <div
              key={imageUrl}
              className={cn(styles.dot, index === currentMid ? styles.active : '')}
              onMouseOver={() => handleMidChange(index)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Banner

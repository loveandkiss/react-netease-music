import React, { useState, useRef } from 'react'
import cn from 'classnames'

import PlayList from './PlayList'
import PlayHistory from './PlayHistory'
import useClickAway from 'hooks/useClickAway'
import styles from './style.module.css'

interface ITab {
  tab: string
  tabKey: string
}

interface IProps {
  show: boolean
  // 可选属性，类型为函数类型
  onClickAway?: () => void
}

const TABS: IDictionary<ITab> = {
  PLAY_LIST: {
    tab: '播放列表',
    tabKey: 'PLAY_LIST',
  },
  PLAY_HISTORY: {
    tab: '历史记录',
    tabKey: 'PLAY_HISTORY',
  },
}

const PlayRecord: React.FC<IProps> = ({ show, onClickAway }) => {
  const playRecordRef = useRef<HTMLDivElement | null>(null)
  const [activeTab, setActiveTab] = useState(TABS.PLAY_LIST.tabKey)

  // 使用自定义React Hooks
  useClickAway(playRecordRef, () => onClickAway && onClickAway())

  return (
    <div className={cn(styles.root, show && styles.show)} ref={playRecordRef}>
      {/* 等价于下面 */}
      {/* <div className={cn(styles.root, show && styles.show)} ref={(ref) => (playRecordRef.current = ref)}> */}
      {show && (
        <>
          <div className={styles.tabs}>
            {Object.keys(TABS).map((key) => {
              return (
                <div
                  key={key}
                  className={cn(styles.tab, activeTab === key && styles.active)}
                  onClick={() => setActiveTab(TABS[key].tabKey)}
                >
                  {TABS[key].tab}
                </div>
              )
            })}
          </div>

          {/* 条件渲染 */}
          <div className={styles.content}>{activeTab === TABS.PLAY_LIST.tabKey ? <PlayList /> : <PlayHistory />}</div>
        </>
      )}
    </div>
  )
}

export default PlayRecord

import { DEFAULT_VALUE, localStorageFactory } from 'helpers/localStorage'
import { IMyMusic } from 'apis/types/business'

// 枚举
enum KEY {
  PLAY_HISTORY = '__playHistory', // 播放历史记录列表
  PLAY_LIST = '__playList', // 播放列表
  PLAY_MODE = '__playMode', // 播放模式
}

// 播放历史本地存储操作
export const playHistory = localStorageFactory<IMyMusic[]>({
  key: KEY.PLAY_HISTORY,
  defaultValue: DEFAULT_VALUE.ARRAY, // 空数组
})

// 设置播放历史
export const setPlayHistory = (music: IMyMusic): IMyMusic[] => {
  console.log('setPlayHistory', music)
  const list = playHistory.getItem().slice(0, 100)
  const index = list.findIndex((item) => item.id === music.id)

  if (index > -1) {
    list.splice(index, 1)
  }

  list.unshift(music)
  playHistory.setItem(list)

  return list
}

// 播放列表本地存储操作
export const playList = localStorageFactory<IMyMusic[]>({
  key: KEY.PLAY_LIST,
  defaultValue: DEFAULT_VALUE.ARRAY, // 空数组
})

// 枚举
export enum MODE {
  PLAY_IN_ORDER = 'PLAY_IN_ORDER', // 按顺序播放
  SINGLE_CYCLE = 'SINGLE_CYCLE', // 单曲循环
  SHUFFLE_PLAYBACK = 'SHUFFLE_PLAYBACK', // 随机播放
}
// 播放模式本地存储操作
export const playMode = localStorageFactory<MODE>({
  key: KEY.PLAY_MODE,
  defaultValue: MODE.PLAY_IN_ORDER,
  raw: true,
})

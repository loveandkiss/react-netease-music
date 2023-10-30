// createContext 能让你创建一个 context 以便组件能够提供和读取。
import React, { createContext, type ReactElement } from 'react'
import { IMyMusic } from 'apis/types/business'
import { HTMLMediaState, HTMLMediaControls } from 'hooks/utils/createHTMLMediaHook'
// 获取音乐链接
import { getMusicUrl } from 'helpers/business'
//
import {
  MODE,
  setPlayHistory,
  playHistory as playHistoryLocalStorage,
  playMode as playModeLocalStorage,
  playList as playListLocalStorage,
} from 'helpers/play'
//
import { IAction } from './types'

// Actions
const PLAY = 'PLAY'
const SET_PLAY_LIST = 'SET_PLAY_LIST'
const CLEAR_PLAY_LIST = 'CLEAR_PLAY_LIST'
const SET_PLAY_MODE = 'SET_PLAY_MODE'
const SHOW_LYRIC = 'SHOW_LYRIC'
const HIDE_LYRIC = 'HIDE_LYRIC'
const CLEAR_PLAY_HISTORY = 'CLEAR_PLAY_HISTORY'

export const ACTIONS = {
  PLAY,
  SET_PLAY_LIST,
  CLEAR_PLAY_LIST,
  SET_PLAY_MODE,
  SHOW_LYRIC,
  HIDE_LYRIC,
  CLEAR_PLAY_HISTORY,
}

// Reducer
export interface IState {
  musicId: number
  musicUrl: string
  music?: IMyMusic
  playMode: MODE // 枚举类型
  showLyric: boolean
}

export const initialState = {
  musicId: 0, // 音乐id
  musicUrl: '', // 音乐播放url
  playMode: playModeLocalStorage.getItem(), // 本地localStorage获取
  showLyric: false, // 是否展示歌词
}

const playMusicReducer = (state: IState, { type, payload }: IAction) => {
  // switch 语句是一种用于根据不同情况执行不同代码块的控制流语句。
  switch (type) {
    // 播放
    case ACTIONS.PLAY: {
      console.log('播放', payload)
      if (!payload?.keepOrder) {
        // 设置播放历史
        setPlayHistory(payload?.music)
      }

      return {
        ...state,
        musicId: payload?.musicId,
        musicUrl: getMusicUrl(payload?.musicId),
        music: payload?.music,
      }
    }
    case ACTIONS.SET_PLAY_LIST: {
      const playList = payload?.playList || []
      playListLocalStorage.setItem(playList)
      return state
    }
    case ACTIONS.CLEAR_PLAY_LIST: {
      playListLocalStorage.removeItem()
      return state
    }
    case ACTIONS.SET_PLAY_MODE: {
      // 播放模式
      // 本地localStorage设置
      playModeLocalStorage.setItem(payload?.playMode)

      return {
        ...state,
        playMode: payload?.playMode || MODE.PLAY_IN_ORDER,
      }
    }
    // 展示歌词
    case ACTIONS.SHOW_LYRIC: {
      return {
        ...state,
        showLyric: true,
      }
    }

    // 隐藏歌词
    case ACTIONS.HIDE_LYRIC: {
      return {
        ...state,
        showLyric: false,
      }
    }
    case ACTIONS.CLEAR_PLAY_HISTORY: {
      // 本地localStorage清楚
      playHistoryLocalStorage.removeItem()
      return state
    }
    default:
      return state
  }
}

export default playMusicReducer

export interface IAudioContext {
  audio?: ReactElement<any> | undefined
  state?: HTMLMediaState
  controls?: HTMLMediaControls
  ref?: {
    current: HTMLAudioElement | null
  }
}

// Context => 创建Context
export const PlayMusicStateContext = createContext<IState>(initialState)
// () => {} 是提供给上下文的默认值。这里默认值是一个空函数。
export const PlayMusicDispatchContext = createContext<React.Dispatch<IAction>>(() => {})
export const AudioContext = createContext<IAudioContext>({}) // 播放器上下文

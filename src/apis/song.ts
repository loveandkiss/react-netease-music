import axios from 'helpers/axios'
import { IMyMusic, IMusic } from 'apis/types/business'

export enum SONG_TYPE {
  ALL = 0,
  CHINESE = 7,
  EU_USA = 96,
  JAPANESE = 8,
  KOREAN = 16
}

type GetSongDetailFn = (ids: number[]) => Promise<any>
type GetTopSongsFn = (type?: SONG_TYPE) => Promise<IMyMusic[]>
type GetRecommendSongsFn = () => Promise<IMusic[]>

const getSongDetail: GetSongDetailFn = async (ids) => {
  const response = await axios({
    method: 'get',
    url: '/song/detail',
    params: {
      ids: ids.join(',')
    }
  })

  return response
}

const getTopSongs: GetTopSongsFn = async (type = SONG_TYPE.ALL) => {
  const response = await axios({
    method: 'get',
    url: '/top/song',
    params: {
      type
    }
  })

  return response.data
}

const getRecommendSongs: GetRecommendSongsFn = async () => {
  const response = await axios({
    method: 'get',
    url: '/recommend/songs'
  })

  return response.recommend
}

export default {
  getSongDetail,
  getTopSongs,
  getRecommendSongs
}
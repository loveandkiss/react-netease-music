const ROOT = '/'

const DISCOVERY = '/discovery'
const RECOMMENDATION = `${DISCOVERY}/recommendation` // 个性推荐
const SONG_LIST = `${DISCOVERY}/songlist` // 歌单
const LEADER_BOARD = `${DISCOVERY}/leaderboard` // 排行榜
const SINGERS = `${DISCOVERY}/singers` // 歌手
const LATEST_MUSIC = `${DISCOVERY}/latestmusic` // 最新音乐
const RECOMMEND_DAILY = `${DISCOVERY}/recommend_daily` // 每日歌曲推荐

const VIDEOS = '/videos'
const VIDEO = `${VIDEOS}/video` // 视频
const MV = `${VIDEOS}/mv` // MV

const SEARCH = '/search'

const SONG_LISTS = '/songlists'
// 动态路由
const SONG_LIST_DETAIL = `${SONG_LISTS}/:songlistId`

const DOWNLOAD = '/download'
const CLOUD = '/cloud'
const COLLECTION = '/collection'

const DEFAULT_ROUTE: string = DISCOVERY

const ROUTES = {
  ROOT,
  DEFAULT_ROUTE,
  DISCOVERY,
  RECOMMENDATION,
  SONG_LIST,
  LEADER_BOARD,
  SINGERS,
  LATEST_MUSIC,
  RECOMMEND_DAILY,
  VIDEOS,
  VIDEO,
  MV,
  SEARCH,
  SONG_LISTS,
  SONG_LIST_DETAIL,
  DOWNLOAD,
  CLOUD,
  COLLECTION,
}

export default ROUTES

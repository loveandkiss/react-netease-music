import axios from 'helpers/axios'
import { IGetAlbumResponse } from './types/album'

type GetAlbumFn = (id: number) => Promise<IGetAlbumResponse>

// 获取唱片/专辑
const getAlbum: GetAlbumFn = async (id) => {
  const response = await axios({
    url: '/album',
    params: {
      id,
    },
  })

  return response
}

export default {
  getAlbum,
}

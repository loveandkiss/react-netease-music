export interface IArtist {
  albumSize: number,
  id: number,
  img1v1Id: number,
  img1v1Url: string,
  musicSize: number,
  name: string,
  picId: number,
  picUrl: string,
  topicPerson: number,
  alia?: string[],
  alias?: string[]
}

export interface IAlbum {
  artist: IArtist,
  artists?: IArtist[],
  blurPicUrl?: string,
  copyrightId?: number,
  description?: string,
  id: number,
  mark: number,
  name: string,
  picId: number,
  picUrl: string,
  publishTime: number,
  size: number,
  status: number,
  subType: string,
  type: string
}

export interface IMV {
  artistId: number,
  artistName: string,
  artists: IArtist[],
  cover: string,
  duration: number,
  id: number,
  mark: number,
  mv: any,
  name: string,
  playCount: number,
  subed: boolean
}

export interface IMusic {
  album: IAlbum,
  alias: string[],
  artists: IArtist[],
  copyrightId?: number,
  duration: number,
  fee?: number,
  ftype?: number,
  id: number,
  mark?: number,
  mvid?: number,
  name: string,
  status?: number,
  picUrl?: string
}

export interface IMyMusic {
  id: number,
  name: string,
  artists: IArtist[],
  duration: number,
  picUrl?: string,
  [key: string]: any
}

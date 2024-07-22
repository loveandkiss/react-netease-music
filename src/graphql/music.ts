import { gql } from '@apollo/client'

// 定义 GraphQL 查询
// create a GraphQL query named getSonglistDetail
export const getSonglistDetail = gql`
  query GetSonglistDetail($id: String!) {
    getSonglistDetail(id: $id) {
      songlist {
        id
        name
        coverImgUrl
        createTime
        creator {
          nickname
          avatarUrl
        }
        tags
        trackCount
        playCount
        description
      }
      songs {
        id
        name
        fee
        artists {
          name
        }
        album {
          id
          name
        }
        duration
        picUrl
      }
    }
  }
`

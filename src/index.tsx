import React from 'react'
import ReactDOM from 'react-dom'
// Apollo
// 这段代码是用于在一个 React 应用程序中设置和配置 Apollo 客户端，以便可以发起 GraphQL 查询，并通过 ApolloProvider 提供数据和功能到整个应用程序中。一旦配置完成，你可以使用 Apollo 客户端来执行查询，并将结果缓存在客户端以提高性能。
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import App from './pages/App'
import { GRAPHQL_SERVER } from 'constants/server'

import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import './styles/global.module.css'

// Apollo Client 提供的一个函数，用于创建一个 HTTP 连接到 GraphQL 服务器。这个链接将用于将查询发送到服务器并接收响应。
const httpLink = new HttpLink({
  uri: GRAPHQL_SERVER,
})
// 等同于
// const httpLink = createHttpLink({
//   uri: GRAPHQL_SERVER,
// })

// The setContext function accepts a function that returns either an object or a promise, which then returns an object to set the new context of a request. It receives two arguments: the GraphQL request being executed, and the previous context. This link makes it easy to perform the asynchronous lookup of things like authentication tokens and more.
const authLink = setContext((_, { headers }) => {
  const session = JSON.parse(localStorage.getItem('__session') || '{}')
  return {
    headers: {
      ...headers,
      'netease-user-id': session.userId,
      'netease-token': session.token,
      'netease-nick-name': session.profile?.nickname && encodeURIComponent(session.profile?.nickname),
    },
  }
})

console.log('authLink', authLink)
// 1. Install dependencies => 初始化 Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink), // 连接 authLink 和 httpLink
  cache: new InMemoryCache(),
})

// 2. 在应用中集成 Apollo
// Connect your client to React => 将 Apollo Client 并绑定到 React 应用
const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

const render = () => {
  ReactDOM.render(<Root />, document.getElementById('root'))
}

render()

// Hot Module Replacement
if ((module as any).hot) {
  ;(module as any).hot.accept(['./pages/App.tsx'], () => render())
}

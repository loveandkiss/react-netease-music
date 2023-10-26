# React Netease Music

React Netease Music——一个基于 React、TypeScript 的高仿网易云 mac 客户端播放器。

## 项目体验地址

[高仿网易云音乐播放器——音为爱呀 😍](http://www.uniquemo.cn/discovery)

## 功能列表

- [x] 登录/登出（目前仅支持手机密码登录）
- [x] 发现页
  - [x] banner
  - [x] 推荐歌单
  - [x] 推荐最新音乐
  - [x] 推荐 MV（仅是入口，详情待实现）
- [x] 每日歌曲推荐页
- [x] 全部歌单页
  - [x] 歌单分类查询
- [x] 最新音乐页
- [x] 歌单详情页
- [x] 音乐播放详情页
  - [x] 歌曲评论
  - [x] 点赞/取消点赞歌曲评论
  - [x] 歌词滚动
  - [x] 歌曲所在歌单
  - [x] 相似歌曲推荐
- [x] 播放记录功能
  - [x] 播放列表
  - [x] 历史记录
- [x] 搜索功能
  - [x] 热门搜索关键字
  - [x] 搜索建议
  - [x] 搜索结果页
- [x] 创建的歌单列表
- [x] 收藏的歌单列表
- [ ] 排行榜
- [ ] 所有歌手页
- [ ] 歌手详情页
- [ ] MV 相关的页面与功能
- [ ] 创建/编辑/删除歌单
- [ ] 私信/@我/评论等通知功能
- [ ] 主题换肤
- [ ] ......看心情添加功能 😂

注意：部分歌曲可能由于版权问题无法播放喔。

## 技术栈

- React，使用 react hook 做状态管理，没有使用额外的数据管理库。
- TypeScript，用 TypeScript 确实可以提高效率 😃（容易发现错误）。
- Graphql，使用@apollo/client 优化部分页面性能。
- @blueprintjs 组件库，主要使用其中的 Icon、Dialog、Toast、Spinner 等。
- 逐渐使用[@uniquemo/mui](https://github.com/uniquemo/mui)替换@blueprinjs（Doing）。
- CSS Modules。
- Webpack。
- Eslint 做代码检查。

## API 接口

- [NeteaseCloudMusicApi](https://binaryify.github.io/NeteaseCloudMusicApi)
- [Express Graphql Server](https://github.com/uniquemo/express-graphql-server)

## 播放器的相关截图

![01_个性推荐页](./resources/01_个性推荐页.png)

![02_每日歌曲推荐](./resources/02_每日歌曲推荐.png)

![03_全部歌单](./resources/03_全部歌单.png)

![04_最新音乐页](./resources/04_最新音乐页.png)

![05_歌单详情页](./resources/05_歌单详情页.png)

![06_音乐播放详情](./resources/06_音乐播放详情.png)

![07_播放记录功能](./resources/07_播放记录功能.png)

![08_搜索功能](./resources/08_搜索功能.png)

![09_搜索结果页](./resources/09_搜索结果页.png)

## 项目启动

- 首先将上面 👆 提到的 API 接口部分，两个 API 服务代码拉到本地，并启动对应的服务；
- [安装`pnpm`包管理工具](https://pnpm.io/installation)；
- 然后拉取本仓库代码，并执行以下命令：

```
pnpm install
pnpm run dev:local
```

- 最后在浏览器中访问：`http://localhost:8080`

## 学习笔记 📒

### @apollo/client 与 @apollo/server 区别

@apollo/client 和 @apollo/server 是 Apollo GraphQL 库的两个不同部分，用于客户端和服务器端的 GraphQL 开发。它们有以下区别：

1. @apollo/client：

- 客户端使用：@apollo/client 是用于在前端或客户端应用程序中执行 GraphQL 查询和管理本地状态的库。它提供了一系列工具和函数，使你能够发起 GraphQL 查询、缓存查询结果、进行状态管理，并在客户端应用程序中实现数据获取和交互。

- 核心功能：主要包括 Apollo Client，它是一个功能强大的状态管理工具，用于与 GraphQL 服务器通信，管理数据缓存和执行查询。

- 主要依赖：@apollo/client 通常与前端框架（如 React、Angular、Vue 等）一起使用，以便在前端应用中集成 GraphQL 查询和状态管理。

2. @apollo/server：

- 服务器端使用：@apollo/server 是用于在服务器端实现 GraphQL API 的库。它提供了工具和中间件，用于创建和处理 GraphQL 查询、定义数据模型和执行查询解析。

- 核心功能：主要包括 Apollo Server，它是一个 GraphQL 服务器库，使你能够定义 GraphQL 模式、处理查询和数据解析，以便提供 GraphQL API。

- 主要依赖：@apollo/server 通常在服务器端应用程序中使用，例如 Node.js 应用程序，以创建和暴露 GraphQL API。

总结，@apollo/client 是用于前端应用程序，用于执行 GraphQL 查询和状态管理，而 @apollo/server 用于服务器端，用于创建和暴露 GraphQL API。这两个库协同工作，使你能够构建完整的客户端-服务器端应用程序，其中客户端通过 @apollo/client 与服务器端通过 @apollo/server 通信。

### Apollo 与 GraphQL 区别

Apollo 和 GraphQL 是两个不同但密切相关的概念，下面我会解释它们之间的区别：

1. GraphQL：

- GraphQL 是一种查询语言和运行时环境：GraphQL 是一种用于查询和操作数据的查询语言。它允许客户端指定其需要的数据，而不是由服务器端提供预定义的端点或资源。服务器端根据客户端的查询请求返回相应的数据。GraphQL 还定义了一套强大的类型系统，用于描述数据模型和查询的结构。

- 协议独立：GraphQL 不绑定于任何特定协议，你可以在不同的网络传输协议上使用它，如 HTTP、WebSocket 等。

- 服务器实现多样：GraphQL 有多种服务器实现，包括 Apollo Server、Express GraphQL、Prisma GraphQL 等。开发者可以根据自己的需求选择合适的实现。

- 数据灵活性：GraphQL 允许客户端精确地指定所需的数据，从而减少了不必要的数据传输和提高了效率。这种数据的精确控制可以避免过度获取或不足获取数据。

2. Apollo：

- Apollo 是一个 GraphQL 生态系统：Apollo 是一个提供多种工具和库的 GraphQL 生态系统，用于开发客户端和服务器端的 GraphQL 应用。

- Apollo Client：Apollo Client 是用于前端应用程序的 GraphQL 客户端库，用于发起 GraphQL 查询、管理本地状态和与服务器端通信。

- Apollo Server：Apollo Server 是用于创建 GraphQL API 的服务器库，它可以与不同的后端数据源集成，并为客户端提供一个 GraphQL 接口。

- 其他工具：Apollo 还提供了其他工具，如 Apollo Studio（用于监视和管理 GraphQL 服务）、Apollo Federation（用于构建分布式 GraphQL 微服务）、以及其他库和工具，以提供更多的功能和增强开发体验。

总之，GraphQL 是一种查询语言和运行时环境，用于定义和查询数据。而 Apollo 是一个构建在 GraphQL 之上的生态系统，提供了用于客户端和服务器端的工具和库，以帮助开发者更轻松地构建、部署和管理 GraphQL 应用。 Apollo Client 和 Apollo Server 是 Apollo 生态系统中的两个核心组件，用于构建客户端和服务器端的 GraphQL 应用程序。

### Git

git remote add origin https://github.com/loveandkiss/react-netease-music.git
git branch -M main
git push -u origin main

git config --list

查看远程仓库的 URL
git remote get-url origin

修改远程仓库的 URL
git remote set-url origin <新的 URL>

添加远程仓库
git remote add origin <远程仓库 URL>

### HTMLAudioElement

HTMLAudioElement 是 HTML5 中用于表示音频元素的 DOM 接口。它用于操作和控制网页上的音频内容。

属性：

src: 用于设置或获取音频文件的 URL。可以使用该属性来指定要播放的音频文件。

autoplay: 一个布尔属性，如果设置为 true，音频在加载后将自动开始播放。

controls: 一个布尔属性，如果设置为 true，则显示浏览器默认的音频控制条，包括播放、暂停、音量调节等按钮。

loop: 一个布尔属性，如果设置为 true，音频将循环播放。

volume: 用于设置或获取音频的音量，取值范围为 0（静音）到 1（最大音量）。

currentTime: 用于设置或获取音频的当前播放时间（以秒为单位）。

duration: 获取音频的总时长（以秒为单位）。

paused: 一个只读属性，表示音频是否处于暂停状态。

方法：

play(): 开始播放音频。

pause(): 暂停音频播放。

load(): 重新加载音频元素。

canPlayType(type): 检查浏览器是否能够播放指定 MIME 类型的音频文件。

### React.FC 与 React.ReactElement 区别

React.FC 和 React.ReactElement 是 React 中两个不同的概念，用于描述不同的方面。

1. React.FC 是一个 TypeScript 中的泛型类型定义，它用于定义函数组件的类型。具体来说，React.FC 表示一个接受指定 props 类型的函数组件。它类似于 React.FunctionComponent，实际上是 React.FunctionComponent 的简写。

```jsx
type MyComponentProps = {
  message: string,
}

const MyComponent: React.FC<MyComponentProps> = (props) => {
  return <div>{props.message}</div>
}
```

上面的代码中，React.FC<MyComponentProps> 表示 MyComponent 是一个函数组件，其 props 类型为 MyComponentProps，这使得 TypeScript 可以检查传递给组件的 props。

2. React.ReactElement 不是一个类型，而是一个 React 元素的实例。它代表了一个虚拟 DOM 元素，可以是组件、HTML 元素或其他 React 元素。你通常会看到 React.ReactElement 在 JSX 表达式中，表示将要渲染的 React 元素。

```jsx
const element = <div>Hello, world!</div> // element 是 React.ReactElement 类型
```

在这个示例中，element 是一个 React.ReactElement，表示要渲染的 <div> 元素。

所以，总结一下：

React.FC 是一个用于定义函数组件类型的 TypeScript 泛型类型。
React.ReactElement 是一个表示虚拟 DOM 元素的实例，用于表示将要渲染的元素。

### Typescript 高级类型 Record

```jsx

interface EmployeeType {
    id: number
    fullname: string
    role: string
}

let employees: Record<number, EmployeeType> = {
    0: { id: 1, fullname: "John Doe", role: "Designer" },
    1: { id: 2, fullname: "Ibrahima Fall", role: "Developer" },
    2: { id: 3, fullname: "Sara Duckson", role: "Developer" },
}


```

### useMemo

```jsx
// useMemo(calculateValue, dependencies)
// calculateValue：要缓存计算值的函数。它应该是一个没有任何参数的纯函数，并且可以返回任意类型。
// React 将会在首次渲染时调用该函数；在之后的渲染中，如果 dependencies 没有发生变化，React 将直接返回相同值。否则，将会再次调用 calculateValue 并返回最新结果，然后缓存该结果以便下次重复使用。

// 示例1
const audioInfo = useMemo(() => {
  return {
    audio,
    state: audioState,
    controls: audioControls,
    ref: audioRef,
  }
}, [musicUrl, audio, audioState, audioControls, audioRef])

// 示例2
const playList = useMemo(() => playListLocalStorage.getItem(), [musicId])
```

### audio 标签

<audio>元素在 HTML5 中提供了一系列属性和方法，用于控制和操作网页中的音频内容。以下是与<audio>标签相关的一些常见属性和方法：

属性：

autoplay：当设置时，该属性指示浏览器在准备好时自动开始播放音频。

controls：包含 controls 属性时，将向用户显示音频播放器的播放控件（播放、暂停、音量等）。

loop：如果包含 loop 属性，音频在达到结尾时将重复播放。

preload：指定浏览器应该如何加载音频文件。可能的值包括"auto"、"metadata"和"none"。例如，preload="auto"指示浏览器预加载整个音频文件。

src：指定要播放的音频文件的 URL。如果浏览器支持，将加载并播放该文件。

type：指示音频文件的 MIME 类型。这对于浏览器兼容性很重要，因为它帮助浏览器确定使用哪种格式。

方法：

play()：play()方法开始播放音频元素，如果其处于暂停或停止状态。

pause()：pause()方法暂停音频元素的播放。

load()：load()方法重置音频元素并重新加载音频文件。

canPlayType(type)：此方法检查浏览器是否能够播放指定的音频类型。它返回三个值之一："probably"（可能可以播放），"maybe"（可能可以播放），或空字符串（不太可能可以播放）。

### 枚举数据类型

```tsx
// 枚举
export enum MODE {
  PLAY_IN_ORDER = 'PLAY_IN_ORDER',
  SINGLE_CYCLE = 'SINGLE_CYCLE',
  SHUFFLE_PLAYBACK = 'SHUFFLE_PLAYBACK',
}

// Reducer
export interface IState {
  musicId: number
  musicUrl: string
  music?: IMyMusic
  playMode: MODE // 枚举类型
  showLyric: boolean
}

const state: IState = {
  musicId: 123456,
  musicUrl: 'http://www.baidu.com',
  playMode: MODE.SINGLE_CYCLE,
  showLyric: false,
}

// 例子
enum Flag {
  success = 1,
  error = 2,
}
let s: Flag = Flag.success
console.log(s)
```

### useReducer

向组件里面添加一个 reducer

```tsx
// useReducer 是一个 React Hook，它允许你向组件里面添加一个 reducer
const [logState, logDispath] = useReducer(logReducer, logInitialState)
const [state, dispatch] = useReducer(playMusicReducer, initialState)
```

### createContext 与 useConetext 结合使用

Step1: createContext 创建上下文

```tsx
// playMusic.ts
import { createContext } from 'react'

export const initialState = {
  musicId: 0,
  musicUrl: '',
  playMode: playModeLocalStorage.getItem(), // 本地localStorage获取
  showLyric: false,
}
// Context
export const PlayMusicStateContext = createContext<IState>(initialState)
export const PlayMusicDispatchContext = createContext<React.Dispatch<IAction>>(() => {})
```

Step2: useConetext 使用上下文

```tsx
// 可以参考本项目的 app.tsx 例子🌰

import { useContext } from 'react'
import { PlayMusicDispatchContext } from '*/*/playMusic.ts'
// 通过useContext从上下文中获取dispatch
const dispatch = useContext(PlayMusicDispatchContext)
```

```tsx
// 参考官方文档例子🌰
```

Step3: 提供上下文

```tsx
// 参考本项目的 app.tsx 例子🌰
```

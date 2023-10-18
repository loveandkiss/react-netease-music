# 这是 Dockerfile 的第一行，指定了基础镜像。在此示例中，它使用了 Node.js 的最新版本作为基础镜像，并将其命名为 "builder"。这意味着你正在创建一个多阶段构建（Multi-Stage Build），其中第一阶段用于构建应用程序。
FROM node:latest AS builder
# 设置工作目录为 /usr/src/app，在该目录下进行后续操作。
WORKDIR /usr/src/app
# 在构建阶段，安装全局依赖 pnpm。pnpm 是一个包管理工具，类似于 npm 或 yarn，用于管理 Node.js 项目的依赖。
RUN npm install -g pnpm
# 将 package.json 和 pnpm-lock.yaml 文件复制到工作目录中。这是为了确保只有在这两个文件内容变化时才会重新执行 pnpm install，以提高构建效率。
COPY package.json pnpm-lock.yaml ./
# 运行 pnpm install 命令，安装应用程序的依赖项。
RUN pnpm install
# 将应用程序的其余文件复制到工作目录中，包括应用程序的源代码等。
COPY . ./
# 运行 pnpm run build 命令，用于构建应用程序。这通常会将源代码编译为生产可部署的文件。
RUN pnpm run build

# 这是 Dockerfile 的第二个阶段。它开始了第二阶段的构建，使用了 Nginx 作为基础镜像。
FROM nginx
# 从之前构建阶段的 "builder" 阶段中拷贝构建好的应用程序文件（通常在 dist 目录下）到 Nginx 的默认静态文件目录 /usr/share/nginx/html 中。
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
# 将自定义的 Nginx 配置文件 nginx.conf 复制到容器中，以配置 Nginx 服务器。
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 定义容器启动时运行的默认命令。在这里，它启动 Nginx 并以前台模式运行，以保持容器在前台运行。
CMD ["nginx", "-g", "daemon off;"]

# 这个 Dockerfile 利用了多阶段构建，首先构建 Node.js 应用程序，然后将构建好的静态文件拷贝到 Nginx 容器中。这种方法可以减小最终镜像的大小，因为只包含了 Nginx 和应用程序静态文件，而不包含构建工具或依赖项。这有助于提高镜像的安全性和效率。

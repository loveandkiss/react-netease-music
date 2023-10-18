#!/bin/sh
# 这行代码通过运行 Node.js 命令，从项目的 package.json 文件中提取应用的版本号并将其存储在 CURRENT_VERSION 变量中。
CURRENT_VERSION=$(node -p "require('./package.json').version")
# 类似于上一行，这行代码从 package.json 文件中提取应用的名称并将其存储在 PKG_NAME 变量中。
PKG_NAME=$(node -p "require('./package.json').name")
# 这一行构建了 Docker 镜像的名称，通常采用 name:version 的格式，其中 name 是应用的名称，而 version 是上述步骤中提取的版本号。
IMAGE_NAME="$PKG_NAME:$CURRENT_VERSION"
# 此行生成 Docker 容器的名称，它通常采用 container-name-version 的格式，其中 name 是应用的名称，而 version 是应用的版本号。
CONTAINER_NAME="container-$PKG_NAME-$CURRENT_VERSION"
echo $CURRENT_VERSION
echo $PKG_NAME
echo $IMAGE_NAME
echo $CONTAINER_NAME

# 生成docker image
# 这一行使用 Docker 命令构建 Docker 镜像，使用上面定义的 IMAGE_NAME 作为镜像的名称。. 表示 Dockerfile 位于当前目录中。
docker image build -t $IMAGE_NAME .

# 停止运行在8080端口的container
# https://stackoverflow.com/questions/56936858/can-i-stop-a-docker-container-by-its-exposed-port
for id in $(docker ps -q)
do
  if [[ $(docker port "${id}") == *"8080"* ]]; then
    echo "stopping container ${id}"
    # 如果容器正在监听 8080 端口，这行代码将停止容器。
    docker container stop "${id}"
    # 接着，它将删除已经停止的容器。
    docker container rm "${id}"
  fi
done

# 运行docker container
# 这一行启动一个新的 Docker 容器，使用之前定义的 CONTAINER_NAME 作为容器的名称，将容器的 80 端口映射到主机的 8080 端口上，并使用之前构建的 Docker 镜像（$IMAGE_NAME）。
docker container run -d --name $CONTAINER_NAME -p 8080:80 $IMAGE_NAME


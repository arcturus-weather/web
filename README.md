<div align="center">

<h1>小冰天气</h1>

使用 vue 和 nestjs 实现的全栈项目

<a href="https://github.com/ICE99125/iweather-vue/issues">
    <img alt="issues" src="https://img.shields.io/github/issues/arcturus-org/weather">
</a>

<a href="https://github.com/arcturus-org/weather/pulls">
    <img alt="pull requests" src="https://img.shields.io/github/issues-pr/arcturus-org/weather">
</a>

<a href="https://img.shields.io/github/forks/ICE99125/iweather-vue?style=for-the-badge">
    <img alt="forks" src="https://img.shields.io/github/forks/arcturus-org/weather">
</a>

<a href="https://img.shields.io/github/stars/ICE99125/iweather-vue?style=for-the-badge">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/arcturus-org/weather">
</a>

[demo](https://ice-weather.netlify.app/) | [backend](./server) | [frontend](./web) | [icons](https://iweather-icons.netlify.app) | [微信小程序](./weapp)

</div>

### Docker 部署

安装 docker

```bash
sudo curl -sSL get.docker.com | sh
```

修改国内镜像源

```bash
sudo mkdir -p /etc/docker
```

```bash
sudo vim /etc/docker/daemon.json
```

```
{
  "registry-mirrors": [
     "https://docker.mirrors.ustc.edu.cn",
     "https://mirror.ccs.tencentyun.com",
     "https://hub-mirror.c.163.com",
     "https://reg-mirror.qiniu.com"
  ]
}
```

```bash
systemctl daemon-reload
```

```bash
systemctl restart docker
```

测试安装是否成功

```bash
sudo docker run hello-world
```

安装 docker-compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

测试安装是否成功

```bash
docker-compose --version
```

在 `web` 和 `server` 文件夹下新建 `.env` 文件(具体内容见相应文件夹), 最后运行

```bash
sudo docker-compose up
```

访问地址 `http://localhost`

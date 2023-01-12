<div align="center">

<h1>小冰天气(iweather)</h1>

[![GitHub issues](https://img.shields.io/github/issues/ICE99125/iweather-vue?style=for-the-badge)](https://github.com/ICE99125/iweather-vue/issues) [![GitHub forks](https://img.shields.io/github/forks/ICE99125/iweather-vue?style=for-the-badge)](https://github.com/ICE99125/iweather-vue/network) [![GitHub stars](https://img.shields.io/github/stars/ICE99125/iweather-vue?style=for-the-badge)](https://github.com/ICE99125/iweather-vue/stargazers)

</div>

## 本地开发

### 安装依赖

```bash
pnpm install
```

### 环境变量

根目录下新建 .env 文件

```
VUE_QWEATHER_KEY=xxx # 和风天气

VUE_QQMAP_KEY=xxx # 腾讯地图 ( 确保 productName 与腾讯地图的一致 )

VUE_SERVER_BASEURL=xxx # 小冰天气后端地址
```

### 运行

```bash
quasar dev
```

### 格式化文件

```bash
pnpm run format
```

### 构建

```bash
quasar build
```

启用 sorcemap

```
quasar build --debug
```

### 其他

查看 [quasar 配置](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js)

## 部署 Netlify

构建时添加环境变量 VUE_QQMAP_KEY(腾讯地图) 和 VUE_QWEATHER_KEY(和风天气)

## [demo](https://iceweather.netlify.app/)

## 小冰天气后端地址

[点击进入](https://github.com/ice-universes/weather_serve.git)


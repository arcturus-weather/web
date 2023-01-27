<div align="center">
  <h1>小冰天气服务端</h1>
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
</div>

## 接口预览

![image-20230124122401353](../assets/image-20230124122401353.png)

## 本地开发

### 安装依赖

```bash
pnpm install
```

### 运行

创建 `.env` 并填写

```
MONGODB_URI=mongodb://root:root@mongodb:27017/users?authSource=admin&readPreference=primary # mongodb 地址

SECRET=ice-weather # jwt 密钥

EXPIRES=365d # token 过期时间, 默认 365d

# 以下用于发送验证码

MAIL_HOST=smtp.exmail.qq.com # 邮箱服务器地址

MAIL_PORT=465 # 服务器端口

MAIL_ACCOUNT=xxx # 邮箱账号

MAIL_PASSWORD=xxx # 邮箱密码
```

关于邮箱, 这里可以采用腾讯企业邮箱 ( 不写 host 的话默认腾讯企业邮箱 )

![image-20230124122451484](../assets/image-20230124122451484.png)

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## 部署方案

### [heroku](https://dashboard.heroku.com)

点击 create new app

![image-20230124122947384](../assets/image-20230124122947384.png)

按照提示完成部署, 部署结束后进入 settings

![image-20230124123141831](../assets/image-20230124123141831.png)

下拉后添加环境变量

![image-20230124123834239](../assets/image-20230124123834239.png)

再次手动部署即可

![image-20230124123910144](../assets/image-20230124123910144.png)

![image-20230124123932248](../assets/image-20230124123932248.png)

### [render](https://render.com)

![image-20230124124141929](../assets/image-20230124124141929.png)

![image-20230124124216752](../assets/image-20230124124216752.png)

修改默认的构建命令

![image-20230124124550887](../assets/image-20230124124550887.png)

最后修改环境变量并手动部署

![image-20230124124810539](../assets/image-20230124124810539.png)

## 免费 mongodb 集群

- [mongodb 官网](https://cloud.mongodb.com)

- [mogenius 官网](https://mogenius.com)

## License

[MIT licensed](LICENSE)

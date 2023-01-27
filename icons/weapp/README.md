# weapp

![display.png](https://s1.ax1x.com/2022/06/05/XwEzWj.png)

## 本地开发

```bash
pnpm i ice-weapp-svg-cli -g
```

生成图标组件

```bash
ice-gen
```

```bash
pnpm run dev
```

可以通过传递 `--open` 指令自动打开小程序开发者工具

```bash
pnpm run dev:open
```

## 构建打包

```bash
pnpm run build
```

## 使用

```bash
pnpm i iweather_icon_weapp
```

修改 project.config.json

```json
{
  "setting": {
    "packNpmManually": true,
    "packNpmRelationList": [
      {
        "packageJsonPath": "./package.json",
        "miniprogramNpmDistDir": "./"
      }
    ]
  }
}
```

点击 `工具` - `构建 npm` , 引入

```json
{
  "usingComponents": {
    "i-icon": "iweather_icon_weapp/i-icon/index"
  }
}
```

```html
<view class="container">
  <i-icon size="{{60}}" name="100" />
  <i-icon size="60px" name="CLEAR_NIGHT" type="caiyun" />
  <i-icon size="{{60}}" name="warnings-1001" />
</view>
```

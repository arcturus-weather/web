# weapp-svg-cli

![npm](https://img.shields.io/npm/v/ice-weapp-svg-cli) ![weapp](https://img.shields.io/npm/dt/ice-weapp-svg-cli)

## 使用

```bash
pnpm i ice-weapp-svg-cli -g
```

### 生成配置文件

```bash
ice-init
```

```json
{
  "assetsDir": "../assets",
  "outputDir": "./src/components/weather-icon",
  "defaultSize": 18
}
```

相对于命令执行的位置

### 生成小程序组件

```bash
ice-gen
```

```html
<!--warnings-1001-->
<view wx:if="{{name === 'warnings-1001'}}" style="width:{{iconSize}};height:{{iconSize}};background:url({{quote}}data:image/svg+xml;utf8,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M449.4 284.9c2.7.6 5.4-1.4 5.6-4.2 6.8-93.1-55.3-176-140.4-193.6-85.2-17.6-178 33.3-201.2 114.6-25.6 89.7 24.7 139.4 31.3 148.5-48.9-10.5-96.1-79-94.1-133.2-2.7-.6-5.4 1.4-5.6 4.2-6.7 88.5 46 166.1 124.7 188.8-.3 0 21.4 4.6 21.1 4.6l20.3 1.5s56.6 4.5 115.4-33.9h-1c27.6-20.4 49.6-48 60.2-81.1 27.1-83.9-23.6-140.3-30.1-149.3 52.1 10.9 95.9 79.1 93.8 133.1zm-158.8-32c-2.4 23.6-24.1 40-47.2 36.3-.9-.2-1.8-.3-2.7-.5-21.9-5.2-35.5-27.1-30.3-49 5.1-21.6 26.7-35.4 48.7-30.4 19.8 4.3 33.5 23.3 31.5 43.6z' fill='%23e99311'/%3E%3C/svg%3E{{quote}})" class="icon"></view>
```

会根据 `assetsDir` 生成对应的代码, 如 `/assets/warnings/1001.svg` 就会生成上述代码

### 获取帮助

```bash
ice-help
```

## 本地测试

```bash
pnpm run build
```

```bash
npm link
```

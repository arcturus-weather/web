# iweather_icons_vue

![display.png](https://s1.ax1x.com/2022/06/05/XwEzWj.png)

## installation

```bash
pnpm install iweather_icons
```

## Usage

```ts
// 全局注册(main.ts)
import icon from 'iweather_icons';

createApp(App).use(icon).mount('#app');
```

```vue
<script setup>
// 按需引入
import { icon as IIcon } from 'iweather_icons';
</script>
```

```vue
<!-- 默认和风天气 -->
<i-icon name="100"></i-icon>

<!-- 预警 -->
<i-icon name="warnings-1001"></i-icon>

<!-- 设置大小 -->
<i-icon name="100" :size="20"></i-icon>
<i-icon name="100" size="20px"></i-icon>

<!-- 彩云天气 -->
<i-icon name="CLEAR_DAY" type="caiyun"></i-icon>
```

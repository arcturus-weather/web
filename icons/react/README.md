# iweather_icons_react

![display.png](https://s1.ax1x.com/2022/06/05/XwEzWj.png)

## installation

```bash
pnpm install iweather_icons_react
```

## Usage

```tsx
// app.tsx
import Icon from 'iweather_icons_react';

export default function App() {
  return (
    <div className="page-wrapper flex column">
      <div className="flex mb-50 column">
        <div className="mb-30">和风天气测试</div>
        <div>
          <Icon name="100" size={40}></Icon>
          <Icon name="101" size={50}></Icon>
          <Icon name="102" size={60}></Icon>
          <Icon name="103" size="70px"></Icon>
          <Icon name="warnings-1001"></Icon>
        </div>
      </div>

      <div className="flex mb-50 column">
        <div className="mb-30">彩云天气测试</div>
        <div>
          <Icon name="PARTLY_CLOUDY_DAY" type="caiyun"></Icon>
          <Icon name="PARTLY_CLOUDY_NIGHT" type="caiyun"></Icon>
          <Icon name="CLEAR_NIGHT" type="caiyun"></Icon>
          <Icon name="CLEAR_DAY" type="caiyun"></Icon>
          <Icon name="warnings-02" type="caiyun"></Icon>
        </div>
      </div>
    </div>
  );
}
```

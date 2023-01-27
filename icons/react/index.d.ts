import React from 'react';

export interface P {
  name: string;
  type?: 'qweather' | 'caiyun';
  size?: number | string;
}

declare module 'iweather_icons_react' {
  const component: React.FunctionComponent<P>;
  export default component;
}

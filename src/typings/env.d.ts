/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'i18n'
declare module 'utils/*'
declare module 'weather/*'
declare module 'plugins/*'
declare module '*.json'
declare module 'vue-i18n/*'
declare module '@appKey'

declare const qq: any
declare const TMap: any

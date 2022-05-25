declare module 'i18n'
declare module 'utils/uuid'
declare module 'utils/location'
declare module 'weather/models/air'
declare module 'weather/models/astronomy'
declare module 'weather/models/warnings'
declare module 'weather/models/livingIndex'
declare module 'weather/models/precipitation'
declare module 'weather/models/weatherItem'
declare module 'plugins/vuetify'
declare module 'plugins/webfontloader'

interface Date {
  format(fmt: string): string
  deltaDay(n: number): Date
}

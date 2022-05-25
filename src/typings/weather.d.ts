interface IComponent {
  co: number
  no: number
  no2: number
  o3: number
  so2: number
  pm2p5: number
  pm10: number
  nh3?: number
}

interface IAir {
  dateTime: Date
  aqi: number
  level: number
  category: string
  component: IComponent
}

interface IWarning {
  description: string
  title: string
  sender?: string
  start?: string
  end?: string
  // Only qWeather supports ↓
  status?: string
  level?: string
  type?: number
  typeName?: string
  related?: string
  urgency?: string
}

interface ISun {
  sunRise: Date
  sunSet: Date
}

interface IMoonPhase {
  dateTime: Date
  value: number
  name: string
  illumination: number
  icon: string
}

interface IMoon {
  moonRise: Date
  moonSet: Date
  moonPhase: Array<IMoonPhase>
}

interface ILivingIndex {
  type: number
  name: string
  level: number
  category: string
  description: string
}

interface IPrecip {
  dateTime: Date
  precip: number
  type: string // rain | snow
}

interface IFuturePrecip {
  summary: string
  precip: IPrecip
}

interface IWeatherItem {
  dateTime: Date
  temperature: ITemperature
  feelsLike: ITemperature
  dewPoint: number
  description: string
  icon: number
  wind: IWind
  visibility?: number
  clouds?: number
  pop?: number // Probability of precipitation
  precip?: number // current precipitation
}

interface ITemperature {
  day: number
  min?: number
  max?: number
  night?: number
  eve?: number
  morn?: number
}

interface IWind {
  wind360: number
  windDir?: string
  windScale?: string
  windSpeed: string
  windGust?: number
}

interface IDailyItem {
  dateTime: Date
  sun: ISun
  moon: IMoon
  dayDesc: string
  dayIcon: number
  nightDesc?: string
  nightIcon?: number
  temperature: ITemperature
  dayWind: IWind
  nightWind: IWind
  humidity: number
  precip?: number
  pop?: number
  pressure: number
  visibility: number
  clouds?: number
  uvIndex: number
}

interface IWeather {
  uuid: string
  location: Location
  air: IAir
  sun: ISun
  moon: IMoon
  waring: Array<IWarning>
  livingIndices: Array<ILivingIndex>
  precip: IFuturePrecip
  next24h: Array<IWeatherItem>
  next7days: Array<IDailyItem>
  now: IWeatherItem
}

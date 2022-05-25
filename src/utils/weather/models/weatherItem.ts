export class WeatherItem implements IWeatherItem {
  dateTime: Date
  temperature: ITemperature
  feelsLike: ITemperature
  dewPoint: number
  description: string
  icon: number
  wind: IWind
  visibility?: number
  clouds?: number
  pop?: number
  precip?: number

  constructor({
    dateTime,
    temperature,
    feelsLike,
    dewPoint,
    description,
    icon,
    wind: wind,
    visibility,
    clouds,
    pop,
    precip,
  }: IWeatherItem) {
    this.dateTime = dateTime
    this.temperature = temperature
    this.feelsLike = feelsLike
    this.dewPoint = dewPoint
    this.description = description
    this.icon = icon
    this.wind = wind
    this.visibility = visibility
    this.clouds = clouds
    this.pop = pop
    this.precip = precip
  }

  get datetime(): string {
    return this.dateTime.format('yyyy-MM-dd hh:mm:ss')
  }

  get time(): string {
    return this.dateTime.format('hh:mm')
  }
}

export class DailyItem implements IDailyItem {
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

  constructor({
    dateTime,
    sun,
    moon,
    dayDesc,
    dayIcon,
    nightDesc,
    nightIcon,
    temperature,
    dayWind,
    nightWind,
    humidity,
    precip,
    pop,
    pressure,
    visibility,
    clouds,
    uvIndex,
  }: IDailyItem) {
    this.dateTime = dateTime
    this.sun = sun
    this.moon = moon
    this.dayDesc = dayDesc
    this.dayIcon = dayIcon
    this.nightDesc = nightDesc
    this.nightIcon = nightIcon
    this.temperature = temperature
    this.dayWind = dayWind
    this.nightWind = nightWind
    this.humidity = humidity
    this.precip = precip
    this.pop = pop
    this.pressure = pressure
    this.visibility = visibility
    this.clouds = clouds
    this.uvIndex = uvIndex
  }

  get datetime(): string {
    return this.dateTime.format('yyyy-MM-dd hh:mm:ss')
  }

  get time(): string {
    return this.dateTime.format('hh:mm')
  }
}

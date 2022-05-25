import Air from 'weather/models/air'
import { Sun, MoonPhase, Moon } from 'weather/models/astronomy'
import Warning from 'weather/models/warnings'
import LivingIndex from 'weather/models/livingIndex'
import Precipitation from 'weather/models/precipitation'
import { WeatherItem, DailyItem } from 'weather/models/weatherItem'
import uuid from 'utils/uuid'


class Weather implements IWeather {
  readonly uuid: string
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

  constructor({
    location,
    air,
    sun,
    moon,
    waring,
    livingIndices,
    precip,
    next24h,
    next7days,
    now,
  }: IWeather) {
    this.uuid = uuid()
    this.location = location
    this.air = air
    this.sun = sun
    this.moon = moon
    this.waring = waring
    this.livingIndices = livingIndices
    this.precip = precip
    this.next7days = next7days
    this.next24h = next24h
    this.now = now
  }
}

export {
  Air,
  Sun,
  MoonPhase,
  Moon,
  Warning,
  LivingIndex,
  Precipitation,
  WeatherItem,
  DailyItem,
  Weather,
}

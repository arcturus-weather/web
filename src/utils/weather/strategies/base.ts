// 策略...
export abstract class Strategies {
  abstract getAqi(loc: Location): Promise<any>
  abstract getSunTime(loc: Location, date?: string): Promise<any>
  abstract getMoonTime(loc: Location, date?: string): Promise<any>
  abstract getDisasterWaring(loc: Location): Promise<any>
  abstract getLivingIndices(loc: Location, type: number): Promise<any>
  abstract getPrecipitationInTheNextTwoHours(loc: Location): Promise<any>
  abstract getWeatherInTheNext24Hours(loc: Location): Promise<any>
  abstract getWeatherInTheNext7Days(loc: Location): Promise<any>
  abstract getNowWeather(loc: Location): Promise<any>
  abstract getAllweather(loc: Location): Promise<any>
}

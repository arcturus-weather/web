export default class Air implements IAir {
  dateTime: Date
  aqi: number
  level: number
  category: string
  component: IComponent

  constructor({ dateTime, aqi, level, category, component }: IAir) {
    this.dateTime = dateTime
    this.aqi = aqi
    this.level = level
    this.category = category
    this.component = component
  }
}

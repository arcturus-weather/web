export default class Precipitation implements IPrecip {
  dateTime: Date
  precip: number
  type: string

  constructor({ dateTime, precip, type }: IPrecip) {
    this.dateTime = dateTime
    this.precip = precip
    this.type = type
  }
}

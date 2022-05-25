export class Sun implements ISun {
  sunRise: Date
  sunSet: Date

  constructor({ sunRise, sunSet }: ISun) {
    this.sunRise = sunRise
    this.sunSet = sunSet
  }

  get sunrise(): string {
    return this.sunRise.format('hh:mm')
  }

  get sunset(): string {
    return this.sunSet.format('hh:mm')
  }
}

export class MoonPhase implements IMoonPhase {
  dateTime: Date
  value: number
  name: string
  illumination: number
  icon: string

  constructor({ dateTime, value, name, illumination, icon }: IMoonPhase) {
    this.dateTime = dateTime
    this.value = value
    this.name = name
    this.illumination = illumination
    this.icon = icon
  }

  get datetime() {
    return this.dateTime.format('hh:mm')
  }
}

export class Moon implements IMoon {
  moonRise: Date
  moonSet: Date
  moonPhase: Array<IMoonPhase>

  constructor({ moonRise, moonSet, moonPhase }: IMoon) {
    this.moonPhase = moonPhase
    this.moonRise = moonRise
    this.moonSet = moonSet
  }

  get moonrise(): string {
    return this.moonRise.format('hh:mm')
  }

  get moonset(): string {
    return this.moonSet.format('hh:mm')
  }
}

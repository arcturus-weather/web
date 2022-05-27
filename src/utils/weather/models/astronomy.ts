export class Sun implements ISun {
  sunRise: Date
  sunSet: Date

  constructor({ sunRise, sunSet }: ISun) {
    this.sunRise = sunRise
    this.sunSet = sunSet
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
}

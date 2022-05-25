export default class Location {
  readonly latitude: number
  readonly longitude: number
  city?: string
  address?: string

  constructor({
    latitude,
    longitude,
    city,
    address,
  }: {
    latitude: number
    longitude: number
    city?: string
    address?: string
  }) {
    this.latitude = latitude
    this.longitude = longitude
    this.city = city
    this.address = address
  }

  get toString(): string {
    return `${this.longitude},${this.latitude}`
  }
}

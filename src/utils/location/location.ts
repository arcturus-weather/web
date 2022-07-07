export default class Location implements ILocation {
  latitude: number;
  longitude: number;
  address?: string | undefined;
  city?: string | undefined;

  constructor(options: {
    latitude: number;
    longitude: number;
    city?: string;
    address?: string;
  }) {
    this.latitude = options.latitude;
    this.longitude = options.longitude;
    this.address = options.address;
    this.city = options.city;
  }

  toString(): string {
    return `${this.longitude},${this.latitude}`;
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CalendarDocument = Calendar & Document;

class Weather {
  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  feelsLike: number;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  wind360: number;

  @Prop({ required: true })
  windSpeed: number;

  @Prop({ required: true })
  humidity: number;

  @Prop({ required: true })
  precip: number;

  @Prop({ required: true })
  pressure: number;

  @Prop({ required: true })
  visibility: number;

  @Prop({ required: true })
  clouds: number;

  @Prop({ required: true })
  aqi: number;

  @Prop({ required: true })
  source: string;
}

export class Location {
  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop()
  city?: string;

  @Prop()
  address?: string;
}

@Schema({
  timestamps: true,
})
export class Calendar extends Document {
  @Prop()
  uid: string;

  @Prop({ required: true })
  location: Location;

  @Prop({ required: true })
  weather: Weather;

  @Prop()
  daily: string; // 打卡日记
}

export const CalendarSchema = SchemaFactory.createForClass(Calendar);

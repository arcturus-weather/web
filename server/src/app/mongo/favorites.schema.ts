import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Favorites_ {
  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop()
  city?: string;

  @Prop()
  address?: string;
}

export type FavoritesDocument = Favorites & Document;

@Schema()
export class Favorites extends Document {
  @Prop({ required: true })
  list: Favorites_[];
}

export const FavoritesSchema = SchemaFactory.createForClass(Favorites);

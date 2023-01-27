import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppInfoDocument = AppInfo & Document;

@Schema({
  timestamps: true,
})
export class AppInfo extends Document {
  @Prop({ required: true })
  visitor: number; // 今日访问人数
}

export const AppInfoSchema = SchemaFactory.createForClass(AppInfo);

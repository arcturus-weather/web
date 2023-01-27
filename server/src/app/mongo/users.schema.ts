import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema({
  timestamps: true,
})
export class Users extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  salt: string;

  @Prop()
  validateCode: string; // 验证码

  @Prop({ type: Date })
  codeCreateAt: Date | null; // 验证码创建时间
}

export const UsersSchema = SchemaFactory.createForClass(Users);

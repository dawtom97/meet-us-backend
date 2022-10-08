import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  [x: string]: any;
  @Prop()
  username: string;

  @Prop({
   // select: false,
  })
  password: string;

  @Prop()
  email: string;

  @Prop()
  birthday_date: Date;

  @Prop({
    default: Date.now(),
  })
  date_added: Date;

  @Prop({
    required:false
  })
  description:string;

  @Prop({
    required:false,
    default:[]
  })
  looking_for:[string]
}

export const UserSchema = SchemaFactory.createForClass(User);

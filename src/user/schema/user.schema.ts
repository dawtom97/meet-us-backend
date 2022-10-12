import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  
  @Prop({required:true})
  name: string;

  @Prop({
    required:true
   // select: false,
  })
  password: string;

  @Prop({required:true, unique:true})
  email: string;

  @Prop({required:true})
  birthday_date: Date;

  @Prop({
    default: Date.now(),
  })
  date_added: string;

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

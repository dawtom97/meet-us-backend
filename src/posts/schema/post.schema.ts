import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type PostDocument = Post & Document

@Schema()
export class Post {
    @Prop({required:true})
    title:string;

    @Prop({required:true})
    description: string;

    @Prop({required:true})
    lat:number 

    @Prop({required:true})
    lon:number

    @Prop({required:true})
    author:string

    @Prop({
        default: Date.now(),
      })
      date_added: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post)
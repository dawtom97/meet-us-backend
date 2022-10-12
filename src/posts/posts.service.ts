import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schema/post.schema';

@Injectable()
export class PostsService {
    constructor(@InjectModel('Post') private readonly postModel: Model<PostDocument>) {}

    // below operation are async
    async create(post:Post):Promise<PostDocument> {
        const newPost = new this.postModel(post);
        return newPost.save();
    }

    async findAll():Promise<PostDocument[]> {
        return this.postModel.find().exec()
    }

    async find(id:string):Promise<PostDocument> {
        return this.postModel.findById(id).exec();
    }

    async update(id,attrs:Partial<PostDocument>):Promise<PostDocument | Error> {
        const existingPost = await this.find(id);
        if(!existingPost) return new NotFoundException("User not found");
        Object.assign(existingPost,attrs);
        const updatedPost =  new this.postModel(existingPost);
        return updatedPost.save()

    }

    async delete(id:string) {
        return this.postModel.deleteOne({_id:id}).exec()
    }
}

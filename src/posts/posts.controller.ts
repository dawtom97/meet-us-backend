import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @Post()
    createPost(@Body() body: CreatePostDto) {
        return this.postService.create(body)     
    }

    @Get()
    findAllPosts () {
        return this.postService.findAll()
    }

    @UseGuards(JwtGuard)
    @Get(":id")
    findPost(@Param('id') id:string) {
        return this.postService.find(id)
    }

    @Patch(':id')
    updatePost(@Param('id') id: string, @Body() body:UpdatePostDto) {
        return this.postService.update(id,body)
    }

    @Delete(':id')
    deletePost(@Param('id') id:string) {
        return this.postService.delete(id)
    }



}

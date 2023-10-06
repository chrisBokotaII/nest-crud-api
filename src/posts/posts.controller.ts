import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Request } from 'express';
import { UpdatePostDto } from './dto/update-post.dto';
import { viewService } from './view.service';
import { AuthGuard } from '../auth/auth.guard';

// import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly viewsServices: viewService,
  ) {}
  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Req() request: Request, @Body() createPostDto: CreatePostDto) {
    const user = request['currentUser'];
    return this.postsService.create(createPostDto, user.sub);
  }
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.postsService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: Request,
  ) {
    const auth = request['currentUser'];

    this.viewsServices.addview(auth.sub, id);

    const post = await this.postsService.findOne(id);
    const view = await this.viewsServices.countView(id);
    return {
      post,
      view,
    };
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() request: Request,
  ) {
    console.log(id);
    const auth = request['currentUser'];

    return this.postsService.update(id, updatePostDto, auth.sub);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    const auth = request['currentUser'];

    return this.postsService.remove(id, auth.sub);
  }
}

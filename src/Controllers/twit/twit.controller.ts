import { JwtAuthGuard } from './../../Core/MiddleWares/Gaurds/jwt-auth.guardd';
import { TwitCommentCreateDTo, TwitCreateDto } from './../../Core/Models/Dto/twit.Dto';
import { TwitService } from './../../Core/Services/twit/twit.service';
import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Twit } from 'src/Core/Models/Entites/twit.entity';
import { TwitComment } from 'src/Core/Models/Entites/comment.entity';
import { LocalAuthGuard } from 'src/Core/MiddleWares/Gaurds/local-auth.guard';

@Controller('api/twits')
@ApiTags("Twits")
export class TwitController {
   
    constructor(private _twitService: TwitService) {
        
    }
    @UseGuards(JwtAuthGuard)
    @Get("")
    async getAlltweets(): Promise<Twit[]> {
        return this._twitService.fetchTwits();
    }
    @UseGuards(JwtAuthGuard)
    @Get("user/:userId")
    async getUserTweets(@Param("userId") userId: string): Promise<Twit[]> {
        return this._twitService.getUserTwits(userId);
    }


    @UseGuards(JwtAuthGuard)
    @Get(":twitId")
    async getTwitDetailsWithComments(@Param("twitId") twitId: number): Promise<Twit> {
        return this._twitService.getTwitDetails(twitId);
    }


    @UseGuards(JwtAuthGuard)
    @Get(":twitId/comments")
    async getTwitComments(@Param("twitId") twitId: number): Promise<TwitComment[]> {
        return this._twitService.getTwitComments(twitId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":twitId/delete/:userId")
    async removeTwit(@Param("twitId") twitId: number, @Param("userId") userId: string): Promise<any> {
        return this._twitService.removeTwit(twitId, userId);
    }


    @UseGuards(JwtAuthGuard)
    @Post("create")
    async createTwit(@Body() twitRequest: TwitCreateDto): Promise<any> {
        return this._twitService.addTwit(twitRequest);
    }

    @UseGuards(JwtAuthGuard)
    @Post(":twitId/comments/add")
    async addComment(@Body() comment: TwitCommentCreateDTo, @Param("twitId") twitId: number): Promise<any> {
        return this._twitService.addComment(comment);
    }

    @UseGuards(JwtAuthGuard)
    @Post(":twitId/like/:userId")
    async likeTweet(@Param("twitId") twitId: number, @Param("userId") userId: string): Promise<any> {
        return this._twitService.likeTwit(twitId, userId);
    }
}

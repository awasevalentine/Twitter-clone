import { TwitCommentCreateDTo, TwitCreateDto } from './../../Models/Dto/twit.Dto';
import { TwitComment } from './../../Models/Entites/comment.entity';
import { Twit } from './../../Models/Entites/twit.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Core/Models/Entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TwitService {

    constructor(
        @InjectRepository(User) private _userRepository: Repository<User>,
        @InjectRepository(Twit) private _tweetRepository: Repository<Twit>,
        @InjectRepository(TwitComment) private _commentsRespository: Repository<TwitComment>,
         ) {}

    async fetchTwits(): Promise<Twit[]> {
        return await this._tweetRepository.find();
    }

    async getUserTwits(userId: string): Promise<Twit[]> {
        return await this._tweetRepository.find({where : {user_Id: userId}, relations: ["Comments"]});
    }

    async getTwitDetails(twitId: any): Promise<Twit> {
        var comments = await this._tweetRepository.findOne({where: {twit_Id: twitId}, relations: ["Comments"]});
        console.log(comments);
        return comments;
    }

    async getTwitComments(twitId: number): Promise<TwitComment[]>{
        return this._commentsRespository.find({where: {twit_Id: twitId}});
    }

    async addComment(comment: TwitCommentCreateDTo): Promise<TwitComment> {
        const _comment = new TwitComment();
        _comment.commenter = comment.userId;
        _comment.message = comment.message;
        _comment.twit_Id = comment.twitId;
        _comment.date_Created = new Date();

        const savedComment = await this._commentsRespository.save(_comment);
        if (savedComment) {
            const twit = await this.getTwitDetails(comment.twitId);
            if(twit) {
                twit.commentsCount++;
                await this._tweetRepository.save(twit);
            }
        }
        return savedComment;
    }
    async likeTwit(twitId: number,userId: string): Promise<Twit> {
        const twit = await this.getTwitDetails(twitId);
        if(!twit)
            return null;
        twit.likes_Count++;
        return this._tweetRepository.save(twit);
    }

    async addTwit(twit: TwitCreateDto): Promise<any> {
        const user = await this._userRepository.findOne({where: {email: twit.userId}});
        if(!user)
            return {status: 401, statusMessage: "UnAthorized action"};
        const _twit = new Twit();
        _twit.content = twit.content;
        _twit.user_Id = twit.userId;
        _twit.date_Created = new Date();

        return this._tweetRepository.save(_twit);
    }

    async removeTwit(twitId: number, userId: string): Promise<any> {
        const user = await this._userRepository.findOne({where: {email: userId}});
        const twit = await this._tweetRepository.findOne({where: {twit_Id: twitId}});
        if(!user)
            return {status: 401, statusMessage: 'UnAuthorized action for user'};
        if(!twit)
            return {status: 404, statusMessage: 'Twit not found'};
        if(twit.user_Id !== user.email)
            return {status: 403, statusMessage: 'Forbiden. User only allowed to delete own twits'};

        const res = await this._tweetRepository.remove(twit);
        if(res)
            return {status: 200, statusMessage: 'Successfully removed twit'};
        return {status: 204, statusMessage: 'Operation Status Unknown'};
    }
}

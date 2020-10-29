import { IsNumber, IsString } from "class-validator";

export class TwitDto {
  
  @IsString()
  readonly content: string;
}

export class TwitCommentCreateDTo {
  @IsNumber()
  twitId: number;

  @IsString()
  userId: string;

  @IsString()
  message: string;
}

export class TwitCreateDto {
  @IsString()
  userId: string;

  @IsString()
  content: string;
}
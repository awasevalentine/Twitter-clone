import { IsString } from "class-validator";

export class TwitDto {
  
  @IsString()
  readonly content: string;
}
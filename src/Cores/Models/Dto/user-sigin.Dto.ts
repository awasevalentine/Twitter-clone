import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class UserLoginDto {

  @IsEmail()
  readonly email: string;


  @IsString()
  @MinLength(6, { message: "password should be more than 5 characters" })
    @MaxLength(20, { message: "password should not be more than 20 characters"})
  readonly password: string;
  
}
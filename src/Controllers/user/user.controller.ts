import { Body, Controller, Post, Res,Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRegistrationDto } from 'src/Cores/Models/Dto/user_Registration.Dto';
import { UserService } from 'src/Cores/Services/user/user.service';
import { LocalAuthGuard } from 'src/Cores/MiddleWares/Gaurds/local-auth.guard';
import { AuthService } from 'src/Cores/Services/auth/auth.service';

@Controller('api/user')
@ApiTags("User signup")
export class UserController {
  
  constructor(private readonly _userService: UserService, private _authService: AuthService){}

@Post('/signup')
async createUser(@Res() res, @Body() userDto: UserRegistrationDto): Promise<any> {
  const newUser = await this._userService.createUser(userDto).then();
  return newUser;
}
  
}

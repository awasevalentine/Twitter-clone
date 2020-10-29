import { Body, Controller, Post, Res,Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRegistrationDto } from 'src/Core/Models/Dto/user_Registration.Dto';
import { UserService } from 'src/Core/Services/user/user.service';
import { LocalAuthGuard } from 'src/Core/MiddleWares/Gaurds/local-auth.guard';
import { AuthService } from 'src/Core/Services/auth/auth.service';

@Controller('api/users')
@ApiTags("Users")
export class UserController {
  
  constructor(private readonly _userService: UserService, private _authService: AuthService){}

@Post('signup')
async createUser(@Body() userDto: UserRegistrationDto): Promise<any> {
  const result = await this._userService.createUser(userDto);
  console.log('request finished with response - res', result);
  return result;
}
  
}

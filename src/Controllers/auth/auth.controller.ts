import { SignInDto } from './../../Core/Models/Dto/user_Registration.Dto';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/Core/MiddleWares/Gaurds/local-auth.guard';
import { AnyMxRecord } from 'dns';
import { AuthService } from 'src/Core/Services/auth/auth.service';

@Controller('api/auth')
@ApiTags("Authentication")
export class AuthController {

  constructor(private _authService: AuthService){}


  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req, @Body() payload: SignInDto ) {
    return this._authService.signIn(req.user);
  }
}

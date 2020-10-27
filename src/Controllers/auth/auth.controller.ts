import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/Cores/MiddleWares/Gaurds/local-auth.guard';
import { AuthService } from 'src/Cores/Services/auth/auth.service';

@Controller('api/auth')
@ApiTags("User Login")
export class AuthController {

  constructor(private _authService: AuthService){}


  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Request() req) {
    return this._authService.signIn(req.user);
  }
}

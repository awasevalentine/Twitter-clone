import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/Core/Models/Entites/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(private readonly _userService: UserService, private jwtService: JwtService) { }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this._userService.getUser(email);
    if (!user) {
      return null;
    }
    const valid = bcrypt.compare(password, user.password).then(
      (validUser) => {

        if (validUser) {
          return user;
        } else {
          
          return null;
        }
      },
      (err) => {
          throw new ErrorEvent(`email and password not correct `);
      }
    );
    return valid;
  }


  async signIn(user: any) {
    const payload = { email: user.email, UserId: user.user_Id, fullName: user.fullName, date_Created: user.date_Created};
    return {
      accessToken: this.jwtService.sign(payload)
    };
     
  }
  }

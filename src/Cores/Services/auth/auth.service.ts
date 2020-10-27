import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/Cores/Models/Entites/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(private readonly _userService: UserService, private jwtService: JwtService) { }

  async validateUser(email: string, password: string): Promise<User> {

    const user: User = await this._userService.getUser(email).then(
      (data) => {
        const valid = bcrypt.compare(password, data.password);
        if (valid) {
          return data;
        }
        return null;
      },
      (err) => {
        throw new Error(err);
      }
    )
    return await user;
  }

  async signIn(user: User) {
    const payload = { email: user.email, UserId: user.user_Id, fullName: user.fullName, date_Created: user.date_Created};
    return {
      accessToken: this.jwtService.sign(payload)
    };
     
  }
  }

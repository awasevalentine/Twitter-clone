import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegistrationDto } from 'src/Cores/Models/Dto/user_Registration.Dto';
import { User } from 'src/Cores/Models/Entites/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly _userRepository: Repository<User>){}

  async createUser(userDto: UserRegistrationDto): Promise<any> {

    const newUser = new User();
    newUser.email = userDto.email;
    newUser.fullName = userDto.fullName;
    newUser.password = await bcrypt.hash(userDto.password, 10);
    newUser.date_Created = new Date()

    const user = await this._userRepository.save(newUser);
    console.log(`user successfully created -> `, user);
   
    return user;
  }

  async getUser(email: any): Promise<User> {
    const user = await this._userRepository.findOne({ where: { email: email } });
    if(!user) {
      throw new HttpException(`${email} not found on the database!`, 404);
    }
    return user;
  }

  
}

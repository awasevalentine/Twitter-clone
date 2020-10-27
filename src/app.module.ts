import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './Controllers/auth/auth.controller';
import { TwitController } from './Controllers/twit/twit.controller';
import { UserController } from './Controllers/user/user.controller';
import { JwtStrategy } from './Cores/MiddleWares/Strategies/jwt-auth.strategy';
import { LocalStrategy } from './Cores/MiddleWares/Strategies/local-auth.strategy';
import { TwitComment } from './Cores/Models/Entites/comment.entity';
import { Twit } from './Cores/Models/Entites/twit.entity';
import { User } from './Cores/Models/Entites/user.entity';
import { AuthService } from './Cores/Services/auth/auth.service';
import { TwitService } from './Cores/Services/twit/twit.service';
import { UserService } from './Cores/Services/user/user.service';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: 'tweeterDb',
      entities: [TwitComment, Twit, User],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([TwitComment, Twit, User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    
    CacheModule.register(
      {
        ttl: 1, // seconds
        max: 10, // maximum number of items in cache
      }
    ),
  ],
  controllers: [AppController, AuthController, TwitController, UserController ],
  providers: [AppService, LocalStrategy, JwtStrategy, AuthService, UserService, TwitService],
})
export class AppModule {}

import {
   BadRequestException,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/user/create-user.input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
   constructor(
      private userService: UserService,
      private jwtService: JwtService,
      private configService: ConfigService,
   ) {}

   async validateUser(username: string, password: string) {
      const user = await this.userService.findByUsername(username);
      if (user && (await argon2.verify(user.password, password))) {
         const { password, ...result } = user;

         return result;
      }

      return null;
   }

   async login(username: string, password: string) {
      const user = await this.validateUser(username, password);

      const tokenPayload = {
         username: user.username,
         sub: user._id,
      };

      return {
         user,
         refreshToken: this.jwtService.sign(tokenPayload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: '7d',
         }),
         accessToken: this.jwtService.sign(tokenPayload),
      };
   }

   async signUp(createUserInput: CreateUserInput) {
      const { password, ...result } = await this.userService.create(
         createUserInput,
      );

      return result;
   }

   renewToken(token: string) {
      try {
         const { sub, username } = this.jwtService.verify(token, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
         });
         if (!sub) throw new UnauthorizedException();

         return {
            accessToken: this.jwtService.sign({
               username,
               sub,
            }),
         };
      } catch (err) {
         throw new BadRequestException(err);
      }
   }
}

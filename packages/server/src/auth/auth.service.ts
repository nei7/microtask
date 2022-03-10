import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/user/create-user.input';

@Injectable()
export class AuthService {
   constructor(
      private userService: UserService,
      private jwtService: JwtService,
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

      return {
         user,
         accessToken: this.jwtService.sign({
            username: user.username,
            sub: user._id,
         }),
      };
   }

   async register(createUserInput: CreateUserInput) {
      const { password, ...result } = await this.userService.create(
         createUserInput,
      );

      return result;
   }
}

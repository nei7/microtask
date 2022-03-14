import { HttpException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/create-user.input';
import { UserType } from 'src/user/user.type';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.dto';
import { TokenResponse } from './dto/token-response.dto';
import { GqlAuthGuard } from './ghl.guard';
import { LoginUserInput } from './inputs/login-user.input';
@Resolver()
export class AuthResolver {
   constructor(private authService: AuthService) {}

   @Mutation(() => LoginResponse)
   @UseGuards(GqlAuthGuard)
   login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
      return this.authService.login(
         loginUserInput.username,
         loginUserInput.password,
      );
   }

   @Mutation(() => UserType)
   async signup(@Args('createUserInput') createUserInput: CreateUserInput) {
      try {
         return await this.authService.signUp(createUserInput);
      } catch (err) {
         return new HttpException(err, 409);
      }
   }

   @Mutation(() => TokenResponse)
   renewToken(@Args('refreshToken') refreshToken: string) {
      return this.authService.renewToken(refreshToken);
   }
}

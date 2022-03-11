import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/create-user.input';
import { AuthService } from './auth.service';
import { LoginResponse, UserResponse } from './dto/login-response.dto';
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

   @Mutation(() => UserResponse)
   signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
      return this.authService.signUp(createUserInput);
   }
}

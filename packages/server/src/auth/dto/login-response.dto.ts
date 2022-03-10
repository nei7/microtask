import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
   @Field(() => ID)
   _id: string;

   @Field()
   username: string;

   @Field()
   email: string;
}

@ObjectType()
export class LoginResponse {
   @Field()
   accessToken: string;

   @Field(() => UserResponse)
   user: UserResponse;
}

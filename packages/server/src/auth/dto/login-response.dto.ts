import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/user/user.type';

@ObjectType()
export class LoginResponse {
   @Field()
   accessToken: string;

   @Field()
   refreshToken: string;

   @Field(() => UserType)
   user: UserType;
}

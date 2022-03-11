import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
   @Field()
   _id: string;

   @Field()
   username: string;

   @Field()
   email: string;
}
